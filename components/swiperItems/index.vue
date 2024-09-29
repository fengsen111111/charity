<template>
	<view class="">
		<view class="">
			<swiper @change="change" :current="current" class="h389 w-full" :class="isBottom?'radius20':''" circular
				:indicator-dots="false" :autoplay="true" :interval="4000">

				<swiper-item class="h389" v-for="item in swiperList" :key="item.id">
					<image @click="handleUrl(item)" :src="item.image" class="itemsImg" :class="isBottom?'radius20':''" mode="" >
					</image>
				</swiper-item>
			</swiper>
		</view>
		<view class="flex" v-if="isBottom">
			<view class="flex mx-auto">
				<view class="" v-for="(item,index) in swiperList" :key="index">
					<image src="../../static/img_bottom.png" class="img_bottoms" v-if="index==current" mode="">
					</image>
					<image src="../../static/img_bottom_active.png" class="img_bottoms" v-else mode=""></image>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="imgs_details">
				{{current+1}}/{{swiperList.length}}
			</view>
		</view>
	</view>
</template>

<script>
	import { getBannerDetail } from '@/request/api.js'
	export default {
		props: {
			isBottom: {
				type: Boolean,
				default: true
			},
			swiperList:{
				type:Array,
				default:()=>[]
			}
		},
		data() {
			return {
				current: 0,
			}
		},
		created() {

		},
		mounted() {

		},
		watch: {},
		methods: {
			change(e) {
				this.current = e.detail.current
			},
			_getBannerDetail(id){
				getBannerDetail({
					post_params:{
						id:id
					}
				}).then((res)=>{
					console.log('富文本数据',res.data.data);
					uni.navigateTo({
						url:'/pages/components/textContent/index?content='+res.data.data
					})
				})
			},
			handleUrl(item){
				console.log('点击跳转',item);
				if(item.jump_type=='a'){// a富文本、
					this._getBannerDetail(item.id)
				}else if(item.jump_type=='b'){ //b志愿者申请页、
					uni.navigateTo({
						url:'/pages/components/volunteer/index'
					})
				}else if(item.jump_type=='c'){//c积分商品、
					uni.navigateTo({
						url:'/pages/components/pointsMallDetails/index?jf_id='+item.jump_data
					})
				}else if(item.jump_type=='d'){//d基金详情、
					uni.navigateTo({
						url:'/pages/components/charitableFundsDetails/index?funds_id='+item.jump_data
					})
				}else if(item.jump_type=='e'){//e活动详情  
					uni.navigateTo({
						url:'/pages/components/eventRegistrationDetails/index?active_id='+item.jump_data
					})
				}
				
			}
		}
	}
</script>

<style>
	.imgs_details {
		background-image: url('../../static/imgs_details.png');
		background-size: 100% 100%;
		color: white;
		font-size: 30rpx;
		font-weight: bold;
		position: absolute;
		right: 36rpx;
		top: 265px;
		text-align: center;
		padding: 8rpx 30rpx;
	}

	.itemsImg {
		width: 100%;
		height: 389rpx;
	}

	.img_bottoms {
		width: 34rpx;
		height: 6rpx;
		margin-right: 8rpx;
		margin-left: 8rpx;
	}
</style>