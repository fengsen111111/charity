<template>
	<view class="">
		<hearchItem :isLeft="true" :title="'确认订单'" />

		<view class="p35">
			<view class="bg-white p20 radius10">
				<view class="flex  text24 justify-between items-center">
					<view>
						<view class="">张某某 188 8888 8888</view>
						<view class="mt20">四川省成都市高新区某某街道某某号</view>
					</view>
					<uni-icons type="compose" color="#205D57" size="30" @click="handleAddAddress()"></uni-icons>
				</view>
				<view class="px20 py30">
					<view class="h1 bgEBEBEB"></view>
				</view>
				<view class="text-center font-bold text30 col205D57" @click="handleSel()">选择收货地址</view>
			</view>

			<view class="mt30 flex justify-between bg-white p20 radius10">
				<image src="https://img.picui.cn/free/2024/09/18/66ea73b25c621.png" class="w200 h160 radius10" mode=""></image>
				<view class="ml20">
					<view class="text28 font-bold">商品名称商品名称商品名称商品名称</view>
					<view class="text20 mt10 col787878">库存：122</view>
					<view class="flex mt10 justify-between items-center">
						<view class="text36 colD6B07A font-bold"> 18,888<text class="ml10 text18">积分</text> </view>
						<view class="flex ">
							<image src="../../../static/order_left.png" class="orderImg" mode=""></image>
							<view class="bgEBEBEB px30 line62"> 999 </view>
							<image src="../../../static/order_right.png" class="orderImg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			
			<view class="mt30 bg-white p20 radius10">
				<view class="flex mb20 justify-between text28 items-center">
					<view>商品名称...</view>
					<view>x 18</view>
				</view>
				<view class="flex mb20 justify-between text28 items-center">
					<view>商品名称...</view>
					<view>x 18</view>
				</view>
				<view class="flex mb20 justify-between text28 items-center">
					<view>共计</view>
					<view class="flex items-baseline colD6B07A">
						<view class="text36">18,888</view>
						<view class="text18 ml10">积分</view>
					</view>
				</view>
				<view class="mt77 px10">
					<view class="btnForm" @click="handOk">
						确认兑换
					</view>
					<view class="btnForm_close" >
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
						<view class="text30 font-bold text-center col205D57">新增/修改收货地址</view>
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
					<view v-for="item in [1,2]" :key="item">
						<view class="p30">
							<view class="flex items-center">
								<uni-icons type="checkbox-filled" size="26" color="#205D57" ></uni-icons>
								<view class="ml20 text24 w-full">
									<view class="flex justify-between items-center">
										<view class="">
											<view>张某某  188 8888 8888</view>
											<view>四川省成都市高新区某某街道某某号</view>
										</view>
										<uni-icons type="compose" size="26" color="#205D57" @click="addAddress()"></uni-icons>
									</view>
									<view class="mt15 flex justify-between">
										<view class="col205D57">默认地址</view>
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
			}
		},
		created() {
			//获取手机状态栏高度
		},
		mounted() {

		},
		watch: {},
		methods: {
			// 确认兑换
			handOk(){
				uni.navigateTo({
					url:'/pages/components/okOrderOk/index'
				})
			},
			// 选择收获地址-->新增收货地址
			addAddress(){
				this.closeSel()
				this.handleAddAddress()
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