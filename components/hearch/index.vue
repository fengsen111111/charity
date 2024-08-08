<template>
	<view class="">
		<uni-nav-bar dark :fixed="true" shadow background-color="#4867CF" status-bar left-icon="left"
			:left-text="leftText" :title="title" @clickLeft="back" />
	</view>
</template>

<script>
	export default {
		props: {
			title: '',
			leftText: '',
		},
		data() {
			return {}
		},
		onLoad() {

		},
		methods: {
			back() {
				console.log('返回')
                uni.navigateBack()
			},
		}
	}
</script>

<style>
	.searchFiexd{
		position: relative;
		top:0rem
	}
</style>