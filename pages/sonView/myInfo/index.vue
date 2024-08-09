<template>
	<view class="">
		<hearch :title="'基本信息'" :isLeft="true"/>
		<view class="p-3 text12">
			<view class="bg-whilt rending1 p-3">
				<view class="" v-for="item in [1,2,3]" :key="item">
					<view class="text-black ling1">昵称</view>
					<view v-if="item!==3">
						<uni-easyinput class="uni-mt-5" trim="all" v-model="value" placeholder="输入昵称"></uni-easyinput>
						<view class="h-4" ></view>
					</view>
					<view class="flex items-center" v-else>
						<image src="@/static/my/user.png" mode="" class="imageItem mt-3 space-x-2"></image>
						<view class="col486 space-x-2 mt-2">
							替换
						</view>
					</view>
				</view>
			</view>
			<view class="h10"></view>
			<view class="h10"></view>
			<view class="bg486 text-whlie w-full py-3 rending2 text-center text16">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	import hearch from "@/components/hearch/index.vue"
	export default {
		components:{hearch},
		data() {
			return {
				active: false,
				value:'',
			};
		},
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
	.imageItem{
		width: 3.25rem;
		height: 3.25rem;
	}
</style>