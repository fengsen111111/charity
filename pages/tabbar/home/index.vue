<template>
	<view class="bgImg px-3 text-whlie">
		<homeTop />
		<view class="imhs">
			<image src="@/static/home/imgs.png" mode="" class="w-full mt-4 h100 rending1"></image>
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
		<bomShop />
		<!-- 留高 -->
		<view class="h100">
		</view>
	</view>
</template>

<script>
	import homeTop from '@/components/home/homeTop/index.vue'
	import bomShop from '@/components/home/bomShop/index.vue'
	import homeCard from '@/components/home/homeCard/index.vue'
	import twoCard from '@/components/home/twoCard/index.vue'
	import active from '@/components/home/active/index.vue'
	export default {
		components: {
			bomShop,homeCard,twoCard,active,homeTop
		},
		data() {
			return {
				searchValue: '',
			};
		},
		onLoad() {},
		methods: {}
	};
</script>

<style>
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