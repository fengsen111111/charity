<template>
	<view class="">
		<hearchItem :isLeft="true" :title="'确认订单'" />

		<view class="p35">
			<view class="bg-white p20 radius10">
				<view class="flex  text24 justify-between items-center">
					<view>
						<view class="">{{addressDefaule.name}} {{addressDefaule.mobile}}</view>
						<view class="mt20">{{addressDefaule.complete_address}}</view>
					</view>
					<uni-icons type="compose" color="#205D57" size="30" @click="handleAddAddress()"></uni-icons>
				</view>
				<view class="px20 py30">
					<view class="h1 bgEBEBEB"></view>
				</view>
				<view class="text-center font-bold text30 col205D57" @click="handleSel()">选择收货地址</view>
			</view>

			<view class="mt30 flex  bg-white p20 radius10">
				<image :src="jfDetails.cover_image" class="w200 h160 radius10" mode=""></image>
				<view class="ml20">
					<view class="text28 font-bold">{{jfDetails.name}}</view>
					<view class="text20 mt10 col787878">库存：{{jfDetails.stock}}</view>
					<view class="flex mt10 justify-between items-center">
						<view class="text36 colD6B07A font-bold">{{jfDetails.integral}}<text class="ml10 text18 mr10">积分</text> </view>
						<view class="flex ">
							<image src="../../../static/order_left.png" class="orderImg" @click="handleJ('1')" mode=""></image>
							<view class="bgEBEBEB px30 line62"> {{number}} </view>
							<image src="../../../static/order_right.png" class="orderImg" @click="handleJ('2')" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			
			<view class="mt30 bg-white p20 radius10">
				<view class="flex mb20 justify-between text28 items-center">
					<view>{{jfDetails.name}}</view>
					<view>x {{number}}</view>
				</view>
				<!-- <view class="flex mb20 justify-between text28 items-center">
					<view>商品名称...</view>
					<view>x 18</view>
				</view> -->
				<view class="flex mb20 justify-between text28 items-center">
					<view>共计</view>
					<view class="flex items-baseline colD6B07A">
						<view class="text36">{{jfDetails.integral*number}}</view>
						<view class="text18 ml10">积分</view>
					</view>
				</view>
				<view class="mt77 px10">
					<view class="btnForm" @click="handOk" v-if="Number(userInfo.integral)-Number(jfDetails.integral*number)>0">
						确认兑换
					</view>
					<view class="btnForm_close" v-else>
						剩余积分不足
					</view>
				</view>
			</view>
				
		</view>
		<!--  -->
		<!-- 新增编辑弹框 -->
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<view class="bg-white" style="height: 60vh;">
					<view class="grid grid-cols-3  items-center p35 border-bottom-dotted">
						<view class=""></view>
						<view class="text30 font-bold text-center col205D57">{{add_type==1?'新增':'修改'}}收货地址</view>
						<view class="text-right"><uni-icons type="closeempty" size="26" color="#205D57"
								@click="close"></uni-icons></view>
					</view>
					<view class="p30">
						<view class="p30 text24">
							<view class="flex justify-between items-center">
								<view>姓名</view>
								<view class="text-right"><input v-model="form.name" type="text" placeholder="请输入姓名..." /></view>
							</view>
							<view class="bgEBEBEB h1 mt30"></view>
							<view class="flex justify-between items-center mt30">
								<view>电话</view>
								<view class="text-right"><input v-model="form.phone" type="text" placeholder="请输入电话..." /></view>
							</view>
							<view class="bgEBEBEB h1 mt30"></view>
							<view class="flex justify-between items-center mt30">
								<view>收货地址</view>
								<view class="text-right"><input v-model="form.address" type="text" placeholder="请输入地址..." /></view>
							</view>
							<view class="bgEBEBEB h1 mt176"></view>
							<view class="flex justify-between items-center mt30">
								<view>是否默认</view>
								<view class="">
									<uni-data-checkbox v-model="form.is_default" :localdata="sexs" />
								</view>
							</view>
						</view>
					</view>
					<view class="mt77 px75">
						<view class="btnForm">
							提 交
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 选择收货地址 -->
		<uni-popup ref="popupSel" background-color="#fff">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<view class="bg-white" style="height: 45vh;">
					<view class="grid grid-cols-3  items-center p35 border-bottom-dotted">
						<view class=""></view>
						<view class="text30 font-bold text-center col205D57">选择收货地址</view>
						<view class="text-right"><uni-icons type="closeempty" size="26" color="#205D57"
								@click="closeSel"></uni-icons></view>
					</view>
					<view v-for="item in addressList" :key="item.id" @click="handItemAdd(item)">
						<view class="p30">
							<view class="flex items-center">
								<uni-icons :type="item.is_default=='Y'?'checkbox-filled':'circle'" size="26" color="#205D57" @click="handDefault(item.id)"></uni-icons>
								<view class="ml20 text24 w-full">
									<view class="flex justify-between items-center">
										<view class="">
											<view>{{item.name}}  {{item.mobile}}</view>
											<view>{{item.complete_address}}</view>
										</view>
										<uni-icons type="compose" size="26" color="#205D57" @click="addAddress()"></uni-icons>
									</view>
									<view class="mt15 flex justify-between">
										<view class="col205D57">{{item.is_default=='Y'?'默认地址':''}}</view>
										<view class="colEC1010">删除地址</view>
									</view>
								</view>
							</view>
						</view>
						<view class="bgEBEBEB h18"></view>
					</view>
					
					<view class="mt77 px75 grid grid-cols-2 grid-column-20">
						<view class="btnForm_a" @click="addAddress()">
							新增收货地址
						</view>
						<view class="btnForm">
							确认收货地址
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
		getUserAddressList,//收获地址list
		setDefaultUserAddress,//设置 默认
		getGoodsDetail,//积分详情
		addOrder,//下单
		getUserInfo
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
				form: {
					name: '',
					phone: '',
					address: '',
					is_default: 1,
				},
				sexs: [{
					text: '是',
					value: 1
				}, {
					text: '否',
					value: 2
				}],
				jf_id:'',//积分id
				addressList:[],//地址list
				addressDefaule:{},//默认地址
				add_type:1,//1新增2编辑
				jfDetails:{},//积分详情
				number: 1,//商品购买个数
				userInfo:{}
			}
		},
		onLoad(option) {
			//获取手机状态栏高度
			console.log('option',option);
			this.jf_id = option.jf_id
		},
		onShow() {
			this._getUserAddressList()
			this._getGoodsDetail()
			_this._getUserInfo()
		},
		watch: {},
		methods: {
			// 用户信息
			_getUserInfo(){
				getUserInfo().then((res)=>{
					console.log('用户信息',res.data.data);
					this.userInfo = res.data.data
				})
			},
			handleJ(type){
				console.log(type)
				if(type>=1){
						this.number--
				}else{
					this.number++
				}
			},
			// 积分详情
			_getGoodsDetail(){
				getGoodsDetail({
					post_params:{
						id:this.jf_id
					}
				}).then((res)=>{
					console.log('积分详情',res.data.data);
					this.jfDetails = res.data.data
				})
			},
			// 设置默认地址
			handDefault(id){
				setDefaultUserAddress({
					post_params:{
						id:id
					}
				}).then((res)=>{
					console.log('设置默认地址');
					this._getUserAddressList()
				})
			},
			// 选择的地址
			handItemAdd(item){
				this.addressDefaule = item
			},
			// 地址list
			_getUserAddressList(){
				getUserAddressList({
					post_params:{
						currentPage:1,
						perPage:100
					}
				}).then((res)=>{
					console.log('地址列表',res.data.data);
					this.addressList = res.data.data.list
					res.data.data.list.map((item)=>{
						if(item.is_default=='Y'){
							this.addressDefaule = item //默认地址
						}
					})
				})
			},
			// 确认兑换
			handOk(){
				addOrder({
					post_params:{
						id:this.jf_id,
						number:this.number,
						address_id:this.addressDefaule.id,
					}
				}).then((res)=>{
					uni.navigateTo({
						url:'/pages/components/okOrderOk/index'
					})
				})
			},
			// 选择收获地址-->新增收货地址
			addAddress(){
				this.closeSel()
				// 新增
				this.add_type = 1
				// 赋值
				this.form.name = ''
				this.form.phone = ''
				this.form.address = ''
				this.form.is_default = 2//是否默认
				this.$refs.popup.open('bottom')
			},
			//
			handleSel(){
				this.$refs.popupSel.open('bottom')
			},
			closeSel() {
				this.$refs.popupSel.close()
			},
			// 
			handleAddAddress() {
				// 编辑
				this.add_type = 2
				// 赋值
				this.form.name = this.addressDefaule.name
				this.form.phone = this.addressDefaule.mobile
				this.form.address = this.addressDefaule.complete_address
				this.form.is_default = this.addressDefaule.is_default=='Y'?1:2//是否默认
				
				this.$refs.popup.open('bottom')
			},
			close() {
				this.$refs.popup.close()
			}
		}
	}
</script>

<style>
	.border-bottom-dotted {
		border: 1rpx dotted #9B9B9B;
	}

	.orderImg{
		width: 40rpx;
		height: 62rpx;
	}
	.btnForm_a {
		padding: 33rpx;
		text-align: center;
		font-size: 36rpx;
		font-weight: bold;
		color: #D6B07A;
		background: white;
		border: 2rpx solid #D6B07A;
		border-radius: 20rpx;
	}
	
</style>