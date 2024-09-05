import Vue from 'vue'
import Vuex from 'vuex'
import {getConfig} from '@/request/api.js'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		//公共的变量，这里的变量不能随便修改，只能通过触发mutations的方法才能改变
		login: true, //是否已经登录
		userInfo:{},//用户数据
		config:{},//config数据
		token: '',//token
		address: false,//店铺地址
		shopInfo:{},//门店信息
		
	},
    mutations: {
		//相当于同步的操作
		loginStatus(state){
			state.login = true //已登录
		},
		// 用户数据存入
		setState(state,data){
			console.log('state',state);
			console.log('data',data);
			state.userInfo = data  //存入appid等
		},
		configInfo(state){
			getConfig().then((res)=>{
				console.log('config',res.data);
			  state.config = res.data //存入config配置
			})
		},
		setToken(state,token){
			// console.log('state',state);
			// console.log('data',token);
			state.token = token// 存入token
		},
		addressStatus(state){
			state.address = true// 地址状态已选择
		},
		shopInfoSet(state,item){
			state.shopInfo = item// 存入店铺信息
		},
	},
    actions: {
		//相当于异步的操作,不能直接改变state的值，只能通过触发mutations的方法才能改变
		
	}
})
export default store
