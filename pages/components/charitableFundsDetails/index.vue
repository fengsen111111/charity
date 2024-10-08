<template>
	<view class="">
		<hearchItem :isLeft="true" :title="'慈善基金详情'" />
		<swiperItemsTwo :isBottom="false" :swiperList="[fundDetails.images]" />
		<view class="py30 px36">
			<view class="text32 font-bold">{{fundDetails.name}}</view>
			<view class="text24 mt20 col787878">{{fundDetails.org_name}}</view>
			<view class="flex items-baseline">
				<view class="text24 ">已募集</view>
				<view class="flex colD6B07A items-baseline ml100">
					<view class="text60  font-bold">{{fundDetails.all_money}}</view>
					<view class="text24 ml10">元</view>
				</view>
			</view>

		</view>
		<view class="bgEBEBEB h18 "></view>
		<view class="py30 px36">
			<view class="titleView text24">
				<view class="ml20 col205D57 font-bold">已实施项目使用资金情况</view>
			</view>
			<view class="p20 mt20 border205D57 radius20 flex justify-between items-center"
				v-for="item in fundDetails.use_log" :key="item.name">
				<view class="">{{item.name}}</view>
				<view class="flex items-center">
					<view class="text24 col205D57">已使用</view>
					<view class="flex colD6B07A items-center ml20">
						<view class="text60 font-bold">{{item.money}}</view>
						<view class="text24 ml10">元</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bgEBEBEB h18 "></view>
		<view class="py30 px36 text32 indent32">
			<view v-html="fundDetails.content"></view>
		</view>
		<view class="h100"></view>
		<!-- 屏幕定位 -->
		<view class="btnMoney w-full">
			<button type="default" open-type="share" class="clear-style">
				<image src="../../../static/fenxiang.png" class="w100 h100 relative_fei" mode="">
			</button>
			</image>
			<view class="mt20 px75 ">
				<view class="btnForm" @click="handleMoney()">
					捐款
				</view>
			</view>
		</view>
		<!-- fenx -->
		<uni-popup ref="share" type="share" safeArea backgroundColor="#fff">
		<!-- 	<view class="text-center py22">
				分享
			</view> -->
			<button type="default" open-type="share">分享到微信</button>
			<button type="default" @click="handleCol">取消</button>
		</uni-popup>

		<view class="h20"></view>
		<!-- 弹框 -->
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<view class="bg-white" style="height: 50vh;">
					<view class="grid grid-cols-3  items-center p35 border-bottom-dotted">
						<view class=""></view>
						<view class="text30 font-bold text-center col205D57">捐助</view>
						<view class="text-right">
							<uni-icons type="closeempty" size="26" color="#205D57" @click="close"></uni-icons>
						</view>
					</view>
					<cardFundsTwo :itemObj="fundDetails" />
					<view class="bgEBEBEB h18 "></view>
					<view class="p30">
						<view class="py30 px20 border205D57 radius20">
							<input type="text" v-model="form.name" placeholder="请输入参与者姓名" />
						</view>
					</view>
					<view class="p30">
						<view class="py30 px20 border205D57 radius20">
							<input type="text" v-model="form.money" placeholder="请输入捐助金额" />
						</view>
					</view>
					<view class="mt40 px75">
						<view class="btnForm" @click="_joinDonate">
							提 交
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue'
	import swiperItemsTwo from '@/components/swiperItems/index_two.vue'
	import cardFundsTwo from '@/components/card_funds/index_two.vue'
	import {
		getDonateDetail,
		joinDonate
	} from "@/request/api.js"
	export default {
		props: {

		},
		components: {
			hearchItem,
			swiperItemsTwo,
			cardFundsTwo
		},
		data() {
			return {
				indexItem: 1,
				form: {
					name: '',
					money: ''
				},
				funds_id: '',
				fundDetails: {}
			}
		},
		onLoad(option) {
			//获取手机状态栏高度
			this.funds_id = option.funds_id
		},
		onReady() {
			this._getDonateDetail()
		},
		watch: {},
		methods: {
			handleCol(){
				this.$refs.share.close()
			},
			onShareAppMessage(res) {
				if (res.from === 'button') { // 判断分享是否来自页面内分享按钮
					console.log(res.target)
				}
				return {
					title: '不凡',
					path: path
				}
			},
			handleFX() {
				console.log('分享');
				// this.$refs.share.open()
				
			},
			// 基金详情
			_getDonateDetail() {
				getDonateDetail({
					post_params: {
						id: this.funds_id
					}
				}).then((res) => {
					console.log('res基金详情', res.data.data);
					this.fundDetails = res.data.data
					this.fundDetails.cover_image = res.data.data.images
				})
			},
			_joinDonate() {
				joinDonate({
					post_params: {
						donate_id: this.funds_id,
						user_name: this.form.name,
						money: this.form.money,
					}
				}).then((res) => {
					console.log('捐款结束', res.data.data);
					this.weixinPay(res.data.data.pay_data)
				})
			},
			// 调用微信支付
			weixinPay(item) {
				const that = this
				console.log('调用微信支付', item);
				// 结果查询
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				uni.requestPayment({
					provider: 'wxpay', // 服务提提供商
					timeStamp: item.timeStamp, // 时间戳
					nonceStr: item.nonceStr, // 随机字符串
					package: item.package,
					signType: item.signType, // 签名算法
					paySign:item.paySign, // 签名
					success: function(res) {
						console.log('支付成功', res);
						that.close()
						that._getDonateDetail()
						uni.showToast({						    
							title: '捐款成功!',					
						    icon: 'success',					    
							duration: 1000
						});
						
					},
					fail: function(err) {
						console.log('支付失败', err);
						that.close()
					}
				});
			},
			// 捐款
			goDetail(id) {
				console.log(id)
			},
			// 切换
			handleIndex(index) {
				this.indexItem = index
			},
			// 捐款
			handleMoney() {
				console.log('我要捐款');
				this.$refs.popup.open('bottom')
			},
			close() {
				this.$refs.popup.close()
			}
		}
	}
</script>

<style>
	
	.relative_fei {
		position: relative;
		left: 84vw;
	}

	.border-bottom-dotted {
		border: 1rpx dotted #9B9B9B;
	}

	.charitableImg {
		width: 170rpx;
		height: 65rpx;
	}

	.bgtwo {
		background: linear-gradient(90deg, #164336 0%, #226043 100%);
	}
</style>