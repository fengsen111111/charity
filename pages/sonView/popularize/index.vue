<template>
	<view class="">
		<hearch :title="'推广员收益'" :isLeft="true" />
		<view class="p-3">
			<view class="flex justify-between cardIncome rending1 p-3">
				<view class="text12">
					<view class="col666 flex">
						<view class="">累计收益</view>
						<view class="space-x-2">88888888</view>
					</view>
					<view class="col666 flex">
						<view class="">推荐人数</view>
						<view class="space-x-2">88888888</view>
					</view>
					<view class="flex items-center mt-2">
						<view class="col666">可提现收益</view>
						<view class="col486 space-x-2 text16">88888888</view>
					</view>
				</view>
				<image src="@/static/my/cardCenIcon.png" mode="" class="imageCen"></image>
				<view class="space-x-6 text-center">
					<image src="@/static/my/QRcode.png" mode="" class="imageIcon" @click="toggle('center')"></image>
					<view class="col666 text10 ling0 mt-1">
						推广二维码
					</view>
					<view class="bg486 text-whlie text12 px-4 rending4 mt-4"
						@click="handleUrl('/pages/sonView/payouts/index')">
						提现
					</view>
				</view>
			</view>
			<view class="h-2"></view>
			<view class="p-4 bg-whilt mt-1 rending1 flex justify-between"
				@click="handleUrl('/pages/sonView/team/index')">
				<view class="text14">我的团队</view>
				<uni-icons type="right" color="#666666" size="18"></uni-icons>
			</view>
			<view class="p-4 bg-whilt mt-1 rending1 flex justify-between"
				@click="handleUrl('/pages/sonView/earnings/index')">
				<view class="text14">收益明细</view>
				<uni-icons type="right" color="#666666" size="18"></uni-icons>
			</view>
		</view>
		<!-- 二维码 -->
		<uni-popup ref="popup" background-color="#fff" borderRadius="0.5rem 0.5rem 0.5rem 0.5rem">
			<view class="bgF9 p-4 overflowAuto rending2" style="width: 17rem;">
				<view class="flex justify-between">
					<view class="w-4"></view>
					<view class="text16">
						推广二维码
					</view>
					<view class="" @click="close">
						<uni-icons type="closeempty" size="20"></uni-icons>
					</view>
				</view>
				<view class="p-3">
					<image src="@/static/my/QRcodePup.png" mode="" class="w-full rending1"></image>
				</view>
				<view class="mt-3 text-center col486" @click="handleSure">
					保存到手机
				</view>
				<!-- 留白 -->
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import hearch from "@/components/hearch/index.vue"
	export default {
		data() {
			return {
				active: false
			};
		},
		components: {
			hearch
		},
		onLoad() {},
		onShow() {

		},
		onHide() {},
		methods: {
			handleUrl(url) {
				console.log(url);
				uni.navigateTo({
					url: url + ''
				})
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
			handleSure() {
				uni.downloadFile({
					url: 'https://imgos.cn/2024/08/12/66b9d67b2c357.png',
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: "保存成功",
										icon: "none"
									});
								},
								fail: function() {
									uni.showToast({
										title: "保存失败，请稍后重试",
										icon: "none"
									});
								}
							});
						}
					}
				})

			}
		}
	};
</script>

<style>
	.cardIncome {
		background: #F2F3FF;
		box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.2);
	}

	.imageCen {
		width: 120rpx;
		height: 120rpx;
		margin-left: 1rem;
	}

	.imageIcon {
		width: 1.5rem;
		height: 1.5rem;
	}
</style>