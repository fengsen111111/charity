<template>
	<view class="tarBarClass text12 flex justify-evenly">
		<view @click="handleCheck(item)" class="col666 mt-3 text-center" v-for="item in tarbarList" :key="item.id">
			<image v-if="checkIndex==item.id" :src="item.checkUrl" mode="" class="iconAll"></image>
			<image v-else :src="item.url" mode="" class="iconAll"></image>
			<view class="ling4" :class="checkIndex==item.id?'col486':''">{{item.text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			checkIndex:0
		},
		data(){
			return {
				tarbarList:[
					{
						id:1,
						text:'首页',
						url:require('@/static/tabbar/home.png'),
						checkUrl:require('@/static/tabbar/home_checked.png'),
						path:'/pages/tabbar/home/index',
					},
					{
						id:2,
						text:'分类',
						url:require('@/static/tabbar/classify.png'),
						checkUrl:require('@/static/tabbar/classify_checked.png'),
						path:'/pages/tabbar/classify/index',
					},
					{
						id:3,
						text:'联系我们',
						url:require('@/static/tabbar/phone.png'),
						checkUrl:require('@/static/tabbar/phone_checked.png'),
						path:'/pages/tabbar/phone/index',
					},
					{
						id:4,
						text:'购物车',
						url:require('@/static/tabbar/shopping.png'),
						checkUrl:require('@/static/tabbar/shopping_checked.png'),
						path:'/pages/tabbar/shopping/index',
					},
					{
						id:5,
						text:'我的',
						url:require('@/static/tabbar/my.png'),
						checkUrl:require('@/static/tabbar/my_checked.png'),
						path:'/pages/tabbar/my/index',
					},
				]
			}
		},
		methods:{
			handleCheck(item){
				uni.navigateTo({
					url: item.path + ''
				})
			}
		},
		created(){
			console.log('底部生命周期');
		}
		
	}
</script>

<style>
	image{
		will-change: transform
	}
	
	.iconAll{
		width: 1.325rem;height: 1.325rem;
	}
	.tarBarClass{
		width: 100%;
		position: fixed;
		bottom: -0.1rem;
		height: 4rem;
		border-top: 1px solid #D7D9EC;
		background-color: #fff;
	}
</style>