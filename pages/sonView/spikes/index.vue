<template>
	<view class="">
		<top :title="'快鹿送酒'">
			<view class="text-center">
				<image src="@/static/home/spikesTop.png" mode="" class="imgText"></image>
			</view>
		</top>
		
		<view class="grid grid-cols-2 text16 bgFBD text-center">
			<view class="py-3 colED1">
				正在疯抢
			</view>
			<view class="py-3 text-whlie bgCheck">
				即将开始
			</view>
		</view>
		<!-- 即将开始 -->
		<view class="">
			<view class="flex p-2 col666 text12 bg-whilt">
				<view class="text-black space-x-6">
					全部
					<view class="bgFA3 bottomHr w-3 rending1 mxAuto"></view>
				</view>
				<view class=" space-x-6">啤酒</view>
				<view class=" space-x-6">白酒</view>
				<view class=" space-x-6">葡萄酒</view>
			</view>
			<view class="bgF9 p-3" >
				
				<view class="w90">
					<shopCardTwo>
						<view class="border999 space-x-3 col999  p-1 rending1  p-1">
							<text class="text10">开始倒计时</text>
							<text class="text11 fontBold space-x-1">01:59:59</text>
						</view>
					</shopCardTwo>
				</view>
			</view>
		</view>
		<!-- null -->
		<view class="text-center">
			<view class="h-8"></view>
			<view class="h-8"></view>
			<view class="h-8"></view>
			<image src="@/static/home/null.png" mode="" class="nullImg"></image>
			<view class="colD7D mt-3">活动加速准备中</view>
		</view>
	</view>
</template>

<script>
	import top from "@/pages/sonView/volume/components/top/index.vue"
	import shopCardTwo from '@/components/shopCardTwo/index.vue'
	export default {
		data() {
			return {
				active: false
			};
		},
		onLoad() {},
		components:{top,shopCardTwo},
		onShow() {
			
		},
		onHide() {
		},
		methods: {
		}
	};
</script>

<style>
	.bottomHr{
		height: 0.125rem;
	}
	.nullImg{
		width: 5rem;
		height: 5rem;
	}
	.bgCheck{
		background: linear-gradient( 180deg, #FF793E 0%, #FF2C26 100%);
		border-radius: 0.5rem 0px 0px 0.5rem;
	}
	.imgText{
		position: relative;
		top: 1rem;
		width: 11rem;
		height: 4rem;
	}
</style>