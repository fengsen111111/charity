// 全局请求封装
const base_url = 'https://api.52vmy.cn'
// 请求超出时间
const timeout = 5000
 
// 需要修改token，和根据实际修改请求头
export default (params) => {
	let url = params.url;
	let method = params.method || "get";
	let data = params.data || {};
	let header = {
		'Blade-Auth': uni.getStorageSync('token') || '',
		'Content-Type': 'application/json;charset=UTF-8',
		'Authorization': 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
		'Tenant-Id': uni.getStorageSync('tenantId') || 'xxx', // avue配置相关
		...params.header
	}
	if (method == "post") {
		header = {
			'Content-Type': 'application/json'
		};
	}
	return new Promise((resolve, reject) => {
		
		uni.showLoading({
			title: "加载中"
		})
		uni.request({
			url: base_url + url,
			method: method,
			header: header,
			data: data,
			success(response) {
				uni.hideLoading()
				const res = response
				// 根据返回的状态码做出对应的操作
				//获取成功
				// console.log(res.statusCode);
				if (res.statusCode == 200) {
					resolve(res.data);
				} else {
					uni.clearStorageSync()
					switch (res.statusCode) {
						case 401:
							uni.showModal({
								title: "提示",
								content: "请登录",
								showCancel: false,
								success() {
									// setTimeout(() => {
									// 	uni.navigateTo({
									// 		url: "/pages/login/index",
									// 	})
									// }, 1000);
									console.log('登录')
								},
							});
							break;
						case 404:
							uni.showToast({
								title: '请求地址不存在...',
								duration: 2000,
							})
							break;
						default:
							uni.showToast({
								title: '请重试...',
								duration: 2000,
							})
							break;
					}
				}
			},
			fail(err) {
				uni.hideLoading()
				console.log(err)
				if (err.errMsg.indexOf('request:fail') !== -1) {
					uni.showToast({
						title: '网络异常',
						icon: "error",
						duration: 2000
					})
				} else {
					uni.showToast({
						title: '未知异常',
						duration: 2000
					})
				}
				reject(err);
 
			},
			complete() {
				// 不管成功还是失败都会执行
				uni.hideLoading();
				uni.hideToast();
			}
		});
	}).catch(() => {});
};
