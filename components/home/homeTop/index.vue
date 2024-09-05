<template>
	<view class="">
		<view>
			<!-- 自定义导航栏 -->
			<view class="navBarBox">
				<!-- 状态栏占位 -->
				<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
				<!-- 真正的导航栏内容 -->
				<view class="navBar">
					<view class="flex items-center">
						<view class="text18 fontBold">快鹿送酒</view>
						<view class="text12 space-x-1 items-center" @click="handleUrl('/pages/sonView/citySel/index')">
							成都
							<uni-icons class="space-x-1" type="down" color="#fff" size="16">
							</uni-icons>
						</view>
					</view>
					<view class="flex text12">
						<view>营业时间</view>
						<view class="space-x-1">23:00 - 3:00</view>
					</view>
				</view>
			</view>
		</view>
		<view>
			<view class="flex search w-full h-6 mt-3` items-center" @click="handleSearch">
				<uni-icons type="search" color="#999999" class=" space-x-2" size="16"></uni-icons>
				<view class="col999 text12">
					输入搜索内容
				</view>
			</view>
		</view>
		<view class="flex justify-between text12 pt-2">
			<view v-for="item in [1,2,3,4,5]" :key="item" class="item">
				<view class="">标签测试</view>
			</view>
		</view>

	</view>

</template>

<script>
	import {getAreasByLocation} from '@/request/api.js'
	export default {
		data() {
			return {
				searchValue: '',
				// 状态栏高度
				statusBarHeight: 0,
				// 导航栏高度
				navBarHeight: 82 + 11,
				
			};
		},
		methods: {
			handleSearch() {
				console.log('跳转');
				uni.navigateTo({
					url: '/pages/tabbar/home/components/search/index'
				})
			},
			handleUrl(url) {
				console.log(url);
				uni.navigateTo({
					url: url + ''
				})
			},
			// 位置授权
			// 确认授权后，获取用户位置
			getLocationInfo() {
				const that = this;
				uni.getLocation({
					type: "gcj02",
					success: function(res) {
						// 暂时
						that.longitude = res.longitude; //118.787575;
						that.latitude = res.latitude; //32.05024;
						console.log("获取当前的用户经度", that.longitude);
						console.log("获取当前的用户纬度", that.latitude);
						if(that.$store.state.address){
							console.log('已授权');
						}else{
							uni.navigateTo({
								url: '/pages/sonView/citySel/index?longitude='+that.longitude+'&longitude'+that.latitude
							})
						}
						getAreasByLocation({
							post_params:{
								location: that.longitude+','+that.latitude
							}
						}).then((res)=>{
							console.log('坐标',res);		
						})
					},
				});
			},
			// 拒绝授权后，弹框提示是否手动打开位置授权
			openConfirm() {
				return new Promise((resolve, reject) => {
					uni.showModal({
						title: "请求授权当前位置",
						content: "我们需要获取地理位置信息",
						success: (res) => {
							if (res.confirm) {
								uni.openSetting().then((res) => {
									if (res[1].authSetting["scope.userLocation"] === true) {
										resolve(); // 打开地图权限设置
									} else {
										reject();
									}
								});
							} else if (res.cancel) {
								reject();
							}
						},
					});
				});
			},
			rejectGetLocation() {
				uni.showToast({
					title: "你拒绝了授权，无法就近匹配门店",
					icon: "none",
					duration: 2000,
				});
			},
			//   初次位置授权
			getAuthorize() {
				return new Promise((resolve, reject) => {
					uni.authorize({
						scope: "scope.userLocation",
						success: () => {
							resolve(); // 允许授权
						},
						fail: () => {
							reject(); // 拒绝授权
						},
					});
				});
			},
			
		},
		created() {
			//获取手机状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
			
		},
		onReady() {
			//   wx请求获取位置权限
			this.getAuthorize()
				.then(() => {
					//   同意后获取
					this.getLocationInfo();
				})
				.catch(() => {
					//   不同意给出弹框，再次确认
					this.openConfirm()
						.then(() => {
							this.getLocationInfo();
						})
						.catch(() => {
							this.rejectGetLocation();
						});
				});
		},
	};
</script>

<style>
	.navBarBox {}

	.navBarBox .statusBar {}

	.navBarBox .navBar {
		padding-bottom: 8rpx;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.navBarBox .navBar .logo {
		width: 82rpx;
		height: 82rpx;
		margin-right: 10rpx;
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