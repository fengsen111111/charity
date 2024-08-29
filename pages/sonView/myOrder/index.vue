<template>
	<view class="">
		<hearch :title="'我的订单'" :isLeft="true" />
		<view class="p-3 text12">
			<view class="flex justify-between">
				<view @click="handleItem(item.id)" class="text-center" :class="chenkIndex==item.id?'col486':''"
					v-for="item in tabsList" :key="item.id">
					{{item.text}}
					<view v-if="chenkIndex==item.id" class="border486 bg486 w-4 mxAuto rending1"></view>
				</view>
			</view>
			<!-- card -->
			<view v-for="item in [1,2,3,4,5]" :key="item" @click="handleUrl('/pages/sonView/myOrderDetails/index')">
				<orderStatus>
					<view>
						<!-- 待付款 -->
						<view class="flex justify-between items-center mt-3" v-if="item == 1">
							<view class="flex items-center">
								<view class="col666">实付金额</view>
								<view class="text16 colED1 space-x-2">￥100</view>
							</view>
							<view class="bg486 text14 rending5 text-whlie py-2 w6 text-center" @click="handleToPay(item)">去支付</view>
						</view>
						<!-- 进行中 -->
						<view class="flex justify-between items-center mt-3" v-else-if="item == 2">
							<view class="flex w5"></view>
							<view class="bgEBA text14 rending5 text-whlie py-2 w6 text-center">再来一单</view>
							<view class="bg68B text14 rending5 text-whlie py-2 w6 text-center">联系骑手</view>
						</view>
						<!-- 待评价 -->
						<view class="flex justify-between items-center mt-3" v-else-if="item == 3">
							<view class="bgEBA text14 rending5 text-whlie py-2 w6 text-center">再来一单</view>
							<view @click="toggle('bottom')"
								class="bgFC6 text14 rending5 text-whlie py-2 w6 text-center">立即评价</view>
							<view @click="toggleAfter('bottom')" class="bg486 text14 rending5 text-whlie py-2 w6 text-center">申请售后</view>
						</view>
						<!-- 已完成 -->
						<view class="flex justify-between items-center mt-3" v-else-if="item == 4">
							<view class="flex w5"></view>
							<view class="bgEBA text14 rending5 text-whlie py-2 w6 text-center">再来一单</view>
							<view @click="toggleAfter('bottom')" class="bg486 text14 rending5 text-whlie py-2 w7 text-center">申请售后</view>
						</view>
						<!-- 售后 -->
						<view class="flex justify-between items-center mt-3" v-else-if="item == 5">
							<view class="flex w5"></view>
							<view class="bgF2F text14 rending5 col999 py-2 w6 text-center">售后中</view>
							<view class="bgF2F text14 rending5 col999 py-2 w6 text-center">已退货退款</view>
							<view class="bgF2F text14 rending5 col999 py-2 w6 text-center">已退款</view>
							<view class="bgF2F text14 rending5 col999 py-2 w6 text-center">已换货</view>
							<view @click="toggleAfter('bottom')" class="bg486 text16 rending5 text-whlie py-2 w7 text-center">重新申请</view>
							<view class="flex w5"></view>
						</view>
					</view>
				</orderStatus>
			</view>
		</view>
		<!-- 评价 -->
		<uni-popup ref="popup" background-color="#fff" borderRadius="0.5rem 0.5rem 0px 0px">
			<view class="bgF9 p-4 overflowAuto" style="height:65vh">
				<view class="fiexdTop">
					<view class="w-4"></view>
					<view class="text16">
						评价
					</view>
					<view class="" @click="close">
						<uni-icons type="closeempty" size="20"></uni-icons>
					</view>
				</view>
				<view class="h-8"></view>
				<!-- 留白 -->
				<view class="text12 bg-whilt p-3 mt-3">
					<view class="">
						评价
					</view>
					<view class="flex text14 justify-between text-center col999 mt-3">
						<view class="py-2 w6 rending1 bgF2F col486 border486">好评</view>
						<view class="py-2 w6 rending1 bgF9">中评</view>
						<view class="py-2 w6 rending1 bgF9">差评</view>
					</view>
				</view>
				<!--  -->
				<view class="text12 bg-whilt p-3 mt-3">
					<view class="">
						评价内容
					</view>
					<uni-easyinput type="textarea" class="mt-3" v-model="textarea" placeholder="请输入内容"></uni-easyinput>
					<view class="mt-3">
						<view class="example-body">
							<uni-file-picker limit="9" title=""></uni-file-picker>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 售后 -->
		<uni-popup ref="popupAfter" background-color="#fff" borderRadius="0.5rem 0.5rem 0px 0px">
			<view class="bgF9 p-4 overflowAuto" style="height:65vh">
				<view class="fiexdTop">
					<view class="w-4"></view>
					<view class="text16">
						售后
					</view>
					<view class="" @click="closeAfter">
						<uni-icons type="closeempty" size="20"></uni-icons>
					</view>
				</view>
				<view class="h-8"></view>
				
				<!--  -->
				<view class="text12 bg-whilt p-3 mt-3">
					<view class="flex justify-between">
						<text>售后原因</text>
						<text>请填写售后原因</text>
					</view>
					<uni-easyinput type="textarea" class="mt-3" v-model="textarea" placeholder="请输入内容"></uni-easyinput>
					<view class="mt-3">
						<view class="example-body">
							<uni-file-picker limit="9" title=""></uni-file-picker>
						</view>
					</view>
				</view>
				<!--  -->
				<view class="text12 bg-whilt p-3 mt-3">
					<view class="flex justify-between">
						<text>售后方式</text>
					</view>
					<view class="flex text14 justify-between text-center col999 mt-3">
						<view class="py-2 w6 rending1 bgF2F col486 border486">退货退款</view>
						<view class="py-2 w6 rending1 bgF9">退款</view>
						<view class="py-2 w6 rending1 bgF9">换货</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 支付弹窗 -->
		<uni-popup ref="popupPay" background-color="#fff" borderRadius="0.5rem 0.5rem 0.5rem 0.5rem">
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
	</view>
</template>

<script>
	import hearch from "@/components/hearch/index.vue"
	import orderStatus from "@/components/orderStatus/index.vue"
	import {
		getUserOrderList,//lsit
		deleteOrder,//del
		payOrder,//pay]
		applyAfterSale,//售后
		evaluateOrder,//评价
	} from '@/request/api.js'
	export default {
		components: {
			hearch,
			orderStatus
		},
		data() {
			return {
				active: false,
				value: '',
				chenkIndex: 2,
				textarea: '',
				tabsList: [{
						id: 1,
						text: '全部'
					},
					{
						id: 2,
						text: '待付款'
					},
					{
						id: 3,
						text: '进行中'
					},
					{
						id: 4,
						text: '待评价'
					},
					{
						id: 5,
						text: '已完成'
					},
					{
						id: 6,
						text: '退款/售后'
					}
				]
			};
		},
		onLoad() {},
		onShow() {

		},
		created(){
			this._getUserOrderList()
		},
		onHide() {},
		methods: {
			// 关闭支付结果
			close() {
				this.$refs.popup.close()
			},
			// 去支付
			handleToPay(item){
				console.log('支付',item);
				// 调用支付
				payOrder({
					post_params: {
						order_id: '', //订单id
					}
				}).then((res) => {
					this.weixinPay(res)
				})
			},
			// 调用微信支付
			weixinPay(item) {
				console.log('调用微信支付', item);
				// 结果查询
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popupPay.open('center')
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
			_getUserOrderList(status){
				getUserOrderList({
					post_params:{
						currentPage:'',
						perPage:'',
						status:'',//a待付款 b进行中 c待评价 d已完成 e售后  
					}
				}).then((res)=>{
					console.log('订单数据',res);
				})
			},
			handleItem(id) {
				this.chenkIndex = id
			},
			// 关闭
			close() {
				this.$refs.popup.close()
			},
			// 弹框
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			// 关闭
			closeAfter() {
				this.$refs.popupAfter.close()
			},
			// 弹框
			toggleAfter(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popupAfter.open(type)
			},

// 关闭
			close() {
				this.$refs.popup.close()
			},
			// 弹框
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},		
			handleUrl(url) {
				console.log(url);
				uni.navigateTo({
					url: url + ''
				})
			}
		}
	};
</script>

<style>

</style>