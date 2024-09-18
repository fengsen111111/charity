<template>
	<view class="bg-white" style="padding-bottom: 400rpx;">
		<view class="home_top " style="background-image: url('../../static/home_top.png');">
			<view class="px36">
				<image src="../../static/home_text.png" class="textImg" mode=""></image>
				<view class="flex justify-between items-center mt10">
					<view class="flex">
						<view class="imgSearch p10 flex text24 justify-between  items-center">
							<view class="flex items-center ml10">
								<image src='../../static/home_search_icon.png' class="img36" mode=""></image>
								<view class="col29545A">关键词搜索</view>
							</view>
							<image src='../../static/home_search_right.png' class="img36 mr20" mode=""></image>
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
					<image src="../../static/item_1.png" class="cards_img" mode=""></image>
					<image src="../../static/item_1.png" class="cards_img" mode=""></image>
					<image src="../../static/item_2.png" class="cards_img" mode=""></image>
					<image src="../../static/item_3.png" class="cards_img" mode=""></image>
				</view>

				<!--  -->
				<view class="flex justify-around mt77 col205D57 text30 font-bold">
					<view @click="handleIndex(1)" :class="indexItem==1?'border_bottom':''">慈善基金</view>
					<view @click="handleIndex(2)" :class="indexItem==2?'border_bottom':''">活动报名</view>
				</view>
			</view>
			<!-- 慈善基金 -->
			<view class="mt40" v-if="indexItem==1">
				<view class="flex mt20 py20 bg-white px36" v-for="item in [1,2,3,4,5]" :key="item">
					<image src="https://img.picui.cn/free/2024/09/18/66ea73b25c621.png" class="cardImg" mode=""></image>
					<view class=" ml30">
						<view class="text32">基金名称</view>
						<view class="col787878 text24 mt20">负责单位名称</view>
						<view class="flex items-center text24">
							<view class="">已募集</view>
							<view class=" colD6B07A ml106"><text class="text60 font-bold mr10">33,340</text>元</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 活动报名 -->
			<view class="mt40" v-else>
				<view class="flex mt20 py20 bg-white px36" v-for="item in [1,2,3]" :key="item">
					<image src="https://img.picui.cn/free/2024/09/18/66ea73b25c621.png" class="cardImg" mode=""></image>
					<view class=" ml30">
						<view class="flex">
							<view class="text32 font-bold w-3-4">活动名称活动名称活动名称</view>
							<view v-if="item==1" class="status_1">进行中</view>
							<view v-else-if="item==2" class="status_2">已结束</view>
							<view  v-else-if="item==3" class="status_3">待开始</view>
						</view>
						<view class="flex justify-between items-center mt10">
							<view class="font-bold text32 col205D57">名额：15人</view>
							<view class="text24 col-black">可获得<text class="ml10 colD6B07A">12,000积分</text></view>
						</view>
						<view class="flex text18 col787878 mt10">
							活动时间：2024-12-12 16:30至2024-12-12 16:30
						</view>
					</view>
				</view>
			</view>
			<!-- 留白 -->
			<view class="h160"></view>
		</view>

		<tarBar :checkIndex='1' />
	</view>
</template>

<script>
	import tarBar from '@/components/tarbar/index.vue'
	import swiperItems from '@/components/swiperItems/index.vue'
	export default {
		components: {
			tarBar,
			swiperItems
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
			handleIndex(index) {
				this.indexItem = index
			},
		}
	}
</script>

<style>
	.status_1 {
		background: linear-gradient(90deg, #1A4A3B 0%, #205F43 100%);
		border-radius: 23rpx 0rpx 0rpx 23rpx;
		position: absolute;
		right: 0rpx;
		padding: 8rpx 20rpx;
		font-size: 24rpx;
		color: #fff;
	}
	.status_2 {
		background: linear-gradient(90deg, #656465 0%, #8B8B8A 100%);
		border-radius: 23rpx 0rpx 0rpx 23rpx;
		position: absolute;
		right: 0rpx;
		padding: 8rpx 20rpx;
		font-size: 24rpx;
		color: #fff;
	}
	.status_3 {
		background: linear-gradient(90deg, #A38043 0%, #D8B880 100%);
		border-radius: 23rpx 0rpx 0rpx 23rpx;
		position: absolute;
		right: 0rpx;
		padding: 8rpx 20rpx;
		font-size: 24rpx;
		color: #fff;
	}

	.cardImg {
		width: 225rpx;
		height: 165rpx;
		border-radius: 20rpx;
	}

	.border_bottom {
		/* width: 34rpx; */
		border-bottom: 4rpx solid #205D57;
		padding-bottom: 10rpx;
	}

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