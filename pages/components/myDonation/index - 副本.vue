<template>
	<view>
		<hearchItem :isLeft="true" :title="'我的捐赠'" />
		<view class="text-center py20" v-if="loading">
			加载中...
		</view>
		<view class="p40 text28">
			<view v-for="item in donList" :key="item.create_time">
				<view class="flex justify-between ">
					<view>基金名称</view>
					<view class="col787878">{{item.donate_name}}</view>
				</view>
				<view class="flex justify-between mt20">
					<view></view>
					<view class="colD6B07A" @click="lookZS(item)">查看证书</view>
				</view>
				<view class="flex justify-between items-baseline">
					<view class="flex items-baseline">
						<view>捐赠</view>
						<view class="text60 colD6B07A ml10 font-bold">{{item.money}}</view>
						<view class="ml10">元</view>
					</view>
					<view class="col787878">{{item.create_time}}</view>
				</view>
				<view class="h1 bgEBEBEB my34"></view>
			</view>
			<!-- {{total}} -->
			<view class="flex justify-between">
				<view @click="handleJJ(1)">上一页</view>
				<view class=""><text style="color: #D6B07A;">{{currentPage}}</text>{{'/'+Math.ceil(total/limit)}}</view>
				<view @click="handleJJ(2)">下一页</view>
			</view>
			<!--  -->
		</view>
		<!--  -->
		<uni-popup ref="popup" type="bottom" border-radius="10px 10px 0 0">
			<view class="">
				<view class="bg_zs" style="background-image: url('../../../static/zsbg_two.jpg');">
					<view
						style="position: relative;top: 264rpx;left: 340rpx;font-weight: bold;font-size: 22rpx;color: #898b8b;">
						{{itemObj.out_trade_no}}
					</view>
					<view style="position: relative;top: 302rpx;left: 220rpx;">{{itemObj.name}}</view>
					<view style="font-size:28rpx;position: relative;top: 505rpx;left: 240rpx;">{{itemObj.donate_name}}
					</view>
					<view
						style="font-size:28rpx;position: relative;top: 530rpx;left: 240rpx; font-weight: bold;color: #bb3631;">
						{{itemObj.money}}<text class="ml10 col-black">元</text>
					</view>
					<view style="font-size:20rpx;position: relative;top: 716rpx;left: 460rpx;">{{itemObj.create_time}}
					</view>
				</view>
				<view class="flex mt20">
					<view class="text-center col-white font-bold px20 py10 mx-auto" style="border: 1px solid white;">
						保存图片</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue'
	import {
		getMyDonateLogList
	} from '@/request/api.js'

	export default {
		components: {
			hearchItem,
		},
		data() {
			return {
				donList: [],
				limit: 10,
				currentPage: 1,
				loading: false,
				total: 0,

				itemObj: {}
			}
		},
		onReachBottom() {
			this.currentPage++;
			this._getMyDonateLogList();
		},
		onReady() {
			this._getMyDonateLogList();
		},
		methods: {

			lookZS(item) {
				// 查看证书
				this.itemObj = item
				this.$refs.popup.open('center')
			},
			handleJJ(type) {
				if (type == 1) {
					// 上一页
					if (this.currentPage > 1) {
						this.currentPage--
						this._getMyDonateLogList()
					} else {
						uni.showToast({
							title: '已到最小页!',
							icon: 'error',
							duration: 1000
						});
					}
				} else {
					// 下一页
					if (Math.ceil(this.total / this.limit) >= this.currentPage + 1) {
						this.currentPage++
						this._getMyDonateLogList()
					} else {
						uni.showToast({
							title: '已到最后一页!',
							icon: 'error',
							duration: 1000
						});
					}

				}
			},
			_getMyDonateLogList() {
				this.loading = true;
				getMyDonateLogList({
					post_params: {
						currentPage: this.currentPage,
						perPage: this.limit
					}
				}).then((res) => {
					console.log('最新数据', res.data.data);
					// this.donList = this.donList.concat(res.data.data.list); // Append new data
					this.donList = res.data.data.list
					this.total = res.data.data.count
				}).catch(err => {
					console.error('获取数据失败', err);
				}).finally(() => {
					this.loading = false;
				});
			}
		}
	}
</script>

<style>
	.bg_zs {
		width: 700rpx;
		height: 1000rpx;
		background-size: 100% 100%;
	}
</style>