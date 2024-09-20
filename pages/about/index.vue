<template>
	<view class="">
		<hearchItem :title="'关于基金'" />
		<view class="px36 py30">
			<swiperItems />
		</view>
		<view class="bgItems"></view>
		<view class="px36 py30">
			<view class="titleView text24">
				<view class="ml20 col205D57 font-bold">关于基金</view>
			</view>
			<view class="mt15 text24 indent2">
				慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情。
			</view>
		</view>
		<view class="bgItems"></view>
		<view class="px36 py30">
			<view class="titleView text24">
				<view class="ml20 col205D57 font-bold">活动列表</view>
			</view>
			<view class="mt30 flex " v-for="item in [1,2,3]" :key="item"
				@click="handUrl('/pages/components/textContent/index')">
				<image src="https://img.picui.cn/free/2024/09/18/66ea73b25c621.png" class="activeItemImg" mode="">
				</image>
				<view class="ml30 text32 font-bold">
					活动名称活动名称活动名称活动名称
				</view>
			</view>
		</view>
		<view class="h160"></view>
		<!--  -->
		<tarBar :checkIndex='2' />
	</view>
</template>

<script>
	import tarBar from '@/components/tarbar/index.vue'
	import hearchItem from '@/components/hearchItem/index.vue'
	import swiperItems from '@/components/swiperItems/index.vue'
	export default {
		components: {
			hearchItem,
			swiperItems,
			tarBar
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
			handUrl(item) {
				uni.navigateTo({
					url: item
				})
			},
		}
	}
</script>

<style>
	.activeItemImg {
		width: 225rpx;
		height: 165rpx;
		border-radius: 20rpx;
	}

	.image_about {
		width: 100%;
		height: 380rpx;

	}

	.bgItems {
		background-color: #EBEBEB;
		height: 16rpx;
	}
</style>