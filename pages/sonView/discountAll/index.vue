<template>
	<view class="">
		<hearch :title="'我的优惠卷'" :isLeft="true"/>
		<view class="px-3 pt-3">
			<view class="grid grid-cols-3 text-center">
				<view @click="handleItem(1)" :class="itemIndex==1?'col486 text-center':'col666'">
					<view class="">待使用</view>
					<view v-if="itemIndex==1" class="border486 w-6 mxAuto rending1"></view>
				</view>
				<view @click="handleItem(2)" :class="itemIndex==2?'col486 text-center':'col666'">
					<view class="">已使用</view>
					<view v-if="itemIndex==2" class="border486 w-6 mxAuto rending1"></view>
				</view>
				<view @click="handleItem(3)" :class="itemIndex==3?'col486 text-center':'col666'">
					<view class="">已失效</view>
					<view v-if="itemIndex==3" class="border486 w-6 mxAuto rending1"></view>
				</view>
			</view>
		</view>
		<!--  -->
		<volumeTag :datalist=datalist :isFFF='true' :isLapse="itemIndex==3?true:false" />
		<volumeTag :datalist=datalist :isFFF='true' :isLapse="itemIndex==3?true:false" />
		<view class="col666 text-center mt-10">
			暂无优惠卷可用
		</view>
		<!-- 领卷中心 -->
		<view class="rightBottomImg text10 text-whlie text-center" @click="handleUrl('/pages/sonView/volume/index')">
			<view class="text12 uni-mt-14 uni-pt-14">领卷中心</view>
		</view>
	</view>
</template>

<script>
	import hearch from "@/components/hearch/index.vue"
	import volumeTag from "@/components/volumeTag/index.vue"
	import {getUserCouponList} from '@/request/api.js'
	export default {
		components:{hearch,volumeTag},
		data() {
			return {
				active: false,
				value:'',
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
		onLoad() {},
		onShow() {
			
		},
		onHide() {
		},
		created(){
			this._getUserCouponList()
		},
		methods: {
			handleUrl(url) {
				console.log(url);
				uni.navigateTo({
					url: url + ''
				})
			},
			handleItem(item){
				this.itemIndex = item
			},
			_getUserCouponList(){
				getUserCouponList({
					post_params:{
						store_id:'',
						type:'',//	a待使用  b已使用  c已失效  
						currentPage:'',
						perPage:''
					}
				}).then((res)=>{
					console.log('数据',res);
				})
			}
		}
	};
</script>

<style>
	.rightBottomImg{
		background-image: url('@/static/my/rightBottomImg.png');
		background-size: 100% 100%;
		height: 5rem;
		width: 4rem;
		position: fixed;
		bottom: 1rem;
		right: 1rem;
	}
</style>