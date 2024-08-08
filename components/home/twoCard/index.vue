<template>
	<view class="">
		<view class="text-center grid grid-cols-5 mt-3 p-2 imgCenter">
			<view class="mb-1 " v-for="item in [1,2,3,4,5,6,7,8,9,10]" :key="item">
				<image src="@/static/home/shopOne.jpg" mode="" style="width: 50px;height: 50px;border-radius: 50%;">
				</image>
				<view class="text-black">
					畅饮啤酒
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.imgCenter {
		background-image: url('@/static/home/imgCenter.png');
		background-size: 100% 100%;
		width: 97%;
		margin-left: -3px;
	}
</style>