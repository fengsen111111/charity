<template>
	<view class="">
		<hearchItem :isLeft="true" :title="'我的兑换'" />
		<view class="bg-white p40">
			<view class="flex justify-around  col6A8986 text30 font-bold">
				<view @click="handleIndex(1)" :class="indexItem == 1 ? 'border_bottom col205D57' : ''">待发货</view>
				<view @click="handleIndex(2)" :class="indexItem == 2 ? 'border_bottom col205D57' : ''">待收货</view>
				<view @click="handleIndex(3)" :class="indexItem == 3 ? 'border_bottom col205D57' : ''">已完成</view>
			</view>
		</view>
		<view>
			<view v-if="isLoading" class="loading-spinner">加载中...</view>
			<view v-else class="p35">
				<view class="bg-white radius10 p20 mb20" v-for="item in orderList" :key="item.id">
					<view class="flex">
						<image :src="item.cover_image" class="w200 h100 radius10" mode=""></image>
						<view class="ml20 w-full">
							<view class="flex w-full text28 justify-between items-center">
								<view>{{item.goods_name}}</view>
								<view class="flex colD6B07A items-baseline">
									<view class="text36 font-bold">{{item.integral}}</view>
									<view class="text18 ml10">积分</view>
								</view>
							</view>
							<view class="text20 col787878 mt30">x{{item.number}}</view>
						</view>
					</view>
					<view v-if="item.status === 'a'">
						<view class="text28 mt20">等待发货中...</view>
					</view>
					<view v-else-if="item.status === 'b'">
						<view class="flex justify-between items-center mt15">
							<view class="flex items-center">
								<view class="text28">{{item.express_name}}</view>
								<view class="text28 col49A3EF ml20 flex items-center">
									<image @click="copy(item.express_number)" src="../../../static/copy.png" class="mr10 img30" mode=""></image>
									<text class="text_number">{{item.express_number}}</text>
								</view>
							</view>
							<view @click="_overOrder(item)" class="py20 px36 font-bold col-white text30 radius20"
								style="background: linear-gradient(90deg, #BC9E61 0%, #DCB77E 100%);">
								确认收货
							</view>
						</view>
					</view>
					<view v-else-if="item.status === 'c'">
						<view class="text28 mt20 col205D57">已完成</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue';
	import { getOrderList, overOrder } from '@/request/api.js';

	export default {
		components: {
			hearchItem,
		},
		data() {
			return {
				indexItem: 1,
				orderList: [],
				limit: 20,
				isLoading: false,
			};
		},
		methods: {
			async copy(value) {
				try {
					await uni.setClipboardData({
						data: value,
					});
					uni.showToast({
						title: '复制成功',
					});
				} catch (err) {
					uni.showToast({
						title: '复制失败',
						icon: 'error',
					});
				}
			},
			async _overOrder(item) {
				uni.showLoading();
				try {
					const res = await overOrder({
						post_params: { order_id: item.id },
					});
					if (res.data.code === 1) {
						uni.showToast({
							title: '收货成功!',
							icon: 'success',
						});
						this._getOrderList();
					} else {
						uni.showToast({
							title: '收货失败!',
							icon: 'error',
						});
					}
				} finally {
					uni.hideLoading();
				}
			},
			async _getOrderList() {
				this.isLoading = true;
				try {
					const res = await getOrderList({
						post_params: {
							status: this.status,
							currentPage: 1,
							perPage: this.limit,
						},
					});
					this.orderList = res.data.data.list;
				} finally {
					this.isLoading = false;
				}
			},
			handleIndex(index) {
				this.indexItem = index;
				this._getOrderList();
			},
		},
		computed: {
			status() {
				return this.indexItem === 1 ? 'a' : this.indexItem === 2 ? 'b' : 'c';
			},
		},
		onReachBottom() {
			this.limit += 20;
			this._getOrderList();
		},
		onReady() {
			this._getOrderList();
		},
	};
</script>

<style>
	.text_number {
		width: 260rpx;
		word-break: break-all;
	}
	.loading-spinner {
		text-align: center;
		font-size: 30rpx;
		margin-top: 50rpx;
		color: #999;
	}
</style>
