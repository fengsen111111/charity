<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="navBarBox">
			<!-- 真正的导航栏内容 -->
			<view class="navBar">
				<view class="bgMyImg">
					<!-- 状态栏占位 -->
					<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
					<view class=" text-whlie text18 items-center grid grid-cols-3  px-3">
						<view class="text-left">
							<uni-icons type="left" size="30" color="#D7D9EC" @click="handleLeft"></uni-icons>
						</view>
						<view class="text-center">{{title}}</view>
						<view class="">
						</view>
					</view>
					<slot></slot>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		props:{
			title:''
		},
		data() {
			return {
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
	handleLeft(){
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
	}
	
	.navBarBox .navBar .logo {
		width: 82rpx;
		height: 82rpx;
		margin-right: 10rpx;
	}
	
	.bgMyImg {
		color: #fff;
		background-image: url('@/static/home/volumeBg.png');
		background-size: 100% 100%;
		height: 12rem;
		width: 100%;
	}
</style>