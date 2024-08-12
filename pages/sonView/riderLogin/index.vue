<template>
	<view class="">
		<view class="bgMyImg">
			<view class="space-x-3">
				<view class="h-8"></view>
				<image src="@/static/my/topText.png" mode="" class="topText mt-2"></image>
				<view class="ling1">
					骑手端
				</view>
			</view>
		</view>
		<view class="text-center">
			<image src="@/static/home/logUser.png" mode="" class="imgUser"></image>
		</view>
		<view class="text-center py-3 col999">
			骑手端登录
		</view>
		<view class="w80 mxAuto">
			<view class="mt-3">手机号</view>
			<uni-easyinput class="mt-3" errorMessage v-model="value1" focus placeholder="请输入内容" @input="input"></uni-easyinput>
			<view class="mt-3">验证码</view>
			<uni-easyinput class="mt-3" errorMessage v-model="value2" focus placeholder="请输入内容" @input="input"></uni-easyinput>
		</view>
		<view class="h-6"></view>
		<view class="w80 mxAuto bg486 text-whlie rending1 py-3 text-center">
			登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: false,
				value1:'',
				value2:''
			};
		},
		components:{  },
		onLoad() {},
		onShow() {
			
		},
		onHide() {
		},
		methods: {
		}
	};
</script>

<style>
	.imgUser{
		width: 7rem;
		height: 7rem;
		margin-top: 2rem;
	}
	.bgMyImg {
		color: #fff;
		background-image: url('@/static/my/topBg.png');
		background-size: 100% 100%;
		height: 5rem;
		width: 100%;
	}
	.topText{
		width: 4rem;
		height: 1rem;
	}
</style>