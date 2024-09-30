<template>
	<view class="bg-white" style="height: 100vh;">
		<hearchItem :isLeft="true">
			<view class="flex items-center bg-white p10 radius50 mt15 relative -left80">
				<uni-icons class="input-uni-icon" type="search" size="18" color="#999" />
				<input confirm-type="search" v-model="value" style="color: black;" class="nav-bar-input" type="text"
					placeholder="输入搜索关键词" @confirm="confirm" />
			</view>
		</hearchItem>
		<!-- list -->
		<view v-if="value">
			<view class="py30 text30 col205D57 font-bold px36 flex justify-between">
				<view class="titleView">
					<view class="ml20">慈善基金</view>
				</view>
				<view class="flex" @click="handleMore()">
					<view class="">更多</view>
					<uni-icons type="right" color="#205D57" size="15"></uni-icons>
				</view>
			</view>
			<view v-for="(item,index) in donList" :key="index">
				<view class="h18 bgEBEBEB"></view>
				<cardFundsTwo :itemObj="item" />
			</view>
		</view>
		<!-- null -->
		<view v-else>
			<view class="pt200 flex">
				<view class="mx-auto">
					<image src="@/static/search_null.png" class="img_null " mode=""></image>
				</view>
			</view>
			<view class="text24 text-center mt10 col9B9B9B">
				暂无搜索数据
			</view>
		</view>

	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue'
	import cardFundsTwo from '@/components/card_funds/index_two.vue'
	import {
		getDonateList
	} from '@/request/api.js'
	export default {
		components: {
			hearchItem,
			cardFundsTwo
		},
		data() {
			return {
				value: '',
				donList:[]//基金列表
			}
		},
		created() {
			//获取手机状态栏高度
		},
		mounted() {

		},
		methods: {
			handleMore(){
				uni.navigateTo({
					url:'/pages/components/charitableFunds/index'
				})
			},
			confirm() {
				this._getDonateList()
			},
			// 基金列表
			_getDonateList() {
				uni.showLoading();
				setTimeout(()=>{
				    uni.hideLoading();
				},500)
				getDonateList({
					post_params: {
						key_word: this.value,//关键词
						currentPage: 1,
						perPage: 20
					}
				}).then((res) => {
					console.log('首页基金列表', res.data.data.list);
					this.donList = res.data.data.list
				})
			},
		}
	}
</script>

<style>
	.img_null {
		width: 200rpx;
		height: 130rpx;
	}
</style>