// 引入 request 文件
import { get, post } from './index.js'
const base_url = 'https://api.52vmy.cn'

const api = {
	CESHI: base_url+'/api/wl/yan/yiyan', // 语录 · 随机一言
}
 
// 
export const apiCeshi = (params) => {
	return get(api.CESHI,params)
}
