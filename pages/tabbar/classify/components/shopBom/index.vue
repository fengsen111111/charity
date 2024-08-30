<template>
	<view class="mt-3 h-full flex text14 ">
		<view class="bg-whilt px-3 rending1 ">
			<view class="py-2" :class="item.id>1?'col999':'col666'" v-for="item in dataTab" :key="item.id">
				{{item.text}}
			</view>
		</view>
		<!-- shop -->
		<view class="rightWidth">
			<view class="flex items-center" v-for="item in [1,2,3,4,5,6,7]" :key="item">
				<uni-icons type="checkbox-filled" v-if="item==checkIndex" color="#4867CF" size="20" class="uni-ml-2 uni-mr-2"></uni-icons>
				<uni-icons @click="handleIndex(item)" type="circle" size="20" v-else class="uni-ml-2 uni-mr-2"></uni-icons>
				<view class=""  @click="handleDetails(item)">
					<shopCardTwo>
						<!-- 选规格 -->
						<view class="">
							<view class="bg486 text-whlie text12 px-2 rending1 py-1 space-x-2" @click.stop="toggle('bottom')">
								选规格
							</view>
						</view>
					</shopCardTwo>
				</view>
			</view>
		</view>
		<!--  -->
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
							<view @click=handleTemper(item) :class="temperatureIndex==item?'bgF2F col486 border486':' bg-whilt border999'" class=" h-8 w5 text-center rending2 " v-for="item in [1,2,3]" :key="item">
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
										<slider backgroundColor="#F9F9F9" activeColor="#4867CF" @change="durationChange" :value="duration" :max="max" :min="min" />
									</view>
								</view>
								<view class="">{{max}}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 加入购物车 结算 -->
				<view class="flex justify-between w95 space-x-2 mt-3 text-center">
					<view class="bgFF8 py-2 text14 text-whlie rending1 btnPoupr">
						加入购物车
					</view>
					<view class="bg486 py-2 text14  text-whlie rending1 btnPoupr">
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
	import shopCardTwo from '@/components/shopCardTwo/index.vue'
	import ruleItem from "@/components/ruleItem/index"
	import {getGoodsTypeList,getGoodsList} from '@/request/api.js'
	export default {
		components: {
			shopCardTwo,ruleItem
		},
		data() {
			return {
				title: 'Hello',
				min:0,
				max:10,
				number:2,
				// 温度选着
				temperatureIndex:1,
				// 冰冻
				duration: 0,
				// 单选
				checkIndex:1,
				dataTab: [{
						id: 1,
						text: '国产风味'
					},
					{
						id: 2,
						text: '进口风味'
					},
					{
						id: 3,
						text: '百威'
					},
					{
						id: 4,
						text: '雪花'
					},
					{
						id: 5,
						text: '燕京'
					},
					{
						id: 6,
						text: '乐堡'
					},
					{
						id: 7,
						text: '百2威'
					},
					{
						id: 8,
						text: '雪2花'
					},
					{
						id: 9,
						text: '燕2京'
					},
					
				]
			}
		},
		onLoad() {

		},
		created(){
			this._getGoodsTypeList()
		},
		methods: {
			// 详情
			handleDetails(item){
				uni.navigateTo({
					url:'/pages/tabbar/home/components/shopDetails/index'
				})
			},
			// 
			_getGoodsTypeList(){
				getGoodsTypeList({
					post_params:{
						store_id:''
					}
				}).then((res)=>{
					console.log('所有商品分类',res);
					// 
					// this._getGoodsList(item)
				})
			},
			_getGoodsList(){
				getGoodsList({
					post_params:{
						store_id:'',
						position:'',
						goods_type_id:'',
						key_word:'',
						time_process:'',
						order:'',
						currentPage:'',
						perPage:'',
					}
				}).then((res)=>{
					console.log('门店商品列表',res);
				})
			},
			handleIndex(index){
				this.checkIndex = index
			},
			handleTemper(index){
				this.temperatureIndex = index
			},
			handleDown() {
				if(this.number>0){
					this.number--
				}
			},
			handleUp(){
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
			durationChange(e) {
				this.duration = e.target.value
			}
		}
	}
</script>

<style>
	.rightWidth {
		width: 17.25rem;
	}
	.btnPoupr{
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
	.tagCol{
		background: linear-gradient( 270deg, #FA311D 0%, #FF8E34 100%);
	}
	.tagBor{
		border: 1px solid #FA311D;
	}
	.itemImg{
		width: 6.5rem;
		height: 5rem;
	}
	.checkboxItem {
		border-bottom: 3px solid #4867CF;
		padding: 0px 0.5rem;
	}
	
	.tagShopItem {
		border: 1px solid #ED1805;
	}
	
	.gridRow {
		grid-column-gap: 0.5rem;
	}
</style>