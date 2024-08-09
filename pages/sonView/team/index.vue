<template>
	<view class="">
		<hearch :title="'我的团队'" :isLeft="true"/>
		<view class="p-3 text12">
			<view class="bg-whilt mt-3 rending1 p-3 items-center flex" v-for="item in [1,2,3]" :key="item">
				<image src="@/static/my/user.png" mode="" class="imageItem"></image>
				<view class="space-x-2">
					<view class="text14">135******1234</view>
					<view class="flex">
						<view class="text12">推荐时间</view>
						<view class="w9"></view>
						<view class="text12">2024-06-02</view>
					</view>
				</view>
				
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