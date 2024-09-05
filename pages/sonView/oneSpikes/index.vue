<template>
	<view class="">
		<viewTop :title="'快鹿送酒'">
			<view class="text-center">
				<image src="@/static/home/oneSpikes.png" mode="" class="imgText"></image>
			</view>
		</viewTop>
		<view class="">
			<view class="bgF9 p-3" >
				<view class="w90 mt-3">
					<view class="" v-for="item in [1,2,3]" :key="item">
						<shopCardTwo>
							<view class="">
								<view class="btnRig text14 space-x-6 text-whlie rending2 px-3 py-2">
									去抢购
								</view>
							</view>
						</shopCardTwo>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import viewTop from "@/pages/sonView/volume/components/viewTop/index.vue"
	import shopCardTwo from '@/components/shopCardTwo/index.vue'
	import {getGoodsList} from '@/request/api.js'
	export default {
		data() {
			return {
				active: false
			};
		},
		components:{viewTop,shopCardTwo},
		onLoad() {
			this._getGoodsList() //商品列表 一分秒杀
		},
		onShow() {
			
		},
		onHide() {
		},
		methods: {
			_getGoodsList(){
				getGoodsList({
					post_params: {
							store_id: "",
							position: "price",
							goods_type_id: "",
							key_word: "",
							time_process: "",
							order: null,
							currentPage: null,
							perPage: null
						}
				}).then((res)=>{
					console.log('商品列表',res);
				})
			},
		}
	};
</script>

<style>
	.btnRig{
		background: linear-gradient( 270deg, #FA311D 0%, #FF8E34 100%);
	}
	.imgText{
		position: relative;
		top: 1rem;
		width: 100%;
		height: 4rem;
	}
</style>