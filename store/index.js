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
	},
    mutations: {
		//相当于同步的操作
		loginStatus(state){
			state.login = true
		},
		// 用户数据存入
		setState(state,data){
			console.log('state',state);
			console.log('data',data);
		},
		configInfo(state){
			getConfig().then((res)=>{
			  state.config = res.data
			})
		},
		setToken(state,token){
			// console.log('state',state);
			// console.log('data',token);
			state.token = token
		}
	},
    actions: {
		//相当于异步的操作,不能直接改变state的值，只能通过触发mutations的方法才能改变
		
	}
})
export default store
