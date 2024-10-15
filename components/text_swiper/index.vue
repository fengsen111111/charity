<template>
	<view class="">
			<!-- <view class="swiper-wrapper bgtwo mt20 text24 col-white radius20">
				<swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="2000" :duration="2000"
					:circular="true" :vertical="true" :display-multiple-items="3" easing-function="linear">
					<swiper-item class="textItem" v-for="item in [1,2,3,4,5,6,7,8]" :key="item">
						<view class="flex justify-between" style="width: 97%;">
							<view class="">周某某</view>
							<view class="">10,000元</view>
							<view class="">基金名称基金名...</view>
							<view class="">2024-12-12</view>
						</view>
					</swiper-item>
				</swiper>
			</view> -->
			<view class="swiper-wrapper bgtwo mt20 text24 col-white radius20">
				<swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="2000" :duration="2000"
					:circular="true" :vertical="true" :display-multiple-items="3" easing-function="linear">
					<swiper-item class="textItem" v-for="item in textList" :key="item.id">
						<view class="flex justify-between" style="width: 97%;padding-left: 10rpx;">
							<view class="w-1-6">{{item.name?item.name:'周某某'}}</view>
							<view class="w-1-6 text-center">{{item.money}}</view>
							<view class="w-1-3 text-center">{{item.donate_name.length>7?item.donate_name.slice(0,10)+'...':item.donate_name}}</view>
							<view class="w-1-2 text-center">{{item.create_time}}</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
	</view>
</template>

<script>
	export default {
		props:{
			textList:{
				type:Array,
				default:()=>[]
			}
		},
		components: {
		},
		data() {
			return {
			
			}
		},
		created() {
			//获取手机状态栏高度
		},
		mounted() {

		},
		watch: {},
		methods: {
			
		}
	}
</script>

<style>
	.w-1-3{
		width: 33%;
	}
	.w-1-6{
		width: 16%;
	}
	.textItem {
		height: 10rpx !important;
		padding: 20rpx 10rpx;
	}
</style>