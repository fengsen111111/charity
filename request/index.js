// 创建请求函数
const request = (options) => {
	// 请求拦截器
	if (options.interceptRequest) {
		options = options.interceptRequest(options);
	}
	// uni.showLoading({
	// 	title: "加载中"
	// })
	return new Promise((resolve, reject) => {
		uni.request({
			...options,
			success: (response) => {
				setTimeout(() => {
					uni.hideLoading()
				}, 3000)
				// 响应拦截器
				if (options.interceptResponse) {
					const newResponse = options.interceptResponse(response);
					if (newResponse) {
						resolve(newResponse);
						return;
					}
				}
				resolve(response);
			},
			fail: (error) => {
				setTimeout(() => {
					uni.hideLoading()
				}, 3000)
				reject(error);
			},
		});
	});
};

// 默认拦截器示例
const interceptRequest = (options) => {
	const token = uni.getStorageSync('token')
	// 在这里添加请求头或其他处理逻辑
	options.header = {
		...options.header,
		Authorization: token, // 示例：添加 token\
	};
	return options;
};

const interceptResponse = (response) => {
	// console.log('响应拦截器', response);
	// 例如，处理特定状态码
	const {
		code,
		message
	} = response.data
	if (response.statusCode == 200) {
		// console.log('code', Number(code));
		switch (Number(code)) {
			case -999:
				uni.showToast({
					icon: 'error',
					title: message,
					duration: 2000
				})
				return response;
			case -3:
				uni.showToast({
					icon: 'error',
					title: '没有操作权限!',
					duration: 2000
				})
				return false;
			case -2:
				uni.showToast({
					icon: 'error',
					title: '登陆异常!',
					duration: 2000
				})
				return false;
			case -1:
				uni.showToast({
					icon: 'error',
					title: '前往登陆！',
					duration: 2000,
				})
				uni.clearStorageSync()
				uni.redirectTo({
					url: '/pages/index/index'
				});
				return false;
			case 0:
				uni.showToast({
					icon: 'error',
					title: message+'!',
					duration: 2000
				})
				return false;
			default:
				return response;
		}
	} else {
		// 请求失败
		return response; // 执行后续的 resolve
	}

	// if (Number(response.statusCode) === 999) {
	// 	// 重定向到登录页面
	// 	uni.redirectTo({
	// 		url: '/pages/sonView/login/index'
	// 	});
	// 	return null; // 阻止后续的 resolve
	// }else if ()
	// return response;
};

// 封装的 GET 请求
const get = (url, data = {}, options = {}) => {
	// console.log('get')
	return request({
		url,
		data,
		method: 'GET',
		interceptRequest,
		interceptResponse,
		...options,
	});
};

// 封装的 POST 请求
const post = (url, data = {}, options = {}) => {
	// console.log('post')
	return request({
		url,
		data,
		method: 'POST',
		interceptRequest,
		interceptResponse,
		...options,
	});
};

export {
	get,
	post
};