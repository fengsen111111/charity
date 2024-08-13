<template>
	<view class="">
		<view class="space-x-3">
			<view class="bg-whilt rending1 p-2 w-full flex mb-2">
				<image src="@/static/classify/item.png" mode="" class="itemImg rending1"></image>
				<view class="space-x-2">
					<view class="fontBold text12 ling4">
						泸州老窖 六年窖头曲 浓香白酒 52度精品装 500ml...
					</view>
					<view class="flex mt-2 ling4">
						<text class="tagCol text-whlie px-2 text10">
							领取优惠券
						</text>
						<text class="tagBor colED1 px-2 text10">
							6.2折
						</text>
					</view>
					<!--  -->
					<view class="flex mt-2 ling4 items-center">
						<view class="colED1 fontBold">￥<text class="text18">888</text>.8</view>
						<view class="col999 text11 space-x-2 textDel">
							￥1888
						</view>
						<slot></slot>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props:{
		},
		data() {
			return {
			
			};
		},
		onLoad() {},
		methods: {
			
		}
	};
</script>

<style>
	.tagCol{
		background: linear-gradient( 270deg, #FA311D 0%, #FF8E34 100%);
	}
	.tagBor{
		border: 1px solid #FA311D;
	}
	.itemImg{
		width: 6.5rem;
		height: 5rem;
	}
</style>