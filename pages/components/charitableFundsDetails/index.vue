<template>
	<view class="">
		<hearchItem :isLeft="true" :title="'慈善基金详情'" />
		<swiperItems :isBottom="false" />
		<view class="py30 px36">
			<view class="text32 font-bold">慈善基金名称</view>
			<view class="text24 mt20 col787878">负责单位名称</view>
			<view class="flex items-baseline">
				<view class="text24 ">已募集</view>
				<view class="flex colD6B07A items-baseline ml100">
					<view class="text60  font-bold">33,340</view>
					<view class="text24 ml10">元</view>
				</view>
			</view>

		</view>
		<view class="bgEBEBEB h18 "></view>
		<view class="py30 px36">
			<view class="titleView text24">
				<view class="ml20 col205D57 font-bold">已实施项目使用资金情况</view>
			</view>
			<view class="p20 mt20 border205D57 radius20 flex justify-between items-center" v-for="item in [1,2,3]"
				:key="item">
				<view class="">某某实施项目名称</view>
				<view class="flex items-center">
					<view class="text24 col205D57">已使用</view>
					<view class="flex colD6B07A items-center ml20">
						<view class="text60 font-bold">33,340</view>
						<view class="text24 ml10">元</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bgEBEBEB h18 "></view>
		<view class="py30 px36 text32 indent32">
			慈善基金详情，慈善基金详情，慈善基金详基金基金基金情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情，慈善基金详情。
		</view>
		<view class="h100"></view>
		<!-- 屏幕定位 -->
		<view class="btnMoney w-full">
			<image src="../../../static/fenxiang.png" class="w100 h100 relative_fei" mode=""></image>
			<view class="mt20 px75 ">
				<view class="btnForm" @click="handleMoney()">
					捐款
				</view>
			</view>
		</view>

		<view class="h20"></view>
		<!-- 弹框 -->
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<view class="bg-white" style="height: 50vh;">
					<view class="grid grid-cols-3  items-center p35 border-bottom-dotted">
						<view class=""></view>
						<view class="text30 font-bold text-center col205D57">捐助</view>
						<view class="text-right">
							<uni-icons type="closeempty" size="26" color="#205D57" @click="close"></uni-icons>
						</view>
					</view>
					<cardFunds />
					<view class="bgEBEBEB h18 "></view>
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
					<view class="mt40 px75">
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
	export default {
		components: {
			hearchItem,
			swiperItems,
			cardFunds
		},
		data() {
			return {
				indexItem: 1,
				form: {
					name: '',
					money: ''
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
	.relative_fei {
		position: relative;
		left: 84vw;
	}

	.border-bottom-dotted {
		border: 1rpx dotted #9B9B9B;
	}

	.charitableImg {
		width: 170rpx;
		height: 65rpx;
	}

	.bgtwo {
		background: linear-gradient(90deg, #164336 0%, #226043 100%);
	}
</style>