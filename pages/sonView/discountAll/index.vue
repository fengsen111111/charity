<template>
	<view class="">
		<hearch :title="'我的优惠卷'" :isLeft="true"/>
		<view class="px-3 pt-3">
			<view class="grid grid-cols-3 text-center">
				<view class="col666">待使用</view>
				<view class="col486 text-center">
					<view class="">已使用</view>
					<view class="border486 w-6 mxAuto rending1"></view>
				</view>
				<view class="col666">未使用</view>
			</view>
		</view>
		<!--  -->
		<volumeTag />
		<view class="col666 text-center mt-10">
			暂无优惠卷可用
		</view>
		<!-- 领卷中心 -->
		<view class="rightBottomImg text10 text-whlie text-center" @click="handleUrl('/pages/sonView/volume/index')">
			<view class="h-8"></view>
			<view class="h-2"></view>
			<view class="">领卷中心</view>
		</view>
	</view>
</template>

<script>
	import hearch from "@/components/hearch/index.vue"
	import volumeTag from "@/components/volumeTag/index.vue"
	export default {
		components:{hearch,volumeTag},
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
			handleUrl(url) {
				console.log(url);
				uni.navigateTo({
					url: url + ''
				})
			}
		}
	};
</script>

<style>
	.rightBottomImg{
		background-image: url('@/static/my/rightBottomImg.png');
		background-size: 100% 100%;
		height: 4rem;
		width: 3rem;
		position: fixed;
		bottom: 1rem;
		right: 1rem;
	}
</style>