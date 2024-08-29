<template>
	<view class="">
		<hearch :title="'授权登陆'" :isLeft='false' />

		<view class="text-center">
			<image src="@/static/home/logUser.png" mode="" class="imgUser"></image>
		</view>
		<view class="text-center py-3">
			快鹿送酒
		</view>
		<view class="h-8"></view>
		<view class="w80 mxAuto bg486 text-whlie rending1 py-3 text-center" @click="hqCode">
			登录
		</view>
		<view class="space-x-6 mt-4">
			<view class="space-x-6 flex items-center text12">
				<!-- <view class="rending4 bg486 w-4 h-4 space-x-2"></view> -->
				<uni-icons type="circle" @click="handleOk" v-if="isOk" color="#4867CF" size="20"></uni-icons>
				<uni-icons type="checkbox-filled" @click="handleOk" v-else color="#4867CF" size="20"></uni-icons>
				<view class="space-x-2">
					已知晓并同意<text class="col486">《隐私协议》</text>相关规定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import hearch from '@/components/hearch/index.vue'
	import {
		getUserRegister,
		getLoginAndRegister//token
	} from '@/request/api.js'
	export default {
		data() {
			return {
				active: false,
				isOk: true, //true 未勾选 false 已勾选
			};
		},
		components: {
			hearch
		},
		onLoad() {},
		created() {

		},
		onHide() {},
		methods: {
			// 获取token
			_getLoginAndRegister(item){
				getLoginAndRegister({
					post_params:{
						openid: item
					}
				}).then((res)=>{
					console.log('token',res);
					this.$store.commit('setToken',res.data.token)
				})
			},
			handleOk() {
				this.isOk = !this.isOk
			},
			hqCode() { // 获取登录凭证
				if (this.isOk) {
					uni.showToast({
						title: '请勾选协议',
						//将值设置为 success 或者直接不用写icon这个参数
						icon: 'error',
						//显示持续时间为 2秒
						duration: 2000
					})
					return
				}
				uni.login({
					provider: 'weixin',
					success: res => {
						console.log(res)
						getUserRegister({
							post_params: {
								platform: "mini",
								code: res.code
							}
						}).then((res)=>{
							console.log('数据',res.data);
							this.$store.commit('setState',res.data) //存入appid等
							this.$store.commit('loginStatus') //修改登录状态
							this._getLoginAndRegister(res.data.openid) //获取token
							// 跳转首页
							uni.navigateTo({
								url: '/pages/tabbar/home/index'
							})
							
						})
						// this.$store.commit('loginStatus')
						// console.log('权限',this.$store.state)
					
					}
				});

			}
		}
	};
</script>

<style>
	.imgUser {
		width: 7rem;
		height: 7rem;
		margin-top: 5rem;
	}
</style>