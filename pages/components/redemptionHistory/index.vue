<template>
	<view class="">
		<hearchItem :isLeft="true" :title="'兑换记录'" />
		<view class="p40">
			<view v-for="item in logList" :key="item.id">
				<view class=" text28 flex justify-between items-center">
					<view class="w-1-3">{{item.name}}</view>
					<view class="col787878">{{item.create_time}}</view>
					<view :class="item==2?'col787878':'colD6B07A'" class="w-1-6 text-right text36 font-bold">{{item.integral}}</view>
				</view>
				<view class="h1 bgEBEBEB my34"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue'
	import {
		getIntegralList//获取积分日志列表
	} from '@/request/api.js'
	export default {
		components: {
			hearchItem,
		},
		data() {
			return {
				logList:[],//获取积分日志列表
				limit:20
			}
		},
		created() {
			//获取手机状态栏高度
		},
		onReady() {
			this._getIntegralList()
		},
		watch: {},
		onReachBottom(){
			this.limit = this.limit+20
			this._getIntegralList()
		},
		methods: {
			_getIntegralList(){
				getIntegralList({
					post_params:{
						currentPage:1,
						perPage:this.limit
					}
				}).then((res)=>{
					console.log('获取积分日志列表',res.data.data);
					this.logList = res.data.data.list
				})
			}
		}
	}
</script>

<style>
.w-1-3{
	width: 33%;
}
.w-1-6{
		width: 16%;
	}
</style>