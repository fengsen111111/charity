<template>
	<view class="">
		<viewTop :title="'新人专享'">
			<view class="bgNew " style="background-image: url('../../../static/home/bgNew.png');"></view>
		</viewTop>
		<!--  -->
		<view class="bgBottom">
			<view class="bgFCE w95 mxAuto rending2 h20 overflowAuto" >
				<view class="pt-1">
					<volumeTag :datalist=datalist :isFFF='true'/>
					<volumeTag :datalist=datalist :isFFF='true'/>
				</view>
				<view class="h-4"></view>
			</view>
			<!-- 一键领取 -->
			<view class="w95 mxAuto">
				<view class="buttonCen fontBold text16 py-3 mt-3 text-center text-whlie" @click="_getReceiveNewUserCoupon">
					一键领取
				</view>
				<view class="flex mt-3 items-center justify-evenly">
					<view class="bgFFC hrView"> </view>
					<view class="colFFC fontBold text16" >专享商品 </view>
					<view class="bgFFC hrView"> </view>
				</view>
			</view>
			<!-- 商品 -->
			<view class="w95 mxAuto">
				<bomShop />
			</view>
			<!--  -->
			<view class="h-4"></view>
		</view>
		
	</view>
</template>

<script>0
	import viewTop from "@/pages/sonView/volume/components/viewTop/index.vue"
	import volumeTag from "@/components/volumeTag/index.vue"
	import bomShop from '@/components/home/bomShop/index.vue'
	import {
		getNewUserCouponList,//新人优惠卷列表
		getReceiveNewUserCoupon,//一件领取
		getReceiveCoupon, //单个领取
		} from '@/request/api.js'
	export default {
		data() {
			return {
				active: false,
				checkItem:1,
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
						use_type:'a',
						top_price:'',
						coupon_data:'6折',
						end_time:'2023-12-16',
						areas:'成都'
					}
				]
			};
		},
		created(){
			// 获取列表
			getNewUserCouponList({
				post_params:{
					adcode:'',//行政区
					currentPage: '',
					perPage:'',
					user_id:''
				}
			}).then((res)=>{
				console.log(res)
			})
		},
		components:{viewTop,volumeTag,bomShop},
		onLoad() {},
		onShow() {
			
		},
		onHide() {
		},
		methods: {
			_getReceiveNewUserCoupon(){
				console.log('一键领取');
				getReceiveNewUserCoupon().then((res)=>{
					console.log('一键领取',res);
				})
			}
		}
	};
</script>

<style>
	.hrView{
		height: 2px;
		width: 7rem;
	}
	.buttonCen{
		background: linear-gradient( 180deg, #FF793E 0%, #FF2C26 100%);
		border-radius: 2rem;
		box-shadow: 0px 3px 6px 1px rgba(0,0,0,0.2);
	}
	.bgBottom{
		background: linear-gradient( #E95A52 0%, #FA311D 100%);
		/* height: 30rem; */
		margin-top: 100rpx;
	}
	.bgNew{
		background-repeat: no-repeat;
		background-size: 100% 100%;
		height: 18rem;
		margin-top: 1.5rem;
	}
		
</style>