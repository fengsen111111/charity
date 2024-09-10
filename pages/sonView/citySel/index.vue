<template>
	<view class="">
		<!-- 自定义导航栏 -->
		<view class="navBarBox">
			<!-- 状态栏占位 -->
			<!-- 真正的导航栏内容 -->
			<view class="navBar">
				<view class="bg486">
					<view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
					<view class="col999 flex items-center px-3" style="margin-top: 9rpx;">
						<uni-icons type="left" size="30" color="#fff" @click="handleLeft"></uni-icons>
						<uni-search-bar v-model="searchVal" clearButton="none" class="space-x-3" radius="100"
							placeholder="请输入省份" cancelButton="none" @confirm="search" />
						</uni-section>
					</view>
					<view class="h-4"></view>
				</view>
			</view>
		</view>

		<!-- 选择 -->
		<uni-data-picker style="position: absolute;top: -1000px;" ref="picker" :localdata="items" popup-title="请选择"
			@change="onchange" @nodeclick="onnodeclick"></uni-data-picker>

		<view class="p-3">
			<view class="bg-whilt p-3 ">
				<view class="flex items-center">
					<uni-icons type="location" color="#4867CF" size="14"></uni-icons>
					<view class="text12 space-x-1">当前位置</view>
				</view>
				<view class="mt-1 flex justify-between">
					<view class="bgF9 text14 py-1 px-6 text-center">
						{{cityName.name?cityName.name:'--'}}
					</view>
					<view class="col486 text12 flex items-center" @click="handleCity">
						<uni-icons type="location" color="#4867CF" size="14"></uni-icons>
						<view class="space-x-1">重新定位</view>
					</view>
				</view>
			</view>
			<view class="bg-whilt p-3 mt-3">
				<view class="flex items-center">
					<view class="text12 space-x-1">历史记录</view>
				</view>
				<view class="mt-3 grid grid-cols-4">
					<view class="bgF9 w80 mxAuto text14 p-1 text-center mb-3" style="height: fit-content"
						v-for="(item,index) in [1,2,3,4]" :key="item">
						成都
					</view>
				</view>
			</view>
			<view class="" style="position: relative;top: 0.75rem; height: 65vh;">
				<uni-indexed-list :options="list" :showSelect="false" @click="bindClick"></uni-indexed-list>
			</view>
		</view>
		<!--  -->

	</view>
</template>

<script>
	import {
		getAreas, //行政区
		getHotCity, //热门城市
		findStore, //获取门店信息
		getAreasByLocation //行政区
	} from '@/request/api.js'
	import {
		provice
	} from './index_new.js'
	export default {
		created() {
			//获取手机状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
			this._getHotCity() //热门城市
			// console.log('provice', provice);
			uni.showLoading({
				title: "加载中"
			})
			setTimeout(() => {
				uni.hideLoading()
			}, 1000)
		},

		data() {
			return {
				cityName: {
					name: ''
				},
				cityItem: {},
				searchVal: '',
				// 状态栏高度
				statusBarHeight: 0,
				// 导航栏高度
				navBarHeight: 82 + 11,
				value: ['0'],
				// 
				list: provice,
				dataList: [],

				items: [{
						text: "盈门店",
						value: "1",
					},
					{
						text: "成华送酒店铺",
						value: "2"
					},
					{
						text: "某某某某店铺",
						value: "3"
					}
				]
			};
		},
		watch: {
			searchVal(newVal, oldVal) {
				console.log('searchVal改变了', newVal, oldVal);
				this.list = provice.filter(p => {
					return p.label.indexOf(this.searchVal) != -1
				})
			}
		},
		// watch:{
		// 	cityName(newVal, oldVal) {
		// 		console.log('cityName改变了',newVal,oldVal);
		// 		// 获取店铺列表
		// 		// this.$refs.picker.show() //打开店铺选择
		// 		this._findStore('',newVal.key)
		// 	}
		// },
		onLoad(options) {
			console.log('加载结束', options)
			if (this.$store.state.address) {
				console.log('已授权');
			} else {
				this.handleCity(options) //获取定位
			}
		},
		methods: {
			onchange(e) {
				const value = e.detail.value
				console.log('选择店铺', value)
				this.$store.commit('addressStatus') //已选择
				this.$store.commit('shopInfoSet', value) //存入店铺信息
			},
			onnodeclick(node) {},
			handleCity(options) {
				const that = this;
				uni.getLocation({
					type: "gcj02",
					success: function(res) {
						// 暂时
						that.longitude = res.longitude; //118.787575;
						that.latitude = res.latitude; //32.05024;
						console.log("获取当前的用户经度", that.longitude);
						console.log("获取当前的用户纬度", that.latitude);
						// that.$refs.picker.show() //打开店铺选择
						getAreasByLocation({
							post_params: {
								location: options.longitude + ',' + options.latitude
							}
						}).then((res) => {
							console.log('坐标', res);

						})
					},
				});
			},
			_findStore(location, adcode) {
				findStore({
					post_params: {
						location: location, //经纬度
						adcode: adcode //行政区
					}
				}).then((res) => {
					console.log('门店信息', res)
					// this.$refs.picker.show() //打开店铺选择
				})
			},
			handleIss(iss) {
				console.log('点击项', iss)
			},
			bindClick(e) {
				console.log('点击item，返回数据', e)
				this.cityName = e.item
			},
			toSelectIndex(item) {
				this.toView = item
			},
			change(e) {
				console.log(e);
			},
			handleLeft() {
				uni.navigateBack()
			},
			//行政区
			_getAreas() {
				getAreas({
					post_params: {
						pid: ''
					}
				}).then((res) => {
					this.dataList = res.data.data.areas
					console.log('res所有城市', this.dataList);
				})
			},
			// 热门城市
			_getHotCity() {
				getHotCity().then((res) => {
					console.log('热门城市', res);
				})
			}
		}
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
		background-color: #81B1EE;
		border-radius: 1rem;
		padding: 0px 0.25rem;
		color: #fff;
	}

	.iconImg {
		width: 0.5rem;
		height: 0.6rem;
		margin-right: 0.25rem;
	}

	.topSearch {
		height: 6rem;
		padding-top: 1.25rem;
	}
</style>