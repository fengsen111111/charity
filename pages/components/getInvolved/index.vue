<template>
	<view>
		<hearchItem :isLeft="true" :title="'我参与的活动'" />
		<!-- Tab Navigation -->
		<view class="bg-white p40">
			<view class="flex justify-around  col6A8986 text30 font-bold">
				<view @click="handleIndex(1)" :class="indexItem==1?'border_bottom col205D57':''">待开始</view>
				<view @click="handleIndex(2)" :class="indexItem==2?'border_bottom col205D57':''">进行中</view>
				<view @click="handleIndex(3)" :class="indexItem==3?'border_bottom col205D57':''">已结束</view>
			</view>
		</view>

		<!-- Loading Indicator -->
		<view v-if="isLoading" class="text-center text-gray-500 mt-4">加载中...</view>
		<!-- Activity List Component -->
		<cardActivityTwo :isCode="true" :activeList="activeList" />


	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue';
	import cardActivityTwo from '@/components/card_activity/index_two.vue';
	import {
		getActivityOrderList
	} from '@/request/api.js';

	export default {
		components: {
			hearchItem,
			cardActivityTwo
		},
		data() {
			return {
				indexItem: 1, // Current selected tab index
				limit: 10, // Limit of activities to load
				activeList: [], // Activities list
				isLoading: false // Loading state
			};
		},
		onReady() {
			this._getActivityOrderList();
		},
		methods: {
			// Fetch activity list based on the current tab
			async _getActivityOrderList() {
				this.isLoading = true;
				try {
					const res = await getActivityOrderList({
						post_params: {
							status: this.getStatus()
						}
					});
					this.activeList = res.data.data.list;
				} catch (error) {
					console.error('Failed to fetch activity list', error);
				} finally {
					this.isLoading = false;
				}
			},

			// Handle tab switch
			handleIndex(index) {
				if (this.indexItem !== index) {
					this.indexItem = index;
					this._getActivityOrderList();
				}
			},

			// Get the status based on the current tab
			getStatus() {
				return this.indexItem === 1 ? 'a' : this.indexItem === 2 ? 'b' : 'c';
			},
		}
	};
</script>

<style scoped>
	.text-center {
		text-align: center;
	}

	.text-gray-500 {
		color: #6B7280;
	}

	.mt-4 {
		margin-top: 16px;
	}

	.border_bottom {
		border-bottom: 2px solid #205D57;
	}
</style>