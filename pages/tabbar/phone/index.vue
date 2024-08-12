<template>
	<view class="mt-3">
		<view class="" @click="handleItem('/pages/sonView/login/index')">
			授权页面
		</view>
		<view class="" @click="handleItem('/pages/sonView/volume/index')">
			领卷中心
		</view>
		<view class="" @click="handleItem('/pages/sonView/spikes/index')">
			限时秒杀
		</view>
		<view class="" @click="handleItem('/pages/sonView/new/index')">
			新人专享
		</view>
		<view class="" @click="handleItem('/pages/sonView/oneSpikes/index')">
			一分秒杀
		</view>
		<view class="" @click="handleItem('/pages/sonView/riderLogin/index')">
			骑手端登录
		</view>
		<view class="" @click="handleItem('/pages/sonView/riderOrder/index')">
			骑手端接单
		</view>
		<view class="">
			定位
		</view>
	</view>
</template> 

<script>
export default {
	data() {
		return {
			active: false
		};
	},
	onLoad() {},
	onShow() {
		// setTimeout(() => {
		this.active = true;
		// }, 500);
	},
	onHide() {
		this.active = false;
	},
	methods: {
		handleItem(url){
			console.log(url);
			uni.navigateTo({
				url:url+''
			})
		}
	}
};
</script>

<style lang="scss" scoped></style>
