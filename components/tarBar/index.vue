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
	import {
		apiCeshi
	} from '@/request/api.js'
	export default {
		props: {
			checkIndex: 0
		},
		data() {
			return {
				route: '',
				tarbarList: [{
						id: 1,
						text: '首页',
						url: require('@/static/tabbar/home.png'),
						checkUrl: require('@/static/tabbar/home_checked.png'),
						path: '/pages/tabbar/home/index',
					},
					{
						id: 2,
						text: '分类',
						url: require('@/static/tabbar/classify.png'),
						checkUrl: require('@/static/tabbar/classify.png'),
						path: '/pages/tabbar/classify/index',
					},
					{
						id: 3,
						text: '联系我们',
						url: require('@/static/tabbar/phone.png'),
						checkUrl: require('@/static/tabbar/phone.png'),
						path: '/pages/tabbar/phone/index',
					},
					{
						id: 4,
						text: '购物车',
						url: require('@/static/tabbar/shopping.png'),
						checkUrl: require('@/static/tabbar/shopping_checked.png'),
						path: '/pages/tabbar/shopping/index',
					},
					{
						id: 5,
						text: '我的',
						url: require('@/static/tabbar/my.png'),
						checkUrl: require('@/static/tabbar/my_checked.png'),
						path: '/pages/tabbar/my/index',
					},
				]
			}
		},
		methods: {
			handleCheck(item) {
				console.log('执行跳转', item)
				switch (Number(item.id)) {
					case 1:
						uni.reLaunch({
							url: item.path
						})
						break;
					case 3:
						uni.makePhoneCall({
							phoneNumber: '1111111',
							success: function() {
								console.log('拨号');
							},
							fail: function() {
								console.log('拨号失败！');
							}
						})
						break;
					case 4:
						uni.reLaunch({
							url: item.path
						})
						break;
					case 5:
						// 判断有无权限
						if (this.$store.state.login) {
							uni.reLaunch({
								url: item.path
							})
						} else {
							uni.navigateTo({
								url: '/pages/sonView/login/index'
							})
						}
						break;
					default:
						// 跳转
						if (item.path == '/' + this.route) {
							console.log("跳转当前页，拒绝")
						} else {
							uni.navigateTo({
								url: item.path
							})
						}
				}
				// if(item.id==3){
				// 	// 拨号
				// 	uni.makePhoneCall({
				// 		phoneNumber:'1111111',
				// 		success: function(){
				// 			console.log('拨号');
				// 		},
				// 		fail: function(){
				// 			console.log('拨号失败！');
				// 		}
				// 	})
				// }else if (item.id==5){
				// 	// 判断有无权限
				// 	if(this.$store.state.login){
				// 		uni.navigateTo({
				// 			url: item.path
				// 		})
				// 	}else{
				// 		uni.navigateTo({
				// 			url: '/pages/sonView/login/index'
				// 		})
				// 	}

				// }else{
				// 	// 跳转
				// 	if (item.path == '/' + this.route) {
				// 		console.log("跳转当前页，拒绝")
				// 	} else {
				// 		uni.navigateTo({
				// 			url: item.path
				// 		})
				// 	}
				// }

			}
		},
		created() {
			console.log('11111', this.$store.state);
			const pages = getCurrentPages();
			const page = pages[pages.length - 1];
			console.log('底部生命周期', page.route);
			this.route = page.route
			// apiCeshi().then((res) => {
			// 	console.log('请求', res);
			// })
		}

	}
</script>

<style>
	image {
		will-change: transform
	}

	.iconAll {
		width: 40rpx;
		height: 40rpx;
 	}

	.tarBarClass {
		width: 100%;
		position: fixed;
		bottom: 0px;
		height: 4rem;
		/* border-top: 1px solid #D7D9EC; */
		background-color: #fff;
	}
</style>