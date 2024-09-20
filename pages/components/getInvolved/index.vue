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
		<cardActivity :isCode="true" />
	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue'
	import cardActivity from '@/components/card_activity/index.vue'
	export default {
		components: {
			hearchItem,
			cardActivity
		},
		data() {
			return {
				indexItem:1,
			}
		},
		created() {
			//获取手机状态栏高度
		},
		mounted() {

		},
		watch: {},
		methods: {
			// 
			handleIndex(index){
				this.indexItem = index
			}
			
		}
	}
</script>

<style>

</style>