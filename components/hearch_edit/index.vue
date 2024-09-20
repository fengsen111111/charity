<template>
	<view class="">
		<view class="">
			<!-- 自定义导航栏 -->
			<view class="navBarBox">
				<!-- 真正的导航栏内容 -->
				<view class="navBar">
					<view class="">
						<!-- 状态栏占位 -->
						<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
						<view class="text30 text-center pt20">
							{{title}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				image: 'https://img.picui.cn/free/2024/09/18/66ea43fe1407e.png',
				time: 1,
				// 状态栏高度
				statusBarHeight: 0,
				timer: '', //计时器
			}
		},
		created() {
			//获取手机状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
			console.log(this.statusBarHeight);
		},
		mounted() {

		},
		watch: {},
		methods: {

		}
	}
</script>

<style>
	.navBarBox {}

	.navBarBox .statusBar {}

	.navBarBox .navBar {
		padding-bottom: 20rpx;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		color: #fff;
		background: linear-gradient(90deg, #174437 0%, #225F43 100%);
	}
</style>