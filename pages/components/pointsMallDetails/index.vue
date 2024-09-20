<template>
	<view class="">
		<hearchItem :isLeft="true" :title="'商品详情'" />
		<swiperItems :isBottom="false" />
		<view class="py30 px36">
			<view class="text32 font-bold">商品名称商品名称商品名称商品名称商品名称商品名称</view>
			<view class="flex items-baseline justify-between mt20">
				<view class="flex colD6B07A items-baseline">
					<view class="text60  font-bold">18,888</view>
					<view class="text24 ml10">积分</view>
				</view>
				<view class="text24 col787878">库存：122</view>
			</view>

		</view>
		<view class="bgEBEBEB h18 "></view>
		<view class="py30 px36 text32 indent32">
			慈善基金详情，慈善基金详情，慈善基金详基金基金基金情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情。
		</view>
		<view class="h100"></view>
		<!-- 屏幕定位 -->
		<view class="btnMoney w-full">
			<image src="../../../static/fenxiang.png" class="w100 h100 relative_fei" mode=""></image>
			<view class="mt20 px75 ">
				<view class="btnForm" @click="handUrl('/pages/components/okOrder/index')">
					立即下单
				</view>
			</view>
		</view>

		<view class="h20"></view>
	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue'
	import swiperItems from '@/components/swiperItems/index.vue'
	export default {
		components: {
			hearchItem,
			swiperItems,
		},
		data() {
			return {
				
			}
		},
		created() {
			//获取手机状态栏高度
		},
		mounted() {

		},
		watch: {},
		methods: {
			handUrl(item) {
				uni.navigateTo({
					url: item
				})
			},
		}
	}
</script>

<style>
	.relative_fei {
		position: relative;
		left: 84vw;
	}

	.border-bottom-dotted {
		border: 1rpx dotted #9B9B9B;
	}

	.charitableImg {
		width: 170rpx;
		height: 65rpx;
	}

	.bgtwo {
		background: linear-gradient(90deg, #164336 0%, #226043 100%);
	}
</style>