<template>
	<view class="">
		<hearchItem :isLeft="true" :title="'慈善基金'" />
		<view class="mt30">
			<view class="flex justify-between ml36">
				<view class="border205D57 col9B9B9B w-3-5 text24 flex p10 items-center radius30">
					<uni-icons type="search" size="20" color="#205D57"></uni-icons>
					<view class="ml10">请输入奖品/服务关键词搜索</view>
				</view>
				<image src="../../../static/charitable_right.png" class="charitableImg" mode=""></image>
			</view>
		</view>
		<view class="py30 px36">
			<swiperItems />
			<!-- 文字滚动 -->
			<textSwiper />
			<view class="mt20 flex items-baseline justify-between">
				<view class="text30 col3C3C3C">爱心捐助次数</view>
				<view class="flex colD6B07A items-baseline">
					<view class="font-bold text60 ">33,340</view>
					<view class=" text24 ml10">元</view>
				</view>
			</view>
			<view class="mt20 flex items-baseline justify-between">
				<view class="text30 col3C3C3C">捐款金额</view>
				<view class="flex colD6B07A items-baseline">
					<view class="font-bold text60 ">33,340</view>
					<view class=" text24 ml10">元</view>
				</view>
			</view>
			<view class="flex justify-around mt50 col205D57 text30 font-bold">
				<view @click="handleIndex(1)" :class="indexItem==1?'border_bottom':''">慈善基金</view>
				<view @click="handleIndex(2)" :class="indexItem==2?'border_bottom':''">活动报名</view>
			</view>
		</view>
		<view class="bgEBEBEB h18 "></view>
		<cardFunds />
		<view class="mt20 px75">
			<view class="btnForm" @click="handleMoney()">
				我要捐款
			</view>
		</view>
		<view class="h20"></view>
		<!-- 弹框 -->
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<view class="bg-white" style="height: 40vh;">
					<view class="grid grid-cols-3  items-center p35 border-bottom-dotted">
						<view class=""></view>
						<view class="text30 font-bold text-center col205D57">非定向捐助</view>
						<view class="text-right"><uni-icons type="closeempty" size="26" color="#205D57" @click="close"></uni-icons></view>
					</view>
					<view class="p30">
					    <view class="py30 px20 border205D57 radius20">
					    	<input type="text" v-model="form.name" placeholder="请输入参与者姓名" />	
					    </view>
					</view>
					<view class="p30">
					    <view class="py30 px20 border205D57 radius20">
					    	<input type="text" v-model="form.money" placeholder="请输入捐助金额" />	
					    </view>
					</view>
					<view class="mt77 px75">
						<view class="btnForm">
							提 交
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue'
	import swiperItems from '@/components/swiperItems/index.vue'
	import cardFunds from '@/components/card_funds/index.vue'
	import textSwiper from '@/components/text_swiper/index.vue'
	export default {
		components: {
			hearchItem,
			swiperItems,
			cardFunds,
			textSwiper
		},
		data() {
			return {
				indexItem: 1,
				form:{
					name:'',
					money:''
				}
			}
		},
		created() {
			//获取手机状态栏高度
		},
		mounted() {

		},
		watch: {},
		methods: {
			goDetail(id) {
				console.log(id)
			},
			// 切换
			handleIndex(index) {
				this.indexItem = index
			},
			// 捐款
			handleMoney() {
				console.log('我要捐款');
				this.$refs.popup.open('bottom')
			},
			close(){
				this.$refs.popup.close()
			}
		}
	}
</script>

<style>


	.charitableImg {
		width: 170rpx;
		height: 65rpx;
	}

	.bgtwo {
		background: linear-gradient(90deg, #164336 0%, #226043 100%);
	}
</style>