<template>
	<view class="">
		<view>
			<!-- 自定义导航栏 -->
			<view class="navBarBox">
				<!-- 状态栏占位 -->
				<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
				<!-- 真正的导航栏内容 -->
				<view class="navBar">
					<view class="flex items-center">
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
				</view>
			</view>
		</view>
		<view>
			<view class="flex search w-full h-6 mt-3` items-center" @click="handleSearch">
				<uni-icons type="search" color="#999999" class=" space-x-2" size="16"></uni-icons>
				<view class="col999 text12">
					输入搜索内容
				</view>
			</view>
		</view>
		<view class="flex justify-between text12 pt-2">
			<view v-for="item in [1,2,3,4,5]" :key="item" class="item">
				<view class="">标签测试</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {

		data() {
			return {
				searchValue: '',
				// 状态栏高度
				statusBarHeight: 0,
				// 导航栏高度
				navBarHeight: 82 + 11,
			};
		},
		onLoad() {},
		methods: {
			handleSearch() {
				console.log('跳转');
				uni.navigateTo({
					url: '/pages/tabbar/home/components/search/index'
				})
			}
		},
		created() {
			//获取手机状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
		},
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
</style>