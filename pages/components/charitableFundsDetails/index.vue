<template>
	<view class="">
		<hearchItem :isLeft="true" :title="'慈善基金详情'" />
		<swiperItemsTwo :isBottom="false" :swiperList="fundDetails.images" />
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
			<view v-if="!typeLog">
				<view v-if="fundDetails.use_log">
					<view class="p20 mt20 border205D57 radius20 flex justify-between items-center"
						v-for="item in fundDetails.use_log.slice(0,3)" :key="item.name">
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
			</view>
			<view v-else>
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

			<view class="text-center mt20 colD6B07A " @click="handleLog">
				{{typeLog?'收起':'查看更多'}}
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
				<view class="bg-white">
					<view class="grid grid-cols-3  items-center p35 border-bottom-dotted">
						<view class=""></view>
						<view class="text30 font-bold text-center col205D57">捐助</view>
						<view class="text-right">
							<uni-icons type="closeempty" size="26" color="#205D57" @click="close"></uni-icons>
						</view>
					</view>
					<cardFundsThree :itemObj="fundDetails" />
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
		<!-- 证书 -->
		<uni-popup ref="popupJK" type="bottom" border-radius="10px 10px 0 0">
			<view class="">
				<view class="flex justify-between">
					<view class="w15"></view>
					<uni-icons type="closeempty" @click="()=>{$refs.popupJK.close()}" color="#fff"
						size="30"></uni-icons>
				</view>
				<view class="mt10">
					<canvas id="my-canvas" canvas-id="my-canvas" disable-scroll="true"
						style="width: 320px; height: 470px;"></canvas>
				</view>
				<view class="flex mt20">
					<view @click="handBC" class="text-center col-white font-bold px20 py10 mx-auto"
						style="border: 1px solid white;">
						保存图片</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue'
	import swiperItemsTwo from '@/components/swiperItems/index_two.vue'
	import cardFundsThree from '@/components/card_funds/index_three.vue'
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
			cardFundsThree
		},
		data() {
			return {
				indexItem: 1,
				form: {
					name: '',
					money: ''
				},
				funds_id: '',
				fundDetails: {},

				typeLog: false, //false查看更多 true收起
				orderItem: {}

			}
		},
		onLoad(option) {
			//获取手机状态栏高度
			// this.funds_id = option.funds_id
			if(option.id){
				this.funds_id = option.id
			}else{
				this.funds_id = option.funds_id
			}
		},
		onReady() {
			this._getDonateDetail()
			// this.$refs.popupJK.open('center')
			// this.generateImage()//绘图
		},
		watch: {},
		methods: {
			handleLog() {
				this.typeLog = !this.typeLog
			},
			handleCol() {
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
				if (this.form.money > 0) {
					joinDonate({
						post_params: {
							donate_id: this.funds_id,
							name: this.form.name,
							money: this.form.money,
						}
					}).then((res) => {
						console.log('捐款结束', res.data.data);
						this.weixinPay(res.data.data.pay_data)
						this.orderItem = res.data.data.order
						this.$store.commit('configInfo')
					})
				} else {
					uni.showToast({
						title: '捐款金额大于0!',
						icon: 'error',
						duration: 1000
					});
				}

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
					paySign: item.paySign, // 签名
					success: function(res) {
						console.log('支付成功', res);
						that.close()
						that._getDonateDetail()
						uni.showToast({
							title: '捐款成功!',
							icon: 'success',
							duration: 1000
						});

						that.$refs.popupJK.open('center')
						that.generateImage() //绘图

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
			},

			generateImage() {
				uni.showLoading({
					title: '加载中'
				});
				const _this = this
				uni.downloadFile({
					url: 'https://api.qwcsh.com/uploads/resource/goods/20241115/698134944626510497.jpg',
					success(res) {
						console.log('1122', _this.orderItem.donate_name);
						const ctx = uni.createCanvasContext('my-canvas')
						ctx.drawImage(res.tempFilePath, 0, 0, 320, 470)
						// 设置文字样式
						ctx.setFontSize(12);
						ctx.setFillStyle('#898b8b'); // 
						ctx.fillText(_this.orderItem.code + '', 153, 134); //编号 
						ctx.setFontSize(14);
						ctx.setFillStyle('#000000'); // 
						ctx.fillText(_this.orderItem.name + '', 98, 173); //名字
						ctx.setFontSize(14);
						ctx.setFillStyle('#000000'); // 
						ctx.fillText(_this.orderItem.donate_name, 110, 282); //项目
						ctx.setFontSize(14);
						ctx.setFillStyle('red'); // 
						ctx.fillText(_this.orderItem.money + ' 元', 110, 311); //金额
						ctx.setFontSize(9);
						ctx.setFillStyle('#000000'); //  create_time
						ctx.fillText(_this.orderItem.create_time + '', 214, 412); //日期 
						ctx.draw() //生成
						// 绘制完成后生成图片
						ctx.draw(true, () => {
							console.log('11');
							uni.hideLoading()
						});
					}
				})

			},
			handBC() {
				uni.showLoading({
					title: '加载中'
				});
				// 保存
				uni.canvasToTempFilePath({
					canvasId: 'my-canvas',
					success: (res) => {
						console.log('生成的图片路径:', res.tempFilePath);
						uni.getImageInfo({
							src: res.tempFilePath,
							success: function(image) {
								/* 保存图片到手机相册 */
								uni.saveImageToPhotosAlbum({
									filePath: image.path,
									success: function() {
										uni.hideLoading()
										uni.showModal({
											title: '保存成功',
											content: '图片已成功保存到相册',
											showCancel: false
										});
									},
									complete(res) {
										uni.hideLoading()
										console.log(res);
									}
								});
							}
						});
					},
					fail: (err) => {
						console.error('生成图片失败:', err);
					},
				});
			},
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