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
	    		<view class="flex">
	    			<view class="">更多</view>
	    			<uni-icons type="right" color="#205D57" size="15"></uni-icons>
	    		</view>
	    	</view>
			<view class="h18 bgEBEBEB"></view>
			<cardFunds />
			<view class="h18 bgEBEBEB"></view>
			<cardFunds />
			<view class="h18 bgEBEBEB"></view>
			<cardFunds />
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
	import cardFunds from '@/components/card_funds/index.vue'
	export default {
		components: {
			hearchItem,
			cardFunds
		},
		data() {
			return {
				value:''
			}
		},
		created() {
			//获取手机状态栏高度
		},
		mounted() {

		},
		watch: {},
		methods: {
			confirm() {
				uni.showToast({
					title: '搜索'
				})
			}
		}
	}
</script>

<style>
.img_null{
	width: 200rpx;
	height: 130rpx;
}
</style>