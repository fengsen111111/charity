<template>
	<view class="">
		<hearchItem :isLeft="true" :title="'加入志愿者'" />
		<view class="py30 px36" v-if="submitShow">
			<view class="py30 text24 bg-white radius10 px36">
				<view class="titleView">
					<view class="ml20 col205D57 font-bold">基础信息填写</view>
				</view>
				<view class="flex justify-between py30">
					<view class="">姓名</view>
					<view class="text-right"><input type="text" placeholder="请输入姓名..." v-model="form.name"
							class=" col205D57" /></view>
				</view>
				<view class="borderF0F0F0"></view>
				<view class="flex justify-between py30">
					<view class="">性别</view>
					<view class="">
						<uni-data-checkbox v-model="form.gender" :localdata="sexs" />
					</view>
				</view>
				<view class="borderF0F0F0"></view>
				<!-- 	<view class="flex justify-between py30">
					<view class="">出生日期</view>
					<view class="pickerView">
						<uni-datetime-picker ref="pickerView" type="date" :clear-icon="false" v-model="form.time"
							@maskClick="maskClick" />
					</view>
					<view class="col21A3E6" @click="handleTime">{{form.time?form.time:'选择'}}</view>
				</view>
				<view class="borderF0F0F0"></view> -->
				<view class="flex justify-between py30">
					<view class="">手机号</view>
					<view class="text-right"><input type="text" placeholder="请输入手机号..." v-model="form.mobile"
							class=" col205D57" /></view>
				</view>
				<view class="borderF0F0F0"></view>
				<view class="flex justify-between py30">
					<view class="">身份证号</view>
					<view class="text-right"><input type="text" placeholder="请输入身份证号..." v-model="form.id_card"
							class=" col205D57" /></view>
				</view>
				<view class="borderF0F0F0"></view>
				<!-- <view class="flex justify-between py30">
					<view class="">获取验证码</view>
					<view class="flex items-center ">
						<input type="text" placeholder="请输入验证码..." v-model="form.code" class="w160 col205D57" />
						<view class="col21A3E6 ml10">重发</view>
					</view>
				</view>
				<view class="borderF0F0F0"></view> -->
				<view class="flex justify-between py30">
					<view class="">特长</view>
					<view class="text-right"><input type="text" placeholder="请输入特长..." v-model="form.skills"
							class=" col205D57" /></view>
				</view>

				<!-- 协议 -->
				<view class="flex mt176">
					<view class="mx-auto">
						<view class="flex items-center ">
							<uni-icons type="checkbox-filled" color="#205D57" size="20"></uni-icons>
							<view class="ml10 flex">
								<view class="col787878">勾选同意志愿者</view>
								<view class="col21A3E6">服务协议</view>
							</view>
						</view>
					</view>
				</view>
				<view class="btnForm mt30" @click="btnSubmit">
					提交申请
				</view>
				<!-- 留白 -->
				<view class="h170"></view>
				<view class="h160"></view>
			</view>
		</view>
		<!-- 提交 -->
		<view class="py30 text-center px36" v-else>
			<view class="flex mt176">
				<view class="mx-auto ">
					<image src="../../../static/volunter_null.png" class="volunterImg" mode=""></image>
				</view>
			</view>
			<view class="mt36 font-bold col205D57 text48">提交成功</view>
		</view>

		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content">
				<view class="text-center py22">
					常驻区域
				</view>
				<view class="flex justify-between p20" @click="handleArea(item)" v-for="item in form.areas"
					:key="item.value">
					<view class="">{{item.label}}</view>
					<view v-if="index_areas == item.value">
						<uni-icons type="checkmarkempty" size="16" color="#205D57"></uni-icons>
					</view>
				</view>
				<view class="h40"></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue'
	import {
		joinTeam
	} from '@/request/api.js'

	export default {
		components: {
			hearchItem,
		},
		data() {
			return {
				form: {
					time: '', //S
					name: '',
					gender: 1,
					mobile: '',
					id_card: '',
					skills: '',
					areas: [],
				},
				sexs: [{
					text: '男',
					value: 1
				}, {
					text: '女',
					value: 2
				}],
				// 
				submitShow: false,

				index_areas: ''
			}
		},
		onLoad(option) {
			console.log('option', option.submitShow);
			this.submitShow = option.submitShow
			this.$refs.popup.open('bottom')
			this.form.areas = this.$store.state.config.areas //四大区域
		},
		mounted() {

		},
		watch: {},
		methods: {
			handleArea(item) {
				this.index_areas = item.value
				this.$refs.popup.close()
			},
			// 提交
			btnSubmit() {
				uni.showLoading();
				setTimeout(() => {
					uni.hideLoading();
				}, 500)
				joinTeam({
					post_params: {
						name: this.form.name,
						gender: this.form.gender == 1 ? '男' : '女',
						mobile: this.form.mobile,
						id_card: this.form.id_card,
						skills: this.form.skills,
						area_id: this.index_areas
					}
				}).then(() => {
					console.log('数据提交结果', res.data.data);
					if (res.data.code == 1) {
						uni.showToast({
							title: '提交成功!',
							icon: 'success',
							duration: 1000
						});
						this.submitShow = true
					}

				})

			},
			// 打开时间
			handleTime() {
				this.$refs.pickerView.show();
			},
			confirm() {
				uni.showToast({
					title: '搜索'
				})
			},
			maskClick(e) {
				console.log('maskClick事件:', e);
			}
		}
	}
</script>

<style>
	.volunterImg {
		width: 182rpx;
		height: 156rpx;
	}

	.pickerView {
		position: fixed;
		bottom: -100px;
	}

	.img_null {
		width: 200rpx;
		height: 130rpx;
	}
</style>