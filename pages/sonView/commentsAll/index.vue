<template>
	<view class="">
		<hearch :title="'评论详情'" />
		<view class="flex justify-evenly text12 bg-whilt py-3">
			<view class="text-center ling3" v-for="item in [1,2,3,4,5]" :key="item">
				<view class="text-black">
					全部
				</view>
				<view class="col666 mt-1">
					88888
				</view>
			</view>
		</view>
		<view class="p-4">
			<view class="bg-whilt p-4 rending1">
				<comments />
			</view>
			<view class="bg-whilt p-4 rending1 mt-3">
				<comments />
			</view>
		</view>
	</view>
</template>

<script>
	import hearch from '@/components/hearch/index.vue'
	import comments from "@/components/comments/index.vue"
	export default {
		data() {
			return {
				active: false
			};
		},
		components: {
			hearch,comments
		},
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
</style>