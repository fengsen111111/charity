<template>
	<view class="">
		<!-- 自定义导航栏 -->
		<view class="navBarBox">
			<!-- 状态栏占位 -->
			<!-- 真正的导航栏内容 -->
			<view class="navBar">
				<view class="bg486">
					<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
					<view class="col999 flex items-center px-3" style="margin-top: 9rpx;">
						<uni-icons type="left" size="30" color="#fff" @click="handleLeft"></uni-icons>
						<uni-search-bar v-model="searchVal" clearButton="none" class="space-x-3" radius="100"
							placeholder="输入搜索内容" cancelButton="none" @confirm="search" />
						</uni-section>
					</view>
					<view class="h-4"></view>
				</view>
			</view>
		</view>

		<view class="p-3">
			<view class="bg-whilt p-3 ">
				<view class="flex items-center">
					<uni-icons type="location" color="#4867CF" size="14"></uni-icons>
					<view class="text12 space-x-1">当前位置</view>
				</view>
				<view class="mt-1 flex justify-between">
					<view class="bgF9 text14 p-1 text-center">
						{{cityName}}
					</view>
					<view class="col486 text12 flex items-center">
						<uni-icons type="location" color="#4867CF" size="14"></uni-icons>
						<view class="space-x-1">重新定位</view>
					</view>
				</view>
			</view>
			<view class="bg-whilt p-3 mt-3">
				<view class="flex items-center">
					<view class="text12 space-x-1">历史记录</view>
				</view>
				<view class="mt-1 grid grid-cols-4">
					<view class="bgF9 w80 mxAuto text14 p-1 text-center" v-for="(item,index) in [1,2,3,4]" :key="item">
						成都
					</view>
				</view>
			</view>
			<view class="bg-whilt" style="position: relative;top: 0.75rem; height: 65vh;">
				<uni-indexed-list :options="list" :showSelect="false" @click="bindClick"></uni-indexed-list>
			</view>
		</view>
		<!--  -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cityName:'成都',
				searchVal: '',
				// 状态栏高度
				statusBarHeight: 0,
				// 导航栏高度
				navBarHeight: 82 + 11,
				value: ['0'],
				// 
				list: [
					{
					'letter': 'A四川省',
					'key':'A',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
						'泸州市',
						'德阳市'
					]
				}, {
					'letter': 'B云南省',
					'key':'B',
					'data': [
						'昆明市',
						'曲靖市',
						'昭通市',
						'玉溪市',
						'楚雄州'
					]
				}, {
					'letter': 'C西安省',
					'key':'C',
					'data': [
						'西安市',
						'宝鸡市',
						'咸阳市',
						'铜川市',
					]
				}, 
				{
					'letter': 'D四川省',
					'key':'D',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
					]
				},
				{
					'letter': 'E四川省',
					'key':'E',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
					]
				},
				{
					'letter': 'F四川省',
					'key':'F',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
					]
				},
				{
					'letter': 'G四川省',
					'key':'G',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
					]
				},
				{
					'letter': 'H四川省',
					'key':'H',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
					]
				},
				{
					'letter': 'I四川省',
					'key':'I',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
					]
				},
				{
					'letter': 'J四川省',
					'key':'J',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
					]
				},
				{
					'letter': 'K四川省',
					'key':'K',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
					]
				},
				{
					'letter': 'L四川省',
					'key':'L',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
					]
				},
				{
					'letter': 'M四川省',
					'key':'M',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
					]
				},
				{
					'letter': 'N四川省',
					'key':'N',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
					]
				},
				{
					'letter': 'O四川省',
					'key':'O',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
					]
				},
				{
					'letter': 'P四川省',
					'key':'P',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
					]
				},
				{
					'letter': 'Q四川省',
					'key':'Q',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
					]
				},
				{
					'letter': 'R四川省',
					'key':'R',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
					]
				},
				{
					'letter': 'S四川省',
					'key':'S',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
					]
				},
				{
					'letter': 'T四川省',
					'key':'T',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
					]
				},
				{
					'letter': 'U四川省',
					'key':'U',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
					]
				},
				{
					'letter': 'V四川省',
					'key':'V',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
					]
				},
				{
					'letter': 'W四川省',
					'key':'W',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
					]
				},
				{
					'letter': 'X四川省',
					'key':'X',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
					]
				},
				{
					'letter': 'Y四川省',
					'key':'Y',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
					]
				},
				{
					'letter': 'Z四川省',
					'key':'Z',
					'data': [
						'成都市',
						'绵阳市',
						'自贡市',
						'攀枝花市',
					]
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
			bindClick(e) {
				console.log('点击item，返回数据',e)
				this.cityName = e.item.name
			},
			toSelectIndex(item) {
				this.toView = item
			},
			change(e) {
				console.log(e);
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