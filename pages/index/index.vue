<template>
	<view class="">
		<image :src="image" class="imgWH" mode=""></image>
		<view class="fixed top0 left36">
			<!-- 自定义导航栏 -->
			<view class="navBarBox">
				<!-- 真正的导航栏内容 -->
				<view class="navBar">
					<view class="bgMyImg">
						<!-- 状态栏占位 -->
						<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
						<view class="timeout text30 text-center">
							{{time}} 秒
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
				image: '',
				time: 5,
				// 状态栏高度
				statusBarHeight: 0,
				timer: '', //计时器
			}
		},
		onLoad() {
			//获取手机状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
			const _this = this
			setTimeout(()=>{
				_this.image = _this.$store.state.config.open_image?_this.$store.state.config.open_image:''
				// console.log('开平动画',_this.$store.state.config.open_image,_this.imgae)
			},1000)
		},
		mounted() {
			this.timer = setInterval(() => {
				this.time = this.time - 1
			}, 1000);
		},
		watch:{
			time(newVal,oldVal){
				// console.log('newVal',newVal);
				if(newVal==0){
					clearInterval(this.timer);
					uni.navigateTo({
						url:'/pages/home/index'
					})
				}
			}
		},
		methods: {

		}
	}
</script>

<style>
	.classifySearch {
		display: flex;
		font-size: 26rpx;
		height: 2rem;
		width: 300rpx;
		background-color: white;
		border-radius: 60rpx;
		margin-left: 0.75rem;
		align-items: center;
		line-height: 2rem;
		padding: 0px 20rpx;
	}

	.navBarBox {}

	.navBarBox .statusBar {}

	.navBarBox .navBar {
		padding-bottom: 20rpx;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		color: #fff;
	}

	.navBarBox .navBar .logo {
		width: 82rpx;
		height: 82rpx;
		margin-right: 10rpx;
	}

	.imgWH {
		width: 100vw;
		height: 99.5vh
	}

	.timeout {
		background-image: url('@/static/boxImg.png');
		background-size: 100% 100%;
		width: 120rpx;
		height: 60rpx;
		color: #4B4B4B;
		line-height: 60rpx;
	}
</style>