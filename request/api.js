// 引入 request 文件
import {
	get,
	post
} from './index.js'
// const base_url = 'https://donate.api.sczhiyun.net'  //测试地址
const base_url = 'https://api.qwcsh.com/'

const api = {
	GET_SETTING: base_url + '/donate/Setting/getSetting', // 设置
	GET_BANNER_LIST: base_url + '/donate/Banner/getBannerList', // 轮播图
	GET_BANNER_DETAILS: base_url + '/donate/Banner/getBannerDetail', // 轮播图富文本详情
	LOGIN_AND_REGISTER: base_url + '/donate/User/loginAndRegister', // 登陆与注册
	GET_USER_INFO: base_url + '/donate/User/getUserInfo', // 获取用户信息
	GET_INTEGRAL_LIST: base_url + '/donate/User/getIntegralList', // 获取积分日志列表
	JOIN_TEAM: base_url + '/donate/User/joinTeam', // 加入志愿者
	EDIT_USERINFO: base_url + '/donate/User/updateUserInfo', // 修改用户信息
	EDIT_ADDRESS: base_url + '/donate/Address/editUserAddress', // 添加/修改用户收货信息
	// SET_DEFAULT_ADDRESS: base_url + '/donate/UserAddress/setDefaultUserAddress', // 设置用户收货信息为默认
	DEL_ADDRESS: base_url + '/donate/Address/deleteUserAddress', // 删除用户收货信息
	ADDRESS_LIST: base_url + '/donate/Address/getUserAddressList', // 获取用户收货信息列表
	ADDRESS_DETAILS: base_url + '/donate/Address/getUserAddressDetail', // 获取用户收货信息详情
	SHOP_LIST: base_url + '/donate/Goods/getGoodsList', // 积分商品列表
	SHOP_DETAILS: base_url + '/donate/Goods/getGoodsDetail', // 积分商品详情
	ADD_ORDER: base_url + '/donate/IntegralOrder/addOrder', // 下单
	ORDER_LIST: base_url + '/donate/IntegralOrder/getOrderList', // 获取订单列表
	OVER_ORDER: base_url + '/donate/IntegralOrder/overOrder', // 收货
	ACTIBE_TYPE_LIST: base_url + '/donate/ActivityType/getActivityTypeList', // 活动类型列表
	ACTIBE_LIST: base_url + '/donate/Activity/getActivityList', // 活动列表
	ACTIBE_DETAILS: base_url + '/donate/Activity/getActivityDetail', // 活动详情
	ACTIBE_JOIN: base_url + '/donate/ActivityOrder/joinActivity', // 活动报名
	ACTIBE_LIST_ORDER: base_url + '/donate/ActivityOrder/getActivityOrderList', // 我参与的活动列表
	OVER_ACTIBE_ORDER: base_url + '/donate/ActivityOrder/overActivityOrder', // 核销报名
	LOG_LIST: base_url + '//donate/DonateOrder/getDonateOrderList', // 最新的捐赠记录列表
	DONATE_LIST_TYPE: base_url + '/donate/FundType/getDonateTypeList', // 基金类型列表
	DONATE_LIST: base_url + '/donate/Donate/getDonateList', // 基金列表
	DONATE_DETAILS: base_url + '/donate/Donate/getDonateDetail', // 基金详情
	DONATE_JOIN: base_url + '/donate/DonateOrder/joinDonate', // 捐赠
	DONATE_LIST_MY: base_url + '/donate/DonateOrder/getMyDonateLogList', // 我的列表
	PHONE_NUMBER: base_url + '/factory_system/Base/getWechatPhoneNumber', // 获取用户微信手机号
	REGISTER: base_url + '/factory_system/Base/wechatUserRegister', // 微信授权
	// 上传
	FILE_TICKET: base_url + '/factory_storage/Ticket/getTicket', // 获取文件存储权限
	FILE_CONFIG: base_url + '/factory_storage/File/getUploadType', // 获取文件存储配置
	FILE_UPLOAD: base_url + '/factory_storage/File/uploadFile', // 上传文件到本地长期保存
	
}
// 获取文件存储权限
export const getTicket = (params) => {
	return post(api.FILE_TICKET, params)
}
 // 获取文件存储配置
export const getUploadType = (params) => {
	return post(api.FILE_CONFIG, params)
}
 // 上传文件到本地长期保存
export const uploadFile = (params) => {
	return post(api.FILE_UPLOAD, params)
}
// 获取用户微信手机号
export const wechatUserRegister = (params) => {
	return post(api.REGISTER, params)
}
// 获取用户微信手机号
export const getPhoneNumber = (params) => {
	return post(api.PHONE_NUMBER, params)
}
// 我的列表
export const getMyDonateLogList = (params) => {
	return post(api.DONATE_LIST_MY, params)
}
// 捐赠
export const joinDonate = (params) => {
	return post(api.DONATE_JOIN, params)
}
// 基金详情
export const getDonateDetail = (params) => {
	return post(api.DONATE_DETAILS, params)
}
// 基金列表
export const getDonateList = (params) => {
	return post(api.DONATE_LIST, params)
}
// 基金类型列表
export const getDonateTypeList = (params) => {
	return post(api.DONATE_LIST_TYPE, params)
}
// 最新的捐赠记录列表
export const getDonateOrderList = (params) => {
	return post(api.LOG_LIST, params)
}
// 核销报名
export const overActivityOrder = (params) => {
	return post(api.OVER_ACTIBE_ORDER, params)
}
// 我参与的活动列表
export const getActivityOrderList = (params) => {
	return post(api.ACTIBE_LIST_ORDER, params)
}
// 活动报名
export const joinActivity = (params) => {
	return post(api.ACTIBE_JOIN, params)
}
// 活动详情
export const getActivityDetail = (params) => {
	return post(api.ACTIBE_DETAILS, params)
}
// 活动列表
export const getActivityList = (params) => {
	return post(api.ACTIBE_LIST, params)
}
// 活动类型列表
export const getActivityTypeList = (params) => {
	return post(api.ACTIBE_TYPE_LIST, params)
}
// 收货
export const overOrder = (params) => {
	return post(api.OVER_ORDER, params)
}
// 获取订单列表
export const getOrderList = (params) => {
	return post(api.ORDER_LIST, params)
}
// 下单
export const addOrder = (params) => {
	return post(api.ADD_ORDER, params)
}
// 积分商品详情
export const getGoodsDetail = (params) => {
	return post(api.SHOP_DETAILS, params)
}
// 积分商品列表
export const getGoodsList = (params) => {
	return post(api.SHOP_LIST, params)
}
// 获取用户收货信息详情
export const getUserAddressDetail = (params) => {
	return post(api.ADDRESS_DETAILS, params)
}
// 获取用户收货信息列表
export const getUserAddressList = (params) => {
	return post(api.ADDRESS_LIST, params)
}
// 删除用户收货信息
export const deleteUserAddress = (params) => {
	return post(api.DEL_ADDRESS, params)
}
// 设置用户收货信息为默认
export const setDefaultUserAddress = (params) => {
	return post(api.SET_DEFAULT_ADDRESS, params)
}
// 添加/修改用户收货信息
export const editUserAddress = (params) => {
	return post(api.EDIT_ADDRESS, params)
}
// 修改用户信息
export const updateUserInfo = (params) => {
	return post(api.EDIT_USERINFO, params)
}
// 加入志愿者
export const joinTeam = (params) => {
	return post(api.JOIN_TEAM, params)
}
// 获取积分日志列表
export const getIntegralList = (params) => {
	return post(api.GET_INTEGRAL_LIST, params)
}
// 获取用户信息
export const getUserInfo = (params) => {
	return post(api.GET_USER_INFO, params)
}
// 登陆与注册
export const loginAndRegister = (params) => {
	return post(api.LOGIN_AND_REGISTER, params)
}
// 轮播图富文本详情
export const getBannerDetail = (params) => {
	return post(api.GET_BANNER_DETAILS, params)
}
// 轮播图
export const getBannerList = (params) => {
	return post(api.GET_BANNER_LIST, params)
}
// 设置
export const getSetting = (params) => {
	return post(api.GET_SETTING, params)
}
