<template>
	<view class="">
		<view class="text-center mt-3 p-2 imgCenter grid grid-cols-5 w-full" style="overflow: auto;">
			<view class="mb-1" style="width: 100px;" v-for="item in [1,2,3,4,5]" :key="item">
				<image src="@/static/home/shopOne.jpg" mode="" style="width: 50px;height: 50px;border-radius: 50%;">
				</image>
				<view class="text-black text12">
					畅饮啤酒
				</view>
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