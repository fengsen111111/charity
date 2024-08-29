<template>
	<view class="">
		<view  class="text-center mt-3 p-2 imgCenter flex hidden overflowAuto">
			<view class="mb-1 space-x-4" style="width: 200px" v-for="item in [1,2,3,4,5,6,7,8,9]" :key="item">
				<image src="https://img.picui.cn/free/2024/08/29/66cfcffbc9dcb.png" mode="" style="width: 50px;height: 50px;border-radius: 50%;">
				</image>
				<view class="text-black text12">
					畅饮啤酒
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
</style>