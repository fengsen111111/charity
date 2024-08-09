<template>
	<view class="">
		<hearch :title="'提现'" :isLeft="true"/>
		<view class="p-3 text12">
			<view class="p-4 bg-whilt rending2 ">
				<view class="flex justify-between">
					<view class="">提现金额</view>
					<view class="flex">
						<view class="">可提现</view>
						<view class="space-x-2">666666</view>
					</view>
				</view>
				<uni-easyinput class="uni-mt-5" trim="all" v-model="value" placeholder="输入提现金额"></uni-easyinput>
			</view>
			<!--  -->
			<view class="p-4 bg-whilt rending2 mt-3">
				<view class="flex justify-between">
					<view class="">选择银行卡</view>
					<view class="col486" @click="handleUrl('/pages/sonView/addCard/index')">新增银行卡</view>
				</view>
				<view class="mt-3 bgF9 col666 p-2 rending1" :class="item==1?'border486 bgF2F':''" v-for="item in [1,2,3]" :key="item">
					<view class="flex justify-between items-center">
						<view class="">中国银行</view>
						<view class="">益州大道支行</view>
					</view>
					<view class="flex justify-between items-center">
						<view class="">张三</view>
						<view class="">1234**********1234</view>
					</view>
				</view>
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
				value:''
			};
		},
		onLoad() {},
		onShow() {
			
		},
		onHide() {
		},
		methods: {
			handleUrl(url){
				console.log(url);
				uni.navigateTo({
					url:url+''
				})
			},
		}
	};
</script>

<style>
</style>