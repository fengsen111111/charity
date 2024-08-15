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
				<view class="rending4 bg486 w-4 h-4 space-x-2"></view>
				<view class="space-x-2">
					已知晓并同意<text class="col486">《隐私协议》</text>相关规定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import hearch from '@/components/hearch/index.vue'
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
			hqCode() { // 获取登录凭证
				uni.login({
					provider: 'weixin',
					success: res => {
						console.log(res)
					}
				});
				this.$store.commit('loginStatus')
				// console.log('权限',this.$store.state)
				uni.navigateTo({
					url: '/pages/tabbar/home/index'
				})
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