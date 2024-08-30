<template>
	<view class="">
		<!-- card -->
		<!-- -->
		<view class="bg-whilt mt-3 rending2" v-for="item in dataList" :key="item.id">
			<view class="flex justify-between items-center p-3"  @click.stop="handleUrl('/pages/sonView/myOrderDetails/index')">
				<view class="">订单编号:{{item.order_num}}</view>
				<!-- // :a待付款(可取消)  b待抢单(可售后) c配送中(可售后,联系骑手) d已完成，待评价(可评价，售后)  e已评价/已售后 -->
				<view class="  px-2 rending1 ling5"
					:class="item.status=='c'?'check_c':item.status=='e'?'check_e':'check_a'">
					{{ item.status | statusItem}}</view>
			</view>
			<view class="bg999 w-full heighe1"></view>
			<view class="p-3">
				<view class="flex">
					<view class="">{{item.user_name}}</view>
					<view class="">{{item.user_mobile}}</view>
				</view>
				<view class="">{{item.user_address}}</view>
			</view>
			<view class="bg999 w-full heighe1"></view>
			<view class="p-3">
				<view class="flex justify-between">
					<view class="">商品信息</view>
					<view v-if="shopInfoShow" class="col486 items-center flex" @click="handleDownUp()">
						收起<uni-icons type="up" size="16" color="#4867CF"></uni-icons>
					</view>
					<view v-else class="col486 items-center flex" @click="handleDownUp()">
						展开<uni-icons type="down" size="16" color="#4867CF"></uni-icons>
					</view>
				</view>
				<!-- 展开商品文件 -->
				<view v-if="shopInfoShow">
					<view class="flex justify-between items-center px-3 pt-3" v-for="iss in item.goods_list" :key="iss">
						<image src="https://img.picui.cn/free/2024/08/16/66bf135fa40a3.png"
							style="width: 100rpx;height: 100rpx;" mode=""></image>
						<view class="uni-ml-5">
							<view class="w300rpx">{{iss.goods_name}}</view>
							<view class="col999">规格 <text>{{iss.volume}}ml*{{iss.size_number}}</text></view>
						</view>
						<view class="uni-ml-5">
							<view class="text16">X {{iss.number}}</view>
							<view class="col999">冰冻<text class="uni-ml-2">{{iss.ice_number}}</text></view>
						</view>
					</view>
				</view>
				<!-- // :a待付款(可取消)  b待抢单(可售后) c配送中(可售后,联系骑手) d已完成，待评价(可评价，售后)  e已评价/已售后 -->
				<view>
					<!-- 待付款a -->
					<view class="flex justify-between items-center mt-3" v-if="item.status == 'a'">
						<view class="flex items-center">
							<view class="col666">实付金额</view>
							<view class="text16 colED1 space-x-2">￥{{item.pay_price}}</view>
						</view>
						<view class="bg486 text14 rending5 text-whlie py-2 w6 text-center"
							@click.stop="handleToPay(item)">去支付</view>
					</view>
					<!-- 进行中c -->
					<view class="flex justify-between items-center mt-3" v-else-if="item.status == 'c'">
						<view class="flex w5"></view>
						<view class="bgEBA text14 rending5 text-whlie py-2 w6 text-center" @click.stop="handleToShop">
							再来一单</view>
						<view class="bg68B text14 rending5 text-whlie py-2 w6 text-center"
							@click.stop="handlePhone(item)">联系骑手</view>
					</view>
					<!-- 待评价d -->
					<view class="flex justify-between items-center mt-3" v-else-if="item.status == 'd'">
						<view class="bgEBA text14 rending5 text-whlie py-2 w6 text-center" @click.stop="handleToShop">
							再来一单</view>
						<view @click="toggle('bottom')" class="bgFC6 text14 rending5 text-whlie py-2 w6 text-center">
							立即评价</view>
						<view @click="toggleAfter('bottom')"
							class="bg486 text14 rending5 text-whlie py-2 w6 text-center">申请售后</view>
					</view>
					<!-- 已完成e -->
					<view class="flex justify-between items-center mt-3" v-else-if="item.status == 'e'">
						<view class="flex w5"></view>
						<view class="bgEBA text14 rending5 text-whlie py-2 w6 text-center" @click.stop="handleToShop">
							再来一单</view>
						<view @click="toggleAfter('bottom')"
							class="bg486 text14 rending5 text-whlie py-2 w7 text-center">申请售后</view>
					</view>
					<!-- 售后 -->
					<view class="flex justify-between items-center mt-3">
						<view class="flex w5"></view>
						<!-- a未申请 b售后中  c换货  d退货退款 e退款 z售后关闭   -->
						<view v-if="item.after_sale_status == 'b'"
							class="bgF2F text14 rending5 col999 py-2 w6 text-center">售后中</view>
						<view v-else-if="item.after_sale_status == 'c'"
							class="bgF2F text14 rending5 col999 py-2 w6 text-center">已换货</view>
						<view v-else-if="item.after_sale_status == 'd'"
							class="bgF2F text14 rending5 col999 py-2 w6 text-center">已退货退款</view>
						<view v-else-if="item.after_sale_status == 'e'"
							class="bgF2F text14 rending5 col999 py-2 w6 text-center">已退款</view>
						<view v-else-if="item.after_sale_status == 'z'"
							class="bg486 text16 rending5 text-whlie py-2 w7 text-center">售后关闭</view>
						<view class="flex w5"></view>
					</view>
				</view>
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
	import {
		deleteOrder, //del
		payOrder, //pay
		applyAfterSale, //售后
		evaluateOrder, //评价
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
		props: {
			dataList: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				value: '',
				shopInfoShow: false, //打开 关闭
			};
		},
		onLoad() {},
		onShow() {

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
			handleUrl(url) {
				console.log(url);
				uni.navigateTo({
					url: url + ''
				})
			},
			// 商品信息展示隐藏
			handleDownUp() {
				this.shopInfoShow = !this.shopInfoShow
			},
			// 上传 ---------------------------------------------------------------
			async handleSelect(res) {
				await this.uploadImg(res.tempFilePaths, 1);
			},
			async uploadImg(tempFilePaths, token) {
				if (!tempFilePaths.length) return; //如果没有选择图片就退出
				//循环选择图片的张数
				tempFilePaths.map(async () => {
					const path = tempFilePaths.pop();
					//因为我这个后台给的接口一次只能上传一张图片，所以每循环一次就调用接口上传一次
					const [err, {
						data
					}] = await uni.uploadFile({
						url: 'https://localhost/file/api/uploadtemp', //后台地址
						filePath: path,
						name: 'file',
						formData: {
							'user': 'test'
						},
					});
					//因为async返回的是个promise对象，所以要把返回的数据转为对象格式。
					let dataObj = JSON.parse(data)
					//每循环一次就把后台返回的图片地址添加到filePathsList数组
					this.filePathsList.push({
						url: dataObj.data,
						name: ""
					})
				})
				console.log('filePathsList', this.filePathsList);
				this.uploadImg(tempFilePaths, token);
			},
			handleDelete(err) { // 删除图片
				const num = this.filePathsList.findIndex(v => v.url === err.tempFilePath);
				this.filePathsList.splice(num, 1);
			},
			// 上传 end ---------------------------------------------------------------
		}
	};
</script>

<style>
	.heighe1 {
		height: 1rpx;
	}

	.check_a {
		color: #ED1805;
		border: 1rpx solid #ED1805;
	}

	.check_c {
		color: #68BF7B;
		border: 1rpx solid #68BF7B;
	}

	.check_e {
		color: #4867CF;
		border: 1rpx solid #4867CF;
	}

	.w300rpx {
		width: 300rpx
	}
</style>