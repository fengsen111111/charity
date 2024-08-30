<template>
	<view class="">
		<hearch :title="'订单详情'" :isLeft="true" />
		<view class="p-3 text12">
			<!-- card -->
			<view>
				<view class="bg-whilt rending2 p-3 mt-3 text14">
					<view class="text12">订单信息</view>
					<view class="flex justify-between my-2">
						<view class="">订单编号 </view>
						<view class="">{{dataInfo.order_num}} </view>
					</view>
					<view class="flex justify-between my-2">
						<view class="">实付金额 </view>
						<view class="colED1">￥{{dataInfo.pay_price}} </view>
					</view>
					<view class="flex justify-between my-2">
						<view class="">优惠金额 </view>
						<view class="colED1">￥{{dataInfo.preferential_price}} </view>
					</view>
					<view class="flex justify-between my-2">
						<view class="">订单状态 </view>
						<view class="">{{dataInfo.status | statusItem}} </view>
					</view>
				</view>
				<!-- 备注 -->
				<view class="bg-whilt rending2 p-3 mt-3 text14">
					<view class="text12">备注</view>
					<view class="my-2 col999 indent1">{{dataInfo.remark}}</view>
				</view>
				<!-- 地址信息 -->
				<view class="bg-whilt rending2 p-3 mt-3 text14">
					<view class="text12">地址信息</view>
					<view class="flex my-2">
						<view class="">{{dataInfo.user_name}} </view>
						<view class="space-x-4">{{dataInfo.user_mobile}} </view>
					</view>
					<view class="">{{dataInfo.user_address}}</view>
				</view>
				<!-- 商品信息 -->
				<view class="bg-whilt rending2 p-3  mt-3 text14">
					<view class="text12">商品信息</view>
					<view>
						<view class="rending2 mt-3 bg-whilt">
							<shopCard></shopCard>
						</view>
					</view>
				</view>
				<view v-if="dataInfo.status=='e'">
					<!-- 评价 -->
					<view class="bg-whilt rending2 p-3 mt-3 text14 flex justify-between">
						<view class="text12">评价</view>
						<view class="text12 col486">
							{{dataInfo.evaluate_level=='a'?'好评':dataInfo.evaluate_level=='b'?'中评':'差评'}}</view>
					</view>
					<!-- 评价内容 -->
					<view class="bg-whilt rending2 p-3 mt-3 text14">
						<view class="text12">评价内容</view>
						<view class="col999 indent1">{{dataInfo.evaluate_content}}</view>
					</view>
				</view>
				<view v-else-if="dataInfo.status=='e'">
					<!-- 售后原因 -->
					<view class="bg-whilt rending2 p-3 mt-3 text14">
						<view class="text12">售后原因</view>
						<view class="col999 my-2 indent1">{{dataInfo.after_sale_content}}</view>
					</view>
					<!--  -->
					<view class="bg-whilt rending2 p-3 mt-3 text14 flex justify-between">
						<view class="text12">售后方式</view>
						<view class="text12 col666">
							{{dataInfo.after_sale_type=='a'?'退货退款':dataInfo.after_sale_type=='b'?'退款':'换货'}}</view>
					</view>
				</view>
				<!--  -->
				<view class="h-8"></view>
				<view class="h-8"></view>
			</view>
		</view>
		<!-- 订单状态:a待付款(可取消)  b待抢单(可售后) c配送中(可售后,联系骑手) d已完成，待评价(可评价，售后)  e已评价/已售后  -->
		<!-- 待支付 a -->
		<view class="pendingView flex justify-between p-3" v-if="status==1">
			<view class="text-center"  @click="_deleteOrder()">
				<uni-icons type="trash" size="24" color="#FC6265"></uni-icons>
				<view class="colED1 text12 ling1">删除订单</view>
			</view>
			<view class="flex items-center">
				<view class="col666 text14">实付金额</view>
				<view class="colED1 space-x-2 text18">￥100</view>
				<view class="bg486 space-x-2 rending5 text-whlie py-2 threeViewW text-center" @click.stop="handleToPay(item)">
					去支付
				</view>
				<view class="w-6"></view>
			</view>
		</view>
		<!-- 进行中 c -->
		<view class="pendingView flex justify-between p-3" v-else-if="status==2">
			<view class="text-center">
			</view>
			<view class="flex items-center">
				<view class="bgEBA space-x-2 rending5 text-whlie py-2 threeViewW text-center" @click="handleToShop()">
					再来一单
				</view>
				<view class="bg68B space-x-2 rending5 text-whlie py-2 threeViewW text-center"
					@click.stop="handlePhone()">
					联系骑手
				</view>
				<view class="w-6"></view>
			</view>
		</view>
		<!-- 待评价 d-->
		<view class="pendingView flex justify-between p-3" v-else-if="status==3">
			<view class="text-center"  @click="_deleteOrder()">
				<uni-icons type="trash" size="24" color="#FC6265"></uni-icons>
				<view class="colED1 text12 ling1">删除订单</view>
			</view>
			<view class="flex items-center">
				<view class="bgEBA space-x-2 rending5 text-whlie py-2 threeViewW text-center" @click="handleToShop()">
					再来一单
				</view>
				<view class="bgFC6 space-x-2 rending5 text-whlie py-2 threeViewW text-center" @click="toggle('bottom')">
					立即评价
				</view>
				<view class="bg486 space-x-2 rending5 text-whlie py-2 threeViewW text-center" @click="toggleAfter('bottom')">
					申请售后
				</view>
				<view class="w-6"></view>
			</view>
		</view> <!-- 订单状态:a待付款(可取消)  b待抢单(可售后) c配送中(可售后,联系骑手) d已完成，待评价(可评价，售后)  e已评价/已售后  -->
		<!-- 已完成 e -->
		<view class="pendingView flex justify-between p-3" v-else-if="status==4">
			<view class="text-center"  @click="_deleteOrder()">
				<uni-icons type="trash" size="24" color="#FC6265"></uni-icons>
				<view class="colED1 text12 ling1">删除订单</view>
			</view>
			<view class="flex items-center">
				<view class="bgEBA space-x-2 rending5 text-whlie py-2 threeViewW text-center" @click="handleToShop()">
					再来一单
				</view>
				<view class="bg486 space-x-2 rending5 text-whlie py-2 threeViewW text-center" @click="toggleAfter('bottom')">
					申请售后
				</view>
				<view class="w-6"></view>
			</view>
		</view>
		<!-- 售后中 -->
		<view class="pendingView flex justify-between p-3" v-else-if="status==5">
			<view class="text-center"  @click="_deleteOrder()">
				<uni-icons type="trash" size="24" color="#FC6265"></uni-icons>
				<view class="colED1 text12 ling1">删除订单</view>
			</view>
			<view class="flex items-center">
				<view class="bgF2F space-x-2 rending5 col999 py-2 threeViewW text-center">
					售后中
				</view>
				<view class="w-6"></view>
			</view>
		</view>

		<!--  -->
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
					<view class="mb-3">
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
					<view class="flex justify-between mb-3">
						<text>售后原因</text>
						<text>请填写售后原因</text>
					</view>
					<uni-easyinput type="textarea" class="mt-3" v-model="textarea" placeholder="请输入内容"></uni-easyinput>
					<view class="mt-3">
						<view class="example-body">
							<!-- <uni-file-picker limit="9" title="图片" @select="select"></uni-file-picker> -->
							<uni-file-picker v-model="filePathsList" :auto-upload="false" file-mediatype="image"
								mode="grid" fileMediatype="image" @select="handleSelect" @delete="handleDelete" />

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
				<view class="w-full bg486 text-whlie py-3 mt-3 rending1 text-center" @click="closePay">
					返回
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import hearch from "@/components/hearch/index.vue"
	import shopCard from '@/components/shopCard/index.vue'
	import {
		getUserOrderDetail,
		deleteOrder
	} from '@/request/api.js'
	export default {
		filters: {
			statusItem(value) {
				// :a待付款(可取消)  b待抢单(可售后) c配送中(可售后,联系骑手) d已完成，待评价(可评价，售后)  e已评价/已售后  
				if (value == 'a') {
					return '待付款'
				} else if (value == 'b') {
					return '待抢单'
				} else if (value == 'c') {
					return '配送中'
				} else if (value == 'd') {
					return '已完成'
				} else if (value == 'e') {
					return '退款/售后'
				} else {
					return '未知'
				}
			},
		},
		components: {
			hearch,
			shopCard
		},
		data() {
			return {
				active: false,
				value: '',
				chenkIndex: 2,
				textarea: '',
				status: 5, //状态
				option: {},
				dataInfo: {}

			};
		},
		onLoad(options) {
			console.log('options', options);
			this.option = options
		},
		onShow() {

		},
		created() {
			this._getUserOrderDetail()
		},
		onHide() {},
		methods: {
			handlePhone(item) {
				console.log('联系棋手');
				uni.makePhoneCall({
					phoneNumber: '113122313221',
					success: function() {
						console.log('拨号');
					},
					fail: function() {
						console.log('拨号失败！');
					}
				})
			},
			handleToShop() {
				console.log('再来一单');
				uni.navigateTo({
					url: '/pages/tabbar/shopping/index'
				})
			},
			// 详情
			_getUserOrderDetail() {
				getUserOrderDetail({
					post_params: {
						order_id: ""
					}
				}).then((res) => {
					console.log('订单详情', res);
					this.dataInfo = {
						"id": "1",
						"status": "a",
						"after_sale_status": "a",
						"delivey_status": "a",
						"create_time": "12:11:10",
						"order_num": "123123123123123",
						"user_name": "张三",
						"user_mobile": "14555667890",
						"user_address": "四川省成都市武侯区世纪城天府大道中段588号天天小区快鸟驿站",
						"distance": "1.1km",
						"remark": "第八代五粮液在传承并且凸显出了历代五粮液的独特风格的前提下，对第七代产品的适度更新和优化，整体包装更精致、更大气，体验更佳，更适应新时代消费者对高品质白酒的消费需求。",
						"pay_price": "12.33",
						"preferential_price": "2.33",
						"worker_mobile": "15666774545",
						"after_sale_type": "a", //售后类型：a退货退款 b退款 c换货  
						"after_sale_content": "售后描述售后描述售后描述售后描述售后描述",
						"after_sale_images": [], //售后图片  
						"evaluate_level": "a", //评价等级 a好评 b中评 c差评  
						"evaluate_content": "评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容",
						"evaluate_images": [],
						"goods_list": [{
							"goods_name": "",
							"taste_name": "",
							"cover_image": "",
							"volume": "",
							"size_number": "",
							"number": "",
							"ice_number": ""
						}]
					}
				})
			},
			// 删除
			_deleteOrder() {
				deleteOrder({
					post_params: {
						order_id: ''
					}
				}).then((res) => {
					console.log('删除成功', res);
				})
			},
			// ------------------------------------------------------------------
			// 关闭支付结果
			closePay() {
				this.$refs.popupPay.close()
			},
			// 去支付
			handleToPay(item) {
				console.log('支付', item);
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
			// -----------------------------------------------------------------
		}
	};
</script>

<style>
	.pendingView {
		position: fixed;
		bottom: 0px;
		width: 100%;
		background-color: #fff;
	}

	.threeViewW {
		width: 5.5rem;
	}
</style>