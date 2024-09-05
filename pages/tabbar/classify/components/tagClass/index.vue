<template>
	<view class="">
		<view  class="text-center mt-3 p-2 imgCenter flex hidden overflowAuto">
			<view class="mb-1 space-x-4" style="width: 200px" v-for="item in [1,2,3,4,5,6,7,8,9]" :key="item">
				<image src="https://pic.imge.cc/2024/09/02/66d57005de359.png" mode="" style="width: 50px;height: 50px;border-radius: 50%;">
				</image>
				<view class="text-black text12">
					畅饮啤酒
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getIndexGoodsTypeList} from '@/request/api.js'
	export default {

		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		created(){
			this._getIndexGoodsTypeList()
		},
		methods: {
			_getIndexGoodsTypeList(){
				getIndexGoodsTypeList({
					post_params:{
						store_id:'',//
						show_position:'',//
					}
				}).then((res)=>{
					console.log('获取门店商品一级分类列表',res);
				})
			}
		}
	}
</script>

<style>
</style>