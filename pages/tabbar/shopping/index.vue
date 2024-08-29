<template>
	<view class="bgF9 h-full">
		<hearch :title="'购物车'" />
		<!-- item -->
		<view class="px-3 mt-3 flex items-center" v-for="item in [1,2,3,4]" :key="item">
			<view class="" @click="handleCmput(item)">
				<!-- <uni-icons type="circle" size="20"></uni-icons> -->
				<uni-icons type="checkbox-filled" v-if="item==1" color="#4867CF" size="20"></uni-icons>
				<uni-icons type="circle" size="20" v-else></uni-icons>
			</view>
			<view class="w90 space-x-2  rending2  p-4 bg-whilt">
				<shopCard>
					<!-- slot -->
					<view class="mt-3">
						<view class="flex text12 items-center">
							<view class="w-6">总计</view>
							<view class="colED1 fontBold space-x-1">￥<text class="text20 ">888</text>.8</view>
							<view class="space-x-3" @click="_delCarGoods(item)">
								<uni-icons type="trash" size="22" color="#FC6265" class="space-x-3"></uni-icons>
							</view>
							<view class="w-8"></view>
							<view class="flex space-x-3 text24 text-center">
								<view class="leftView" @click="handleNumber('-1',item)">
									<!-- - -->
								</view>
								<view class="bg-whilt text-black cenVire text14">
									10
								</view>
								<view class="rightView" @click="handleNumber('+1',item)">
									<!-- + -->
								</view>
							</view>
						</view>
						<!-- 折扣 -->
						<!-- <view class="flex justify-between">
							<view></view>
							<view class="flex mt-2 items-center">
								<view class="discount"></view>
								<view class="col666 text12  ">使用折扣价</view>
							</view>
						</view> -->
					</view>
				</shopCard>
			</view>

		</view>
		<view class="h160"></view>
		<!-- 底部锁定 -->
		<view class="bottomView flex p-4 text12 items-center">
			<view class="col666">实付金额</view>
			<view class="space-x-3 colED1 fontBold">￥<text class="text20 ">1888</text>.8</view>
			<view class="space-x-4 colED1">已优惠：￥888</view>
			<view class="w-8"></view>
			<text class="space-x-3 bg486 text-whlie text14 py-2 px-3 rending2" @click="handlePay()">
				去支付
			</text>
		</view>
		<!--  -->
		<tarBar :checkIndex="4" />
	</view>
</template>

<script>
	import hearch from '@/components/hearch/index.vue'
	import shopCard from '@/components/shopCard/index.vue'
	import tarBar from '@/components/tarBar/index.vue'
	import {
		getCarList,//list
		delCarGoods,//删除
		editCarGoods,//修i该
		computeOrderPrice//计费
	} from '@/request/api.js'
	export default {
		components: {
			hearch,
			shopCard,
			tarBar
		},
		created() {
			this._getCarList() //购物车列表
		},
		data() {
			return {
				title: 'Hello',
				radio1: 1, //单选
				weChatPayData: {
					timestamp: '',
					noncestr: '',
					package: '',
					signtype: '',
					sign: '',
				},
				dataList: [{
					"id": "1",
					"goods_size_id": "1",
					"goods_name": "泸州老窖 ",
					"taste_name": "原味",
					"volume": "500ml*12",
					"size_number": "666",
					"number": "10",
					"ice_number": "66",
					"price": "888.8",
					"old_price": "1888",
					"low_price_size": "最划算 Y是 N否",
					"new_user_size": "新人价 Y是 N否",
					"kill_price_size": "一分钱秒杀 Y是 N否",
					"time_price_size": "限时秒杀 Y是 N否"
				}]
			}
		},
		onLoad() {

		},
		methods: {
			handleCmput(item){
				console.log('计算加个',item);
				computeOrderPrice({
					post_params:{
						coupon_id:'', //优惠券ID  
						goods:{
							goods_size_id:'', //商品规格ID  
							number:'',//	购买数量  
						}
					}
				}).then((res)=>{
					console.log('计算金额',res);
				})
			},
			// 修改数量
			handleNumber(number,item){
				console.log('number',number,item);
				editCarGoods({
					post_params:{
						car_id:'',//购物车ID  
						number:'',//修改后的数量  
					}
				}).then((res)=>{
					console.log('修改成功',res);
				})
			},
			// 删除
			_delCarGoods(item) {
				console.log('删除', item);
				delCarGoods({
					post_params: {
						car_id: '' //	购物车ID  
					}
				}).then((res) => {
					console.log('删除成功', res);
				})
			},
			// 数据
			_getCarList() {
				getCarList({
					post_params: {
						store_id: '' //当前门店ID  
					}
				}).then((res) => {
					console.log('购物车数据', res);
				})
			},
			handlePay() {
				uni.navigateTo({
					url:'/pages/sonView/okOrder/index'
				})
				// uni.requestPayment({
				// 	provider: 'wxpay', // 服务提提供商
				// 	timeStamp: this.weChatPayData.timestamp, // 时间戳
				// 	nonceStr: this.weChatPayData.noncestr, // 随机字符串
				// 	package: this.weChatPayData.package,
				// 	signType: this.weChatPayData.signtype, // 签名算法
				// 	paySign: this.weChatPayData.sign, // 签名
				// 	success: function(res) {
				// 		console.log('支付成功', res);
				// 		// 业务逻辑。。。
				// 	},
				// 	fail: function(err) {
				// 		console.log('支付失败', err);
				// 	}
				// });
			}
		}
	}
</script>

<style>
	.bottomView {
		height: 2rem;
		position: fixed;
		background-color: #fff;
		bottom: 7.5vh;
		width: 100%;
	}

	.discount {
		border: 1px solid #666666;
		border-radius: 1.5rem;
		width: 0.75rem;
		height: 0.75rem;
		margin-right: 0.25rem;
	}

	.leftView {
		background-image: url('@/static/home/subtract.png');
		background-size: 100% 100%;
		width: 2.5rem;
		height: 1.75rem;
		line-height: 51rpx;
		border-radius: 1rem 0px 0px 1rem;
	}

	.cenVire {
		background-color: #F9F9F9;
		width: 2rem;
		height: 1.75rem;
		text-align: center;
		line-height: 1.75rem;
	}

	.rightView {
		background-image: url('@/static/home/add.png');
		background-size: 100% 100%;
		width: 2.5rem;
		height: 1.75rem;
		line-height: 51rpx;
		border-radius: 0px 1rem 1rem 0px;
	}

	.radios {
		border: 1px solid #666666;
		border-radius: 1.5rem;
		width: 1rem;
		height: 1rem;
	}
</style>