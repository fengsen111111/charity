<template>
	<view class="bgMyImg ">
		<view class="pt4 text-whlie text18 items-center grid grid-cols-3  px-3">
			<view class="text-left">
				<uni-icons type="left" size="30" color="#D7D9EC" @click="handleLeft"></uni-icons>
			</view>
			<view class="text-center">{{title}}</view>
			<view class="">
			</view>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props:{
			title:''
		},
		data() {
			return {
			
			}
		},
		onLoad() {
	
		},
		methods: {
	
		}
	}
</script>

<style>
	.bgMyImg {
		color: #fff;
		background-image: url('@/static/home/volumeBg.png');
		background-size: 100% 100%;
		height: 12rem;
		width: 100%;
	}
</style>