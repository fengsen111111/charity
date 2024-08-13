<template>
	<view>
		<uni-nav-bar dark :fixed="true" shadow background-color="#4867CF" status-bar :left-icon="isLeft?'left':''"
			:left-text="leftText" :title="title" @clickLeft="back"></uni-nav-bar>
	</view>
</template>

<script>
	export default {
		props: {
			title: '',
			leftText: '',
			isLeft: true,

		},
		data() {
			return {
			}
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
	.searchFiexd {
		position: relative;
		top: 0rem
	}
	.topPt {
		padding-top: 6%;
	}

	.-tag1 {
		margin-top: -1px;
	}

	.search {
		border: 1px solid #D7D9EC;
		border-radius: 1rem;
		background-color: #D7D9EC;
	}

	.item {
		/* opacity: 0.1; */
		background-color: #81B1EE;
		border-radius: 1rem;
		padding: 0px 0.25rem;
		color: #fff;
	}
</style>