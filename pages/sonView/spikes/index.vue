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
				<view class="space-x-6" @click="handleItemCheck(1)" :class="itemCheck==1?'text-black':''">
					全部
					<view class="bgFA3 bottomHr w-3 rending1 mxAuto" v-if="itemCheck==1"></view>
				</view>
				<view class=" space-x-6" @click="handleItemCheck(2)" :class="itemCheck==2?'text-black':''">
					啤酒
					<view class="bgFA3 bottomHr w-3 rending1 mxAuto" v-if="itemCheck==2"></view>
				</view>
				<view class=" space-x-6" @click="handleItemCheck(3)" :class="itemCheck==3?'text-black':''">
					白酒
					<view class="bgFA3 bottomHr w-3 rending1 mxAuto" v-if="itemCheck==3"></view>
				</view>
				<view class=" space-x-6" @click="handleItemCheck(4)" :class="itemCheck==4?'text-black':''">
				    葡萄酒
					<view class="bgFA3 bottomHr w-3 rending1 mxAuto" v-if="itemCheck==4"></view>
				</view>
			</view>
			<view class="bgF9 py-3" >
				<view class="w90">
					<shopCardTwo>
						<!-- 疯抢 -->
						<view v-if="indexCheck==1" class="borderFF8 space-x-3 colFF8  flex items-center rending1">
							<view class="text11 fontBold space-x-3">
								<uni-countdown @timeup="timeup" :show-day="false" :hour="12" :minute="12" :second="40" />
							</view>
							<view class="text10 btnGo space-x-2 text-whlie px-3 py4rpx">去抢购</view>
						</view>
						<!-- 即将开始 -->
						<view v-else class="border999 space-x-3 col999 px-2 flex items-center rending1">
							<view class="text10">开始倒计时</view>
							<view class="text11 fontBold space-x-1 px-1 py4rpx">
								<uni-countdown @timeup="timeup" :show-day="false" :hour="12" :minute="12" :second="40" />
							</view>
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
	import {getGoodsList} from '@/request/api.js'
	import {
		debounce
	} from '@/utils/index.js' //节流
	export default {
		data() {
			return {
				active: false,
				indexCheck: 1,
				itemCheck:1
			};
		},
		onLoad() {
			this._getGoodsList() //限时秒杀
		},
		components:{viewTop,shopCardTwo},
		onShow() {
			
		},
		onHide() {
		}, 
		methods: {
			_getGoodsList(){
				getGoodsList({
					post_params: {
							store_id: "",   
							position: "time",
							goods_type_id: "",
							key_word: "",
							time_process: this.indexCheck==1?'a':'b',//限时秒杀进度  a进行中  b即将开始  
							order: null,
							currentPage: null,
							perPage: null
						}
				}).then((res)=>{
					console.log('商品列表',res);
				})
			},
			timeup(){
				
			},
			handleItemCheck(index){
				this.itemCheck = index
			},
			// 节流切换加载
			handleCheck:debounce(function(index){
				this.indexCheck = index
				this._getGoodsList()  
			},500)
		}
	};
</script>

<style>
	.btnGo{
		background: linear-gradient( 270deg, #FA311D 0%, #FF8E34 100%); 
		/* border-radius: 10rpx 10rpx 10rpx 10rpx; */
		border-radius: 8rpx 6rpx 6rpx 8rpx
	}
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