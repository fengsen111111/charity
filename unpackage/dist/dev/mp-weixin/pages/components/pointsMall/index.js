(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/components/pointsMall/index"],{100:function(n,e,t){"use strict";var o;t.r(e),t.d(e,"render",(function(){return r})),t.d(e,"staticRenderFns",(function(){return i})),t.d(e,"recyclableRender",(function(){return c})),t.d(e,"components",(function(){return o}));try{o={uniIcons:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(t.bind(null,199))}}}catch(s){if(-1===s.message.indexOf("Cannot find module")||-1===s.message.indexOf(".vue"))throw s;console.error(s.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var n=this,e=n.$createElement;n._self._c},c=!1,i=[];r._withStripped=!0},101:function(n,e,t){"use strict";t.r(e);var o=t(102),r=t.n(o);for(var c in o)["default"].indexOf(c)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(c);e["default"]=r.a},102:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=t(35),r=function(){t.e("components/hearchItem/index").then(function(){return resolve(t(185))}.bind(null,t)).catch(t.oe)},c=function(){t.e("components/shopItem/index").then(function(){return resolve(t(261))}.bind(null,t)).catch(t.oe)},i={components:{hearchItem:r,shopItem:c},data:function(){return{checkIndex:1,key_word:"",jfList:[],configInfo:{}}},created:function(){this._getGoodsList(),this.configInfo=this.$store.state.config},mounted:function(){},watch:{},methods:{_getGoodsList:function(){var n=this;(0,o.getGoodsList)({post_params:{key_word:this.key_word,integral:"",currentPage:1,perPage:20}}).then((function(e){console.log("积分商品",e.data.data.list),n.jfList=e.data.data.list}))},change:function(n){console.log("e:",n)},handleIndex:function(n){this.checkIndex=n}}};e.default=i},103:function(n,e,t){"use strict";t.r(e);var o=t(104),r=t.n(o);for(var c in o)["default"].indexOf(c)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(c);e["default"]=r.a},104:function(n,e,t){},97:function(n,e,t){"use strict";(function(n,e){var o=t(4);t(26);o(t(25));var r=o(t(98));n.__webpack_require_UNI_MP_PLUGIN__=t,e(r.default)}).call(this,t(1)["default"],t(2)["createPage"])},98:function(n,e,t){"use strict";t.r(e);var o=t(99),r=t(101);for(var c in r)["default"].indexOf(c)<0&&function(n){t.d(e,n,(function(){return r[n]}))}(c);t(103);var i,s=t(32),u=Object(s["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],i);u.options.__file="pages/components/pointsMall/index.vue",e["default"]=u.exports},99:function(n,e,t){"use strict";t.r(e);var o=t(100);t.d(e,"render",(function(){return o["render"]})),t.d(e,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(e,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(e,"components",(function(){return o["components"]}))}},[[97,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/components/pointsMall/index.js.map