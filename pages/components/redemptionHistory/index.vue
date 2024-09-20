<template>
	<view class="">
		<hearchItem :isLeft="true" :title="'兑换记录'" />
		<view class="p40">
			<view v-for="item in [1,2,3]" :key="item">
				<view class="flex text28  justify-between">
					<view class="">活动名称</view>
					<view class="col787878">2024-12-12 16:00</view>
					<view :class="item==2?'col787878':'colD6B07A'" class=" text36 font-bold">+18,888</view>
				</view>
				<view class="h1 bgEBEBEB my34"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue'

	export default {
		components: {
			hearchItem,
		},
		data() {
			return {}
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