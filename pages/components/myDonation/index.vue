<template>
	<view>
		<hearchItem :isLeft="true" :title="'我的捐赠'" />
		<view class="p40 text28">
			<view v-for="item in donList" :key="item.create_time">
				<view class="flex justify-between ">
					<view>基金名称</view>
					<view class="col787878">{{item.donate_name}}</view>
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
		</view>
	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue'
	import { getMyDonateLogList } from '@/request/api.js'

	export default {
		components: {
			hearchItem,
		},
		data() {
			return {
				donList: [],
				limit: 20,
				currentPage: 1,
				loading: false
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
			_getMyDonateLogList() {
				this.loading = true;
				getMyDonateLogList({
					post_params: {
						currentPage: this.currentPage,
						perPage: this.limit
					}
				}).then((res) => {
					console.log('最新数据', res.data.data);
					this.donList = this.donList.concat(res.data.data.list); // Append new data
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
/* 添加样式根据需要 */
</style>
