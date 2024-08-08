<template>
	<view class="mt-3 h-full flex text12 ">
		<view class="bg-whilt px-3 rending1 ">
			<view class="py-2" :class="item.id>1?'col999':'col666'" v-for="item in dataTab" :key="item.id">
			{{item.text}}
			</view>
		</view>
		<!-- shop -->
		<view class="space-x-3">
			<view class="bg-whilt rending1 p-3 w-full flex mb-2" v-for="item in [1,2,3,4]" :key="item">
				<image src="@/static/classify/item.png" mode="" class="itemImg rending1"></image>
				<view class="space-x-2">
					<view class="fontBold  text12 w9 ling4">
						泸州老窖 六年窖头曲 浓香白酒 52度精品装 500ml...
					</view>
					<view class="flex mt-2 ling4">
						<text class="tagCol text-whlie px-2  text10">
							领取优惠券
						</text>
						<text class="tagBor colED1 px-2 text10">
							6.2折
						</text>
					</view>
					<!--  -->
					<view class="flex mt-2 ling4 items-center">
						<view class="colED1 fontBold">￥<text class="text18">888</text>.8</view>
						<view class="col999 space-x-2">
							￥1888
						</view>
						<view class="bg486 text-whlie px-2 rending1 py-1 space-x-2">
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
		components:{
		},
		data() {
			return {
				title: 'Hello',
				dataTab:[
					{
						id:1,
						text:'国产风味'
					},
					{
						id:2,
						text:'进口风味'
					},
					{
						id:3,
						text:'百威'
					},
					{
						id:4,
						text:'雪花'
					},
					{
						id:5,
						text:'燕京'
					},
					{
						id:6,
						text:'乐堡'
					},
				]
			}
		},
		onLoad() {
	
		},
		methods: {
	
		}
	}
</script>

<style>
	.tagCol{
		background: linear-gradient( 270deg, #FA311D 0%, #FF8E34 100%);
	}
	.tagBor{
		border: 1px solid #FA311D;
	}
	.itemImg{
		width: 5rem;
		height: 5rem;
	}
</style>