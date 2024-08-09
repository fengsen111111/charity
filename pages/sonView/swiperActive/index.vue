<template>
	<view class="">
		<hearch :title="'活动名称'" />
		<view class="p-4 bg-whilt text14 ">
			<image src="@/static/home/swiperActive.png" mode="" class="w-full h20 rending1"></image>
			<view class="fontBold">第八代五粮液</view>
			<view class="indent2" v-for="item in [1,2,3]" :key="item"> 第八代五粮液在传承并且凸显出了历代五粮液的独特风格的前提下，对第七代产品的适度更新和优化，整体包装更精致、更大气，体验更佳，更适应新时代消费者对高品质白酒的消费需求。</view>
		</view>
	</view>
</template>

<script>
	import hearch from '@/components/hearch/index.vue'
	export default {
		data() {
			return {
				active: false
			};
		},
		components: {
			hearch,
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