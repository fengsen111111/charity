<template>
	<view class="">
		<hearchItem :isLeft="true" :title="'积分兑换'" />
		<view class="bg-white">
			<view class="p35">
				<view class="border205D57 col9B9B9B text24 flex p10 items-center radius30">
					<uni-icons type="search" size="20" color="#205D57"></uni-icons>
					<view class="ml10">请输入奖品/服务关键词搜索</view>
				</view>
			</view>
			<view class="flex items-center justify-between px36 pb30">
				<view class="px10 text26 col205D57" @click="handleIndex(item)" v-for="item in [1,2,3,4]" :key="item">
					<view :class="checkIndex==item?'checkIndex':''">
						{{item==1?'全部':item==2?'1-50分':item==3?'51-100分':'100分以上'}}</view>
				</view>
			</view>
		</view>
		<view class="p35" @click="handUrl('/pages/components/pointsMallDetails/index')">
			<shopItem />
		</view>

	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue'
	import shopItem from '@/components/shopItem/index.vue'
	export default {
		components: {
			hearchItem,
			shopItem
		},
		data() {
			return {
				value: 0,
				range: [{
						value: 0,
						text: "全部"
					},
					{
						value: 1,
						text: "进行中"
					},
					{
						value: 2,
						text: "已结束"
					},
					{
						value: 3,
						text: "待开始"
					},
				],

				checkIndex: 1,
			}
		},
		created() {
			//获取手机状态栏高度
		},
		mounted() {

		},
		watch: {},
		methods: {
			change(e) {
				console.log("e:", e);
			},
			handleIndex(index) {
				this.checkIndex = index
			},
			handUrl(item) {
				uni.navigateTo({
					url: item
				})
			},
		}
	}
</script>

<style>
	.checkIndex {
		background: linear-gradient(90deg, #174437 0%, #225F43 100%);
		color: white;
		padding: 8rpx 30rpx;
		border-radius: 20rpx;
	}

	.border-bottom-dotted {
		border: 1rpx dotted #9B9B9B;
	}

	.charitableImg {
		width: 170rpx;
		height: 65rpx;
	}

	.bgtwo {
		background: linear-gradient(90deg, #164336 0%, #226043 100%);
	}

	.uni-select__input-text {
		width: 100%;
		color: #205D57 !important;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		overflow: hidden;
	}

	.uni-select {
		font-size: 14px;
		border: 0px solid #e5e5e5 !important;
		box-sizing: border-box;
		border-radius: 4px;
		padding: 0 5px;
		padding-left: 10px;
		position: relative;
		display: flex;
		-webkit-user-select: none;
		user-select: none;
		flex-direction: row;
		align-items: center;
		border-bottom: solid 0px #e5e5e5 !important;
		width: 100%;
		flex: 1;
		height: 35px;
	}

	/* 隐藏滚动条，启用滚动 */
	.scrollable {
		overflow: scroll;
		/* 或者 overflow: auto */
		;
		width: 77vw;
		white-space: nowrap
	}

	/* 针对 WebKit 浏览器隐藏滚动条 */
	.scrollable::-webkit-scrollbar {
		display: none;
	}
</style>