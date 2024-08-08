<template>
	<view class="">
		<hearch :title="'商品详情'" />
		<!-- img -->
		<image src="@/static/home/swiperImg.png" mode="" class="w-full h20"></image>
		<!--  -->
		<view class="px-3">
			<!--  -->
			<view class="flex justify-between">
				<!-- left -->
				<view class="">
					<view class="mt-3 flex">
						<view class="colED1 fontBold space-x-1">￥<text class="text24">1888</text>.8</view>
						<view class="space-x-2 col999 mt-1">
							￥8888
						</view>
					</view>
					<view class="flex mt-2">
						<view class="bgED1 py-1 ling1 w-6 px-2  text10 text-whlie text-center">
							6.2折
						</view>
						<view class="colED1 text11 ling1 borTag pt-1 px-2">
							均价：6.88元/瓶
						</view>
					</view>
				</view>
				<!-- right -->
				<view class="bgIcon text10 text-whlie pt-10 text-center">
					<text>领取优惠券</text>
				</view>
			</view>
			<!-- text -->
			<view class="mt-3 fontBold text16">
				五粮液股份 五粮春二代菁萃浓香型52550ml单瓶优级酒
			</view>
			<view class="mt-3 col999 text11 ling4">
				五粮春菁萃版52度550ml单瓶装五粮春菁萃版52度550ml单瓶装五粮春菁萃版52度550ml单瓶装五粮春菁萃版52度550ml单瓶装五五粮春菁萃版春菁...
			</view>
			<view class="flex justify-between">
				<view class=""></view>
				<view class="text11 col486 flex">
					展开
					<uni-icons type="down" size="12" color="#4867CF"></uni-icons>
				</view>
			</view>
			<!-- card -->
			<view class="bg-whilt rending1 p-3">
				<view class="flex items-center">
					<view class="">
						选择口味
					</view>
					<view class="bgF9 col666 text12 flex px-2 py-1 rending1 space-x-2">
						<view class="">
							原味
						</view>
						<view class="space-x-6">
							库存:666666
							<uni-icons type="down" size="12" color="#4867CF"></uni-icons>
						</view>
					</view>
				</view>
				<!--  -->
				<view class="flex mt-4">
					<view class="bgF2F rending1 p-2 flex w7 border486">
						<image src="@/static/home/shopOne.png" mode="" class="specs"></image>
						<view class="col486 space-x-2">
							<view class="text14">550ml*6</view>
							<view class="text12 ling1 mt-1">6.88元/瓶</view>
						</view>
					</view>
					<view class="bg-whilt rending1 p-2 flex w7 border999 space-x-4">
						<image src="@/static/home/shopOne.png" mode="" class="specs"></image>
						<view class="text-black space-x-2">
							<view class="text14">550ml*6</view>
							<view class="text12 ling1 mt-1">6.88元/瓶</view>
						</view>
					</view>
				</view>
				<!--  -->
				<view class="grid grid-cols-3 text-center mt-4 bgF9 rending1 py-2">
					<view class="">
						<view class="col666 text11">品牌</view>
						<view class="text12 fontBold">五粮春</view>
					</view>
					<view class="borderLeftRight">
						<view class="col666 text11">产地</view>
						<view class="text12 fontBold">中国</view>
					</view>
					<view class="flex items-center ">
						<view class="space-x-6">
							<view class="col666 text11">酒精度</view>
							<view class="text12 fontBold">52%voI</view>
						</view>
						<uni-icons type="right" class="space-x-4" color="#666666" size="20"></uni-icons>
					</view>
				</view>
				<!--  -->
			</view>
			<!--  -->
			<image src="@/static/home/strip.png" mode="" class="w-full h-6 mt-4"></image>
			<!--  -->
			<view class="bg-whilt rending1 fontBold flex justify-between py-1 px-2">
				<view class="flex ">
					<uni-icons type="location"  color="#666666" size="12"></uni-icons>
					<text class="space-x-1 text12">提供配送服务</text>
				</view>
				<view class="flex ">
					<uni-icons type="location"  color="#666666" size="12"></uni-icons>
					<text class="space-x-1 text12">极速送达</text>
				</view>
				<view class="flex ">
					<uni-icons type="location"  color="#666666" size="12"></uni-icons>
					<text class="space-x-1 text12">超时赔付</text>
				</view>
				<view class="flex ">
					<uni-icons type="location"  color="#666666" size="12"></uni-icons>
					<text class="space-x-1 text12">正品保真</text>
				</view>
				
				<uni-icons type="more-filled"  color="#666666" size="12"></uni-icons>
			</view>
			<!--  -->
			<view class="bg-whilt mt-3 rending1 p-3">
				<view class="flex text-black justify-between">
					<view class="">
						评价
					</view>
					<view class="flex text12">
						+9999w
						<uni-icons type="right" color="#000000" size="12"></uni-icons>
					</view>
				</view>
				<!--  -->
				<view class="" v-for="item in [1,2]" :key="item">
					<view class="flex text-black mt-3">
						<view class="flex justify-between w-full">
							<view class="flex">
								<image src="@/static/my/user.png" class="userImg" mode=""></image>
								<view class="fontBold space-x-2">
									<view class="">用户名称</view>
									<view class="colED1 text12">5.0 分</view>
								</view>
							</view>
							<view class="text12">
								2024-06-26
							</view>
						</view>
					</view>
					<!--  -->
					<view class="bgF9 rending1 p-2 col666 text12 ling4">
						五粮春菁萃版52度550ml单瓶装五粮春菁萃版52度550ml单瓶装五粮春菁萃版52度550ml单瓶装五粮春菁萃版52度550ml单瓶装
					</view>
				</view>
				<!--  -->
				
			</view>
			<image src="@/static/home/bottomImage.png" mode="" class="w-full mt-3"></image>
			<!--  -->
			<!-- <view class="h20"></view> -->
			
		</view>
		<!-- 购物 -->
		<view class="gw flex justify-between">
			<view class="flex mt-3">
				<view class="text-center space-x-6">
					<image src="@/static/classify/serve.png" mode="" class="iconTwo"></image>
					<view class="text12 ling0 mt-1">客服</view>
				</view>
				<view class="text-center space-x-6">
					<image src="@/static/classify/shopping.png" mode="" class="iconTwo"></image>
					<view class="text12 ling0 mt-1">购物车</view>
				</view>
			</view>
			<!--  -->
			<view class="flex text-whlie text14">
				<view class="viewLeft bgFF8">
					加入购物车
				</view>
				<view class="viewRight bg486">
					立即购买
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import hearch from '@/components/hearch/index.vue'
	export default {
		components: {
			hearch
		},
		data() {
			return {};
		},
		onLoad() {},
		methods: {

		}
	};
</script>

<style>
	.userImg{
		width: 2.5rem;
		height: 2.5rem;
	}
	.borderLeftRight{
		border-left: 1px solid #999999;
		border-right: 1px solid #999999;
	}
	.specs {
		width: 2.5rem;
		height: 2.5rem;
	}

	.bgIcon {
		background-image: url('@/static/home/shopDetailIcon.png');
		background-size: 100% 100%;
		width: 3.5rem;

	}

	.borTag {
		border: 1px solid #ED1805;
	}
	.viewLeft{
		width: 4.5rem;
		padding: 0.5rem;
		border-radius: 1.5rem 0px 0px 1.5rem;
		height: 2rem;
		margin-top: 0.325rem;
		line-height: 2rem;
	}
	.viewRight{
		width: 4.5rem;
		padding: 0.5rem;
		border-radius:  0px 1.5rem 1.5rem 0px;
		height: 2rem;
		margin-top: 0.325rem;
		line-height: 2rem;
		margin-right: 1rem;
	}
	.iconTwo{
		width: 1.25rem;
		height: 1.25rem;
	}
	.gw{
		height: 3.75rem;
		background-color: #fff;
		position: fixed;
		top:91.5vh;
		/* border: 1px solid red; */
		width: 100%;
	}
</style>