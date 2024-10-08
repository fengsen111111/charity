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
						<view class="flex justify-between" style="width: 97%;">
							<view class="">{{item.user_name?item.user_name:'周某某'}}</view>
							<view class="">{{item.money}}</view>
							<view class="">{{item.donate_name}}</view>
							<view class="">{{item.create_time}}</view>
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
	.textItem {
		height: 10rpx !important;
		padding: 20rpx 10rpx;
	}
</style>