<template>
	<view>
		<view class="h206">

		</view>
		<!-- 按钮 -->
		<button @click="generateImage">生成图片</button>

		<!-- canvas 组件 -->
		<canvas  id="my-canvas" canvas-id="my-canvas" disable-scroll="true"></canvas>
	</view>
</template>



<script>
	export default {
		methods: {
			// src: 'https://api.qwcsh.com/uploads/resource/goods/20241115/698134944626510497.jpg',
			generateImage() {
				uni.downloadFile({
				    url:'https://api.qwcsh.com/uploads/resource/goods/20241115/698134944626510497.jpg',
				    success(res){
						const ctx = uni.createCanvasContext('my-canvas')
						console.log(ctx)
						ctx.drawImage(res.tempFilePath, 0, 0, 500, 500)
						ctx.moveTo(10, 10)
						ctx.rect(10, 10, 100, 50)
						ctx.lineTo(110, 60)
						ctx.stroke()
						ctx.save()
						ctx.draw()
				    }
				})
			
			},

		},
	};
</script>
<style>
	#my-canvas {
		width: 100%;
		height: 500rpx;
		border: 1px solid red;
	}
</style>