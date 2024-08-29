<template>
	<view class="">
		<view class="bgMyImg">
			<view class="space-x-3">
				<view class="h-8"></view>
				<image src="@/static/my/topText.png" mode="" class="topText mt-2"></image>
				<view class="ling1">
					骑手端
				</view>
			</view>
		</view>
		<view class="text-center">
			<image src="@/static/home/logUser.png" mode="" class="imgUser"></image>
		</view>
		<view class="text-center py-3 col999">
			骑手端登录
		</view>
		<view class="w80 mxAuto">
			<view class="mt-3 mb-3">手机号</view>
			<uni-easyinput v-model="value1" trim="all" placeholder="请输入内容" @input="input"></uni-easyinput>
			<view class="mt-3 mb-3">验证码</view>
			<!-- <uni-easyinput v-model="value2" focus placeholder="请输入内容" @input="input"></uni-easyinput> -->
			<uni-easyinput class="uni-mt-5"v-model="value2"  suffixIcon="" placeholder="右侧图标" @iconClick="iconClick">
				<template #right>
						<view v-if="times==0" class="code" @click="handleCode">验证码</view>
						<view v-else class="codeTime">{{times}}</view>
					</template>
			</uni-easyinput>
		</view>
		<view class="h-6"></view>
		<view class="w80 mxAuto bg486 text-whlie rending1 py-3 text-center" @click="handleUrl('/pages/sonView/riderOrder/index')">
			登录
		</view>
	</view>
</template>

<script>
	import {getPhoneCode} from '@/request/api.js'
	export default {
		data() {
			return {
				active: false,
				value1:'666666',
				value2:'123456',
				times:0
			};
		},
		components:{  },
		onLoad() {},
		onShow() {
			
		},
		onHide() {
		},
		methods: {
			// 获取倒计时
			handleCode(){
				getPhoneCode({
					account_type:'',//
					account:'',//手机号
				}).then((res)=>{
					// 获取验证码成功，打开倒计时
					this.settimeCode()
				})
			
			},
			// 倒计时
			settimeCode(){
				console.log('发送验证码');
				var that = this;
				that.times = 60
				if(that.times == 60){
					that.sid = setInterval(function() {
						that.times--;
						if(that.times == 0){
				            //时间到了清除计时器
							clearInterval(that.sid);
						}
					}, 1000); 
				}
			},
			handleUrl(url) {
				console.log(url);
				uni.navigateTo({
					url: url + ''
				})
			}
		}
	};
</script>

<style>
	.code{
		    border: 1rpx solid #4867CF;
		    padding: 4rpx;
		    margin-right: 8rpx;
		    border-radius: 8rpx;
		    color: #4867CF;
			width: 90rpx;
			text-align: center;
	}
	.codeTime{
		    border: 1rpx solid #999999;
		    padding: 4rpx;
		    margin-right: 8rpx;
		    border-radius: 8rpx;
		    color: #999999;
			width: 90rpx;
			text-align: center;
	}
	.imgUser{
		width: 7rem;
		height: 7rem;
		margin-top: 2rem;
	}
	.bgMyImg {
		color: #fff;
		background-image: url('@/static/my/topBg.png');
		background-size: 100% 100%;
		height: 5rem;
		width: 100%;
	}
	.topText{
		width: 4rem;
		height: 1rem;
	}
</style>