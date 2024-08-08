<template>
	<view class="">
		<view class="flex pt-14">
			<view class="text18 fontBold">快鹿送酒</view>
			<view class="text12 space-x-1 items-center">
				成都 
				<uni-icons class="space-x-1" type="down" color="#fff" size="16">
				</uni-icons>
			</view>
		</view>
		<view class="flex text12">
			<view>营业时间</view>
			<view class="space-x-1">23:00 - 3:00</view>
		</view>
		<view>
			<!-- <uni-search-bar class="uni-mt-4 pt-4" radius="100" placeholder="输入搜索内容" clearButton="none"
				cancelButton="none" @confirm="search" />
			</uni-section> -->
			<view class="flex search w-full h-8 mt-4 items-center" @click="handleSearch">
				<uni-icons type="search" color="#999999" class="space-x-2" size="20"></uni-icons>
				<view class="col999 ">
					输入搜索内容
				</view>
			</view>
		</view>
		<view class="flex justify-between text12 pt-2">
			<view v-for="item in [1,2,3,4,5]" :key="item" class="item">
				<view>标签测试</view>
			</view>
		</view>
	</view>
		
</template>

<script>
	export default {
		
		data() {
			return {
				searchValue: '',
			};
		},
		onLoad() {},
		methods: {
			handleSearch(){
				console.log('跳转');
				uni.navigateTo({
				  url: '/pages/tabbar/home/components/search/index'
				})
			}
		}
	};
</script>

<style>
	.search{
		border: 1px solid #D7D9EC;
		border-radius: 1rem;
		background-color:#D7D9EC ;
	}
	.item {
		/* opacity: 0.1; */
		background-color: #81B1EE;
		border-radius: 1rem;
		padding: 0px 0.5rem;
		color: #fff;
	}
</style>