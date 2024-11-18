import Vue from 'vue'
import Vuex from 'vuex'
import {getSetting} from '@/request/api.js'
Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
		//公共的变量，这里的变量不能随便修改，只能通过触发mutations的方法才能改变
		login: true, //是否已经登录
		token: '',//token
		config:{},//设置数据
		userInfo:{
			mini_openid:''
		}
	},
    mutations: {
		//相当于同步的操作
		loginStatus(state){
			state.login = true //已登录
		},
		// setToken(state,token){
		// 	state.token = '$2y$10$cpujtJd0mpktPXd3jaIXAekJ4geHLQAqMG.jJGn6zU09rBAcUbJwK'
		// },
		setAppid(state,data){
			state.userInfo.mini_openid = data  //存入appid等
		},
		// 设置
		configInfo(state){
			getSetting().then((res)=>{
				console.log('设置数据',res.data.data);
			    state.config.open_image = res.data.data.open_image//开屏图片URL  
			    state.config.mobile = res.data.data.mobile//捐赠电话  
			    state.config.donate_times = res.data.data.donate_times//捐赠总次数  
			    state.config.donate_money = res.data.data.donate_money//捐赠总金额
			    state.config.service_agreement = res.data.data.service_agreement//服务协议  富文本 
			    state.config.areas = res.data.data.areas//加入志愿者->常驻区域
			    state.config.about_us = res.data.data.about_us//关于基金  富文本
			    state.config.about_us_images = res.data.data.about_us_images//关于基金 轮播图
			    state.config.integral = res.data.data.integral//积分区间：展示时，在后面拼接‘分’文字；如果这个字段不包含 中横线 ‘-’，那么就在后面拼接 ‘分以上’文字
			})
		},
		// 储存state
		setState(state){
			uni.setStorageSync('state', JSON.stringify(state))
		},
		// 取出state
		getState(state){
			const stateObj = uni.getStorageSync('state')
			// console.log('取出state',stateObj);
			if(stateObj){
				const objs = JSON.parse(stateObj)
				state.login = objs.login
				state.userInfo.mini_openid = objs.userInfo.mini_openid
			}
		},
	},
    actions: {
		//相当于异步的操作,不能直接改变state的值，只能通过触发mutations的方法才能改变
		
	}
})
export default store
