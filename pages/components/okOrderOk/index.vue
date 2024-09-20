<template>
	<view class="">
		<hearchItem :isLeft="true" :title="'积分兑换'" />

		<view class=" text-center mt176">
			<image src="../../../static/order_ok_ok.png" class="img152" mode=""></image>
			<view class="font-bold text48 col205D57 mt20">
				兑换成功
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