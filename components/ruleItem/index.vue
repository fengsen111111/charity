<template>
	<view class="">
		<view class="bg-whilt rending1 p-3">
			<view class="flex items-center">
				<view class="">
					选择口味
				</view>
				<view class="selView">
					<uni-data-select placeholder="请选择口味" v-model="value" :localdata="range" :clear="false" @change="change">
					</uni-data-select>
				</view>
			</view>
			<!--  -->
			<view class="flex mt-4">
				<view class="rending1 p-2 flex w7 mr-2" @click="handleCheck(item)"
					:class="checkItem == item?'bgF2F col486 border486':' bg-whilt border999'" v-for="item in [1,2]"
					:key="item">
					<image src="https://imgos.cn/2024/08/12/66b9d67b2c357.png" mode="" class="specs"></image>
					<view class=" space-x-2">
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
	export default {
		components: {},
		props: {},
		data() {
			return {
				checkItem: 1,
				value: null,
				range: [
				          { value: 0, text: "原味  库存：666" },
				          { value: 1, text: "桃味  库存：666" },
				          { value: 2, text: "茶味  库存：666" },
				        ],
			};
		},
		onLoad() {},
		methods: {
			handleCheck(index) {
				this.checkItem = index
			},
			change(e){
				console.log('选择',e);
			}
		}
	};
</script>

<style>
	.selView{
		width:300rpx;margin-left: 20rpx;
	}
	.specs {
		width: 2.5rem;
		height: 2.5rem;
	}

	.tagCol {
		background: linear-gradient(270deg, #FA311D 0%, #FF8E34 100%);
	}

	.tagBor {
		border: 1px solid #FA311D;
	}

	.itemImg {
		width: 6.5rem;
		height: 5rem;
	}
</style>