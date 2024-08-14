// 引入 request 文件
import request from './index.js'

const api = {
	CESHI: '/api/wl/yan/yiyan', // 语录 · 随机一言
}
 
// 
export const apiCeshi = (params) => {
	return request({
		url: api.CESHI,
		method: 'get',
		data: params,
        header: {} // 语录 · 随机一言
	})
}
