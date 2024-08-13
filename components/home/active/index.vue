<template>
	<view class="">
		<view class="grid grid-cols-2">
			<image src="https://imgos.cn/2024/08/12/66b9d773df181.png" mode="" class="w-full h-full"></image>
			<view class="">
				<!-- 一分秒杀 -->
				<view class="card p-2 h7">
					<view class="flex justify-between  items-center">
						<view class="price text12 rending1 px-1">一分秒杀</view>
						<view class="colortext text12" @click="handleUrl('/pages/sonView/oneSpikes/index')">更多</view>
					</view>
					<view class="flex justify-between">
						<view v-for="item in [1,2]" :key="item">
							<image @click="handDetailds" src="https://imgos.cn/2024/08/12/66b9d67b2c357.png" mode="" class="mt-1 h4 w4"></image>
							<view class="relativeTop">
								<text class="tagBg px-1">
									0.01
								</text>
								<view class="flex justify-between items-center">
									<view class="">
										<view class="text12 ">￥0.01</view>
										<view class="text10 ling0 col666 textDel">￥8888</view>
									</view>
									<text class="bg486 text-whlie text12 px-1 mt-2 rending1">
										秒杀
									</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 限时秒杀 -->
				<view class="card p-2 h7 mt-2">
					<view class="flex justify-between  items-center">
						<view class="flex text12">
							<view class="price px-1">限时秒杀</view>
							<view class=" colFA3 borderms">
								19:10:09
							</view>
						</view>
						<view class="colortext text12" @click="handleUrl('/pages/sonView/spikes/index')">更多</view>
					</view>
					<view class="flex justify-between">
						<view v-for="item in [1,2]" :key="item">
							<image @click="handDetailds" src="https://imgos.cn/2024/08/12/66b9d67b2c357.png" mode="" class="mt-1 h4 w4"></image>
							<view class="relativeTop">
								<text class="tagBg px-1">
									0.01
								</text>
								<view class="flex mt-2 text10 items-center msShop">
									<view class="text-whlie px-1 bg486">
										￥8888
									</view>
									<view class="col666 textDel">
										￥8888
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				searchValue: '',
			};
		},
		onLoad() {},
		methods: {
			handleUrl(url){
				console.log(url);
				uni.navigateTo({
					url:url+''
				})
			},
			handDetailds(){
				console.log('跳转详情');
				uni.navigateTo({
				  url: '/pages/tabbar/home/components/shopDetails/index'
				})
			}
		}
	};
	
</script>

<style>
	.price {
		background: linear-gradient(270deg, #FA311D 0%, #FF8E34 100%);
	}
	.borderms{
		border: 1px solid #FF8E34;
		padding: 0px 0.25rem;
	}
	.colortext {
		color: #4867CF;
	}
	.card {
		background-color: #F2F3FF;
		box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
		border-radius: 0.25rem;
		margin-left: 0.25rem;
	}
	.tagBg {
		font-size: 10px;
	
		background-color: #D7D9EC;
		border-radius: 0px 0.25rem 0.25rem 0px;
	}
	.msShop {
		border: 1px solid #4867CF;
		line-height: 1rem;
		text-align: center;
		border-radius: 0.25rem;
	}
	.relativeTop {
		color: #ED1805;
		position: relative;
		top: -1.75rem;
	}
	.bgImg {
		background-image: url('@/static/home/topBg.png');
		background-size: 100% 100%;
		height: 33rem;
	}
</style>