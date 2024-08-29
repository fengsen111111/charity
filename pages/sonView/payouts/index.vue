<template>
	<view class="">
		<hearch :title="'提现'" :isLeft="true" />
		<view class="p-3 text12">
			<view class="p-4 bg-whilt rending2 ">
				<view class="flex mb-3 justify-between">
					<view class="">提现金额</view>
					<view class="flex">
						<view class="">可提现</view>
						<view class="space-x-2">666666</view>
					</view>
				</view>
				<uni-easyinput class="uni-mt-5" trim="all" v-model="value" placeholder="输入提现金额"></uni-easyinput>
			</view>
			<!--  -->
			<view class="p-4 bg-whilt rending2 mt-3">
				<view class="flex justify-between">
					<view class="">选择银行卡</view>
					<view class="col486" @click="handleUrl('/pages/sonView/addCard/index')">新增银行卡</view>
				</view>
				<view>
					<uni-swipe-action ref="swipeAction">
						<uni-swipe-action-item class="mt-3"  v-for="(item, index) in swipeList" :right-options="item.options" :key="item.id"
						@click="swipeClick($event, index)">
							<view class=" bgF9 col666 p-2 rending1" :class="item.id==1?'border486 bgF2F':''">
								<view class="flex justify-between items-center">
									<view class="">中国银行</view>
									<view class="">益州大道支行</view>
								</view>
								<view class="flex justify-between items-center">
									<view class="">张三</view>
									<view class="">1234**********1234</view>
								</view>
							</view>
						</uni-swipe-action-item>
					</uni-swipe-action>
				</view>
			</view>

		</view>
		<!--  -->
		<view class="btnFixed">
			<view class="px-3">
				<view class="bg486 text-whlie w-full py-3 rending2 text-center text16 " @click="_submitWithdrawal()">
					提现
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import hearch from "@/components/hearch/index.vue"
	import {
		submitWithdrawal,
		getBankList
	} from '@/request/api.js'
	export default {
		components: {
			hearch
		},
		data() {
			return {
				active: false,
				value: '',
				option: {},
				// 滑动
				swipeList: [
				  {
					id: 1,
					options: [{
						text: '修改',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#F56C6C'
						}
					}],
					content: []
				  }, {
					id: 2,
					options: [{
						text: '修改',
						style: {
							backgroundColor: '#007aff'
						}
					  },
					  {
						text: '删除',
						style: {
							backgroundColor: '#F56C6C'
						}
					}],
					content: []
				  },{
					id: 3,
					options: [{
						text: '修改',
						style: {
							backgroundColor: '#007aff'
						}
					  },
					  {
						text: '删除',
						style: {
							backgroundColor: '#F56C6C'
						}
					}],
					content: []
				  },
				]
			};
		},
		onLoad(options) {
			console.log('options', options);
			this.option = options
			this._getBankList() //银行卡列表
		},
		onShow() {

		},
		onHide() {},
		methods: {
			swipeClick(e, index) {
				let {content} = e;
				console.log('e',e);
				// if (content.text === '删除') {
				// 	uni.showModal({
				// 		title: '提示',
				// 		content: '是否删除',
				// 		success: res => {
				// 			if (res.confirm) {
				// 				this.swipeList.splice(index, 1);
				// 			} else if (res.cancel) {
				// 				console.log('用户点击取消');
				// 			}
				// 		}
				// 	});
				// })
			},
			// bindClick(e,item) {
			// 	console.log(e,item);
			// 	return
			// 	this.$refs.swipeAction.closeAll()
			// 	if(e.content.text=='编辑'){
			// 		uni.navigateTo({
			// 			url:'/pages/sonView/addCard/index?bank_id='+item.id
			// 		})
			// 	}
			// },
			// 
			_getBankList() {
				getBankList().then((res) => {
					console.log('银行卡列表', res);
				})
			},
			// 提现
			_submitWithdrawal() {
				submitWithdrawal({
					post_params: {
						company_id: this.option.company_id,
						bank_id: '', //	银行卡ID  
						money: ''
					}
				}).then((res) => {
					console.log('提现结束', res);
				})
			},
			handleUrl(url) {
				console.log(url);
				uni.navigateTo({
					url: url + ''
				})
			},
		}
	};
</script>

<style>
	.btnFixed {
		position: fixed;
		bottom: 100rpx;
		width: 100%;
		text-align: center;
	}
	
</style>