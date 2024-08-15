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
			<view class=" grid grid-cols-2 text-center bg-whilt text14 py-2">
				<view class="flex items-center mxAuto">
						<view class="" @click="handleUpDown(1)">销量</view>
						<view class="uni-ml-1">
							<view class='iconBig' v-if="valueCheck.searchOne==1"><image src="@/static/home/search/up_c.png" class='iconBig' mode=""></image></view>
							<view class='iconBig' v-else><image src="@/static/home/search/up.png" class='iconBig' mode=""></image></view>
							<view class='iconBig' v-if="valueCheck.searchOne==2"><image src="@/static/home/search/down_c.png"class='iconBig'  mode=""></image></view>
							<view class='iconBig' v-else><image src="@/static/home/search/down.png"class='iconBig'  mode=""></image></view>
						</view>		
				</view>
				<view class="flex items-center mxAuto">
						<view class="" @click="handleUpDown(2)">价格</view>
						<view class="uni-ml-1">
							<view class='iconBig' v-if="valueCheck.searchTwo==1"><image src="@/static/home/search/up_c.png" class='iconBig' mode=""></image></view>
							<view class='iconBig' v-else><image src="@/static/home/search/up.png" class='iconBig' mode=""></image></view>
							<view class='iconBig' v-if="valueCheck.searchTwo==2"><image src="@/static/home/search/down_c.png"class='iconBig'  mode=""></image></view>
							<view class='iconBig' v-else><image src="@/static/home/search/down.png"class='iconBig'  mode=""></image></view>
						</view>		
				</view>
			</view>
			<view class="px-3" v-if="showShop">
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
				valueCheck: {
					searchOne: 1,
					searchTwo: 1,
				},
				searchVal: '',
				// 状态栏高度
				statusBarHeight: 0,
				// 导航栏高度
				navBarHeight: 82 + 11,
				// 
				showShop: true,
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
			// 
			handleUpDown(index){
				if(index==1){
					if(this.valueCheck.searchOne==1){
						this.valueCheck.searchOne=2
					}else{
						this.valueCheck.searchOne=1
					}
				}else{
					if(this.valueCheck.searchTwo==1){
						this.valueCheck.searchTwo=2
					}else{
						this.valueCheck.searchTwo=1
					}
				}
				// 
				uni.showLoading({
					title: "加载中"
				})
				this.showShop = false
				setTimeout(()=>{
					uni.hideLoading()
					this.showShop = true
				},1000)
			},
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
	.iconBig{
		width: 0.5rem;
		height: 0.5rem;
		line-height: 0.5rem;
	}
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