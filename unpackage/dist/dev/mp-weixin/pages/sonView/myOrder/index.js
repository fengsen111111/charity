(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sonView/myOrder/index"],{225:function(e,t,r){"use strict";(function(e,t){var n=r(4);r(26);n(r(25));var a=n(r(226));e.__webpack_require_UNI_MP_PLUGIN__=r,t(a.default)}).call(this,r(1)["default"],r(2)["createPage"])},226:function(e,t,r){"use strict";r.r(t);var n=r(227),a=r(229);for(var i in a)["default"].indexOf(i)<0&&function(e){r.d(t,e,(function(){return a[e]}))}(i);var s,u=r(32),o=Object(u["default"])(a["default"],n["render"],n["staticRenderFns"],!1,null,null,null,!1,n["components"],s);o.options.__file="pages/sonView/myOrder/index.vue",t["default"]=o.exports},227:function(e,t,r){"use strict";r.r(t);var n=r(228);r.d(t,"render",(function(){return n["render"]})),r.d(t,"staticRenderFns",(function(){return n["staticRenderFns"]})),r.d(t,"recyclableRender",(function(){return n["recyclableRender"]})),r.d(t,"components",(function(){return n["components"]}))},228:function(e,t,r){"use strict";var n;r.r(t),r.d(t,"render",(function(){return a})),r.d(t,"staticRenderFns",(function(){return s})),r.d(t,"recyclableRender",(function(){return i})),r.d(t,"components",(function(){return n}));var a=function(){var e=this,t=e.$createElement;e._self._c},i=!1,s=[];a._withStripped=!0},229:function(e,t,r){"use strict";r.r(t);var n=r(230),a=r.n(n);for(var i in n)["default"].indexOf(i)<0&&function(e){r.d(t,e,(function(){return n[e]}))}(i);t["default"]=a.a},230:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(35),a=function(){r.e("components/hearch/index").then(function(){return resolve(r(363))}.bind(null,r)).catch(r.oe)},i=function(){Promise.all([r.e("common/vendor"),r.e("components/orderStatus/index")]).then(function(){return resolve(r(485))}.bind(null,r)).catch(r.oe)},s={components:{hearch:a,orderStatus:i},data:function(){return{active:!1,value:"",chenkIndex:2,textarea:"",datalist:[],tabsList:[{id:1,text:"全部"},{id:2,text:"待付款"},{id:3,text:"进行中"},{id:4,text:"待评价"},{id:5,text:"已完成"},{id:6,text:"退款/售后"}]}},onLoad:function(){},onShow:function(){},created:function(){this._getUserOrderList()},onHide:function(){},methods:{_getUserOrderList:function(e){var t=this;(0,n.getUserOrderList)({post_params:{currentPage:"",perPage:"",status:""}}).then((function(e){console.log("订单数据",e),t.datalist=[{id:"1",status:"a",after_sale_status:"a",delivey_status:"a",create_time:"12:12:12",order_num:"324312412212312",user_name:"张三",user_mobile:"14544554455",user_address:"四川省成都市武侯区世纪城天府大道中段588号天天小区快鸟驿站",distance:"1.1km",remark:"无备注",pay_price:"12.33",preferential_price:"1.33",worker_mobile:"18488448844",goods_list:[{goods_name:"五粮液股份五粮春二代菁萃浓香型白酒",taste_name:"甜酒",cover_image:"https://img.picui.cn/free/2024/08/16/66bf135fa40a3.png",volume:"550",size_number:"12",number:"666666",ice_number:"666666"}]},{id:"2",status:"c",after_sale_status:"a",delivey_status:"b",create_time:"12:12:12",order_num:"324312412212312",user_name:"张三",user_mobile:"14544554455",user_address:"四川省成都市武侯区世纪城天府大道中段588号天天小区快鸟驿站",distance:"1.1km",remark:"无备注",pay_price:"12.33",preferential_price:"1.33",worker_mobile:"18488448844",goods_list:[{goods_name:"五粮液股份五粮春二代菁萃浓香型白酒",taste_name:"甜酒",cover_image:"https://img.picui.cn/free/2024/08/16/66bf135fa40a3.png",volume:"550",size_number:"12",number:"666666",ice_number:"666666"}]},{id:"3",status:"c",after_sale_status:"a",delivey_status:"c",create_time:"12:12:12",order_num:"324312412212312",user_name:"张三",user_mobile:"14544554455",user_address:"四川省成都市武侯区世纪城天府大道中段588号天天小区快鸟驿站",distance:"1.1km",remark:"无备注",pay_price:"12.33",preferential_price:"1.33",worker_mobile:"18488448844",goods_list:[{goods_name:"五粮液股份五粮春二代菁萃浓香型白酒",taste_name:"甜酒",cover_image:"https://img.picui.cn/free/2024/08/16/66bf135fa40a3.png",volume:"550",size_number:"12",number:"666666",ice_number:"666666"}]},{id:"4",status:"d",after_sale_status:"a",delivey_status:"a",create_time:"12:12:12",order_num:"324312412212312",user_name:"张三",user_mobile:"14544554455",user_address:"四川省成都市武侯区世纪城天府大道中段588号天天小区快鸟驿站",distance:"1.1km",remark:"无备注",pay_price:"12.33",preferential_price:"1.33",worker_mobile:"18488448844",goods_list:[{goods_name:"五粮液股份五粮春二代菁萃浓香型白酒",taste_name:"甜酒",cover_image:"https://img.picui.cn/free/2024/08/16/66bf135fa40a3.png",volume:"550",size_number:"12",number:"666666",ice_number:"666666"}]},{id:"5",status:"e",after_sale_status:"a",delivey_status:"c",create_time:"12:12:12",order_num:"324312412212312",user_name:"张三",user_mobile:"14544554455",user_address:"四川省成都市武侯区世纪城天府大道中段588号天天小区快鸟驿站",distance:"1.1km",remark:"无备注",pay_price:"12.33",preferential_price:"1.33",worker_mobile:"18488448844",goods_list:[{goods_name:"五粮液股份五粮春二代菁萃浓香型白酒",taste_name:"甜酒",cover_image:"https://img.picui.cn/free/2024/08/16/66bf135fa40a3.png",volume:"550",size_number:"12",number:"666666",ice_number:"666666"}]}]}))},handleItem:function(e){this.chenkIndex=e}}};t.default=s}},[[225,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/sonView/myOrder/index.js.map