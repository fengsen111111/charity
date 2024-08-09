<template>
	<view class="">
		<view :class="isFFF?'bg-whilt':''" class="flex justify-between borderFFC w90 mt-4 space-x-4" >
			<!-- left -->
			<view class=" p-2">
				<view class="mt-1">
					优惠券名称
				</view>
				<view class="text11 col999 ling4">
					有效期至：2023-12-16
				</view>
				<view class="flex text11 colED1 ling4">
					<view class="">可用地区：成都</view>
					<view class="space-x-3">可用类型：部分商品不可用</view>
				</view>
			</view>
			<!-- right -->
			<view class=" rightVolume text-whlie text-center">
				<view class="text11">满100</view>
				<view class="">减20</view>
				<view class="px-2">
					<view class="bgFFC text12 rending3 colED1">领取</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			isFFF: false,
		},
		data() {
			return {
				active: false
			};
		},
		components:{top},
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
	.rightVolume{
		background: linear-gradient( 134deg, #FA311D 0%, #FF8E34 100%);
		width: 4.5rem;
	}
</style>