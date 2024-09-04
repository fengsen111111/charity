<template>
	<view class="">
		<hearch :title="'我的订单'" :isLeft="true" />
		<view class="p-3 text12">
			<view class="flex justify-between">
				<view @click="handleItem(item.id)" class="text-center" :class="chenkIndex==item.id?'col486':''"
					v-for="item in tabsList" :key="item.id">
					<view class="mb-1">{{item.text}}</view>
					<view v-if="chenkIndex==item.id" class="border486 bg486 w-6 mxAuto rending1"></view>
				</view>
			</view>
			<!-- card -->
			<view>
				<orderStatus :dataList='datalist' />
			</view>
		</view>
	</view>
</template>

<script>
	import hearch from "@/components/hearch/index.vue"
	import orderStatus from "@/components/orderStatus/index.vue"
	import {
		getUserOrderList, //lsit
	} from '@/request/api.js'
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
				// 
				datalist: [],
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
		created() {
			this._getUserOrderList()
		},
		onHide() {},
		methods: {
			
			_getUserOrderList(status) {
				getUserOrderList({
					post_params: {
						currentPage: '',
						perPage: '',
						status: '', //a待付款 b进行中 c待评价 d已完成 e售后  
					}
				}).then((res) => {
					console.log('订单数据', res);
					this.datalist = [{
						"id": "1",
						"status": "a",//订单状态:a待付款(可取消)  b待抢单(可售后) c配送中(可售后,联系骑手) d已完成，待评价(可评价，售后)  e已评价/已售后  
						"after_sale_status": "a",//售后状态:a未申请 b售后中  c换货  d退货退款 e退款 z售后关闭  
						"delivey_status": "a",//配送状态:a待接单  b配送中  c已送达  
						"create_time": "12:12:12",
						"order_num": "324312412212312",
						"user_name": "张三",
						"user_mobile": "14544554455",
						"user_address": "四川省成都市武侯区世纪城天府大道中段588号天天小区快鸟驿站",
						"distance": "1.1km",
						"remark": "无备注",
						"pay_price": "12.33",
						"preferential_price": "1.33",
						"worker_mobile": "18488448844",
						"goods_list": [{
							"goods_name": "五粮液股份五粮春二代菁萃浓香型白酒",
							"taste_name": "甜酒",
							"cover_image": "https://img.picui.cn/free/2024/08/16/66bf135fa40a3.png",
							"volume": "550",
							"size_number": "12",
							"number": "666666",
							"ice_number": "666666"
						}]
					},
					{
						"id": "2",
						"status": "c",//订单状态:a待付款(可取消)  b待抢单(可售后) c配送中(可售后,联系骑手) d已完成，待评价(可评价，售后)  e已评价/已售后  
						"after_sale_status": "a",//售后状态:a未申请 b售后中  c换货  d退货退款 e退款 z售后关闭  
						"delivey_status": "b",//配送状态:a待接单  b配送中  c已送达  
						"create_time": "12:12:12",
						"order_num": "324312412212312",
						"user_name": "张三",
						"user_mobile": "14544554455",
						"user_address": "四川省成都市武侯区世纪城天府大道中段588号天天小区快鸟驿站",
						"distance": "1.1km",
						"remark": "无备注",
						"pay_price": "12.33",
						"preferential_price": "1.33",
						"worker_mobile": "18488448844",
						"goods_list": [{
							"goods_name": "五粮液股份五粮春二代菁萃浓香型白酒",
							"taste_name": "甜酒",
							"cover_image": "https://img.picui.cn/free/2024/08/16/66bf135fa40a3.png",
							"volume": "550",
							"size_number": "12",
							"number": "666666",
							"ice_number": "666666"
						}]
					},
					{
						"id": "3",
						"status": "c",//订单状态:a待付款(可取消)  b待抢单(可售后) c配送中(可售后,联系骑手) d已完成，待评价(可评价，售后)  e已评价/已售后  
						"after_sale_status": "a",//售后状态:a未申请 b售后中  c换货  d退货退款 e退款 z售后关闭  
						"delivey_status": "c",//配送状态:a待接单  b配送中  c已送达  
						"create_time": "12:12:12",
						"order_num": "324312412212312",
						"user_name": "张三",
						"user_mobile": "14544554455",
						"user_address": "四川省成都市武侯区世纪城天府大道中段588号天天小区快鸟驿站",
						"distance": "1.1km",
						"remark": "无备注",
						"pay_price": "12.33",
						"preferential_price": "1.33",
						"worker_mobile": "18488448844",
						"goods_list": [{
							"goods_name": "五粮液股份五粮春二代菁萃浓香型白酒",
							"taste_name": "甜酒",
							"cover_image": "https://img.picui.cn/free/2024/08/16/66bf135fa40a3.png",
							"volume": "550",
							"size_number": "12",
							"number": "666666",
							"ice_number": "666666"
						}]
					},
					{
						"id": "4",
						"status": "d",//订单状态:a待付款(可取消)  b待抢单(可售后) c配送中(可售后,联系骑手) d已完成，待评价(可评价，售后)  e已评价/已售后  
						"after_sale_status": "a",//售后状态:a未申请 b售后中  c换货  d退货退款 e退款 z售后关闭  
						"delivey_status": "a",//配送状态:a待接单  b配送中  c已送达  
						"create_time": "12:12:12",
						"order_num": "324312412212312",
						"user_name": "张三",
						"user_mobile": "14544554455",
						"user_address": "四川省成都市武侯区世纪城天府大道中段588号天天小区快鸟驿站",
						"distance": "1.1km",
						"remark": "无备注",
						"pay_price": "12.33",
						"preferential_price": "1.33",
						"worker_mobile": "18488448844",
						"goods_list": [{
							"goods_name": "五粮液股份五粮春二代菁萃浓香型白酒",
							"taste_name": "甜酒",
							"cover_image": "https://img.picui.cn/free/2024/08/16/66bf135fa40a3.png",
							"volume": "550",
							"size_number": "12",
							"number": "666666",
							"ice_number": "666666"
						}]
					},
					{
						"id": "5",
						"status": "e",//订单状态:a待付款(可取消)  b待抢单(可售后) c配送中(可售后,联系骑手) d已完成，待评价(可评价，售后)  e已评价/已售后  
						"after_sale_status": "a",//售后状态:a未申请 b售后中  c换货  d退货退款 e退款 z售后关闭  
						"delivey_status": "c",//配送状态:a待接单  b配送中  c已送达  
						"create_time": "12:12:12",
						"order_num": "324312412212312",
						"user_name": "张三",
						"user_mobile": "14544554455",
						"user_address": "四川省成都市武侯区世纪城天府大道中段588号天天小区快鸟驿站",
						"distance": "1.1km",
						"remark": "无备注",
						"pay_price": "12.33",
						"preferential_price": "1.33",
						"worker_mobile": "18488448844",
						"goods_list": [{
							"goods_name": "五粮液股份五粮春二代菁萃浓香型白酒",
							"taste_name": "甜酒",
							"cover_image": "https://img.picui.cn/free/2024/08/16/66bf135fa40a3.png",
							"volume": "550",
							"size_number": "12",
							"number": "666666",
							"ice_number": "666666"
						}]
					},
					]

				})
			},
			handleItem(id) {
				this.chenkIndex = id
			},
			
		}
	};
</script>

<style>

</style>