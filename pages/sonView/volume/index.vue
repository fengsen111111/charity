<template>
	<view class="">
		<!--  -->
		<viewTop :title="'领卷中心'"/>
		<!--  -->
		<view class="bg-whilt  h-full viewContent p-3">
			<view class="flex justify-evenly">
				<view class="" v-for="item in [1,2,3]" :key="item">
					全部
				</view>
			</view>
			<volumeTag />
			<!-- 留白 -->
			<view class="h20"></view>
		</view>
	</view>
</template>

<script>
	import viewTop from "@/pages/sonView/volume/components/viewTop/index.vue"
	import volumeTag from "@/components/volumeTag/index.vue"
	export default {
		data() {
			return {
				active: false
			};
		},
		components:{viewTop,volumeTag},
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
	.viewContent{
		position: relative;
		top: -4rem;
		border-radius: 1rem 1rem 0px 0px;
	}
</style>