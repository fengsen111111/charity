<template>
	<view class="">
		<hearchItem :isLeft="true" :title="'活动详情'" />
		<swiperItemsTwo :isBottom="false" :swiperList="activeDetails.images" />
		<view class="py30 flex justify-between ml36">
			<view class="text32 font-bold w-4-5">
				{{activeDetails.name}}
			</view>
			<view :class="activeDetails.status=='a'?'status_3':activeDetails.status=='b'?'status_1':'status_2'">
				{{activeDetails.status=='a'?'待开始':activeDetails.status=='b'?'进行中':'已结束'}}
			</view>
		</view>
		<view class="bgEBEBEB h18 "></view>
		<view class="py30 text24 px36">
			<view class="flex justify-between">
				<view class="">活动地址</view>
				<view class="col205D57 w-7-10 text-right">{{activeDetails.address}}</view>
			</view>
			<view class="px36 py30">
				<view class=" bgEBEBEB h1"></view>
			</view>
			<view class="flex justify-between">
				<view class="">活动时间</view>
				<view class="col205D57 w-7-10 text-right">{{activeDetails.start_time}} 至 {{activeDetails.end_time}}
				</view>
			</view>
			<view class="px36 py30">
				<view class=" bgEBEBEB h1"></view>
			</view>
			<view class="flex justify-between">
				<view class="">发起组织</view>
				<view class="col205D57 w-7-10 text-right">{{activeDetails.org_name}}</view>
			</view>
			<view class="px36 py30">
				<view class=" bgEBEBEB h1"></view>
			</view>
			<view class="flex justify-between items-center">
				<view class="">活动名额(剩余/共计)</view>
				<view class="colD6B07A w-3-5 text-right items-baseline ">
					<view class="text36">{{activeDetails.residue_number}}/{{activeDetails.person_number}}<text
							class="ml10 text24">人</text></view>
				</view>
			</view>
			<view class="px36 py30">
				<view class=" bgEBEBEB h1"></view>
			</view>
			<view class="flex justify-between">
				<view class="">可获得积分</view>
				<view class="colD6B07A w-7-10 text-right">{{activeDetails.integral}}积分</view>
			</view>
			<view class="px36 py30">
				<view class=" bgEBEBEB h1"></view>
			</view>
			<view class="flex justify-between">
				<view class="">集合地址</view>
				<view class="col205D57 w-7-10 text-right">{{activeDetails.point_address}}</view>
			</view>

		</view>
		<view class="bgEBEBEB h18 "></view>
		<view class="py30 px36 text32 indent32">
			<view v-html="activeDetails.content"></view>
		</view>
		<!-- 屏幕定位 -->
		<view class="btnMoney w-full">
			<button type="default" open-type="share" class="clear-style">
				<image src="../../../static/fenxiang.png" class="w100 h100 relative_fei" mode="">
			</button>
			<view class="mt20 px75">
				<view class="btnForm" @click="_joinActivity" >
					活动报名
				</view>
			</view>
		</view>
		<uni-popup ref="share" type="share" safeArea backgroundColor="#fff">
			<button type="default" open-type="share">分享到微信</button>
			<button type="default" @click="handleCol">取消</button>
		</uni-popup>

		<view class="h20"></view>
	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue'
	import swiperItemsTwo from '@/components/swiperItems/index_two.vue'
	import cardFunds from '@/components/card_funds/index.vue'
	import {
		getActivityDetail,
		joinActivity
	} from "@/request/api.js"
	export default {
		components: {
			hearchItem,
			swiperItemsTwo,
			cardFunds
		},
		data() {
			return {
				indexItem: 1,
				form: {
					name: '',
					money: ''
				},
				active_id: '', //
				activeDetails: {}
			}
		},
		created() {
			//获取手机状态栏高度
		},
		onLoad(option) {
			this.active_id = option.active_id
		},
		onReady() {
			//获取手机状态栏高度
			this._getActivityDetail()
		},
		watch: {},
		methods: {
			handleCol() {
				this.$refs.share.close()
			},
			onShareAppMessage(res) {
				if (res.from === 'button') { // 判断分享是否来自页面内分享按钮
					console.log(res.target)
				}
				return {
					title: '不凡',
					path: path
				}
			},
			handleFX() {
				console.log('分享');
				// this.$refs.share.open()
				uni.share({
				    provider: 'weixin',
				    scene: "WXSceneSession",
				    type: 5,
				    imageUrl: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni-app-doc/962fc340-4f2c-11eb-bdc1-8bd33eb6adaa.png',
				    title: '欢迎体验uniapp',
				    miniProgram: {
				        id: 'gh_abcdefg',
				        path: 'pages/index/index',
				        type: 0,
				        webUrl: 'http://uniapp.dcloud.io'
				    },
				    success: ret => {
				        console.log(JSON.stringify(ret));
				    }
				});
			},
			// 下单
			_joinActivity() {
				if(this.activeDetails.residue_number<=0){
					uni.showToast({
						title: '活动已无名额！',
						icon: 'error',
						duration: 1000
					});
					return 
				}
				uni.showLoading();
				setTimeout(()=>{
					uni.hideLoading();
				},500)
				joinActivity({
					post_params: {
						activity_id: this.activeDetails.id
					}
				}).then((res) => {
					console.log('下单结束', res.data);
					if(res.data.code==1){
						uni.showToast({
							title: '活动报名成功!',
							icon: 'success',
							duration: 1000
						});
						this._getActivityDetail()
					}else{
						uni.showToast({
							title: res.data.message+'!',
							icon: 'error',
							duration: 1000
						});
					}
				})
				
			},
			// 切换
			handleIndex(index) {
				this.indexItem = index
			},
			_getActivityDetail() {
				getActivityDetail({
					post_params: {
						id: this.active_id
					}
				}).then((res) => {
					console.log('res活动详情', res.data.data);
					this.activeDetails = res.data.data
				})
			}
		}
	}
</script>

<style>
	.relative_fei {
		position: relative;
		left: 84vw;
	}

	.border-bottom-dotted {
		border: 1rpx dotted #9B9B9B;
	}

	.charitableImg {
		width: 170rpx;
		height: 65rpx;
	}

	.bgtwo {
		background: linear-gradient(90deg, #164336 0%, #226043 100%);
	}
</style>