<template>
	<view class="bgImg text-whlie">
		<view class="px-3">
			<homeTop />
			<view class="">
				<image src="https://imgos.cn/2024/08/12/66b9d747830a1.png" @click="handleUrl('/pages/sonView/swiperActive/index')" mode="" class="w-full mt-3 h100 rending1"></image>
			</view>
			<!-- 新人专享 -->
			<homeCard />
			<!-- 酒水饮料 -->
			<twoCard />
			<!--  -->
			<image src="@/static/home/strip.png" mode="" class="w-full h-6"></image>
			<!-- 更多惊喜，更多福利 -->
			<active />
			<!-- tabs -->
			<view class="mt-3 text-black text12">
				<view class="flex">
					<view @click="handleItem(1)" class="mr-2" :class="checkItem == 1?'col486 text14 checkboxItem':''">推荐</view>
					<view @click="handleItem(2)" class="mr-2" :class="checkItem == 2?'col486 text14 checkboxItem':''">白酒类</view>
					<view @click="handleItem(3)" class="mr-2" :class="checkItem == 3?'col486 text14 checkboxItem':''">朗姆酒</view>
					<view @click="handleItem(4)" class="mr-2" :class="checkItem == 4?'col486 text14 checkboxItem':''">威士忌</view>
				</view>
				<bomShop />
			</view>
			<!-- 留高 -->
			<view class="h100">
			</view>
		</view>
		<!-- 底部导航 -->
		<tarBar :checkIndex="1"/>
	</view>
</template>

<script>
	import homeTop from '@/components/home/homeTop/index.vue'
	import bomShop from '@/components/home/bomShop/index.vue'
	import homeCard from '@/components/home/homeCard/index.vue'
	import twoCard from '@/components/home/twoCard/index.vue'
	import active from '@/components/home/active/index.vue'
	import tarBar from '@/components/tarBar/index.vue'
	export default {
		components: {
			bomShop,homeCard,twoCard,active,homeTop,
			tarBar
		},
		data() {
			return {
				searchValue: '',
				checkItem:1,
			};
		},
		onLoad() {},
		methods: {
			handleItem(index){
				this.checkItem = index
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
	
	.checkboxItem {
		border-bottom: 3px solid #4867CF;
		padding: 0px 0.5rem;
	}
	.tagShopItem {
		border: 1px solid #ED1805;
	}
	.countdown {
		border: 2px solid #FA311D;
		padding: 0px 0.25rem;
		border-radius: 0px 0.25rem 0.25rem 0px;
		position: relative;
		left: -0.25rem;
		height: 1.25rem;
		line-height: 1.1rem;
	}
	.tagBg {
		font-size: 10px;
		background-color: #D7D9EC;
		border-radius: 0px 0.25rem 0.25rem 0px;
	}
	.itemsEight {
		background: linear-gradient(85deg, #4867CF 0%, #31ADDC 100%);
	}
	.minShopImg {
		width: 5rem;
		height: 5rem;
	}
	.card {
		background-color: #F2F3FF;
		box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
		border-radius: 0.25rem;
		margin-left: 0.25rem;
	}
	.borderItem {
		background-image: url('@/static/home/borderItem.png');
		background-size: 100% 100%;
		width: 100%;
		height: 100%;
	}

	.-top-1 {
		position: relative;
		top: -0.25rem
	}
	.borLft1 {
		border-left: 1px solid #fff;
	}
	
	.bgImg {
		background-image: url('@/static/home/topBg.png');
		background-size: 100% 100%;
		height: 33rem;
	}
</style>