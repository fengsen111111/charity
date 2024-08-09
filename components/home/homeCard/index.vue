<template>
	<view class="">
		<view class="active mt-4 p-2">
			<view class="flex items-center justify-between">
				<view class="flex items-center">
					<view class="text24 fontBold">新人专享</view>
					<view class="text12 space-x-1">专属福利仅限一份</view>
				</view>
				<view class="text12" @click="handleUrl('/pages/sonView/new/index')" >
					更多优惠
				</view>
			</view>
			<!-- shop -->
			<view class="grid grid-cols-3 pt-3">
				<view class="bg-whilt mr-2 h160 rending1" @click="handDetailds" v-for="item in [1,2,3]" :key="item">
					<image src="@/static/home/shopOne.png" mode="" class="w-full mt-1" style="height: 100px;"></image>
					<view class="text12 text-black text-center">
						高度浓香型白酒...
					</view>
					<view class="flex text12">
						<view class="text999 textDel">￥888</view>
						<view class="flex price rending2 space-x-1 px-1">
							<view>￥888</view>
							<view class="borLft1 space-x-1"><text class="space-x-1">抢</text></view>
						</view>
					</view>
				</view>
			</view>
			<!-- 新人优惠卷 -->
			<view class="mt-3">
				<text class="p-1 bgTag rending1">
					新人优惠卷
				</text>
			</view>
			<view class="bgTag h60 flex rending1 overflowAuto">
				<view class="cardVolume text-center flex justify-between colED1" v-for="(item,index) in [1,2]"
					:key="item">
					<view class="">
						<view class="text12 space-x-2">
							满20元可用
						</view>
						<text class="text10 general px-2 mxAuto py-1 bgFEB rending3">
							全场通用
						</text>
					</view>
					<view class="pt-3 ">
						<text class="text12 unit">￥</text>
						<text class="fontBold text20 mr-2">10</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script> 
	export default {
		components: {
		},
		data() {
			return {
				searchValue: '',
			};
		},
		onLoad() {},
		methods: {
			handDetailds(){
				console.log('跳转详情');
				uni.navigateTo({
				  url: '/pages/tabbar/home/components/shopDetails/index'
				})
			},
			handleUrl(url){
				console.log(url);
				uni.navigateTo({
					url:url+''
				})
			}
		}
	};
</script>

<style>
	.general {
		position: relative;
		top: -0.25rem;
	}
	.active {
		background: linear-gradient(270deg, #FA311D 0%, #FF8E34 100%);
		border-radius: 0.5rem;
		height: 292px;
	}
	.price {
		background: linear-gradient(270deg, #FA311D 0%, #FF8E34 100%);
	}
	.bgTag {
		background-color: #FA311D;
		border: 1px solid #FFCF9E;
	}
	.unit {
		position: relative;
		top: -0.4rem;
	}
	.cardVolume {
		background-image: url('@/static/home/card.png');
		background-size: 100% 100%;
		height: 2.75rem;
		width: 10rem;
		margin: 0.5rem;
	}
</style>