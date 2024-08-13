<template>
	<view class="">
		<hearch :title="'收货地址'" :isLeft="true"/>
		<view class="p-3 text12">
			<view class="bg-whilt mt-3 rending1 p-3" v-for="item in [1,2,3]" :key="item">
				<view class="flex" >
					<text>张三</text>
					<text class="space-x-2">13512341234</text>
				</view>
				<view class="flex justify-between">
					<view class="w80">
						四川省成都市武侯区世纪城天府大道中段588号天天小区快鸟驿站
					</view>
					<view class="text-center mr-2">
						<uni-icons type="location" size="20" color="#4867CF"></uni-icons>
						<view class="col999">
							888km
						</view>
					</view>
				</view>
				<view class="flex justify-between">
					<view class="flex">
						<uni-icons :type="item==1?'checkbox-filled':'circle'" size="20" color="#4867CF"></uni-icons>
						<view class="space-x-1">默认收货地址</view>
					</view>
					<view class="flex">
						<uni-icons type="compose" size="20" color="#4867CF"></uni-icons>
						<uni-icons type="trash" size="20" class="space-x-4" color="#FC6265" @click="toggle('center')"></uni-icons>
					</view>
				</view>
			</view>
			<view class="h10"></view>
			<view class="h-2"></view>
			<view class="bg486 text-whlie w-full py-3 rending2 text-center text16" @click="handleUrl('/pages/sonView/addressForm/index')">
				新增地址
			</view>
		</view>
		<!-- 删除弹框 -->
		<uni-popup ref="popup" background-color="#fff" borderRadius="0.5rem 0.5rem 0.5rem 0.5rem">
			<view class="bgF9 p-4 overflowAuto rending2" style="width: 17rem;">
				<view class="flex justify-between">
					<view class="w-4"></view>
					<view class="text16">
						是否删除地址
					</view>
					<view class="" @click="close">
						<uni-icons type="closeempty" size="20"></uni-icons>
					</view>
				</view>
				<view class="text12">
					<view class="bg-whilt mt-3 rending1 p-3">
						<view class="flex" >
							<text>张三</text>
							<text class="space-x-2">13512341234</text>
						</view>
						<view class="flex justify-between">
							<view class="w-full">
								四川省成都市武侯区世纪城天府大道中段588号天天小区快鸟驿站
							</view>
						</view>
					</view>
				</view>
				<view class="flex justify-between mt-3">
					<view class="bg486 text-whlie text-center py-1 rending1 twoBtn" @click="close">
						再想想
					</view>
					<view class="bgFC6 text-whlie text-center py-1 rending1 twoBtn">
						删除
					</view>
				</view>
				<!-- 留白 -->
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import hearch from "@/components/hearch/index.vue"
	export default {
		components:{hearch},
		data() {
			return {
				active: false,
				value:'',
			};
		},
		onLoad() {},
		onShow() {
			
		},
		onHide() {
		},
		methods: {
			handleUrl(url) {
				console.log(url);
				uni.navigateTo({
					url: url + ''
				})
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
		}
	};
</script>

<style>
	.twoBtn{
		width: 48%;
	}
	
</style>