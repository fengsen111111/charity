// 引入 request 文件
import request from './index.js'

const api = {
	STATUS_INFO: '/study/studyInfo/page', // 自定义
}
 
// 
export const pageStudyInfo = (params) => {
	return request({
		url: api.STATUS_INFO,
		method: 'get',
		data: params,
        header: {} // 自定义
	})
}
