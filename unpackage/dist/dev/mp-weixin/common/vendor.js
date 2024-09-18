(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!*********************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var objectKeys = ['qy', 'env', 'error', 'version', 'lanDebug', 'cloud', 'serviceMarket', 'router', 'worklet', '__webpack_require_UNI_MP_PLUGIN__'];
var singlePageDisableKey = ['lanDebug', 'router', 'worklet'];
var target = typeof globalThis !== 'undefined' ? globalThis : function () {
  return this;
}();
var key = ['w', 'x'].join('');
var oldWx = target[key];
var launchOption = oldWx.getLaunchOptionsSync ? oldWx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof oldWx[key] === 'function';
}
function initWx() {
  var newWx = {};
  for (var _key in oldWx) {
    if (isWxKey(_key)) {
      // TODO wrapper function
      newWx[_key] = oldWx[_key];
    }
  }
  return newWx;
}
target[key] = initWx();
var _default = target[key];
exports.default = _default;

/***/ }),
/* 2 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.createPlugin = createPlugin;
exports.createSubpackageApp = createSubpackageApp;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ 15));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 22);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var realAtob;
var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;
    var result = '';
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    var _getCurrentUserInfo = getCurrentUserInfo(),
      role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    var _getCurrentUserInfo2 = getCurrentUserInfo(),
      permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {
    var _getCurrentUserInfo3 = getCurrentUserInfo(),
      tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isObject(obj) {
  return obj !== null && (0, _typeof2.default)(obj) === 'object';
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function noop() {}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}
function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}
function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}
function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}
function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}
function wrapperHook(hook, params) {
  return function (data) {
    return hook(data, params) || data;
  };
}
function isPromise(obj) {
  return !!obj && ((0, _typeof2.default)(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
function queue(hooks, data, params) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      var res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}
function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res, options).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        // 重新访问 getApiInterceptorHooks, 允许 invoke 中再次调用 addInterceptor,removeInterceptor
        return api.apply(void 0, [wrapperOptions(getApiInterceptorHooks(method), options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}
var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  }
};
var SYNC_API_RE = /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS/;
var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];
var CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}
function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
function promisify(name, api) {
  if (!shouldPromise(name) || !isFn(api)) {
    return api;
  }
  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;
function checkDeviceWidth() {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
    platform = _wx$getSystemInfoSync.platform,
    pixelRatio = _wx$getSystemInfoSync.pixelRatio,
    windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}
function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}
var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';
var messages = {};
var locale;
{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}
initI18nMessages();
var i18n = (0, _uniI18n.initVueI18n)(locale, {});
var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {
    var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    }
  }
};
var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;
function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {
        return watch(v);
      });
    }
  });
}
function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  if (isFn(getApp)) {
    var app = getApp({
      allowDefault: true
    });
    if (app && app.$vm) {
      return app.$vm.$locale;
    }
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function setLocale$1(locale) {
  var app = isFn(getApp) ? getApp() : false;
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {
      return fn({
        locale: locale
      });
    });
    return true;
  }
  return false;
}
var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}
if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}
var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}
var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
  }
  result.deviceId = deviceId;
}
function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(result) {
  var _result$brand = result.brand,
    brand = _result$brand === void 0 ? '' : _result$brand,
    _result$model = result.model,
    model = _result$model === void 0 ? '' : _result$model,
    _result$system = result.system,
    system = _result$system === void 0 ? '' : _result$system,
    _result$language = result.language,
    language = _result$language === void 0 ? '' : _result$language,
    theme = result.theme,
    version = result.version,
    platform = result.platform,
    fontSizeSetting = result.fontSizeSetting,
    SDKVersion = result.SDKVersion,
    pixelRatio = result.pixelRatio,
    deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  var extraParam = {};

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__9075671",
    appName: "charity",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "4.24",
    uniRuntimeVersion: "4.24",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined
  };
  Object.assign(result, parameters, extraParam);
}
function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }
  return _hostName;
}
var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};
var showActionSheet = {
  args: function args(fromArgs) {
    if ((0, _typeof2.default)(fromArgs) === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  }
};
var getAppBaseInfo = {
  returnValue: function returnValue(result) {
    var _result = result,
      version = _result.version,
      language = _result.language,
      SDKVersion = _result.SDKVersion,
      theme = _result.theme;
    var _hostName = getHostName(result);
    var hostLanguage = language.replace('_', '-');
    result = sortObject(Object.assign(result, {
      appId: "__UNI__9075671",
      appName: "charity",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme
    }));
  }
};
var getDeviceInfo = {
  returnValue: function returnValue(result) {
    var _result2 = result,
      brand = _result2.brand,
      model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);
    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model
    }));
  }
};
var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);
    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {
    var locationReducedAccuracy = result.locationReducedAccuracy;
    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  }
};

// import navigateTo from 'uni-helpers/navigate-to'

var compressImage = {
  args: function args(fromArgs) {
    // https://developers.weixin.qq.com/community/develop/doc/000c08940c865011298e0a43256800?highLine=compressHeight
    if (fromArgs.compressedHeight && !fromArgs.compressHeight) {
      fromArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !fromArgs.compressWidth) {
      fromArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting,
  compressImage: compressImage
};
var todos = ['vibrate', 'preloadPage', 'unPreloadPage', 'loadSubPackage'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}
function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {
          // 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}
function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}
function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}
var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];
function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
      complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}
TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
};
function getProvider(_ref2) {
  var service = _ref2.service,
    success = _ref2.success,
    fail = _ref2.fail,
    complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}
var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});
var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();
function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}
function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}
var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});

/**
 * 框架内 try-catch
 */
/**
 * 开发者 try-catch
 */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}
function invokePushCallback(args) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  var _getApiCallbacks = getApiCallbacks(args),
    success = _getApiCallbacks.success,
    fail = _getApiCallbacks.fail,
    complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}
var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};
var baseInfo = wx.getAppBaseInfo && wx.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx.getSystemInfoSync();
}
var host = baseInfo ? baseInfo.host : null;
var shareVideoMessage = host && host.env === 'SAAASDK' ? wx.miniapp.shareVideoMessage : wx.shareVideoMessage;
var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  shareVideoMessage: shareVideoMessage,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback
});
var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];
function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function initBehavior(options) {
  return Behavior(options);
}
function isPage() {
  return !!this.route;
}
function initRelation(detail) {
  this.triggerEvent('__l', detail);
}
function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}
function syncRefs(refs, newRefs) {
  var oldKeys = (0, _construct2.default)(Set, (0, _toConsumableArray2.default)(Object.keys(refs)));
  var newKeys = Object.keys(newRefs);
  newKeys.forEach(function (key) {
    var oldValue = refs[key];
    var newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(function (value) {
      return oldValue.includes(value);
    })) {
      return;
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(function (key) {
    delete refs[key];
  });
  return refs;
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  var refs = {};
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs);
    }
  });
}
function handleLink(event) {
  var _ref3 = event.detail || event.value,
    vuePid = _ref3.vuePid,
    vueOptions = _ref3.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vueOptions.parent = parentVm;
}
function markMPComponent(component) {
  // 在 Vue 中标记为小程序组件
  var IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component;
}
function toSkip(obj) {
  var OB = '__ob__';
  var SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: (0, _defineProperty2.default)({}, SKIP, true)
    });
  }
  return obj;
}
var WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach(function (name) {
      var matches = name.match(WORKLET_RE);
      if (matches) {
        var workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});
function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initHook(name, options, isComponent) {
  var oldHook = options[name];
  options[name] = function () {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return oldHook.apply(this, args);
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;
  Component = function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}
var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}
function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }
  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }
  vueOptions = vueOptions.default || vueOptions;
  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }
  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}
function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}
function initUnknownHooks(mpOptions, vueOptions) {
  var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {
    return initHook$1(mpOptions, hook, excludes);
  });
}
function findHooks(vueOptions) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}
function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}
function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}
function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;
  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}
function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};
  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"charity","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }
  if (!isPlainObject(data)) {
    data = {};
  }
  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}
var PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }
  return behaviors;
}
function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: ''
        };
        properties.virtualHostClass = {
          type: null,
          value: ''
        };
      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }
  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }
        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties;
}
function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}
  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};
  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }
  if (hasOwn(event, 'markerId')) {
    event.detail = (0, _typeof2.default)(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }
  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }
  return event;
}
function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }
      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }
      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}
function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};
  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }
  return extraObj;
}
function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}
function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ? event.detail.__args__ || [event.detail] : [event.detail];
  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }
  var extraObj = processEventExtra(vm, extra, event, __args__);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}
var ONCE = '~';
var CUSTOM = '^';
function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}
function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}
function handleEvent(event) {
  var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;
    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });
  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}
var eventChannels = {};
function getEventChannel(id) {
  var eventChannel = eventChannels[id];
  delete eventChannels[id];
  return eventChannel;
}
var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];
function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}
function initScopedSlotsParams() {
  var center = {};
  var parents = {};
  function currentId(fn) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      fn(vueId);
    }
  }
  _vue.default.prototype.$hasSSP = function (vueId) {
    var slot = center[vueId];
    if (!slot) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return slot;
  };
  _vue.default.prototype.$getSSP = function (vueId, name, needAll) {
    var slot = center[vueId];
    if (slot) {
      var params = slot[name] || [];
      if (needAll) {
        return params;
      }
      return params[0];
    }
  };
  _vue.default.prototype.$setSSP = function (name, value) {
    var index = 0;
    currentId.call(this, function (vueId) {
      var slot = center[vueId];
      var params = slot[name] = slot[name] || [];
      params.push(value);
      index = params.length - 1;
    });
    return index;
  };
  _vue.default.prototype.$initSSP = function () {
    currentId.call(this, function (vueId) {
      center[vueId] = {};
    });
  };
  _vue.default.prototype.$callSSP = function () {
    currentId.call(this, function (vueId) {
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    });
  };
  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}
function parseBaseApp(vm, _ref4) {
  var mocks = _ref4.mocks,
    initRefs = _ref4.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);
  _vue.default.prototype.mpHost = "mp-weixin";
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = (0, _defineProperty2.default)({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {
        // hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });
  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);
      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }
  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);
  return appOptions;
}
function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}
function createApp(vm) {
  App(parseApp(vm));
  return vm;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};
function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];
    if (val === undefined) {
      return '';
    }
    if (val === null) {
      return encodeStr(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }
    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    isPage = _ref5.isPage,
    initRelation = _ref5.initRelation;
  var needVueOptions = arguments.length > 2 ? arguments[2] : undefined;
  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
    _initVueComponent2 = (0, _slicedToArray2.default)(_initVueComponent, 2),
    VueComponent = _initVueComponent2[0],
    vueOptions = _initVueComponent2[1];
  var options = _objectSpread({
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true
  }, vueOptions.options || {});
  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }
  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }
  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent];
  }
  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}
function parseComponent(vueComponentOptions, needVueOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  }, needVueOptions);
}
var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);
function parseBasePage(vuePageOptions) {
  var _parseComponent = parseComponent(vuePageOptions, true),
    _parseComponent2 = (0, _slicedToArray2.default)(_parseComponent, 2),
    pageOptions = _parseComponent2[0],
    vueOptions = _parseComponent2[1];
  initHooks(pageOptions.methods, hooks$1, vueOptions);
  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }
  {
    initWorkletMethods(pageOptions.methods, vueOptions.methods);
  }
  return pageOptions;
}
function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions);
}
function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}
function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}
function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true
  });
  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};
if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, extraApi[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}
wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 5 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 6);
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 7);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 10);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 6 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 7 */
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) {
        ;
      }
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 8 */
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 9 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 10 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 11 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 12 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 14);
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 13 */
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 14 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 15 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 16);
var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 17);
function _construct(t, e, r) {
  if (isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && setPrototypeOf(p, r.prototype), p;
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 16 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 17 */
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (module.exports = _isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 18 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ 19);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 20);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ 21);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 19 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 20 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 21 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 22 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;
exports.compileI18nJsonStr = compileI18nJsonStr;
exports.hasI18nJson = hasI18nJson;
exports.initVueI18n = initVueI18n;
exports.isI18nStr = isI18nStr;
exports.isString = void 0;
exports.normalizeLocale = normalizeLocale;
exports.parseI18nJson = parseI18nJson;
exports.resolveLocale = resolveLocale;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var isObject = function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
};
var defaultDelimiters = ['{', '}'];
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {
    (0, _classCallCheck2.default)(this, BaseFormatter);
    this._caches = Object.create(null);
  }
  (0, _createClass2.default)(BaseFormatter, [{
    key: "interpolate",
    value: function interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }]);
  return BaseFormatter;
}();
exports.Formatter = BaseFormatter;
var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
    startDelimiter = _ref2[0],
    endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char;
    }
  }
  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = Array.isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;
    }
    index++;
  }
  return compiled;
}
var LOCALE_ZH_HANS = 'zh-Hans';
exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';
exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';
exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';
exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';
exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  var lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
var I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {
    var locale = _ref3.locale,
      fallbackLocale = _ref3.fallbackLocale,
      messages = _ref3.messages,
      watcher = _ref3.watcher,
      formater = _ref3.formater;
    (0, _classCallCheck2.default)(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  (0, _createClass2.default)(I18n, [{
    key: "setLocale",
    value: function setLocale(locale) {
      var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }
  }, {
    key: "watchLocale",
    value: function watchLocale(fn) {
      var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    }
  }, {
    key: "add",
    value: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
  }, {
    key: "f",
    value: function f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    }
  }, {
    key: "t",
    value: function t(key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    }
  }]);
  return I18n;
}();
exports.I18n = I18n;
function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(function () {
      return appVm.$locale;
    }, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {
  var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;
  var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    var _ref4 = [messages, locale];
    locale = _ref4[0];
    messages = _ref4[1];
  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale = typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher
  });
  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
var isString = function isString(val) {
  return typeof val === 'string';
};
exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {
  var locale = _ref5.locale,
    locales = _ref5.locales,
    delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name]
      });
    }
  });
  localeValues.unshift({
    locale: locale,
    values: locales[locale]
  });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  } catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (Array.isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {
      return locales.indexOf(locale) > -1;
    });
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 23 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 24 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 25 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2023 Evan You
 * Released under the MIT License.
 */
<<<<<<< HEAD
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

=======
var a=Object.freeze({});function l(e){return void 0===e||null===e}function i(e){return void 0!==e&&null!==e}function n(e){return!0===e}function r(e){return!1===e}function u(e){return"string"===typeof e||"number"===typeof e||"symbol"===typeof e||"boolean"===typeof e}function o(e){return null!==e&&"object"===typeof e}var s=Object.prototype.toString;function d(e){return s.call(e).slice(8,-1)}function c(e){return"[object Object]"===s.call(e)}function v(e){return"[object RegExp]"===s.call(e)}function f(e){var t=parseFloat(String(e));return t>=0&&Math.floor(t)===t&&isFinite(e)}function h(e){return i(e)&&"function"===typeof e.then&&"function"===typeof e.catch}function b(e){return null==e?"":Array.isArray(e)||c(e)&&e.toString===s?JSON.stringify(e,null,2):String(e)}function p(e){var t=parseFloat(e);return isNaN(t)?e:t}function g(e,t){for(var a=Object.create(null),l=e.split(","),i=0;i<l.length;i++)a[l[i]]=!0;return t?function(e){return a[e.toLowerCase()]}:function(e){return a[e]}}var y=g("slot,component",!0),m=g("key,ref,slot,slot-scope,is");function _(e,t){if(e.length){var a=e.indexOf(t);if(a>-1)return e.splice(a,1)}}var w=Object.prototype.hasOwnProperty;function A(e,t){return w.call(e,t)}function x(e){var t=Object.create(null);return function(a){var l=t[a];return l||(t[a]=e(a))}}var S=/-(\w)/g,k=x((function(e){return e.replace(S,(function(e,t){return t?t.toUpperCase():""}))})),O=x((function(e){return e.charAt(0).toUpperCase()+e.slice(1)})),E=/\B([A-Z])/g,T=x((function(e){return e.replace(E,"-$1").toLowerCase()}));function C(e,t){function a(a){var l=arguments.length;return l?l>1?e.apply(t,arguments):e.call(t,a):e.call(t)}return a._length=e.length,a}function I(e,t){return e.bind(t)}var P=Function.prototype.bind?I:C;function D(e,t){t=t||0;var a=e.length-t,l=new Array(a);while(a--)l[a]=e[a+t];return l}function R(e,t){for(var a in t)e[a]=t[a];return e}function L(e){for(var t={},a=0;a<e.length;a++)e[a]&&R(t,e[a]);return t}function j(e,t,a){}var N=function(e,t,a){return!1},M=function(e){return e};function U(e,t){if(e===t)return!0;var a=o(e),l=o(t);if(!a||!l)return!a&&!l&&String(e)===String(t);try{var i=Array.isArray(e),n=Array.isArray(t);if(i&&n)return e.length===t.length&&e.every((function(e,a){return U(e,t[a])}));if(e instanceof Date&&t instanceof Date)return e.getTime()===t.getTime();if(i||n)return!1;var r=Object.keys(e),u=Object.keys(t);return r.length===u.length&&r.every((function(a){return U(e[a],t[a])}))}catch(s){return!1}}function B(e,t){for(var a=0;a<e.length;a++)if(U(e[a],t))return a;return-1}function F(e){var t=!1;return function(){t||(t=!0,e.apply(this,arguments))}}var V=["component","directive","filter"],$=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated","errorCaptured","serverPrefetch"],K={optionMergeStrategies:Object.create(null),silent:!1,productionTip:!0,devtools:!0,performance:!1,errorHandler:null,warnHandler:null,ignoredElements:[],keyCodes:Object.create(null),isReservedTag:N,isReservedAttr:N,isUnknownElement:N,getTagNamespace:j,parsePlatformTagName:M,mustUseProp:N,async:!0,_lifecycleHooks:$},q=/a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;function H(e){var t=(e+"").charCodeAt(0);return 36===t||95===t}function G(e,t,a,l){Object.defineProperty(e,t,{value:a,enumerable:!!l,writable:!0,configurable:!0})}var W=new RegExp("[^"+q.source+".$_\\d]");function z(e){if(!W.test(e)){var t=e.split(".");return function(e){for(var a=0;a<t.length;a++){if(!e)return;e=e[t[a]]}return e}}}var J,Z="__proto__"in{},Y="undefined"!==typeof window,Q="undefined"!==typeof WXEnvironment&&!!WXEnvironment.platform,X=Q&&WXEnvironment.platform.toLowerCase(),ee=Y&&window.navigator.userAgent.toLowerCase(),te=ee&&/msie|trident/.test(ee),ae=(ee&&ee.indexOf("msie 9.0"),ee&&ee.indexOf("edge/")>0),le=(ee&&ee.indexOf("android"),ee&&/iphone|ipad|ipod|ios/.test(ee)||"ios"===X),ie=(ee&&/chrome\/\d+/.test(ee),ee&&/phantomjs/.test(ee),ee&&ee.match(/firefox\/(\d+)/),{}.watch);if(Y)try{var ne={};Object.defineProperty(ne,"passive",{get:function(){}}),window.addEventListener("test-passive",null,ne)}catch(Ui){}var re=function(){return void 0===J&&(J=!Y&&!Q&&"undefined"!==typeof e&&(e["process"]&&"server"===e["process"].env.VUE_ENV)),J},ue=Y&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;function oe(e){return"function"===typeof e&&/native code/.test(e.toString())}var se,de="undefined"!==typeof Symbol&&oe(Symbol)&&"undefined"!==typeof Reflect&&oe(Reflect.ownKeys);se="undefined"!==typeof Set&&oe(Set)?Set:function(){function e(){this.set=Object.create(null)}return e.prototype.has=function(e){return!0===this.set[e]},e.prototype.add=function(e){this.set[e]=!0},e.prototype.clear=function(){this.set=Object.create(null)},e}();var ce=j,ve=j,fe=j,he=j,be="undefined"!==typeof console,pe=/(?:^|[-_])(\w)/g,ge=function(e){return e.replace(pe,(function(e){return e.toUpperCase()})).replace(/[-_]/g,"")};ce=function(e,t){var a=t?fe(t):"";K.warnHandler?K.warnHandler.call(null,e,t,a):be&&!K.silent&&console.error("[Vue warn]: "+e+a)},ve=function(e,t){be&&!K.silent&&console.warn("[Vue tip]: "+e+(t?fe(t):""))},he=function(e,t){if(e.$root===e)return e.$options&&e.$options.__file?""+e.$options.__file:"<Root>";var a="function"===typeof e&&null!=e.cid?e.options:e._isVue?e.$options||e.constructor.options:e,l=a.name||a._componentTag,i=a.__file;if(!l&&i){var n=i.match(/([^/\\]+)\.vue$/);l=n&&n[1]}return(l?"<"+ge(l)+">":"<Anonymous>")+(i&&!1!==t?" at "+i:"")};var ye=function(e,t){var a="";while(t)t%2===1&&(a+=e),t>1&&(e+=e),t>>=1;return a};fe=function(e){if(e._isVue&&e.$parent){var t=[],a=0;while(e&&"PageBody"!==e.$options.name){if(t.length>0){var l=t[t.length-1];if(l.constructor===e.constructor){a++,e=e.$parent;continue}a>0&&(t[t.length-1]=[l,a],a=0)}!e.$options.isReserved&&t.push(e),e=e.$parent}return"\n\nfound in\n\n"+t.map((function(e,t){return""+(0===t?"---\x3e ":ye(" ",5+2*t))+(Array.isArray(e)?he(e[0])+"... ("+e[1]+" recursive calls)":he(e))})).join("\n")}return"\n\n(found in "+he(e)+")"};var me=0,_e=function(){this.id=me++,this.subs=[]};function we(e){_e.SharedObject.targetStack.push(e),_e.SharedObject.target=e,_e.target=e}function Ae(){_e.SharedObject.targetStack.pop(),_e.SharedObject.target=_e.SharedObject.targetStack[_e.SharedObject.targetStack.length-1],_e.target=_e.SharedObject.target}_e.prototype.addSub=function(e){this.subs.push(e)},_e.prototype.removeSub=function(e){_(this.subs,e)},_e.prototype.depend=function(){_e.SharedObject.target&&_e.SharedObject.target.addDep(this)},_e.prototype.notify=function(){var e=this.subs.slice();K.async||e.sort((function(e,t){return e.id-t.id}));for(var t=0,a=e.length;t<a;t++)e[t].update()},_e.SharedObject={},_e.SharedObject.target=null,_e.SharedObject.targetStack=[];var xe=function(e,t,a,l,i,n,r,u){this.tag=e,this.data=t,this.children=a,this.text=l,this.elm=i,this.ns=void 0,this.context=n,this.fnContext=void 0,this.fnOptions=void 0,this.fnScopeId=void 0,this.key=t&&t.key,this.componentOptions=r,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=u,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1},Se={child:{configurable:!0}};Se.child.get=function(){return this.componentInstance},Object.defineProperties(xe.prototype,Se);var ke=function(e){void 0===e&&(e="");var t=new xe;return t.text=e,t.isComment=!0,t};function Oe(e){return new xe(void 0,void 0,void 0,String(e))}function Ee(e){var t=new xe(e.tag,e.data,e.children&&e.children.slice(),e.text,e.elm,e.context,e.componentOptions,e.asyncFactory);return t.ns=e.ns,t.isStatic=e.isStatic,t.key=e.key,t.isComment=e.isComment,t.fnContext=e.fnContext,t.fnOptions=e.fnOptions,t.fnScopeId=e.fnScopeId,t.asyncMeta=e.asyncMeta,t.isCloned=!0,t}var Te=Array.prototype,Ce=Object.create(Te),Ie=["push","pop","shift","unshift","splice","sort","reverse"];Ie.forEach((function(e){var t=Te[e];G(Ce,e,(function(){var a=[],l=arguments.length;while(l--)a[l]=arguments[l];var i,n=t.apply(this,a),r=this.__ob__;switch(e){case"push":case"unshift":i=a;break;case"splice":i=a.slice(2);break}return i&&r.observeArray(i),r.dep.notify(),n}))}));var Pe=Object.getOwnPropertyNames(Ce),De=!0;function Re(e){De=e}var Le=function(e){this.value=e,this.dep=new _e,this.vmCount=0,G(e,"__ob__",this),Array.isArray(e)?(Z?e.push!==e.__proto__.push?Ne(e,Ce,Pe):je(e,Ce):Ne(e,Ce,Pe),this.observeArray(e)):this.walk(e)};function je(e,t){e.__proto__=t}function Ne(e,t,a){for(var l=0,i=a.length;l<i;l++){var n=a[l];G(e,n,t[n])}}function Me(e,t){var a;if(o(e)&&!(e instanceof xe))return A(e,"__ob__")&&e.__ob__ instanceof Le?a=e.__ob__:!De||re()||!Array.isArray(e)&&!c(e)||!Object.isExtensible(e)||e._isVue||e.__v_isMPComponent||(a=new Le(e)),t&&a&&a.vmCount++,a}function Ue(e,t,a,l,i){var n=new _e,r=Object.getOwnPropertyDescriptor(e,t);if(!r||!1!==r.configurable){var u=r&&r.get,o=r&&r.set;u&&!o||2!==arguments.length||(a=e[t]);var s=!i&&Me(a);Object.defineProperty(e,t,{enumerable:!0,configurable:!0,get:function(){var t=u?u.call(e):a;return _e.SharedObject.target&&(n.depend(),s&&(s.dep.depend(),Array.isArray(t)&&Ve(t))),t},set:function(t){var r=u?u.call(e):a;t===r||t!==t&&r!==r||(l&&l(),u&&!o||(o?o.call(e,t):a=t,s=!i&&Me(t),n.notify()))}})}}function Be(e,t,a){if((l(e)||u(e))&&ce("Cannot set reactive property on undefined, null, or primitive value: "+e),Array.isArray(e)&&f(t))return e.length=Math.max(e.length,t),e.splice(t,1,a),a;if(t in e&&!(t in Object.prototype))return e[t]=a,a;var i=e.__ob__;return e._isVue||i&&i.vmCount?(ce("Avoid adding reactive properties to a Vue instance or its root $data at runtime - declare it upfront in the data option."),a):i?(Ue(i.value,t,a),i.dep.notify(),a):(e[t]=a,a)}function Fe(e,t){if((l(e)||u(e))&&ce("Cannot delete reactive property on undefined, null, or primitive value: "+e),Array.isArray(e)&&f(t))e.splice(t,1);else{var a=e.__ob__;e._isVue||a&&a.vmCount?ce("Avoid deleting properties on a Vue instance or its root $data - just set it to null."):A(e,t)&&(delete e[t],a&&a.dep.notify())}}function Ve(e){for(var t=void 0,a=0,l=e.length;a<l;a++)t=e[a],t&&t.__ob__&&t.__ob__.dep.depend(),Array.isArray(t)&&Ve(t)}Le.prototype.walk=function(e){for(var t=Object.keys(e),a=0;a<t.length;a++)Ue(e,t[a])},Le.prototype.observeArray=function(e){for(var t=0,a=e.length;t<a;t++)Me(e[t])};var $e=K.optionMergeStrategies;function Ke(e,t){if(!t)return e;for(var a,l,i,n=de?Reflect.ownKeys(t):Object.keys(t),r=0;r<n.length;r++)a=n[r],"__ob__"!==a&&(l=e[a],i=t[a],A(e,a)?l!==i&&c(l)&&c(i)&&Ke(l,i):Be(e,a,i));return e}function qe(e,t,a){return a?function(){var l="function"===typeof t?t.call(a,a):t,i="function"===typeof e?e.call(a,a):e;return l?Ke(l,i):i}:t?e?function(){return Ke("function"===typeof t?t.call(this,this):t,"function"===typeof e?e.call(this,this):e)}:t:e}function He(e,t){var a=t?e?e.concat(t):Array.isArray(t)?t:[t]:e;return a?Ge(a):a}function Ge(e){for(var t=[],a=0;a<e.length;a++)-1===t.indexOf(e[a])&&t.push(e[a]);return t}function We(e,t,a,l){var i=Object.create(e||null);return t?(et(l,t,a),R(i,t)):i}$e.el=$e.propsData=function(e,t,a,l){return a||ce('option "'+l+'" can only be used during instance creation with the `new` keyword.'),ze(e,t)},$e.data=function(e,t,a){return a?qe(e,t,a):t&&"function"!==typeof t?(ce('The "data" option should be a function that returns a per-instance value in component definitions.',a),e):qe(e,t)},$.forEach((function(e){$e[e]=He})),V.forEach((function(e){$e[e+"s"]=We})),$e.watch=function(e,t,a,l){if(e===ie&&(e=void 0),t===ie&&(t=void 0),!t)return Object.create(e||null);if(et(l,t,a),!e)return t;var i={};for(var n in R(i,e),t){var r=i[n],u=t[n];r&&!Array.isArray(r)&&(r=[r]),i[n]=r?r.concat(u):Array.isArray(u)?u:[u]}return i},$e.props=$e.methods=$e.inject=$e.computed=function(e,t,a,l){if(t&&et(l,t,a),!e)return t;var i=Object.create(null);return R(i,e),t&&R(i,t),i},$e.provide=qe;var ze=function(e,t){return void 0===t?e:t};function Je(e){for(var t in e.components)Ze(t)}function Ze(e){new RegExp("^[a-zA-Z][\\-\\.0-9_"+q.source+"]*$").test(e)||ce('Invalid component name: "'+e+'". Component names should conform to valid custom element name in html5 specification.'),(y(e)||K.isReservedTag(e))&&ce("Do not use built-in or reserved HTML elements as component id: "+e)}function Ye(e,t){var a=e.props;if(a){var l,i,n,r={};if(Array.isArray(a)){l=a.length;while(l--)i=a[l],"string"===typeof i?(n=k(i),r[n]={type:null}):ce("props must be strings when using array syntax.")}else if(c(a))for(var u in a)i=a[u],n=k(u),r[n]=c(i)?i:{type:i};else ce('Invalid value for option "props": expected an Array or an Object, but got '+d(a)+".",t);e.props=r}}function Qe(e,t){var a=e.inject;if(a){var l=e.inject={};if(Array.isArray(a))for(var i=0;i<a.length;i++)l[a[i]]={from:a[i]};else if(c(a))for(var n in a){var r=a[n];l[n]=c(r)?R({from:n},r):{from:r}}else ce('Invalid value for option "inject": expected an Array or an Object, but got '+d(a)+".",t)}}function Xe(e){var t=e.directives;if(t)for(var a in t){var l=t[a];"function"===typeof l&&(t[a]={bind:l,update:l})}}function et(e,t,a){c(t)||ce('Invalid value for option "'+e+'": expected an Object, but got '+d(t)+".",a)}function tt(e,t,a){if(Je(t),"function"===typeof t&&(t=t.options),Ye(t,a),Qe(t,a),Xe(t),!t._base&&(t.extends&&(e=tt(e,t.extends,a)),t.mixins))for(var l=0,i=t.mixins.length;l<i;l++)e=tt(e,t.mixins[l],a);var n,r={};for(n in e)u(n);for(n in t)A(e,n)||u(n);function u(l){var i=$e[l]||ze;r[l]=i(e[l],t[l],a,l)}return r}function at(e,t,a,l){if("string"===typeof a){var i=e[t];if(A(i,a))return i[a];var n=k(a);if(A(i,n))return i[n];var r=O(n);if(A(i,r))return i[r];var u=i[a]||i[n]||i[r];return l&&!u&&ce("Failed to resolve "+t.slice(0,-1)+": "+a,e),u}}function lt(e,t,a,l){var i=t[e],n=!A(a,e),r=a[e],u=dt(Boolean,i.type);if(u>-1)if(n&&!A(i,"default"))r=!1;else if(""===r||r===T(e)){var o=dt(String,i.type);(o<0||u<o)&&(r=!0)}if(void 0===r){r=it(l,i,e);var s=De;Re(!0),Me(r),Re(s)}return nt(i,e,r,l,n),r}function it(e,t,a){if(A(t,"default")){var l=t.default;return o(l)&&ce('Invalid default value for prop "'+a+'": Props with type Object/Array must use a factory function to return the default value.',e),e&&e.$options.propsData&&void 0===e.$options.propsData[a]&&void 0!==e._props[a]?e._props[a]:"function"===typeof l&&"Function"!==ot(t.type)?l.call(e):l}}function nt(e,t,a,l,i){if(e.required&&i)ce('Missing required prop: "'+t+'"',l);else if(null!=a||e.required){var n=e.type,r=!n||!0===n,u=[];if(n){Array.isArray(n)||(n=[n]);for(var o=0;o<n.length&&!r;o++){var s=ut(a,n[o]);u.push(s.expectedType||""),r=s.valid}}if(r){var d=e.validator;d&&(d(a)||ce('Invalid prop: custom validator check failed for prop "'+t+'".',l))}else ce(ct(t,a,u),l)}}var rt=/^(String|Number|Boolean|Function|Symbol)$/;function ut(e,t){var a,l=ot(t);if(rt.test(l)){var i=typeof e;a=i===l.toLowerCase(),a||"object"!==i||(a=e instanceof t)}else a="Object"===l?c(e):"Array"===l?Array.isArray(e):e instanceof t;return{valid:a,expectedType:l}}function ot(e){var t=e&&e.toString().match(/^\s*function (\w+)/);return t?t[1]:""}function st(e,t){return ot(e)===ot(t)}function dt(e,t){if(!Array.isArray(t))return st(t,e)?0:-1;for(var a=0,l=t.length;a<l;a++)if(st(t[a],e))return a;return-1}function ct(e,t,a){var l='Invalid prop: type check failed for prop "'+e+'". Expected '+a.map(O).join(", "),i=a[0],n=d(t),r=vt(t,i),u=vt(t,n);return 1===a.length&&ft(i)&&!ht(i,n)&&(l+=" with value "+r),l+=", got "+n+" ",ft(n)&&(l+="with value "+u+"."),l}function vt(e,t){return"String"===t?'"'+e+'"':"Number"===t?""+Number(e):""+e}function ft(e){var t=["string","number","boolean"];return t.some((function(t){return e.toLowerCase()===t}))}function ht(){var e=[],t=arguments.length;while(t--)e[t]=arguments[t];return e.some((function(e){return"boolean"===e.toLowerCase()}))}function bt(e,t,a){we();try{if(t){var l=t;while(l=l.$parent){var i=l.$options.errorCaptured;if(i)for(var n=0;n<i.length;n++)try{var r=!1===i[n].call(l,e,t,a);if(r)return}catch(Ui){gt(Ui,l,"errorCaptured hook")}}}gt(e,t,a)}finally{Ae()}}function pt(e,t,a,l,i){var n;try{n=a?e.apply(t,a):e.call(t),n&&!n._isVue&&h(n)&&!n._handled&&(n.catch((function(e){return bt(e,l,i+" (Promise/async)")})),n._handled=!0)}catch(Ui){bt(Ui,l,i)}return n}function gt(e,t,a){if(K.errorHandler)try{return K.errorHandler.call(null,e,t,a)}catch(Ui){Ui!==e&&yt(Ui,null,"config.errorHandler")}yt(e,t,a)}function yt(e,t,a){if(ce("Error in "+a+': "'+e.toString()+'"',t),!Y&&!Q||"undefined"===typeof console)throw e;console.error(e)}var mt,_t,wt=[],At=!1;function xt(){At=!1;var e=wt.slice(0);wt.length=0;for(var t=0;t<e.length;t++)e[t]()}if("undefined"!==typeof Promise&&oe(Promise)){var St=Promise.resolve();mt=function(){St.then(xt),le&&setTimeout(j)}}else if(te||"undefined"===typeof MutationObserver||!oe(MutationObserver)&&"[object MutationObserverConstructor]"!==MutationObserver.toString())mt="undefined"!==typeof setImmediate&&oe(setImmediate)?function(){setImmediate(xt)}:function(){setTimeout(xt,0)};else{var kt=1,Ot=new MutationObserver(xt),Et=document.createTextNode(String(kt));Ot.observe(Et,{characterData:!0}),mt=function(){kt=(kt+1)%2,Et.data=String(kt)}}function Tt(e,t){var a;if(wt.push((function(){if(e)try{e.call(t)}catch(Ui){bt(Ui,t,"nextTick")}else a&&a(t)})),At||(At=!0,mt()),!e&&"undefined"!==typeof Promise)return new Promise((function(e){a=e}))}var Ct=g("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,require"),It=function(e,t){ce('Property or method "'+t+'" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property. See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',e)},Pt=function(e,t){ce('Property "'+t+'" must be accessed with "$data.'+t+'" because properties starting with "$" or "_" are not proxied in the Vue instance to prevent conflicts with Vue internals. See: https://vuejs.org/v2/api/#data',e)},Dt="undefined"!==typeof Proxy&&oe(Proxy);if(Dt){var Rt=g("stop,prevent,self,ctrl,shift,alt,meta,exact");K.keyCodes=new Proxy(K.keyCodes,{set:function(e,t,a){return Rt(t)?(ce("Avoid overwriting built-in modifier in config.keyCodes: ."+t),!1):(e[t]=a,!0)}})}var Lt={has:function(e,t){var a=t in e,l=Ct(t)||"string"===typeof t&&"_"===t.charAt(0)&&!(t in e.$data);return a||l||(t in e.$data?Pt(e,t):It(e,t)),a||!l}},jt={get:function(e,t){return"string"!==typeof t||t in e||(t in e.$data?Pt(e,t):It(e,t)),e[t]}};_t=function(e){if(Dt){var t=e.$options,a=t.render&&t.render._withStripped?jt:Lt;e._renderProxy=new Proxy(e,a)}else e._renderProxy=e};var Nt,Mt,Ut=new se;function Bt(e){Ft(e,Ut),Ut.clear()}function Ft(e,t){var a,l,i=Array.isArray(e);if(!(!i&&!o(e)||Object.isFrozen(e)||e instanceof xe)){if(e.__ob__){var n=e.__ob__.dep.id;if(t.has(n))return;t.add(n)}if(i){a=e.length;while(a--)Ft(e[a],t)}else{l=Object.keys(e),a=l.length;while(a--)Ft(e[l[a]],t)}}}var Vt=Y&&window.performance;Vt&&Vt.mark&&Vt.measure&&Vt.clearMarks&&Vt.clearMeasures&&(Nt=function(e){return Vt.mark(e)},Mt=function(e,t,a){Vt.measure(e,t,a),Vt.clearMarks(t),Vt.clearMarks(a)});var $t=x((function(e){var t="&"===e.charAt(0);e=t?e.slice(1):e;var a="~"===e.charAt(0);e=a?e.slice(1):e;var l="!"===e.charAt(0);return e=l?e.slice(1):e,{name:e,once:a,capture:l,passive:t}}));function Kt(e,t){function a(){var e=arguments,l=a.fns;if(!Array.isArray(l))return pt(l,null,arguments,t,"v-on handler");for(var i=l.slice(),n=0;n<i.length;n++)pt(i[n],null,e,t,"v-on handler")}return a.fns=e,a}function qt(e,t,a,i,r,u){var o,s,d,c;for(o in e)s=e[o],d=t[o],c=$t(o),l(s)?ce('Invalid handler for event "'+c.name+'": got '+String(s),u):l(d)?(l(s.fns)&&(s=e[o]=Kt(s,u)),n(c.once)&&(s=e[o]=r(c.name,s,c.capture)),a(c.name,s,c.capture,c.passive,c.params)):s!==d&&(d.fns=s,e[o]=d);for(o in t)l(e[o])&&(c=$t(o),i(c.name,t[o],c.capture))}function Ht(e,t,a,n){var r=t.options.mpOptions&&t.options.mpOptions.properties;if(l(r))return a;var u=t.options.mpOptions.externalClasses||[],o=e.attrs,s=e.props;if(i(o)||i(s))for(var d in r){var c=T(d),v=Wt(a,s,d,c,!0)||Wt(a,o,d,c,!1);v&&a[d]&&-1!==u.indexOf(c)&&n[k(a[d])]&&(a[d]=n[k(a[d])])}return a}function Gt(e,t,a,n){var r=t.options.props;if(l(r))return Ht(e,t,{},n);var u={},o=e.attrs,s=e.props;if(i(o)||i(s))for(var d in r){var c=T(d),v=d.toLowerCase();d!==v&&o&&A(o,v)&&ve('Prop "'+v+'" is passed to component '+he(a||t)+', but the declared prop name is "'+d+'". Note that HTML attributes are case-insensitive and camelCased props need to use their kebab-case equivalents when using in-DOM templates. You should probably use "'+c+'" instead of "'+d+'".'),Wt(u,s,d,c,!0)||Wt(u,o,d,c,!1)}return Ht(e,t,u,n)}function Wt(e,t,a,l,n){if(i(t)){if(A(t,a))return e[a]=t[a],n||delete t[a],!0;if(A(t,l))return e[a]=t[l],n||delete t[l],!0}return!1}function zt(e){for(var t=0;t<e.length;t++)if(Array.isArray(e[t]))return Array.prototype.concat.apply([],e);return e}function Jt(e){return u(e)?[Oe(e)]:Array.isArray(e)?Yt(e):void 0}function Zt(e){return i(e)&&i(e.text)&&r(e.isComment)}function Yt(e,t){var a,r,o,s,d=[];for(a=0;a<e.length;a++)r=e[a],l(r)||"boolean"===typeof r||(o=d.length-1,s=d[o],Array.isArray(r)?r.length>0&&(r=Yt(r,(t||"")+"_"+a),Zt(r[0])&&Zt(s)&&(d[o]=Oe(s.text+r[0].text),r.shift()),d.push.apply(d,r)):u(r)?Zt(s)?d[o]=Oe(s.text+r):""!==r&&d.push(Oe(r)):Zt(r)&&Zt(s)?d[o]=Oe(s.text+r.text):(n(e._isVList)&&i(r.tag)&&l(r.key)&&i(t)&&(r.key="__vlist"+t+"_"+a+"__"),d.push(r)));return d}function Qt(e){var t=e.$options.provide;t&&(e._provided="function"===typeof t?t.call(e):t)}function Xt(e){var t=ea(e.$options.inject,e);t&&(Re(!1),Object.keys(t).forEach((function(a){Ue(e,a,t[a],(function(){ce('Avoid mutating an injected value directly since the changes will be overwritten whenever the provided component re-renders. injection being mutated: "'+a+'"',e)}))})),Re(!0))}function ea(e,t){if(e){for(var a=Object.create(null),l=de?Reflect.ownKeys(e):Object.keys(e),i=0;i<l.length;i++){var n=l[i];if("__ob__"!==n){var r=e[n].from,u=t;while(u){if(u._provided&&A(u._provided,r)){a[n]=u._provided[r];break}u=u.$parent}if(!u)if("default"in e[n]){var o=e[n].default;a[n]="function"===typeof o?o.call(t):o}else ce('Injection "'+n+'" not found',t)}}return a}}function ta(e,t){if(!e||!e.length)return{};for(var a={},l=0,i=e.length;l<i;l++){var n=e[l],r=n.data;if(r&&r.attrs&&r.attrs.slot&&delete r.attrs.slot,n.context!==t&&n.fnContext!==t||!r||null==r.slot)n.asyncMeta&&n.asyncMeta.data&&"page"===n.asyncMeta.data.slot?(a["page"]||(a["page"]=[])).push(n):(a.default||(a.default=[])).push(n);else{var u=r.slot,o=a[u]||(a[u]=[]);"template"===n.tag?o.push.apply(o,n.children||[]):o.push(n)}}for(var s in a)a[s].every(aa)&&delete a[s];return a}function aa(e){return e.isComment&&!e.asyncFactory||" "===e.text}function la(e,t,l){var i,n=Object.keys(t).length>0,r=e?!!e.$stable:!n,u=e&&e.$key;if(e){if(e._normalized)return e._normalized;if(r&&l&&l!==a&&u===l.$key&&!n&&!l.$hasNormal)return l;for(var o in i={},e)e[o]&&"$"!==o[0]&&(i[o]=ia(t,o,e[o]))}else i={};for(var s in t)s in i||(i[s]=na(t,s));return e&&Object.isExtensible(e)&&(e._normalized=i),G(i,"$stable",r),G(i,"$key",u),G(i,"$hasNormal",n),i}function ia(e,t,a){var l=function(){var e=arguments.length?a.apply(null,arguments):a({});return e=e&&"object"===typeof e&&!Array.isArray(e)?[e]:Jt(e),e&&(0===e.length||1===e.length&&e[0].isComment)?void 0:e};return a.proxy&&Object.defineProperty(e,t,{get:l,enumerable:!0,configurable:!0}),l}function na(e,t){return function(){return e[t]}}function ra(e,t){var a,l,n,r,u;if(Array.isArray(e)||"string"===typeof e)for(a=new Array(e.length),l=0,n=e.length;l<n;l++)a[l]=t(e[l],l,l,l);else if("number"===typeof e)for(a=new Array(e),l=0;l<e;l++)a[l]=t(l+1,l,l,l);else if(o(e))if(de&&e[Symbol.iterator]){a=[];var s=e[Symbol.iterator](),d=s.next();while(!d.done)a.push(t(d.value,a.length,l,l++)),d=s.next()}else for(r=Object.keys(e),a=new Array(r.length),l=0,n=r.length;l<n;l++)u=r[l],a[l]=t(e[u],u,l,l);return i(a)||(a=[]),a._isVList=!0,a}function ua(e,t,a,l){var i,n=this.$scopedSlots[e];n?(a=a||{},l&&(o(l)||ce("slot v-bind without argument expects an Object",this),a=R(R({},l),a)),i=n(a,this,a._i)||t):i=this.$slots[e]||t;var r=a&&a.slot;return r?this.$createElement("template",{slot:r},i):i}function oa(e){return at(this.$options,"filters",e,!0)||M}function sa(e,t){return Array.isArray(e)?-1===e.indexOf(t):e!==t}function da(e,t,a,l,i){var n=K.keyCodes[t]||a;return i&&l&&!K.keyCodes[t]?sa(i,l):n?sa(n,e):l?T(l)!==t:void 0}function ca(e,t,a,l,i){if(a)if(o(a)){var n;Array.isArray(a)&&(a=L(a));var r=function(r){if("class"===r||"style"===r||m(r))n=e;else{var u=e.attrs&&e.attrs.type;n=l||K.mustUseProp(t,u,r)?e.domProps||(e.domProps={}):e.attrs||(e.attrs={})}var o=k(r),s=T(r);if(!(o in n)&&!(s in n)&&(n[r]=a[r],i)){var d=e.on||(e.on={});d["update:"+r]=function(e){a[r]=e}}};for(var u in a)r(u)}else ce("v-bind without argument expects an Object or Array value",this);return e}function va(e,t){var a=this._staticTrees||(this._staticTrees=[]),l=a[e];return l&&!t||(l=a[e]=this.$options.staticRenderFns[e].call(this._renderProxy,null,this),ha(l,"__static__"+e,!1)),l}function fa(e,t,a){return ha(e,"__once__"+t+(a?"_"+a:""),!0),e}function ha(e,t,a){if(Array.isArray(e))for(var l=0;l<e.length;l++)e[l]&&"string"!==typeof e[l]&&ba(e[l],t+"_"+l,a);else ba(e,t,a)}function ba(e,t,a){e.isStatic=!0,e.key=t,e.isOnce=a}function pa(e,t){if(t)if(c(t)){var a=e.on=e.on?R({},e.on):{};for(var l in t){var i=a[l],n=t[l];a[l]=i?[].concat(i,n):n}}else ce("v-on without argument expects an Object value",this);return e}function ga(e,t,a,l){t=t||{$stable:!a};for(var i=0;i<e.length;i++){var n=e[i];Array.isArray(n)?ga(n,t,a):n&&(n.proxy&&(n.fn.proxy=!0),t[n.key]=n.fn)}return l&&(t.$key=l),t}function ya(e,t){for(var a=0;a<t.length;a+=2){var l=t[a];"string"===typeof l&&l?e[t[a]]=t[a+1]:""!==l&&null!==l&&ce("Invalid value for dynamic directive argument (expected string or null): "+l,this)}return e}function ma(e,t){return"string"===typeof e?t+e:e}function _a(e){e._o=fa,e._n=p,e._s=b,e._l=ra,e._t=ua,e._q=U,e._i=B,e._m=va,e._f=oa,e._k=da,e._b=ca,e._v=Oe,e._e=ke,e._u=ga,e._g=pa,e._d=ya,e._p=ma}function wa(e,t,l,i,r){var u,o=this,s=r.options;A(i,"_uid")?(u=Object.create(i),u._original=i):(u=i,i=i._original);var d=n(s._compiled),c=!d;this.data=e,this.props=t,this.children=l,this.parent=i,this.listeners=e.on||a,this.injections=ea(s.inject,i),this.slots=function(){return o.$slots||la(e.scopedSlots,o.$slots=ta(l,i)),o.$slots},Object.defineProperty(this,"scopedSlots",{enumerable:!0,get:function(){return la(e.scopedSlots,this.slots())}}),d&&(this.$options=s,this.$slots=this.slots(),this.$scopedSlots=la(e.scopedSlots,this.$slots)),s._scopeId?this._c=function(e,t,a,l){var n=La(u,e,t,a,l,c);return n&&!Array.isArray(n)&&(n.fnScopeId=s._scopeId,n.fnContext=i),n}:this._c=function(e,t,a,l){return La(u,e,t,a,l,c)}}function Aa(e,t,l,n,r){var u=e.options,o={},s=u.props;if(i(s))for(var d in s)o[d]=lt(d,s,t||a);else i(l.attrs)&&Sa(o,l.attrs),i(l.props)&&Sa(o,l.props);var c=new wa(l,o,r,n,e),v=u.render.call(null,c._c,c);if(v instanceof xe)return xa(v,l,c.parent,u,c);if(Array.isArray(v)){for(var f=Jt(v)||[],h=new Array(f.length),b=0;b<f.length;b++)h[b]=xa(f[b],l,c.parent,u,c);return h}}function xa(e,t,a,l,i){var n=Ee(e);return n.fnContext=a,n.fnOptions=l,(n.devtoolsMeta=n.devtoolsMeta||{}).renderContext=i,t.slot&&((n.data||(n.data={})).slot=t.slot),n}function Sa(e,t){for(var a in t)e[k(a)]=t[a]}_a(wa.prototype);var ka={init:function(e,t){if(e.componentInstance&&!e.componentInstance._isDestroyed&&e.data.keepAlive){var a=e;ka.prepatch(a,a)}else{var l=e.componentInstance=Ta(e,Xa);l.$mount(t?e.elm:void 0,t)}},prepatch:function(e,t){var a=t.componentOptions,l=t.componentInstance=e.componentInstance;il(l,a.propsData,a.listeners,t,a.children)},insert:function(e){var t=e.context,a=e.componentInstance;a._isMounted||(ol(a,"onServiceCreated"),ol(a,"onServiceAttached"),a._isMounted=!0,ol(a,"mounted")),e.data.keepAlive&&(t._isMounted?Al(a):rl(a,!0))},destroy:function(e){var t=e.componentInstance;t._isDestroyed||(e.data.keepAlive?ul(t,!0):t.$destroy())}},Oa=Object.keys(ka);function Ea(e,t,a,r,u){if(!l(e)){var s=a.$options._base;if(o(e)&&(e=s.extend(e)),"function"===typeof e){var d;if(l(e.cid)&&(d=e,e=qa(d,s),void 0===e))return Ka(d,t,a,r,u);t=t||{},Hl(e),i(t.model)&&Pa(e.options,t);var c=Gt(t,e,u,a);if(n(e.options.functional))return Aa(e,c,t,a,r);var v=t.on;if(t.on=t.nativeOn,n(e.options.abstract)){var f=t.slot;t={},f&&(t.slot=f)}Ca(t);var h=e.options.name||u,b=new xe("vue-component-"+e.cid+(h?"-"+h:""),t,void 0,void 0,void 0,a,{Ctor:e,propsData:c,listeners:v,tag:u,children:r},d);return b}ce("Invalid Component definition: "+String(e),a)}}function Ta(e,t){var a={_isComponent:!0,_parentVnode:e,parent:t},l=e.data.inlineTemplate;return i(l)&&(a.render=l.render,a.staticRenderFns=l.staticRenderFns),new e.componentOptions.Ctor(a)}function Ca(e){for(var t=e.hook||(e.hook={}),a=0;a<Oa.length;a++){var l=Oa[a],i=t[l],n=ka[l];i===n||i&&i._merged||(t[l]=i?Ia(n,i):n)}}function Ia(e,t){var a=function(a,l){e(a,l),t(a,l)};return a._merged=!0,a}function Pa(e,t){var a=e.model&&e.model.prop||"value",l=e.model&&e.model.event||"input";(t.attrs||(t.attrs={}))[a]=t.model.value;var n=t.on||(t.on={}),r=n[l],u=t.model.callback;i(r)?(Array.isArray(r)?-1===r.indexOf(u):r!==u)&&(n[l]=[u].concat(r)):n[l]=u}var Da=1,Ra=2;function La(e,t,a,l,i,r){return(Array.isArray(a)||u(a))&&(i=l,l=a,a=void 0),n(r)&&(i=Ra),ja(e,t,a,l,i)}function ja(e,t,a,l,n){if(i(a)&&i(a.__ob__))return ce("Avoid using observed data object as vnode data: "+JSON.stringify(a)+"\nAlways create fresh vnode data objects in each render!",e),ke();if(i(a)&&i(a.is)&&(t=a.is),!t)return ke();var r,o,s;(i(a)&&i(a.key)&&!u(a.key)&&ce("Avoid using non-primitive value as key, use string/number value instead.",e),Array.isArray(l)&&"function"===typeof l[0]&&(a=a||{},a.scopedSlots={default:l[0]},l.length=0),n===Ra?l=Jt(l):n===Da&&(l=zt(l)),"string"===typeof t)?(o=e.$vnode&&e.$vnode.ns||K.getTagNamespace(t),K.isReservedTag(t)?(i(a)&&i(a.nativeOn)&&ce("The .native modifier for v-on is only valid on components but it was used on <"+t+">.",e),r=new xe(K.parsePlatformTagName(t),a,l,void 0,void 0,e)):r=a&&a.pre||!i(s=at(e.$options,"components",t))?new xe(t,a,l,void 0,void 0,e):Ea(s,a,e,l,t)):r=Ea(t,a,e,l);return Array.isArray(r)?r:i(r)?(i(o)&&Na(r,o),i(a)&&Ma(a),r):ke()}function Na(e,t,a){if(e.ns=t,"foreignObject"===e.tag&&(t=void 0,a=!0),i(e.children))for(var r=0,u=e.children.length;r<u;r++){var o=e.children[r];i(o.tag)&&(l(o.ns)||n(a)&&"svg"!==o.tag)&&Na(o,t,a)}}function Ma(e){o(e.style)&&Bt(e.style),o(e.class)&&Bt(e.class)}function Ua(e){e._vnode=null,e._staticTrees=null;var t=e.$options,l=e.$vnode=t._parentVnode,i=l&&l.context;e.$slots=ta(t._renderChildren,i),e.$scopedSlots=a,e._c=function(t,a,l,i){return La(e,t,a,l,i,!1)},e.$createElement=function(t,a,l,i){return La(e,t,a,l,i,!0)};var n=l&&l.data;Ue(e,"$attrs",n&&n.attrs||a,(function(){!el&&ce("$attrs is readonly.",e)}),!0),Ue(e,"$listeners",t._parentListeners||a,(function(){!el&&ce("$listeners is readonly.",e)}),!0)}var Ba,Fa=null;function Va(e){_a(e.prototype),e.prototype.$nextTick=function(e){return Tt(e,this)},e.prototype._render=function(){var e,t=this,a=t.$options,l=a.render,i=a._parentVnode;i&&(t.$scopedSlots=la(i.data.scopedSlots,t.$slots,t.$scopedSlots)),t.$vnode=i;try{Fa=t,e=l.call(t._renderProxy,t.$createElement)}catch(Ui){if(bt(Ui,t,"render"),t.$options.renderError)try{e=t.$options.renderError.call(t._renderProxy,t.$createElement,Ui)}catch(Ui){bt(Ui,t,"renderError"),e=t._vnode}else e=t._vnode}finally{Fa=null}return Array.isArray(e)&&1===e.length&&(e=e[0]),e instanceof xe||(Array.isArray(e)&&ce("Multiple root nodes returned from render function. Render function should return a single root node.",t),e=ke()),e.parent=i,e}}function $a(e,t){return(e.__esModule||de&&"Module"===e[Symbol.toStringTag])&&(e=e.default),o(e)?t.extend(e):e}function Ka(e,t,a,l,i){var n=ke();return n.asyncFactory=e,n.asyncMeta={data:t,context:a,children:l,tag:i},n}function qa(e,t){if(n(e.error)&&i(e.errorComp))return e.errorComp;if(i(e.resolved))return e.resolved;var a=Fa;if(a&&i(e.owners)&&-1===e.owners.indexOf(a)&&e.owners.push(a),n(e.loading)&&i(e.loadingComp))return e.loadingComp;if(a&&!i(e.owners)){var r=e.owners=[a],u=!0,s=null,d=null;a.$on("hook:destroyed",(function(){return _(r,a)}));var c=function(e){for(var t=0,a=r.length;t<a;t++)r[t].$forceUpdate();e&&(r.length=0,null!==s&&(clearTimeout(s),s=null),null!==d&&(clearTimeout(d),d=null))},v=F((function(a){e.resolved=$a(a,t),u?r.length=0:c(!0)})),f=F((function(t){ce("Failed to resolve async component: "+String(e)+(t?"\nReason: "+t:"")),i(e.errorComp)&&(e.error=!0,c(!0))})),b=e(v,f);return o(b)&&(h(b)?l(e.resolved)&&b.then(v,f):h(b.component)&&(b.component.then(v,f),i(b.error)&&(e.errorComp=$a(b.error,t)),i(b.loading)&&(e.loadingComp=$a(b.loading,t),0===b.delay?e.loading=!0:s=setTimeout((function(){s=null,l(e.resolved)&&l(e.error)&&(e.loading=!0,c(!1))}),b.delay||200)),i(b.timeout)&&(d=setTimeout((function(){d=null,l(e.resolved)&&f("timeout ("+b.timeout+"ms)")}),b.timeout)))),u=!1,e.loading?e.loadingComp:e.resolved}}function Ha(e){return e.isComment&&e.asyncFactory}function Ga(e){if(Array.isArray(e))for(var t=0;t<e.length;t++){var a=e[t];if(i(a)&&(i(a.componentOptions)||Ha(a)))return a}}function Wa(e){e._events=Object.create(null),e._hasHookEvent=!1;var t=e.$options._parentListeners;t&&Ya(e,t)}function za(e,t){Ba.$on(e,t)}function Ja(e,t){Ba.$off(e,t)}function Za(e,t){var a=Ba;return function l(){var i=t.apply(null,arguments);null!==i&&a.$off(e,l)}}function Ya(e,t,a){Ba=e,qt(t,a||{},za,Ja,Za,e),Ba=void 0}function Qa(e){var t=/^hook:/;e.prototype.$on=function(e,a){var l=this;if(Array.isArray(e))for(var i=0,n=e.length;i<n;i++)l.$on(e[i],a);else(l._events[e]||(l._events[e]=[])).push(a),t.test(e)&&(l._hasHookEvent=!0);return l},e.prototype.$once=function(e,t){var a=this;function l(){a.$off(e,l),t.apply(a,arguments)}return l.fn=t,a.$on(e,l),a},e.prototype.$off=function(e,t){var a=this;if(!arguments.length)return a._events=Object.create(null),a;if(Array.isArray(e)){for(var l=0,i=e.length;l<i;l++)a.$off(e[l],t);return a}var n,r=a._events[e];if(!r)return a;if(!t)return a._events[e]=null,a;var u=r.length;while(u--)if(n=r[u],n===t||n.fn===t){r.splice(u,1);break}return a},e.prototype.$emit=function(e){var t=this,a=e.toLowerCase();a!==e&&t._events[a]&&ve('Event "'+a+'" is emitted in component '+he(t)+' but the handler is registered for "'+e+'". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "'+T(e)+'" instead of "'+e+'".');var l=t._events[e];if(l){l=l.length>1?D(l):l;for(var i=D(arguments,1),n='event handler for "'+e+'"',r=0,u=l.length;r<u;r++)pt(l[r],t,i,t,n)}return t}}var Xa=null,el=!1;function tl(e){var t=Xa;return Xa=e,function(){Xa=t}}function al(e){var t=e.$options,a=t.parent;if(a&&!t.abstract){while(a.$options.abstract&&a.$parent)a=a.$parent;a.$children.push(e)}e.$parent=a,e.$root=a?a.$root:e,e.$children=[],e.$refs={},e._watcher=null,e._inactive=null,e._directInactive=!1,e._isMounted=!1,e._isDestroyed=!1,e._isBeingDestroyed=!1}function ll(e){e.prototype._update=function(e,t){var a=this,l=a.$el,i=a._vnode,n=tl(a);a._vnode=e,a.$el=i?a.__patch__(i,e):a.__patch__(a.$el,e,t,!1),n(),l&&(l.__vue__=null),a.$el&&(a.$el.__vue__=a),a.$vnode&&a.$parent&&a.$vnode===a.$parent._vnode&&(a.$parent.$el=a.$el)},e.prototype.$forceUpdate=function(){var e=this;e._watcher&&e._watcher.update()},e.prototype.$destroy=function(){var e=this;if(!e._isBeingDestroyed){ol(e,"beforeDestroy"),e._isBeingDestroyed=!0;var t=e.$parent;!t||t._isBeingDestroyed||e.$options.abstract||_(t.$children,e),e._watcher&&e._watcher.teardown();var a=e._watchers.length;while(a--)e._watchers[a].teardown();e._data.__ob__&&e._data.__ob__.vmCount--,e._isDestroyed=!0,e.__patch__(e._vnode,null),ol(e,"destroyed"),e.$off(),e.$el&&(e.$el.__vue__=null),e.$vnode&&(e.$vnode.parent=null)}}}function il(e,t,l,i,n){el=!0;var r=i.data.scopedSlots,u=e.$scopedSlots,o=!!(r&&!r.$stable||u!==a&&!u.$stable||r&&e.$scopedSlots.$key!==r.$key),s=!!(n||e.$options._renderChildren||o);if(e.$options._parentVnode=i,e.$vnode=i,e._vnode&&(e._vnode.parent=i),e.$options._renderChildren=n,e.$attrs=i.data.attrs||a,e.$listeners=l||a,t&&e.$options.props){Re(!1);for(var d=e._props,c=e.$options._propKeys||[],v=0;v<c.length;v++){var f=c[v],h=e.$options.props;d[f]=lt(f,h,t,e)}Re(!0),e.$options.propsData=t}e._$updateProperties&&e._$updateProperties(e),l=l||a;var b=e.$options._parentListeners;e.$options._parentListeners=l,Ya(e,l,b),s&&(e.$slots=ta(n,i.context),e.$forceUpdate()),el=!1}function nl(e){while(e&&(e=e.$parent))if(e._inactive)return!0;return!1}function rl(e,t){if(t){if(e._directInactive=!1,nl(e))return}else if(e._directInactive)return;if(e._inactive||null===e._inactive){e._inactive=!1;for(var a=0;a<e.$children.length;a++)rl(e.$children[a]);ol(e,"activated")}}function ul(e,t){if((!t||(e._directInactive=!0,!nl(e)))&&!e._inactive){e._inactive=!0;for(var a=0;a<e.$children.length;a++)ul(e.$children[a]);ol(e,"deactivated")}}function ol(e,t){we();var a=e.$options[t],l=t+" hook";if(a)for(var i=0,n=a.length;i<n;i++)pt(a[i],e,null,e,l);e._hasHookEvent&&e.$emit("hook:"+t),Ae()}var sl=100,dl=[],cl=[],vl={},fl={},hl=!1,bl=!1,pl=0;function gl(){pl=dl.length=cl.length=0,vl={},fl={},hl=bl=!1}var yl=Date.now;if(Y&&!te){var ml=window.performance;ml&&"function"===typeof ml.now&&yl()>document.createEvent("Event").timeStamp&&(yl=function(){return ml.now()})}function _l(){var e,t;for(yl(),bl=!0,dl.sort((function(e,t){return e.id-t.id})),pl=0;pl<dl.length;pl++)if(e=dl[pl],e.before&&e.before(),t=e.id,vl[t]=null,e.run(),null!=vl[t]&&(fl[t]=(fl[t]||0)+1,fl[t]>sl)){ce("You may have an infinite update loop "+(e.user?'in watcher with expression "'+e.expression+'"':"in a component render function."),e.vm);break}var a=cl.slice(),l=dl.slice();gl(),xl(a),wl(l),ue&&K.devtools&&ue.emit("flush")}function wl(e){var t=e.length;while(t--){var a=e[t],l=a.vm;l._watcher===a&&l._isMounted&&!l._isDestroyed&&ol(l,"updated")}}function Al(e){e._inactive=!1,cl.push(e)}function xl(e){for(var t=0;t<e.length;t++)e[t]._inactive=!0,rl(e[t],!0)}function Sl(e){var t=e.id;if(null==vl[t]){if(vl[t]=!0,bl){var a=dl.length-1;while(a>pl&&dl[a].id>e.id)a--;dl.splice(a+1,0,e)}else dl.push(e);if(!hl){if(hl=!0,!K.async)return void _l();Tt(_l)}}}var kl=0,Ol=function(e,t,a,l,i){this.vm=e,i&&(e._watcher=this),e._watchers.push(this),l?(this.deep=!!l.deep,this.user=!!l.user,this.lazy=!!l.lazy,this.sync=!!l.sync,this.before=l.before):this.deep=this.user=this.lazy=this.sync=!1,this.cb=a,this.id=++kl,this.active=!0,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new se,this.newDepIds=new se,this.expression=t.toString(),"function"===typeof t?this.getter=t:(this.getter=z(t),this.getter||(this.getter=j,ce('Failed watching path: "'+t+'" Watcher only accepts simple dot-delimited paths. For full control, use a function instead.',e))),this.value=this.lazy?void 0:this.get()};Ol.prototype.get=function(){var e;we(this);var t=this.vm;try{e=this.getter.call(t,t)}catch(Ui){if(!this.user)throw Ui;bt(Ui,t,'getter for watcher "'+this.expression+'"')}finally{this.deep&&Bt(e),Ae(),this.cleanupDeps()}return e},Ol.prototype.addDep=function(e){var t=e.id;this.newDepIds.has(t)||(this.newDepIds.add(t),this.newDeps.push(e),this.depIds.has(t)||e.addSub(this))},Ol.prototype.cleanupDeps=function(){var e=this.deps.length;while(e--){var t=this.deps[e];this.newDepIds.has(t.id)||t.removeSub(this)}var a=this.depIds;this.depIds=this.newDepIds,this.newDepIds=a,this.newDepIds.clear(),a=this.deps,this.deps=this.newDeps,this.newDeps=a,this.newDeps.length=0},Ol.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():Sl(this)},Ol.prototype.run=function(){if(this.active){var e=this.get();if(e!==this.value||o(e)||this.deep){var t=this.value;if(this.value=e,this.user)try{this.cb.call(this.vm,e,t)}catch(Ui){bt(Ui,this.vm,'callback for watcher "'+this.expression+'"')}else this.cb.call(this.vm,e,t)}}},Ol.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},Ol.prototype.depend=function(){var e=this.deps.length;while(e--)this.deps[e].depend()},Ol.prototype.teardown=function(){if(this.active){this.vm._isBeingDestroyed||_(this.vm._watchers,this);var e=this.deps.length;while(e--)this.deps[e].removeSub(this);this.active=!1}};var El={enumerable:!0,configurable:!0,get:j,set:j};function Tl(e,t,a){El.get=function(){return this[t][a]},El.set=function(e){this[t][a]=e},Object.defineProperty(e,a,El)}function Cl(e){e._watchers=[];var t=e.$options;t.props&&Il(e,t.props),t.methods&&Ul(e,t.methods),t.data?Pl(e):Me(e._data={},!0),t.computed&&Ll(e,t.computed),t.watch&&t.watch!==ie&&Bl(e,t.watch)}function Il(e,t){var a=e.$options.propsData||{},l=e._props={},i=e.$options._propKeys=[],n=!e.$parent;n||Re(!1);var r=function(r){i.push(r);var u=lt(r,t,a,e),o=T(r);(m(o)||K.isReservedAttr(o))&&ce('"'+o+'" is a reserved attribute and cannot be used as component prop.',e),Ue(l,r,u,(function(){if(!n&&!el){if("mp-baidu"===e.mpHost||"mp-kuaishou"===e.mpHost||"mp-xhs"===e.mpHost)return;if("value"===r&&Array.isArray(e.$options.behaviors)&&-1!==e.$options.behaviors.indexOf("uni://form-field"))return;if(e._getFormData)return;var t=e.$parent;while(t){if(t.__next_tick_pending)return;t=t.$parent}ce("Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: \""+r+'"',e)}})),r in e||Tl(e,"_props",r)};for(var u in t)r(u);Re(!0)}function Pl(e){var t=e.$options.data;t=e._data="function"===typeof t?Dl(t,e):t||{},c(t)||(t={},ce("data functions should return an object:\nhttps://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function",e));var a=Object.keys(t),l=e.$options.props,i=e.$options.methods,n=a.length;while(n--){var r=a[n];i&&A(i,r)&&ce('Method "'+r+'" has already been defined as a data property.',e),l&&A(l,r)?ce('The data property "'+r+'" is already declared as a prop. Use prop default value instead.',e):H(r)||Tl(e,"_data",r)}Me(t,!0)}function Dl(e,t){we();try{return e.call(t,t)}catch(Ui){return bt(Ui,t,"data()"),{}}finally{Ae()}}var Rl={lazy:!0};function Ll(e,t){var a=e._computedWatchers=Object.create(null),l=re();for(var i in t){var n=t[i],r="function"===typeof n?n:n.get;null==r&&ce('Getter is missing for computed property "'+i+'".',e),l||(a[i]=new Ol(e,r||j,j,Rl)),i in e?i in e.$data?ce('The computed property "'+i+'" is already defined in data.',e):e.$options.props&&i in e.$options.props&&ce('The computed property "'+i+'" is already defined as a prop.',e):jl(e,i,n)}}function jl(e,t,a){var l=!re();"function"===typeof a?(El.get=l?Nl(t):Ml(a),El.set=j):(El.get=a.get?l&&!1!==a.cache?Nl(t):Ml(a.get):j,El.set=a.set||j),El.set===j&&(El.set=function(){ce('Computed property "'+t+'" was assigned to but it has no setter.',this)}),Object.defineProperty(e,t,El)}function Nl(e){return function(){var t=this._computedWatchers&&this._computedWatchers[e];if(t)return t.dirty&&t.evaluate(),_e.SharedObject.target&&t.depend(),t.value}}function Ml(e){return function(){return e.call(this,this)}}function Ul(e,t){var a=e.$options.props;for(var l in t)"function"!==typeof t[l]&&ce('Method "'+l+'" has type "'+typeof t[l]+'" in the component definition. Did you reference the function correctly?',e),a&&A(a,l)&&ce('Method "'+l+'" has already been defined as a prop.',e),l in e&&H(l)&&ce('Method "'+l+'" conflicts with an existing Vue instance method. Avoid defining component methods that start with _ or $.'),e[l]="function"!==typeof t[l]?j:P(t[l],e)}function Bl(e,t){for(var a in t){var l=t[a];if(Array.isArray(l))for(var i=0;i<l.length;i++)Fl(e,a,l[i]);else Fl(e,a,l)}}function Fl(e,t,a,l){return c(a)&&(l=a,a=a.handler),"string"===typeof a&&(a=e[a]),e.$watch(t,a,l)}function Vl(e){var t={get:function(){return this._data}},a={get:function(){return this._props}};t.set=function(){ce("Avoid replacing instance root $data. Use nested data properties instead.",this)},a.set=function(){ce("$props is readonly.",this)},Object.defineProperty(e.prototype,"$data",t),Object.defineProperty(e.prototype,"$props",a),e.prototype.$set=Be,e.prototype.$delete=Fe,e.prototype.$watch=function(e,t,a){var l=this;if(c(t))return Fl(l,e,t,a);a=a||{},a.user=!0;var i=new Ol(l,e,t,a);if(a.immediate)try{t.call(l,i.value)}catch(n){bt(n,l,'callback for immediate watcher "'+i.expression+'"')}return function(){i.teardown()}}}var $l=0;function Kl(e){e.prototype._init=function(e){var t,a,l=this;l._uid=$l++,K.performance&&Nt&&(t="vue-perf-start:"+l._uid,a="vue-perf-end:"+l._uid,Nt(t)),l._isVue=!0,e&&e._isComponent?ql(l,e):l.$options=tt(Hl(l.constructor),e||{},l),_t(l),l._self=l,al(l),Wa(l),Ua(l),ol(l,"beforeCreate"),!l._$fallback&&Xt(l),Cl(l),!l._$fallback&&Qt(l),!l._$fallback&&ol(l,"created"),K.performance&&Nt&&(l._name=he(l,!1),Nt(a),Mt("vue "+l._name+" init",t,a)),l.$options.el&&l.$mount(l.$options.el)}}function ql(e,t){var a=e.$options=Object.create(e.constructor.options),l=t._parentVnode;a.parent=t.parent,a._parentVnode=l;var i=l.componentOptions;a.propsData=i.propsData,a._parentListeners=i.listeners,a._renderChildren=i.children,a._componentTag=i.tag,t.render&&(a.render=t.render,a.staticRenderFns=t.staticRenderFns)}function Hl(e){var t=e.options;if(e.super){var a=Hl(e.super),l=e.superOptions;if(a!==l){e.superOptions=a;var i=Gl(e);i&&R(e.extendOptions,i),t=e.options=tt(a,e.extendOptions),t.name&&(t.components[t.name]=e)}}return t}function Gl(e){var t,a=e.options,l=e.sealedOptions;for(var i in a)a[i]!==l[i]&&(t||(t={}),t[i]=a[i]);return t}function Wl(e){this instanceof Wl||ce("Vue is a constructor and should be called with the `new` keyword"),this._init(e)}function zl(e){e.use=function(e){var t=this._installedPlugins||(this._installedPlugins=[]);if(t.indexOf(e)>-1)return this;var a=D(arguments,1);return a.unshift(this),"function"===typeof e.install?e.install.apply(e,a):"function"===typeof e&&e.apply(null,a),t.push(e),this}}function Jl(e){e.mixin=function(e){return this.options=tt(this.options,e),this}}function Zl(e){e.cid=0;var t=1;e.extend=function(e){e=e||{};var a=this,l=a.cid,i=e._Ctor||(e._Ctor={});if(i[l])return i[l];var n=e.name||a.options.name;n&&Ze(n);var r=function(e){this._init(e)};return r.prototype=Object.create(a.prototype),r.prototype.constructor=r,r.cid=t++,r.options=tt(a.options,e),r["super"]=a,r.options.props&&Yl(r),r.options.computed&&Ql(r),r.extend=a.extend,r.mixin=a.mixin,r.use=a.use,V.forEach((function(e){r[e]=a[e]})),n&&(r.options.components[n]=r),r.superOptions=a.options,r.extendOptions=e,r.sealedOptions=R({},r.options),i[l]=r,r}}function Yl(e){var t=e.options.props;for(var a in t)Tl(e.prototype,"_props",a)}function Ql(e){var t=e.options.computed;for(var a in t)jl(e.prototype,a,t[a])}function Xl(e){V.forEach((function(t){e[t]=function(e,a){return a?("component"===t&&Ze(e),"component"===t&&c(a)&&(a.name=a.name||e,a=this.options._base.extend(a)),"directive"===t&&"function"===typeof a&&(a={bind:a,update:a}),this.options[t+"s"][e]=a,a):this.options[t+"s"][e]}}))}function ei(e){return e&&(e.Ctor.options.name||e.tag)}function ti(e,t){return Array.isArray(e)?e.indexOf(t)>-1:"string"===typeof e?e.split(",").indexOf(t)>-1:!!v(e)&&e.test(t)}function ai(e,t){var a=e.cache,l=e.keys,i=e._vnode;for(var n in a){var r=a[n];if(r){var u=ei(r.componentOptions);u&&!t(u)&&li(a,n,l,i)}}}function li(e,t,a,l){var i=e[t];!i||l&&i.tag===l.tag||i.componentInstance.$destroy(),e[t]=null,_(a,t)}Kl(Wl),Vl(Wl),Qa(Wl),ll(Wl),Va(Wl);var ii=[String,RegExp,Array],ni={name:"keep-alive",abstract:!0,props:{include:ii,exclude:ii,max:[String,Number]},created:function(){this.cache=Object.create(null),this.keys=[]},destroyed:function(){for(var e in this.cache)li(this.cache,e,this.keys)},mounted:function(){var e=this;this.$watch("include",(function(t){ai(e,(function(e){return ti(t,e)}))})),this.$watch("exclude",(function(t){ai(e,(function(e){return!ti(t,e)}))}))},render:function(){var e=this.$slots.default,t=Ga(e),a=t&&t.componentOptions;if(a){var l=ei(a),i=this,n=i.include,r=i.exclude;if(n&&(!l||!ti(n,l))||r&&l&&ti(r,l))return t;var u=this,o=u.cache,s=u.keys,d=null==t.key?a.Ctor.cid+(a.tag?"::"+a.tag:""):t.key;o[d]?(t.componentInstance=o[d].componentInstance,_(s,d),s.push(d)):(o[d]=t,s.push(d),this.max&&s.length>parseInt(this.max)&&li(o,s[0],s,this._vnode)),t.data.keepAlive=!0}return t||e&&e[0]}},ri={KeepAlive:ni};function ui(e){var t={get:function(){return K},set:function(){ce("Do not replace the Vue.config object, set individual fields instead.")}};Object.defineProperty(e,"config",t),e.util={warn:ce,extend:R,mergeOptions:tt,defineReactive:Ue},e.set=Be,e.delete=Fe,e.nextTick=Tt,e.observable=function(e){return Me(e),e},e.options=Object.create(null),V.forEach((function(t){e.options[t+"s"]=Object.create(null)})),e.options._base=e,R(e.options.components,ri),zl(e),Jl(e),Zl(e),Xl(e)}ui(Wl),Object.defineProperty(Wl.prototype,"$isServer",{get:re}),Object.defineProperty(Wl.prototype,"$ssrContext",{get:function(){return this.$vnode&&this.$vnode.ssrContext}}),Object.defineProperty(Wl,"FunctionalRenderContext",{value:wa}),Wl.version="2.6.11";var oi="[object Array]",si="[object Object]",di="[object Null]",ci="[object Undefined]";function vi(e,t){var a={};return fi(e,t),bi(e,t,"",a),a}function fi(e,t){if(e!==t){var a=gi(e),l=gi(t);if(a==si&&l==si){if(Object.keys(e).length>=Object.keys(t).length)for(var i in t){var n=e[i];void 0===n?e[i]=null:fi(n,t[i])}}else a==oi&&l==oi&&e.length>=t.length&&t.forEach((function(t,a){fi(e[a],t)}))}}function hi(e,t){return e!==di&&e!==ci||t!==di&&t!==ci}function bi(e,t,a,l){if(e!==t){var i=gi(e),n=gi(t);if(i==si)if(n!=si||Object.keys(e).length<Object.keys(t).length)pi(l,a,e);else{var r=function(i){var n=e[i],r=t[i],u=gi(n),o=gi(r);if(u!=oi&&u!=si)n!==t[i]&&hi(u,o)&&pi(l,(""==a?"":a+".")+i,n);else if(u==oi)o!=oi||n.length<r.length?pi(l,(""==a?"":a+".")+i,n):n.forEach((function(e,t){bi(e,r[t],(""==a?"":a+".")+i+"["+t+"]",l)}));else if(u==si)if(o!=si||Object.keys(n).length<Object.keys(r).length)pi(l,(""==a?"":a+".")+i,n);else for(var s in n)bi(n[s],r[s],(""==a?"":a+".")+i+"."+s,l)};for(var u in e)r(u)}else i==oi?n!=oi||e.length<t.length?pi(l,a,e):e.forEach((function(e,i){bi(e,t[i],a+"["+i+"]",l)})):pi(l,a,e)}}function pi(e,t,a){e[t]=a}function gi(e){return Object.prototype.toString.call(e)}function yi(e){if(e.__next_tick_callbacks&&e.__next_tick_callbacks.length){if(Object({NODE_ENV:"development",VUE_APP_DARK_MODE:"false",VUE_APP_NAME:"快鹿送酒小程序",VUE_APP_PLATFORM:"mp-weixin",BASE_URL:"/"}).VUE_APP_DEBUG){var t=e.$scope;console.log("["+ +new Date+"]["+(t.is||t.route)+"]["+e._uid+"]:flushCallbacks["+e.__next_tick_callbacks.length+"]")}var a=e.__next_tick_callbacks.slice(0);e.__next_tick_callbacks.length=0;for(var l=0;l<a.length;l++)a[l]()}}function mi(e){return dl.find((function(t){return e._watcher===t}))}function _i(e,t){if(!e.__next_tick_pending&&!mi(e)){if(Object({NODE_ENV:"development",VUE_APP_DARK_MODE:"false",VUE_APP_NAME:"快鹿送酒小程序",VUE_APP_PLATFORM:"mp-weixin",BASE_URL:"/"}).VUE_APP_DEBUG){var a=e.$scope;console.log("["+ +new Date+"]["+(a.is||a.route)+"]["+e._uid+"]:nextVueTick")}return Tt(t,e)}if(Object({NODE_ENV:"development",VUE_APP_DARK_MODE:"false",VUE_APP_NAME:"快鹿送酒小程序",VUE_APP_PLATFORM:"mp-weixin",BASE_URL:"/"}).VUE_APP_DEBUG){var l=e.$scope;console.log("["+ +new Date+"]["+(l.is||l.route)+"]["+e._uid+"]:nextMPTick")}var i;if(e.__next_tick_callbacks||(e.__next_tick_callbacks=[]),e.__next_tick_callbacks.push((function(){if(t)try{t.call(e)}catch(Ui){bt(Ui,e,"nextTick")}else i&&i(e)})),!t&&"undefined"!==typeof Promise)return new Promise((function(e){i=e}))}function wi(e,t){return t&&(t._isVue||t.__v_isMPComponent)?{}:t}function Ai(e){var t=Object.create(null),a=[].concat(Object.keys(e._data||{}),Object.keys(e._computedWatchers||{}));a.reduce((function(t,a){return t[a]=e[a],t}),t);var l=e.__composition_api_state__||e.__secret_vfa_state__,i=l&&l.rawBindings;return i&&Object.keys(i).forEach((function(a){t[a]=e[a]})),Object.assign(t,e.$mp.data||{}),Array.isArray(e.$options.behaviors)&&-1!==e.$options.behaviors.indexOf("uni://form-field")&&(t["name"]=e.name,t["value"]=e.value),JSON.parse(JSON.stringify(t,wi))}var xi=function(e,t){var a=this;if(null!==t&&("page"===this.mpType||"component"===this.mpType)){var l=this.$scope,i=Object.create(null);try{i=Ai(this)}catch(u){console.error(u)}i.__webviewId__=l.data.__webviewId__;var n=Object.create(null);Object.keys(i).forEach((function(e){n[e]=l.data[e]}));var r=!1===this.$shouldDiffData?i:vi(i,n);Object.keys(r).length?(Object({NODE_ENV:"development",VUE_APP_DARK_MODE:"false",VUE_APP_NAME:"快鹿送酒小程序",VUE_APP_PLATFORM:"mp-weixin",BASE_URL:"/"}).VUE_APP_DEBUG&&console.log("["+ +new Date+"]["+(l.is||l.route)+"]["+this._uid+"]差量更新",JSON.stringify(r)),this.__next_tick_pending=!0,l.setData(r,(function(){a.__next_tick_pending=!1,yi(a)}))):yi(this)}};function Si(){}function ki(e,t,a){if(!e.mpType)return e;"app"===e.mpType&&(e.$options.render=Si),e.$options.render||(e.$options.render=Si,e.$options.template&&"#"!==e.$options.template.charAt(0)||e.$options.el||t?ce("You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.",e):ce("Failed to mount component: template or render function not defined.",e)),!e._$fallback&&ol(e,"beforeMount");var l=function(){e._update(e._render(),a)};return new Ol(e,l,j,{before:function(){e._isMounted&&!e._isDestroyed&&ol(e,"beforeUpdate")}},!0),a=!1,e}function Oi(e,t){return i(e)||i(t)?Ei(e,Ti(t)):""}function Ei(e,t){return e?t?e+" "+t:e:t||""}function Ti(e){return Array.isArray(e)?Ci(e):o(e)?Ii(e):"string"===typeof e?e:""}function Ci(e){for(var t,a="",l=0,n=e.length;l<n;l++)i(t=Ti(e[l]))&&""!==t&&(a&&(a+=" "),a+=t);return a}function Ii(e){var t="";for(var a in e)e[a]&&(t&&(t+=" "),t+=a);return t}var Pi=x((function(e){var t={},a=/;(?![^(]*\))/g,l=/:(.+)/;return e.split(a).forEach((function(e){if(e){var a=e.split(l);a.length>1&&(t[a[0].trim()]=a[1].trim())}})),t}));function Di(e){return Array.isArray(e)?L(e):"string"===typeof e?Pi(e):e}var Ri=["createSelectorQuery","createIntersectionObserver","selectAllComponents","selectComponent"];function Li(e,t){var a=t.split("."),l=a[0];return 0===l.indexOf("__$n")&&(l=parseInt(l.replace("__$n",""))),1===a.length?e[l]:Li(e[l],a.slice(1).join("."))}function ji(e){e.config.errorHandler=function(t,a,l){e.util.warn("Error in "+l+': "'+t.toString()+'"',a),console.error(t);var i="function"===typeof getApp&&getApp();i&&i.onError&&i.onError(t)};var t=e.prototype.$emit;e.prototype.$emit=function(e){if(this.$scope&&e){var a=this.$scope["_triggerEvent"]||this.$scope["triggerEvent"];if(a)try{a.call(this.$scope,e,{__args__:D(arguments,1)})}catch(l){}}return t.apply(this,arguments)},e.prototype.$nextTick=function(e){return _i(this,e)},Ri.forEach((function(t){e.prototype[t]=function(e){return this.$scope&&this.$scope[t]?this.$scope[t](e):"undefined"!==typeof my?"createSelectorQuery"===t?my.createSelectorQuery(e):"createIntersectionObserver"===t?my.createIntersectionObserver(e):void 0:void 0}})),e.prototype.__init_provide=Qt,e.prototype.__init_injections=Xt,e.prototype.__call_hook=function(e,t){var a=this;we();var l,i=a.$options[e],n=e+" hook";if(i)for(var r=0,u=i.length;r<u;r++)l=pt(i[r],a,t?[t]:null,a,n);return a._hasHookEvent&&a.$emit("hook:"+e,t),Ae(),l},e.prototype.__set_model=function(t,a,l,i){Array.isArray(i)&&(-1!==i.indexOf("trim")&&(l=l.trim()),-1!==i.indexOf("number")&&(l=this._n(l))),t||(t=this),e.set(t,a,l)},e.prototype.__set_sync=function(t,a,l){t||(t=this),e.set(t,a,l)},e.prototype.__get_orig=function(e){return c(e)&&e["$orig"]||e},e.prototype.__get_value=function(e,t){return Li(t||this,e)},e.prototype.__get_class=function(e,t){return Oi(t,e)},e.prototype.__get_style=function(e,t){if(!e&&!t)return"";var a=Di(e),l=t?R(t,a):a;return Object.keys(l).map((function(e){return T(e)+":"+l[e]})).join(";")},e.prototype.__map=function(e,t){var a,l,i,n,r;if(Array.isArray(e)){for(a=new Array(e.length),l=0,i=e.length;l<i;l++)a[l]=t(e[l],l);return a}if(o(e)){for(n=Object.keys(e),a=Object.create(null),l=0,i=n.length;l<i;l++)r=n[l],a[r]=t(e[r],r,l);return a}if("number"===typeof e){for(a=new Array(e),l=0,i=e;l<i;l++)a[l]=t(l,l);return a}return[]}}var Ni=["onLaunch","onShow","onHide","onUniNViewMessage","onPageNotFound","onThemeChange","onError","onUnhandledRejection","onInit","onLoad","onReady","onUnload","onPullDownRefresh","onReachBottom","onTabItemTap","onAddToFavorites","onShareTimeline","onShareAppMessage","onResize","onPageScroll","onNavigationBarButtonTap","onBackPress","onNavigationBarSearchInputChanged","onNavigationBarSearchInputConfirmed","onNavigationBarSearchInputClicked","onUploadDouyinVideo","onNFCReadMessage","onPageShow","onPageHide","onPageResize"];function Mi(e){var t=e.extend;e.extend=function(e){e=e||{};var a=e.methods;return a&&Object.keys(a).forEach((function(t){-1!==Ni.indexOf(t)&&(e[t]=a[t],delete a[t])})),t.call(this,e)};var a=e.config.optionMergeStrategies,l=a.created;Ni.forEach((function(e){a[e]=l})),e.prototype.__lifecycle_hooks__=Ni}Wl.prototype.__patch__=xi,Wl.prototype.$mount=function(e,t){return ki(this,e,t)},Mi(Wl),ji(Wl),t["default"]=Wl}.call(this,a(3))},26:function(e,t){},261:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.provice=void 0;var l=[{id:"340000",value:"340000",label:"安徽省",key:"A",children:[{id:"340100",value:"340100",label:"合肥市",children:[{id:"340102",value:"340102",label:"瑶海区"},{id:"340103",value:"340103",label:"庐阳区"},{id:"340104",value:"340104",label:"蜀山区"},{id:"340111",value:"340111",label:"包河区"},{id:"340121",value:"340121",label:"长丰县"},{id:"340122",value:"340122",label:"肥东县"},{id:"340123",value:"340123",label:"肥西县"},{id:"340124",value:"340124",label:"庐江县"},{id:"340181",value:"340181",label:"巢湖市"},{id:"340184",value:"340184",label:"经济开发区"},{id:"340185",value:"340185",label:"高新区"},{id:"340186",value:"340186",label:"北城新区"},{id:"340187",value:"340187",label:"滨湖新区"},{id:"340188",value:"340188",label:"政务文化新区"},{id:"340189",value:"340189",label:"新站综合开发试验区"}]},{id:"340200",value:"340200",label:"芜湖市",children:[{id:"340202",value:"340202",label:"镜湖区"},{id:"340203",value:"340203",label:"弋江区"},{id:"340207",value:"340207",label:"鸠江区"},{id:"340208",value:"340208",label:"三山区"},{id:"340221",value:"340221",label:"芜湖县"},{id:"340222",value:"340222",label:"繁昌县"},{id:"340223",value:"340223",label:"南陵县"},{id:"340225",value:"340225",label:"无为县"},{id:"340226",value:"340226",label:"经济开发区"},{id:"340227",value:"340227",label:"城东新区"}]},{id:"340300",value:"340300",label:"蚌埠市",children:[{id:"340302",value:"340302",label:"龙子湖区"},{id:"340303",value:"340303",label:"蚌山区"},{id:"340304",value:"340304",label:"禹会区"},{id:"340311",value:"340311",label:"淮上区"},{id:"340321",value:"340321",label:"怀远县"},{id:"340322",value:"340322",label:"五河县"},{id:"340323",value:"340323",label:"固镇县"},{id:"340324",value:"340324",label:"高新区"}]},{id:"340400",value:"340400",label:"淮南市",children:[{id:"340402",value:"340402",label:"大通区"},{id:"340403",value:"340403",label:"田家庵区"},{id:"340404",value:"340404",label:"谢家集区"},{id:"340405",value:"340405",label:"八公山区"},{id:"340406",value:"340406",label:"潘集区"},{id:"340421",value:"340421",label:"凤台县"},{id:"340422",value:"340422",label:"寿县"},{id:"340423",value:"340423",label:"山南新区"},{id:"340424",value:"340424",label:"毛集实验区"},{id:"340425",value:"340425",label:"经济开发区"}]},{id:"340500",value:"340500",label:"马鞍山市",children:[{id:"340503",value:"340503",label:"花山区"},{id:"340504",value:"340504",label:"雨山区"},{id:"340506",value:"340506",label:"博望区"},{id:"340521",value:"340521",label:"当涂县"},{id:"340522",value:"340522",label:"含山县"},{id:"340523",value:"340523",label:"和县"}]},{id:"340600",value:"340600",label:"淮北市",children:[{id:"340602",value:"340602",label:"杜集区"},{id:"340603",value:"340603",label:"相山区"},{id:"340604",value:"340604",label:"烈山区"},{id:"340621",value:"340621",label:"濉溪县"}]},{id:"340700",value:"340700",label:"铜陵市",children:[{id:"340705",value:"340705",label:"铜官区"},{id:"340706",value:"340706",label:"义安区"},{id:"340711",value:"340711",label:"郊区"},{id:"340722",value:"340722",label:"枞阳县"}]},{id:"340800",value:"340800",label:"安庆市",children:[{id:"340802",value:"340802",label:"迎江区"},{id:"340803",value:"340803",label:"大观区"},{id:"340811",value:"340811",label:"宜秀区"},{id:"340822",value:"340822",label:"怀宁县"},{id:"340824",value:"340824",label:"潜山县"},{id:"340825",value:"340825",label:"太湖县"},{id:"340826",value:"340826",label:"宿松县"},{id:"340827",value:"340827",label:"望江县"},{id:"340828",value:"340828",label:"岳西县"},{id:"340881",value:"340881",label:"桐城市"}]},{id:"341000",value:"341000",label:"黄山市",children:[{id:"341002",value:"341002",label:"屯溪区"},{id:"341003",value:"341003",label:"黄山区"},{id:"341004",value:"341004",label:"徽州区"},{id:"341021",value:"341021",label:"歙县"},{id:"341022",value:"341022",label:"休宁县"},{id:"341023",value:"341023",label:"黟县"},{id:"341024",value:"341024",label:"祁门县"}]},{id:"341100",value:"341100",label:"滁州市",children:[{id:"341102",value:"341102",label:"琅琊区"},{id:"341103",value:"341103",label:"南谯区"},{id:"341122",value:"341122",label:"来安县"},{id:"341124",value:"341124",label:"全椒县"},{id:"341125",value:"341125",label:"定远县"},{id:"341126",value:"341126",label:"凤阳县"},{id:"341181",value:"341181",label:"天长市"},{id:"341182",value:"341182",label:"明光市"}]},{id:"341200",value:"341200",label:"阜阳市",children:[{id:"341202",value:"341202",label:"颍州区"},{id:"341203",value:"341203",label:"颍东区"},{id:"341204",value:"341204",label:"颍泉区"},{id:"341221",value:"341221",label:"临泉县"},{id:"341222",value:"341222",label:"太和县"},{id:"341225",value:"341225",label:"阜南县"},{id:"341226",value:"341226",label:"颍上县"},{id:"341282",value:"341282",label:"界首市"},{id:"341283",value:"341283",label:"经济开发区"},{id:"341284",value:"341284",label:"苏滁现代产业园"}]},{id:"341300",value:"341300",label:"宿州市",children:[{id:"341302",value:"341302",label:"埇桥区"},{id:"341321",value:"341321",label:"砀山县"},{id:"341322",value:"341322",label:"萧县"},{id:"341323",value:"341323",label:"灵璧县"},{id:"341324",value:"341324",label:"泗县"},{id:"341325",value:"341325",label:"经济开发区"},{id:"341371",value:"341371",label:"宿马现代产业园"}]},{id:"341500",value:"341500",label:"六安市",children:[{id:"341502",value:"341502",label:"金安区"},{id:"341503",value:"341503",label:"裕安区"},{id:"341504",value:"341504",label:"叶集区"},{id:"341522",value:"341522",label:"霍邱县"},{id:"341523",value:"341523",label:"舒城县"},{id:"341524",value:"341524",label:"金寨县"},{id:"341525",value:"341525",label:"霍山县"}]},{id:"341600",value:"341600",label:"亳州市",children:[{id:"341602",value:"341602",label:"谯城区"},{id:"341621",value:"341621",label:"涡阳县"},{id:"341622",value:"341622",label:"蒙城县"},{id:"341623",value:"341623",label:"利辛县"}]},{id:"341700",value:"341700",label:"池州市",children:[{id:"341702",value:"341702",label:"贵池区"},{id:"341721",value:"341721",label:"东至县"},{id:"341722",value:"341722",label:"石台县"},{id:"341723",value:"341723",label:"青阳县"}]},{id:"341800",value:"341800",label:"宣城市",children:[{id:"341802",value:"341802",label:"宣州区"},{id:"341821",value:"341821",label:"郎溪县"},{id:"341822",value:"341822",label:"广德县"},{id:"341823",value:"341823",label:"泾县"},{id:"341824",value:"341824",label:"绩溪县"},{id:"341825",value:"341825",label:"旌德县"},{id:"341881",value:"341881",label:"宁国市"}]}]},{id:"820000",value:"820000",label:"澳门",key:"",children:[{id:"820100",value:"820100",label:"澳门半岛",children:[{id:"820101",value:"820101",label:"花地玛堂区"},{id:"820102",value:"820102",label:"圣安多尼堂区"},{id:"820103",value:"820103",label:"大堂区"},{id:"820104",value:"820104",label:"望德堂区"},{id:"820105",value:"820105",label:"风顺堂区"}]},{id:"820200",value:"820200",label:"氹仔岛",children:[{id:"820201",value:"820201",label:"嘉模堂区"}]},{id:"820300",value:"820300",label:"路环岛",children:[{id:"820301",value:"820301",label:"圣方济各堂区"}]}]},{id:"110000",value:"110000",label:"北京",key:"B",children:[{id:"110100",value:"110100",label:"北京市",children:[{id:"110101",value:"110101",label:"东城区"},{id:"110102",value:"110102",label:"西城区"},{id:"110105",value:"110105",label:"朝阳区"},{id:"110106",value:"110106",label:"丰台区"},{id:"110107",value:"110107",label:"石景山区"},{id:"110108",value:"110108",label:"海淀区"},{id:"110109",value:"110109",label:"门头沟区"},{id:"110111",value:"110111",label:"房山区"},{id:"110112",value:"110112",label:"通州区"},{id:"110113",value:"110113",label:"顺义区"},{id:"110114",value:"110114",label:"昌平区"},{id:"110115",value:"110115",label:"大兴区"},{id:"110116",value:"110116",label:"怀柔区"},{id:"110117",value:"110117",label:"平谷区"},{id:"110118",value:"110118",label:"密云区"},{id:"110119",value:"110119",label:"延庆区"},{id:"110120",value:"110120",label:"中关村科技园区"}]}]},{id:"500000",value:"500000",label:"重庆",key:"C",children:[{id:"500100",value:"500100",label:"重庆市",children:[{id:"500101",value:"500101",label:"万州区"},{id:"500102",value:"500102",label:"涪陵区"},{id:"500103",value:"500103",label:"渝中区"},{id:"500104",value:"500104",label:"大渡口区"},{id:"500105",value:"500105",label:"江北区"},{id:"500106",value:"500106",label:"沙坪坝区"},{id:"500107",value:"500107",label:"九龙坡区"},{id:"500108",value:"500108",label:"南岸区"},{id:"500109",value:"500109",label:"北碚区"},{id:"500110",value:"500110",label:"綦江区"},{id:"500111",value:"500111",label:"大足区"},{id:"500112",value:"500112",label:"渝北区"},{id:"500113",value:"500113",label:"巴南区"},{id:"500114",value:"500114",label:"黔江区"},{id:"500115",value:"500115",label:"长寿区"},{id:"500116",value:"500116",label:"江津区"},{id:"500117",value:"500117",label:"合川区"},{id:"500118",value:"500118",label:"永川区"},{id:"500119",value:"500119",label:"南川区"},{id:"500120",value:"500120",label:"璧山区"},{id:"500151",value:"500151",label:"铜梁区"},{id:"500152",value:"500152",label:"潼南区"},{id:"500153",value:"500153",label:"荣昌区"},{id:"500154",value:"500154",label:"开州区"},{id:"500155",value:"500155",label:"梁平区"},{id:"500156",value:"500156",label:"武隆区"},{id:"500229",value:"500229",label:"城口县"},{id:"500230",value:"500230",label:"丰都县"},{id:"500231",value:"500231",label:"垫江县"},{id:"500233",value:"500233",label:"忠县"},{id:"500235",value:"500235",label:"云阳县"},{id:"500236",value:"500236",label:"奉节县"},{id:"500237",value:"500237",label:"巫山县"},{id:"500238",value:"500238",label:"巫溪县"},{id:"500240",value:"500240",label:"石柱县"},{id:"500241",value:"500241",label:"秀山县"},{id:"500242",value:"500242",label:"酉阳县"},{id:"500243",value:"500243",label:"彭水县"},{id:"500300",value:"500300",label:"两江新区"},{id:"500301",value:"500301",label:"万盛开发区"},{id:"500302",value:"500302",label:"璧山高新区"}]}]},{id:"900000",value:"900000",label:"钓鱼岛",key:"D",children:[]},{id:"350000",value:"350000",label:"福建省",key:"F",children:[{id:"350100",value:"350100",label:"福州市",children:[{id:"350102",value:"350102",label:"鼓楼区"},{id:"350103",value:"350103",label:"台江区"},{id:"350104",value:"350104",label:"仓山区"},{id:"350105",value:"350105",label:"马尾区"},{id:"350111",value:"350111",label:"晋安区"},{id:"350112",value:"350112",label:"长乐区"},{id:"350121",value:"350121",label:"闽侯县"},{id:"350122",value:"350122",label:"连江县"},{id:"350123",value:"350123",label:"罗源县"},{id:"350124",value:"350124",label:"闽清县"},{id:"350125",value:"350125",label:"永泰县"},{id:"350128",value:"350128",label:"平潭县"},{id:"350181",value:"350181",label:"福清市"},{id:"350183",value:"350183",label:"福州新区"}]},{id:"350200",value:"350200",label:"厦门市",children:[{id:"350203",value:"350203",label:"思明区"},{id:"350205",value:"350205",label:"海沧区"},{id:"350206",value:"350206",label:"湖里区"},{id:"350211",value:"350211",label:"集美区"},{id:"350212",value:"350212",label:"同安区"},{id:"350213",value:"350213",label:"翔安区"}]},{id:"350300",value:"350300",label:"莆田市",children:[{id:"350302",value:"350302",label:"城厢区"},{id:"350303",value:"350303",label:"涵江区"},{id:"350304",value:"350304",label:"荔城区"},{id:"350305",value:"350305",label:"秀屿区"},{id:"350322",value:"350322",label:"仙游县"}]},{id:"350400",value:"350400",label:"三明市",children:[{id:"350402",value:"350402",label:"梅列区"},{id:"350403",value:"350403",label:"三元区"},{id:"350421",value:"350421",label:"明溪县"},{id:"350423",value:"350423",label:"清流县"},{id:"350424",value:"350424",label:"宁化县"},{id:"350425",value:"350425",label:"大田县"},{id:"350426",value:"350426",label:"尤溪县"},{id:"350427",value:"350427",label:"沙县"},{id:"350428",value:"350428",label:"将乐县"},{id:"350429",value:"350429",label:"泰宁县"},{id:"350430",value:"350430",label:"建宁县"},{id:"350481",value:"350481",label:"永安市"}]},{id:"350500",value:"350500",label:"泉州市",children:[{id:"350502",value:"350502",label:"鲤城区"},{id:"350503",value:"350503",label:"丰泽区"},{id:"350504",value:"350504",label:"洛江区"},{id:"350505",value:"350505",label:"泉港区"},{id:"350521",value:"350521",label:"惠安县"},{id:"350524",value:"350524",label:"安溪县"},{id:"350525",value:"350525",label:"永春县"},{id:"350526",value:"350526",label:"德化县"},{id:"350527",value:"350527",label:"金门县"},{id:"350581",value:"350581",label:"石狮市"},{id:"350582",value:"350582",label:"晋江市"},{id:"350583",value:"350583",label:"南安市"},{id:"350584",value:"350584",label:"台商投资区"},{id:"350585",value:"350585",label:"经济技术开发区"},{id:"350586",value:"350586",label:"高新区"},{id:"350587",value:"350587",label:"综合保税区"}]},{id:"350600",value:"350600",label:"漳州市",children:[{id:"350602",value:"350602",label:"芗城区"},{id:"350603",value:"350603",label:"龙文区"},{id:"350622",value:"350622",label:"云霄县"},{id:"350623",value:"350623",label:"漳浦县"},{id:"350624",value:"350624",label:"诏安县"},{id:"350625",value:"350625",label:"长泰县"},{id:"350626",value:"350626",label:"东山县"},{id:"350627",value:"350627",label:"南靖县"},{id:"350628",value:"350628",label:"平和县"},{id:"350629",value:"350629",label:"华安县"},{id:"350681",value:"350681",label:"龙海市"}]},{id:"350700",value:"350700",label:"南平市",children:[{id:"350702",value:"350702",label:"延平区"},{id:"350703",value:"350703",label:"建阳区"},{id:"350721",value:"350721",label:"顺昌县"},{id:"350722",value:"350722",label:"浦城县"},{id:"350723",value:"350723",label:"光泽县"},{id:"350724",value:"350724",label:"松溪县"},{id:"350725",value:"350725",label:"政和县"},{id:"350781",value:"350781",label:"邵武市"},{id:"350782",value:"350782",label:"武夷山市"},{id:"350783",value:"350783",label:"建瓯市"}]},{id:"350800",value:"350800",label:"龙岩市",children:[{id:"350802",value:"350802",label:"新罗区"},{id:"350803",value:"350803",label:"永定区"},{id:"350821",value:"350821",label:"长汀县"},{id:"350823",value:"350823",label:"上杭县"},{id:"350824",value:"350824",label:"武平县"},{id:"350825",value:"350825",label:"连城县"},{id:"350881",value:"350881",label:"漳平市"}]},{id:"350900",value:"350900",label:"宁德市",children:[{id:"350902",value:"350902",label:"蕉城区"},{id:"350921",value:"350921",label:"霞浦县"},{id:"350922",value:"350922",label:"古田县"},{id:"350923",value:"350923",label:"屏南县"},{id:"350924",value:"350924",label:"寿宁县"},{id:"350925",value:"350925",label:"周宁县"},{id:"350926",value:"350926",label:"柘荣县"},{id:"350981",value:"350981",label:"福安市"},{id:"350982",value:"350982",label:"福鼎市"},{id:"350983",value:"350983",label:"东侨开发区"}]}]},{id:"440000",value:"440000",label:"广东省",key:"G",children:[{id:"440100",value:"440100",label:"广州市",children:[{id:"440103",value:"440103",label:"荔湾区"},{id:"440104",value:"440104",label:"越秀区"},{id:"440105",value:"440105",label:"海珠区"},{id:"440106",value:"440106",label:"天河区"},{id:"440111",value:"440111",label:"白云区"},{id:"440112",value:"440112",label:"黄埔区"},{id:"440113",value:"440113",label:"番禺区"},{id:"440114",value:"440114",label:"花都区"},{id:"440115",value:"440115",label:"南沙区"},{id:"440117",value:"440117",label:"从化区"},{id:"440118",value:"440118",label:"增城区"}]},{id:"440200",value:"440200",label:"韶关市",children:[{id:"440203",value:"440203",label:"武江区"},{id:"440204",value:"440204",label:"浈江区"},{id:"440205",value:"440205",label:"曲江区"},{id:"440222",value:"440222",label:"始兴县"},{id:"440224",value:"440224",label:"仁化县"},{id:"440229",value:"440229",label:"翁源县"},{id:"440232",value:"440232",label:"乳源瑶族自治县"},{id:"440233",value:"440233",label:"新丰县"},{id:"440281",value:"440281",label:"乐昌市"},{id:"440282",value:"440282",label:"南雄市"}]},{id:"440300",value:"440300",label:"深圳市",children:[{id:"440303",value:"440303",label:"罗湖区"},{id:"440304",value:"440304",label:"福田区"},{id:"440305",value:"440305",label:"南山区"},{id:"440306",value:"440306",label:"宝安区"},{id:"440307",value:"440307",label:"龙岗区"},{id:"440308",value:"440308",label:"盐田区"},{id:"440309",value:"440309",label:"龙华区"},{id:"440310",value:"440310",label:"坪山区"},{id:"440311",value:"440311",label:"光明区"},{id:"440312",value:"440312",label:"大鹏新区"}]},{id:"440400",value:"440400",label:"珠海市",children:[{id:"440402",value:"440402",label:"香洲区"},{id:"440403",value:"440403",label:"斗门区"},{id:"440404",value:"440404",label:"金湾区"},{id:"440405",value:"440405",label:"横琴新区"},{id:"440406",value:"440406",label:"经济开发区"}]},{id:"440500",value:"440500",label:"汕头市",children:[{id:"440507",value:"440507",label:"龙湖区"},{id:"440511",value:"440511",label:"金平区"},{id:"440512",value:"440512",label:"濠江区"},{id:"440513",value:"440513",label:"潮阳区"},{id:"440514",value:"440514",label:"潮南区"},{id:"440515",value:"440515",label:"澄海区"},{id:"440523",value:"440523",label:"南澳县"}]},{id:"440600",value:"440600",label:"佛山市",children:[{id:"440604",value:"440604",label:"禅城区"},{id:"440605",value:"440605",label:"南海区"},{id:"440606",value:"440606",label:"顺德区"},{id:"440607",value:"440607",label:"三水区"},{id:"440608",value:"440608",label:"高明区"}]},{id:"440700",value:"440700",label:"江门市",children:[{id:"440703",value:"440703",label:"蓬江区"},{id:"440704",value:"440704",label:"江海区"},{id:"440705",value:"440705",label:"新会区"},{id:"440781",value:"440781",label:"台山市"},{id:"440783",value:"440783",label:"开平市"},{id:"440784",value:"440784",label:"鹤山市"},{id:"440785",value:"440785",label:"恩平市"}]},{id:"440800",value:"440800",label:"湛江市",children:[{id:"440802",value:"440802",label:"赤坎区"},{id:"440803",value:"440803",label:"霞山区"},{id:"440804",value:"440804",label:"坡头区"},{id:"440811",value:"440811",label:"麻章区"},{id:"440823",value:"440823",label:"遂溪县"},{id:"440825",value:"440825",label:"徐闻县"},{id:"440881",value:"440881",label:"廉江市"},{id:"440882",value:"440882",label:"雷州市"},{id:"440883",value:"440883",label:"吴川市"},{id:"440884",value:"440884",label:"经济开发区"}]},{id:"440900",value:"440900",label:"茂名市",children:[{id:"440902",value:"440902",label:"茂南区"},{id:"440904",value:"440904",label:"电白区"},{id:"440981",value:"440981",label:"高州市"},{id:"440982",value:"440982",label:"化州市"},{id:"440983",value:"440983",label:"信宜市"}]},{id:"441200",value:"441200",label:"肇庆市",children:[{id:"441202",value:"441202",label:"端州区"},{id:"441203",value:"441203",label:"鼎湖区"},{id:"441204",value:"441204",label:"高要区"},{id:"441223",value:"441223",label:"广宁县"},{id:"441224",value:"441224",label:"怀集县"},{id:"441225",value:"441225",label:"封开县"},{id:"441226",value:"441226",label:"德庆县"},{id:"441284",value:"441284",label:"四会市"}]},{id:"441300",value:"441300",label:"惠州市",children:[{id:"441302",value:"441302",label:"惠城区"},{id:"441303",value:"441303",label:"惠阳区"},{id:"441322",value:"441322",label:"博罗县"},{id:"441323",value:"441323",label:"惠东县"},{id:"441324",value:"441324",label:"龙门县"},{id:"441325",value:"441325",label:"大亚湾区"}]},{id:"441400",value:"441400",label:"梅州市",children:[{id:"441402",value:"441402",label:"梅江区"},{id:"441403",value:"441403",label:"梅县区"},{id:"441422",value:"441422",label:"大埔县"},{id:"441423",value:"441423",label:"丰顺县"},{id:"441424",value:"441424",label:"五华县"},{id:"441426",value:"441426",label:"平远县"},{id:"441427",value:"441427",label:"蕉岭县"},{id:"441481",value:"441481",label:"兴宁市"}]},{id:"441500",value:"441500",label:"汕尾市",children:[{id:"441502",value:"441502",label:"城区"},{id:"441521",value:"441521",label:"海丰县"},{id:"441523",value:"441523",label:"陆河县"},{id:"441581",value:"441581",label:"陆丰市"}]},{id:"441600",value:"441600",label:"河源市",children:[{id:"441602",value:"441602",label:"源城区"},{id:"441621",value:"441621",label:"紫金县"},{id:"441622",value:"441622",label:"龙川县"},{id:"441623",value:"441623",label:"连平县"},{id:"441624",value:"441624",label:"和平县"},{id:"441625",value:"441625",label:"东源县"}]},{id:"441700",value:"441700",label:"阳江市",children:[{id:"441702",value:"441702",label:"江城区"},{id:"441704",value:"441704",label:"阳东区"},{id:"441721",value:"441721",label:"阳西县"},{id:"441781",value:"441781",label:"阳春市"}]},{id:"441800",value:"441800",label:"清远市",children:[{id:"441802",value:"441802",label:"清城区"},{id:"441803",value:"441803",label:"清新区"},{id:"441821",value:"441821",label:"佛冈县"},{id:"441823",value:"441823",label:"阳山县"},{id:"441825",value:"441825",label:"连山壮族瑶族自治县"},{id:"441826",value:"441826",label:"连南瑶族自治县"},{id:"441881",value:"441881",label:"英德市"},{id:"441882",value:"441882",label:"连州市"}]},{id:"441900",value:"441900",label:"东莞市",children:[{id:"441901",value:"441901",label:"莞城区"},{id:"441902",value:"441902",label:"南城区"},{id:"441903",value:"441903",label:"东城区"},{id:"441904",value:"441904",label:"万江区"},{id:"441905",value:"441905",label:"石碣镇"},{id:"441906",value:"441906",label:"石龙镇"},{id:"441907",value:"441907",label:"茶山镇"},{id:"441908",value:"441908",label:"石排镇"},{id:"441909",value:"441909",label:"企石镇"},{id:"441910",value:"441910",label:"横沥镇"},{id:"441911",value:"441911",label:"桥头镇"},{id:"441912",value:"441912",label:"谢岗镇"},{id:"441913",value:"441913",label:"东坑镇"},{id:"441914",value:"441914",label:"常平镇"},{id:"441915",value:"441915",label:"寮步镇"},{id:"441916",value:"441916",label:"大朗镇"},{id:"441917",value:"441917",label:"麻涌镇"},{id:"441918",value:"441918",label:"中堂镇"},{id:"441919",value:"441919",label:"高埗镇"},{id:"441920",value:"441920",label:"樟木头镇"},{id:"441921",value:"441921",label:"大岭山镇"},{id:"441922",value:"441922",label:"望牛墩镇"},{id:"441923",value:"441923",label:"黄江镇"},{id:"441924",value:"441924",label:"洪梅镇"},{id:"441925",value:"441925",label:"清溪镇"},{id:"441926",value:"441926",label:"沙田镇"},{id:"441927",value:"441927",label:"道滘镇"},{id:"441928",value:"441928",label:"塘厦镇"},{id:"441929",value:"441929",label:"虎门镇"},{id:"441930",value:"441930",label:"厚街镇"},{id:"441931",value:"441931",label:"凤岗镇"},{id:"441932",value:"441932",label:"长安镇"},{id:"441933",value:"441933",label:"松山湖高新区"}]},{id:"442000",value:"442000",label:"中山市",children:[{id:"442001",value:"442001",label:"石岐区"},{id:"442002",value:"442002",label:"东区"},{id:"442003",value:"442003",label:"西区"},{id:"442004",value:"442004",label:"南区"},{id:"442005",value:"442005",label:"五桂山区"},{id:"442006",value:"442006",label:"火炬开发区"},{id:"442007",value:"442007",label:"黄圃镇"},{id:"442008",value:"442008",label:"南头镇"},{id:"442009",value:"442009",label:"东凤镇"},{id:"442010",value:"442010",label:"阜沙镇"},{id:"442011",value:"442011",label:"小榄镇"},{id:"442012",value:"442012",label:"东升镇"},{id:"442013",value:"442013",label:"古镇镇"},{id:"442014",value:"442014",label:"横栏镇"},{id:"442015",value:"442015",label:"三角镇"},{id:"442016",value:"442016",label:"民众镇"},{id:"442017",value:"442017",label:"南朗镇"},{id:"442018",value:"442018",label:"港口镇"},{id:"442019",value:"442019",label:"大涌镇"},{id:"442020",value:"442020",label:"沙溪镇"},{id:"442021",value:"442021",label:"三乡镇"},{id:"442022",value:"442022",label:"板芙镇"},{id:"442023",value:"442023",label:"神湾镇"},{id:"442024",value:"442024",label:"坦洲镇"}]},{id:"445100",value:"445100",label:"潮州市",children:[{id:"445102",value:"445102",label:"湘桥区"},{id:"445103",value:"445103",label:"潮安区"},{id:"445122",value:"445122",label:"饶平县"}]},{id:"445200",value:"445200",label:"揭阳市",children:[{id:"445202",value:"445202",label:"榕城区"},{id:"445203",value:"445203",label:"揭东区"},{id:"445222",value:"445222",label:"揭西县"},{id:"445224",value:"445224",label:"惠来县"},{id:"445281",value:"445281",label:"普宁市"}]},{id:"445300",value:"445300",label:"云浮市",children:[{id:"445302",value:"445302",label:"云城区"},{id:"445303",value:"445303",label:"云安区"},{id:"445321",value:"445321",label:"新兴县"},{id:"445322",value:"445322",label:"郁南县"},{id:"445381",value:"445381",label:"罗定市"}]}]},{id:"520000",value:"520000",label:"贵州省",key:"",children:[{id:"520100",value:"520100",label:"贵阳市",children:[{id:"520102",value:"520102",label:"南明区"},{id:"520103",value:"520103",label:"云岩区"},{id:"520111",value:"520111",label:"花溪区"},{id:"520112",value:"520112",label:"乌当区"},{id:"520113",value:"520113",label:"白云区"},{id:"520115",value:"520115",label:"观山湖区"},{id:"520121",value:"520121",label:"开阳县"},{id:"520122",value:"520122",label:"息烽县"},{id:"520123",value:"520123",label:"修文县"},{id:"520181",value:"520181",label:"清镇市"},{id:"520182",value:"520182",label:"贵安新区"},{id:"520183",value:"520183",label:"高新区"}]},{id:"520200",value:"520200",label:"六盘水市",children:[{id:"520201",value:"520201",label:"钟山区"},{id:"520203",value:"520203",label:"六枝特区"},{id:"520221",value:"520221",label:"水城县"},{id:"520281",value:"520281",label:"盘州市"}]},{id:"520300",value:"520300",label:"遵义市",children:[{id:"520302",value:"520302",label:"红花岗区"},{id:"520303",value:"520303",label:"汇川区"},{id:"520304",value:"520304",label:"播州区"},{id:"520322",value:"520322",label:"桐梓县"},{id:"520323",value:"520323",label:"绥阳县"},{id:"520324",value:"520324",label:"正安县"},{id:"520325",value:"520325",label:"道真仡佬族苗族自治县"},{id:"520326",value:"520326",label:"务川仡佬族苗族自治县"},{id:"520327",value:"520327",label:"凤冈县"},{id:"520328",value:"520328",label:"湄潭县"},{id:"520329",value:"520329",label:"余庆县"},{id:"520330",value:"520330",label:"习水县"},{id:"520381",value:"520381",label:"赤水市"},{id:"520382",value:"520382",label:"仁怀市"}]},{id:"520400",value:"520400",label:"安顺市",children:[{id:"520402",value:"520402",label:"西秀区"},{id:"520403",value:"520403",label:"平坝区"},{id:"520422",value:"520422",label:"普定县"},{id:"520423",value:"520423",label:"镇宁布依族苗族自治县"},{id:"520424",value:"520424",label:"关岭布依族苗族自治县"},{id:"520425",value:"520425",label:"紫云苗族布依族自治县"}]},{id:"520500",value:"520500",label:"毕节市",children:[{id:"520502",value:"520502",label:"七星关区"},{id:"520521",value:"520521",label:"大方县"},{id:"520522",value:"520522",label:"黔西县"},{id:"520523",value:"520523",label:"金沙县"},{id:"520524",value:"520524",label:"织金县"},{id:"520525",value:"520525",label:"纳雍县"},{id:"520526",value:"520526",label:"威宁彝族回族苗族自治县"},{id:"520527",value:"520527",label:"赫章县"}]},{id:"520600",value:"520600",label:"铜仁市",children:[{id:"520602",value:"520602",label:"碧江区"},{id:"520603",value:"520603",label:"万山区"},{id:"520621",value:"520621",label:"江口县"},{id:"520622",value:"520622",label:"玉屏侗族自治县"},{id:"520623",value:"520623",label:"石阡县"},{id:"520624",value:"520624",label:"思南县"},{id:"520625",value:"520625",label:"印江土家族苗族自治县"},{id:"520626",value:"520626",label:"德江县"},{id:"520627",value:"520627",label:"沿河土家族自治县"},{id:"520628",value:"520628",label:"松桃苗族自治县"}]},{id:"522300",value:"522300",label:"黔西南布依族苗族自治州",children:[{id:"522301",value:"522301",label:"兴义市 "},{id:"522322",value:"522322",label:"兴仁县"},{id:"522323",value:"522323",label:"普安县"},{id:"522324",value:"522324",label:"晴隆县"},{id:"522325",value:"522325",label:"贞丰县"},{id:"522326",value:"522326",label:"望谟县"},{id:"522327",value:"522327",label:"册亨县"},{id:"522328",value:"522328",label:"安龙县"}]},{id:"522600",value:"522600",label:"黔东南苗族侗族自治州",children:[{id:"522601",value:"522601",label:"凯里市"},{id:"522622",value:"522622",label:"黄平县"},{id:"522623",value:"522623",label:"施秉县"},{id:"522624",value:"522624",label:"三穗县"},{id:"522625",value:"522625",label:"镇远县"},{id:"522626",value:"522626",label:"岑巩县"},{id:"522627",value:"522627",label:"天柱县"},{id:"522628",value:"522628",label:"锦屏县"},{id:"522629",value:"522629",label:"剑河县"},{id:"522630",value:"522630",label:"台江县"},{id:"522631",value:"522631",label:"黎平县"},{id:"522632",value:"522632",label:"榕江县"},{id:"522633",value:"522633",label:"从江县"},{id:"522634",value:"522634",label:"雷山县"},{id:"522635",value:"522635",label:"麻江县"},{id:"522636",value:"522636",label:"丹寨县"}]},{id:"522700",value:"522700",label:"黔南布依族苗族自治州",children:[{id:"522701",value:"522701",label:"都匀市"},{id:"522702",value:"522702",label:"福泉市"},{id:"522722",value:"522722",label:"荔波县"},{id:"522723",value:"522723",label:"贵定县"},{id:"522725",value:"522725",label:"瓮安县"},{id:"522726",value:"522726",label:"独山县"},{id:"522727",value:"522727",label:"平塘县"},{id:"522728",value:"522728",label:"罗甸县"},{id:"522729",value:"522729",label:"长顺县"},{id:"522730",value:"522730",label:"龙里县"},{id:"522731",value:"522731",label:"惠水县"},{id:"522732",value:"522732",label:"三都水族自治县"}]}]},{id:"620000",value:"620000",label:"甘肃省",key:"",children:[{id:"620100",value:"620100",label:"兰州市",children:[{id:"620102",value:"620102",label:"城关区"},{id:"620103",value:"620103",label:"七里河区"},{id:"620104",value:"620104",label:"西固区"},{id:"620105",value:"620105",label:"安宁区"},{id:"620111",value:"620111",label:"红古区"},{id:"620121",value:"620121",label:"永登县"},{id:"620122",value:"620122",label:"皋兰县"},{id:"620123",value:"620123",label:"榆中县"},{id:"620124",value:"620124",label:"兰州新区"},{id:"620125",value:"620125",label:"高新区"},{id:"620126",value:"620126",label:"经济开发区"}]},{id:"620200",value:"620200",label:"嘉峪关市",children:[{id:"620201",value:"620201",label:"雄关区"},{id:"620202",value:"620202",label:"长城区"},{id:"620203",value:"620203",label:"镜铁区"}]},{id:"620300",value:"620300",label:"金昌市",children:[{id:"620302",value:"620302",label:"金川区"},{id:"620321",value:"620321",label:"永昌县"}]},{id:"620400",value:"620400",label:"白银市",children:[{id:"620402",value:"620402",label:"白银区"},{id:"620403",value:"620403",label:"平川区"},{id:"620421",value:"620421",label:"靖远县"},{id:"620422",value:"620422",label:"会宁县"},{id:"620423",value:"620423",label:"景泰县"}]},{id:"620500",value:"620500",label:"天水市",children:[{id:"620502",value:"620502",label:"秦州区"},{id:"620503",value:"620503",label:"麦积区"},{id:"620521",value:"620521",label:"清水县"},{id:"620522",value:"620522",label:"秦安县"},{id:"620523",value:"620523",label:"甘谷县"},{id:"620524",value:"620524",label:"武山县"},{id:"620525",value:"620525",label:"张家川回族自治县"}]},{id:"620600",value:"620600",label:"武威市",children:[{id:"620602",value:"620602",label:"凉州区"},{id:"620621",value:"620621",label:"民勤县"},{id:"620622",value:"620622",label:"古浪县"},{id:"620623",value:"620623",label:"天祝藏族自治县"}]},{id:"620700",value:"620700",label:"张掖市",children:[{id:"620702",value:"620702",label:"甘州区"},{id:"620721",value:"620721",label:"肃南裕固族自治县"},{id:"620722",value:"620722",label:"民乐县"},{id:"620723",value:"620723",label:"临泽县"},{id:"620724",value:"620724",label:"高台县"},{id:"620725",value:"620725",label:"山丹县"}]},{id:"620800",value:"620800",label:"平凉市",children:[{id:"620802",value:"620802",label:"崆峒区"},{id:"620821",value:"620821",label:"泾川县"},{id:"620822",value:"620822",label:"灵台县"},{id:"620823",value:"620823",label:"崇信县"},{id:"620825",value:"620825",label:"庄浪县"},{id:"620826",value:"620826",label:"静宁县"},{id:"620881",value:"620881",label:"华亭市"}]},{id:"620900",value:"620900",label:"酒泉市",children:[{id:"620902",value:"620902",label:"肃州区"},{id:"620921",value:"620921",label:"金塔县"},{id:"620922",value:"620922",label:"瓜州县"},{id:"620923",value:"620923",label:"肃北蒙古族自治县"},{id:"620924",value:"620924",label:"阿克塞哈萨克族自治县"},{id:"620981",value:"620981",label:"玉门市"},{id:"620982",value:"620982",label:"敦煌市"}]},{id:"621000",value:"621000",label:"庆阳市",children:[{id:"621002",value:"621002",label:"西峰区"},{id:"621021",value:"621021",label:"庆城县"},{id:"621022",value:"621022",label:"环县"},{id:"621023",value:"621023",label:"华池县"},{id:"621024",value:"621024",label:"合水县"},{id:"621025",value:"621025",label:"正宁县"},{id:"621026",value:"621026",label:"宁县"},{id:"621027",value:"621027",label:"镇原县"}]},{id:"621100",value:"621100",label:"定西市",children:[{id:"621102",value:"621102",label:"安定区"},{id:"621121",value:"621121",label:"通渭县"},{id:"621122",value:"621122",label:"陇西县"},{id:"621123",value:"621123",label:"渭源县"},{id:"621124",value:"621124",label:"临洮县"},{id:"621125",value:"621125",label:"漳县"},{id:"621126",value:"621126",label:"岷县"}]},{id:"621200",value:"621200",label:"陇南市",children:[{id:"621202",value:"621202",label:"武都区"},{id:"621221",value:"621221",label:"成县"},{id:"621222",value:"621222",label:"文县"},{id:"621223",value:"621223",label:"宕昌县"},{id:"621224",value:"621224",label:"康县"},{id:"621225",value:"621225",label:"西和县"},{id:"621226",value:"621226",label:"礼县"},{id:"621227",value:"621227",label:"徽县"},{id:"621228",value:"621228",label:"两当县"}]},{id:"622900",value:"622900",label:"临夏回族自治州",children:[{id:"622901",value:"622901",label:"临夏市"},{id:"622921",value:"622921",label:"临夏县"},{id:"622922",value:"622922",label:"康乐县"},{id:"622923",value:"622923",label:"永靖县"},{id:"622924",value:"622924",label:"广河县"},{id:"622925",value:"622925",label:"和政县"},{id:"622926",value:"622926",label:"东乡族自治县"},{id:"622927",value:"622927",label:"积石山保安族东乡族撒拉族自治县"}]},{id:"623000",value:"623000",label:"甘南藏族自治州",children:[{id:"623001",value:"623001",label:"合作市"},{id:"623021",value:"623021",label:"临潭县"},{id:"623022",value:"623022",label:"卓尼县"},{id:"623023",value:"623023",label:"舟曲县"},{id:"623024",value:"623024",label:"迭部县"},{id:"623025",value:"623025",label:"玛曲县"},{id:"623026",value:"623026",label:"碌曲县"},{id:"623027",value:"623027",label:"夏河县"}]}]},{id:"450000",value:"450000",label:"广西",key:"",children:[{id:"450100",value:"450100",label:"南宁市",children:[{id:"450102",value:"450102",label:"兴宁区"},{id:"450103",value:"450103",label:"青秀区"},{id:"450105",value:"450105",label:"江南区"},{id:"450107",value:"450107",label:"西乡塘区"},{id:"450108",value:"450108",label:"良庆区"},{id:"450109",value:"450109",label:"邕宁区"},{id:"450110",value:"450110",label:"武鸣区"},{id:"450123",value:"450123",label:"隆安县"},{id:"450124",value:"450124",label:"马山县"},{id:"450125",value:"450125",label:"上林县"},{id:"450126",value:"450126",label:"宾阳县"},{id:"450127",value:"450127",label:"横县"},{id:"450128",value:"450128",label:"埌东新区"}]},{id:"450200",value:"450200",label:"柳州市",children:[{id:"450202",value:"450202",label:"城中区"},{id:"450203",value:"450203",label:"鱼峰区"},{id:"450204",value:"450204",label:"柳南区"},{id:"450205",value:"450205",label:"柳北区"},{id:"450206",value:"450206",label:"柳江区"},{id:"450222",value:"450222",label:"柳城县"},{id:"450223",value:"450223",label:"鹿寨县"},{id:"450224",value:"450224",label:"融安县"},{id:"450225",value:"450225",label:"融水苗族自治县"},{id:"450226",value:"450226",label:"三江侗族自治县"},{id:"450227",value:"450227",label:"柳东新区"}]},{id:"450300",value:"450300",label:"桂林市",children:[{id:"450302",value:"450302",label:"秀峰区"},{id:"450303",value:"450303",label:"叠彩区"},{id:"450304",value:"450304",label:"象山区"},{id:"450305",value:"450305",label:"七星区"},{id:"450311",value:"450311",label:"雁山区"},{id:"450312",value:"450312",label:"临桂区"},{id:"450321",value:"450321",label:"阳朔县"},{id:"450323",value:"450323",label:"灵川县"},{id:"450324",value:"450324",label:"全州县"},{id:"450325",value:"450325",label:"兴安县"},{id:"450326",value:"450326",label:"永福县"},{id:"450327",value:"450327",label:"灌阳县"},{id:"450328",value:"450328",label:"龙胜各族自治县"},{id:"450329",value:"450329",label:"资源县"},{id:"450330",value:"450330",label:"平乐县"},{id:"450331",value:"450331",label:"荔浦市"},{id:"450332",value:"450332",label:"恭城瑶族自治县"}]},{id:"450400",value:"450400",label:"梧州市",children:[{id:"450403",value:"450403",label:"万秀区"},{id:"450405",value:"450405",label:"长洲区"},{id:"450406",value:"450406",label:"龙圩区"},{id:"450421",value:"450421",label:"苍梧县"},{id:"450422",value:"450422",label:"藤县"},{id:"450423",value:"450423",label:"蒙山县"},{id:"450481",value:"450481",label:"岑溪市"}]},{id:"450500",value:"450500",label:"北海市",children:[{id:"450502",value:"450502",label:"海城区"},{id:"450503",value:"450503",label:"银海区"},{id:"450512",value:"450512",label:"铁山港区"},{id:"450521",value:"450521",label:"合浦县"}]},{id:"450600",value:"450600",label:"防城港市",children:[{id:"450602",value:"450602",label:"港口区"},{id:"450603",value:"450603",label:"防城区"},{id:"450621",value:"450621",label:"上思县"},{id:"450681",value:"450681",label:"东兴市"}]},{id:"450700",value:"450700",label:"钦州市",children:[{id:"450702",value:"450702",label:"钦南区"},{id:"450703",value:"450703",label:"钦北区"},{id:"450721",value:"450721",label:"灵山县"},{id:"450722",value:"450722",label:"浦北县"}]},{id:"450800",value:"450800",label:"贵港市",children:[{id:"450802",value:"450802",label:"港北区"},{id:"450803",value:"450803",label:"港南区"},{id:"450804",value:"450804",label:"覃塘区"},{id:"450821",value:"450821",label:"平南县"},{id:"450881",value:"450881",label:"桂平市"}]},{id:"450900",value:"450900",label:"玉林市",children:[{id:"450902",value:"450902",label:"玉州区"},{id:"450903",value:"450903",label:"福绵区"},{id:"450921",value:"450921",label:"容县"},{id:"450922",value:"450922",label:"陆川县"},{id:"450923",value:"450923",label:"博白县"},{id:"450924",value:"450924",label:"兴业县"},{id:"450981",value:"450981",label:"北流市"},{id:"450982",value:"450982",label:"玉东新区"},{id:"450983",value:"450983",label:"高新区"}]},{id:"451000",value:"451000",label:"百色市",children:[{id:"451002",value:"451002",label:"右江区"},{id:"451021",value:"451021",label:"田阳县"},{id:"451022",value:"451022",label:"田东县"},{id:"451023",value:"451023",label:"平果县"},{id:"451024",value:"451024",label:"德保县"},{id:"451026",value:"451026",label:"那坡县"},{id:"451027",value:"451027",label:"凌云县"},{id:"451028",value:"451028",label:"乐业县"},{id:"451029",value:"451029",label:"田林县"},{id:"451030",value:"451030",label:"西林县"},{id:"451031",value:"451031",label:"隆林各族自治县"},{id:"451081",value:"451081",label:"靖西市"}]},{id:"451100",value:"451100",label:"贺州市",children:[{id:"451102",value:"451102",label:"八步区"},{id:"451103",value:"451103",label:"平桂区"},{id:"451121",value:"451121",label:"昭平县"},{id:"451122",value:"451122",label:"钟山县"},{id:"451123",value:"451123",label:"富川瑶族自治县"}]},{id:"451200",value:"451200",label:"河池市",children:[{id:"451202",value:"451202",label:"金城江区"},{id:"451203",value:"451203",label:"宜州区"},{id:"451221",value:"451221",label:"南丹县"},{id:"451222",value:"451222",label:"天峨县"},{id:"451223",value:"451223",label:"凤山县"},{id:"451224",value:"451224",label:"东兰县"},{id:"451225",value:"451225",label:"罗城仫佬族自治县"},{id:"451226",value:"451226",label:"环江毛南族自治县"},{id:"451227",value:"451227",label:"巴马瑶族自治县"},{id:"451228",value:"451228",label:"都安瑶族自治县"},{id:"451229",value:"451229",label:"大化瑶族自治县"}]},{id:"451300",value:"451300",label:"来宾市",children:[{id:"451302",value:"451302",label:"兴宾区"},{id:"451321",value:"451321",label:"忻城县"},{id:"451322",value:"451322",label:"象州县"},{id:"451323",value:"451323",label:"武宣县"},{id:"451324",value:"451324",label:"金秀瑶族自治县"},{id:"451381",value:"451381",label:"合山市"}]},{id:"451400",value:"451400",label:"崇左市",children:[{id:"451402",value:"451402",label:"江州区"},{id:"451421",value:"451421",label:"扶绥县"},{id:"451422",value:"451422",label:"宁明县"},{id:"451423",value:"451423",label:"龙州县"},{id:"451424",value:"451424",label:"大新县"},{id:"451425",value:"451425",label:"天等县"},{id:"451481",value:"451481",label:"凭祥市"}]}]},{id:"130000",value:"130000",label:"河北省",key:"H",children:[{id:"130100",value:"130100",label:"石家庄市",children:[{id:"130102",value:"130102",label:"长安区"},{id:"130104",value:"130104",label:"桥西区"},{id:"130105",value:"130105",label:"新华区"},{id:"130107",value:"130107",label:"井陉矿区"},{id:"130108",value:"130108",label:"裕华区"},{id:"130109",value:"130109",label:"藁城区"},{id:"130110",value:"130110",label:"鹿泉区"},{id:"130111",value:"130111",label:"栾城区"},{id:"130121",value:"130121",label:"井陉县"},{id:"130123",value:"130123",label:"正定新区"},{id:"130125",value:"130125",label:"行唐县"},{id:"130126",value:"130126",label:"灵寿县"},{id:"130127",value:"130127",label:"高邑县"},{id:"130128",value:"130128",label:"深泽县"},{id:"130129",value:"130129",label:"赞皇县"},{id:"130130",value:"130130",label:"无极县"},{id:"130131",value:"130131",label:"平山县"},{id:"130132",value:"130132",label:"元氏县"},{id:"130133",value:"130133",label:"赵县"},{id:"130181",value:"130181",label:"辛集市"},{id:"130183",value:"130183",label:"晋州市"},{id:"130184",value:"130184",label:"新乐市"},{id:"130185",value:"130185",label:"高新区"},{id:"130186",value:"130186",label:"经济开发区"},{id:"130187",value:"130187",label:"循环化工园区"}]},{id:"130200",value:"130200",label:"唐山市",children:[{id:"130202",value:"130202",label:"路南区"},{id:"130203",value:"130203",label:"路北区"},{id:"130204",value:"130204",label:"古冶区"},{id:"130205",value:"130205",label:"开平区"},{id:"130207",value:"130207",label:"丰南区"},{id:"130208",value:"130208",label:"丰润区"},{id:"130209",value:"130209",label:"曹妃甸区"},{id:"130223",value:"130223",label:"滦县"},{id:"130224",value:"130224",label:"滦南县"},{id:"130225",value:"130225",label:"乐亭县"},{id:"130227",value:"130227",label:"迁西县"},{id:"130229",value:"130229",label:"玉田县"},{id:"130281",value:"130281",label:"遵化市"},{id:"130283",value:"130283",label:"迁安市"},{id:"130291",value:"130291",label:"高新区"},{id:"130292",value:"130292",label:"芦台开发区"},{id:"130293",value:"130293",label:"海港经济开发区"},{id:"130294",value:"130294",label:"汉沽管理区"}]},{id:"130300",value:"130300",label:"秦皇岛市",children:[{id:"130302",value:"130302",label:"海港区"},{id:"130303",value:"130303",label:"山海关区"},{id:"130304",value:"130304",label:"北戴河区"},{id:"130306",value:"130306",label:"抚宁区"},{id:"130321",value:"130321",label:"青龙满族自治县"},{id:"130322",value:"130322",label:"昌黎县"},{id:"130324",value:"130324",label:"卢龙县"},{id:"130371",value:"130371",label:"经济技术开发区"},{id:"130372",value:"130372",label:"北戴河新区"}]},{id:"130400",value:"130400",label:"邯郸市",children:[{id:"130402",value:"130402",label:"邯山区"},{id:"130403",value:"130403",label:"丛台区"},{id:"130404",value:"130404",label:"复兴区"},{id:"130406",value:"130406",label:"峰峰矿区"},{id:"130407",value:"130407",label:"肥乡区"},{id:"130408",value:"130408",label:"永年区"},{id:"130423",value:"130423",label:"临漳县"},{id:"130424",value:"130424",label:"成安县"},{id:"130425",value:"130425",label:"大名县"},{id:"130426",value:"130426",label:"涉县"},{id:"130427",value:"130427",label:"磁县"},{id:"130430",value:"130430",label:"邱县"},{id:"130431",value:"130431",label:"鸡泽县"},{id:"130432",value:"130432",label:"广平县"},{id:"130433",value:"130433",label:"馆陶县"},{id:"130434",value:"130434",label:"魏县"},{id:"130435",value:"130435",label:"曲周县"},{id:"130481",value:"130481",label:"武安市"},{id:"130482",value:"130482",label:"冀南新区"},{id:"130483",value:"130483",label:"高新技术产业开发区"}]},{id:"130500",value:"130500",label:"邢台市",children:[{id:"130502",value:"130502",label:"桥东区"},{id:"130503",value:"130503",label:"桥西区"},{id:"130521",value:"130521",label:"邢台县"},{id:"130522",value:"130522",label:"临城县"},{id:"130523",value:"130523",label:"内丘县"},{id:"130524",value:"130524",label:"柏乡县"},{id:"130525",value:"130525",label:"隆尧县"},{id:"130526",value:"130526",label:"任县"},{id:"130527",value:"130527",label:"南和县"},{id:"130528",value:"130528",label:"宁晋县"},{id:"130529",value:"130529",label:"巨鹿县"},{id:"130530",value:"130530",label:"新河县"},{id:"130531",value:"130531",label:"广宗县"},{id:"130532",value:"130532",label:"平乡县"},{id:"130533",value:"130533",label:"威县"},{id:"130534",value:"130534",label:"清河县"},{id:"130535",value:"130535",label:"临西县"},{id:"130581",value:"130581",label:"南宫市"},{id:"130582",value:"130582",label:"沙河市"},{id:"130583",value:"130583",label:"经济开发区"}]},{id:"130600",value:"130600",label:"保定市",children:[{id:"130602",value:"130602",label:"竞秀区"},{id:"130606",value:"130606",label:"莲池区"},{id:"130607",value:"130607",label:"满城区"},{id:"130608",value:"130608",label:"清苑区"},{id:"130609",value:"130609",label:"徐水区"},{id:"130623",value:"130623",label:"涞水县"},{id:"130624",value:"130624",label:"阜平县"},{id:"130626",value:"130626",label:"定兴县"},{id:"130627",value:"130627",label:"唐县"},{id:"130628",value:"130628",label:"高阳县"},{id:"130629",value:"130629",label:"容城县"},{id:"130630",value:"130630",label:"涞源县"},{id:"130631",value:"130631",label:"望都县"},{id:"130632",value:"130632",label:"安新县"},{id:"130633",value:"130633",label:"易县"},{id:"130634",value:"130634",label:"曲阳县"},{id:"130635",value:"130635",label:"蠡县"},{id:"130636",value:"130636",label:"顺平县"},{id:"130637",value:"130637",label:"博野县"},{id:"130638",value:"130638",label:"雄县"},{id:"130681",value:"130681",label:"涿州市"},{id:"130682",value:"130682",label:"定州市"},{id:"130683",value:"130683",label:"安国市"},{id:"130684",value:"130684",label:"高碑店市"},{id:"130685",value:"130685",label:"雄安新区"},{id:"130686",value:"130686",label:"高新区"},{id:"130687",value:"130687",label:"白沟新城"}]},{id:"130700",value:"130700",label:"张家口市",children:[{id:"130702",value:"130702",label:"桥东区"},{id:"130703",value:"130703",label:"桥西区"},{id:"130705",value:"130705",label:"宣化区"},{id:"130706",value:"130706",label:"下花园区"},{id:"130708",value:"130708",label:"万全区"},{id:"130709",value:"130709",label:"崇礼区"},{id:"130722",value:"130722",label:"张北县"},{id:"130723",value:"130723",label:"康保县"},{id:"130724",value:"130724",label:"沽源县"},{id:"130725",value:"130725",label:"尚义县"},{id:"130726",value:"130726",label:"蔚县"},{id:"130727",value:"130727",label:"阳原县"},{id:"130728",value:"130728",label:"怀安县"},{id:"130730",value:"130730",label:"怀来县"},{id:"130731",value:"130731",label:"涿鹿县"},{id:"130732",value:"130732",label:"赤城县"},{id:"130771",value:"130771",label:"高新区"},{id:"130772",value:"130772",label:"察北管理区"},{id:"130773",value:"130773",label:"塞北管理区"}]},{id:"130800",value:"130800",label:"承德市",children:[{id:"130802",value:"130802",label:"双桥区"},{id:"130803",value:"130803",label:"双滦区"},{id:"130804",value:"130804",label:"鹰手营子矿区"},{id:"130821",value:"130821",label:"承德县"},{id:"130822",value:"130822",label:"兴隆县"},{id:"130824",value:"130824",label:"滦平县"},{id:"130825",value:"130825",label:"隆化县"},{id:"130826",value:"130826",label:"丰宁满族自治县"},{id:"130827",value:"130827",label:"宽城满族自治县"},{id:"130828",value:"130828",label:"围场满族蒙古族自治县"},{id:"130881",value:"130881",label:"平泉市"},{id:"130882",value:"130882",label:"高新区"}]},{id:"130900",value:"130900",label:"沧州市",children:[{id:"130902",value:"130902",label:"新华区"},{id:"130903",value:"130903",label:"运河区"},{id:"130921",value:"130921",label:"沧县"},{id:"130922",value:"130922",label:"青县"},{id:"130923",value:"130923",label:"东光县"},{id:"130924",value:"130924",label:"海兴县"},{id:"130925",value:"130925",label:"盐山县"},{id:"130926",value:"130926",label:"肃宁县"},{id:"130927",value:"130927",label:"南皮县"},{id:"130928",value:"130928",label:"吴桥县"},{id:"130929",value:"130929",label:"献县"},{id:"130930",value:"130930",label:"孟村回族自治县"},{id:"130981",value:"130981",label:"泊头市"},{id:"130982",value:"130982",label:"任丘市"},{id:"130983",value:"130983",label:"黄骅市"},{id:"130984",value:"130984",label:"河间市"},{id:"130985",value:"130985",label:"渤海新区"},{id:"130986",value:"130986",label:"高新区"},{id:"130987",value:"130987",label:"临港开发区"}]},{id:"131000",value:"131000",label:"廊坊市",children:[{id:"131002",value:"131002",label:"安次区"},{id:"131003",value:"131003",label:"广阳区"},{id:"131022",value:"131022",label:"固安县"},{id:"131023",value:"131023",label:"永清县"},{id:"131024",value:"131024",label:"香河县"},{id:"131025",value:"131025",label:"大城县"},{id:"131026",value:"131026",label:"文安县"},{id:"131028",value:"131028",label:"大厂回族自治县"},{id:"131081",value:"131081",label:"霸州市"},{id:"131082",value:"131082",label:"三河市"},{id:"131083",value:"131083",label:"经济技术开发区"}]},{id:"131100",value:"131100",label:"衡水市",children:[{id:"131102",value:"131102",label:"桃城区"},{id:"131103",value:"131103",label:"冀州区"},{id:"131121",value:"131121",label:"枣强县"},{id:"131122",value:"131122",label:"武邑县"},{id:"131123",value:"131123",label:"武强县"},{id:"131124",value:"131124",label:"饶阳县"},{id:"131125",value:"131125",label:"安平县"},{id:"131126",value:"131126",label:"故城县"},{id:"131127",value:"131127",label:"景县"},{id:"131128",value:"131128",label:"阜城县"},{id:"131182",value:"131182",label:"深州市"},{id:"131183",value:"131183",label:"经济开发区"},{id:"131184",value:"131184",label:"滨湖新区"}]}]},{id:"460000",value:"460000",label:"海南省",key:"",children:[{id:"460100",value:"460100",label:"海口市",children:[{id:"460105",value:"460105",label:"秀英区"},{id:"460106",value:"460106",label:"龙华区"},{id:"460107",value:"460107",label:"琼山区"},{id:"460108",value:"460108",label:"美兰区"},{id:"460109",value:"460109",label:"江东新区"}]},{id:"460200",value:"460200",label:"三亚市",children:[{id:"460202",value:"460202",label:"海棠区"},{id:"460203",value:"460203",label:"吉阳区"},{id:"460204",value:"460204",label:"天涯区"},{id:"460205",value:"460205",label:"崖州区"}]},{id:"460300",value:"460300",label:"三沙市",children:[{id:"460321",value:"460321",label:"西沙群岛"},{id:"460322",value:"460322",label:"南沙群岛"},{id:"460323",value:"460323",label:"中沙群岛"}]},{id:"460400",value:"460400",label:"儋州市",children:[{id:"460401",value:"460401",label:"儋州市"},{id:"460402",value:"460402",label:"那大镇"},{id:"460403",value:"460403",label:"南丰镇"},{id:"460404",value:"460404",label:"雅星镇"},{id:"460405",value:"460405",label:"和庆镇"},{id:"460406",value:"460406",label:"大成镇"},{id:"460407",value:"460407",label:"新州镇"},{id:"460408",value:"460408",label:"光村镇"},{id:"460409",value:"460409",label:"东成镇"},{id:"460410",value:"460410",label:"中和镇"},{id:"460411",value:"460411",label:"峨蔓镇"},{id:"460412",value:"460412",label:"兰洋镇"},{id:"460413",value:"460413",label:"王五镇"},{id:"460414",value:"460414",label:"排浦镇"},{id:"460415",value:"460415",label:"海头镇"},{id:"460416",value:"460416",label:"木棠镇"},{id:"460417",value:"460417",label:"白马井镇"},{id:"460418",value:"460418",label:"三都镇"},{id:"460419",value:"460419",label:"西培农场"},{id:"460420",value:"460420",label:"西联农场"},{id:"460421",value:"460421",label:"蓝洋农场"},{id:"460422",value:"460422",label:"八一农场"},{id:"460423",value:"460423",label:"西华农场"},{id:"460424",value:"460424",label:"西庆农场"},{id:"460425",value:"460425",label:"西流农场"},{id:"460426",value:"460426",label:"新盈农场"},{id:"460427",value:"460427",label:"龙山农场"},{id:"460428",value:"460428",label:"红岭农场"}]},{id:"469001",value:"469001",label:"五指山市",children:[{id:"469101",value:"469101",label:"五指山市"},{id:"469102",value:"469102",label:"南圣镇"},{id:"469103",value:"469103",label:"毛阳镇"},{id:"469104",value:"469104",label:"番阳镇"},{id:"469105",value:"469105",label:"畅好乡"},{id:"469106",value:"469106",label:"毛道乡"},{id:"469107",value:"469107",label:"水满乡"}]},{id:"469002",value:"469002",label:"琼海市",children:[{id:"469201",value:"469201",label:"琼海市"},{id:"469202",value:"469202",label:"万泉镇"},{id:"469203",value:"469203",label:"石壁镇"},{id:"469204",value:"469204",label:"中原镇"},{id:"469205",value:"469205",label:"博鳌镇"},{id:"469206",value:"469206",label:"阳江镇"},{id:"469207",value:"469207",label:"龙江镇"},{id:"469208",value:"469208",label:"潭门镇"},{id:"469209",value:"469209",label:"塔洋镇"},{id:"469210",value:"469210",label:"长坡镇"},{id:"469211",value:"469211",label:"大路镇"},{id:"469212",value:"469212",label:"会山镇"},{id:"469213",value:"469213",label:"东太农场"},{id:"469214",value:"469214",label:"东红农场"},{id:"469215",value:"469215",label:"东升农场"},{id:"469216",value:"469216",label:"南俸农场"},{id:"469217",value:"469217",label:"彬村山华侨农场"}]},{id:"469005",value:"469005",label:"文昌市",children:[{id:"469501",value:"469501",label:"文昌市"},{id:"469502",value:"469502",label:"重兴镇"},{id:"469503",value:"469503",label:"蓬莱镇"},{id:"469504",value:"469504",label:"会文镇"},{id:"469505",value:"469505",label:"东路镇"},{id:"469506",value:"469506",label:"潭牛镇"},{id:"469507",value:"469507",label:"东阁镇"},{id:"469508",value:"469508",label:"文教镇"},{id:"469509",value:"469509",label:"东郊镇"},{id:"469510",value:"469510",label:"龙楼镇"},{id:"469511",value:"469511",label:"昌洒镇"},{id:"469512",value:"469512",label:"翁田镇"},{id:"469513",value:"469513",label:"抱罗镇"},{id:"469514",value:"469514",label:"冯坡镇"},{id:"469515",value:"469515",label:"锦山镇"},{id:"469516",value:"469516",label:"铺前镇"},{id:"469517",value:"469517",label:"公坡镇"},{id:"469518",value:"469518",label:"迈号镇"},{id:"469519",value:"469519",label:"清谰镇"},{id:"469520",value:"469520",label:"南阳镇"},{id:"469521",value:"469521",label:"新桥镇"},{id:"469522",value:"469522",label:"头苑镇"},{id:"469523",value:"469523",label:"宝芳乡"},{id:"469524",value:"469524",label:"龙马乡"},{id:"469525",value:"469525",label:"湖山乡"},{id:"469526",value:"469526",label:"东路农场"},{id:"469527",value:"469527",label:"南阳农场"},{id:"469528",value:"469528",label:"罗豆农场"}]},{id:"469006",value:"469006",label:"万宁市",children:[{id:"469601",value:"469601",label:"万宁市"},{id:"469602",value:"469602",label:"龙滚镇"},{id:"469603",value:"469603",label:"和乐镇"},{id:"469604",value:"469604",label:"后安镇"},{id:"469605",value:"469605",label:"大茂镇"},{id:"469606",value:"469606",label:"东澳镇"},{id:"469607",value:"469607",label:"礼纪镇"},{id:"469608",value:"469608",label:"长丰镇"},{id:"469609",value:"469609",label:"山根镇"},{id:"469610",value:"469610",label:"北大镇"},{id:"469611",value:"469611",label:"南桥镇"},{id:"469612",value:"469612",label:"三更罗镇"},{id:"469613",value:"469613",label:"东岭农场"},{id:"469614",value:"469614",label:"南林农场"},{id:"469615",value:"469615",label:"东兴农场"},{id:"469616",value:"469616",label:"东和农场"},{id:"469617",value:"469617",label:"新中农场"},{id:"469618",value:"469618",label:"兴隆华侨农场"}]},{id:"469007",value:"469007",label:"东方市",children:[{id:"469701",value:"469701",label:"东方市"},{id:"469702",value:"469702",label:"东河镇"},{id:"469703",value:"469703",label:"大田镇"},{id:"469704",value:"469704",label:"感城镇"},{id:"469705",value:"469705",label:"板桥镇"},{id:"469706",value:"469706",label:"三家镇"},{id:"469707",value:"469707",label:"四更镇"},{id:"469708",value:"469708",label:"新龙镇"},{id:"469709",value:"469709",label:"天安乡"},{id:"469710",value:"469710",label:"江边乡"},{id:"469711",value:"469711",label:"广坝农场"},{id:"469712",value:"469712",label:"东方华侨农场"}]},{id:"469021",value:"469021",label:"定安县",children:[{id:"469801",value:"469801",label:"定安县"},{id:"469802",value:"469802",label:"新竹镇"},{id:"469803",value:"469803",label:"龙湖镇"},{id:"469804",value:"469804",label:"雷鸣镇"},{id:"469805",value:"469805",label:"龙门镇"},{id:"469806",value:"469806",label:"龙河镇"},{id:"469807",value:"469807",label:"岭口镇"},{id:"469808",value:"469808",label:"翰林镇"},{id:"469809",value:"469809",label:"富文镇"},{id:"469810",value:"469810",label:"黄竹镇"},{id:"469811",value:"469811",label:"金鸡岭农场"},{id:"469812",value:"469812",label:"中瑞农场"},{id:"469813",value:"469813",label:"南海农场"},{id:"469814",value:"469814",label:"城区"}]},{id:"469022",value:"469022",label:"屯昌县",children:[{id:"469821",value:"469821",label:"屯昌县"},{id:"469822",value:"469822",label:"新兴镇"},{id:"469823",value:"469823",label:"枫木镇"},{id:"469824",value:"469824",label:"乌坡镇"},{id:"469825",value:"469825",label:"南吕镇"},{id:"469826",value:"469826",label:"南坤镇"},{id:"469827",value:"469827",label:"坡心镇"},{id:"469828",value:"469828",label:"西昌镇"},{id:"469829",value:"469829",label:"中建农场"},{id:"469830",value:"469830",label:"中坤农场"},{id:"469831",value:"469831",label:"县城内"}]},{id:"469023",value:"469023",label:"澄迈县",children:[{id:"469841",value:"469841",label:"澄迈县"},{id:"469842",value:"469842",label:"老城镇"},{id:"469843",value:"469843",label:"瑞溪镇"},{id:"469844",value:"469844",label:"永发镇"},{id:"469845",value:"469845",label:"加乐镇"},{id:"469846",value:"469846",label:"文儒镇"},{id:"469847",value:"469847",label:"中兴镇"},{id:"469848",value:"469848",label:"仁兴镇"},{id:"469849",value:"469849",label:"福山镇"},{id:"469850",value:"469850",label:"桥头镇"},{id:"469851",value:"469851",label:"大丰镇"},{id:"469852",value:"469852",label:"红光农场"},{id:"469853",value:"469853",label:"西达农场"},{id:"469854",value:"469854",label:"金安农场"},{id:"469855",value:"469855",label:"城区"}]},{id:"469024",value:"469024",label:"临高县",children:[{id:"469861",value:"469861",label:"临高县"},{id:"469862",value:"469862",label:"波莲镇"},{id:"469863",value:"469863",label:"东英镇"},{id:"469864",value:"469864",label:"博厚镇"},{id:"469865",value:"469865",label:"皇桐镇"},{id:"469866",value:"469866",label:"多文镇"},{id:"469867",value:"469867",label:"和舍镇"},{id:"469868",value:"469868",label:"南宝镇"},{id:"469869",value:"469869",label:"新盈镇"},{id:"469870",value:"469870",label:"调楼镇"},{id:"469871",value:"469871",label:"加来镇"},{id:"469872",value:"469872",label:"红华农场"},{id:"469873",value:"469873",label:"加来农场"},{id:"469874",value:"469874",label:"城区"}]},{id:"469025",value:"469025",label:"白沙黎族自治县",children:[{id:"469881",value:"469881",label:"白沙黎族自治县"},{id:"469882",value:"469882",label:"七坊镇"},{id:"469883",value:"469883",label:"邦溪镇"},{id:"469884",value:"469884",label:"打安镇"},{id:"469885",value:"469885",label:"细水乡"},{id:"469886",value:"469886",label:"元门乡"},{id:"469887",value:"469887",label:"南开乡"},{id:"469888",value:"469888",label:"阜龙乡"},{id:"469889",value:"469889",label:"青松乡"},{id:"469890",value:"469890",label:"金波乡"},{id:"469891",value:"469891",label:"荣邦乡"},{id:"469892",value:"469892",label:"白沙农场"},{id:"469893",value:"469893",label:"龙江农场"},{id:"469894",value:"469894",label:"邦溪农场"},{id:"469895",value:"469895",label:"城区"}]},{id:"469026",value:"469026",label:"昌江黎族自治县",children:[{id:"469901",value:"469901",label:"昌江黎族自治县"},{id:"469902",value:"469902",label:"叉河镇"},{id:"469903",value:"469903",label:"十月田镇"},{id:"469904",value:"469904",label:"乌烈镇"},{id:"469905",value:"469905",label:"海尾镇"},{id:"469906",value:"469906",label:"南罗镇"},{id:"469907",value:"469907",label:"太坡镇"},{id:"469908",value:"469908",label:"昌化镇"},{id:"469909",value:"469909",label:"七叉镇"},{id:"469910",value:"469910",label:"保平乡"},{id:"469911",value:"469911",label:"昌城乡"},{id:"469912",value:"469912",label:"王下乡"},{id:"469913",value:"469913",label:"霸王岭林场"},{id:"469914",value:"469914",label:"红林农场"},{id:"469915",value:"469915",label:"城区"}]},{id:"469027",value:"469027",label:"乐东黎族自治县",children:[{id:"469920",value:"469920",label:"乐东黎族自治县"},{id:"469921",value:"469921",label:"万冲镇"},{id:"469922",value:"469922",label:"大安镇"},{id:"469923",value:"469923",label:"志仲镇"},{id:"469924",value:"469924",label:"千家镇"},{id:"469925",value:"469925",label:"九所镇"},{id:"469926",value:"469926",label:"利国镇"},{id:"469927",value:"469927",label:"黄流镇"},{id:"469928",value:"469928",label:"佛罗镇"},{id:"469929",value:"469929",label:"尖峰镇"},{id:"469930",value:"469930",label:"莺歌海镇"},{id:"469931",value:"469931",label:"乐中农场"},{id:"469932",value:"469932",label:"山荣农场"},{id:"469933",value:"469933",label:"乐光农场"},{id:"469934",value:"469934",label:"报伦农场"},{id:"469935",value:"469935",label:"福报农场"},{id:"469936",value:"469936",label:"保国农场"},{id:"469937",value:"469937",label:"保显农场"},{id:"469938",value:"469938",label:"尖峰岭林业"},{id:"469939",value:"469939",label:"莺歌海盐场"},{id:"469940",value:"469940",label:"城区"}]},{id:"469028",value:"469028",label:"陵水黎族自治县",children:[{id:"469941",value:"469941",label:"陵水黎族自治县"},{id:"469942",value:"469942",label:"光坡镇"},{id:"469943",value:"469943",label:"三才镇"},{id:"469944",value:"469944",label:"英州镇"},{id:"469945",value:"469945",label:"隆广镇"},{id:"469946",value:"469946",label:"文罗镇"},{id:"469947",value:"469947",label:"本号镇"},{id:"469948",value:"469948",label:"新村镇"},{id:"469949",value:"469949",label:"黎安镇"},{id:"469950",value:"469950",label:"提蒙乡"},{id:"469951",value:"469951",label:"群英乡"},{id:"469952",value:"469952",label:"岭门农场"},{id:"469953",value:"469953",label:"南平农场"},{id:"469954",value:"469954",label:"城区"}]},{id:"469029",value:"469029",label:"保亭黎族苗族自治县",children:[{id:"469961",value:"469961",label:"保停黎族苗族自治县"},{id:"469962",value:"469962",label:"什玲镇"},{id:"469963",value:"469963",label:"加茂镇"},{id:"469964",value:"469964",label:"响水镇"},{id:"469965",value:"469965",label:"新政镇"},{id:"469966",value:"469966",label:"三道镇"},{id:"469967",value:"469967",label:"六弓乡"},{id:"469968",value:"469968",label:"南林乡"},{id:"469969",value:"469969",label:"毛感乡"},{id:"469970",value:"469970",label:"新星农场"},{id:"469971",value:"469971",label:"金江农场"},{id:"469972",value:"469972",label:"三道农场"}]},{id:"469030",value:"469030",label:"琼中黎族苗族自治县",children:[{id:"469981",value:"469981",label:"琼中黎族苗族自治县"},{id:"469982",value:"469982",label:"湾岭镇"},{id:"469983",value:"469983",label:"黎母山镇"},{id:"469984",value:"469984",label:"和平镇"},{id:"469985",value:"469985",label:"长征镇"},{id:"469986",value:"469986",label:"红毛镇"},{id:"469987",value:"469987",label:"中平镇"},{id:"469988",value:"469988",label:"上安乡"},{id:"469989",value:"469989",label:"什运乡"},{id:"469990",value:"469990",label:"吊罗山乡"},{id:"469991",value:"469991",label:"阳江农场"},{id:"469992",value:"469992",label:"乌石农场"},{id:"469993",value:"469993",label:"加钗农场"},{id:"469994",value:"469994",label:"长征农场"},{id:"469995",value:"469995",label:"城区"}]}]},{id:"430000",value:"430000",label:"湖南省",key:"",children:[{id:"430100",value:"430100",label:"长沙市",children:[{id:"430102",value:"430102",label:"芙蓉区"},{id:"430103",value:"430103",label:"天心区"},{id:"430104",value:"430104",label:"岳麓区"},{id:"430105",value:"430105",label:"开福区"},{id:"430111",value:"430111",label:"雨花区"},{id:"430112",value:"430112",label:"望城区"},{id:"430121",value:"430121",label:"长沙县"},{id:"430181",value:"430181",label:"浏阳市"},{id:"430182",value:"430182",label:"宁乡市"},{id:"430183",value:"430183",label:"湘江新区"}]},{id:"430200",value:"430200",label:"株洲市",children:[{id:"430202",value:"430202",label:"荷塘区"},{id:"430203",value:"430203",label:"芦淞区"},{id:"430204",value:"430204",label:"石峰区"},{id:"430211",value:"430211",label:"天元区"},{id:"430221",value:"430221",label:"渌口区"},{id:"430223",value:"430223",label:"攸县"},{id:"430224",value:"430224",label:"茶陵县"},{id:"430225",value:"430225",label:"炎陵县"},{id:"430281",value:"430281",label:"醴陵市"}]},{id:"430300",value:"430300",label:"湘潭市",children:[{id:"430302",value:"430302",label:"雨湖区"},{id:"430304",value:"430304",label:"岳塘区"},{id:"430321",value:"430321",label:"湘潭县"},{id:"430381",value:"430381",label:"湘乡市"},{id:"430382",value:"430382",label:"韶山市"},{id:"430383",value:"430383",label:"高新区"}]},{id:"430400",value:"430400",label:"衡阳市",children:[{id:"430405",value:"430405",label:"珠晖区"},{id:"430406",value:"430406",label:"雁峰区"},{id:"430407",value:"430407",label:"石鼓区"},{id:"430408",value:"430408",label:"蒸湘区"},{id:"430412",value:"430412",label:"南岳区"},{id:"430421",value:"430421",label:"衡阳县"},{id:"430422",value:"430422",label:"衡南县"},{id:"430423",value:"430423",label:"衡山县"},{id:"430424",value:"430424",label:"衡东县"},{id:"430426",value:"430426",label:"祁东县"},{id:"430481",value:"430481",label:"耒阳市"},{id:"430482",value:"430482",label:"常宁市"},{id:"430483",value:"430483",label:"高新区"},{id:"430484",value:"430484",label:"综合保税区"}]},{id:"430500",value:"430500",label:"邵阳市",children:[{id:"430502",value:"430502",label:"双清区"},{id:"430503",value:"430503",label:"大祥区"},{id:"430511",value:"430511",label:"北塔区"},{id:"430521",value:"430521",label:"邵东县"},{id:"430522",value:"430522",label:"新邵县"},{id:"430523",value:"430523",label:"邵阳县"},{id:"430524",value:"430524",label:"隆回县"},{id:"430525",value:"430525",label:"洞口县"},{id:"430527",value:"430527",label:"绥宁县"},{id:"430528",value:"430528",label:"新宁县"},{id:"430529",value:"430529",label:"城步苗族自治县"},{id:"430581",value:"430581",label:"武冈市"}]},{id:"430600",value:"430600",label:"岳阳市",children:[{id:"430602",value:"430602",label:"岳阳楼区"},{id:"430603",value:"430603",label:"云溪区"},{id:"430611",value:"430611",label:"君山区"},{id:"430621",value:"430621",label:"岳阳县"},{id:"430623",value:"430623",label:"华容县"},{id:"430624",value:"430624",label:"湘阴县"},{id:"430626",value:"430626",label:"平江县"},{id:"430681",value:"430681",label:"汨罗市"},{id:"430682",value:"430682",label:"临湘市"}]},{id:"430700",value:"430700",label:"常德市",children:[{id:"430702",value:"430702",label:"武陵区"},{id:"430703",value:"430703",label:"鼎城区"},{id:"430721",value:"430721",label:"安乡县"},{id:"430722",value:"430722",label:"汉寿县"},{id:"430723",value:"430723",label:"澧县"},{id:"430724",value:"430724",label:"临澧县"},{id:"430725",value:"430725",label:"桃源县"},{id:"430726",value:"430726",label:"石门县"},{id:"430781",value:"430781",label:"津市市"}]},{id:"430800",value:"430800",label:"张家界市",children:[{id:"430802",value:"430802",label:"永定区"},{id:"430811",value:"430811",label:"武陵源区"},{id:"430821",value:"430821",label:"慈利县"},{id:"430822",value:"430822",label:"桑植县"}]},{id:"430900",value:"430900",label:"益阳市",children:[{id:"430902",value:"430902",label:"资阳区"},{id:"430903",value:"430903",label:"赫山区"},{id:"430921",value:"430921",label:"南县"},{id:"430922",value:"430922",label:"桃江县"},{id:"430923",value:"430923",label:"安化县"},{id:"430981",value:"430981",label:"沅江市"}]},{id:"431000",value:"431000",label:"郴州市",children:[{id:"431002",value:"431002",label:"北湖区"},{id:"431003",value:"431003",label:"苏仙区"},{id:"431021",value:"431021",label:"桂阳县"},{id:"431022",value:"431022",label:"宜章县"},{id:"431023",value:"431023",label:"永兴县"},{id:"431024",value:"431024",label:"嘉禾县"},{id:"431025",value:"431025",label:"临武县"},{id:"431026",value:"431026",label:"汝城县"},{id:"431027",value:"431027",label:"桂东县"},{id:"431028",value:"431028",label:"安仁县"},{id:"431081",value:"431081",label:"资兴市"}]},{id:"431100",value:"431100",label:"永州市",children:[{id:"431102",value:"431102",label:"零陵区"},{id:"431103",value:"431103",label:"冷水滩区"},{id:"431121",value:"431121",label:"祁阳县"},{id:"431122",value:"431122",label:"东安县"},{id:"431123",value:"431123",label:"双牌县"},{id:"431124",value:"431124",label:"道县"},{id:"431125",value:"431125",label:"江永县"},{id:"431126",value:"431126",label:"宁远县"},{id:"431127",value:"431127",label:"蓝山县"},{id:"431128",value:"431128",label:"新田县"},{id:"431129",value:"431129",label:"江华瑶族自治县"}]},{id:"431200",value:"431200",label:"怀化市",children:[{id:"431202",value:"431202",label:"鹤城区"},{id:"431221",value:"431221",label:"中方县"},{id:"431222",value:"431222",label:"沅陵县"},{id:"431223",value:"431223",label:"辰溪县"},{id:"431224",value:"431224",label:"溆浦县"},{id:"431225",value:"431225",label:"会同县"},{id:"431226",value:"431226",label:"麻阳苗族自治县"},{id:"431227",value:"431227",label:"新晃侗族自治县"},{id:"431228",value:"431228",label:"芷江侗族自治县"},{id:"431229",value:"431229",label:"靖州苗族侗族自治县"},{id:"431230",value:"431230",label:"通道侗族自治县"},{id:"431281",value:"431281",label:"洪江市"}]},{id:"431300",value:"431300",label:"娄底市",children:[{id:"431302",value:"431302",label:"娄星区"},{id:"431321",value:"431321",label:"双峰县"},{id:"431322",value:"431322",label:"新化县"},{id:"431381",value:"431381",label:"冷水江市"},{id:"431382",value:"431382",label:"涟源市"}]},{id:"433100",value:"433100",label:"湘西土家族苗族自治州",children:[{id:"433101",value:"433101",label:"吉首市"},{id:"433122",value:"433122",label:"泸溪县"},{id:"433123",value:"433123",label:"凤凰县"},{id:"433124",value:"433124",label:"花垣县"},{id:"433125",value:"433125",label:"保靖县"},{id:"433126",value:"433126",label:"古丈县"},{id:"433127",value:"433127",label:"永顺县"},{id:"433130",value:"433130",label:"龙山县"}]}]},{id:"420000",value:"420000",label:"湖北省",key:"",children:[{id:"420100",value:"420100",label:"武汉市",children:[{id:"420102",value:"420102",label:"江岸区"},{id:"420103",value:"420103",label:"江汉区"},{id:"420104",value:"420104",label:"硚口区"},{id:"420105",value:"420105",label:"汉阳区"},{id:"420106",value:"420106",label:"武昌区"},{id:"420107",value:"420107",label:"青山区"},{id:"420111",value:"420111",label:"洪山区"},{id:"420112",value:"420112",label:"东西湖区"},{id:"420113",value:"420113",label:"汉南区"},{id:"420114",value:"420114",label:"蔡甸区"},{id:"420115",value:"420115",label:"江夏区"},{id:"420116",value:"420116",label:"黄陂区"},{id:"420117",value:"420117",label:"新洲区"},{id:"420118",value:"420118",label:"经济技术开发区"}]},{id:"420200",value:"420200",label:"黄石市",children:[{id:"420202",value:"420202",label:"黄石港区"},{id:"420203",value:"420203",label:"西塞山区"},{id:"420204",value:"420204",label:"下陆区"},{id:"420205",value:"420205",label:"铁山区"},{id:"420222",value:"420222",label:"阳新县"},{id:"420281",value:"420281",label:"大冶市"},{id:"420282",value:"420282",label:"经济开发区"}]},{id:"420300",value:"420300",label:"十堰市",children:[{id:"420302",value:"420302",label:"茅箭区"},{id:"420303",value:"420303",label:"张湾区"},{id:"420304",value:"420304",label:"郧阳区"},{id:"420322",value:"420322",label:"郧西县"},{id:"420323",value:"420323",label:"竹山县"},{id:"420324",value:"420324",label:"竹溪县"},{id:"420325",value:"420325",label:"房县"},{id:"420381",value:"420381",label:"丹江口市"}]},{id:"420500",value:"420500",label:"宜昌市",children:[{id:"420502",value:"420502",label:"西陵区"},{id:"420503",value:"420503",label:"伍家岗区"},{id:"420504",value:"420504",label:"点军区"},{id:"420505",value:"420505",label:"猇亭区"},{id:"420506",value:"420506",label:"夷陵区"},{id:"420525",value:"420525",label:"远安县"},{id:"420526",value:"420526",label:"兴山县"},{id:"420527",value:"420527",label:"秭归县"},{id:"420528",value:"420528",label:"长阳土家族自治县"},{id:"420529",value:"420529",label:"五峰土家族自治县"},{id:"420581",value:"420581",label:"宜都市"},{id:"420582",value:"420582",label:"当阳市"},{id:"420583",value:"420583",label:"枝江市"},{id:"420584",value:"420584",label:"宜昌新区"}]},{id:"420600",value:"420600",label:"襄阳市",children:[{id:"420602",value:"420602",label:"襄城区"},{id:"420606",value:"420606",label:"樊城区"},{id:"420607",value:"420607",label:"襄州区"},{id:"420624",value:"420624",label:"南漳县"},{id:"420625",value:"420625",label:"谷城县"},{id:"420626",value:"420626",label:"保康县"},{id:"420682",value:"420682",label:"老河口市"},{id:"420683",value:"420683",label:"枣阳市"},{id:"420684",value:"420684",label:"宜城市"},{id:"420685",value:"420685",label:"高新区"},{id:"420686",value:"420686",label:"经济开发区"}]},{id:"420700",value:"420700",label:"鄂州市",children:[{id:"420702",value:"420702",label:"梁子湖区"},{id:"420703",value:"420703",label:"华容区"},{id:"420704",value:"420704",label:"鄂城区"}]},{id:"420800",value:"420800",label:"荆门市",children:[{id:"420802",value:"420802",label:"东宝区"},{id:"420804",value:"420804",label:"掇刀区"},{id:"420822",value:"420822",label:"沙洋县"},{id:"420881",value:"420881",label:"钟祥市"},{id:"420882",value:"420882",label:"京山市"}]},{id:"420900",value:"420900",label:"孝感市",children:[{id:"420902",value:"420902",label:"孝南区"},{id:"420921",value:"420921",label:"孝昌县"},{id:"420922",value:"420922",label:"大悟县"},{id:"420923",value:"420923",label:"云梦县"},{id:"420981",value:"420981",label:"应城市"},{id:"420982",value:"420982",label:"安陆市"},{id:"420984",value:"420984",label:"汉川市"}]},{id:"421000",value:"421000",label:"荆州市",children:[{id:"421002",value:"421002",label:"沙市区"},{id:"421003",value:"421003",label:"荆州区"},{id:"421022",value:"421022",label:"公安县"},{id:"421023",value:"421023",label:"监利县"},{id:"421024",value:"421024",label:"江陵县"},{id:"421081",value:"421081",label:"石首市"},{id:"421083",value:"421083",label:"洪湖市"},{id:"421087",value:"421087",label:"松滋市"}]},{id:"421100",value:"421100",label:"黄冈市",children:[{id:"421102",value:"421102",label:"黄州区"},{id:"421121",value:"421121",label:"团风县"},{id:"421122",value:"421122",label:"红安县"},{id:"421123",value:"421123",label:"罗田县"},{id:"421124",value:"421124",label:"英山县"},{id:"421125",value:"421125",label:"浠水县"},{id:"421126",value:"421126",label:"蕲春县"},{id:"421127",value:"421127",label:"黄梅县"},{id:"421181",value:"421181",label:"麻城市"},{id:"421182",value:"421182",label:"武穴市"},{id:"421183",value:"421183",label:"城东新区"}]},{id:"421200",value:"421200",label:"咸宁市",children:[{id:"421202",value:"421202",label:"咸安区"},{id:"421221",value:"421221",label:"嘉鱼县"},{id:"421222",value:"421222",label:"通城县"},{id:"421223",value:"421223",label:"崇阳县"},{id:"421224",value:"421224",label:"通山县"},{id:"421281",value:"421281",label:"赤壁市"}]},{id:"421300",value:"421300",label:"随州市",children:[{id:"421303",value:"421303",label:"曾都区"},{id:"421321",value:"421321",label:"随县"},{id:"421381",value:"421381",label:"广水市"}]},{id:"422800",value:"422800",label:"恩施土家族苗族自治州",children:[{id:"422801",value:"422801",label:"恩施市"},{id:"422802",value:"422802",label:"利川市"},{id:"422822",value:"422822",label:"建始县"},{id:"422823",value:"422823",label:"巴东县"},{id:"422825",value:"422825",label:"宣恩县"},{id:"422826",value:"422826",label:"咸丰县"},{id:"422827",value:"422827",label:"来凤县"},{id:"422828",value:"422828",label:"鹤峰县"}]},{id:"429004",value:"429004",label:"仙桃市",children:[{id:"429401",value:"429401",label:"沙嘴街道"},{id:"429402",value:"429402",label:"干河街道"},{id:"429403",value:"429403",label:"龙华山街道"},{id:"429404",value:"429404",label:"郑场镇"},{id:"429405",value:"429405",label:"毛嘴镇"},{id:"429406",value:"429406",label:"豆河镇"},{id:"429407",value:"429407",label:"三伏潭镇"},{id:"429408",value:"429408",label:"胡场镇"},{id:"429409",value:"429409",label:"长埫口镇"},{id:"429410",value:"429410",label:"西流河镇"},{id:"429411",value:"429411",label:"沙湖镇"},{id:"429412",value:"429412",label:"杨林尾镇"},{id:"429413",value:"429413",label:"彭场镇"},{id:"429414",value:"429414",label:"张沟镇"},{id:"429415",value:"429415",label:"郭河镇"},{id:"429416",value:"429416",label:"沔城镇"},{id:"429417",value:"429417",label:"通海口镇"},{id:"429418",value:"429418",label:"陈场镇"},{id:"429419",value:"429419",label:"高新区"},{id:"429420",value:"429420",label:"经济开发区"},{id:"429421",value:"429421",label:"工业园区"},{id:"429422",value:"429422",label:"九合垸原种场"},{id:"429423",value:"429423",label:"沙湖原种场"},{id:"429424",value:"429424",label:"排湖渔场"},{id:"429425",value:"429425",label:"五湖渔场"},{id:"429426",value:"429426",label:"赵西垸林场"},{id:"429427",value:"429427",label:"刘家垸林场"},{id:"429428",value:"429428",label:"畜禽良种场"}]},{id:"429005",value:"429005",label:"潜江市",children:[{id:"429501",value:"429501",label:"园林"},{id:"429502",value:"429502",label:"广华"},{id:"429503",value:"429503",label:"杨市"},{id:"429504",value:"429504",label:"周矶"},{id:"429505",value:"429505",label:"泽口"},{id:"429506",value:"429506",label:"泰丰"},{id:"429507",value:"429507",label:"高场"},{id:"429508",value:"429508",label:"熊口镇"},{id:"429509",value:"429509",label:"竹根滩镇"},{id:"429510",value:"429510",label:"高石碑镇"},{id:"429511",value:"429511",label:"老新镇"},{id:"429512",value:"429512",label:"王场镇"},{id:"429513",value:"429513",label:"渔洋镇"},{id:"429514",value:"429514",label:"龙湾镇"},{id:"429515",value:"429515",label:"浩口镇"},{id:"429516",value:"429516",label:"积玉口镇"},{id:"429517",value:"429517",label:"张金镇"},{id:"429518",value:"429518",label:"白鹭湖管理区"},{id:"429519",value:"429519",label:"总口管理区"},{id:"429520",value:"429520",label:"熊口农场管理区"},{id:"429521",value:"429521",label:"运粮湖管理区"},{id:"429522",value:"429522",label:"后湖管理区"},{id:"429523",value:"429523",label:"周矶管理区"},{id:"429524",value:"429524",label:"经济开发区"}]},{id:"429006",value:"429006",label:"天门市",children:[{id:"429601",value:"429601",label:"竟陵街道"},{id:"429602",value:"429602",label:"杨林街道"},{id:"429603",value:"429603",label:"佛子山镇"},{id:"429604",value:"429604",label:"多宝镇"},{id:"429605",value:"429605",label:"拖市镇"},{id:"429606",value:"429606",label:"张港镇"},{id:"429607",value:"429607",label:"蒋场镇"},{id:"429608",value:"429608",label:"汪场镇"},{id:"429609",value:"429609",label:"渔薪镇"},{id:"429610",value:"429610",label:"黄潭镇"},{id:"429611",value:"429611",label:"岳口镇"},{id:"429612",value:"429612",label:"横林镇"},{id:"429613",value:"429613",label:"彭市镇"},{id:"429614",value:"429614",label:"麻洋镇"},{id:"429615",value:"429615",label:"多祥镇"},{id:"429616",value:"429616",label:"干驿镇"},{id:"429617",value:"429617",label:"马湾镇"},{id:"429618",value:"429618",label:"卢市镇"},{id:"429619",value:"429619",label:"小板镇"},{id:"429620",value:"429620",label:"九真镇"},{id:"429621",value:"429621",label:"皂市镇"},{id:"429622",value:"429622",label:"胡市镇"},{id:"429623",value:"429623",label:"石河镇"},{id:"429624",value:"429624",label:"净潭乡"},{id:"429625",value:"429625",label:"蒋湖农场"},{id:"429626",value:"429626",label:"白茅湖农场"},{id:"429627",value:"429627",label:"沉湖林业科技示范区"},{id:"429628",value:"429628",label:"天门工业园"},{id:"429629",value:"429629",label:"侨乡街道开发区"}]},{id:"429021",value:"429021",label:"神农架林区",children:[{id:"429022",value:"429022",label:"松柏镇"},{id:"429023",value:"429023",label:"阳日镇"},{id:"429024",value:"429024",label:"木鱼镇"},{id:"429025",value:"429025",label:"红坪镇"},{id:"429026",value:"429026",label:"新华镇"},{id:"429027",value:"429027",label:"大九湖"},{id:"429028",value:"429028",label:"宋洛"},{id:"429029",value:"429029",label:"下谷坪乡"}]}]},{id:"410000",value:"410000",label:"河南省",key:"",children:[{id:"410100",value:"410100",label:"郑州市",children:[{id:"410102",value:"410102",label:"中原区"},{id:"410103",value:"410103",label:"二七区"},{id:"410104",value:"410104",label:"管城回族区"},{id:"410105",value:"410105",label:"金水区"},{id:"410106",value:"410106",label:"上街区"},{id:"410108",value:"410108",label:"惠济区"},{id:"410122",value:"410122",label:"中牟县"},{id:"410181",value:"410181",label:"巩义市"},{id:"410182",value:"410182",label:"荥阳市"},{id:"410183",value:"410183",label:"新密市"},{id:"410184",value:"410184",label:"新郑市"},{id:"410185",value:"410185",label:"登封市"},{id:"410186",value:"410186",label:"郑东新区"},{id:"410187",value:"410187",label:"郑汴新区"},{id:"410188",value:"410188",label:"高新开发区"},{id:"410189",value:"410189",label:"经济开发区"},{id:"410190",value:"410190",label:"航空港区"}]},{id:"410200",value:"410200",label:"开封市",children:[{id:"410202",value:"410202",label:"龙亭区"},{id:"410203",value:"410203",label:"顺河回族区"},{id:"410204",value:"410204",label:"鼓楼区"},{id:"410205",value:"410205",label:"禹王台区"},{id:"410212",value:"410212",label:"祥符区"},{id:"410221",value:"410221",label:"杞县"},{id:"410222",value:"410222",label:"通许县"},{id:"410223",value:"410223",label:"尉氏县"},{id:"410225",value:"410225",label:"兰考县"},{id:"410226",value:"410226",label:"经济技术开发区"}]},{id:"410300",value:"410300",label:"洛阳市",children:[{id:"410302",value:"410302",label:"老城区"},{id:"410303",value:"410303",label:"西工区"},{id:"410304",value:"410304",label:"瀍河回族区"},{id:"410305",value:"410305",label:"涧西区"},{id:"410306",value:"410306",label:"吉利区"},{id:"410311",value:"410311",label:"洛龙区"},{id:"410322",value:"410322",label:"孟津县"},{id:"410323",value:"410323",label:"新安县"},{id:"410324",value:"410324",label:"栾川县"},{id:"410325",value:"410325",label:"嵩县"},{id:"410326",value:"410326",label:"汝阳县"},{id:"410327",value:"410327",label:"宜阳县"},{id:"410328",value:"410328",label:"洛宁县"},{id:"410329",value:"410329",label:"伊川县"},{id:"410381",value:"410381",label:"偃师市"},{id:"410382",value:"410382",label:"洛阳新区"},{id:"410383",value:"410383",label:"高新区"}]},{id:"410400",value:"410400",label:"平顶山市",children:[{id:"410402",value:"410402",label:"新华区"},{id:"410403",value:"410403",label:"卫东区"},{id:"410404",value:"410404",label:"石龙区"},{id:"410411",value:"410411",label:"湛河区"},{id:"410421",value:"410421",label:"宝丰县"},{id:"410422",value:"410422",label:"叶县"},{id:"410423",value:"410423",label:"鲁山县"},{id:"410425",value:"410425",label:"郏县"},{id:"410481",value:"410481",label:"舞钢市"},{id:"410482",value:"410482",label:"汝州市"},{id:"410483",value:"410483",label:"高新区"},{id:"410484",value:"410484",label:"新城区"}]},{id:"410500",value:"410500",label:"安阳市",children:[{id:"410502",value:"410502",label:"文峰区"},{id:"410503",value:"410503",label:"北关区"},{id:"410505",value:"410505",label:"殷都区"},{id:"410506",value:"410506",label:"龙安区"},{id:"410522",value:"410522",label:"安阳县"},{id:"410523",value:"410523",label:"汤阴县"},{id:"410526",value:"410526",label:"滑县"},{id:"410527",value:"410527",label:"内黄县"},{id:"410581",value:"410581",label:"林州市"},{id:"410582",value:"410582",label:"安阳新区"}]},{id:"410600",value:"410600",label:"鹤壁市",children:[{id:"410602",value:"410602",label:"鹤山区"},{id:"410603",value:"410603",label:"山城区"},{id:"410611",value:"410611",label:"淇滨区"},{id:"410621",value:"410621",label:"浚县"},{id:"410622",value:"410622",label:"淇县"}]},{id:"410700",value:"410700",label:"新乡市",children:[{id:"410702",value:"410702",label:"红旗区"},{id:"410703",value:"410703",label:"卫滨区"},{id:"410704",value:"410704",label:"凤泉区"},{id:"410711",value:"410711",label:"牧野区"},{id:"410721",value:"410721",label:"新乡县"},{id:"410724",value:"410724",label:"获嘉县"},{id:"410725",value:"410725",label:"原阳县"},{id:"410726",value:"410726",label:"延津县"},{id:"410727",value:"410727",label:"封丘县"},{id:"410728",value:"410728",label:"长垣县"},{id:"410781",value:"410781",label:"卫辉市"},{id:"410782",value:"410782",label:"辉县市"}]},{id:"410800",value:"410800",label:"焦作市",children:[{id:"410802",value:"410802",label:"解放区"},{id:"410803",value:"410803",label:"中站区"},{id:"410804",value:"410804",label:"马村区"},{id:"410811",value:"410811",label:"山阳区"},{id:"410821",value:"410821",label:"修武县"},{id:"410822",value:"410822",label:"博爱县"},{id:"410823",value:"410823",label:"武陟县"},{id:"410825",value:"410825",label:"温县"},{id:"410882",value:"410882",label:"沁阳市"},{id:"410883",value:"410883",label:"孟州市"}]},{id:"410900",value:"410900",label:"濮阳市",children:[{id:"410902",value:"410902",label:"华龙区"},{id:"410922",value:"410922",label:"清丰县"},{id:"410923",value:"410923",label:"南乐县"},{id:"410926",value:"410926",label:"范县"},{id:"410927",value:"410927",label:"台前县"},{id:"410928",value:"410928",label:"濮阳县"}]},{id:"411000",value:"411000",label:"许昌市",children:[{id:"411002",value:"411002",label:"魏都区"},{id:"411003",value:"411003",label:"建安区"},{id:"411024",value:"411024",label:"鄢陵县"},{id:"411025",value:"411025",label:"襄城县"},{id:"411081",value:"411081",label:"禹州市"},{id:"411082",value:"411082",label:"长葛市"}]},{id:"411100",value:"411100",label:"漯河市",children:[{id:"411102",value:"411102",label:"源汇区"},{id:"411103",value:"411103",label:"郾城区"},{id:"411104",value:"411104",label:"召陵区"},{id:"411121",value:"411121",label:"舞阳县"},{id:"411122",value:"411122",label:"临颍县"}]},{id:"411200",value:"411200",label:"三门峡市",children:[{id:"411202",value:"411202",label:"湖滨区"},{id:"411203",value:"411203",label:"陕州区"},{id:"411221",value:"411221",label:"渑池县"},{id:"411224",value:"411224",label:"卢氏县"},{id:"411281",value:"411281",label:"义马市"},{id:"411282",value:"411282",label:"灵宝市"}]},{id:"411300",value:"411300",label:"南阳市",children:[{id:"411302",value:"411302",label:"宛城区"},{id:"411303",value:"411303",label:"卧龙区"},{id:"411321",value:"411321",label:"南召县"},{id:"411322",value:"411322",label:"方城县"},{id:"411323",value:"411323",label:"西峡县"},{id:"411324",value:"411324",label:"镇平县"},{id:"411325",value:"411325",label:"内乡县"},{id:"411326",value:"411326",label:"淅川县"},{id:"411327",value:"411327",label:"社旗县"},{id:"411328",value:"411328",label:"唐河县"},{id:"411329",value:"411329",label:"新野县"},{id:"411330",value:"411330",label:"桐柏县"},{id:"411381",value:"411381",label:"邓州市"}]},{id:"411400",value:"411400",label:"商丘市",children:[{id:"411402",value:"411402",label:"梁园区"},{id:"411403",value:"411403",label:"睢阳区"},{id:"411421",value:"411421",label:"民权县"},{id:"411422",value:"411422",label:"睢县"},{id:"411423",value:"411423",label:"宁陵县"},{id:"411424",value:"411424",label:"柘城县"},{id:"411425",value:"411425",label:"虞城县"},{id:"411426",value:"411426",label:"夏邑县"},{id:"411481",value:"411481",label:"永城市"}]},{id:"411500",value:"411500",label:"信阳市",children:[{id:"411502",value:"411502",label:"浉河区"},{id:"411503",value:"411503",label:"平桥区"},{id:"411521",value:"411521",label:"罗山县"},{id:"411522",value:"411522",label:"光山县"},{id:"411523",value:"411523",label:"新县"},{id:"411524",value:"411524",label:"商城县"},{id:"411525",value:"411525",label:"固始县"},{id:"411526",value:"411526",label:"潢川县"},{id:"411527",value:"411527",label:"淮滨县"},{id:"411528",value:"411528",label:"息县"}]},{id:"411600",value:"411600",label:"周口市",children:[{id:"411602",value:"411602",label:"川汇区"},{id:"411621",value:"411621",label:"扶沟县"},{id:"411622",value:"411622",label:"西华县"},{id:"411623",value:"411623",label:"商水县"},{id:"411624",value:"411624",label:"沈丘县"},{id:"411625",value:"411625",label:"郸城县"},{id:"411626",value:"411626",label:"淮阳县"},{id:"411627",value:"411627",label:"太康县"},{id:"411628",value:"411628",label:"鹿邑县"},{id:"411681",value:"411681",label:"项城市"},{id:"411682",value:"411682",label:"东新区"},{id:"411683",value:"411683",label:"经济开发区"}]},{id:"411700",value:"411700",label:"驻马店市",children:[{id:"411702",value:"411702",label:"驿城区"},{id:"411721",value:"411721",label:"西平县"},{id:"411722",value:"411722",label:"上蔡县"},{id:"411723",value:"411723",label:"平舆县"},{id:"411724",value:"411724",label:"正阳县"},{id:"411725",value:"411725",label:"确山县"},{id:"411726",value:"411726",label:"泌阳县"},{id:"411727",value:"411727",label:"汝南县"},{id:"411728",value:"411728",label:"遂平县"},{id:"411729",value:"411729",label:"新蔡县"},{id:"411771",value:"411771",label:"经济开发区"}]},{id:"419001",value:"419001",label:"济源市",children:[{id:"419011",value:"419011",label:"沁园街道"},{id:"419012",value:"419012",label:"济水街道"},{id:"419013",value:"419013",label:"北海街道"},{id:"419014",value:"419014",label:"天坛街道"},{id:"419015",value:"419015",label:"玉泉街道"},{id:"419016",value:"419016",label:"克井镇"},{id:"419017",value:"419017",label:"五龙口镇"},{id:"419018",value:"419018",label:"梨林镇"},{id:"419019",value:"419019",label:"轵城镇"},{id:"419020",value:"419020",label:"承留镇"},{id:"419021",value:"419021",label:"坡头镇"},{id:"419022",value:"419022",label:"大峪镇"},{id:"419023",value:"419023",label:"邵原镇"},{id:"419024",value:"419024",label:"思礼镇"},{id:"419025",value:"419025",label:"王屋镇"},{id:"419026",value:"419026",label:"下冶镇"}]}]},{id:"230000",value:"230000",label:"黑龙江省",key:"",children:[{id:"230100",value:"230100",label:"哈尔滨市",children:[{id:"230102",value:"230102",label:"道里区"},{id:"230103",value:"230103",label:"南岗区"},{id:"230104",value:"230104",label:"道外区"},{id:"230108",value:"230108",label:"平房区"},{id:"230109",value:"230109",label:"松北区"},{id:"230110",value:"230110",label:"香坊区"},{id:"230111",value:"230111",label:"呼兰区"},{id:"230112",value:"230112",label:"阿城区"},{id:"230113",value:"230113",label:"双城区"},{id:"230123",value:"230123",label:"依兰县"},{id:"230124",value:"230124",label:"方正县"},{id:"230125",value:"230125",label:"宾县"},{id:"230126",value:"230126",label:"巴彦县"},{id:"230127",value:"230127",label:"木兰县"},{id:"230128",value:"230128",label:"通河县"},{id:"230129",value:"230129",label:"延寿县"},{id:"230183",value:"230183",label:"尚志市"},{id:"230184",value:"230184",label:"五常市"},{id:"230185",value:"230185",label:"哈尔滨新区"},{id:"230186",value:"230186",label:"高新区"}]},{id:"230200",value:"230200",label:"齐齐哈尔市",children:[{id:"230202",value:"230202",label:"龙沙区"},{id:"230203",value:"230203",label:"建华区"},{id:"230204",value:"230204",label:"铁锋区"},{id:"230205",value:"230205",label:"昂昂溪区"},{id:"230206",value:"230206",label:"富拉尔基区"},{id:"230207",value:"230207",label:"碾子山区"},{id:"230208",value:"230208",label:"梅里斯达斡尔族区"},{id:"230221",value:"230221",label:"龙江县"},{id:"230223",value:"230223",label:"依安县"},{id:"230224",value:"230224",label:"泰来县"},{id:"230225",value:"230225",label:"甘南县"},{id:"230227",value:"230227",label:"富裕县"},{id:"230229",value:"230229",label:"克山县"},{id:"230230",value:"230230",label:"克东县"},{id:"230231",value:"230231",label:"拜泉县"},{id:"230281",value:"230281",label:"讷河市"},{id:"230282",value:"230282",label:"高新区"}]},{id:"230300",value:"230300",label:"鸡西市",children:[{id:"230302",value:"230302",label:"鸡冠区"},{id:"230303",value:"230303",label:"恒山区"},{id:"230304",value:"230304",label:"滴道区"},{id:"230305",value:"230305",label:"梨树区"},{id:"230306",value:"230306",label:"城子河区"},{id:"230307",value:"230307",label:"麻山区"},{id:"230321",value:"230321",label:"鸡东县"},{id:"230381",value:"230381",label:"虎林市"},{id:"230382",value:"230382",label:"密山市"}]},{id:"230400",value:"230400",label:"鹤岗市",children:[{id:"230402",value:"230402",label:"向阳区"},{id:"230403",value:"230403",label:"工农区"},{id:"230404",value:"230404",label:"南山区"},{id:"230405",value:"230405",label:"兴安区"},{id:"230406",value:"230406",label:"东山区"},{id:"230407",value:"230407",label:"兴山区"},{id:"230421",value:"230421",label:"萝北县"},{id:"230422",value:"230422",label:"绥滨县"}]},{id:"230500",value:"230500",label:"双鸭山市",children:[{id:"230502",value:"230502",label:"尖山区"},{id:"230503",value:"230503",label:"岭东区"},{id:"230505",value:"230505",label:"四方台区"},{id:"230506",value:"230506",label:"宝山区"},{id:"230521",value:"230521",label:"集贤县"},{id:"230522",value:"230522",label:"友谊县"},{id:"230523",value:"230523",label:"宝清县"},{id:"230524",value:"230524",label:"饶河县"}]},{id:"230600",value:"230600",label:"大庆市",children:[{id:"230602",value:"230602",label:"萨尔图区"},{id:"230603",value:"230603",label:"龙凤区"},{id:"230604",value:"230604",label:"让胡路区"},{id:"230605",value:"230605",label:"红岗区"},{id:"230606",value:"230606",label:"大同区"},{id:"230621",value:"230621",label:"肇州县"},{id:"230622",value:"230622",label:"肇源县"},{id:"230623",value:"230623",label:"林甸县"},{id:"230624",value:"230624",label:"杜尔伯特蒙古族自治县"},{id:"230625",value:"230625",label:"高新区"}]},{id:"230700",value:"230700",label:"伊春市",children:[{id:"230702",value:"230702",label:"伊春区"},{id:"230703",value:"230703",label:"南岔区"},{id:"230704",value:"230704",label:"友好区"},{id:"230705",value:"230705",label:"西林区"},{id:"230706",value:"230706",label:"翠峦区"},{id:"230707",value:"230707",label:"新青区"},{id:"230708",value:"230708",label:"美溪区"},{id:"230709",value:"230709",label:"金山屯区"},{id:"230710",value:"230710",label:"五营区"},{id:"230711",value:"230711",label:"乌马河区"},{id:"230712",value:"230712",label:"汤旺河区"},{id:"230713",value:"230713",label:"带岭区"},{id:"230714",value:"230714",label:"乌伊岭区"},{id:"230715",value:"230715",label:"红星区"},{id:"230716",value:"230716",label:"上甘岭区"},{id:"230722",value:"230722",label:"嘉荫县"},{id:"230781",value:"230781",label:"铁力市"}]},{id:"230800",value:"230800",label:"佳木斯市",children:[{id:"230803",value:"230803",label:"向阳区"},{id:"230804",value:"230804",label:"前进区"},{id:"230805",value:"230805",label:"东风区"},{id:"230811",value:"230811",label:"郊区"},{id:"230822",value:"230822",label:"桦南县"},{id:"230826",value:"230826",label:"桦川县"},{id:"230828",value:"230828",label:"汤原县"},{id:"230881",value:"230881",label:"同江市"},{id:"230882",value:"230882",label:"富锦市"},{id:"230883",value:"230883",label:"抚远市"}]},{id:"230900",value:"230900",label:"七台河市",children:[{id:"230902",value:"230902",label:"新兴区"},{id:"230903",value:"230903",label:"桃山区"},{id:"230904",value:"230904",label:"茄子河区"},{id:"230921",value:"230921",label:"勃利县"}]},{id:"231000",value:"231000",label:"牡丹江市",children:[{id:"231002",value:"231002",label:"东安区"},{id:"231003",value:"231003",label:"阳明区"},{id:"231004",value:"231004",label:"爱民区"},{id:"231005",value:"231005",label:"西安区"},{id:"231025",value:"231025",label:"林口县"},{id:"231081",value:"231081",label:"绥芬河市"},{id:"231083",value:"231083",label:"海林市"},{id:"231084",value:"231084",label:"宁安市"},{id:"231085",value:"231085",label:"穆棱市"},{id:"231086",value:"231086",label:"东宁市"}]},{id:"231100",value:"231100",label:"黑河市",children:[{id:"231102",value:"231102",label:"爱辉区"},{id:"231121",value:"231121",label:"嫩江县"},{id:"231123",value:"231123",label:"逊克县"},{id:"231124",value:"231124",label:"孙吴县"},{id:"231181",value:"231181",label:"北安市"},{id:"231182",value:"231182",label:"五大连池市"}]},{id:"231200",value:"231200",label:"绥化市",children:[{id:"231202",value:"231202",label:"北林区"},{id:"231221",value:"231221",label:"望奎县"},{id:"231222",value:"231222",label:"兰西县"},{id:"231223",value:"231223",label:"青冈县"},{id:"231224",value:"231224",label:"庆安县"},{id:"231225",value:"231225",label:"明水县"},{id:"231226",value:"231226",label:"绥棱县"},{id:"231281",value:"231281",label:"安达市"},{id:"231282",value:"231282",label:"肇东市"},{id:"231283",value:"231283",label:"海伦市"}]},{id:"232700",value:"232700",label:"大兴安岭地区",children:[{id:"232701",value:"232701",label:"漠河市"},{id:"232721",value:"232721",label:"呼玛县"},{id:"232722",value:"232722",label:"塔河县"},{id:"232723",value:"232723",label:"加格达奇区"},{id:"232724",value:"232724",label:"新林区"},{id:"232725",value:"232725",label:"松岭区"},{id:"232726",value:"232726",label:"呼中区"}]}]},{id:"220000",value:"220000",label:"吉林省",key:"J",children:[{id:"220100",value:"220100",label:"长春市",children:[{id:"220102",value:"220102",label:"南关区"},{id:"220103",value:"220103",label:"宽城区"},{id:"220104",value:"220104",label:"朝阳区"},{id:"220105",value:"220105",label:"二道区"},{id:"220106",value:"220106",label:"绿园区"},{id:"220112",value:"220112",label:"双阳区"},{id:"220113",value:"220113",label:"九台区"},{id:"220122",value:"220122",label:"农安县"},{id:"220182",value:"220182",label:"榆树市"},{id:"220183",value:"220183",label:"德惠市"},{id:"220184",value:"220184",label:"长春新区"},{id:"220185",value:"220185",label:"高新区"},{id:"220186",value:"220186",label:"经济技术开发区"},{id:"220187",value:"220187",label:"汽车产业开发区"},{id:"220188",value:"220188",label:"兴隆综合保税区"}]},{id:"220200",value:"220200",label:"吉林市",children:[{id:"220202",value:"220202",label:"昌邑区"},{id:"220203",value:"220203",label:"龙潭区"},{id:"220204",value:"220204",label:"船营区"},{id:"220211",value:"220211",label:"丰满区"},{id:"220221",value:"220221",label:"永吉县"},{id:"220281",value:"220281",label:"蛟河市"},{id:"220282",value:"220282",label:"桦甸市"},{id:"220283",value:"220283",label:"舒兰市"},{id:"220284",value:"220284",label:"磐石市"},{id:"220285",value:"220285",label:"高新区"}]},{id:"220300",value:"220300",label:"四平市",children:[{id:"220302",value:"220302",label:"铁西区"},{id:"220303",value:"220303",label:"铁东区"},{id:"220322",value:"220322",label:"梨树县"},{id:"220323",value:"220323",label:"伊通满族自治县"},{id:"220381",value:"220381",label:"公主岭市"},{id:"220382",value:"220382",label:"双辽市"}]},{id:"220400",value:"220400",label:"辽源市",children:[{id:"220402",value:"220402",label:"龙山区"},{id:"220403",value:"220403",label:"西安区"},{id:"220421",value:"220421",label:"东丰县"},{id:"220422",value:"220422",label:"东辽县"}]},{id:"220500",value:"220500",label:"通化市",children:[{id:"220502",value:"220502",label:"东昌区"},{id:"220503",value:"220503",label:"二道江区"},{id:"220521",value:"220521",label:"通化县"},{id:"220523",value:"220523",label:"辉南县"},{id:"220524",value:"220524",label:"柳河县"},{id:"220581",value:"220581",label:"梅河口市"},{id:"220582",value:"220582",label:"集安市"}]},{id:"220600",value:"220600",label:"白山市",children:[{id:"220602",value:"220602",label:"浑江区"},{id:"220605",value:"220605",label:"江源区"},{id:"220621",value:"220621",label:"抚松县"},{id:"220622",value:"220622",label:"靖宇县"},{id:"220623",value:"220623",label:"长白朝鲜族自治县"},{id:"220681",value:"220681",label:"临江市"}]},{id:"220700",value:"220700",label:"松原市",children:[{id:"220702",value:"220702",label:"宁江区"},{id:"220721",value:"220721",label:"前郭尔罗斯蒙古族自治县"},{id:"220722",value:"220722",label:"长岭县"},{id:"220723",value:"220723",label:"乾安县"},{id:"220781",value:"220781",label:"扶余市"}]},{id:"220800",value:"220800",label:"白城市",children:[{id:"220802",value:"220802",label:"洮北区"},{id:"220821",value:"220821",label:"镇赉县"},{id:"220822",value:"220822",label:"通榆县"},{id:"220881",value:"220881",label:"洮南市"},{id:"220882",value:"220882",label:"大安市"}]},{id:"222400",value:"222400",label:"延边朝鲜族自治州",children:[{id:"222401",value:"222401",label:"延吉市"},{id:"222402",value:"222402",label:"图们市"},{id:"222403",value:"222403",label:"敦化市"},{id:"222404",value:"222404",label:"珲春市"},{id:"222405",value:"222405",label:"龙井市"},{id:"222406",value:"222406",label:"和龙市"},{id:"222424",value:"222424",label:"汪清县"},{id:"222426",value:"222426",label:"安图县"}]}]},{id:"360000",value:"360000",label:"江西省",key:"",children:[{id:"360100",value:"360100",label:"南昌市",children:[{id:"360102",value:"360102",label:"东湖区"},{id:"360103",value:"360103",label:"西湖区"},{id:"360104",value:"360104",label:"青云谱区"},{id:"360105",value:"360105",label:"湾里区"},{id:"360111",value:"360111",label:"青山湖区"},{id:"360112",value:"360112",label:"新建区"},{id:"360121",value:"360121",label:"南昌县"},{id:"360123",value:"360123",label:"安义县"},{id:"360124",value:"360124",label:"进贤县"},{id:"360125",value:"360125",label:"红谷滩新区"},{id:"360126",value:"360126",label:"高新区"},{id:"360127",value:"360127",label:"经济开发区"},{id:"360128",value:"360128",label:"小蓝开发区"},{id:"360129",value:"360129",label:"桑海开发区"},{id:"360130",value:"360130",label:"望城新区"},{id:"360131",value:"360131",label:"赣江新区"}]},{id:"360200",value:"360200",label:"景德镇市",children:[{id:"360202",value:"360202",label:"昌江区"},{id:"360203",value:"360203",label:"珠山区"},{id:"360222",value:"360222",label:"浮梁县"},{id:"360281",value:"360281",label:"乐平市"}]},{id:"360300",value:"360300",label:"萍乡市",children:[{id:"360302",value:"360302",label:"安源区"},{id:"360313",value:"360313",label:"湘东区"},{id:"360321",value:"360321",label:"莲花县"},{id:"360322",value:"360322",label:"上栗县"},{id:"360323",value:"360323",label:"芦溪县"}]},{id:"360400",value:"360400",label:"九江市",children:[{id:"360402",value:"360402",label:"濂溪区"},{id:"360403",value:"360403",label:"浔阳区"},{id:"360404",value:"360404",label:"柴桑区"},{id:"360423",value:"360423",label:"武宁县"},{id:"360424",value:"360424",label:"修水县"},{id:"360425",value:"360425",label:"永修县"},{id:"360426",value:"360426",label:"德安县"},{id:"360428",value:"360428",label:"都昌县"},{id:"360429",value:"360429",label:"湖口县"},{id:"360430",value:"360430",label:"彭泽县"},{id:"360481",value:"360481",label:"瑞昌市"},{id:"360482",value:"360482",label:"共青城市"},{id:"360483",value:"360483",label:"庐山市"},{id:"360484",value:"360484",label:"经济技术开发区"},{id:"360485",value:"360485",label:"八里湖新区"},{id:"360486",value:"360486",label:"庐山风景名胜区"}]},{id:"360500",value:"360500",label:"新余市",children:[{id:"360502",value:"360502",label:"渝水区"},{id:"360521",value:"360521",label:"分宜县"}]},{id:"360600",value:"360600",label:"鹰潭市",children:[{id:"360602",value:"360602",label:"月湖区"},{id:"360603",value:"360603",label:"余江区"},{id:"360681",value:"360681",label:"贵溪市"},{id:"360682",value:"360682",label:"高新区"}]},{id:"360700",value:"360700",label:"赣州市",children:[{id:"360702",value:"360702",label:"章贡区"},{id:"360703",value:"360703",label:"南康区"},{id:"360704",value:"360704",label:"赣县区"},{id:"360722",value:"360722",label:"信丰县"},{id:"360723",value:"360723",label:"大余县"},{id:"360724",value:"360724",label:"上犹县"},{id:"360725",value:"360725",label:"崇义县"},{id:"360726",value:"360726",label:"安远县"},{id:"360727",value:"360727",label:"龙南县"},{id:"360728",value:"360728",label:"定南县"},{id:"360729",value:"360729",label:"全南县"},{id:"360730",value:"360730",label:"宁都县"},{id:"360731",value:"360731",label:"于都县"},{id:"360732",value:"360732",label:"兴国县"},{id:"360733",value:"360733",label:"会昌县"},{id:"360734",value:"360734",label:"寻乌县"},{id:"360735",value:"360735",label:"石城县"},{id:"360781",value:"360781",label:"瑞金市"},{id:"360782",value:"360782",label:"章康新区"}]},{id:"360800",value:"360800",label:"吉安市",children:[{id:"360802",value:"360802",label:"吉州区"},{id:"360803",value:"360803",label:"青原区"},{id:"360821",value:"360821",label:"吉安县"},{id:"360822",value:"360822",label:"吉水县"},{id:"360823",value:"360823",label:"峡江县"},{id:"360824",value:"360824",label:"新干县"},{id:"360825",value:"360825",label:"永丰县"},{id:"360826",value:"360826",label:"泰和县"},{id:"360827",value:"360827",label:"遂川县"},{id:"360828",value:"360828",label:"万安县"},{id:"360829",value:"360829",label:"安福县"},{id:"360830",value:"360830",label:"永新县"},{id:"360881",value:"360881",label:"井冈山市"}]},{id:"360900",value:"360900",label:"宜春市",children:[{id:"360902",value:"360902",label:"袁州区"},{id:"360921",value:"360921",label:"奉新县"},{id:"360922",value:"360922",label:"万载县"},{id:"360923",value:"360923",label:"上高县"},{id:"360924",value:"360924",label:"宜丰县"},{id:"360925",value:"360925",label:"靖安县"},{id:"360926",value:"360926",label:"铜鼓县"},{id:"360981",value:"360981",label:"丰城市"},{id:"360982",value:"360982",label:"樟树市"},{id:"360983",value:"360983",label:"高安市"}]},{id:"361000",value:"361000",label:"抚州市",children:[{id:"361002",value:"361002",label:"临川区"},{id:"361003",value:"361003",label:"东乡区"},{id:"361021",value:"361021",label:"南城县"},{id:"361022",value:"361022",label:"黎川县"},{id:"361023",value:"361023",label:"南丰县"},{id:"361024",value:"361024",label:"崇仁县"},{id:"361025",value:"361025",label:"乐安县"},{id:"361026",value:"361026",label:"宜黄县"},{id:"361027",value:"361027",label:"金溪县"},{id:"361028",value:"361028",label:"资溪县"},{id:"361030",value:"361030",label:"广昌县"}]},{id:"361100",value:"361100",label:"上饶市",children:[{id:"361102",value:"361102",label:"信州区"},{id:"361103",value:"361103",label:"广丰区"},{id:"361121",value:"361121",label:"上饶县"},{id:"361123",value:"361123",label:"玉山县"},{id:"361124",value:"361124",label:"铅山县"},{id:"361125",value:"361125",label:"横峰县"},{id:"361126",value:"361126",label:"弋阳县"},{id:"361127",value:"361127",label:"余干县"},{id:"361128",value:"361128",label:"鄱阳县"},{id:"361129",value:"361129",label:"万年县"},{id:"361130",value:"361130",label:"婺源县"},{id:"361181",value:"361181",label:"德兴市"}]}]},{id:"320000",value:"320000",label:"江苏省",key:"",children:[{id:"320100",value:"320100",label:"南京市",children:[{id:"320102",value:"320102",label:"玄武区"},{id:"320104",value:"320104",label:"秦淮区"},{id:"320105",value:"320105",label:"建邺区"},{id:"320106",value:"320106",label:"鼓楼区"},{id:"320111",value:"320111",label:"浦口区"},{id:"320113",value:"320113",label:"栖霞区"},{id:"320114",value:"320114",label:"雨花台区"},{id:"320115",value:"320115",label:"江宁区"},{id:"320116",value:"320116",label:"六合区"},{id:"320117",value:"320117",label:"溧水区"},{id:"320118",value:"320118",label:"高淳区"},{id:"320119",value:"320119",label:"江北新区"},{id:"320120",value:"320120",label:"高新区"}]},{id:"320200",value:"320200",label:"无锡市",children:[{id:"320205",value:"320205",label:"锡山区"},{id:"320206",value:"320206",label:"惠山区"},{id:"320211",value:"320211",label:"滨湖区"},{id:"320213",value:"320213",label:"梁溪区"},{id:"320214",value:"320214",label:"新吴区"},{id:"320281",value:"320281",label:"江阴市"},{id:"320282",value:"320282",label:"宜兴市"}]},{id:"320300",value:"320300",label:"徐州市",children:[{id:"320302",value:"320302",label:"鼓楼区"},{id:"320303",value:"320303",label:"云龙区"},{id:"320305",value:"320305",label:"贾汪区"},{id:"320311",value:"320311",label:"泉山区"},{id:"320312",value:"320312",label:"铜山区"},{id:"320321",value:"320321",label:"丰县"},{id:"320322",value:"320322",label:"沛县"},{id:"320324",value:"320324",label:"睢宁县"},{id:"320381",value:"320381",label:"新沂市"},{id:"320382",value:"320382",label:"邳州市"},{id:"320383",value:"320383",label:"经济技术开发区"},{id:"320384",value:"320384",label:"高新区"},{id:"320385",value:"320385",label:"软件园"}]},{id:"320400",value:"320400",label:"常州市",children:[{id:"320402",value:"320402",label:"天宁区"},{id:"320404",value:"320404",label:"钟楼区"},{id:"320411",value:"320411",label:"新北区"},{id:"320412",value:"320412",label:"武进区"},{id:"320413",value:"320413",label:"金坛区"},{id:"320481",value:"320481",label:"溧阳市"},{id:"320482",value:"320482",label:"高新区"}]},{id:"320500",value:"320500",label:"苏州市",children:[{id:"320505",value:"320505",label:"虎丘区"},{id:"320506",value:"320506",label:"吴中区"},{id:"320507",value:"320507",label:"相城区"},{id:"320508",value:"320508",label:"姑苏区"},{id:"320509",value:"320509",label:"吴江区"},{id:"320581",value:"320581",label:"常熟市"},{id:"320582",value:"320582",label:"张家港市"},{id:"320583",value:"320583",label:"昆山市"},{id:"320585",value:"320585",label:"太仓市"},{id:"320586",value:"320586",label:"苏州新区"},{id:"320587",value:"320587",label:"工业园区"},{id:"320588",value:"320588",label:"高新区"}]},{id:"320600",value:"320600",label:"南通市",children:[{id:"320602",value:"320602",label:"崇川区"},{id:"320611",value:"320611",label:"港闸区"},{id:"320612",value:"320612",label:"通州区"},{id:"320623",value:"320623",label:"如东县"},{id:"320681",value:"320681",label:"启东市"},{id:"320682",value:"320682",label:"如皋市"},{id:"320684",value:"320684",label:"海门市"},{id:"320685",value:"320685",label:"海安市"},{id:"320686",value:"320686",label:"经济技术开发区"}]},{id:"320700",value:"320700",label:"连云港市",children:[{id:"320703",value:"320703",label:"连云区"},{id:"320706",value:"320706",label:"海州区"},{id:"320707",value:"320707",label:"赣榆区"},{id:"320722",value:"320722",label:"东海县"},{id:"320723",value:"320723",label:"灌云县"},{id:"320724",value:"320724",label:"灌南县"},{id:"320725",value:"320725",label:"新海新区"},{id:"320726",value:"320726",label:"连云新城"},{id:"320727",value:"320727",label:"徐圩新区"},{id:"320728",value:"320728",label:"济技术开发区"}]},{id:"320800",value:"320800",label:"淮安市",children:[{id:"320803",value:"320803",label:"淮安区"},{id:"320804",value:"320804",label:"淮阴区"},{id:"320812",value:"320812",label:"清江浦区"},{id:"320813",value:"320813",label:"洪泽区"},{id:"320826",value:"320826",label:"涟水县"},{id:"320830",value:"320830",label:"盱眙县"},{id:"320831",value:"320831",label:"金湖县"},{id:"320832",value:"320832",label:"经济开发区"}]},{id:"320900",value:"320900",label:"盐城市",children:[{id:"320902",value:"320902",label:"亭湖区"},{id:"320903",value:"320903",label:"盐都区"},{id:"320904",value:"320904",label:"大丰区"},{id:"320921",value:"320921",label:"响水县"},{id:"320922",value:"320922",label:"滨海县"},{id:"320923",value:"320923",label:"阜宁县"},{id:"320924",value:"320924",label:"射阳县"},{id:"320925",value:"320925",label:"建湖县"},{id:"320981",value:"320981",label:"东台市"}]},{id:"321000",value:"321000",label:"扬州市",children:[{id:"321002",value:"321002",label:"广陵区"},{id:"321003",value:"321003",label:"邗江区"},{id:"321012",value:"321012",label:"江都区"},{id:"321023",value:"321023",label:"宝应县"},{id:"321081",value:"321081",label:"仪征市"},{id:"321084",value:"321084",label:"高邮市"}]},{id:"321100",value:"321100",label:"镇江市",children:[{id:"321102",value:"321102",label:"京口区"},{id:"321111",value:"321111",label:"润州区"},{id:"321112",value:"321112",label:"丹徒区"},{id:"321181",value:"321181",label:"丹阳市"},{id:"321182",value:"321182",label:"扬中市"},{id:"321183",value:"321183",label:"句容市"},{id:"321184",value:"321184",label:"镇江新区"},{id:"321185",value:"321185",label:"镇江新区"},{id:"321186",value:"321186",label:"经济开发区"}]},{id:"321200",value:"321200",label:"泰州市",children:[{id:"321202",value:"321202",label:"海陵区"},{id:"321203",value:"321203",label:"高港区"},{id:"321204",value:"321204",label:"姜堰区"},{id:"321281",value:"321281",label:"兴化市"},{id:"321282",value:"321282",label:"靖江市"},{id:"321283",value:"321283",label:"泰兴市"}]},{id:"321300",value:"321300",label:"宿迁市",children:[{id:"321302",value:"321302",label:"宿城区"},{id:"321311",value:"321311",label:"宿豫区"},{id:"321322",value:"321322",label:"沭阳县"},{id:"321323",value:"321323",label:"泗阳县"},{id:"321324",value:"321324",label:"泗洪县"},{id:"321325",value:"321325",label:"高新区"}]}]},{id:"210000",value:"210000",label:"辽宁省",key:"L",children:[{id:"210100",value:"210100",label:"沈阳市",children:[{id:"210102",value:"210102",label:"和平区"},{id:"210103",value:"210103",label:"沈河区"},{id:"210104",value:"210104",label:"大东区"},{id:"210105",value:"210105",label:"皇姑区"},{id:"210106",value:"210106",label:"铁西区"},{id:"210111",value:"210111",label:"苏家屯区"},{id:"210112",value:"210112",label:"浑南区"},{id:"210113",value:"210113",label:"沈北新区"},{id:"210114",value:"210114",label:"于洪区"},{id:"210115",value:"210115",label:"辽中区"},{id:"210123",value:"210123",label:"康平县"},{id:"210124",value:"210124",label:"法库县"},{id:"210181",value:"210181",label:"新民市"},{id:"210182",value:"210182",label:"高新区"}]},{id:"210200",value:"210200",label:"大连市",children:[{id:"210202",value:"210202",label:"中山区"},{id:"210203",value:"210203",label:"西岗区"},{id:"210204",value:"210204",label:"沙河口区"},{id:"210211",value:"210211",label:"甘井子区"},{id:"210212",value:"210212",label:"旅顺口区"},{id:"210213",value:"210213",label:"金州区"},{id:"210214",value:"210214",label:"普兰店区"},{id:"210224",value:"210224",label:"长海县"},{id:"210281",value:"210281",label:"瓦房店市"},{id:"210283",value:"210283",label:"庄河市"},{id:"210284",value:"210284",label:"高新区"},{id:"210285",value:"210285",label:"经济开发区"},{id:"210286",value:"210286",label:"金普新区"}]},{id:"210300",value:"210300",label:"鞍山市",children:[{id:"210302",value:"210302",label:"铁东区"},{id:"210303",value:"210303",label:"铁西区"},{id:"210304",value:"210304",label:"立山区"},{id:"210311",value:"210311",label:"千山区"},{id:"210321",value:"210321",label:"台安县"},{id:"210323",value:"210323",label:"岫岩满族自治县"},{id:"210381",value:"210381",label:"海城市"},{id:"210382",value:"210382",label:"高新区"}]},{id:"210400",value:"210400",label:"抚顺市",children:[{id:"210402",value:"210402",label:"新抚区"},{id:"210403",value:"210403",label:"东洲区"},{id:"210404",value:"210404",label:"望花区"},{id:"210411",value:"210411",label:"顺城区"},{id:"210421",value:"210421",label:"抚顺县"},{id:"210422",value:"210422",label:"新宾满族自治县"},{id:"210423",value:"210423",label:"清原满族自治县"}]},{id:"210500",value:"210500",label:"本溪市",children:[{id:"210502",value:"210502",label:"平山区"},{id:"210503",value:"210503",label:"溪湖区"},{id:"210504",value:"210504",label:"明山区"},{id:"210505",value:"210505",label:"南芬区"},{id:"210521",value:"210521",label:"本溪满族自治县"},{id:"210522",value:"210522",label:"桓仁满族自治县"}]},{id:"210600",value:"210600",label:"丹东市",children:[{id:"210602",value:"210602",label:"元宝区"},{id:"210603",value:"210603",label:"振兴区"},{id:"210604",value:"210604",label:"振安区"},{id:"210624",value:"210624",label:"宽甸满族自治县"},{id:"210681",value:"210681",label:"东港市"},{id:"210682",value:"210682",label:"凤城市"}]},{id:"210700",value:"210700",label:"锦州市",children:[{id:"210702",value:"210702",label:"古塔区"},{id:"210703",value:"210703",label:"凌河区"},{id:"210711",value:"210711",label:"太和区"},{id:"210726",value:"210726",label:"黑山县"},{id:"210727",value:"210727",label:"义县"},{id:"210781",value:"210781",label:"凌海市"},{id:"210782",value:"210782",label:"北镇市"},{id:"210783",value:"210783",label:"松山新区"},{id:"210784",value:"210784",label:"龙栖湾新区"},{id:"210785",value:"210785",label:"经济技术开发区"}]},{id:"210800",value:"210800",label:"营口市",children:[{id:"210802",value:"210802",label:"站前区"},{id:"210803",value:"210803",label:"西市区"},{id:"210804",value:"210804",label:"鲅鱼圈区"},{id:"210811",value:"210811",label:"老边区"},{id:"210881",value:"210881",label:"盖州市"},{id:"210882",value:"210882",label:"大石桥市"}]},{id:"210900",value:"210900",label:"阜新市",children:[{id:"210902",value:"210902",label:"海州区"},{id:"210903",value:"210903",label:"新邱区"},{id:"210904",value:"210904",label:"太平区"},{id:"210905",value:"210905",label:"清河门区"},{id:"210911",value:"210911",label:"细河区"},{id:"210921",value:"210921",label:"阜新蒙古族自治县"},{id:"210922",value:"210922",label:"彰武县"}]},{id:"211000",value:"211000",label:"辽阳市",children:[{id:"211002",value:"211002",label:"白塔区"},{id:"211003",value:"211003",label:"文圣区"},{id:"211004",value:"211004",label:"宏伟区"},{id:"211005",value:"211005",label:"弓长岭区"},{id:"211011",value:"211011",label:"太子河区"},{id:"211021",value:"211021",label:"辽阳县"},{id:"211081",value:"211081",label:"灯塔市"}]},{id:"211100",value:"211100",label:"盘锦市",children:[{id:"211102",value:"211102",label:"双台子区"},{id:"211103",value:"211103",label:"兴隆台区"},{id:"211104",value:"211104",label:"大洼区"},{id:"211122",value:"211122",label:"盘山县"}]},{id:"211200",value:"211200",label:"铁岭市",children:[{id:"211202",value:"211202",label:"银州区"},{id:"211204",value:"211204",label:"清河区"},{id:"211221",value:"211221",label:"铁岭县"},{id:"211223",value:"211223",label:"西丰县"},{id:"211224",value:"211224",label:"昌图县"},{id:"211281",value:"211281",label:"调兵山市"},{id:"211282",value:"211282",label:"开原市"}]},{id:"211300",value:"211300",label:"朝阳市",children:[{id:"211302",value:"211302",label:"双塔区"},{id:"211303",value:"211303",label:"龙城区"},{id:"211321",value:"211321",label:"朝阳县"},{id:"211322",value:"211322",label:"建平县"},{id:"211324",value:"211324",label:"喀喇沁左翼蒙古族自治县"},{id:"211381",value:"211381",label:"北票市"},{id:"211382",value:"211382",label:"凌源市"}]},{id:"211400",value:"211400",label:"葫芦岛市",children:[{id:"211402",value:"211402",label:"连山区"},{id:"211403",value:"211403",label:"龙港区"},{id:"211404",value:"211404",label:"南票区"},{id:"211421",value:"211421",label:"绥中县"},{id:"211422",value:"211422",label:"建昌县"},{id:"211481",value:"211481",label:"兴城市"}]}]},{id:"640000",value:"640000",label:"宁夏",key:"N",children:[{id:"640100",value:"640100",label:"银川市",children:[{id:"640104",value:"640104",label:"兴庆区"},{id:"640105",value:"640105",label:"西夏区"},{id:"640106",value:"640106",label:"金凤区"},{id:"640121",value:"640121",label:"永宁县"},{id:"640122",value:"640122",label:"贺兰县"},{id:"640181",value:"640181",label:"灵武市"},{id:"640182",value:"640182",label:"经济开发区"}]},{id:"640200",value:"640200",label:"石嘴山市",children:[{id:"640202",value:"640202",label:"大武口区"},{id:"640205",value:"640205",label:"惠农区"},{id:"640221",value:"640221",label:"平罗县"},{id:"640222",value:"640222",label:"经济开发区"}]},{id:"640300",value:"640300",label:"吴忠市",children:[{id:"640302",value:"640302",label:"利通区"},{id:"640303",value:"640303",label:"红寺堡区"},{id:"640323",value:"640323",label:"盐池县"},{id:"640324",value:"640324",label:"同心县"},{id:"640381",value:"640381",label:"青铜峡市"}]},{id:"640400",value:"640400",label:"固原市",children:[{id:"640402",value:"640402",label:"原州区"},{id:"640422",value:"640422",label:"西吉县"},{id:"640423",value:"640423",label:"隆德县"},{id:"640424",value:"640424",label:"泾源县"},{id:"640425",value:"640425",label:"彭阳县"}]},{id:"640500",value:"640500",label:"中卫市",children:[{id:"640502",value:"640502",label:"沙坡头区"},{id:"640521",value:"640521",label:"中宁县"},{id:"640522",value:"640522",label:"海原县"}]}]},{id:"150000",value:"150000",label:"内蒙古",key:"",children:[{id:"150100",value:"150100",label:"呼和浩特市",children:[{id:"150102",value:"150102",label:"新城区"},{id:"150103",value:"150103",label:"回民区"},{id:"150104",value:"150104",label:"玉泉区"},{id:"150105",value:"150105",label:"赛罕区"},{id:"150121",value:"150121",label:"土默特左旗"},{id:"150122",value:"150122",label:"托克托县"},{id:"150123",value:"150123",label:"和林格尔县"},{id:"150124",value:"150124",label:"清水河县"},{id:"150125",value:"150125",label:"武川县"},{id:"150171",value:"150171",label:"金海工业园区"},{id:"150172",value:"150172",label:"经济技术开发区"}]},{id:"150200",value:"150200",label:"包头市",children:[{id:"150202",value:"150202",label:"东河区"},{id:"150203",value:"150203",label:"昆都仑区"},{id:"150204",value:"150204",label:"青山区"},{id:"150205",value:"150205",label:"石拐区"},{id:"150206",value:"150206",label:"白云鄂博矿区"},{id:"150207",value:"150207",label:"九原区"},{id:"150221",value:"150221",label:"土默特右旗"},{id:"150222",value:"150222",label:"固阳县"},{id:"150223",value:"150223",label:"达尔罕茂明安联合旗"}]},{id:"150300",value:"150300",label:"乌海市",children:[{id:"150302",value:"150302",label:"海勃湾区"},{id:"150303",value:"150303",label:"海南区"},{id:"150304",value:"150304",label:"乌达区"}]},{id:"150400",value:"150400",label:"赤峰市",children:[{id:"150402",value:"150402",label:"红山区"},{id:"150403",value:"150403",label:"元宝山区"},{id:"150404",value:"150404",label:"松山区"},{id:"150421",value:"150421",label:"阿鲁科尔沁旗"},{id:"150422",value:"150422",label:"巴林左旗"},{id:"150423",value:"150423",label:"巴林右旗"},{id:"150424",value:"150424",label:"林西县"},{id:"150425",value:"150425",label:"克什克腾旗"},{id:"150426",value:"150426",label:"翁牛特旗"},{id:"150428",value:"150428",label:"喀喇沁旗"},{id:"150429",value:"150429",label:"宁城县"},{id:"150430",value:"150430",label:"敖汉旗"}]},{id:"150500",value:"150500",label:"通辽市",children:[{id:"150502",value:"150502",label:"科尔沁区"},{id:"150521",value:"150521",label:"科尔沁左翼中旗"},{id:"150522",value:"150522",label:"科尔沁左翼后旗"},{id:"150523",value:"150523",label:"开鲁县"},{id:"150524",value:"150524",label:"库伦旗"},{id:"150525",value:"150525",label:"奈曼旗"},{id:"150526",value:"150526",label:"扎鲁特旗"},{id:"150581",value:"150581",label:"霍林郭勒市"}]},{id:"150600",value:"150600",label:"鄂尔多斯市",children:[{id:"150602",value:"150602",label:"东胜区"},{id:"150603",value:"150603",label:"康巴什区"},{id:"150621",value:"150621",label:"达拉特旗"},{id:"150622",value:"150622",label:"准格尔旗"},{id:"150623",value:"150623",label:"鄂托克前旗"},{id:"150624",value:"150624",label:"鄂托克旗"},{id:"150625",value:"150625",label:"杭锦旗"},{id:"150626",value:"150626",label:"乌审旗"},{id:"150627",value:"150627",label:"伊金霍洛旗"}]},{id:"150700",value:"150700",label:"呼伦贝尔市",children:[{id:"150702",value:"150702",label:"海拉尔区"},{id:"150703",value:"150703",label:"扎赉诺尔区"},{id:"150721",value:"150721",label:"阿荣旗"},{id:"150722",value:"150722",label:"莫力达瓦达斡尔族自治旗"},{id:"150723",value:"150723",label:"鄂伦春自治旗"},{id:"150724",value:"150724",label:"鄂温克族自治旗"},{id:"150725",value:"150725",label:"陈巴尔虎旗"},{id:"150726",value:"150726",label:"新巴尔虎左旗"},{id:"150727",value:"150727",label:"新巴尔虎右旗"},{id:"150781",value:"150781",label:"满洲里市"},{id:"150782",value:"150782",label:"牙克石市"},{id:"150783",value:"150783",label:"扎兰屯市"},{id:"150784",value:"150784",label:"额尔古纳市"},{id:"150785",value:"150785",label:"根河市"}]},{id:"150800",value:"150800",label:"巴彦淖尔市",children:[{id:"150802",value:"150802",label:"临河区"},{id:"150821",value:"150821",label:"五原县"},{id:"150822",value:"150822",label:"磴口县"},{id:"150823",value:"150823",label:"乌拉特前旗"},{id:"150824",value:"150824",label:"乌拉特中旗"},{id:"150825",value:"150825",label:"乌拉特后旗"},{id:"150826",value:"150826",label:"杭锦后旗"}]},{id:"150900",value:"150900",label:"乌兰察布市",children:[{id:"150902",value:"150902",label:"集宁区"},{id:"150921",value:"150921",label:"卓资县"},{id:"150922",value:"150922",label:"化德县"},{id:"150923",value:"150923",label:"商都县"},{id:"150924",value:"150924",label:"兴和县"},{id:"150925",value:"150925",label:"凉城县"},{id:"150926",value:"150926",label:"察哈尔右翼前旗"},{id:"150927",value:"150927",label:"察哈尔右翼中旗"},{id:"150928",value:"150928",label:"察哈尔右翼后旗"},{id:"150929",value:"150929",label:"四子王旗"},{id:"150981",value:"150981",label:"丰镇市"}]},{id:"152200",value:"152200",label:"兴安盟",children:[{id:"152201",value:"152201",label:"乌兰浩特市"},{id:"152202",value:"152202",label:"阿尔山市"},{id:"152221",value:"152221",label:"科尔沁右翼前旗"},{id:"152222",value:"152222",label:"科尔沁右翼中旗"},{id:"152223",value:"152223",label:"扎赉特旗"},{id:"152224",value:"152224",label:"突泉县"}]},{id:"152500",value:"152500",label:"锡林郭勒盟",children:[{id:"152501",value:"152501",label:"二连浩特市"},{id:"152502",value:"152502",label:"锡林浩特市"},{id:"152522",value:"152522",label:"阿巴嘎旗"},{id:"152523",value:"152523",label:"苏尼特左旗"},{id:"152524",value:"152524",label:"苏尼特右旗"},{id:"152525",value:"152525",label:"东乌珠穆沁旗"},{id:"152526",value:"152526",label:"西乌珠穆沁旗"},{id:"152527",value:"152527",label:"太仆寺旗"},{id:"152528",value:"152528",label:"镶黄旗"},{id:"152529",value:"152529",label:"正镶白旗"},{id:"152530",value:"152530",label:"正蓝旗"},{id:"152531",value:"152531",label:"多伦县"}]},{id:"152900",value:"152900",label:"阿拉善盟",children:[{id:"152921",value:"152921",label:"阿拉善左旗"},{id:"152922",value:"152922",label:"阿拉善右旗"},{id:"152923",value:"152923",label:"额济纳旗"}]}]},{id:"630000",value:"630000",label:"青海省",key:"Q",children:[{id:"630100",value:"630100",label:"西宁市",children:[{id:"630102",value:"630102",label:"城东区"},{id:"630103",value:"630103",label:"城中区"},{id:"630104",value:"630104",label:"城西区"},{id:"630105",value:"630105",label:"城北区"},{id:"630121",value:"630121",label:"大通回族土族自治县"},{id:"630122",value:"630122",label:"湟中县"},{id:"630123",value:"630123",label:"湟源县"}]},{id:"630200",value:"630200",label:"海东市",children:[{id:"630202",value:"630202",label:"乐都区"},{id:"630203",value:"630203",label:"平安区"},{id:"630222",value:"630222",label:"民和回族土族自治县"},{id:"630223",value:"630223",label:"互助土族自治县"},{id:"630224",value:"630224",label:"化隆回族自治县"},{id:"630225",value:"630225",label:"循化撒拉族自治县"}]},{id:"632200",value:"632200",label:"海北藏族自治州",children:[{id:"632221",value:"632221",label:"门源回族自治县"},{id:"632222",value:"632222",label:"祁连县"},{id:"632223",value:"632223",label:"海晏县"},{id:"632224",value:"632224",label:"刚察县"}]},{id:"632300",value:"632300",label:"黄南藏族自治州",children:[{id:"632321",value:"632321",label:"同仁县"},{id:"632322",value:"632322",label:"尖扎县"},{id:"632323",value:"632323",label:"泽库县"},{id:"632324",value:"632324",label:"河南蒙古族自治县"}]},{id:"632500",value:"632500",label:"海南藏族自治州",children:[{id:"632521",value:"632521",label:"共和县"},{id:"632522",value:"632522",label:"同德县"},{id:"632523",value:"632523",label:"贵德县"},{id:"632524",value:"632524",label:"兴海县"},{id:"632525",value:"632525",label:"贵南县"}]},{id:"632600",value:"632600",label:"果洛藏族自治州",children:[{id:"632621",value:"632621",label:"玛沁县"},{id:"632622",value:"632622",label:"班玛县"},{id:"632623",value:"632623",label:"甘德县"},{id:"632624",value:"632624",label:"达日县"},{id:"632625",value:"632625",label:"久治县"},{id:"632626",value:"632626",label:"玛多县"}]},{id:"632700",value:"632700",label:"玉树藏族自治州",children:[{id:"632701",value:"632701",label:"玉树市"},{id:"632722",value:"632722",label:"杂多县"},{id:"632723",value:"632723",label:"称多县"},{id:"632724",value:"632724",label:"治多县"},{id:"632725",value:"632725",label:"囊谦县"},{id:"632726",value:"632726",label:"曲麻莱县"}]},{id:"632800",value:"632800",label:"海西蒙古族藏族自治州",children:[{id:"632801",value:"632801",label:"格尔木市"},{id:"632802",value:"632802",label:"德令哈市"},{id:"632821",value:"632821",label:"乌兰县"},{id:"632822",value:"632822",label:"都兰县"},{id:"632823",value:"632823",label:"天峻县"}]}]},{id:"140000",value:"140000",label:"山西省",key:"S",children:[{id:"140100",value:"140100",label:"太原市",children:[{id:"140105",value:"140105",label:"小店区"},{id:"140106",value:"140106",label:"迎泽区"},{id:"140107",value:"140107",label:"杏花岭区"},{id:"140108",value:"140108",label:"尖草坪区"},{id:"140109",value:"140109",label:"万柏林区"},{id:"140110",value:"140110",label:"晋源区"},{id:"140121",value:"140121",label:"清徐县"},{id:"140122",value:"140122",label:"阳曲县"},{id:"140123",value:"140123",label:"娄烦县"},{id:"140181",value:"140181",label:"古交市"},{id:"140182",value:"140182",label:"高新阳曲园区"},{id:"140183",value:"140183",label:"高新汾东园区"},{id:"140184",value:"140184",label:"高新姚村园区"}]},{id:"140200",value:"140200",label:"大同市",children:[{id:"140212",value:"140212",label:"新荣区"},{id:"140213",value:"140213",label:"平城区"},{id:"140214",value:"140214",label:"云冈区"},{id:"140215",value:"140215",label:"云州区"},{id:"140221",value:"140221",label:"阳高县"},{id:"140222",value:"140222",label:"天镇县"},{id:"140223",value:"140223",label:"广灵县"},{id:"140224",value:"140224",label:"灵丘县"},{id:"140225",value:"140225",label:"浑源县"},{id:"140226",value:"140226",label:"左云县"},{id:"140228",value:"140228",label:"经济开发区"}]},{id:"140300",value:"140300",label:"阳泉市",children:[{id:"140302",value:"140302",label:"城区"},{id:"140303",value:"140303",label:"矿区"},{id:"140311",value:"140311",label:"郊区"},{id:"140321",value:"140321",label:"平定县"},{id:"140322",value:"140322",label:"盂县"}]},{id:"140400",value:"140400",label:"长治市",children:[{id:"140402",value:"140402",label:"城区"},{id:"140411",value:"140411",label:"郊区"},{id:"140421",value:"140421",label:"长治县"},{id:"140423",value:"140423",label:"襄垣县"},{id:"140424",value:"140424",label:"屯留县"},{id:"140425",value:"140425",label:"平顺县"},{id:"140426",value:"140426",label:"黎城县"},{id:"140427",value:"140427",label:"壶关县"},{id:"140428",value:"140428",label:"长子县"},{id:"140429",value:"140429",label:"武乡县"},{id:"140430",value:"140430",label:"沁县"},{id:"140431",value:"140431",label:"沁源县"},{id:"140481",value:"140481",label:"潞城市"}]},{id:"140500",value:"140500",label:"晋城市",children:[{id:"140502",value:"140502",label:"城区"},{id:"140521",value:"140521",label:"沁水县"},{id:"140522",value:"140522",label:"阳城县"},{id:"140524",value:"140524",label:"陵川县"},{id:"140525",value:"140525",label:"泽州县"},{id:"140581",value:"140581",label:"高平市"},{id:"140582",value:"140582",label:"经济开发区"}]},{id:"140600",value:"140600",label:"朔州市",children:[{id:"140602",value:"140602",label:"朔城区"},{id:"140603",value:"140603",label:"平鲁区"},{id:"140621",value:"140621",label:"山阴县"},{id:"140622",value:"140622",label:"应县"},{id:"140623",value:"140623",label:"右玉县"},{id:"140681",value:"140681",label:"怀仁市"}]},{id:"140700",value:"140700",label:"晋中市",children:[{id:"140702",value:"140702",label:"榆次区"},{id:"140721",value:"140721",label:"榆社县"},{id:"140722",value:"140722",label:"左权县"},{id:"140723",value:"140723",label:"和顺县"},{id:"140724",value:"140724",label:"昔阳县"},{id:"140725",value:"140725",label:"寿阳县"},{id:"140726",value:"140726",label:"太谷县"},{id:"140727",value:"140727",label:"祁县"},{id:"140728",value:"140728",label:"平遥县"},{id:"140729",value:"140729",label:"灵石县"},{id:"140781",value:"140781",label:"介休市"}]},{id:"140800",value:"140800",label:"运城市",children:[{id:"140802",value:"140802",label:"盐湖区"},{id:"140821",value:"140821",label:"临猗县"},{id:"140822",value:"140822",label:"万荣县"},{id:"140823",value:"140823",label:"闻喜县"},{id:"140824",value:"140824",label:"稷山县"},{id:"140825",value:"140825",label:"新绛县"},{id:"140826",value:"140826",label:"绛县"},{id:"140827",value:"140827",label:"垣曲县"},{id:"140828",value:"140828",label:"夏县"},{id:"140829",value:"140829",label:"平陆县"},{id:"140830",value:"140830",label:"芮城县"},{id:"140881",value:"140881",label:"永济市"},{id:"140882",value:"140882",label:"河津市"}]},{id:"140900",value:"140900",label:"忻州市",children:[{id:"140902",value:"140902",label:"忻府区"},{id:"140921",value:"140921",label:"定襄县"},{id:"140922",value:"140922",label:"五台县"},{id:"140923",value:"140923",label:"代县"},{id:"140924",value:"140924",label:"繁峙县"},{id:"140925",value:"140925",label:"宁武县"},{id:"140926",value:"140926",label:"静乐县"},{id:"140927",value:"140927",label:"神池县"},{id:"140928",value:"140928",label:"五寨县"},{id:"140929",value:"140929",label:"岢岚县"},{id:"140930",value:"140930",label:"河曲县"},{id:"140931",value:"140931",label:"保德县"},{id:"140932",value:"140932",label:"偏关县"},{id:"140981",value:"140981",label:"原平市"}]},{id:"141000",value:"141000",label:"临汾市",children:[{id:"141002",value:"141002",label:"尧都区"},{id:"141021",value:"141021",label:"曲沃县"},{id:"141022",value:"141022",label:"翼城县"},{id:"141023",value:"141023",label:"襄汾县"},{id:"141024",value:"141024",label:"洪洞县"},{id:"141025",value:"141025",label:"古县"},{id:"141026",value:"141026",label:"安泽县"},{id:"141027",value:"141027",label:"浮山县"},{id:"141028",value:"141028",label:"吉县"},{id:"141029",value:"141029",label:"乡宁县"},{id:"141030",value:"141030",label:"大宁县"},{id:"141031",value:"141031",label:"隰县"},{id:"141032",value:"141032",label:"永和县"},{id:"141033",value:"141033",label:"蒲县"},{id:"141034",value:"141034",label:"汾西县"},{id:"141081",value:"141081",label:"侯马市"},{id:"141082",value:"141082",label:"霍州市"}]},{id:"141100",value:"141100",label:"吕梁市",children:[{id:"141102",value:"141102",label:"离石区"},{id:"141121",value:"141121",label:"文水县"},{id:"141122",value:"141122",label:"交城县"},{id:"141123",value:"141123",label:"兴县"},{id:"141124",value:"141124",label:"临县"},{id:"141125",value:"141125",label:"柳林县"},{id:"141126",value:"141126",label:"石楼县"},{id:"141127",value:"141127",label:"岚县"},{id:"141128",value:"141128",label:"方山县"},{id:"141129",value:"141129",label:"中阳县"},{id:"141130",value:"141130",label:"交口县"},{id:"141181",value:"141181",label:"孝义市"},{id:"141182",value:"141182",label:"汾阳市"}]}]},{id:"310000",value:"310000",label:"上海",key:"",children:[{id:"310100",value:"310100",label:"上海市",children:[{id:"310101",value:"310101",label:"黄浦区"},{id:"310104",value:"310104",label:"徐汇区"},{id:"310105",value:"310105",label:"长宁区"},{id:"310106",value:"310106",label:"静安区"},{id:"310107",value:"310107",label:"普陀区"},{id:"310109",value:"310109",label:"虹口区"},{id:"310110",value:"310110",label:"杨浦区"},{id:"310112",value:"310112",label:"闵行区"},{id:"310113",value:"310113",label:"宝山区"},{id:"310114",value:"310114",label:"嘉定区"},{id:"310115",value:"310115",label:"浦东新区"},{id:"310116",value:"310116",label:"金山区"},{id:"310117",value:"310117",label:"松江区"},{id:"310118",value:"310118",label:"青浦区"},{id:"310120",value:"310120",label:"奉贤区"},{id:"310151",value:"310151",label:"崇明区"},{id:"310231",value:"310231",label:"张江高新区"},{id:"310232",value:"310232",label:"紫竹高新区"},{id:"310233",value:"310233",label:"漕河泾开发区"}]}]},{id:"610000",value:"610000",label:"陕西省",key:"",children:[{id:"610100",value:"610100",label:"西安市",children:[{id:"610102",value:"610102",label:"新城区"},{id:"610103",value:"610103",label:"碑林区"},{id:"610104",value:"610104",label:"莲湖区"},{id:"610111",value:"610111",label:"灞桥区"},{id:"610112",value:"610112",label:"未央区"},{id:"610113",value:"610113",label:"雁塔区"},{id:"610114",value:"610114",label:"阎良区"},{id:"610115",value:"610115",label:"临潼区"},{id:"610116",value:"610116",label:"长安区"},{id:"610117",value:"610117",label:"高陵区"},{id:"610118",value:"610118",label:"鄠邑区"},{id:"610122",value:"610122",label:"蓝田县"},{id:"610124",value:"610124",label:"周至县"},{id:"610125",value:"610125",label:"西咸新区"},{id:"610127",value:"610127",label:"曲江新区"},{id:"610128",value:"610128",label:"高新区"}]},{id:"610200",value:"610200",label:"铜川市",children:[{id:"610202",value:"610202",label:"王益区"},{id:"610203",value:"610203",label:"印台区"},{id:"610204",value:"610204",label:"耀州区"},{id:"610222",value:"610222",label:"宜君县"}]},{id:"610300",value:"610300",label:"宝鸡市",children:[{id:"610302",value:"610302",label:"渭滨区"},{id:"610303",value:"610303",label:"金台区"},{id:"610304",value:"610304",label:"陈仓区"},{id:"610322",value:"610322",label:"凤翔县"},{id:"610323",value:"610323",label:"岐山县"},{id:"610324",value:"610324",label:"扶风县"},{id:"610326",value:"610326",label:"眉县"},{id:"610327",value:"610327",label:"陇县"},{id:"610328",value:"610328",label:"千阳县"},{id:"610329",value:"610329",label:"麟游县"},{id:"610330",value:"610330",label:"凤县"},{id:"610331",value:"610331",label:"太白县"},{id:"610332",value:"610332",label:"高新区"}]},{id:"610400",value:"610400",label:"咸阳市",children:[{id:"610402",value:"610402",label:"秦都区"},{id:"610403",value:"610403",label:"杨陵区"},{id:"610404",value:"610404",label:"渭城区"},{id:"610422",value:"610422",label:"三原县"},{id:"610423",value:"610423",label:"泾阳县"},{id:"610424",value:"610424",label:"乾县"},{id:"610425",value:"610425",label:"礼泉县"},{id:"610426",value:"610426",label:"永寿县"},{id:"610428",value:"610428",label:"长武县"},{id:"610429",value:"610429",label:"旬邑县"},{id:"610430",value:"610430",label:"淳化县"},{id:"610431",value:"610431",label:"武功县"},{id:"610481",value:"610481",label:"兴平市"},{id:"610482",value:"610482",label:"彬州市"},{id:"610483",value:"610483",label:"高新区"}]},{id:"610500",value:"610500",label:"渭南市",children:[{id:"610502",value:"610502",label:"临渭区"},{id:"610503",value:"610503",label:"华州区"},{id:"610522",value:"610522",label:"潼关县"},{id:"610523",value:"610523",label:"大荔县"},{id:"610524",value:"610524",label:"合阳县"},{id:"610525",value:"610525",label:"澄城县"},{id:"610526",value:"610526",label:"蒲城县"},{id:"610527",value:"610527",label:"白水县"},{id:"610528",value:"610528",label:"富平县"},{id:"610581",value:"610581",label:"韩城市"},{id:"610582",value:"610582",label:"华阴市"}]},{id:"610600",value:"610600",label:"延安市",children:[{id:"610602",value:"610602",label:"宝塔区"},{id:"610603",value:"610603",label:"安塞区"},{id:"610621",value:"610621",label:"延长县"},{id:"610622",value:"610622",label:"延川县"},{id:"610623",value:"610623",label:"子长县"},{id:"610625",value:"610625",label:"志丹县"},{id:"610626",value:"610626",label:"吴起县"},{id:"610627",value:"610627",label:"甘泉县"},{id:"610628",value:"610628",label:"富县"},{id:"610629",value:"610629",label:"洛川县"},{id:"610630",value:"610630",label:"宜川县"},{id:"610631",value:"610631",label:"黄龙县"},{id:"610632",value:"610632",label:"黄陵县"}]},{id:"610700",value:"610700",label:"汉中市",children:[{id:"610702",value:"610702",label:"汉台区"},{id:"610703",value:"610703",label:"南郑区"},{id:"610722",value:"610722",label:"城固县"},{id:"610723",value:"610723",label:"洋县"},{id:"610724",value:"610724",label:"西乡县"},{id:"610725",value:"610725",label:"勉县"},{id:"610726",value:"610726",label:"宁强县"},{id:"610727",value:"610727",label:"略阳县"},{id:"610728",value:"610728",label:"镇巴县"},{id:"610729",value:"610729",label:"留坝县"},{id:"610730",value:"610730",label:"佛坪县"}]},{id:"610800",value:"610800",label:"榆林市",children:[{id:"610802",value:"610802",label:"榆阳区"},{id:"610803",value:"610803",label:"横山区"},{id:"610822",value:"610822",label:"府谷县"},{id:"610824",value:"610824",label:"靖边县"},{id:"610825",value:"610825",label:"定边县"},{id:"610826",value:"610826",label:"绥德县"},{id:"610827",value:"610827",label:"米脂县"},{id:"610828",value:"610828",label:"佳县"},{id:"610829",value:"610829",label:"吴堡县"},{id:"610830",value:"610830",label:"清涧县"},{id:"610831",value:"610831",label:"子洲县"},{id:"610881",value:"610881",label:"神木市"}]},{id:"610900",value:"610900",label:"安康市",children:[{id:"610902",value:"610902",label:"汉滨区"},{id:"610921",value:"610921",label:"汉阴县"},{id:"610922",value:"610922",label:"石泉县"},{id:"610923",value:"610923",label:"宁陕县"},{id:"610924",value:"610924",label:"紫阳县"},{id:"610925",value:"610925",label:"岚皋县"},{id:"610926",value:"610926",label:"平利县"},{id:"610927",value:"610927",label:"镇坪县"},{id:"610928",value:"610928",label:"旬阳县"},{id:"610929",value:"610929",label:"白河县"}]},{id:"611000",value:"611000",label:"商洛市",children:[{id:"611002",value:"611002",label:"商州区"},{id:"611021",value:"611021",label:"洛南县"},{id:"611022",value:"611022",label:"丹凤县"},{id:"611023",value:"611023",label:"商南县"},{id:"611024",value:"611024",label:"山阳县"},{id:"611025",value:"611025",label:"镇安县"},{id:"611026",value:"611026",label:"柞水县"}]}]},{id:"510000",value:"510000",label:"四川省",key:"",children:[{id:"510100",value:"510100",label:"成都市",children:[{id:"510104",value:"510104",label:"锦江区"},{id:"510105",value:"510105",label:"青羊区"},{id:"510106",value:"510106",label:"金牛区"},{id:"510107",value:"510107",label:"武侯区"},{id:"510108",value:"510108",label:"成华区"},{id:"510112",value:"510112",label:"龙泉驿区"},{id:"510113",value:"510113",label:"青白江区"},{id:"510114",value:"510114",label:"新都区"},{id:"510115",value:"510115",label:"温江区"},{id:"510116",value:"510116",label:"双流区"},{id:"510117",value:"510117",label:"郫都区"},{id:"510121",value:"510121",label:"金堂县"},{id:"510129",value:"510129",label:"大邑县"},{id:"510131",value:"510131",label:"蒲江县"},{id:"510132",value:"510132",label:"新津县"},{id:"510181",value:"510181",label:"都江堰市"},{id:"510182",value:"510182",label:"彭州市"},{id:"510183",value:"510183",label:"邛崃市"},{id:"510184",value:"510184",label:"崇州市"},{id:"510185",value:"510185",label:"简阳市"},{id:"510186",value:"510186",label:"天府新区"},{id:"510187",value:"510187",label:"高新南区"},{id:"510188",value:"510188",label:"高新西区"}]},{id:"510300",value:"510300",label:"自贡市",children:[{id:"510302",value:"510302",label:"自流井区"},{id:"510303",value:"510303",label:"贡井区"},{id:"510304",value:"510304",label:"大安区"},{id:"510311",value:"510311",label:"沿滩区"},{id:"510321",value:"510321",label:"荣县"},{id:"510322",value:"510322",label:"富顺县"},{id:"510323",value:"510323",label:"高新区"}]},{id:"510400",value:"510400",label:"攀枝花市",children:[{id:"510402",value:"510402",label:"东区"},{id:"510403",value:"510403",label:"西区"},{id:"510411",value:"510411",label:"仁和区"},{id:"510421",value:"510421",label:"米易县"},{id:"510422",value:"510422",label:"盐边县"}]},{id:"510500",value:"510500",label:"泸州市",children:[{id:"510502",value:"510502",label:"江阳区"},{id:"510503",value:"510503",label:"纳溪区"},{id:"510504",value:"510504",label:"龙马潭区"},{id:"510521",value:"510521",label:"泸县"},{id:"510522",value:"510522",label:"合江县"},{id:"510524",value:"510524",label:"叙永县"},{id:"510525",value:"510525",label:"古蔺县"}]},{id:"510600",value:"510600",label:"德阳市",children:[{id:"510603",value:"510603",label:"旌阳区"},{id:"510604",value:"510604",label:"罗江区"},{id:"510623",value:"510623",label:"中江县"},{id:"510681",value:"510681",label:"广汉市"},{id:"510682",value:"510682",label:"什邡市"},{id:"510683",value:"510683",label:"绵竹市"}]},{id:"510700",value:"510700",label:"绵阳市",children:[{id:"510703",value:"510703",label:"涪城区"},{id:"510704",value:"510704",label:"游仙区"},{id:"510705",value:"510705",label:"安州区"},{id:"510722",value:"510722",label:"三台县"},{id:"510723",value:"510723",label:"盐亭县"},{id:"510725",value:"510725",label:"梓潼县"},{id:"510726",value:"510726",label:"北川羌族自治县"},{id:"510727",value:"510727",label:"平武县"},{id:"510781",value:"510781",label:"江油市"},{id:"510782",value:"510782",label:"高新区"},{id:"510783",value:"510783",label:"经开区"}]},{id:"510800",value:"510800",label:"广元市",children:[{id:"510802",value:"510802",label:"利州区"},{id:"510811",value:"510811",label:"昭化区"},{id:"510812",value:"510812",label:"朝天区"},{id:"510821",value:"510821",label:"旺苍县"},{id:"510822",value:"510822",label:"青川县"},{id:"510823",value:"510823",label:"剑阁县"},{id:"510824",value:"510824",label:"苍溪县"}]},{id:"510900",value:"510900",label:"遂宁市",children:[{id:"510903",value:"510903",label:"船山区"},{id:"510904",value:"510904",label:"安居区"},{id:"510921",value:"510921",label:"蓬溪县"},{id:"510922",value:"510922",label:"射洪县"},{id:"510923",value:"510923",label:"大英县"},{id:"510924",value:"510924",label:"经济技术开发区"}]},{id:"511000",value:"511000",label:"内江市",children:[{id:"511002",value:"511002",label:"市中区"},{id:"511011",value:"511011",label:"东兴区"},{id:"511024",value:"511024",label:"威远县"},{id:"511025",value:"511025",label:"资中县"},{id:"511083",value:"511083",label:"隆昌市"}]},{id:"511100",value:"511100",label:"乐山市",children:[{id:"511102",value:"511102",label:"市中区"},{id:"511111",value:"511111",label:"沙湾区"},{id:"511112",value:"511112",label:"五通桥区"},{id:"511113",value:"511113",label:"金口河区"},{id:"511123",value:"511123",label:"犍为县"},{id:"511124",value:"511124",label:"井研县"},{id:"511126",value:"511126",label:"夹江县"},{id:"511129",value:"511129",label:"沐川县"},{id:"511132",value:"511132",label:"峨边彝族自治县"},{id:"511133",value:"511133",label:"马边彝族自治县"},{id:"511181",value:"511181",label:"峨眉山市"}]},{id:"511300",value:"511300",label:"南充市",children:[{id:"511302",value:"511302",label:"顺庆区"},{id:"511303",value:"511303",label:"高坪区"},{id:"511304",value:"511304",label:"嘉陵区"},{id:"511321",value:"511321",label:"南部县"},{id:"511322",value:"511322",label:"营山县"},{id:"511323",value:"511323",label:"蓬安县"},{id:"511324",value:"511324",label:"仪陇县"},{id:"511325",value:"511325",label:"西充县"},{id:"511381",value:"511381",label:"阆中市"}]},{id:"511400",value:"511400",label:"眉山市",children:[{id:"511402",value:"511402",label:"东坡区"},{id:"511403",value:"511403",label:"彭山区"},{id:"511421",value:"511421",label:"仁寿县"},{id:"511423",value:"511423",label:"洪雅县"},{id:"511424",value:"511424",label:"丹棱县"},{id:"511425",value:"511425",label:"青神县"}]},{id:"511500",value:"511500",label:"宜宾市",children:[{id:"511502",value:"511502",label:"翠屏区"},{id:"511503",value:"511503",label:"南溪区"},{id:"511521",value:"511521",label:"宜宾县"},{id:"511523",value:"511523",label:"江安县"},{id:"511524",value:"511524",label:"长宁县"},{id:"511525",value:"511525",label:"高县"},{id:"511526",value:"511526",label:"珙县"},{id:"511527",value:"511527",label:"筠连县"},{id:"511528",value:"511528",label:"兴文县"},{id:"511529",value:"511529",label:"屏山县"}]},{id:"511600",value:"511600",label:"广安市",children:[{id:"511602",value:"511602",label:"广安区"},{id:"511603",value:"511603",label:"前锋区"},{id:"511621",value:"511621",label:"岳池县"},{id:"511622",value:"511622",label:"武胜县"},{id:"511623",value:"511623",label:"邻水县"},{id:"511681",value:"511681",label:"华蓥市"}]},{id:"511700",value:"511700",label:"达州市",children:[{id:"511702",value:"511702",label:"通川区"},{id:"511703",value:"511703",label:"达川区"},{id:"511722",value:"511722",label:"宣汉县"},{id:"511723",value:"511723",label:"开江县"},{id:"511724",value:"511724",label:"大竹县"},{id:"511725",value:"511725",label:"渠县"},{id:"511781",value:"511781",label:"万源市"}]},{id:"511800",value:"511800",label:"雅安市",children:[{id:"511802",value:"511802",label:"雨城区"},{id:"511803",value:"511803",label:"名山区"},{id:"511822",value:"511822",label:"荥经县"},{id:"511823",value:"511823",label:"汉源县"},{id:"511824",value:"511824",label:"石棉县"},{id:"511825",value:"511825",label:"天全县"},{id:"511826",value:"511826",label:"芦山县"},{id:"511827",value:"511827",label:"宝兴县"}]},{id:"511900",value:"511900",label:"巴中市",children:[{id:"511902",value:"511902",label:"巴州区"},{id:"511903",value:"511903",label:"恩阳区"},{id:"511921",value:"511921",label:"通江县"},{id:"511922",value:"511922",label:"南江县"},{id:"511923",value:"511923",label:"平昌县"}]},{id:"512000",value:"512000",label:"资阳市",children:[{id:"512002",value:"512002",label:"雁江区"},{id:"512021",value:"512021",label:"安岳县"},{id:"512022",value:"512022",label:"乐至县"}]},{id:"513200",value:"513200",label:"阿坝藏族羌族自治州",children:[{id:"513201",value:"513201",label:"马尔康市"},{id:"513221",value:"513221",label:"汶川县"},{id:"513222",value:"513222",label:"理县"},{id:"513223",value:"513223",label:"茂县"},{id:"513224",value:"513224",label:"松潘县"},{id:"513225",value:"513225",label:"九寨沟县"},{id:"513226",value:"513226",label:"金川县"},{id:"513227",value:"513227",label:"小金县"},{id:"513228",value:"513228",label:"黑水县"},{id:"513230",value:"513230",label:"壤塘县"},{id:"513231",value:"513231",label:"阿坝县"},{id:"513232",value:"513232",label:"若尔盖县"},{id:"513233",value:"513233",label:"红原县"}]},{id:"513300",value:"513300",label:"甘孜藏族自治州",children:[{id:"513301",value:"513301",label:"康定市"},{id:"513322",value:"513322",label:"泸定县"},{id:"513323",value:"513323",label:"丹巴县"},{id:"513324",value:"513324",label:"九龙县"},{id:"513325",value:"513325",label:"雅江县"},{id:"513326",value:"513326",label:"道孚县"},{id:"513327",value:"513327",label:"炉霍县"},{id:"513328",value:"513328",label:"甘孜县"},{id:"513329",value:"513329",label:"新龙县"},{id:"513330",value:"513330",label:"德格县"},{id:"513331",value:"513331",label:"白玉县"},{id:"513332",value:"513332",label:"石渠县"},{id:"513333",value:"513333",label:"色达县"},{id:"513334",value:"513334",label:"理塘县"},{id:"513335",value:"513335",label:"巴塘县"},{id:"513336",value:"513336",label:"乡城县"},{id:"513337",value:"513337",label:"稻城县"},{id:"513338",value:"513338",label:"得荣县"}]},{id:"513400",value:"513400",label:"凉山彝族自治州",children:[{id:"513401",value:"513401",label:"西昌市"},{id:"513422",value:"513422",label:"木里藏族自治县"},{id:"513423",value:"513423",label:"盐源县"},{id:"513424",value:"513424",label:"德昌县"},{id:"513425",value:"513425",label:"会理县"},{id:"513426",value:"513426",label:"会东县"},{id:"513427",value:"513427",label:"宁南县"},{id:"513428",value:"513428",label:"普格县"},{id:"513429",value:"513429",label:"布拖县"},{id:"513430",value:"513430",label:"金阳县"},{id:"513431",value:"513431",label:"昭觉县"},{id:"513432",value:"513432",label:"喜德县"},{id:"513433",value:"513433",label:"冕宁县"},{id:"513434",value:"513434",label:"越西县"},{id:"513435",value:"513435",label:"甘洛县"},{id:"513436",value:"513436",label:"美姑县"},{id:"513437",value:"513437",label:"雷波县"}]}]},{id:"370000",value:"370000",label:"山东省",key:"",children:[{id:"370100",value:"370100",label:"济南市",children:[{id:"370102",value:"370102",label:"历下区"},{id:"370103",value:"370103",label:"市中区"},{id:"370104",value:"370104",label:"槐荫区"},{id:"370105",value:"370105",label:"天桥区"},{id:"370112",value:"370112",label:"历城区"},{id:"370113",value:"370113",label:"长清区"},{id:"370114",value:"370114",label:"章丘区"},{id:"370124",value:"370124",label:"平阴县"},{id:"370125",value:"370125",label:"济阳县"},{id:"370126",value:"370126",label:"商河县"},{id:"370182",value:"370182",label:"高新区"}]},{id:"370200",value:"370200",label:"青岛市",children:[{id:"370202",value:"370202",label:"市南区"},{id:"370203",value:"370203",label:"市北区"},{id:"370211",value:"370211",label:"黄岛区"},{id:"370212",value:"370212",label:"崂山区"},{id:"370213",value:"370213",label:"李沧区"},{id:"370214",value:"370214",label:"城阳区"},{id:"370215",value:"370215",label:"即墨区"},{id:"370281",value:"370281",label:"胶州市"},{id:"370283",value:"370283",label:"平度市"},{id:"370285",value:"370285",label:"莱西市"},{id:"370286",value:"370286",label:"西海岸新区"},{id:"370287",value:"370287",label:"高新区"}]},{id:"370300",value:"370300",label:"淄博市",children:[{id:"370302",value:"370302",label:"淄川区"},{id:"370303",value:"370303",label:"张店区"},{id:"370304",value:"370304",label:"博山区"},{id:"370305",value:"370305",label:"临淄区"},{id:"370306",value:"370306",label:"周村区"},{id:"370321",value:"370321",label:"桓台县"},{id:"370322",value:"370322",label:"高青县"},{id:"370323",value:"370323",label:"沂源县"},{id:"370324",value:"370324",label:"高新区"}]},{id:"370400",value:"370400",label:"枣庄市",children:[{id:"370402",value:"370402",label:"市中区"},{id:"370403",value:"370403",label:"薛城区"},{id:"370404",value:"370404",label:"峄城区"},{id:"370405",value:"370405",label:"台儿庄区"},{id:"370406",value:"370406",label:"山亭区"},{id:"370481",value:"370481",label:"滕州市"},{id:"370482",value:"370482",label:"高新区"}]},{id:"370500",value:"370500",label:"东营市",children:[{id:"370502",value:"370502",label:"东营区"},{id:"370503",value:"370503",label:"河口区"},{id:"370505",value:"370505",label:"垦利区"},{id:"370522",value:"370522",label:"利津县"},{id:"370523",value:"370523",label:"广饶县"}]},{id:"370600",value:"370600",label:"烟台市",children:[{id:"370602",value:"370602",label:"芝罘区"},{id:"370611",value:"370611",label:"福山区"},{id:"370612",value:"370612",label:"牟平区"},{id:"370613",value:"370613",label:"莱山区"},{id:"370634",value:"370634",label:"长岛县"},{id:"370681",value:"370681",label:"龙口市"},{id:"370682",value:"370682",label:"莱阳市"},{id:"370683",value:"370683",label:"莱州市"},{id:"370684",value:"370684",label:"蓬莱市"},{id:"370685",value:"370685",label:"招远市"},{id:"370686",value:"370686",label:"栖霞市"},{id:"370687",value:"370687",label:"海阳市"},{id:"370688",value:"370688",label:"高新区"},{id:"370689",value:"370689",label:"经济开发区"}]},{id:"370700",value:"370700",label:"潍坊市",children:[{id:"370702",value:"370702",label:"潍城区"},{id:"370703",value:"370703",label:"寒亭区"},{id:"370704",value:"370704",label:"坊子区"},{id:"370705",value:"370705",label:"奎文区"},{id:"370724",value:"370724",label:"临朐县"},{id:"370725",value:"370725",label:"昌乐县"},{id:"370781",value:"370781",label:"青州市"},{id:"370782",value:"370782",label:"诸城市"},{id:"370783",value:"370783",label:"寿光市"},{id:"370784",value:"370784",label:"安丘市"},{id:"370785",value:"370785",label:"高密市"},{id:"370786",value:"370786",label:"昌邑市"},{id:"370787",value:"370787",label:"高新区"}]},{id:"370800",value:"370800",label:"济宁市",children:[{id:"370811",value:"370811",label:"任城区"},{id:"370812",value:"370812",label:"兖州区"},{id:"370826",value:"370826",label:"微山县"},{id:"370827",value:"370827",label:"鱼台县"},{id:"370828",value:"370828",label:"金乡县"},{id:"370829",value:"370829",label:"嘉祥县"},{id:"370830",value:"370830",label:"汶上县"},{id:"370831",value:"370831",label:"泗水县"},{id:"370832",value:"370832",label:"梁山县"},{id:"370881",value:"370881",label:"曲阜市"},{id:"370883",value:"370883",label:"邹城市"},{id:"370884",value:"370884",label:"高新区"}]},{id:"370900",value:"370900",label:"泰安市",children:[{id:"370902",value:"370902",label:"泰山区"},{id:"370911",value:"370911",label:"岱岳区"},{id:"370921",value:"370921",label:"宁阳县"},{id:"370923",value:"370923",label:"东平县"},{id:"370982",value:"370982",label:"新泰市"},{id:"370983",value:"370983",label:"肥城市"}]},{id:"371000",value:"371000",label:"威海市",children:[{id:"371002",value:"371002",label:"环翠区"},{id:"371003",value:"371003",label:"文登区"},{id:"371082",value:"371082",label:"荣成市"},{id:"371083",value:"371083",label:"乳山市"},{id:"371084",value:"371084",label:"火炬高新区"},{id:"371085",value:"371085",label:"经济技术开发区"},{id:"371086",value:"371086",label:"临港经济技术开发区"}]},{id:"371100",value:"371100",label:"日照市",children:[{id:"371102",value:"371102",label:"东港区"},{id:"371103",value:"371103",label:"岚山区"},{id:"371121",value:"371121",label:"五莲县"},{id:"371122",value:"371122",label:"莒县"}]},{id:"371200",value:"371200",label:"莱芜市",children:[{id:"371202",value:"371202",label:"莱城区"},{id:"371203",value:"371203",label:"钢城区"}]},{id:"371300",value:"371300",label:"临沂市",children:[{id:"371302",value:"371302",label:"兰山区"},{id:"371311",value:"371311",label:"罗庄区"},{id:"371312",value:"371312",label:"河东区"},{id:"371321",value:"371321",label:"沂南县"},{id:"371322",value:"371322",label:"郯城县"},{id:"371323",value:"371323",label:"沂水县"},{id:"371324",value:"371324",label:"兰陵县"},{id:"371325",value:"371325",label:"费县"},{id:"371326",value:"371326",label:"平邑县"},{id:"371327",value:"371327",label:"莒南县"},{id:"371328",value:"371328",label:"蒙阴县"},{id:"371329",value:"371329",label:"临沭县"}]},{id:"371400",value:"371400",label:"德州市",children:[{id:"371402",value:"371402",label:"德城区"},{id:"371403",value:"371403",label:"陵城区"},{id:"371422",value:"371422",label:"宁津县"},{id:"371423",value:"371423",label:"庆云县"},{id:"371424",value:"371424",label:"临邑县"},{id:"371425",value:"371425",label:"齐河县"},{id:"371426",value:"371426",label:"平原县"},{id:"371427",value:"371427",label:"夏津县"},{id:"371428",value:"371428",label:"武城县"},{id:"371481",value:"371481",label:"乐陵市"},{id:"371482",value:"371482",label:"禹城市"}]},{id:"371500",value:"371500",label:"聊城市",children:[{id:"371502",value:"371502",label:"东昌府区"},{id:"371521",value:"371521",label:"阳谷县"},{id:"371522",value:"371522",label:"莘县"},{id:"371523",value:"371523",label:"茌平县"},{id:"371524",value:"371524",label:"东阿县"},{id:"371525",value:"371525",label:"冠县"},{id:"371526",value:"371526",label:"高唐县"},{id:"371581",value:"371581",label:"临清市"}]},{id:"371600",value:"371600",label:"滨州市",children:[{id:"371602",value:"371602",label:"滨城区"},{id:"371603",value:"371603",label:"沾化区"},{id:"371621",value:"371621",label:"惠民县"},{id:"371622",value:"371622",label:"阳信县"},{id:"371623",value:"371623",label:"无棣县"},{id:"371625",value:"371625",label:"博兴县"},{id:"371626",value:"371626",label:"邹平县"},{id:"371627",value:"371627",label:"北海新区"}]},{id:"371700",value:"371700",label:"菏泽市",children:[{id:"371702",value:"371702",label:"牡丹区"},{id:"371703",value:"371703",label:"定陶区"},{id:"371721",value:"371721",label:"曹县"},{id:"371722",value:"371722",label:"单县"},{id:"371723",value:"371723",label:"成武县"},{id:"371724",value:"371724",label:"巨野县"},{id:"371725",value:"371725",label:"郓城县"},{id:"371726",value:"371726",label:"鄄城县"},{id:"371728",value:"371728",label:"东明县"},{id:"371772",value:"371772",label:"高新开发区"}]}]},{id:"710000",value:"710000",label:"台湾",key:"T",children:[{id:"710100",value:"710100",label:"台北市",children:[{id:"710101",value:"710101",label:"松山区"},{id:"710102",value:"710102",label:"信义区"},{id:"710103",value:"710103",label:"大安区"},{id:"710104",value:"710104",label:"中山区"},{id:"710105",value:"710105",label:"中正区"},{id:"710106",value:"710106",label:"大同区"},{id:"710107",value:"710107",label:"万华区"},{id:"710108",value:"710108",label:"文山区"},{id:"710109",value:"710109",label:"南港区"},{id:"710110",value:"710110",label:"内湖区"},{id:"710111",value:"710111",label:"士林区"},{id:"710112",value:"710112",label:"北投区"}]},{id:"710200",value:"710200",label:"高雄市",children:[{id:"710201",value:"710201",label:"盐埕区"},{id:"710202",value:"710202",label:"鼓山区"},{id:"710203",value:"710203",label:"左营区"},{id:"710204",value:"710204",label:"楠梓区"},{id:"710205",value:"710205",label:"三民区"},{id:"710206",value:"710206",label:"新兴区"},{id:"710207",value:"710207",label:"前金区"},{id:"710208",value:"710208",label:"苓雅区"},{id:"710209",value:"710209",label:"前镇区"},{id:"710210",value:"710210",label:"旗津区"},{id:"710211",value:"710211",label:"小港区"},{id:"710212",value:"710212",label:"凤山区"},{id:"710213",value:"710213",label:"林园区"},{id:"710214",value:"710214",label:"大寮区"},{id:"710215",value:"710215",label:"大树区"},{id:"710216",value:"710216",label:"大社区"},{id:"710217",value:"710217",label:"仁武区"},{id:"710218",value:"710218",label:"鸟松区"},{id:"710219",value:"710219",label:"冈山区"},{id:"710220",value:"710220",label:"桥头区"},{id:"710221",value:"710221",label:"燕巢区"},{id:"710222",value:"710222",label:"田寮区"},{id:"710223",value:"710223",label:"阿莲区"},{id:"710224",value:"710224",label:"路竹区"},{id:"710225",value:"710225",label:"湖内区"},{id:"710226",value:"710226",label:"茄萣区"},{id:"710227",value:"710227",label:"永安区"},{id:"710228",value:"710228",label:"弥陀区"},{id:"710229",value:"710229",label:"梓官区"},{id:"710230",value:"710230",label:"旗山区"},{id:"710231",value:"710231",label:"美浓区"},{id:"710232",value:"710232",label:"六龟区"},{id:"710233",value:"710233",label:"甲仙区"},{id:"710234",value:"710234",label:"杉林区"},{id:"710235",value:"710235",label:"内门区"},{id:"710236",value:"710236",label:"茂林区"},{id:"710237",value:"710237",label:"桃源区"},{id:"710238",value:"710238",label:"那玛夏区"}]},{id:"710300",value:"710300",label:"基隆市",children:[{id:"710301",value:"710301",label:"中正区"},{id:"710302",value:"710302",label:"七堵区"},{id:"710303",value:"710303",label:"暖暖区"},{id:"710304",value:"710304",label:"仁爱区"},{id:"710305",value:"710305",label:"中山区"},{id:"710306",value:"710306",label:"安乐区"},{id:"710307",value:"710307",label:"信义区"}]},{id:"710400",value:"710400",label:"台中市",children:[{id:"710401",value:"710401",label:"中区"},{id:"710402",value:"710402",label:"东区"},{id:"710403",value:"710403",label:"南区"},{id:"710404",value:"710404",label:"西区"},{id:"710405",value:"710405",label:"北区"},{id:"710406",value:"710406",label:"西屯区"},{id:"710407",value:"710407",label:"南屯区"},{id:"710408",value:"710408",label:"北屯区"},{id:"710409",value:"710409",label:"丰原区"},{id:"710410",value:"710410",label:"东势区"},{id:"710411",value:"710411",label:"大甲区"},{id:"710412",value:"710412",label:"清水区"},{id:"710413",value:"710413",label:"沙鹿区"},{id:"710414",value:"710414",label:"梧栖区"},{id:"710415",value:"710415",label:"后里区"},{id:"710416",value:"710416",label:"神冈区"},{id:"710417",value:"710417",label:"潭子区"},{id:"710418",value:"710418",label:"大雅区"},{id:"710419",value:"710419",label:"新社区"},{id:"710420",value:"710420",label:"石冈区"},{id:"710421",value:"710421",label:"外埔区"},{id:"710422",value:"710422",label:"大安区"},{id:"710423",value:"710423",label:"乌日区"},{id:"710424",value:"710424",label:"大肚区"},{id:"710425",value:"710425",label:"龙井区"},{id:"710426",value:"710426",label:"雾峰区"},{id:"710427",value:"710427",label:"太平区"},{id:"710428",value:"710428",label:"大里区"},{id:"710429",value:"710429",label:"和平区"}]},{id:"710500",value:"710500",label:"台南市",children:[{id:"710501",value:"710501",label:"东区"},{id:"710502",value:"710502",label:"南区"},{id:"710504",value:"710504",label:"北区"},{id:"710506",value:"710506",label:"安南区"},{id:"710507",value:"710507",label:"安平区"},{id:"710508",value:"710508",label:"中西区"},{id:"710509",value:"710509",label:"新营区"},{id:"710510",value:"710510",label:"盐水区"},{id:"710511",value:"710511",label:"白河区"},{id:"710512",value:"710512",label:"柳营区"},{id:"710513",value:"710513",label:"后壁区"},{id:"710514",value:"710514",label:"东山区"},{id:"710515",value:"710515",label:"麻豆区"},{id:"710516",value:"710516",label:"下营区"},{id:"710517",value:"710517",label:"六甲区"},{id:"710518",value:"710518",label:"官田区"},{id:"710519",value:"710519",label:"大内区"},{id:"710520",value:"710520",label:"佳里区"},{id:"710521",value:"710521",label:"学甲区"},{id:"710522",value:"710522",label:"西港区"},{id:"710523",value:"710523",label:"七股区"},{id:"710524",value:"710524",label:"将军区"},{id:"710525",value:"710525",label:"北门区"},{id:"710526",value:"710526",label:"新化区"},{id:"710527",value:"710527",label:"善化区"},{id:"710528",value:"710528",label:"新市区"},{id:"710529",value:"710529",label:"安定区"},{id:"710530",value:"710530",label:"山上区"},{id:"710531",value:"710531",label:"玉井区"},{id:"710532",value:"710532",label:"楠西区"},{id:"710533",value:"710533",label:"南化区"},{id:"710534",value:"710534",label:"左镇区"},{id:"710535",value:"710535",label:"仁德区"},{id:"710536",value:"710536",label:"归仁区"},{id:"710537",value:"710537",label:"关庙区"},{id:"710538",value:"710538",label:"龙崎区"},{id:"710539",value:"710539",label:"永康区"}]},{id:"710600",value:"710600",label:"新竹市",children:[{id:"710601",value:"710601",label:"东区"},{id:"710602",value:"710602",label:"北区"},{id:"710603",value:"710603",label:"香山区"}]},{id:"710700",value:"710700",label:"嘉义市",children:[{id:"710701",value:"710701",label:"东区"},{id:"710702",value:"710702",label:"西区"}]},{id:"710800",value:"710800",label:"新北市",children:[{id:"710801",value:"710801",label:"板桥区"},{id:"710802",value:"710802",label:"三重区"},{id:"710803",value:"710803",label:"中和区"},{id:"710804",value:"710804",label:"永和区"},{id:"710805",value:"710805",label:"新庄区"},{id:"710806",value:"710806",label:"新店区"},{id:"710807",value:"710807",label:"树林区"},{id:"710808",value:"710808",label:"莺歌区"},{id:"710809",value:"710809",label:"三峡区"},{id:"710810",value:"710810",label:"淡水区"},{id:"710811",value:"710811",label:"汐止区"},{id:"710812",value:"710812",label:"瑞芳区"},{id:"710813",value:"710813",label:"土城区"},{id:"710814",value:"710814",label:"芦洲区"},{id:"710815",value:"710815",label:"五股区"},{id:"710816",value:"710816",label:"泰山区"},{id:"710817",value:"710817",label:"林口区"},{id:"710818",value:"710818",label:"深坑区"},{id:"710819",value:"710819",label:"石碇区"},{id:"710820",value:"710820",label:"坪林区"},{id:"710821",value:"710821",label:"三芝区"},{id:"710822",value:"710822",label:"石门区"},{id:"710823",value:"710823",label:"八里区"},{id:"710824",value:"710824",label:"平溪区"},{id:"710825",value:"710825",label:"双溪区"},{id:"710826",value:"710826",label:"贡寮区"},{id:"710827",value:"710827",label:"金山区"},{id:"710828",value:"710828",label:"万里区"},{id:"710829",value:"710829",label:"乌来区"}]},{id:"712200",value:"712200",label:"宜兰县",children:[{id:"712201",value:"712201",label:"宜兰市"},{id:"712221",value:"712221",label:"罗东镇"},{id:"712222",value:"712222",label:"苏澳镇"},{id:"712223",value:"712223",label:"头城镇"},{id:"712224",value:"712224",label:"礁溪乡"},{id:"712225",value:"712225",label:"壮围乡"},{id:"712226",value:"712226",label:"员山乡"},{id:"712227",value:"712227",label:"冬山乡"},{id:"712228",value:"712228",label:"五结乡"},{id:"712229",value:"712229",label:"三星乡"},{id:"712230",value:"712230",label:"大同乡"},{id:"712231",value:"712231",label:"南澳乡"}]},{id:"712300",value:"712300",label:"桃园市",children:[{id:"712301",value:"712301",label:"桃园市"},{id:"712302",value:"712302",label:"中坜市"},{id:"712303",value:"712303",label:"平镇市"},{id:"712304",value:"712304",label:"八德市"},{id:"712305",value:"712305",label:"杨梅市"},{id:"712306",value:"712306",label:"芦竹市"},{id:"712321",value:"712321",label:"大溪镇"},{id:"712324",value:"712324",label:"大园乡"},{id:"712325",value:"712325",label:"龟山乡"},{id:"712327",value:"712327",label:"龙潭乡"},{id:"712329",value:"712329",label:"新屋乡"},{id:"712330",value:"712330",label:"观音乡"},{id:"712331",value:"712331",label:"复兴乡"}]},{id:"712400",value:"712400",label:"新竹县",children:[{id:"712401",value:"712401",label:"竹北市"},{id:"712421",value:"712421",label:"竹东镇"},{id:"712422",value:"712422",label:"新埔镇"},{id:"712423",value:"712423",label:"关西镇"},{id:"712424",value:"712424",label:"湖口乡"},{id:"712425",value:"712425",label:"新丰乡"},{id:"712426",value:"712426",label:"芎林乡"},{id:"712427",value:"712427",label:"横山乡"},{id:"712428",value:"712428",label:"北埔乡"},{id:"712429",value:"712429",label:"宝山乡"},{id:"712430",value:"712430",label:"峨眉乡"},{id:"712431",value:"712431",label:"尖石乡"},{id:"712432",value:"712432",label:"五峰乡"}]},{id:"712500",value:"712500",label:"苗栗县",children:[{id:"712501",value:"712501",label:"苗栗市"},{id:"712521",value:"712521",label:"苑里镇"},{id:"712522",value:"712522",label:"通霄镇"},{id:"712523",value:"712523",label:"竹南镇"},{id:"712524",value:"712524",label:"头份市"},{id:"712525",value:"712525",label:"后龙镇"},{id:"712526",value:"712526",label:"卓兰镇"},{id:"712527",value:"712527",label:"大湖乡"},{id:"712528",value:"712528",label:"公馆乡"},{id:"712529",value:"712529",label:"铜锣乡"},{id:"712530",value:"712530",label:"南庄乡"},{id:"712531",value:"712531",label:"头屋乡"},{id:"712532",value:"712532",label:"三义乡"},{id:"712533",value:"712533",label:"西湖乡"},{id:"712534",value:"712534",label:"造桥乡"},{id:"712535",value:"712535",label:"三湾乡"},{id:"712536",value:"712536",label:"狮潭乡"},{id:"712537",value:"712537",label:"泰安乡"}]},{id:"712700",value:"712700",label:"彰化县",children:[{id:"712701",value:"712701",label:"彰化市"},{id:"712721",value:"712721",label:"鹿港镇"},{id:"712722",value:"712722",label:"和美镇"},{id:"712723",value:"712723",label:"线西乡"},{id:"712724",value:"712724",label:"伸港乡"},{id:"712725",value:"712725",label:"福兴乡"},{id:"712726",value:"712726",label:"秀水乡"},{id:"712727",value:"712727",label:"花坛乡"},{id:"712728",value:"712728",label:"芬园乡"},{id:"712729",value:"712729",label:"员林市"},{id:"712730",value:"712730",label:"溪湖镇"},{id:"712731",value:"712731",label:"田中镇"},{id:"712732",value:"712732",label:"大村乡"},{id:"712733",value:"712733",label:"埔盐乡"},{id:"712734",value:"712734",label:"埔心乡"},{id:"712735",value:"712735",label:"永靖乡"},{id:"712736",value:"712736",label:"社头乡"},{id:"712737",value:"712737",label:"二水乡"},{id:"712738",value:"712738",label:"北斗镇"},{id:"712739",value:"712739",label:"二林镇"},{id:"712740",value:"712740",label:"田尾乡"},{id:"712741",value:"712741",label:"埤头乡"},{id:"712742",value:"712742",label:"芳苑乡"},{id:"712743",value:"712743",label:"大城乡"},{id:"712744",value:"712744",label:"竹塘乡"},{id:"712745",value:"712745",label:"溪州乡"}]},{id:"712800",value:"712800",label:"南投县",children:[{id:"712801",value:"712801",label:"南投市"},{id:"712821",value:"712821",label:"埔里镇"},{id:"712822",value:"712822",label:"草屯镇"},{id:"712823",value:"712823",label:"竹山镇"},{id:"712824",value:"712824",label:"集集镇"},{id:"712825",value:"712825",label:"名间乡"},{id:"712826",value:"712826",label:"鹿谷乡"},{id:"712827",value:"712827",label:"中寮乡"},{id:"712828",value:"712828",label:"鱼池乡"},{id:"712829",value:"712829",label:"国姓乡"},{id:"712830",value:"712830",label:"水里乡"},{id:"712831",value:"712831",label:"信义乡"},{id:"712832",value:"712832",label:"仁爱乡"}]},{id:"712900",value:"712900",label:"云林县",children:[{id:"712901",value:"712901",label:"斗六市"},{id:"712921",value:"712921",label:"斗南镇"},{id:"712922",value:"712922",label:"虎尾镇"},{id:"712923",value:"712923",label:"西螺镇"},{id:"712924",value:"712924",label:"土库镇"},{id:"712925",value:"712925",label:"北港镇"},{id:"712926",value:"712926",label:"古坑乡"},{id:"712927",value:"712927",label:"大埤乡"},{id:"712928",value:"712928",label:"莿桐乡"},{id:"712929",value:"712929",label:"林内乡"},{id:"712930",value:"712930",label:"二仑乡"},{id:"712931",value:"712931",label:"仑背乡"},{id:"712932",value:"712932",label:"麦寮乡"},{id:"712933",value:"712933",label:"东势乡"},{id:"712934",value:"712934",label:"褒忠乡"},{id:"712935",value:"712935",label:"台西乡"},{id:"712936",value:"712936",label:"元长乡"},{id:"712937",value:"712937",label:"四湖乡"},{id:"712938",value:"712938",label:"口湖乡"},{id:"712939",value:"712939",label:"水林乡"}]},{id:"713000",value:"713000",label:"嘉义县",children:[{id:"713001",value:"713001",label:"太保市"},{id:"713002",value:"713002",label:"朴子市"},{id:"713023",value:"713023",label:"布袋镇"},{id:"713024",value:"713024",label:"大林镇"},{id:"713025",value:"713025",label:"民雄乡"},{id:"713026",value:"713026",label:"溪口乡"},{id:"713027",value:"713027",label:"新港乡"},{id:"713028",value:"713028",label:"六脚乡"},{id:"713029",value:"713029",label:"东石乡"},{id:"713030",value:"713030",label:"义竹乡"},{id:"713031",value:"713031",label:"鹿草乡"},{id:"713032",value:"713032",label:"水上乡"},{id:"713033",value:"713033",label:"中埔乡"},{id:"713034",value:"713034",label:"竹崎乡"},{id:"713035",value:"713035",label:"梅山乡"},{id:"713036",value:"713036",label:"番路乡"},{id:"713037",value:"713037",label:"大埔乡"},{id:"713038",value:"713038",label:"阿里山乡"}]},{id:"713300",value:"713300",label:"屏东县",children:[{id:"713301",value:"713301",label:"屏东市"},{id:"713321",value:"713321",label:"潮州镇"},{id:"713322",value:"713322",label:"东港镇"},{id:"713323",value:"713323",label:"恒春镇"},{id:"713324",value:"713324",label:"万丹乡"},{id:"713325",value:"713325",label:"长治乡"},{id:"713326",value:"713326",label:"麟洛乡"},{id:"713327",value:"713327",label:"九如乡"},{id:"713328",value:"713328",label:"里港乡"},{id:"713329",value:"713329",label:"盐埔乡"},{id:"713330",value:"713330",label:"高树乡"},{id:"713331",value:"713331",label:"万峦乡"},{id:"713332",value:"713332",label:"内埔乡"},{id:"713333",value:"713333",label:"竹田乡"},{id:"713334",value:"713334",label:"新埤乡"},{id:"713335",value:"713335",label:"枋寮乡"},{id:"713336",value:"713336",label:"新园乡"},{id:"713337",value:"713337",label:"崁顶乡"},{id:"713338",value:"713338",label:"林边乡"},{id:"713339",value:"713339",label:"南州乡"},{id:"713340",value:"713340",label:"佳冬乡"},{id:"713341",value:"713341",label:"琉球乡"},{id:"713342",value:"713342",label:"车城乡"},{id:"713343",value:"713343",label:"满州乡"},{id:"713344",value:"713344",label:"枋山乡"},{id:"713345",value:"713345",label:"三地门乡"},{id:"713346",value:"713346",label:"雾台乡"},{id:"713347",value:"713347",label:"玛家乡"},{id:"713348",value:"713348",label:"泰武乡"},{id:"713349",value:"713349",label:"来义乡"},{id:"713350",value:"713350",label:"春日乡"},{id:"713351",value:"713351",label:"狮子乡"},{id:"713352",value:"713352",label:"牡丹乡"}]},{id:"713400",value:"713400",label:"台东县",children:[{id:"713401",value:"713401",label:"台东市"},{id:"713421",value:"713421",label:"成功镇"},{id:"713422",value:"713422",label:"关山镇"},{id:"713423",value:"713423",label:"卑南乡"},{id:"713424",value:"713424",label:"鹿野乡"},{id:"713425",value:"713425",label:"池上乡"},{id:"713426",value:"713426",label:"东河乡"},{id:"713427",value:"713427",label:"长滨乡"},{id:"713428",value:"713428",label:"太麻里乡"},{id:"713429",value:"713429",label:"大武乡"},{id:"713430",value:"713430",label:"绿岛乡"},{id:"713431",value:"713431",label:"海端乡"},{id:"713432",value:"713432",label:"延平乡"},{id:"713433",value:"713433",label:"金峰乡"},{id:"713434",value:"713434",label:"达仁乡"},{id:"713435",value:"713435",label:"兰屿乡"}]},{id:"713500",value:"713500",label:"花莲县",children:[{id:"713501",value:"713501",label:"花莲市"},{id:"713521",value:"713521",label:"凤林镇"},{id:"713522",value:"713522",label:"玉里镇"},{id:"713523",value:"713523",label:"新城乡"},{id:"713524",value:"713524",label:"吉安乡"},{id:"713525",value:"713525",label:"寿丰乡"},{id:"713526",value:"713526",label:"光复乡"},{id:"713527",value:"713527",label:"丰滨乡"},{id:"713528",value:"713528",label:"瑞穗乡"},{id:"713529",value:"713529",label:"富里乡"},{id:"713530",value:"713530",label:"秀林乡"},{id:"713531",value:"713531",label:"万荣乡"},{id:"713532",value:"713532",label:"卓溪乡"}]},{id:"713600",value:"713600",label:"澎湖县",children:[{id:"713601",value:"713601",label:"马公市"},{id:"713621",value:"713621",label:"湖西乡"},{id:"713622",value:"713622",label:"白沙乡"},{id:"713623",value:"713623",label:"西屿乡"},{id:"713624",value:"713624",label:"望安乡"},{id:"713625",value:"713625",label:"七美乡"}]},{id:"713700",value:"713700",label:"金门县",children:[{id:"713701",value:"713701",label:"金城镇"},{id:"713702",value:"713702",label:"金湖镇"},{id:"713703",value:"713703",label:"金沙镇"},{id:"713704",value:"713704",label:"金宁乡"},{id:"713705",value:"713705",label:"烈屿乡"},{id:"713706",value:"713706",label:"乌丘乡"}]},{id:"713800",value:"713800",label:"连江县",children:[{id:"713801",value:"713801",label:"南竿乡"},{id:"713802",value:"713802",label:"北竿乡"},{id:"713803",value:"713803",label:"莒光乡"},{id:"713804",value:"713804",label:"东引乡"}]}]},{id:"120000",value:"120000",label:"天津",key:"",children:[{id:"120100",value:"120100",label:"天津市",children:[{id:"120101",value:"120101",label:"和平区"},{id:"120102",value:"120102",label:"河东区"},{id:"120103",value:"120103",label:"河西区"},{id:"120104",value:"120104",label:"南开区"},{id:"120105",value:"120105",label:"河北区"},{id:"120106",value:"120106",label:"红桥区"},{id:"120110",value:"120110",label:"东丽区"},{id:"120111",value:"120111",label:"西青区"},{id:"120112",value:"120112",label:"津南区"},{id:"120113",value:"120113",label:"北辰区"},{id:"120114",value:"120114",label:"武清区"},{id:"120115",value:"120115",label:"宝坻区"},{id:"120116",value:"120116",label:"滨海新区"},{id:"120117",value:"120117",label:"宁河区"},{id:"120118",value:"120118",label:"静海区"},{id:"120119",value:"120119",label:"蓟州区"},{id:"120120",value:"120120",label:"滨海高新区"}]}]},{id:"540000",value:"540000",label:"西藏",key:"X",children:[{id:"540100",value:"540100",label:"拉萨市",children:[{id:"540102",value:"540102",label:"城关区"},{id:"540103",value:"540103",label:"堆龙德庆区"},{id:"540104",value:"540104",label:"达孜区"},{id:"540121",value:"540121",label:"林周县"},{id:"540122",value:"540122",label:"当雄县"},{id:"540123",value:"540123",label:"尼木县"},{id:"540124",value:"540124",label:"曲水县"},{id:"540127",value:"540127",label:"墨竹工卡县"},{id:"540171",value:"540171",label:"格尔木藏青工业园区"},{id:"540173",value:"540173",label:"西藏文化旅游创意园区"},{id:"540174",value:"540174",label:"达孜工业园区"}]},{id:"540200",value:"540200",label:"日喀则市",children:[{id:"540202",value:"540202",label:"桑珠孜区"},{id:"540221",value:"540221",label:"南木林县"},{id:"540222",value:"540222",label:"江孜县"},{id:"540223",value:"540223",label:"定日县"},{id:"540224",value:"540224",label:"萨迦县"},{id:"540225",value:"540225",label:"拉孜县"},{id:"540226",value:"540226",label:"昂仁县"},{id:"540227",value:"540227",label:"谢通门县"},{id:"540228",value:"540228",label:"白朗县"},{id:"540229",value:"540229",label:"仁布县"},{id:"540230",value:"540230",label:"康马县"},{id:"540231",value:"540231",label:"定结县"},{id:"540232",value:"540232",label:"仲巴县"},{id:"540233",value:"540233",label:"亚东县"},{id:"540234",value:"540234",label:"吉隆县"},{id:"540235",value:"540235",label:"聂拉木县"},{id:"540236",value:"540236",label:"萨嘎县"},{id:"540237",value:"540237",label:"岗巴县"}]},{id:"540300",value:"540300",label:"昌都市",children:[{id:"540302",value:"540302",label:"卡若区"},{id:"540321",value:"540321",label:"江达县"},{id:"540322",value:"540322",label:"贡觉县"},{id:"540323",value:"540323",label:"类乌齐县"},{id:"540324",value:"540324",label:"丁青县"},{id:"540325",value:"540325",label:"察雅县"},{id:"540326",value:"540326",label:"八宿县"},{id:"540327",value:"540327",label:"左贡县"},{id:"540328",value:"540328",label:"芒康县"},{id:"540329",value:"540329",label:"洛隆县"},{id:"540330",value:"540330",label:"边坝县"}]},{id:"540400",value:"540400",label:"林芝市",children:[{id:"540402",value:"540402",label:"巴宜区"},{id:"540421",value:"540421",label:"工布江达县"},{id:"540422",value:"540422",label:"米林县"},{id:"540423",value:"540423",label:"墨脱县"},{id:"540424",value:"540424",label:"波密县"},{id:"540425",value:"540425",label:"察隅县"},{id:"540426",value:"540426",label:"朗县"}]},{id:"540500",value:"540500",label:"山南市",children:[{id:"540502",value:"540502",label:"乃东区"},{id:"540521",value:"540521",label:"扎囊县"},{id:"540522",value:"540522",label:"贡嘎县"},{id:"540523",value:"540523",label:"桑日县"},{id:"540524",value:"540524",label:"琼结县"},{id:"540525",value:"540525",label:"曲松县"},{id:"540526",value:"540526",label:"措美县"},{id:"540527",value:"540527",label:"洛扎县"},{id:"540528",value:"540528",label:"加查县"},{id:"540529",value:"540529",label:"隆子县"},{id:"540530",value:"540530",label:"错那县"},{id:"540531",value:"540531",label:"浪卡子县"}]},{id:"540600",value:"540600",label:"那曲市",children:[{id:"540602",value:"540602",label:"色尼区"},{id:"540621",value:"540621",label:"嘉黎县"},{id:"540622",value:"540622",label:"比如县"},{id:"540623",value:"540623",label:"聂荣县"},{id:"540624",value:"540624",label:"安多县"},{id:"540625",value:"540625",label:"申扎县"},{id:"540626",value:"540626",label:"索县"},{id:"540627",value:"540627",label:"班戈县"},{id:"540628",value:"540628",label:"巴青县"},{id:"540629",value:"540629",label:"尼玛县"},{id:"540630",value:"540630",label:"双湖县"}]},{id:"542500",value:"542500",label:"阿里地区",children:[{id:"542521",value:"542521",label:"普兰县"},{id:"542522",value:"542522",label:"札达县"},{id:"542523",value:"542523",label:"噶尔县"},{id:"542524",value:"542524",label:"日土县"},{id:"542525",value:"542525",label:"革吉县"},{id:"542526",value:"542526",label:"改则县"},{id:"542527",value:"542527",label:"措勤县"}]}]},{id:"650000",value:"650000",label:"新疆",key:"",children:[{id:"650100",value:"650100",label:"乌鲁木齐市",children:[{id:"650102",value:"650102",label:"天山区"},{id:"650103",value:"650103",label:"沙依巴克区"},{id:"650104",value:"650104",label:"新市区"},{id:"650105",value:"650105",label:"水磨沟区"},{id:"650106",value:"650106",label:"头屯河区"},{id:"650107",value:"650107",label:"达坂城区"},{id:"650109",value:"650109",label:"米东区"},{id:"650121",value:"650121",label:"乌鲁木齐县"},{id:"650171",value:"650171",label:"经济技术开发区"},{id:"650172",value:"650172",label:"高新区"}]},{id:"650200",value:"650200",label:"克拉玛依市",children:[{id:"650202",value:"650202",label:"独山子区"},{id:"650203",value:"650203",label:"克拉玛依区"},{id:"650204",value:"650204",label:"白碱滩区"},{id:"650205",value:"650205",label:"乌尔禾区"}]},{id:"650400",value:"650400",label:"吐鲁番市",children:[{id:"650402",value:"650402",label:"高昌区"},{id:"650421",value:"650421",label:"鄯善县"},{id:"650422",value:"650422",label:"托克逊县"}]},{id:"650500",value:"650500",label:"哈密市",children:[{id:"650502",value:"650502",label:"伊州区"},{id:"650521",value:"650521",label:"巴里坤哈萨克自治县"},{id:"650522",value:"650522",label:"伊吾县"}]},{id:"652300",value:"652300",label:"昌吉回族自治州",children:[{id:"652301",value:"652301",label:"昌吉市"},{id:"652302",value:"652302",label:"阜康市"},{id:"652323",value:"652323",label:"呼图壁县"},{id:"652324",value:"652324",label:"玛纳斯县"},{id:"652325",value:"652325",label:"奇台县"},{id:"652327",value:"652327",label:"吉木萨尔县"},{id:"652328",value:"652328",label:"木垒哈萨克自治县"}]},{id:"652700",value:"652700",label:"博尔塔拉蒙古自治州",children:[{id:"652701",value:"652701",label:"博乐市"},{id:"652702",value:"652702",label:"阿拉山口市"},{id:"652722",value:"652722",label:"精河县"},{id:"652723",value:"652723",label:"温泉县"}]},{id:"652800",value:"652800",label:"巴音郭楞蒙古自治州",children:[{id:"652801",value:"652801",label:"库尔勒市"},{id:"652822",value:"652822",label:"轮台县"},{id:"652823",value:"652823",label:"尉犁县"},{id:"652824",value:"652824",label:"若羌县"},{id:"652825",value:"652825",label:"且末县"},{id:"652826",value:"652826",label:"焉耆回族自治县"},{id:"652827",value:"652827",label:"和静县"},{id:"652828",value:"652828",label:"和硕县"},{id:"652829",value:"652829",label:"博湖县"},{id:"652871",value:"652871",label:"库尔勒开发区"}]},{id:"652900",value:"652900",label:"阿克苏地区",children:[{id:"652901",value:"652901",label:"阿克苏市"},{id:"652922",value:"652922",label:"温宿县"},{id:"652923",value:"652923",label:"库车县"},{id:"652924",value:"652924",label:"沙雅县"},{id:"652925",value:"652925",label:"新和县"},{id:"652926",value:"652926",label:"拜城县"},{id:"652927",value:"652927",label:"乌什县"},{id:"652928",value:"652928",label:"阿瓦提县"},{id:"652929",value:"652929",label:"柯坪县"}]},{id:"653000",value:"653000",label:"克孜勒苏柯尔克孜自治州",children:[{id:"653001",value:"653001",label:"阿图什市"},{id:"653022",value:"653022",label:"阿克陶县"},{id:"653023",value:"653023",label:"阿合奇县"},{id:"653024",value:"653024",label:"乌恰县"}]},{id:"653100",value:"653100",label:"喀什地区",children:[{id:"653101",value:"653101",label:"喀什市"},{id:"653121",value:"653121",label:"疏附县"},{id:"653122",value:"653122",label:"疏勒县"},{id:"653123",value:"653123",label:"英吉沙县"},{id:"653124",value:"653124",label:"泽普县"},{id:"653125",value:"653125",label:"莎车县"},{id:"653126",value:"653126",label:"叶城县"},{id:"653127",value:"653127",label:"麦盖提县"},{id:"653128",value:"653128",label:"岳普湖县"},{id:"653129",value:"653129",label:"伽师县"},{id:"653130",value:"653130",label:"巴楚县"},{id:"653131",value:"653131",label:"塔什库尔干塔吉克自治县"}]},{id:"653200",value:"653200",label:"和田地区",children:[{id:"653201",value:"653201",label:"和田市"},{id:"653221",value:"653221",label:"和田县"},{id:"653222",value:"653222",label:"墨玉县"},{id:"653223",value:"653223",label:"皮山县"},{id:"653224",value:"653224",label:"洛浦县"},{id:"653225",value:"653225",label:"策勒县"},{id:"653226",value:"653226",label:"于田县"},{id:"653227",value:"653227",label:"民丰县"}]},{id:"654000",value:"654000",label:"伊犁哈萨克自治州",children:[{id:"654002",value:"654002",label:"伊宁市"},{id:"654003",value:"654003",label:"奎屯市"},{id:"654004",value:"654004",label:"霍尔果斯市"},{id:"654021",value:"654021",label:"伊宁县"},{id:"654022",value:"654022",label:"察布查尔锡伯自治县"},{id:"654023",value:"654023",label:"霍城县"},{id:"654024",value:"654024",label:"巩留县"},{id:"654025",value:"654025",label:"新源县"},{id:"654026",value:"654026",label:"昭苏县"},{id:"654027",value:"654027",label:"特克斯县"},{id:"654028",value:"654028",label:"尼勒克县"}]},{id:"654200",value:"654200",label:"塔城地区",children:[{id:"654201",value:"654201",label:"塔城市"},{id:"654202",value:"654202",label:"乌苏市"},{id:"654221",value:"654221",label:"额敏县"},{id:"654223",value:"654223",label:"沙湾县"},{id:"654224",value:"654224",label:"托里县"},{id:"654225",value:"654225",label:"裕民县"},{id:"654226",value:"654226",label:"和布克赛尔蒙古自治县"}]},{id:"654300",value:"654300",label:"阿勒泰地区",children:[{id:"654301",value:"654301",label:"阿勒泰市"},{id:"654321",value:"654321",label:"布尔津县"},{id:"654322",value:"654322",label:"富蕴县"},{id:"654323",value:"654323",label:"福海县"},{id:"654324",value:"654324",label:"哈巴河县"},{id:"654325",value:"654325",label:"青河县"},{id:"654326",value:"654326",label:"吉木乃县"}]},{id:"659001",value:"659001",label:"石河子市",children:[{id:"659101",value:"659101",label:"新城街道"},{id:"659102",value:"659102",label:"向阳街道"},{id:"659103",value:"659103",label:"红山街道"},{id:"659104",value:"659104",label:"老街街道"},{id:"659105",value:"659105",label:"东城街道"},{id:"659106",value:"659106",label:"北泉镇"},{id:"659107",value:"659107",label:"石河子乡"},{id:"659108",value:"659108",label:"一五二团"}]},{id:"659002",value:"659002",label:"阿拉尔市",children:[{id:"659201",value:"659201",label:"幸福路街道"},{id:"659202",value:"659202",label:"金银川路街道"},{id:"659203",value:"659203",label:"青松路街道"},{id:"659204",value:"659204",label:"南口街道"},{id:"659205",value:"659205",label:"托喀依乡"},{id:"659206",value:"659206",label:"金银川镇"}]},{id:"659003",value:"659003",label:"图木舒克市",children:[{id:"659301",value:"659301",label:"图木舒克市区"},{id:"659302",value:"659302",label:"兵团四十四团"},{id:"659303",value:"659303",label:"兵团四十九团"},{id:"659304",value:"659304",label:"兵团五十团"},{id:"659305",value:"659305",label:"兵团五十一团"},{id:"659306",value:"659306",label:"兵团五十二团"},{id:"659307",value:"659307",label:"兵团五十三团"},{id:"659308",value:"659308",label:"喀拉拜勒镇"},{id:"659309",value:"659309",label:"永安坝"}]},{id:"659004",value:"659004",label:"五家渠市",children:[{id:"659401",value:"659401",label:"城区"},{id:"659402",value:"659402",label:"一零一团"},{id:"659403",value:"659403",label:"一零二团"},{id:"659404",value:"659404",label:"一零三团"}]},{id:"659005",value:"659005",label:"北屯市",children:[{id:"659501",value:"659501",label:"新城区"},{id:"659502",value:"659502",label:"老城区"},{id:"659503",value:"659503",label:"工业园区"},{id:"659504",value:"659504",label:"海川镇"},{id:"659505",value:"659505",label:"丰庆镇"},{id:"659506",value:"659506",label:"锡伯渡镇"}]},{id:"659006",value:"659006",label:"铁门关市",children:[{id:"659601",value:"659601",label:"二十九团场"},{id:"659602",value:"659602",label:"库西经济工业园"},{id:"659603",value:"659603",label:"博古其镇"},{id:"659604",value:"659604",label:"双丰镇"}]},{id:"659007",value:"659007",label:"双河市",children:[{id:"659701",value:"659701",label:"八十一团"},{id:"659702",value:"659702",label:"八十四团"},{id:"659703",value:"659703",label:"八十五团"},{id:"659704",value:"659704",label:"八十六团"},{id:"659705",value:"659705",label:"八十九团"},{id:"659706",value:"659706",label:"九十团"}]},{id:"659008",value:"659008",label:"可克达拉市",children:[{id:"659801",value:"659801",label:"63团"},{id:"659802",value:"659802",label:"64团"},{id:"659803",value:"659803",label:"66团"},{id:"659804",value:"659804",label:"67团"},{id:"659805",value:"659805",label:"68团"}]},{id:"659009",value:"659009",label:"昆玉市",children:[{id:"659901",value:"659901",label:"皮山农场"},{id:"659902",value:"659902",label:"二二四团"},{id:"659903",value:"659903",label:"四十七团"},{id:"659904",value:"659904",label:"一牧场"}]}]},{id:"810000",value:"810000",label:"香港",key:"",children:[{id:"810100",value:"810100",label:"香港岛",children:[{id:"810101",value:"810101",label:"中西区"},{id:"810102",value:"810102",label:"湾仔区"},{id:"810103",value:"810103",label:"东区"},{id:"810104",value:"810104",label:"南区"}]},{id:"810200",value:"810200",label:"九龙",children:[{id:"810201",value:"810201",label:"油尖旺区"},{id:"810202",value:"810202",label:"深水埗区"},{id:"810203",value:"810203",label:"九龙城区"},{id:"810204",value:"810204",label:"黄大仙区"},{id:"810205",value:"810205",label:"观塘区"}]},{id:"810300",value:"810300",label:"新界",children:[{id:"810301",value:"810301",label:"荃湾区"},{id:"810302",value:"810302",label:"屯门区"},{id:"810303",value:"810303",label:"元朗区"},{id:"810304",value:"810304",label:"北区"},{id:"810305",value:"810305",label:"大埔区"},{id:"810306",value:"810306",label:"西贡区"},{id:"810307",value:"810307",label:"沙田区"},{id:"810308",value:"810308",label:"葵青区"},{id:"810309",value:"810309",label:"离岛区"}]}]},{id:"530000",value:"530000",label:"云南省",key:"Y",children:[{id:"530100",value:"530100",label:"昆明市",children:[{id:"530102",value:"530102",label:"五华区"},{id:"530103",value:"530103",label:"盘龙区"},{id:"530111",value:"530111",label:"官渡区"},{id:"530112",value:"530112",label:"西山区"},{id:"530113",value:"530113",label:"东川区"},{id:"530114",value:"530114",label:"呈贡区"},{id:"530115",value:"530115",label:"晋宁区"},{id:"530124",value:"530124",label:"富民县"},{id:"530125",value:"530125",label:"宜良县"},{id:"530126",value:"530126",label:"石林彝族自治县"},{id:"530127",value:"530127",label:"嵩明县"},{id:"530128",value:"530128",label:"禄劝彝族苗族自治县"},{id:"530129",value:"530129",label:"寻甸回族彝族自治县 "},{id:"530181",value:"530181",label:"安宁市"},{id:"530182",value:"530182",label:"滇中新区"},{id:"530183",value:"530183",label:"高新区"}]},{id:"530300",value:"530300",label:"曲靖市",children:[{id:"530302",value:"530302",label:"麒麟区"},{id:"530303",value:"530303",label:"沾益区"},{id:"530304",value:"530304",label:"马龙区"},{id:"530322",value:"530322",label:"陆良县"},{id:"530323",value:"530323",label:"师宗县"},{id:"530324",value:"530324",label:"罗平县"},{id:"530325",value:"530325",label:"富源县"},{id:"530326",value:"530326",label:"会泽县"},{id:"530381",value:"530381",label:"宣威市"}]},{id:"530400",value:"530400",label:"玉溪市",children:[{id:"530402",value:"530402",label:"红塔区"},{id:"530403",value:"530403",label:"江川区"},{id:"530422",value:"530422",label:"澄江县"},{id:"530423",value:"530423",label:"通海县"},{id:"530424",value:"530424",label:"华宁县"},{id:"530425",value:"530425",label:"易门县"},{id:"530426",value:"530426",label:"峨山彝族自治县"},{id:"530427",value:"530427",label:"新平彝族傣族自治县"},{id:"530428",value:"530428",label:"元江哈尼族彝族傣族自治县"}]},{id:"530500",value:"530500",label:"保山市",children:[{id:"530502",value:"530502",label:"隆阳区"},{id:"530521",value:"530521",label:"施甸县"},{id:"530523",value:"530523",label:"龙陵县"},{id:"530524",value:"530524",label:"昌宁县"},{id:"530581",value:"530581",label:"腾冲市"}]},{id:"530600",value:"530600",label:"昭通市",children:[{id:"530602",value:"530602",label:"昭阳区"},{id:"530621",value:"530621",label:"鲁甸县"},{id:"530622",value:"530622",label:"巧家县"},{id:"530623",value:"530623",label:"盐津县"},{id:"530624",value:"530624",label:"大关县"},{id:"530625",value:"530625",label:"永善县"},{id:"530626",value:"530626",label:"绥江县"},{id:"530627",value:"530627",label:"镇雄县"},{id:"530628",value:"530628",label:"彝良县"},{id:"530629",value:"530629",label:"威信县"},{id:"530630",value:"530630",label:"水富县"}]},{id:"530700",value:"530700",label:"丽江市",children:[{id:"530702",value:"530702",label:"古城区"},{id:"530721",value:"530721",label:"玉龙纳西族自治县"},{id:"530722",value:"530722",label:"永胜县"},{id:"530723",value:"530723",label:"华坪县"},{id:"530724",value:"530724",label:"宁蒗彝族自治县"}]},{id:"530800",value:"530800",label:"普洱市",children:[{id:"530802",value:"530802",label:"思茅区"},{id:"530821",value:"530821",label:"宁洱哈尼族彝族自治县"},{id:"530822",value:"530822",label:"墨江哈尼族自治县"},{id:"530823",value:"530823",label:"景东彝族自治县"},{id:"530824",value:"530824",label:"景谷傣族彝族自治县"},{id:"530825",value:"530825",label:"镇沅彝族哈尼族拉祜族自治县"},{id:"530826",value:"530826",label:"江城哈尼族彝族自治县"},{id:"530827",value:"530827",label:"孟连傣族拉祜族佤族自治县"},{id:"530828",value:"530828",label:"澜沧拉祜族自治县"},{id:"530829",value:"530829",label:"西盟佤族自治县"}]},{id:"530900",value:"530900",label:"临沧市",children:[{id:"530902",value:"530902",label:"临翔区"},{id:"530921",value:"530921",label:"凤庆县"},{id:"530922",value:"530922",label:"云县"},{id:"530923",value:"530923",label:"永德县"},{id:"530924",value:"530924",label:"镇康县"},{id:"530925",value:"530925",label:"双江拉祜族佤族布朗族傣族自治县"},{id:"530926",value:"530926",label:"耿马傣族佤族自治县"},{id:"530927",value:"530927",label:"沧源佤族自治县"}]},{id:"532300",value:"532300",label:"楚雄彝族自治州",children:[{id:"532301",value:"532301",label:"楚雄市"},{id:"532322",value:"532322",label:"双柏县"},{id:"532323",value:"532323",label:"牟定县"},{id:"532324",value:"532324",label:"南华县"},{id:"532325",value:"532325",label:"姚安县"},{id:"532326",value:"532326",label:"大姚县"},{id:"532327",value:"532327",label:"永仁县"},{id:"532328",value:"532328",label:"元谋县"},{id:"532329",value:"532329",label:"武定县"},{id:"532331",value:"532331",label:"禄丰县"}]},{id:"532500",value:"532500",label:"红河哈尼族彝族自治州",children:[{id:"532501",value:"532501",label:"个旧市"},{id:"532502",value:"532502",label:"开远市"},{id:"532503",value:"532503",label:"蒙自市"},{id:"532504",value:"532504",label:"弥勒市"},{id:"532523",value:"532523",label:"屏边苗族自治县"},{id:"532524",value:"532524",label:"建水县"},{id:"532525",value:"532525",label:"石屏县"},{id:"532527",value:"532527",label:"泸西县"},{id:"532528",value:"532528",label:"元阳县"},{id:"532529",value:"532529",label:"红河县"},{id:"532530",value:"532530",label:"金平苗族瑶族傣族自治县"},{id:"532531",value:"532531",label:"绿春县"},{id:"532532",value:"532532",label:"河口瑶族自治县"}]},{id:"532600",value:"532600",label:"文山壮族苗族自治州",children:[{id:"532601",value:"532601",label:"文山市"},{id:"532622",value:"532622",label:"砚山县"},{id:"532623",value:"532623",label:"西畴县"},{id:"532624",value:"532624",label:"麻栗坡县"},{id:"532625",value:"532625",label:"马关县"},{id:"532626",value:"532626",label:"丘北县"},{id:"532627",value:"532627",label:"广南县"},{id:"532628",value:"532628",label:"富宁县"}]},{id:"532800",value:"532800",label:"西双版纳傣族自治州",children:[{id:"532801",value:"532801",label:"景洪市"},{id:"532822",value:"532822",label:"勐海县"},{id:"532823",value:"532823",label:"勐腊县"}]},{id:"532900",value:"532900",label:"大理白族自治州",children:[{id:"532901",value:"532901",label:"大理市"},{id:"532922",value:"532922",label:"漾濞彝族自治县"},{id:"532923",value:"532923",label:"祥云县"},{id:"532924",value:"532924",label:"宾川县"},{id:"532925",value:"532925",label:"弥渡县"},{id:"532926",value:"532926",label:"南涧彝族自治县"},{id:"532927",value:"532927",label:"巍山彝族回族自治县"},{id:"532928",value:"532928",label:"永平县"},{id:"532929",value:"532929",label:"云龙县"},{id:"532930",value:"532930",label:"洱源县"},{id:"532931",value:"532931",label:"剑川县"},{id:"532932",value:"532932",label:"鹤庆县"}]},{id:"533100",value:"533100",label:"德宏傣族景颇族自治州",children:[{id:"533102",value:"533102",label:"瑞丽市"},{id:"533103",value:"533103",label:"芒市"},{id:"533122",value:"533122",label:"梁河县"},{id:"533123",value:"533123",label:"盈江县"},{id:"533124",value:"533124",label:"陇川县"}]},{id:"533300",value:"533300",label:"怒江傈僳族自治州",children:[{id:"533301",value:"533301",label:"泸水市"},{id:"533323",value:"533323",label:"福贡县"},{id:"533324",value:"533324",label:"贡山独龙族怒族自治县"},{id:"533325",value:"533325",label:"兰坪白族普米族自治县"}]},{id:"533400",value:"533400",label:"迪庆藏族自治州",children:[{id:"533401",value:"533401",label:"香格里拉市"},{id:"533422",value:"533422",label:"德钦县"},{id:"533423",value:"533423",label:"维西傈僳族自治县"}]}]},{id:"330000",value:"330000",label:"浙江省",key:"Z",children:[{id:"330100",value:"330100",label:"杭州市",children:[{id:"330102",value:"330102",label:"上城区"},{id:"330103",value:"330103",label:"下城区"},{id:"330104",value:"330104",label:"江干区"},{id:"330105",value:"330105",label:"拱墅区"},{id:"330106",value:"330106",label:"西湖区"},{id:"330108",value:"330108",label:"滨江区"},{id:"330109",value:"330109",label:"萧山区"},{id:"330110",value:"330110",label:"余杭区"},{id:"330111",value:"330111",label:"富阳区"},{id:"330112",value:"330112",label:"临安区"},{id:"330122",value:"330122",label:"桐庐县"},{id:"330127",value:"330127",label:"淳安县"},{id:"330182",value:"330182",label:"建德市"},{id:"330186",value:"330186",label:"高新区"}]},{id:"330200",value:"330200",label:"宁波市",children:[{id:"330203",value:"330203",label:"海曙区"},{id:"330205",value:"330205",label:"江北区"},{id:"330206",value:"330206",label:"北仑区"},{id:"330211",value:"330211",label:"镇海区"},{id:"330212",value:"330212",label:"鄞州区"},{id:"330213",value:"330213",label:"奉化区"},{id:"330225",value:"330225",label:"象山县"},{id:"330226",value:"330226",label:"宁海县"},{id:"330281",value:"330281",label:"余姚市"},{id:"330282",value:"330282",label:"慈溪市"},{id:"330284",value:"330284",label:"杭州湾新区"},{id:"330285",value:"330285",label:"高新区"}]},{id:"330300",value:"330300",label:"温州市",children:[{id:"330302",value:"330302",label:"鹿城区"},{id:"330303",value:"330303",label:"龙湾区"},{id:"330304",value:"330304",label:"瓯海区"},{id:"330305",value:"330305",label:"洞头区"},{id:"330324",value:"330324",label:"永嘉县"},{id:"330326",value:"330326",label:"平阳县"},{id:"330327",value:"330327",label:"苍南县"},{id:"330328",value:"330328",label:"文成县"},{id:"330329",value:"330329",label:"泰顺县"},{id:"330381",value:"330381",label:"瑞安市"},{id:"330382",value:"330382",label:"乐清市"}]},{id:"330400",value:"330400",label:"嘉兴市",children:[{id:"330402",value:"330402",label:"南湖区"},{id:"330411",value:"330411",label:"秀洲区"},{id:"330421",value:"330421",label:"嘉善县"},{id:"330424",value:"330424",label:"海盐县"},{id:"330481",value:"330481",label:"海宁市"},{id:"330482",value:"330482",label:"平湖市"},{id:"330483",value:"330483",label:"桐乡市"}]},{id:"330500",value:"330500",label:"湖州市",children:[{id:"330502",value:"330502",label:"吴兴区"},{id:"330503",value:"330503",label:"南浔区"},{id:"330521",value:"330521",label:"德清县"},{id:"330522",value:"330522",label:"长兴县"},{id:"330523",value:"330523",label:"安吉县"}]},{id:"330600",value:"330600",label:"绍兴市",children:[{id:"330602",value:"330602",label:"越城区"},{id:"330603",value:"330603",label:"柯桥区"},{id:"330604",value:"330604",label:"上虞区"},{id:"330624",value:"330624",label:"新昌县"},{id:"330681",value:"330681",label:"诸暨市"},{id:"330683",value:"330683",label:"嵊州市"}]},{id:"330700",value:"330700",label:"金华市",children:[{id:"330702",value:"330702",label:"婺城区"},{id:"330703",value:"330703",label:"金东区"},{id:"330723",value:"330723",label:"武义县"},{id:"330726",value:"330726",label:"浦江县"},{id:"330727",value:"330727",label:"磐安县"},{id:"330781",value:"330781",label:"兰溪市"},{id:"330782",value:"330782",label:"义乌市"},{id:"330783",value:"330783",label:"东阳市"},{id:"330784",value:"330784",label:"永康市"}]},{id:"330800",value:"330800",label:"衢州市",children:[{id:"330802",value:"330802",label:"柯城区"},{id:"330803",value:"330803",label:"衢江区"},{id:"330822",value:"330822",label:"常山县"},{id:"330824",value:"330824",label:"开化县"},{id:"330825",value:"330825",label:"龙游县"},{id:"330881",value:"330881",label:"江山市"}]},{id:"330900",value:"330900",label:"舟山市",children:[{id:"330902",value:"330902",label:"定海区"},{id:"330903",value:"330903",label:"普陀区"},{id:"330921",value:"330921",label:"岱山县"},{id:"330922",value:"330922",label:"嵊泗县"}]},{id:"331000",value:"331000",label:"台州市",children:[{id:"331002",value:"331002",label:"椒江区"},{id:"331003",value:"331003",label:"黄岩区"},{id:"331004",value:"331004",label:"路桥区"},{id:"331022",value:"331022",label:"三门县"},{id:"331023",value:"331023",label:"天台县"},{id:"331024",value:"331024",label:"仙居县"},{id:"331081",value:"331081",label:"温岭市"},{id:"331082",value:"331082",label:"临海市"},{id:"331083",value:"331083",label:"玉环市"}]},{id:"331100",value:"331100",label:"丽水市",children:[{id:"331102",value:"331102",label:"莲都区"},{id:"331121",value:"331121",label:"青田县"},{id:"331122",value:"331122",label:"缙云县"},{id:"331123",value:"331123",label:"遂昌县"},{id:"331124",value:"331124",label:"松阳县"},{id:"331125",value:"331125",label:"云和县"},{id:"331126",value:"331126",label:"庆元县"},{id:"331127",value:"331127",label:"景宁畲族自治县"},{id:"331181",value:"331181",label:"龙泉市"}]},{id:"331200",value:"331200",label:"舟山群岛新区",children:[{id:"331201",value:"331201",label:"金塘岛"},{id:"331202",value:"331202",label:"六横岛"},{id:"331203",value:"331203",label:"衢山岛"},{id:"331204",value:"331204",label:"舟山本岛西北部"},{id:"331205",value:"331205",label:"岱山岛西南部"},{id:"331206",value:"331206",label:"泗礁岛"},{id:"331207",value:"331207",label:"朱家尖岛"},{id:"331208",value:"331208",label:"洋山岛"},{id:"331209",value:"331209",label:"长涂岛"},{id:"331210",value:"331210",label:"虾峙岛"}]}]}];t.provice=l},3:function(e,t){var a;a=function(){return this}();try{a=a||new Function("return this")()}catch(l){"object"===typeof window&&(a=window)}e.exports=a},312:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAYUExURUdwTGRkZGVlZWVlZWVlZWNjY2VlZWZmZq7xeSoAAAAHdFJOUwA8xHChE+6vkXqzAAABo0lEQVRIx+2XPU/DMBCGnSYRa4UEXWkkyFoBImuBwWsoCFZArVjJh8jfx44/Yjtnn1dQb0rsx6/i89s7lxA38uuyfawJGnk5sOhxshrG6DAuG2RsEZAqsI8UxCS54H6Z3GFfmTKgreXWN8iWL/nDLiypBFFJLSgkGx+XsMkfeSTJF3teesBzBn6AL46gJRKQdDS8krkjkegUODFLnZGDmQ83cFbDgh5J6ChSyG0ZNEgBt0Fj0OoM9vR8OYUtvXB3OGaCROTMk9tZ0lLfabmSXkFCXk0Dm4YNei/gUWsy6HpzNigopg/KsMMy4je8w8qHzAlaPZTkAq+a1WiEChMU1mq4b3qCV9eeRFThUZKDaAfIOciy+FkUhTeRp2zyih2Oqu5ecKVq/yoObFQfwMCt6iwIyDOYUBxsxfRTqcH0RscErs/Uqgk80Y2rncAL8mfBju34Ngb8FiXhCB7B/wNSXZ0RsNJVdw5SsyIzsKth8NnqBW+DERI0oobuygDY2/c3P3hwOqiKd9kGVFgdWvyTMC7qxvvabt8Panw/fvqLLkH3kvgFXgqUV27fmlIAAAAASUVORK5CYII="},313:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABIUExURUdwTJK68GGH5YSr7XCW6HSa6Zi/8UJn3k9030Bl3T1i3Fd940914V+F5Eds32WM5oeu7X6l65K68GuR55/H83CW6HOa6Xif6lKR78kAAAAKdFJOUwDd2rc6Y4yfI8Gcnv+jAAAB1klEQVRYw+2Y25KDIAyGEUFQtEXW6vu/6YJgRQVP5GZn/UMmUODzVMMIQsciRdZ1XZZTBCJiaE4FT+cV3UIUmKdPEpiXSAzwkohBXsJ9pJ3SBke0vJWp8Ri3iMRMtwRlWZ2LOpA7PKsJOWtskbu8qAgwT2WX3kKeKSXdTDmVr+RlIs+kOrbzRM2Tesaum5CdBRqek4pEq+wy70j5GV4uW1BiLjXQmS3bOPcfE/N2lnTuUHP0+tv8PO+kdtNjcZ037BGLwaodbVd+dzSZ0c3Qdse9Fo3y+mH2YVi21+7XgkTa9/3geR+o+3HRCiQzYn7/eN4H6n5ctjZE8knTmpjK01oQyU+6sJceOQDv089Ejn/eEDYROX6DSF+1BQLxjLDlNXCmkxltQEUQBuW9GWoaAYbTJIyEEI0AkgY1CE81C051jJgAFUNU1J7ZkhB1imC1RzSlvhlNYeafXdYLiZvRiLnkj2sQlV5KJKSsXwlWErJeBNgrCbhdpDQwQX8TWFXVa7Q7MQh8Vd9RyzmMUTZ6pF/HyBlG9F3M4kMe4AN8gA/wAf5bIAt83SYBAx/MPAkY2gZjCUAW3EJLAIb36fhtYGzfjx9dT3mNZx51YAqbx/PAfS5XD/gXzDzj+lEsogMAAAAASUVORK5CYII="},314:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAeUExURUdwTGVlZWRkZGVlZWVlZWVlZWZmZmBgYGhoaGZmZu4HGdsAAAAJdFJOUwDCPaHqV3wQIEjqlvoAAAJeSURBVEjH7Vc7T8MwEDZN08BGQQhlK0+pGyAKdKtAArIBnbohQJXYgmBhQwIhdSMkFO7f4rNj+xJSeuzc0DZfv/M9fD5fhFDib4dZ80qUZLMZJYtnFFmLAOU4pmBwo8Bsx0HPkMsxJd4Y9MAgPlg5dLwXhxrrXQdl1iM/cmiqIQ8JndbsJip8GOIACVdPtT4qbJkF9UIBMluaV0NebJZOjYf7+t/ZEODUepg86Z/3uZcjYk9iif4VWm3lxZe27HIa5rZ9q6EfUuVM6nJyB9DD7zrAskO7qC5jPnFQLfdjYKNCecC469Qy2k71GgkBfbQzgIzuW/4YuQDNY5e6qJxrKQ96FEVSWNT1lCe+2QxrJ5HEdwo1AC7Np5O2JAK8/SR6JeIcQJkovZsXYqaQHU2M1PZMIY5kLko+VhPbKpjxdOKtJN4W81hN7MrV2gDxNGIA0r96MbeVRA83qgGFsCuJI0xrEEES/04MQshijIjariJKy2NdL2RJXQ4eLVK5ICqLmjyOC1RbF4Wzsi6Pc8sc9SVy4nSZ2eI7t21BtZ6j4SpKH0yFQ0cBw13SfNaByljvGRXTurBBOEG/MWwnpmXoeCwam0hthyOZ8nctmld2w+oeFXqz2Bg2UfZcf7xWwPBC/As7PdyE+8wtZBcFt8zYhcs9ClMP10oeD+u49gS/AbBbCrtJsdseu5GyWzO72bOvjwg+eRcS+4qrvDTLt+vjzytu8jXMvtjZowJ7+GCPM+wBqThyPUweudhDHH8sZA+a7NGVPwyzx2s6sLuWQVvX2V9fAfgvFZNeU17Ja8o3jvJNc1Jtlm4AAAAASUVORK5CYII="},315:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURUdwTGVlZWJiYmVlZWVlZWZmZmRkZGVlZWZmZkvpTT0AAAAIdFJOUwDrEslehTanEdmPsgAAAohJREFUSMeNVz1v20AMdVTH7tgEiaFRheHGY5O2qUe5RQGPTpBBo4MM6WgEHTLWleTwZ5eno04nHUXqFtkGxY9Hvnf0aFSdxepbMhpwxjHA7RDDVwA47HS7OZgzU+2iFfob4nJqjDKAc80QbW5GY4BcKZxM0HwvG360QTGBQjZcURn4TJTIRe35sxJ5336jt+Y6YibGjmLnR46NAT/Qx4kY+x1AGmbBnN9w8OvaCrWUfhrnwij+87Evhb78beXRm2QLEr8y0XAsTFDcAjl2oMo5eugz8BQt1vaG3jSILNAOehm2dJ0x/oRmTx0ilQqk0vTYsk+N3VYY3BiO1fM9kjGVJzyv2ydLxZIqXdILUjVVkicCNJY0hMmpwlZHAI9l/cTe6my1SB5VxtAA5UOUwiBoXWkqZeo9DlEp5wpjl2rsPc1PqsUu6BqZabGr9k1irRySceQF3g/SQcHLKQflDsmacm60WStIUxqXz2d/Eu463NFz1swAXCZMOTNCqGbiBjjLCd2uxmVZs86ci1AxLEKYra0HETgDCItzyGQUHDmU/uQ0oUbGKEuZmBCoNU8QIjutf3qymVkKrZk0V+QyMiJ0O7FSGWEm8BKsINZlJWvXNHI4KN3gDdh2a6FBWoQLzNxtKiYzx7R1sMA0LqM7aETab2tTOHEBLS/b606A5Rt9/NTdd7rt4eaRoeeG37yyQDsNaoyuYN+5xe+FIX6gxqZ/QXCUzpITg+DXObsZPEJ3jTWIp/zaCfedV996lKg11maYeDmsxnrnl9cnH5lvuWYBI9hNmnQxrkGS12rGDw/4yp18N9tlAPIvAKDI1hW4cyGLsPXJ6lQ3z9fK7qv+ryT6dQ3ff9Tf/gNTKS7N4BKWQgAAAABJRU5ErkJggg=="},316:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURUdwTGZmZmVlZWRkZGVlZWVlZWVlZWVlZWZmZiCGJ0AAAAAIdFJOUwB9wjwX6ZhaW3I1gwAAAn5JREFUSMetVz1T20AQtXyHQ+nYIaOSADOoVJJGpYBJ4jKQFFdiSGZcMlQugxyJ/dk53ep0X3uSimwDsp7v4+3bt+vZVwEyqnw2FjtQ8XMUKBD4MhVYjQJTBNajwCRDZDmbEnLZp0nAPcD9JOAG4HQS8Ejy8zYWaysZcxiK+tFcHYbjlwayEWDVkzcCNFLIxpa0NPQhduv3rRyeDOPLeJYl8vskxguAV8P4nwHhADSG8UMcyM1tErM4FVmvV2YWp4EQLj4MtP8lwmU8n3KZthjijDOrnIshxhMLeGyyRAIPlsb/UptuS+/lgmZ8r5Q4txL8hrYfofJwbF2A0Yzjp462BGk/CCxs7jLSfhDoyJq0H45aSe20kfbTXdHZjSyGOZLmKIYshj1+6DBCFQMT6jyuWJOQcZ6iEzPnlV8M/OGsLfwmzJqXms4JLzzxhIwXaI15qKydy3jRL+gTkrqMH7W4W4rijdsQmSz6y1LvtXRP38RKy6nQBCJd6drjgwta5PIMXpXIxMJ5qLQT8OWiKL4786J199qVNI86/mt4ajr8O/IdjfsRKp/c/JYoOvY7xG3p2eDmsxfTRoj/EVerrSHj48M25tctlbVGftISn1HOYNr4Qj00Q2PVhT3enUYX7OSn54yGnmpMcjf6ISd3rtfPgA1C7lytV/TemTreHusdfSelugVHiS5USXSmPqe6RfcO/3SGQ3YL7VoK2BkOiwCbvpcmAytynGBx1Oi+tSBrWCjv+KLOz5HOguyRkrom/ybwneTqpbyieeyTsex9j/YZnd66tIbPKjKNtHHQXhT9cXBt/Fg/RH5unBg5YvcwU6tH5bOo+tGXr8TdO/3wDy6Y3po/hZoxAAAAAElFTkSuQmCC"},317:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURUdwTEB/1DmW2EF800Rz0UB/1DqS1zOl2z+B1DyL1jWg2jmS1zeZ2TOm20Zs0EN10goBTHkAAAAIdFJOUwA1gF/NptDqcXpN5gAAAy5JREFUSMetls9r1EAUx5P9JSLCtv5AVPyNtFZpVzxYwbKCQk/tij1YEK09qVXQP6AHEcrktP5CEnoUKixdUMHDsr0o6KHtSdBCIdB17XWitsKeMr6ZyTSzm8mPg9+weZl5n31v3iSZiZaatkHfB7Q4nbGZHsWC0xz8mhT8ljT1SiyYesDJvJZEEHYgEXjRto8kAnfa9kQicBvMz7EwHZWGn63aEVq56pderayGy7ZLAtQr1UqE7Lmt7LS5GnpUqg8FeK8SrTkBnooBq+J+XIgBKyL3/vkYvRYzvhijz2LGl+ejD1FNajGGfCNmfDlOYn4Sg/djuC8CvJEUPL0UrU8CPLgQrfcC3LFUDzvY6aMAc6Hc5MmF+kL93dYzXg8R3LspMG8FmA4DIVQfmK2XVA8DIdQBGdRmo0F/fZiqqUVBMD7YN6vWBHf5i8CgVVMds/BK91pWzQe319QkEOO1muWvKjlLqQ/gAvNKWn7UIAwx3Q6mlNykl+u5D+pB6kUXK6GXXkprpGV2HBavVKfXzyTwrmFahvyb4f17oWXI4DjtMEHCvvQCQo/5VAIHkWkwCWuw1D20xyhK4D6zXQa6rWm7rvOGvGfkDEQFf2dGWN4hb1dpxBMbzFIE0bAUN2fa9pA7SC0ToSdt4HkUqmIbmA0HO/av4TDucQeYCwMDO28ParXKZThRgS3z36XA3pkeRmWEWiwKZRD7/VHssvoYKnuiDDXomnpD1rs6lOwT4r+oe+y4n+2s3GjXOULIpnD2Q+Ovmsy2wEe8CcnQa7KhBEfBAyz7NNAJl+qLKOv5NvyAhPxWgIc9H8l7I6TaVGfeLEA9Ls3tQCWFfmVunTgO9N5yCDypaWhA4FGHlIIPBXFonozrwriyLvlBR+O6v4KfiK67wQwtgONQkhOsJuU4DRrYwRAr4zhrtA+7jSCIcYP7mgBiTMGsg1Wgu64xpEEJp8ka7lqwaowxFDqEadI0NKDvJsbF4DyOYNzMdwNR4v9qanvgrLiHQ9hTnsfiUtyZjOeiI9UOeY2m6o3xfEW5UVI9ZruZ66c8kHX1E84G5i2b+ghWl8KcJ/DlgtS4Irh/JgGYmtu+Zj4AAAAASUVORK5CYII="},318:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAeUExURUdwTGRkZGVlZWNjY2VlZWVlZWVlZWVlZWZmZmZmZhBAj2wAAAAJdFJOUwA5uhSa2fBZelsjR9kAAAMESURBVEjHhVbNb9MwFHcaWMOtReOjt618LbcwlVW9ZVRa6W0FCdQbg05abmMrSLt1BaT1SNqk9X+L7cSOn/3c+ZQ8/+z3/HufhBir++cVpR8/XJLty/9Ly3UQbcN5IVUrbbhx9THVVupU74cUrNSlfUGNdYHjDsVmftAkpDlPxM8LVLEwcFI+wTvhf+eY8qd854tB1AhhJjGM8rnJuX3lOybOAHUet+WTBeTSGIo6nCIT94AJN6ZwyIQzQ9ZCZOL0P1vzyn4huzKDkoCd3bOBDy09RygTxGecfTfdvHa4H8oTVLPQDYysM1vQOOUbeljWEGYVG7obHilT3ioHRtLIr5DuZUnxSMZIQWsPUj6Ub1lI23dK22rQs6HkNZSPapVHA2h9IvctoAf5YSQQHOirrfKYC0hMYOoCJrorKiB7fiSBMTwKgS35UbOeB4FeW4bffF/5EAAzV0Gi0hibAxi6cMsVZZayEEYdTKYUBkWMA2swO29g1GlrByZNz5Fb4oolzKEVDgxh1tUBWwY7l8Z/7HgLLAxDuxrJ2IA29XAn8rq+tAocotsW82q0Rskxa9cCczcnY20/j56ZwF9I1eS6zcDgF2YR1o8gE/4Q0yKOw0b1hOJhesPlfaOHYqFSFw11IH+vRKtF4150TTr5wb+fieaK9UxtAMja7fH2ESBI4ACQO4eKDgT20bS8e3/MkNqd+W9Cdl/eGc+ZJgVnXTWopNdFOcwHOu6n2ONu9aev+ee3QVQGgD4+kMdUAbkVzWajihS29iHVSL8OjNcPFWu7byrU1bFidlXFO5vubhvc+L7maiZ4PhebsYqG7Lq0ScYfTythc3csY0NwMFMN/yJSQ89e5a9GOfCMNCMm7PLuSaVQxOVpkVa6Pn5/wYIu3RTJcoY6O9bijyVtAJJKGyE3IEtm/AEpNpSuIlD7Ts3OLcdhMAqLvr8onlTdOWW2Z4PImFU2/FqzOnkNu1alsNcRZ7NJYa8jW7qSq3pbfW5Mc3Lv4jcuXI0DlvgNCT737wd2zmf/Ac6m7lWfPC8TAAAAAElFTkSuQmCC"},319:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURUdwTD6G1Tae2UF+1D+B1D+D1EJ500Rx0T6G1TuN1kRx0UF90zmU2DWh2jeb2TKo2zywSioAAAAIdFJOUwBMy5gperjZ+VqM+AAAA1dJREFUSMeNlk1oE0EUx3fNJp6U1KJi1VIK3tRGUNEepCj40SK0SkWKaMV6MPWg0FNufoAJuWi9dCEXie3C7EmQErInvRWWgKLHbWrBW7KHgsewvpnZ3czMzmz7f93uy5vfzLw3mcyupgnS744GweiFvJYu404Q6tREGqePBbF28nvj0kiD44BUzf4oEPRPzu0LEhqRgmNJcEfG3Q7abR6Dz78klbR7vV7g9WJRX5Khh9Vre2DkH70lszxDhqGIF996iSwzXiQAerHnedMCeNKTq/1DnFkBej95LuttKkyY+4Cc6oK2OPChL9Um6DcHdqUi8Da3EeUD+l1/s9tlt2XOT1GBAQ/G0e2E47PVDPt+i/z90a5Sd1vLYgdciPV1pYPlt1oFzfBb2N2Kgp3OXwY82wqVj3zYNcNh7DsDum6HGoCn4d5yATwRxjgQt2HDIL4TMIy5zDK6kciIoA0ChlKAz4kzz4D5lBHdEQVYC20Ed8LON9wjjDLgRqTlgQfUcWcORTF2xFqqmCPINDdSjFnHmmnWlLbMgM/MFL1mwMtp4EcGPJYGfmDAW6ZZUdp79oRaAZkV6WXOs7//Soq4M7+8ojD4437Xl8oVhZXfcODNslJv+eNRDRb440wNCufjfRX3SgBz5YZc8+Ih3ihL7V3iqTBVlepr8hHccCTWkDyKjzecalW8vsie6jCCI17SZ/sUtFW5q7Ekf2AvOoLWFW8AWRFUvlRkeK4gffGYvXhe066xHP78ZFZ4ARl0HNuBmL7YpHLWYV4DR8+x3FHcZJOvdZCUtE6ac44N8Zd97roDmN0Mv399YCCsIoe7285CvNQ2IjadWAabtkTVj5OJ7TVI/nGfOgLFFGlLPVwU1ISeT2cmNB2heElyCAYyDt9DCDWbNDpkI2SR0XO2bYXLYZRsRHLWS02EPhEP+iCa3n7wVik4By4tLgtDkixx61KUBKgOQX0cSojSuAHBF7SvFSVWwiSyEL0xUTwPhD7HXzZiFNc1CR9ICqi/S+b63Gp/S5MiIMU1Zm8UI67O7IYiTnIyLD7qHZJr7F4cwtnN0ZKYjQS5W9yWwbOu4mHFDWqIL8EZnF6RrUX12o3B0t5ASyNrtJswVNobaEHV9d3Bcag6WyrsDmas6f/OYLaI44vokgAAAABJRU5ErkJggg=="},32:function(e,t,a){"use strict";function l(e,t,a,l,i,n,r,u,o,s){var d,c="function"===typeof e?e.options:e;if(o){c.components||(c.components={});var v=Object.prototype.hasOwnProperty;for(var f in o)v.call(o,f)&&!v.call(c.components,f)&&(c.components[f]=o[f])}if(s&&("function"===typeof s.beforeCreate&&(s.beforeCreate=[s.beforeCreate]),(s.beforeCreate||(s.beforeCreate=[])).unshift((function(){this[s.__module]=this})),(c.mixins||(c.mixins=[])).push(s)),t&&(c.render=t,c.staticRenderFns=a,c._compiled=!0),l&&(c.functional=!0),n&&(c._scopeId="data-v-"+n),r?(d=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"===typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),i&&i.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},c._ssrRegister=d):i&&(d=u?function(){i.call(this,this.$root.$options.shadowRoot)}:i),d)if(c.functional){c._injectStyles=d;var h=c.render;c.render=function(e,t){return d.call(t),h(e,t)}}else{var b=c.beforeCreate;c.beforeCreate=b?[].concat(b,d):[d]}return{exports:e,options:c}}a.r(t),a.d(t,"default",(function(){return l}))},33:function(e,t,a){"use strict";var l=a(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=l(a(25)),n=l(a(34)),r=a(35);i.default.use(n.default);var u=new n.default.Store({state:{login:!0,userInfo:{},config:{},token:"",address:!0,shopInfo:{text:"某某某某店铺",value:"3"}},mutations:{loginStatus:function(e){e.login=!0},setState:function(e,t){console.log("state",e),console.log("data",t),e.userInfo=t},configInfo:function(e){(0,r.getConfig)().then((function(t){console.log("config",t.data),e.config=t.data}))},setToken:function(e,t){e.token=t},addressStatus:function(e){e.address=!0},shopInfoSet:function(e,t){e.shopInfo=t}},actions:{}}),o=u;t.default=o},334:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fontData=void 0;var l=[{font_class:"arrow-down",unicode:""},{font_class:"arrow-left",unicode:""},{font_class:"arrow-right",unicode:""},{font_class:"arrow-up",unicode:""},{font_class:"auth",unicode:""},{font_class:"auth-filled",unicode:""},{font_class:"back",unicode:""},{font_class:"bars",unicode:""},{font_class:"calendar",unicode:""},{font_class:"calendar-filled",unicode:""},{font_class:"camera",unicode:""},{font_class:"camera-filled",unicode:""},{font_class:"cart",unicode:""},{font_class:"cart-filled",unicode:""},{font_class:"chat",unicode:""},{font_class:"chat-filled",unicode:""},{font_class:"chatboxes",unicode:""},{font_class:"chatboxes-filled",unicode:""},{font_class:"chatbubble",unicode:""},{font_class:"chatbubble-filled",unicode:""},{font_class:"checkbox",unicode:""},{font_class:"checkbox-filled",unicode:""},{font_class:"checkmarkempty",unicode:""},{font_class:"circle",unicode:""},{font_class:"circle-filled",unicode:""},{font_class:"clear",unicode:""},{font_class:"close",unicode:""},{font_class:"closeempty",unicode:""},{font_class:"cloud-download",unicode:""},{font_class:"cloud-download-filled",unicode:""},{font_class:"cloud-upload",unicode:""},{font_class:"cloud-upload-filled",unicode:""},{font_class:"color",unicode:""},{font_class:"color-filled",unicode:""},{font_class:"compose",unicode:""},{font_class:"contact",unicode:""},{font_class:"contact-filled",unicode:""},{font_class:"down",unicode:""},{font_class:"bottom",unicode:""},{font_class:"download",unicode:""},{font_class:"download-filled",unicode:""},{font_class:"email",unicode:""},{font_class:"email-filled",unicode:""},{font_class:"eye",unicode:""},{font_class:"eye-filled",unicode:""},{font_class:"eye-slash",unicode:""},{font_class:"eye-slash-filled",unicode:""},{font_class:"fire",unicode:""},{font_class:"fire-filled",unicode:""},{font_class:"flag",unicode:""},{font_class:"flag-filled",unicode:""},{font_class:"folder-add",unicode:""},{font_class:"folder-add-filled",unicode:""},{font_class:"font",unicode:""},{font_class:"forward",unicode:""},{font_class:"gear",unicode:""},{font_class:"gear-filled",unicode:""},{font_class:"gift",unicode:""},{font_class:"gift-filled",unicode:""},{font_class:"hand-down",unicode:""},{font_class:"hand-down-filled",unicode:""},{font_class:"hand-up",unicode:""},{font_class:"hand-up-filled",unicode:""},{font_class:"headphones",unicode:""},{font_class:"heart",unicode:""},{font_class:"heart-filled",unicode:""},{font_class:"help",unicode:""},{font_class:"help-filled",unicode:""},{font_class:"home",unicode:""},{font_class:"home-filled",unicode:""},{font_class:"image",unicode:""},{font_class:"image-filled",unicode:""},{font_class:"images",unicode:""},{font_class:"images-filled",unicode:""},{font_class:"info",unicode:""},{font_class:"info-filled",unicode:""},{font_class:"left",unicode:""},{font_class:"link",unicode:""},{font_class:"list",unicode:""},{font_class:"location",unicode:""},{font_class:"location-filled",unicode:""},{font_class:"locked",unicode:""},{font_class:"locked-filled",unicode:""},{font_class:"loop",unicode:""},{font_class:"mail-open",unicode:""},{font_class:"mail-open-filled",unicode:""},{font_class:"map",unicode:""},{font_class:"map-filled",unicode:""},{font_class:"map-pin",unicode:""},{font_class:"map-pin-ellipse",unicode:""},{font_class:"medal",unicode:""},{font_class:"medal-filled",unicode:""},{font_class:"mic",unicode:""},{font_class:"mic-filled",unicode:""},{font_class:"micoff",unicode:""},{font_class:"micoff-filled",unicode:""},{font_class:"minus",unicode:""},{font_class:"minus-filled",unicode:""},{font_class:"more",unicode:""},{font_class:"more-filled",unicode:""},{font_class:"navigate",unicode:""},{font_class:"navigate-filled",unicode:""},{font_class:"notification",unicode:""},{font_class:"notification-filled",unicode:""},{font_class:"paperclip",unicode:""},{font_class:"paperplane",unicode:""},{font_class:"paperplane-filled",unicode:""},{font_class:"person",unicode:""},{font_class:"person-filled",unicode:""},{font_class:"personadd",unicode:""},{font_class:"personadd-filled",unicode:""},{font_class:"personadd-filled-copy",unicode:""},{font_class:"phone",unicode:""},{font_class:"phone-filled",unicode:""},{font_class:"plus",unicode:""},{font_class:"plus-filled",unicode:""},{font_class:"plusempty",unicode:""},{font_class:"pulldown",unicode:""},{font_class:"pyq",unicode:""},{font_class:"qq",unicode:""},{font_class:"redo",unicode:""},{font_class:"redo-filled",unicode:""},{font_class:"refresh",unicode:""},{font_class:"refresh-filled",unicode:""},{font_class:"refreshempty",unicode:""},{font_class:"reload",unicode:""},{font_class:"right",unicode:""},{font_class:"scan",unicode:""},{font_class:"search",unicode:""},{font_class:"settings",unicode:""},{font_class:"settings-filled",unicode:""},{font_class:"shop",unicode:""},{font_class:"shop-filled",unicode:""},{font_class:"smallcircle",unicode:""},{font_class:"smallcircle-filled",unicode:""},{font_class:"sound",unicode:""},{font_class:"sound-filled",unicode:""},{font_class:"spinner-cycle",unicode:""},{font_class:"staff",unicode:""},{font_class:"staff-filled",unicode:""},{font_class:"star",unicode:""},{font_class:"star-filled",unicode:""},{font_class:"starhalf",unicode:""},{font_class:"trash",unicode:""},{font_class:"trash-filled",unicode:""},{font_class:"tune",unicode:""},{font_class:"tune-filled",unicode:""},{font_class:"undo",unicode:""},{font_class:"undo-filled",unicode:""},{font_class:"up",unicode:""},{font_class:"top",unicode:""},{font_class:"upload",unicode:""},{font_class:"upload-filled",unicode:""},{font_class:"videocam",unicode:""},{font_class:"videocam-filled",unicode:""},{font_class:"vip",unicode:""},{font_class:"vip-filled",unicode:""},{font_class:"wallet",unicode:""},{font_class:"wallet-filled",unicode:""},{font_class:"weibo",unicode:""},{font_class:"weixin",unicode:""}];t.fontData=l},34:function(e,t,a){"use strict";(function(t){
/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */
function a(e){var t=Number(e.version.split(".")[0]);if(t>=2)e.mixin({beforeCreate:l});else{var a=e.prototype._init;e.prototype._init=function(e){void 0===e&&(e={}),e.init=e.init?[l].concat(e.init):l,a.call(this,e)}}function l(){var e=this.$options;e.store?this.$store="function"===typeof e.store?e.store():e.store:e.parent&&e.parent.$store&&(this.$store=e.parent.$store)}}var l="undefined"!==typeof window?window:"undefined"!==typeof t?t:{},i=l.__VUE_DEVTOOLS_GLOBAL_HOOK__;function n(e){i&&(e._devtoolHook=i,i.emit("vuex:init",e),i.on("vuex:travel-to-state",(function(t){e.replaceState(t)})),e.subscribe((function(e,t){i.emit("vuex:mutation",e,t)}),{prepend:!0}),e.subscribeAction((function(e,t){i.emit("vuex:action",e,t)}),{prepend:!0}))}function r(e,t){return e.filter(t)[0]}function u(e,t){if(void 0===t&&(t=[]),null===e||"object"!==typeof e)return e;var a=r(t,(function(t){return t.original===e}));if(a)return a.copy;var l=Array.isArray(e)?[]:{};return t.push({original:e,copy:l}),Object.keys(e).forEach((function(a){l[a]=u(e[a],t)})),l}function o(e,t){Object.keys(e).forEach((function(a){return t(e[a],a)}))}function s(e){return null!==e&&"object"===typeof e}function d(e){return e&&"function"===typeof e.then}function c(e,t){if(!e)throw new Error("[vuex] "+t)}function v(e,t){return function(){return e(t)}}var f=function(e,t){this.runtime=t,this._children=Object.create(null),this._rawModule=e;var a=e.state;this.state=("function"===typeof a?a():a)||{}},h={namespaced:{configurable:!0}};h.namespaced.get=function(){return!!this._rawModule.namespaced},f.prototype.addChild=function(e,t){this._children[e]=t},f.prototype.removeChild=function(e){delete this._children[e]},f.prototype.getChild=function(e){return this._children[e]},f.prototype.hasChild=function(e){return e in this._children},f.prototype.update=function(e){this._rawModule.namespaced=e.namespaced,e.actions&&(this._rawModule.actions=e.actions),e.mutations&&(this._rawModule.mutations=e.mutations),e.getters&&(this._rawModule.getters=e.getters)},f.prototype.forEachChild=function(e){o(this._children,e)},f.prototype.forEachGetter=function(e){this._rawModule.getters&&o(this._rawModule.getters,e)},f.prototype.forEachAction=function(e){this._rawModule.actions&&o(this._rawModule.actions,e)},f.prototype.forEachMutation=function(e){this._rawModule.mutations&&o(this._rawModule.mutations,e)},Object.defineProperties(f.prototype,h);var b=function(e){this.register([],e,!1)};function p(e,t,a){if(w(e,a),t.update(a),a.modules)for(var l in a.modules){if(!t.getChild(l))return void console.warn("[vuex] trying to add a new module '"+l+"' on hot reloading, manual reload is needed");p(e.concat(l),t.getChild(l),a.modules[l])}}b.prototype.get=function(e){return e.reduce((function(e,t){return e.getChild(t)}),this.root)},b.prototype.getNamespace=function(e){var t=this.root;return e.reduce((function(e,a){return t=t.getChild(a),e+(t.namespaced?a+"/":"")}),"")},b.prototype.update=function(e){p([],this.root,e)},b.prototype.register=function(e,t,a){var l=this;void 0===a&&(a=!0),w(e,t);var i=new f(t,a);if(0===e.length)this.root=i;else{var n=this.get(e.slice(0,-1));n.addChild(e[e.length-1],i)}t.modules&&o(t.modules,(function(t,i){l.register(e.concat(i),t,a)}))},b.prototype.unregister=function(e){var t=this.get(e.slice(0,-1)),a=e[e.length-1],l=t.getChild(a);l?l.runtime&&t.removeChild(a):console.warn("[vuex] trying to unregister module '"+a+"', which is not registered")},b.prototype.isRegistered=function(e){var t=this.get(e.slice(0,-1)),a=e[e.length-1];return!!t&&t.hasChild(a)};var g,y={assert:function(e){return"function"===typeof e},expected:"function"},m={assert:function(e){return"function"===typeof e||"object"===typeof e&&"function"===typeof e.handler},expected:'function or object with "handler" function'},_={getters:y,mutations:y,actions:m};function w(e,t){Object.keys(_).forEach((function(a){if(t[a]){var l=_[a];o(t[a],(function(t,i){c(l.assert(t),A(e,a,i,t,l.expected))}))}}))}function A(e,t,a,l,i){var n=t+" should be "+i+' but "'+t+"."+a+'"';return e.length>0&&(n+=' in module "'+e.join(".")+'"'),n+=" is "+JSON.stringify(l)+".",n}var x=function e(t){var a=this;void 0===t&&(t={}),!g&&"undefined"!==typeof window&&window.Vue&&M(window.Vue),c(g,"must call Vue.use(Vuex) before creating a store instance."),c("undefined"!==typeof Promise,"vuex requires a Promise polyfill in this browser."),c(this instanceof e,"store must be called with the new operator.");var l=t.plugins;void 0===l&&(l=[]);var i=t.strict;void 0===i&&(i=!1),this._committing=!1,this._actions=Object.create(null),this._actionSubscribers=[],this._mutations=Object.create(null),this._wrappedGetters=Object.create(null),this._modules=new b(t),this._modulesNamespaceMap=Object.create(null),this._subscribers=[],this._watcherVM=new g,this._makeLocalGettersCache=Object.create(null);var r=this,u=this,o=u.dispatch,s=u.commit;this.dispatch=function(e,t){return o.call(r,e,t)},this.commit=function(e,t,a){return s.call(r,e,t,a)},this.strict=i;var d=this._modules.root.state;T(this,d,[],this._modules.root),E(this,d),l.forEach((function(e){return e(a)}));var v=void 0!==t.devtools?t.devtools:g.config.devtools;v&&n(this)},S={state:{configurable:!0}};function k(e,t,a){return t.indexOf(e)<0&&(a&&a.prepend?t.unshift(e):t.push(e)),function(){var a=t.indexOf(e);a>-1&&t.splice(a,1)}}function O(e,t){e._actions=Object.create(null),e._mutations=Object.create(null),e._wrappedGetters=Object.create(null),e._modulesNamespaceMap=Object.create(null);var a=e.state;T(e,a,[],e._modules.root,!0),E(e,a,t)}function E(e,t,a){var l=e._vm;e.getters={},e._makeLocalGettersCache=Object.create(null);var i=e._wrappedGetters,n={};o(i,(function(t,a){n[a]=v(t,e),Object.defineProperty(e.getters,a,{get:function(){return e._vm[a]},enumerable:!0})}));var r=g.config.silent;g.config.silent=!0,e._vm=new g({data:{$$state:t},computed:n}),g.config.silent=r,e.strict&&L(e),l&&(a&&e._withCommit((function(){l._data.$$state=null})),g.nextTick((function(){return l.$destroy()})))}function T(e,t,a,l,i){var n=!a.length,r=e._modules.getNamespace(a);if(l.namespaced&&(e._modulesNamespaceMap[r]&&console.error("[vuex] duplicate namespace "+r+" for the namespaced module "+a.join("/")),e._modulesNamespaceMap[r]=l),!n&&!i){var u=j(t,a.slice(0,-1)),o=a[a.length-1];e._withCommit((function(){o in u&&console.warn('[vuex] state field "'+o+'" was overridden by a module with the same name at "'+a.join(".")+'"'),g.set(u,o,l.state)}))}var s=l.context=C(e,r,a);l.forEachMutation((function(t,a){var l=r+a;P(e,l,t,s)})),l.forEachAction((function(t,a){var l=t.root?a:r+a,i=t.handler||t;D(e,l,i,s)})),l.forEachGetter((function(t,a){var l=r+a;R(e,l,t,s)})),l.forEachChild((function(l,n){T(e,t,a.concat(n),l,i)}))}function C(e,t,a){var l=""===t,i={dispatch:l?e.dispatch:function(a,l,i){var n=N(a,l,i),r=n.payload,u=n.options,o=n.type;if(u&&u.root||(o=t+o,e._actions[o]))return e.dispatch(o,r);console.error("[vuex] unknown local action type: "+n.type+", global type: "+o)},commit:l?e.commit:function(a,l,i){var n=N(a,l,i),r=n.payload,u=n.options,o=n.type;u&&u.root||(o=t+o,e._mutations[o])?e.commit(o,r,u):console.error("[vuex] unknown local mutation type: "+n.type+", global type: "+o)}};return Object.defineProperties(i,{getters:{get:l?function(){return e.getters}:function(){return I(e,t)}},state:{get:function(){return j(e.state,a)}}}),i}function I(e,t){if(!e._makeLocalGettersCache[t]){var a={},l=t.length;Object.keys(e.getters).forEach((function(i){if(i.slice(0,l)===t){var n=i.slice(l);Object.defineProperty(a,n,{get:function(){return e.getters[i]},enumerable:!0})}})),e._makeLocalGettersCache[t]=a}return e._makeLocalGettersCache[t]}function P(e,t,a,l){var i=e._mutations[t]||(e._mutations[t]=[]);i.push((function(t){a.call(e,l.state,t)}))}function D(e,t,a,l){var i=e._actions[t]||(e._actions[t]=[]);i.push((function(t){var i=a.call(e,{dispatch:l.dispatch,commit:l.commit,getters:l.getters,state:l.state,rootGetters:e.getters,rootState:e.state},t);return d(i)||(i=Promise.resolve(i)),e._devtoolHook?i.catch((function(t){throw e._devtoolHook.emit("vuex:error",t),t})):i}))}function R(e,t,a,l){e._wrappedGetters[t]?console.error("[vuex] duplicate getter key: "+t):e._wrappedGetters[t]=function(e){return a(l.state,l.getters,e.state,e.getters)}}function L(e){e._vm.$watch((function(){return this._data.$$state}),(function(){c(e._committing,"do not mutate vuex store state outside mutation handlers.")}),{deep:!0,sync:!0})}function j(e,t){return t.reduce((function(e,t){return e[t]}),e)}function N(e,t,a){return s(e)&&e.type&&(a=t,t=e,e=e.type),c("string"===typeof e,"expects string as the type, but found "+typeof e+"."),{type:e,payload:t,options:a}}function M(e){g&&e===g?console.error("[vuex] already installed. Vue.use(Vuex) should be called only once."):(g=e,a(g))}S.state.get=function(){return this._vm._data.$$state},S.state.set=function(e){c(!1,"use store.replaceState() to explicit replace store state.")},x.prototype.commit=function(e,t,a){var l=this,i=N(e,t,a),n=i.type,r=i.payload,u=i.options,o={type:n,payload:r},s=this._mutations[n];s?(this._withCommit((function(){s.forEach((function(e){e(r)}))})),this._subscribers.slice().forEach((function(e){return e(o,l.state)})),u&&u.silent&&console.warn("[vuex] mutation type: "+n+". Silent option has been removed. Use the filter functionality in the vue-devtools")):console.error("[vuex] unknown mutation type: "+n)},x.prototype.dispatch=function(e,t){var a=this,l=N(e,t),i=l.type,n=l.payload,r={type:i,payload:n},u=this._actions[i];if(u){try{this._actionSubscribers.slice().filter((function(e){return e.before})).forEach((function(e){return e.before(r,a.state)}))}catch(s){console.warn("[vuex] error in before action subscribers: "),console.error(s)}var o=u.length>1?Promise.all(u.map((function(e){return e(n)}))):u[0](n);return new Promise((function(e,t){o.then((function(t){try{a._actionSubscribers.filter((function(e){return e.after})).forEach((function(e){return e.after(r,a.state)}))}catch(s){console.warn("[vuex] error in after action subscribers: "),console.error(s)}e(t)}),(function(e){try{a._actionSubscribers.filter((function(e){return e.error})).forEach((function(t){return t.error(r,a.state,e)}))}catch(s){console.warn("[vuex] error in error action subscribers: "),console.error(s)}t(e)}))}))}console.error("[vuex] unknown action type: "+i)},x.prototype.subscribe=function(e,t){return k(e,this._subscribers,t)},x.prototype.subscribeAction=function(e,t){var a="function"===typeof e?{before:e}:e;return k(a,this._actionSubscribers,t)},x.prototype.watch=function(e,t,a){var l=this;return c("function"===typeof e,"store.watch only accepts a function."),this._watcherVM.$watch((function(){return e(l.state,l.getters)}),t,a)},x.prototype.replaceState=function(e){var t=this;this._withCommit((function(){t._vm._data.$$state=e}))},x.prototype.registerModule=function(e,t,a){void 0===a&&(a={}),"string"===typeof e&&(e=[e]),c(Array.isArray(e),"module path must be a string or an Array."),c(e.length>0,"cannot register the root module by using registerModule."),this._modules.register(e,t),T(this,this.state,e,this._modules.get(e),a.preserveState),E(this,this.state)},x.prototype.unregisterModule=function(e){var t=this;"string"===typeof e&&(e=[e]),c(Array.isArray(e),"module path must be a string or an Array."),this._modules.unregister(e),this._withCommit((function(){var a=j(t.state,e.slice(0,-1));g.delete(a,e[e.length-1])})),O(this)},x.prototype.hasModule=function(e){return"string"===typeof e&&(e=[e]),c(Array.isArray(e),"module path must be a string or an Array."),this._modules.isRegistered(e)},x.prototype[[104,111,116,85,112,100,97,116,101].map((function(e){return String.fromCharCode(e)})).join("")]=function(e){this._modules.update(e),O(this,!0)},x.prototype._withCommit=function(e){var t=this._committing;this._committing=!0,e(),this._committing=t},Object.defineProperties(x.prototype,S);var U=H((function(e,t){var a={};return q(t)||console.error("[vuex] mapState: mapper parameter must be either an Array or an Object"),K(t).forEach((function(t){var l=t.key,i=t.val;a[l]=function(){var t=this.$store.state,a=this.$store.getters;if(e){var l=G(this.$store,"mapState",e);if(!l)return;t=l.context.state,a=l.context.getters}return"function"===typeof i?i.call(this,t,a):t[i]},a[l].vuex=!0})),a})),B=H((function(e,t){var a={};return q(t)||console.error("[vuex] mapMutations: mapper parameter must be either an Array or an Object"),K(t).forEach((function(t){var l=t.key,i=t.val;a[l]=function(){var t=[],a=arguments.length;while(a--)t[a]=arguments[a];var l=this.$store.commit;if(e){var n=G(this.$store,"mapMutations",e);if(!n)return;l=n.context.commit}return"function"===typeof i?i.apply(this,[l].concat(t)):l.apply(this.$store,[i].concat(t))}})),a})),F=H((function(e,t){var a={};return q(t)||console.error("[vuex] mapGetters: mapper parameter must be either an Array or an Object"),K(t).forEach((function(t){var l=t.key,i=t.val;i=e+i,a[l]=function(){if(!e||G(this.$store,"mapGetters",e)){if(i in this.$store.getters)return this.$store.getters[i];console.error("[vuex] unknown getter: "+i)}},a[l].vuex=!0})),a})),V=H((function(e,t){var a={};return q(t)||console.error("[vuex] mapActions: mapper parameter must be either an Array or an Object"),K(t).forEach((function(t){var l=t.key,i=t.val;a[l]=function(){var t=[],a=arguments.length;while(a--)t[a]=arguments[a];var l=this.$store.dispatch;if(e){var n=G(this.$store,"mapActions",e);if(!n)return;l=n.context.dispatch}return"function"===typeof i?i.apply(this,[l].concat(t)):l.apply(this.$store,[i].concat(t))}})),a})),$=function(e){return{mapState:U.bind(null,e),mapGetters:F.bind(null,e),mapMutations:B.bind(null,e),mapActions:V.bind(null,e)}};function K(e){return q(e)?Array.isArray(e)?e.map((function(e){return{key:e,val:e}})):Object.keys(e).map((function(t){return{key:t,val:e[t]}})):[]}function q(e){return Array.isArray(e)||s(e)}function H(e){return function(t,a){return"string"!==typeof t?(a=t,t=""):"/"!==t.charAt(t.length-1)&&(t+="/"),e(t,a)}}function G(e,t,a){var l=e._modulesNamespaceMap[a];return l||console.error("[vuex] module namespace not found in "+t+"(): "+a),l}function W(e){void 0===e&&(e={});var t=e.collapsed;void 0===t&&(t=!0);var a=e.filter;void 0===a&&(a=function(e,t,a){return!0});var l=e.transformer;void 0===l&&(l=function(e){return e});var i=e.mutationTransformer;void 0===i&&(i=function(e){return e});var n=e.actionFilter;void 0===n&&(n=function(e,t){return!0});var r=e.actionTransformer;void 0===r&&(r=function(e){return e});var o=e.logMutations;void 0===o&&(o=!0);var s=e.logActions;void 0===s&&(s=!0);var d=e.logger;return void 0===d&&(d=console),function(e){var c=u(e.state);"undefined"!==typeof d&&(o&&e.subscribe((function(e,n){var r=u(n);if(a(e,c,r)){var o=Z(),s=i(e),v="mutation "+e.type+o;z(d,v,t),d.log("%c prev state","color: #9E9E9E; font-weight: bold",l(c)),d.log("%c mutation","color: #03A9F4; font-weight: bold",s),d.log("%c next state","color: #4CAF50; font-weight: bold",l(r)),J(d)}c=r})),s&&e.subscribeAction((function(e,a){if(n(e,a)){var l=Z(),i=r(e),u="action "+e.type+l;z(d,u,t),d.log("%c action","color: #03A9F4; font-weight: bold",i),J(d)}})))}}function z(e,t,a){var l=a?e.groupCollapsed:e.group;try{l.call(e,t)}catch(i){e.log(t)}}function J(e){try{e.groupEnd()}catch(t){e.log("—— log end ——")}}function Z(){var e=new Date;return" @ "+Q(e.getHours(),2)+":"+Q(e.getMinutes(),2)+":"+Q(e.getSeconds(),2)+"."+Q(e.getMilliseconds(),3)}function Y(e,t){return new Array(t+1).join(e)}function Q(e,t){return Y("0",t-e.toString().length)+e}var X={Store:x,install:M,version:"3.6.2",mapState:U,mapMutations:B,mapGetters:F,mapActions:V,createNamespacedHelpers:$,createLogger:W};e.exports=X}).call(this,a(3))},35:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.uploadFile=t.submitWithdrawal=t.payOrder=t.getWorkerOrderList=t.getWithdrawalList=t.getUserRegister=t.getUserOrderList=t.getUserOrderDetail=t.getUserInfo=t.getUserCouponList=t.getUserCity=t.getUploadType=t.getUpdateUserInfo=t.getTicket=t.getTeamUserList=t.getStoreCouponList=t.getRichTextContent=t.getReceiveNewUserCoupon=t.getReceiveCoupon=t.getPromoterMsg=t.getPromoterCompanyList=t.getPhoneNumber=t.getPhoneCode=t.getNewUserCouponList=t.getMoneyLogList=t.getLoginAndRegister=t.getIndexGoodsTypeList=t.getHotKeyWords=t.getHotCity=t.getGoodsTypeList=t.getGoodsList=t.getGoodsDetail=t.getConfig=t.getCarList=t.getBannerList=t.getBankList=t.getAreasByLocation=t.getAreas=t.getAddressList=t.findStore=t.evaluateOrder=t.editCarGoods=t.editBank=t.editAddresst=t.deleteOrder=t.deleteBank=t.deleteAddress=t.delCarGoods=t.createOrder=t.computeOrderPrice=t.arriveOrder=t.applyAfterSale=t.addCar=t.acceptOrder=void 0;var l=a(36),i="https://flower.api.sczhiyun.net",n={GETAREAS:i+"/factory_system/Base/getAreas",GETAREAS_BYLOACTION:i+"/factory_system/Base/getAreasByLocation",PHONE_NUMBER:i+"/factory_system/Base/getWechatPhoneNumber",USER_REGISTER:i+"/factory_system/Base/wechatUserRegister",VERIFY_CODE:i+"",FILE_TICKET:i+"/factory_storage/Ticket/getTicket",FILE_CONFIG:i+"/factory_storage/File/getUploadType",FILE_UPLOAD:i+"/factory_storage/File/uploadFile",COPON_NEWUSER_LIST:i+"/beverage/Coupon/getNewUserCouponList",STORE_COPIN_LIST:i+"/beverage/Coupon/getStoreCouponList",COPON_RECEIVE:i+"/beverage/UserCoupon/receiveCoupon",COPON_RECEIVE_NEW:i+"/beverage/UserCoupon/receiveNewUserCoupon",COPON_USER_LIST:i+"/beverage/UserCoupon/getUserCouponList",CONFIG:i+"/beverage/Setting/getConfig",TEXT_CONTENT:i+"/beverage/Setting/getRichTextContent",BANNER_LIST:i+"/beverage/Banner/getBannerList",GET_HOTCITY:i+"/beverage/Setting/getHotCity",GET_USER_CITY:i+"/beverage/Setting/getUserCity",HOTKEY_WORDS:i+"/beverage/Setting/getHotKeyWords",STORE_FIND_STORE:i+"/beverage/Store/findStore",GOODS_TYPE_LIST:i+"/beverage/GoodsType/getIndexGoodsTypeList",GET_GOODS_TYPE_LIST:i+"/beverage/GoodsType/getGoodsTypeList",GOODS_LIST:i+"/beverage/Goods/getGoodsList",GOODS_DETAILS:i+"/beverage/Goods/getGoodsDetail",LOGIN_AND_REGISTER:i+"/beverage/User/loginAndRegister",EDIT_USERINFO:i+"/beverage/User/updateUserInfo",USER_INFO:i+"/accompany/User/getUserInfo",EDIT_ADDRESS:i+"/beverage/Address/editAddresst",ADDRESS_LIST:i+"/beverage/Address/getAddressList",DEL_ADDRESS:i+"/beverage/Address/deleteAddress",EDIT_BANK:i+"/beverage/Bank/editBank",BANK_LIST:i+"/beverage/Bank/getBankList",DEL_BANK:i+"/beverage/Bank/deleteBank",COMPANY_LIST:i+"/beverage/Company/getPromoterCompanyList",PROMOTER_MSG:i+"/beverage/User/getPromoterMsg",TEAM_USER_LIST:i+"/beverage/User/getTeamUserList",SUBMIT_WITHDRAWAL:i+"/beverage/Withdrawal/submitWithdrawal",WITHDRAWAL_LIST:i+"/beverage/Withdrawal/getWithdrawalList",MONEY_LOG_LIST:i+"/beverage/MoneyLog/getMoneyLogList",CAR_ADDCAR:i+"/beverage/Car/addCar",GET_CAR_LIST:i+"/beverage/Car/getCarList",EDIT_CARGOODS:i+"/beverage/Car/editCarGoods",DEL_CARGOODS:i+"/beverage/Car/deleteCarGoods",CMPUT_PRICE:i+"/beverage/Order/computeOrderPrice",CREATED_ORDER:i+"/beverage/Order/createOrder",USER_ORDER_LIST:i+"/beverage/Order/getUserOrderList",USER_ORDER_DETAILS:i+"/beverage/Order/getUserOrderDetail",CANCEL_ORDER:i+"/beverage/Order/deleteOrder",PAY_ORDER:i+"/beverage/Order/payOrder",APPLY_AFTER_SALE:i+"/beverage/Order/applyAfterSale",EVALUAT_ORDER:i+"/beverage/Order/evaluateOrder",WORKER_ORDER_LIST:i+"/beverage/Order/getWorkerOrderList",ACCEPT_ORDER:i+"/beverage/Order/acceptOrder",ARRIVE_ORDER:i+"/beverage/Order/arriveOrder"},r=function(e){return(0,l.post)(n.FILE_TICKET,e)};t.getTicket=r;var u=function(e){return(0,l.post)(n.FILE_CONFIG,e)};t.getUploadType=u;var o=function(e){return(0,l.post)(n.FILE_UPLOAD,e)};t.uploadFile=o;var s=function(e){return(0,l.post)(n.WORKER_ORDER_LIST,e)};t.getWorkerOrderList=s;var d=function(e){return(0,l.post)(n.ACCEPT_ORDER,e)};t.acceptOrder=d;var c=function(e){return(0,l.post)(n.ARRIVE_ORDER,e)};t.arriveOrder=c;var v=function(e){return(0,l.post)(n.CAR_ADDCAR,e)};t.addCar=v;var f=function(e){return(0,l.post)(n.GET_CAR_LIST,e)};t.getCarList=f;var h=function(e){return(0,l.post)(n.EDIT_CARGOODS,e)};t.editCarGoods=h;var b=function(e){return(0,l.post)(n.DEL_CARGOODS,e)};t.delCarGoods=b;var p=function(e){return(0,l.post)(n.CMPUT_PRICE,e)};t.computeOrderPrice=p;var g=function(e){return(0,l.post)(n.CREATED_ORDER,e)};t.createOrder=g;var y=function(e){return(0,l.post)(n.USER_ORDER_LIST,e)};t.getUserOrderList=y;var m=function(e){return(0,l.post)(n.USER_ORDER_DETAILS,e)};t.getUserOrderDetail=m;var _=function(e){return(0,l.post)(n.CANCEL_ORDER,e)};t.deleteOrder=_;var w=function(e){return(0,l.post)(n.PAY_ORDER,e)};t.payOrder=w;var A=function(e){return(0,l.post)(n.APPLY_AFTER_SALE,e)};t.applyAfterSale=A;var x=function(e){return(0,l.post)(n.EVALUAT_ORDER,e)};t.evaluateOrder=x;var S=function(e){return(0,l.post)(n.WITHDRAWAL_LIST,e)};t.getWithdrawalList=S;var k=function(e){return(0,l.post)(n.MONEY_LOG_LIST,e)};t.getMoneyLogList=k;var O=function(e){return(0,l.post)(n.SUBMIT_WITHDRAWAL,e)};t.submitWithdrawal=O;var E=function(e){return(0,l.post)(n.TEAM_USER_LIST,e)};t.getTeamUserList=E;var T=function(e){return(0,l.post)(n.COMPANY_LIST,e)};t.getPromoterCompanyList=T;var C=function(e){return(0,l.post)(n.PROMOTER_MSG,e)};t.getPromoterMsg=C;var I=function(e){return(0,l.post)(n.EDIT_BANK,e)};t.editBank=I;var P=function(e){return(0,l.post)(n.BANK_LIST,e)};t.getBankList=P;var D=function(e){return(0,l.post)(n.DEL_BANK,e)};t.deleteBank=D;var R=function(e){return(0,l.post)(n.LOGIN_AND_REGISTER,e)};t.getLoginAndRegister=R;var L=function(e){return(0,l.post)(n.EDIT_USERINFO,e)};t.getUpdateUserInfo=L;var j=function(e){return(0,l.post)(n.USER_INFO,e)};t.getUserInfo=j;var N=function(e){return(0,l.post)(n.EDIT_ADDRESS,e)};t.editAddresst=N;var M=function(e){return(0,l.post)(n.ADDRESS_LIST,e)};t.getAddressList=M;var U=function(e){return(0,l.post)(n.DEL_ADDRESS,e)};t.deleteAddress=U;var B=function(e){return(0,l.post)(n.GOODS_TYPE_LIST,e)};t.getIndexGoodsTypeList=B;var F=function(e){return(0,l.post)(n.GET_GOODS_TYPE_LIST,e)};t.getGoodsTypeList=F;var V=function(e){return(0,l.post)(n.GOODS_LIST,e)};t.getGoodsList=V;var $=function(e){return(0,l.post)(n.GOODS_DETAILS,e)};t.getGoodsDetail=$;var K=function(e){return(0,l.post)(n.CONFIG,e)};t.getConfig=K;var q=function(e){return(0,l.post)(n.TEXT_CONTENT,e)};t.getRichTextContent=q;var H=function(e){return(0,l.post)(n.BANNER_LIST,e)};t.getBannerList=H;var G=function(e){return(0,l.post)(n.GET_HOTCITY,e)};t.getHotCity=G;var W=function(e){return(0,l.post)(n.GET_USER_CITY,e)};t.getUserCity=W;var z=function(e){return(0,l.post)(n.HOTKEY_WORDS,e)};t.getHotKeyWords=z;var J=function(e){return(0,l.post)(n.STORE_FIND_STORE,e)};t.findStore=J;var Z=function(e){return(0,l.post)(n.COPON_NEWUSER_LIST,e)};t.getNewUserCouponList=Z;var Y=function(e){return(0,l.post)(n.STORE_COPIN_LIST,e)};t.getStoreCouponList=Y;var Q=function(e){return(0,l.post)(n.COPON_RECEIVE,e)};t.getReceiveCoupon=Q;var X=function(e){return(0,l.post)(n.COPON_RECEIVE_NEW,e)};t.getReceiveNewUserCoupon=X;var ee=function(e){return(0,l.post)(n.COPON_USER_LIST,e)};t.getUserCouponList=ee;var te=function(e){return(0,l.post)(n.GETAREAS,e)};t.getAreas=te;var ae=function(e){return(0,l.post)(n.GETAREAS_BYLOACTION,e)};t.getAreasByLocation=ae;var le=function(e){return(0,l.post)(n.PHONE_NUMBER,e)};t.getPhoneNumber=le;var ie=function(e){return(0,l.post)(n.USER_REGISTER,e)};t.getUserRegister=ie;var ne=function(e){return(0,l.post)(n.VERIFY_CODE,e)};t.getPhoneCode=ne},36:function(e,t,a){"use strict";(function(e){var l=a(4);Object.defineProperty(t,"__esModule",{value:!0}),t.post=t.get=void 0;var i=l(a(11));function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,l)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){(0,i.default)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var u=function(t){return t.interceptRequest&&(t=t.interceptRequest(t)),e.showLoading({title:"加载中"}),new Promise((function(a,l){e.request(r(r({},t),{},{success:function(l){if(e.hideLoading(),t.interceptResponse){var i=t.interceptResponse(l);if(i)return void a(i)}a(l)},fail:function(t){e.hideLoading(),l(t)}}))}))},o=function(t){var a=e.getStorageSync("token");return t.header=r(r({},t.header),{},{Authorization:a}),t},s=function(t){var a=t.data,l=a.code,i=a.messgage;if(200===t.statusCode)return t;switch(Number(l)){case 999:return e.showToast({icon:"error",title:i,duration:2e3}),t;case 3:return e.showToast({icon:"error",title:i,duration:2e3}),null;case 2:return e.showToast({icon:"error",title:i,duration:2e3}),null;case 1:return e.redirectTo({url:"/pages/sonView/login/index"}),null;case 0:return e.showToast({icon:"error",title:i,duration:2e3}),null;default:return t}return t},d=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return u(r({url:e,data:t,method:"GET",interceptRequest:o,interceptResponse:s},a))};t.get=d;var c=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return u(r({url:e,data:t,method:"POST",interceptRequest:o,interceptResponse:s},a))};t.post=c}).call(this,a(2)["default"])},382:function(e,t,a){"use strict";(function(e){var l=a(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=l(a(384)),n=l(a(13)),r=l(a(387)),u={props:{localdata:{type:[Array,Object],default:function(){return[]}},spaceInfo:{type:Object,default:function(){return{}}},collection:{type:String,default:""},action:{type:String,default:""},field:{type:String,default:""},orderby:{type:String,default:""},where:{type:[String,Object],default:""},pageData:{type:String,default:"add"},pageCurrent:{type:Number,default:1},pageSize:{type:Number,default:500},getcount:{type:[Boolean,String],default:!1},getone:{type:[Boolean,String],default:!1},gettree:{type:[Boolean,String],default:!1},manual:{type:Boolean,default:!1},value:{type:[Array,String,Number],default:function(){return[]}},modelValue:{type:[Array,String,Number],default:function(){return[]}},preload:{type:Boolean,default:!1},stepSearh:{type:Boolean,default:!0},selfField:{type:String,default:""},parentField:{type:String,default:""},multiple:{type:Boolean,default:!1},map:{type:Object,default:function(){return{text:"text",value:"value"}}}},data:function(){return{loading:!1,errorMessage:"",loadMore:{contentdown:"",contentrefresh:"",contentnomore:""},dataList:[],selected:[],selectedIndex:0,page:{current:this.pageCurrent,size:this.pageSize,count:0}}},computed:{isLocalData:function(){return!this.collection.length},isCloudData:function(){return this.collection.length>0},isCloudDataList:function(){return this.isCloudData&&!this.parentField&&!this.selfField},isCloudDataTree:function(){return this.isCloudData&&this.parentField&&this.selfField},dataValue:function(){var e=Array.isArray(this.modelValue)?this.modelValue.length>0:null!==this.modelValue||void 0!==this.modelValue;return e?this.modelValue:this.value},hasValue:function(){return"number"===typeof this.dataValue||null!=this.dataValue&&this.dataValue.length>0}},created:function(){var e=this;this.$watch((function(){var t=[];return["pageCurrent","pageSize","spaceInfo","value","modelValue","localdata","collection","action","field","orderby","where","getont","getcount","gettree"].forEach((function(a){t.push(e[a])})),t}),(function(t,a){for(var l=2;l<t.length;l++)if(t[l]!=a[l]){!0;break}t[0]!=a[0]&&(e.page.current=e.pageCurrent),e.page.size=e.pageSize,e.onPropsChange()})),this._treeData=[]},methods:{onPropsChange:function(){this._treeData=[]},loadData:function(){var e=this;return(0,r.default)(i.default.mark((function t(){return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.isLocalData?e.loadLocalData():e.isCloudDataList?e.loadCloudDataList():e.isCloudDataTree&&e.loadCloudDataTree();case 1:case"end":return t.stop()}}),t)})))()},loadLocalData:function(){var e=this;return(0,r.default)(i.default.mark((function t(){var a;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e._treeData=[],e._extractTree(e.localdata,e._treeData),a=e.dataValue,void 0!==a){t.next=5;break}return t.abrupt("return");case 5:Array.isArray(a)&&(a=a[a.length-1],"object"===(0,n.default)(a)&&a[e.map.value]&&(a=a[e.map.value])),e.selected=e._findNodePath(a,e.localdata);case 7:case"end":return t.stop()}}),t)})))()},loadCloudDataList:function(){var e=this;return(0,r.default)(i.default.mark((function t(){var a,l;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.loading){t.next=2;break}return t.abrupt("return");case 2:return e.loading=!0,t.prev=3,t.next=6,e.getCommand();case 6:a=t.sent,l=a.result.data,e._treeData=l,e._updateBindData(),e._updateSelected(),e.onDataChange(),t.next=17;break;case 14:t.prev=14,t.t0=t["catch"](3),e.errorMessage=t.t0;case 17:return t.prev=17,e.loading=!1,t.finish(17);case 20:case"end":return t.stop()}}),t,null,[[3,14,17,20]])})))()},loadCloudDataTree:function(){var e=this;return(0,r.default)(i.default.mark((function t(){var a,l,n;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.loading){t.next=2;break}return t.abrupt("return");case 2:return e.loading=!0,t.prev=3,a={field:e._cloudDataPostField(),where:e._cloudDataTreeWhere()},e.gettree&&(a.startwith="".concat(e.selfField,"=='").concat(e.dataValue,"'")),t.next=8,e.getCommand(a);case 8:l=t.sent,n=l.result.data,e._treeData=n,e._updateBindData(),e._updateSelected(),e.onDataChange(),t.next=19;break;case 16:t.prev=16,t.t0=t["catch"](3),e.errorMessage=t.t0;case 19:return t.prev=19,e.loading=!1,t.finish(19);case 22:case"end":return t.stop()}}),t,null,[[3,16,19,22]])})))()},loadCloudDataNode:function(e){var t=this;return(0,r.default)(i.default.mark((function a(){var l,n,r;return i.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!t.loading){a.next=2;break}return a.abrupt("return");case 2:return t.loading=!0,a.prev=3,l={field:t._cloudDataPostField(),where:t._cloudDataNodeWhere()},a.next=7,t.getCommand(l);case 7:n=a.sent,r=n.result.data,e(r),a.next=15;break;case 12:a.prev=12,a.t0=a["catch"](3),t.errorMessage=a.t0;case 15:return a.prev=15,t.loading=!1,a.finish(15);case 18:case"end":return a.stop()}}),a,null,[[3,12,15,18]])})))()},getCloudDataValue:function(){return this.isCloudDataList?this.getCloudDataListValue():this.isCloudDataTree?this.getCloudDataTreeValue():void 0},getCloudDataListValue:function(){var e=this,t=[],a=this._getForeignKeyByField();return a&&t.push("".concat(a," == '").concat(this.dataValue,"'")),t=t.join(" || "),this.where&&(t="(".concat(this.where,") && (").concat(t,")")),this.getCommand({field:this._cloudDataPostField(),where:t}).then((function(t){return e.selected=t.result.data,t.result.data}))},getCloudDataTreeValue:function(){var e=this;return this.getCommand({field:this._cloudDataPostField(),getTreePath:{startWith:"".concat(this.selfField,"=='").concat(this.dataValue,"'")}}).then((function(t){var a=[];return e._extractTreePath(t.result.data,a),e.selected=a,a}))},getCommand:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=e.database(this.spaceInfo),l=t.action||this.action;l&&(a=a.action(l));var i=t.collection||this.collection;a=a.collection(i);var n=t.where||this.where;n&&Object.keys(n).length&&(a=a.where(n));var r=t.field||this.field;r&&(a=a.field(r));var u=t.orderby||this.orderby;u&&(a=a.orderBy(u));var o=void 0!==t.pageCurrent?t.pageCurrent:this.page.current,s=void 0!==t.pageSize?t.pageSize:this.page.size,d=void 0!==t.getcount?t.getcount:this.getcount,c=void 0!==t.gettree?t.gettree:this.gettree,v={getCount:d,getTree:c};return t.getTreePath&&(v.getTreePath=t.getTreePath),a=a.skip(s*(o-1)).limit(s).get(v),a},_cloudDataPostField:function(){var e=[this.field];return this.parentField&&e.push("".concat(this.parentField," as parent_value")),e.join(",")},_cloudDataTreeWhere:function(){var e=[],t=this.selected,a=this.parentField;if(a&&e.push("".concat(a," == null || ").concat(a,' == ""')),t.length)for(var l=0;l<t.length-1;l++)e.push("".concat(a," == '").concat(t[l].value,"'"));var i=[];return this.where&&i.push("(".concat(this.where,")")),e.length&&i.push("(".concat(e.join(" || "),")")),i.join(" && ")},_cloudDataNodeWhere:function(){var e=[],t=this.selected;return t.length&&e.push("".concat(this.parentField," == '").concat(t[t.length-1].value,"'")),e=e.join(" || "),this.where?"(".concat(this.where,") && (").concat(e,")"):e},_getWhereByForeignKey:function(){var e=[],t=this._getForeignKeyByField();return t&&e.push("".concat(t," == '").concat(this.dataValue,"'")),this.where?"(".concat(this.where,") && (").concat(e.join(" || "),")"):e.join(" || ")},_getForeignKeyByField:function(){for(var e=this.field.split(","),t=null,a=0;a<e.length;a++){var l=e[a].split("as");if(!(l.length<2)&&"value"===l[1].trim()){t=l[0].trim();break}}return t},_updateBindData:function(e){var t=this._filterData(this._treeData,this.selected),a=t.dataList,l=t.hasNodes,i=!1===this._stepSearh&&!l;return e&&(e.isleaf=i),this.dataList=a,this.selectedIndex=a.length-1,!i&&this.selected.length<a.length&&this.selected.push({value:null,text:"请选择"}),{isleaf:i,hasNodes:l}},_updateSelected:function(){for(var e=this.dataList,t=this.selected,a=this.map.text,l=this.map.value,i=0;i<t.length;i++)for(var n=t[i].value,r=e[i],u=0;u<r.length;u++){var o=r[u];if(o[l]===n){t[i].text=o[a];break}}},_filterData:function(e,t){var a=[],l=!0;a.push(e.filter((function(e){return null===e.parent_value||void 0===e.parent_value||""===e.parent_value})));for(var i=function(i){var n=t[i].value,r=e.filter((function(e){return e.parent_value===n}));r.length?a.push(r):l=!1},n=0;n<t.length;n++)i(n);return{dataList:a,hasNodes:l}},_extractTree:function(e,t,a){for(var l=this.map.value,i=0;i<e.length;i++){var n=e[i],r={};for(var u in n)"children"!==u&&(r[u]=n[u]);null!==a&&void 0!==a&&""!==a&&(r.parent_value=a),t.push(r);var o=n.children;o&&this._extractTree(o,t,n[l])}},_extractTreePath:function(e,t){for(var a=0;a<e.length;a++){var l=e[a],i={};for(var n in l)"children"!==n&&(i[n]=l[n]);t.push(i);var r=l.children;r&&this._extractTreePath(r,t)}},_findNodePath:function(e,t){for(var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],l=this.map.text,i=this.map.value,n=0;n<t.length;n++){var r=t[n],u=r.children,o=r[l],s=r[i];if(a.push({value:s,text:o}),s===e)return a;if(u){var d=this._findNodePath(e,u,a);if(d.length)return d}a.pop()}return[]}}};t.default=u}).call(this,a(383)["default"])},383:function(e,t,a){"use strict";(function(e,l,i){var n=a(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(384)),u=n(a(386)),o=n(a(5)),s=n(a(13)),d=n(a(18)),c=n(a(387)),v=n(a(11)),f=n(a(388)),h=n(a(389)),b=n(a(390)),p=n(a(391)),g=n(a(23)),y=n(a(24)),m=n(a(393));function _(e,t){var a="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!a){if(Array.isArray(e)||(a=w(e))||t&&e&&"number"===typeof e.length){a&&(e=a);var l=0,i=function(){};return{s:i,n:function(){return l>=e.length?{done:!0}:{done:!1,value:e[l++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,r=!0,u=!1;return{s:function(){a=a.call(e)},n:function(){var e=a.next();return r=e.done,e},e:function(e){u=!0,n=e},f:function(){try{r||null==a.return||a.return()}finally{if(u)throw n}}}}function w(e,t){if(e){if("string"===typeof e)return A(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?A(e,t):void 0}}function A(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,l=new Array(t);a<t;a++)l[a]=e[a];return l}function x(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,l)}return a}function S(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?x(Object(a),!0).forEach((function(t){(0,v.default)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):x(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function k(e){var t=O();return function(){var a,l=(0,b.default)(e);if(t){var i=(0,b.default)(this).constructor;a=Reflect.construct(l,arguments,i)}else a=l.apply(this,arguments);return(0,h.default)(this,a)}}function O(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function E(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function T(e,t,a){return e(a={path:t,exports:{},require:function(e,t){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==t&&a.path)}},a.exports),a.exports}"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof e||"undefined"!=typeof self&&self;var C=T((function(e,t){var a;e.exports=(a=a||function(e,t){var a=Object.create||function(){function e(){}return function(t){var a;return e.prototype=t,a=new e,e.prototype=null,a}}(),l={},i=l.lib={},n=i.Base={extend:function(e){var t=a(this);return e&&t.mixIn(e),t.hasOwnProperty("init")&&this.init!==t.init||(t.init=function(){t.$super.init.apply(this,arguments)}),t.init.prototype=t,t.$super=this,t},create:function(){var e=this.extend();return e.init.apply(e,arguments),e},init:function(){},mixIn:function(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t]);e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}},r=i.WordArray=n.extend({init:function(e,a){e=this.words=e||[],this.sigBytes=a!=t?a:4*e.length},toString:function(e){return(e||o).stringify(this)},concat:function(e){var t=this.words,a=e.words,l=this.sigBytes,i=e.sigBytes;if(this.clamp(),l%4)for(var n=0;n<i;n++){var r=a[n>>>2]>>>24-n%4*8&255;t[l+n>>>2]|=r<<24-(l+n)%4*8}else for(n=0;n<i;n+=4)t[l+n>>>2]=a[n>>>2];return this.sigBytes+=i,this},clamp:function(){var t=this.words,a=this.sigBytes;t[a>>>2]&=4294967295<<32-a%4*8,t.length=e.ceil(a/4)},clone:function(){var e=n.clone.call(this);return e.words=this.words.slice(0),e},random:function(t){for(var a,l=[],i=function(t){t=t;var a=987654321,l=4294967295;return function(){var i=((a=36969*(65535&a)+(a>>16)&l)<<16)+(t=18e3*(65535&t)+(t>>16)&l)&l;return i/=4294967296,(i+=.5)*(e.random()>.5?1:-1)}},n=0;n<t;n+=4){var u=i(4294967296*(a||e.random()));a=987654071*u(),l.push(4294967296*u()|0)}return new r.init(l,t)}}),u=l.enc={},o=u.Hex={stringify:function(e){for(var t=e.words,a=e.sigBytes,l=[],i=0;i<a;i++){var n=t[i>>>2]>>>24-i%4*8&255;l.push((n>>>4).toString(16)),l.push((15&n).toString(16))}return l.join("")},parse:function(e){for(var t=e.length,a=[],l=0;l<t;l+=2)a[l>>>3]|=parseInt(e.substr(l,2),16)<<24-l%8*4;return new r.init(a,t/2)}},s=u.Latin1={stringify:function(e){for(var t=e.words,a=e.sigBytes,l=[],i=0;i<a;i++){var n=t[i>>>2]>>>24-i%4*8&255;l.push(String.fromCharCode(n))}return l.join("")},parse:function(e){for(var t=e.length,a=[],l=0;l<t;l++)a[l>>>2]|=(255&e.charCodeAt(l))<<24-l%4*8;return new r.init(a,t)}},d=u.Utf8={stringify:function(e){try{return decodeURIComponent(escape(s.stringify(e)))}catch(e){throw new Error("Malformed UTF-8 data")}},parse:function(e){return s.parse(unescape(encodeURIComponent(e)))}},c=i.BufferedBlockAlgorithm=n.extend({reset:function(){this._data=new r.init,this._nDataBytes=0},_append:function(e){"string"==typeof e&&(e=d.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function(t){var a=this._data,l=a.words,i=a.sigBytes,n=this.blockSize,u=i/(4*n),o=(u=t?e.ceil(u):e.max((0|u)-this._minBufferSize,0))*n,s=e.min(4*o,i);if(o){for(var d=0;d<o;d+=n)this._doProcessBlock(l,d);var c=l.splice(0,o);a.sigBytes-=s}return new r.init(c,s)},clone:function(){var e=n.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0});i.Hasher=c.extend({cfg:n.extend(),init:function(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function(){c.reset.call(this),this._doReset()},update:function(e){return this._append(e),this._process(),this},finalize:function(e){return e&&this._append(e),this._doFinalize()},blockSize:16,_createHelper:function(e){return function(t,a){return new e.init(a).finalize(t)}},_createHmacHelper:function(e){return function(t,a){return new v.HMAC.init(e,a).finalize(t)}}});var v=l.algo={};return l}(Math),a)})),I=C,P=(T((function(e,t){var a;e.exports=(a=I,function(e){var t=a,l=t.lib,i=l.WordArray,n=l.Hasher,r=t.algo,u=[];!function(){for(var t=0;t<64;t++)u[t]=4294967296*e.abs(e.sin(t+1))|0}();var o=r.MD5=n.extend({_doReset:function(){this._hash=new i.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(e,t){for(var a=0;a<16;a++){var l=t+a,i=e[l];e[l]=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8)}var n=this._hash.words,r=e[t+0],o=e[t+1],f=e[t+2],h=e[t+3],b=e[t+4],p=e[t+5],g=e[t+6],y=e[t+7],m=e[t+8],_=e[t+9],w=e[t+10],A=e[t+11],x=e[t+12],S=e[t+13],k=e[t+14],O=e[t+15],E=n[0],T=n[1],C=n[2],I=n[3];E=s(E,T,C,I,r,7,u[0]),I=s(I,E,T,C,o,12,u[1]),C=s(C,I,E,T,f,17,u[2]),T=s(T,C,I,E,h,22,u[3]),E=s(E,T,C,I,b,7,u[4]),I=s(I,E,T,C,p,12,u[5]),C=s(C,I,E,T,g,17,u[6]),T=s(T,C,I,E,y,22,u[7]),E=s(E,T,C,I,m,7,u[8]),I=s(I,E,T,C,_,12,u[9]),C=s(C,I,E,T,w,17,u[10]),T=s(T,C,I,E,A,22,u[11]),E=s(E,T,C,I,x,7,u[12]),I=s(I,E,T,C,S,12,u[13]),C=s(C,I,E,T,k,17,u[14]),E=d(E,T=s(T,C,I,E,O,22,u[15]),C,I,o,5,u[16]),I=d(I,E,T,C,g,9,u[17]),C=d(C,I,E,T,A,14,u[18]),T=d(T,C,I,E,r,20,u[19]),E=d(E,T,C,I,p,5,u[20]),I=d(I,E,T,C,w,9,u[21]),C=d(C,I,E,T,O,14,u[22]),T=d(T,C,I,E,b,20,u[23]),E=d(E,T,C,I,_,5,u[24]),I=d(I,E,T,C,k,9,u[25]),C=d(C,I,E,T,h,14,u[26]),T=d(T,C,I,E,m,20,u[27]),E=d(E,T,C,I,S,5,u[28]),I=d(I,E,T,C,f,9,u[29]),C=d(C,I,E,T,y,14,u[30]),E=c(E,T=d(T,C,I,E,x,20,u[31]),C,I,p,4,u[32]),I=c(I,E,T,C,m,11,u[33]),C=c(C,I,E,T,A,16,u[34]),T=c(T,C,I,E,k,23,u[35]),E=c(E,T,C,I,o,4,u[36]),I=c(I,E,T,C,b,11,u[37]),C=c(C,I,E,T,y,16,u[38]),T=c(T,C,I,E,w,23,u[39]),E=c(E,T,C,I,S,4,u[40]),I=c(I,E,T,C,r,11,u[41]),C=c(C,I,E,T,h,16,u[42]),T=c(T,C,I,E,g,23,u[43]),E=c(E,T,C,I,_,4,u[44]),I=c(I,E,T,C,x,11,u[45]),C=c(C,I,E,T,O,16,u[46]),E=v(E,T=c(T,C,I,E,f,23,u[47]),C,I,r,6,u[48]),I=v(I,E,T,C,y,10,u[49]),C=v(C,I,E,T,k,15,u[50]),T=v(T,C,I,E,p,21,u[51]),E=v(E,T,C,I,x,6,u[52]),I=v(I,E,T,C,h,10,u[53]),C=v(C,I,E,T,w,15,u[54]),T=v(T,C,I,E,o,21,u[55]),E=v(E,T,C,I,m,6,u[56]),I=v(I,E,T,C,O,10,u[57]),C=v(C,I,E,T,g,15,u[58]),T=v(T,C,I,E,S,21,u[59]),E=v(E,T,C,I,b,6,u[60]),I=v(I,E,T,C,A,10,u[61]),C=v(C,I,E,T,f,15,u[62]),T=v(T,C,I,E,_,21,u[63]),n[0]=n[0]+E|0,n[1]=n[1]+T|0,n[2]=n[2]+C|0,n[3]=n[3]+I|0},_doFinalize:function(){var t=this._data,a=t.words,l=8*this._nDataBytes,i=8*t.sigBytes;a[i>>>5]|=128<<24-i%32;var n=e.floor(l/4294967296),r=l;a[15+(i+64>>>9<<4)]=16711935&(n<<8|n>>>24)|4278255360&(n<<24|n>>>8),a[14+(i+64>>>9<<4)]=16711935&(r<<8|r>>>24)|4278255360&(r<<24|r>>>8),t.sigBytes=4*(a.length+1),this._process();for(var u=this._hash,o=u.words,s=0;s<4;s++){var d=o[s];o[s]=16711935&(d<<8|d>>>24)|4278255360&(d<<24|d>>>8)}return u},clone:function(){var e=n.clone.call(this);return e._hash=this._hash.clone(),e}});function s(e,t,a,l,i,n,r){var u=e+(t&a|~t&l)+i+r;return(u<<n|u>>>32-n)+t}function d(e,t,a,l,i,n,r){var u=e+(t&l|a&~l)+i+r;return(u<<n|u>>>32-n)+t}function c(e,t,a,l,i,n,r){var u=e+(t^a^l)+i+r;return(u<<n|u>>>32-n)+t}function v(e,t,a,l,i,n,r){var u=e+(a^(t|~l))+i+r;return(u<<n|u>>>32-n)+t}t.MD5=n._createHelper(o),t.HmacMD5=n._createHmacHelper(o)}(Math),a.MD5)})),T((function(e,t){var a;e.exports=(a=I,void function(){var e=a,t=e.lib.Base,l=e.enc.Utf8;e.algo.HMAC=t.extend({init:function(e,t){e=this._hasher=new e.init,"string"==typeof t&&(t=l.parse(t));var a=e.blockSize,i=4*a;t.sigBytes>i&&(t=e.finalize(t)),t.clamp();for(var n=this._oKey=t.clone(),r=this._iKey=t.clone(),u=n.words,o=r.words,s=0;s<a;s++)u[s]^=1549556828,o[s]^=909522486;n.sigBytes=r.sigBytes=i,this.reset()},reset:function(){var e=this._hasher;e.reset(),e.update(this._iKey)},update:function(e){return this._hasher.update(e),this},finalize:function(e){var t=this._hasher,a=t.finalize(e);return t.reset(),t.finalize(this._oKey.clone().concat(a))}})}())})),T((function(e,t){e.exports=I.HmacMD5}))),D=T((function(e,t){e.exports=I.enc.Utf8})),R=T((function(e,t){var a;e.exports=(a=I,function(){var e=a,t=e.lib.WordArray;function l(e,a,l){for(var i=[],n=0,r=0;r<a;r++)if(r%4){var u=l[e.charCodeAt(r-1)]<<r%4*2,o=l[e.charCodeAt(r)]>>>6-r%4*2;i[n>>>2]|=(u|o)<<24-n%4*8,n++}return t.create(i,n)}e.enc.Base64={stringify:function(e){var t=e.words,a=e.sigBytes,l=this._map;e.clamp();for(var i=[],n=0;n<a;n+=3)for(var r=(t[n>>>2]>>>24-n%4*8&255)<<16|(t[n+1>>>2]>>>24-(n+1)%4*8&255)<<8|t[n+2>>>2]>>>24-(n+2)%4*8&255,u=0;u<4&&n+.75*u<a;u++)i.push(l.charAt(r>>>6*(3-u)&63));var o=l.charAt(64);if(o)for(;i.length%4;)i.push(o);return i.join("")},parse:function(e){var t=e.length,a=this._map,i=this._reverseMap;if(!i){i=this._reverseMap=[];for(var n=0;n<a.length;n++)i[a.charCodeAt(n)]=n}var r=a.charAt(64);if(r){var u=e.indexOf(r);-1!==u&&(t=u)}return l(e,t,i)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),a.enc.Base64)})),L="FUNCTION",j="OBJECT",N="CLIENT_DB",M="pending",U="fulfilled",B="rejected";function F(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}function V(e){return"object"===F(e)}function $(e){return"function"==typeof e}function K(e){return function(){try{return e.apply(e,arguments)}catch(e){console.error(e)}}}var q="REJECTED",H="NOT_PENDING",G=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=t.createPromise,l=t.retryRule,i=void 0===l?q:l;(0,g.default)(this,e),this.createPromise=a,this.status=null,this.promise=null,this.retryRule=i}return(0,y.default)(e,[{key:"needRetry",get:function(){if(!this.status)return!0;switch(this.retryRule){case q:return this.status===B;case H:return this.status!==M}}},{key:"exec",value:function(){var e=this;return this.needRetry?(this.status=M,this.promise=this.createPromise().then((function(t){return e.status=U,Promise.resolve(t)}),(function(t){return e.status=B,Promise.reject(t)})),this.promise):this.promise}}]),e}();function W(e){return e&&"string"==typeof e?JSON.parse(e):e}var z=!0,J="mp-weixin",Z=!1,Y=W([]),Q="h5"===J?"web":"app-plus"===J?"app":J,X=W(void 0),ee=W([])||[],te=!0;try{(a(394).default||a(394)).appid}catch(Si){}var ae={};function le(e){var t,a,l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t=ae,a=e,Object.prototype.hasOwnProperty.call(t,a)||(ae[e]=l),ae[e]}"app"===Q&&(ae=l._globalUniCloudObj?l._globalUniCloudObj:l._globalUniCloudObj={});var ie=["invoke","success","fail","complete"],ne=le("_globalUniCloudInterceptor");function re(e,t){ne[e]||(ne[e]={}),V(t)&&Object.keys(t).forEach((function(a){ie.indexOf(a)>-1&&function(e,t,a){var l=ne[e][t];l||(l=ne[e][t]=[]),-1===l.indexOf(a)&&$(a)&&l.push(a)}(e,a,t[a])}))}function ue(e,t){ne[e]||(ne[e]={}),V(t)?Object.keys(t).forEach((function(a){ie.indexOf(a)>-1&&function(e,t,a){var l=ne[e][t];if(l){var i=l.indexOf(a);i>-1&&l.splice(i,1)}}(e,a,t[a])})):delete ne[e]}function oe(e,t){return e&&0!==e.length?e.reduce((function(e,a){return e.then((function(){return a(t)}))}),Promise.resolve()):Promise.resolve()}function se(e,t){return ne[e]&&ne[e][t]||[]}function de(e){re("callObject",e)}var ce=le("_globalUniCloudListener"),ve="response",fe="needLogin",he="refreshToken",be="clientdb",pe="cloudfunction",ge="cloudobject";function ye(e){return ce[e]||(ce[e]=[]),ce[e]}function me(e,t){var a=ye(e);a.includes(t)||a.push(t)}function _e(e,t){var a=ye(e),l=a.indexOf(t);-1!==l&&a.splice(l,1)}function we(e,t){for(var a=ye(e),l=0;l<a.length;l++)(0,a[l])(t)}var Ae,xe=!1;function Se(){return Ae||(Ae=new Promise((function(e){xe&&e(),function t(){if("function"==typeof getCurrentPages){var a=getCurrentPages();a&&a[0]&&(xe=!0,e())}xe||setTimeout((function(){t()}),30)}()})),Ae)}function ke(e){var t={};for(var a in e){var l=e[a];$(l)&&(t[a]=K(l))}return t}var Oe,Ee,Te=function(e){(0,f.default)(a,e);var t=k(a);function a(e){var l;return(0,g.default)(this,a),l=t.call(this,e.message),l.errMsg=e.message||e.errMsg||"unknown system error",l.code=l.errCode=e.code||e.errCode||"SYSTEM_ERROR",l.errSubject=l.subject=e.subject||e.errSubject,l.cause=e.cause,l.requestId=e.requestId,l}return(0,y.default)(a,[{key:"toJson",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(!(e>=10))return e++,{errCode:this.errCode,errMsg:this.errMsg,errSubject:this.errSubject,cause:this.cause&&this.cause.toJson?this.cause.toJson(e):this.cause}}}]),a}((0,p.default)(Error)),Ce={request:function(e){return l.request(e)},uploadFile:function(e){return l.uploadFile(e)},setStorageSync:function(e,t){return l.setStorageSync(e,t)},getStorageSync:function(e){return l.getStorageSync(e)},removeStorageSync:function(e){return l.removeStorageSync(e)},clearStorageSync:function(){return l.clearStorageSync()},connectSocket:function(e){return l.connectSocket(e)}};function Ie(){return{token:Ce.getStorageSync("uni_id_token")||Ce.getStorageSync("uniIdToken"),tokenExpired:Ce.getStorageSync("uni_id_token_expired")}}function Pe(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.token,a=e.tokenExpired;t&&Ce.setStorageSync("uni_id_token",t),a&&Ce.setStorageSync("uni_id_token_expired",a)}function De(){return Oe||(Oe=l.getSystemInfoSync()),Oe}function Re(){var e,t;try{if(l.getLaunchOptionsSync){if(l.getLaunchOptionsSync.toString().indexOf("not yet implemented")>-1)return;var a=l.getLaunchOptionsSync(),i=a.scene,n=a.channel;e=n,t=i}}catch(e){}return{channel:e,scene:t}}var Le={};function je(){var e=l.getLocale&&l.getLocale()||"en";if(Ee)return S(S(S({},Le),Ee),{},{locale:e,LOCALE:e});var t=De(),a=t.deviceId,i=t.osName,n=t.uniPlatform,r=t.appId,u=["appId","appLanguage","appName","appVersion","appVersionCode","appWgtVersion","browserName","browserVersion","deviceBrand","deviceId","deviceModel","deviceType","osName","osVersion","romName","romVersion","ua","hostName","hostVersion","uniPlatform","uniRuntimeVersion","uniRuntimeVersionCode","uniCompilerVersion","uniCompilerVersionCode"];for(var o in t)Object.hasOwnProperty.call(t,o)&&-1===u.indexOf(o)&&delete t[o];return Ee=S(S({PLATFORM:n,OS:i,APPID:r,DEVICEID:a},Re()),t),S(S(S({},Le),Ee),{},{locale:e,LOCALE:e})}var Ne,Me={sign:function(e,t){var a="";return Object.keys(e).sort().forEach((function(t){e[t]&&(a=a+"&"+t+"="+e[t])})),a=a.slice(1),P(a,t).toString()},wrappedRequest:function(e,t){return new Promise((function(a,l){t(Object.assign(e,{complete:function(e){e||(e={}),z&&"web"===Q&&e.errMsg&&0===e.errMsg.indexOf("request:fail")&&console.warn("发布H5，需要在uniCloud后台操作，绑定安全域名，否则会因为跨域问题而无法访问。教程参考：https://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5");var t=e.data&&e.data.header&&e.data.header["x-serverless-request-id"]||e.header&&e.header["request-id"];if(!e.statusCode||e.statusCode>=400){var i=e.data&&e.data.error&&e.data.error.code||"SYS_ERR",n=e.data&&e.data.error&&e.data.error.message||e.errMsg||"request:fail";return l(new Te({code:i,message:n,requestId:t}))}var r=e.data;if(r.error)return l(new Te({code:r.error.code,message:r.error.message,requestId:t}));r.result=r.data,r.requestId=t,delete r.data,a(r)}}))}))},toBase64:function(e){return R.stringify(D.parse(e))}},Ue=function(){function e(t){var a=this;(0,g.default)(this,e),["spaceId","clientSecret"].forEach((function(e){if(!Object.prototype.hasOwnProperty.call(t,e))throw new Error("".concat(e," required"))})),this.config=Object.assign({},{endpoint:0===t.spaceId.indexOf("mp-")?"https://api.next.bspapp.com":"https://api.bspapp.com"},t),this.config.provider="aliyun",this.config.requestUrl=this.config.endpoint+"/client",this.config.envType=this.config.envType||"public",this.config.accessTokenKey="access_token_"+this.config.spaceId,this.adapter=Ce,this._getAccessTokenPromiseHub=new G({createPromise:function(){return a.requestAuth(a.setupRequest({method:"serverless.auth.user.anonymousAuthorize",params:"{}"},"auth")).then((function(e){if(!e.result||!e.result.accessToken)throw new Te({code:"AUTH_FAILED",message:"获取accessToken失败"});a.setAccessToken(e.result.accessToken)}))},retryRule:H})}return(0,y.default)(e,[{key:"hasAccessToken",get:function(){return!!this.accessToken}},{key:"setAccessToken",value:function(e){this.accessToken=e}},{key:"requestWrapped",value:function(e){return Me.wrappedRequest(e,this.adapter.request)}},{key:"requestAuth",value:function(e){return this.requestWrapped(e)}},{key:"request",value:function(e,t){var a=this;return Promise.resolve().then((function(){return a.hasAccessToken?t?a.requestWrapped(e):a.requestWrapped(e).catch((function(t){return new Promise((function(e,a){!t||"GATEWAY_INVALID_TOKEN"!==t.code&&"InvalidParameter.InvalidToken"!==t.code?a(t):e()})).then((function(){return a.getAccessToken()})).then((function(){var t=a.rebuildRequest(e);return a.request(t,!0)}))})):a.getAccessToken().then((function(){var t=a.rebuildRequest(e);return a.request(t,!0)}))}))}},{key:"rebuildRequest",value:function(e){var t=Object.assign({},e);return t.data.token=this.accessToken,t.header["x-basement-token"]=this.accessToken,t.header["x-serverless-sign"]=Me.sign(t.data,this.config.clientSecret),t}},{key:"setupRequest",value:function(e,t){var a=Object.assign({},e,{spaceId:this.config.spaceId,timestamp:Date.now()}),l={"Content-Type":"application/json"};return"auth"!==t&&(a.token=this.accessToken,l["x-basement-token"]=this.accessToken),l["x-serverless-sign"]=Me.sign(a,this.config.clientSecret),{url:this.config.requestUrl,method:"POST",data:a,dataType:"json",header:l}}},{key:"getAccessToken",value:function(){return this._getAccessTokenPromiseHub.exec()}},{key:"authorize",value:function(){var e=(0,c.default)(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.getAccessToken();case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"callFunction",value:function(e){var t={method:"serverless.function.runtime.invoke",params:JSON.stringify({functionTarget:e.name,functionArgs:e.data||{}})};return this.request(this.setupRequest(t))}},{key:"getOSSUploadOptionsFromPath",value:function(e){var t={method:"serverless.file.resource.generateProximalSign",params:JSON.stringify(e)};return this.request(this.setupRequest(t))}},{key:"uploadFileToOSS",value:function(e){var t=this,a=e.url,l=e.formData,i=e.name,n=e.filePath,r=e.fileType,u=e.onUploadProgress;return new Promise((function(e,o){var s=t.adapter.uploadFile({url:a,formData:l,name:i,filePath:n,fileType:r,header:{"X-OSS-server-side-encrpytion":"AES256"},success:function(t){t&&t.statusCode<400?e(t):o(new Te({code:"UPLOAD_FAILED",message:"文件上传失败"}))},fail:function(e){o(new Te({code:e.code||"UPLOAD_FAILED",message:e.message||e.errMsg||"文件上传失败"}))}});"function"==typeof u&&s&&"function"==typeof s.onProgressUpdate&&s.onProgressUpdate((function(e){u({loaded:e.totalBytesSent,total:e.totalBytesExpectedToSend})}))}))}},{key:"reportOSSUpload",value:function(e){var t={method:"serverless.file.resource.report",params:JSON.stringify(e)};return this.request(this.setupRequest(t))}},{key:"uploadFile",value:function(){var e=(0,c.default)(r.default.mark((function e(t){var a,l,i,n,u,o,s,d,c,v,f,h,b,p,g,y,m,_,w,A,x,S;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=t.filePath,l=t.cloudPath,i=t.fileType,n=void 0===i?"image":i,u=t.cloudPathAsRealPath,o=void 0!==u&&u,s=t.onUploadProgress,d=t.config,"string"===F(l)){e.next=3;break}throw new Te({code:"INVALID_PARAM",message:"cloudPath必须为字符串类型"});case 3:if(l=l.trim()){e.next=5;break}throw new Te({code:"INVALID_PARAM",message:"cloudPath不可为空"});case 5:if(!/:\/\//.test(l)){e.next=7;break}throw new Te({code:"INVALID_PARAM",message:"cloudPath不合法"});case 7:if(c=d&&d.envType||this.config.envType,!(o&&("/"!==l[0]&&(l="/"+l),l.indexOf("\\")>-1))){e.next=10;break}throw new Te({code:"INVALID_PARAM",message:"使用cloudPath作为路径时，cloudPath不可包含“\\”"});case 10:return e.next=12,this.getOSSUploadOptionsFromPath({env:c,filename:o?l.split("/").pop():l,fileId:o?l:void 0});case 12:return v=e.sent.result,f="https://"+v.cdnDomain+"/"+v.ossPath,h=v.securityToken,b=v.accessKeyId,p=v.signature,g=v.host,y=v.ossPath,m=v.id,_=v.policy,w=v.ossCallbackUrl,A={"Cache-Control":"max-age=2592000","Content-Disposition":"attachment",OSSAccessKeyId:b,Signature:p,host:g,id:m,key:y,policy:_,success_action_status:200},h&&(A["x-oss-security-token"]=h),w&&(x=JSON.stringify({callbackUrl:w,callbackBody:JSON.stringify({fileId:m,spaceId:this.config.spaceId}),callbackBodyType:"application/json"}),A.callback=Me.toBase64(x)),S={url:"https://"+v.host,formData:A,fileName:"file",name:"file",filePath:a,fileType:n},e.next=27,this.uploadFileToOSS(Object.assign({},S,{onUploadProgress:s}));case 27:if(!w){e.next=29;break}return e.abrupt("return",{success:!0,filePath:a,fileID:f});case 29:return e.next=31,this.reportOSSUpload({id:m});case 31:if(!e.sent.success){e.next=33;break}return e.abrupt("return",{success:!0,filePath:a,fileID:f});case 33:throw new Te({code:"UPLOAD_FAILED",message:"文件上传失败"});case 34:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getTempFileURL",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.fileList;return new Promise((function(e,a){Array.isArray(t)&&0!==t.length||a(new Te({code:"INVALID_PARAM",message:"fileList的元素必须是非空的字符串"})),e({fileList:t.map((function(e){return{fileID:e,tempFileURL:e}}))})}))}},{key:"getFileInfo",value:function(){var e=(0,c.default)(r.default.mark((function e(){var t,a,l,i=arguments;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=i.length>0&&void 0!==i[0]?i[0]:{},a=t.fileList,Array.isArray(a)&&0!==a.length){e.next=3;break}throw new Te({code:"INVALID_PARAM",message:"fileList的元素必须是非空的字符串"});case 3:return l={method:"serverless.file.resource.info",params:JSON.stringify({id:a.map((function(e){return e.split("?")[0]})).join(",")})},e.next=6,this.request(this.setupRequest(l));case 6:return e.t0=e.sent.result,e.abrupt("return",{fileList:e.t0});case 8:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}]),e}(),Be={init:function(e){var t=new Ue(e),a={signInAnonymously:function(){return t.authorize()},getLoginState:function(){return Promise.resolve(!1)}};return t.auth=function(){return a},t.customAuth=t.auth,t}},Fe="undefined"!=typeof location&&"http:"===location.protocol?"http:":"https:";!function(e){e.local="local",e.none="none",e.session="session"}(Ne||(Ne={}));var Ve,$e=function(){},Ke=T((function(e,t){var a;e.exports=(a=I,function(e){var t=a,l=t.lib,i=l.WordArray,n=l.Hasher,r=t.algo,u=[],o=[];!function(){function t(t){for(var a=e.sqrt(t),l=2;l<=a;l++)if(!(t%l))return!1;return!0}function a(e){return 4294967296*(e-(0|e))|0}for(var l=2,i=0;i<64;)t(l)&&(i<8&&(u[i]=a(e.pow(l,.5))),o[i]=a(e.pow(l,1/3)),i++),l++}();var s=[],d=r.SHA256=n.extend({_doReset:function(){this._hash=new i.init(u.slice(0))},_doProcessBlock:function(e,t){for(var a=this._hash.words,l=a[0],i=a[1],n=a[2],r=a[3],u=a[4],d=a[5],c=a[6],v=a[7],f=0;f<64;f++){if(f<16)s[f]=0|e[t+f];else{var h=s[f-15],b=(h<<25|h>>>7)^(h<<14|h>>>18)^h>>>3,p=s[f-2],g=(p<<15|p>>>17)^(p<<13|p>>>19)^p>>>10;s[f]=b+s[f-7]+g+s[f-16]}var y=l&i^l&n^i&n,m=(l<<30|l>>>2)^(l<<19|l>>>13)^(l<<10|l>>>22),_=v+((u<<26|u>>>6)^(u<<21|u>>>11)^(u<<7|u>>>25))+(u&d^~u&c)+o[f]+s[f];v=c,c=d,d=u,u=r+_|0,r=n,n=i,i=l,l=_+(m+y)|0}a[0]=a[0]+l|0,a[1]=a[1]+i|0,a[2]=a[2]+n|0,a[3]=a[3]+r|0,a[4]=a[4]+u|0,a[5]=a[5]+d|0,a[6]=a[6]+c|0,a[7]=a[7]+v|0},_doFinalize:function(){var t=this._data,a=t.words,l=8*this._nDataBytes,i=8*t.sigBytes;return a[i>>>5]|=128<<24-i%32,a[14+(i+64>>>9<<4)]=e.floor(l/4294967296),a[15+(i+64>>>9<<4)]=l,t.sigBytes=4*a.length,this._process(),this._hash},clone:function(){var e=n.clone.call(this);return e._hash=this._hash.clone(),e}});t.SHA256=n._createHelper(d),t.HmacSHA256=n._createHmacHelper(d)}(Math),a.SHA256)})),qe=Ke,He=T((function(e,t){e.exports=I.HmacSHA256})),Ge=function(){var e;if(!Promise){e=function(){},e.promise={};var t=function(){throw new Te({message:'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.'})};return Object.defineProperty(e.promise,"then",{get:t}),Object.defineProperty(e.promise,"catch",{get:t}),e}var a=new Promise((function(t,a){e=function(e,l){return e?a(e):t(l)}}));return e.promise=a,e};function We(e){return void 0===e}function ze(e){return"[object Null]"===Object.prototype.toString.call(e)}function Je(e){var t,a,l=(t=e,"[object Array]"===Object.prototype.toString.call(t)?e:[e]),i=_(l);try{for(i.s();!(a=i.n()).done;){var n=a.value,r=n.isMatch,u=n.genAdapter,o=n.runtime;if(r())return{adapter:u(),runtime:o}}}catch(s){i.e(s)}finally{i.f()}}!function(e){e.WEB="web",e.WX_MP="wx_mp"}(Ve||(Ve={}));var Ze={adapter:null,runtime:void 0},Ye=["anonymousUuidKey"],Qe=function(e){(0,f.default)(a,e);var t=k(a);function a(){var e;return(0,g.default)(this,a),e=t.call(this),Ze.adapter.root.tcbObject||(Ze.adapter.root.tcbObject={}),e}return(0,y.default)(a,[{key:"setItem",value:function(e,t){Ze.adapter.root.tcbObject[e]=t}},{key:"getItem",value:function(e){return Ze.adapter.root.tcbObject[e]}},{key:"removeItem",value:function(e){delete Ze.adapter.root.tcbObject[e]}},{key:"clear",value:function(){delete Ze.adapter.root.tcbObject}}]),a}($e);function Xe(e,t){switch(e){case"local":return t.localStorage||new Qe;case"none":return new Qe;default:return t.sessionStorage||new Qe}}var et=function(){function e(t){if((0,g.default)(this,e),!this._storage){this._persistence=Ze.adapter.primaryStorage||t.persistence,this._storage=Xe(this._persistence,Ze.adapter);var a="access_token_".concat(t.env),l="access_token_expire_".concat(t.env),i="refresh_token_".concat(t.env),n="anonymous_uuid_".concat(t.env),r="login_type_".concat(t.env),u="user_info_".concat(t.env);this.keys={accessTokenKey:a,accessTokenExpireKey:l,refreshTokenKey:i,anonymousUuidKey:n,loginTypeKey:r,userInfoKey:u}}}return(0,y.default)(e,[{key:"updatePersistence",value:function(e){if(e!==this._persistence){var t="local"===this._persistence;this._persistence=e;var a=Xe(e,Ze.adapter);for(var l in this.keys){var i=this.keys[l];if(!t||!Ye.includes(l)){var n=this._storage.getItem(i);We(n)||ze(n)||(a.setItem(i,n),this._storage.removeItem(i))}}this._storage=a}}},{key:"setStore",value:function(e,t,a){if(this._storage){var l={version:a||"localCachev1",content:t},i=JSON.stringify(l);try{this._storage.setItem(e,i)}catch(e){throw e}}}},{key:"getStore",value:function(e,t){try{if(!this._storage)return}catch(e){return""}t=t||"localCachev1";var a=this._storage.getItem(e);return a&&a.indexOf(t)>=0?JSON.parse(a).content:""}},{key:"removeStore",value:function(e){this._storage.removeItem(e)}}]),e}(),tt={},at={};function lt(e){return tt[e]}var it=(0,y.default)((function e(t,a){(0,g.default)(this,e),this.data=a||null,this.name=t})),nt=function(e){(0,f.default)(a,e);var t=k(a);function a(e,l){var i;return(0,g.default)(this,a),i=t.call(this,"error",{error:e,data:l}),i.error=e,i}return(0,y.default)(a)}(it),rt=new(function(){function e(){(0,g.default)(this,e),this._listeners={}}return(0,y.default)(e,[{key:"on",value:function(e,t){return function(e,t,a){a[e]=a[e]||[],a[e].push(t)}(e,t,this._listeners),this}},{key:"off",value:function(e,t){return function(e,t,a){if(a&&a[e]){var l=a[e].indexOf(t);-1!==l&&a[e].splice(l,1)}}(e,t,this._listeners),this}},{key:"fire",value:function(e,t){if(e instanceof nt)return console.error(e.error),this;var a="string"==typeof e?new it(e,t||{}):e,l=a.name;if(this._listens(l)){a.target=this;var i,n=this._listeners[l]?(0,d.default)(this._listeners[l]):[],r=_(n);try{for(r.s();!(i=r.n()).done;){var u=i.value;u.call(this,a)}}catch(o){r.e(o)}finally{r.f()}}return this}},{key:"_listens",value:function(e){return this._listeners[e]&&this._listeners[e].length>0}}]),e}());function ut(e,t){rt.on(e,t)}function ot(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};rt.fire(e,t)}function st(e,t){rt.off(e,t)}var dt,ct="loginStateChanged",vt="loginStateExpire",ft="loginTypeChanged",ht="anonymousConverted",bt="refreshAccessToken";!function(e){e.ANONYMOUS="ANONYMOUS",e.WECHAT="WECHAT",e.WECHAT_PUBLIC="WECHAT-PUBLIC",e.WECHAT_OPEN="WECHAT-OPEN",e.CUSTOM="CUSTOM",e.EMAIL="EMAIL",e.USERNAME="USERNAME",e.NULL="NULL"}(dt||(dt={}));var pt=["auth.getJwt","auth.logout","auth.signInWithTicket","auth.signInAnonymously","auth.signIn","auth.fetchAccessTokenWithRefreshToken","auth.signUpWithEmailAndPassword","auth.activateEndUserMail","auth.sendPasswordResetEmail","auth.resetPasswordWithToken","auth.isUsernameRegistered"],gt={"X-SDK-Version":"1.3.5"};function yt(e,t,a){var l=e[t];e[t]=function(t){var i={},n={};a.forEach((function(a){var l=a.call(e,t),r=l.data,u=l.headers;Object.assign(i,r),Object.assign(n,u)}));var r=t.data;return r&&function(){var e;if(e=r,"[object FormData]"!==Object.prototype.toString.call(e))t.data=S(S({},r),i);else for(var a in i)r.append(a,i[a])}(),t.headers=S(S({},t.headers||{}),n),l.call(e,t)}}function mt(){var e=Math.random().toString(16).slice(2);return{data:{seqId:e},headers:S(S({},gt),{},{"x-seqid":e})}}var _t=function(){function e(){var t,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,g.default)(this,e),this.config=a,this._reqClass=new Ze.adapter.reqClass({timeout:this.config.timeout,timeoutMsg:"请求在".concat(this.config.timeout/1e3,"s内未完成，已中断"),restrictedMethods:["post"]}),this._cache=lt(this.config.env),this._localCache=(t=this.config.env,at[t]),yt(this._reqClass,"post",[mt]),yt(this._reqClass,"upload",[mt]),yt(this._reqClass,"download",[mt])}return(0,y.default)(e,[{key:"post",value:function(){var e=(0,c.default)(r.default.mark((function e(t){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this._reqClass.post(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"upload",value:function(){var e=(0,c.default)(r.default.mark((function e(t){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this._reqClass.upload(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"download",value:function(){var e=(0,c.default)(r.default.mark((function e(t){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this._reqClass.download(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"refreshAccessToken",value:function(){var e=(0,c.default)(r.default.mark((function e(){var t,a;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this._refreshAccessTokenPromise||(this._refreshAccessTokenPromise=this._refreshAccessToken()),e.prev=1,e.next=4,this._refreshAccessTokenPromise;case 4:t=e.sent,e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](1),a=e.t0;case 10:if(this._refreshAccessTokenPromise=null,this._shouldRefreshAccessTokenHook=null,!a){e.next=12;break}throw a;case 12:return e.abrupt("return",t);case 13:case"end":return e.stop()}}),e,this,[[1,7]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"_refreshAccessToken",value:function(){var e=(0,c.default)(r.default.mark((function e(){var t,a,l,i,n,u,o,s,d,c,v,f,h;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=this._cache.keys,a=t.accessTokenKey,l=t.accessTokenExpireKey,i=t.refreshTokenKey,n=t.loginTypeKey,u=t.anonymousUuidKey,this._cache.removeStore(a),this._cache.removeStore(l),o=this._cache.getStore(i),o){e.next=5;break}throw new Te({message:"未登录CloudBase"});case 5:return s={refresh_token:o},e.next=8,this.request("auth.fetchAccessTokenWithRefreshToken",s);case 8:if(d=e.sent,!d.data.code){e.next=21;break}if(c=d.data.code,"SIGN_PARAM_INVALID"!==c&&"REFRESH_TOKEN_EXPIRED"!==c&&"INVALID_REFRESH_TOKEN"!==c){e.next=20;break}if(this._cache.getStore(n)!==dt.ANONYMOUS||"INVALID_REFRESH_TOKEN"!==c){e.next=19;break}return v=this._cache.getStore(u),f=this._cache.getStore(i),e.next=17,this.send("auth.signInAnonymously",{anonymous_uuid:v,refresh_token:f});case 17:return h=e.sent,e.abrupt("return",(this.setRefreshToken(h.refresh_token),this._refreshAccessToken()));case 19:ot(vt),this._cache.removeStore(i);case 20:throw new Te({code:d.data.code,message:"刷新access token失败：".concat(d.data.code)});case 21:if(!d.data.access_token){e.next=23;break}return e.abrupt("return",(ot(bt),this._cache.setStore(a,d.data.access_token),this._cache.setStore(l,d.data.access_token_expire+Date.now()),{accessToken:d.data.access_token,accessTokenExpire:d.data.access_token_expire}));case 23:d.data.refresh_token&&(this._cache.removeStore(i),this._cache.setStore(i,d.data.refresh_token),this._refreshAccessToken());case 24:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getAccessToken",value:function(){var e=(0,c.default)(r.default.mark((function e(){var t,a,l,i,n,u,o;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=this._cache.keys,a=t.accessTokenKey,l=t.accessTokenExpireKey,i=t.refreshTokenKey,this._cache.getStore(i)){e.next=3;break}throw new Te({message:"refresh token不存在，登录状态异常"});case 3:if(n=this._cache.getStore(a),u=this._cache.getStore(l),o=!0,e.t0=this._shouldRefreshAccessTokenHook,!e.t0){e.next=9;break}return e.next=8,this._shouldRefreshAccessTokenHook(n,u);case 8:e.t0=!e.sent;case 9:if(e.t1=e.t0,!e.t1){e.next=12;break}o=!1;case 12:return e.abrupt("return",(!n||!u||u<Date.now())&&o?this.refreshAccessToken():{accessToken:n,accessTokenExpire:u});case 13:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"request",value:function(){var e=(0,c.default)(r.default.mark((function e(t,a,l){var i,n,u,o,s,d,c,v,f,h,b,p,g,y,m,_;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(i="x-tcb-trace_".concat(this.config.env),n="application/x-www-form-urlencoded",u=S({action:t,env:this.config.env,dataVersion:"2019-08-16"},a),-1!==pt.indexOf(t)){e.next=10;break}if(o=this._cache.keys.refreshTokenKey,e.t0=this._cache.getStore(o),!e.t0){e.next=10;break}return e.next=9,this.getAccessToken();case 9:u.access_token=e.sent.accessToken;case 10:if("storage.uploadFile"===t){for(d in s=new FormData,s)s.hasOwnProperty(d)&&void 0!==s[d]&&s.append(d,u[d]);n="multipart/form-data"}else for(c in n="application/json",s={},u)void 0!==u[c]&&(s[c]=u[c]);return v={headers:{"content-type":n}},l&&l.onUploadProgress&&(v.onUploadProgress=l.onUploadProgress),f=this._localCache.getStore(i),f&&(v.headers["X-TCB-Trace"]=f),h=a.parse,b=a.inQuery,p=a.search,g={env:this.config.env},h&&(g.parse=!0),b&&(g=S(S({},b),g)),y=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},l=/\?/.test(t),i="";for(var n in a)""===i?!l&&(t+="?"):i+="&",i+="".concat(n,"=").concat(encodeURIComponent(a[n]));return/^http(s)?\:\/\//.test(t+=i)?t:"".concat(e).concat(t)}(Fe,"//tcb-api.tencentcloudapi.com/web",g),p&&(y+=p),e.next=22,this.post(S({url:y,data:s},v));case 22:if(m=e.sent,_=m.header&&m.header["x-tcb-trace"],_&&this._localCache.setStore(i,_),(200===Number(m.status)||200===Number(m.statusCode))&&m.data){e.next=26;break}throw new Te({code:"NETWORK_ERROR",message:"network request error"});case 26:return e.abrupt("return",m);case 27:case"end":return e.stop()}}),e,this)})));function t(t,a,l){return e.apply(this,arguments)}return t}()},{key:"send",value:function(){var e=(0,c.default)(r.default.mark((function e(t){var a,l,i,n=arguments;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=n.length>1&&void 0!==n[1]?n[1]:{},e.next=3,this.request(t,a,{onUploadProgress:a.onUploadProgress});case 3:if(l=e.sent,"ACCESS_TOKEN_EXPIRED"!==l.data.code||-1!==pt.indexOf(t)){e.next=13;break}return e.next=7,this.refreshAccessToken();case 7:return e.next=9,this.request(t,a,{onUploadProgress:a.onUploadProgress});case 9:if(i=e.sent,!i.data.code){e.next=12;break}throw new Te({code:i.data.code,message:i.data.message});case 12:return e.abrupt("return",i.data);case 13:if(!l.data.code){e.next=15;break}throw new Te({code:l.data.code,message:l.data.message});case 15:return e.abrupt("return",l.data);case 16:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"setRefreshToken",value:function(e){var t=this._cache.keys,a=t.accessTokenKey,l=t.accessTokenExpireKey,i=t.refreshTokenKey;this._cache.removeStore(a),this._cache.removeStore(l),this._cache.setStore(i,e)}}]),e}(),wt={};function At(e){return wt[e]}var xt=function(){function e(t){(0,g.default)(this,e),this.config=t,this._cache=lt(t.env),this._request=At(t.env)}return(0,y.default)(e,[{key:"setRefreshToken",value:function(e){var t=this._cache.keys,a=t.accessTokenKey,l=t.accessTokenExpireKey,i=t.refreshTokenKey;this._cache.removeStore(a),this._cache.removeStore(l),this._cache.setStore(i,e)}},{key:"setAccessToken",value:function(e,t){var a=this._cache.keys,l=a.accessTokenKey,i=a.accessTokenExpireKey;this._cache.setStore(l,e),this._cache.setStore(i,t)}},{key:"refreshUserInfo",value:function(){var e=(0,c.default)(r.default.mark((function e(){var t,a;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this._request.send("auth.getUserInfo",{});case 2:return t=e.sent,a=t.data,e.abrupt("return",(this.setLocalUserInfo(a),a));case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"setLocalUserInfo",value:function(e){var t=this._cache.keys.userInfoKey;this._cache.setStore(t,e)}}]),e}(),St=function(){function e(t){if((0,g.default)(this,e),!t)throw new Te({code:"PARAM_ERROR",message:"envId is not defined"});this._envId=t,this._cache=lt(this._envId),this._request=At(this._envId),this.setUserInfo()}return(0,y.default)(e,[{key:"linkWithTicket",value:function(e){if("string"!=typeof e)throw new Te({code:"PARAM_ERROR",message:"ticket must be string"});return this._request.send("auth.linkWithTicket",{ticket:e})}},{key:"linkWithRedirect",value:function(e){e.signInWithRedirect()}},{key:"updatePassword",value:function(e,t){return this._request.send("auth.updatePassword",{oldPassword:t,newPassword:e})}},{key:"updateEmail",value:function(e){return this._request.send("auth.updateEmail",{newEmail:e})}},{key:"updateUsername",value:function(e){if("string"!=typeof e)throw new Te({code:"PARAM_ERROR",message:"username must be a string"});return this._request.send("auth.updateUsername",{username:e})}},{key:"getLinkedUidList",value:function(){var e=(0,c.default)(r.default.mark((function e(){var t,a,l,i;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this._request.send("auth.getLinkedUidList",{});case 2:return t=e.sent,a=t.data,l=!1,i=a.users,e.abrupt("return",(i.forEach((function(e){e.wxOpenId&&e.wxPublicId&&(l=!0)})),{users:i,hasPrimaryUid:l}));case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"setPrimaryUid",value:function(e){return this._request.send("auth.setPrimaryUid",{uid:e})}},{key:"unlink",value:function(e){return this._request.send("auth.unlink",{platform:e})}},{key:"update",value:function(){var e=(0,c.default)(r.default.mark((function e(t){var a,l,i,n,u,o,s,d;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.nickName,l=t.gender,i=t.avatarUrl,n=t.province,u=t.country,o=t.city,e.next=8,this._request.send("auth.updateUserInfo",{nickName:a,gender:l,avatarUrl:i,province:n,country:u,city:o});case 8:s=e.sent,d=s.data,this.setLocalUserInfo(d);case 11:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"refresh",value:function(){var e=(0,c.default)(r.default.mark((function e(){var t,a;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this._request.send("auth.getUserInfo",{});case 2:return t=e.sent,a=t.data,e.abrupt("return",(this.setLocalUserInfo(a),a));case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"setUserInfo",value:function(){var e=this,t=this._cache.keys.userInfoKey,a=this._cache.getStore(t);["uid","loginType","openid","wxOpenId","wxPublicId","unionId","qqMiniOpenId","email","hasPassword","customUserId","nickName","gender","avatarUrl"].forEach((function(t){e[t]=a[t]})),this.location={country:a.country,province:a.province,city:a.city}}},{key:"setLocalUserInfo",value:function(e){var t=this._cache.keys.userInfoKey;this._cache.setStore(t,e),this.setUserInfo()}}]),e}(),kt=function(){function e(t){if((0,g.default)(this,e),!t)throw new Te({code:"PARAM_ERROR",message:"envId is not defined"});this._cache=lt(t);var a=this._cache.keys,l=a.refreshTokenKey,i=a.accessTokenKey,n=a.accessTokenExpireKey,r=this._cache.getStore(l),u=this._cache.getStore(i),o=this._cache.getStore(n);this.credential={refreshToken:r,accessToken:u,accessTokenExpire:o},this.user=new St(t)}return(0,y.default)(e,[{key:"isAnonymousAuth",get:function(){return this.loginType===dt.ANONYMOUS}},{key:"isCustomAuth",get:function(){return this.loginType===dt.CUSTOM}},{key:"isWeixinAuth",get:function(){return this.loginType===dt.WECHAT||this.loginType===dt.WECHAT_OPEN||this.loginType===dt.WECHAT_PUBLIC}},{key:"loginType",get:function(){return this._cache.getStore(this._cache.keys.loginTypeKey)}}]),e}(),Ot=function(e){(0,f.default)(a,e);var t=k(a);function a(){return(0,g.default)(this,a),t.apply(this,arguments)}return(0,y.default)(a,[{key:"signIn",value:function(){var e=(0,c.default)(r.default.mark((function e(){var t,a,l,i,n,u,o;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this._cache.updatePersistence("local"),t=this._cache.keys,a=t.anonymousUuidKey,l=t.refreshTokenKey,i=this._cache.getStore(a)||void 0,n=this._cache.getStore(l)||void 0,e.next=8,this._request.send("auth.signInAnonymously",{anonymous_uuid:i,refresh_token:n});case 8:if(u=e.sent,!u.uuid||!u.refresh_token){e.next=20;break}return this._setAnonymousUUID(u.uuid),this.setRefreshToken(u.refresh_token),e.next=14,this._request.refreshAccessToken();case 14:return ot(ct),ot(ft,{env:this.config.env,loginType:dt.ANONYMOUS,persistence:"local"}),o=new kt(this.config.env),e.next=19,o.user.refresh();case 19:return e.abrupt("return",o);case 20:throw new Te({message:"匿名登录失败"});case 21:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"linkAndRetrieveDataWithTicket",value:function(){var e=(0,c.default)(r.default.mark((function e(t){var a,l,i,n,u,o;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=this._cache.keys,l=a.anonymousUuidKey,i=a.refreshTokenKey,n=this._cache.getStore(l),u=this._cache.getStore(i),e.next=7,this._request.send("auth.linkAndRetrieveDataWithTicket",{anonymous_uuid:n,refresh_token:u,ticket:t});case 7:if(o=e.sent,!o.refresh_token){e.next=16;break}return this._clearAnonymousUUID(),this.setRefreshToken(o.refresh_token),e.next=13,this._request.refreshAccessToken();case 13:return ot(ht,{env:this.config.env}),ot(ft,{loginType:dt.CUSTOM,persistence:"local"}),e.abrupt("return",{credential:{refreshToken:o.refresh_token}});case 16:throw new Te({message:"匿名转化失败"});case 17:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"_setAnonymousUUID",value:function(e){var t=this._cache.keys,a=t.anonymousUuidKey,l=t.loginTypeKey;this._cache.removeStore(a),this._cache.setStore(a,e),this._cache.setStore(l,dt.ANONYMOUS)}},{key:"_clearAnonymousUUID",value:function(){this._cache.removeStore(this._cache.keys.anonymousUuidKey)}}]),a}(xt),Et=function(e){(0,f.default)(a,e);var t=k(a);function a(){return(0,g.default)(this,a),t.apply(this,arguments)}return(0,y.default)(a,[{key:"signIn",value:function(){var e=(0,c.default)(r.default.mark((function e(t){var a,l;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("string"==typeof t){e.next=2;break}throw new Te({code:"PARAM_ERROR",message:"ticket must be a string"});case 2:return a=this._cache.keys.refreshTokenKey,e.next=5,this._request.send("auth.signInWithTicket",{ticket:t,refresh_token:this._cache.getStore(a)||""});case 5:if(l=e.sent,!l.refresh_token){e.next=15;break}return this.setRefreshToken(l.refresh_token),e.next=10,this._request.refreshAccessToken();case 10:return ot(ct),ot(ft,{env:this.config.env,loginType:dt.CUSTOM,persistence:this.config.persistence}),e.next=14,this.refreshUserInfo();case 14:return e.abrupt("return",new kt(this.config.env));case 15:throw new Te({message:"自定义登录失败"});case 16:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()}]),a}(xt),Tt=function(e){(0,f.default)(a,e);var t=k(a);function a(){return(0,g.default)(this,a),t.apply(this,arguments)}return(0,y.default)(a,[{key:"signIn",value:function(){var e=(0,c.default)(r.default.mark((function e(t,a){var l,i,n,u,o;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("string"==typeof t){e.next=2;break}throw new Te({code:"PARAM_ERROR",message:"email must be a string"});case 2:return l=this._cache.keys.refreshTokenKey,e.next=5,this._request.send("auth.signIn",{loginType:"EMAIL",email:t,password:a,refresh_token:this._cache.getStore(l)||""});case 5:if(i=e.sent,n=i.refresh_token,u=i.access_token,o=i.access_token_expire,!n){e.next=22;break}if(this.setRefreshToken(n),!u||!o){e.next=15;break}this.setAccessToken(u,o),e.next=17;break;case 15:return e.next=17,this._request.refreshAccessToken();case 17:return e.next=19,this.refreshUserInfo();case 19:return ot(ct),ot(ft,{env:this.config.env,loginType:dt.EMAIL,persistence:this.config.persistence}),e.abrupt("return",new kt(this.config.env));case 22:throw i.code?new Te({code:i.code,message:"邮箱登录失败: ".concat(i.message)}):new Te({message:"邮箱登录失败"});case 23:case"end":return e.stop()}}),e,this)})));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"activate",value:function(){var e=(0,c.default)(r.default.mark((function e(t){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",this._request.send("auth.activateEndUserMail",{token:t}));case 1:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"resetPasswordWithToken",value:function(){var e=(0,c.default)(r.default.mark((function e(t,a){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",this._request.send("auth.resetPasswordWithToken",{token:t,newPassword:a}));case 1:case"end":return e.stop()}}),e,this)})));function t(t,a){return e.apply(this,arguments)}return t}()}]),a}(xt),Ct=function(e){(0,f.default)(a,e);var t=k(a);function a(){return(0,g.default)(this,a),t.apply(this,arguments)}return(0,y.default)(a,[{key:"signIn",value:function(){var e=(0,c.default)(r.default.mark((function e(t,a){var l,i,n,u,o;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("string"==typeof t){e.next=2;break}throw new Te({code:"PARAM_ERROR",message:"username must be a string"});case 2:return"string"!=typeof a&&(a="",console.warn("password is empty")),l=this._cache.keys.refreshTokenKey,e.next=6,this._request.send("auth.signIn",{loginType:dt.USERNAME,username:t,password:a,refresh_token:this._cache.getStore(l)||""});case 6:if(i=e.sent,n=i.refresh_token,u=i.access_token_expire,o=i.access_token,!n){e.next=23;break}if(this.setRefreshToken(n),!o||!u){e.next=16;break}this.setAccessToken(o,u),e.next=18;break;case 16:return e.next=18,this._request.refreshAccessToken();case 18:return e.next=20,this.refreshUserInfo();case 20:return ot(ct),ot(ft,{env:this.config.env,loginType:dt.USERNAME,persistence:this.config.persistence}),e.abrupt("return",new kt(this.config.env));case 23:throw i.code?new Te({code:i.code,message:"用户名密码登录失败: ".concat(i.message)}):new Te({message:"用户名密码登录失败"});case 24:case"end":return e.stop()}}),e,this)})));function t(t,a){return e.apply(this,arguments)}return t}()}]),a}(xt),It=function(){function e(t){(0,g.default)(this,e),this.config=t,this._cache=lt(t.env),this._request=At(t.env),this._onAnonymousConverted=this._onAnonymousConverted.bind(this),this._onLoginTypeChanged=this._onLoginTypeChanged.bind(this),ut(ft,this._onLoginTypeChanged)}return(0,y.default)(e,[{key:"currentUser",get:function(){var e=this.hasLoginState();return e&&e.user||null}},{key:"loginType",get:function(){return this._cache.getStore(this._cache.keys.loginTypeKey)}},{key:"anonymousAuthProvider",value:function(){return new Ot(this.config)}},{key:"customAuthProvider",value:function(){return new Et(this.config)}},{key:"emailAuthProvider",value:function(){return new Tt(this.config)}},{key:"usernameAuthProvider",value:function(){return new Ct(this.config)}},{key:"signInAnonymously",value:function(){var e=(0,c.default)(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Ot(this.config).signIn());case 1:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"signInWithEmailAndPassword",value:function(){var e=(0,c.default)(r.default.mark((function e(t,a){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Tt(this.config).signIn(t,a));case 1:case"end":return e.stop()}}),e,this)})));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"signInWithUsernameAndPassword",value:function(e,t){return new Ct(this.config).signIn(e,t)}},{key:"linkAndRetrieveDataWithTicket",value:function(){var e=(0,c.default)(r.default.mark((function e(t){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this._anonymousAuthProvider||(this._anonymousAuthProvider=new Ot(this.config)),ut(ht,this._onAnonymousConverted),e.next=3,this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(t);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"signOut",value:function(){var e=(0,c.default)(r.default.mark((function e(){var t,a,l,i,n,u;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.loginType!==dt.ANONYMOUS){e.next=2;break}throw new Te({message:"匿名用户不支持登出操作"});case 2:if(t=this._cache.keys,a=t.refreshTokenKey,l=t.accessTokenKey,i=t.accessTokenExpireKey,n=this._cache.getStore(a),n){e.next=5;break}return e.abrupt("return");case 5:return e.next=7,this._request.send("auth.logout",{refresh_token:n});case 7:return u=e.sent,e.abrupt("return",(this._cache.removeStore(a),this._cache.removeStore(l),this._cache.removeStore(i),ot(ct),ot(ft,{env:this.config.env,loginType:dt.NULL,persistence:this.config.persistence}),u));case 9:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"signUpWithEmailAndPassword",value:function(){var e=(0,c.default)(r.default.mark((function e(t,a){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",this._request.send("auth.signUpWithEmailAndPassword",{email:t,password:a}));case 1:case"end":return e.stop()}}),e,this)})));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"sendPasswordResetEmail",value:function(){var e=(0,c.default)(r.default.mark((function e(t){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",this._request.send("auth.sendPasswordResetEmail",{email:t}));case 1:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"onLoginStateChanged",value:function(e){var t=this;ut(ct,(function(){var a=t.hasLoginState();e.call(t,a)}));var a=this.hasLoginState();e.call(this,a)}},{key:"onLoginStateExpired",value:function(e){ut(vt,e.bind(this))}},{key:"onAccessTokenRefreshed",value:function(e){ut(bt,e.bind(this))}},{key:"onAnonymousConverted",value:function(e){ut(ht,e.bind(this))}},{key:"onLoginTypeChanged",value:function(e){var t=this;ut(ft,(function(){var a=t.hasLoginState();e.call(t,a)}))}},{key:"getAccessToken",value:function(){var e=(0,c.default)(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this._request.getAccessToken();case 2:return e.t0=e.sent.accessToken,e.t1=this.config.env,e.abrupt("return",{accessToken:e.t0,env:e.t1});case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"hasLoginState",value:function(){var e=this._cache.keys.refreshTokenKey;return this._cache.getStore(e)?new kt(this.config.env):null}},{key:"isUsernameRegistered",value:function(){var e=(0,c.default)(r.default.mark((function e(t){var a,l;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("string"==typeof t){e.next=2;break}throw new Te({code:"PARAM_ERROR",message:"username must be a string"});case 2:return e.next=4,this._request.send("auth.isUsernameRegistered",{username:t});case 4:return a=e.sent,l=a.data,e.abrupt("return",l&&l.isRegistered);case 7:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getLoginState",value:function(){return Promise.resolve(this.hasLoginState())}},{key:"signInWithTicket",value:function(){var e=(0,c.default)(r.default.mark((function e(t){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Et(this.config).signIn(t));case 1:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"shouldRefreshAccessToken",value:function(e){this._request._shouldRefreshAccessTokenHook=e.bind(this)}},{key:"getUserInfo",value:function(){return this._request.send("auth.getUserInfo",{}).then((function(e){return e.code?e:S(S({},e.data),{},{requestId:e.seqId})}))}},{key:"getAuthHeader",value:function(){var e=this._cache.keys,t=e.refreshTokenKey,a=e.accessTokenKey,l=this._cache.getStore(t);return{"x-cloudbase-credentials":this._cache.getStore(a)+"/@@/"+l}}},{key:"_onAnonymousConverted",value:function(e){var t=e.data.env;t===this.config.env&&this._cache.updatePersistence(this.config.persistence)}},{key:"_onLoginTypeChanged",value:function(e){var t=e.data,a=t.loginType,l=t.persistence,i=t.env;i===this.config.env&&(this._cache.updatePersistence(l),this._cache.setStore(this._cache.keys.loginTypeKey,a))}}]),e}(),Pt=function(e,t){t=t||Ge();var a=At(this.config.env),l=e.cloudPath,i=e.filePath,n=e.onUploadProgress,r=e.fileType,u=void 0===r?"image":r;return a.send("storage.getUploadMetadata",{path:l}).then((function(e){var r=e.data,o=r.url,s=r.authorization,d=r.token,c=r.fileId,v=r.cosFileId,f=e.requestId,h={key:l,signature:s,"x-cos-meta-fileid":v,success_action_status:"201","x-cos-security-token":d};a.upload({url:o,data:h,file:i,name:l,fileType:u,onUploadProgress:n}).then((function(e){201===e.statusCode?t(null,{fileID:c,requestId:f}):t(new Te({code:"STORAGE_REQUEST_FAIL",message:"STORAGE_REQUEST_FAIL: ".concat(e.data)}))})).catch((function(e){t(e)}))})).catch((function(e){t(e)})),t.promise},Dt=function(e,t){t=t||Ge();var a=At(this.config.env),l=e.cloudPath;return a.send("storage.getUploadMetadata",{path:l}).then((function(e){t(null,e)})).catch((function(e){t(e)})),t.promise},Rt=function(e,t){var a=e.fileList;if(t=t||Ge(),!a||!Array.isArray(a))return{code:"INVALID_PARAM",message:"fileList必须是非空的数组"};var l,i=_(a);try{for(i.s();!(l=i.n()).done;){var n=l.value;if(!n||"string"!=typeof n)return{code:"INVALID_PARAM",message:"fileList的元素必须是非空的字符串"}}}catch(u){i.e(u)}finally{i.f()}var r={fileid_list:a};return At(this.config.env).send("storage.batchDeleteFile",r).then((function(e){e.code?t(null,e):t(null,{fileList:e.data.delete_list,requestId:e.requestId})})).catch((function(e){t(e)})),t.promise},Lt=function(e,t){var a=e.fileList;t=t||Ge(),a&&Array.isArray(a)||t(null,{code:"INVALID_PARAM",message:"fileList必须是非空的数组"});var l,i=[],n=_(a);try{for(n.s();!(l=n.n()).done;){var r=l.value;"object"==(0,s.default)(r)?(r.hasOwnProperty("fileID")&&r.hasOwnProperty("maxAge")||t(null,{code:"INVALID_PARAM",message:"fileList的元素必须是包含fileID和maxAge的对象"}),i.push({fileid:r.fileID,max_age:r.maxAge})):"string"==typeof r?i.push({fileid:r}):t(null,{code:"INVALID_PARAM",message:"fileList的元素必须是字符串"})}}catch(o){n.e(o)}finally{n.f()}var u={file_list:i};return At(this.config.env).send("storage.batchGetDownloadUrl",u).then((function(e){e.code?t(null,e):t(null,{fileList:e.data.download_list,requestId:e.requestId})})).catch((function(e){t(e)})),t.promise},jt=function(){var e=(0,c.default)(r.default.mark((function e(t,a){var l,i,n,u;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return l=t.fileID,e.next=3,Lt.call(this,{fileList:[{fileID:l,maxAge:600}]});case 3:if(i=e.sent.fileList[0],"SUCCESS"===i.code){e.next=6;break}return e.abrupt("return",a?a(i):new Promise((function(e){e(i)})));case 6:if(n=At(this.config.env),u=i.download_url,u=encodeURI(u),a){e.next=10;break}return e.abrupt("return",n.download({url:u}));case 10:return e.t0=a,e.next=13,n.download({url:u});case 13:e.t1=e.sent,(0,e.t0)(e.t1);case 15:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}(),Nt=function(e,t){var a,l=e.name,i=e.data,n=e.query,r=e.parse,u=e.search,o=t||Ge();try{a=i?JSON.stringify(i):""}catch(l){return Promise.reject(l)}if(!l)return Promise.reject(new Te({code:"PARAM_ERROR",message:"函数名不能为空"}));var s={inQuery:n,parse:r,search:u,function_name:l,request_data:a};return At(this.config.env).send("functions.invokeFunction",s).then((function(e){if(e.code)o(null,e);else{var t=e.data.response_data;if(r)o(null,{result:t,requestId:e.requestId});else try{t=JSON.parse(e.data.response_data),o(null,{result:t,requestId:e.requestId})}catch(e){o(new Te({message:"response data must be json"}))}}return o.promise})).catch((function(e){o(e)})),o.promise},Mt={timeout:15e3,persistence:"session"},Ut={},Bt=function(){function e(t){(0,g.default)(this,e),this.config=t||this.config,this.authObj=void 0}return(0,y.default)(e,[{key:"init",value:function(t){switch(Ze.adapter||(this.requestClient=new Ze.adapter.reqClass({timeout:t.timeout||5e3,timeoutMsg:"请求在".concat((t.timeout||5e3)/1e3,"s内未完成，已中断")})),this.config=S(S({},Mt),t),!0){case this.config.timeout>6e5:console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"),this.config.timeout=6e5;break;case this.config.timeout<100:console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"),this.config.timeout=100}return new e(this.config)}},{key:"auth",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.persistence;if(this.authObj)return this.authObj;var a,l=t||Ze.adapter.primaryStorage||Mt.persistence;return l!==this.config.persistence&&(this.config.persistence=l),function(e){var t=e.env;tt[t]=new et(e),at[t]=new et(S(S({},e),{},{persistence:"local"}))}(this.config),a=this.config,wt[a.env]=new _t(a),this.authObj=new It(this.config),this.authObj}},{key:"on",value:function(e,t){return ut.apply(this,[e,t])}},{key:"off",value:function(e,t){return st.apply(this,[e,t])}},{key:"callFunction",value:function(e,t){return Nt.apply(this,[e,t])}},{key:"deleteFile",value:function(e,t){return Rt.apply(this,[e,t])}},{key:"getTempFileURL",value:function(e,t){return Lt.apply(this,[e,t])}},{key:"downloadFile",value:function(e,t){return jt.apply(this,[e,t])}},{key:"uploadFile",value:function(e,t){return Pt.apply(this,[e,t])}},{key:"getUploadMetadata",value:function(e,t){return Dt.apply(this,[e,t])}},{key:"registerExtension",value:function(e){Ut[e.name]=e}},{key:"invokeExtension",value:function(){var e=(0,c.default)(r.default.mark((function e(t,a){var l;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(l=Ut[t],l){e.next=3;break}throw new Te({message:"扩展".concat(t," 必须先注册")});case 3:return e.next=5,l.invoke(a,this);case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e,this)})));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"useAdapters",value:function(e){var t=Je(e)||{},a=t.adapter,l=t.runtime;a&&(Ze.adapter=a),l&&(Ze.runtime=l)}}]),e}(),Ft=new Bt;function Vt(e,t,a){void 0===a&&(a={});var l=/\?/.test(t),i="";for(var n in a)""===i?!l&&(t+="?"):i+="&",i+=n+"="+encodeURIComponent(a[n]);return/^http(s)?:\/\//.test(t+=i)?t:""+e+t}var $t=function(){function e(){(0,g.default)(this,e)}return(0,y.default)(e,[{key:"post",value:function(e){var t=e.url,a=e.data,l=e.headers;return new Promise((function(e,i){Ce.request({url:Vt("https:",t),data:a,method:"POST",header:l,success:function(t){e(t)},fail:function(e){i(e)}})}))}},{key:"upload",value:function(e){return new Promise((function(t,a){var l=e.url,i=e.file,n=e.data,r=e.headers,u=e.fileType,o=Ce.uploadFile({url:Vt("https:",l),name:"file",formData:Object.assign({},n),filePath:i,fileType:u,header:r,success:function(e){var a={statusCode:e.statusCode,data:e.data||{}};200===e.statusCode&&n.success_action_status&&(a.statusCode=parseInt(n.success_action_status,10)),t(a)},fail:function(e){a(new Error(e.errMsg||"uploadFile:fail"))}});"function"==typeof e.onUploadProgress&&o&&"function"==typeof o.onProgressUpdate&&o.onProgressUpdate((function(t){e.onUploadProgress({loaded:t.totalBytesSent,total:t.totalBytesExpectedToSend})}))}))}}]),e}(),Kt={setItem:function(e,t){Ce.setStorageSync(e,t)},getItem:function(e){return Ce.getStorageSync(e)},removeItem:function(e){Ce.removeStorageSync(e)},clear:function(){Ce.clearStorageSync()}},qt={genAdapter:function(){return{root:{},reqClass:$t,localStorage:Kt,primaryStorage:"local"}},isMatch:function(){return!0},runtime:"uni_app"};Ft.useAdapters(qt);var Ht=Ft,Gt=Ht.init;Ht.init=function(e){e.env=e.spaceId;var t=Gt.call(this,e);t.config.provider="tencent",t.config.spaceId=e.spaceId;var a=t.auth;return t.auth=function(e){var t=a.call(this,e);return["linkAndRetrieveDataWithTicket","signInAnonymously","signOut","getAccessToken","getLoginState","signInWithTicket","getUserInfo"].forEach((function(e){var a;t[e]=(a=t[e],function(e){e=e||{};var t=ke(e),l=t.success,i=t.fail,n=t.complete;if(!(l||i||n))return a.call(this,e);a.call(this,e).then((function(e){l&&l(e),n&&n(e)}),(function(e){i&&i(e),n&&n(e)}))}).bind(t)})),t},t.customAuth=t.auth,t};var Wt=Ht,zt=function(e){(0,f.default)(a,e);var t=k(a);function a(){return(0,g.default)(this,a),t.apply(this,arguments)}return(0,y.default)(a,[{key:"getAccessToken",value:function(){var e=this;return new Promise((function(t,a){var l="Anonymous_Access_token";e.setAccessToken(l),t(l)}))}},{key:"setupRequest",value:function(e,t){var a=Object.assign({},e,{spaceId:this.config.spaceId,timestamp:Date.now()}),l={"Content-Type":"application/json"};"auth"!==t&&(a.token=this.accessToken,l["x-basement-token"]=this.accessToken),l["x-serverless-sign"]=Me.sign(a,this.config.clientSecret);var i=je();l["x-client-info"]=encodeURIComponent(JSON.stringify(i));var n=Ie(),r=n.token;return l["x-client-token"]=r,{url:this.config.requestUrl,method:"POST",data:a,dataType:"json",header:JSON.parse(JSON.stringify(l))}}},{key:"uploadFileToOSS",value:function(e){var t=this,a=e.url,l=e.formData,i=e.name,n=e.filePath,r=e.fileType,u=e.onUploadProgress;return new Promise((function(e,o){var s=t.adapter.uploadFile({url:a,formData:l,name:i,filePath:n,fileType:r,success:function(t){t&&t.statusCode<400?e(t):o(new Te({code:"UPLOAD_FAILED",message:"文件上传失败"}))},fail:function(e){o(new Te({code:e.code||"UPLOAD_FAILED",message:e.message||e.errMsg||"文件上传失败"}))}});"function"==typeof u&&s&&"function"==typeof s.onProgressUpdate&&s.onProgressUpdate((function(e){u({loaded:e.totalBytesSent,total:e.totalBytesExpectedToSend})}))}))}},{key:"uploadFile",value:function(e){var t,a=this,l=e.filePath,i=e.cloudPath,n=e.fileType,r=void 0===n?"image":n,u=e.onUploadProgress;if(!i)throw new Te({code:"CLOUDPATH_REQUIRED",message:"cloudPath不可为空"});return this.getOSSUploadOptionsFromPath({cloudPath:i}).then((function(e){var i=e.result,n=i.url,o=i.formData,s=i.name;t=e.result.fileUrl;var d={url:n,formData:o,name:s,filePath:l,fileType:r};return a.uploadFileToOSS(Object.assign({},d,{onUploadProgress:u}))})).then((function(){return a.reportOSSUpload({cloudPath:i})})).then((function(e){return new Promise((function(a,i){e.success?a({success:!0,filePath:l,fileID:t}):i(new Te({code:"UPLOAD_FAILED",message:"文件上传失败"}))}))}))}},{key:"deleteFile",value:function(e){var t=e.fileList,a={method:"serverless.file.resource.delete",params:JSON.stringify({fileList:t})};return this.request(this.setupRequest(a)).then((function(e){if(e.success)return e.result;throw new Te({code:"DELETE_FILE_FAILED",message:"删除文件失败"})}))}},{key:"getTempFileURL",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.fileList,a=e.maxAge;if(!Array.isArray(t)||0===t.length)throw new Te({code:"INVALID_PARAM",message:"fileList的元素必须是非空的字符串"});var l={method:"serverless.file.resource.getTempFileURL",params:JSON.stringify({fileList:t,maxAge:a})};return this.request(this.setupRequest(l)).then((function(e){if(e.success)return{fileList:e.result.fileList.map((function(e){return{fileID:e.fileID,tempFileURL:e.tempFileURL}}))};throw new Te({code:"GET_TEMP_FILE_URL_FAILED",message:"获取临时文件链接失败"})}))}}]),a}(Ue),Jt={init:function(e){var t=new zt(e),a={signInAnonymously:function(){return t.authorize()},getLoginState:function(){return Promise.resolve(!1)}};return t.auth=function(){return a},t.customAuth=t.auth,t}},Zt=T((function(e,t){e.exports=I.enc.Hex}));function Yt(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}))}function Qt(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=t.data,l=t.functionName,i=t.method,n=t.headers,r=t.signHeaderKeys,u=void 0===r?[]:r,s=t.config,d=Date.now(),c=Yt(),v=Object.assign({},n,{"x-from-app-id":s.spaceAppId,"x-from-env-id":s.spaceId,"x-to-env-id":s.spaceId,"x-from-instance-id":d,"x-from-function-name":l,"x-client-timestamp":d,"x-alipay-source":"client","x-request-id":c,"x-alipay-callid":c,"x-trace-id":c}),f=["x-from-app-id","x-from-env-id","x-to-env-id","x-from-instance-id","x-from-function-name","x-client-timestamp"].concat(u),h=e.split("?")||[],b=(0,o.default)(h,2),p=b[0],g=void 0===p?"":p,y=b[1],m=void 0===y?"":y,_=function(e){var t=e.signedHeaders.join(";"),a=e.signedHeaders.map((function(t){return"".concat(t.toLowerCase(),":").concat(e.headers[t],"\n")})).join(""),l=qe(e.body).toString(Zt),i="".concat(e.method.toUpperCase(),"\n").concat(e.path,"\n").concat(e.query,"\n").concat(a,"\n").concat(t,"\n").concat(l,"\n"),n=qe(i).toString(Zt),r="HMAC-SHA256\n".concat(e.timestamp,"\n").concat(n,"\n"),u=He(r,e.secretKey).toString(Zt);return"HMAC-SHA256 Credential=".concat(e.secretId,", SignedHeaders=").concat(t,", Signature=").concat(u)}({path:g,query:m,method:i,headers:v,timestamp:d,body:JSON.stringify(a),secretId:s.accessKey,secretKey:s.secretKey,signedHeaders:f.sort()});return{url:"".concat(s.endpoint).concat(e),headers:Object.assign({},v,{Authorization:_})}}function Xt(e){var t=e.url,a=e.data,l=e.method,i=void 0===l?"POST":l,n=e.headers,r=void 0===n?{}:n;return new Promise((function(e,l){Ce.request({url:t,method:i,data:"object"==(0,s.default)(a)?JSON.stringify(a):a,header:r,dataType:"json",complete:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=r["x-trace-id"]||"";if(!t.statusCode||t.statusCode>=400){var i=t.data||{},n=i.message,u=i.errMsg,o=i.trace_id;return l(new Te({code:"SYS_ERR",message:n||u||"request:fail",requestId:o||a}))}e({status:t.statusCode,data:t.data,headers:t.header,requestId:a})}})}))}function ea(e,t){var a=e.path,l=e.data,i=e.method,n=void 0===i?"GET":i,r=Qt(a,{functionName:"",data:l,method:n,headers:{"x-alipay-cloud-mode":"oss","x-data-api-type":"oss","x-expire-timestamp":Date.now()+6e4},signHeaderKeys:["x-data-api-type","x-expire-timestamp"],config:t}),u=r.url,o=r.headers;return Xt({url:u,data:l,method:n,headers:o}).then((function(e){var t=e.data||{};if(!t.success)throw new Te({code:e.errCode,message:e.errMsg,requestId:e.requestId});return t.data||{}})).catch((function(e){throw new Te({code:e.errCode,message:e.errMsg,requestId:e.requestId})}))}function ta(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=e.trim().replace(/^cloud:\/\//,""),a=t.indexOf("/");if(a<=0)throw new Te({code:"INVALID_PARAM",message:"fileID不合法"});var l=t.substring(0,a),i=t.substring(a+1);return l!==this.config.spaceId&&console.warn("file ".concat(e," does not belong to env ").concat(this.config.spaceId)),i}function aa(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return"cloud://".concat(this.config.spaceId,"/").concat(e.replace(/^\/+/,""))}var la=function(){function e(t){(0,g.default)(this,e),this.config=t}return(0,y.default)(e,[{key:"signedURL",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a="/ws/function/".concat(e),l=this.config.wsEndpoint.replace(/^ws(s)?:\/\//,""),i=Object.assign({},t,{accessKeyId:this.config.accessKey,signatureNonce:Yt(),timestamp:""+Date.now()}),n=[a,["accessKeyId","authorization","signatureNonce","timestamp"].sort().map((function(e){return i[e]?"".concat(e,"=").concat(i[e]):null})).filter(Boolean).join("&"),"host:".concat(l)].join("\n"),r=["HMAC-SHA256",qe(n).toString(Zt)].join("\n"),u=He(r,this.config.secretKey).toString(Zt),o=Object.keys(i).map((function(e){return"".concat(e,"=").concat(encodeURIComponent(i[e]))})).join("&");return"".concat(this.config.wsEndpoint).concat(a,"?").concat(o,"&signature=").concat(u)}}]),e}(),ia=function(){function e(t){if((0,g.default)(this,e),["spaceId","spaceAppId","accessKey","secretKey"].forEach((function(e){if(!Object.prototype.hasOwnProperty.call(t,e))throw new Error("".concat(e," required"))})),t.endpoint){if("string"!=typeof t.endpoint)throw new Error("endpoint must be string");if(!/^https:\/\//.test(t.endpoint))throw new Error("endpoint must start with https://");t.endpoint=t.endpoint.replace(/\/$/,"")}this.config=Object.assign({},t,{endpoint:t.endpoint||"https://".concat(t.spaceId,".api-hz.cloudbasefunction.cn"),wsEndpoint:t.wsEndpoint||"wss://".concat(t.spaceId,".api-hz.cloudbasefunction.cn")}),this._websocket=new la(this.config)}return(0,y.default)(e,[{key:"callFunction",value:function(e){return function(e,t){var a=e.name,l=e.data,i=e.async,n=void 0!==i&&i,r="POST",u={"x-to-function-name":a};n&&(u["x-function-invoke-type"]="async");var o=Qt("/functions/invokeFunction",{functionName:a,data:l,method:r,headers:u,signHeaderKeys:["x-to-function-name"],config:t}),s=o.url,d=o.headers;return Xt({url:s,data:l,method:r,headers:d}).then((function(e){var t=0;if(n){var a=e.data||{};t="200"===a.errCode?0:a.errCode,e.data=a.data||{},e.errMsg=a.errMsg}if(0!==t)throw new Te({code:t,message:e.errMsg,requestId:e.requestId});return{errCode:t,success:0===t,requestId:e.requestId,result:e.data}})).catch((function(e){throw new Te({code:e.errCode,message:e.errMsg,requestId:e.requestId})}))}(e,this.config)}},{key:"uploadFileToOSS",value:function(e){var t=e.url,a=e.filePath,l=e.fileType,i=e.formData,n=e.onUploadProgress;return new Promise((function(e,r){var u=Ce.uploadFile({url:t,filePath:a,fileType:l,formData:i,name:"file",success:function(t){t&&t.statusCode<400?e(t):r(new Te({code:"UPLOAD_FAILED",message:"文件上传失败"}))},fail:function(e){r(new Te({code:e.code||"UPLOAD_FAILED",message:e.message||e.errMsg||"文件上传失败"}))}});"function"==typeof n&&u&&"function"==typeof u.onProgressUpdate&&u.onProgressUpdate((function(e){n({loaded:e.totalBytesSent,total:e.totalBytesExpectedToSend})}))}))}},{key:"uploadFile",value:function(){var e=(0,c.default)(r.default.mark((function e(t){var a,l,i,n,u,o,s,d,c,v,f;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=t.filePath,l=t.cloudPath,i=void 0===l?"":l,n=t.fileType,u=void 0===n?"image":n,o=t.onUploadProgress,"string"===F(i)){e.next=3;break}throw new Te({code:"INVALID_PARAM",message:"cloudPath必须为字符串类型"});case 3:if(i=i.trim()){e.next=5;break}throw new Te({code:"INVALID_PARAM",message:"cloudPath不可为空"});case 5:if(!/:\/\//.test(i)){e.next=7;break}throw new Te({code:"INVALID_PARAM",message:"cloudPath不合法"});case 7:return e.next=9,ea({path:"/".concat(i.replace(/^\//,""),"?post_url")},this.config);case 9:return s=e.sent,d=s.file_id,c=s.upload_url,v=s.form_data,f=v&&v.reduce((function(e,t){return e[t.key]=t.value,e}),{}),e.abrupt("return",this.uploadFileToOSS({url:c,filePath:a,fileType:u,formData:f,onUploadProgress:o}).then((function(){return{fileID:d}})));case 15:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getTempFileURL",value:function(){var e=(0,c.default)(r.default.mark((function e(t){var a,l=this;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.fileList,e.abrupt("return",new Promise((function(e,t){(!a||a.length<0)&&t(new Te({errCode:"INVALID_PARAM",errMsg:"fileList不能为空数组"})),a.length>50&&t(new Te({errCode:"INVALID_PARAM",errMsg:"fileList数组长度不能超过50"}));var i,n=[],r=_(a);try{for(r.s();!(i=r.n()).done;){var u=i.value;"string"!==F(u)&&t(new Te({errCode:"INVALID_PARAM",errMsg:"fileList的元素必须是非空的字符串"}));var o=ta.call(l,u);n.push({file_id:o,expire:600})}}catch(s){r.e(s)}finally{r.f()}ea({path:"/?download_url",data:{file_list:n},method:"POST"},l.config).then((function(t){var a=t.file_list,i=void 0===a?[]:a;e({fileList:i.map((function(e){return{fileID:aa.call(l,e.file_id),tempFileURL:e.download_url}}))})})).catch((function(e){return t(e)}))})));case 2:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"connectWebSocket",value:function(){var e=(0,c.default)(r.default.mark((function e(t){var a,l;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.name,l=t.query,e.abrupt("return",Ce.connectSocket({url:this._websocket.signedURL(a,l),complete:function(){}}));case 2:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()}]),e}(),na={init:function(e){e.provider="alipay";var t=new ia(e);return t.auth=function(){return{signInAnonymously:function(){return Promise.resolve()},getLoginState:function(){return Promise.resolve(!0)}}},t}};function ra(e){var t,a=e.data;t=je();var l=JSON.parse(JSON.stringify(a||{}));if(Object.assign(l,{clientInfo:t}),!l.uniIdToken){var i=Ie(),n=i.token;n&&(l.uniIdToken=n)}return l}function ua(){return oa.apply(this,arguments)}function oa(){return oa=(0,c.default)(r.default.mark((function e(){var t,a,l,i,n,u,o,s,d,c,v=this,f=arguments;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=f.length>0&&void 0!==f[0]?f[0]:{},a=t.name,l=t.data,e.next=3,this.__dev__.initLocalNetwork();case 3:return i=this.__dev__,n=i.localAddress,u=i.localPort,o={aliyun:"aliyun",tencent:"tcb",alipay:"alipay"}[this.config.provider],s=this.config.spaceId,d="http://".concat(n,":").concat(u,"/system/check-function"),c="http://".concat(n,":").concat(u,"/cloudfunctions/").concat(a),e.abrupt("return",new Promise((function(e,t){Ce.request({method:"POST",url:d,data:{name:a,platform:Q,provider:o,spaceId:s},timeout:3e3,success:function(t){e(t)},fail:function(){e({data:{code:"NETWORK_ERROR",message:"连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。"}})}})})).then((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.data,a=t||{},l=a.code,i=a.message;return{code:0===l?0:l||"SYS_ERR",message:i||"SYS_ERR"}})).then((function(e){var t=e.code,i=e.message;if(0!==t){switch(t){case"MODULE_ENCRYPTED":console.error("此云函数（".concat(a,"）依赖加密公共模块不可本地调试，自动切换为云端已部署的云函数"));break;case"FUNCTION_ENCRYPTED":console.error("此云函数（".concat(a,"）已加密不可本地调试，自动切换为云端已部署的云函数"));break;case"ACTION_ENCRYPTED":console.error(i||"需要访问加密的uni-clientDB-action，自动切换为云端环境");break;case"NETWORK_ERROR":console.error(i||"连接本地调试服务失败，请检查客户端是否和主机在同一局域网下");break;case"SWITCH_TO_CLOUD":break;default:var n="检测本地调试服务出现错误：".concat(i,"，请检查网络环境或重启客户端再试");throw console.error(n),new Error(n)}return v._callCloudFunction({name:a,data:l})}return new Promise((function(e,t){var a=ra.call(v,{data:l});Ce.request({method:"POST",url:c,data:{provider:o,platform:Q,param:a},success:function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},l=a.statusCode,i=a.data;return!l||l>=400?t(new Te({code:i.code||"SYS_ERR",message:i.message||"request:fail"})):e({result:i})},fail:function(e){t(new Te({code:e.code||e.errCode||"SYS_ERR",message:e.message||e.errMsg||"request:fail"}))}})}))})));case 5:case"end":return e.stop()}}),e,this)}))),oa.apply(this,arguments)}var sa=[{rule:/fc_function_not_found|FUNCTION_NOT_FOUND/,content:"，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间",mode:"append"}],da=/[\\^$.*+?()[\]{}|]/g,ca=RegExp(da.source);function va(e,t,a){return e.replace(new RegExp((l=t)&&ca.test(l)?l.replace(da,"\\$&"):l,"g"),a);var l}var fa="none",ha="request",ba="response",pa="both",ga=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=t.secretType,l=t.uniCloudIns;(0,g.default)(this,e),this.clientType="",this.secretType=a||fa,this.uniCloudIns=l;var i,n=this.uniCloudIns.config,r=n.provider,u=n.spaceId;this.provider=r,this.spaceId=u,this.scopedGlobalCache=(i=this.uniCloudIns,le("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}",i.config.spaceId)))}return(0,y.default)(e,[{key:"getSystemInfo",value:function(){return this._systemInfo||(this._systemInfo=De()),this._systemInfo}},{key:"appId",get:function(){return this.getSystemInfo().appId}},{key:"deviceId",get:function(){return this.getSystemInfo().deviceId}},{key:"encryptData",value:function(){var e=(0,c.default)(r.default.mark((function e(t){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",this.secretType===fa?t:this.platformEncryptData(t));case 1:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"decryptResult",value:function(){var e=(0,c.default)(r.default.mark((function e(t){var a,l,i;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.secretType!==fa){e.next=2;break}return e.abrupt("return",t);case 2:return a=t||{},l=a.errCode,i=a.content,e.abrupt("return",l||!i?t:this.secretType===ha?i:this.platformDecryptResult(t));case 4:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"wrapVerifyClientCallFunction",value:function(e){var t=this;return(0,c.default)(r.default.mark((function a(){var l,i,n,u,o,s=arguments;return r.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return l=s.length>0&&void 0!==s[0]?s[0]:{},i=l.name,n=l.data,u=void 0===n?{}:n,a.next=3,t.prepare();case 3:return a.next=5,t.platformGetSignOption();case 5:return(u=JSON.parse(JSON.stringify(u)))._uniCloudOptions=a.sent,a.next=8,e({name:i,data:u});case 8:if(o=a.sent,a.t0=t.isClientKeyNotFound(o),!a.t0){a.next=19;break}return a.next=13,t.prepare({forceUpdate:!0});case 13:return a.next=15,t.platformGetSignOption();case 15:return u._uniCloudOptions=a.sent,a.next=18,e({name:i,data:u});case 18:o=a.sent;case 19:return a.abrupt("return",o);case 20:case"end":return a.stop()}}),a)})))}},{key:"wrapEncryptDataCallFunction",value:function(e){var t=this;return(0,c.default)(r.default.mark((function a(){var l,i,n,u,o,s,d,c=arguments;return r.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return l=c.length>0&&void 0!==c[0]?c[0]:{},i=l.name,n=l.data,u=void 0===n?{}:n,a.next=3,t.prepare();case 3:return a.next=5,t.encryptData(u);case 5:return o=a.sent,a.next=8,e({name:i,data:o});case 8:if(s=a.sent,!t.isClientKeyNotFound(s)){a.next=21;break}return a.next=12,t.prepare({forceUpdate:!0});case 12:return a.next=14,t.encryptData(u);case 14:return d=a.sent,a.next=17,t.platformGetSignOption();case 17:return u._uniCloudOptions=a.sent,a.next=20,e({name:i,data:d});case 20:s=a.sent;case 21:return a.next=23,t.decryptResult(s.result);case 23:return s.result=a.sent,a.abrupt("return",s);case 25:case"end":return a.stop()}}),a)})))}}]),e}();
/*! MIT License. Copyright 2015-2018 Richard Moore <me@ricmoo.com>. See LICENSE.txt. */
function ya(e){return parseInt(e)===e}function ma(e){if(!ya(e.length))return!1;for(var t=0;t<e.length;t++)if(!ya(e[t])||e[t]<0||e[t]>255)return!1;return!0}function _a(e,t){if(e.buffer&&"Uint8Array"===e.name)return t&&(e=e.slice?e.slice():Array.prototype.slice.call(e)),e;if(Array.isArray(e)){if(!ma(e))throw new Error("Array contains invalid value: "+e);return new Uint8Array(e)}if(ya(e.length)&&ma(e))return new Uint8Array(e);throw new Error("unsupported array-like object")}function wa(e){return new Uint8Array(e)}function Aa(e,t,a,l,i){null==l&&null==i||(e=e.slice?e.slice(l,i):Array.prototype.slice.call(e,l,i)),t.set(e,a)}var xa,Sa={toBytes:function(e){var t=[],a=0;for(e=encodeURI(e);a<e.length;){var l=e.charCodeAt(a++);37===l?(t.push(parseInt(e.substr(a,2),16)),a+=2):t.push(l)}return _a(t)},fromBytes:function(e){for(var t=[],a=0;a<e.length;){var l=e[a];l<128?(t.push(String.fromCharCode(l)),a++):l>191&&l<224?(t.push(String.fromCharCode((31&l)<<6|63&e[a+1])),a+=2):(t.push(String.fromCharCode((15&l)<<12|(63&e[a+1])<<6|63&e[a+2])),a+=3)}return t.join("")}},ka=(xa="0123456789abcdef",{toBytes:function(e){for(var t=[],a=0;a<e.length;a+=2)t.push(parseInt(e.substr(a,2),16));return t},fromBytes:function(e){for(var t=[],a=0;a<e.length;a++){var l=e[a];t.push(xa[(240&l)>>4]+xa[15&l])}return t.join("")}}),Oa={16:10,24:12,32:14},Ea=[1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145],Ta=[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22],Ca=[82,9,106,213,48,54,165,56,191,64,163,158,129,243,215,251,124,227,57,130,155,47,255,135,52,142,67,68,196,222,233,203,84,123,148,50,166,194,35,61,238,76,149,11,66,250,195,78,8,46,161,102,40,217,36,178,118,91,162,73,109,139,209,37,114,248,246,100,134,104,152,22,212,164,92,204,93,101,182,146,108,112,72,80,253,237,185,218,94,21,70,87,167,141,157,132,144,216,171,0,140,188,211,10,247,228,88,5,184,179,69,6,208,44,30,143,202,63,15,2,193,175,189,3,1,19,138,107,58,145,17,65,79,103,220,234,151,242,207,206,240,180,230,115,150,172,116,34,231,173,53,133,226,249,55,232,28,117,223,110,71,241,26,113,29,41,197,137,111,183,98,14,170,24,190,27,252,86,62,75,198,210,121,32,154,219,192,254,120,205,90,244,31,221,168,51,136,7,199,49,177,18,16,89,39,128,236,95,96,81,127,169,25,181,74,13,45,229,122,159,147,201,156,239,160,224,59,77,174,42,245,176,200,235,187,60,131,83,153,97,23,43,4,126,186,119,214,38,225,105,20,99,85,33,12,125],Ia=[3328402341,4168907908,4000806809,4135287693,4294111757,3597364157,3731845041,2445657428,1613770832,33620227,3462883241,1445669757,3892248089,3050821474,1303096294,3967186586,2412431941,528646813,2311702848,4202528135,4026202645,2992200171,2387036105,4226871307,1101901292,3017069671,1604494077,1169141738,597466303,1403299063,3832705686,2613100635,1974974402,3791519004,1033081774,1277568618,1815492186,2118074177,4126668546,2211236943,1748251740,1369810420,3521504564,4193382664,3799085459,2883115123,1647391059,706024767,134480908,2512897874,1176707941,2646852446,806885416,932615841,168101135,798661301,235341577,605164086,461406363,3756188221,3454790438,1311188841,2142417613,3933566367,302582043,495158174,1479289972,874125870,907746093,3698224818,3025820398,1537253627,2756858614,1983593293,3084310113,2108928974,1378429307,3722699582,1580150641,327451799,2790478837,3117535592,0,3253595436,1075847264,3825007647,2041688520,3059440621,3563743934,2378943302,1740553945,1916352843,2487896798,2555137236,2958579944,2244988746,3151024235,3320835882,1336584933,3992714006,2252555205,2588757463,1714631509,293963156,2319795663,3925473552,67240454,4269768577,2689618160,2017213508,631218106,1269344483,2723238387,1571005438,2151694528,93294474,1066570413,563977660,1882732616,4059428100,1673313503,2008463041,2950355573,1109467491,537923632,3858759450,4260623118,3218264685,2177748300,403442708,638784309,3287084079,3193921505,899127202,2286175436,773265209,2479146071,1437050866,4236148354,2050833735,3362022572,3126681063,840505643,3866325909,3227541664,427917720,2655997905,2749160575,1143087718,1412049534,999329963,193497219,2353415882,3354324521,1807268051,672404540,2816401017,3160301282,369822493,2916866934,3688947771,1681011286,1949973070,336202270,2454276571,201721354,1210328172,3093060836,2680341085,3184776046,1135389935,3294782118,965841320,831886756,3554993207,4068047243,3588745010,2345191491,1849112409,3664604599,26054028,2983581028,2622377682,1235855840,3630984372,2891339514,4092916743,3488279077,3395642799,4101667470,1202630377,268961816,1874508501,4034427016,1243948399,1546530418,941366308,1470539505,1941222599,2546386513,3421038627,2715671932,3899946140,1042226977,2521517021,1639824860,227249030,260737669,3765465232,2084453954,1907733956,3429263018,2420656344,100860677,4160157185,470683154,3261161891,1781871967,2924959737,1773779408,394692241,2579611992,974986535,664706745,3655459128,3958962195,731420851,571543859,3530123707,2849626480,126783113,865375399,765172662,1008606754,361203602,3387549984,2278477385,2857719295,1344809080,2782912378,59542671,1503764984,160008576,437062935,1707065306,3622233649,2218934982,3496503480,2185314755,697932208,1512910199,504303377,2075177163,2824099068,1841019862,739644986],Pa=[2781242211,2230877308,2582542199,2381740923,234877682,3184946027,2984144751,1418839493,1348481072,50462977,2848876391,2102799147,434634494,1656084439,3863849899,2599188086,1167051466,2636087938,1082771913,2281340285,368048890,3954334041,3381544775,201060592,3963727277,1739838676,4250903202,3930435503,3206782108,4149453988,2531553906,1536934080,3262494647,484572669,2923271059,1783375398,1517041206,1098792767,49674231,1334037708,1550332980,4098991525,886171109,150598129,2481090929,1940642008,1398944049,1059722517,201851908,1385547719,1699095331,1587397571,674240536,2704774806,252314885,3039795866,151914247,908333586,2602270848,1038082786,651029483,1766729511,3447698098,2682942837,454166793,2652734339,1951935532,775166490,758520603,3000790638,4004797018,4217086112,4137964114,1299594043,1639438038,3464344499,2068982057,1054729187,1901997871,2534638724,4121318227,1757008337,0,750906861,1614815264,535035132,3363418545,3988151131,3201591914,1183697867,3647454910,1265776953,3734260298,3566750796,3903871064,1250283471,1807470800,717615087,3847203498,384695291,3313910595,3617213773,1432761139,2484176261,3481945413,283769337,100925954,2180939647,4037038160,1148730428,3123027871,3813386408,4087501137,4267549603,3229630528,2315620239,2906624658,3156319645,1215313976,82966005,3747855548,3245848246,1974459098,1665278241,807407632,451280895,251524083,1841287890,1283575245,337120268,891687699,801369324,3787349855,2721421207,3431482436,959321879,1469301956,4065699751,2197585534,1199193405,2898814052,3887750493,724703513,2514908019,2696962144,2551808385,3516813135,2141445340,1715741218,2119445034,2872807568,2198571144,3398190662,700968686,3547052216,1009259540,2041044702,3803995742,487983883,1991105499,1004265696,1449407026,1316239930,504629770,3683797321,168560134,1816667172,3837287516,1570751170,1857934291,4014189740,2797888098,2822345105,2754712981,936633572,2347923833,852879335,1133234376,1500395319,3084545389,2348912013,1689376213,3533459022,3762923945,3034082412,4205598294,133428468,634383082,2949277029,2398386810,3913789102,403703816,3580869306,2297460856,1867130149,1918643758,607656988,4049053350,3346248884,1368901318,600565992,2090982877,2632479860,557719327,3717614411,3697393085,2249034635,2232388234,2430627952,1115438654,3295786421,2865522278,3633334344,84280067,33027830,303828494,2747425121,1600795957,4188952407,3496589753,2434238086,1486471617,658119965,3106381470,953803233,334231800,3005978776,857870609,3151128937,1890179545,2298973838,2805175444,3056442267,574365214,2450884487,550103529,1233637070,4289353045,2018519080,2057691103,2399374476,4166623649,2148108681,387583245,3664101311,836232934,3330556482,3100665960,3280093505,2955516313,2002398509,287182607,3413881008,4238890068,3597515707,975967766],Da=[1671808611,2089089148,2006576759,2072901243,4061003762,1807603307,1873927791,3310653893,810573872,16974337,1739181671,729634347,4263110654,3613570519,2883997099,1989864566,3393556426,2191335298,3376449993,2106063485,4195741690,1508618841,1204391495,4027317232,2917941677,3563566036,2734514082,2951366063,2629772188,2767672228,1922491506,3227229120,3082974647,4246528509,2477669779,644500518,911895606,1061256767,4144166391,3427763148,878471220,2784252325,3845444069,4043897329,1905517169,3631459288,827548209,356461077,67897348,3344078279,593839651,3277757891,405286936,2527147926,84871685,2595565466,118033927,305538066,2157648768,3795705826,3945188843,661212711,2999812018,1973414517,152769033,2208177539,745822252,439235610,455947803,1857215598,1525593178,2700827552,1391895634,994932283,3596728278,3016654259,695947817,3812548067,795958831,2224493444,1408607827,3513301457,0,3979133421,543178784,4229948412,2982705585,1542305371,1790891114,3410398667,3201918910,961245753,1256100938,1289001036,1491644504,3477767631,3496721360,4012557807,2867154858,4212583931,1137018435,1305975373,861234739,2241073541,1171229253,4178635257,33948674,2139225727,1357946960,1011120188,2679776671,2833468328,1374921297,2751356323,1086357568,2408187279,2460827538,2646352285,944271416,4110742005,3168756668,3066132406,3665145818,560153121,271589392,4279952895,4077846003,3530407890,3444343245,202643468,322250259,3962553324,1608629855,2543990167,1154254916,389623319,3294073796,2817676711,2122513534,1028094525,1689045092,1575467613,422261273,1939203699,1621147744,2174228865,1339137615,3699352540,577127458,712922154,2427141008,2290289544,1187679302,3995715566,3100863416,339486740,3732514782,1591917662,186455563,3681988059,3762019296,844522546,978220090,169743370,1239126601,101321734,611076132,1558493276,3260915650,3547250131,2901361580,1655096418,2443721105,2510565781,3828863972,2039214713,3878868455,3359869896,928607799,1840765549,2374762893,3580146133,1322425422,2850048425,1823791212,1459268694,4094161908,3928346602,1706019429,2056189050,2934523822,135794696,3134549946,2022240376,628050469,779246638,472135708,2800834470,3032970164,3327236038,3894660072,3715932637,1956440180,522272287,1272813131,3185336765,2340818315,2323976074,1888542832,1044544574,3049550261,1722469478,1222152264,50660867,4127324150,236067854,1638122081,895445557,1475980887,3117443513,2257655686,3243809217,489110045,2662934430,3778599393,4162055160,2561878936,288563729,1773916777,3648039385,2391345038,2493985684,2612407707,505560094,2274497927,3911240169,3460925390,1442818645,678973480,3749357023,2358182796,2717407649,2306869641,219617805,3218761151,3862026214,1120306242,1756942440,1103331905,2578459033,762796589,252780047,2966125488,1425844308,3151392187,372911126],Ra=[1667474886,2088535288,2004326894,2071694838,4075949567,1802223062,1869591006,3318043793,808472672,16843522,1734846926,724270422,4278065639,3621216949,2880169549,1987484396,3402253711,2189597983,3385409673,2105378810,4210693615,1499065266,1195886990,4042263547,2913856577,3570689971,2728590687,2947541573,2627518243,2762274643,1920112356,3233831835,3082273397,4261223649,2475929149,640051788,909531756,1061110142,4160160501,3435941763,875846760,2779116625,3857003729,4059105529,1903268834,3638064043,825316194,353713962,67374088,3351728789,589522246,3284360861,404236336,2526454071,84217610,2593830191,117901582,303183396,2155911963,3806477791,3958056653,656894286,2998062463,1970642922,151591698,2206440989,741110872,437923380,454765878,1852748508,1515908788,2694904667,1381168804,993742198,3604373943,3014905469,690584402,3823320797,791638366,2223281939,1398011302,3520161977,0,3991743681,538992704,4244381667,2981218425,1532751286,1785380564,3419096717,3200178535,960056178,1246420628,1280103576,1482221744,3486468741,3503319995,4025428677,2863326543,4227536621,1128514950,1296947098,859002214,2240123921,1162203018,4193849577,33687044,2139062782,1347481760,1010582648,2678045221,2829640523,1364325282,2745433693,1077985408,2408548869,2459086143,2644360225,943212656,4126475505,3166494563,3065430391,3671750063,555836226,269496352,4294908645,4092792573,3537006015,3452783745,202118168,320025894,3974901699,1600119230,2543297077,1145359496,387397934,3301201811,2812801621,2122220284,1027426170,1684319432,1566435258,421079858,1936954854,1616945344,2172753945,1330631070,3705438115,572679748,707427924,2425400123,2290647819,1179044492,4008585671,3099120491,336870440,3739122087,1583276732,185277718,3688593069,3772791771,842159716,976899700,168435220,1229577106,101059084,606366792,1549591736,3267517855,3553849021,2897014595,1650632388,2442242105,2509612081,3840161747,2038008818,3890688725,3368567691,926374254,1835907034,2374863873,3587531953,1313788572,2846482505,1819063512,1448540844,4109633523,3941213647,1701162954,2054852340,2930698567,134748176,3132806511,2021165296,623210314,774795868,471606328,2795958615,3031746419,3334885783,3907527627,3722280097,1953799400,522133822,1263263126,3183336545,2341176845,2324333839,1886425312,1044267644,3048588401,1718004428,1212733584,50529542,4143317495,235803164,1633788866,892690282,1465383342,3115962473,2256965911,3250673817,488449850,2661202215,3789633753,4177007595,2560144171,286339874,1768537042,3654906025,2391705863,2492770099,2610673197,505291324,2273808917,3924369609,3469625735,1431699370,673740880,3755965093,2358021891,2711746649,2307489801,218961690,3217021541,3873845719,1111672452,1751693520,1094828930,2576986153,757954394,252645662,2964376443,1414855848,3149649517,370555436],La=[1374988112,2118214995,437757123,975658646,1001089995,530400753,2902087851,1273168787,540080725,2910219766,2295101073,4110568485,1340463100,3307916247,641025152,3043140495,3736164937,632953703,1172967064,1576976609,3274667266,2169303058,2370213795,1809054150,59727847,361929877,3211623147,2505202138,3569255213,1484005843,1239443753,2395588676,1975683434,4102977912,2572697195,666464733,3202437046,4035489047,3374361702,2110667444,1675577880,3843699074,2538681184,1649639237,2976151520,3144396420,4269907996,4178062228,1883793496,2403728665,2497604743,1383856311,2876494627,1917518562,3810496343,1716890410,3001755655,800440835,2261089178,3543599269,807962610,599762354,33778362,3977675356,2328828971,2809771154,4077384432,1315562145,1708848333,101039829,3509871135,3299278474,875451293,2733856160,92987698,2767645557,193195065,1080094634,1584504582,3178106961,1042385657,2531067453,3711829422,1306967366,2438237621,1908694277,67556463,1615861247,429456164,3602770327,2302690252,1742315127,2968011453,126454664,3877198648,2043211483,2709260871,2084704233,4169408201,0,159417987,841739592,504459436,1817866830,4245618683,260388950,1034867998,908933415,168810852,1750902305,2606453969,607530554,202008497,2472011535,3035535058,463180190,2160117071,1641816226,1517767529,470948374,3801332234,3231722213,1008918595,303765277,235474187,4069246893,766945465,337553864,1475418501,2943682380,4003061179,2743034109,4144047775,1551037884,1147550661,1543208500,2336434550,3408119516,3069049960,3102011747,3610369226,1113818384,328671808,2227573024,2236228733,3535486456,2935566865,3341394285,496906059,3702665459,226906860,2009195472,733156972,2842737049,294930682,1206477858,2835123396,2700099354,1451044056,573804783,2269728455,3644379585,2362090238,2564033334,2801107407,2776292904,3669462566,1068351396,742039012,1350078989,1784663195,1417561698,4136440770,2430122216,775550814,2193862645,2673705150,1775276924,1876241833,3475313331,3366754619,270040487,3902563182,3678124923,3441850377,1851332852,3969562369,2203032232,3868552805,2868897406,566021896,4011190502,3135740889,1248802510,3936291284,699432150,832877231,708780849,3332740144,899835584,1951317047,4236429990,3767586992,866637845,4043610186,1106041591,2144161806,395441711,1984812685,1139781709,3433712980,3835036895,2664543715,1282050075,3240894392,1181045119,2640243204,25965917,4203181171,4211818798,3009879386,2463879762,3910161971,1842759443,2597806476,933301370,1509430414,3943906441,3467192302,3076639029,3776767469,2051518780,2631065433,1441952575,404016761,1942435775,1408749034,1610459739,3745345300,2017778566,3400528769,3110650942,941896748,3265478751,371049330,3168937228,675039627,4279080257,967311729,135050206,3635733660,1683407248,2076935265,3576870512,1215061108,3501741890],ja=[1347548327,1400783205,3273267108,2520393566,3409685355,4045380933,2880240216,2471224067,1428173050,4138563181,2441661558,636813900,4233094615,3620022987,2149987652,2411029155,1239331162,1730525723,2554718734,3781033664,46346101,310463728,2743944855,3328955385,3875770207,2501218972,3955191162,3667219033,768917123,3545789473,692707433,1150208456,1786102409,2029293177,1805211710,3710368113,3065962831,401639597,1724457132,3028143674,409198410,2196052529,1620529459,1164071807,3769721975,2226875310,486441376,2499348523,1483753576,428819965,2274680428,3075636216,598438867,3799141122,1474502543,711349675,129166120,53458370,2592523643,2782082824,4063242375,2988687269,3120694122,1559041666,730517276,2460449204,4042459122,2706270690,3446004468,3573941694,533804130,2328143614,2637442643,2695033685,839224033,1973745387,957055980,2856345839,106852767,1371368976,4181598602,1033297158,2933734917,1179510461,3046200461,91341917,1862534868,4284502037,605657339,2547432937,3431546947,2003294622,3182487618,2282195339,954669403,3682191598,1201765386,3917234703,3388507166,0,2198438022,1211247597,2887651696,1315723890,4227665663,1443857720,507358933,657861945,1678381017,560487590,3516619604,975451694,2970356327,261314535,3535072918,2652609425,1333838021,2724322336,1767536459,370938394,182621114,3854606378,1128014560,487725847,185469197,2918353863,3106780840,3356761769,2237133081,1286567175,3152976349,4255350624,2683765030,3160175349,3309594171,878443390,1988838185,3704300486,1756818940,1673061617,3403100636,272786309,1075025698,545572369,2105887268,4174560061,296679730,1841768865,1260232239,4091327024,3960309330,3497509347,1814803222,2578018489,4195456072,575138148,3299409036,446754879,3629546796,4011996048,3347532110,3252238545,4270639778,915985419,3483825537,681933534,651868046,2755636671,3828103837,223377554,2607439820,1649704518,3270937875,3901806776,1580087799,4118987695,3198115200,2087309459,2842678573,3016697106,1003007129,2802849917,1860738147,2077965243,164439672,4100872472,32283319,2827177882,1709610350,2125135846,136428751,3874428392,3652904859,3460984630,3572145929,3593056380,2939266226,824852259,818324884,3224740454,930369212,2801566410,2967507152,355706840,1257309336,4148292826,243256656,790073846,2373340630,1296297904,1422699085,3756299780,3818836405,457992840,3099667487,2135319889,77422314,1560382517,1945798516,788204353,1521706781,1385356242,870912086,325965383,2358957921,2050466060,2388260884,2313884476,4006521127,901210569,3990953189,1014646705,1503449823,1062597235,2031621326,3212035895,3931371469,1533017514,350174575,2256028891,2177544179,1052338372,741876788,1606591296,1914052035,213705253,2334669897,1107234197,1899603969,3725069491,2631447780,2422494913,1635502980,1893020342,1950903388,1120974935],Na=[2807058932,1699970625,2764249623,1586903591,1808481195,1173430173,1487645946,59984867,4199882800,1844882806,1989249228,1277555970,3623636965,3419915562,1149249077,2744104290,1514790577,459744698,244860394,3235995134,1963115311,4027744588,2544078150,4190530515,1608975247,2627016082,2062270317,1507497298,2200818878,567498868,1764313568,3359936201,2305455554,2037970062,1047239e3,1910319033,1337376481,2904027272,2892417312,984907214,1243112415,830661914,861968209,2135253587,2011214180,2927934315,2686254721,731183368,1750626376,4246310725,1820824798,4172763771,3542330227,48394827,2404901663,2871682645,671593195,3254988725,2073724613,145085239,2280796200,2779915199,1790575107,2187128086,472615631,3029510009,4075877127,3802222185,4107101658,3201631749,1646252340,4270507174,1402811438,1436590835,3778151818,3950355702,3963161475,4020912224,2667994737,273792366,2331590177,104699613,95345982,3175501286,2377486676,1560637892,3564045318,369057872,4213447064,3919042237,1137477952,2658625497,1119727848,2340947849,1530455833,4007360968,172466556,266959938,516552836,0,2256734592,3980931627,1890328081,1917742170,4294704398,945164165,3575528878,958871085,3647212047,2787207260,1423022939,775562294,1739656202,3876557655,2530391278,2443058075,3310321856,547512796,1265195639,437656594,3121275539,719700128,3762502690,387781147,218828297,3350065803,2830708150,2848461854,428169201,122466165,3720081049,1627235199,648017665,4122762354,1002783846,2117360635,695634755,3336358691,4234721005,4049844452,3704280881,2232435299,574624663,287343814,612205898,1039717051,840019705,2708326185,793451934,821288114,1391201670,3822090177,376187827,3113855344,1224348052,1679968233,2361698556,1058709744,752375421,2431590963,1321699145,3519142200,2734591178,188127444,2177869557,3727205754,2384911031,3215212461,2648976442,2450346104,3432737375,1180849278,331544205,3102249176,4150144569,2952102595,2159976285,2474404304,766078933,313773861,2570832044,2108100632,1668212892,3145456443,2013908262,418672217,3070356634,2594734927,1852171925,3867060991,3473416636,3907448597,2614737639,919489135,164948639,2094410160,2997825956,590424639,2486224549,1723872674,3157750862,3399941250,3501252752,3625268135,2555048196,3673637356,1343127501,4130281361,3599595085,2957853679,1297403050,81781910,3051593425,2283490410,532201772,1367295589,3926170974,895287692,1953757831,1093597963,492483431,3528626907,1446242576,1192455638,1636604631,209336225,344873464,1015671571,669961897,3375740769,3857572124,2973530695,3747192018,1933530610,3464042516,935293895,3454686199,2858115069,1863638845,3683022916,4085369519,3292445032,875313188,1080017571,3279033885,621591778,1233856572,2504130317,24197544,3017672716,3835484340,3247465558,2220981195,3060847922,1551124588,1463996600],Ma=[4104605777,1097159550,396673818,660510266,2875968315,2638606623,4200115116,3808662347,821712160,1986918061,3430322568,38544885,3856137295,718002117,893681702,1654886325,2975484382,3122358053,3926825029,4274053469,796197571,1290801793,1184342925,3556361835,2405426947,2459735317,1836772287,1381620373,3196267988,1948373848,3764988233,3385345166,3263785589,2390325492,1480485785,3111247143,3780097726,2293045232,548169417,3459953789,3746175075,439452389,1362321559,1400849762,1685577905,1806599355,2174754046,137073913,1214797936,1174215055,3731654548,2079897426,1943217067,1258480242,529487843,1437280870,3945269170,3049390895,3313212038,923313619,679998e3,3215307299,57326082,377642221,3474729866,2041877159,133361907,1776460110,3673476453,96392454,878845905,2801699524,777231668,4082475170,2330014213,4142626212,2213296395,1626319424,1906247262,1846563261,562755902,3708173718,1040559837,3871163981,1418573201,3294430577,114585348,1343618912,2566595609,3186202582,1078185097,3651041127,3896688048,2307622919,425408743,3371096953,2081048481,1108339068,2216610296,0,2156299017,736970802,292596766,1517440620,251657213,2235061775,2933202493,758720310,265905162,1554391400,1532285339,908999204,174567692,1474760595,4002861748,2610011675,3234156416,3693126241,2001430874,303699484,2478443234,2687165888,585122620,454499602,151849742,2345119218,3064510765,514443284,4044981591,1963412655,2581445614,2137062819,19308535,1928707164,1715193156,4219352155,1126790795,600235211,3992742070,3841024952,836553431,1669664834,2535604243,3323011204,1243905413,3141400786,4180808110,698445255,2653899549,2989552604,2253581325,3252932727,3004591147,1891211689,2487810577,3915653703,4237083816,4030667424,2100090966,865136418,1229899655,953270745,3399679628,3557504664,4118925222,2061379749,3079546586,2915017791,983426092,2022837584,1607244650,2118541908,2366882550,3635996816,972512814,3283088770,1568718495,3499326569,3576539503,621982671,2895723464,410887952,2623762152,1002142683,645401037,1494807662,2595684844,1335535747,2507040230,4293295786,3167684641,367585007,3885750714,1865862730,2668221674,2960971305,2763173681,1059270954,2777952454,2724642869,1320957812,2194319100,2429595872,2815956275,77089521,3973773121,3444575871,2448830231,1305906550,4021308739,2857194700,2516901860,3518358430,1787304780,740276417,1699839814,1592394909,2352307457,2272556026,188821243,1729977011,3687994002,274084841,3594982253,3613494426,2701949495,4162096729,322734571,2837966542,1640576439,484830689,1202797690,3537852828,4067639125,349075736,3342319475,4157467219,4255800159,1030690015,1155237496,2951971274,1757691577,607398968,2738905026,499347990,3794078908,1011452712,227885567,2818666809,213114376,3034881240,1455525988,3414450555,850817237,1817998408,3092726480],Ua=[0,235474187,470948374,303765277,941896748,908933415,607530554,708780849,1883793496,2118214995,1817866830,1649639237,1215061108,1181045119,1417561698,1517767529,3767586992,4003061179,4236429990,4069246893,3635733660,3602770327,3299278474,3400528769,2430122216,2664543715,2362090238,2193862645,2835123396,2801107407,3035535058,3135740889,3678124923,3576870512,3341394285,3374361702,3810496343,3977675356,4279080257,4043610186,2876494627,2776292904,3076639029,3110650942,2472011535,2640243204,2403728665,2169303058,1001089995,899835584,666464733,699432150,59727847,226906860,530400753,294930682,1273168787,1172967064,1475418501,1509430414,1942435775,2110667444,1876241833,1641816226,2910219766,2743034109,2976151520,3211623147,2505202138,2606453969,2302690252,2269728455,3711829422,3543599269,3240894392,3475313331,3843699074,3943906441,4178062228,4144047775,1306967366,1139781709,1374988112,1610459739,1975683434,2076935265,1775276924,1742315127,1034867998,866637845,566021896,800440835,92987698,193195065,429456164,395441711,1984812685,2017778566,1784663195,1683407248,1315562145,1080094634,1383856311,1551037884,101039829,135050206,437757123,337553864,1042385657,807962610,573804783,742039012,2531067453,2564033334,2328828971,2227573024,2935566865,2700099354,3001755655,3168937228,3868552805,3902563182,4203181171,4102977912,3736164937,3501741890,3265478751,3433712980,1106041591,1340463100,1576976609,1408749034,2043211483,2009195472,1708848333,1809054150,832877231,1068351396,766945465,599762354,159417987,126454664,361929877,463180190,2709260871,2943682380,3178106961,3009879386,2572697195,2538681184,2236228733,2336434550,3509871135,3745345300,3441850377,3274667266,3910161971,3877198648,4110568485,4211818798,2597806476,2497604743,2261089178,2295101073,2733856160,2902087851,3202437046,2968011453,3936291284,3835036895,4136440770,4169408201,3535486456,3702665459,3467192302,3231722213,2051518780,1951317047,1716890410,1750902305,1113818384,1282050075,1584504582,1350078989,168810852,67556463,371049330,404016761,841739592,1008918595,775550814,540080725,3969562369,3801332234,4035489047,4269907996,3569255213,3669462566,3366754619,3332740144,2631065433,2463879762,2160117071,2395588676,2767645557,2868897406,3102011747,3069049960,202008497,33778362,270040487,504459436,875451293,975658646,675039627,641025152,2084704233,1917518562,1615861247,1851332852,1147550661,1248802510,1484005843,1451044056,933301370,967311729,733156972,632953703,260388950,25965917,328671808,496906059,1206477858,1239443753,1543208500,1441952575,2144161806,1908694277,1675577880,1842759443,3610369226,3644379585,3408119516,3307916247,4011190502,3776767469,4077384432,4245618683,2809771154,2842737049,3144396420,3043140495,2673705150,2438237621,2203032232,2370213795],Ba=[0,185469197,370938394,487725847,741876788,657861945,975451694,824852259,1483753576,1400783205,1315723890,1164071807,1950903388,2135319889,1649704518,1767536459,2967507152,3152976349,2801566410,2918353863,2631447780,2547432937,2328143614,2177544179,3901806776,3818836405,4270639778,4118987695,3299409036,3483825537,3535072918,3652904859,2077965243,1893020342,1841768865,1724457132,1474502543,1559041666,1107234197,1257309336,598438867,681933534,901210569,1052338372,261314535,77422314,428819965,310463728,3409685355,3224740454,3710368113,3593056380,3875770207,3960309330,4045380933,4195456072,2471224067,2554718734,2237133081,2388260884,3212035895,3028143674,2842678573,2724322336,4138563181,4255350624,3769721975,3955191162,3667219033,3516619604,3431546947,3347532110,2933734917,2782082824,3099667487,3016697106,2196052529,2313884476,2499348523,2683765030,1179510461,1296297904,1347548327,1533017514,1786102409,1635502980,2087309459,2003294622,507358933,355706840,136428751,53458370,839224033,957055980,605657339,790073846,2373340630,2256028891,2607439820,2422494913,2706270690,2856345839,3075636216,3160175349,3573941694,3725069491,3273267108,3356761769,4181598602,4063242375,4011996048,3828103837,1033297158,915985419,730517276,545572369,296679730,446754879,129166120,213705253,1709610350,1860738147,1945798516,2029293177,1239331162,1120974935,1606591296,1422699085,4148292826,4233094615,3781033664,3931371469,3682191598,3497509347,3446004468,3328955385,2939266226,2755636671,3106780840,2988687269,2198438022,2282195339,2501218972,2652609425,1201765386,1286567175,1371368976,1521706781,1805211710,1620529459,2105887268,1988838185,533804130,350174575,164439672,46346101,870912086,954669403,636813900,788204353,2358957921,2274680428,2592523643,2441661558,2695033685,2880240216,3065962831,3182487618,3572145929,3756299780,3270937875,3388507166,4174560061,4091327024,4006521127,3854606378,1014646705,930369212,711349675,560487590,272786309,457992840,106852767,223377554,1678381017,1862534868,1914052035,2031621326,1211247597,1128014560,1580087799,1428173050,32283319,182621114,401639597,486441376,768917123,651868046,1003007129,818324884,1503449823,1385356242,1333838021,1150208456,1973745387,2125135846,1673061617,1756818940,2970356327,3120694122,2802849917,2887651696,2637442643,2520393566,2334669897,2149987652,3917234703,3799141122,4284502037,4100872472,3309594171,3460984630,3545789473,3629546796,2050466060,1899603969,1814803222,1730525723,1443857720,1560382517,1075025698,1260232239,575138148,692707433,878443390,1062597235,243256656,91341917,409198410,325965383,3403100636,3252238545,3704300486,3620022987,3874428392,3990953189,4042459122,4227665663,2460449204,2578018489,2226875310,2411029155,3198115200,3046200461,2827177882,2743944855],Fa=[0,218828297,437656594,387781147,875313188,958871085,775562294,590424639,1750626376,1699970625,1917742170,2135253587,1551124588,1367295589,1180849278,1265195639,3501252752,3720081049,3399941250,3350065803,3835484340,3919042237,4270507174,4085369519,3102249176,3051593425,2734591178,2952102595,2361698556,2177869557,2530391278,2614737639,3145456443,3060847922,2708326185,2892417312,2404901663,2187128086,2504130317,2555048196,3542330227,3727205754,3375740769,3292445032,3876557655,3926170974,4246310725,4027744588,1808481195,1723872674,1910319033,2094410160,1608975247,1391201670,1173430173,1224348052,59984867,244860394,428169201,344873464,935293895,984907214,766078933,547512796,1844882806,1627235199,2011214180,2062270317,1507497298,1423022939,1137477952,1321699145,95345982,145085239,532201772,313773861,830661914,1015671571,731183368,648017665,3175501286,2957853679,2807058932,2858115069,2305455554,2220981195,2474404304,2658625497,3575528878,3625268135,3473416636,3254988725,3778151818,3963161475,4213447064,4130281361,3599595085,3683022916,3432737375,3247465558,3802222185,4020912224,4172763771,4122762354,3201631749,3017672716,2764249623,2848461854,2331590177,2280796200,2431590963,2648976442,104699613,188127444,472615631,287343814,840019705,1058709744,671593195,621591778,1852171925,1668212892,1953757831,2037970062,1514790577,1463996600,1080017571,1297403050,3673637356,3623636965,3235995134,3454686199,4007360968,3822090177,4107101658,4190530515,2997825956,3215212461,2830708150,2779915199,2256734592,2340947849,2627016082,2443058075,172466556,122466165,273792366,492483431,1047239e3,861968209,612205898,695634755,1646252340,1863638845,2013908262,1963115311,1446242576,1530455833,1277555970,1093597963,1636604631,1820824798,2073724613,1989249228,1436590835,1487645946,1337376481,1119727848,164948639,81781910,331544205,516552836,1039717051,821288114,669961897,719700128,2973530695,3157750862,2871682645,2787207260,2232435299,2283490410,2667994737,2450346104,3647212047,3564045318,3279033885,3464042516,3980931627,3762502690,4150144569,4199882800,3070356634,3121275539,2904027272,2686254721,2200818878,2384911031,2570832044,2486224549,3747192018,3528626907,3310321856,3359936201,3950355702,3867060991,4049844452,4234721005,1739656202,1790575107,2108100632,1890328081,1402811438,1586903591,1233856572,1149249077,266959938,48394827,369057872,418672217,1002783846,919489135,567498868,752375421,209336225,24197544,376187827,459744698,945164165,895287692,574624663,793451934,1679968233,1764313568,2117360635,1933530610,1343127501,1560637892,1243112415,1192455638,3704280881,3519142200,3336358691,3419915562,3907448597,3857572124,4075877127,4294704398,3029510009,3113855344,2927934315,2744104290,2159976285,2377486676,2594734927,2544078150],Va=[0,151849742,303699484,454499602,607398968,758720310,908999204,1059270954,1214797936,1097159550,1517440620,1400849762,1817998408,1699839814,2118541908,2001430874,2429595872,2581445614,2194319100,2345119218,3034881240,3186202582,2801699524,2951971274,3635996816,3518358430,3399679628,3283088770,4237083816,4118925222,4002861748,3885750714,1002142683,850817237,698445255,548169417,529487843,377642221,227885567,77089521,1943217067,2061379749,1640576439,1757691577,1474760595,1592394909,1174215055,1290801793,2875968315,2724642869,3111247143,2960971305,2405426947,2253581325,2638606623,2487810577,3808662347,3926825029,4044981591,4162096729,3342319475,3459953789,3576539503,3693126241,1986918061,2137062819,1685577905,1836772287,1381620373,1532285339,1078185097,1229899655,1040559837,923313619,740276417,621982671,439452389,322734571,137073913,19308535,3871163981,4021308739,4104605777,4255800159,3263785589,3414450555,3499326569,3651041127,2933202493,2815956275,3167684641,3049390895,2330014213,2213296395,2566595609,2448830231,1305906550,1155237496,1607244650,1455525988,1776460110,1626319424,2079897426,1928707164,96392454,213114376,396673818,514443284,562755902,679998e3,865136418,983426092,3708173718,3557504664,3474729866,3323011204,4180808110,4030667424,3945269170,3794078908,2507040230,2623762152,2272556026,2390325492,2975484382,3092726480,2738905026,2857194700,3973773121,3856137295,4274053469,4157467219,3371096953,3252932727,3673476453,3556361835,2763173681,2915017791,3064510765,3215307299,2156299017,2307622919,2459735317,2610011675,2081048481,1963412655,1846563261,1729977011,1480485785,1362321559,1243905413,1126790795,878845905,1030690015,645401037,796197571,274084841,425408743,38544885,188821243,3613494426,3731654548,3313212038,3430322568,4082475170,4200115116,3780097726,3896688048,2668221674,2516901860,2366882550,2216610296,3141400786,2989552604,2837966542,2687165888,1202797690,1320957812,1437280870,1554391400,1669664834,1787304780,1906247262,2022837584,265905162,114585348,499347990,349075736,736970802,585122620,972512814,821712160,2595684844,2478443234,2293045232,2174754046,3196267988,3079546586,2895723464,2777952454,3537852828,3687994002,3234156416,3385345166,4142626212,4293295786,3841024952,3992742070,174567692,57326082,410887952,292596766,777231668,660510266,1011452712,893681702,1108339068,1258480242,1343618912,1494807662,1715193156,1865862730,1948373848,2100090966,2701949495,2818666809,3004591147,3122358053,2235061775,2352307457,2535604243,2653899549,3915653703,3764988233,4219352155,4067639125,3444575871,3294430577,3746175075,3594982253,836553431,953270745,600235211,718002117,367585007,484830689,133361907,251657213,2041877159,1891211689,1806599355,1654886325,1568718495,1418573201,1335535747,1184342925];function $a(e){for(var t=[],a=0;a<e.length;a+=4)t.push(e[a]<<24|e[a+1]<<16|e[a+2]<<8|e[a+3]);return t}var Ka=function(){function e(t){if((0,g.default)(this,e),!(this instanceof e))throw Error("AES must be instanitated with `new`");Object.defineProperty(this,"key",{value:_a(t,!0)}),this._prepare()}return(0,y.default)(e,[{key:"_prepare",value:function(){var e=Oa[this.key.length];if(null==e)throw new Error("invalid key size (must be 16, 24 or 32 bytes)");this._Ke=[],this._Kd=[];for(var t=0;t<=e;t++)this._Ke.push([0,0,0,0]),this._Kd.push([0,0,0,0]);var a,l=4*(e+1),i=this.key.length/4,n=$a(this.key);for(t=0;t<i;t++)a=t>>2,this._Ke[a][t%4]=n[t],this._Kd[e-a][t%4]=n[t];for(var r,u=0,o=i;o<l;){if(r=n[i-1],n[0]^=Ta[r>>16&255]<<24^Ta[r>>8&255]<<16^Ta[255&r]<<8^Ta[r>>24&255]^Ea[u]<<24,u+=1,8!=i)for(t=1;t<i;t++)n[t]^=n[t-1];else{for(t=1;t<i/2;t++)n[t]^=n[t-1];for(r=n[i/2-1],n[i/2]^=Ta[255&r]^Ta[r>>8&255]<<8^Ta[r>>16&255]<<16^Ta[r>>24&255]<<24,t=i/2+1;t<i;t++)n[t]^=n[t-1]}for(t=0;t<i&&o<l;)s=o>>2,d=o%4,this._Ke[s][d]=n[t],this._Kd[e-s][d]=n[t++],o++}for(var s=1;s<e;s++)for(var d=0;d<4;d++)r=this._Kd[s][d],this._Kd[s][d]=Ua[r>>24&255]^Ba[r>>16&255]^Fa[r>>8&255]^Va[255&r]}},{key:"encrypt",value:function(e){if(16!=e.length)throw new Error("invalid plaintext size (must be 16 bytes)");for(var t=this._Ke.length-1,a=[0,0,0,0],l=$a(e),i=0;i<4;i++)l[i]^=this._Ke[0][i];for(var n=1;n<t;n++){for(i=0;i<4;i++)a[i]=Ia[l[i]>>24&255]^Pa[l[(i+1)%4]>>16&255]^Da[l[(i+2)%4]>>8&255]^Ra[255&l[(i+3)%4]]^this._Ke[n][i];l=a.slice()}var r,u=wa(16);for(i=0;i<4;i++)r=this._Ke[t][i],u[4*i]=255&(Ta[l[i]>>24&255]^r>>24),u[4*i+1]=255&(Ta[l[(i+1)%4]>>16&255]^r>>16),u[4*i+2]=255&(Ta[l[(i+2)%4]>>8&255]^r>>8),u[4*i+3]=255&(Ta[255&l[(i+3)%4]]^r);return u}},{key:"decrypt",value:function(e){if(16!=e.length)throw new Error("invalid ciphertext size (must be 16 bytes)");for(var t=this._Kd.length-1,a=[0,0,0,0],l=$a(e),i=0;i<4;i++)l[i]^=this._Kd[0][i];for(var n=1;n<t;n++){for(i=0;i<4;i++)a[i]=La[l[i]>>24&255]^ja[l[(i+3)%4]>>16&255]^Na[l[(i+2)%4]>>8&255]^Ma[255&l[(i+1)%4]]^this._Kd[n][i];l=a.slice()}var r,u=wa(16);for(i=0;i<4;i++)r=this._Kd[t][i],u[4*i]=255&(Ca[l[i]>>24&255]^r>>24),u[4*i+1]=255&(Ca[l[(i+3)%4]>>16&255]^r>>16),u[4*i+2]=255&(Ca[l[(i+2)%4]>>8&255]^r>>8),u[4*i+3]=255&(Ca[255&l[(i+1)%4]]^r);return u}}]),e}(),qa=function(){function e(t){if((0,g.default)(this,e),!(this instanceof e))throw Error("AES must be instanitated with `new`");this.description="Electronic Code Block",this.name="ecb",this._aes=new Ka(t)}return(0,y.default)(e,[{key:"encrypt",value:function(e){if((e=_a(e)).length%16!=0)throw new Error("invalid plaintext size (must be multiple of 16 bytes)");for(var t=wa(e.length),a=wa(16),l=0;l<e.length;l+=16)Aa(e,a,0,l,l+16),Aa(a=this._aes.encrypt(a),t,l);return t}},{key:"decrypt",value:function(e){if((e=_a(e)).length%16!=0)throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");for(var t=wa(e.length),a=wa(16),l=0;l<e.length;l+=16)Aa(e,a,0,l,l+16),Aa(a=this._aes.decrypt(a),t,l);return t}}]),e}(),Ha=function(){function e(t,a){if((0,g.default)(this,e),!(this instanceof e))throw Error("AES must be instanitated with `new`");if(this.description="Cipher Block Chaining",this.name="cbc",a){if(16!=a.length)throw new Error("invalid initialation vector size (must be 16 bytes)")}else a=wa(16);this._lastCipherblock=_a(a,!0),this._aes=new Ka(t)}return(0,y.default)(e,[{key:"encrypt",value:function(e){if((e=_a(e)).length%16!=0)throw new Error("invalid plaintext size (must be multiple of 16 bytes)");for(var t=wa(e.length),a=wa(16),l=0;l<e.length;l+=16){Aa(e,a,0,l,l+16);for(var i=0;i<16;i++)a[i]^=this._lastCipherblock[i];this._lastCipherblock=this._aes.encrypt(a),Aa(this._lastCipherblock,t,l)}return t}},{key:"decrypt",value:function(e){if((e=_a(e)).length%16!=0)throw new Error("invalid ciphertext size (must be multiple of 16 bytes)");for(var t=wa(e.length),a=wa(16),l=0;l<e.length;l+=16){Aa(e,a,0,l,l+16),a=this._aes.decrypt(a);for(var i=0;i<16;i++)t[l+i]=a[i]^this._lastCipherblock[i];Aa(e,this._lastCipherblock,0,l,l+16)}return t}}]),e}(),Ga=function(){function e(t,a,l){if((0,g.default)(this,e),!(this instanceof e))throw Error("AES must be instanitated with `new`");if(this.description="Cipher Feedback",this.name="cfb",a){if(16!=a.length)throw new Error("invalid initialation vector size (must be 16 size)")}else a=wa(16);l||(l=1),this.segmentSize=l,this._shiftRegister=_a(a,!0),this._aes=new Ka(t)}return(0,y.default)(e,[{key:"encrypt",value:function(e){if(e.length%this.segmentSize!=0)throw new Error("invalid plaintext size (must be segmentSize bytes)");for(var t,a=_a(e,!0),l=0;l<a.length;l+=this.segmentSize){t=this._aes.encrypt(this._shiftRegister);for(var i=0;i<this.segmentSize;i++)a[l+i]^=t[i];Aa(this._shiftRegister,this._shiftRegister,0,this.segmentSize),Aa(a,this._shiftRegister,16-this.segmentSize,l,l+this.segmentSize)}return a}},{key:"decrypt",value:function(e){if(e.length%this.segmentSize!=0)throw new Error("invalid ciphertext size (must be segmentSize bytes)");for(var t,a=_a(e,!0),l=0;l<a.length;l+=this.segmentSize){t=this._aes.encrypt(this._shiftRegister);for(var i=0;i<this.segmentSize;i++)a[l+i]^=t[i];Aa(this._shiftRegister,this._shiftRegister,0,this.segmentSize),Aa(e,this._shiftRegister,16-this.segmentSize,l,l+this.segmentSize)}return a}}]),e}(),Wa=function(){function e(t,a){if((0,g.default)(this,e),!(this instanceof e))throw Error("AES must be instanitated with `new`");if(this.description="Output Feedback",this.name="ofb",a){if(16!=a.length)throw new Error("invalid initialation vector size (must be 16 bytes)")}else a=wa(16);this._lastPrecipher=_a(a,!0),this._lastPrecipherIndex=16,this._aes=new Ka(t)}return(0,y.default)(e,[{key:"encrypt",value:function(e){for(var t=_a(e,!0),a=0;a<t.length;a++)16===this._lastPrecipherIndex&&(this._lastPrecipher=this._aes.encrypt(this._lastPrecipher),this._lastPrecipherIndex=0),t[a]^=this._lastPrecipher[this._lastPrecipherIndex++];return t}},{key:"decrypt",value:function(e){return this.encrypt(e)}}]),e}(),za=function(){function e(t){if((0,g.default)(this,e),!(this instanceof e))throw Error("Counter must be instanitated with `new`");0===t||t||(t=1),"number"==typeof t?(this._counter=wa(16),this.setValue(t)):this.setBytes(t)}return(0,y.default)(e,[{key:"setValue",value:function(e){if("number"!=typeof e||parseInt(e)!=e)throw new Error("invalid counter value (must be an integer)");if(e>Number.MAX_SAFE_INTEGER)throw new Error("integer value out of safe range");for(var t=15;t>=0;--t)this._counter[t]=e%256,e=parseInt(e/256)}},{key:"setBytes",value:function(e){if(16!=(e=_a(e,!0)).length)throw new Error("invalid counter bytes size (must be 16 bytes)");this._counter=e}},{key:"increment",value:function(){for(var e=15;e>=0;e--){if(255!==this._counter[e]){this._counter[e]++;break}this._counter[e]=0}}}]),e}(),Ja=function(){function e(t,a){if((0,g.default)(this,e),!(this instanceof e))throw Error("AES must be instanitated with `new`");this.description="Counter",this.name="ctr",a instanceof za||(a=new za(a)),this._counter=a,this._remainingCounter=null,this._remainingCounterIndex=16,this._aes=new Ka(t)}return(0,y.default)(e,[{key:"encrypt",value:function(e){for(var t=_a(e,!0),a=0;a<t.length;a++)16===this._remainingCounterIndex&&(this._remainingCounter=this._aes.encrypt(this._counter._counter),this._remainingCounterIndex=0,this._counter.increment()),t[a]^=this._remainingCounter[this._remainingCounterIndex++];return t}},{key:"decrypt",value:function(e){return this.encrypt(e)}}]),e}(),Za={AES:Ka,Counter:za,ModeOfOperation:{ecb:qa,cbc:Ha,cfb:Ga,ofb:Wa,ctr:Ja},utils:{hex:ka,utf8:Sa},padding:{pkcs7:{pad:function(e){var t=16-(e=_a(e,!0)).length%16,a=wa(e.length+t);Aa(e,a);for(var l=e.length;l<a.length;l++)a[l]=t;return a},strip:function(e){if((e=_a(e,!0)).length<16)throw new Error("PKCS#7 invalid length");var t=e[e.length-1];if(t>16)throw new Error("PKCS#7 padding byte out of range");for(var a=e.length-t,l=0;l<t;l++)if(e[a+l]!==t)throw new Error("PKCS#7 invalid padding byte");var i=wa(a);return Aa(e,i,0,0,a),i}}},_arrayTest:{coerceArray:_a,createArray:wa,copyArray:Aa}};function Ya(e,t,a){var i=new Uint8Array(l.base64ToArrayBuffer(t)),n=Za.utils.utf8.toBytes(a),r=Za.utils.utf8.toBytes(e),u=new Za.ModeOfOperation.cbc(i,n),o=Za.padding.pkcs7.pad(r),s=u.encrypt(o);return l.arrayBufferToBase64(s)}var Qa={code:2e4,message:"System error"},Xa={code:20101,message:"Invalid client"},el={code:20102,message:"Get encrypt key failed"},tl={10001:"Secure network is not supported on current playground or unimpsdk",10003:"Config missing in current app. If the problem pesist, please contact DCloud.",10009:"Encrypt payload failed",10010:"Decrypt response failed"};function al(e){var t=e||{},a=t.errSubject,l=t.subject,i=t.errCode,n=t.errMsg,r=t.code,u=t.message,o=t.cause;return new Te({subject:a||l||"uni-secure-network",code:i||r||Qa.code,message:n||u,cause:o})}var ll,il,nl=null,rl=function(e){(0,f.default)(a,e);var t=k(a);function a(e){var l;return(0,g.default)(this,a),l=t.call(this,e),l.clientType="mp-weixin",l.userEncryptKey=null,l}return(0,y.default)(a,[{key:"isLogin",value:function(){return!!this.scopedGlobalCache.mpWeixinCode||!!this.scopedGlobalCache.mpWeixinOpenid}},{key:"prepare",value:function(){var e=(0,c.default)(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.isLogin()){e.next=7;break}if(this.scopedGlobalCache.initPromise){e.next=3;break}throw new Error("`uniCloud.initSecureNetworkByWeixin` has not yet been called");case 3:return e.next=5,this.scopedGlobalCache.initPromise;case 5:if(this.isLogin()){e.next=7;break}throw new Error("uniCloud.initSecureNetworkByWeixin` has not yet been called or successfully excuted");case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getUserEncryptKey",value:function(){var e=(0,c.default)(r.default.mark((function e(){var t,a=this;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!this.userEncryptKey){e.next=2;break}return e.abrupt("return",this.userEncryptKey);case 2:if(!nl||!nl.expireTime){e.next=6;break}if(t=Date.now(),!(nl.expireTime-t>0)){e.next=6;break}return e.abrupt("return",(this.userEncryptKey=nl,this.userEncryptKey));case 6:return e.abrupt("return",new Promise((function(e,t){l.getUserCryptoManager().getLatestUserKey({success:function(t){nl=t,a.userEncryptKey=t,e(a.userEncryptKey)},fail:function(e){t(al(S(S({},el),{},{cause:e})))}})})));case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getWxAppId",value:function(){return i.getAccountInfoSync().miniProgram.appId}},{key:"platformGetSignOption",value:function(){var e=(0,c.default)(r.default.mark((function e(){var t,a,l,i;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.getUserEncryptKey();case 2:return t=e.sent,a=t.encryptKey,l=t.iv,i=t.version,e.abrupt("return",{verifyClientSign:Ya(JSON.stringify({data:JSON.stringify({}),appId:this.appId,deviceId:this.deviceId,wxAppId:this.getWxAppId(),simulator:"devtools"===De().platform,timestamp:Date.now()}),a,l),encryptKeyId:i,mpWeixinCode:this.scopedGlobalCache.mpWeixinCode,mpWeixinOpenid:this.scopedGlobalCache.mpWeixinOpenid});case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"platformEncryptData",value:function(){var e=(0,c.default)(r.default.mark((function e(t){var a,l,i,n,u;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.getUserEncryptKey();case 2:return a=e.sent,l=a.encryptKey,i=a.iv,n=a.version,u={secretType:this.secretType,encryptKeyId:n,mpWeixinCode:this.scopedGlobalCache.mpWeixinCode,mpWeixinOpenid:this.scopedGlobalCache.mpWeixinOpenid},e.abrupt("return",this.secretType===ba?{content:t,_uniCloudOptions:u}:{content:Ya(JSON.stringify({data:JSON.stringify(t),appId:this.appId,deviceId:this.deviceId,wxAppId:this.getWxAppId(),simulator:"devtools"===De().platform,timestamp:Date.now()}),l,i),_uniCloudOptions:u});case 8:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"platformDecryptResult",value:function(){var e=(0,c.default)(r.default.mark((function e(t){var a,i,n,u;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.content,e.next=3,this.getUserEncryptKey();case 3:return i=e.sent,n=i.encryptKey,u=i.iv,e.abrupt("return",JSON.parse(function(e,t,a){var i=new Uint8Array(l.base64ToArrayBuffer(e)),n=new Uint8Array(l.base64ToArrayBuffer(t)),r=Za.utils.utf8.toBytes(a),u=new Za.ModeOfOperation.cbc(n,r),o=Za.padding.pkcs7.strip(u.decrypt(i));return Za.utils.utf8.fromBytes(o)}(a,n,u)));case 7:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"isClientKeyNotFound",value:function(){return!1}}]),a}(ga);function ul(e){for(var t=["hasClientKey","encryptGetClientKeyPayload","setClientKey","encrypt","decrypt"],a={},l=function(l){var i=t[l];a[i]=function(){for(var t=arguments.length,a=new Array(t),l=0;l<t;l++)a[l]=arguments[l];return new Promise((function(t,l){"function"==typeof e[i]?e[i].apply(e,a.concat([function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=e.type,i=e.data,n=e.errCode,r=e.errMsg,u=e.errSubject,o=e.message;"success"===a?t(i):l(al({errCode:n,errMsg:tl[n]||r||o,errSubject:u}))}])):l(al({message:"请检查manifest.json内是否开启安全网络模块，另外注意标准基座不支持安全网络模块"}))}))}},i=0;i<t.length;i++)l(i);return a}var ol=function(e){(0,f.default)(a,e);var t=k(a);function a(e){var i;return(0,g.default)(this,a),i=t.call(this,e),i.clientType="app",i.appUtils=S({},ul(l.requireNativePlugin("plus"))),i.systemInfo=ll||(ll=De()),i}return(0,y.default)(a,[{key:"hasClientKey",value:function(){var e=(0,c.default)(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.appUtils.hasClientKey({provider:this.provider,spaceId:this.spaceId});case 2:return this._hasClientKey=e.sent,e.abrupt("return",this._hasClientKey);case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getAppClientKey",value:function(){var e=(0,c.default)(r.default.mark((function e(){var t,a,l,i,n,u;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.appUtils.encryptGetClientKeyPayload({data:JSON.stringify({})});case 2:return t=e.sent,a=t.data,l=t.key,e.next=7,this.uniCloudIns.callFunction({name:"DCloud-clientDB",data:{redirectTo:"encryption",action:"getAppClientKey",data:a,key:l}});case 7:if(e.t0=e.sent.result,e.t0){e.next=10;break}e.t0={};case 10:if(i=e.t0,0===i.errCode){e.next=13;break}throw function(e){return new Te({subject:e.errSubject||"uni-secure-network",code:e.errCode||e.code||Qa.code,message:e.errMsg||e.message})}(i);case 13:return n=i.clientKey,u=i.key,e.next=16,this.appUtils.setClientKey({provider:this.provider,spaceId:this.spaceId,clientKey:n,key:u});case 16:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"ensureClientKey",value:function(){var e=(0,c.default)(r.default.mark((function e(){var t,a,l,i=this,n=arguments;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:{},a=t.forceUpdate,l=void 0!==a&&a,e.t1=!0,e.next=4,this.hasClientKey();case 4:if(e.t2=e.sent,e.t0=e.t1!==e.t2,e.t0){e.next=8;break}e.t0=l;case 8:if(!e.t0){e.next=10;break}return e.abrupt("return",(l&&this.scopedGlobalCache.initPromise&&this.scopedGlobalCache.initStatus===M||!l&&this.scopedGlobalCache.initPromise&&this.scopedGlobalCache.initStatus!==B||(this.scopedGlobalCache.initPromise=this.getAppClientKey(),this.scopedGlobalCache.initPromise.then((function(e){i.scopedGlobalCache.initStatus=U})).catch((function(e){throw i.scopedGlobalCache.initStatus=B,e})),this.scopedGlobalCache.initStatus=M),this.scopedGlobalCache.initPromise));case 10:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"prepare",value:function(){var e=(0,c.default)(r.default.mark((function e(){var t,a,l,i=arguments;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=i.length>0&&void 0!==i[0]?i[0]:{},a=t.forceUpdate,l=void 0!==a&&a,e.next=3,this.ensureClientKey({forceUpdate:l});case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"platformGetSignOption",value:function(){var e=(0,c.default)(r.default.mark((function e(){var t,a,l;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.appUtils.encrypt({provider:this.provider,spaceId:this.spaceId,data:JSON.stringify({})});case 2:return t=e.sent,a=t.data,l=t.key,e.abrupt("return",{verifyClientSign:a,encryptKeyId:l});case 6:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"platformEncryptData",value:function(){var e=(0,c.default)(r.default.mark((function e(t){var a,l,i,n;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.appUtils.encrypt({provider:this.provider,spaceId:this.spaceId,data:JSON.stringify(t)});case 2:return a=e.sent,l=a.data,i=a.key,n={secretType:this.secretType,encryptKeyId:i},e.abrupt("return",this.secretType===ba?{content:t,_uniCloudOptions:n}:{content:l,_uniCloudOptions:n});case 7:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"platformDecryptResult",value:function(){var e=(0,c.default)(r.default.mark((function e(t){var a,l,i,n,u;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.content,l=t._uniCloudOptions,i=void 0===l?{}:l,n=i.encryptKeyId,e.next=6,this.appUtils.decrypt({provider:this.provider,spaceId:this.spaceId,data:a,key:n});case 6:return u=e.sent,e.abrupt("return",JSON.parse(u.data));case 8:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"isClientKeyNotFound",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.result||{};return 70009===t.errCode&&"uni-secure-network"===t.errSubject}}]),a}(ga);function sl(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.secretType;return t===ha||t===ba||t===pa}function dl(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.name,a=e.data,l=void 0===a?{}:a;return"app"===Q&&"DCloud-clientDB"===t&&"encryption"===l.redirectTo&&"getAppClientKey"===l.action}function cl(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.provider,a=e.spaceId,l=e.functionName,i=De(),n=i.appId,r=i.uniPlatform,u=i.osName,o=r;"app"===r&&(o=u);var s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.provider,a=e.spaceId,l=Y;if(!l)return{};t=function(e){return"tencent"===e?"tcb":e}(t);var i=l.find((function(e){return e.provider===t&&e.spaceId===a}));return i&&i.config}({provider:t,spaceId:a});if(!s||!s.accessControl||!s.accessControl.enable)return!1;var d=s.accessControl.function||{},c=Object.keys(d);if(0===c.length)return!0;var v=function(e,t){for(var a,l,i,n=0;n<e.length;n++){var r=e[n];r!==t?"*"!==r?r.split(",").map((function(e){return e.trim()})).indexOf(t)>-1&&(l=r):i=r:a=r}return a||l||i}(c,l);if(!v)return!1;if((d[v]||[]).find((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e.appId===n&&(e.platform||"").toLowerCase()===o.toLowerCase()})))return!0;throw console.error("此应用[appId: ".concat(n,", platform: ").concat(o,"]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client")),al(Xa)}function vl(e){var t=e.functionName,a=e.result,l=e.logPvd;if(z&&this.__dev__.debugLog&&a&&a.requestId){var i=JSON.stringify({spaceId:this.config.spaceId,functionName:t,requestId:a.requestId});console.log("[".concat(l,"-request]").concat(i,"[/").concat(l,"-request]"))}}function fl(e){var t=e.callFunction,a=function(a){var l=this,i=a.name;a.data=ra.call(e,{data:a.data});var n={aliyun:"aliyun",tencent:"tcb",tcb:"tcb",alipay:"alipay"}[this.config.provider],r=sl(a),u=dl(a),o=r||u;return t.call(this,a).then((function(e){return e.errCode=0,!o&&vl.call(l,{functionName:i,result:e,logPvd:n}),Promise.resolve(e)}),(function(e){return!o&&vl.call(l,{functionName:i,result:e,logPvd:n}),e&&e.message&&(e.message=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.message,a=void 0===t?"":t,l=e.extraInfo,i=void 0===l?{}:l,n=e.formatter,r=void 0===n?[]:n,u=0;u<r.length;u++){var o=r[u],s=o.rule,d=o.content,c=o.mode,v=a.match(s);if(v){for(var f=d,h=1;h<v.length;h++)f=va(f,"{$".concat(h,"}"),v[h]);for(var b in i)f=va(f,"{".concat(b,"}"),i[b]);return"replace"===c?f:a+f}}return a}({message:"[".concat(a.name,"]: ").concat(e.message),formatter:sa,extraInfo:{functionName:i}})),Promise.reject(e)}))};e.callFunction=function(t){var l,i,n=e.config,r=n.provider,u=n.spaceId,o=t.name;return t.data=t.data||{},z&&e.__dev__.debugInfo&&!e.__dev__.debugInfo.forceRemote&&ee?(e._callCloudFunction||(e._callCloudFunction=a,e._callLocalFunction=ua),l=ua):l=a,l=l.bind(e),i=dl(t)?a.call(e,t):function(e){var t=e.name,a=e.data,l=void 0===a?{}:a;return"mp-weixin"===Q&&"uni-id-co"===t&&"secureNetworkHandshakeByWeixin"===l.method}(t)?l.call(e,t):sl(t)?new il({secretType:t.secretType,uniCloudIns:e}).wrapEncryptDataCallFunction(a.bind(e))(t):cl({provider:r,spaceId:u,functionName:o})?new il({secretType:t.secretType,uniCloudIns:e}).wrapVerifyClientCallFunction(a.bind(e))(t):l(t),Object.defineProperty(i,"result",{get:function(){return console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"),{}}}),i.then((function(e){return"undefined"!=typeof UTSJSONObject&&(e.result=new UTSJSONObject(e.result)),e}))}}il="mp-weixin"!==Q&&"app"!==Q?function(){function e(){throw(0,g.default)(this,e),al({message:"Platform ".concat(Q," is not supported by secure network")})}return(0,y.default)(e)}():Z?"mp-weixin"===Q?rl:ol:function(){function e(){throw(0,g.default)(this,e),al({message:"Platform ".concat(Q," is not enabled, please check whether secure network module is enabled in your manifest.json")})}return(0,y.default)(e)}();var hl=Symbol("CLIENT_DB_INTERNAL");function bl(e,t){return e.then="DoNotReturnProxyWithAFunctionNamedThen",e._internalType=hl,e.inspect=null,e.__ob__=void 0,new Proxy(e,{get:function(e,a,l){if("_uniClient"===a)return null;if("symbol"==(0,s.default)(a))return e[a];if(a in e||"string"!=typeof a){var i=e[a];return"function"==typeof i?i.bind(e):i}return t.get(e,a,l)}})}function pl(e){return{on:function(t,a){e[t]=e[t]||[],e[t].indexOf(a)>-1||e[t].push(a)},off:function(t,a){e[t]=e[t]||[];var l=e[t].indexOf(a);-1!==l&&e[t].splice(l,1)}}}var gl=["db.Geo","db.command","command.aggregate"];function yl(e,t){return gl.indexOf("".concat(e,".").concat(t))>-1}function ml(e){switch(F(e)){case"array":return e.map((function(e){return ml(e)}));case"object":return e._internalType===hl||Object.keys(e).forEach((function(t){e[t]=ml(e[t])})),e;case"regexp":return{$regexp:{source:e.source,flags:e.flags}};case"date":return{$date:e.toISOString()};default:return e}}function _l(e){return e&&e.content&&e.content.$method}var wl=function(){function e(t,a,l){(0,g.default)(this,e),this.content=t,this.prevStage=a||null,this.udb=null,this._database=l}return(0,y.default)(e,[{key:"toJSON",value:function(){for(var e=this,t=[e.content];e.prevStage;)e=e.prevStage,t.push(e.content);return{$db:t.reverse().map((function(e){return{$method:e.$method,$param:ml(e.$param)}}))}}},{key:"toString",value:function(){return JSON.stringify(this.toJSON())}},{key:"getAction",value:function(){var e=this.toJSON().$db.find((function(e){return"action"===e.$method}));return e&&e.$param&&e.$param[0]}},{key:"getCommand",value:function(){return{$db:this.toJSON().$db.filter((function(e){return"action"!==e.$method}))}}},{key:"isAggregate",get:function(){for(var e=this;e;){var t=_l(e),a=_l(e.prevStage);if("aggregate"===t&&"collection"===a||"pipeline"===t)return!0;e=e.prevStage}return!1}},{key:"isCommand",get:function(){for(var e=this;e;){if("command"===_l(e))return!0;e=e.prevStage}return!1}},{key:"isAggregateCommand",get:function(){for(var e=this;e;){var t=_l(e),a=_l(e.prevStage);if("aggregate"===t&&"command"===a)return!0;e=e.prevStage}return!1}},{key:"getNextStageFn",value:function(e){var t=this;return function(){return Al({$method:e,$param:ml(Array.from(arguments))},t,t._database)}}},{key:"count",get:function(){return this.isAggregate?this.getNextStageFn("count"):function(){return this._send("count",Array.from(arguments))}}},{key:"remove",get:function(){return this.isCommand?this.getNextStageFn("remove"):function(){return this._send("remove",Array.from(arguments))}}},{key:"get",value:function(){return this._send("get",Array.from(arguments))}},{key:"add",get:function(){return this.isCommand?this.getNextStageFn("add"):function(){return this._send("add",Array.from(arguments))}}},{key:"update",value:function(){return this._send("update",Array.from(arguments))}},{key:"end",value:function(){return this._send("end",Array.from(arguments))}},{key:"set",get:function(){return this.isCommand?this.getNextStageFn("set"):function(){throw new Error("JQL禁止使用set方法")}}},{key:"_send",value:function(e,t){var a=this.getAction(),l=this.getCommand();if(l.$db.push({$method:e,$param:ml(t)}),z){var i=l.$db.find((function(e){return"collection"===e.$method})),n=i&&i.$param;n&&1===n.length&&"string"==typeof i.$param[0]&&i.$param[0].indexOf(",")>-1&&console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。")}return this._database._callCloudFunction({action:a,command:l})}}]),e}();function Al(e,t,a){return bl(new wl(e,t,a),{get:function(e,t){var l="db";return e&&e.content&&(l=e.content.$method),yl(l,t)?Al({$method:t},e,a):function(){return Al({$method:t,$param:ml(Array.from(arguments))},e,a)}}})}function xl(e){var t=e.path,a=e.method;return function(){function e(){(0,g.default)(this,e),this.param=Array.from(arguments)}return(0,y.default)(e,[{key:"toJSON",value:function(){return{$newDb:[].concat((0,d.default)(t.map((function(e){return{$method:e}}))),[{$method:a,$param:this.param}])}}},{key:"toString",value:function(){return JSON.stringify(this.toJSON())}}]),e}()}function Sl(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return bl(new e(t),{get:function(e,t){return yl("db",t)?Al({$method:t},null,e):function(){return Al({$method:t,$param:ml(Array.from(arguments))},null,e)}}})}var kl=function(e){(0,f.default)(a,e);var t=k(a);function a(){return(0,g.default)(this,a),t.apply(this,arguments)}return(0,y.default)(a,[{key:"_parseResult",value:function(e){return this._isJQL?e.result:e}},{key:"_callCloudFunction",value:function(e){var t=this,a=e.action,l=e.command,i=e.multiCommand,n=e.queryList;function r(e,t){if(i&&n)for(var a=0;a<n.length;a++){var l=n[a];l.udb&&"function"==typeof l.udb.setResult&&(t?l.udb.setResult(t):l.udb.setResult(e.result.dataList[a]))}}var u=this,o=this._isJQL?"databaseForJQL":"database";function s(e){return u._callback("error",[e]),oe(se(o,"fail"),e).then((function(){return oe(se(o,"complete"),e)})).then((function(){return r(null,e),we(ve,{type:be,content:e}),Promise.reject(e)}))}var d=oe(se(o,"invoke")),c=this._uniClient;return d.then((function(){return c.callFunction({name:"DCloud-clientDB",type:N,data:{action:a,command:l,multiCommand:i}})})).then((function(e){var a=e.result,l=a.code,i=a.message,n=a.token,d=a.tokenExpired,c=a.systemInfo,v=void 0===c?[]:c;if(v)for(var f=0;f<v.length;f++){var h=v[f],b=h.level,p=h.message,g=h.detail,y=console["app"===Q&&"warn"===b?"error":b]||console.log,m="[System Info]"+p;g&&(m="".concat(m,"\n详细信息：").concat(g)),y(m)}if(l)return s(new Te({code:l,message:i,requestId:e.requestId}));e.result.errCode=e.result.errCode||e.result.code,e.result.errMsg=e.result.errMsg||e.result.message,n&&d&&(Pe({token:n,tokenExpired:d}),t._callbackAuth("refreshToken",[{token:n,tokenExpired:d}]),t._callback("refreshToken",[{token:n,tokenExpired:d}]),we(he,{token:n,tokenExpired:d}));for(var _=[{prop:"affectedDocs",tips:"affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代"},{prop:"code",tips:"code不再推荐使用，请使用errCode替代"},{prop:"message",tips:"message不再推荐使用，请使用errMsg替代"}],w=function(t){var a=_[t],l=a.prop,i=a.tips;if(l in e.result){var n=e.result[l];Object.defineProperty(e.result,l,{get:function(){return console.warn(i),n}})}},A=0;A<_.length;A++)w(A);return function(e){return oe(se(o,"success"),e).then((function(){return oe(se(o,"complete"),e)})).then((function(){r(e,null);var t=u._parseResult(e);return we(ve,{type:be,content:t}),Promise.resolve(t)}))}(e)}),(function(e){return/fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e.message)&&console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB"),s(new Te({code:e.code||"SYSTEM_ERROR",message:e.message,requestId:e.requestId}))}))}}]),a}(function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=t.uniClient,l=void 0===a?{}:a,i=t.isJQL,n=void 0!==i&&i;(0,g.default)(this,e),this._uniClient=l,this._authCallBacks={},this._dbCallBacks={},l._isDefault&&(this._dbCallBacks=le("_globalUniCloudDatabaseCallback")),n||(this.auth=pl(this._authCallBacks)),this._isJQL=n,Object.assign(this,pl(this._dbCallBacks)),this.env=bl({},{get:function(e,t){return{$env:t}}}),this.Geo=bl({},{get:function(e,t){return xl({path:["Geo"],method:t})}}),this.serverDate=xl({path:[],method:"serverDate"}),this.RegExp=xl({path:[],method:"RegExp"})}return(0,y.default)(e,[{key:"getCloudEnv",value:function(e){if("string"!=typeof e||!e.trim())throw new Error("getCloudEnv参数错误");return{$env:e.replace("$cloudEnv_","")}}},{key:"_callback",value:function(e,t){var a=this._dbCallBacks;a[e]&&a[e].forEach((function(e){e.apply(void 0,(0,d.default)(t))}))}},{key:"_callbackAuth",value:function(e,t){var a=this._authCallBacks;a[e]&&a[e].forEach((function(e){e.apply(void 0,(0,d.default)(t))}))}},{key:"multiSend",value:function(){var e=Array.from(arguments),t=e.map((function(e){var t=e.getAction(),a=e.getCommand();if("getTemp"!==a.$db[a.$db.length-1].$method)throw new Error("multiSend只支持子命令内使用getTemp");return{action:t,command:a}}));return this._callCloudFunction({multiCommand:t,queryList:e})}}]),e}()),Ol="token无效，跳转登录页面",El="token过期，跳转登录页面",Tl={TOKEN_INVALID_TOKEN_EXPIRED:El,TOKEN_INVALID_INVALID_CLIENTID:Ol,TOKEN_INVALID:Ol,TOKEN_INVALID_WRONG_TOKEN:Ol,TOKEN_INVALID_ANONYMOUS_USER:Ol},Cl={"uni-id-token-expired":El,"uni-id-check-token-failed":Ol,"uni-id-token-not-exist":Ol,"uni-id-check-device-feature-failed":Ol};function Il(e,t){var a="";return a=e?"".concat(e,"/").concat(t):t,a.replace(/^\//,"")}function Pl(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",a=[],l=[];return e.forEach((function(e){!0===e.needLogin?a.push(Il(t,e.path)):!1===e.needLogin&&l.push(Il(t,e.path))})),{needLoginPage:a,notNeedLoginPage:l}}function Dl(e){return e.split("?")[0].replace(/^\//,"")}function Rl(){return function(e){var t=e&&e.$page&&e.$page.fullPath||"";return t?("/"!==t.charAt(0)&&(t="/"+t),t):t}(function(){var e=getCurrentPages();return e[e.length-1]}())}function Ll(){return Dl(Rl())}function jl(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!e)return!1;if(!(t&&t.list&&t.list.length))return!1;var a=t.list,l=Dl(e);return a.some((function(e){return e.pagePath===l}))}var Nl,Ml=!!m.default.uniIdRouter,Ul=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m.default,t=e.pages,a=void 0===t?[]:t,l=e.subPackages,i=void 0===l?[]:l,n=e.uniIdRouter,r=void 0===n?{}:n,u=e.tabBar,o=void 0===u?{}:u,s=r.loginPage,c=r.needLogin,v=void 0===c?[]:c,f=r.resToLogin,h=void 0===f||f,b=Pl(a),p=b.needLoginPage,g=b.notNeedLoginPage,y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=[],a=[];return e.forEach((function(e){var l=e.root,i=e.pages,n=void 0===i?[]:i,r=Pl(n,l),u=r.needLoginPage,o=r.notNeedLoginPage;t.push.apply(t,(0,d.default)(u)),a.push.apply(a,(0,d.default)(o))})),{needLoginPage:t,notNeedLoginPage:a}}(i),_=y.needLoginPage,w=y.notNeedLoginPage;return{loginPage:s,routerNeedLogin:v,resToLogin:h,needLoginPage:[].concat((0,d.default)(p),(0,d.default)(_)),notNeedLoginPage:[].concat((0,d.default)(g),(0,d.default)(w)),loginPageInTabBar:jl(s,o)}}(),Bl=Ul.loginPage,Fl=Ul.routerNeedLogin,Vl=Ul.resToLogin,$l=Ul.needLoginPage,Kl=Ul.notNeedLoginPage,ql=Ul.loginPageInTabBar;if($l.indexOf(Bl)>-1)throw new Error("Login page [".concat(Bl,'] should not be "needLogin", please check your pages.json'));function Hl(e){var t=Ll();if("/"===e.charAt(0))return e;var a=e.split("?"),l=(0,o.default)(a,2),i=l[0],n=l[1],r=i.replace(/^\//,"").split("/"),u=t.split("/");u.pop();for(var s=0;s<r.length;s++){var d=r[s];".."===d?u.pop():"."!==d&&u.push(d)}return""===u[0]&&u.shift(),"/"+u.join("/")+(n?"?"+n:"")}function Gl(e){var t=Dl(Hl(e));return!(Kl.indexOf(t)>-1)&&($l.indexOf(t)>-1||Fl.some((function(t){return function(e,t){return new RegExp(t).test(e)}(e,t)})))}function Wl(e){var t=e.redirect,a=Dl(t),l=Dl(Bl);return Ll()!==l&&a!==l}function zl(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.api,a=e.redirect;if(a&&Wl({redirect:a})){var i=function(e,t){return"/"!==e.charAt(0)&&(e="/"+e),t?e.indexOf("?")>-1?e+"&uniIdRedirectUrl=".concat(encodeURIComponent(t)):e+"?uniIdRedirectUrl=".concat(encodeURIComponent(t)):e}(Bl,a);ql?"navigateTo"!==t&&"redirectTo"!==t||(t="switchTab"):"switchTab"===t&&(t="navigateTo");var n={navigateTo:l.navigateTo,redirectTo:l.redirectTo,switchTab:l.switchTab,reLaunch:l.reLaunch};setTimeout((function(){n[t]({url:i})}),0)}}function Jl(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.url,a={abortLoginPageJump:!1,autoToLoginPage:!1},l=function(){var e,t=Ie(),a=t.token,l=t.tokenExpired;if(a){if(l<Date.now()){var i="uni-id-token-expired";e={errCode:i,errMsg:Cl[i]}}}else{var n="uni-id-check-token-failed";e={errCode:n,errMsg:Cl[n]}}return e}();if(Gl(t)&&l){if(l.uniIdRedirectUrl=t,ye(fe).length>0)return setTimeout((function(){we(fe,l)}),0),a.abortLoginPageJump=!0,a;a.autoToLoginPage=!0}return a}function Zl(){!function(){var e=Rl(),t=Jl({url:e}),a=t.abortLoginPageJump,l=t.autoToLoginPage;a||l&&zl({api:"redirectTo",redirect:e})}();for(var e=["navigateTo","redirectTo","reLaunch","switchTab"],t=function(t){var a=e[t];l.addInterceptor(a,{invoke:function(e){var t=Jl({url:e.url}),l=t.abortLoginPageJump,i=t.autoToLoginPage;return l?e:i?(zl({api:a,redirect:Hl(e.url)}),!1):e}})},a=0;a<e.length;a++)t(a)}function Yl(){this.onResponse((function(e){var t=e.type,a=e.content,l=!1;switch(t){case"cloudobject":l=function(e){if("object"!=(0,s.default)(e))return!1;var t=e||{},a=t.errCode;return a in Cl}(a);break;case"clientdb":l=function(e){if("object"!=(0,s.default)(e))return!1;var t=e||{},a=t.errCode;return a in Tl}(a)}l&&function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=ye(fe);Se().then((function(){var a=Rl();if(a&&Wl({redirect:a}))return t.length>0?we(fe,Object.assign({uniIdRedirectUrl:a},e)):void(Bl&&zl({api:"navigateTo",redirect:a}))}))}(a)}))}function Ql(e){!function(e){e.onResponse=function(e){me(ve,e)},e.offResponse=function(e){_e(ve,e)}}(e),function(e){e.onNeedLogin=function(e){me(fe,e)},e.offNeedLogin=function(e){_e(fe,e)},Ml&&(le("_globalUniCloudStatus").needLoginInit||(le("_globalUniCloudStatus").needLoginInit=!0,Se().then((function(){Zl.call(e)})),Vl&&Yl.call(e)))}(e),function(e){e.onRefreshToken=function(e){me(he,e)},e.offRefreshToken=function(e){_e(he,e)}}(e)}var Xl="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",ei=/^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;function ti(){var e,t,a=Ie().token||"",l=a.split(".");if(!a||3!==l.length)return{uid:null,role:[],permission:[],tokenExpired:0};try{e=JSON.parse((t=l[1],decodeURIComponent(Nl(t).split("").map((function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)})).join(""))))}catch(a){throw new Error("获取当前用户信息出错，详细错误信息为："+a.message)}return e.tokenExpired=1e3*e.exp,delete e.exp,delete e.iat,e}Nl="function"!=typeof atob?function(e){if(e=String(e).replace(/[\t\n\f\r ]+/g,""),!ei.test(e))throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");var t;e+="==".slice(2-(3&e.length));for(var a,l,i="",n=0;n<e.length;)t=Xl.indexOf(e.charAt(n++))<<18|Xl.indexOf(e.charAt(n++))<<12|(a=Xl.indexOf(e.charAt(n++)))<<6|(l=Xl.indexOf(e.charAt(n++))),i+=64===a?String.fromCharCode(t>>16&255):64===l?String.fromCharCode(t>>16&255,t>>8&255):String.fromCharCode(t>>16&255,t>>8&255,255&t);return i}:atob;var ai=T((function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var a="chooseAndUploadFile:ok",n="chooseAndUploadFile:fail";function r(e,t){return e.tempFiles.forEach((function(e,a){e.name||(e.name=e.path.substring(e.path.lastIndexOf("/")+1)),t&&(e.fileType=t),e.cloudPath=Date.now()+"_"+a+e.name.substring(e.name.lastIndexOf("."))})),e.tempFilePaths||(e.tempFilePaths=e.tempFiles.map((function(e){return e.path}))),e}function u(e,t,l){var i=l.onChooseFile,n=l.onUploadProgress;return t.then((function(e){if(i){var t=i(e);if(void 0!==t)return Promise.resolve(t).then((function(t){return void 0===t?e:t}))}return e})).then((function(t){return!1===t?{errMsg:a,tempFilePaths:[],tempFiles:[]}:function(e,t){var l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5,i=arguments.length>3?arguments[3]:void 0;(t=Object.assign({},t)).errMsg=a;var n=t.tempFiles,r=n.length,u=0;return new Promise((function(a){for(;u<l;)o();function o(){var l=u++;if(l>=r)!n.find((function(e){return!e.url&&!e.errMsg}))&&a(t);else{var s=n[l];e.uploadFile({provider:s.provider,filePath:s.path,cloudPath:s.cloudPath,fileType:s.fileType,cloudPathAsRealPath:s.cloudPathAsRealPath,onUploadProgress:function(e){e.index=l,e.tempFile=s,e.tempFilePath=s.path,i&&i(e)}}).then((function(e){s.url=e.fileID,l<r&&o()})).catch((function(e){s.errMsg=e.errMsg||e.message,l<r&&o()}))}}}))}(e,t,5,n)}))}t.initChooseAndUploadFile=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{type:"all"};return"image"===t.type?u(e,function(e){var t=e.count,a=e.sizeType,i=e.sourceType,u=void 0===i?["album","camera"]:i,o=e.extension;return new Promise((function(e,i){l.chooseImage({count:t,sizeType:a,sourceType:u,extension:o,success:function(t){e(r(t,"image"))},fail:function(e){i({errMsg:e.errMsg.replace("chooseImage:fail",n)})}})}))}(t),t):"video"===t.type?u(e,function(e){var t=e.camera,a=e.compressed,i=e.maxDuration,u=e.sourceType,o=void 0===u?["album","camera"]:u,s=e.extension;return new Promise((function(e,u){l.chooseVideo({camera:t,compressed:a,maxDuration:i,sourceType:o,extension:s,success:function(t){var a=t.tempFilePath,l=t.duration,i=t.size,n=t.height,u=t.width;e(r({errMsg:"chooseVideo:ok",tempFilePaths:[a],tempFiles:[{name:t.tempFile&&t.tempFile.name||"",path:a,size:i,type:t.tempFile&&t.tempFile.type||"",width:u,height:n,duration:l,fileType:"video",cloudPath:""}]},"video"))},fail:function(e){u({errMsg:e.errMsg.replace("chooseVideo:fail",n)})}})}))}(t),t):u(e,function(e){var t=e.count,a=e.extension;return new Promise((function(e,u){var o=l.chooseFile;if("undefined"!=typeof i&&"function"==typeof i.chooseMessageFile&&(o=i.chooseMessageFile),"function"!=typeof o)return u({errMsg:n+" 请指定 type 类型，该平台仅支持选择 image 或 video。"});o({type:"all",count:t,extension:a,success:function(t){e(r(t))},fail:function(e){u({errMsg:e.errMsg.replace("chooseFile:fail",n)})}})}))}(t),t)}}})),li=E(ai),ii="manual";function ni(e){return{props:{localdata:{type:Array,default:function(){return[]}},options:{type:[Object,Array],default:function(){return{}}},spaceInfo:{type:Object,default:function(){return{}}},collection:{type:[String,Array],default:""},action:{type:String,default:""},field:{type:String,default:""},orderby:{type:String,default:""},where:{type:[String,Object],default:""},pageData:{type:String,default:"add"},pageCurrent:{type:Number,default:1},pageSize:{type:Number,default:20},getcount:{type:[Boolean,String],default:!1},gettree:{type:[Boolean,String],default:!1},gettreepath:{type:[Boolean,String],default:!1},startwith:{type:String,default:""},limitlevel:{type:Number,default:10},groupby:{type:String,default:""},groupField:{type:String,default:""},distinct:{type:[Boolean,String],default:!1},foreignKey:{type:String,default:""},loadtime:{type:String,default:"auto"},manual:{type:Boolean,default:!1}},data:function(){return{mixinDatacomLoading:!1,mixinDatacomHasMore:!1,mixinDatacomResData:[],mixinDatacomErrorMessage:"",mixinDatacomPage:{},mixinDatacomError:null}},created:function(){var e=this;this.mixinDatacomPage={current:this.pageCurrent,size:this.pageSize,count:0},this.$watch((function(){var t=[];return["pageCurrent","pageSize","localdata","collection","action","field","orderby","where","getont","getcount","gettree","groupby","groupField","distinct"].forEach((function(a){t.push(e[a])})),t}),(function(t,a){if(e.loadtime!==ii){for(var l=!1,i=[],n=2;n<t.length;n++)t[n]!==a[n]&&(i.push(t[n]),l=!0);t[0]!==a[0]&&(e.mixinDatacomPage.current=e.pageCurrent),e.mixinDatacomPage.size=e.pageSize,e.onMixinDatacomPropsChange(l,i)}}))},methods:{onMixinDatacomPropsChange:function(e,t){},mixinDatacomEasyGet:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=t.getone,l=void 0!==a&&a,i=t.success,n=t.fail;this.mixinDatacomLoading||(this.mixinDatacomLoading=!0,this.mixinDatacomErrorMessage="",this.mixinDatacomError=null,this.mixinDatacomGet().then((function(t){e.mixinDatacomLoading=!1;var a=t.result,n=a.data,r=a.count;e.getcount&&(e.mixinDatacomPage.count=r),e.mixinDatacomHasMore=n.length<e.pageSize;var u=l?n.length?n[0]:void 0:n;e.mixinDatacomResData=u,i&&i(u)})).catch((function(t){e.mixinDatacomLoading=!1,e.mixinDatacomErrorMessage=t,e.mixinDatacomError=t,n&&n(t)})))},mixinDatacomGet:function(){var t,a,l=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};l=l||{},a="undefined"!=typeof __uniX&&__uniX?e.databaseForJQL(this.spaceInfo):e.database(this.spaceInfo);var i=l.action||this.action;i&&(a=a.action(i));var n=l.collection||this.collection;a=Array.isArray(n)?(t=a).collection.apply(t,(0,d.default)(n)):a.collection(n);var r=l.where||this.where;r&&Object.keys(r).length&&(a=a.where(r));var u=l.field||this.field;u&&(a=a.field(u));var o=l.foreignKey||this.foreignKey;o&&(a=a.foreignKey(o));var s=l.groupby||this.groupby;s&&(a=a.groupBy(s));var c=l.groupField||this.groupField;c&&(a=a.groupField(c)),!0===(void 0!==l.distinct?l.distinct:this.distinct)&&(a=a.distinct());var v=l.orderby||this.orderby;v&&(a=a.orderBy(v));var f=void 0!==l.pageCurrent?l.pageCurrent:this.mixinDatacomPage.current,h=void 0!==l.pageSize?l.pageSize:this.mixinDatacomPage.size,b=void 0!==l.getcount?l.getcount:this.getcount,p=void 0!==l.gettree?l.gettree:this.gettree,g=void 0!==l.gettreepath?l.gettreepath:this.gettreepath,y={getCount:b},m={limitLevel:void 0!==l.limitlevel?l.limitlevel:this.limitlevel,startWith:void 0!==l.startwith?l.startwith:this.startwith};return p&&(y.getTree=m),g&&(y.getTreePath=m),a=a.skip(h*(f-1)).limit(h).get(y),a}}}}function ri(e){return function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.customUI=t.customUI||e.customUI,e.parseSystemError=t.parseSystemError||e.parseSystemError,Object.assign(e.loadingOptions,t.loadingOptions),Object.assign(e.errorOptions,t.errorOptions),"object"==(0,s.default)(t.secretMethods)&&(e.secretMethods=t.secretMethods),e}({customUI:!1,loadingOptions:{title:"加载中...",mask:!0},errorOptions:{type:"modal",retry:!1}},a);var i=a,n=i.customUI,u=i.loadingOptions,o=i.errorOptions,d=i.parseSystemError,v=!n;return new Proxy({},{get:function(i,n){switch(n){case"toString":return"[object UniCloudObject]";case"toJSON":return{}}return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.fn,a=e.interceptorName,l=e.getCallbackArgs;return(0,c.default)(r.default.mark((function e(){var i,n,u,o,s,d,c=arguments;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(i=c.length,n=new Array(i),u=0;u<i;u++)n[u]=c[u];return o=l?l({params:n}):{},e.prev=2,e.next=5,oe(se(a,"invoke"),S({},o));case 5:return e.next=7,t.apply(void 0,n);case 7:return s=e.sent,e.next=10,oe(se(a,"success"),S(S({},o),{},{result:s}));case 10:return e.abrupt("return",s);case 13:return e.prev=13,e.t0=e["catch"](2),d=e.t0,e.next=18,oe(se(a,"fail"),S(S({},o),{},{error:d}));case 18:throw d;case 19:return e.prev=19,e.next=22,oe(se(a,"complete"),S(S({},o),{},d?{error:d}:{result:s}));case 22:return e.finish(19);case 23:case"end":return e.stop()}}),e,null,[[2,13,19,23]])})))}({fn:function(){var i=(0,c.default)(r.default.mark((function i(){var h,b,p,g,y,m,_,w,A,x,k,O,E,T,C,I=arguments;return r.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:for(v&&l.showLoading({title:u.title,mask:u.mask}),b=I.length,p=new Array(b),g=0;g<b;g++)p[g]=I[g];return y={name:t,type:j,data:{method:n,params:p}},"object"==(0,s.default)(a.secretMethods)&&function(e,t){var a=t.data.method,l=e.secretMethods||{},i=l[a]||l["*"];i&&(t.secretType=i)}(a,y),m=!1,i.prev=5,i.next=8,e.callFunction(y);case 8:h=i.sent,i.next=14;break;case 11:i.prev=11,i.t0=i["catch"](5),m=!0,h={result:new Te(i.t0)};case 14:if(_=h.result||{},w=_.errSubject,A=_.errCode,x=_.errMsg,k=_.newToken,v&&l.hideLoading(),k&&k.token&&k.tokenExpired&&(Pe(k),we(he,S({},k))),!A){i.next=39;break}if(O=x,!m||!d){i.next=24;break}return i.next=20,d({objectName:t,methodName:n,params:p,errSubject:w,errCode:A,errMsg:x});case 20:if(i.t1=i.sent.errMsg,i.t1){i.next=23;break}i.t1=x;case 23:O=i.t1;case 24:if(!v){i.next=37;break}if("toast"!==o.type){i.next=29;break}l.showToast({title:O,icon:"none"}),i.next=37;break;case 29:if("modal"===o.type){i.next=31;break}throw new Error("Invalid errorOptions.type: ".concat(o.type));case 31:return i.next=33,(0,c.default)(r.default.mark((function e(){var t,a,i,n,u,o,s=arguments;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=s.length>0&&void 0!==s[0]?s[0]:{},a=t.title,i=t.content,n=t.showCancel,u=t.cancelText,o=t.confirmText,e.abrupt("return",new Promise((function(e,t){l.showModal({title:a,content:i,showCancel:n,cancelText:u,confirmText:o,success:function(t){e(t)},fail:function(){e({confirm:!1,cancel:!0})}})})));case 2:case"end":return e.stop()}}),e)})))({title:"提示",content:O,showCancel:o.retry,cancelText:"取消",confirmText:o.retry?"重试":"确定"});case 33:if(E=i.sent,T=E.confirm,!o.retry||!T){i.next=37;break}return i.abrupt("return",f.apply(void 0,p));case 37:throw C=new Te({subject:w,code:A,message:x,requestId:h.requestId}),C.detail=h.result,we(ve,{type:ge,content:C}),C;case 39:return i.abrupt("return",(we(ve,{type:ge,content:h.result}),h.result));case 40:case"end":return i.stop()}}),i,null,[[5,11]])})));function f(){return i.apply(this,arguments)}return f}(),interceptorName:"callObject",getCallbackArgs:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=e.params;return{objectName:t,methodName:n,params:a}}})}})}}function ui(e){return le("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}",e.config.spaceId))}function oi(){return si.apply(this,arguments)}function si(){return si=(0,c.default)(r.default.mark((function e(){var t,a,i,n,u,o,s,d=arguments;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=d.length>0&&void 0!==d[0]?d[0]:{},a=t.openid,i=t.callLoginByWeixin,n=void 0!==i&&i,u=ui(this),"mp-weixin"===Q){e.next=4;break}throw new Error("[SecureNetwork] API `initSecureNetworkByWeixin` is not supported on platform `".concat(Q,"`"));case 4:if(!a||!n){e.next=6;break}throw new Error("[SecureNetwork] openid and callLoginByWeixin cannot be passed at the same time");case 6:if(!a){e.next=8;break}return e.abrupt("return",(u.mpWeixinOpenid=a,{}));case 8:return e.next=10,new Promise((function(e,t){l.login({success:function(t){e(t.code)},fail:function(e){t(new Error(e.errMsg))}})}));case 10:return o=e.sent,s=this.importObject("uni-id-co",{customUI:!0}),e.next=14,s.secureNetworkHandshakeByWeixin({code:o,callLoginByWeixin:n});case 14:return u.mpWeixinCode=o,e.abrupt("return",{code:o});case 16:case"end":return e.stop()}}),e,this)}))),si.apply(this,arguments)}function di(e){return ci.apply(this,arguments)}function ci(){return ci=(0,c.default)(r.default.mark((function e(t){var a;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=ui(this),e.abrupt("return",(a.initPromise||(a.initPromise=oi.call(this,t).then((function(e){return e})).catch((function(e){throw delete a.initPromise,e}))),a.initPromise));case 2:case"end":return e.stop()}}),e,this)}))),ci.apply(this,arguments)}function vi(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=t.openid,l=t.callLoginByWeixin,i=void 0!==l&&l;return di.call(e,{openid:a,callLoginByWeixin:i})}}function fi(e){!function(e){Le=e}(e)}function hi(e){var t={getSystemInfo:l.getSystemInfo,getPushClientId:l.getPushClientId};return function(a){return new Promise((function(l,i){t[e](S(S({},a),{},{success:function(e){l(e)},fail:function(e){i(e)}}))}))}}var bi=function(e){(0,f.default)(a,e);var t=k(a);function a(){var e;return(0,g.default)(this,a),e=t.call(this),e._uniPushMessageCallback=e._receivePushMessage.bind((0,u.default)(e)),e._currentMessageId=-1,e._payloadQueue=[],e}return(0,y.default)(a,[{key:"init",value:function(){var e=this;return Promise.all([hi("getSystemInfo")(),hi("getPushClientId")()]).then((function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],a=(0,o.default)(t,2),l=a[0];l=void 0===l?{}:l;var i=l.appId,n=a[1];n=void 0===n?{}:n;var r=n.cid;if(!i)throw new Error("Invalid appId, please check the manifest.json file");if(!r)throw new Error("Invalid push client id");e._appId=i,e._pushClientId=r,e._seqId=Date.now()+"-"+Math.floor(9e5*Math.random()+1e5),e.emit("open"),e._initMessageListener()}),(function(t){throw e.emit("error",t),e.close(),t}))}},{key:"open",value:function(){var e=(0,c.default)(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",this.init());case 1:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"_isUniCloudSSE",value:function(e){if("receive"!==e.type)return!1;var t=e&&e.data&&e.data.payload;return!(!t||"UNI_CLOUD_SSE"!==t.channel||t.seqId!==this._seqId)}},{key:"_receivePushMessage",value:function(e){if(this._isUniCloudSSE(e)){var t=e&&e.data&&e.data.payload,a=t.action,l=t.messageId,i=t.message;this._payloadQueue.push({action:a,messageId:l,message:i}),this._consumMessage()}}},{key:"_consumMessage",value:function(){for(var e=this;;){var t=this._payloadQueue.find((function(t){return t.messageId===e._currentMessageId+1}));if(!t)break;this._currentMessageId++,this._parseMessagePayload(t)}}},{key:"_parseMessagePayload",value:function(e){var t=e.action,a=e.messageId,l=e.message;"end"===t?this._end({messageId:a,message:l}):"message"===t&&this._appendMessage({messageId:a,message:l})}},{key:"_appendMessage",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=(e.messageId,e.message);this.emit("message",t)}},{key:"_end",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=(e.messageId,e.message);this.emit("end",t),this.close()}},{key:"_initMessageListener",value:function(){l.onPushMessage(this._uniPushMessageCallback)}},{key:"_destroy",value:function(){l.offPushMessage(this._uniPushMessageCallback)}},{key:"toJSON",value:function(){return{appId:this._appId,pushClientId:this._pushClientId,seqId:this._seqId}}},{key:"close",value:function(){this._destroy(),this.emit("close")}}]),a}(function(){function e(){(0,g.default)(this,e),this._callback={}}return(0,y.default)(e,[{key:"addListener",value:function(e,t){this._callback[e]||(this._callback[e]=[]),this._callback[e].push(t)}},{key:"on",value:function(e,t){return this.addListener(e,t)}},{key:"removeListener",value:function(e,t){if(!t)throw new Error('The "listener" argument must be of type function. Received undefined');var a=this._callback[e];if(a){var l=function(e,t){for(var a=e.length-1;a>=0;a--)if(e[a]===t)return a;return-1}(a,t);a.splice(l,1)}}},{key:"off",value:function(e,t){return this.removeListener(e,t)}},{key:"removeAllListener",value:function(e){delete this._callback[e]}},{key:"emit",value:function(e){for(var t=this._callback[e],a=arguments.length,l=new Array(a>1?a-1:0),i=1;i<a;i++)l[i-1]=arguments[i];if(t)for(var n=0;n<t.length;n++)t[n].apply(t,l)}}]),e}());function pi(e,t){return gi.apply(this,arguments)}function gi(){return gi=(0,c.default)(r.default.mark((function e(t,a){var l,i,n;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return l="http://".concat(t,":").concat(a,"/system/ping"),e.prev=1,e.next=4,n={url:l,timeout:500},new Promise((function(e,t){Ce.request(S(S({},n),{},{success:function(t){e(t)},fail:function(e){t(e)}}))}));case 4:return i=e.sent,e.abrupt("return",!(!i.data||0!==i.data.code));case 8:return e.prev=8,e.t0=e["catch"](1),e.abrupt("return",!1);case 11:case"end":return e.stop()}}),e,null,[[1,8]])}))),gi.apply(this,arguments)}function yi(e){return mi.apply(this,arguments)}function mi(){return mi=(0,c.default)(r.default.mark((function e(t){var a,l,i,n,u,o,s,d,v,f,h;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(z){e.next=2;break}return e.abrupt("return",Promise.resolve());case 2:if("app"===Q&&(a=De(),l=a.osName,i=a.osVersion,"ios"===l&&function(e){if(!e||"string"!=typeof e)return 0;var t=e.match(/^(\d+)./);return t&&t[1]?parseInt(t[1]):0}(i)>=14&&console.warn("iOS 14及以上版本连接uniCloud本地调试服务需要允许客户端查找并连接到本地网络上的设备（仅开发期间需要，发行后不需要）")),n=t.__dev__,n.debugInfo){e.next=6;break}return e.abrupt("return");case 6:return u=n.debugInfo,o=u.address,s=u.servePort,e.next=11,function(){var e=(0,c.default)(r.default.mark((function e(t,a){var l,i,n;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:i=0;case 1:if(!(i<t.length)){e.next=11;break}return n=t[i],e.next=5,pi(n,a);case 5:if(!e.sent){e.next=8;break}return l=n,e.abrupt("break",11);case 8:i++,e.next=1;break;case 11:return e.abrupt("return",{address:l,port:a});case 12:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()(o,s);case 11:if(d=e.sent,v=d.address,!v){e.next=15;break}return e.abrupt("return",(n.localAddress=v,void(n.localPort=s)));case 15:if(f=console["app"===Q?"error":"warn"],h="","remote"===n.debugInfo.initialLaunchType?(n.debugInfo.forceRemote=!0,h="当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。"):h="无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。",h+="\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数","web"===Q&&(h+="\n- 部分浏览器开启节流模式之后访问本地地址受限，请检查是否启用了节流模式"),0===Q.indexOf("mp-")&&(h+="\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"),n.debugInfo.forceRemote){e.next=19;break}throw new Error(h);case 19:f(h);case 20:case"end":return e.stop()}}),e)}))),mi.apply(this,arguments)}function _i(e){e._initPromiseHub||(e._initPromiseHub=new G({createPromise:function(){var t,a=Promise.resolve();t=1,a=new Promise((function(e){setTimeout((function(){e()}),t)}));var l=e.auth();return a.then((function(){return l.getLoginState()})).then((function(e){return e?Promise.resolve():l.signInAnonymously()}))}}))}var wi={tcb:Wt,tencent:Wt,aliyun:Be,private:Jt,alipay:na},Ai=new(function(){function e(){(0,g.default)(this,e)}return(0,y.default)(e,[{key:"init",value:function(e){var t={},a=wi[e.provider];if(!a)throw new Error("未提供正确的provider参数");return t=a.init(e),z&&function(e){if(z){var t={};e.__dev__=t,t.debugLog=z&&("web"===Q&&navigator.userAgent.indexOf("HBuilderX")>0||"app"===Q);var a=X;a&&!a.code&&(t.debugInfo=a);var l=new G({createPromise:function(){return yi(e)}});t.initLocalNetwork=function(){return l.exec()}}}(t),_i(t),fl(t),function(e){var t=e.uploadFile;e.uploadFile=function(e){return t.call(this,e)}}(t),function(e){e.database=function(t){if(t&&Object.keys(t).length>0)return e.init(t).database();if(this._database)return this._database;var a=Sl(kl,{uniClient:e});return this._database=a,a},e.databaseForJQL=function(t){if(t&&Object.keys(t).length>0)return e.init(t).databaseForJQL();if(this._databaseForJQL)return this._databaseForJQL;var a=Sl(kl,{uniClient:e,isJQL:!0});return this._databaseForJQL=a,a}}(t),function(e){e.getCurrentUserInfo=ti,e.chooseAndUploadFile=li.initChooseAndUploadFile(e),Object.assign(e,{get mixinDatacom(){return ni(e)}}),e.SSEChannel=bi,e.initSecureNetworkByWeixin=vi(e),e.setCustomClientInfo=fi,e.importObject=ri(e)}(t),["callFunction","uploadFile","deleteFile","getTempFileURL","downloadFile","chooseAndUploadFile"].forEach((function(e){if(t[e]){var a=t[e];t[e]=function(){return a.apply(t,Array.from(arguments))},t[e]=function(e,t){return function(a){var l=this,i=!1;if("callFunction"===t){var n=a&&a.type||L;i=n!==L}var r="callFunction"===t&&!i,u=this._initPromiseHub.exec();a=a||{};var o=ke(a),s=o.success,d=o.fail,c=o.complete,v=u.then((function(){return i?Promise.resolve():oe(se(t,"invoke"),a)})).then((function(){return e.call(l,a)})).then((function(e){return i?Promise.resolve(e):oe(se(t,"success"),e).then((function(){return oe(se(t,"complete"),e)})).then((function(){return r&&we(ve,{type:pe,content:e}),Promise.resolve(e)}))}),(function(e){return i?Promise.reject(e):oe(se(t,"fail"),e).then((function(){return oe(se(t,"complete"),e)})).then((function(){return we(ve,{type:pe,content:e}),Promise.reject(e)}))}));if(!(s||d||c))return v;v.then((function(e){s&&s(e),c&&c(e),r&&we(ve,{type:pe,content:e})}),(function(e){d&&d(e),c&&c(e),r&&we(ve,{type:pe,content:e})}))}}(t[e],e).bind(t)}})),t.init=this.init,t}}]),e}());(function(){var e=ee,t={};if(e&&1===e.length)t=e[0],Ai=Ai.init(t),Ai._isDefault=!0;else{var a,l=["auth","callFunction","uploadFile","deleteFile","getTempFileURL","downloadFile","database","getCurrentUSerInfo","importObject"];a=e&&e.length>0?"应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间":te?"应用未关联服务空间，请在uniCloud目录右键关联服务空间":"uni-app cli项目内使用uniCloud需要使用HBuilderX的运行菜单运行项目，且需要在uniCloud目录关联服务空间",l.forEach((function(e){Ai[e]=function(){return console.error(a),Promise.reject(new Te({code:"SYS_ERR",message:a}))}}))}Object.assign(Ai,{get mixinDatacom(){return ni(Ai)}}),Ql(Ai),Ai.addInterceptor=re,Ai.removeInterceptor=ue,Ai.interceptObject=de,z&&"web"===Q&&(window.uniCloud=Ai)})();var xi=Ai;t.default=xi}).call(this,a(3),a(2)["default"],a(1)["default"])},384:function(e,t,a){var l=a(385)();e.exports=l},385:function(e,t,a){var l=a(13)["default"];function i(){"use strict";
/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */e.exports=i=function(){return a},e.exports.__esModule=!0,e.exports["default"]=e.exports;var t,a={},n=Object.prototype,r=n.hasOwnProperty,u=Object.defineProperty||function(e,t,a){e[t]=a.value},o="function"==typeof Symbol?Symbol:{},s=o.iterator||"@@iterator",d=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function v(e,t,a){return Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{v({},"")}catch(t){v=function(e,t,a){return e[t]=a}}function f(e,t,a,l){var i=t&&t.prototype instanceof _?t:_,n=Object.create(i.prototype),r=new R(l||[]);return u(n,"_invoke",{value:C(e,a,r)}),n}function h(e,t,a){try{return{type:"normal",arg:e.call(t,a)}}catch(e){return{type:"throw",arg:e}}}a.wrap=f;var b="suspendedStart",p="suspendedYield",g="executing",y="completed",m={};function _(){}function w(){}function A(){}var x={};v(x,s,(function(){return this}));var S=Object.getPrototypeOf,k=S&&S(S(L([])));k&&k!==n&&r.call(k,s)&&(x=k);var O=A.prototype=_.prototype=Object.create(x);function E(e){["next","throw","return"].forEach((function(t){v(e,t,(function(e){return this._invoke(t,e)}))}))}function T(e,t){function a(i,n,u,o){var s=h(e[i],e,n);if("throw"!==s.type){var d=s.arg,c=d.value;return c&&"object"==l(c)&&r.call(c,"__await")?t.resolve(c.__await).then((function(e){a("next",e,u,o)}),(function(e){a("throw",e,u,o)})):t.resolve(c).then((function(e){d.value=e,u(d)}),(function(e){return a("throw",e,u,o)}))}o(s.arg)}var i;u(this,"_invoke",{value:function(e,l){function n(){return new t((function(t,i){a(e,l,t,i)}))}return i=i?i.then(n,n):n()}})}function C(e,a,l){var i=b;return function(n,r){if(i===g)throw Error("Generator is already running");if(i===y){if("throw"===n)throw r;return{value:t,done:!0}}for(l.method=n,l.arg=r;;){var u=l.delegate;if(u){var o=I(u,l);if(o){if(o===m)continue;return o}}if("next"===l.method)l.sent=l._sent=l.arg;else if("throw"===l.method){if(i===b)throw i=y,l.arg;l.dispatchException(l.arg)}else"return"===l.method&&l.abrupt("return",l.arg);i=g;var s=h(e,a,l);if("normal"===s.type){if(i=l.done?y:p,s.arg===m)continue;return{value:s.arg,done:l.done}}"throw"===s.type&&(i=y,l.method="throw",l.arg=s.arg)}}}function I(e,a){var l=a.method,i=e.iterator[l];if(i===t)return a.delegate=null,"throw"===l&&e.iterator["return"]&&(a.method="return",a.arg=t,I(e,a),"throw"===a.method)||"return"!==l&&(a.method="throw",a.arg=new TypeError("The iterator does not provide a '"+l+"' method")),m;var n=h(i,e.iterator,a.arg);if("throw"===n.type)return a.method="throw",a.arg=n.arg,a.delegate=null,m;var r=n.arg;return r?r.done?(a[e.resultName]=r.value,a.next=e.nextLoc,"return"!==a.method&&(a.method="next",a.arg=t),a.delegate=null,m):r:(a.method="throw",a.arg=new TypeError("iterator result is not an object"),a.delegate=null,m)}function P(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function D(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function R(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(P,this),this.reset(!0)}function L(e){if(e||""===e){var a=e[s];if(a)return a.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var i=-1,n=function a(){for(;++i<e.length;)if(r.call(e,i))return a.value=e[i],a.done=!1,a;return a.value=t,a.done=!0,a};return n.next=n}}throw new TypeError(l(e)+" is not iterable")}return w.prototype=A,u(O,"constructor",{value:A,configurable:!0}),u(A,"constructor",{value:w,configurable:!0}),w.displayName=v(A,c,"GeneratorFunction"),a.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===w||"GeneratorFunction"===(t.displayName||t.name))},a.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,A):(e.__proto__=A,v(e,c,"GeneratorFunction")),e.prototype=Object.create(O),e},a.awrap=function(e){return{__await:e}},E(T.prototype),v(T.prototype,d,(function(){return this})),a.AsyncIterator=T,a.async=function(e,t,l,i,n){void 0===n&&(n=Promise);var r=new T(f(e,t,l,i),n);return a.isGeneratorFunction(t)?r:r.next().then((function(e){return e.done?e.value:r.next()}))},E(O),v(O,c,"Generator"),v(O,s,(function(){return this})),v(O,"toString",(function(){return"[object Generator]"})),a.keys=function(e){var t=Object(e),a=[];for(var l in t)a.push(l);return a.reverse(),function e(){for(;a.length;){var l=a.pop();if(l in t)return e.value=l,e.done=!1,e}return e.done=!0,e}},a.values=L,R.prototype={constructor:R,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(D),!e)for(var a in this)"t"===a.charAt(0)&&r.call(this,a)&&!isNaN(+a.slice(1))&&(this[a]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var a=this;function l(l,i){return u.type="throw",u.arg=e,a.next=l,i&&(a.method="next",a.arg=t),!!i}for(var i=this.tryEntries.length-1;i>=0;--i){var n=this.tryEntries[i],u=n.completion;if("root"===n.tryLoc)return l("end");if(n.tryLoc<=this.prev){var o=r.call(n,"catchLoc"),s=r.call(n,"finallyLoc");if(o&&s){if(this.prev<n.catchLoc)return l(n.catchLoc,!0);if(this.prev<n.finallyLoc)return l(n.finallyLoc)}else if(o){if(this.prev<n.catchLoc)return l(n.catchLoc,!0)}else{if(!s)throw Error("try statement without catch or finally");if(this.prev<n.finallyLoc)return l(n.finallyLoc)}}}},abrupt:function(e,t){for(var a=this.tryEntries.length-1;a>=0;--a){var l=this.tryEntries[a];if(l.tryLoc<=this.prev&&r.call(l,"finallyLoc")&&this.prev<l.finallyLoc){var i=l;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var n=i?i.completion:{};return n.type=e,n.arg=t,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(n)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),m},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var a=this.tryEntries[t];if(a.finallyLoc===e)return this.complete(a.completion,a.afterLoc),D(a),m}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var a=this.tryEntries[t];if(a.tryLoc===e){var l=a.completion;if("throw"===l.type){var i=l.arg;D(a)}return i}}throw Error("illegal catch attempt")},delegateYield:function(e,a,l){return this.delegate={iterator:L(e),resultName:a,nextLoc:l},"next"===this.method&&(this.arg=t),m}},a}e.exports=i,e.exports.__esModule=!0,e.exports["default"]=e.exports},386:function(e,t){function a(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}e.exports=a,e.exports.__esModule=!0,e.exports["default"]=e.exports},387:function(e,t){function a(e,t,a,l,i,n,r){try{var u=e[n](r),o=u.value}catch(s){return void a(s)}u.done?t(o):Promise.resolve(o).then(l,i)}function l(e){return function(){var t=this,l=arguments;return new Promise((function(i,n){var r=e.apply(t,l);function u(e){a(r,i,n,u,o,"next",e)}function o(e){a(r,i,n,u,o,"throw",e)}u(void 0)}))}}e.exports=l,e.exports.__esModule=!0,e.exports["default"]=e.exports},388:function(e,t,a){var l=a(16);function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&l(e,t)}e.exports=i,e.exports.__esModule=!0,e.exports["default"]=e.exports},389:function(e,t,a){var l=a(13)["default"],i=a(386);function n(e,t){if(t&&("object"===l(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return i(e)}e.exports=n,e.exports.__esModule=!0,e.exports["default"]=e.exports},390:function(e,t){function a(t){return e.exports=a=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},e.exports.__esModule=!0,e.exports["default"]=e.exports,a(t)}e.exports=a,e.exports.__esModule=!0,e.exports["default"]=e.exports},391:function(e,t,a){var l=a(390),i=a(16),n=a(392),r=a(15);function u(t){var a="function"===typeof Map?new Map:void 0;return e.exports=u=function(e){if(null===e||!n(e))return e;if("function"!==typeof e)throw new TypeError("Super expression must either be null or a function");if("undefined"!==typeof a){if(a.has(e))return a.get(e);a.set(e,t)}function t(){return r(e,arguments,l(this).constructor)}return t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),i(t,e)},e.exports.__esModule=!0,e.exports["default"]=e.exports,u(t)}e.exports=u,e.exports.__esModule=!0,e.exports["default"]=e.exports},392:function(e,t){function a(e){try{return-1!==Function.toString.call(e).indexOf("[native code]")}catch(t){return"function"===typeof e}}e.exports=a,e.exports.__esModule=!0,e.exports["default"]=e.exports},393:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l={pages:[{path:"pages/tabbar/home/index",style:{}},{path:"pages/tabbar/classify/index",style:{}},{path:"pages/tabbar/phone/index",style:{}},{path:"pages/tabbar/shopping/index",style:{}},{path:"pages/tabbar/my/index",style:{}},{path:"pages/tabbar/home/components/search/index",style:{}},{path:"pages/tabbar/home/components/shopDetails/index",style:{}},{path:"pages/sonView/login/index",style:{}},{path:"pages/sonView/volume/index",style:{}},{path:"pages/sonView/spikes/index",style:{}},{path:"pages/sonView/new/index",style:{}},{path:"pages/sonView/oneSpikes/index",style:{}},{path:"pages/sonView/commentsAll/index",style:{}},{path:"pages/sonView/swiperActive/index",style:{}},{path:"pages/sonView/popularize/index",style:{}},{path:"pages/sonView/payouts/index",style:{}},{path:"pages/sonView/addCard/index",style:{}},{path:"pages/sonView/earnings/index",style:{}},{path:"pages/sonView/team/index",style:{}},{path:"pages/sonView/myInfo/index",style:{}},{path:"pages/sonView/discountAll/index",style:{}},{path:"pages/sonView/address/index",style:{}},{path:"pages/sonView/addressForm/index",style:{}},{path:"pages/sonView/okOrder/index",style:{}},{path:"pages/sonView/myOrder/index",style:{}},{path:"pages/sonView/myOrderDetails/index",style:{}},{path:"pages/sonView/riderLogin/index",style:{}},{path:"pages/sonView/riderOrder/index",style:{}},{path:"pages/sonView/citySel/index",style:{}},{path:"pages/sonView/cityTo/index",style:{}}],globalStyle:{navigationBarTextStyle:"black",navigationBarBackgroundColor:"#F8F8F8",backgroundColor:"#F8F8F8",navigationStyle:"custom","app-plus":{titleView:!1}}};t.default=l},394:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l={appid:"__UNI__C989549"};t.default=l},4:function(e,t){function a(e){return e&&e.__esModule?e:{default:e}}e.exports=a,e.exports.__esModule=!0,e.exports["default"]=e.exports},402:function(e,t,a){"use strict";var l=a(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=l(a(403)),n=l(a(404)),r=l(a(405)),u={en:i.default,"zh-Hans":n.default,"zh-Hant":r.default};t.default=u},403:function(e){e.exports=JSON.parse('{"uni-search-bar.cancel":"cancel","uni-search-bar.placeholder":"Search enter content"}')},404:function(e){e.exports=JSON.parse('{"uni-search-bar.cancel":"取消","uni-search-bar.placeholder":"请输入搜索内容"}')},405:function(e){e.exports=JSON.parse('{"uni-search-bar.cancel":"取消","uni-search-bar.placeholder":"請輸入搜索內容"}')},448:function(e,t,a){"use strict";var l=a(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=l(a(449)),n=l(a(450)),r=l(a(451)),u={en:i.default,"zh-Hans":n.default,"zh-Hant":r.default};t.default=u},449:function(e){e.exports=JSON.parse('{"uni-countdown.day":"day","uni-countdown.h":"h","uni-countdown.m":"m","uni-countdown.s":"s"}')},450:function(e){e.exports=JSON.parse('{"uni-countdown.day":"天","uni-countdown.h":"时","uni-countdown.m":"分","uni-countdown.s":"秒"}')},451:function(e){e.exports=JSON.parse('{"uni-countdown.day":"天","uni-countdown.h":"時","uni-countdown.m":"分","uni-countdown.s":"秒"}')},478:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l={},i=null;l={data:function(){return{is_show:"none"}},watch:{show:function(e){this.is_show=this.show}},created:function(){this.swipeaction=this.getSwipeAction(),this.swipeaction&&Array.isArray(this.swipeaction.children)&&this.swipeaction.children.push(this)},mounted:function(){this.is_show=this.show},methods:{closeSwipe:function(e){this.autoClose&&this.swipeaction&&this.swipeaction.closeOther(this)},change:function(e){this.$emit("change",e.open),this.is_show!==e.open&&(this.is_show=e.open)},appTouchStart:function(e){if(!i){var t=e.changedTouches[0].clientX;this.clientX=t,this.timestamp=(new Date).getTime()}},appTouchEnd:function(e,t,a,l){if(!i){var n=e.changedTouches[0].clientX,r=Math.abs(this.clientX-n),u=(new Date).getTime()-this.timestamp;r<40&&u<300&&this.$emit("click",{content:a,index:t,position:l})}},onClickForPC:function(e,t,a){}}};var n=l;t.default=n},479:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l={},i=l;t.default=i},480:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l={},i=l;t.default=i},497:function(e,t,a){"use strict";(function(e,a,l){Object.defineProperty(t,"__esModule",{value:!0}),t.chooseAndUploadFile=v,t.uploadCloudFiles=d;var i="chooseAndUploadFile:ok",n="chooseAndUploadFile:fail";function r(t){var a=t.count,l=t.sizeType,i=void 0===l?["original","compressed"]:l,r=t.sourceType,u=t.extension;return new Promise((function(t,l){e.chooseMedia({count:a,sizeType:i,sourceType:r,mediaType:["image"],extension:u,success:function(e){e.tempFiles.forEach((function(e){e.path=e.tempFilePath})),t(s(e,"image"))},fail:function(e){l({errMsg:e.errMsg.replace("chooseImage:fail",n)})}})}))}function u(t){var a=t.count,l=(t.camera,t.compressed),i=t.maxDuration,r=t.sourceType,u=t.extension;return new Promise((function(t,o){e.chooseMedia({count:a,compressed:l,maxDuration:i,sourceType:r,extension:u,mediaType:["video"],success:function(e){var a=e.tempFiles;t(s({errMsg:"chooseVideo:ok",tempFiles:a.map((function(t){return{name:t.name||"",path:t.tempFilePath,thumbTempFilePath:t.thumbTempFilePath,size:t.size,type:e.tempFile&&e.tempFile.type||"",width:t.width,height:t.height,duration:t.duration,fileType:"video",cloudPath:""}}))},"video"))},fail:function(e){o({errMsg:e.errMsg.replace("chooseVideo:fail",n)})}})}))}function o(t){var l=t.count,i=t.extension;return new Promise((function(t,r){var u=e.chooseFile;if("undefined"!==typeof a&&"function"===typeof a.chooseMessageFile&&(u=a.chooseMessageFile),"function"!==typeof u)return r({errMsg:n+" 请指定 type 类型，该平台仅支持选择 image 或 video。"});u({type:"all",count:l,extension:i,success:function(e){t(s(e))},fail:function(e){r({errMsg:e.errMsg.replace("chooseFile:fail",n)})}})}))}function s(e,t){return e.tempFiles.forEach((function(e,a){e.name||(e.name=e.path.substring(e.path.lastIndexOf("/")+1)),t&&(e.fileType=t),e.cloudPath=Date.now()+"_"+a+e.name.substring(e.name.lastIndexOf("."))})),e.tempFilePaths||(e.tempFilePaths=e.tempFiles.map((function(e){return e.path}))),e}function d(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5,a=arguments.length>2?arguments[2]:void 0;e=JSON.parse(JSON.stringify(e));var i=e.length,n=0,r=this;return new Promise((function(u){while(n<t)o();function o(){var t=n++;if(t>=i)!e.find((function(e){return!e.url&&!e.errMsg}))&&u(e);else{var s=e[t],d=r.files.findIndex((function(e){return e.uuid===s.uuid}));s.url="",delete s.errMsg,l.uploadFile({filePath:s.path,cloudPath:s.cloudPath,fileType:s.fileType,onUploadProgress:function(e){e.index=d,a&&a(e)}}).then((function(e){s.url=e.fileID,s.index=d,t<i&&o()})).catch((function(e){s.errMsg=e.errMsg||e.message,s.index=d,t<i&&o()}))}}}))}function c(e,t){var a=t.onChooseFile;t.onUploadProgress;return e.then((function(e){if(a){var t=a(e);if("undefined"!==typeof t)return Promise.resolve(t).then((function(t){return"undefined"===typeof t?e:t}))}return e})).then((function(e){return!1===e?{errMsg:i,tempFilePaths:[],tempFiles:[]}:e}))}function v(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{type:"all"};return"image"===e.type?c(r(e),e):"video"===e.type?c(u(e),e):c(o(e),e)}}).call(this,a(2)["default"],a(1)["default"],a(383)["default"])},498:function(e,t,a){"use strict";(function(e){var l=a(4);Object.defineProperty(t,"__esModule",{value:!0}),t.get_files_and_is_max=t.get_file_info=t.get_file_ext=t.get_file_data=t.get_extname=void 0;var i=l(a(384)),n=l(a(387)),r=function(e){var t=e.lastIndexOf("."),a=e.length;return{name:e.substring(0,t),ext:e.substring(t+1,a)}};t.get_file_ext=r;var u=function(e){if(Array.isArray(e))return e;var t=e.replace(/(\[|\])/g,"");return t.split(",")};t.get_extname=u;var o=function(t,a){var l=[],i=[];return a&&0!==a.length?(t.tempFiles.forEach((function(e){var t=r(e.name),n=t.ext.toLowerCase();-1!==a.indexOf(n)&&(i.push(e),l.push(e.path))})),i.length!==t.tempFiles.length&&e.showToast({title:"当前选择了".concat(t.tempFiles.length,"个文件 ，").concat(t.tempFiles.length-i.length," 个文件格式不正确"),icon:"none",duration:5e3}),{filePaths:l,files:i}):{filePaths:l,files:i}};t.get_files_and_is_max=o;var s=function(t){return new Promise((function(a,l){e.getImageInfo({src:t,success:function(e){a(e)},fail:function(e){l(e)}})}))};t.get_file_info=s;var d=function(){var e=(0,n.default)(i.default.mark((function e(t){var a,l,n,u,o,d=arguments;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=d.length>1&&void 0!==d[1]?d[1]:"image",l=r(t.name),n=l.ext.toLowerCase(),u={name:t.name,uuid:t.uuid,extname:n||"",cloudPath:t.cloudPath,fileType:t.fileType,thumbTempFilePath:t.thumbTempFilePath,url:t.path||t.path,size:t.size,image:{},path:t.path,video:{}},"image"!==a){e.next=14;break}return e.next=7,s(t.path);case 7:o=e.sent,delete u.video,u.image.width=o.width,u.image.height=o.height,u.image.location=o.path,e.next=15;break;case 14:delete u.image;case 15:return e.abrupt("return",u);case 16:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();t.get_file_data=d}).call(this,a(2)["default"])},5:function(e,t,a){var l=a(6),i=a(7),n=a(8),r=a(10);function u(e,t){return l(e)||i(e,t)||n(e,t)||r()}e.exports=u,e.exports.__esModule=!0,e.exports["default"]=e.exports},513:function(e,t,a){"use strict";(function(e){var l=a(4);Object.defineProperty(t,"__esModule",{value:!0}),t.createAnimation=f;var i=l(a(11)),n=l(a(23)),r=l(a(24));function u(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,l)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?u(Object(a),!0).forEach((function(t){(0,i.default)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):u(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var s=function(){function t(a,l){(0,n.default)(this,t),this.options=a,this.animation=e.createAnimation(o({},a)),this.currentStepAnimates={},this.next=0,this.$=l}return(0,r.default)(t,[{key:"_nvuePushAnimates",value:function(e,t){var a=this.currentStepAnimates[this.next],l={};if(l=a||{styles:{},config:{}},d.includes(e)){l.styles.transform||(l.styles.transform="");var i="";"rotate"===e&&(i="deg"),l.styles.transform+="".concat(e,"(").concat(t+i,") ")}else l.styles[e]="".concat(t);this.currentStepAnimates[this.next]=l}},{key:"_animateRun",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=this.$.$refs["ani"].ref;if(a)return new Promise((function(l,i){nvueAnimation.transition(a,o({styles:e},t),(function(e){l()}))}))}},{key:"_nvueNextAnimate",value:function(e){var t=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,l=arguments.length>2?arguments[2]:void 0,i=e[a];if(i){var n=i.styles,r=i.config;this._animateRun(n,r).then((function(){a+=1,t._nvueNextAnimate(e,a,l)}))}else this.currentStepAnimates={},"function"===typeof l&&l(),this.isEnd=!0}},{key:"step",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.animation.step(e),this}},{key:"run",value:function(e){this.$.animationData=this.animation.export(),this.$.timer=setTimeout((function(){"function"===typeof e&&e()}),this.$.durationTime)}}]),t}(),d=["matrix","matrix3d","rotate","rotate3d","rotateX","rotateY","rotateZ","scale","scale3d","scaleX","scaleY","scaleZ","skew","skewX","skewY","translate","translate3d","translateX","translateY","translateZ"],c=["opacity","backgroundColor"],v=["width","height","left","right","top","bottom"];function f(e,t){if(t)return clearTimeout(t.timer),new s(e,t)}d.concat(c,v).forEach((function(e){s.prototype[e]=function(){var t;return(t=this.animation)[e].apply(t,arguments),this}}))}).call(this,a(2)["default"])},526:function(e,t,a){"use strict";var l=a(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=l(a(527)),n=l(a(528)),r=l(a(529)),u={en:i.default,"zh-Hans":n.default,"zh-Hant":r.default};t.default=u},527:function(e){e.exports=JSON.parse('{"uni-load-more.contentdown":"Pull up to show more","uni-load-more.contentrefresh":"loading...","uni-load-more.contentnomore":"No more data"}')},528:function(e){e.exports=JSON.parse('{"uni-load-more.contentdown":"上拉显示更多","uni-load-more.contentrefresh":"正在加载...","uni-load-more.contentnomore":"没有更多数据了"}')},529:function(e){e.exports=JSON.parse('{"uni-load-more.contentdown":"上拉顯示更多","uni-load-more.contentrefresh":"正在加載...","uni-load-more.contentnomore":"沒有更多數據了"}')},6:function(e,t){function a(e){if(Array.isArray(e))return e}e.exports=a,e.exports.__esModule=!0,e.exports["default"]=e.exports},65:function(e,t,a){"use strict";(function(e){var l=a(4);Object.defineProperty(t,"__esModule",{value:!0}),t.debounce=void 0,t.rsaDecode=o,t.rsaEncode=u;var i=a(66),n=l(a(67)),r=a(68);function u(e){var t=!1;if(!0===r.APPConfig.RSA){t=!0;var a=JSON.stringify(e);a=i.Base64.encode(a),a=a.match(/.{1,50}/g);var l=r.APPConfig.publicKey,u=new n.default;u.setPublicKey(l),e=[],a.forEach((function(t){e.push(u.encrypt(t))}))}return{params:e,rsa:t}}function o(e){var t=new n.default,a=r.APPConfig.priKey;t.setPrivateKey(a);var l="";return console.log("data",e),e.params.forEach((function(e){l+=t.decrypt(e)})),l=i.Base64.decode(l),JSON.parse(l)}var s=function(t,a){e.showLoading({title:"加载中"});var l=null;return function(){var i=this,n=arguments;l&&clearTimeout(l),e.hideLoading(),l=setTimeout((function(){l=null,t.apply(i,n)}),a)}};t.debounce=s}).call(this,a(2)["default"])},66:function(module,exports,__webpack_require__){(function(global){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__,_typeof=__webpack_require__(13);(function(e,t){"object"===_typeof(exports)&&"undefined"!==typeof module?module.exports=t(e):(__WEBPACK_AMD_DEFINE_FACTORY__=t,__WEBPACK_AMD_DEFINE_RESULT__="function"===typeof __WEBPACK_AMD_DEFINE_FACTORY__?__WEBPACK_AMD_DEFINE_FACTORY__.call(exports,__webpack_require__,exports,module):__WEBPACK_AMD_DEFINE_FACTORY__,void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__))})("undefined"!==typeof self?self:"undefined"!==typeof window?window:"undefined"!==typeof global?global:this,(function(global){"use strict";var _Base64=global.Base64,version="2.4.9",buffer;if(module.exports)try{buffer=eval("require('buffer').Buffer")}catch(err){buffer=void 0}var b64chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",b64tab=function(e){for(var t={},a=0,l=e.length;a<l;a++)t[e.charAt(a)]=a;return t}(b64chars),fromCharCode=String.fromCharCode,cb_utob=function(e){if(e.length<2){var t=e.charCodeAt(0);return t<128?e:t<2048?fromCharCode(192|t>>>6)+fromCharCode(128|63&t):fromCharCode(224|t>>>12&15)+fromCharCode(128|t>>>6&63)+fromCharCode(128|63&t)}t=65536+1024*(e.charCodeAt(0)-55296)+(e.charCodeAt(1)-56320);return fromCharCode(240|t>>>18&7)+fromCharCode(128|t>>>12&63)+fromCharCode(128|t>>>6&63)+fromCharCode(128|63&t)},re_utob=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,utob=function(e){return e.replace(re_utob,cb_utob)},cb_encode=function(e){var t=[0,2,1][e.length%3],a=e.charCodeAt(0)<<16|(e.length>1?e.charCodeAt(1):0)<<8|(e.length>2?e.charCodeAt(2):0),l=[b64chars.charAt(a>>>18),b64chars.charAt(a>>>12&63),t>=2?"=":b64chars.charAt(a>>>6&63),t>=1?"=":b64chars.charAt(63&a)];return l.join("")},btoa=global.btoa?function(e){return global.btoa(e)}:function(e){return e.replace(/[\s\S]{1,3}/g,cb_encode)},_encode=buffer?buffer.from&&Uint8Array&&buffer.from!==Uint8Array.from?function(e){return(e.constructor===buffer.constructor?e:buffer.from(e)).toString("base64")}:function(e){return(e.constructor===buffer.constructor?e:new buffer(e)).toString("base64")}:function(e){return btoa(utob(e))},encode=function(e,t){return t?_encode(String(e)).replace(/[+\/]/g,(function(e){return"+"==e?"-":"_"})).replace(/=/g,""):_encode(String(e))},encodeURI=function(e){return encode(e,!0)},re_btou=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g"),cb_btou=function(e){switch(e.length){case 4:var t=(7&e.charCodeAt(0))<<18|(63&e.charCodeAt(1))<<12|(63&e.charCodeAt(2))<<6|63&e.charCodeAt(3),a=t-65536;return fromCharCode(55296+(a>>>10))+fromCharCode(56320+(1023&a));case 3:return fromCharCode((15&e.charCodeAt(0))<<12|(63&e.charCodeAt(1))<<6|63&e.charCodeAt(2));default:return fromCharCode((31&e.charCodeAt(0))<<6|63&e.charCodeAt(1))}},btou=function(e){return e.replace(re_btou,cb_btou)},cb_decode=function(e){var t=e.length,a=t%4,l=(t>0?b64tab[e.charAt(0)]<<18:0)|(t>1?b64tab[e.charAt(1)]<<12:0)|(t>2?b64tab[e.charAt(2)]<<6:0)|(t>3?b64tab[e.charAt(3)]:0),i=[fromCharCode(l>>>16),fromCharCode(l>>>8&255),fromCharCode(255&l)];return i.length-=[0,0,2,1][a],i.join("")},atob=global.atob?function(e){return global.atob(e)}:function(e){return e.replace(/[\s\S]{1,4}/g,cb_decode)},_decode=buffer?buffer.from&&Uint8Array&&buffer.from!==Uint8Array.from?function(e){return(e.constructor===buffer.constructor?e:buffer.from(e,"base64")).toString()}:function(e){return(e.constructor===buffer.constructor?e:new buffer(e,"base64")).toString()}:function(e){return btou(atob(e))},decode=function(e){return _decode(String(e).replace(/[-_]/g,(function(e){return"-"==e?"+":"/"})).replace(/[^A-Za-z0-9\+\/]/g,""))},noConflict=function(){var e=global.Base64;return global.Base64=_Base64,e};if(global.Base64={VERSION:version,atob:atob,btoa:btoa,fromBase64:decode,toBase64:encode,utob:utob,encode:encode,encodeURI:encodeURI,btou:btou,decode:decode,noConflict:noConflict,__buffer__:buffer},"function"===typeof Object.defineProperty){var noEnum=function(e){return{value:e,enumerable:!1,writable:!0,configurable:!0}};global.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",noEnum((function(){return decode(this)}))),Object.defineProperty(String.prototype,"toBase64",noEnum((function(e){return encode(this,e)}))),Object.defineProperty(String.prototype,"toBase64URI",noEnum((function(){return encode(this,!0)})))}}return global["Meteor"]&&(Base64=global.Base64),module.exports?module.exports.Base64=global.Base64:(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_RESULT__=function(){return global.Base64}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)),{Base64:global.Base64}}))}).call(this,__webpack_require__(3))},67:function(e,t,a){var l,i,n,r=a(13);(function(a,u){"object"===r(t)&&"undefined"!==typeof e?u(t):(i=[t],l=u,n="function"===typeof l?l.apply(t,i):l,void 0===n||(e.exports=n))})(0,(function(e){"use strict";var t="0123456789abcdefghijklmnopqrstuvwxyz";function a(e){return t.charAt(e)}function l(e,t){return e&t}function i(e,t){return e|t}function n(e,t){return e^t}function r(e,t){return e&~t}function u(e){if(0==e)return-1;var t=0;return 0==(65535&e)&&(e>>=16,t+=16),0==(255&e)&&(e>>=8,t+=8),0==(15&e)&&(e>>=4,t+=4),0==(3&e)&&(e>>=2,t+=2),0==(1&e)&&++t,t}function o(e){var t=0;while(0!=e)e&=e-1,++t;return t}var s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",d="=";function c(e){var t,a,l="";for(t=0;t+3<=e.length;t+=3)a=parseInt(e.substring(t,t+3),16),l+=s.charAt(a>>6)+s.charAt(63&a);t+1==e.length?(a=parseInt(e.substring(t,t+1),16),l+=s.charAt(a<<2)):t+2==e.length&&(a=parseInt(e.substring(t,t+2),16),l+=s.charAt(a>>2)+s.charAt((3&a)<<4));while((3&l.length)>0)l+=d;return l}function v(e){var t,l="",i=0,n=0;for(t=0;t<e.length;++t){if(e.charAt(t)==d)break;var r=s.indexOf(e.charAt(t));r<0||(0==i?(l+=a(r>>2),n=3&r,i=1):1==i?(l+=a(n<<2|r>>4),n=15&r,i=2):2==i?(l+=a(n),l+=a(r>>2),n=3&r,i=3):(l+=a(n<<2|r>>4),l+=a(15&r),i=0))}return 1==i&&(l+=a(n<<2)),l}var f,h=function(e,t){return h=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)t.hasOwnProperty(a)&&(e[a]=t[a])},h(e,t)};function b(e,t){function a(){this.constructor=e}h(e,t),e.prototype=null===t?Object.create(t):(a.prototype=t.prototype,new a)}var p,g={decode:function(e){var t;if(void 0===f){var a="0123456789ABCDEF",l=" \f\n\r\t \u2028\u2029";for(f={},t=0;t<16;++t)f[a.charAt(t)]=t;for(a=a.toLowerCase(),t=10;t<16;++t)f[a.charAt(t)]=t;for(t=0;t<l.length;++t)f[l.charAt(t)]=-1}var i=[],n=0,r=0;for(t=0;t<e.length;++t){var u=e.charAt(t);if("="==u)break;if(u=f[u],-1!=u){if(void 0===u)throw new Error("Illegal character at offset "+t);n|=u,++r>=2?(i[i.length]=n,n=0,r=0):n<<=4}}if(r)throw new Error("Hex encoding incomplete: 4 bits missing");return i}},y={decode:function(e){var t;if(void 0===p){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",l="= \f\n\r\t \u2028\u2029";for(p=Object.create(null),t=0;t<64;++t)p[a.charAt(t)]=t;for(t=0;t<l.length;++t)p[l.charAt(t)]=-1}var i=[],n=0,r=0;for(t=0;t<e.length;++t){var u=e.charAt(t);if("="==u)break;if(u=p[u],-1!=u){if(void 0===u)throw new Error("Illegal character at offset "+t);n|=u,++r>=4?(i[i.length]=n>>16,i[i.length]=n>>8&255,i[i.length]=255&n,n=0,r=0):n<<=6}}switch(r){case 1:throw new Error("Base64 encoding incomplete: at least 2 bits missing");case 2:i[i.length]=n>>10;break;case 3:i[i.length]=n>>16,i[i.length]=n>>8&255;break}return i},re:/-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,unarmor:function(e){var t=y.re.exec(e);if(t)if(t[1])e=t[1];else{if(!t[2])throw new Error("RegExp out of sync");e=t[2]}return y.decode(e)}},m=1e13,_=function(){function e(e){this.buf=[+e||0]}return e.prototype.mulAdd=function(e,t){var a,l,i=this.buf,n=i.length;for(a=0;a<n;++a)l=i[a]*e+t,l<m?t=0:(t=0|l/m,l-=t*m),i[a]=l;t>0&&(i[a]=t)},e.prototype.sub=function(e){var t,a,l=this.buf,i=l.length;for(t=0;t<i;++t)a=l[t]-e,a<0?(a+=m,e=1):e=0,l[t]=a;while(0===l[l.length-1])l.pop()},e.prototype.toString=function(e){if(10!=(e||10))throw new Error("only base 10 is supported");for(var t=this.buf,a=t[t.length-1].toString(),l=t.length-2;l>=0;--l)a+=(m+t[l]).toString().substring(1);return a},e.prototype.valueOf=function(){for(var e=this.buf,t=0,a=e.length-1;a>=0;--a)t=t*m+e[a];return t},e.prototype.simplify=function(){var e=this.buf;return 1==e.length?e[0]:this},e}(),w="…",A=/^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,x=/^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;function S(e,t){return e.length>t&&(e=e.substring(0,t)+w),e}var k,O=function(){function e(t,a){this.hexDigits="0123456789ABCDEF",t instanceof e?(this.enc=t.enc,this.pos=t.pos):(this.enc=t,this.pos=a)}return e.prototype.get=function(e){if(void 0===e&&(e=this.pos++),e>=this.enc.length)throw new Error("Requesting byte offset "+e+" on a stream of length "+this.enc.length);return"string"===typeof this.enc?this.enc.charCodeAt(e):this.enc[e]},e.prototype.hexByte=function(e){return this.hexDigits.charAt(e>>4&15)+this.hexDigits.charAt(15&e)},e.prototype.hexDump=function(e,t,a){for(var l="",i=e;i<t;++i)if(l+=this.hexByte(this.get(i)),!0!==a)switch(15&i){case 7:l+="  ";break;case 15:l+="\n";break;default:l+=" "}return l},e.prototype.isASCII=function(e,t){for(var a=e;a<t;++a){var l=this.get(a);if(l<32||l>176)return!1}return!0},e.prototype.parseStringISO=function(e,t){for(var a="",l=e;l<t;++l)a+=String.fromCharCode(this.get(l));return a},e.prototype.parseStringUTF=function(e,t){for(var a="",l=e;l<t;){var i=this.get(l++);a+=i<128?String.fromCharCode(i):i>191&&i<224?String.fromCharCode((31&i)<<6|63&this.get(l++)):String.fromCharCode((15&i)<<12|(63&this.get(l++))<<6|63&this.get(l++))}return a},e.prototype.parseStringBMP=function(e,t){for(var a,l,i="",n=e;n<t;)a=this.get(n++),l=this.get(n++),i+=String.fromCharCode(a<<8|l);return i},e.prototype.parseTime=function(e,t,a){var l=this.parseStringISO(e,t),i=(a?A:x).exec(l);return i?(a&&(i[1]=+i[1],i[1]+=+i[1]<70?2e3:1900),l=i[1]+"-"+i[2]+"-"+i[3]+" "+i[4],i[5]&&(l+=":"+i[5],i[6]&&(l+=":"+i[6],i[7]&&(l+="."+i[7]))),i[8]&&(l+=" UTC","Z"!=i[8]&&(l+=i[8],i[9]&&(l+=":"+i[9]))),l):"Unrecognized time: "+l},e.prototype.parseInteger=function(e,t){var a,l=this.get(e),i=l>127,n=i?255:0,r="";while(l==n&&++e<t)l=this.get(e);if(a=t-e,0===a)return i?-1:0;if(a>4){r=l,a<<=3;while(0==(128&(+r^n)))r=+r<<1,--a;r="("+a+" bit)\n"}i&&(l-=256);for(var u=new _(l),o=e+1;o<t;++o)u.mulAdd(256,this.get(o));return r+u.toString()},e.prototype.parseBitString=function(e,t,a){for(var l=this.get(e),i=(t-e-1<<3)-l,n="("+i+" bit)\n",r="",u=e+1;u<t;++u){for(var o=this.get(u),s=u==t-1?l:0,d=7;d>=s;--d)r+=o>>d&1?"1":"0";if(r.length>a)return n+S(r,a)}return n+r},e.prototype.parseOctetString=function(e,t,a){if(this.isASCII(e,t))return S(this.parseStringISO(e,t),a);var l=t-e,i="("+l+" byte)\n";a/=2,l>a&&(t=e+a);for(var n=e;n<t;++n)i+=this.hexByte(this.get(n));return l>a&&(i+=w),i},e.prototype.parseOID=function(e,t,a){for(var l="",i=new _,n=0,r=e;r<t;++r){var u=this.get(r);if(i.mulAdd(128,127&u),n+=7,!(128&u)){if(""===l)if(i=i.simplify(),i instanceof _)i.sub(80),l="2."+i.toString();else{var o=i<80?i<40?0:1:2;l=o+"."+(i-40*o)}else l+="."+i.toString();if(l.length>a)return S(l,a);i=new _,n=0}}return n>0&&(l+=".incomplete"),l},e}(),E=function(){function e(e,t,a,l,i){if(!(l instanceof T))throw new Error("Invalid tag value.");this.stream=e,this.header=t,this.length=a,this.tag=l,this.sub=i}return e.prototype.typeName=function(){switch(this.tag.tagClass){case 0:switch(this.tag.tagNumber){case 0:return"EOC";case 1:return"BOOLEAN";case 2:return"INTEGER";case 3:return"BIT_STRING";case 4:return"OCTET_STRING";case 5:return"NULL";case 6:return"OBJECT_IDENTIFIER";case 7:return"ObjectDescriptor";case 8:return"EXTERNAL";case 9:return"REAL";case 10:return"ENUMERATED";case 11:return"EMBEDDED_PDV";case 12:return"UTF8String";case 16:return"SEQUENCE";case 17:return"SET";case 18:return"NumericString";case 19:return"PrintableString";case 20:return"TeletexString";case 21:return"VideotexString";case 22:return"IA5String";case 23:return"UTCTime";case 24:return"GeneralizedTime";case 25:return"GraphicString";case 26:return"VisibleString";case 27:return"GeneralString";case 28:return"UniversalString";case 30:return"BMPString"}return"Universal_"+this.tag.tagNumber.toString();case 1:return"Application_"+this.tag.tagNumber.toString();case 2:return"["+this.tag.tagNumber.toString()+"]";case 3:return"Private_"+this.tag.tagNumber.toString()}},e.prototype.content=function(e){if(void 0===this.tag)return null;void 0===e&&(e=1/0);var t=this.posContent(),a=Math.abs(this.length);if(!this.tag.isUniversal())return null!==this.sub?"("+this.sub.length+" elem)":this.stream.parseOctetString(t,t+a,e);switch(this.tag.tagNumber){case 1:return 0===this.stream.get(t)?"false":"true";case 2:return this.stream.parseInteger(t,t+a);case 3:return this.sub?"("+this.sub.length+" elem)":this.stream.parseBitString(t,t+a,e);case 4:return this.sub?"("+this.sub.length+" elem)":this.stream.parseOctetString(t,t+a,e);case 6:return this.stream.parseOID(t,t+a,e);case 16:case 17:return null!==this.sub?"("+this.sub.length+" elem)":"(no elem)";case 12:return S(this.stream.parseStringUTF(t,t+a),e);case 18:case 19:case 20:case 21:case 22:case 26:return S(this.stream.parseStringISO(t,t+a),e);case 30:return S(this.stream.parseStringBMP(t,t+a),e);case 23:case 24:return this.stream.parseTime(t,t+a,23==this.tag.tagNumber)}return null},e.prototype.toString=function(){return this.typeName()+"@"+this.stream.pos+"[header:"+this.header+",length:"+this.length+",sub:"+(null===this.sub?"null":this.sub.length)+"]"},e.prototype.toPrettyString=function(e){void 0===e&&(e="");var t=e+this.typeName()+" @"+this.stream.pos;if(this.length>=0&&(t+="+"),t+=this.length,this.tag.tagConstructed?t+=" (constructed)":!this.tag.isUniversal()||3!=this.tag.tagNumber&&4!=this.tag.tagNumber||null===this.sub||(t+=" (encapsulates)"),t+="\n",null!==this.sub){e+="  ";for(var a=0,l=this.sub.length;a<l;++a)t+=this.sub[a].toPrettyString(e)}return t},e.prototype.posStart=function(){return this.stream.pos},e.prototype.posContent=function(){return this.stream.pos+this.header},e.prototype.posEnd=function(){return this.stream.pos+this.header+Math.abs(this.length)},e.prototype.toHexString=function(){return this.stream.hexDump(this.posStart(),this.posEnd(),!0)},e.decodeLength=function(e){var t=e.get(),a=127&t;if(a==t)return a;if(a>6)throw new Error("Length over 48 bits not supported at position "+(e.pos-1));if(0===a)return null;t=0;for(var l=0;l<a;++l)t=256*t+e.get();return t},e.prototype.getHexStringValue=function(){var e=this.toHexString(),t=2*this.header,a=2*this.length;return e.substr(t,a)},e.decode=function(t){var a;a=t instanceof O?t:new O(t,0);var l=new O(a),i=new T(a),n=e.decodeLength(a),r=a.pos,u=r-l.pos,o=null,s=function(){var t=[];if(null!==n){var l=r+n;while(a.pos<l)t[t.length]=e.decode(a);if(a.pos!=l)throw new Error("Content size is not correct for container starting at offset "+r)}else try{for(;;){var i=e.decode(a);if(i.tag.isEOC())break;t[t.length]=i}n=r-a.pos}catch(u){throw new Error("Exception while decoding undefined length content: "+u)}return t};if(i.tagConstructed)o=s();else if(i.isUniversal()&&(3==i.tagNumber||4==i.tagNumber))try{if(3==i.tagNumber&&0!=a.get())throw new Error("BIT STRINGs with unused bits cannot encapsulate.");o=s();for(var d=0;d<o.length;++d)if(o[d].tag.isEOC())throw new Error("EOC is not supposed to be actual content.")}catch(c){o=null}if(null===o){if(null===n)throw new Error("We can't skip over an invalid tag with undefined length at offset "+r);a.pos=r+Math.abs(n)}return new e(l,u,n,i,o)},e}(),T=function(){function e(e){var t=e.get();if(this.tagClass=t>>6,this.tagConstructed=0!==(32&t),this.tagNumber=31&t,31==this.tagNumber){var a=new _;do{t=e.get(),a.mulAdd(128,127&t)}while(128&t);this.tagNumber=a.simplify()}}return e.prototype.isUniversal=function(){return 0===this.tagClass},e.prototype.isEOC=function(){return 0===this.tagClass&&0===this.tagNumber},e}(),C=0xdeadbeefcafe,I=15715070==(16777215&C),P=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997],D=(1<<26)/P[P.length-1],R=function(){function e(e,t,a){null!=e&&("number"==typeof e?this.fromNumber(e,t,a):null==t&&"string"!=typeof e?this.fromString(e,256):this.fromString(e,t))}return e.prototype.toString=function(e){if(this.s<0)return"-"+this.negate().toString(e);var t;if(16==e)t=4;else if(8==e)t=3;else if(2==e)t=1;else if(32==e)t=5;else{if(4!=e)return this.toRadix(e);t=2}var l,i=(1<<t)-1,n=!1,r="",u=this.t,o=this.DB-u*this.DB%t;if(u-- >0){o<this.DB&&(l=this[u]>>o)>0&&(n=!0,r=a(l));while(u>=0)o<t?(l=(this[u]&(1<<o)-1)<<t-o,l|=this[--u]>>(o+=this.DB-t)):(l=this[u]>>(o-=t)&i,o<=0&&(o+=this.DB,--u)),l>0&&(n=!0),n&&(r+=a(l))}return n?r:"0"},e.prototype.negate=function(){var t=U();return e.ZERO.subTo(this,t),t},e.prototype.abs=function(){return this.s<0?this.negate():this},e.prototype.compareTo=function(e){var t=this.s-e.s;if(0!=t)return t;var a=this.t;if(t=a-e.t,0!=t)return this.s<0?-t:t;while(--a>=0)if(0!=(t=this[a]-e[a]))return t;return 0},e.prototype.bitLength=function(){return this.t<=0?0:this.DB*(this.t-1)+J(this[this.t-1]^this.s&this.DM)},e.prototype.mod=function(t){var a=U();return this.abs().divRemTo(t,null,a),this.s<0&&a.compareTo(e.ZERO)>0&&t.subTo(a,a),a},e.prototype.modPowInt=function(e,t){var a;return a=e<256||t.isEven()?new j(t):new N(t),this.exp(e,a)},e.prototype.clone=function(){var e=U();return this.copyTo(e),e},e.prototype.intValue=function(){if(this.s<0){if(1==this.t)return this[0]-this.DV;if(0==this.t)return-1}else{if(1==this.t)return this[0];if(0==this.t)return 0}return(this[1]&(1<<32-this.DB)-1)<<this.DB|this[0]},e.prototype.byteValue=function(){return 0==this.t?this.s:this[0]<<24>>24},e.prototype.shortValue=function(){return 0==this.t?this.s:this[0]<<16>>16},e.prototype.signum=function(){return this.s<0?-1:this.t<=0||1==this.t&&this[0]<=0?0:1},e.prototype.toByteArray=function(){var e=this.t,t=[];t[0]=this.s;var a,l=this.DB-e*this.DB%8,i=0;if(e-- >0){l<this.DB&&(a=this[e]>>l)!=(this.s&this.DM)>>l&&(t[i++]=a|this.s<<this.DB-l);while(e>=0)l<8?(a=(this[e]&(1<<l)-1)<<8-l,a|=this[--e]>>(l+=this.DB-8)):(a=this[e]>>(l-=8)&255,l<=0&&(l+=this.DB,--e)),0!=(128&a)&&(a|=-256),0==i&&(128&this.s)!=(128&a)&&++i,(i>0||a!=this.s)&&(t[i++]=a)}return t},e.prototype.equals=function(e){return 0==this.compareTo(e)},e.prototype.min=function(e){return this.compareTo(e)<0?this:e},e.prototype.max=function(e){return this.compareTo(e)>0?this:e},e.prototype.and=function(e){var t=U();return this.bitwiseTo(e,l,t),t},e.prototype.or=function(e){var t=U();return this.bitwiseTo(e,i,t),t},e.prototype.xor=function(e){var t=U();return this.bitwiseTo(e,n,t),t},e.prototype.andNot=function(e){var t=U();return this.bitwiseTo(e,r,t),t},e.prototype.not=function(){for(var e=U(),t=0;t<this.t;++t)e[t]=this.DM&~this[t];return e.t=this.t,e.s=~this.s,e},e.prototype.shiftLeft=function(e){var t=U();return e<0?this.rShiftTo(-e,t):this.lShiftTo(e,t),t},e.prototype.shiftRight=function(e){var t=U();return e<0?this.lShiftTo(-e,t):this.rShiftTo(e,t),t},e.prototype.getLowestSetBit=function(){for(var e=0;e<this.t;++e)if(0!=this[e])return e*this.DB+u(this[e]);return this.s<0?this.t*this.DB:-1},e.prototype.bitCount=function(){for(var e=0,t=this.s&this.DM,a=0;a<this.t;++a)e+=o(this[a]^t);return e},e.prototype.testBit=function(e){var t=Math.floor(e/this.DB);return t>=this.t?0!=this.s:0!=(this[t]&1<<e%this.DB)},e.prototype.setBit=function(e){return this.changeBit(e,i)},e.prototype.clearBit=function(e){return this.changeBit(e,r)},e.prototype.flipBit=function(e){return this.changeBit(e,n)},e.prototype.add=function(e){var t=U();return this.addTo(e,t),t},e.prototype.subtract=function(e){var t=U();return this.subTo(e,t),t},e.prototype.multiply=function(e){var t=U();return this.multiplyTo(e,t),t},e.prototype.divide=function(e){var t=U();return this.divRemTo(e,t,null),t},e.prototype.remainder=function(e){var t=U();return this.divRemTo(e,null,t),t},e.prototype.divideAndRemainder=function(e){var t=U(),a=U();return this.divRemTo(e,t,a),[t,a]},e.prototype.modPow=function(e,t){var a,l,i=e.bitLength(),n=z(1);if(i<=0)return n;a=i<18?1:i<48?3:i<144?4:i<768?5:6,l=i<8?new j(t):t.isEven()?new M(t):new N(t);var r=[],u=3,o=a-1,s=(1<<a)-1;if(r[1]=l.convert(this),a>1){var d=U();l.sqrTo(r[1],d);while(u<=s)r[u]=U(),l.mulTo(d,r[u-2],r[u]),u+=2}var c,v,f=e.t-1,h=!0,b=U();i=J(e[f])-1;while(f>=0){i>=o?c=e[f]>>i-o&s:(c=(e[f]&(1<<i+1)-1)<<o-i,f>0&&(c|=e[f-1]>>this.DB+i-o)),u=a;while(0==(1&c))c>>=1,--u;if((i-=u)<0&&(i+=this.DB,--f),h)r[c].copyTo(n),h=!1;else{while(u>1)l.sqrTo(n,b),l.sqrTo(b,n),u-=2;u>0?l.sqrTo(n,b):(v=n,n=b,b=v),l.mulTo(b,r[c],n)}while(f>=0&&0==(e[f]&1<<i))l.sqrTo(n,b),v=n,n=b,b=v,--i<0&&(i=this.DB-1,--f)}return l.revert(n)},e.prototype.modInverse=function(t){var a=t.isEven();if(this.isEven()&&a||0==t.signum())return e.ZERO;var l=t.clone(),i=this.clone(),n=z(1),r=z(0),u=z(0),o=z(1);while(0!=l.signum()){while(l.isEven())l.rShiftTo(1,l),a?(n.isEven()&&r.isEven()||(n.addTo(this,n),r.subTo(t,r)),n.rShiftTo(1,n)):r.isEven()||r.subTo(t,r),r.rShiftTo(1,r);while(i.isEven())i.rShiftTo(1,i),a?(u.isEven()&&o.isEven()||(u.addTo(this,u),o.subTo(t,o)),u.rShiftTo(1,u)):o.isEven()||o.subTo(t,o),o.rShiftTo(1,o);l.compareTo(i)>=0?(l.subTo(i,l),a&&n.subTo(u,n),r.subTo(o,r)):(i.subTo(l,i),a&&u.subTo(n,u),o.subTo(r,o))}return 0!=i.compareTo(e.ONE)?e.ZERO:o.compareTo(t)>=0?o.subtract(t):o.signum()<0?(o.addTo(t,o),o.signum()<0?o.add(t):o):o},e.prototype.pow=function(e){return this.exp(e,new L)},e.prototype.gcd=function(e){var t=this.s<0?this.negate():this.clone(),a=e.s<0?e.negate():e.clone();if(t.compareTo(a)<0){var l=t;t=a,a=l}var i=t.getLowestSetBit(),n=a.getLowestSetBit();if(n<0)return t;i<n&&(n=i),n>0&&(t.rShiftTo(n,t),a.rShiftTo(n,a));while(t.signum()>0)(i=t.getLowestSetBit())>0&&t.rShiftTo(i,t),(i=a.getLowestSetBit())>0&&a.rShiftTo(i,a),t.compareTo(a)>=0?(t.subTo(a,t),t.rShiftTo(1,t)):(a.subTo(t,a),a.rShiftTo(1,a));return n>0&&a.lShiftTo(n,a),a},e.prototype.isProbablePrime=function(e){var t,a=this.abs();if(1==a.t&&a[0]<=P[P.length-1]){for(t=0;t<P.length;++t)if(a[0]==P[t])return!0;return!1}if(a.isEven())return!1;t=1;while(t<P.length){var l=P[t],i=t+1;while(i<P.length&&l<D)l*=P[i++];l=a.modInt(l);while(t<i)if(l%P[t++]==0)return!1}return a.millerRabin(e)},e.prototype.copyTo=function(e){for(var t=this.t-1;t>=0;--t)e[t]=this[t];e.t=this.t,e.s=this.s},e.prototype.fromInt=function(e){this.t=1,this.s=e<0?-1:0,e>0?this[0]=e:e<-1?this[0]=e+this.DV:this.t=0},e.prototype.fromString=function(t,a){var l;if(16==a)l=4;else if(8==a)l=3;else if(256==a)l=8;else if(2==a)l=1;else if(32==a)l=5;else{if(4!=a)return void this.fromRadix(t,a);l=2}this.t=0,this.s=0;var i=t.length,n=!1,r=0;while(--i>=0){var u=8==l?255&+t[i]:W(t,i);u<0?"-"==t.charAt(i)&&(n=!0):(n=!1,0==r?this[this.t++]=u:r+l>this.DB?(this[this.t-1]|=(u&(1<<this.DB-r)-1)<<r,this[this.t++]=u>>this.DB-r):this[this.t-1]|=u<<r,r+=l,r>=this.DB&&(r-=this.DB))}8==l&&0!=(128&+t[0])&&(this.s=-1,r>0&&(this[this.t-1]|=(1<<this.DB-r)-1<<r)),this.clamp(),n&&e.ZERO.subTo(this,this)},e.prototype.clamp=function(){var e=this.s&this.DM;while(this.t>0&&this[this.t-1]==e)--this.t},e.prototype.dlShiftTo=function(e,t){var a;for(a=this.t-1;a>=0;--a)t[a+e]=this[a];for(a=e-1;a>=0;--a)t[a]=0;t.t=this.t+e,t.s=this.s},e.prototype.drShiftTo=function(e,t){for(var a=e;a<this.t;++a)t[a-e]=this[a];t.t=Math.max(this.t-e,0),t.s=this.s},e.prototype.lShiftTo=function(e,t){for(var a=e%this.DB,l=this.DB-a,i=(1<<l)-1,n=Math.floor(e/this.DB),r=this.s<<a&this.DM,u=this.t-1;u>=0;--u)t[u+n+1]=this[u]>>l|r,r=(this[u]&i)<<a;for(u=n-1;u>=0;--u)t[u]=0;t[n]=r,t.t=this.t+n+1,t.s=this.s,t.clamp()},e.prototype.rShiftTo=function(e,t){t.s=this.s;var a=Math.floor(e/this.DB);if(a>=this.t)t.t=0;else{var l=e%this.DB,i=this.DB-l,n=(1<<l)-1;t[0]=this[a]>>l;for(var r=a+1;r<this.t;++r)t[r-a-1]|=(this[r]&n)<<i,t[r-a]=this[r]>>l;l>0&&(t[this.t-a-1]|=(this.s&n)<<i),t.t=this.t-a,t.clamp()}},e.prototype.subTo=function(e,t){var a=0,l=0,i=Math.min(e.t,this.t);while(a<i)l+=this[a]-e[a],t[a++]=l&this.DM,l>>=this.DB;if(e.t<this.t){l-=e.s;while(a<this.t)l+=this[a],t[a++]=l&this.DM,l>>=this.DB;l+=this.s}else{l+=this.s;while(a<e.t)l-=e[a],t[a++]=l&this.DM,l>>=this.DB;l-=e.s}t.s=l<0?-1:0,l<-1?t[a++]=this.DV+l:l>0&&(t[a++]=l),t.t=a,t.clamp()},e.prototype.multiplyTo=function(t,a){var l=this.abs(),i=t.abs(),n=l.t;a.t=n+i.t;while(--n>=0)a[n]=0;for(n=0;n<i.t;++n)a[n+l.t]=l.am(0,i[n],a,n,0,l.t);a.s=0,a.clamp(),this.s!=t.s&&e.ZERO.subTo(a,a)},e.prototype.squareTo=function(e){var t=this.abs(),a=e.t=2*t.t;while(--a>=0)e[a]=0;for(a=0;a<t.t-1;++a){var l=t.am(a,t[a],e,2*a,0,1);(e[a+t.t]+=t.am(a+1,2*t[a],e,2*a+1,l,t.t-a-1))>=t.DV&&(e[a+t.t]-=t.DV,e[a+t.t+1]=1)}e.t>0&&(e[e.t-1]+=t.am(a,t[a],e,2*a,0,1)),e.s=0,e.clamp()},e.prototype.divRemTo=function(t,a,l){var i=t.abs();if(!(i.t<=0)){var n=this.abs();if(n.t<i.t)return null!=a&&a.fromInt(0),void(null!=l&&this.copyTo(l));null==l&&(l=U());var r=U(),u=this.s,o=t.s,s=this.DB-J(i[i.t-1]);s>0?(i.lShiftTo(s,r),n.lShiftTo(s,l)):(i.copyTo(r),n.copyTo(l));var d=r.t,c=r[d-1];if(0!=c){var v=c*(1<<this.F1)+(d>1?r[d-2]>>this.F2:0),f=this.FV/v,h=(1<<this.F1)/v,b=1<<this.F2,p=l.t,g=p-d,y=null==a?U():a;r.dlShiftTo(g,y),l.compareTo(y)>=0&&(l[l.t++]=1,l.subTo(y,l)),e.ONE.dlShiftTo(d,y),y.subTo(r,r);while(r.t<d)r[r.t++]=0;while(--g>=0){var m=l[--p]==c?this.DM:Math.floor(l[p]*f+(l[p-1]+b)*h);if((l[p]+=r.am(0,m,l,g,0,d))<m){r.dlShiftTo(g,y),l.subTo(y,l);while(l[p]<--m)l.subTo(y,l)}}null!=a&&(l.drShiftTo(d,a),u!=o&&e.ZERO.subTo(a,a)),l.t=d,l.clamp(),s>0&&l.rShiftTo(s,l),u<0&&e.ZERO.subTo(l,l)}}},e.prototype.invDigit=function(){if(this.t<1)return 0;var e=this[0];if(0==(1&e))return 0;var t=3&e;return t=t*(2-(15&e)*t)&15,t=t*(2-(255&e)*t)&255,t=t*(2-((65535&e)*t&65535))&65535,t=t*(2-e*t%this.DV)%this.DV,t>0?this.DV-t:-t},e.prototype.isEven=function(){return 0==(this.t>0?1&this[0]:this.s)},e.prototype.exp=function(t,a){if(t>4294967295||t<1)return e.ONE;var l=U(),i=U(),n=a.convert(this),r=J(t)-1;n.copyTo(l);while(--r>=0)if(a.sqrTo(l,i),(t&1<<r)>0)a.mulTo(i,n,l);else{var u=l;l=i,i=u}return a.revert(l)},e.prototype.chunkSize=function(e){return Math.floor(Math.LN2*this.DB/Math.log(e))},e.prototype.toRadix=function(e){if(null==e&&(e=10),0==this.signum()||e<2||e>36)return"0";var t=this.chunkSize(e),a=Math.pow(e,t),l=z(a),i=U(),n=U(),r="";this.divRemTo(l,i,n);while(i.signum()>0)r=(a+n.intValue()).toString(e).substr(1)+r,i.divRemTo(l,i,n);return n.intValue().toString(e)+r},e.prototype.fromRadix=function(t,a){this.fromInt(0),null==a&&(a=10);for(var l=this.chunkSize(a),i=Math.pow(a,l),n=!1,r=0,u=0,o=0;o<t.length;++o){var s=W(t,o);s<0?"-"==t.charAt(o)&&0==this.signum()&&(n=!0):(u=a*u+s,++r>=l&&(this.dMultiply(i),this.dAddOffset(u,0),r=0,u=0))}r>0&&(this.dMultiply(Math.pow(a,r)),this.dAddOffset(u,0)),n&&e.ZERO.subTo(this,this)},e.prototype.fromNumber=function(t,a,l){if("number"==typeof a)if(t<2)this.fromInt(1);else{this.fromNumber(t,l),this.testBit(t-1)||this.bitwiseTo(e.ONE.shiftLeft(t-1),i,this),this.isEven()&&this.dAddOffset(1,0);while(!this.isProbablePrime(a))this.dAddOffset(2,0),this.bitLength()>t&&this.subTo(e.ONE.shiftLeft(t-1),this)}else{var n=[],r=7&t;n.length=1+(t>>3),a.nextBytes(n),r>0?n[0]&=(1<<r)-1:n[0]=0,this.fromString(n,256)}},e.prototype.bitwiseTo=function(e,t,a){var l,i,n=Math.min(e.t,this.t);for(l=0;l<n;++l)a[l]=t(this[l],e[l]);if(e.t<this.t){for(i=e.s&this.DM,l=n;l<this.t;++l)a[l]=t(this[l],i);a.t=this.t}else{for(i=this.s&this.DM,l=n;l<e.t;++l)a[l]=t(i,e[l]);a.t=e.t}a.s=t(this.s,e.s),a.clamp()},e.prototype.changeBit=function(t,a){var l=e.ONE.shiftLeft(t);return this.bitwiseTo(l,a,l),l},e.prototype.addTo=function(e,t){var a=0,l=0,i=Math.min(e.t,this.t);while(a<i)l+=this[a]+e[a],t[a++]=l&this.DM,l>>=this.DB;if(e.t<this.t){l+=e.s;while(a<this.t)l+=this[a],t[a++]=l&this.DM,l>>=this.DB;l+=this.s}else{l+=this.s;while(a<e.t)l+=e[a],t[a++]=l&this.DM,l>>=this.DB;l+=e.s}t.s=l<0?-1:0,l>0?t[a++]=l:l<-1&&(t[a++]=this.DV+l),t.t=a,t.clamp()},e.prototype.dMultiply=function(e){this[this.t]=this.am(0,e-1,this,0,0,this.t),++this.t,this.clamp()},e.prototype.dAddOffset=function(e,t){if(0!=e){while(this.t<=t)this[this.t++]=0;this[t]+=e;while(this[t]>=this.DV)this[t]-=this.DV,++t>=this.t&&(this[this.t++]=0),++this[t]}},e.prototype.multiplyLowerTo=function(e,t,a){var l=Math.min(this.t+e.t,t);a.s=0,a.t=l;while(l>0)a[--l]=0;for(var i=a.t-this.t;l<i;++l)a[l+this.t]=this.am(0,e[l],a,l,0,this.t);for(i=Math.min(e.t,t);l<i;++l)this.am(0,e[l],a,l,0,t-l);a.clamp()},e.prototype.multiplyUpperTo=function(e,t,a){--t;var l=a.t=this.t+e.t-t;a.s=0;while(--l>=0)a[l]=0;for(l=Math.max(t-this.t,0);l<e.t;++l)a[this.t+l-t]=this.am(t-l,e[l],a,0,0,this.t+l-t);a.clamp(),a.drShiftTo(1,a)},e.prototype.modInt=function(e){if(e<=0)return 0;var t=this.DV%e,a=this.s<0?e-1:0;if(this.t>0)if(0==t)a=this[0]%e;else for(var l=this.t-1;l>=0;--l)a=(t*a+this[l])%e;return a},e.prototype.millerRabin=function(t){var a=this.subtract(e.ONE),l=a.getLowestSetBit();if(l<=0)return!1;var i=a.shiftRight(l);t=t+1>>1,t>P.length&&(t=P.length);for(var n=U(),r=0;r<t;++r){n.fromInt(P[Math.floor(Math.random()*P.length)]);var u=n.modPow(i,this);if(0!=u.compareTo(e.ONE)&&0!=u.compareTo(a)){var o=1;while(o++<l&&0!=u.compareTo(a))if(u=u.modPowInt(2,this),0==u.compareTo(e.ONE))return!1;if(0!=u.compareTo(a))return!1}}return!0},e.prototype.square=function(){var e=U();return this.squareTo(e),e},e.prototype.gcda=function(e,t){var a=this.s<0?this.negate():this.clone(),l=e.s<0?e.negate():e.clone();if(a.compareTo(l)<0){var i=a;a=l,l=i}var n=a.getLowestSetBit(),r=l.getLowestSetBit();if(r<0)t(a);else{n<r&&(r=n),r>0&&(a.rShiftTo(r,a),l.rShiftTo(r,l));var u=function e(){(n=a.getLowestSetBit())>0&&a.rShiftTo(n,a),(n=l.getLowestSetBit())>0&&l.rShiftTo(n,l),a.compareTo(l)>=0?(a.subTo(l,a),a.rShiftTo(1,a)):(l.subTo(a,l),l.rShiftTo(1,l)),a.signum()>0?setTimeout(e,0):(r>0&&l.lShiftTo(r,l),setTimeout((function(){t(l)}),0))};setTimeout(u,10)}},e.prototype.fromNumberAsync=function(t,a,l,n){if("number"==typeof a)if(t<2)this.fromInt(1);else{this.fromNumber(t,l),this.testBit(t-1)||this.bitwiseTo(e.ONE.shiftLeft(t-1),i,this),this.isEven()&&this.dAddOffset(1,0);var r=this,u=function l(){r.dAddOffset(2,0),r.bitLength()>t&&r.subTo(e.ONE.shiftLeft(t-1),r),r.isProbablePrime(a)?setTimeout((function(){n()}),0):setTimeout(l,0)};setTimeout(u,0)}else{var o=[],s=7&t;o.length=1+(t>>3),a.nextBytes(o),s>0?o[0]&=(1<<s)-1:o[0]=0,this.fromString(o,256)}},e}(),L=function(){function e(){}return e.prototype.convert=function(e){return e},e.prototype.revert=function(e){return e},e.prototype.mulTo=function(e,t,a){e.multiplyTo(t,a)},e.prototype.sqrTo=function(e,t){e.squareTo(t)},e}(),j=function(){function e(e){this.m=e}return e.prototype.convert=function(e){return e.s<0||e.compareTo(this.m)>=0?e.mod(this.m):e},e.prototype.revert=function(e){return e},e.prototype.reduce=function(e){e.divRemTo(this.m,null,e)},e.prototype.mulTo=function(e,t,a){e.multiplyTo(t,a),this.reduce(a)},e.prototype.sqrTo=function(e,t){e.squareTo(t),this.reduce(t)},e}(),N=function(){function e(e){this.m=e,this.mp=e.invDigit(),this.mpl=32767&this.mp,this.mph=this.mp>>15,this.um=(1<<e.DB-15)-1,this.mt2=2*e.t}return e.prototype.convert=function(e){var t=U();return e.abs().dlShiftTo(this.m.t,t),t.divRemTo(this.m,null,t),e.s<0&&t.compareTo(R.ZERO)>0&&this.m.subTo(t,t),t},e.prototype.revert=function(e){var t=U();return e.copyTo(t),this.reduce(t),t},e.prototype.reduce=function(e){while(e.t<=this.mt2)e[e.t++]=0;for(var t=0;t<this.m.t;++t){var a=32767&e[t],l=a*this.mpl+((a*this.mph+(e[t]>>15)*this.mpl&this.um)<<15)&e.DM;a=t+this.m.t,e[a]+=this.m.am(0,l,e,t,0,this.m.t);while(e[a]>=e.DV)e[a]-=e.DV,e[++a]++}e.clamp(),e.drShiftTo(this.m.t,e),e.compareTo(this.m)>=0&&e.subTo(this.m,e)},e.prototype.mulTo=function(e,t,a){e.multiplyTo(t,a),this.reduce(a)},e.prototype.sqrTo=function(e,t){e.squareTo(t),this.reduce(t)},e}(),M=function(){function e(e){this.m=e,this.r2=U(),this.q3=U(),R.ONE.dlShiftTo(2*e.t,this.r2),this.mu=this.r2.divide(e)}return e.prototype.convert=function(e){if(e.s<0||e.t>2*this.m.t)return e.mod(this.m);if(e.compareTo(this.m)<0)return e;var t=U();return e.copyTo(t),this.reduce(t),t},e.prototype.revert=function(e){return e},e.prototype.reduce=function(e){e.drShiftTo(this.m.t-1,this.r2),e.t>this.m.t+1&&(e.t=this.m.t+1,e.clamp()),this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3),this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);while(e.compareTo(this.r2)<0)e.dAddOffset(1,this.m.t+1);e.subTo(this.r2,e);while(e.compareTo(this.m)>=0)e.subTo(this.m,e)},e.prototype.mulTo=function(e,t,a){e.multiplyTo(t,a),this.reduce(a)},e.prototype.sqrTo=function(e,t){e.squareTo(t),this.reduce(t)},e}();function U(){return new R(null)}function B(e,t){return new R(e,t)}function F(e,t,a,l,i,n){while(--n>=0){var r=t*this[e++]+a[l]+i;i=Math.floor(r/67108864),a[l++]=67108863&r}return i}function V(e,t,a,l,i,n){var r=32767&t,u=t>>15;while(--n>=0){var o=32767&this[e],s=this[e++]>>15,d=u*o+s*r;o=r*o+((32767&d)<<15)+a[l]+(1073741823&i),i=(o>>>30)+(d>>>15)+u*s+(i>>>30),a[l++]=1073741823&o}return i}function $(e,t,a,l,i,n){var r=16383&t,u=t>>14;while(--n>=0){var o=16383&this[e],s=this[e++]>>14,d=u*o+s*r;o=r*o+((16383&d)<<14)+a[l]+i,i=(o>>28)+(d>>14)+u*s,a[l++]=268435455&o}return i}I&&navigator&&"Microsoft Internet Explorer"==navigator.appName?(R.prototype.am=V,k=30):I&&navigator&&"Netscape"!=navigator.appName?(R.prototype.am=F,k=26):(R.prototype.am=$,k=28),R.prototype.DB=k,R.prototype.DM=(1<<k)-1,R.prototype.DV=1<<k;var K=52;R.prototype.FV=Math.pow(2,K),R.prototype.F1=K-k,R.prototype.F2=2*k-K;var q,H,G=[];for(q="0".charCodeAt(0),H=0;H<=9;++H)G[q++]=H;for(q="a".charCodeAt(0),H=10;H<36;++H)G[q++]=H;for(q="A".charCodeAt(0),H=10;H<36;++H)G[q++]=H;function W(e,t){var a=G[e.charCodeAt(t)];return null==a?-1:a}function z(e){var t=U();return t.fromInt(e),t}function J(e){var t,a=1;return 0!=(t=e>>>16)&&(e=t,a+=16),0!=(t=e>>8)&&(e=t,a+=8),0!=(t=e>>4)&&(e=t,a+=4),0!=(t=e>>2)&&(e=t,a+=2),0!=(t=e>>1)&&(e=t,a+=1),a}R.ZERO=z(0),R.ONE=z(1);var Z=function(){function e(){this.i=0,this.j=0,this.S=[]}return e.prototype.init=function(e){var t,a,l;for(t=0;t<256;++t)this.S[t]=t;for(a=0,t=0;t<256;++t)a=a+this.S[t]+e[t%e.length]&255,l=this.S[t],this.S[t]=this.S[a],this.S[a]=l;this.i=0,this.j=0},e.prototype.next=function(){var e;return this.i=this.i+1&255,this.j=this.j+this.S[this.i]&255,e=this.S[this.i],this.S[this.i]=this.S[this.j],this.S[this.j]=e,this.S[e+this.S[this.i]&255]},e}();function Y(){return new Z}var Q,X,ee=256,te=null;if(null==te){te=[],X=0;var ae=void 0;if(window&&window.crypto&&window.crypto.getRandomValues){var le=new Uint32Array(256);for(window.crypto.getRandomValues(le),ae=0;ae<le.length;++ae)te[X++]=255&le[ae]}var ie=function e(t){if(this.count=this.count||0,this.count>=256||X>=ee)window.removeEventListener?window.removeEventListener("mousemove",e,!1):window.detachEvent&&window.detachEvent("onmousemove",e);else try{var a=t.x+t.y;te[X++]=255&a,this.count+=1}catch(l){}};window&&window.addEventListener?window.addEventListener("mousemove",ie,!1):window&&window.attachEvent&&window.attachEvent("onmousemove",ie)}function ne(){if(null==Q){Q=Y();while(X<ee){var e=Math.floor(65536*Math.random());te[X++]=255&e}for(Q.init(te),X=0;X<te.length;++X)te[X]=0;X=0}return Q.next()}var re=function(){function e(){}return e.prototype.nextBytes=function(e){for(var t=0;t<e.length;++t)e[t]=ne()},e}();function ue(e,t){if(t<e.length+22)return console.error("Message too long for RSA"),null;for(var a=t-e.length-6,l="",i=0;i<a;i+=2)l+="ff";var n="0001"+l+"00"+e;return B(n,16)}function oe(e,t){if(t<e.length+11)return console.error("Message too long for RSA"),null;var a=[],l=e.length-1;while(l>=0&&t>0){var i=e.charCodeAt(l--);i<128?a[--t]=i:i>127&&i<2048?(a[--t]=63&i|128,a[--t]=i>>6|192):(a[--t]=63&i|128,a[--t]=i>>6&63|128,a[--t]=i>>12|224)}a[--t]=0;var n=new re,r=[];while(t>2){r[0]=0;while(0==r[0])n.nextBytes(r);a[--t]=r[0]}return a[--t]=2,a[--t]=0,new R(a)}var se=function(){function e(){this.n=null,this.e=0,this.d=null,this.p=null,this.q=null,this.dmp1=null,this.dmq1=null,this.coeff=null}return e.prototype.doPublic=function(e){return e.modPowInt(this.e,this.n)},e.prototype.doPrivate=function(e){if(null==this.p||null==this.q)return e.modPow(this.d,this.n);var t=e.mod(this.p).modPow(this.dmp1,this.p),a=e.mod(this.q).modPow(this.dmq1,this.q);while(t.compareTo(a)<0)t=t.add(this.p);return t.subtract(a).multiply(this.coeff).mod(this.p).multiply(this.q).add(a)},e.prototype.setPublic=function(e,t){null!=e&&null!=t&&e.length>0&&t.length>0?(this.n=B(e,16),this.e=parseInt(t,16)):console.error("Invalid RSA public key")},e.prototype.encrypt=function(e){var t=oe(e,this.n.bitLength()+7>>3);if(null==t)return null;var a=this.doPublic(t);if(null==a)return null;var l=a.toString(16);return 0==(1&l.length)?l:"0"+l},e.prototype.setPrivate=function(e,t,a){null!=e&&null!=t&&e.length>0&&t.length>0?(this.n=B(e,16),this.e=parseInt(t,16),this.d=B(a,16)):console.error("Invalid RSA private key")},e.prototype.setPrivateEx=function(e,t,a,l,i,n,r,u){null!=e&&null!=t&&e.length>0&&t.length>0?(this.n=B(e,16),this.e=parseInt(t,16),this.d=B(a,16),this.p=B(l,16),this.q=B(i,16),this.dmp1=B(n,16),this.dmq1=B(r,16),this.coeff=B(u,16)):console.error("Invalid RSA private key")},e.prototype.generate=function(e,t){var a=new re,l=e>>1;this.e=parseInt(t,16);for(var i=new R(t,16);;){for(;;)if(this.p=new R(e-l,1,a),0==this.p.subtract(R.ONE).gcd(i).compareTo(R.ONE)&&this.p.isProbablePrime(10))break;for(;;)if(this.q=new R(l,1,a),0==this.q.subtract(R.ONE).gcd(i).compareTo(R.ONE)&&this.q.isProbablePrime(10))break;if(this.p.compareTo(this.q)<=0){var n=this.p;this.p=this.q,this.q=n}var r=this.p.subtract(R.ONE),u=this.q.subtract(R.ONE),o=r.multiply(u);if(0==o.gcd(i).compareTo(R.ONE)){this.n=this.p.multiply(this.q),this.d=i.modInverse(o),this.dmp1=this.d.mod(r),this.dmq1=this.d.mod(u),this.coeff=this.q.modInverse(this.p);break}}},e.prototype.decrypt=function(e){var t=B(e,16),a=this.doPrivate(t);return null==a?null:de(a,this.n.bitLength()+7>>3)},e.prototype.generateAsync=function(e,t,a){var l=new re,i=e>>1;this.e=parseInt(t,16);var n=new R(t,16),r=this,u=function t(){var u=function(){if(r.p.compareTo(r.q)<=0){var e=r.p;r.p=r.q,r.q=e}var l=r.p.subtract(R.ONE),i=r.q.subtract(R.ONE),u=l.multiply(i);0==u.gcd(n).compareTo(R.ONE)?(r.n=r.p.multiply(r.q),r.d=n.modInverse(u),r.dmp1=r.d.mod(l),r.dmq1=r.d.mod(i),r.coeff=r.q.modInverse(r.p),setTimeout((function(){a()}),0)):setTimeout(t,0)},o=function e(){r.q=U(),r.q.fromNumberAsync(i,1,l,(function(){r.q.subtract(R.ONE).gcda(n,(function(t){0==t.compareTo(R.ONE)&&r.q.isProbablePrime(10)?setTimeout(u,0):setTimeout(e,0)}))}))},s=function t(){r.p=U(),r.p.fromNumberAsync(e-i,1,l,(function(){r.p.subtract(R.ONE).gcda(n,(function(e){0==e.compareTo(R.ONE)&&r.p.isProbablePrime(10)?setTimeout(o,0):setTimeout(t,0)}))}))};setTimeout(s,0)};setTimeout(u,0)},e.prototype.sign=function(e,t,a){var l=ve(a),i=l+t(e).toString(),n=ue(i,this.n.bitLength()/4);if(null==n)return null;var r=this.doPrivate(n);if(null==r)return null;var u=r.toString(16);return 0==(1&u.length)?u:"0"+u},e.prototype.verify=function(e,t,a){var l=B(t,16),i=this.doPublic(l);if(null==i)return null;var n=i.toString(16).replace(/^1f+00/,""),r=fe(n);return r==a(e).toString()},e}();function de(e,t){var a=e.toByteArray(),l=0;while(l<a.length&&0==a[l])++l;if(a.length-l!=t-1||2!=a[l])return null;++l;while(0!=a[l])if(++l>=a.length)return null;var i="";while(++l<a.length){var n=255&a[l];n<128?i+=String.fromCharCode(n):n>191&&n<224?(i+=String.fromCharCode((31&n)<<6|63&a[l+1]),++l):(i+=String.fromCharCode((15&n)<<12|(63&a[l+1])<<6|63&a[l+2]),l+=2)}return i}var ce={md2:"3020300c06082a864886f70d020205000410",md5:"3020300c06082a864886f70d020505000410",sha1:"3021300906052b0e03021a05000414",sha224:"302d300d06096086480165030402040500041c",sha256:"3031300d060960864801650304020105000420",sha384:"3041300d060960864801650304020205000430",sha512:"3051300d060960864801650304020305000440",ripemd160:"3021300906052b2403020105000414"};function ve(e){return ce[e]||""}function fe(e){for(var t in ce)if(ce.hasOwnProperty(t)){var a=ce[t],l=a.length;if(e.substr(0,l)==a)return e.substr(l)}return e}var he={};he.lang={extend:function(e,t,a){if(!t||!e)throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");var l=function(){};if(l.prototype=t.prototype,e.prototype=new l,e.prototype.constructor=e,e.superclass=t.prototype,t.prototype.constructor==Object.prototype.constructor&&(t.prototype.constructor=t),a){var i;for(i in a)e.prototype[i]=a[i];var n=function(){},r=["toString","valueOf"];try{/MSIE/.test(navigator.userAgent)&&(n=function(e,t){for(i=0;i<r.length;i+=1){var a=r[i],l=t[a];"function"===typeof l&&l!=Object.prototype[a]&&(e[a]=l)}})}catch(u){}n(e.prototype,a)}}};
>>>>>>> 6a6225c8fa2a16304fb470688314738885f795cd
/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue &&
    !value.__v_isMPComponent
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
var NULLTYPE = '[object Null]';
var UNDEFINEDTYPE = '[object Undefined]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function nullOrUndefined(currentType, preType) {
    if(
        (currentType === NULLTYPE || currentType === UNDEFINEDTYPE) && 
        (preType === NULLTYPE || preType === UNDEFINEDTYPE)
    ) {
        return false
    }
    return true
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key] && nullOrUndefined(currentType, preType)) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"charity","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"charity","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"charity","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function clearInstance(key, value) {
  // 简易去除 Vue 和小程序组件实例
  if (value) {
    if (value._isVue || value.__v_isMPComponent) {
      return {}
    }
  }
  return value
}

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret, clearInstance))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"charity","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        try {
          triggerEvent.call(this.$scope, event, {
            __args__: toArray(arguments, 1)
          });
        } catch (error) {

        }
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    'onUploadDouyinVideo',
    'onNFCReadMessage',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 26 */
/*!**********************************************!*\
  !*** D:/Users/Desktop/送酒/charity/pages.json ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    if(typeof renderjs.beforeCreate === 'function'){
			renderjs.beforeCreate = [renderjs.beforeCreate]
		}
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */
/*!***************************************************!*\
  !*** D:/Users/Desktop/送酒/charity/static/home.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/CAYAAABXXxDfAAAAAXNSR0IArs4c6QAADJlJREFUaEPdm2lwVFUWx//n9ZLOvkL2jYSgEhBkWCYsYRPNCBZSE2CGCQPCUI6OUyCLQkT55gyl1lTp+IHFogQNY1RKEBUlCAwUbqxJ2CSQfSV0lu5Or+9M3dfpkI10C+kw5H7Ih6TT9/7Ofs67jzCQKztbFaeRh6lVmuUALwEwhIEqAnbLDtue8o8+KwUgD9SRaKA2isyZ4+8nh05mCX8DeCpAIcrezMxEejB/R5DetTYbf6w+cMA0EOcaEPikZdlRcNBSBp4DI56I1L3A2RgoJ/C/VbB9WLJ7X723BeBd+FWrNInmxnSweg0BcwGEuoCYGTIDEgFEt4/B4Ftg2scsv11e1XAVR4/avSUEr8EnLZsfItu0cyWJXgIwEoDWaeWALH6AoVGrYLU5FHiVkELHYgsDZ5j4bVOT5dDN/ftbvSEAb8DTsJzseJnpeQBLAUS5VCu07ZAFtITUqHCMTBiKMyXVKG9ohp1lqIg6rEDIiIAqGdjBNtpRsXdvdX8LoF/hU7OyfKwRAeMJ0lowZhMhwHVgWWbYZRkhfjpkpidhxezfIDk6DJfL6/F+wWmcvFyOVpMFKpUEqZMbgNHMhIOw2d8s+6W0CKdP2/pLCP0GH5edHab2kX4PwmpmHu4Kaopvy6zkr5jQQCyZOgoLp45GZGigomWZZdTcasVHx87h45NFqNUbIUkiFty2AgBWZi4kojcNmraDN9/vHzfoD3gpafHiBFbzi0QQuTuyc1AT2tap1UhPjMTK2Y8hc2QyAvx9wA52BgABqSK0GMwoOF+C9wvO4GJlA2wOWYkDHcFQpESgiom2s61tR8Xe/ffsBvcEn7RsmQ4O40SGtA7ADAL8u5t5eKAvssYOx/KZY5ASHa4AsQjz3RapJNjtDlypuokd357G4cIbaDKaoe7dDfbbGW9VVdYV30s2uGt4xcx1tBAQZo6ULmbOrCg1LjwQy2eMwfyJD2NIsL+oZ3oFd8mBnHkPdXoD9p4oQt6JQlTrWxUX6O4GAJ1jlreaLHyoIT/fcDdx4G7gKWnx4kRWyy8QKAfU08x9tRqMGxaNFbPGIiMtDr46Ldgho6e+ex5ZxDpJkpTgd7S4DNsPn0FxRX0PN3BmA64E4z1yqHbdyMur+7UC+HXwWVk+8eH+E1SQ1jHRrDuZ+dPj0vDszLFIGBKsFDEi4P3aJQRglx24WtWoCODbwlI0m3p1Az0Dn0qQ37xhwTXk5zs83ctjeFG0sE27gCRa1yOadzPzZ8aPQHiwP2ShbaWgubulmLpEqBVucLIYeSeKUNPkygaS8BDXMjPjezC2Oqzy0cr8/DZPdvQEnmJysuPVsuo5SZKXARTdNZozfLVqjEuOxspZj2JSaix8dRonuCcncPMZV/XXYrKgoLAU24+cxeXqW3B0ywYMCI2XguV/2SV7XtUH+xrdbd83/KpVmjiDfqxKJb1M4McBCuwtmj81NgUrZoxB4pBgRRt3Y+buDiqyhEh/xRUN2FZwHscvlaHVbIVaEhbQpTRuYKbdZKd3SvfuLVPq6DusO8KnLskKslHQPJJ4HZhEba4R3+FsSJzRPDYsEH/OTMeC8WlKNBfacNbt3llK1JcIVbcM2PPfInzyw2XUNZugkqQuvQEDRmIuYMj/LPML+wnbtvVaFfYKH7c0O1Ytq/7CxCuJOaZ7be6jUWFMYiRWzBiNjLRY+Os0Crj3sG8LUyhZaFtvMOPL89ex88gF3GhoUj7QOR0ys52ASzJjqwGt+299+FVLj9qiyy+mT1fHxkWOVAPriTAPQFB3Mw/z1+GJ0clYMX0UhkWKaE5KszLQSwjAbLfjzI06bDtyAT+U1KDNaoe6e1VIqGbQNmLN9rI9e2o6n/O25rOztQk6ekIC5QIYe7sFdfbdwpxjQv2RM+URxcwjg/wUaG+auTuButrg8sZW7DxaiINnS9BouENVKOEzstm3luZ9etU1KlPgRZnKsnEBydIWJqSIOsPl384WVIVRceFYnpmOaSNiEeCrHTAzdycAYXnC5xtaTNj38y/44MRFVInmSKkKOw9K2MJMJ5jkLeVmnBL1AEXm5Pj7snUhiDcDlNxh5qL3dsgI9vPBrJEJWJGZjtTIECWw3A8zdycE0QMYzVYcv1KFnceKUVx5s7eq0EHMhQBvLK1sOEyJOQtfIGBtd3C7Q0Z0iD8WThyORRPTECWiuWLmruGqJyWCuyP319+dMUdYgDjj1Vo9dhwtxneXKtvTYY8hSZFDxnpKyllUC2AoAIVG+LD4gpShwfjrzFGY+XAcgn21yiDCi1msv6SgmLuwTlEJ5n1/Ffk/XUN9i6nLkEQURAQ+QUl/WmQBueZrrGS1h6JDsXrOo5iUEgWtaDXvQzS/F2kILQo30BstOHi+FNuPF6OmydQlBjDYJDQvZuS+rmlqWlQwNs0dhwnJkYopOB4Edd9BUiIdmqw2fHGuDG8dOge9yQKNSonlYpk74IW5iwHirEdiseXp8QgL8IHV7nGDdC+K8tr/kjBptQpXapuwctdRVDUZ4aNWufZr6wovEWY+FIvX5j2G8ACdEi0f5CUsV7TGhZW38Pe8E6huMvUNn5kWg9fnPYaIQQIvWuILFY1Y/Z9TqG02KZbQvnpqPjMtGq/PHTtI4EUjBJyvuIXVH3+P2uY2aNUdPt8NngiZaVF47alHBxd8pR5r8n/0DH7z70YPEngok6ALlXq89ImAN/et+WnDo7A5axQiAnxgE7P1B3iJgCfgRcB76dOfUdviFj4Srz6ZPkjgRVkLFFbpsfaz0x7Apw5F7pMjEeEvNP+gpzoxABXwzVi374wn8EOQO0fAa2F7wMra7h6qmD0RCmuasG7fOdS2mpVyvfdUR4RpqUOQ+/gjCPcbLPBAYU0z1n9+3j381JQI5D7+MML9fGCTB4HZE6OwpgUb9l/wAH5YBDbNHoEwP2cb626JfKCUkR23K7zZ5zvbbWV67OrB+zigqO1FwCuqacaGA8WoNbgx+6nDwrFxVlo7fN+pznUAsYHFLsNkdTinPN7gZzGsIPhrVUquFs2mOwE4fV7At2LDF0WoM1j69vkpAn7mcI/ghdDFnKzVYsehK/U4VtKIFrOt20MEd7bj2d9Fyx2s0yAzJQJzRgxFoI9KGaz2tTrga1vx8hfFHsAnh2HjDAGvcTvEEOCiECq4dhPvnSpFTYtZGJrXNC+MPTpIhxczkjA9JQIalbjZcWf8LvBfXvIEPhSvTE/1CF7MyJvNdrxzshQHLtUpj6nEHM1bS8Qgsef89Cg8PykRQTp1nwrqDP/KV1c8gE8KxcuZKR7Bi+GHyeZAfmENdp+thr7NqgxEvKV6MVUK89Vi+bg4PJMeCZ1acqN551iuqM6AjV97CL9hWrJH8E6fJ9S0WrDzp0r8UNGkFEZdrtT1kxkI8xZmnhEfgmfHxyEywMftA5MOzdcZsenQVfean5wUAgXe173PCy6XnvVmG641mmCwOLyleATq1EgJ80WoeATugVA74OsNyD30C+oM1r6j/eTEYGyYluQxvOsMrocZ3nx85aolPH1ochveiNxvrrmHzxDwUxJ/NbxiBV4K9C4Bu3K7B0pXPuKCL643IvdwiQfwCcFYPyX+ruA9PdRAfc4Ff7HehNyC657AB2H95EEIf+SGe/jJCUFYmxE76DT/6pEy1BndBLwMAf/bmMEF32CCgK832qFVdTQePae3GfGBgwbe1XtcFPDfVaDeaOsbfkpCENZMikaom9JxoILWve4jFH2lsQ2bjlSgri940ZRMiPXHpsmxCNGp2utmb/Sn94rk+f8L+OKGNmw+JjTfyewZitmL24o60RyJ4iE+SIst02IxIlzXPjjwfKP/t0+KJshsl/H5VT12Fd6EweJsjMRicCMl5iwyuO7QisZBKxFmJAVh2ahwDPXXeKVOHwghCWWKdru4wYR3TzfgepMFUvtkx3lbk04JzR9nIIMAlfLaDzN0Kgnjov0wNT4QMYEa5XbSg/T4QujWKjMu3jTjm+vNqGixKufv9PqKnglvUOLSxX8k5n8AiFfMQRkPOZ/V+2kkaJQrTd7pVbxlAU4lOkdrRpuslN0d4MobG3TKbsNyivnDvAit2m89xAt/nS8dtr/39gBfzFCgnW9s3RYzAyUMXlOe8vFB5dexSxbEaSR1LkCLOr/45y3N3I/vVfycIS4iv0Fq3z2lu3aZO2SSlJ0dBR0tB2iZuGwJgp/rMuL9OGw/7mljsLh3e5aI3rW3yd+47uN3SeJhS7KCAjhwAqkwnxiTlbt57Te1+vEwA/JV4l44AS3MVAzw1w7Z8XlldeONzi8k/Q+P85JIK0iHUgAAAABJRU5ErkJggg=="

/***/ }),
/* 71 */
/*!*************************************************!*\
  !*** D:/Users/Desktop/送酒/charity/static/ax.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAC5RJREFUeF7VW2mUFNUV/m71MtOARiPgEo14FNxCjAvZOCd6JIkaRRIFjBx3h2G6RnAL093Vg5ZCV1fNcExkMtXNIoI7YBCVJJy4xMQYl8QTPCfqUXGBKIqIK0PP0l03vJ7FXqqmq2dhhvev6913373fu+/ed+97Tehnq4nHx7FkjfeCTmTwaDBGgfAlM3YS+D/pDL27LBr9sC/T1MRi35F8PJGZTiHQOGauIKI0wJ8w4TXqwLOejo53mlT1y77wF2Oo3IEz1q71HLL17TMpzVeQBz8A44QSPFoZeIMt3uihzIPN4VteLTVnTaM6liz/egIml6IF825IeIKZVu2WPn3q3vmLW0qOySFwDYCqqtJHlb7pEiEK0HfLmSSflp+wiG5L1inPOfEIGtoqAq4sew7GBxahIeCrXP7bm25KuRnvCoDrdH1iBpkkEf3YDVM3NAysy6T5ervtEdS1V4lwkhs+DjRvcgZVCUV5thSPkgAE9VgtETUCCJRiVnY/Ywd76LLE/MiTuWNlQ/sjgF+UzS9/gPAVcTMUvaU3Po4AVFdX+7zHjlsMYF6ZgmQAeMoY0wGLq81IdFX3mFr99pOZvAKUw3L4tDG4hUAVAEa65c/AXd7AqNqmefPa7MY4AhA0tHsIuLwEetss4EW2rDWSz7MNrZmP0ul0yhvwjMkwjZFIOg3AdALOACAEd26MkBlWGroJZFUdxZW+M1kiIva8Bcv6ONPW1lYBeDu83gM8PjrBYj6LiC4G6MQSgDxohpRZrgEI6tptROjFdHgrIEU9729/uKmpyRbZPJNetOgo+KQ6ANcAGOEobAEIblZZOOcdAf+FBNwGwNk5M91phiM3FPIssoCgof2SgEccJrcAjqVTHfoyVd3jRsBcmqqFC4/x+z1/AHCq01gC1zWHosLnlNVmzJjhGTvp1JDFuJUAv91gtnh2IhJdkduXB0BV48Jj/JbnZQAH2zD4QqygGVLWlyVZAXG1qo7wVvoSILrCiQ+D6xJ9AEHwC+qx8wj0EAgH2vBvYWROT4QWvNHdlweAbMT+AtDPbAbuIbbOaw7X/72wb8YdNwZGp8ecIbF1Klg6zpLgZbae35VKr1mnqu1OSsoNmgGG2Ba2rT8g1OixcyQiYcVFkYsJTyfqlClFAMgN8XPB/Gd7afhKMxy9J7dv7pIlFek9u2uJMAfAhKJxxI+addFfAeB+gKAkQtF4XywuqMdmEdH9pfTpsYCgEXueQD8sHsCmGYrW5n6vXbzoaM5IjwOY2JtwBP5pcyj6VG80sq4ZIGdLALC8FZ6bV4ZCXxXymauqB6YrKsZLzO81K8quwn7nSMavm6HoyWJxsgDUNGiTJcY/bATd4Qm0T2ia93WyURNXx0mSX5ywjnSxMhe78RklQWBssSQrnKyrF/4na1G1+qJpDOluEA5m4CtmrkqGo2tzZbpa08YEPNgM4IgiWdm60AzXP54FQNZjj4FoaiGRZfG1yUh0Zff33zQ2jmyxOp7bGyVOKa08f96exgkrotEdpWmFDCUtQej+OoA/MeNwAs0EwdvDO5sUdYw369SPcueTDe3avYuV5/lFPwOPJULKNLpKVQ8aUen7H4hGFQi6NX3QIeOXzZnT0f09aMTmE6jnsFKoGAMZAkR43Aa2qs1w/T/dKN/DX9cWEqG+nDG5tJZFU5KRyNO53zqjjv9NEL5VwHeP1WFNINnQLtq7l0VsLmgUM0ORHmHEyQwB/1sFx9PsGGZ8KM7dluTbtHvPnh339yM/l+Oxq1iiJQQcUA4QDLRnWBq/LBzeVjhO1rU4COGiBSOaKQBoAnBdkfmneWIyGv1v9/fsniNpg41QW60Oa3Kyvv6DcgTujVaOx4+DZK0Gysg+GREzrOh2fIPx+Okk8b+Llhi4m2RdewmESQWd28em2o9WVTXd/V3WY78D0fVFQFnW9GSk3saC+g0HBRtis8mim0E2YbabPYstx4oZjt7pNONVqlo5IuB/H8AhuTQMvCIsQJSrcrMuQbPJDCnn5RLLhvYMgDMLJvlsZ6r9sN4OPP2FoSsrFQ76IoBFcnU4QD6A3gesjR0ZWrZcUd4sNY9saOKMc24enSjbyYYmnNzX3rST4vdmSJlbAIDYDiJ25ra/miHl7FKTD2T/5Y2NIw9qafE0AbuhqpZb3rKhCQvJS+2zTls2tOKTGvENZt3XJiXqgGPe3fIugKMKTGhDIqSI096wb7Ku1YFgFPkBOwCYaHaiLtITO1VV9X5c6X+vMJQwc3MiHC1yoMMRDVnX5oCQdAcAKJgIRfKIZT12L4guy2WQAf98aSj6xHBUuFAm2YjLADe7BICLkpBrVfWbFQG/CebzQbSbGY2JsHLH/qC8kFE2YipAtxYBEDS0tqICAvM9ZjhqW5YWJ6sjgFa1DAc0HECSDW0NgJkFsqQoaGhbCDg2v4NfMEPRHw0HwQdKhqARe5FA3y/g9w7JRuxvAP2kEJm2VPuRd6nqpwMlwFDyqV6sjvam/R/mJU+dAm2iWl1TmBArFJCBaYmQ8thQCj5Qc8vx+KWQ+IFiHSlMcjw+CRK/ZANANl0cKCGGkk/QiG0i0DmFMlgWnUaimjr6jO+9QaB8P8BIk4WTm10cM4dSuVJzdy3wCwCkXFoGv/3JMZuP7y6I3AGiG22Y3W+GlLzYX2rC4dYvG7GNAJ1fZOEMLRFWolkAqvVbv+2lCpFQFN7eWAxrciJULxDc71rQ0MSFyaM2greluW3CsvBt23qKorIeW21bq2dsaSXPaXZFyeGMiNygHgb2vwJgbLF/42QiFA2K7z0AVOv6t71k2VmBqJ+tOTTVPmt/OfyI/H9kwP8k2z+waElz20li9fMAED9kI3Y7QAscVna5GVKqh/OqC9lmqKp/TMC3AaC8ekaP3Iz5ZlgRt97ZlnczlL3sSO1+iRwuGYd79ifkz6RaHgHYXnng2ddS7Wc/k1PpKrocndOwcLyHPf8C8A271bbAZrLgomQ4WIUw+0DAt56cVh7Y1d6embRiwQJR1+hptu8DauLxsySJNzo/RCi+LRpKELpqfqIuafuqhIEvYNGURCQiLn7zmvMDic67tdU25bIuBsMDhC6Ht46BCxwWIZUBT3OqW/T6RigYj1WRRAknEIbaJ2TNvtL3MFHxQUeAwYxWgjVTXIE5WWjpR1IN8SowJ8n53U9RAXVfbIe5S+ZWZFKHi7tCp8dUbQzMLJXQlQSgMzxm79dEiaywepzVdV9bQmeoq9jQi7dvtQgzknWK8GO9NlcAuAEBzEvNcPZ05fgeoJQwbvrPUlXvSSN868HFl7ld41NWBjOTSmnli84BpQQQPgESOW4HBlYnQsrVgwVC1yWJyOunOzk8sHVJb3vedRRwAkNuiF8K5rucHk4KEA5NtV8z0Mfm6qVLfd7Pdj0AclaegV+X2vP9BiC7HXR9KsgSRUb716PMq3a+vLlq3bp14tFkv1tW+c933WdT1OzmnQJLl5jhsKO373MUcLQEfdFUhrSWCJW2NMwrd768ubq/IHSt/H2goopulwMuHep6WwHXTtCOSVe+LZ6l2L8CZVo5trVtdl+3Q9ee723lXYW6QQNAMK5p0C6QGOsAe0sg4O4xqfaqckEQ3v7EgP8B2pvgOSjgOtQNKgBZEDTtAskDYQm2PoEtrE5E3EeHrPKVvoc63wHbtrJC3aAD0OkYF00FSY6O0W2IHIxQt08AEJN0+YSH+hoiByvU7TMA+hMiBzPU7VMAurdDOSFysEPdPgcgZzuUDJHbt2/3eI8dN6ihbkgAcBMiGbwCTCOIYPtvDgADEuqGDAA3IbIX4QYs1A0pAG5CpI2AqXKzut6UHHIA3ITIHCFTfcnqhj0AWUvo/FOGODYXPszulr/PWd1+AYAQstaITWGQuLDM+++fmwJmX5UcFlsgVwgbEFoYmFVuMWMgAOlXOtwfAYLGwuMJnvkMeC3KxJbWLRBP8fd5+z8Ae/rQJVWi/QAAAABJRU5ErkJggg=="

/***/ }),
/* 72 */
/*!*************************************************!*\
  !*** D:/Users/Desktop/送酒/charity/static/my.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA9CAYAAAAJQPEgAAAAAXNSR0IArs4c6QAACWBJREFUaEPtmntwXFUdx7+/czfbDW0ptE15GMDSgtR2lM6g5eEIo0BBZpxaCOpIEWhJsxtSAZnc7N0gF5LczU2g1SbdTSLWCszINILodIq1o1BaauWhVYFa3sUGUtMH5ZHd7O49P70ZEveVzd7dDdAZz7/n9/t9f59zzr3nSZigUqXr7uke1/kCYjGB54KoAsBMAIeZ0CcY/QzelHht346enp74RKRBpQ66wtQr3SjzA+JagG2Y8cp+ZjysUGxNp6q/PZ6xk/qSwd2g655yjytAEKtAON5JEsO2jA8Y+PHBaKypV9djjv2zOJQErqZdn0XS/SgBFxWfFO1KJOTSnkDgnWJjFQ1XaxhnSwVbCTg9j2QYQD6ab8Zi1tfuv/PON/KIOaZJPkJjOnuDwRNJ4Z1gnJPdiPcx84PEyvaYK/HKFJd1JG65piHhOoOFvAqMqwDMz+rL+CczXRj2+48UClgwnK7r4t8e9+MgXJ4pTgfBsnkwGu/eoOvRsZKz/6gVHveNINwN4KQMO8bvZ0VjV+q6LgsBLBjOG2yuIiE2ZoryHinj3+jy62/mm1BNUP+sEO7fAPhCuo+U8pouf+Mj+cZKtisIrq6ublKi8uQXCTQnRZTxesziC+8PBA44TWZ4iBM/B8KZyb4Mfs1VPnV+x6pVQ05jFgTnazVuBqEnTSxiWTivW9NecprEiH21YZyjCP4rEXlSYki+MeQPbHAatzA407CHydI0sbUhVfuB0wTS7X1my70A/TC197AlrGpXOI3tGO4m05zq4cTbIJqSJBYBuc4M1df3O00gA65NP5nZvY8Ad1LdoSiU2etV9X0n8R3D1RjGRULBjrRv7c+hBu18J8K5bH1my9MAXZjSexa+Gta07U40HMP5TOOa/85NvWkffXtYDdQ7Ec4J12YEwWhIs7k6pGqPOtEoAC54C8AdqSKyLqQ2djoRzgmX7YfFfGuoIfATJxqFwAUAbk7pOeKbw/WB+50I57L1BltWkKCfpo4OagirftOJhmO4bJM3s7wn3NB4lxPhnHBm0E9gIwWOeVm4IfCQEw3HcL5g8HII3pImsjmkavY6sSTFa7b8jkCLk4NJSV/v8vv/6ETAOdx9zachIV4H4BoVYgwiGjsppOsfOBHPZmuvfqzKU/oAzBipZyAWT/DpTlc+juFsQa9p7MjYu0lZG/I3hoqF87UaK0HoSh2S+Fu4QTvXaezC4FqNRiI0pYn1D0Zi8zbo+rtOkxixX9bePnmqjL8M4NTUGNwYUgMtTuMWBFdnGBWWAnsjOTlN8LGQqtnLMntT6rh4TePXBCxJcWR+T5E0t0PTBpwGLAhueGi2Nt9NJH6UIcjcPfD87tre3l4r32TsveEBj7uTCN4MH8lNIX8gUyeP4AXDDa8xYdk7gMpMHX5Kget7Haq6f7wc6tqa5lhS6QLh0syGQl+UlHlO15QjcQqGswPUtLQsEAqeBlG2064Igx8E+OeRSGJ38o78ttWry4eGhhZA8EoA1wGYlKURIoLFos6Ghn+M10Bj1RcFZwetbW25VhI9TLkOfhiHALxNAgNS4mQQzyJQrjPNuJTyu4XuwEvScyNBas2WyxjYCNAJhbby//z4XQu4plsN/KHYWEX33EgC1W1NcxQWDxGo4K0Pg3cJi76/TtPs6aDoUjK4kUx8prEUjPb0s5BxMn1DWvKuLq3RXjsWNI1ki19yOFukuru7zHVkYBGTuBrApQTMZKCCAAVAAqB3mbmPiH8rLdpyyDPwl97b10SK7qq0ABMCl55k1cYqZca++TMoMWlKXMoPxcyZh3tWrpyQm51k7Y8FrtQ9km+8/8Pl21LJdtW6flyZ213JRNMssspJiOOFJSeDMGgBRxVWIgklcRiD1js9uj5YiMZ4PiXpubq1dZN4sOJsCddiJlxEwFwGTiNg2ngJADgK4C0A/wLk44Lltheics+Tup7IwzenSVFwNcHgJYLkMgauJKJTik1mxJ8ZfQBvY0GhrnptZ6HTg2O4Ze13TD5eTl/OwPJsFxelAhwFBe8BqOdg2UC30+kibzj7G1I8ZcuJyA+gZL3koDH2g9E8cGDggd41+c2JecGtNIwLhMK/INBZ+STDABNwEMB+EL/FTO+RxFEQx5lQDsYUEmIyWJ4B0GkMTP9ogs8n/KuWheu7Ne1P4xnnhLO3JtF45G6Abh9PnMF7AWwTgjdzIvHiS0N4M5+fQtXGjcqst16uRALnMmgJSFwA8OdyJT7ceIT7EoOxu3L9aceEu6W9abZlKZuI8PkxhZjfY8JGkqIn5Pc/O15L5ltfaxiLWHA1iL4F4MQcfi9C0pKQ3/9q3mtLX/CeL7FwbSJg1hiBP2Tw2lhZ/N6f3a4fzjdpp3Y36PoJ5R63/fTjDgKmjuF/wGJ5bXdD41Pp9Rk95ws2f5uJ1hPRcVmDMW+IUjywvsQPYnKB1zQ3f4bKqJFANdnsmNleBKxMP5FOgbPBIMSDAMqyBDlAhJvW1WubnfZAqex9weAVEGzfsGY+DgDsA6nvhFTtVyN6o3Be01hCw7vpbGC8ExS/OlSvF325WCyo/aBHyLJHAPpKeixmRAXxN9epga123TBcjdn8ZWLalnEXbVcyb1D6+ms6OjocX7gXCzKWvz3nujzutaDhhUR6+ZAlXRz2+5+nqtW3lVfEKl7ItnNmYHVY1VLupycq4ULi+kzDvq9blenLewfKDi4kb7C5hoQIZwneGVK1ukJEP0Yf8potPQRakalJdeRrbdkOSh2/DDwWVjV7jvnUl6qqKqXivIUPA7Cvs5PLVhvuaNqhakTG5VldjY32NdIxUVaYZmUZJ15J+2ccIp9p2G+zkk98/x5StS8eE1RJSfpaDfu/MfpIzr7TI69pDCW/+WDwM2E1sOgYhNsFwmjeWeEIeGadqh17cG3GLvA4cAB2h1Rt4bHWc95WYzcRkj+nIfubs29CR8867O5UoMzuVNWSPqaeyMa6xTRPlbBeAZC8Hn7f/uaeJODiFHHCs5Dy1sFo4iW3x1Oy4+2JAHQxn83E3URIH21PkLctWE3M3WMIf6rBPso5655UMmrIPpazIqc8B2DBRLTsJxOT9yjl/QuHqX1m0zyw8gQo61bik8mvcNV+hnVJWL1z72iX2vdrLhYPpD8FLFzjk/DkHbGYvH7kyX7mTrwteAWYrwN4NhjTQaW7L5sIXB4+saa9CvMvOxsCKc+2/gNrZov8nUiz2AAAAABJRU5ErkJggg=="

/***/ }),
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */
/*!*******************************************************!*\
  !*** D:/Users/Desktop/送酒/charity/static/my_check.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA9CAYAAAAJQPEgAAAAAXNSR0IArs4c6QAADwdJREFUaEPVWwt0VdWZ/v597rmv3LwDARLyUN4o1oIPFDUO1RpbZrmwl2dw2dWOTF1rfLTVNW1twZlOW221U6btcmhHZ8mbWGaEUisdKkpZPCzgYwQkKSSBBELI++Y+zzn/+J97D70CmtwkKLNZrMu695y9/2//3//cG8IlGGWLFuWDEqNBagYRZhBzORNGAJRNxCEw2pjppAL2kMKezojV2llb2z3cotBwTjgiGAwEfJhiWepLIMwmRgmI/QDcDHIRoDFgETjBTAkC+kB8jC1st5R6ORo1j7TV1oaGS6ZhA1eyeG6pTq6vALSYiUsIJKAGMpgZfQScAnhN3FDPt6xff2IgL/b3zNDBLV+uKusPX82Kvg3muwDkOIuK1KbFsJgvkEMRQSmCfKaNHgCvEuNfjo/b8C6Ww+oPwMf9PlRwVF6zYCbATxPhegC6LOaAEsF9Hhe8ugtu3QWXUjAsC/GEgWjCQCRuwLIYmiLQX0EmAOwxYDx2ctVv9sl0gwU4FHBUPn/+JLjxSwC3iD2JECKsxRZy/F5MKinCjRPGYnJpEcYW5sLrdtmgWjp68U5jKw4cO4VDJ86gsy8KLaVJe3MAE4ydSODBxg0bjgwW4KDBVS5cWGxp1jNEmOdozKHfFcX5WDjrKlTPmIi8gA9eTYPLpQDIcgzTtBAxTHT3RbFt/1Gs3fku6k93QNhLosWkqhLM2KhM9Y3j69a1DkZ7gwP3wAN6WbRrkWL6MSAuPqkxYdbMiaV4+IszMa1iFHxet3AUsNimqjNsCiqCvBCNJfC/Da1YsXUPdh5usu1TaJoabRbjm03++nVYuV/omtEYFLiKBQsqWMdagG8QMUUgATf9ytH4/sK/weTy4qSOzP79ASkFJuBo81k8sWY79tU1n3M0si0A76WEWtSwfn1DRshSPMnsnepqT/mI7MWU1FqBaMQwLZQUZuOpJXfglikVIP6wpvpbwNHkrkON+OaL29Dc3guXphwn08mMx/X2nlX1r7wS62+u9N8z1tyYhXOKdM23goi+JLYmwMRR1Nx6FR754kxk+zywBqCx84UUDYYiMazYuher3njH9qQCkJkNIvqvuKEebFm37uwlBVdZE5zIpDYDGC/2bxgmykbk4bm/q8bU8uIBUfGjBCRN4VDjGSz91VY0tXXD5dIc53IkztY9Latr37+U4FTZffPvVhZ+DUKx2JrEsqqp5XiqZjYKs/2D0pojsNIU2nvC+Mc12/Hae422c7GDPKPVYny1afyG32US2DOjZTDoLveo+0D8FIEKJCBnuXXcX3UNvnbnZxHwemBa/TuRj9p9TagZjeG5bQfwwutvoy+aSFIT3AHw441RrEJtbXyg2ssIXPGSO7N8Vv4/QOFbkmaJveX4PXj4rhlYNGsqfG6XnW4Ndkg6Fo0b2Lj7MJ7dug/d4ZgNDkAPLPww3hNe0bJlS3ig82cETrJ+v0d7lMh6TMoXAZfr9+CRu6/D/JmThwVcLG7gpb3v45nf7kVnOAbdBse9DDwdheenratW9V0ScOOqqz1GUfaXmekHRMgXcAGvGw/MvgZfrroaWR59SJqT4N0XS+CFHe9i5R/fRigSdzTXyeDvknbmPxr+c0f0koBDMKiVedVcBfxCMhMJ3EKb6msqsezem5Gf5UXCMNOT4IHKIXYFXdPsPPPJTbvwylvH7fgpVAW4jRlfa4zxf6O21hzopBnRUiYtXRS83qWpjQDKJaNKmCauLM7Dr756JypH5tl542CHpimcONuLpc9vw5GWDruKSBYL3MRk3tP44m8OZjJ3xuDKa+aOJtJfYOAOSb0S4lS8bjx017VYfNNkuF2aveNpJUy/8kiWI0BkrnW7j+Bnr+5HdzhJSZYfCa+BjZrG1ZtO9TtZ2gMZgxOP6eW8hwH6FhECTu02taQQzyy+DRNG5dvUtPPkgcwumQABuktD/ekuPLpmB95rbj9X4zEjBPAPo9T1s9ZV2wbsTATjQJa/IFOqrJk/jYFagMeJiiS2yc5/4TOV+Hr1ZzE2P4C4mQLYz1bbwDQNzZ0h/OurB7Hl4HGb6hLz7FKCqM4wVPDkunXvZlrXDQYcJCRkedVjDHydINqTqobhd7tw73Xj8JVbp6AkP5CsyO0kOiVW2mryT6e0aenqw/M7D+GlN+sRjiWgKGlrDLu38kyoO/KTs5s392ZCycFqzl6jtCY4zkVqNZivF+05QCQc3DahBItnTsDE0Xnwu/VUrEr2Cxx8Yl+hWAKHmzuw4c16vHGkGaF4wq7IbXtNam2fwVbNydW19ZkCGxI4AKpiybw7mPFzIhpn+zSp6zipkVG5ftw6YQxuHjcK40flIcvjsoVmi9EXM1Df1o2dR1vw+pEWnOmN2PExWb+m4DPqWJkPN7740qtSC3/S4JAM6rkLP4C1DECFI4DT8fLpGgIeHSOyfSjK8dq0DUUNtIeiOBuKIBRNIJIw7eQ4rfqWbToOwpMNEV6XSS55gXMYzI6kv1MaDPo0j5pLhO8AEA2e64DZFbp4w5R9CQj5TsALRUVTjn2lNC+1Wx1b1vdJb9uUSTZyMRyDcigXTBQMuit1utFSeAhEt0mFLnI7zwld09NpWTQ9DqZiWQcYO4j43xqi2D0UjTnrDg+45Gyq4v7gSE7Q3aRwH5gmMXE2GD66SERP9kcQIaAXjDoL1mqCuaVx9SbpdA3KxoadlhfTYonbHKlr+nQGzyKLpgE8EkT5zNCJILlhJxjNDD7ITLtNJN7ydUTaMu2R9GdSw6m5D6+1fLkqqKsL5MTj/rgXbp2sQsvSA6SZYS2hnwVztNfXFz5btrkvk+q6P0Dpv186cJlIcYme/STAEYJBhfxjakrnFXQo/xij8woLtbViV4Mv2wewIcMJjsbMmeNTXq9X85ge00UB3dBHWcwBOaNjUBYBblKcYAshMIVZWb2WabVqikOG4jh3GpGWLVsiwwV6aOCkeNX1HJeWyDYsbbxS1nSAJjO4jEBjGMhOHpCwYpCEBjsbJjnoAEkINAnoYUILWXSSwe+xxQcNS73vUirUlEj0ZFKcDou3lMANHwo0i24EaDYI1wH2gWMWAC+Y9YwLOqIEGBE7WSY6CVgHGPQHk6y9iKDjZG2taDSjkZHmbFC6VaopNQdEXyCmqSDk2oDOG+mB+yJnj8kEWnLJ8wJ62jRRMLoZOEzEmy3TeFm5O1oyyVoGBq6qyjV6TEGJW+n3AryIQOOYbMqdy0IkrXJKH1tuO19E8twtlenb3RD5kyqRpBySroS8K7/Zp63pyXMyGWcidINxxGJaayjr5ZYTbS3YscPoT439grsiGMw1dTUbCg8SMCOlKXteR0jn2MnjUnBrCvJZ6HcjP8uNAq8On1uDz6XZzR4pbGOGhXDCQmc4jo5wAu3hmP2d/I0bll0DJoFK+ZOCkCyBuiTwA/QLLWptP9bPDYiPA6cqFtxTZumepQSuAWi0c3rqgJJPj66Q43GhPN+PCSMCGFfkR2muH6NyPDZILaUJ5XDQzruS2hMQAqa1N4bGrjCOtoVQ19aHps4IeuOGDVZGssZLgkwda7UwaLVK0L83rF/f9FHp2sXBVVW5ykpG3kBEkunfIr2S1MSpY2Egy61QHPBgxtg83FRRgAlFWfC7NbswdSuCdLJsEqYi2fmJs0Nd+RRtxk1GXE5c4yaOnAlhT1MnDpzswqneGPoSls3/dE3avRXCGxabPzpx+Pge7L/wcPICcBX3V3k5MaKalFrGjKlEcCUpKC0DwKMRRgY8+Nz4QsweNwJjcjyQuk1XZEdk8e/nVwEDsQ2xUdve5LzYZIQN09boa39px7ajbTgdEuryOSakzMIgwmHLsv7JimPr+R71Q+DGzJnj1/N9C2DRdwhcabcPbIEZbAGFWTpuv7IQ1RNHoLLAhyy3yxbmXJ+kPxQD/N2p/2TtcNzA8Y4Ifn+0Ddvr29Hel7Ajpq3F1K4zoYGYfxSh7jXpHbJz4Oyi000LSdH3pOHqaMtpG1xZ4Mf8acW4uaIAeV6XfdQrHedLmj+lilwRsiti4E8NHdj4Tiv+0hG+sC0BNILxJFyt65xwkQRXXe2pKMhe8AEvljvtgmQ/EvC5FWaW5aLmmjGYUOSHrpFNz4vFrgEqJuPHnPsBhsmoaw9j1VunsLupC5GE9SGaAjgG5ica/HkvYeXKD65fLYcqr5v/eSheIfEr3b6y3RruHF+IxZ8ZhTHZHpueQzihyhjU+S+ITYrnbOmNYc3bp/H7o+0Ixc10gEKkOoAfali18Q9Ucf/CSWxYvybwTckWXdKGcjwa/nZSEeZdXYzigNs28ktNwYGgF6oJe1pDcax9+zR++347QjFp4qbChX0nhHbCNJZSec28735Q6n8DRLm287CkuaowZ2IRFk8rxoiADqGDRJx+I/5ApBviM3ZjCYBLEc70xfHiW6fxu6MdiBjWX50MuItJPSvg/gyiayWVEo2JS7+9Mg9/f91ojAp4kPg0edjPRoisp0IxrPzzKfzxWJctq9DWvvZI2EcVS+Z1ApQnO2KajNJcN5bfXoGpI/2XDRU/CqND0ffOhLHstQac7I7blE3FwLNUvmR+iIAs597W9NHZ+F7VWBT69Mtaaw5g0V57JIEndzThwClJWpJJu106pYOTwHhjSTYen1WCAp8O4zKmpANObK8jksDTf2rGnubec9c7Lg6uNIDHb/r/B+6pXc3Y2xw6H9y8Prmy6+SD147KwrJbS1Ho1+1k9nIfbo3QHk7gn3c2Y/+p5PVoYaCtOcehyJdCw5JsHU/MKsWUIh/s87/LGJ3Yl1jOobYIfrCrGSd64sl4l3QpXVRRM38fE6Y7VwvFlYr27h6fh7Icd+r65+WHMFnVA809cWw52oWDZ/pS+WYqFAD7Jc59mwhyaSYv5ULtwjDgVvDZ1wIvP2CORAIualjojVvJW7bnZOUuZvyYShfdO96lac8xqMrpiTg55CeZHA9lC6Uudm65p/7fwuuG6Vpq92UqlgRvYaifEnCVc742lMU+xXcTzPyOBfXoidXrdyUVGQxq5R6+gUh7BODbAMph6Q6ndbc+RYE/dunUUViMGD3SdoCFZxvi1pvSzE23KKpcNLeMlfZ5kPocA5WSuZy7Un75oUs5RfQCXM/E25Vp/s/xtZukYWQ7+f8DRQjr9/itlDwAAAAASUVORK5CYII="

/***/ }),
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */
/*!***************************************************************************************************!*\
  !*** D:/Users/Desktop/送酒/charity/uni_modules/uni-icons/components/uni-icons/uniicons_file_vue.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fontData = void 0;
var fontData = [{
  "font_class": "arrow-down",
  "unicode": "\uE6BE"
}, {
  "font_class": "arrow-left",
  "unicode": "\uE6BC"
}, {
  "font_class": "arrow-right",
  "unicode": "\uE6BB"
}, {
  "font_class": "arrow-up",
  "unicode": "\uE6BD"
}, {
  "font_class": "auth",
  "unicode": "\uE6AB"
}, {
  "font_class": "auth-filled",
  "unicode": "\uE6CC"
}, {
  "font_class": "back",
  "unicode": "\uE6B9"
}, {
  "font_class": "bars",
  "unicode": "\uE627"
}, {
  "font_class": "calendar",
  "unicode": "\uE6A0"
}, {
  "font_class": "calendar-filled",
  "unicode": "\uE6C0"
}, {
  "font_class": "camera",
  "unicode": "\uE65A"
}, {
  "font_class": "camera-filled",
  "unicode": "\uE658"
}, {
  "font_class": "cart",
  "unicode": "\uE631"
}, {
  "font_class": "cart-filled",
  "unicode": "\uE6D0"
}, {
  "font_class": "chat",
  "unicode": "\uE65D"
}, {
  "font_class": "chat-filled",
  "unicode": "\uE659"
}, {
  "font_class": "chatboxes",
  "unicode": "\uE696"
}, {
  "font_class": "chatboxes-filled",
  "unicode": "\uE692"
}, {
  "font_class": "chatbubble",
  "unicode": "\uE697"
}, {
  "font_class": "chatbubble-filled",
  "unicode": "\uE694"
}, {
  "font_class": "checkbox",
  "unicode": "\uE62B"
}, {
  "font_class": "checkbox-filled",
  "unicode": "\uE62C"
}, {
  "font_class": "checkmarkempty",
  "unicode": "\uE65C"
}, {
  "font_class": "circle",
  "unicode": "\uE65B"
}, {
  "font_class": "circle-filled",
  "unicode": "\uE65E"
}, {
  "font_class": "clear",
  "unicode": "\uE66D"
}, {
  "font_class": "close",
  "unicode": "\uE673"
}, {
  "font_class": "closeempty",
  "unicode": "\uE66C"
}, {
  "font_class": "cloud-download",
  "unicode": "\uE647"
}, {
  "font_class": "cloud-download-filled",
  "unicode": "\uE646"
}, {
  "font_class": "cloud-upload",
  "unicode": "\uE645"
}, {
  "font_class": "cloud-upload-filled",
  "unicode": "\uE648"
}, {
  "font_class": "color",
  "unicode": "\uE6CF"
}, {
  "font_class": "color-filled",
  "unicode": "\uE6C9"
}, {
  "font_class": "compose",
  "unicode": "\uE67F"
}, {
  "font_class": "contact",
  "unicode": "\uE693"
}, {
  "font_class": "contact-filled",
  "unicode": "\uE695"
}, {
  "font_class": "down",
  "unicode": "\uE6B8"
}, {
  "font_class": "bottom",
  "unicode": "\uE6B8"
}, {
  "font_class": "download",
  "unicode": "\uE68D"
}, {
  "font_class": "download-filled",
  "unicode": "\uE681"
}, {
  "font_class": "email",
  "unicode": "\uE69E"
}, {
  "font_class": "email-filled",
  "unicode": "\uE69A"
}, {
  "font_class": "eye",
  "unicode": "\uE651"
}, {
  "font_class": "eye-filled",
  "unicode": "\uE66A"
}, {
  "font_class": "eye-slash",
  "unicode": "\uE6B3"
}, {
  "font_class": "eye-slash-filled",
  "unicode": "\uE6B4"
}, {
  "font_class": "fire",
  "unicode": "\uE6A1"
}, {
  "font_class": "fire-filled",
  "unicode": "\uE6C5"
}, {
  "font_class": "flag",
  "unicode": "\uE65F"
}, {
  "font_class": "flag-filled",
  "unicode": "\uE660"
}, {
  "font_class": "folder-add",
  "unicode": "\uE6A9"
}, {
  "font_class": "folder-add-filled",
  "unicode": "\uE6C8"
}, {
  "font_class": "font",
  "unicode": "\uE6A3"
}, {
  "font_class": "forward",
  "unicode": "\uE6BA"
}, {
  "font_class": "gear",
  "unicode": "\uE664"
}, {
  "font_class": "gear-filled",
  "unicode": "\uE661"
}, {
  "font_class": "gift",
  "unicode": "\uE6A4"
}, {
  "font_class": "gift-filled",
  "unicode": "\uE6C4"
}, {
  "font_class": "hand-down",
  "unicode": "\uE63D"
}, {
  "font_class": "hand-down-filled",
  "unicode": "\uE63C"
}, {
  "font_class": "hand-up",
  "unicode": "\uE63F"
}, {
  "font_class": "hand-up-filled",
  "unicode": "\uE63E"
}, {
  "font_class": "headphones",
  "unicode": "\uE630"
}, {
  "font_class": "heart",
  "unicode": "\uE639"
}, {
  "font_class": "heart-filled",
  "unicode": "\uE641"
}, {
  "font_class": "help",
  "unicode": "\uE679"
}, {
  "font_class": "help-filled",
  "unicode": "\uE674"
}, {
  "font_class": "home",
  "unicode": "\uE662"
}, {
  "font_class": "home-filled",
  "unicode": "\uE663"
}, {
  "font_class": "image",
  "unicode": "\uE670"
}, {
  "font_class": "image-filled",
  "unicode": "\uE678"
}, {
  "font_class": "images",
  "unicode": "\uE650"
}, {
  "font_class": "images-filled",
  "unicode": "\uE64B"
}, {
  "font_class": "info",
  "unicode": "\uE669"
}, {
  "font_class": "info-filled",
  "unicode": "\uE649"
}, {
  "font_class": "left",
  "unicode": "\uE6B7"
}, {
  "font_class": "link",
  "unicode": "\uE6A5"
}, {
  "font_class": "list",
  "unicode": "\uE644"
}, {
  "font_class": "location",
  "unicode": "\uE6AE"
}, {
  "font_class": "location-filled",
  "unicode": "\uE6AF"
}, {
  "font_class": "locked",
  "unicode": "\uE66B"
}, {
  "font_class": "locked-filled",
  "unicode": "\uE668"
}, {
  "font_class": "loop",
  "unicode": "\uE633"
}, {
  "font_class": "mail-open",
  "unicode": "\uE643"
}, {
  "font_class": "mail-open-filled",
  "unicode": "\uE63A"
}, {
  "font_class": "map",
  "unicode": "\uE667"
}, {
  "font_class": "map-filled",
  "unicode": "\uE666"
}, {
  "font_class": "map-pin",
  "unicode": "\uE6AD"
}, {
  "font_class": "map-pin-ellipse",
  "unicode": "\uE6AC"
}, {
  "font_class": "medal",
  "unicode": "\uE6A2"
}, {
  "font_class": "medal-filled",
  "unicode": "\uE6C3"
}, {
  "font_class": "mic",
  "unicode": "\uE671"
}, {
  "font_class": "mic-filled",
  "unicode": "\uE677"
}, {
  "font_class": "micoff",
  "unicode": "\uE67E"
}, {
  "font_class": "micoff-filled",
  "unicode": "\uE6B0"
}, {
  "font_class": "minus",
  "unicode": "\uE66F"
}, {
  "font_class": "minus-filled",
  "unicode": "\uE67D"
}, {
  "font_class": "more",
  "unicode": "\uE64D"
}, {
  "font_class": "more-filled",
  "unicode": "\uE64E"
}, {
  "font_class": "navigate",
  "unicode": "\uE66E"
}, {
  "font_class": "navigate-filled",
  "unicode": "\uE67A"
}, {
  "font_class": "notification",
  "unicode": "\uE6A6"
}, {
  "font_class": "notification-filled",
  "unicode": "\uE6C1"
}, {
  "font_class": "paperclip",
  "unicode": "\uE652"
}, {
  "font_class": "paperplane",
  "unicode": "\uE672"
}, {
  "font_class": "paperplane-filled",
  "unicode": "\uE675"
}, {
  "font_class": "person",
  "unicode": "\uE699"
}, {
  "font_class": "person-filled",
  "unicode": "\uE69D"
}, {
  "font_class": "personadd",
  "unicode": "\uE69F"
}, {
  "font_class": "personadd-filled",
  "unicode": "\uE698"
}, {
  "font_class": "personadd-filled-copy",
  "unicode": "\uE6D1"
}, {
  "font_class": "phone",
  "unicode": "\uE69C"
}, {
  "font_class": "phone-filled",
  "unicode": "\uE69B"
}, {
  "font_class": "plus",
  "unicode": "\uE676"
}, {
  "font_class": "plus-filled",
  "unicode": "\uE6C7"
}, {
  "font_class": "plusempty",
  "unicode": "\uE67B"
}, {
  "font_class": "pulldown",
  "unicode": "\uE632"
}, {
  "font_class": "pyq",
  "unicode": "\uE682"
}, {
  "font_class": "qq",
  "unicode": "\uE680"
}, {
  "font_class": "redo",
  "unicode": "\uE64A"
}, {
  "font_class": "redo-filled",
  "unicode": "\uE655"
}, {
  "font_class": "refresh",
  "unicode": "\uE657"
}, {
  "font_class": "refresh-filled",
  "unicode": "\uE656"
}, {
  "font_class": "refreshempty",
  "unicode": "\uE6BF"
}, {
  "font_class": "reload",
  "unicode": "\uE6B2"
}, {
  "font_class": "right",
  "unicode": "\uE6B5"
}, {
  "font_class": "scan",
  "unicode": "\uE62A"
}, {
  "font_class": "search",
  "unicode": "\uE654"
}, {
  "font_class": "settings",
  "unicode": "\uE653"
}, {
  "font_class": "settings-filled",
  "unicode": "\uE6CE"
}, {
  "font_class": "shop",
  "unicode": "\uE62F"
}, {
  "font_class": "shop-filled",
  "unicode": "\uE6CD"
}, {
  "font_class": "smallcircle",
  "unicode": "\uE67C"
}, {
  "font_class": "smallcircle-filled",
  "unicode": "\uE665"
}, {
  "font_class": "sound",
  "unicode": "\uE684"
}, {
  "font_class": "sound-filled",
  "unicode": "\uE686"
}, {
  "font_class": "spinner-cycle",
  "unicode": "\uE68A"
}, {
  "font_class": "staff",
  "unicode": "\uE6A7"
}, {
  "font_class": "staff-filled",
  "unicode": "\uE6CB"
}, {
  "font_class": "star",
  "unicode": "\uE688"
}, {
  "font_class": "star-filled",
  "unicode": "\uE68F"
}, {
  "font_class": "starhalf",
  "unicode": "\uE683"
}, {
  "font_class": "trash",
  "unicode": "\uE687"
}, {
  "font_class": "trash-filled",
  "unicode": "\uE685"
}, {
  "font_class": "tune",
  "unicode": "\uE6AA"
}, {
  "font_class": "tune-filled",
  "unicode": "\uE6CA"
}, {
  "font_class": "undo",
  "unicode": "\uE64F"
}, {
  "font_class": "undo-filled",
  "unicode": "\uE64C"
}, {
  "font_class": "up",
  "unicode": "\uE6B6"
}, {
  "font_class": "top",
  "unicode": "\uE6B6"
}, {
  "font_class": "upload",
  "unicode": "\uE690"
}, {
  "font_class": "upload-filled",
  "unicode": "\uE68E"
}, {
  "font_class": "videocam",
  "unicode": "\uE68C"
}, {
  "font_class": "videocam-filled",
  "unicode": "\uE689"
}, {
  "font_class": "vip",
  "unicode": "\uE6A8"
}, {
  "font_class": "vip-filled",
  "unicode": "\uE6C6"
}, {
  "font_class": "wallet",
  "unicode": "\uE6B1"
}, {
  "font_class": "wallet-filled",
  "unicode": "\uE6C2"
}, {
  "font_class": "weibo",
  "unicode": "\uE68B"
}, {
  "font_class": "weixin",
  "unicode": "\uE691"
}];

// export const fontData = JSON.parse<IconsDataItem>(fontDataJson)
exports.fontData = fontData;

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map