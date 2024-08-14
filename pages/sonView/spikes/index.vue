<template>
	<view class="">
		<viewTop :title="'快鹿送酒'">
			<view class="text-center">
				<image src="@/static/home/spikesTop.png" mode="" class="imgText"></image>
			</view>
		</viewTop>
		
		<view class="grid grid-cols-2 text16 bgFBD text-center -mtop10">
			<view class="py-3" @click="handleCheck(1)" :class="indexCheck==1?'text-whlie bgCheck1':'colED1'">
				正在疯抢
			</view>
			<view class="py-3" @click="handleCheck(2)" :class="indexCheck==2?'text-whlie bgCheck2':'colED1'">
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
			<view class="bgF9 py-3" >
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
	import viewTop from "@/pages/sonView/volume/components/viewTop/index.vue"
	import shopCardTwo from '@/components/shopCardTwo/index.vue'
	export default {
		data() {
			return {
				active: false,
				indexCheck: 1
			};
		},
		onLoad() {},
		components:{viewTop,shopCardTwo},
		onShow() {
			
		},
		onHide() {
		},
		methods: {
			handleCheck(index){
				this.indexCheck = index
			}
		}
	};
</script>

<style>
	.-mtop10{
		margin-top:-10rpx
	}
	.bottomHr{
		height: 0.125rem;
	}
	.nullImg{
		width: 5rem;
		height: 5rem;
	}
	.bgCheck1{
		background: linear-gradient( 180deg, #FF793E 0%, #FF2C26 100%);
		border-radius:  0px 0.5rem 0.5rem 0px;
	}
	.bgCheck2{
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