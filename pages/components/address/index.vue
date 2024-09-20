<template>
	<view class="">
		<hearchItem :isLeft="true" :title="'我的地址'" />

		<view v-for="item in [1,2]" :key="item">
			<view class="p40">
				<view class="flex items-center">
					<view class=" text24 w-full">
						<view class="flex justify-between items-center">
							<view class="">
								<view>张某某 188 8888 8888</view>
								<view>四川省成都市高新区某某街道某某号</view>
							</view>
							<uni-icons type="compose" size="26" color="#205D57"></uni-icons>
						</view>
						<view class="mt15 flex justify-between">
							<view class="col205D57">默认地址</view>
							<view class="colEC1010">删除地址</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bgEBEBEB h18"></view>
		</view>

		<view class="btnMoney w-full">
			<view class="mt20 px75 ">
				<view class="btnForm" @click="handleAddAddress()">
					新增收货地址
				</view>
			</view>
		</view>

		<!-- 新增编辑弹框 -->
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<view class="bg-white" style="height: 60vh;">
					<view class="grid grid-cols-3  items-center p35 border-bottom-dotted">
						<view class=""></view>
						<view class="text30 font-bold text-center col205D57">新增/修改收货地址</view>
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
						<view class="btnForm">
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
			}
		},
		created() {
			//获取手机状态栏高度
		},
		mounted() {

		},
		watch: {},
		methods: {
			// 
			handleAddAddress() {
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