<template>
	<view class="">
		<hearchItem :isLeft="true" :title="'我参与的活动'" />
		<view class="bg-white p40">
			<view class="flex justify-around  col6A8986 text30 font-bold">
				<view @click="handleIndex(1)" :class="indexItem==1?'border_bottom col205D57':''">待开始</view>
				<view @click="handleIndex(2)" :class="indexItem==2?'border_bottom col205D57':''">进行中</view>
				<view @click="handleIndex(3)" :class="indexItem==3?'border_bottom col205D57':''">已结束</view>
			</view>
		</view>
		<cardActivityTwo :isCode="true" :activeList="activeList"/>
	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue'
	import cardActivityTwo from '@/components/card_activity/index_two.vue'
	import {
		getActivityOrderList//
	} from '@/request/api.js'
	export default {
		components: {
			hearchItem,
			cardActivityTwo
		},
		data() {
			return {
				indexItem:1,
				limit:10,
				activeList:[]
			}
		},
		// onReachBottom(){
		// 	this.limit = this.limit+20
		// 	this._getActivityOrderList()
		// },
		onReady() {
			this._getActivityOrderList()
		},
		watch: {},
		methods: {
			_getActivityOrderList(){
				getActivityOrderList({
					post_params:{
						status: this.indexItem==1?'a': this.indexItem==2?'b':'c'
					}
				}).then((res)=>{
					console.log('参与活动',res.data.data.list);
					this.activeList = res.data.data.list
				})
			},
			// 
			handleIndex(index){
				this.indexItem = index
				this._getActivityOrderList()
			}
			
		}
	}
</script>

<style>

</style>