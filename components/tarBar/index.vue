<template>
	<view class="tarBarClass text24 font-bold flex justify-around">
		<view @click="handleCheck(item)" class=" text-center" v-for="item in tarbarList" :key="item.id">
			<image v-if="checkIndex==item.id" :src="item.checkUrl" mode="" class="iconAll"></image>
			<image v-else :src="item.url" mode="" class="iconAll"></image>
			<view class="" :class="checkIndex==item.id?'color205D57':''">{{item.text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			checkIndex: {
				type: String,
				default: '1'
			}
		},
		data() {
			return {
				route: '',
				tarbarList: [{
						id: 1,
						text: '首页',
						url: require('@/static/icon/home.png'),
						checkUrl: require('@/static/icon_che/home.png'),
						path: '/pages/home/index',
					},
					{
						id: 2,
						text: '关于基金',
						url: require('@/static/icon/aixin.png'),
						checkUrl: require('@/static/icon_che/aixin.png'),
						path: '/pages/about/index',
					},
					{
						id: 3,
						text: '我的',
						url: require('@/static/icon/my.png'),
						checkUrl: require('@/static/icon_che/my.png'),
						path: '/pages/my/index',
					},
				]
			}
		},
		created() {
			const pages = getCurrentPages();
			const page = pages[pages.length - 1];
			console.log('底部生命周期', page.route);
			this.route = page.route
		},
		methods: {
			handleCheck(item) {
				console.log('执行跳转', item)
				// 跳转
				if (item.path == '/' + this.route) {
					console.log("跳转当前页，拒绝")
				} else {
					uni.reLaunch({
						url: item.path
					})
				}
			}
		},
	}
</script>

<style>
	image {
		will-change: transform
	}

	.iconAll {
		width: 63rpx;
		height: 63rpx;
	}

	.tarBarClass {
		width: 100%;
		position: fixed;
		bottom: 0px;
		height: 133rpx;
		/* border-top: 1px solid #D7D9EC; */
		background-color: #fff;
		padding-top: 20rpx;
		color: #6A8986;
	}
</style>