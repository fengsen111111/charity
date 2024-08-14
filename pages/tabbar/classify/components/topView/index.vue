<template>
	<view>
		<view>
			<!-- 自定义导航栏 -->
			<view class="navBarBox">
				<!-- 真正的导航栏内容 -->
				<view class="navBar">
					<view class="bgMyImg">
						<!-- 状态栏占位 -->
						<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
						<view class=" col999 flex items-center px-3" style="margin-top: 10rpx;">
							<uni-icons type="left" size="30" color="#D7D9EC" @click="handleLeft"></uni-icons>
							<uni-search-bar clearButton="none" class="h-8 space-x-3 uni-search-bar" radius="100" placeholder="输入搜索内容"
								cancelButton="none" @confirm="search" />
							</uni-section>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {

		data() {
			return {
				title: 'Hello',
				// 状态栏高度
				statusBarHeight: 0,
				// 导航栏高度
				navBarHeight: 82 + 11,
			}
		},
		created() {
			//获取手机状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
		},
		onLoad() {

		},
		methods: {
			handleLeft() {
				uni.navigateBack()
			}
		}
	}
</script>

<style>
	.navBarBox {}
	
	.navBarBox .statusBar {}
	
	.navBarBox .navBar {
		padding-bottom: 8rpx;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		color: #fff;
		background-image: url('@/static/my/topBg.png');
		background-size: 100% 100%;
	}
	
	.navBarBox .navBar .logo {
		width: 82rpx;
		height: 82rpx;
		margin-right: 10rpx;
	}
	.bgMyImg {
		color: #fff;
		background-image: url('@/static/my/topBg.png');
		background-size: 100% 100%;
		height: 10.5vh;
		width: 100%;
	}
	.ptTop{
	padding-top:6%
	}
</style>