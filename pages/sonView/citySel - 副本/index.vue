<template>
	<view class="">
		<hearch :title="'城市选择'" :isLeft="true" />
		<view class="p-3 text12">
			<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers">
			</map>
		</view>
	</view>
</template>

<script>
	import hearch from "@/components/hearch/index.vue"
	export default {
		components: {
			hearch
		},
		data() {
			return {
				id: 999, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 30.64242,
				longitude: 104.04311,
				width: 60,
				height: 100,
				covers: [{
					latitude: 30.64242,
					longitude: 104.04311,
					iconPath: '../../../static/location.png'
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '../../../static/location.png'
				}]
			};
		},
		onLoad() {},
		created() {
			// 请求地理位置权限
			uni.authorize({
				scope: 'scope.userLocation',
				success() {
					console.log('授权成功');
					uni.getLocation({
						type: 'gcj02',
						success(res) {
							console.log('位置获取成功:', res);
							// 处理获取到的位置数据
							const {
								latitude,
								longitude
							} = res
							this.latitude = latitude
							this.longitude = longitude
						},
						fail(err) {
							console.error('位置获取失败:', err);
							// 处理位置获取失败的情况
						}
					});
				},
				fail() {
					console.log('授权失败');
					// 处理授权失败的情况，比如提示用户去设置中手动开启
				}
			});
		},
		onHide() {},
		methods: {}
	};
</script>

<style>
</style>