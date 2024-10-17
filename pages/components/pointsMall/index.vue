<template>
	<view>
		<hearchItem :isLeft="true" :title="'积分兑换'" />

		<!-- Search Bar -->
		<view class="bg-white">
			<view class="p35">
				<view class="border205D57 col9B9B9B text24 flex p10 items-center radius30">
					<uni-icons type="search" size="20" color="#205D57"></uni-icons>
					<view class="ml10 w-full">
						<input type="text" class="w-full col-black" v-model="key_word" @input="debouncedSearch"
							placeholder="请输入奖品/服务关键词搜索" />
					</view>
				</view>
			</view>

			<!-- Filter by Integral -->
			<view class="flex items-center px36 pb30">
				<view class="px10 text26 col205D57" @click="handleIndex(item)"
					v-for="(item, index) in configInfo.integral" :key="item">
					<view :class="checkIndex === item ? 'checkIndex' : ''">
						<text v-if="Number(index + 1) === Number(configInfo.integral.length)">{{ item + '以上' }}</text>
						<text v-else>{{ item }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- Loading Indicator -->
		<view v-if="isLoading" class="text-center text-gray-500 mt-4">加载中...</view>

		<!-- Points Exchange Items -->
		<view class="p35">
			<shopItem :jfList="jfList" />
		</view>


	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue';
	import shopItem from '@/components/shopItem/index.vue';
	import {
		getGoodsList
	} from '@/request/api.js';
	import debounce from 'lodash.debounce'; // Import lodash debounce for better input handling

	export default {
		components: {
			hearchItem,
			shopItem
		},
		data() {
			return {
				checkIndex: '', // Selected filter index
				key_word: '', // Search keyword
				jfList: [], // Points exchange items
				configInfo: {}, // Configuration info (from store)
				limit: 20, // Items limit per page
				isLoading: false // Loading state indicator
			};
		},
		created() {
			this.configInfo = this.$store.state.config; // Fetch config data
			this._getGoodsList(); // Initial fetch
		},
		methods: {
			// Debounced search to avoid excessive API calls
			debouncedSearch: debounce(function() {
				this._getGoodsList();
			}, 500),

			// Fetch the goods list based on the current filters
			_getGoodsList() {
				this.isLoading = true;
				getGoodsList({
					post_params: {
						key_word: this.key_word,
						integral: this.checkIndex,
						currentPage: 1,
						perPage: this.limit
					}
				}).then((res) => {
					this.jfList = res.data.data.list;
				}).finally(() => {
					this.isLoading = false;
				});
			},

			// Handle index (points filter) change
			handleIndex(index) {
				this.checkIndex = this.checkIndex === index ? '' : index;
				this._getGoodsList();
			},
		}
	};
</script>

<style scoped>
	.checkIndex {
		background: linear-gradient(90deg, #174437 0%, #225F43 100%);
		color: white;
		padding: 8rpx 30rpx;
		border-radius: 20rpx;
	}

	.text-center {
		text-align: center;
	}

	.text-gray-500 {
		color: #6B7280;
	}

	.mt-4 {
		margin-top: 16px;
	}
</style>