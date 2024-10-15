<template>
	<view class="">
		<image :src="image" class="imgWH" mode=""></image>
		<view class="fixed top0 left36">
			<!-- 自定义导航栏 -->
			<view class="navBarBox">
				<!-- 真正的导航栏内容 -->
				<view class="navBar">
					<view class="bgMyImg font-bold">
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
	import {
		loginAndRegister, //登陆注册
		wechatUserRegister, //授权
	} from '@/request/api.js'
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
				// console.log('开屏动画',_this.$store.state.config.open_image,_this.imgae)
			},1000)
			this.isLogin() // 自动授权
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
					if(uni.getStorageSync('token')){
						uni.navigateTo({
							url:'/pages/home/index'
						})
					}
				}
			}
		},
		methods: {
			// 授权
			isLogin() {
				uni.login({
					provider: 'weixin',
					success: res => {
						console.log(res)
						wechatUserRegister({
							post_params: {
								platform: "mini",
								code: res.code
							}
						}).then((res) => {
							this.info = res.data.data;
							console.log('数据', this.info);
							this.$store.commit('setAppid', this.info.mini_openid) //存入appid等
							this._loginAndRegister(this.info.mini_openid) //获取token
						})
					}
				});
			},
			// 获取token
			_loginAndRegister(item) {
				console.log('item',item);
				loginAndRegister({
					post_params: {
						openid: item,
					}
				}).then((res) => {
					console.log('token', res.data);
					this.$store.commit('setToken', res.data.data.token)
					uni.setStorageSync('token', res.data.data.token)
					this.$store.commit('loginStatus') //修改登录状态
				})
			},
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
		height: 75rpx;
		color: #4B4B4B;
		line-height: 75rpx;
	}
</style>