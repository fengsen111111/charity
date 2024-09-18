<template>
	<view class="">
		<view class="">
			<swiper @change="change" :current="current" class="h389 radius20 w-full" circular :indicator-dots="false"
				:autoplay="true" :interval="4000">
				<swiper-item class="h389">
					<image src="https://img.picui.cn/free/2024/09/18/66ea73b25c621.png" class="itemsImg" mode="">
					</image>
				</swiper-item>
				<swiper-item class="h389">
					<image src="https://img.picui.cn/free/2024/09/18/66ea73b25c621.png" class="itemsImg" mode="">
					</image>
				</swiper-item>
				<swiper-item class="h389">
					<image src="https://img.picui.cn/free/2024/09/18/66ea73b25c621.png" class="itemsImg" mode="">
					</image>
				</swiper-item>
			</swiper>
		</view>
		<view class="flex">
			<view class="flex mx-auto">
				<view class="" v-for="item in [0,1,2]" :key="item">
					<image src="../../static/img_bottom.png" class="img_bottoms" v-if="item==current" mode="">
					</image>
					<image src="../../static/img_bottom_active.png" class="img_bottoms" v-else mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
			}
		},
		created() {

		},
		mounted() {

		},
		watch: {},
		methods: {
			change(e) {
				this.current = e.detail.current
			}
		}
	}
</script>

<style>
	.itemsImg {
		width: 100%;
		height: 389rpx;
		border-radius: 20rpx;
	}

	.img_bottoms {
		width: 34rpx;
		height: 6rpx;
		margin-right: 8rpx;
		margin-left: 8rpx;
	}
</style>