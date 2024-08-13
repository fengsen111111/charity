<template>
	<!-- <view class="w90 space-x-2  rending2  p-4" :class="isBgWhilt?'bgF9':'bg-whilt'"> -->
	<view class="">
		<view class=" flex justify-between">
			<image src="https://imgos.cn/2024/08/12/66b9d67b2c357.png" mode="" class="imgShop rending1"></image>
			<view class="w-full w70 px-2">
				<view class="flex justify-between  w-full">
					<view class="text12 fontBold w70">
						泸州老窖 六年窖头曲 浓香白酒 52 度 500ml...
					</view>
					<view class="">
						<view class="fontBold">X 666</view>
						<view class="text12 col666">冰冻 66</view>
					</view>
				</view>
				<view class="flex text12 ">
					<view class="col666">口味</view>
					<view class="text-black space-x-1">原味</view>
				</view>
				<view class="flex justify-between">
					<view class="flex text12 ">
						<view class="col666">规格</view>
						<view class="text-black space-x-1">550ml*12</view>
					</view>
					<view class="flex text12 ">
						<view class="colED1 fontBold">￥<text class="text20 ">888</text>.8</view>
						<view class="col999 space-x-1 text12 mt-1 textDel">￥1888</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 插槽 -->
		<slot>
		</slot>
	</view>
	<!-- </view> -->
</template>

<script>
	export default {
		props:{
			isBgWhilt:true
		}
	}
</script>

<style>
	.imgShop{
		width: 4rem;
		height: 5.25rem;
	}
</style>