<template>
	<view class="">
	<!-- 	<view class="flex py20 bg-white px36" @click="handelUrl()">
			<image src="https://img.picui.cn/free/2024/09/18/66ea73b25c621.png" class="cardImg" mode=""></image>
			<view class=" ml30">
				<view class="text32">基金名称</view>
				<view class="col787878 text24 mt20">负责单位名称</view>
				<view class="flex items-baseline text24">
					<view class="">已募集</view>
					<view class=" colD6B07A ml106"><text class="text60 font-bold mr10">33,340</text>元</view>
				</view>
			</view>
		</view> -->
		<view class="flex py20 bg-white px36" v-for="item in donList" :key="item.id" @click="handelUrl(item.id)">
			<image :src="item.cover_image" class="cardImg" mode=""></image>
			<view class=" ml30">
				<view class="text32">{{item.name}}</view>
				<view class="col787878 text24 mt20">{{item.org_name}}</view>
				<view class="flex items-baseline text24">
					<view class="">已募集</view>
					<view class=" colD6B07A ml106"><text class="text60 font-bold mr10">{{item.all_money}}</text>元</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			donList:{
				type: Array,
				default:()=>[]
			}
		},
		methods:{
			// 基金详情
			handelUrl(funds_id){
				uni.navigateTo({
					url:'/pages/components/charitableFundsDetails/index?funds_id='+funds_id
				})
			}
		}
	}
</script>

<style>
	.cardImg {
		width: 225rpx;
		height: 165rpx;
		border-radius: 20rpx;
	}
</style>