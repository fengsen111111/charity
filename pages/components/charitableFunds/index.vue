<template>
	<view class="">
		<hearchItem :isLeft="true" :title="'慈善基金'" />
		<view class="mt30">
			<view class="flex justify-between ml36">
				<view class="border205D57 col9B9B9B w-3-5 text24 flex p10 items-center radius30" @click="handleUrl">
					<uni-icons type="search" size="20" color="#205D57"></uni-icons>
					<view class="ml10">请输入奖品/服务关键词搜索</view>
				</view>
				<image src="../../../static/charitable_right.png" class="charitableImg" @click="handlePhone" mode="">
				</image>
			</view>
		</view>
		<view class="py30 px36">
			<swiperItems :swiperList="swiperList" />
			<!-- 文字滚动 -->
			<textSwiper :textList="textList" />
			<view class="mt20 flex items-baseline justify-between">
				<view class="text30 col3C3C3C">爱心捐助次数</view>
				<view class="flex colD6B07A items-baseline">
					<view class="font-bold text60 ">{{configInfo.donate_times}}</view>
					<view class=" text24 ml10">次</view>
				</view>
			</view>
			<view class="mt20 flex items-baseline justify-between">
				<view class="text30 col3C3C3C">捐款金额</view>
				<view class="flex colD6B07A items-baseline">
					<view class="font-bold text60 ">{{configInfo.donate_money}}</view>
					<view class=" text24 ml10">元</view>
				</view>
			</view>
			<view class="flex justify-around mt50 col205D57 text30 font-bold">
				<view @click="handleIndex(item.id)" :class="indexItem==item.id?'border_bottom':''" v-for="item in typeList" :key="item.id">{{item.name}}</view>
				<!-- <view @click="handleIndex(2)" :class="indexItem==2?'border_bottom':''">活动报名</view> -->
			</view>
		</view>
		<view class="bgEBEBEB h18 "></view>
		<!-- <cardFunds /> -->
		<!-- 慈善基金 -->
		<view class="" v-if="indexItem">
			<cardFunds :donList="donList" />
		</view>
		<!-- 活动报名 -->
	<!-- 	<view class="" v-else>
			<cardActivity :activeList="activeList" />
		</view> -->
		<view class="h50"></view>
		<view style="position: fixed;bottom: 0rpx;" class="w-full bgEBEBEB">
			<view class="mt20 px75" v-if="indexItem">
				<view class="btnForm" @click="handleMoney()">
					我要捐款
				</view>
			</view>
		</view>

		<view class="h20"></view>
		<view class="h20"></view>
		<view class="h20"></view>
		<view class="h20"></view>
		<!-- 弹框 -->
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<view class="bg-white">
					<view class="grid grid-cols-3  items-center p35 border-bottom-dotted">
						<view class=""></view>
						<view class="text30 font-bold text-center col205D57">非定向捐助</view>
						<view class="text-right"><uni-icons type="closeempty" size="26" color="#205D57"
								@click="close"></uni-icons></view>
					</view>
					<view class="p30">
						<view class="py30 px20 border205D57 radius20">
							<input type="text" v-model="form.name" placeholder="请输入参与者姓名" />
						</view>
					</view>
					<view class="p30">
						<view class="py30 px20 border205D57 radius20">
							<input type="text" v-model="form.money" placeholder="请输入捐助金额" />
						</view>
					</view>
					<view class="mt77 px75">
						<view class="btnForm" @click="_joinDonate">
							提 交
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue'
	import swiperItems from '@/components/swiperItems/index.vue'
	import cardFunds from '@/components/card_funds/index.vue'
	import textSwiper from '@/components/text_swiper/index.vue'
	import {
		getDonateList, //基金
		getActivityList, //活动
		getIntegralList, //滚动字体
		joinDonate ,//捐赠
		getBannerList,//轮播图
		getDonateTypeList,//类型
		getDonateOrderList//最近捐赠记录
	} from '@/request/api.js'
	export default {
		components: {
			hearchItem,
			swiperItems,
			cardFunds,
			textSwiper
		},
		data() {
			return {
				indexItem: '',
				form: {
					name: '',
					money: ''
				},

				// config
				configInfo: {},

				donList: [], //基金列表
				activeList: [], //活动列表
				textList: [], //字体滚动
				swiperList:[],//轮播图
				limit:20,//
				typeList:[],//类型
			}
		},
		onLoad() {
			this.configInfo = this.$store.state.config ? this.$store.state.config : {}
		},
		onReady() {
			// this._getDonateList() //基金
			// this._getActivityList() //活动
			// this._getIntegralList() //滚动字体
			this._getDonateOrderList()
			this._getBannerList()//轮播图
			this._getDonateTypeList()//类型
		},
		watch: {},
		onReachBottom(){
			this.limit = this.limit+20
			this._getDonateList() //基金
			// this._getActivityList() //活动
		},
		methods: {
			// 最近捐献记录
			_getDonateOrderList(){
				getDonateOrderList({
					post_params:{
						currentPage:1,
						perPage:20
					}
				}).then((res)=>{
					console.log('最新捐赠数据',res.data.data);
					this.textList = res.data.data.list
				})
			},
			// 跳转积分商城
			handleUrl(){
				uni.navigateTo({
					url:'/pages/components/pointsMall/index'
				})
			},
			_getDonateTypeList(){
				getDonateTypeList().then((res)=>{
					console.log('基金类型',res.data.data.list);
					this.typeList = res.data.data.list
					this.indexItem = res.data.data.list[0].id //默认项
					this._getDonateList()//基金
				})
			},
			// 轮播图列表
			_getBannerList(){
				getBannerList({
					post_params:{
						type:'donate'
					}
				}).then((res)=>{
					console.log('轮播数据',res.data.data.list);
					this.swiperList = res.data.data.list
				})
			},
			// 电话
			handlePhone() {
				uni.makePhoneCall({
					phoneNumber: this.configInfo.mobile
				})
			},
			// 捐款
			_joinDonate() {
				if(this.form.money>0){
					joinDonate({
						post_params: {
							donate_id: '', //基金id
							name: this.form.name,
							money: this.form.money
						}
					}).then((res) => {
						console.log('非定向捐助', res.data.data);
						this.weixinPay(res.data.data.pay_data)
					})
				}else{
					uni.showToast({
						title: '捐款金额大于0!',					
					    icon: 'error',					    
						duration: 1000
					});
				}
			},
			// 调用微信支付
			weixinPay(item) {
				const that = this
				console.log('调用微信支付', item);
				// 结果查询
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				uni.requestPayment({
					provider: 'wxpay', // 服务提提供商
					timeStamp: item.timeStamp, // 时间戳
					nonceStr: item.nonceStr, // 随机字符串
					package: item.package,
					signType: item.signType, // 签名算法
					paySign:item.paySign, // 签名
					success: function(res) {
						console.log('支付成功', res);
						that.close()
					},
					fail: function(err) {
						console.log('支付失败', err);
						that.close()
					}
				});
			},
			// 滚动字体
			_getIntegralList() {
				getIntegralList({
					post_params: {
						currentPage: 1,
						perPage: 20
					}
				}).then((res) => {
					console.log('滚栋字体', res.data.data.list);
					this.textList = res.data.data.list
				})
			},
			// 活动
			_getActivityList() {
				getActivityList({
					post_params: {
						show_position: 'a',
						currentPage: 1,
						perPage: this.limit
					}
				}).then((res) => {
					console.log('首页活动列表', res.data.data.list);
					this.activeList = res.data.data.list
				})
			},
			// 基金列表
			_getDonateList() {
				getDonateList({
					post_params: {
						type_id: this.indexItem,
						currentPage: 1,
						perPage: this.limit
					}
				}).then((res) => {
					console.log('首页基金列表', res.data.data.list);
					this.donList = res.data.data.list
				})
			},
			// 切换
			handleIndex(index) {
				this.indexItem = index
				this._getDonateList()//基金
			},
			// 捐款
			handleMoney() {
				console.log('我要捐款');
				this.$refs.popup.open('bottom')
			},
			close() {
				this.$refs.popup.close()
			}
		}
	}
</script>

<style>
	.charitableImg {
		width: 170rpx;
		height: 65rpx;
	}

	.bgtwo {
		background: linear-gradient(90deg, #164336 0%, #226043 100%);
	}
</style>