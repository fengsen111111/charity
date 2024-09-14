<template>
	<view class="bgF9">
		<view class="bgMyImg">
			<view class="flex w-full">
				<view class="flex items-center mt55 w-full">
					<view class="space-x-4">
						<image src="@/static/home/logUser.png" mode="" class="userImg"></image>
					</view>
					<view class="flex justify-between items-center">
						<view class="space-x-2">
							135******1234
						</view>
						<uni-icons type="compose" size="20" class="space-x-2" color="#fff"
							@click="handleUrl('/pages/sonView/myInfo/index')"></uni-icons>
						<view class="iconLeft flex bg486 text-center text-whlie py-2 px-4 rending5 items-center text14"
							@click="handleUrl('/pages/sonView/riderLogin/index')">
							<image src="@/static/my/handoff.png" mode="" class="w-4 h-4 uni-mr-2"></image>
							<view class="">骑手端</view>
						</view>
					</view>
				</view>
			</view>
			<!-- card -->
			<view class="px-3 mt-3">
				<view class="bg-whilt rending1 flex justify-between p-4"  @click="handleUrl('/pages/sonView/myOrder/index')">
					<view class="text-center">
						<image src="@/static/my/icon1_new.png" mode="" class="iconWH"></image>
						<view class="text-black text12">
							待付款
						</view>
					</view>
					<view class="text-center">
						<image src="@/static/my/icon2_new.png" mode="" class="iconWH"></image>
						<view class="text-black text12 ">
							进行中
						</view>
					</view>
					<view class="text-center">
						<image src="@/static/my/icon3_new.png" mode="" class="iconWH"></image>
						<view class="text-black text12 ">
							待评价
						</view>
					</view>
					<view class="text-center">
						<image src="@/static/my/icon4_new.png" mode="" class="iconWH"></image>
						<view class="text-black text12 ">
							退货/售后
						</view>
					</view>
					<view class="text-center">
						<image src="@/static/my/icon5_new.png" mode="" class="iconWH"></image>
						<view class="text-black text12 ">
							全部订单
						</view>
					</view>
				</view>
			</view>
			<!--  -->
			<view class="px-3">
				<view class="flex justify-between mt-3">
					<view class="centerBg rending1" style="">
						<view class="flex justify-between text-whlie px-4 py-2">
							<view class="">
								我的优惠卷
							</view>
							<uni-icons type="right" size="20" color="#fff"
								@click="handleUrl('/pages/sonView/discountAll/index')"></uni-icons>
						</view>
						<view class="flex justify-between text-whlie px-4 py-2">
							<view class="text12">
								待使用
							</view>
							<view class="text16">66</view>
						</view>
					</view>
					<view class="centerBg2" style="" @click="handleUrl('/pages/sonView/volume/index')"></view>
				</view>
				<!-- img -->
				<view class="centerBgTwo mt-3" style=""></view>
				<!-- cardItem -->
				<view class="mt-3">
					<view class="flex bg-whilt rending1 text-black mt-1 justify-between p-3" v-for="item in cards"
						:key="item.id">
						<view class="">{{item.text}}</view>
						<view class="flex items-center">
							<view class="text12 col666" v-show="item.id==1">
								可提现
							</view>
							<view class="col486 space-x-1" v-show="item.id==1">
								8888888
							</view>
							<view class="text12 col666" v-if="item.id==5">
								<button open-type="contact" class="btnTo">
									<uni-icons type="right" color="#666666" size="18"></uni-icons>
								</button>
							</view>
								<!-- 推广员 -->
							<uni-icons style="margin-top: 3rpx;" @click="handleOpen()" v-else-if="item.id==1"
								type="right" color="#666666" size="18"></uni-icons>
							<uni-icons style="margin-top: 3rpx;" @click="handleUrl(item.url)" v-else-if="item.id!==6"
								type="right" color="#666666" size="18"></uni-icons>
							<view v-else>
								1.2.222
							</view>
						</view>
					</view>
				</view>
			
				<view class="h5">

				</view>
			</view>
			<!-- 111 -->
			<!-- 选择公司 -->
			<uni-data-picker ref="picker" :localdata="items" popup-title="请选择公司" @change="onchange"
				@nodeclick="onnodeclick"></uni-data-picker>
		</view>
		<!-- 底部导航 -->
		<tarBar :checkIndex="5" />
	</view>
</template>

<script>
	import tarBar from '@/components/tarBar/index.vue'
	import { getPromoterCompanyList } from '@/request/api.js'
	export default {
		components: {
			tarBar
		},
		data() {
			return {
				title: 'Hello',
				cards: [{
						id: 1,
						text: '推广员收益',
						url: '/pages/sonView/popularize/index'
					},
					{
						id: 2,
						text: '收货地址',
						url: '/pages/sonView/address/index'
					},
					{
						id: 3,
						text: '用户协议',
						url: '/pages/sonView/swiperActive/index?type=3'
					},
					{
						id: 4,
						text: '关于我们',
						url: '/pages/sonView/swiperActive/index?type=4'
					},
					{
						id: 5,
						text: '联系客服',
						url: ''
					},
					{
						id: 6,
						text: '当前版本',
						url: ''
					}
				],
				items: [
					{
						text: "东门酒业责任有限公司",
						value: "1",
					},
					{
						text: "巨鹿送酒责任公司",
						value: "2"
					},
					{
						text: "天马到家股份责任有限公司",
						value: "3"
					}
				]
			}
		},
		onLoad() {

		},
		created(){
			// 分公司信息
			this._getPromoterCompanyList()
		},
		methods: {
			// 分公司列表
			_getPromoterCompanyList(){
				getPromoterCompanyList().then((res)=>{
					console.log('分公司信息',res);
				})
			},
			handleOpen(){
				this.$refs.picker.show()
			},
			handleUrl(url) {
				console.log(url);
				uni.navigateTo({
					url: url + ''
				})
			},
			onchange(e) {
				const value = e.detail.value
				console.log('当前选择',e,value);
				// 跳转推广人
				uni.navigateTo({
					url: '/pages/sonView/popularize/index?company_id='+value.value
				})
			},
			onnodeclick(node) {}
		}
	}
</script>

<style>
	.centerBgTwo {
		background-image: url('@/static/my/centerTwo.png');
		background-size: 100% 100%;
		width: 100%;
		height: 3rem;
	}

	.centerBg {
		background-image: url('@/static/my/center1.png');
		background-size: 100% 100%;
		width: 48%;
	}

	.centerBg2 {
		background-image: url('@/static/my/center2.png');
		background-size: 100% 100%;
		width: 48%;
	}

	.iconWH {
		width: 56rpx;
		height: 50rpx;
	}

	.iconLeft {
		position: relative;
		left: 12vw;
	}

	.userImg {
		width: 3.5rem;
		height: 3.5rem;
	}

	.bgMyImg {
		color: #fff;
		background-image: url('@/static/my/topBgNew.png');
		background-size: 100% 100%;
		height: 10rem;
		width: 100%;
	}

	.mt55 {
		margin-top: 5.5rem;
	}
</style>