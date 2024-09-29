<template>
	<view>
		<hearchItem :isLeft="true" :title="'我的捐赠'" />
		<view class="p40 text28">
			<view v-for="item in donList" :key="item.create_time">
				<view class="flex justify-between ">
					<view>基金名称</view>
					<view class="col787878">{{item.donate_name}}</view>
				</view>
				<view class="flex justify-between items-baseline">
					<view class="flex items-baseline">
						<view>捐赠</view>
						<view class=" text60 colD6B07A ml10 font-bold">{{item.money}}</view>
						<view class="ml10">元</view>
					</view>
					<view class="col787878">{{item.create_time}}</view>
				</view>
				<view class="h1 bgEBEBEB my34"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue'
	import {
		getDonateOrderList//最新捐赠记录
	} from '@/request/api.js'
	export default {
		components: {
			hearchItem,
		},
		data() {
			return {
				donList:[],//最新数据
			}
		},
		created() {
			//获取手机状态栏高度
		},
		onReady() {
			this._getDonateOrderList()
		},
		watch: {},
		methods: {
			_getDonateOrderList(){
				getDonateOrderList({
					post_params:{
						currentPage:1,
						perPage:10
					}
				}).then((res)=>{
					console.log('最新数据',res.data.data);
					this.donList = res.data.data.list
				})
			}
		}
	}
</script>

<style>

</style>