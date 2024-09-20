<template>
	<view>
		<hearchItem :isLeft="true" :title="'我的捐赠'" />
		<view class="p40 text28">
			<view v-for="item in [1,2,3]" :key="item">
				<view class="flex justify-between ">
					<view>基金名称</view>
					<view class="col787878">基金类别</view>
				</view>
				<view class="flex justify-between items-baseline">
					<view class="flex items-baseline">
						<view>捐赠</view>
						<view class=" text60 colD6B07A ml10 font-bold">33,340</view>
						<view class="ml10">元</view>
					</view>
					<view class="col787878">2024-12-12 16:00</view>
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