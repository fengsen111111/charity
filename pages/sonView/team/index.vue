<template>
	<view class="">
		<hearch :title="'我的团队'" :isLeft="true"/>
		<view class="p-3 text12">
			<view class="bg-whilt mt-3 rending1 p-3 items-center flex" v-for="item in [1,2,3]" :key="item">
				<image src="@/static/my/user.png" mode="" class="imageItem"></image>
				<view class="space-x-2 w85">
					<view class="text14">135******1234</view>
					<view class="flex justify-between w-full">
						<view class="text12">推荐时间</view>
						<view class="text12">2024-06-02</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import hearch from "@/components/hearch/index.vue"
	import {getTeamUserList} from '@/request/api.js'
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
			this._getTeamUserList(options) //团队信息
		},
		onShow() {
			
		},
		onHide() {
		},
		methods: {
			// 团队信息
			_getTeamUserList(options){
				getTeamUserList({
					post_params:{
						company_id:options.company_id//	分公司ID  
					}
				}).then((res)=>{
					console.log('团队信息',res);
				})
			}
		}
	};
</script>

<style>
	.widView{
		width: 200rpx;
	}
	.imageItem{
		width: 3.25rem;
		height: 3.25rem;
	}
</style>