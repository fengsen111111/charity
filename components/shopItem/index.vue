<template>
	<view class="">
		<view class="grid grid-cols-2 grid-row-gap36 grid-column-36">
		   <view class="bg-white radius20 hidden" v-for="item in [1,2,3,4,5,6]" :key="item">
		   	  <image src="https://img.picui.cn/free/2024/09/18/66ea73b25c621.png" class="w-full h206" mode=""></image>
			  <view class="p20 text24">
			  	<view>礼品名称礼品名称礼品名称礼品名称</view>
				<view class="flex justify-between items-center mt15">
					<view class="flex items-baseline text36 colD6B07A">18,888<text class="ml10 text18">积分</text></view>
					<view class="col787878 text18">库存：122</view>
				</view>
				<view class="btnForm_shop mt15">
					立即兑换
				</view>
			  </view>
		   </view>
		</view>
	</view>
</template>

<script>
	export default {
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
	
</style>