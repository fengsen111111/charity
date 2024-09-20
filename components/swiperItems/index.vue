<template>
	<view class="">
		<view class="">
			<swiper @change="change" :current="current" class="h389 w-full" :class="isBottom?'radius20':''" circular
				:indicator-dots="false" :autoplay="true" :interval="4000">
				<swiper-item class="h389">
					<image src="https://img.picui.cn/free/2024/09/18/66ea73b25c621.png" class="itemsImg"
						:class="isBottom?'radius20':''" mode="">
					</image>
				</swiper-item>
				<swiper-item class="h389">
					<image src="https://img.picui.cn/free/2024/09/18/66ea73b25c621.png" class="itemsImg"
						:class="isBottom?'radius20':''" mode="">
					</image>
				</swiper-item>
				<swiper-item class="h389">
					<image src="https://img.picui.cn/free/2024/09/18/66ea73b25c621.png" class="itemsImg"
						:class="isBottom?'radius20':''" mode="">
					</image>
				</swiper-item>
			</swiper>
		</view>
		<view class="flex" v-if="isBottom">
			<view class="flex mx-auto">
				<view class="" v-for="item in [0,1,2]" :key="item">
					<image src="../../static/img_bottom.png" class="img_bottoms" v-if="item==current" mode="">
					</image>
					<image src="../../static/img_bottom_active.png" class="img_bottoms" v-else mode=""></image>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="imgs_details">
				{{current+1}}/3
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			isBottom: {
				type: Boolean,
				default: true
			}
		},
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
	.imgs_details {
		background-image: url('../../static/imgs_details.png');
		background-size: 100% 100%;
		color: white;
		font-size: 30rpx;
		font-weight: bold;
		position: absolute;
		right: 36rpx;
		top: 265px;
		text-align: center;
		padding: 8rpx 30rpx;
	}

	.itemsImg {
		width: 100%;
		height: 389rpx;
	}

	.img_bottoms {
		width: 34rpx;
		height: 6rpx;
		margin-right: 8rpx;
		margin-left: 8rpx;
	}
</style>