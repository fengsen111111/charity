<template>
	<view class="">
		<hearch :title="'商品详情'" :isLeft="true" />
		<!-- img -->
		<swiper class="swiper-box" @change="change" :current="swiperDotIndex">
			<swiper-item v-for="(item, index) in [1,2,3]" :key="index">
				<view class="swiper-item">
					<image src="https://pic.imge.cc/2024/08/12/66b9d6e61d2b7.png"
						@click="preview('https://pic.imge.cc/2024/08/12/66b9d6e61d2b7.png')" mode="" class="w-full h20">
					</image>
					<image src="https://pic.imge.cc/2024/08/12/66b9d6e61d2b7.png"
						@click="preview('https://pic.imge.cc/2024/08/12/66b9d6e61d2b7.png')" mode=""
						class="w-full h20"></image>
					<image src="https://pic.imge.cc/2024/08/12/66b9d6e61d2b7.png"
						@click="preview('https://pic.imge.cc/2024/08/12/66b9d6e61d2b7.png')" mode=""
						class="w-full h20"></image>
				</view>
			</swiper-item>
		</swiper>
		<!--  -->
		<view class="px-3">
			<!--  -->
			<view class="flex justify-between">
				<!-- left -->
				<view class="">
					<view class="mt-3 flex">
						<view class="colED1 fontBold space-x-1 text24">￥{{detailsList.show_price}}
						  <!-- <text class="text24">1888</text>.8 -->
						</view>
						<view class="space-x-2 col999 mt-1 textDel">
							￥{{detailsList.show_old_price}}
							<!-- 8888 -->
						</view>
					</view>
					<view class="flex mt-2">
						<view class="bgED1 py-1 ling1 w-6 px-2  text10 text-whlie text-center">
							{{(detailsList.show_price/detailsList.show_old_price).toFixed(2)*100}}折
						</view>
						<view class="colED1 text11 ling1 borTag pt-1 px-2">
							均价：{{detailsList.average_price}}元/瓶
						</view>
					</view>
				</view>
				<!-- right -->
				<view v-if="detailsList.has_coupon == 'Y'" class="bgIcon text10 text-whlie text-center " @click="toggle('bottom')">
					<text>领取优惠券</text>
				</view>
			</view>
			<!-- text -->
			<view class="mt-3 fontBold text16">
				{{detailsList.name}}
			</view>
			<view class="mt-3 col999 text11 ling4">
				{{upDownShow?detailsList.introduce_two:detailsList.introduce}}
			</view>
			<view class="flex justify-between mb-2">
				<view class=""></view>
				<view class="text11 col486 flex" @click="upDown">
					{{upDownShow?'收起':'展开'}}
					<uni-icons :type="upDownShow?'up':'down'" size="12" color="#4867CF"></uni-icons>
				</view>
			</view>
			<!-- card 规格-->
			<view class="bg-whilt rending1 p-3">
				<view class="flex items-center">
					<view class="">
						选择口味
					</view>
					<view class="selView">
						<uni-data-select placeholder="请选择口味" v-model="value" :localdata="range" :clear="false"
							@change="changeRule">
						</uni-data-select>
					</view>
				</view>
				<!--  -->
				<view class="grid grid-cols-2 mt-4 ">
					<view class="rending1 p-2 flex w7 mr-2 relative" @click="handleCheck(item)"
						:class="checkItem == item?'bgF2F col486 border486':' bg-whilt border999'" v-for="item in [1,2]"
						:key="item">
						<image src="https://img.picui.cn/free/2024/08/28/66ce75dac3e65.png" mode="" class="specs"></image>
						<view class=" space-x-2">
							<view class="text14">550ml*6</view>
							<view class="text12 ling1 mt-1">6.88元/瓶</view>
						</view>
						<view class="rightTop">{{item==1?'最划算':'一分秒杀'}}</view>
					</view>
			
				</view>
				<!--  -->
				<view class="grid grid-cols-3 text-center bgF9 p-2 mt-4">
					<view class="">
						<view class="col666 text11">品牌</view>
						<view class=" fontBold text14">五粮春</view>
					</view>
					<view class="borderLeftRight">
						<view class="col666 text11">产地</view>
						<view class=" fontBold text14">中国</view>
					</view>
					<view class="flex items-center">
						<view class="space-x-6">
							<view class="col666 text11">酒精度</view>
							<view class=" fontBold text14">52%voI</view>
						</view>
						<uni-icons type="right" size="20" class="space-x-2" color="#666666"
							@click="togglePar('bottom')"></uni-icons>
					</view>
				</view>
			</view>
			<!--  -->
			<image src="@/static/home/strip_2.png" mode="" class="w-full mt-4 imgStrip" style=""></image>
			<!--  -->
			<view class="bg-whilt rending1 fontBold items-center flex justify-between py-1 px-2">
				<view class="flex items-center">
					<uni-icons type="location" color="#666666" size="16"></uni-icons>
					<!-- <image src="../../../../../static/home/details/icon1.png" class="iconImgItem" mode=""></image> -->
					<text class=" text12">提供配送服务</text>
				</view>
				<view class="flex items-center">
					<uni-icons type="navigate" color="#666666" size="16"></uni-icons>
					<!-- <image src="../../../../../static/home/details/icon2.png" class="iconImgItem" mode=""></image> -->
					<text class="text12">极速送达</text>
				</view>
				<view class="flex items-center">
					<uni-icons type="notification" color="#666666" size="16"></uni-icons>
					<text class=" text12">超时赔付</text>
				</view>
				<view class="flex items-center">
					<uni-icons type="medal" color="#666666" size="16"></uni-icons>
					<text class=" text12">正品保真</text>
				</view>
				<uni-icons type="more-filled" color="#666666" size="16" @click="toggleSer('bottom')"></uni-icons>
			</view>
			<!--  -->
			<view class="bg-whilt mt-3 rending1 p-3">
				<view class="flex text-black justify-between">
					<view class="">
						评价
					</view>
					<view class="flex text12">
						+9999w
						<uni-icons type="right" color="#000000" size="12"
							@click="handleItem('/pages/sonView/commentsAll/index')"></uni-icons>
					</view>
				</view>
				<!--  -->
				<comments />
				<comments />
				<!--  -->
			</view>
			<image src="https://pic.imge.cc/2024/08/12/66b9d6e61d2b7.png" mode="" class="w-full mt-3"></image>
			<!--  -->
			<!-- <view class="h20"></view> -->
		</view>
		<!-- 购物 -->
		<view class="gw flex justify-between">
			<view class="flex mt-3">
				<view class="text-center space-x-6">
					<image src="@/static/classify/serve.png" mode="" class="iconTwo"></image>
					<view class="text12 ling0 mt-1">客服</view>
				</view>
				<view class="text-center space-x-6">
					<image src="@/static/classify/shopping.png" mode="" class="iconTwo"></image>
					<view class="text12 ling0 mt-1">购物车</view>
				</view>
			</view>
			<!--  -->
			<view class="flex text-whlie text14">
				<view class="viewLeft bgFF8" @click="toggleBottom('bottom',1)">
					加入购物车
				</view>
				<view class="viewRight bg486" @click="toggleBottom('bottom',2)">
					立即购买
				</view>
			</view>
		</view>
		<!--  -->
		<!-- 优惠卷弹窗 -->
		<uni-popup ref="popup" background-color="#fff" borderRadius="0.5rem 0.5rem 0px 0px">
			<view class="bgF9 p-4 overflowAuto" style="height:60vh">
				<view class="fiexdTop">
					<view class="w-4"></view>
					<view class="text16">
						优惠卷
					</view>
					<view class="" @click="close">
						<uni-icons type="closeempty" size="20"></uni-icons>
					</view>
				</view>
				<view class="h-6"></view>
				<view class="grid text-center grid-cols-2 mt-4">
					<view class="">
						<view class="col486">
							待使用
						</view>
						<view class="bg486 w-6 mxAuto" style="height: 2px;"></view>
					</view>
					<view class="col666">
						未领取
					</view>
				</view>
				<view class="mt-3">
					<volumeTag :datalist=datalist :isFFF='true' :isBtn='true' />
				</view>
				<!-- 留白 -->
				<view class="h-8"></view>
				<view class="h-4"></view>
			</view>
		</uni-popup>
		<!-- 服务弹窗 -->
		<uni-popup ref="popupServer" background-color="#fff" borderRadius="0.5rem 0.5rem 0px 0px">
			<view class="bgF9 p-4 overflowAuto" style="height:40vh">
				<view class="fiexdTop">
					<view class="w-4"></view>
					<view class="text16">
						服务说明
					</view>
					<view class="" @click="closeSer">
						<uni-icons type="closeempty" size="20"></uni-icons>
					</view>
				</view>
				<view class="h-6"></view>
				<view class="bg-whilt p-2 mt-3 rending1" v-for="item in [1,2,3]" :key="item">
					<view class="flex items-center">
						<uni-icons type="location" color="#666666" size="18"></uni-icons>
						<text class="space-x-1 text12">提供配送服务</text>
					</view>
					<view class="text11">
						商城向您保证所售商品均为正品行货，商品可开具正规发票。
					</view>
				</view>
				<!-- 留白 -->
				<view class="h-8"></view>
				<view class="h-4"></view>
			</view>
		</uni-popup>
		<!-- 参数弹窗 -->
		<uni-popup ref="popupPar" background-color="#fff" borderRadius="0.5rem 0.5rem 0px 0px">
			<view class="bgF9 p-4 overflowAuto" style="height:30vh">
				<view class="fiexdTop">
					<view class="w-4"></view>
					<view class="text16">
						商品参数
					</view>
					<view class="" @click="closePar">
						<uni-icons type="closeempty" size="20"></uni-icons>
					</view>
				</view>
				<view class="h-8"></view>
				<view class="h-2"></view>
				<view class="bg-whilt text12 p-3 rending2">
					<view class="grid grid-cols-5" v-for="item in [1,2,3,4,5,6]" :key="item">
						<view class="">
							<view class="">品牌</view>
						</view>
						<view class="">
							<view class="">五粮春</view>
						</view>
					</view>
				</view>
				<!-- 留白 -->
				<view class="h-8"></view>
				<view class="h-4"></view>
			</view>
		</uni-popup>
		<!-- 图片放大 -->
		<q-previewImage ref="previewImage" :urls="imgs" @onLongpress="onLongpress"></q-previewImage>
		<!-- 加入购物车 立即购买 -->
		<uni-popup ref="popupBottom" background-color="#fff" borderRadius="0.5rem 0.5rem 0px 0px">
			<view class="bgF9 p-4 overflowAuto" style="height:70vh">
				<view class="fiexdTop">
					<view class="w-4"></view>
					<view class="text16">
						选择规格
					</view>
					<view class="" @click="closeBottom">
						<uni-icons type="closeempty" size="20"></uni-icons>
					</view>
				</view>
				<view class="h-6"></view>
				<view class="w95 mt-4">
					<view class="rending1 p-2 w-full flex mb-2">
						<image src="@/static/classify/item.png" mode="" class="itemImg rending1"></image>
						<view class="space-x-2">
							<view class="fontBold text12 ling4">
								{{detailsList.name}}
							</view>
							<view class="flex mt-2 ling4 rending1 hidden">
								<text class="tagCol text-whlie px-2 text10">
									领取优惠券
								</text>
								<text class="tagBor colED1 px-2 text10 rightRadius8">
									6.2折
								</text>
							</view>
							<!--  -->
							<view class="flex mt-2 ling4 items-center">
								<view class="colED1 fontBold">￥<text class="text18">888</text>.8</view>
								<view class="col999 text11 space-x-2 textDel">
									￥1888
								</view>
								<slot></slot>
							</view>
						</view>
					</view>
				</view>
				<!--  -->
				<view class="w95 space-x-2">
					<!-- <ruleItem /> -->
					<view class="bg-whilt rending1 p-3">
						<view class="flex items-center">
							<view class="">
								选择口味
							</view>
							<view class="selView">
								<uni-data-select placeholder="请选择口味" v-model="value" :localdata="range" :clear="false"
									@change="changeRule">
								</uni-data-select>
							</view>
						</view>
						<!--  -->
						<view class="grid grid-cols-2 mt-4 ">
							<view class="rending1 p-2 flex w7 mr-2 relative" @click="handleCheck(item)"
								:class="checkItem == item?'bgF2F col486 border486':' bg-whilt border999'" v-for="item in [1,2]"
								:key="item">
								<image src="https://img.picui.cn/free/2024/08/28/66ce75dac3e65.png" mode="" class="specs"></image>
								<view class=" space-x-2">
									<view class="text14">550ml*6</view>
									<view class="text12 ling1 mt-1">6.88元/瓶</view>
								</view>
								<view class="rightTop">{{item==1?'最划算':'一分秒杀'}}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 选数量 -->
				<view class="w95 space-x-2 bg-whilt mt-3">
					<view class="flex text14 justify-between items-center p-3 ">
						<view>选择数量</view>
						<view class="flex space-x-3 text24 text-center">
							<view class="leftView" @click="handleDown">
								<!-- - -->
							</view>
							<view class="bg-whilt text-black cenVire text14">
								{{number}}
							</view>
							<view class="rightView" @click="handleUp">
								<!-- + -->
							</view>
						</view>
					</view>
				</view>
				<!-- 冰冻选择 -->
				<view class="w95 space-x-2 bg-whilt mt-3 ">
					<view class="p-3">
						<view class="text14">
							冰冻选择
						</view>
						<view class="flex justify-between mt-3">
							<view @click=handleTemper(item)
								:class="temperatureIndex==item?'bgF2F col486 border486':' bg-whilt border999'"
								class=" h-8 w5 text-center rending2 " v-for="item in [1,2,3]" :key="item">
								<text class="" style="line-height:2rem">常温</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 滑块 -->
				<view class="w95 space-x-2 bg-whilt mt-3 ">
					<view class="p-3">
						<view class="text14">
							冰冻数量
						</view>
						<view class="flex justify-between mt-3">
							<view class="w95 space-x-2 bg-whilt mt-3 items-center flex">
								<view class="">{{min}}</view>
								<view class="w85 mxAuto">
									<view class="mx-2 text-center">
										<view class="">{{duration}}</view>
										<slider backgroundColor="#F9F9F9" activeColor="#4867CF" @change="durationChange"
											:value="duration" :max="max" :min="min" />
									</view>
								</view>
								<view class="">{{max}}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 加入购物车 结算 -->
				<view class="flex justify-between w95 space-x-2 mt-3 text-center">
					<view class="bgFF8 py-2 text14 text-whlie rending1 w-full" v-if="bottomStatus==1">
						加入购物车
					</view>
					<view class="bg486 py-2 text14 text-whlie rending1 w-full" v-else @click="handleOrder">
						去结算
					</view>
				</view>
				<!-- 留白 -->
				<view class="h-8"></view>
				<view class="h-8"></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import hearch from '@/components/hearch/index.vue'
	import volumeTag from "@/components/volumeTag/index.vue"
	import comments from "@/components/comments/index.vue"
	import {
		getStoreCouponList,
		getGoodsDetail
	} from '@/request/api.js'
	export default {
		components: {
			hearch,
			volumeTag,
			comments
		},
		created() {
			// 获取优惠卷
			this._getStoreCouponList()
			// 商品详情
			this._getGoodsDetail()
		},
		data() {
			return {
				type: 'center',
				imgs: [
					'https://imgos.cn/2024/08/12/66b9d71baf094.png',
					'https://imgos.cn/2024/08/12/66b9d67b2c357.png',
					'https://imgos.cn/2024/08/12/66b9d71baf094.png'
				],
				swiperDotIndex: 0,
				max: 10,
				min: 0,
				number: 2,
				duration: '0',
				// 温度选着
				temperatureIndex: 1,
				// 
				bottomStatus: 1, // 1加入购物车 2立即购买
				datalist: [{
						id: '1',
						name: '优惠券名称',
						type: 'a',
						use_type: 'a',
						top_price: '100',
						coupon_data: '30',
						end_time: '2023-12-16',
						areas: '成都'
					},
					{
						id: '2',
						name: '优惠券名称',
						type: 'b',
						use_type: 'b',
						top_price: '',
						coupon_data: '6折',
						end_time: '2023-12-16',
						areas: '成都'
					}
				],
				// 
				detailsList: {},
				// 规格
				checkItem: 1,
				value: null,
				range: [{
						value: 0,
						text: "原味  库存：666"
					},
					{
						value: 1,
						text: "桃味  库存：666"
					},
					{
						value: 2,
						text: "茶味  库存：666"
					},
				],
				// 展开收起
				upDownShow: false
			};
		},
		onLoad() {},
		methods: {
			upDown(){
				this.upDownShow = !this.upDownShow
			},
			handleCheck(index) {
				this.checkItem = index
			},
			changeRule(e) {
				console.log('选择', e);
			},
			// 详情、
			_getGoodsDetail() {
				getGoodsDetail({
					post_params: {
						goods_id: ''
					}
				}).then((res) => {
					console.log('res商品详情', res)
					this.detailsList = {
						"id": "1",
						"name": "泸州老窖六年窖头曲浓香白酒52度精品装500ml",//
						"show_price": "1888.8",//折扣价   折扣率前端计算  
						"show_old_price": "8888",//原价  
						"first_price": "6.88",//一级规格价格  
						"second_price": "6.88",//	二级规格价格 
						"average_price": "6.88",//二级规格均价
						"first_size": "12",//一级规格：箱
						"second_size": "1",//二级规格：瓶
						"volume": "550",//体积,单位ml 
						"has_coupon": "Y",//是否有可领取优惠券 Y是 N否
						"introduce": "摘要多行文本摘要多行文本摘要多行文本摘要多行文文本摘要多行文本摘要多行文文本摘要多行文本摘要多行文...",//摘要  多行文本  
						"introduce_two": "摘要多行文本摘要多行文本摘要多行文本摘要多行文本摘要多行文本摘要多行文本摘要多行文本摘要多行文本摘要多行文本摘要多行文本摘要多行文本摘要多行文本摘要多行文本摘要多行文本摘要多行文本摘要多行文本摘要多行文本摘要多行文本",//摘要  多行文本  
						"content": "详情富文本详情富文本详情富文本详情富文本详情富文本详情富文本详情富文本详情富文本详情富文本详情富文本详情富文本",//详情  富文本
						"attributes": [{//属性  
							"name": "",
							"value": ""
						}],
						"service": [{//服务  
							"name": "",
							"icon": ""
						}],
						"tastes": [{//口味
							"taste_id": "",//	口味ID  
							"taste_name": "",//口味名称  
							"number": "",//该口味库存数量  
							"sizes": [{//售卖规格
								"size_id": "",//售卖规格ID  
								"low_price_size": "",//最划算 Y是 N否
								"new_user_size": "",//新人价 Y是 N否
								"kill_price_size": "",//一分钱秒杀 Y是 N否 
								"time_price_size": "",//限时秒杀 Y是 N否    
								"ice_size": "",//支持冰冻  Y是  N否  
								"size_number": "",//单位规格出售数量  
								"price": ""//单‘瓶’出售价格 
							}]
						}]
					}
				})
			},
			_getStoreCouponList() {
				getStoreCouponList({
					post_params: {
						store_id: '', //门店id
						goods_id: '', //商品id
						type: '', //优惠券类型 a满减  b折扣  
						currentPage: '', //
						perPage: '',
					}
				}).then((res) => {
					console.log('优惠卷列表', res.data.list);
				})
			},
			// 结算
			handleOrder() {
				uni.navigateTo({
					url: '/pages/sonView/okOrder/index'
				})
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			// 判断是否授权相册
			handleSure() {
				let that = this
				uni.authorize({
					/* scope.writePhotosAlbum 类型是保存到相册 */
					scope: 'scope.writePhotosAlbum',
					success() {
						/* 已授权进入 */
						/* 保存图片到相册方法方法 */
						that.imgApi('https://imgos.cn/2024/08/12/66b9d67b2c357.png');
					},
					fail(res) {
						uni.showToast({
							title: "保存失败，请确认相册权限是否打开！",
							icon: "none"
						});
					}
				});
			},
			// 保存图片
			imgApi(image) {
				uni.showLoading({
					title: "正在保存中"
				})
				/* 获取图片的信息 */
				uni.getImageInfo({
					src: image,
					success: function(image) {
						/* 保存图片到手机相册 */
						uni.saveImageToPhotosAlbum({
							filePath: image.path,
							success: function() {
								uni.showToast({
									title: "保存成功",
									icon: "none"
								});
							},
							complete(res) {
								uni.hideLoading()
								console.log(res);
							}
						});
					}
				});
			},
			onLongpress(e) { //长按事件
				const _this = this
				// console.log('当前长按的图片是' + e);
				uni.showActionSheet({
					itemList: ['保存到手机'],
					success: function(res) {
						// console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						_this.handleSure()
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			change(e) {
				this.current = e.detail.current
			},
			clickItem(e) {
				this.swiperDotIndex = e
			},
			handleTemper(index) {
				this.temperatureIndex = index
			},
			handleDown() {
				this.number--
			},
			handleUp() {
				this.number++
			},
			// 跳转
			handleItem(url) {
				console.log(url);
				uni.navigateTo({
					url: url + ''
				})
			},
			// imgBig
			preview(url) {
				console.log(url);
				// #ifdef MP-WEIXIN
				this.$nextTick(() => {
					this.$refs.previewImage.open(url); // 传入当前选中的图片地址(小程序必须添加$nextTick，解决组件首次加载无图)
				})
				// #endif
				// #ifndef MP-WEIXIN
				this.$refs.previewImage.open(url); // 传入当前选中的图片地址
				// #endif
			},
			// 关闭
			close() {
				this.$refs.popup.close()
			},
			// 弹框
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			// 关闭
			closeSer() {
				this.$refs.popupServer.close()
			},
			// 弹框
			toggleSer(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popupServer.open(type)
			},
			// 关闭
			closePar() {
				this.$refs.popupPar.close()
			},
			// 弹框
			togglePar(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popupPar.open(type)
			},
			// 关闭
			closeBottom() {
				this.$refs.popupBottom.close()
			},
			// 弹框
			toggleBottom(type, index) {
				this.bottomStatus = index //切换
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popupBottom.open(type)
			},
		}
	};
</script>

<style>
	.iconImgItem {
		width: 26rpx;
		height: 26rpx;
	}

	.imgStrip {
		height: 60rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}

	.swiper-box {
		height: 20rem;
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #fff;
	}

	.borderLeftRight {
		border-left: 1px solid #999999;
		border-right: 1px solid #999999;
	}

	.specs {
		width: 2.5rem;
		height: 2.5rem;
	}

	.bgIcon {
		background-image: url('@/static/home/shopDetailIcon.png');
		background-size: 100% 100%;
		width: 3.5rem;
		padding-top: 109rpx
	}

	.borTag {
		border: 1px solid #ED1805;
	}

	.viewLeft {
		width: 4.5rem;
		padding: 0.5rem;
		border-radius: 1.5rem 0px 0px 1.5rem;
		height: 2rem;
		margin-top: 0.325rem;
		line-height: 2rem;
	}

	.viewRight {
		width: 4.5rem;
		padding: 0.5rem;
		border-radius: 0px 1.5rem 1.5rem 0px;
		height: 2rem;
		margin-top: 0.325rem;
		line-height: 2rem;
		margin-right: 1rem;
	}

	.iconTwo {
		width: 1.25rem;
		height: 1.25rem;
	}

	.gw {
		height: 3.75rem;
		background-color: #fff;
		position: fixed;
		/* top: 91.5vh; */
		bottom: 0px;
		/* border: 1px solid red; */
		width: 100%;
	}
	.rightTop {
		background: linear-gradient(134deg, #FA311D 0%, #FF8E34 100%);
		border-radius: 4rpx 4rpx 4rpx 4rpx;
		font-size: 20rpx;
		color: white;
		position: absolute;
		top: -10px;
		right: -1rpx;
		padding: 2rpx 10rpx;
	}
	
	.selView {
		width: 300rpx;
		margin-left: 20rpx;
	}
	
	.specs {
		width: 2.5rem;
		height: 2.5rem;
	}
	
	.tagCol {
		background: linear-gradient(270deg, #FA311D 0%, #FF8E34 100%);
	}
	
	.tagBor {
		border: 1px solid #FA311D;
	}
	
	.itemImg {
		width: 6rem;
		height: 6rem;
	}
</style>