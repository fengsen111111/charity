<template>
	<view class="">
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
					<image src="https://imgos.cn/2024/08/12/66b9d67b2c357.png" mode="" class="specs"></image>
					<view class="col486 space-x-2">
						<view class="text14">550ml*6</view>
						<view class="text12 ling1 mt-1">6.88元/瓶</view>
					</view>
				</view>
				<view class="bg-whilt rending1 p-2 flex w7 border999 space-x-4">
					<image src="https://imgos.cn/2024/08/12/66b9d67b2c357.png" mode="" class="specs"></image>
					<view class="text-black space-x-2">
						<view class="text14">550ml*6</view>
						<view class="text12 ling1 mt-1">6.88元/瓶</view>
					</view>
				</view>
			</view>
			<!--  -->
			<slot></slot>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.specs {
		width: 2.5rem;
		height: 2.5rem;
	}
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