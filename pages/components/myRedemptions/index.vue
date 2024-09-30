<template>
	<view class="">
		<hearchItem :isLeft="true" :title="'我的兑换'" />
		<view class="bg-white p40">
			<view class="flex justify-around  col6A8986 text30 font-bold">
				<view @click="handleIndex(1)" :class="indexItem==1?'border_bottom col205D57':''">待发货</view>
				<view @click="handleIndex(2)" :class="indexItem==2?'border_bottom col205D57':''">待收货</view>
				<view @click="handleIndex(3)" :class="indexItem==3?'border_bottom col205D57':''">已完成</view>
			</view>
		</view>
		<view class="p35">
			<view class="bg-white radius10 p20 mb20" v-for="item in orderList" :key="item.id">
				<view class="flex">
					<image :src="item.cover_image" class="w200 h100 radius10" mode=""></image>
					<view class="ml20 w-full">
						<view class="flex w-full text28 justify-between items-center">
							<view class="">{{item.name}}</view>
							<view class="flex colD6B07A items-baseline">
								<view class="text36 font-bold ">{{item.integral}}</view>
								<view class="text18 ml10">积分</view>
							</view>
						</view>
						<view class="text20 col787878 mt30">x{{item.stock}}</view>
					</view>
				</view>
				<view>
					<view class="flex justify-between items-center mt15">
						<view class="flex">
							<view class="text28">{{item.express_name}}</view>
							<view class="text28 col49A3EF ml20 flex items-center">
								<image @click="copy(item.express_number)" src="../../../static/copy.png"
									class="mr10 img30" mode=""></image>
								<text>{{item.express_number}}</text>
							</view>
						</view>
						<view @click="_overOrder(item)" class="py20 px36 font-bold col-white text30 radius20"
							style="background: linear-gradient(90deg, #BC9E61 0%, #DCB77E 100%);">
							确认收货
						</view>
					</view>
				</view>
				<view>
					<view class="text28 mt20">等待发货中...</view>
				</view>
				<view>
					<view class="text28 mt20 col205D57">已完成</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue'
	import cardActivity from '@/components/card_activity/index.vue'
	import {
		getOrderList, //获取订单列表
		overOrder //收获
	} from '@/request/api.js'
	export default {
		components: {
			hearchItem,
			cardActivity
		},
		data() {
			return {
				indexItem: 1,
				orderList:[],//
				limit:20
			}
		},
		onReachBottom(){
			this.limit = this.limit+20
			this._getOrderList()
		},
		onReady() {
			this._getOrderList()
		},
		watch: {},
		methods: {
			copy(value) {
				console.log('copy',value);
				uni.setClipboardData({
					data: value, //要被复制的内容
					success: () => { //复制成功的回调函数
						uni.showToast({ //提示
							title: '复制成功'
						})
					}
				});
			},
			_overOrder(item) {
				overOrder({
					post_params: {
						order_id: item.id
					}
				}).then((res) => {
					console.log('收获成功', res.data.data);
					this._getOrderList()
				})
			},
			_getOrderList() {
				getOrderList({
					post_params: {
						status: this.indexItem == 1 ? 'a' : this.indexItem == 2 ? 'b' : 'c',
						currentPage: 1,
						perPage: this.limit
					}
				}).then((res) => {
					console.log('订单列表', res.data.data.list);
					this.orderList = res.data.data.list
				})
			},
			// 
			handleIndex(index) {
				this.indexItem = index
				this._getOrderList()
			}

		}
	}
</script>

<style>

</style>