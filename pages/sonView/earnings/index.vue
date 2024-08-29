<template>
	<view class="">
		<hearch :title="'收益明细'" :isLeft="true"/>
		<view class="p-3 text12">
			<view class="bg-whilt mt-3 rending1 p-3 items-center flex" v-for="item in [1,2,3]" :key="item">
				<image src="@/static/my/user.png" mode="" class="imageItem"></image>
				<view class="flex justify-between items-center w85">
					<view class="space-x-2">
						<view class="text14">135******1234</view>
						<view class="text12">2024-06-02</view>
					</view>
					
					<view class="flex items-center space-x-6">
						<text>收益</text>
						<text class="col486 text18 space-x-2">8888</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import hearch from "@/components/hearch/index.vue"
	import {getMoneyLogList} from '@/request/api.js'
	export default {
		components:{hearch},
		data() {
			return {
				active: false,
				value:'',
			};
		},
		onLoad(options) {
			console.log('options',options);
			this._getMoneyLogList(options) //收益明细
		},
		onShow() {
			
		},
		onHide() {
		},
		methods: {
			_getMoneyLogList(options){
				getMoneyLogList({
					post_params:{
						company_id:options.company_id,
						currentPage:'',
						perPage:''
					}
				}).then((res)=>{
					console.log('收益明细',res)
				})
			}
		}
	};
</script>

<style>
	.imageItem{
		width: 3.25rem;
		height: 3.25rem;
	}
</style>