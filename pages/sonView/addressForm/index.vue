<template>
	<view class="">
		<hearch :title="'新增地址'" :isLeft="true"/>
		<view class="p-3 text12">
			<view class="bg-whilt rending1 p-3">
				<view class="">
					<view class="text-black mb-1">地图选址</view>
					<view class="flex justify-between bgF2F  p-3 mt-1 rending1">
						<view class="w70">四川省成都市武侯区世纪城天府大道中段588号天天小区</view>
						<view class="flex col486 items-center">
							<uni-icons type="location" color="#4867CF" size="20"></uni-icons>
							<view class="text12 space-x-1">重新定位</view>
						</view>
					</view>
				</view>
				<view class="flex mt-3">
					<uni-icons type="circle" size="20" color="#666666" class=""></uni-icons>
					<view class=" space-x-1">默认收货地址</view>
				</view>
			</view>
			<view class="bg-whilt rending1 p-3 mt-3">
				<view class="" v-for="item in [1,2,3]" :key="item">
					<view class="text-black mb-1">{{item==1?'详细地址':item==2?'姓名':'手机号'}}</view>
					<uni-easyinput class="uni-mt-5" trim="all" v-model="value" placeholder="输入开户行"></uni-easyinput>
					<view class="h-4" v-if="item!==3"></view>
				</view>
				<view class="flex mt-3">
					<uni-icons type="circle" size="20" color="#666666" class=""></uni-icons>
					<view class=" space-x-1">默认收货地址</view>
				</view>
			</view>
			<view class="h10"></view>
			<view class="h-8"></view>
			<view class="h-8"></view>
			<view class="h-8"></view>
			<view class="h-8"></view>
			<view class="bg486 text-whlie w-full py-3 rending2 text-center text16">
				提交
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