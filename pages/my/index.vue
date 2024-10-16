<template>
	<view class="">
		<hearchItem :title="'我的'" />
		<view class="topView ">
			<view class="px36">
				<view class="bg-white radius20 w-full">
					<view class="p30 flex">
						<!-- <image @click="handleUpload" v-if="userInfo.head_image" :src="userInfo.head_image" class="userImg" mode=""></image> -->
						<!-- <button v-else class="clear-style" open-type="chooseAvatar" @chooseavatar="chooseAvatar"> -->
						<button class="clear-style" open-type="chooseAvatar" @chooseavatar="chooseAvatar">
							<!--  @click="handleUpload"   -->
							<image :src="img_user" v-if="img_user" mode="" class="userImg"></image>
							<view v-else class="userImg bgEBEBEB"></view>
						</button>
						<view class="ml30 ">
							<view class="flex items-center justify-between" v-if="userInfo.mobile">
								<view class="text36">{{userInfo.nickname}}</view>
								<image src="../../static/config.png" class="imgConfig" mode=""
									@click="inputDialogToggle"></image>
							</view>
							<view class="col787878 text30 font-bold mt20" v-if="userInfo.mobile">
								{{userInfo.mobile}}
							</view>
							<button class="clear-style" v-else
								style="font-size:32rpx;margin-left:20rpx;line-height: 110rpx;"
								open-type="getPhoneNumber" @getphonenumber="_getPhoneNumber" id="sqphone" ref="sqphone">
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
					<view class="border_bottom" v-if="item.id!=4"></view>
				</view>
				<view v-if="userInfo.is_worker == 'Y'" @click="handUrl('')">
					<view class="border_bottom"></view>
					<view class="flex justify-between">
						<view class="flex titleView">
							<view class="ml20">活动核销</view>
						</view>
						<uni-icons type="right" size="20" color="#878787"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<!--  -->
		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="昵称" :value="userInfo.nickname" placeholder="请输入昵称"
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
		getPhoneNumber, //手机号
		overActivityOrder,
		getTicket, //上传1
		getUploadType, //上传2
		uploadFile //上传3
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
					// {
					// 	id: '5',
					// 	url: '',
					// 	text: '活动核销',
					// }
				],
				userInfo: {}, //用户信息
				mobile: '', //手机号
				nickname: '', //name

				img_user: '', //用户头像
			}
		},
		created() {
			//获取手机状态栏高度
		},
		onReady() {
			this.img_user = uni.getStorageSync('imgUser')
			this._getUserInfo()
		},
		watch: {},
		methods: {
			chooseAvatar(e) {
				console.log(' e.detail', e.detail.avatarUrl);
				this.img_user = e.detail.avatarUrl
				// -----------------------------------
				// let arr = avatarUrl.split("/")
				// const fileName = arr[arr.length - 1]
				
				let ticket_time = ''
				getTicket().then((res) => {
					ticket_time = res.data.data.ticket_time
					console.log('文件操作权限的时间',ticket_time);
					console.log('e.detail.avatarUrl',e.detail.avatarUrl);
					uni.uploadFile({
						url: "https://donate.api.sczhiyun.net/factory_storage/File/uploadFile",
						filePath:e.detail.avatarUrl,
						name: "file",
						formData: {
							ticket_time:ticket_time,
							folder: "image",
							file_type: "image"
						},
					}).then(res => {
						console.log('111',res);
						this.dialogInputConfirm()
						// const data = JSON.parse(res.data)
					})
				})
				
				
				// -----------------------------------
				// uni.setStorageSync('imgUser', this.img_user)
				// getTicket().then((res) => {
				// 	console.log('获取文件存储权限', res.data)
				// 	getUploadType().then((res_two) => {
				// 		console.log('获取文件存储配置', res_two.data)
				// 		const params = {
				// 			"ticket_time": res.data.data.ticket_time,
				// 			"file": e.detail.avatarUrl,
				// 			"folder": res_two.data.data.config.folder ? res_two.data.data.config
				// 				.folder : 'userInfo',
				// 			"file_type": res_two.data.data.config.file_type ? res_two.data.data.config
				// 				.file_type : 'image'
				// 		}
				// 		uploadFile(params).then((fileRes) => {
				// 			console.log('上传图片', fileRes.data)
				// 			this.img_user = fileRes.data
				// 			this.dialogInputConfirm()
				// 		})
				// 	})
				// })
			},
			handleUpload() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						console.log('数据', chooseImageRes);
						const tempFilePaths = chooseImageRes.tempFilePaths;
						getTicket().then((res) => {
							console.log('获取文件存储权限', res.data)
							getUploadType().then((res_two) => {
								console.log('获取文件存储配置', res_two.data)
								const params = {
									"ticket_time": res.data.data.ticket_time,
									"file": tempFilePaths,
									"folder": res_two.data.data.config.folder ? res_two
										.data.data.config.folder : 'userInfo',
									"file_type": res_two.data.data.config.file_type ?
										res_two.data.data.config.file_type : 'image',
									"upload_type": 'local'
								}
								uploadFile(params).then((fileRes) => {
									console.log('上传图片', fileRes.data)
									this.img_user = fileRes.data
									this.dialogInputConfirm()
								})
							})
						})
					}
				});
			},
			// 用户信息
			_getUserInfo() {
				getUserInfo().then((res) => {
					console.log('用户信息', res.data.data);
					this.userInfo = res.data.data
				})
			},
			handUrl(item) {
				const _this = this
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
							console.log('条码内容：' + res.result.split('='));
							uni.showLoading();
							setTimeout(() => {
								uni.hideLoading();
							}, 500)
							overActivityOrder({
								post_params: {
									activity_id: res.result.split('=')[1]
								}
							}).then((res) => {
								console.log('扫码结果', res.data);
								if (res.data.code == 1) {
									uni.showToast({
										title: '核销成功!',
										icon: 'success',
										duration: 1000
									});
									_this._getUserInfo() //刷新积分
								} else {
									uni.showToast({
										title: '核销失败!',
										icon: 'error',
										duration: 1000
									});
								}
							})
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
				uni.showLoading();
				setTimeout(() => {
					uni.hideLoading();
				}, 500)
				updateUserInfo({
					post_params: {
						mobile: this.mobile,
						nickname: this.nickname,
						head_image: this.img_user
					}
				}).then((res) => {
					console.log('修改用户信息', res.data.data);
					if (res.data.code == 1) {
						uni.showToast({
							title: '操作成功!',
							icon: 'success',
							duration: 1000
						});
						this.$refs.inputDialog.close()
						this._getUserInfo()
					}
				})
			},
			_getPhoneNumber(e) {
				console.log('手机号', e.detail.code)
				getPhoneNumber({
					post_params: {
						platform: 'mini',
						code: e.detail.code,
						mini_openid: this.$store.state.userInfo.mini_openid
					}
				}).then((res) => {
					console.log('授权成功', res.data.data.phone_number)
					this.mobile = res.data.data.phone_number
					uni.setStorageSync('phone', this.mobile) //存入电话号码
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