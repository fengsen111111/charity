<template>
	<view class="">
		<top :title="'快鹿送酒'">
			<view class="text-center">
				<image src="@/static/home/oneSpikes.png" mode="" class="imgText"></image>
			</view>
		</top>
		<view class="">
			<view class="bgF9 p-3" >
				<view class="w90 mt-3">
					<shopCardTwo>
						<view class="space-x-4">
							<view class="btnRig space-x-6 text-whlie rending2 px-3 py-2">
								去抢购
							</view>
						</view>
					</shopCardTwo>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import top from "@/pages/sonView/volume/components/top/index.vue"
	import shopCardTwo from '@/components/shopCardTwo/index.vue'
	export default {
		data() {
			return {
				active: false
			};
		},
		components:{top,shopCardTwo},
		onLoad() {},
		onShow() {
			
		},
		onHide() {
		},
		methods: {
		}
	};
</script>

<style>
	.btnRig{
		background: linear-gradient( 270deg, #FA311D 0%, #FF8E34 100%);
	}
	.imgText{
		position: relative;
		top: 1rem;
		width: 100%;
		height: 4rem;
	}
</style>