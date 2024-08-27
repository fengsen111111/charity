// 引入 request 文件
import {
	get,
	post
} from './index.js'
const base_url = 'https://beverage.api.sczhiyun.net'

const api = {
	GETAREAS: base_url + '/factory_system/Base/getAreas', // 获取行政区
	GETAREAS_BYLOACTION: base_url + '/factory_system/Base/getAreasByLocation', // 根据坐标获取行政区
	PHONE_NUMBER: base_url + '/factory_system/Base/getWechatPhoneNumber', // 获取用户微信手机号
	USER_REGISTER: base_url + '/factory_system/Base/wechatUserRegister', // 微信授权

	// 优惠卷
	COPON_NEWUSER_LIST: base_url + '/beverage/Coupon/getNewUserCouponList', // 获取新人优惠券列表
	STORE_COPIN_LIST: base_url + '/beverage/Coupon/getStoreCouponList', // 获取门店/商品优惠券列表
	COPON_RECEIVE: base_url + '/beverage/UserCoupon/receiveCoupon', // 领取优惠券
	COPON_RECEIVE_NEW: base_url + '/beverage/UserCoupon/receiveNewUserCoupon', // 一键领取新人优惠券
	COPON_USER_LIST: base_url + '/beverage/UserCoupon/getUserCouponList', // 获取用户优惠券列表

	// 其他
	CONFIG: base_url + '/beverage/Setting/getConfig', // 获取基本配置项
	TEXT_CONTENT: base_url + '/beverage/Setting/getRichTextContent', // 获取富文本内容
	BANNER_LIST: base_url + '/beverage/Banner/getBannerList', // 获取轮播图列表
	GET_HOTCITY: base_url + '/beverage/Setting/getHotCity', // 获取热门城市
	GET_USER_CITY: base_url + '/beverage/Setting/getUserCity', // 获取用户下单城市
	HOTKEY_WORDS: base_url + '/beverage/Setting/getHotKeyWords', // 获取热门搜索词
	STORE_FIND_STORE: base_url + '/beverage/Store/findStore', // 根据定位/选择的区县获取门店信息

	// 商品
	GOODS_TYPE_LIST: base_url + '/beverage/GoodsType/getIndexGoodsTypeList', // 获取门店商品一级分类列表
	GET_GOODS_TYPE_LIST: base_url + '/beverage/GoodsType/getGoodsTypeList', // 获取门店所有商品分类列表
	GOODS_LIST: base_url + '/beverage/Goods/getGoodsList', // 获取门店商品列表：规格相关字段暂未提供
	
	// 用户
	LOGIN_AND_REGISTER: base_url + '/beverage/User/loginAndRegister', // 登陆与注册
	EDIT_USERINFO: base_url + '/beverage/User/updateUserInfo', // 修改用户信息
	USER_INFO: base_url + '/accompany/User/getUserInfo', // 获取用户信息
    EDIT_ADDRESS: base_url + '/beverage/Address/editAddresst', // 添加/修改用户收货地址
	ADDRESS_LIST: base_url + '/beverage/Address/getAddressList', // 获取用户收货地址列表
	DEL_ADDRESS: base_url + '/beverage/Address/deleteAddress', // 删除用户收货地址
	EDIT_BANK: base_url + '/beverage/Bank/editBank', // 添加/修改用户银行卡
	BANK_LIST: base_url + '/beverage/Bank/getBankList', // 获取用户银行卡列表
	DEL_BANK: base_url + '/beverage/Bank/deleteBank', // 删除用户银行卡
	PROMOTER_MSG: base_url + '/beverage/User/getPromoterMsg', // 获取推广人信息
	TEAM_USER_LIST: base_url + '/beverage/User/getTeamUserList', // 获取团队信息
    SUBMIT_WITHDRAWAL: base_url + '/beverage/Withdrawal/submitWithdrawal', // 申请提现
	WITHDRAWAL_LIST: base_url + '/beverage/Withdrawal/getWithdrawalList', // 获取提现记录列表
	MONEY_LOG_LIST: base_url + '/beverage/MoneyLog/getMoneyLogList', // 获取收益明细
}

// 用户 ----------------------------------------------------------------------
// 获取提现记录列表
export const getWithdrawalList = (params) => {
	return post(api.WITHDRAWAL_LIST, params)
}
// 获取收益明细
export const getMoneyLogList = (params) => {
	return post(api.MONEY_LOG_LIST, params)
}
// 申请提现
export const submitWithdrawal = (params) => {
	return post(api.SUBMIT_WITHDRAWAL, params)
}
// 获取团队信息
export const getTeamUserList = (params) => {
	return post(api.TEAM_USER_LIST, params)
}
// 获取推广人信息
export const getPromoterMsg = (params) => {
	return post(api.PROMOTER_MSG, params)
}
// 添加/修改用户银行卡
export const editBank = (params) => {
	return post(api.EDIT_BANK, params)
}
// 获取用户银行卡列表
export const getBankList = (params) => {
	return post(api.BANK_LIST, params)
}
// 删除用户银行卡
export const deleteBank = (params) => {
	return post(api.DEL_BANK, params)
}

// 登陆与注册
export const getLoginAndRegister = (params) => {
	return post(api.LOGIN_AND_REGISTER, params)
}
// 修改用户信息
export const getUpdateUserInfo = (params) => {
	return post(api.EDIT_USERINFO, params)
}
// 获取用户信息
export const getUserInfo = (params) => {
	return post(api.USER_INFO, params)
}
// 添加/修改用户收货地址
export const editAddresst = (params) => {
	return post(api.EDIT_ADDRESS, params)
}
// 获取用户收货地址列表
export const getAddressList = (params) => {
	return post(api.ADDRESS_LIST, params)
}
// 删除用户收货地址
export const deleteAddress = (params) => {
	return post(api.DEL_ADDRESS, params)
}
// 用户  end ----------------------------------------------------------------------

// 商品  --------------------------------------------
// 获取门店商品一级分类列表
export const getIndexGoodsTypeList = (params) => {
	return post(api.GOODS_TYPE_LIST, params)
}
// 获取门店所有商品分类列表
export const getGoodsTypeList = (params) => {
	return post(api.GET_GOODS_TYPE_LIST, params)
}
// 获取门店商品列表
export const getGoodsList = (params) => {
	return post(api.GOODS_LIST, params)
}

// 商品 end --------------------------------------------


// 其他  --------------------------------------------
// 获取基本配置项
export const getConfig = (params) => {
	return post(api.CONFIG, params)
}
//获取富文本内容
export const getRichTextContent = (params) => {
	return post(api.TEXT_CONTENT, params)
}
//获取轮播图列表
export const getBannerList = (params) => {
	return post(api.BANNER_LIST, params)
}
//获取热门城市
export const getHotCity = (params) => {
	return post(api.GET_HOTCITY, params)
}
//获取用户下单城市
export const getUserCity = (params) => {
	return post(api.GET_USER_CITY, params)
}
//获取热门搜索词
export const getHotKeyWords = (params) => {
	return post(api.HOTKEY_WORDS, params)
}
//根据定位/选择的区县获取门店信息
export const getFindStore = (params) => {
	return post(api.STORE_FIND_STORE, params)
}

// 其他 end  --------------------------------------------

// 优惠卷  --------------------------------------------
// 获取新人优惠券列表
export const getNewUserCouponList = (params) => {
	return post(api.COPON_NEWUSER_LIST, params)
}
// 获取门店/商品优惠券列表
export const getStoreCouponList = (params) => {
	return post(api.STORE_COPIN_LIST, params)
}
// 领取优惠券
export const getReceiveCoupon = (params) => {
	return post(api.COPON_RECEIVE, params)
}
// 一键领取新人优惠券
export const getReceiveNewUserCoupon = (params) => {
	return post(api.COPON_RECEIVE_NEW, params)
}
// 获取用户优惠券列表
export const getUserCouponList = (params) => {
	return post(api.COPON_USER_LIST, params)
}


// 优惠卷 end --------------------------------------------


// 获取行政区
export const getAreas = (params) => {
	return post(api.GETAREAS, params)
}
// 根据坐标获取行政区
export const getAreasByLocation = (params) => {
	return post(api.GETAREAS_BYLOACTION, params)
}
// 获取用户微信手机号
export const getPhoneNumber = (params) => {
	return post(api.PHONE_NUMBER, params)
}
// 微信授权
export const getUserRegister = (params) => {
	return post(api.USER_REGISTER, params)
}