<template>
	<view >
		<view :class="isLapse?'border999':'borderFFC'" class="flex bg-whilt justify-between  w90 mt-4 space-x-4"
			v-for="item in datalist" :key="item.id">
			<!-- left -->
			<view class=" p-2">
				<view class="mt-1 text14">
					<!-- 优惠券名称 -->
					{{item.name}}
				</view>
				<view class="text11 col999 ling4">
					有效期至：{{item.end_time}}
					<!-- 2023-12-16 -->

				</view>
				<view class="flex text11  ling4" :class="isLapse?'col999':'colED1'">
					<view class="">可用地区：{{item.areas}}</view>
					<!--  a部分商品可用  b部分商品不可用  c部分分类可用   -->
					<view class="space-x-3">可用类型：{{item.use_type=='a'?'部分商品可用':item.use_type=='b'?'部分商品不可用':'部分分类可用 '}}
					</view>
				</view>
			</view>
			<!-- right -->
			<view v-if="isBtn" class="rightVolume">
				<view class="  text-whlie text-center">
					<view v-if="item.type=='a'">
						<view class="text11">满{{item.top_price}}</view>
						<view class="">减{{item.coupon_data}}</view>
					</view>
					<view v-else>
						<view class="mt-2">{{item.coupon_data}}</view>
					</view>
					<view class="px-2 pt-1" @click="handleReceive(item)">
						<view class="bgFFC text12 rending3 colED1">{{isUse?'使用':'领取'}}</view>
					</view>
				</view>
			</view>
			<!-- 已失效 -->
			<view v-else-if="isLapse" class="rightVolumeTwo">
				<view class="  text-whlie text-center">
					<view v-if="item.type=='a'">
						<view class="text11 mt-2">满{{item.top_price}}</view>
						<view class="text20">减{{item.coupon_data}}</view>
					</view>
					<view v-else>
						<view class="mt-4 text20">{{item.coupon_data}}</view>
					</view>
				</view>
			</view>
			<view v-else class="rightVolume">
				<view class="  text-whlie text-center">
					<view v-if="item.type=='a'">
						<view class="text11 mt-2">满{{item.top_price}}</view>
						<view class="text20">减{{item.coupon_data}}</view>
					</view>
					<view v-else>
						<view class="mt-4 text20">{{item.coupon_data}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getReceiveNewUserCoupon, //一件领取
	} from '@/request/api.js'
	export default {
		props: {
			isFFF: false,//背景白色
			isLapse: false,//失效class
			isBtn: false,//显示按钮
			isUse:false,//使用
			datalist: {
				type: Array,
				default: () => []
			}
		},
		created() {
			console.log('props', this.$props);
		},
		data() {
			return {
				active: false
			};
		},
		components: {},
		onLoad() {},
		onShow() {

		},
		onHide() {},
		methods: {
			handleReceive(item) {
				console.log('领取', item);
				getReceiveNewUserCoupon({
					post_params:{
						coupon_id:item.id
					}
				}).then((res)=>{
					console.log('领取成功',res);
				})
			}
		}
	};
</script>

<style>
	.rightVolume {
		background: linear-gradient(134deg, #FA311D 0%, #FF8E34 100%);
		width: 4.5rem;
		padding-top: 18rpx;
	}
	.rightVolumeTwo {
		background: #999999;
		width: 4.5rem;
		padding-top: 18rpx;
	}
</style>