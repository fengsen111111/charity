<template>
	<view class="">
		<hearchItem :isLeft="true" :title="'活动报名'" />
		<view class="bg-white">
			<view class="p35">
				<view class="border205D57 col9B9B9B text24 flex p10 items-center radius30">
					<uni-icons type="search" size="20" color="#205D57"></uni-icons>
					<view class="ml10"><input type="text" :value="rearch" placeholder="请输入活动信息" /></view>
				</view>
			</view>
			<view class="flex items-center px36 pb30">
				<view class=" col205D57 w180" >
					<uni-data-select v-model="value" :clear="false" :localdata="range" @change="change"></uni-data-select>
				</view>
				<view class="py5 ml20">
					<view class="titleView text-center text26 col205D57 hidden scrollable">
						<view class="flex items-center ml10">
							<view class="px10" @click="handleIndex(item.id)" v-for="item in typeList" :key="item.id">
								<view :class="checkIndex==item.id?'checkIndex':''">{{item.name}}</view>
							</view>
						</view>
					</view>
				</view>
			
			</view>
		</view>

		<view class="mt40">
			<cardActivity :activeList = "activeList"/>
		</view>

	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue'
	import cardActivity from '@/components/card_activity/index.vue'
	import {
		getActivityTypeList,//活动类型列表
		getActivityList//活动列表
	} from '@/request/api.js'
	export default {
		components: {
			hearchItem,
			cardActivity,
		},
		data() {
			return {
				value: 0,
				range: [{
						value: 0,
						text: "全部"
					},
					{
						value: 1,
						text: "进行中"
					},
					{
						value: 2,
						text: "已结束"
					},
					{
						value: 3,
						text: "待开始"
					},
				],
				
				checkIndex: '',
				
				rearch:'',//搜索
				status:'',//状态
				type_id:'',//活动类型ID  
				typeList:[],//分类列表
				activeList:[],//活动列表
				limit: 20
			}
		},
		onReady() {
			this._getActivityTypeList()//分类
			this._getActivityList()//活动
			// 
		},
		mounted() {

		},
		onReachBottom(){
			this.limit = this.limit+20
			this._getActivityList()
		},
		watch: {},
		methods: {
			// 活动
			_getActivityList(){
				getActivityList({
					post_params:{
						key_word:this.rearch,
						type_id: this.checkIndex,
						status: this.status,
						currentPage:1,
						perPage: this.limit
					}
				}).then((res)=>{
					console.log('活动列表',res.data.data.list);
					this.activeList = res.data.data.list
				})
			},
			// 分类
			_getActivityTypeList(){
				getActivityTypeList().then((res)=>{
					console.log('分类数据',res.data.data);
					this.typeList = res.data.data.list
				})
			},
			change(e) {
				console.log("e:", e);
				if(e==1){
					this.status = 'b'
				}else if(e==2){
					this.status = 'c'
				}else if(e==3){
					this.status = 'a'
				}
				this._getActivityList()
			},
			handleIndex(index){
				this.checkIndex =index
				this._getActivityList()
			}
		}
	}
</script>

<style>
	.checkIndex{
		background: linear-gradient(90deg, #174437 0%, #225F43 100%);
		color: white;
		padding: 8rpx 30rpx;
		border-radius: 20rpx;
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
	
	.uni-select__input-text {
	    width: 100%;
	    color: #205D57 !important;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    -o-text-overflow: ellipsis;
	    overflow: hidden;
	}
	.uni-select {
	    font-size: 14px;
	    border: 0px solid #e5e5e5 !important;
	    box-sizing: border-box;
	    border-radius: 4px;
	    padding: 0 5px;
	    padding-left: 10px;
	    position: relative;
	    display: flex;
	    -webkit-user-select: none;
	    user-select: none;
	    flex-direction: row;
	    align-items: center;
	    border-bottom: solid 0px #e5e5e5 !important;
	    width: 100%;
	    flex: 1;
	    height: 35px;
	}
	/* 隐藏滚动条，启用滚动 */
	.scrollable {
	  overflow: scroll; /* 或者 overflow: auto */
	  ;width: 70vw;
	  white-space: nowrap
	}
	
	/* 针对 WebKit 浏览器隐藏滚动条 */
	.scrollable::-webkit-scrollbar {
	  display: none;
	}
</style>