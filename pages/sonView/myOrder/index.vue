<template>
	<view class="">
		<hearch :title="'我的订单'" :isLeft="true" />
		<view class="p-3 text12">
			<view class="flex justify-between">
				<view @click="handleItem(item.id)" class="text-center" :class="chenkIndex==item.id?'col486':''"
					v-for="item in tabsList" :key="item.id">
					{{item.text}}
					<view v-if="chenkIndex==item.id" class="border486 w-4 mxAuto"></view>
				</view>
			</view>
			<!-- card -->
			<view v-for="item in [1,2,3,4,5]" :key="item">
				<orderStatus>
					<view>
						<!-- 待付款 -->
						<view class="flex justify-between items-center mt-3" v-if="item == 1">
							<view class="flex">
								<view class="col666">实付金额</view>
								<view class="text16 colED1 space-x-2">￥100</view>
							</view>
							<view class="bg486 text16 rending5 text-whlie py-2 w7 text-center">去支付</view>
						</view>
						<!-- 进行中 -->
						<view class="flex justify-between items-center mt-3" v-else-if="item == 2">
							<view class="flex w5"></view>
							<view class="bgEBA text16 rending5 text-whlie py-2 w7 text-center">再来一单</view>
							<view class="bg68B text16 rending5 text-whlie py-2 w7 text-center">联系骑手</view>
						</view>
						<!-- 待评价 -->
						<view class="flex justify-between items-center mt-3" v-else-if="item == 3">
							<view class="bgEBA text16 rending5 text-whlie py-2 w6 text-center">再来一单</view>
							<view @click="toggle('bottom')"
								class="bgFC6 text16 rending5 text-whlie py-2 w6 text-center">立即评价</view>
							<view @click="toggleAfter('bottom')" class="bg486 text16 rending5 text-whlie py-2 w6 text-center">申请售后</view>
						</view>
						<!-- 已完成 -->
						<view class="flex justify-between items-center mt-3" v-else-if="item == 4">
							<view class="flex w5"></view>
							<view class="bgEBA text16 rending5 text-whlie py-2 w7 text-center">再来一单</view>
							<view @click="toggleAfter('bottom')" class="bg486 text16 rending5 text-whlie py-2 w7 text-center">申请售后</view>
						</view>
						<!-- 售后 -->
						<view class="flex justify-between items-center mt-3" v-else-if="item == 5">
							<view class="flex w5"></view>
							<view class="bgF2F text16 rending5 col999 py-2 w7 text-center">售后中</view>
							<view class="bgF2F text16 rending5 col999 py-2 w7 text-center">已退货退款</view>
							<view class="bgF2F text16 rending5 col999 py-2 w7 text-center">已退款</view>
							<view class="bgF2F text16 rending5 col999 py-2 w7 text-center">已换货</view>
							<view @click="toggleAfter('bottom')" class="bg486 text16 rending5 text-whlie py-2 w7 text-center">重新申请</view>
							<view class="flex w5"></view>
						</view>
					</view>
				</orderStatus>
			</view>
		</view>
		<!-- 评价 -->
		<uni-popup ref="popup" background-color="#fff" borderRadius="0.5rem 0.5rem 0px 0px">
			<view class="bgF9 p-4 overflowAuto" style="height:65vh">
				<view class="fiexdTop">
					<view class="w-4"></view>
					<view class="text16">
						评价
					</view>
					<view class="" @click="close">
						<uni-icons type="closeempty" size="20"></uni-icons>
					</view>
				</view>
				<view class="h-8"></view>
				<!-- 留白 -->
				<view class="text12 bg-whilt p-3 mt-3">
					<view class="">
						评价
					</view>
					<view class="flex text14 justify-between text-center col999 mt-3">
						<view class="py-2 w6 rending1 bgF2F col486 border486">好评</view>
						<view class="py-2 w6 rending1 bgF9">中评</view>
						<view class="py-2 w6 rending1 bgF9">差评</view>
					</view>
				</view>
				<!--  -->
				<view class="text12 bg-whilt p-3 mt-3">
					<view class="">
						评价内容
					</view>
					<uni-easyinput type="textarea" class="mt-3" v-model="textarea" placeholder="请输入内容"></uni-easyinput>
					<view class="mt-3">
						<view class="example-body">
							<uni-file-picker limit="9" title=""></uni-file-picker>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 售后 -->
		<uni-popup ref="popupAfter" background-color="#fff" borderRadius="0.5rem 0.5rem 0px 0px">
			<view class="bgF9 p-4 overflowAuto" style="height:65vh">
				<view class="fiexdTop">
					<view class="w-4"></view>
					<view class="text16">
						售后
					</view>
					<view class="" @click="closeAfter">
						<uni-icons type="closeempty" size="20"></uni-icons>
					</view>
				</view>
				<view class="h-8"></view>
				
				<!--  -->
				<view class="text12 bg-whilt p-3 mt-3">
					<view class="flex justify-between">
						<text>售后原因</text>
						<text>请填写售后原因</text>
					</view>
					<uni-easyinput type="textarea" class="mt-3" v-model="textarea" placeholder="请输入内容"></uni-easyinput>
					<view class="mt-3">
						<view class="example-body">
							<uni-file-picker limit="9" title=""></uni-file-picker>
						</view>
					</view>
				</view>
				<!--  -->
				<view class="text12 bg-whilt p-3 mt-3">
					<view class="flex justify-between">
						<text>售后方式</text>
					</view>
					<view class="flex text14 justify-between text-center col999 mt-3">
						<view class="py-2 w6 rending1 bgF2F col486 border486">退货退款</view>
						<view class="py-2 w6 rending1 bgF9">退款</view>
						<view class="py-2 w6 rending1 bgF9">换货</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import hearch from "@/components/hearch/index.vue"
	import orderStatus from "@/components/orderStatus/index.vue"
	export default {
		components: {
			hearch,
			orderStatus
		},
		data() {
			return {
				active: false,
				value: '',
				chenkIndex: 2,
				textarea: '',
				tabsList: [{
						id: 1,
						text: '全部'
					},
					{
						id: 2,
						text: '待付款'
					},
					{
						id: 3,
						text: '进行中'
					},
					{
						id: 4,
						text: '待评价'
					},
					{
						id: 5,
						text: '已完成'
					},
					{
						id: 6,
						text: '退款/售后'
					}
				]
			};
		},
		onLoad() {},
		onShow() {

		},
		onHide() {},
		methods: {
			handleItem(id) {
				this.chenkIndex = id
			},
			// 关闭
			close() {
				this.$refs.popup.close()
			},
			// 弹框
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			// 关闭
			closeAfter() {
				this.$refs.popupAfter.close()
			},
			// 弹框
			toggleAfter(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popupAfter.open(type)
			},

// 关闭
			close() {
				this.$refs.popup.close()
			},
			// 弹框
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},		}
	};
</script>

<style>

</style>