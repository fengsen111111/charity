<template>
	<view class="">
		<view class="bg486 col999 topSearch flex items-center px-3">
			<uni-icons type="left" size="30" color="#fff" @click="handleLeft"></uni-icons>
			<uni-search-bar clearButton="none" class="space-x-3" radius="100" placeholder="输入搜索内容" 
				cancelButton="none" @confirm="search" />
			</uni-section>
		</view>
		<view class="bg-whilt rending1 p-2">
			<view class="text10 flex items-center space-x-6">
				<image src="@/static/home/iconSearch.png" mode="" class="iconImg"></image>
				热门
			</view>
			<view class="grid grid-cols-4 text12 text-center">
				<text class="bgF9  rending1 mt-2" v-for="item in data" :key="item.id">
					{{item.text}}
				</text>
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
				data:[
					{
						id:1,
						text:'百威'
					},
					{
						id:2,
						text:'雪花'
					},
					{
						id:3,
						text:'勇闯天涯'
					},
					{
						id:4,
						text:'科罗纳'
					},
					{
						id:5,
						text:'纯生'
					},
					{
						id:6,
						text:'嘉士伯'
					},
				]
			};
		},
		onLoad() {},
		methods: {
			handleLeft(){
				uni.navigateBack()
			}
		}
	};
</script>

<style>
	.iconImg{
		width: 0.5rem;height: 0.6rem;
		margin-right: 0.25rem;
	}
	.topSearch{
		height: 3.75rem;
	}
</style>