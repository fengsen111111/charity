<template>
	<view class="">
		<view class="grid grid-cols-2 grid-row-gap36 grid-column-36">
			<view class="bg-white radius20 hidden" v-for="item in jfList" :key="item.id" >
				<image :src="item.cover_image"  @click="handUrl('/pages/components/pointsMallDetails/index?jf_id='+item.id)" class="w-full h206" mode=""></image>
				<view class="p20 text24">
					<view>{{item.name}}</view>
					<view class="flex justify-between items-center mt15">
						<view class="flex items-baseline text36 colD6B07A">{{item.integral}}<text
								class="ml10 text18">积分</text></view>
						<view class="col787878 text18">库存：{{item.stock}}</view>
					</view>
					<view class="btnForm_shop mt15" @click="handUrl('/pages/components/okOrder/index?jf_id='+item.id)">
						立即兑换
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			jfList: {
				type: Array,
				default: () => []
			}
		},
		components: {},
		data() {
			return {

			}
		},
		created() {
			//获取手机状态栏高度
		},
		mounted() {

		},
		watch: {},
		methods: {
			handUrl(item) {
				uni.navigateTo({
					url: item
				})
			},
		}
	}
</script>

<style>

</style>