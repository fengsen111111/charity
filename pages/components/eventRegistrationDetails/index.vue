<template>
	<view class="">
		<hearchItem :isLeft="true" :title="'活动详情'" />
		<swiperItems :isBottom="false" />
		<view class="py30 flex justify-between ml36">
			<view class="text32 font-bold w-4-5">
				活动名称活动名称活动名称活动名称活动名称活动名称
			</view>
			<view class="status_1">进行中</view>
		</view>
		<view class="bgEBEBEB h18 "></view>
		<view class="py30 text24 px36">
			<view class="flex justify-between">
				<view class="">活动地址</view>
				<view class="col205D57 w-7-10">活动地址活动地址活动地址活动地址活动地址活动地址</view>
			</view>
			<view class="px36 py30">
				<view class=" bgEBEBEB h1"></view>
			</view>
			<view class="flex justify-between">
				<view class="">活动时间</view>
				<view class="col205D57 w-7-10 text-right">2024-12-12 16:00 至 2024-12-12 16:00</view>
			</view>
			<view class="px36 py30">
				<view class=" bgEBEBEB h1"></view>
			</view>
			<view class="flex justify-between">
				<view class="">发起组织</view>
				<view class="col205D57 w-7-10 text-right">组织单位名称</view>
			</view>
			<view class="px36 py30">
				<view class=" bgEBEBEB h1"></view>
			</view>
			<view class="flex justify-between items-center">
				<view class="">活动名额(剩余/共计)</view>
				<view class="colD6B07A w-3-5 text-right items-baseline ">
					<view class="text36">467/900<text class="ml10 text24">人</text></view>
				</view>
			</view>
			<view class="px36 py30">
				<view class=" bgEBEBEB h1"></view>
			</view>
			<view class="flex justify-between">
				<view class="">可获得积分</view>
				<view class="colD6B07A w-7-10 text-right">12,000积分</view>
			</view>
			<view class="px36 py30">
				<view class=" bgEBEBEB h1"></view>
			</view>
			<view class="flex justify-between">
				<view class="">集合地址</view>
				<view class="col205D57 w-7-10">活动地址活动地址活动地址活动地址活动地址活 动地址</view>
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
				<view class="btnForm">
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
	import cardFunds from '@/components/card_funds/index.vue'
	export default {
		components: {
			hearchItem,
			swiperItems,
			cardFunds
		},
		data() {
			return {
				indexItem: 1,
				form: {
					name: '',
					money: ''
				}
			}
		},
		created() {
			//获取手机状态栏高度
		},
		mounted() {

		},
		watch: {},
		methods: {
			// 切换
			handleIndex(index) {
				this.indexItem = index
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