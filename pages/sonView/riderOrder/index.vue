<template>
	<view class="">
		<view class="bgMyImg">
			<view class="space-x-3">
				<view class="h-8"></view>
				<image src="@/static/my/topText.png" mode="" class="topText mt-2"></image>
				<view class="ling1">
					骑手端
				</view>
			</view>
			<view class="h-6"></view>
			<view class="bg-whilt text-black text14 px-6 py-2 rending1 items-center flex justify-between">
				<view class="">
					<view class="">骑手名字</view>
					<view class="text12">13412341234</view>
				</view>
				<view class="flex items-center">
					<view class="">累计接单</view>
					<view class="col486 space-x-2 text18">8888888</view>
				</view>
			</view>
			<view class="bgF9 mt-3 text-black text14 px-6 py-2 rending2 items-center ">
				<view class="flex">
					<view @click="handleActive(1)" :class="activeIndex==1?'col486':''">待接单（88）</view>
					<view class="w-8"></view>
					<view @click="handleActive(2)" :class="activeIndex==2?'col486':''">已接单</view>
					<view class="w-8"></view>
					<view @click="handleActive(3)" :class="activeIndex==3?'col486':''">已送达</view>
				</view>
				<view class="bg-whilt mt-3 text12" v-for="item in [1,2,3]" :key="item">
					<view class="flex justify-between p-3">
						<view class="">订单编号:123456789</view>
						<view v-if="activeIndex==1" class="col68B border68B ling5 px-2 rending1">待接单</view>
						<view v-if="activeIndex==2" class="colFC6 borderFC6 ling5 px-2 rending1">已接单</view>
						<view v-if="activeIndex==3" class="col999 border999 ling5 px-2 rending1">已送达</view>
					</view>
					<view class="border999One"></view>
					<view class="flex justify-between px-3 pt-3">
						<view class="flex">
							<view>区域</view>
							<view>武侯区</view>
						</view>
						<view class="flex">
							<view>下单时间</view>
							<view>2024-06-26</view>
						</view>
					</view>
					<!--  -->
					<view class="bg-whilt rending1 p-3">
						<view class="flex">
							<text>张三</text>
							<text class="space-x-2">13512341234</text>
						</view>
						<view class="flex justify-between">
							<view class="w80">
								四川省成都市武侯区世纪城天府大道中段588号天天小区快鸟驿站
							</view>
							<view class="text-center space-x-4" @tap="openMap('104.060268','30.642047')">
								<uni-icons type="location" size="20" color="#4867CF"></uni-icons>
								<view class="col999">
									{{distance}}km
								</view>
							</view>
						</view>
					</view>
					<view class="border999One"></view>
					<!--  -->
					<view class="bg-whilt">
						<view class="flex justify-between px-3 pt-3">
							<view class="">商品信息</view>
							<view v-if="shopInfoShow" class="col486 items-center flex" @click="handleDownUp()">
								收起<uni-icons type="up" size="16" color="#4867CF"></uni-icons>
							</view>
							<view v-else class="col486 items-center flex" @click="handleDownUp()">
								展开<uni-icons type="down" size="16" color="#4867CF"></uni-icons>
							</view>
						</view>
						<!-- 展开商品文件 -->
						<view v-if="shopInfoShow">
							<view class="flex justify-between items-center px-3 pt-3" v-for="item in [1,2,3]" :key="item">
								<image src="https://img.picui.cn/free/2024/08/16/66bf135fa40a3.png" style="width: 100rpx;height: 100rpx;" mode=""></image>
								<view class="uni-ml-5">
									<view class="w300rpx">五粮液股份 五粮春二代菁萃 浓香型白酒 52度 550ml...</view>
									<view class="col999">规格 <text>550ml*12</text></view>
								</view>
								<view class="uni-ml-5">
									<view class="text16">X 888888</view>
									<view class="col999">冰冻<text class="uni-ml-2">888888</text></view>
								</view>
							</view>
						</view>
						
					    <view class="mt-3">
					    	<view @click="_acceptOrder(item)" v-if="activeIndex==1" class="bg486 text14 rending2 text-whlie text-center py-2 w85 mxAuto">
					    		接单
					    	</view>
					    	<view @click="_arriveOrder(item)" v-if="activeIndex==2" class="bg68B text14 rending2 text-whlie text-center py-2 w85 mxAuto">
					    		确认送达
					    	</view>
					    </view>
						<view class="h-4"></view>
					</view>
				</view>
				<view class="h-8"></view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getWorkerOrderList,//list
		acceptOrder,//接单
		arriveOrder,//送到
	} from '@/request/api.js'
	export default {
		data() {
			return {
				active: false,
				value1: '',
				value2: '',
				// map
				title: '四川大学华西医院',
				distance: 0, //"距离"
				latitude: 39.909, // 默认定在首都
				longitude: 116.39742,
				scale: 12, // 默认16
				markers: [],
				markerHeight: 30,
				doorAddress: [], //门店地址
				
				// 
				activeIndex: 1,//待接单 带送达 已送达
				shopInfoShow:true,//打开 关闭
				
				
			};
		},
		mounted() {
			this.distance = this.getMapDistance('104.04311', '30.64242', '104.060268', '30.642047');
			console.log('距离', this.distance);
			this._getWorkerOrderList()
		},
		components: {},
		onLoad() {},
		onShow() {

		},
		onHide() {},
		methods: {
			// 商品信息展示隐藏
			handleDownUp(){
				this.shopInfoShow = !this.shopInfoShow
			},
			// list
			_getWorkerOrderList(){
				getWorkerOrderList({
					post_params:{
						currentPage:'',
						perPage:'',
						status:''//	a待接单 b配送中  c已完成  
					}
				}).then((res)=>{
					console.log('列表',res);
				})
			},
			// 接单
			_acceptOrder(item){
				acceptOrder({
					post_params:{
						order_id:item//	订单ID  
					}
				}).then((res)=>{
					console.log('接单',res);
				})
			},
			// 送达
			_arriveOrder(item){
				arriveOrder({
					post_params:{
						order_id:item//	订单ID  
					}
				}).then((res)=>{
					console.log('送达',res);
				})
			},
			
			handleActive(index){
				this.activeIndex = index
			},
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
						var long = 0;
						var lat = 0;
						//小数点保留六位  经度
						if (that.longitude.toString().indexOf('.') > 0) {
							const longlatsplit = that.longitude.toString().split('.');
							if (longlatsplit.length >= 2) {
								long = parseFloat(longlatsplit[0] === "" ? 0 : longlatsplit[0]) + parseFloat(
									"." + longlatsplit[1].slice(0, 6));
							}
						}
						if (that.latitude.toString().indexOf('.') > 0) {
							const longlatsplit1 = that.latitude.toString().split('.');
							if (longlatsplit1.length >= 2) {
								lat = parseFloat(longlatsplit1[0] === "" ? 0 : longlatsplit1[0]) + parseFloat(
									"." + longlatsplit1[1].slice(0, 6));
							}
						}
						console.log("纬度", lat);
						that.markers = [{
							id: "",
							latitude: res.latitude,
							longitude: res.longitude,
							iconPath: "../../static/img/phone.png",
							width: that.markerHeight, //宽
							height: that.markerHeight, //高
						}, ];
						that.getList();
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

			// 彻底拒绝位置获取
			rejectGetLocation() {
				uni.showToast({
					title: "你拒绝了授权，无法获得周边信息",
					icon: "none",
					duration: 2000,
				});
			},
			getList() {
				console.log("获取周围美食");
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
			openMap(lon, lat) {
				console.log("获取经纬度ssssfff", lon, lat);
				//打开地图，并将门店位置传入
				uni.getLocation({
					success: res => {
						console.log('location success', parseFloat(lat), parseFloat(lon))
						uni.openLocation({
							latitude: parseFloat(lat),
							longitude: parseFloat(lon),
							scale: 18,
							name: '四川大学华西医院',
							address: 'xx街xx号',
						})
					},
					fail: res=>{
						uni.showToast({
							title: "请检查定位是否开启！",
							icon: "none",
							duration: 2000,
						});
					}

				})
			},
			//进行经纬度转换为距离的计算
			Rad(d) {
				return d * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式。
			},
			/*计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度 默认单位km*/
			getMapDistance(lat1, lng1, lat2, lng2) {
				var radLat1 = this.Rad(lat1);
				var radLat2 = this.Rad(lat2);
				var a = radLat1 - radLat2;
				var b = this.Rad(lng1) - this.Rad(lng2);
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
					Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
				s = s * 6378.137; // EARTH_RADIUS;
				s = Math.round(s * 10000) / 10000; //输出为公里
				//s=s.toFixed(2);
				return s;
			},
			//计算距离
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
		}
	};
</script>

<style>
	.w300rpx{
		width:300rpx
	}
	.bgMyImg {
		color: #fff;
		/* background-image: url('@/static/my/topBg.png'); */
		/* background-size: 100% 100%; */
		background: linear-gradient(180deg, #4561C8 0%, #3A4AAC 100%);
		height: 14rem;
		width: 100%;
	}

	.topText {
		width: 4rem;
		height: 1rem;
	}
</style>