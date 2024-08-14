(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/hao-slider/hao-slider"],{

/***/ 444:
/*!**********************************************************************************************!*\
  !*** C:/Users/admin/Documents/HBuilderProjects/快鹿送酒小程序/components/hao-slider/hao-slider.vue ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hao_slider_vue_vue_type_template_id_78b4c8c4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hao-slider.vue?vue&type=template&id=78b4c8c4& */ 445);
/* harmony import */ var _hao_slider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hao-slider.vue?vue&type=script&lang=js& */ 447);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hao_slider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hao_slider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _hao_slider_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hao-slider.vue?vue&type=style&index=0&lang=scss& */ 449);
/* harmony import */ var _D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _hao_slider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _hao_slider_vue_vue_type_template_id_78b4c8c4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _hao_slider_vue_vue_type_template_id_78b4c8c4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _hao_slider_vue_vue_type_template_id_78b4c8c4___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/hao-slider/hao-slider.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 445:
/*!*****************************************************************************************************************************!*\
  !*** C:/Users/admin/Documents/HBuilderProjects/快鹿送酒小程序/components/hao-slider/hao-slider.vue?vue&type=template&id=78b4c8c4& ***!
  \*****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_hao_slider_vue_vue_type_template_id_78b4c8c4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./hao-slider.vue?vue&type=template&id=78b4c8c4& */ 446);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_hao_slider_vue_vue_type_template_id_78b4c8c4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_hao_slider_vue_vue_type_template_id_78b4c8c4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_hao_slider_vue_vue_type_template_id_78b4c8c4___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_hao_slider_vue_vue_type_template_id_78b4c8c4___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 446:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/admin/Documents/HBuilderProjects/快鹿送酒小程序/components/hao-slider/hao-slider.vue?vue&type=template&id=78b4c8c4& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 447:
/*!***********************************************************************************************************************!*\
  !*** C:/Users/admin/Documents/HBuilderProjects/快鹿送酒小程序/components/hao-slider/hao-slider.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_hao_slider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./hao-slider.vue?vue&type=script&lang=js& */ 448);
/* harmony import */ var _D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_hao_slider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_hao_slider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_hao_slider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_hao_slider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_hao_slider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 448:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/admin/Documents/HBuilderProjects/快鹿送酒小程序/components/hao-slider/hao-slider.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'hao-slider',
  data: function data() {
    return {
      sliderAcWidth: 0,
      //滑块位置
      sliderMax: 0,
      //滑动最大长度,rpx
      sliderOffset: 0,
      //滑块偏移量,px
      isStopMove: false,
      //是否停止滑块移动
      currentValue: 0 //当前值
    };
  },

  props: {
    //图片滑块
    imgSliderUrl: {
      type: String,
      default: ''
    },
    //最大值
    max: {
      type: Number,
      default: 100
    },
    //最小值
    min: {
      type: Number,
      default: 0
    },
    //当前值
    value: {
      type: Number,
      default: 0
    },
    //步长，取值必须大于 0，并且可被(max - min)整除
    step: {
      type: Number,
      default: 1
    },
    //是否禁用
    isDisabled: {
      type: Boolean,
      default: false
    },
    //滑条高度(rpx)
    sliderHeight: {
      type: Number,
      default: 8
    },
    //滑条宽度(rpx),默认100%
    sliderWidth: {
      type: Number,
      default: null
    },
    //滑块大小(rpx)
    sliderBlockSize: {
      type: Number,
      default: 30
    },
    //滑块右侧背景色
    sliderRightColor: {
      type: String,
      default: '#e9e9e9'
    },
    //滑块左侧已选择背景色
    sliderLeftColor: {
      type: String,
      default: '#2e8857'
    },
    //滑块颜色
    sliderBgColor: {
      type: String,
      default: '#ffffff'
    },
    //滑块阴影(当滑块不是图片时有效)
    sliderBlockShadow: {
      type: String,
      default: '0 0 16rpx #fff'
    },
    //圆角值(rpx)
    borderRadius: {
      type: String,
      default: '8rpx'
    },
    //value提示的文字大小
    tipSize: {
      type: Number,
      default: 22
    },
    //是否让滑块在滑条上方
    isSliderTop: {
      type: Boolean,
      default: false
    },
    //滑块离滑条的间距(isSliderTop为true时有效)
    topSpacing: {
      type: Number,
      default: 8
    },
    //是否显示滑块上方当前值
    isTip: {
      type: Boolean,
      default: true
    },
    //提示值与滑块或滑条的间距
    tipBlockSpacing: {
      type: Number,
      default: 20
    }
  },
  watch: {
    //当前值
    value: function value(n, o) {
      if (!this.isDisabled) {
        this.valueChange();
      }
    }
  },
  mounted: function mounted() {
    var _this = this;
    //获取video的位置信息
    uni.createSelectorQuery().in(this).select('.hao-slider').boundingClientRect(function (rect) {
      var aa = parseInt(rect.width);
      var width = Number(aa) / (uni.upx2px(100) / 100);
      _this.sliderOffset = parseInt(rect.left);
      _this.sliderMax = width;
      if (_this.value >= _this.min && _this.value <= _this.max) {
        _this.valueChange();
      } else {
        throw new Error('value应在min和max之间取值');
      }
    }).exec();
  },
  computed: {
    //步长值，rpx
    stepLength: function stepLength() {
      var gentle = this.max - this.min; //范围大小
      var partNum = gentle / this.step; //份数
      var length = this.sliderMax / partNum; //每步的长度。rpx
      console.log('步长', length);
      return length;
      // if(length < 2){
      // 	return 2;
      // }else{
      // 	return parseInt(length);
      // }
    },
    //滑块垂直位置
    blockTop: function blockTop() {
      return -this.sliderBlockSize - this.topSpacing + 'rpx';
    },
    //value值提示垂直位置
    tipTop: function tipTop() {
      if (this.isSliderTop) {
        return -(this.tipSize * 1.5) - this.sliderBlockSize - this.topSpacing - this.tipBlockSpacing + 'rpx';
      } else {
        if (this.sliderHeight >= this.sliderBlockSize) {
          return -(this.tipSize * 1.5) - this.tipBlockSpacing + 'rpx';
        } else {
          var hh = (this.sliderHeight - this.sliderBlockSize) / 2;
          return -(this.tipSize * 1.5) - this.tipBlockSpacing + hh + 'rpx';
        }
      }
    }
  },
  methods: {
    //获取当前value值
    getCurrentValue: function getCurrentValue() {
      return this.currentValue;
    },
    //value变动，滑块跟着位置变动
    valueChange: function valueChange() {
      if (this.isStopMove) return; //拖拽滑块时，不让滑块随value值改变而移动

      if (this.value < this.max && this.value > this.min) {
        this.currentValue = this.value;
        var gentle = this.max - this.min; //范围大小
        var vvv = this.value - this.min;
        // let ff = (vvv/gentle).toFixed(2);//当前位置所处对应的百分比数
        var ff = vvv / gentle; //当前位置所处对应的百分比数
        var result = parseInt(ff * this.sliderMax); //当前位置
        this.judgmentJump(result); //移动
      } else if (this.value <= this.min) {
        this.currentValue = this.min;
        this.sliderAcWidth = 0;
      } else {
        this.currentValue = this.max;
        this.sliderAcWidth = this.sliderMax;
        this.$emit('end'); //结束
      }
    },
    //判断移动
    judgmentJump: function judgmentJump(result) {
      var spacing = Math.abs(result - this.sliderAcWidth); //间距
      var num = spacing / this.stepLength; //跳转份数
      //滑动了很远
      if (num >= 1) {
        var fuNum = parseInt(num);
        if (fuNum == num && num < fuNum + 0.5) {
          if (result <= this.sliderAcWidth) {
            this.sliderAcWidth = this.sliderAcWidth - this.stepLength * fuNum; //直接挺近到现在的位置
          } else {
            this.sliderAcWidth = this.sliderAcWidth + this.stepLength * fuNum; //直接挺近到现在的位置
          }
        } else {
          if (result <= this.sliderAcWidth) {
            this.sliderAcWidth = this.sliderAcWidth - this.stepLength * (fuNum + 1); //直接挺近到现在位置的更前一格
          } else {
            this.sliderAcWidth = this.sliderAcWidth + this.stepLength * (fuNum + 1); //直接挺近到现在位置的更后一格
          }
        }
      } else if (num > 0.5) {
        //只变换一格
        if (result <= this.sliderAcWidth) {
          this.sliderAcWidth -= this.stepLength;
        } else {
          this.sliderAcWidth += this.stepLength;
        }
      }
    },
    //点击跳转滑块
    changeSlider: function changeSlider(e) {
      if (this.isDisabled) return; //禁用
      var pageX = parseInt(e.touches[0].pageX); //滑动的位置
      var result = (pageX - this.sliderOffset) / (uni.upx2px(100) / 100); //转rpx
      // let ff = (result/this.sliderMax).toFixed(2);//当前位置所处对应的百分比数
      var ff = result / this.sliderMax; //当前位置所处对应的百分比数
      var percentage;
      if (ff > 0 && ff < 1) {
        percentage = parseInt(this.min + (this.max - this.min) * ff);
        this.sliderAcWidth = result;
      } else if (ff >= 1) {
        percentage = this.max;
        this.sliderAcWidth = this.sliderMax;
      } else {
        percentage = this.min;
        this.sliderAcWidth = 0;
      }
      this.currentValue = percentage;
      this.$emit('change', percentage);
      if (this.sliderAcWidth == this.sliderMax) {
        this.$emit('end'); //结束
      }
    },
    //滑动滑块
    sliderMove: function sliderMove(e) {
      if (this.isDisabled) return; //禁用
      var pageX = parseInt(e.touches[0].pageX); //滑动的位置
      var result = (pageX - this.sliderOffset) / (uni.upx2px(100) / 100); //转rpx
      if (0 < result && result < this.sliderMax) {
        this.judgmentJump(result); //移动

        // let ff = (result/this.sliderMax).toFixed(4);//当前位置所处对应的百分比数
        var ff = result / this.sliderMax; //当前位置所处对应的百分比数
        var percentage = parseInt(this.min + (this.max - this.min) * ff);
        this.currentValue = percentage;
        this.$emit('changeing', percentage); //返回当前值
      } else if (result <= 0) {
        this.$emit('changeing', 0); //返回当前值
        this.currentValue = this.min;
        this.sliderAcWidth = 0;
      } else {
        this.$emit('changeing', this.sliderMax); //返回当前值
        this.currentValue = this.max;
        this.sliderAcWidth = this.sliderMax;
        this.$emit('end'); //结束
      }
    },
    //点击滑块
    sliderStart: function sliderStart() {
      if (this.isDisabled) return; //禁用
      this.$emit('start');
      this.isStopMove = true;
    },
    //滑块滑动结束
    sliderEnd: function sliderEnd() {
      if (this.isDisabled) return; //禁用
      // let ff = (this.sliderAcWidth/this.sliderMax).toFixed(2);//当前位置所处对应的百分比数
      var ff = this.sliderAcWidth / this.sliderMax; //当前位置所处对应的百分比数
      var percentage;
      if (ff > 0 && ff < 1) {
        percentage = parseInt(this.min + (this.max - this.min) * ff);
      } else if (ff >= 1) {
        percentage = this.max;
      } else {
        percentage = this.min;
      }
      this.$emit('change', percentage);
      this.currentValue = percentage;
      this.isStopMove = false;
      if (this.sliderAcWidth == this.sliderMax) {
        this.$emit('end'); //结束
      }
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 449:
/*!********************************************************************************************************************************!*\
  !*** C:/Users/admin/Documents/HBuilderProjects/快鹿送酒小程序/components/hao-slider/hao-slider.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_hao_slider_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./hao-slider.vue?vue&type=style&index=0&lang=scss& */ 450);
/* harmony import */ var _D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_hao_slider_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_hao_slider_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_hao_slider_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_hao_slider_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBUILD_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_hao_slider_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 450:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/admin/Documents/HBuilderProjects/快鹿送酒小程序/components/hao-slider/hao-slider.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/hao-slider/hao-slider.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/hao-slider/hao-slider-create-component',
    {
        'components/hao-slider/hao-slider-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(444))
        })
    },
    [['components/hao-slider/hao-slider-create-component']]
]);
