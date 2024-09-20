<template>
	<view>
		<view v-if="!title">
			<uni-nav-bar dark :fixed="true" status-bar :left-icon="isLeft?'left':''" :left-text="leftText"
				@clickLeft="back">
				<view class="input-view">
					<slot></slot>
				</view>
			</uni-nav-bar>
		</view>
		<view v-else>
			<uni-nav-bar dark :fixed="true" status-bar :left-icon="isLeft?'left':''" :left-text="leftText" :title="title"
				@clickLeft="back" />
		</view>
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