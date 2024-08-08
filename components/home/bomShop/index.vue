<template>
	<view class="">
		<view class="mt-3 text-black text12">
			<view class="flex">
				<view class="mr-2 col486 text14 checkboxItem">推荐</view>
				<view class="mr-2">白酒类</view>
				<view class="mr-2">朗姆酒</view>
				<view class="mr-2">威士忌</view>
			</view>
			<view class="grid grid-cols-2 gridRow">
				<view class="bg-whilt rending1 p-2 mt-3" v-for="item in [1,2,3,4]" :key="item">
					<image @click="handDetailds" src="@/static/home/shopOne.png" mode="" class="w-full h10"></image>
					<view class="fontBold text12 ling125 ">
						泸州老窖 六年窖头曲 特惠浓香白酒 52度精品装 500ml...
					</view>
					<text class="colFA3 px-1 text10 rending1 tagShopItem">200ml/瓶</text>
					<view class="flex justify-between">
						<view class="">
							<view class="flex px-1 ">
								<view class="colED1 text14 fontBold space-x-1">
									1888.8
								</view>
								<view class="col999 text10 space-x-2">
									￥8888
								</view>
							</view>
							<view class="colED1 ling1 text10 ">
								约 66.88元/瓶  148.88元/箱 
							</view>
						</view>
						<view class="text12 bg486 h-6 rending1 text-whlie p-1">
							选规格
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				searchValue: '',
			};
		},
		onLoad() {},
		methods: {
			handDetailds(){
				console.log('跳转详情');
				uni.navigateTo({
				  url: '/pages/tabbar/home/components/shopDetails/index'
				})
			}
		}
	};
</script>

<style>
	.checkboxItem {
		border-bottom: 3px solid #4867CF;
		padding: 0px 0.5rem;
	}
	.tagShopItem {
		border: 1px solid #ED1805;
	}
	.gridRow {
		grid-column-gap: 0.5rem;
	}
</style>