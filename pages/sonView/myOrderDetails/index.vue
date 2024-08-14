<template>
	<view class="">
		<hearch :title="'订单详情'" :isLeft="true" />
		<view class="p-3 text12">
			<!-- card -->
			<view>
				<view class="bg-whilt rending2 p-3 mt-3 text14">
					<view class="text12">订单信息</view>
					<view class="flex justify-between my-2">
						<view class="">订单编号 </view>
						<view class="">123456789 </view>
					</view>
					<view class="flex justify-between my-2">
						<view class="">实付金额 </view>
						<view class="colED1">￥100 </view>
					</view>
					<view class="flex justify-between my-2">
						<view class="">优惠金额 </view>
						<view class="colED1">￥100 </view>
					</view>
					<view class="flex justify-between my-2">
						<view class="">订单状态 </view>
						<view class="">待付款 </view>
					</view>
				</view>
				<!-- 备注 -->
				<view class="bg-whilt rending2 p-3 mt-3 text14">
					<view class="text12">备注</view>
					<view class="my-2 col999 indent1">
						  第八代五粮液在传承并且凸显出了历代五粮液的独特风格
						的前提下，对第七代产品的适度更新和优化，整体包装更精
						致、更大气，体验更佳，更适应新时代消费者对高品质白酒
						的消费需求。
					</view>
				</view>
				<!-- 地址信息 -->
				<view class="bg-whilt rending2 p-3 mt-3 text14">
					<view class="text12">地址信息</view>
					<view class="flex my-2">
						<view class="">张三 </view>
						<view class="space-x-4">13512341234 </view>
					</view>
					<view class="">四川省成都市武侯区世纪城天府大道中段588号天天小区快鸟驿站</view>
				</view>
				<!-- 商品信息 -->
				<view class="bg-whilt rending2 p-3  mt-3 text14">
					<view class="text12">商品信息</view>
					<view >
						<view class="rending2 mt-3 bg-whilt" >
						  <shopCard></shopCard>
						</view>
					</view>
				</view>
				<view v-if="status==4">
					<!-- 评价 -->
					<view class="bg-whilt rending2 p-3 mt-3 text14 flex justify-between">
						<view class="text12">评价</view>
						<view class="text12 col486">好评</view>
					</view>
					<!-- 评价内容 -->
					<view class="bg-whilt rending2 p-3 mt-3 text14">
						<view class="text12">评价内容</view>
						<view class="col999 indent1">  第八代五粮液在传承并且凸显出了历代五粮液的独特风格的前提下，对第七代产品的适度更新和优化，整体包装更精致、更大气，体验更佳，更适应新时代消费者对高品质白酒的消费需求。</view>
					</view>
				</view>
				<view v-else-if="status==5">
					<!-- 售后原因 -->
					<view class="bg-whilt rending2 p-3 mt-3 text14">
						<view class="text12">售后原因</view>
						<view class="col999 my-2 indent1">  第八代五粮液在传承并且凸显出了历代五粮液的独特风格的前提下，对第七代产品的适度更新和优化，整体包装更精致、更大气，体验更佳，更适应新时代消费者对高品质白酒的消费需求。</view>
					</view>
					<!--  -->
					<view class="bg-whilt rending2 p-3 mt-3 text14 flex justify-between">
						<view class="text12">售后方式</view>
						<view class="text12 col666">换货</view>
					</view>
				</view>
				<!--  -->
				<view class="h-8"></view>
				<view class="h-8"></view>
			</view>
		</view>
		<!-- 待支付 -->
		<view class="pendingView flex justify-between p-3" v-if="status==1">
			<view class="text-center">
				<uni-icons type="trash" size="24" color="#FC6265"></uni-icons>
				<view class="colED1 text12 ling1">删除订单</view>
			</view>
			<view class="flex items-center">
				<view class="col666 text14">实付金额</view>
				<view class="colED1 space-x-2 text18">￥100</view>
				<view class="bg486 space-x-2 rending5 text-whlie py-2 threeViewW text-center">
					去支付
				</view>
				<view class="w-6"></view>
			</view>
		</view>
		<!-- 进行中 -->
		<view class="pendingView flex justify-between p-3" v-else-if="status==2">
			<view class="text-center">
			</view>
			<view class="flex items-center">
				<view class="bgEBA space-x-2 rending5 text-whlie py-2 threeViewW text-center">
					再来一单
				</view>
				<view class="bg68B space-x-2 rending5 text-whlie py-2 threeViewW text-center">
					联系骑手
				</view>
				<view class="w-6"></view>
			</view>
		</view>
		<!-- 待评价 -->
		<view class="pendingView flex justify-between p-3" v-else-if="status==3">
			<view class="text-center">
				<uni-icons type="trash" size="24" color="#FC6265"></uni-icons>
				<view class="colED1 text12 ling1">删除订单</view>
			</view>
			<view class="flex items-center">
				<view class="bgEBA space-x-2 rending5 text-whlie py-2 threeViewW text-center">
					再来一单
				</view>
				<view class="bgFC6 space-x-2 rending5 text-whlie py-2 threeViewW text-center">
					立即评价
				</view>
				<view class="bg486 space-x-2 rending5 text-whlie py-2 threeViewW text-center">
					申请售后
				</view>
				<view class="w-6"></view>
			</view>
		</view>
		<!-- 已完成 -->
		<view class="pendingView flex justify-between p-3" v-else-if="status==4">
			<view class="text-center">
				<uni-icons type="trash" size="24" color="#FC6265"></uni-icons>
				<view class="colED1 text12 ling1">删除订单</view>
			</view>
			<view class="flex items-center">
				<view class="bgEBA space-x-2 rending5 text-whlie py-2 threeViewW text-center">
					再来一单
				</view>
				<view class="bg486 space-x-2 rending5 text-whlie py-2 threeViewW text-center">
					申请售后
				</view>
				<view class="w-6"></view>
			</view>
		</view>
		<!-- 售后中 -->
		<view class="pendingView flex justify-between p-3" v-else-if="status==5">
			<view class="text-center">
				<uni-icons type="trash" size="24" color="#FC6265"></uni-icons>
				<view class="colED1 text12 ling1">删除订单</view>
			</view>
			<view class="flex items-center">
				<view class="bgF2F space-x-2 rending5 col999 py-2 threeViewW text-center">
					售后中
				</view>
				<view class="w-6"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import hearch from "@/components/hearch/index.vue"
	import shopCard from '@/components/shopCard/index.vue'
	export default {
		components: {
			hearch,shopCard
		},
		data() {
			return {
				active: false,
				value: '',
				chenkIndex: 2,
				textarea: '',
				status: 5,//状态

			};
		},
		onLoad() {},
		onShow() {

		},
		onHide() {},
		methods: {
			
		}
	};
</script>

<style>
.pendingView{
	position: fixed;
	bottom: 0px;
	width: 100%;
	background-color: #fff;
}
.threeViewW{
	width: 5.5rem;
}
</style>