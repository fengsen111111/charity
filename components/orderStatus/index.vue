<template>
	<view class="">
			<!-- card -->
			<view class="bg-whilt mt-3 rending2">
				<view class="flex justify-between p-3">
					<view class="">订单编号:123456789</view>
					<view class="colED1 borderED1 px-2 rending1 ling5">待付款</view>
				</view>
				<view class="border999One w-full"></view>
				<view class="p-3">
					<view class="flex">
						<view class="">张三</view>
						<view class="">13512341234</view>
					</view>
					<view class="">四川省成都市武侯区世纪城天府大道中段588号天天小区快鸟驿站</view>
				</view>
				<view class="border999One w-full"></view>
				<view class="p-3">
					<view class="flex justify-between">
						<view class="">商品信息</view>
						<view class="col486">
							展开
							<uni-icons type="down" size="16" color="#4867CF"></uni-icons>
						</view>
					</view>
					<slot></slot>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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