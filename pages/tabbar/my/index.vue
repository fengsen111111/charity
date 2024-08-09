<template>
	<view class="bgF9">
		<view class="bgMyImg">
			<view class="flex w-full">
				<view class="flex items-center mt45 w-full">
					<view class="space-x-4">
						<image src="@/static/my/user.png" mode="" class="userImg"></image>
					</view>
					<view class="flex justify-between ">
						<view class="space-x-2">
							135******1234
						</view>
						<uni-icons type="compose" size="20" color="#fff" class="iconLeft" @click="handleUrl('/pages/sonView/myInfo/index')"></uni-icons>
					</view>
				</view>
			</view>
			<!-- card -->
			<view class="px-3">
				<view class="bg-whilt rending1 flex justify-between p-4">
					<view class="text-center" @click="handleUrl('/pages/sonView/myOrder/index')">
						<image src="@/static/my/icon1.png" mode="" class="iconWH"></image>
						<view class="text-black text12" >
							待付款
						</view>
					</view>
					<view class="text-center">
						<image src="@/static/my/icon2.png" mode="" class="iconWH"></image>
						<view class="text-black text12 ">
							进行中
						</view>
					</view>
					<view class="text-center">
						<image src="@/static/my/icon3.png" mode="" class="iconWH"></image>
						<view class="text-black text12 ">
							待评价
						</view>
					</view>
					<view class="text-center">
						<image src="@/static/my/icon4.png" mode="" class="iconWH"></image>
						<view class="text-black text12 ">
							退货/售后
						</view>
					</view>
					<view class="text-center">
						<image src="@/static/my/icon5.png" mode="" class="iconWH"></image>
						<view class="text-black text12 ">
							全部订单
						</view>
					</view>
				</view>
			</view>
			<!--  -->
			<view class="px-3">
				<view class="flex justify-between mt-3">
					<view class="centerBg rending1">
						<view class="flex justify-between text-whlie px-4 py-2">
							<view class="">
								我的优惠卷
							</view>
							<uni-icons type="right" size="20" color="#fff" @click="handleUrl('/pages/sonView/discountAll/index')"></uni-icons>
						</view>
						<view class="flex justify-between text-whlie px-4 py-2">
							<view class="text12">
								待使用
							</view>
							<view class="text16">66</view>
						</view>
					</view>  
					<view class="centerBg2" @click="handleUrl('/pages/sonView/volume/index')"></view>
				</view>
				<!-- img -->
				<view class="centerBgTwo mt-3"></view>
				<!-- cardItem -->
				<view class="mt-3">
					<view @click="handleUrl(item.url)"
						class="flex bg-whilt rending1 text-black mt-1 justify-between p-3" v-for="item in cards"
						:key="item.id">
						<view class="">{{item.text}}</view>
						<view class="flex items-center">
							<view class="text12 col666" v-show="item.id==1">
								可提现
							</view>
							<view class="col486 space-x-1" v-show="item.id==1">
								8888888
							</view>
							<uni-icons v-if="item.id!==6" type="right" color="#666666" size="18"></uni-icons>
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
		</view>
	</view>
</template>

<script>
	export default {
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
						url: ''
					},
					{
						id: 4,
						text: '关于我们',
						url: ''
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
				]
			}
		},
		onLoad() {

		},
		methods: {
			handleUrl(url) {
				console.log(url);
				uni.navigateTo({
					url: url + ''
				})
			}
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
		width: 1.75rem;
		height: 1.5rem;
	}

	.iconLeft {
		position: relative;
		left: 11rem;
	}

	.userImg {
		width: 2.5rem;
		height: 2.5rem;
	}

	.bgMyImg {
		color: #fff;
		background-image: url('@/static/my/topBg.png');
		background-size: 100% 100%;
		height: 8rem;
		width: 100%;
	}
</style>