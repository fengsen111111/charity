<template>
	<view class="">
		<hearch :title="'基本信息'" :isLeft="true" />
		<view class="p-3 text12">
			<view class="bg-whilt rending1 p-3">
				<view class="" v-for="item in [1,2,3]" :key="item">
					<view class="text-black mb-1">昵称</view>
					<view v-if="item!==3">
						<uni-easyinput class="uni-mt-5" trim="all" v-model="value" placeholder="输入昵称"></uni-easyinput>
						<view class="h-4"></view>
					</view>
					<view class="flex items-center pt-2" v-else>
						<image src="@/static/my/user.png" mode="" class="imageItem mt-3 space-x-2"></image>
						<view class="col486 space-x-2 mt-2" @click="handleUpload">
							替换
						</view>

					</view>
				</view>
			</view>
			<view class="h10"></view>
			<view class="h10"></view>
			<view class="bg486 text-whlie w-full py-3 rending2 text-center text16">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	import hearch from "@/components/hearch/index.vue"
	import {getUserInfo,getUpdateUserInfo} from "@/request/api.js"
	export default {
		components: {
			hearch
		},
		data() {
			return {
				active: false,
				value: '',
				avatarUrl: '', // 默认头像或空字符串

			};
		},
		onLoad() {},
		onShow() {

		},
		onHide() {},
		methods: {
			// 获取用户信息
			_getUserInfo(){
				getUserInfo().then((res)=>{
					console.log('获取用户信息');
				})
			},
			// 修改用户信息
			_getUpdateUserInfo(){
				getUpdateUserInfo({
					post_params:{
						mobile:'',//	手机号  
						nickname:'',//昵称  
						head_image:'',//头像图片的url  
					}
				})
			},
			handleUpload() {
				uni.chooseImage({
					count: 1, // 只允许上传一张图片
					sizeType: ['compressed'], // 压缩后的图片
					sourceType: ['album', 'camera'], // 从相册或相机获取
					success: (res) => {
						console.log('res',res);
						const tempFilePath = res.tempFilePaths[0];
						this.uploadAvatar(tempFilePath);
					}
				});
			},
			// 2
			uploadAvatar(tempFilePath) {
				// uni.uploadFile({
				// 	url: 'https://yourserver.com/upload', // 服务器接口地址
				// 	filePath: tempFilePath,
				// 	name: 'file', // 后端接收文件的字段名
				// 	formData: {
				// 		'user': 'test' // 其他附加数据，可以根据需要添加
				// 	},
				// 	success: (uploadFileRes) => {
				// 		console.log('上传成功', uploadFileRes);
				// 		const data = JSON.parse(uploadFileRes.data);
				// 		if (data.code === 200) {
				// 			this.avatarUrl = data.url; // 获取上传后的图片地址
				// 		} else {
				// 			console.log('上传失败');
				// 		}
				// 	},
				// 	fail: (err) => {
				// 		console.log('上传失败', err);
				// 	}
				// });
			}
		}
	};
</script>

<style>
	.imageItem {
		width: 3.25rem;
		height: 3.25rem;
	}
</style>