<template>
	<view class="mt-3 h-full flex text12 ">
		<view class="bg-whilt px-3 rending1 ">
			<view class="py-2" :class="item.id>1?'col999':'col666'" v-for="item in dataTab" :key="item.id">
			{{item.text}}
			</view>
		</view>
		<!-- shop -->
		<view class="rightWidth">
			<shopCardTwo>
			  <!-- 选规格 -->
			  <view class="">
			  	<view class="bg486 text-whlie px-2 rending1 py-1 space-x-2">
			  		选规格
			  	</view>
			  </view>	
			</shopCardTwo>
		</view>
	</view>
</template>

<script>
	import shopCardTwo from '@/components/shopCardTwo/index.vue'
	export default {
		components:{
			shopCardTwo
		},
		data() {
			return {
				title: 'Hello',
				dataTab:[
					{
						id:1,
						text:'国产风味'
					},
					{
						id:2,
						text:'进口风味'
					},
					{
						id:3,
						text:'百威'
					},
					{
						id:4,
						text:'雪花'
					},
					{
						id:5,
						text:'燕京'
					},
					{
						id:6,
						text:'乐堡'
					},
				]
			}
		},
		onLoad() {
	
		},
		methods: {
	
		}
	}
</script>

<style>
	.rightWidth{
		width: 17.5rem;
	}
</style>