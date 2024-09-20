<template>
	<view class="bg-white" style="padding-bottom: 400rpx;">
		<view class="home_top " style="background-image: url('../../static/home_top.png');">
			<view class="px36">
				<image src="../../static/home_text.png" class="textImg" mode=""></image>
				<view class="flex justify-between items-center mt10">
					<view class="flex">
						<view class="imgSearch p10 flex text24 justify-between  items-center">
							<view class="flex items-center ml10" @click="handleSearch">
								<image src='../../static/home_search_icon.png' class="img36" mode=""></image>
								<view class="col29545A">关键词搜索</view>
							</view>
							<image src='../../static/home_search_right.png' class="img36 mr20" @click="handleCode" mode=""></image>
						</view>
						<view class="imgactive font-bold col29545A flex items-center p10">
							<view class="text24 ml10">积分</view>
							<view class="text30 ml10 mr10">999</view>
						</view>
					</view>
					<view class="flex">
						<image src="../../static/home_tz.png" class="tzImg" mode="">
						</image>
						<view class="checkboxTz"></view>
					</view>
				</view>
				<!-- 轮播 -->
				<view class="mt20">
					<swiperItems />
				</view>
				<!-- card -->
				<view class="flex justify-between mt20">
					<image src="../../static/item_1.png" class="cards_img" @click="handUrl('/pages/components/charitableFunds/index')" mode=""></image>
					<image src="../../static/item_1.png" class="cards_img" @click="handUrl('/pages/components/eventRegistration/index')" mode=""></image>
					<image src="../../static/item_2.png" class="cards_img" @click="handUrl('/pages/components/volunteer/index')" mode=""></image>
					<image src="../../static/item_3.png" class="cards_img" @click="handUrl('/pages/components/pointsMall/index')" mode=""></image>
				</view>

				<!--  -->
				<view class="flex justify-around mt77 col205D57 text30 font-bold">
					<view @click="handleIndex(1)" :class="indexItem==1?'border_bottom':''">慈善基金</view>
					<view @click="handleIndex(2)" :class="indexItem==2?'border_bottom':''">活动报名</view>
				</view>
			</view>
			<!-- 慈善基金 -->
			<view class="mt40" v-if="indexItem==1" @click="handUrl('/pages/components/charitableFundsDetails/index')">
				<cardFunds />
				<cardFunds />
				<cardFunds />
				<cardFunds />
				<cardFunds />
			</view>
			<!-- 活动报名 -->
			<view class="mt40" v-else @click="handUrl('/pages/components/pointsMallDetails/index')">
				<cardActivity />
			</view>
			<!-- 留白 -->
			<view class="h160"></view>
		</view>

		<tarBar :checkIndex='1' />
	</view>
</template>

<script>
	import tarBar from '@/components/tarbar/index.vue'
	import cardFunds from '@/components/card_funds/index.vue'
	import cardActivity from '@/components/card_activity/index.vue'
	import swiperItems from '@/components/swiperItems/index.vue'
	export default {
		components: {
			tarBar,
			swiperItems,
			cardFunds,
			cardActivity
		},
		data() {
			return {
				indexItem: 1,
			}
		},
		created() {},
		mounted() {},
		watch: {},
		methods: {
			handUrl(item){
				uni.navigateTo({
					url: item
				})
			},
			// 扫码
			handleCode(){
				uni.scanCode({
					success: function (res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			},
			// 搜索
			handleSearch(){
				uni.navigateTo({
					url:'/pages/components/search/index'
				})
			},
			// 切换
			handleIndex(index) {
				this.indexItem = index
			},
		}
	}
</script>

<style>
	
	


	.cards_img {
		width: 142rpx;
		height: 142rpx;
		border-radius: 20rpx;
	}

	.checkboxTz {
		position: relative;
		top: 8rpx;
		left: -12rpx;
		background-color: red;
		width: 10rpx;
		height: 10rpx;
		border-radius: 10rpx
	}

	.tzImg {
		width: 42rpx;
		height: 50rpx;
	}

	.imgactive {
		background-image: url('../../static/home_active.png');
		background-size: 100% 100%;
		/* width: 154rpx; */
		height: 60rpx;
		margin-left: 18rpx;
	}

	.imgSearch {
		background-image: url('../../static/home_search.png');
		background-size: 100% 100%;
		width: 340rpx;
		height: 60rpx;
	}

	.img36 {
		width: 36rpx;
		height: 36rpx;
	}

	.home_top {
		background-size: 100% 100%;
		height: 648rpx;
	}

	.textImg {
		width: 445rpx;
		height: 65rpx;
		margin-top: 133rpx;
	}
</style>