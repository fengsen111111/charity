<template>
	<view class="">
		<view class="flex mt20 py20 bg-white px36" v-for="item in [1]" :key="item" @click="handelUrl(item.id)">
			<image src="https://img.picui.cn/free/2024/09/18/66ea73b25c621.png" class="cardImg" mode=""></image>
			<view class=" ml30">
				<view class="flex">
					<view class="text32 font-bold w-3-4">活动名称活动名称活动名称</view>
					<view v-if="item==1" class="status_1">进行中</view>
					<view v-else-if="item==2" class="status_2">已结束</view>
					<view v-else-if="item==3" class="status_3">待开始</view>
				</view>
				<view class="flex justify-between items-center mt10">
					<view class="font-bold text32 col205D57">名额：15人</view>
					<view class="text24 col-black">可获得<text class="ml10 colD6B07A">12,000积分</text></view>
				</view>
				<view class="flex text18 col787878 mt10">
					活动时间：2024-12-12 16:30至2024-12-12 16:30
				</view>

				<view v-if="isCode&&item==1">
					<view @click="handleCode" class="py20 mt30 px30 radius20 w120 flex items-center"
						style="background: linear-gradient(-5deg, #BC9E61 0%, #DCB77E 100%);">
						<image src="../../static/code_er.png" class="img30" mode=""></image>
						<view class="text24 col-white ml20">核销码</view>
					</view>
				</view>
			</view>
		</view>
		<view class="flex mt20 py20 bg-white px36" v-for="item in activeList" :key="item.id" @click="handelUrl(item.id)">
			<image :src="item.cover_image" class="cardImg" mode=""></image>
			<view class=" ml30">
				<view class="flex">
					<view class="text32 font-bold w-3-4">{{item.name}}</view>
					<view v-if="item.status=='a'" class="status_1">待开始</view>
					<view v-else-if="item.status=='b'" class="status_2">进行中</view>
					<view v-else-if="item.status=='c'" class="status_3">已结束</view>
				</view>
				<view class="flex justify-between items-center mt10">
					<view class="font-bold text32 col205D57">名额：{{item.person_number}}人</view>
					<view class="text24 col-black">可获得<text class="ml10 colD6B07A">{{item.integral}}积分</text></view>
				</view>
				<view class="flex text18 col787878 mt10">
					活动时间：{{item.start_time}}至{{item.end_time}}
				</view>
				<view v-if="isCode&&item==1">
					<view @click="handleCode" class="py20 mt30 px30 radius20 w120 flex items-center"
						style="background: linear-gradient(-5deg, #BC9E61 0%, #DCB77E 100%);">
						<image src="../../static/code_er.png" class="img30" mode=""></image>
						<view class="text24 col-white ml20">核销码</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 二维码 -->
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<view class="bg-white" style="height: 60vh;">
					<view class="grid grid-cols-3  items-center p35 border-bottom-dotted">
						<view class=""></view>
						<view class="text30 font-bold text-center col205D57">活动核销码</view>
						<view class="text-right"><uni-icons type="closeempty" size="26" color="#205D57"
								@click="close"></uni-icons></view>
					</view>
					<view class="text-center padding_code">
						<image src="../../static/item_1.png" class="imgCode" mode=""></image>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		props: {
			isCode: {
				type: Boolean,
				default: false
			},
			activeList:{
				type: Array,
				default:()=>[]
			}
		},
		components: {},
		data() {
			return {
			}
		},
		created() {
			//获取手机状态栏高度
		},
		mounted() {

		},
		watch: {},
		methods: {
			handleCode() {
				this.$refs.popup.open('bottom')
			},
			close() {
				this.$refs.popup.close()
			},
			// 活动详情
			handelUrl(active_id){
				uni.navigateTo({
					url:'/pages/components/eventRegistrationDetails/index?active_id='+active_id
				})
			}
		}
	}
</script>

<style>
	.cardImg {
		width: 225rpx;
		height: 165rpx;
		border-radius: 20rpx;
	}
	.imgCode{
		width: 381rpx;
		height: 381rpx;
		border-radius: 20rpx;
	}
	.padding_code{
		padding: 184rpx;
	}
</style>