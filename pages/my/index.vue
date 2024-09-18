<template>
	<view class="">
		<hearch title="我的" />
		<view class="topView ">
			<view class="px36">
				<view class="bg-white radius20 w-full">
					<view class="p30 flex">
						<image src="https://img.picui.cn/free/2024/09/18/66ea73b25c621.png" class="userImg" mode="">
						</image>
						<view class="ml30 ">
							<view class="flex items-center justify-between">
								<view class="text36">微信昵称</view>
								<image src="../../static/config.png" class="imgConfig" mode=""></image>
							</view>
							<view class="col787878 text30 font-bold mt20">
								188 8888 8888
							</view>
						</view>
					</view>
					<view class="px36 py30 flex items-center justify-between">
						<view class="text24">我的积分</view>
						<view class="flex  colD6B07A">
							<view class="text36 font-bold ">18,888</view>
							<view class="text18 ml10 mt16">积分</view>
							<view class="w100"></view>
							<image src="../../static/record.png" class="imgConfig ml40" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="px36 py30  mt20 ">
			<view class="bg-white radius20 p30">
				<view class="" v-for="item in tagList" :key="item.id">
					<view class="flex justify-between">
						<view class="flex titleView">
							<view class="ml20">{{item.text}}</view>
						</view>
						<uni-icons type="right" size="20" color="#878787"></uni-icons>
					</view>
					<view class="border_bottom" v-if="item.id !== '5'"></view>
				</view>
			</view>
		</view>
		<view class="h160"></view>
		<!--  -->
		<tarBar :checkIndex='3' />
	</view>
</template>

<script>
	import tarBar from '@/components/tarbar/index.vue'
	import hearch from '@/components/hearch/index.vue'
	export default {
		components: {
			hearch,
			tarBar
		},
		data() {
			return {
				tagList:[
					{
						id:'1',
						url:'',
						text:'我的捐赠',
					},
					{
						id:'2',
						url:'',
						text:'我的兑换',
					},
					{
						id:'3',
						url:'',
						text:'我的地址',
					},
					{
						id:'4',
						url:'',
						text:'我参与的活动',
					},
					{
						id:'5',
						url:'',
						text:'活动核销',
					}
				]
			}
		},
		created() {
			//获取手机状态栏高度
		},
		mounted() {

		},
		watch: {},
		methods: {

		}
	}
</script>

<style>
	.border_bottom {
		border: 1rpx solid #F0F0F0;
		margin: 30rpx 0px;
	}

	.titleView {
		border-left: 6rpx solid #205D57;
	}

	.imgConfig {
		width: 38rpx;
		height: 38rpx;
		/* margin-left: 255rpx; */
		position: absolute;
		right: 74rpx;
	}

	.userImg {
		width: 110rpx;
		height: 110rpx;
		border-radius: 50%;
	}

	.topView {
		background-image: url('../../static/my_top_bg.png');
		background-size: 100% 100%;
		width: 100%;
		height: 240rpx;
	}

	.activeItemImg {
		width: 225rpx;
		height: 165rpx;
		border-radius: 20rpx;
	}

	.titleView {
		border-left: 6rpx solid #205D57;
	}

	.image_about {
		width: 100%;
		height: 380rpx;

	}

	.bgItems {
		background-color: #EBEBEB;
		height: 16rpx;
	}
</style>