<template>
	<view class="bg-white" style="height: 100vh;">
		<hearchItem :isLeft="true" :title="option.title?option.title:'内容详情'" />
		<view class="p40">
			<view v-if="!option.content">
				<view v-html="content"></view>
			</view>
			<view v-else>
				<view v-html="option.content"></view>
			</view>
			<!-- 为深入挖掘宣传社会各界力量在参与网络文明建设中涌现出的优秀典型和宝贵经验，充分彰显网络文明建设丰硕成果，激励带动全社会积极投身网络文明建设，共建网上美好精神家园，今年2月，中央宣传部办公厅、中央网信办秘书局联合发文开展2024年网络文明建设优秀案例征集展示活动。 8月28日，在2024年中国网络文明大会主论坛中，网络空间思想引领、文化培育、道德建设、行为规范、生态治理、文明创建等六个方面涌现出的50个优秀案例予以公布。大会现场，优秀案例展播视频以“光”作为线索，展示着网络文明建设领域的希望、连接、启迪和未来，生动诠释出网络文明建设的丰硕成果和未来愿景，进一步激发出广大网民群体的自豪感、积极性和行动力。网络文明建设取得的累累硕果，也正在跨越虚拟和现实的边界，为社会发展带来更为澎湃的动能。 -->
		</view>
	</view>
</template>

<script>
	import hearchItem from '@/components/hearchItem/index.vue'
	import {
		getOtherActivityDetail ,//活动详情2
		getBannerDetail//富文本详情
	} from '@/request/api.js'
	export default {
		components: {
			hearchItem,
		},
		data() {
			return {
				option: {
					content: ''
				}, //传递数据
				
				content:'',//
			}
		},
		onLoad(option) {
			console.log('onload', option);
			// console.log('option',option);
			this.option = option
			if (option.itemId) {
				this._getOtherActivityDetail(option.itemId)
			}
			if(option.title=='服务协议'){
				this.content = this.$store.state.config.service_agreement
				console.log('this.content',this.content);
			}
			if(option.fwbId){
				this._getBannerDetail(option.fwbId)
			}
		},
		mounted() {

		},
		watch: {},
		methods: {
			//轮播图详情
			_getBannerDetail(id) {
				getBannerDetail({
					post_params: {
						id: id
					}
				}).then((res) => {
					console.log('富文本数据', res.data.data);
				    this.content = res.data.data
				})
			},
			// 详情
			_getOtherActivityDetail(itemId) {
				getOtherActivityDetail({
					post_params: {
						id: itemId
					}
				}).then((res) => {
					console.log('富文本', res.data.data.content);
					this.content = res.data.data.content
				})
			}
		}
	}
</script>

<style>
	.img_null {
		width: 200rpx;
		height: 130rpx;
	}
</style>