<template>
	<view class="">
		<view class="flex mt20 py20 bg-white px36" v-for="item in [1,2,3]" :key="item">
			<image src="https://img.picui.cn/free/2024/09/18/66ea73b25c621.png" class="cardImg" mode=""></image>
			<view class=" ml30">
				<view class="flex">
					<view class="text32 font-bold w-3-4">活动名称活动名称活动名称</view>
					<view v-if="item==1" class="status_1">进行中</view>
					<view v-else-if="item==2" class="status_2">已结束</view>
					<view  v-else-if="item==3" class="status_3">待开始</view>
				</view>
				<view class="flex justify-between items-center mt10">
					<view class="font-bold text32 col205D57">名额：15人</view>
					<view class="text24 col-black">可获得<text class="ml10 colD6B07A">12,000积分</text></view>
				</view>
				<view class="flex text18 col787878 mt10">
					活动时间：2024-12-12 16:30至2024-12-12 16:30
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
</style>