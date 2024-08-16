<template>
	<view class="">
		<topView />
		<tagClass />
		<shopBom />
		<view class="h-8"></view>
		<view class="h-4"></view>
		<!-- 购物 -->
		<view class="gw flex justify-between">
			<view class="flex mt-3">
				<view class="text-center space-x-6">
					<image src="@/static/classify/server_new.png" mode="" class="iconTwo"></image>
					<view class="text12 ling0 mt-1">客服</view>
				</view>
				<view class="text-center space-x-6">
					<image src="@/static/classify/shopping_new.png" mode="" class="iconTwo"></image>
					<view class="text12 ling0 mt-1">购物车</view>
				</view>
			</view>
			<!--  -->
			<view class="flex text-whlie text14">
				<view class="viewLeft bgFF8">
					加入购物车
				</view>
				<view class="viewRight bg486" @click="handleUrl('/pages/sonView/okOrder/index')">
					立即购买
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import topView from '@/pages/tabbar/classify/components/topView/index.vue'
	import tagClass from '@/pages/tabbar/classify/components/tagClass/index.vue'
	import shopBom from '@/pages/tabbar/classify/components/shopBom/index.vue'
	export default {
		components: {
			topView,
			tagClass,
			shopBom
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			handleUrl(url) {
				console.log(url);
				uni.navigateTo({
					url: url + ''
				})
			}
		}
	}
</script>

<style>
	.viewLeft {
		width: 4.5rem;
		padding: 0.5rem;
		border-radius: 1.5rem 0px 0px 1.5rem;
		height: 2rem;
		margin-top: 0.325rem;
		line-height: 2rem;
	}

	.viewRight {
		width: 4.5rem;
		padding: 0.5rem;
		border-radius: 0px 1.5rem 1.5rem 0px;
		height: 2rem;
		margin-top: 0.325rem;
		line-height: 2rem;
		margin-right: 1rem;
	}

	.iconTwo {
		width: 1.25rem;
		height: 1.25rem;
	}

	.gw {
		height: 4rem;
		background-color: #fff;
		position: fixed;
		top: 91.5vh;
		/* border: 1px solid red; */
		width: 100%;
	}
</style>