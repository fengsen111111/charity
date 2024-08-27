<template>
	<view class="">
		<!--  -->
		<viewTop :title="'领卷中心'"/>
		<!--  -->
		<view class="bg-whilt  h-full viewContent p-3">
			<view class="flex justify-evenly">
				<view @click="handleIndex(item)" :class="itemIndex==item?'colEF5':''" v-for="item in [1,2,3]" :key="item">
					{{item==1?'全部':item==2?'满减':'折扣'}}
					<view v-if="itemIndex==item" class="borderEF5 w-6 mxAuto rending1"></view>
				</view>
			</view>
			<volumeTag :datalist=datalist :isFFF='true' :isBtn="true" />
			<!-- 留白 -->
			<view class="h20"></view>
		</view>
	</view>
</template>

<script>
	import viewTop from "@/pages/sonView/volume/components/viewTop/index.vue"
	import volumeTag from "@/components/volumeTag/index.vue"
	import {getStoreCouponList} from '@/request/api.js'
	export default {
		data() {
			return {
				active: false,
				itemIndex:1,
				datalist:[
					{
						id:'1',
						name:'优惠券名称',
						type: 'a',
						use_type:'a',
						top_price:'100',
						coupon_data:'30',
						end_time:'2023-12-16',
						areas:'成都'
					},
					{
						id:'2',
						name:'优惠券名称',
						type: 'b',
						use_type:'b',
						top_price:'',
						coupon_data:'6折',
						end_time:'2023-12-16',
						areas:'成都'
					}
				]
			};
		},
		components:{viewTop,volumeTag},
		onLoad() {},
		onShow() {
			
		},
		onHide() {
		},
		created(){
			this._getStoreCouponList()
		},
		methods: {
			handleIndex(index){
				this.itemIndex = index
			},
			_getStoreCouponList(){
				getStoreCouponList({
					post_params:{
						store_id:'',
						goods_id:'',
						type:'',//优惠券类型 a满减  b折扣  
						currentPage:'',
						perPage:''
					}
				}).then((res)=>{
					console.log('res',res);
				})
			}
		}
	};
</script>

<style>
	.viewContent{
		position: relative;
		top: -4rem;
		border-radius: 1rem 1rem 0px 0px;
	}
</style>