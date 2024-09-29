<template>
	<view class="">
		<hearchItem :title="'我的'" />
		<view class="topView ">
			<view class="px36">
				<view class="bg-white radius20 w-full">
					<view class="p30 flex">
						<image :src="userInfo.head_image" class="userImg" mode="">
						</image>
						<view class="ml30 ">
							<view class="flex items-center justify-between"  v-if="userInfo.mobile">
								<view class="text36">{{userInfo.nickname}}</view>
								<image src="../../static/config.png" class="imgConfig" mode=""
									@click="inputDialogToggle"></image>
							</view>
							<view class="col787878 text30 font-bold mt20" v-if="userInfo.mobile">
								{{userInfo.mobile}}
							</view>
							<button v-else style="font-size:32rpx;margin-left:20rpx" open-type="getPhoneNumber"
								@getphonenumber="_getPhoneNumber" id="sqphone" ref="sqphone">
								授权
							</button>
						</view>
					</view>
					<view class="px36 py30 flex items-center justify-between">
						<view class="text24">我的积分</view>
						<view class="flex  colD6B07A">
							<view class="text36 font-bold ">{{userInfo.integral||0}}</view>
							<view class="text18 ml10 mt16">积分</view>
							<view class="w100"></view>
							<image src="../../static/record.png" class="imgConfig ml40" mode=""
								@click="handUrl('/pages/components/redemptionHistory/index')"></image>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="px36 py30  mt20 ">
			<view class="bg-white radius20 p30">
				<view class="" v-for="item in tagList" :key="item.id" @click="handUrl(item.url)">
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
		<!--  -->
		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="昵称" value="微信用户" placeholder="请输入内容"
				@confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
		<!--  -->
		<tarBar :checkIndex='3' />
	</view>
</template>

<script>
	import tarBar from '@/components/tarBar/index.vue'
	import hearchItem from '@/components/hearchItem/index.vue'
	import {
		getUserInfo, //用户信息
		updateUserInfo, //修改用户信息
		getPhoneNumber //手机号
	} from '@/request/api.js'
	export default {
		components: {
			hearchItem,
			tarBar
		},
		data() {
			return {
				tagList: [{
						id: '1',
						url: '/pages/components/myDonation/index',
						text: '我的捐赠',
					},
					{
						id: '2',
						url: '/pages/components/myRedemptions/index',
						text: '我的兑换',
					},
					{
						id: '3',
						url: '/pages/components/address/index',
						text: '我的地址',
					},
					{
						id: '4',
						url: '/pages/components/getInvolved/index',
						text: '我参与的活动',
					},
					{
						id: '5',
						url: '',
						text: '活动核销',
					}
				],
				userInfo: {}, //用户信息
				mobile: '', //手机号
				nickname: '', //name
			}
		},
		created() {
			//获取手机状态栏高度
		},
		onReady() {
			this._getUserInfo()
		},
		watch: {},
		methods: {
			// 用户信息
			_getUserInfo() {
				getUserInfo().then((res) => {
					console.log('用户信息', res.data.data);
					this.userInfo = res.data.data
				})
			},
			handUrl(item) {
				console.log('跳转', item);
				if (item) {
					uni.navigateTo({
						url: item
					})
				} else {
					// 扫码
					uni.scanCode({
						success: function(res) {
							console.log('条码类型：' + res.scanType);
							console.log('条码内容：' + res.result);
						}
					});
				}
			},
			inputDialogToggle() {
				this.$refs.inputDialog.open()
			},
			dialogInputConfirm(val) {
				console.log(val)
				this.nickname = val
				updateUserInfo({
					post_params: {
						mobile: this.mobile,
						nickname: this.nickname,
						head_image: ''
					}
				}).then((res) => {
					console.log('修改用户信息', res.data.data);
					this.$refs.inputDialog.close()
					this._getUserInfo()
				})
			},
			_getPhoneNumber(e) {
				console.log('搜全会', e.detail.code)
				getPhoneNumber({
					post_params: {
						platform: 'mini',
						code: e.detail.code,
						mini_openid: this.$store.state.userInfo.mini_openid
					}
				}).then((res) => {
					console.log('授权成功', res.data.data.phone_number)
					this.mobile = res.data.data.phone_number
					uni.setStorageSync('phone',this.mobile)//存入电话号码
					this.dialogInputConfirm()
				})
			},
		}
	}
</script>

<style>
	.border_bottom {
		border-bottom: 1rpx solid #F0F0F0;
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
		margin-top: -1rpx;
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