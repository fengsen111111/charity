<template>
	<view class="">
		<view class="grid grid-cols-2 gridRow">
			<view class="bg-whilt rending1 p-2 mt-3" v-for="item in [1,2,3,4]" :key="item">
				<image v-if="item==1" @click="handDetailds" src="https://img.picui.cn/free/2024/09/14/66e4e030c8115.png"
					mode="" class="w-full h10"></image>
				<image v-else-if="item ==2" @click="handDetailds" src="https://img.picui.cn/free/2024/09/14/66e4e030c8115.png"
					mode="" class="w-full h10"></image>
				<image v-else-if="item ==3" @click="handDetailds" src="https://img.picui.cn/free/2024/09/14/66e4e030c8115.png"
					mode="" class="w-full h10"></image>
				<image v-else-if="item ==4" @click="handDetailds" src="https://img.picui.cn/free/2024/09/14/66e4e030c8115.png"
					mode="" class="w-full h10"></image>
				<view class="fontBold text12 ling125 ">
					泸州老窖六年窖头曲特惠浓香白酒52度精品装...
				</view>
				<text class="colFA3 px-1 text10 tagShopItem">200ml/瓶</text>
				<view class="flex justify-between mt-1">
					<view class="">
						<view class="flex items-center">
							<view class="colED1 text14 fontBold">
								￥1888.8
							</view>
							<view class="col999 text10 space-x-2 textDel">
								￥8888
							</view>
						</view>
						<view class="colED1 ling1 text10 ">
							约 66.88元/瓶 148.88元/箱
						</view>
					</view>
					<view class="text12 bg486 rending2 text-whlie p-1" @click="toggle('bottom')">
						选规格
					</view>
				</view>
			</view>
		</view>
		<!-- </view> -->
		<!-- 普通弹窗 -->
		<uni-popup ref="popup" background-color="#fff" borderRadius="0.5rem 0.5rem 0px 0px">
			<view class="bgF9 p-4 overflowAuto" style="height:70vh">
				<view class="fiexdTop">
					<view></view>
					<view class="text16">
						选择规格
					</view>
					<view class="" @click="close">
						<uni-icons type="closeempty" size="20"></uni-icons>
					</view>
				</view>
				<view class="h-6"></view>
				<view class="w95 mt-4">
					<view class="rending1 p-2 w-full flex mb-2">
						<image src="@/static/classify/item.png" mode="" class="itemImg rending1"></image>
						<view class="space-x-2">
							<view class="fontBold text12 ling4">
								泸州老窖 六年窖头曲 浓香白酒 52度精品装 500ml...
							</view>
							<view class="flex mt-2 rending1 hidden">
								<view class="tagCol py6rpx text-whlie px-2 text10">
									<view style="margin-top: 1rpx;">领取优惠券</view>
								</view>
								<view class="tagBor py6rpx colED1 px-2 text10 rightRadius8">
									6.2折
								</view>
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
					<ruleItem />
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
								<text class="text14" style="line-height:2rem">{{item==1?'全部':item==2?'一半':'常温'}}</text>
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
					<view class="bgFF8 py-2 text14 text-whlie rending1 btnPoupr" @click="handleShopping()">
						加入购物车
					</view>
					<view class="bg486 py-2 text14  text-whlie rending1 btnPoupr" @click="handleBuy()">
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
	import ruleItem from "@/components/ruleItem/index"
	export default {
		components: {
			ruleItem
		},
		data() {
			return {
				searchValue: '',
				type: 'center',
				value: 1,
				max: 10,
				min: 0,
				number: 2,
				// 温度选着
				temperatureIndex: 1,

				// 
				duration: '10'
			};
		},
		onLoad() {},
		methods: {
			handleShopping(){
				uni.navigateTo({
					url:'/pages/tabbar/shopping/index'
				})
			},
			handleBuy(){
				uni.navigateTo({
					url:'/pages/sonView/okOrder/index'
				})
			},
			handleTemper(index) {
				this.temperatureIndex = index
				console.log('index', index);
				switch (index) {
					case 1:
						return this.duration = this.max
					case 2:
						return this.duration = this.max/2
					case 3:
						return this.duration = this.min
					default:
						break;
				}
			},
			handleDown() {
				if (this.number > 0) {
					this.number--
				}
			},
			handleUp() {
				this.number++
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
			handDetailds() {
				console.log('跳转详情');
				uni.navigateTo({
					url: '/pages/tabbar/home/components/shopDetails/index'
				})
			},
			durationChange(e) {
				this.duration = e.target.value
			}
		}
	};
</script>

<style>
	.btnPoupr {
		width: 9rem;
	}

	.leftView {
		background-image: url('@/static/home/subtract.png');
		background-size: 100% 100%;
		width: 2.5rem;
		height: 1.75rem;
		line-height: 51rpx;
		border-radius: 1rem 0px 0px 1rem;
	}

	.cenVire {
		background-color: #F9F9F9;
		width: 2rem;
		height: 1.75rem;
		text-align: center;
		line-height: 1.75rem;
	}

	.rightView {
		background-image: url('@/static/home/add.png');
		background-size: 100% 100%;
		width: 2.5rem;
		height: 1.75rem;
		line-height: 51rpx;
		border-radius: 0px 1rem 1rem 0px;
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
		width: 6.5rem;
		height: 5rem;
	}

	.checkboxItem {
		border-bottom: 3px solid #4867CF;
		padding: 0px 0.5rem;
	}

	.tagShopItem {
		border: 1px solid #ED1805;
		border-radius: 4rpx;
	}

	.gridRow {
		grid-column-gap: 0.5rem;
	}
</style>