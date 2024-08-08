<template>
	<view class="">
		三方页面
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
		goToPage(url) {
			if (!url) return;
			uni.navigateTo({
				url
			});
		}
	}
};
</script>

<style lang="scss" scoped></style>
