<template>
	<view class="">
		<view class="flex py20 bg-white px36 mb20">
			<view style="width: 225rpx;height:165rpx;">
				<image :src="itemObj.cover_image" class="cardImg" mode=""></image>
			</view>
			<view class=" ml30">
				<view class="text32">{{itemObj.name}}</view>
				<view class="col787878 text24 mt20">{{itemObj.org_name}}</view>
				<view class="flex items-baseline justify-between text24">
					<view class="">已募集</view>
					<view class="ml40 colD6B07A"><text class="text60 font-bold mr10">{{itemObj.all_money}}</text>元
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			itemObj: {
				type: Object,
				default: () => {}
			}
		},
		methods: {

		}
	}
</script>

<style>
	.cardImg {
		width: 225rpx;
		height: 165rpx;
		border-radius: 20rpx;
	}
</style>