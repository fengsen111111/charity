<template>
	<view class="bgF9 h-full">
		<hearch :title="'购物车'" />
		<!-- item -->
		<view class="px-3 mt-3 flex items-center" v-for="item in [1,2,3,4]" :key="item">
			<view class="">
				<uni-icons type="circle" size="20"></uni-icons>
			</view>
			<view class="w90 space-x-2  rending2  p-4 bg-whilt">
				<shopCard>
					<!-- slot -->
					<view class="mt-3">
						<view class="flex text12 items-center">
							<view class="w-6">总计</view>
							<view class="colED1 fontBold space-x-1">￥<text class="text20 ">888</text>.8</view>
							<view class="space-x-3">
								<uni-icons type="trash" size="22" color="#FC6265" class="space-x-3"></uni-icons>
							</view>
							<view class="w-8"></view>
							<view class="flex space-x-3 text24 text-center">
								<view class="leftView bgFF8 text-whlie">
									-
								</view>
								<view class="bg-whilt text-black cenVire text14">
									10
								</view>
								<view class="rightView bgFF8 text-whlie">
									+
								</view>
							</view>
						</view>
						<!-- 折扣 -->
						<view class="flex justify-between">
							<view></view>
							<view class="flex mt-1 items-center">
								<view class="discount"></view>
								<view class="col666 text12  ">使用折扣价</view>
							</view>
						</view>
					</view>
				</shopCard>
			</view>
			
		</view>
		<view class="h-8">

		</view>
		<!-- 底部锁定 -->
		<view class="bottomView flex p-4 text12 items-center">
			<view class="col666">实付金额</view>
			<view class="space-x-3 colED1 fontBold">￥<text class="text20 ">1888</text>.8</view>
			<view class="space-x-4 colED1">已优惠：￥888</view>
			<view class="w-8"></view>
			<text class="space-x-3 bg486 text-whlie text14 py-2 px-3 rending2">
				去支付
			</text>
		</view>
		<!--  -->
		<tarBar :checkIndex="4"/>
	</view>
</template>

<script>
	import hearch from '@/components/hearch/index.vue'
	import shopCard from '@/components/shopCard/index.vue'
	import tarBar from '@/components/tarBar/index.vue'
	export default {
		components: {
			hearch,
			shopCard,
			tarBar
		},
		data() {
			return {
				title: 'Hello',
				radio1: 1, //单选
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.bottomView {
		height: 2rem;
		position: fixed;
		background-color: #fff;
		bottom: 7.5vh;
		width: 100%;
	}

	.discount {
		border: 1px solid #666666;
		border-radius: 1.5rem;
		width: 0.75rem;
		height: 0.75rem;
		margin-right: 0.25rem;
	}

	.leftView {
		width: 2.5rem;
		height: 1.75rem;
		border-radius: 1rem 0px 0px 1rem;
		line-height: 1.5rem;
	}

	.cenVire {
		background-color: #F9F9F9;
		width: 2rem;
		height: 1.75rem;
		text-align: center;
		line-height: 1.75rem;
	}

	.rightView {
		width: 2.5rem;
		height: 1.75rem;
		border-radius: 0px 1rem 1rem 0px;
		line-height: 1.5rem;
	}

	.radios {
		border: 1px solid #666666;
		border-radius: 1.5rem;
		width: 1rem;
		height: 1rem;
	}
</style>