<template>
	<view class="bgMyImg ">
		<view class="pt4 col999 flex items-center px-3">
			<uni-icons type="left"  size="30" color="#D7D9EC" @click="handleLeft"></uni-icons>
			<uni-search-bar clearButton="none" class="space-x-3 uni-search-bar" radius="100" placeholder="输入搜索内容" 
				cancelButton="none" @confirm="search" />
			</uni-section>
		</view>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
	
		},
		methods: {
	
		}
	}
</script>

<style>
	.bgMyImg {
		color: #fff;
		background-image: url('@/static/my/topBg.png');
		background-size: 100% 100%;
		height: 8rem;
		width: 100%;
	}
</style>