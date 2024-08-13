<template>
	<view class="">
		<hearch :title="'新增银行卡'" :isLeft="true"/>
		<view class="p-3 text12">
			<view class="bg-whilt rending1 p-3">
				<view class="" v-for="item in [1,2,3]" :key="item">
					<view class="text-black mb-1">开户行</view>
					<uni-easyinput class="uni-mt-5" trim="all" v-model="value" placeholder="输入开户行"></uni-easyinput>
					<view class="h-4" v-if="item!==3"></view>
				</view>
			</view>
			<view class="h10"></view>
			<view class="h10"></view>
			<view class="bg486 text-whlie w-full py-3 rending2 text-center text16">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	import hearch from "@/components/hearch/index.vue"
	export default {
		components:{hearch},
		data() {
			return {
				active: false,
				value:'',
			};
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