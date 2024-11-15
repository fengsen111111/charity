<template>
	<view>
		<hearchItem :isLeft="true" :title="'我的捐赠'" />
		<view class="text-center py20" v-if="loading">
			加载中...
		</view>
		<view class="p40 text28">
			<view v-for="item in donList" :key="item.create_time">
				<view class="flex justify-between ">
					<view>基金名称</view>
					<view class="col787878">{{item.donate_name}}</view>
				</view>
				<view class="flex justify-between mt20">
					<view></view>
					<view class="colD6B07A" @click="lookZS(item)">查看证书</view>
				</view>
				<view class="flex justify-between items-baseline">
					<view class="flex items-baseline">
						<view>捐赠</view>
						<view class="text60 colD6B07A ml10 font-bold">{{item.money}}</view>
						<view class="ml10">元</view>
					</view>
					<view class="col787878">{{item.create_time}}</view>
				</view>
				<view class="h1 bgEBEBEB my34"></view>
			</view>
			<view class="flex justify-between">
				<view @click="handleJJ(1)">上一页</view>
				<view class=""><text style="color: #D6B07A;">{{currentPage}}</text>{{'/'+Math.ceil(total/limit)}}</view>
				<view @click="handleJJ(2)">下一页</view>
			</view>
		</view>
		<!--  -->
		<uni-popup ref="popup" type="bottom" border-radius="10px 10px 0 0">
			<view class="">
				<view class="">
					<canvas id="my-canvas" canvas-id="my-canvas" disable-scroll="true"
						style="width: 375px; height: 500px;"></canvas>
				</view>
				<view class="flex mt20">
					<view @click="handBC" class="text-center col-white font-bold px20 py10 mx-auto"
						style="border: 1px solid white;">
						保存图片</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue'
	import {
		getMyDonateLogList
	} from '@/request/api.js'

	export default {
		components: {
			hearchItem,
		},
		data() {
			return {
				donList: [],
				limit: 10,
				currentPage: 1,
				loading: false,
				total: 0,

				itemObj: {
					code: "code",
					create_time: "2024-10-28",
					delete_status: "N",
					donate_id: "691447867830701446",
					donate_name: "九井镇回龙村慈善爱心基金",
					id: "691482065417273852",
					money: "0.01",
					name: "zz",
					out_trade_no: "691482065551494082",
					pay_time: "1730085071",
					status: "Y",
					update_time: "2024-10-28 11:10:59",
					user_id: "691471521939458445"
				}
			}
		},
		onReachBottom() {
			this.currentPage++;
			this._getMyDonateLogList();
		},
		onReady() {
			this._getMyDonateLogList();
		},
		methods: {
			generateImage() {
				uni.showLoading({
					title: '加载中'
				});
				const _this = this
				uni.downloadFile({
					url: 'https://api.qwcsh.com/uploads/resource/goods/20241115/698134944626510497.jpg',
					success(res) {
						const ctx = uni.createCanvasContext('my-canvas')
						ctx.drawImage(res.tempFilePath, 0, 0, 375, 500)
						// 设置文字样式
						ctx.setFontSize(12);
						ctx.setFillStyle('#898b8b'); // 
						ctx.fillText(_this.itemObj.out_trade_no, 180, 143); //编号
						ctx.setFontSize(20);
						ctx.setFillStyle('#000000'); // 
						ctx.fillText(_this.itemObj.name, 120, 183); //名字
						ctx.setFontSize(14);
						ctx.setFillStyle('#000000'); // 
						ctx.fillText(_this.itemObj.donate_name, 132, 300); //项目
						ctx.setFontSize(14);
						ctx.setFillStyle('red'); // 
						ctx.fillText(_this.itemObj.money + ' 元', 132, 331); //金额
						ctx.setFontSize(9);
						ctx.setFillStyle('#000000'); // 
						ctx.fillText(_this.itemObj.create_time, 250, 440); //日期
						ctx.draw() //生成
						// 绘制完成后生成图片
						ctx.draw(true, () => {
							console.log('11');
							uni.hideLoading()
						});
					}
				})

			},
			handBC() {
				uni.showLoading({
					title: '加载中'
				});
				// 保存
				uni.canvasToTempFilePath({
					canvasId: 'my-canvas',
					success: (res) => {
						console.log('生成的图片路径:', res.tempFilePath);
						uni.getImageInfo({
							src: res.tempFilePath,
							success: function(image) {
								/* 保存图片到手机相册 */
								uni.saveImageToPhotosAlbum({
									filePath: image.path,
									success: function() {
										uni.hideLoading()
										uni.showModal({
											title: '保存成功',
											content: '图片已成功保存到相册',
											showCancel: false
										});
									},
									complete(res) {
										uni.hideLoading()
										console.log(res);
									}
								});
							}
						});
					},
					fail: (err) => {
						console.error('生成图片失败:', err);
					},
				});
			},


			lookZS(item) {
				// 查看证书
				this.itemObj = item
				this.$refs.popup.open('center') //
				this.generateImage()
			},
			handleJJ(type) {
				if (type == 1) {
					// 上一页
					if (this.currentPage > 1) {
						this.currentPage--
						this._getMyDonateLogList()
					} else {
						uni.showToast({
							title: '已到最小页!',
							icon: 'error',
							duration: 1000
						});
					}
				} else {
					// 下一页
					if (Math.ceil(this.total / this.limit) >= this.currentPage + 1) {
						this.currentPage++
						this._getMyDonateLogList()
					} else {
						uni.showToast({
							title: '已到最后一页!',
							icon: 'error',
							duration: 1000
						});
					}

				}
			},
			_getMyDonateLogList() {
				this.loading = true;
				getMyDonateLogList({
					post_params: {
						currentPage: this.currentPage,
						perPage: this.limit
					}
				}).then((res) => {
					console.log('最新数据', res.data.data);
					// this.donList = this.donList.concat(res.data.data.list); // Append new data
					this.donList = res.data.data.list
					this.total = res.data.data.count
				}).catch(err => {
					console.error('获取数据失败', err);
				}).finally(() => {
					this.loading = false;
				});
			}
		}
	}
</script>

<style>
	.bg_zs {
		width: 700rpx;
		height: 1000rpx;
		background-size: 100% 100%;
	}
</style>