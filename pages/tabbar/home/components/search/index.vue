<template>
	<view class="">
		<!-- 自定义导航栏 -->
		<view class="navBarBox">
			<!-- 状态栏占位 -->
			<!-- 真正的导航栏内容 -->
			<view class="navBar">
				<view class="bg486">
					<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
					<view class="col999 flex items-center px-3" style="margin-top: 10rpx;">
						<uni-icons type="left" size="30" color="#fff" @click="handleLeft"></uni-icons>
						<uni-search-bar v-model="searchVal" clearButton="none" class="space-x-3" radius="100"
							placeholder="输入搜索内容" cancelButton="none" @confirm="search" />
						</uni-section>
					</view>
					<view class="h-4"></view>
				</view>
			</view>
		</view>
		<!-- 未触发 -->
		<view class="bg-whilt rending1 p-2" v-if="!searchVal.length">
			<view class="text10 flex items-center space-x-6">
				<image src="@/static/home/iconSearch.png" mode="" class="iconImg"></image>
				热门
			</view>
			<view class="grid grid-cols-4 text12 text-center">
				<text class="bgF9 w80 rending1 mt-2" @click="handleItem(item)" v-for="item in data" :key="item.id">
					{{item.text}}
				</text>
			</view>
		</view>
		<!-- 触发 -->
		<view class="" v-else>
			<view class=" grid grid-cols-2 text-center bg-whilt py-2">
				<view class="">销量</view>
				<view class="">价格</view>
			</view>
			<view class="px-3">
				<bomShop />
				<bomShop />
			</view>
		</view>
	</view>
</template>

<script>
	import bomShop from '@/components/home/bomShop/index.vue'
	export default {
		components: {
			bomShop
		},
		data() {
			return {
				searchVal: '',
				// 状态栏高度
				statusBarHeight: 0,
				// 导航栏高度
				navBarHeight: 82 + 11,
				data: [{
						id: 1,
						text: '百威'
					},
					{
						id: 2,
						text: '雪花'
					},
					{
						id: 3,
						text: '勇闯天涯'
					},
					{
						id: 4,
						text: '科罗纳'
					},
					{
						id: 5,
						text: '纯生'
					},
					{
						id: 6,
						text: '嘉士伯'
					},
				]
			};
		},
		created() {
			//获取手机状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
		},
		onLoad() {},
		methods: {
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},
			handleItem(item) {
				console.log(item)
				this.searchVal = item.text
			},
			handleLeft() {
				uni.navigateBack()
			}
		}
	};
</script>

<style>
	.navBarBox {}

	.navBarBox .statusBar {}

	.navBarBox .navBar {
		padding-bottom: 8rpx;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.navBarBox .navBar .logo {
		width: 82rpx;
		height: 82rpx;
		margin-right: 10rpx;
	}

	.topPt {
		padding-top: 6%;
	}

	.-tag1 {
		margin-top: -1px;
	}

	.search {
		border: 1px solid #D7D9EC;
		border-radius: 1rem;
		background-color: #D7D9EC;
	}

	.item {
		/* opacity: 0.1; */
		background-color: #81B1EE;
		border-radius: 1rem;
		padding: 0px 0.25rem;
		color: #fff;
	}

	.iconImg {
		width: 0.5rem;
		height: 0.6rem;
		margin-right: 0.25rem;
	}

	.topSearch {
		height: 6rem;
		padding-top: 1.25rem;
	}
</style>