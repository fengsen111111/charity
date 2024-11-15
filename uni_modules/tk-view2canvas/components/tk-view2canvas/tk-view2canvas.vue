<template>
	<view>
	</view>
</template>
 
<script>
	let promiseIndex = 0
	let promiseArray = []
	let imageArray = []
	let imageIndex = 0
	export default {
		name: "kt-view2canvas",
		data() {
			return {
 
			};
		},
		props: {
			canvasWidth: {
				type: Number,
				default: 1080
			},
			canvasHeight: {
				type: Number,
				default: 2500
			}
		},
		methods: {
 
			//rpx转换为px的工具函数
			rpxtopx(rpx) {
				let deviceWidth = wx.getSystemInfoSync().windowWidth; //获取设备屏幕宽度
				let px = (deviceWidth / 750) * Number(rpx)
				return Math.floor(px);
			},
 
			drawCanvas(arrayInfo) {
				promiseIndex = 0
				promiseArray = []
				imageArray = []
				imageIndex = 0
				uni.showLoading({
					title: '保存中...'
				})
				// 0.创建canvas及ctx,并获取屏幕的dpr
				const canvas = wx.createOffscreenCanvas({
					type: '2d',
					width: this.canvasWidth,
					height: this.canvasHeight
				})
				const ctx = canvas.getContext('2d')
 
				const dpr = uni.getWindowInfo().pixelRatio
 
				// 1.根据数组数量创建promise数组
				for (let i = 0; i < arrayInfo.length; i++) {
					promiseArray.push(promiseIndex)
					promiseIndex++
				}
 
				// 2.根据数组给promise数组赋值
				let that = this
				for (let i = 0; i < arrayInfo.length; i++) {
					promiseArray[i] = new Promise(function(resolve, reject) {
						if (arrayInfo[i].type == 'text') {
							resolve()
						} else if (arrayInfo[i].type == 'view') {
							resolve()
						} else if (arrayInfo[i].type == 'image') {
							let img = canvas.createImage()
							img.src = arrayInfo[i].src
							img.onload = function() {
								imageArray.push(img)
								resolve()
							}
							img.src = arrayInfo[i].src + `?${new Date().getTime()}`
						}
					})
				}
 
				// 3.异步全部加载完成后，绘制图片
				let p = Promise.all(promiseArray)
				p.then(function() {
					//根据数组顺序绘制图片
					for (let i = 0; i < arrayInfo.length; i++) {
						if (arrayInfo[i].type == 'text') {
							ctx.fillStyle = arrayInfo[i].color
							ctx.font = that.rpxtopx(arrayInfo[i].size) * dpr + 'px sans-serif'
							ctx.textBaseline = 'top'
							ctx.fillText(arrayInfo[i].word, arrayInfo[i].posX * dpr, (arrayInfo[i].posY + that
								.rpxtopx(20)) * dpr)
						} else if (arrayInfo[i].type == 'view') {
							ctx.fillStyle = arrayInfo[i].bgColor
							ctx.fillRect(arrayInfo[i].posX * dpr, arrayInfo[i].posY * dpr, arrayInfo[i].width *
								dpr, arrayInfo[i].height * dpr)
						} else if (arrayInfo[i].type == 'image') {
							ctx.drawImage(imageArray[imageIndex], arrayInfo[i].posX * dpr, arrayInfo[i].posY * dpr,
								arrayInfo[i].width * dpr, arrayInfo[i].height * dpr)
							imageIndex++
						}
					}
					const fileData = canvas.toDataURL()
					const fs = uni.getFileSystemManager()
					const path = `${wx.env.USER_DATA_PATH}/` + new Date().getTime() + `hello.png`
					//数据归零
					promiseIndex = 0
					promiseArray = []
					imageArray = []
					imageIndex = 0
					fs.writeFile({
						filePath: path,
						data: fileData.replace(/^data:image\/\w+;base64,/, ""),
						encoding: 'base64',
						success(res) {
							uni.showShareImageMenu({
								path: path,
								success: res => {
									console.log(res);
								}
							})
						},
						fail(res) {
							console.error(res)
						},
						complete() {
							uni.hideLoading()
						}
					})
				})
			}
		}
	}
</script>
 
<style>
 
</style>