<template>
	<view class="">
		<hearch :title="'确认订单'" :isLeft="true" />
		<view class="p-3 text12">
			<view class="bg-whilt rending1 p-3">
				<view class="flex items-center justify-between">
					<view class="">收货地址</view>
					<view class="colED1">
						<!-- 超出配送范围 -->
					</view>
				</view>
				<view class="flex">
					<text>张三</text>
					<text>13512341234</text>
				</view>
				<view class="flex items-center justify-between">
					<text class="w80 ling4 mt-1">四川省成都市武侯区世纪城天府大道中段588号天天小区快鸟驿站</text>
					<text class="col486" @click="toggleAddress('bottom')">更换</text>
				</view>
			</view>
			<!--  -->
			<view class="bg-whilt rending1 py-3 mt-3">	
				<view class=" space-x-3">商品清单</view>
				<view class="w95">
					<view class="mt-3">
						<shopCard :isBgWhilt='true' />
					</view>
					<view class="mt-3">
						<shopCard :isBgWhilt='true' />
					</view>
					<view class="mt-3">
						<shopCard :isBgWhilt='true' />
					</view>
				</view>
			</view>
			<!--  -->
			<view class="bg-whilt rending1 py-3 mt-3">
				<view class="flex justify-between">
					<view class="space-x-3">优惠卷</view>
					<view class="flex" @click="toggleGift('bottom')">
						<view class="col486">更换</view>
						<view class="w-3"></view>
					</view>
				</view>
				<view class="w-full">
					<view v-if="data.length">
						<volumeTag :datalist=data :isFFF='true' />
					</view>
					<!--  -->
					<view v-else class="bgF9 w90 mxAuto text-center h136">
						<view class="col999 pt-3 text14">暂无优惠卷可用</view>
						<view class="flex justify-evenly">
							<view class="flex items-center">
								<view class="col486  text12">领卷中心</view>
								<uni-icons type="right" color="#4867CF" size="16"></uni-icons>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 备注 -->
			<view class="bg-whilt rending1 py-3 mt-3">
				<view class=" space-x-3">备注（选填）</view>
				<view class="px-3 pt-3">
					<uni-easyinput type="textarea" v-model="textarea" placeholder="请输入内容"></uni-easyinput>
				</view>
			</view>
			<view class="h-8"></view>
			<view class="h-8"></view>

		</view>
		<!-- 底部固定 -->
		<view class="bottomFixed flex justify-between w-full bg-whilt px-3 items-center">
			<view class="flex items-center">
				<view class="col666 text12">实付金额</view>
				<view class="colED1 fontBold space-x-3">￥<text class="text20 ">888</text>.8</view>
				<view class="colED1 text12 space-x-3">已优惠：￥888</view>
			</view>
			<view class="btnPay space-x-2 rending1" @click.stop="toggle('center')">去支付</view>
		</view>
		<!-- 支付弹窗 -->
		<uni-popup ref="popup" background-color="#fff" borderRadius="0.5rem 0.5rem 0.5rem 0.5rem">
			<view class="bgF9 p-4 overflowAuto rending2" style="width: 17rem;">
				<view class="flex justify-between">
					<view class="w-4"></view>
					<view class="text16">
						支付失败/成功
					</view>
					<view class="w-4"></view>
				</view>
				<view class="h-8"></view>
				<view class="p-3 text-center ">
					<uni-icons type="clear" size="90" color="#FC6265"></uni-icons>
				</view>
				<view class="p-3 text-center">
					<uni-icons type="checkbox" size="90" color="#68BF7B"></uni-icons>
				</view>
				<view class="mt-3 text-center ">
					订单支付支付失败/成功
				</view>
				<view class="h-8"></view>
				<!-- 留白 -->
				<view class="w-full bg486 text-whlie py-3 mt-3 rending1 text-center" @click="close">
					返回
				</view>
			</view>
		</uni-popup>
		<!-- 优惠卷弹窗 -->
		<uni-popup ref="popupGift" background-color="#fff" borderRadius="0.5rem 0.5rem 0px 0px">
			<view class="bgF9 p-4 overflowAuto" style="height:60vh">
				<view class="fiexdTop">
					<view class="w-4"></view>
					<view class="text16">
						优惠卷
					</view>
					<view class="" @click="closeGift">
						<uni-icons type="closeempty" size="20"></uni-icons>
					</view>
				</view>
				<view class="h-6"></view>
				<view class="grid text-center grid-cols-2 mt-4">
					<view class="">
						<view class="col486">
							待使用
						</view>
						<view class="bg486 w-6 mxAuto" style="height: 2px;"></view>
					</view>
					<view class="col666">
						未领取
					</view>
				</view>
				<view class="mt-3">
					<volumeTag :datalist=datalist :isFFF='true' :isBtn="true" :isUse='true' />
				</view>
				<!-- 留白 -->
				<view class="h-8"></view>
				<view class="h-4"></view>
			</view>
		</uni-popup>
		<!-- 地址 -->
		<uni-popup ref="popupAddress" background-color="#fff" borderRadius="0.5rem 0.5rem 0px 0px">
			<view class="bgF9 p-4 overflowAuto" style="height:40vh">
				<view class="fiexdTop items-center">
					<view class="w-6 text12 col486" @click="handleAddressAdd">新增</view>
					<view class="text16">
						选择地址
					</view>
					<view class="" @click="closeAddress">
						<uni-icons type="closeempty" size="20"></uni-icons>
					</view>
				</view>
				<view class="h-6"></view>
				<view class="bg-whilt text14 mt-3 rending1 p-3" v-for="item in [1,2,3]" :key="item">
					<view class="flex justify-between items-center">
						<view class="flex w70">
							<text>张三</text>
							<text class="space-x-2">13512341234</text>
						</view>
						<view class="colED1 text12">
							<!-- 超出配送范围 -->
						</view>
					</view>
					<view class="flex items-center justify-between">
						<view class="w80">
							四川省成都市武侯区世纪城天府大道中段588号天天小区快鸟驿站
						</view>
						<view class="text-center mr-2">
							<uni-icons type="checkbox-filled" size="20" color="#4867CF"></uni-icons>
						</view>
					</view>
				</view>
				<!-- 留白 -->
				<view class="h-8"></view>
				<view class="h-4"></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import hearch from "@/components/hearch/index.vue"
	import shopCard from '@/components/shopCard/index.vue'
	import volumeTag from '@/components/volumeTag/index.vue'
	import {
		createOrder,
		payOrder
	} from '@/request/api.js'
	export default {
		components: {
			hearch,
			shopCard,
			volumeTag
		},
		data() {
			return {
				active: false,
				value: '',
				textarea: '',
				data: [{
					id: '1',
					name: '优惠券名称',
					type: 'a',
					use_type: 'a',
					top_price: '100',
					coupon_data: '30',
					end_time: '2023-12-16',
					areas: '成都'
				}, ],
				datalist: [{
						id: '1',
						name: '优惠券名称',
						type: 'a',
						use_type: 'a',
						top_price: '100',
						coupon_data: '30',
						end_time: '2023-12-16',
						areas: '成都'
					},
					{
						id: '2',
						name: '优惠券名称',
						type: 'b',
						use_type: 'b',
						top_price: '',
						coupon_data: '6折',
						end_time: '2023-12-16',
						areas: '成都'
					}
				]
			};
		},
		onLoad() {},
		onShow() {

		},
		onHide() {},
		methods: {
			// 新增地址
			handleAddressAdd() {
				uni.navigateTo({
					url: '/pages/sonView/addressForm/index'
				})
			},
			// 关闭
			close() {
				this.$refs.popup.close()
			},
			// 弹框
			toggle(type) {
				// 生成订单
				createOrder({
					post_params: {
						address_id: '', //收货地址ID  
						coupon_id: '', //优惠券ID  
						remark: '', //备注  
						goods: [{
							goods_size_id: '', // 商品规格ID
							number: '', //购买数量  
							ice_number: '', //	冰冻数量  
						}]
					}
				}).then((res) => {
					console.log('生成订单', res);
					// 调用支付
					payOrder({
						post_params: {
							order_id: '', //订单id
						}
					}).then((res) => {
						this.weixinPay(res)
					})
				})
				// 调用支付
			},
			// 调用微信支付
			weixinPay(item) {
				console.log('调用微信支付', item);
				// 结果查询
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open('center')
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
			},
			// 关闭
			closeGift() {
				this.$refs.popupGift.close()
			},
			// 弹框
			toggleGift(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popupGift.open(type)
			},
			// 关闭
			closeAddress() {
				this.$refs.popupAddress.close()
			},
			// 弹框
			toggleAddress(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popupAddress.open(type)
			},
		}
	};
</script>

<style>
	.bottomFixed {
		position: fixed;
		bottom: 0px;
	}

	.btnPay {
		background-color: #999999;
		color: #fff;
		padding: 15rpx 30rpx;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		margin-right: 48rpx;
	}
</style>