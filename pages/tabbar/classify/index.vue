<template>
	<view class="">
		<topView />
		<tagClass />
		<shopBom />
		<view class="h-8"></view>
		<view class="h-4"></view>
		<!-- 购物 -->
		<view class="gw flex justify-between">
			<view class="flex mt-3">
				<view class="text-center space-x-6">
					<button open-type="contact" class="btnTo">
						<image src="@/static/classify/server_new.png" mode="" class="iconTwo"></image>
					</button>
					<view class="text12 mt-1">客服</view>
				</view>

				<view class="text-center space-x-6">
					<image src="@/static/classify/shopping_new.png" mode="" class="iconTwo"></image>
					<view class="text12 mt-1">购物车</view>
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
								泸州老窖 六年窖头曲 浓香白酒 52度精品装 500ml...
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
	import ruleItem from "@/components/ruleItem/index"
	import topView from '@/pages/tabbar/classify/components/topView/index.vue'
	import tagClass from '@/pages/tabbar/classify/components/tagClass/index.vue'
	import shopBom from '@/pages/tabbar/classify/components/shopBom/index.vue'
	export default {
		components: {
			topView,
			tagClass,
			shopBom,
			ruleItem
		},
		data() {
			return {
				title: 'Hello',
				max: 10,
				min: 0,
				number: 2,
				duration: '0',
				// 温度选着
				temperatureIndex: 1,
				// 
				bottomStatus: 1 // 1加入购物车 2立即购买
			}
		},
		onLoad() {

		},
		methods: {
			handleTemper(index) {
				this.temperatureIndex = index
			},
			handleDown() {
				this.number--
			},
			handleUp() {
				this.number++
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
			handleUrl(url) {
				console.log(url);
				uni.navigateTo({
					url: url + ''
				})
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
			// 结算
			handleOrder() {
				uni.navigateTo({
					url: '/pages/sonView/okOrder/index'
				})
			},
		}
	}
</script>

<style>
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
		height: 4rem;
		background-color: #fff;
		position: fixed;
		bottom: 0px;
		/* border: 1px solid red; */
		width: 100%;
	}
</style>