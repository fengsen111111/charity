<template>
	<view class="">
		<hearchItem :isLeft="true" :title="'我的地址'" />
		<view v-for="item in addressList" :key="item.id">
			<view class="p40">
				<view class="flex items-center">
					<view class=" text24 w-full">
						<view class="flex justify-between items-center">
							<view class="">
								<view>{{item.name}}  {{item.mobile}}</view>
								<view>{{item.address}}</view>
							</view>
							<uni-icons type="compose" size="26" color="#205D57" @click="handleAddAddress(2,item)"></uni-icons>
						</view>
						<view class="mt15 flex justify-between">
							<view class="col205D57">{{item.is_default=='Y'?'默认地址':''}}</view>
							<view class="colEC1010" @click="_deleteUserAddress(item.id)">删除地址</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bgEBEBEB h18"></view>
		</view>

		<view class="btnMoney w-full">
			<view class="mt20 px75 ">
				<view class="btnForm" @click="handleAddAddress(1)">
					新增收货地址
				</view>
			</view>
		</view>

		<!-- 新增编辑弹框 -->
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<view class="bg-white">
					<view class="grid grid-cols-3  items-center p35 border-bottom-dotted">
						<view class=""></view>
						<view class="text30 font-bold text-center col205D57">{{type==1?'新增':'修改'}}收货地址</view>
						<view class="text-right"><uni-icons type="closeempty" size="26" color="#205D57"
								@click="close"></uni-icons></view>
					</view>
					<view class="p30">
						<view class="p30 text24">
							<view class="flex justify-between items-center">
								<view>姓名</view>
								<view class="text-right"><input v-model="form.name" type="text"
										placeholder="请输入姓名..." /></view>
							</view>
							<view class="bgEBEBEB h1 mt30"></view>
							<view class="flex justify-between items-center mt30">
								<view>电话</view>
								<view class="text-right"><input v-model="form.phone" type="text"
										placeholder="请输入电话..." /></view>
							</view>
							<view class="bgEBEBEB h1 mt30"></view>
							<view class="flex justify-between items-center mt30">
								<view>收货地址</view>
								<view class="text-right"><input v-model="form.address" type="text"
										placeholder="请输入地址..." /></view>
							</view>
							<view class="bgEBEBEB h1 mt176"></view>
							<view class="flex justify-between items-center mt30">
								<view>是否默认</view>
								<view class="">
									<uni-data-checkbox v-model="form.is_default" :localdata="sexs" />
								</view>
							</view>
						</view>
					</view>
					<view class="mt77 px75">
						<view class="btnForm" @click="_editUserAddress()">
							提 交
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue'
	import {
		getUserAddressList,//列表
		editUserAddress,//新增修改
		deleteUserAddress//删除
	} from '@/request/api.js'
	export default {
		components: {
			hearchItem,
		},
		data() {
			return {
				form: {
					name: '',
					phone: '',
					address: '',
					is_default: 1,
				},
				sexs: [{
					text: '是',
					value: 1
				}, {
					text: '否',
					value: 2
				}],
				
				addressList:[],//地址列表
				defaulrObj:{},//默认地址
				type:1,//新增 2编辑
				addressCheck:{},//编辑地址
			}
		},
		created() {
			//获取手机状态栏高度
		},
		onReady() {
			this._getUserAddressList()
		},
		watch: {},
		methods: {
			// 删除
			_deleteUserAddress(id){
				uni.showLoading();
				setTimeout(()=>{
				    uni.hideLoading();
				},500)
				deleteUserAddress({
					post_params:{
						id: id
					}
				}).then((res)=>{
					console.log('删除成功',res.data.data);
					if(res.data.code==1){
						uni.showToast({						    
							title: '操作成功!',					
						    icon: 'success',					    
							duration: 1000
						});
						this._getUserAddressList()
					}
				})
			},
			// 新增修改
			_editUserAddress(){
				uni.showLoading();
				setTimeout(()=>{
				    uni.hideLoading();
				},500)
				editUserAddress({
					post_params:{
						id: this.type==1?'':this.defaulrObj.id,
						is_default: this.form.is_default == 1?'Y':'N',
						name: this.form.name,
						mobile: this.form.phone,
						address: this.form.address
					}
				}).then((res)=>{
					console.log('新增编辑成功',res.data.data);
					if(res.data.code==1){
						uni.showToast({						    
							title: '操作成功!',					
						    icon: 'success',					    
							duration: 1000
						});
						this.close()
						this._getUserAddressList()
					}
				})
			},
			_getUserAddressList(){
				getUserAddressList({
					post_params:{
						currentPage:1,
						perPage:20
					}
				}).then((res)=>{
					console.log('地址列表',res.data.data.list);
					this.addressList = res.data.data.list
					res.data.data.list.map((item)=>{
						if(item.is_default=='Y'){
							this.defaulrObj = item
						}
					})
				})
			},
			// 
			handleAddAddress(index,item) {
				console.log('选择的地址',item);
				this.type = index
				if(this.type ==1){
					// 新增
					this.form.name = ''
					this.form.phone = ''
					this.form.address = ''
					this.form.is_default = 2
				}else{
					this.form.name = item.name
					this.form.phone = item.mobile
					this.form.address = item.address
					this.form.is_default = item.is_default=='Y'?1:2
				}
				this.$refs.popup.open('bottom')
			},
			close() {
				this.$refs.popup.close()
			}
		}
	}
</script>

<style>

</style>