// 引入 request 文件
import {
	get,
	post
} from './index.js'
const base_url = 'https://flower.api.sczhiyun.net'
// const base_url = 'https://beverage.api.sczhiyun.net'

const api = {
	GETAREAS: base_url + '/factory_system/Base/getAreas', // 获取行政区
	
}


// 获取行政区
export const getAreas = (params) => {
	return post(api.GETAREAS, params)
}
