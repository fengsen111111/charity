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
				<view class="mt-3 grid grid-cols-4">
					<view class="bgF9 w80 mxAuto text14 p-1 text-center mb-3" v-for="(item,index) in [1,2,3,4]" :key="item">
						成都
					</view>
				</view>
			</view>
			<!-- <view class="bg-whilt p-3 mt-3" v-for="item in dataList" :key="item.id">
				<view class="flex items-center">
					<view class="text12 space-x-1">{{item.label}}</view>
				</view>
				<view class="mt-3 grid grid-cols-4">
					<view @click="handleIss(iss)" class="bgF9 w80 mxAuto text14 p-1 text-center mb-3" v-for="iss in item.children" :key="iss.id">
						{{iss.label}}
					</view>
				</view>
			</view> -->
			<view class="" style="position: relative;top: 0.75rem; height: 65vh;">
				<uni-indexed-list :options="list" :showSelect="false" @click="bindClick"></uni-indexed-list>
			</view>
		</view>
		<!--  -->
	</view>
</template>

<script>
	import { 
		getAreas,//行政区
		getHotCity,//热门城市
		getFindStore//获取门店信息
	} from '@/request/api.js'
	// import {provice} from './index.js'
	import {provice} from './index_new.js'
	export default {
		created() {
			//获取手机状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
			// this._getAreas(),//行政区
		    this._getHotCity()//热门城市
			console.log('provice',provice);
			uni.showLoading({
				title: "加载中"
			})
			setTimeout(()=>{
				uni.hideLoading()
			},1000)
		},
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
				list: provice,
				dataList:[]
			};
		},
		onLoad() {
			console.log('加载结束')
		},
		methods: {
			_getFindStore(){
				getFindStore({
					post_params:{
						location:'',  //经纬度
						adcode:''  //行政区
					}
				}).then((res)=>{
					conslole.log('门店信息',res)
				})
			},
			handleIss(iss){
				console.log('点击项',iss)
			},
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
			},
			//行政区
			_getAreas(){
				getAreas({
					post_params:{
						pid:''
					}
				}).then((res)=>{
					this.dataList = res.data.data.areas
					console.log('res所有城市',this.dataList);
				
				})
			},
			// 热门城市
			_getHotCity(){
				getHotCity().then((res)=>{
					console.log('热门城市',res);
				})
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