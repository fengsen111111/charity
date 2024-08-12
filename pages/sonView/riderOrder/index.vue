<template>
	<view class="">
		<view class="bgMyImg">
			<view class="space-x-3">
				<view class="h-8"></view>
				<image src="@/static/my/topText.png" mode="" class="topText mt-2"></image>
				<view class="ling1">
					骑手端
				</view>
			</view>
			<view class="h-6"></view>
			<view class="bg-whilt text-black text14 px-6 py-2 rending1 items-center flex justify-between">
				<view class="">
					<view class="">骑手名字</view>
					<view class="text12">13412341234</view>
				</view>
				<view class="flex">
					<view class="">累计接单</view>
					<view class="col486 space-x-2 text18">8888888</view>
				</view>
			</view>
			<view class="bgF9 mt-3 text-black text14 px-6 py-2 rending2 items-center ">
				<view class="flex">
					<view class="col486">待接单（88）</view>
					<view class="w-8"></view>
					<view class="">已接单</view>
					<view class="w-8"></view>
					<view class="">已送达</view>
				</view>
				<view class="bg-whilt mt-3 text12" v-for="item in [1,2,3]" :key="item">
					<view class="flex justify-between p-3">
						<view class="">订单编号:123456789</view>
						<view class="col68B border68B ling5 px-2 rending1">待接单</view>
					</view>
					<view class="border999One"></view>
					<view class="flex justify-between px-3 pt-3">
						<view class="flex">
							<view>区域</view>
							<view>武侯区</view>
						</view>
						<view class="flex">
							<view>下单时间</view>
							<view>2024-06-26</view>
						</view>
					</view>
					<!--  -->
					<view class="bg-whilt rending1 p-3">
						<view class="flex" >
							<text>张三</text>
							<text class="space-x-2">13512341234</text>
						</view>
						<view class="flex justify-between">
							<view class="w80">
								四川省成都市武侯区世纪城天府大道中段588号天天小区快鸟驿站
							</view>
							<view class="text-center space-x-4">
								<uni-icons type="location" size="20" color="#4867CF"></uni-icons>
								<view class="col999">
									888km
								</view>
							</view>
						</view>
					</view>
					<view class="border999One"></view>
					<!--  -->
					<view class="bg-whilt">
						<view class="flex justify-between p-3">
							<view class="">商品信息</view>
							<view class="col486 flex">
								展开
							  <uni-icons type="down" size="16" color="#4867CF"></uni-icons>
							</view>
						</view>
						<view class="bg486  text14 rending2 text-whlie text-center py-2 w85 mxAuto">
							接单
						</view>
						<view class="h-4"></view>
					</view>
				</view>
				<view class="h-8"></view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: false,
				value1:'',
				value2:''
			};
		},
		components:{  },
		onLoad() {},
		onShow() {
			
		},
		onHide() {
		},
		methods: {
		}
	};
</script>

<style>
	
	.bgMyImg {
		color: #fff;
		/* background-image: url('@/static/my/topBg.png'); */
		/* background-size: 100% 100%; */
		background: linear-gradient( 180deg, #4561C8 0%, #3A4AAC 100%);
		height: 14rem;
		width: 100%;
	}
	.topText{
		width: 4rem;
		height: 1rem;
	}
</style>