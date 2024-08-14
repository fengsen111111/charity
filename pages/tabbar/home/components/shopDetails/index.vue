<template>
	<view class="">
		<hearch :title="'商品详情'" :isLeft="true" />
		<!-- img -->
		<swiper class="swiper-box" @change="change" :current="swiperDotIndex">
			<swiper-item v-for="(item, index) in 3" :key="index">
				<view class="swiper-item">
					<image src="https://imgos.cn/2024/08/12/66b9d71baf094.png" @click="preview" mode=""
						class="w-full h20"></image>
				</view>
			</swiper-item>
		</swiper>
		<!--  -->
		<view class="px-3">
			<!--  -->
			<view class="flex justify-between">
				<!-- left -->
				<view class="">
					<view class="mt-3 flex">
						<view class="colED1 fontBold space-x-1">￥<text class="text24">1888</text>.8</view>
						<view class="space-x-2 col999 mt-1 textDel">
							￥8888
						</view>
					</view>
					<view class="flex mt-2">
						<view class="bgED1 py-1 ling1 w-6 px-2  text10 text-whlie text-center">
							6.2折
						</view>
						<view class="colED1 text11 ling1 borTag pt-1 px-2">
							均价：6.88元/瓶
						</view>
					</view>
				</view>
				<!-- right -->
				<view class="bgIcon text10 text-whlie text-center " @click="toggle('bottom')">
					<text>领取优惠券</text>
				</view>
			</view>
			<!-- text -->
			<view class="mt-3 fontBold text16">
				五粮液股份 五粮春二代菁萃浓香型52550ml单瓶优级酒
			</view>
			<view class="mt-3 col999 text11 ling4">
				五粮春菁萃版52度550ml单瓶装五粮春菁萃版52度550ml单瓶装五粮春菁萃版52度550ml单瓶装五粮春菁萃版52度550ml单瓶装五五粮春菁萃版春菁...
			</view>
			<view class="flex justify-between">
				<view class=""></view>
				<view class="text11 col486 flex">
					展开
					<uni-icons type="down" size="12" color="#4867CF"></uni-icons>
				</view>
			</view>
			<!-- card 规格-->
			<ruleItem>
				<!-- 参数 -->
				<view class="grid grid-cols-3 text-center bgF9 p-2 mt-4">
					<view class="">
						<view class="col666 text11">品牌</view>
						<view class=" fontBold text14">五粮春</view>
					</view>
					<view class="borderLeftRight">
						<view class="col666 text11">产地</view>
						<view class=" fontBold text14">中国</view>
					</view>
					<view class="flex items-center">
						<view class="space-x-6">
							<view class="col666 text11">酒精度</view>
							<view class=" fontBold text14">52%voI</view>
						</view>
						<uni-icons type="right" size="20" class="space-x-2" color="#666666"
							@click="togglePar('bottom')"></uni-icons>
					</view>
				</view>
			</ruleItem>
			<!--  -->
			<image src="@/static/home/strip.png" mode="" class="w-full h-6 mt-4"></image>
			<!--  -->
			<view class="bg-whilt rending1 fontBold items-center flex justify-between py-1 px-2">
				<view class="flex items-center">
					<uni-icons type="location" color="#666666" size="16"></uni-icons>
					<text class="space-x-1 text12">提供配送服务</text>
				</view>
				<view class="flex items-center">
					<uni-icons type="location" color="#666666" size="16"></uni-icons>
					<text class="space-x-1 text12">极速送达</text>
				</view>
				<view class="flex items-center">
					<uni-icons type="location" color="#666666" size="16"></uni-icons>
					<text class="space-x-1 text12">超时赔付</text>
				</view>
				<view class="flex items-center">
					<uni-icons type="location" color="#666666" size="16"></uni-icons>
					<text class="space-x-1 text12">正品保真</text>
				</view>
				<uni-icons type="more-filled" color="#666666" size="16" @click="toggleSer('bottom')"></uni-icons>
			</view>
			<!--  -->
			<view class="bg-whilt mt-3 rending1 p-3">
				<view class="flex text-black justify-between">
					<view class="">
						评价
					</view>
					<view class="flex text12">
						+9999w
						<uni-icons type="right" color="#000000" size="12"
							@click="handleItem('/pages/sonView/commentsAll/index')"></uni-icons>
					</view>
				</view>
				<!--  -->
				<comments />
				<comments />
				<!--  -->
			</view>
			<image src="https://pic.imge.cc/2024/08/12/66b9d6e61d2b7.png" mode="" class="w-full mt-3"></image>
			<!--  -->
			<!-- <view class="h20"></view> -->
		</view>
		<!-- 购物 -->
		<view class="gw flex justify-between">
			<view class="flex mt-3">
				<view class="text-center space-x-6">
					<image src="@/static/classify/serve.png" mode="" class="iconTwo"></image>
					<view class="text12 ling0 mt-1">客服</view>
				</view>
				<view class="text-center space-x-6">
					<image src="@/static/classify/shopping.png" mode="" class="iconTwo"></image>
					<view class="text12 ling0 mt-1">购物车</view>
				</view>
			</view>
			<!--  -->
			<view class="flex text-whlie text14">
				<view class="viewLeft bgFF8">
					加入购物车
				</view>
				<view class="viewRight bg486">
					立即购买
				</view>
			</view>
		</view>
		<!--  -->
		<!-- 优惠卷弹窗 -->
		<uni-popup ref="popup" background-color="#fff" borderRadius="0.5rem 0.5rem 0px 0px">
			<view class="bgF9 p-4 overflowAuto" style="height:60vh">
				<view class="fiexdTop">
					<view class="w-4"></view>
					<view class="text16">
						优惠卷
					</view>
					<view class="" @click="close">
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
					<volumeTag />
				</view>
				<!-- 留白 -->
				<view class="h-8"></view>
				<view class="h-4"></view>
			</view>
		</uni-popup>
		<!-- 服务弹窗 -->
		<uni-popup ref="popupServer" background-color="#fff" borderRadius="0.5rem 0.5rem 0px 0px">
			<view class="bgF9 p-4 overflowAuto" style="height:40vh">
				<view class="fiexdTop">
					<view class="w-4"></view>
					<view class="text16">
						服务说明
					</view>
					<view class="" @click="closeSer">
						<uni-icons type="closeempty" size="20"></uni-icons>
					</view>
				</view>
				<view class="h-6"></view>
				<view class="bg-whilt p-2 mt-3 rending1" v-for="item in [1,2,3]" :key="item">
					<view class="flex ">
						<uni-icons type="location" color="#666666" size="12"></uni-icons>
						<text class="space-x-1 text12">提供配送服务</text>
					</view>
					<view class="text11">
						商城向您保证所售商品均为正品行货，商品可开具正规发票。
					</view>
				</view>
				<!-- 留白 -->
				<view class="h-8"></view>
				<view class="h-4"></view>
			</view>
		</uni-popup>
		<!-- 参数弹窗 -->
		<uni-popup ref="popupPar" background-color="#fff" borderRadius="0.5rem 0.5rem 0px 0px">
			<view class="bgF9 p-4 overflowAuto" style="height:30vh">
				<view class="fiexdTop">
					<view class="w-4"></view>
					<view class="text16">
						商品参数
					</view>
					<view class="" @click="closePar">
						<uni-icons type="closeempty" size="20"></uni-icons>
					</view>
				</view>
				<view class="h-8"></view>
				<view class="h-2"></view>
				<view class="bg-whilt text12 p-3 rending2">
					<view class="grid grid-cols-5" v-for="item in [1,2,3,4,5,6]" :key="item">
						<view class="">
							<view class="">品牌</view>
						</view>
						<view class="">
							<view class="">五粮春</view>
						</view>
					</view>
				</view>
				<!-- 留白 -->
				<view class="h-8"></view>
				<view class="h-4"></view>
			</view>
		</uni-popup>
		<!-- 图片放大 -->
		<q-previewImage ref="previewImage" :urls="imgs" @onLongpress="onLongpress"></q-previewImage>
	</view>
</template>

<script>
	import hearch from '@/components/hearch/index.vue'
	import ruleItem from "@/components/ruleItem/index"
	import volumeTag from "@/components/volumeTag/index.vue"
	import comments from "@/components/comments/index.vue"
	export default {
		components: {
			hearch,
			ruleItem,
			volumeTag,
			comments
		},
		data() {
			return {
				type: 'center',
				imgs: [
					'https://imgos.cn/2024/08/12/66b9d71baf094.png',
					'https://imgos.cn/2024/08/12/66b9d67b2c357.png',
					'https://imgos.cn/2024/08/12/66b9d71baf094.png'
					],
				swiperDotIndex: 0
			};
		},
		onLoad() {},
		methods: {
			// 判断是否授权相册
			handleSure() {
				let that = this
				uni.authorize({
					/* scope.writePhotosAlbum 类型是保存到相册 */
					scope: 'scope.writePhotosAlbum',
					success() {
						/* 已授权进入 */
						/* 保存图片到相册方法方法 */
						that.imgApi('https://imgos.cn/2024/08/12/66b9d67b2c357.png');
					},
					fail(res) {
						uni.showToast({
							title: "保存失败，请确认相册权限是否打开！",
							icon: "none"
						});
					}
				});
			},
			// 保存图片
			imgApi(image) {
				uni.showLoading({
					title: "正在保存中"
				})
				/* 获取图片的信息 */
				uni.getImageInfo({
					src: image,
					success: function(image) {
						/* 保存图片到手机相册 */
						uni.saveImageToPhotosAlbum({
							filePath: image.path,
							success: function() {
								uni.showToast({
									title: "保存成功",
									icon: "none"
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
			onLongpress(e) { //长按事件
		    	const _this = this
				// console.log('当前长按的图片是' + e);
				uni.showActionSheet({
					itemList: ['保存到手机'],
					success: function(res) {
						// console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						_this.handleSure()
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			change(e) {
				this.current = e.detail.current
			},
			clickItem(e) {
				this.swiperDotIndex = e
			},
			handleTemper(index) {
				this.temperatureIndex = index
			},
			handleDown() {
				this.number--
			},
			handleUp() {
				this.number++
			},
			// 跳转
			handleItem(url) {
				console.log(url);
				uni.navigateTo({
					url: url + ''
				})
			},
			// imgBig
			preview(url) {
				console.log(url);
				// #ifdef MP-WEIXIN
				this.$nextTick(() => {
					this.$refs.previewImage.open('https://imgos.cn/2024/08/12/66b9d67b2c357.png'); // 传入当前选中的图片地址(小程序必须添加$nextTick，解决组件首次加载无图)
				})
				// #endif
				// #ifndef MP-WEIXIN
				this.$refs.previewImage.open('https://imgos.cn/2024/08/12/66b9d67b2c357.png'); // 传入当前选中的图片地址
				// #endif
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
			closeSer() {
				this.$refs.popupServer.close()
			},
			// 弹框
			toggleSer(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popupServer.open(type)
			},
			// 关闭
			closePar() {
				this.$refs.popupPar.close()
			},
			// 弹框
			togglePar(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popupPar.open(type)
			},
		}
	};
</script>

<style>
	.swiper-box {
		height: 20rem;
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #fff;
	}

	.borderLeftRight {
		border-left: 1px solid #999999;
		border-right: 1px solid #999999;
	}

	.specs {
		width: 2.5rem;
		height: 2.5rem;
	}

	.bgIcon {
		background-image: url('@/static/home/shopDetailIcon.png');
		background-size: 100% 100%;
		width: 3.5rem;
		padding-top: 100rpx
	}

	.borTag {
		border: 1px solid #ED1805;
	}

	.viewLeft {
		width: 4.5rem;
		padding: 0.5rem;
		border-radius: 1.5rem 0px 0px 1.5rem;
		height: 2rem;
		margin-top: 0.325rem;
		line-height: 2rem;
	}

	.viewRight {
		width: 4.5rem;
		padding: 0.5rem;
		border-radius: 0px 1.5rem 1.5rem 0px;
		height: 2rem;
		margin-top: 0.325rem;
		line-height: 2rem;
		margin-right: 1rem;
	}

	.iconTwo {
		width: 1.25rem;
		height: 1.25rem;
	}

	.gw {
		height: 3.75rem;
		background-color: #fff;
		position: fixed;
		top: 91.5vh;
		/* border: 1px solid red; */
		width: 100%;
	}
</style>