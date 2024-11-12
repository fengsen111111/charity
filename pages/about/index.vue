<template>
	<view class="">
		<hearchItem :title="'关于基金'" />
		<view class="px36 py30">
			<swiperItems :swiperList="swiperList" />
		</view>
		<view class="bgItems"></view>
		<view class="px36 py30">
			<view class="titleView text24">
				<view class="ml20 col205D57 font-bold">关于基金</view>
			</view>
			<view class="mt15 text24 indent2">
				<view v-html="configInfo.about_us"></view>
			</view>
		</view>
		<view class="bgItems"></view>
		<view class="px36 py30">
			<view class="titleView text24">
				<view class="ml20 col205D57 font-bold">活动列表</view>
			</view>
			<view class="mt30 flex " v-for="item in activeList" :key="item.id"
				@click="handUrl(item)">
				<view style="width: 225rpx;height:165rpx;">
				<image :src="item.cover_image" class="activeItemImg" mode="">
					</view>
				</image>
				<view class="ml30 text32 font-bold">
					{{item.name}}
				</view>
			</view>
			<!-- <view class="mt30 flex " v-for="item in [1,2,3]" :key="item"
				@click="handUrl(item)">
				<image src="https://img.picui.cn/free/2024/09/18/66ea73b25c621.png" class="activeItemImg" mode="">
				</image>
				<view class="ml30 text32 font-bold">
					活动名称活动名称活动名称活动名称
				</view>
			</view> -->
			
		</view>
		<view class="h160"></view>
		<!--  -->
		<tarBar :checkIndex='2' />
	</view>
</template>

<script>
	import tarBar from '@/components/tarBar/index.vue'
	import hearchItem from '@/components/hearchItem/index.vue'
	import swiperItems from '@/components/swiperItems/index.vue'
	import {
		// getActivityList,//活动列表
		// getActivityDetail,//活动详情
		getBannerList,//轮播图
		getOtherActivityList,//活动列表2
		getOtherActivityDetail//活动详情2
	} from '@/request/api.js'
	export default {
		components: {
			hearchItem,
			swiperItems,
			tarBar
		},
		data() {
			return {
				configInfo:{},//config
				activeList:[],//活动列表
				swiperList:[],
				limit: 20,
			}
		},
		onLoad() {
			this.configInfo = this.$store.state.config ? this.$store.state.config : {}
		},
		onReady() {
			// this._getActivityList()
			this._getBannerList()//轮播图
			this._getOtherActivityList()//活动列表2
		},
		onReachBottom(){
			this.limit = this.limit+20
			this._getOtherActivityList()//活动列表2
			// this._getActivityList() //活动
			
		},
		watch: {},
		methods: {
			_getOtherActivityList(){
				getOtherActivityList({
					post_params:{
						currentPage:1,
						perPage: this.limit
					}
				}).then((res)=>{
					console.log('活动列表2',res.data.data.list);
					this.activeList = res.data.data.list
				})
			},
			// 轮播图列表
			_getBannerList(){
				getBannerList({
					post_params:{
						type:'about_us'
					}
				}).then((res)=>{
					console.log('轮播数据',res.data.data.list);
					this.swiperList = res.data.data.list
				})
			},
			handUrl(item) {
				getOtherActivityDetail({
					post_params:{
						id:item.id
					}
				}).then((res)=>{
					console.log('活动详情2富文本',res.data.data);
					uni.navigateTo({
						url:'/pages/components/textContent/index?content='+res.data.data.content
					})
				})
			},
			// _getActivityList(){
			// 	getActivityList({
			// 		post_params:{
			// 			show_position:'b',
			// 			currentPage:1,
			// 			perPage: this.limit
			// 		}
			// 	}).then((res)=>{
			// 		console.log('活动列表',res.data.data.list);
			// 		this.activeList = res.data.data.list
			// 	})
			// }
		}
	}
</script>

<style>
	.titleView{
		
	}
	.activeItemImg {
		width: 225rpx;
		height: 165rpx;
		border-radius: 20rpx;
	}

	.image_about {
		width: 100%;
		height: 380rpx;

	}

	.bgItems {
		background-color: #EBEBEB;
		height: 16rpx;
	}
</style>