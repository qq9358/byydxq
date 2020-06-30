(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
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
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
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

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
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
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
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

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
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
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

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
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

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
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


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
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
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
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
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

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

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
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
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
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


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
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
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
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


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

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

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
    event.detail = typeof event.detail === 'object' ? event.detail : {};
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
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

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

function processEventExtra(vm, extra, event) {
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
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
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

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
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
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
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
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

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

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


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
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


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
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


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

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

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

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
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
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
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

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
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
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
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
      while (vm) {
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
        tree.push(vm);
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
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
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
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
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
    !value._isVue
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
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
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
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
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
                    if (currentValue != pre[key]) {
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
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
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
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
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
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
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
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
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
    //TODO 暂不考虑 string,number
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
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
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
/*!****************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/pages.json ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/*!********************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/utils/dayjs.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _dayjs = _interopRequireDefault(__webpack_require__(/*! dayjs */ 9));
var _isSameOrBefore = _interopRequireDefault(__webpack_require__(/*! dayjs/plugin/isSameOrBefore */ 10));
var _isSameOrAfter = _interopRequireDefault(__webpack_require__(/*! dayjs/plugin/isSameOrAfter */ 11));
var _isBetween = _interopRequireDefault(__webpack_require__(/*! dayjs/plugin/isBetween */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_dayjs.default.extend(_isSameOrBefore.default);
_dayjs.default.extend(_isSameOrAfter.default);
_dayjs.default.extend(_isBetween.default);

_dayjs.default.prototype.toDateString = function () {
  return this.format("YYYY-MM-DD");
};

_dayjs.default.prototype.toDateTimeString = function () {
  return this.format("YYYY-MM-DD HH:mm:ss");
};

_dayjs.default.prototype.addSeconds = function (value) {
  if (value < 0) {
    return this.subtract(Math.abs(value), "second");
  }
  return this.add(value, "second");
};

_dayjs.default.prototype.addDays = function (value) {
  if (value < 0) {
    return this.subtract(Math.abs(value), "day");
  }
  return this.add(value, "day");
};

_dayjs.default.prototype.addWeeks = function (value) {
  if (value < 0) {
    return this.subtract(Math.abs(value), "week");
  }
  return this.add(value, "week");
};

_dayjs.default.prototype.addMonths = function (value) {
  if (value < 0) {
    return this.subtract(Math.abs(value), "month");
  }
  return this.add(value, "month");
};

_dayjs.default.prototype.addYears = function (value) {
  if (value < 0) {
    return this.subtract(Math.abs(value), "year");
  }
  return this.add(value, "year");
};

/***/ }),
/* 9 */
/*!*************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/dayjs/dayjs.min.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function (t, n) { true ? module.exports = n() : undefined;}(this, function () {"use strict";var t = "millisecond",n = "second",e = "minute",r = "hour",i = "day",s = "week",u = "month",o = "quarter",a = "year",h = /^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,f = /\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,c = function c(t, n, e) {var r = String(t);return !r || r.length >= n ? t : "" + Array(n + 1 - r.length).join(e) + t;},d = { s: c, z: function z(t) {var n = -t.utcOffset(),e = Math.abs(n),r = Math.floor(e / 60),i = e % 60;return (n <= 0 ? "+" : "-") + c(r, 2, "0") + ":" + c(i, 2, "0");}, m: function m(t, n) {var e = 12 * (n.year() - t.year()) + (n.month() - t.month()),r = t.clone().add(e, u),i = n - r < 0,s = t.clone().add(e + (i ? -1 : 1), u);return Number(-(e + (n - r) / (i ? r - s : s - r)) || 0);}, a: function a(t) {return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);}, p: function p(h) {return { M: u, y: a, w: s, d: i, D: "date", h: r, m: e, s: n, ms: t, Q: o }[h] || String(h || "").toLowerCase().replace(/s$/, "");}, u: function u(t) {return void 0 === t;} },$ = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") },l = "en",m = {};m[l] = $;var y = function y(t) {return t instanceof v;},M = function M(t, n, e) {var r;if (!t) return l;if ("string" == typeof t) m[t] && (r = t), n && (m[t] = n, r = t);else {var i = t.name;m[i] = t, r = i;}return !e && r && (l = r), r || !e && l;},g = function g(t, n, e) {if (y(t)) return t.clone();var r = n ? "string" == typeof n ? { format: n, pl: e } : n : {};return r.date = t, new v(r);},D = d;D.l = M, D.i = y, D.w = function (t, n) {return g(t, { locale: n.$L, utc: n.$u, $offset: n.$offset });};var v = function () {function c(t) {this.$L = this.$L || M(t.locale, null, !0), this.parse(t);}var d = c.prototype;return d.parse = function (t) {this.$d = function (t) {var n = t.date,e = t.utc;if (null === n) return new Date(NaN);if (D.u(n)) return new Date();if (n instanceof Date) return new Date(n);if ("string" == typeof n && !/Z$/i.test(n)) {var r = n.match(h);if (r) return e ? new Date(Date.UTC(r[1], r[2] - 1, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, r[7] || 0)) : new Date(r[1], r[2] - 1, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, r[7] || 0);}return new Date(n);}(t), this.init();}, d.init = function () {var t = this.$d;this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();}, d.$utils = function () {return D;}, d.isValid = function () {return !("Invalid Date" === this.$d.toString());}, d.isSame = function (t, n) {var e = g(t);return this.startOf(n) <= e && e <= this.endOf(n);}, d.isAfter = function (t, n) {return g(t) < this.startOf(n);}, d.isBefore = function (t, n) {return this.endOf(n) < g(t);}, d.$g = function (t, n, e) {return D.u(t) ? this[n] : this.set(e, t);}, d.year = function (t) {return this.$g(t, "$y", a);}, d.month = function (t) {return this.$g(t, "$M", u);}, d.day = function (t) {return this.$g(t, "$W", i);}, d.date = function (t) {return this.$g(t, "$D", "date");}, d.hour = function (t) {return this.$g(t, "$H", r);}, d.minute = function (t) {return this.$g(t, "$m", e);}, d.second = function (t) {return this.$g(t, "$s", n);}, d.millisecond = function (n) {return this.$g(n, "$ms", t);}, d.unix = function () {return Math.floor(this.valueOf() / 1e3);}, d.valueOf = function () {return this.$d.getTime();}, d.startOf = function (t, o) {var h = this,f = !!D.u(o) || o,c = D.p(t),d = function d(t, n) {var e = D.w(h.$u ? Date.UTC(h.$y, n, t) : new Date(h.$y, n, t), h);return f ? e : e.endOf(i);},$ = function $(t, n) {return D.w(h.toDate()[t].apply(h.toDate(), (f ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(n)), h);},l = this.$W,m = this.$M,y = this.$D,M = "set" + (this.$u ? "UTC" : "");switch (c) {case a:return f ? d(1, 0) : d(31, 11);case u:return f ? d(1, m) : d(0, m + 1);case s:var g = this.$locale().weekStart || 0,v = (l < g ? l + 7 : l) - g;return d(f ? y - v : y + (6 - v), m);case i:case "date":return $(M + "Hours", 0);case r:return $(M + "Minutes", 1);case e:return $(M + "Seconds", 2);case n:return $(M + "Milliseconds", 3);default:return this.clone();}}, d.endOf = function (t) {return this.startOf(t, !1);}, d.$set = function (s, o) {var h,f = D.p(s),c = "set" + (this.$u ? "UTC" : ""),d = (h = {}, h[i] = c + "Date", h.date = c + "Date", h[u] = c + "Month", h[a] = c + "FullYear", h[r] = c + "Hours", h[e] = c + "Minutes", h[n] = c + "Seconds", h[t] = c + "Milliseconds", h)[f],$ = f === i ? this.$D + (o - this.$W) : o;if (f === u || f === a) {var l = this.clone().set("date", 1);l.$d[d]($), l.init(), this.$d = l.set("date", Math.min(this.$D, l.daysInMonth())).toDate();} else d && this.$d[d]($);return this.init(), this;}, d.set = function (t, n) {return this.clone().$set(t, n);}, d.get = function (t) {return this[D.p(t)]();}, d.add = function (t, o) {var h,f = this;t = Number(t);var c = D.p(o),d = function d(n) {var e = g(f);return D.w(e.date(e.date() + Math.round(n * t)), f);};if (c === u) return this.set(u, this.$M + t);if (c === a) return this.set(a, this.$y + t);if (c === i) return d(1);if (c === s) return d(7);var $ = (h = {}, h[e] = 6e4, h[r] = 36e5, h[n] = 1e3, h)[c] || 1,l = this.$d.getTime() + t * $;return D.w(l, this);}, d.subtract = function (t, n) {return this.add(-1 * t, n);}, d.format = function (t) {var n = this;if (!this.isValid()) return "Invalid Date";var e = t || "YYYY-MM-DDTHH:mm:ssZ",r = D.z(this),i = this.$locale(),s = this.$H,u = this.$m,o = this.$M,a = i.weekdays,h = i.months,c = function c(t, r, i, s) {return t && (t[r] || t(n, e)) || i[r].substr(0, s);},d = function d(t) {return D.s(s % 12 || 12, t, "0");},$ = i.meridiem || function (t, n, e) {var r = t < 12 ? "AM" : "PM";return e ? r.toLowerCase() : r;},l = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: o + 1, MM: D.s(o + 1, 2, "0"), MMM: c(i.monthsShort, o, h, 3), MMMM: h[o] || h(this, e), D: this.$D, DD: D.s(this.$D, 2, "0"), d: String(this.$W), dd: c(i.weekdaysMin, this.$W, a, 2), ddd: c(i.weekdaysShort, this.$W, a, 3), dddd: a[this.$W], H: String(s), HH: D.s(s, 2, "0"), h: d(1), hh: d(2), a: $(s, u, !0), A: $(s, u, !1), m: String(u), mm: D.s(u, 2, "0"), s: String(this.$s), ss: D.s(this.$s, 2, "0"), SSS: D.s(this.$ms, 3, "0"), Z: r };return e.replace(f, function (t, n) {return n || l[t] || r.replace(":", "");});}, d.utcOffset = function () {return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);}, d.diff = function (t, h, f) {var c,d = D.p(h),$ = g(t),l = 6e4 * ($.utcOffset() - this.utcOffset()),m = this - $,y = D.m(this, $);return y = (c = {}, c[a] = y / 12, c[u] = y, c[o] = y / 3, c[s] = (m - l) / 6048e5, c[i] = (m - l) / 864e5, c[r] = m / 36e5, c[e] = m / 6e4, c[n] = m / 1e3, c)[d] || m, f ? y : D.a(y);}, d.daysInMonth = function () {return this.endOf(u).$D;}, d.$locale = function () {return m[this.$L];}, d.locale = function (t, n) {if (!t) return this.$L;var e = this.clone(),r = M(t, n, !0);return r && (e.$L = r), e;}, d.clone = function () {return D.w(this.$d, this);}, d.toDate = function () {return new Date(this.valueOf());}, d.toJSON = function () {return this.isValid() ? this.toISOString() : null;}, d.toISOString = function () {return this.$d.toISOString();}, d.toString = function () {return this.$d.toUTCString();}, c;}();return g.prototype = v.prototype, g.extend = function (t, n) {return t(n, v, g), g;}, g.locale = M, g.isDayjs = y, g.unix = function (t) {return g(1e3 * t);}, g.en = m[l], g.Ls = m, g;});

/***/ }),
/* 10 */
/*!*************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/dayjs/plugin/isSameOrBefore.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function (e, t) { true ? module.exports = t() : undefined;}(this, function () {"use strict";return function (e, t) {t.prototype.isSameOrBefore = function (e, t) {return this.isSame(e, t) || this.isBefore(e, t);};};});

/***/ }),
/* 11 */
/*!************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/dayjs/plugin/isSameOrAfter.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function (e, t) { true ? module.exports = t() : undefined;}(this, function () {"use strict";return function (e, t) {t.prototype.isSameOrAfter = function (e, t) {return this.isSame(e, t) || this.isAfter(e, t);};};});

/***/ }),
/* 12 */
/*!********************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/dayjs/plugin/isBetween.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function (e, t) { true ? module.exports = t() : undefined;}(this, function () {"use strict";return function (e, t, i) {t.prototype.isBetween = function (e, t, s, f) {var n = i(e),o = i(t),r = "(" === (f = f || "()")[0],u = ")" === f[1];return (r ? this.isAfter(n, s) : !this.isBefore(n, s)) && (u ? this.isBefore(o, s) : !this.isAfter(o, s)) || (r ? this.isBefore(n, s) : !this.isAfter(n, s)) && (u ? this.isAfter(o, s) : !this.isBefore(o, s));};};});

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */
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
/* 16 */
/*!***********************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/index.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 17 */
/*!******************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/icon/iconfont.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 18 */
/*!********************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/store/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 19));
var _consts = _interopRequireDefault(__webpack_require__(/*! ./consts.js */ 20));
var _order = _interopRequireDefault(__webpack_require__(/*! ./modules/order.js */ 21));
var _home = _interopRequireDefault(__webpack_require__(/*! ./modules/home.js */ 61));var _mutations;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

_vue.default.use(_vuex.default);var _default =

new _vuex.default.Store({
  state: {
    title: "首页",
    showNavbar: false,
    showNavbarLeft: true,
    showNavbarRight: true,
    navbarColor: "white",
    showTabbar: false,
    tabbarActiveIndex: -1,
    clientHeight: 500,
    groundId: "",
    wxJsApiConfigedPages: [],
    promoterId: "" },

  mutations: (_mutations = {}, _defineProperty(_mutations,
  _consts.default.setTitle, function (state, value) {
    state.title = value;
  }), _defineProperty(_mutations,
  _consts.default.setShowNavbar, function (state, value) {
    state.showNavbar = value;
  }), _defineProperty(_mutations, "setShowNavbarLeft", function setShowNavbarLeft(
  state, value) {
    state.showNavbarLeft = value;
  }), _defineProperty(_mutations, "setShowNavbarRight", function setShowNavbarRight(
  state, value) {
    state.showNavbarRight = value;
  }), _defineProperty(_mutations,
  _consts.default.setNavbarColor, function (state, value) {
    state.navbarColor = value;
  }), _defineProperty(_mutations,
  _consts.default.setShowTabbar, function (state, value) {
    state.showTabbar = value;
  }), _defineProperty(_mutations,
  _consts.default.activeTabbar, function (state, index) {
    state.tabbarActiveIndex = index;
  }), _defineProperty(_mutations, "setClientHeight", function setClientHeight(
  state, value) {
    state.clientHeight = value;
  }), _defineProperty(_mutations, "setGroundId", function setGroundId(
  state, groundId) {
    state.groundId = groundId;
  }), _defineProperty(_mutations, "setPageConfiged", function setPageConfiged(
  state, pageName) {
    if (state.wxJsApiConfigedPages.includes(pageName)) return;
    state.wxJsApiConfigedPages.push(pageName);
  }), _defineProperty(_mutations, "setPromoterId", function setPromoterId(
  state, promoterId) {
    state.promoterId = promoterId;
  }), _mutations),

  modules: {
    homeModule: _home.default,
    orderModule: _order.default } });exports.default = _default;

/***/ }),
/* 19 */
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),
/* 20 */
/*!*********************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/store/consts.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  setTitle: "setTitle",
  setShowNavbar: "setShowNavbar",
  setNavbarColor: "setNavbarColor",
  setShowTabbar: "setShowTabbar",
  activeTabbar: "activeTabbar",
  loadOrderNoticeAsync: "loadOrderNoticeAsync",
  loadOrderOptionsAsync: "loadOrderOptionsAsync" };exports.default = _default;

/***/ }),
/* 21 */
/*!****************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/store/modules/order.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 22));var _consts = _interopRequireDefault(__webpack_require__(/*! ./../consts.js */ 20));
var _orderService = _interopRequireDefault(__webpack_require__(/*! ./../../services/orderService.js */ 25));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =

{
  namespaced: true,
  state: function state() {
    return {
      options: {
        shouldLoad: true,
        dates: undefined,
        disabledWeeks: undefined,
        groupOrderMaxQuantity: 0,
        individualOrderMaxAdultQuantity: 0,
        individualOrderMaxChildrenQuantity: 0,
        perAdultMaxChildrenQuantity: 0 } };


  },
  mutations: {
    setOptions: function setOptions(state, input) {
      state.options = input;
    } },

  actions: _defineProperty({},
  _consts.default.loadOrderOptionsAsync, function (context) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var options;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:if (!
              context.state.options.shouldLoad) {_context.next = 6;break;}_context.next = 3;return (
                _orderService.default.getOrderOptionsAsync());case 3:options = _context.sent;
              options.shouldLoad = false;

              context.commit("setOptions", options);case 6:case "end":return _context.stop();}}}, _callee);}))();

  }) };exports.default = _default;

/***/ }),
/* 22 */
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 23);

/***/ }),
/* 23 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 24);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 24 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 25 */
/*!******************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/services/orderService.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 22));var _ajax = _interopRequireDefault(__webpack_require__(/*! @/utils/ajax.js */ 26));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =

{
  getOrdersAsync: function getOrdersAsync(input) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var response;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                _ajax.default.post("/order/GetOrdersAsync", input));case 2:response = _context.sent;return _context.abrupt("return",
              response.result);case 4:case "end":return _context.stop();}}}, _callee);}))();
  },
  getMemberOrdersForMobileAsync: function getMemberOrdersForMobileAsync(input) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var response;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                _ajax.default.post("/order/GetMemberOrdersForMobileAsync", input));case 2:response = _context2.sent;return _context2.abrupt("return",
              response.result);case 4:case "end":return _context2.stop();}}}, _callee2);}))();
  },
  getMemberOrderForMobileAsync: function getMemberOrderForMobileAsync(listNo) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {var response;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
                _ajax.default.get("/order/GetMemberOrderForMobileAsync?listNo=".concat(listNo)));case 2:response = _context3.sent;return _context3.abrupt("return",
              response.result);case 4:case "end":return _context3.stop();}}}, _callee3);}))();
  },
  getOrderInfoForMobileAsync: function getOrderInfoForMobileAsync(listNo) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var response;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (
                _ajax.default.post("/order/GetOrderFullInfoAsync", {
                  listNo: listNo }));case 2:response = _context4.sent;return _context4.abrupt("return",

              response.result);case 4:case "end":return _context4.stop();}}}, _callee4);}))();
  },
  getRefundApplysWithStatusDetailAsync: function getRefundApplysWithStatusDetailAsync(listNo) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var response;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
                _ajax.default.get("/order/GetRefundApplysWithStatusDetailAsync?listNo=".concat(listNo)));case 2:response = _context5.sent;return _context5.abrupt("return",
              response.result);case 4:case "end":return _context5.stop();}}}, _callee5);}))();
  },
  getOrderOptionsAsync: function getOrderOptionsAsync() {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {var response;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.next = 2;return (
                _ajax.default.get("/order/GetOrderOptionsAsync"));case 2:response = _context6.sent;return _context6.abrupt("return",
              response.result);case 4:case "end":return _context6.stop();}}}, _callee6);}))();
  },
  getOrdersForExplainAsync: function getOrdersForExplainAsync(customerName) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7() {var response;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:_context7.next = 2;return (
                _ajax.default.post("/order/GetOrdersForExplainAsync", {
                  customerName: customerName }));case 2:response = _context7.sent;return _context7.abrupt("return",

              response.result);case 4:case "end":return _context7.stop();}}}, _callee7);}))();
  },
  getGroupOrdersForConsumeAsync: function getGroupOrdersForConsumeAsync(queryText) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee8() {var response;return _regenerator.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:_context8.next = 2;return (
                _ajax.default.post("/order/GetGroupOrdersForConsumeAsync", {
                  queryText: queryText }));case 2:response = _context8.sent;return _context8.abrupt("return",

              response.result);case 4:case "end":return _context8.stop();}}}, _callee8);}))();
  },
  createWeiXinOrderAsync: function createWeiXinOrderAsync(input) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee9() {var response;return _regenerator.default.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:_context9.next = 2;return (
                _ajax.default.post("/order/CreateWeiXinOrderAsync", input));case 2:response = _context9.sent;return _context9.abrupt("return",
              response.result);case 4:case "end":return _context9.stop();}}}, _callee9);}))();
  },
  createIndividualOrderAsync: function createIndividualOrderAsync(input) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee10() {return _regenerator.default.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:_context10.next = 2;return (
                _ajax.default.post("/order/CreateIndividualOrderAsync", input));case 2:return _context10.abrupt("return", _context10.sent);case 3:case "end":return _context10.stop();}}}, _callee10);}))();
  },
  createGroupOrderAsync: function createGroupOrderAsync(input) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee11() {return _regenerator.default.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:_context11.next = 2;return (
                _ajax.default.post("order/CreateGroupOrderAsync", input));case 2:return _context11.abrupt("return", _context11.sent);case 3:case "end":return _context11.stop();}}}, _callee11);}))();
  },
  cancelOrderAsync: function cancelOrderAsync(listNo) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee12() {return _regenerator.default.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:_context12.next = 2;return (
                _ajax.default.post("/order/CancelOrderAsync", {
                  listNo: listNo }));case 2:return _context12.abrupt("return", _context12.sent);case 3:case "end":return _context12.stop();}}}, _callee12);}))();

  },
  applyRefundAsync: function applyRefundAsync(input) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee13() {return _regenerator.default.wrap(function _callee13$(_context13) {while (1) {switch (_context13.prev = _context13.next) {case 0:_context13.next = 2;return (
                _ajax.default.post("/order/ApplyRefundAsync", input));case 2:return _context13.abrupt("return", _context13.sent);case 3:case "end":return _context13.stop();}}}, _callee13);}))();
  },
  consumeOrderFromMobileAsync: function consumeOrderFromMobileAsync(listNo) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee14() {return _regenerator.default.wrap(function _callee14$(_context14) {while (1) {switch (_context14.prev = _context14.next) {case 0:_context14.next = 2;return (
                _ajax.default.post("/order/ConsumeOrderFromMobileAsync", {
                  listNo: listNo }));case 2:return _context14.abrupt("return", _context14.sent);case 3:case "end":return _context14.stop();}}}, _callee14);}))();

  },
  checkOutOrderFromMobileAsync: function checkOutOrderFromMobileAsync(listNo) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee15() {return _regenerator.default.wrap(function _callee15$(_context15) {while (1) {switch (_context15.prev = _context15.next) {case 0:_context15.next = 2;return (
                _ajax.default.post("/order/CheckOutOrderFromMobileAsync", {
                  listNo: listNo }));case 2:return _context15.abrupt("return", _context15.sent);case 3:case "end":return _context15.stop();}}}, _callee15);}))();

  },
  CreateOrderInput: function CreateOrderInput() {
    this.travelDate = "";
    this.adultQuantity = 0;
    this.adults = [];
    this.childrenQuantity = 0;
    this.children = [];
    this.contact = {
      mobile: "" };

  } };exports.default = _default;

/***/ }),
/* 26 */
/*!*******************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/utils/ajax.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ 27));
var _tokenService = _interopRequireDefault(__webpack_require__(/*! ./../services/tokenService */ 55));
var _qs = _interopRequireDefault(__webpack_require__(/*! qs */ 56));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 时间戳
var NewTimeStamp = new Date().getTime();
_axios.default.defaults.timeout = 30000;
// axios.defaults.baseURL = 'https://y1.sz-egoal.cn/';
_axios.default.defaults.baseURL = 'http://192.168.1.64:5000/api';
// axios.defaults.headers.post[ 'Content-Type' ] = 'application/x-www-form-urlencoded;charset=UTF-8';
_axios.default.defaults.adapter = function (config) {
  return new Promise(function (resolve, reject) {
    var data = config.method === 'get' ? config.params : JSON.stringify(config.data);
    var token = _tokenService.default.getToken();
    var header;
    if (token) {
      header = {
        'Authorization': token.token_type + ' ' + token.access_token,
        'Accept-Language': 'zh-CN',
        post: {
          'content-type': 'application/json' } };


    }
    // wx小程序 发起请求相应 log 就可以看到熟悉的返回啦
    wx.request({
      url: config.url,
      method: config.method,
      data: config.data,
      header: header,
      success: function success(res) {
        return resolve(res.data);
      },
      fail: function fail(err) {
        return reject(err);
      } });

  });

};
// axios 拦截器
function Instance() {
  //请求拦截器
  _axios.default.interceptors.request.use(function (request) {
    // request.headers.token = 'token=11124654654687';
    return request;
  }, function (error) {
    return Promise.reject(error);
  });

  // 添加响应拦截器
  _axios.default.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
}

Instance();var _default =
{
  get: function get(url, params) {
    return (0, _axios.default)({
      method: 'get',
      url: url,
      params: params });

  },
  post: function post(url, params) {
    return (0, _axios.default)({
      method: 'post',
      url: url,
      data: params });

  } };exports.default = _default;

/***/ }),
/* 27 */
/*!*********************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ 28);

/***/ }),
/* 28 */
/*!*************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/axios.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ 29);
var bind = __webpack_require__(/*! ./helpers/bind */ 30);
var Axios = __webpack_require__(/*! ./core/Axios */ 32);
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ 51);
var defaults = __webpack_require__(/*! ./defaults */ 38);

/**
                                       * Create an instance of Axios
                                       *
                                       * @param {Object} defaultConfig The default config for the instance
                                       * @return {Axios} A new instance of Axios
                                       */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ 52);
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ 53);
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ 37);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ 54);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

/***/ }),
/* 29 */
/*!*************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/utils.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ 30);
var isBuffer = __webpack_require__(/*! is-buffer */ 31);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
                                           * Determine if a value is an Array
                                           *
                                           * @param {Object} val The value to test
                                           * @returns {boolean} True if value is an Array, otherwise false
                                           */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
   * Determine if a value is an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
   */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
   * Determine if a value is a FormData
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an FormData, otherwise false
   */
function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

/**
   * Determine if a value is a view on an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
   */
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }
  return result;
}

/**
   * Determine if a value is a String
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a String, otherwise false
   */
function isString(val) {
  return typeof val === 'string';
}

/**
   * Determine if a value is a Number
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Number, otherwise false
   */
function isNumber(val) {
  return typeof val === 'number';
}

/**
   * Determine if a value is undefined
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if the value is undefined, otherwise false
   */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
   * Determine if a value is a Date
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
   * Determine if a value is a File
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a File, otherwise false
   */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
   * Determine if a value is a Blob
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Blob, otherwise false
   */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
   * Determine if a value is a Function
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
   * Determine if a value is a Stream
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Stream, otherwise false
   */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   * @returns {String} The String freed of excess whitespace
   */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   * nativescript
   *  navigator.product -> 'NativeScript' or 'NS'
   */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
  navigator.product === 'NativeScript' ||
  navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined');

}

/**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * var result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
function merge() /* obj1, obj2, obj3, ... */{
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
   * Function equal to merge with the difference being that no reference
   * to original objects is kept.
   *
   * @see merge
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
function deepMerge() /* obj1, obj2, obj3, ... */{
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
   * Extends object a by mutably adding to it the properties of object b.
   *
   * @param {Object} a The object to be extended
   * @param {Object} b The object to copy properties from
   * @param {Object} thisArg The object to bind function to
   * @return {Object} The resulting value of object a
   */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim };

/***/ }),
/* 30 */
/*!********************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/helpers/bind.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

/***/ }),
/* 31 */
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 32 */
/*!******************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/core/Axios.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 29);
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ 33);
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ 34);
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ 35);
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ 51);

/**
                                             * Create a new instance of Axios
                                             *
                                             * @param {Object} instanceConfig The default config for the instance
                                             */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager() };

}

/**
   * Dispatch a request
   *
   * @param {Object} config The config specific for this request (merged with this.defaults)
   */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url }));

  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data }));

  };
});

module.exports = Axios;

/***/ }),
/* 33 */
/*!************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/helpers/buildURL.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 29);

function encode(val) {
  return encodeURIComponent(val).
  replace(/%40/gi, '@').
  replace(/%3A/gi, ':').
  replace(/%24/g, '$').
  replace(/%2C/gi, ',').
  replace(/%20/g, '+').
  replace(/%5B/gi, '[').
  replace(/%5D/gi, ']');
}

/**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

/***/ }),
/* 34 */
/*!*******************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/core/InterceptorManager.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 29);

function InterceptorManager() {
  this.handlers = [];
}

/**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected });

  return this.handlers.length - 1;
};

/**
    * Remove an interceptor from the stack
    *
    * @param {Number} id The ID that was returned by `use`
    */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
    * Iterate over all the registered interceptors
    *
    * This method is particularly useful for skipping over any
    * interceptors that may have become `null` calling `eject`.
    *
    * @param {Function} fn The function to call for each interceptor
    */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

/***/ }),
/* 35 */
/*!****************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/core/dispatchRequest.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 29);
var transformData = __webpack_require__(/*! ./transformData */ 36);
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ 37);
var defaults = __webpack_require__(/*! ../defaults */ 38);
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ 49);
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ 50);

/**
                                                        * Throws a `Cancel` if cancellation has been requested.
                                                        */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   * @returns {Promise} The Promise to be fulfilled
   */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
  config.data,
  config.headers,
  config.transformRequest);


  // Flatten headers
  config.headers = utils.merge(
  config.headers.common || {},
  config.headers[config.method] || {},
  config.headers || {});


  utils.forEach(
  ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
  function cleanHeaderConfig(method) {
    delete config.headers[method];
  });


  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
    response.data,
    response.headers,
    config.transformResponse);


    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
        reason.response.data,
        reason.response.headers,
        config.transformResponse);

      }
    }

    return Promise.reject(reason);
  });
};

/***/ }),
/* 36 */
/*!**************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/core/transformData.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 29);

/**
                                    * Transform the data for a request or a response
                                    *
                                    * @param {Object|String} data The data to be transformed
                                    * @param {Array} headers The headers for the request or response
                                    * @param {Array|Function} fns A single function or Array of functions
                                    * @returns {*} The resulting transformed data
                                    */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

/***/ }),
/* 37 */
/*!***********************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/cancel/isCancel.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/***/ }),
/* 38 */
/*!****************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/defaults.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ 29);
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ 41);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded' };


function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ 42);
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ 42);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
    utils.isArrayBuffer(data) ||
    utils.isBuffer(data) ||
    utils.isStream(data) ||
    utils.isFile(data) ||
    utils.isBlob(data))
    {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {/* Ignore */}
    }
    return data;
  }],

  /**
       * A timeout in milliseconds to abort a request. If set to 0 (default) a
       * timeout is not created.
       */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  } };


defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*' } };



utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../Software/HBuilderX/plugins/uniapp-cli/node_modules/node-libs-browser/mock/process.js */ 39)))

/***/ }),
/* 39 */
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 40);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),
/* 40 */
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 39)))

/***/ }),
/* 41 */
/*!***********************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ 29);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/***/ }),
/* 42 */
/*!********************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/adapters/xhr.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 29);
var settle = __webpack_require__(/*! ./../core/settle */ 43);
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ 33);
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ 46);
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ 47);
var createError = __webpack_require__(/*! ../core/createError */ 44);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request };


      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
      request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ 48);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
      cookies.read(config.xsrfCookieName) :
      undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/***/ }),
/* 43 */
/*!*******************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/core/settle.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ 44);

/**
                                             * Resolve or reject a Promise based on response status.
                                             *
                                             * @param {Function} resolve A function that resolves the promise.
                                             * @param {Function} reject A function that rejects the promise.
                                             * @param {object} response The response.
                                             */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
    'Request failed with status code ' + response.status,
    response.config,
    null,
    response.request,
    response));

  }
};

/***/ }),
/* 44 */
/*!************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/core/createError.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ 45);

/**
                                               * Create an Error with the specified message, config, error code, request and response.
                                               *
                                               * @param {string} message The error message.
                                               * @param {Object} config The config.
                                               * @param {string} [code] The error code (for example, 'ECONNABORTED').
                                               * @param {Object} [request] The request.
                                               * @param {Object} [response] The response.
                                               * @returns {Error} The created error.
                                               */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/***/ }),
/* 45 */
/*!*************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/core/enhanceError.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Update an Error with the specified config, error code, and response.
               *
               * @param {Error} error The error to update.
               * @param {Object} config The config.
               * @param {string} [code] The error code (for example, 'ECONNABORTED').
               * @param {Object} [request] The request.
               * @param {Object} [response] The response.
               * @returns {Error} The error.
               */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function () {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code };

  };
  return error;
};

/***/ }),
/* 46 */
/*!****************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/helpers/parseHeaders.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 29);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
'age', 'authorization', 'content-length', 'content-type', 'etag',
'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
'last-modified', 'location', 'max-forwards', 'proxy-authorization',
'referer', 'retry-after', 'user-agent'];


/**
                                          * Parse headers into an object
                                          *
                                          * ```
                                          * Date: Wed, 27 Aug 2014 08:58:49 GMT
                                          * Content-Type: application/json
                                          * Connection: keep-alive
                                          * Transfer-Encoding: chunked
                                          * ```
                                          *
                                          * @param {String} headers Headers needing to be parsed
                                          * @returns {Object} Headers parsed into an object
                                          */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {return parsed;}

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

/***/ }),
/* 47 */
/*!*******************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 29);

module.exports =
utils.isStandardBrowserEnv() ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;

  /**
                 * Parse a URL to discover it's components
                 *
                 * @param {String} url The URL to be parsed
                 * @returns {Object}
                 */
  function resolveURL(url) {
    var href = url;

    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href);

    // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ?
      urlParsingNode.pathname :
      '/' + urlParsingNode.pathname };

  }

  originURL = resolveURL(window.location.href);

  /**
                                                * Determine if a URL shares the same origin as the current location
                                                *
                                                * @param {String} requestURL The URL to test
                                                * @returns {boolean} True if URL shares the same origin, otherwise false
                                                */
  return function isURLSameOrigin(requestURL) {
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol &&
    parsed.host === originURL.host;
  };
}() :

// Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

/***/ }),
/* 48 */
/*!***********************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/helpers/cookies.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ 29);

module.exports =
utils.isStandardBrowserEnv() ?

// Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },

    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },

    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    } };

}() :

// Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {return null;},
    remove: function remove() {} };

}();

/***/ }),
/* 49 */
/*!*****************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Determines whether the specified URL is absolute
               *
               * @param {string} url The URL to test
               * @returns {boolean} True if the specified URL is absolute, otherwise false
               */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/***/ }),
/* 50 */
/*!***************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/helpers/combineURLs.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Creates a new URL by combining the specified URLs
               *
               * @param {string} baseURL The base URL
               * @param {string} relativeURL The relative URL
               * @returns {string} The combined URL
               */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL ?
  baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') :
  baseURL;
};

/***/ }),
/* 51 */
/*!************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/core/mergeConfig.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ 29);

/**
                                  * Config-specific merge-function which creates a new config-object
                                  * by merging two configuration objects together.
                                  *
                                  * @param {Object} config1
                                  * @param {Object} config2
                                  * @returns {Object} New object resulting from merging config2 to config1
                                  */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach([
  'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
  'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
  'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
  'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
  'socketPath'],
  function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};

/***/ }),
/* 52 */
/*!*********************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/cancel/Cancel.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * A `Cancel` is an object that is thrown when an operation is canceled.
               *
               * @class
               * @param {string=} message The message.
               */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

/***/ }),
/* 53 */
/*!**************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/cancel/CancelToken.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ 52);

/**
                                   * A `CancelToken` is an object that can be used to request cancellation of an operation.
                                   *
                                   * @class
                                   * @param {Function} executor The executor function.
                                   */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
   * Throws a `Cancel` if cancellation has been requested.
   */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
    * Returns an object that contains a new `CancelToken` and a function that, when called,
    * cancels the `CancelToken`.
    */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel };

};

module.exports = CancelToken;

/***/ }),
/* 54 */
/*!**********************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/axios/lib/helpers/spread.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Syntactic sugar for invoking a function and expanding an array for arguments.
               *
               * Common use case would be to use `Function.prototype.apply`.
               *
               *  ```js
               *  function f(x, y, z) {}
               *  var args = [1, 2, 3];
               *  f.apply(null, args);
               *  ```
               *
               * With `spread` this example can be re-written.
               *
               *  ```js
               *  spread(function(x, y, z) {})([1, 2, 3]);
               *  ```
               *
               * @param {Function} callback
               * @returns {Function}
               */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/***/ }),
/* 55 */
/*!******************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/services/tokenService.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  getToken: function getToken() {
    var token = uni.getStorageSync("access_token");
    if (token) {
      return JSON.parse(token);
    }
    return null;
  },
  setToken: function setToken(value) {
    uni.setStorageSync("access_token", value);
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 56 */
/*!**************************************!*\
  !*** ./node_modules/qs/lib/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(/*! ./stringify */ 57);
var parse = __webpack_require__(/*! ./parse */ 60);
var formats = __webpack_require__(/*! ./formats */ 59);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),
/* 57 */
/*!******************************************!*\
  !*** ./node_modules/qs/lib/stringify.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ 58);
var formats = __webpack_require__(/*! ./formats */ 59);

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts ? utils.assign({}, opts) : {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats['default'];
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly
        ));
    }

    var joined = keys.join(delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),
/* 58 */
/*!**************************************!*\
  !*** ./node_modules/qs/lib/utils.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    var obj;

    while (queue.length) {
        var item = queue.pop();
        obj = item.obj[item.prop];

        if (Array.isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }

    return obj;
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

var encode = function encode(str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    return compactQueue(queue);
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    merge: merge
};


/***/ }),
/* 59 */
/*!****************************************!*\
  !*** ./node_modules/qs/lib/formats.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),
/* 60 */
/*!**************************************!*\
  !*** ./node_modules/qs/lib/parse.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ 58);

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder);
            val = options.decoder(part.slice(pos + 1), defaults.decoder);
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]') {
            obj = [];
            obj = obj.concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts ? utils.assign({}, opts) : {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),
/* 61 */
/*!***************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/store/modules/home.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 22));var _settingService = _interopRequireDefault(__webpack_require__(/*! ./../../services/settingService.js */ 62));
var _consts = _interopRequireDefault(__webpack_require__(/*! ./../consts.js */ 20));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =

{
  namespaced: true,
  state: function state() {
    return {
      notice: {
        scenicName: "",
        timeNotice: "",
        orderNotice: "",
        contactNotice: "",
        shouldLoad: true } };


  },
  mutations: {
    setNotice: function setNotice(state, notice) {
      state.notice = notice;
    } },

  actions: _defineProperty({},
  _consts.default.loadOrderNoticeAsync, function (context) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var notice;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:if (!
              context.state.notice.shouldLoad) {_context.next = 6;break;}_context.next = 3;return (
                _settingService.default.getOrderNoticeAsync());case 3:notice = _context.sent;
              notice.shouldLoad = false;

              context.commit("setNotice", notice);case 6:case "end":return _context.stop();}}}, _callee);}))();

  }) };exports.default = _default;

/***/ }),
/* 62 */
/*!********************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/services/settingService.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 22));var _ajax = _interopRequireDefault(__webpack_require__(/*! @/utils/ajax.js */ 26));
var _weiXinJsSdkHelper = _interopRequireDefault(__webpack_require__(/*! ./../utils/weiXinJsSdkHelper.js */ 63));
var _index = _interopRequireDefault(__webpack_require__(/*! ./../store/index.js */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =

{
  getOrderNoticeAsync: function getOrderNoticeAsync() {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var response;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                _ajax.default.get("setting/GetOrderNoticeAsync"));case 2:response = _context.sent;return _context.abrupt("return",
              response.result);case 4:case "end":return _context.stop();}}}, _callee);}))();
  },
  getOptionsAsync: function getOptionsAsync() {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var options;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
              options = uni.getStorageSync("options");if (!
              options) {_context2.next = 3;break;}return _context2.abrupt("return",
              JSON.parse(options));case 3:_context2.next = 5;return (

                _this.getSettingsFromWeChatAsync());case 5:return _context2.abrupt("return", _context2.sent);case 6:case "end":return _context2.stop();}}}, _callee2);}))();
  },
  getSettingsFromWeChatAsync: function getSettingsFromWeChatAsync() {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {var response;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
                _ajax.default.get("/setting/GetSettingsFromWeChatAsync"));case 2:response = _context3.sent;
              uni.setStorageSync("options", JSON.stringify(response.result));return _context3.abrupt("return",
              response.result);case 5:case "end":return _context3.stop();}}}, _callee3);}))();
  },
  configWxJsApi: function configWxJsApi() {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var url, signature;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
              url = location.href.split("#")[0];if (!

              _index.default.state.wxJsApiConfigedPages.includes(url)) {_context4.next = 3;break;}return _context4.abrupt("return");case 3:_context4.next = 5;return (

                _this2.getWxJsApiSignatureAsync(encodeURIComponent(url)));case 5:signature = _context4.sent;_context4.next = 8;return (
                _weiXinJsSdkHelper.default.config(signature, [
                "scanQRCode",
                "onMenuShareAppMessage",
                "updateAppMessageShareData",
                "onMenuShareTimeline",
                "updateTimelineShareData",
                "chooseImage",
                "getLocalImgData"]));case 8:


              _index.default.commit("setPageConfiged", url);case 9:case "end":return _context4.stop();}}}, _callee4);}))();
  },
  configWxShareUrl: function configWxShareUrl(url, imgUrl) {
    var title = "微信购票";
    _weiXinJsSdkHelper.default.updateAppMessageShareData(title, url, imgUrl);
    _weiXinJsSdkHelper.default.updateTimelineShareData(title, url, imgUrl);
  },
  getWxJsApiSignatureAsync: function getWxJsApiSignatureAsync(url) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var response;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
                _ajax.default.get("setting/GetWxJsApiSignature?url=".concat(url)));case 2:response = _context5.sent;return _context5.abrupt("return",
              response.result);case 4:case "end":return _context5.stop();}}}, _callee5);}))();
  },
  getWxLoginUrl: function getWxLoginUrl(url) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {var response;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.next = 2;return (
                _ajax.default.get("setting/GetWxLoginUrl?url=".concat(encodeURIComponent(url))));case 2:response = _context6.sent;return _context6.abrupt("return",
              response.result);case 4:case "end":return _context6.stop();}}}, _callee6);}))();
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 63 */
/*!********************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/utils/weiXinJsSdkHelper.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  jsApiPay: function jsApiPay(args) {
    if (typeof args == "string") {
      args = JSON.parse(args);
    }

    return new Promise(function (resolve, reject) {
      window.WeixinJSBridge.invoke("getBrandWCPayRequest", args, function (res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  },
  config: function config(signature, jsApiList) {
    return new Promise(function (resolve, reject) {
      window.wx.config({
        debug: "development" == "development",
        appId: signature.appId,
        timestamp: signature.timestamp,
        nonceStr: signature.nonceStr,
        signature: signature.signature,
        jsApiList: jsApiList });


      window.wx.ready(function () {return resolve();});

      window.wx.error(function (res) {return reject(res.errMsg);});
    });
  },
  scanQRCode: function scanQRCode() {
    return new Promise(function (resolve, reject) {
      window.wx.scanQRCode({
        needResult: 1,
        scanType: ["qrCode", "barCode"],
        success: function success(res) {return resolve(res.resultStr);},
        fail: function fail(res) {return reject(res.errMsg);},
        cancel: function cancel() {return reject("cancel");} });

    });
  },
  updateAppMessageShareData: function updateAppMessageShareData(title, url, imgUrl) {
    return new Promise(function (resolve) {
      if (window.wx.updateAppMessageShareData) {
        window.wx.updateAppMessageShareData({
          title: title,
          desc: title,
          link: url,
          imgUrl: imgUrl,
          success: function success() {return resolve();} });

      } else {
        window.wx.onMenuShareAppMessage({
          title: title,
          desc: title,
          link: url,
          imgUrl: imgUrl,
          type: "",
          dataUrl: "",
          success: function success() {return resolve();} });

      }
    });
  },
  updateTimelineShareData: function updateTimelineShareData(title, url, imgUrl) {
    return new Promise(function (resolve) {
      if (window.wx.updateTimelineShareData) {
        window.wx.updateTimelineShareData({
          title: title,
          link: url,
          imgUrl: imgUrl,
          success: function success() {return resolve();} });

      } else {
        window.wx.onMenuShareTimeline({
          title: title,
          link: url,
          imgUrl: imgUrl,
          success: function success() {return resolve();} });

      }
    });
  },
  chooseImage: function chooseImage() {
    return new Promise(function (resolve, reject) {
      window.wx.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["camera"],
        success: function success(res) {
          var localId = res.localIds[0];
          resolve(localId);
        },
        fail: function fail(error) {
          reject(error);
        },
        cancel: function cancel() {
          reject("cancel");
        } });

    });
  },
  getLocalImgData: function getLocalImgData(localId) {
    return new Promise(function (resolve, reject) {
      window.wx.getLocalImgData({
        localId: localId,
        success: function success(res) {
          if (res.localData.substr(0, 5) == "data:") {
            resolve(res.localData.replace("jgp", "jpeg"));
          } else {
            resolve("data:image/jpeg;base64,".concat(res.localData));
          }
        },
        fail: function fail(error) {
          reject(error);
        } });

    });
  } };exports.default = _default;

/***/ }),
/* 64 */
/*!**************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/utils/httpRequest.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 常用方法封装 请求，文件上传等
                                                                                                      * @author echo. 
                                                                                                      **/

var tui = {
  //接口地址
  interfaceUrl: function interfaceUrl() {
    return 'https://www.thorui.cn';
    //return 'https://test.thorui.cn'
    //return 'https://uat.thorui.cn'
    // return 'https://prod.thorui.cn'
  },
  toast: function toast(text, duration, success) {
    uni.showToast({
      title: text || "出错啦~",
      icon: success ? 'success' : 'none',
      duration: duration || 2000 });

  },
  modal: function modal(title, content, showCancel, callback, confirmColor, confirmText) {
    uni.showModal({
      title: '提示',
      content: content,
      showCancel: showCancel,
      cancelColor: "#555",
      confirmColor: confirmColor || "#5677fc",
      confirmText: confirmText || "确定",
      success: function success(res) {
        if (res.confirm) {
          callback && callback(true);
        } else {
          callback && callback(false);
        }
      } });

  },
  isAndroid: function isAndroid() {
    var res = uni.getSystemInfoSync();
    return res.platform.toLocaleLowerCase() == "android";
  },
  isPhoneX: function isPhoneX() {
    var res = uni.getSystemInfoSync();
    var iphonex = false;
    var models = ['iphonex', 'iphonexr', 'iphonexsmax', 'iphone11', 'iphone11pro', 'iphone11promax'];
    var model = res.model.replace(/\s/g, "").toLowerCase();
    if (models.includes(model)) {
      iphonex = true;
    }
    return iphonex;
  },
  constNum: function constNum() {
    var time = 0;



    return time;
  },
  delayed: null,
  /**
                  * 请求数据处理
                  * @param string url 请求地址
                  * @param string method 请求方式
                  *  GET or POST
                  * @param {*} postData 请求参数
                  * @param bool isDelay 是否延迟显示loading
                  * @param bool isForm 数据格式
                  *  true: 'application/x-www-form-urlencoded'
                  *  false:'application/json'
                  * @param bool hideLoading 是否隐藏loading
                  *  true: 隐藏
                  *  false:显示
                  */
  request: function request(url, method, postData, isDelay, isForm, hideLoading) {
    //接口请求
    var loadding = false;
    tui.delayed && uni.hideLoading();
    clearTimeout(tui.delayed);
    tui.delayed = null;
    if (!hideLoading) {
      tui.delayed = setTimeout(function () {
        uni.showLoading({
          mask: true,
          title: '请稍候...',
          success: function success(res) {
            loadding = true;
          } });

      }, isDelay ? 1000 : 0);
    }

    return new Promise(function (resolve, reject) {
      uni.request({
        url: tui.interfaceUrl() + url,
        data: postData,
        header: {
          'content-type': isForm ? 'application/x-www-form-urlencoded' : 'application/json',
          'Authorization': tui.getToken() },

        method: method, //'GET','POST'
        dataType: 'json',
        success: function success(res) {
          clearTimeout(tui.delayed);
          tui.delayed = null;
          if (loadding && !hideLoading) {
            uni.hideLoading();
          }
          // if (res.data && res.data.code == 1) {
          // 	uni.clearStorageSync()
          // 	tui.modal("登录信息已失效，请重新登录", false, () => {
          // 		//store.commit("logout") 登录页面执行
          // 		uni.redirectTo({
          // 			url: '/pages/common/login/login'
          // 		})
          // 	})
          // 	return
          // }
          resolve(res.data);
        },
        fail: function fail(res) {
          clearTimeout(tui.delayed);
          tui.delayed = null;
          tui.toast("网络不给力，请稍后再试~");
          reject(res);
        } });

    });
  },
  /**
      * 上传文件
      * @param string url 请求地址
      * @param string src 文件路径
      */
  uploadFile: function uploadFile(url, src) {
    uni.showLoading({
      title: '请稍候...' });

    return new Promise(function (resolve, reject) {
      var uploadTask = uni.uploadFile({
        url: tui.interfaceUrl() + url,
        filePath: src,
        name: 'imageFile',
        header: {
          'Authorization': tui.getToken() },

        formData: {
          // sizeArrayText:""
        },
        success: function success(res) {
          uni.hideLoading();
          var d = JSON.parse(res.data.replace(/\ufeff/g, "") || "{}");
          if (d.code % 100 == 0) {
            //返回图片地址
            var fileObj = d.data;
            resolve(fileObj);
          } else {
            that.toast(res.msg);
          }
        },
        fail: function fail(res) {
          reject(res);
          that.toast(res.msg);
        } });

    });
  },
  tuiJsonp: function tuiJsonp(url, callback, callbackname) {








  },
  //设置用户信息
  setUserInfo: function setUserInfo(mobile, token) {
    //uni.setStorageSync("thorui_token", token)
    uni.setStorageSync("thorui_mobile", mobile);
  },
  //获取token
  getToken: function getToken() {
    return uni.getStorageSync("thorui_token");
  },
  //判断是否登录
  isLogin: function isLogin() {
    return uni.getStorageSync("thorui_mobile") ? true : false;
  },
  //跳转页面，校验登录状态
  href: function href(url, isVerify) {
    if (isVerify && !tui.isLogin()) {
      uni.navigateTo({
        url: '/pages/common/login/login' });

    } else {
      uni.navigateTo({
        url: url });

    }
  } };var _default =


tui;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 65 */
/*!*********************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/router/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _modules = _interopRequireDefault(__webpack_require__(/*! ./modules */ 66));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _uniSimpleRouter = _interopRequireDefault(__webpack_require__(/*! uni-simple-router */ 73));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

_vue.default.use(_uniSimpleRouter.default);
//初始化
var router = new _uniSimpleRouter.default({
  routes: _toConsumableArray(_modules.default) //路由表
});

//全局路由前置守卫
router.beforeEach(function (to, from, next) {
  console.log(to);
  console.log(from);
  if (!to.name) {
    router.push({
      name: 'index' });

  }
  next();
});
// 全局路由后置守卫
router.afterEach(function (to, from) {
});var _default =
router;exports.default = _default;

/***/ }),
/* 66 */
/*!*****************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/router/modules/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;} // router/modules/index.js
var files = __webpack_require__(67);
var modules = [];

files.keys().forEach(function (key) {
  if (key === './index.js') return;
  var item = files(key).default;
  modules.push.apply(modules, _toConsumableArray(item));
});var _default =

modules;exports.default = _default;

/***/ }),
/* 67 */
/*!********************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/router/modules sync nonrecursive \.js$ ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./home.js": 68,
	"./index.js": 66,
	"./member.js": 69,
	"./order.js": 70,
	"./payment.js": 71,
	"./ticket.js": 72
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 67;

/***/ }),
/* 68 */
/*!****************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/router/modules/home.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // router/modules/member.js
var home = [
{
  //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
  path: '/pages/index/index',
  aliasPath: '/', //对于h5端你必须在首页加上aliasPath并设置为/
  name: 'index',
  meta: {
    title: '首页' } }];var _default =



home;exports.default = _default;

/***/ }),
/* 69 */
/*!******************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/router/modules/member.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // router/modules/member.js
var member = [{
  //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
  path: '/pages/member/login',
  name: 'login',
  meta: {
    title: '登录' } },

{
  path: '/pages/member/course-search',
  name: 'course-search',
  meta: {
    title: '课程查询' } },

{
  path: '/pages/member/enroll-face',
  name: 'enroll-face',
  meta: {
    title: '登记人脸' } },

{
  path: '/pages/member/member-center',
  name: 'member-center',
  meta: {
    title: '我的' } },

{
  path: '/pages/member/message-list',
  name: 'message-list',
  meta: {
    title: '消息列表' } },

{
  path: '/pages/member/my-integral',
  name: 'my-integral',
  meta: {
    title: '我的积分' } },

{
  path: '/pages/member/my-ticket',
  name: 'my-ticket',
  meta: {
    title: '我的门票' } }];var _default =


member;exports.default = _default;

/***/ }),
/* 70 */
/*!*****************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/router/modules/order.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var order = [{
  path: '/pages/order/order',
  name: 'order',
  meta: {
    title: '订单' } },

{
  path: '/pages/order/order-detail',
  name: 'order-detail',
  meta: {
    title: '订单详情' } },

{
  path: '/pages/order/refund-detail',
  name: 'refund-detail',
  meta: {
    title: '退款详情' } },

{
  path: '/pages/order/refund-ticket',
  name: 'refund-ticket',
  meta: {
    title: '退款申请' } }];var _default =



order;exports.default = _default;

/***/ }),
/* 71 */
/*!*******************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/router/modules/payment.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var payment = [{
  path: '/pages/payment/wx-js-pay',
  name: 'wx-js-pay',
  meta: {
    title: '微信支付' } }];var _default =



payment;exports.default = _default;

/***/ }),
/* 72 */
/*!******************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/router/modules/ticket.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var ticket = [{
  path: '/pages/ticket/buy-ticket',
  name: 'buy-ticket',
  meta: {
    title: '购买选项' } },

{
  path: '/pages/ticket/ticket-type',
  name: 'ticket-type',
  meta: {
    title: '商品列表' } }];var _default =



ticket;exports.default = _default;

/***/ }),
/* 73 */
/*!*********************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/index.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.RouterMount = exports.default = void 0;var _util = __webpack_require__(/*! ./helpers/util */ 74);
var _navJump = _interopRequireDefault(__webpack_require__(/*! ./helpers/navJump */ 78));
var _util2 = __webpack_require__(/*! ./vueRouter/util */ 87);
var _util3 = __webpack_require__(/*! ./appRouter/util */ 80);
var _util4 = __webpack_require__(/*! ./appletsRouter/util */ 83);
var _config = __webpack_require__(/*! ./helpers/config */ 75);
var _warn = __webpack_require__(/*! ./helpers/warn */ 77);
var _hooks = __webpack_require__(/*! ./lifeCycle/hooks */ 91);
var _base = __webpack_require__(/*! ./vueRouter/base */ 76);
var _appletsPatch = _interopRequireDefault(__webpack_require__(/*! ./patch/applets-patch */ 92));
var _appPatch = _interopRequireDefault(__webpack_require__(/*! ./patch/app-patch */ 93));
var _mixins = _interopRequireDefault(__webpack_require__(/*! ./helpers/mixins */ 94));
var _urlQuery = _interopRequireDefault(__webpack_require__(/*! ./helpers/urlQuery */ 98));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}




var H5PATCH = null;




var parseQuery = new _urlQuery.default();

_config.Global.H5RouterReady = new Promise(function (resolve) {return _config.Global.RouterReadyPromise = resolve;});var

Router = /*#__PURE__*/function () {
  function Router(arg) {_classCallCheck(this, Router);
    Router.$root = this;
    _config.Global.Router = this; // 全局缓存一个对象，不必使用时都传递
    _config.Global.$parseQuery = parseQuery;
    this.CONFIG = (0, _util.formatConfig)(arg);
    this.lifeCycle = _config.lifeCycle;
    _hooks.registerRouterHooks.call(this); // 注册全局Router生命钩子
    if ((0, _util.appPlatform)() === 'H5') {
      H5PATCH.setLoadingStatus(this.CONFIG.h5);
    }
  }_createClass(Router, [{ key: "push",




























    /** 动态的导航到一个新 URL 保留浏览历史
                                        * navigateTo
                                        * @param {Object} rule
                                        */value: function push(
    rule) {
      _navJump.default.call(this, rule, 'push');
    }

    /** 动态的导航到一个新 URL 关闭当前页面，跳转到的某个页面。
      * redirectTo
      * @param {Object} rule
      */ }, { key: "replace", value: function replace(
    rule) {
      _navJump.default.call(this, rule, 'replace');
    }

    /** 动态的导航到一个新 URL 关闭所有页面，打开到应用内的某个页面
      * 	reLaunch
      * @param {Object} rule
      */ }, { key: "replaceAll", value: function replaceAll(
    rule) {
      _navJump.default.call(this, rule, 'replaceAll');
    }

    /** 动态的导航到一个新 url 关闭所有页面，打开到应用内的某个tab
      * @param {Object} rule
      */ }, { key: "pushTab", value: function pushTab(
    rule) {
      _navJump.default.call(this, rule, 'pushTab');
    }

    /**
      * 返回到指定层级页面上
       * @param {Number} backLayer 需要返回的页面层级 默认 1
       * @param {Object} delta 暂时无用
       * @param {enforce} 是否强制越过跳转加锁检查 默认 false
      */ }, { key: "back", value: function back()
    {var backLayer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;var delta = arguments.length > 1 ? arguments[1] : undefined;var enforce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (backLayer.constructor != Number) {
        return (0, _warn.err)("\u8FD4\u56DE\u5C42\u7EA7\u53C2\u6570\u5FC5\u987B\u662F\u4E00\u4E2ANumber\u7C7B\u578B\u4E14\u5FC5\u987B\u5927\u4E8E1\uFF1A".concat(
        backLayer));

      }
      _navJump.default.call(this, {
        backLayer: backLayer, delta: delta, H5PATCH: H5PATCH },
      'back', true, enforce);
    }

    /**
      * 获取当前页面下的 Route 信息
      *
      * @param {Object} Vim 当前开发者可以传递一个 vue 组件对象 来获取当前下的 Route 信息
      */ }, { key: "getPageRoute", value: function getPageRoute(
    Vim) {
      var pages = getCurrentPages();
      switch ((0, _util.appPlatform)(true)) {
        case 'H5':
          return _util2.H5GetPageRoute.call(this, pages, Vim);
        case 'APP':
          return (0, _util3.APPGetPageRoute)(pages, Vim);
        case 'APPLETS':
          return (0, _util4.AppletsPageRoute)(pages, Vim);
        default:
          break;}

    } }, { key: "beforeEach", value: function beforeEach(

    fn) {
      return (0, _hooks.registerHook)(this.lifeCycle.beforeHooks, fn);
    } }, { key: "afterEach", value: function afterEach(

    fn) {
      return (0, _hooks.registerHook)(this.lifeCycle.afterHooks, fn);
    } }, { key: "$Route", get: function get() {return this.getPageRoute();} /**
                                                                             * 获取 url 参数帮助类实例
                                                                             */ }, { key: "$parseQuery", get: function get() {return _config.Global.$parseQuery;} /**
                                                                                                                                                                   * 获取当前是否处于正在跳转的状态
                                                                                                                                                                   * H5 状态下始终为false
                                                                                                                                                                   */ }, { key: "$lockStatus", get: function get() {return _config.Global.LockStatus;} /**
                                                                                                                                                                                                                                                        * 动态设置拦截状态
                                                                                                                                                                                                                                                        */, set: function set(status) {(0, _warn.warn)('你确定要这么做？你知道后果？', true);_config.Global.LockStatus = status;} }]);return Router;}();Router.install = function (Vue) {(0, _mixins.default)(Vue, Router);Object.defineProperty(Vue.prototype, '$Router', { get: function get() {return Router.$root;
    } });

  Object.defineProperty(Vue.prototype, '$Route', {
    get: function get() {
      return Router.$root.getPageRoute(this);
    } });

};var _default =
Router;
/**
         *
         * @param {VueComponent } Vim vue实例对象
         * @param {dom} el	dom节点选择器
         */exports.default = _default;
var RouterMount = function RouterMount(Vim, el) {
  switch ((0, _util.appPlatform)(true)) {
    case 'APP':
      (0, _appPatch.default)(Vim, el);
      break;
    case 'APPLETS':
      (0, _appletsPatch.default)(Vim, el);
      break;
    case 'H5':
      _base.vueMount.push({ Vim: Vim, el: el });
      break;
    default:
      (0, _warn.warn)('糟糕！！！还有其他的执行环境？？？没听说过啊。一脸懵逼？？？加QQ群问问：769241495');
      break;}

};exports.RouterMount = RouterMount;

/***/ }),
/* 74 */
/*!****************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/helpers/util.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.copyObject = exports.formatURLQuery = exports.resolveRule = exports.exactRule = exports.parseQuery = exports.parseQueryD = exports.parseQueryN = exports.filter = exports.formatConfig = exports.noop = exports.appPlatform = exports.isObject = exports.isH5 = void 0;var _config = __webpack_require__(/*! ./config */ 75);
var _base = __webpack_require__(/*! ../vueRouter/base */ 76);
var _warn = __webpack_require__(/*! ./warn */ 77);function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * 当前是不是H5运行环境
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */
var isH5 = function isH5() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
};
/**
    * 判断当前变量是否为Object
    * @param {Object} strObj
    */exports.isH5 = isH5;
var isObject = function isObject(strObj) {
  return strObj.toString() === '[object Object]' && strObj.constructor === Object;
};
/**
    * 获取当前运行平台
    * @param {Boolean} applets 默认false  true时所有小程序平台统一返回 APPLETS
    */exports.isObject = isObject;
var appPlatform = function appPlatform() {var applets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var platform = '';


























  platform = 'WEIXIN';






  if (applets) {

    platform = 'APPLETS';

  }

  return platform;
};
/**
    * 定义一个空方法 如果最后一个参数为true则打印所有参数
    * @param  {...any} args
    */exports.appPlatform = appPlatform;
var noop = function noop() {for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}
  if (args[args.length - 1] === true) {
    (0, _warn.log)(args);
  }
};
/**
    * 格式化基础配置信息 通过new Router传递过来的参数
    */exports.noop = noop;
var formatConfig = function formatConfig(userConfig) {
  if (!userConfig.routes || userConfig.routes.constructor !== Array) {
    return (0, _warn.err)("\u8DEF\u7531\u53C2\u6570 'routes' \u5FC5\u987B\u4F20\u9012 \r\n\r\n".concat(JSON.stringify(userConfig)));
  }
  if (userConfig.h5 != null && userConfig.h5.constructor !== Object) {
    return (0, _warn.err)("h5\u53C2\u6570\u4F20\u9012\u9519\u8BEF\uFF0C\u5E94\u8BE5\u662F\u4E00\u4E2A 'Object' \u7C7B\u578B \u793A\u4F8B\uFF1A\r\n\r\n".concat(JSON.stringify(_config.baseConfig.h5)));
  }
  var config = Object.create(null);
  var baseConfigKeys = Object.keys(_config.baseConfig);
  for (var i = 0; i < baseConfigKeys.length; i += 1) {
    var key = baseConfigKeys[i];
    if (userConfig[key] != null) {
      if (userConfig[key].constructor === Object) {
        config[key] = _objectSpread({},
        _config.baseConfig[key], {},
        userConfig[key]);

      } else if (key == 'routes') {// 需要加入已知的白名单
        config[key] = [].concat(_toConsumableArray(_config.baseConfig[key]), _toConsumableArray(userConfig[key]), _toConsumableArray(_base.builtIn));
      } else {
        config[key] = userConfig[key];
      }
    } else {
      config[key] = _config.baseConfig[key];
    }
  }
  return config;
};exports.formatConfig = formatConfig;
var filter = function filter(str) {
  str += '';
  str = str.replace(/%/g, '%25');
  str = str.replace(/\+/g, '%2B');
  str = str.replace(/ /g, '%20');
  str = str.replace(/\//g, '%2F');
  str = str.replace(/\?/g, '%3F');
  str = str.replace(/&/g, '%26');
  str = str.replace(/=/g, '%3D');
  str = str.replace(/#/g, '%23');
  return str;
};
/**
    * 使用encodeURI:true的情况	需要进行编码后再传递，解码等等 可以传递深度对象并会在路径后面加入一个query=
    *
    * @param {String} routerName //路径名称
    * @param {JSON} query 	//需要格式化参数
    * @param {Boolean} Encode 	//是获取还是编码后传递
    */exports.filter = filter;
var parseQueryN = function parseQueryN(routerName, query, Encode) {
  if (Encode) {
    return {
      url: routerName,
      query: JSON.parse(decodeURIComponent(query.replace(/^query=/, ''))) };

  }
  return {
    url: routerName,
    query: "query=".concat(encodeURIComponent(JSON.stringify(query))) };

};
/**
    * 使用encodeURI:false的情况 直接格式化为普通的queryURl参数形式传递即可 扁平深度对象
    *
    * @param {String} routerName //路径名称
    * @param {JSON} query 	//需要格式化参数
    * @param {Boolean} Encode 	//是获取还是编码后传递
    */exports.parseQueryN = parseQueryN;
var parseQueryD = function parseQueryD(routerName, query, Encode) {
  if (Encode) {
    var obj = {};
    var reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
    while (reg.exec(query)) {
      obj[RegExp.$1] = RegExp.$2;
    }
    return {
      url: routerName,
      query: obj };

  }
  var encodeArr = [];
  var queryKeys = Object.keys(query);
  for (var i = 0; i < queryKeys.length; i += 1) {
    var attr = queryKeys[i];
    var encodeStr = '';
    if (query[attr].constructor == Object) {
      encodeStr = parseQueryD(routerName, query[attr], Encode).query;
      encodeArr.push(encodeStr);
    } else {
      encodeStr = filter(query[attr]);
      encodeArr.push("".concat(attr, "=").concat(encodeStr));
    }
  }
  return {
    url: routerName,
    query: encodeArr.join('&') };

};
/**
    * @param {String} routerName //路径名称
    * @param {JSON} query 	//需要格式化参数
    * @param {Boolean} Encode 	//是获取还是编码后传递
    */exports.parseQueryD = parseQueryD;
var parseQuery = function parseQuery(routerName, query) {var Encode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (_config.Global.Router.CONFIG.encodeURI) {
    return parseQueryN(routerName, query, Encode);
  }
  return parseQueryD(routerName, query, Encode);
};exports.parseQuery = parseQuery;

var exactRule = function exactRule(cloneRule, routes, ruleKey) {var getRule = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var params = {};
  var i = 0;
  // eslint-disable-next-line
  while (true) {
    var item = routes[i];
    if (item == null) {
      if (!getRule) {
        (0, _warn.err)("\u8DEF\u7531\u8868\u4E2D\u672A\u67E5\u627E\u5230 '".concat(ruleKey, "' \u4E3A '").concat(cloneRule[ruleKey], "'"));
      }
      return {
        path: '',
        name: '' };

    }
    if (item[ruleKey] != null && item[ruleKey] === cloneRule[ruleKey]) {
      if (!getRule) {
        params.url = item.path;
        params.rule = item;
        if (isH5()) {// 如果是h5 则使用优先使用自定义路径名称
          params.url = item.aliasPath || item.path;
        }
        return params;
      }
      return item;
    }
    i += 1;
  }
};exports.exactRule = exactRule;

var resolveRule = function resolveRule(router, rule) {var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var ruleKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'path';
  var ruleInfo = (0, _config.route)(
  exactRule(_objectSpread({},
  rule),

  router.CONFIG.routes,
  ruleKey,
  router));

  return _objectSpread({},
  ruleInfo, {
    query: query });

};
/**
    * 把一些不必要的参数进行格式化掉，完成url的美观
    * @param {String} URLQuery URL中传递的参数
    */exports.resolveRule = resolveRule;
var formatURLQuery = function formatURLQuery(URLQuery) {
  switch (URLQuery.trim()) {
    case 'query=%7B%7D':
    case '%7B%7D':
    case '?query=%7B%7D':
    case '?':
    case '?[object Object]':
    case '?query={}':
      URLQuery = '';
      break;
    default:
      (0, _warn.warn)('url已经很完美啦，不需要格式化！');
      break;}

  return URLQuery;
};
/**
    * 拷贝对象
    * @param {Object} object
    */exports.formatURLQuery = formatURLQuery;
var copyObject = function copyObject(object) {
  return JSON.parse(JSON.stringify(object));
};exports.copyObject = copyObject;

/***/ }),
/* 75 */
/*!******************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/helpers/config.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.route = exports.appletsConfig = exports.uniAppHook = exports.Global = exports.lifeCycle = exports.H5FnTypeToggle = exports.methods = exports.baseConfig = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
var baseConfig = {
  h5: {
    rewriteFun: true, // 是否对uni-app reLaunch/navigateBack 两个方法重写 处理uni刷新直接返回到首页和触发路由守卫
    paramsToQuery: false, // h5端上通过params传参时规则是vue-router 刷新会丢失 开启此开关将变成?连接的方式
    loading: true, // 是否显示加载动画
    hinderTab: false, // 是否拦截uni-app自带底部菜单   TODO
    vueRouterDev: false, // 完全使用采用vue-router的开发模式
    useUniConfig: true, // 是否采用在pages.json下的所有页面配置信息,false时需开发者自行设置页面
    keepUniIntercept: false, // 保留uni-app使用vue-router的拦截器
    vueNext: false, // 在next管道函数中是否获取vueRouter next的原本参数
    replaceStyle: false, // 是否对resetStyle函数中返回的style节点进行全部替换，否则为追加
    resetStyle: function resetStyle() {return JSON.parse('{}');}, // 自定义加载样式函数 可返回一个包涵 html、style、script 的对象来重置Router内置的加载动画
    mode: 'hash',
    base: '/',
    linkActiveClass: 'router-link-active',
    linkExactActiveClass: 'router-link-exact-active',
    scrollBehavior: function scrollBehavior(to, from, savedPostion) {return savedPostion;},
    fallback: true },

  APP: {
    holdTabbar: true, // 是否开启底部菜单拦截
    loddingPageStyle: function loddingPageStyle() {return JSON.parse('{"backgroundColor":"#FFF"}');}, // 当前等待页面的样式 必须返回一个json
    loddingPageHook: function loddingPageHook(view) {plus.navigator.closeSplashscreen();view.show();}, // 刚刚打开页面处于等待状态,会触发此事件
    animation: { animationType: 'pop-in', animationDuration: 300 }, // 页面切换动画
    switchPageOutTime: 1000 // 最高能忍耐的页面切换时间 达到此时间 不管切换有没有完成都会显示页面出来 这对启动页帮助很大
  },
  debugger: false, // 是否处于开发阶段 设置为true则打印日志
  encodeURI: true, // 是否对url传递的参数进行编码
  routerBeforeEach: function routerBeforeEach() {}, // router 前置路由函数 每次触发跳转前先会触发此函数
  routerAfterEach: function routerAfterEach() {}, // router 后置路由函数 每次触发跳转后会触发此函数
  routes: [] };exports.baseConfig = baseConfig;


var methods = {
  push: 'navigateTo',
  replace: 'redirectTo',
  replaceAll: 'reLaunch',
  pushTab: 'switchTab',
  back: 'navigateBack' };exports.methods = methods;


var H5FnTypeToggle = {
  push: 'push',
  replace: 'replace',
  replaceAll: 'replace',
  pushTab: 'replace' };exports.H5FnTypeToggle = H5FnTypeToggle;


var lifeCycle = {
  beforeHooks: [],
  afterHooks: [],
  routerHooks: [],
  routerbeforeHooks: [], // 内部跳转前生命周期
  routerAfterHooks: [] // 内部跳转后生命周期
};exports.lifeCycle = lifeCycle;

var Global = { // 缓存一些必要的对象，作为全局可以访问的参数
  $parseQuery: null, // url query 帮助类实例
  Router: {},
  vueRouter: {},
  addedRoutes: [], // 用于缓存用户动态添加的路由
  RouterReadyPromise: function RouterReadyPromise() {},
  H5RouterReady: null, // 当前router是否就绪
  backLayerC: 1, // 返回api调用时开发者传递的 delta
  LockStatus: false // 当前是否正在进行跳转 正在跳转调用api是不给跳转的
};exports.Global = Global;

var uniAppHook = {
  indexVue: {}, // 首页 组件对象
  toutiaoIndexThis: {}, // 头条小程序Index this对象
  appVue: {}, // 同getApp()获取到的对象一毛一样的  其实就是app.vue组件
  onLaunch: { fun: [], args: {}, isHijack: false }, // 这两个是app.vue
  onShow: { fun: [], args: {}, isHijack: false },
  variationFuns: ['onReady', 'onUnload'], // 一些uni-app的变异方法 需要处理下
  waitHooks: {}, // 首页等待中的生命钩子 一些需要等待的Hooks,就是在页面没有进来之前一些提前触发的生命钩子 主要是用户已经声明好的
  indexCallHooks: ['onLoad', 'onReady', 'created', 'onShow'], // 在首页首次启动时需要触发的生命周期
  needHooks: ['onLoad', 'onReady', 'onShow', 'created', 'onHide', 'onUnload', 'onResize'], // 首页需要拦截的生命钩子
  pageReady: false,
  onLaunched: false // 否触发onLaunch事件
};exports.uniAppHook = uniAppHook;

var appletsConfig = { // 小程序端的一些路由所需配置
  onLaunchEd: false // 当前小程序端是否触发onLaunch事件
};exports.appletsConfig = appletsConfig;

var route = function route() {var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _objectSpread({},
  object, {
    params: {},
    query: {} });

};exports.route = route;

/***/ }),
/* 76 */
/*!******************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/vueRouter/base.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.vueMount = exports.vuelifeHooks = exports.builtIn = void 0;var builtIn = [{
  path: '/preview-image',
  name: 'previewImage',
  component: {
    render: function render() {} } },

{
  path: '/choose-location',
  name: 'chooseLocation',
  component: {
    render: function render() {} } },

{
  path: '/open-location',
  name: 'openLocation',
  component: {
    render: function render() {} } }];

// uni-app内置路由
exports.builtIn = builtIn;var vuelifeHooks = { // vueRouter的原始生命周期
  beforeHooks: [],
  afterHooks: [] };exports.vuelifeHooks = vuelifeHooks;

var vueMount = []; // 使用内部对象保留实例化下的appVue,并使用Router进行挂载触发第一次路由钩子
exports.vueMount = vueMount;

/***/ }),
/* 77 */
/*!****************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/helpers/warn.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.warnLock = exports.log = exports.warn = exports.err = void 0;var _config = __webpack_require__(/*! ./config */ 75);


var isLog = function isLog(type, errText, enforce) {
  if (!enforce) {
    var dev = _config.Global.Router.CONFIG.debugger;
    var isObject = dev.toString() === '[object Object]';
    if (dev === false) {
      return false;
    }if (dev === false) {
      return false;
    }if (isObject) {
      if (dev[type] === false) {
        return false;
      }
    }
  }
  /* eslint no-console:"off" */
  console[type](errText);
};
var err = function err(errInfo) {var enforce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  isLog('error', errInfo, enforce);
};exports.err = err;

var warn = function warn(errInfo) {var enforce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  isLog('warn', errInfo, enforce);
};exports.warn = warn;

var log = function log(errInfo) {var enforce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  isLog('log', errInfo, enforce);
};exports.log = log;
var warnLock = function warnLock(errInfo) {
  console.warn(errInfo);
};exports.warnLock = warnLock;

/***/ }),
/* 78 */
/*!*******************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/helpers/navJump.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _util = __webpack_require__(/*! ./util */ 74);
var _config = __webpack_require__(/*! ./config */ 75);
var _hooks = __webpack_require__(/*! ../appRouter/hooks */ 79);
var _hooks2 = __webpack_require__(/*! ../appletsRouter/hooks */ 82);
var _uniNav = _interopRequireDefault(__webpack_require__(/*! ../appRouter/uniNav */ 81));
var _appletsNav = _interopRequireDefault(__webpack_require__(/*! ../appletsRouter/appletsNav */ 85));
var _warn = __webpack_require__(/*! ./warn */ 77);
var _routerNav = _interopRequireDefault(__webpack_require__(/*! ../vueRouter/routerNav */ 86));
var compile = _interopRequireWildcard(__webpack_require__(/*! ./compile */ 84));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * 返回api 触发的公共函数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @param {Object/String} rule  当前跳转规则
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @param {String} fnType    跳转页面的类型方法
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * this 为当前 Router 实例
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */
var isBcakNav = function isBcakNav(_ref)



{var _this = this;var backLayer = _ref.backLayer,delta = _ref.delta,H5PATCH = _ref.H5PATCH;
  compile.H5(function () {
    H5PATCH.on('historyBack', {
      backLayer: backLayer,
      delta: delta });

  });
  compile.APP(function () {
    _config.Global.backLayerC = backLayer; // 告诉路由需要返回几层
    uni.navigateBack({
      delta: backLayer,
      complete: function complete() {
        _config.Global.LockStatus = false; // 跳转完成解锁状态
      } });

  });
  compile.mp(function () {
    _hooks2.backCallHook.call(_this, backLayer, function () {
      uni.navigateBack({
        delta: backLayer });

    });
  });
};

/**
    * 非 返回api 触发的公共函数
    * @param {Object/String} rule  当前跳转规则
    * @param {String} fnType    跳转页面的类型方法
    *
    * this 为当前 Router 实例
    */

var notBackNav = function notBackNav(rule, fnType) {
  if (rule == null) {
    return (0, _warn.err)('跳转规则为空，不允许这样操作');
  }
  if (rule.constructor === String) {// 单独 path 的情况   允许？拼接参数
    var ruleArray = rule.split('?');
    if (ruleArray.length > 1) {
      rule = {
        path: ruleArray[0],
        query: _config.Global.$parseQuery.parse(ruleArray[1]) };

    }
  }
  switch ((0, _util.appPlatform)(true)) {
    case 'H5':
      return _routerNav.default.call(this, _config.H5FnTypeToggle[fnType], rule, _config.methods[fnType]);
    case 'APP':
      _config.Global.LockStatus = true; // 设置为锁住状态
      return _hooks.transitionTo.call(this, rule, fnType, _uniNav.default);
    case 'APPLETS':
      _config.Global.LockStatus = true; // 设置为锁住状态
      return _hooks2.appletsTransitionTo.call(this, rule, fnType, _appletsNav.default);
    default:
      (0, _warn.err)('糟糕！！！还有其他的执行环境？？？没听说过啊。一脸懵逼？？？加QQ群问问：769241495');
      break;}

};

/**
    * 处理正在跳转的公共api
    * @param {Object/String} rule  当前跳转规则
    * @param {String} fnType    跳转页面的类型方法
    * @param {Boolean} isBack  是否通过 back() api 调用的 默认为false
    * @param {Boolean} enforce 是否强制越过跳转加锁检查 默认false  目前只有back() api 传递了
    *
    * this 为当前 Router 实例
    */
var navjump = function navjump(rule, fnType) {var isBack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;var enforce = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (_config.Global.LockStatus && !enforce) {// 正在跳转的状态下 给出提示正在跳转
    return (0, _warn.warn)('当前页面正在处于跳转状态，请稍后再进行跳转....');
  }
  if (isBack) {// 是返回api触发的
    return isBcakNav.call(this, rule, fnType);
  }
  return notBackNav.call(this, rule, fnType);
};var _default =

navjump;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 79 */
/*!*******************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/appRouter/hooks.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.beforeTabHooks = exports.triggerLifeCycle = exports.transitionTo = exports.backApiCallHook = exports.beforeBackHooks = exports.proxyIndexHook = exports.proxyLaunchHook = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 22));var _config = __webpack_require__(/*! ../helpers/config */ 75);
var _util = __webpack_require__(/*! ./util */ 80);


var _util2 = __webpack_require__(/*! ../helpers/util */ 74);
var _warn = __webpack_require__(/*! ../helpers/warn */ 77);
var _uniNav = _interopRequireDefault(__webpack_require__(/*! ./uniNav */ 81));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var startBack = false; // 主要是兼容低端手机返回卡 然后多次返回直接提示退出的问题

/**
 * 还原并执行所有 拦截下来的生命周期 app.vue 及 index 下的生命周期
 * @param {Boolean} callHome // 是否触发首页的生命周期
 *
 * this 为当前 page 对象
 */
var callwaitHooks = function callwaitHooks(callHome) {var _this = this;
  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve) {var variation, appVue, indexVue, onLaunch, onShow, waitHooks, variationFuns, indexCallHooks, app, key, _loop, _key;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              variation = []; // 存储一下在uni-app上的变异生命钩子  奇葩的要死

              appVue =
              _config.uniAppHook.appVue, indexVue = _config.uniAppHook.indexVue, onLaunch = _config.uniAppHook.onLaunch, onShow = _config.uniAppHook.onShow, waitHooks = _config.uniAppHook.waitHooks, variationFuns = _config.uniAppHook.variationFuns, indexCallHooks = _config.uniAppHook.indexCallHooks;
              app = appVue.$options;_context.next = 5;return (
                onLaunch.fun[onLaunch.fun.length - 1].call(appVue, onLaunch.args));case 5: // 确保只执行最后一个 并且强化异步操作
              onShow.fun[onShow.fun.length - 1].call(appVue, onShow.args); // onshow 不保证异步 直接确保执行最后一个
              if (callHome) {// 触发首页生命周期
                // eslint-disable-next-line
                for (key in waitHooks) {
                  if (indexCallHooks.includes(key)) {// 只有在被包含的情况下才执行
                    _util.callAppHook.call(_this, waitHooks[key].fun);
                  }
                }
              }
              if (onLaunch.isHijack) {// 还原 onLaunch生命钩子
                app.onLaunch.splice(app.onLaunch.length - 1, 1, onLaunch.fun[0]);
              }
              if (onShow.isHijack) {// 继续还原 onShow
                app.onShow.splice(app.onShow.length - 1, 1, onShow.fun[0]);
              }
              // eslint-disable-next-line
              _loop = function _loop(_key) {// 还原 首页下的生命钩子
                var item = waitHooks[_key];
                if (item.isHijack) {
                  if (variationFuns.includes(_key)) {// 变异方法
                    variation.push({ key: _key, fun: item.fun[0] });
                  } else {
                    var indeHooks = indexVue[_key];
                    // 修复 https://github.com/SilurianYang/uni-simple-router/issues/76
                    setTimeout(function () {// 异步延迟还原 不然 uni-app 给给触发了
                      indeHooks.splice(indeHooks.length - 1, 1, item.fun[0]);
                    }, 50);
                  }
                }};for (_key in waitHooks) {_loop(_key);
              }
              resolve(variation);case 12:case "end":return _context.stop();}}}, _callee);}));return function (_x) {return _ref.apply(this, arguments);};}());

};
/**
    * 还原剩下的奇葩生命钩子
    * @param {Object} variation 当前uni-app中的一些变异方法  奇葩生命钩子
    */
var callVariationHooks = function callVariationHooks(variation) {
  for (var i = 0; i < variation.length; i += 1) {var _variation$i =
    variation[i],key = _variation$i.key,fun = _variation$i.fun;
    var indeHooks = _config.uniAppHook.indexVue[key];
    indeHooks.splice(indeHooks.length - 1, 1, fun);
  }
};

/**
    * 主要是对app.vue下onLaunch和onShow生命周期进行劫持
    *
    * this 为当前 page 对象
    */
var proxyLaunchHook = function proxyLaunchHook() {var _this2 = this;var _this$$options =



  this.$options,onLaunch = _this$$options.onLaunch,onShow = _this$$options.onShow;
  _config.uniAppHook.appVue = this; // 缓存 当前app.vue组件对象
  if (onLaunch.length > 1) {// 确保有写 onLaunch 可能有其他混入 那也办法
    _config.uniAppHook.onLaunch.isHijack = true;
    _config.uniAppHook.onLaunch.fun = onLaunch.splice(onLaunch.length - 1, 1, function (arg) {
      _config.uniAppHook.onLaunch.args = arg;
    }); // 替换uni-app自带的生命周期
  }
  if (onShow.length > 0) {
    _config.uniAppHook.onShow.isHijack = true;
    _config.uniAppHook.onShow.fun = onShow.splice(onShow.length - 1, 1, function (arg) {
      _config.uniAppHook.onShow.args = arg;
      if (_config.uniAppHook.pageReady) {// 因为还有app切前台后台的操作
        _util.callAppHook.call(_this2, _config.uniAppHook.onShow.fun, arg);
      }
    }); // 替换替换 都替换
  }
};

/**
    * 把指定页面的生命钩子函数保存并替换
    * this 为当前 page 对象
    */exports.proxyLaunchHook = proxyLaunchHook;
var proxyIndexHook = function proxyIndexHook(Router) {var
  needHooks = _config.uniAppHook.needHooks,waitHooks = _config.uniAppHook.waitHooks;
  var options = this.$options;
  _config.uniAppHook.indexVue = options;
  for (var i = 0; i < needHooks.length; i += 1) {
    var key = needHooks[i];
    if (options[key] != null) {// 只劫持开发者声明的生命周期
      var length = options[key].length;
      // eslint-disable-next-line
      var whObject = waitHooks[key] = {};
      whObject.fun = options[key].splice(length - 1, 1, _util2.noop); // 把实际的页面生命钩子函数缓存起来,替换原有的生命钩子
      whObject.isHijack = true;
    }
  }
  // eslint-disable-next-line
  triggerLifeCycle.call(this, Router); // 接着 主动我们触发导航守卫
};
/**
    * 触发全局beforeHooks 生命钩子
    * @param {Object} _from // from  参数
    * @param {Object} _to  // to 参数
    *
    * this 为当前 Router 对象
    */exports.proxyIndexHook = proxyIndexHook;
var beforeHooks = function beforeHooks(_from, _to) {var _this3 = this;
  return new Promise( /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(resolve) {var beforeHooksFun;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
              beforeHooksFun = _this3.lifeCycle.beforeHooks[0];if (!(
              beforeHooksFun == null)) {_context2.next = 3;break;}return _context2.abrupt("return",
              resolve());case 3:_context2.next = 5;return (

                beforeHooksFun.call(_this3, _to, _from, resolve));case 5:case "end":return _context2.stop();}}}, _callee2);}));return function (_x2) {return _ref2.apply(this, arguments);};}());

};
/**
    * 触发全局afterEachHooks 生命钩子
    * @param {Object} _from // from  参数
    * @param {Object} _to  // to 参数
    *
    * this 为当前 Router 对象
    */
var afterEachHooks = function afterEachHooks(_from, _to) {
  var afterHooks = this.lifeCycle.afterHooks[0];
  if (afterHooks != null && afterHooks.constructor === Function) {
    afterHooks.call(this, _to, _from);
  }
};
/**
    * 触发全局 beforeEnter 生命钩子
    * @param {Object} finalRoute 	// 当前格式化后的路由参数
    * @param {Object} _from // from  参数
    * @param {Object} _to  // to 参数
    *
    * this 为当前 Router 对象
    */
var beforeEnterHooks = function beforeEnterHooks(finalRoute, _from, _to) {var _this4 = this;
  return new Promise( /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(resolve) {var beforeEnter;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
              beforeEnter = finalRoute.route.beforeEnter;if (!(
              beforeEnter == null || beforeEnter.constructor !== Function)) {_context3.next = 3;break;}return _context3.abrupt("return",
              resolve());case 3:_context3.next = 5;return (

                beforeEnter.call(_this4, _to, _from, resolve));case 5:case "end":return _context3.stop();}}}, _callee3);}));return function (_x3) {return _ref3.apply(this, arguments);};}());

};
/**
    * 触发返回事件公共方法
    * @param {Object} page	用getPages获取到的页面栈对象
    * @param {Object} options 	当前vue页面对象
    * @param {Object} backLayerC	需要返回页面的层级
      *
    * this 为当前 Router 对象
    */
var backCallHook = function backCallHook(page, options) {var _this5 = this;var backLayerC = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var route = (0, _util.APPGetPageRoute)([page]);
  var NAVTYPE = 'RouterBack';
  // eslint-disable-next-line
  transitionTo.call(this, { path: route.path, query: route.query }, NAVTYPE, function (finalRoute, fnType) {
    if (fnType != NAVTYPE) {// 返回时的api如果有next到其他页面 那么必须带上NAVTYPE  不相同则表示需要跳转到其他页面
      return (0, _uniNav.default)(finalRoute, fnType);
    }
    if (startBack) {// 如果当前处于正在返回的状态
      return (0, _warn.warn)('当前处于正在返回的状态，请稍后再试！');
    }
    startBack = true; // 标记开始返回
    options.onBackPress = [_util2.noop]; // 改回uni-app可执行的状态
    setTimeout(function () {
      _this5.back(backLayerC, undefined, true); // 越过加锁验证
      startBack = false; // 返回结束
    });
  });
};
/**
    * 处理返回按钮的生命钩子
    * @param {Object} options 当前 vue 组件对象下的$options对象
    * @param {Array} args  当前页面是点击头部返回还是底部返回
    *
    * this 为当前 Router 对象
    */
var beforeBackHooks = /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(options, args) {var isNext, page;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (
              (0, _util.getPageOnBeforeBack)(args));case 2:isNext = _context4.sent;if (!(
            isNext === false)) {_context4.next = 6;break;} // onBeforeBack  返回了true 阻止了跳转
            _config.Global.LockStatus = false; // 也需要解锁
            return _context4.abrupt("return", false);case 6:

            page = (0, _util.getPages)(-3); // 上一个页面对象
            backCallHook.call(this, page, options);case 8:case "end":return _context4.stop();}}}, _callee4, this);}));return function beforeBackHooks(_x4, _x5) {return _ref4.apply(this, arguments);};}();

/**
                                                                                                                                                                                                             * 处理back api的生命钩子
                                                                                                                                                                                                             * @param {Object} options 当前 vue 组件对象下的$options对象
                                                                                                                                                                                                             * @param {Array} args  当前页面是点击头部返回还是底部返回
                                                                                                                                                                                                             *
                                                                                                                                                                                                             * this 为当前 Router 对象
                                                                                                                                                                                                             */exports.beforeBackHooks = beforeBackHooks;
var backApiCallHook = /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(options, args) {var backLayerC, pages, page;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
              (0, _util.getPageOnBeforeBack)(args));case 2:
            backLayerC = _config.Global.backLayerC;
            pages = (0, _util.getPages)();
            page = null;
            if (backLayerC > pages.length - 1 || backLayerC == pages.length - 1) {// 返回的首页 我们需要显示tabbar拦截
              // eslint-disable-next-line
              page = pages[0];
            } else {
              page = pages[pages.length - 2];
            }
            backCallHook.call(this, page, options, backLayerC);case 7:case "end":return _context5.stop();}}}, _callee5, this);}));return function backApiCallHook(_x6, _x7) {return _ref5.apply(this, arguments);};}();

/**
                                                                                                                                                                                                                         *  v1.5.4+
                                                                                                                                                                                                                         * beforeRouteLeave 生命周期
                                                                                                                                                                                                                         * @param {Object} to       将要去的那个页面 to对象
                                                                                                                                                                                                                         * @param {Object} from     从那个页面触发的 from对象
                                                                                                                                                                                                                         *  @param {Boolean} leaveHook:? 是否为 beforeRouteLeave 触发的next 到别处 如果是则不再触发 beforeRouteLeave 生命钩子
                                                                                                                                                                                                                         * this 为当前 Router 对象
                                                                                                                                                                                                                         */exports.backApiCallHook = backApiCallHook;
var beforeRouteLeaveHooks = function beforeRouteLeaveHooks(from, to, leaveHook) {
  return new Promise(function (resolve) {
    if (leaveHook) {// 我们知道这个是来自页面beforeRouteLeave next到其他地方，所有不必再执行啦
      (0, _warn.warn)('beforeRouteLeave next到其他地方，无须再执行！');
      return resolve();
    }
    if (from.path == to.path) {// 进入首页的时候不触发
      return resolve();
    }
    var currentPage = (0, _util.getPages)(-2); // 获取到全部的页面对象
    var callThis = (0, _util.getPageVmOrMp)(currentPage); // 获取到页面的 $vm 对象 及 page页面的this对象
    var beforeRouteLeave = callThis.$options.beforeRouteLeave; // 查看当前是否有开发者声明
    if (beforeRouteLeave == null) {
      (0, _warn.warn)('当前页面下无 beforeRouteLeave 钩子声明，无须执行！');
      return resolve();
    }
    if (beforeRouteLeave != null && beforeRouteLeave.constructor !== Function) {
      (0, _warn.warn)('beforeRouteLeave 生命钩子声明错误，必须是一个函数！');
      return resolve();
    }
    beforeRouteLeave.call(callThis, to, from, resolve); // 执行生命钩子
  });
};

/**
    * 验证当前 next() 管道函数是否支持下一步
    *
    * @param {Object} Intercept 拦截到的新路由规则
    * @param {Object} fnType 跳转页面的类型方法 原始的
    * @param {Object} navCB 回调函数 原始的
    * @param {Boolean} leaveHookCall:? 是否为 beforeRouteLeave 触发的next 做拦截判断
    * this 为当前 Router 对象
    *
    */
var isNext = function isNext(Intercept, fnType, navCB) {var _this6 = this;var leaveHookCall = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return new Promise(function (resolve, reject) {
    if (Intercept == null) {// 什么也不做 直接执行下一个钩子
      return resolve();
    }
    if (Intercept === false) {// 路由中断
      _config.Global.LockStatus = false; // 解锁跳转状态
      return reject('路由终止');
    }
    if (Intercept.constructor === String) {// 说明 开发者直接传的path 并且没有指定 NAVTYPE 那么采用原来的navType
      reject('next到其他页面');
      // eslint-disable-next-line
      return transitionTo.call(_this6, Intercept, fnType, navCB, leaveHookCall);
    }
    if (Intercept.constructor === Object) {// 有一系列的配置 包括页面切换动画什么的
      reject('next到其他页面');
      // eslint-disable-next-line
      return transitionTo.call(_this6, Intercept, Intercept.NAVTYPE || fnType, navCB, leaveHookCall);
    }
  });
};
/**
    * 核心方法 处理一系列的跳转配置
    * @param {Object} rule 当前跳转规则
    * @param {Object} fnType 跳转页面的类型方法
    * @param {Object} navCB:? 回调函数
    * @param {Boolean} leaveHook:? 是否为 beforeRouteLeave 触发的next 到别处 如果是则不再触发 beforeRouteLeave 生命钩子
    *
    * this 为当前 Router 对象
    */
var transitionTo = /*#__PURE__*/function () {var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(rule, fnType, navCB) {var leaveHook,finalRoute,_from,_to,leaveResult,beforeResult,enterResult,_args6 = arguments;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:leaveHook = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : false;_context6.next = 3;return (
              this.lifeCycle.routerbeforeHooks[0].call(this));case 3: // 触发内部跳转前的生命周期
            finalRoute = (0, _util.ruleToUniNavInfo)(rule, this.CONFIG.routes); // 获得到最终的 route 对象
            _from = (0, _util.formatFrom)(this.CONFIG.routes); // 先根据跳转类型获取 from 数据
            _to = (0, _util.formatTo)(finalRoute); // 再根据跳转类型获取 to 数据
            _context6.prev = 6;_context6.next = 9;return (
              beforeRouteLeaveHooks.call(this, _from, _to, leaveHook));case 9:leaveResult = _context6.sent;_context6.next = 12;return (
              isNext.call(this, leaveResult, fnType, navCB, true));case 12:_context6.next = 14;return (

              beforeHooks.call(this, _from, _to));case 14:beforeResult = _context6.sent;_context6.next = 17;return (
              isNext.call(this, beforeResult, fnType, navCB));case 17:_context6.next = 19;return (

              beforeEnterHooks.call(this, finalRoute, _from, _to));case 19:enterResult = _context6.sent;_context6.next = 22;return (
              isNext.call(this, enterResult, fnType, navCB));case 22:_context6.next = 28;break;case 24:_context6.prev = 24;_context6.t0 = _context6["catch"](6);

            (0, _warn.warn)(_context6.t0); // 打印开发者操作的日志
            return _context6.abrupt("return", false);case 28:

            if (navCB) {
              navCB.call(this, finalRoute, fnType); // 执行当前回调生命周期
            }
            afterEachHooks.call(this, _from, _to);_context6.next = 32;return (
              this.lifeCycle.routerAfterHooks[0].call(this));case 32:case "end":return _context6.stop();}}}, _callee6, this, [[6, 24]]);}));return function transitionTo(_x8, _x9, _x10) {return _ref6.apply(this, arguments);};}();

/**
                                                                                                                                                                                                                                      * 主动触发导航守卫
                                                                                                                                                                                                                                      * @param {Object} Router 当前路由对象
                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                      * this  当前vue页面组件对象
                                                                                                                                                                                                                                      */exports.transitionTo = transitionTo;
var triggerLifeCycle = function triggerLifeCycle(Router) {var _this7 = this;
  var topPage = getCurrentPages()[0];
  if (topPage == null) {
    return (0, _warn.warn)('打扰了,当前一个页面也没有 这不是官方的bug是什么??');
  }var _getPageVmOrMp =
  (0, _util.getPageVmOrMp)(topPage, false),query = _getPageVmOrMp.query,page = _getPageVmOrMp.page;
  transitionTo.call(Router, { path: page.route, query: query }, 'push', /*#__PURE__*/function () {var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(finalRoute, fnType) {var variation;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:
              variation = [];if (!(
              "/".concat(page.route) == finalRoute.route.path)) {_context7.next = 7;break;} // 在首页不动的情况下
              _config.uniAppHook.pageReady = true; // 标致着路由已经就绪 可能准备起飞
              _context7.next = 5;return callwaitHooks.call(_this7, true);case 5:_context7.next = 12;break;case 7:_context7.next = 9;return (

                callwaitHooks.call(_this7, false));case 9:variation = _context7.sent;_context7.next = 12;return (
                (0, _uniNav.default)(finalRoute, fnType));case 12:

              plus.nativeObj.View.getViewById('router-loadding').close();
              callVariationHooks(variation);
              _config.uniAppHook.pageReady = true; // 标致着路由已经就绪 可能准备起飞
            case 15:case "end":return _context7.stop();}}}, _callee7);}));return function (_x11, _x12) {return _ref7.apply(this, arguments);};}());
};

/**
    * 处理tabbar点击拦截事件
    * @param {Object} path 当前需要跳转的tab页面路径
    *
    * this 为当前 Router 对象
    */exports.triggerLifeCycle = triggerLifeCycle;
var beforeTabHooks = function beforeTabHooks(path) {
  transitionTo.call(this, { path: "/".concat(path), query: {} }, 'pushTab', function (finalRoute, fnType) {
    (0, _uniNav.default)(finalRoute, fnType);
  });
};exports.beforeTabHooks = beforeTabHooks;

/***/ }),
/* 80 */
/*!******************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/appRouter/util.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.assertCanBack = exports.getPageOnBeforeBack = exports.APPGetPageRoute = exports.ruleToUniNavInfo = exports.formatFrom = exports.getFormatQuery = exports.pathOrNameToRoute = exports.formatTo = exports.getPageVmOrMp = exports.isNvuePage = exports.getPages = exports.callAppHook = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 22));var _warn = __webpack_require__(/*! ../helpers/warn */ 77);
var _util = __webpack_require__(/*! ../helpers/util */ 74);
var _config = __webpack_require__(/*! ../helpers/config */ 75);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * 触发指定生命钩子
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * @param {Array} funList	//需要执行的方法列表
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * @param {Object} args //触发生命钩子传递的参数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       */
var callAppHook = function callAppHook() {var funList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];var args = arguments.length > 1 ? arguments[1] : undefined;
  for (var i = 0; i < funList.length; i += 1) {
    funList[i].call(this, args);
  }
};
/**
    * @param {Number} index //需要获取的页面下标 -2:表示获取最后一个即当前页面 -1:表示全部 -3:当前页面的前一个页面
    * @param {Boolean} all //是否获取全部的页面
    */exports.callAppHook = callAppHook;
var getPages = function getPages() {var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;var all = arguments.length > 1 ? arguments[1] : undefined;
  var pages = getCurrentPages(all);
  if (index === -1) {
    return pages;
  }
  if (index === -2) {
    return pages[pages.length - 1];
  }
  if (index === -3) {
    return pages[pages.length - 2];
  }
  return pages[index];
};
/**
    * 验证当前页面是否为nvue页面
    * @param {Object} page 当前页面对象
    */exports.getPages = getPages;
var isNvuePage = function isNvuePage(page) {
  var cstr = page.constructor.name;
  var pageType = {
    s: true,
    z: false };

  return pageType[cstr];
};

/**
    * @param {Object} page //当前顶级页面对象
    * @param {Object} vim:? //是否获取 $vm 对象还是 $mp 对象
    */exports.isNvuePage = isNvuePage;
var getPageVmOrMp = function getPageVmOrMp(page) {var vim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (vim) {
    return page.$vm;
  }
  if (page.$vm.$mp) {
    return page.$vm.$mp;
  }
  if (isNvuePage(page)) {// nvue 页面
    return {
      page: page,
      query: page.__displayReporter.query };

  }
};

/**
    * 获取 to 的配置参数
    * @param {Object} rule 当前跳转的规则
    */exports.getPageVmOrMp = getPageVmOrMp;
var formatTo = function formatTo(finalRoute) {
  var route = (0, _util.copyObject)(finalRoute.route);var
  rule = finalRoute.rule;
  route.query = rule.query || rule.params || {};
  return route;
};
/**
    * 通过一个未知的路径或者名称 在路由表中查找指定路由表 并返回
    * @param {string} type   //path 或者 name
    * @param {Object} routes //当前对象的所有路由表
    */exports.formatTo = formatTo;
var pathOrNameToRoute = function pathOrNameToRoute(type) {var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config.Global.Router.CONFIG.routes;
  var routesKeys = Object.keys(routes);
  for (var i = 0; i < routesKeys.length; i += 1) {
    var key = routesKeys[i];
    var item = routes[key];
    if (item.path === "/".concat(type)) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }
    if (item.path === type) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }
    if (item.name == type) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }
  }
  (0, _warn.err)("\u5F53\u524D '".concat(type, "' \u5728\u8DEF\u7531\u8868\u4E2D\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684 name \u6216\u8005 path"));
};
/**
    * 统一格式话 路由传递的参数 看看是编码还是非编码 做相应的对策
    *
    * @param {Object} query 当前的路由参数
    * @param {Boolean} getter 是从页面获取 route 对象下的参数 还是编码后传输
    */exports.pathOrNameToRoute = pathOrNameToRoute;
var getFormatQuery = function getFormatQuery() {var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (_config.Global.Router.CONFIG.encodeURI) {
    try {
      query = JSON.parse(decodeURIComponent(query.query || encodeURIComponent('{}')));
    } catch (e) {
      query = JSON.parse(query.query);
    }
  }
  return query;
};
/**
    * 获取 from 的配置参数 from 页面永远都是站在当前页面忘其它地方走 所以都是最后一个页面
    *
    * @param {Object} routes //当前对象的所有路由表
    */exports.getFormatQuery = getFormatQuery;
var formatFrom = function formatFrom(routes) {
  var topPage = getPages(-2);var _getPageVmOrMp =
  getPageVmOrMp(topPage, false),page = _getPageVmOrMp.page,query = _getPageVmOrMp.query;
  var route = pathOrNameToRoute(page.route, routes); // 获取到当前路由表下的 route
  route.query = getFormatQuery(query); // 不管是编码传输还是非编码 最后都得在 to/from 中换成json对象
  return route;
};
/**
    *
    * 把用户的跳转路由规则格式化成uni-app可用的路由跳转规则
    *
    * @param {Object} rule  //当前用户跳转的路由规则
    * @param {Object} routes //当前simple-router 下的路由表
    */exports.formatFrom = formatFrom;
var ruleToUniNavInfo = function ruleToUniNavInfo(rule, routes) {
  if (rule == null) {
    return (0, _warn.err)('当前跳转规则为空,请检查跳转代码');
  }
  // eslint-disable-next-line
  var navType = 'path',route = null,query = {},animation = {};
  if (rule.constructor === String) {// 是字符串类型 那当前就是路径啦
    route = pathOrNameToRoute(rule, routes); // 直接把 rule 当 path 传递 完事
  } else if (rule.constructor === Object) {// 对象类型 可以是 path 或者 name
    route = pathOrNameToRoute(rule.path || (navType = 'name', rule.name), routes); // 两则必有其一 报错自己处理
    query = rule.query || rule.params || {};
    animation = rule.animation || {};
  } else {
    return (0, _warn.err)('传的什么乱七八糟的类型?路由跳转规则只认字符串 \'path\' , 对象 \'path\' , 对象 \'name\' ');
  }
  animation = _objectSpread({}, _config.Global.Router.CONFIG.APP.animation, {}, route.animation || {}, {}, animation); // 合并多种方式声明的动画效果
  route.animation = animation; // 这才是最终的页面切换效果
  // 路径处理完后   开始格式化参数
  var uniRoute = (0, _util.parseQuery)(route.path, query); // uni-app 需要的跳转规则
  return {
    rule: rule,
    route: route,
    uniRoute: uniRoute };

};
/**
    * 获取当前页面下的 Route 信息
    *
    * @param {Object} pages 获取页面对象集合
    * @param {Object} Vim 用户传递的当前页面对象
    */exports.ruleToUniNavInfo = ruleToUniNavInfo;
var APPGetPageRoute = function APPGetPageRoute(pages, Vim) {var
  query = {},path = '';
  var page = pages[pages.length - 1]; // 获取到当前页面
  if (pages.length > 0) {
    query = getFormatQuery(page.options, true);
    path = page.route;
  } else if (Vim != null) {
    query = getFormatQuery(Vim.$mp.page.options, true);
    path = page.route;
  }
  var route = pathOrNameToRoute(path);
  route.query = query;
  return route;
};
/**
    * 获取当前页面下的 onBeforeBack 生命周期并执行
    *
    * @param {Object} args 当前返回页面时uni-app传递的参数
    */exports.APPGetPageRoute = APPGetPageRoute;
var getPageOnBeforeBack = function getPageOnBeforeBack(args) {
  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve) {var currPage, onBeforeBack, isNext;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              currPage = getPages(-2); // 获取到当前页面
              onBeforeBack = currPage.$vm.$options.onBeforeBack;if (!(
              onBeforeBack != null && onBeforeBack.constructor === Function)) {_context.next = 8;break;}_context.next = 5;return (
                onBeforeBack.call(currPage.$vm, args));case 5:isNext = _context.sent;if (!(
              isNext === true)) {_context.next = 8;break;}return _context.abrupt("return",
              resolve(false));case 8:return _context.abrupt("return",


              resolve(true));case 9:case "end":return _context.stop();}}}, _callee);}));return function (_x) {return _ref.apply(this, arguments);};}());

};
/**
    * 断言当前页面是否可返回上一级
    * @param {Object} page 当前页面webview对象
    */exports.getPageOnBeforeBack = getPageOnBeforeBack;
var assertCanBack = function assertCanBack(page) {
  var pageStyle = page.$getAppWebview().getStyle();
  if (pageStyle.titleNView != null && pageStyle.titleNView.autoBackButton) {// 只有处理有带返回按钮的页面
    return true;
  }
  // 两种情况 1.真的是顶级页面时  2.自定义头部
  var $page = page.$page;
  if ($page && $page.meta.isQuit === false) {// 自定义头部 不是顶级页面
    return true;
  }
  return false; // 不可返回 真的是顶级页面时 返回就直接退出app了
};exports.assertCanBack = assertCanBack;

/***/ }),
/* 81 */
/*!********************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/appRouter/uniNav.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _config = __webpack_require__(/*! ../helpers/config */ 75);
var _util = __webpack_require__(/*! ../helpers/util */ 74);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var stop = null;

/**
                  * @param {Object} finalRoute 格式化后的路由跳转规则
                  * @param {Object} NAVTYPE 需要调用的跳转方法
                  */
var uniPushTo = function uniPushTo(finalRoute, NAVTYPE) {
  return new Promise(function (resolve) {
    var query = (0, _util.formatURLQuery)("?".concat(finalRoute.uniRoute.query));var
    APP = _config.baseConfig.APP;var
    url = finalRoute.uniRoute.url;
    stop = setTimeout(function () {
      resolve(url);
      resolve = _util.noop; // 执行完了就没了 确保不会被下一次执行
      _config.Global.LockStatus = false; // 跳转完成解锁状态
    }, APP.switchPageOutTime);

    uni[_config.methods[NAVTYPE]](_objectSpread({
      url: url + query },
    finalRoute.route.animation, {
      complete: function complete() {
        clearTimeout(stop);
        resolve(url);
        resolve = _util.noop; // 执行完了就没了 确保不会被下一次执行
        _config.Global.LockStatus = false; // 跳转完成解锁状态
      } }),
    true); // 这里传递true 主要是兼容重写 uni.switchTab
  });
};var _default =

uniPushTo;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 82 */
/*!***********************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/appletsRouter/hooks.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.appletsProxyIndexHook = exports.triggerLifeCycle = exports.backCallHook = exports.appletsTransitionTo = exports.proxyLaunchHook = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 22));var _config = __webpack_require__(/*! ../helpers/config */ 75);
var _util = __webpack_require__(/*! ./util */ 83);


var _appletsNav = _interopRequireDefault(__webpack_require__(/*! ./appletsNav */ 85));
var _util2 = __webpack_require__(/*! ../helpers/util */ 74);
var _warn = __webpack_require__(/*! ../helpers/warn */ 77);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @param {String} key
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @param {Function} hook 需要执行及还原的生命周期函数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */
var toutiaoIndexHookCall = function toutiaoIndexHookCall(key, hook) {var
  indexVue = _config.uniAppHook.indexVue;
  var indeHooks = indexVue[key];
  indeHooks.splice(indeHooks.length - 1, 1, hook);
};

/**
    * 还原并执行所有 拦截下来的生命周期 app.vue 及 index 下的生命周期
    * @param {Boolean} callHome // 是否触发首页的生命周期
    *
    * this 为当前 page 对象
    */
var callwaitHooks = function callwaitHooks(callHome) {var _this = this;
  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve) {var variation, appVue, onLaunch, onShow, waitHooks, variationFuns, indexCallHooks, app, key, _key, item;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              variation = []; // 存储一下在uni-app上的变异生命钩子  奇葩的要死

              appVue =
              _config.uniAppHook.appVue, onLaunch = _config.uniAppHook.onLaunch, onShow = _config.uniAppHook.onShow, waitHooks = _config.uniAppHook.waitHooks, variationFuns = _config.uniAppHook.variationFuns, indexCallHooks = _config.uniAppHook.indexCallHooks;
              app = appVue.$options;_context.next = 5;return (
                onLaunch.fun[onLaunch.fun.length - 1].call(appVue, onLaunch.args));case 5: // 确保只执行最后一个 并且强化异步操作
              onShow.fun[onShow.fun.length - 1].call(appVue, onShow.args); // onshow 不保证异步 直接确保执行最后一个
              if (callHome) {// 触发首页生命周期
                // eslint-disable-next-line
                for (key in waitHooks) {
                  if (indexCallHooks.includes(key)) {// 只有在被包含的情况下才执行
                    _util.callAppHook.call(_this, waitHooks[key].fun);
                  }
                }
              }
              if (onLaunch.isHijack) {// 还原 onLaunch生命钩子
                app.onLaunch.splice(app.onLaunch.length - 1, 1, onLaunch.fun[0]);
              }
              if (onShow.isHijack) {// 继续还原 onShow
                app.onShow.splice(app.onShow.length - 1, 1, onShow.fun[0]);
              }
              // eslint-disable-next-line
              for (_key in waitHooks) {// 还原 首页下的生命钩子
                item = waitHooks[_key];
                if (item.isHijack) {
                  if (variationFuns.includes(_key)) {// 变异方法
                    variation.push({ key: _key, fun: item.fun[0] });
                  } else {
                    toutiaoIndexHookCall(_key, item.fun[0]);
                  }
                }
              }
              resolve(variation);case 11:case "end":return _context.stop();}}}, _callee);}));return function (_x) {return _ref.apply(this, arguments);};}());

};
/**
    * 还原剩下的奇葩生命钩子
    * @param {Object} variation 当前uni-app中的一些变异方法  奇葩生命钩子
    */
var callVariationHooks = function callVariationHooks(variation) {
  for (var i = 0; i < variation.length; i += 1) {var _variation$i =
    variation[i],key = _variation$i.key,fun = _variation$i.fun;
    toutiaoIndexHookCall(key, fun);
  }
};

/**
    * 主要是对app.vue下onLaunch和onShow生命周期进行劫持
    *
    * this 为当前 page 对象
    */
var proxyLaunchHook = function proxyLaunchHook() {var _this2 = this;var _this$$options =



  this.$options,onLaunch = _this$$options.onLaunch,onShow = _this$$options.onShow;
  _config.uniAppHook.appVue = this; // 缓存 当前app.vue组件对象
  if (onLaunch.length > 1) {// 确保有写 onLaunch 可能有其他混入 那也办法
    _config.uniAppHook.onLaunch.isHijack = true;
    _config.uniAppHook.onLaunch.fun = onLaunch.splice(onLaunch.length - 1, 1, function (arg) {
      _config.uniAppHook.onLaunch.args = arg;
    }); // 替换uni-app自带的生命周期
  }
  if (onShow.length > 0) {
    _config.uniAppHook.onShow.isHijack = true;
    _config.uniAppHook.onShow.fun = onShow.splice(onShow.length - 1, 1, function (arg) {
      _config.uniAppHook.onShow.args = arg;
      if (_config.uniAppHook.pageReady) {// 因为还有app切前台后台的操作
        _util.callAppHook.call(_this2, _config.uniAppHook.onShow.fun, arg);
      }
    }); // 替换替换 都替换
  }
};
/**
    * 触发全局beforeHooks 生命钩子
    * @param {Object} _from // from  参数
    * @param {Object} _to  // to 参数
    *
    * this 为当前 Router 对象
    */exports.proxyLaunchHook = proxyLaunchHook;
var beforeHooks = function beforeHooks(_from, _to) {var _this3 = this;
  return new Promise( /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(resolve) {var beforeHooksFun;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
              beforeHooksFun = _this3.lifeCycle.beforeHooks[0];if (!(
              beforeHooksFun == null)) {_context2.next = 3;break;}return _context2.abrupt("return",
              resolve());case 3:_context2.next = 5;return (

                beforeHooksFun.call(_this3, _to, _from, resolve));case 5:case "end":return _context2.stop();}}}, _callee2);}));return function (_x2) {return _ref2.apply(this, arguments);};}());

};
/**
    * 触发全局afterEachHooks 生命钩子
    * @param {Object} _from // from  参数
    * @param {Object} _to  // to 参数
    *
    * this 为当前 Router 对象
    */
var afterEachHooks = function afterEachHooks(_from, _to) {
  var afterHooks = this.lifeCycle.afterHooks[0];
  if (afterHooks != null && afterHooks.constructor === Function) {
    afterHooks.call(this, _to, _from);
  }
};
/**
    * 触发全局 beforeEnter 生命钩子
    * @param {Object} finalRoute 	// 当前格式化后的路由参数
    * @param {Object} _from // from  参数
    * @param {Object} _to  // to 参数
    *
    * this 为当前 Router 对象
    */
var beforeEnterHooks = function beforeEnterHooks(finalRoute, _from, _to) {var _this4 = this;
  return new Promise( /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(resolve) {var beforeEnter;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
              beforeEnter = finalRoute.route.beforeEnter;if (!(
              beforeEnter == null || beforeEnter.constructor !== Function)) {_context3.next = 3;break;}return _context3.abrupt("return",
              resolve());case 3:_context3.next = 5;return (

                beforeEnter.call(_this4, _to, _from, resolve));case 5:case "end":return _context3.stop();}}}, _callee3);}));return function (_x3) {return _ref3.apply(this, arguments);};}());

};
/**
    *  v1.5.4+
    * beforeRouteLeave 生命周期
    * @param {Object} to       将要去的那个页面 to对象
    * @param {Object} from     从那个页面触发的 from对象
    *  @param {Boolean} leaveHook:? 是否为 beforeRouteLeave 触发的next 到别处 如果是则不再触发 beforeRouteLeave 生命钩子
    * this 为当前 Router 对象
    */
var beforeRouteLeaveHooks = function beforeRouteLeaveHooks(from, to, leaveHook) {
  return new Promise( /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(resolve) {var currentPage, callThis, beforeRouteLeave;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:if (!
              leaveHook) {_context4.next = 3;break;} // 我们知道这个是来自页面beforeRouteLeave next到其他地方，所有不必再执行啦
              (0, _warn.warn)('beforeRouteLeave next到其他地方，无须再执行！');return _context4.abrupt("return",
              resolve());case 3:if (!(

              from.path == to.path)) {_context4.next = 5;break;}return _context4.abrupt("return",
              resolve());case 5:

              currentPage = (0, _util.getPages)(-2); // 获取到全部的页面对象
              callThis = (0, _util.getPageVmOrMp)(currentPage); // 获取到页面的 $vm 对象 及 page页面的this对象
              beforeRouteLeave = callThis.$options.beforeRouteLeave; // 查看当前是否有开发者声明
              if (!(beforeRouteLeave == null)) {_context4.next = 11;break;}
              (0, _warn.warn)('当前页面下无 beforeRouteLeave 钩子声明，无须执行！');return _context4.abrupt("return",
              resolve());case 11:if (!(

              beforeRouteLeave != null && beforeRouteLeave.constructor !== Function)) {_context4.next = 14;break;}
              (0, _warn.warn)('beforeRouteLeave 生命钩子声明错误，必须是一个函数！');return _context4.abrupt("return",
              resolve());case 14:_context4.next = 16;return (

                beforeRouteLeave.call(callThis, to, from, resolve));case 16:case "end":return _context4.stop();}}}, _callee4);}));return function (_x4) {return _ref4.apply(this, arguments);};}());

};

/**
    * 核心方法 处理一系列的跳转配置
    * @param {Object} rule 当前跳转规则
    * @param {Object} fnType 跳转页面的类型方法
    * @param {Object} navCB:? 回调函数
    * @param {Boolean} leaveHook:? 是否为 beforeRouteLeave 触发的next 到别处 如果是则不再触发 beforeRouteLeave 生命钩子
    * this 为当前 Router 对象
    *
    */
var appletsTransitionTo = /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(rule, fnType, navCB) {var leaveHook,finalRoute,_from,_to,leaveResult,beforeResult,enterResult,_args5 = arguments;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:leaveHook = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : false;_context5.next = 3;return (
              this.lifeCycle.routerbeforeHooks[0].call(this));case 3: // 触发内部跳转前的生命周期
            finalRoute = (0, _util.ruleToUniNavInfo)(rule, this.CONFIG.routes); // 获得到最终的 route 对象
            _from = (0, _util.formatFrom)(this.CONFIG.routes); // 先根据跳转类型获取 from 数据
            _to = (0, _util.formatTo)(finalRoute); // 再根据跳转类型获取 to 数据
            _context5.prev = 6;_context5.next = 9;return (
              beforeRouteLeaveHooks.call(this, _from, _to, leaveHook));case 9:leaveResult = _context5.sent;_context5.next = 12;return (

              isNext.call(this, leaveResult, fnType, navCB, true));case 12:_context5.next = 14;return (

              beforeHooks.call(this, _from, _to));case 14:beforeResult = _context5.sent;_context5.next = 17;return (

              isNext.call(this, beforeResult, fnType, navCB));case 17:_context5.next = 19;return (

              beforeEnterHooks.call(this, finalRoute, _from, _to));case 19:enterResult = _context5.sent;_context5.next = 22;return (

              isNext.call(this, enterResult, fnType, navCB));case 22:_context5.next = 28;break;case 24:_context5.prev = 24;_context5.t0 = _context5["catch"](6);

            (0, _warn.warn)(_context5.t0); // 打印开发者操作的日志
            return _context5.abrupt("return", false);case 28:

            if (navCB) {
              navCB.call(this, finalRoute, fnType); // 执行当前回调生命周期
            }
            afterEachHooks.call(this, _from, _to);_context5.next = 32;return (
              this.lifeCycle.routerAfterHooks[0].call(this));case 32:case "end":return _context5.stop();}}}, _callee5, this, [[6, 24]]);}));return function appletsTransitionTo(_x5, _x6, _x7) {return _ref5.apply(this, arguments);};}();


/**
                                                                                                                                                                                                                                            * 触发全局 返回事件
                                                                                                                                                                                                                                            * @param {Number} backLayer 需要返回的页面层级
                                                                                                                                                                                                                                            * @param {Function} next 正真的回调函数
                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                            * this 为当前 Router 对象
                                                                                                                                                                                                                                            */exports.appletsTransitionTo = appletsTransitionTo;
var backCallHook = function backCallHook(backLayer, next) {
  var pages = (0, _util.getPages)(); // 获取到全部的页面对象
  var toPage = pages.reverse()[backLayer];
  if (toPage == null) {// 没有匹配到的时候
    return (0, _warn.warn)('亲爱的开发者，你确定页面栈中有这么多历史记录给你返回？');
  }var _getPageVmOrMp =
  (0, _util.getPageVmOrMp)(toPage, false),query = _getPageVmOrMp.query,page = _getPageVmOrMp.page;
  var beforeFntype = 'RouterBack';
  appletsTransitionTo.call(this, { path: page.route, query: query }, beforeFntype, function (finalRoute, fnType) {
    var toPath = finalRoute.uniRoute.url;
    if ("/".concat(page.route) == toPath || page.route == toPath) {// 直接调用返回api
      next();
    } else {// 有拦截到其他页面时
      if (fnType == beforeFntype) {
        return (0, _warn.warn)('调用返回api被拦截到其他页面需要指定合理的 ‘NAVTYPE’ ');
      }
      (0, _appletsNav.default)(finalRoute, fnType);
    }
  });
};

/**
    * 主动触发导航守卫
    * @param {Object} Router 当前路由对象
    *
    */exports.backCallHook = backCallHook;
var triggerLifeCycle = function triggerLifeCycle(Router) {var _this5 = this;
  var topPage = getCurrentPages()[0];
  if (topPage == null) {
    return (0, _warn.warn)('打扰了,当前一个页面也没有 这不是官方的bug是什么??');
  }var _getPageVmOrMp2 =
  (0, _util.getPageVmOrMp)(topPage, false),query = _getPageVmOrMp2.query,page = _getPageVmOrMp2.page;
  appletsTransitionTo.call(Router, { path: page.route, query: query }, 'push', /*#__PURE__*/function () {var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(finalRoute, fnType) {var variation;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:
              variation = [];if (!(
              "/".concat(page.route) == finalRoute.route.path || page.route == finalRoute.route.path)) {_context6.next = 7;break;} // 在首页不动的情况下
              _config.uniAppHook.pageReady = true; // 标致着路由已经就绪 可能准备起飞
              _context6.next = 5;return callwaitHooks.call(_this5, true);case 5:_context6.next = 12;break;case 7:_context6.next = 9;return (

                callwaitHooks.call(_this5, false));case 9:variation = _context6.sent;_context6.next = 12;return (
                (0, _appletsNav.default)(finalRoute, fnType));case 12:

              _config.uniAppHook.pageReady = true; // 标致着路由已经就绪 可能准备起飞
              callVariationHooks(variation);case 14:case "end":return _context6.stop();}}}, _callee6);}));return function (_x8, _x9) {return _ref6.apply(this, arguments);};}());

};
/**
    * 把指定页面的生命钩子函数保存并替换
    * this 为当前 page 对象
    */exports.triggerLifeCycle = triggerLifeCycle;
var appletsProxyIndexHook = function appletsProxyIndexHook(Router) {
  if (false) {}var
  needHooks = _config.uniAppHook.needHooks,waitHooks = _config.uniAppHook.waitHooks;
  var options = this.$options;
  _config.uniAppHook.indexVue = options;
  for (var i = 0; i < needHooks.length; i += 1) {
    var key = needHooks[i];
    if (options[key] != null) {// 只劫持开发者声明的生命周期
      var length = options[key].length;
      // eslint-disable-next-line
      var whObject = waitHooks[key] = {};
      whObject.fun = options[key].splice(length - 1, 1, _util2.noop); // 把实际的页面生命钩子函数缓存起来,替换原有的生命钩子
      whObject.isHijack = true;
    }
  }
  triggerLifeCycle.call(this, Router); // 接着 主动我们触发导航守卫
};
/**
    * 验证当前 next() 管道函数是否支持下一步
    *
    * @param {Object} Intercept 拦截到的新路由规则
    * @param {Object} fnType 跳转页面的类型方法 原始的
    * @param {Object} navCB 回调函数 原始的
    * @param {Boolean} leaveHookCall:? 是否为 beforeRouteLeave 触发的next 做拦截判断
    * this 为当前 Router 对象
    *
    */exports.appletsProxyIndexHook = appletsProxyIndexHook;
var isNext = function isNext(Intercept, fnType, navCB) {var _this6 = this;var leaveHookCall = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return new Promise(function (resolve, reject) {
    if (Intercept == null) {// 什么也不做 直接执行下一个钩子
      return resolve();
    }
    if (Intercept === false) {// 路由中断 我们需要把防抖设置为false
      _config.Global.LockStatus = false; // 解锁跳转状态
      return reject('路由终止');
    }
    if (Intercept.constructor === String) {// 说明 开发者直接传的path 并且没有指定 NAVTYPE 那么采用原来的navType
      reject('next到其他页面');
      return appletsTransitionTo.call(_this6, Intercept, fnType, navCB, leaveHookCall);
    }
    if (Intercept.constructor === Object) {// 有一系列的配置 包括页面切换动画什么的
      reject('next到其他页面');
      return appletsTransitionTo.call(_this6, Intercept, Intercept.NAVTYPE || fnType, navCB, leaveHookCall);
    }
  });
};

/***/ }),
/* 83 */
/*!**********************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/appletsRouter/util.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.AppletsPageRoute = exports.ruleToUniNavInfo = exports.formatFrom = exports.formatTo = exports.pathOrNameToRoute = exports.getPages = exports.getFormatQuery = exports.getPageVmOrMp = exports.callAppHook = void 0;var _config = __webpack_require__(/*! ../helpers/config */ 75);
var _util = __webpack_require__(/*! ../helpers/util */ 74);
var _warn = __webpack_require__(/*! ../helpers/warn */ 77);
var _compile = __webpack_require__(/*! ../helpers/compile */ 84);
/**
                                               * 触发指定生命钩子
                                               * @param {Array} funList	//需要执行的方法列表
                                               * @param {Object} args //触发生命钩子传递的参数
                                               */
var callAppHook = function callAppHook(funList, args) {
  for (var i = 0; i < funList.length; i += 1) {
    funList[i].call(this, args);
  }
};
/**
    * @param {Object} page //当前顶级页面对象
    * @param {Object} vim:? //是否获取 $vm 对象还是 $mp 对象
    */exports.callAppHook = callAppHook;
var getPageVmOrMp = function getPageVmOrMp(page) {var vim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (vim) {
    return page.$vm;
  }var
  $mp = page.$vm.$mp;
  (0, _compile.baiduApple)(function () {// 百度小程序新增一个route属性
    $mp.page.route = $mp.page.is;
  });
  (0, _compile.touTiao)(function () {// 头条小程序新增一个route属性
    $mp.page.route = $mp.page.is;
  });
  return $mp;
};
/**
    * 统一格式话 路由传递的参数 看看是编码还是非编码 做相应的对策
    *
    * @param {Object} query 当前的路由参数
    * @param {Boolean} getter 是从页面获取 route 对象下的参数 还是编码后传输
    */exports.getPageVmOrMp = getPageVmOrMp;
var getFormatQuery = function getFormatQuery() {var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var getter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (_config.Global.Router.CONFIG.encodeURI) {
    if (getter) {
      try {// 除去微信小程序都不需要 decodeURIComponent
        query = JSON.parse(decodeURIComponent(query.query) || '{}');
      } catch (e) {// 其他小程序
        query = JSON.parse(query.query || '{}');
      }
    } else {
      try {
        query = JSON.parse(decodeURIComponent(query.query || encodeURIComponent('{}')));
      } catch (e) {
        query = JSON.parse(query.query);
      }
    }
  }
  return query;
};
/**
    * @param {Number} index //需要获取的页面下标 -2:表示获取最后一个即当前页面 -1:表示全部 -3:当前页面的前一个页面
    * @param {Boolean} all //是否获取全部的页面
    */exports.getFormatQuery = getFormatQuery;
var getPages = function getPages() {var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;var all = arguments.length > 1 ? arguments[1] : undefined;
  var pages = getCurrentPages(all);
  if (index === -1) {
    return pages;
  }
  if (index === -2) {
    return pages[pages.length - 1];
  }
  if (index === -3) {
    return pages[pages.length - 2];
  }
  return pages[index];
};
/**
    * 通过一个未知的路径或者名称 在路由表中查找指定路由表 并返回
    * @param {string} type   //path 或者 name
    * @param {Object} routes //当前对象的所有路由表
    */exports.getPages = getPages;
var pathOrNameToRoute = function pathOrNameToRoute(type) {var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config.Global.Router.CONFIG.routes;
  var routesKeys = Object.keys(routes);
  for (var i = 0; i < routesKeys.length; i += 1) {
    var key = routesKeys[i];
    var item = routes[key];
    if (item.path === "/".concat(type)) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }
    if (item.path === type) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }
    if (item.name == type) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }
  }
  (0, _warn.err)("\u5F53\u524D '".concat(type, "' \u5728\u8DEF\u7531\u8868\u4E2D\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684 name \u6216\u8005 path"));
};

/**
    * 获取 to 的配置参数
    * @param {Object} rule 当前跳转的规则
    */exports.pathOrNameToRoute = pathOrNameToRoute;
var formatTo = function formatTo(finalRoute) {
  var route = (0, _util.copyObject)(finalRoute.route);var
  rule = finalRoute.rule;
  route.query = rule.query || rule.params || {};
  return route;
};

/**
    * 获取 from 的配置参数 from 页面永远都是站在当前页面忘其它地方走 所以都是最后一个页面
    *
    * @param {Object} routes //当前对象的所有路由表
    */exports.formatTo = formatTo;
var formatFrom = function formatFrom(routes) {
  var topPage = getPages(-2);var _getPageVmOrMp =
  getPageVmOrMp(topPage, false),page = _getPageVmOrMp.page,query = _getPageVmOrMp.query;
  var route = pathOrNameToRoute(page.route, routes); // 获取到当前路由表下的 route
  route.query = getFormatQuery(query); // 不管是编码传输还是非编码 最后都得在 to/from 中换成json对象
  return route;
};

/**
    *
    * 把用户的跳转路由规则格式化成uni-app可用的路由跳转规则
    *
    * @param {Object} rule  //当前用户跳转的路由规则
    * @param {Object} routes //当前simple-router 下的路由表
    */exports.formatFrom = formatFrom;
var ruleToUniNavInfo = function ruleToUniNavInfo(rule, routes) {
  if (rule == null) {
    return (0, _warn.err)('当前跳转规则为空,请检查跳转代码');
  }
  // eslint-disable-next-line
  var navType = 'path',route = null,query = {};
  if (rule.constructor === String) {// 是字符串类型 那当前就是路径啦
    route = pathOrNameToRoute(rule, routes); // 直接把 rule 当 path 传递 完事
  } else if (rule.constructor === Object) {// 对象类型 可以是 path 或者 name
    route = pathOrNameToRoute(rule.path || (navType = 'name', rule.name), routes); // 两则必有其一 报错自己处理
    query = rule.query || rule.params || {};
  } else {
    return (0, _warn.err)('传的什么乱七八糟的类型?路由跳转规则只认字符串 \'path\' , 对象 \'path\' , 对象 \'name\' ');
  }
  // 路径处理完后   开始格式化参数
  var uniRoute = (0, _util.parseQuery)(route.path, query); // uni-app 需要的跳转规则
  return {
    rule: rule,
    route: route,
    uniRoute: uniRoute };

};
/**
    * 获取当前页面下的 Route 信息
    *
    * @param {Object} pages 获取页面对象集合
    * @param {Object} Vim 用户传递的当前页面对象
    */exports.ruleToUniNavInfo = ruleToUniNavInfo;
var AppletsPageRoute = function AppletsPageRoute(pages, Vim) {var
  query = {},path = '';
  var page = pages[pages.length - 1]; // 获取到当前页面
  if (pages.length > 0) {
    var uniQuery = getPageVmOrMp(page, false).query;
    query = getFormatQuery(uniQuery, true);
    path = page.route;
  } else if (Vim != null) {
    query = getFormatQuery(Vim.$mp.page.options, true);
    path = page.route;
  }
  var route = pathOrNameToRoute(path);
  route.query = query;
  return route;
};exports.AppletsPageRoute = AppletsPageRoute;

/***/ }),
/* 84 */
/*!*******************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/helpers/compile.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.mp = exports.touTiao = exports.baiduApple = exports.notH5 = exports.applets = exports.APP = exports.H5 = void 0;var H5 = function H5(fn) {



};exports.H5 = H5;
var APP = function APP(fn) {



};exports.APP = APP;
var applets = function applets(fn) {

  fn();

};exports.applets = applets;
var notH5 = function notH5(fn) {

  fn();

};exports.notH5 = notH5;
var baiduApple = function baiduApple(fn) {



};exports.baiduApple = baiduApple;
var touTiao = function touTiao(fn) {



};exports.touTiao = touTiao;
var mp = function mp(fn) {

  fn();

};exports.mp = mp;

/***/ }),
/* 85 */
/*!****************************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/appletsRouter/appletsNav.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _config = __webpack_require__(/*! ../helpers/config */ 75);
var _util = __webpack_require__(/*! ../helpers/util */ 74);


/**
                                         * @param {Object} finalRoute 格式化后的路由跳转规则
                                         * @param {Object} NAVTYPE 需要调用的跳转方法
                                         */
var appletsUniPushTo = function appletsUniPushTo(finalRoute, NAVTYPE) {
  return new Promise(function (resolve) {
    var query = (0, _util.formatURLQuery)("?".concat(finalRoute.uniRoute.query));var
    url = finalRoute.uniRoute.url;
    uni[_config.methods[NAVTYPE]]({
      url: url + query,
      complete: function complete() {
        resolve(url);
        _config.Global.LockStatus = false; // 跳转完成解锁状态
      } });

  });
};var _default =
appletsUniPushTo;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 86 */
/*!***********************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/vueRouter/routerNav.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _warn = __webpack_require__(/*! ../helpers/warn */ 77);
var _util = __webpack_require__(/*! ./util */ 87);

/**
                                * @param {Object} replace vue-router的跳转方式
                                * @param {Object} rule 需要跳转到的路由匹配规则
                                * @param {Object} type 对应的官方跳转模式
                                *
                                * this 为当前 Router 实例
                                */
var H5PushTo = function H5PushTo(replace, rule, type) {
  if (this.$route == null) {
    return (0, _warn.err)('h5端路由为就绪，请检查调用代码');
  }
  rule = (0, _util.formatUserRule)(rule, this.selfRoutes, this.CONFIG);
  var objPath = (0, _util.strPathToObjPath)(rule);
  objPath.type = type;
  this.$route[replace](objPath);
};var _default =

H5PushTo;exports.default = _default;

/***/ }),
/* 87 */
/*!******************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/vueRouter/util.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.diffRouter = exports.H5GetPageRoute = exports.getPages = exports.strPathToObjPath = exports.encodeURLQuery = exports.vueDevRouteProxy = exports.getRouterNextInfo = exports.formatUserRule = exports.nameToRute = exports.pathToRute = exports.getFuntionConfig = exports.fromatRoutes = exports.resloveChildrenPath = exports.resolveRender = void 0;var _warn = __webpack_require__(/*! ../helpers/warn */ 77);
var _util = __webpack_require__(/*! ../helpers/util */ 74);
var _proxy = __webpack_require__(/*! ./proxy/proxy */ 88);
var _config = __webpack_require__(/*! ../helpers/config */ 75);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var pagesConfigReg = /props:\s*\(.*\)\s*(\([\s\S]*\))\s*},/;
var pagesConfigRegCli = /props:\s*Object\.assign\s*(\([\s\S]*\))\s*},/; // 脚手架项目
var defRoutersReg = /props:\s*{([\s\S]+)}\s*},/;

/**
                                                  * 解析验证当前的 component 选项是否配置正确 只有vueRouterDev:false 才会调用此方法
                                                  * @param {Function|Object} component
                                                  * @param {Object} item
                                                  * @param {Boolean} useUniConfig
                                                  */
var resolveRender = function resolveRender(_ref,


item, useUniConfig) {var component = _ref.component,components = _ref.components;
  if (components != null) {
    (0, _warn.warn)("vueRouterDev:false\u65F6 \u8DEF\u7531\u8868\u914D\u7F6E\u4E2D \u2018components\u2019 \u65E0\u6548\uFF0C\r\n\r\n ".concat(JSON.stringify(item)));
  }
  if (useUniConfig == true) {// 采用uni-pages.json中的配置时component可以为空
    return false;
  }
  if (item.path == '*') {// 唯独这个情况在vue-router中可以不用component
    return true;
  }
  if (component == null) {
    return (0, _warn.err)("vueRouterDev:false\u65F6 \u8DEF\u7531\u8868\u4E2D \u2018component\u2019 \u9009\u9879\u4E0D\u80FD\u4E3A\u7A7A\uFF1A\r\n\r\n ".concat(JSON.stringify(item)));
  }
  if (component.constructor === Function) {
    item.component = {
      render: component };

  } else if (component.constructor === Object) {
    if (component.render == null || component.render.constructor !== Function) {
      (0, _warn.err)("vueRouterDev:false\u65F6 \u8DEF\u7531\u8868\u914D\u7F6E\u4E2D \u2018render\u2019 \u51FD\u6570\u7F3A\u5931\u6216\u7C7B\u578B\u4E0D\u6B63\u786E\uFF1A\r\n\r\n ".concat(JSON.stringify(item)));
    }
  } else {
    (0, _warn.err)("vueRouterDev:false\u65F6 \u8DEF\u7531\u8868\u914D\u7F6E\u4E2D \u2018component\u2019 \u9009\u9879\u4EC5\u652F\u6301 Function\u3001Object \u7C7B\u578B\u3002\u5E76\u786E\u4FDD Object \u7C7B\u578B\u65F6\u4F20\u9012\u4E86 \u2018render\u2019 \u51FD\u6570  \uFF1A\r\n\r\n ".concat(
    JSON.stringify(item)));

  }
};
/**
    * 递归解析 H5配置中有存在嵌套对象的情况,优先以path为key存储。没有则找aliasPath作为key
    * @param {Object} objRoutes
    * @param {Array} children
    * @param {Boolean} useUniConfig 是否使用pages.json下的页面配置
    */exports.resolveRender = resolveRender;
var resloveChildrenPath = function resloveChildrenPath(objRoutes, children, useUniConfig) {
  for (var i = 0; i < children.length; i += 1) {
    var item = children[i];
    resolveRender(item, item, useUniConfig);
    if (item.path != null) {
      objRoutes[item.path] = _objectSpread({},
      item, {},
      {
        _ROUTERPATH: true // 使用page.json中的path为路径
      });

    } else {
      objRoutes[item.aliasPath] = _objectSpread({},
      item, {},
      {
        _ROUTERPATH: false });


    }
    if (item.children && item.children.constructor === Array) {
      resloveChildrenPath(objRoutes, item.children, useUniConfig);
    }
  }
};
/**
    * 格式化原始路由表
    * @param {Object} routes  路由表
    * @param {Boolean} userRoute  是否为用户自己配置的路由表
    * @param {Boolean} H5CONFIG
    */exports.resloveChildrenPath = resloveChildrenPath;
var fromatRoutes = function fromatRoutes(routes, userRoute, _ref2)


{var vueRouterDev = _ref2.vueRouterDev,useUniConfig = _ref2.useUniConfig;
  if (userRoute && vueRouterDev) {// 如果是用户的路由表并且 完全采用vueRouter开发 则不作处理直接返回
    return routes;
  }
  var objRoutes = {};
  for (var i = 0; i < routes.length; i += 1) {
    var item = routes[i];
    var path = item.path === '/' ? item.alias : item.path;
    if (userRoute) {
      if (item.children && item.children.constructor === Array) {
        resloveChildrenPath(objRoutes, item.children, useUniConfig);
      }
      resolveRender(item, item, useUniConfig); // 是否使用pages.json下的页面配置
    }
    objRoutes[path] = _objectSpread({},
    item, {},
    {
      _PAGEPATH: path.substring(1) });


  }
  return objRoutes;
};

/**
    * 解析vueRouter中 component 下 render函数中的配置信息
    * @param {String} FunStr
    */exports.fromatRoutes = fromatRoutes;
var getFuntionConfig = function getFuntionConfig(FunStr) {
  var matchText = FunStr.match(pagesConfigReg);
  var prefix = '';
  if (matchText == null) {// 是uni-app自带的默认路由及配置 也可能是脚手架项目
    matchText = FunStr.match(pagesConfigRegCli);
    if (matchText == null) {// 确认不是脚手架项目
      try {
        // eslint-disable-next-line
        matchText = FunStr.match(defRoutersReg)[1];
        // eslint-disable-next-line
        matchText = eval("Object.assign({".concat(matchText, "})"));
        prefix = 'system-';
      } catch (error) {
        (0, _warn.err)("\u8BFB\u53D6uni-app\u9875\u9762\u6784\u5EFA\u65B9\u6CD5\u914D\u7F6E\u9519\u8BEF \r\n\r\n ".concat(error));
      }
    } else {
      // eslint-disable-next-line
      matchText = eval("Object.assign".concat(matchText[1]));
    }
  } else {
    // eslint-disable-next-line
    matchText = eval("Object.assign".concat(matchText[1]));
  }
  return {
    config: matchText,
    prefix: prefix,
    FunStr: FunStr };

};
/**
    * 通过一个未知的路径名称 在路由表中查找指定路由表 并返回
    * @param {String} path //不管是aliasPath名的路径还是path名的路径
    * @param {Object} routes//当前对象的所有路由表
    */exports.getFuntionConfig = getFuntionConfig;
var pathToRute = function pathToRute(path, routes) {
  var PATHKEY = '';
  var rute = {};
  var routeKeys = Object.keys(routes);
  for (var i = 0; i < routeKeys.length; i += 1) {
    var key = routeKeys[i];
    var item = routes[key];
    rute = item;
    if (item.aliasPath == path) {// path参数是优先采用aliasPath为值得 所以可以先判断是否与aliasPath相同
      PATHKEY = 'aliasPath';
      break;
    }
    // eslint-disable-next-line
    if ("/".concat(item._PAGEPATH) == path) {// 路径相同
      PATHKEY = 'path';
      break;
    }
  }
  return {
    PATHKEY: _defineProperty({},
    PATHKEY, path),

    rute: rute };

};
/**
    * 通过一个路径name 在路由表中查找指定路由表 并返回
    * @param {String} name//实例化路由时传递的路径表中所匹配的对应路由name
    * @param {Object} routes//当前对象的所有路由表
    */exports.pathToRute = pathToRute;
var nameToRute = function nameToRute(name, routes) {
  var routesKeys = Object.keys(routes);
  for (var i = 0; i < routesKeys.length; i += 1) {
    var key = routesKeys[i];
    var item = routes[key];
    if (item.name == name) {
      return item;
    }
  }

  (0, _warn.err)("\u8DEF\u7531\u8868\u4E2D\u6CA1\u6709\u627E\u5230 name\u4E3A:'".concat(name, "' \u7684\u8DEF\u7531"));
};
/**
    * 根据用户传入的路由规则 格式化成正确的路由规则
    * @param {Object} rule 用户需要跳转的路由规则
    * @param {Object} selfRoutes simple-router下的所有routes对象
    * @param {Object} CONFIG 当前路由下的所有配置信息
    */exports.nameToRute = nameToRute;
var formatUserRule = function formatUserRule(rule, selfRoutes, CONFIG) {
  var type = '';
  var ruleQuery = (type = 'query', rule.query || (type = 'params', rule.params)) || (type = '', {});
  var rute = {}; // 默认在router中的配置
  if (type == '' && rule.name != null) {// 那就是可能没有穿任何值咯
    type = 'params';
  }
  if (type != 'params') {
    var route = pathToRute(rule.path || rule, selfRoutes);
    if (Object.keys(route.PATHKEY)[0] == '') {
      (0, _warn.err)("'".concat(route.PATHKEY[''], "' \u8DEF\u5F84\u5728\u8DEF\u7531\u8868\u4E2D\u672A\u627E\u5230"));
      return null;
    }
    rute = route.rute;
    if (rule.path) {
      rule.path = rute.path;
    }
  }
  if (type != '') {// 当然是对象啦 这个主要是首页H5PushTo调用时的
    if (type == 'params' && CONFIG.h5.paramsToQuery) {// 如果是name规则并且设置了转query,那么就转path跳转了
      var _nameToRute =


      nameToRute(rule.name, selfRoutes),aliasPath = _nameToRute.aliasPath,path = _nameToRute.path;
      delete rule.name;
      delete rule.params;
      rule.path = aliasPath || path;
      type = 'query';
    }
    var query = _config.Global.$parseQuery.transfer(ruleQuery);
    if (CONFIG.encodeURI) {
      if (query != '') {
        rule[type] = {
          query: query.replace(/^query=/, '') };

      }
    } else {
      rule[type] = ruleQuery;
    }
  } else {// 纯字符串,那就只有是path啦
    rule = rute.path;
  }
  return rule;
};

/**
    * 根据是否获取非vue-Router next管道参数，来进行格式化
    *
    * @param {Object} to
    * @param {Object} from
    * @param {Router} Router  //router当前实例对象
    */exports.formatUserRule = formatUserRule;
var getRouterNextInfo = function getRouterNextInfo(to, from, Router) {var
  toRoute = to,fromRoute = from;
  var H5 = Router.CONFIG.h5;
  if (H5.vueNext === false && H5.vueRouterDev === false) {// 不采用vue-router中的to和from,需要格式化成Router中$Route获取的一样一样的
    var toPath = {},fromPath = {};
    toPath[to.meta.PATHKEY] = to.meta.PATHKEY === 'path' ? "/".concat(to.meta.pagePath) : "".concat(to.path);
    fromPath[from.meta.PATHKEY] = from.meta.PATHKEY === 'path' ? "/".concat(from.meta.pagePath) : "".concat(from.path);

    if (to.meta.PATHKEY == null) {// 未使用uni-pages.json中的配置、通过addRoutes时 meta.PATHKEY 可能未undefined
      toPath = pathToRute(to.path, Router.selfRoutes).PATHKEY;
    }
    if (from.meta.PATHKEY == null) {
      fromPath = pathToRute(from.path, Router.selfRoutes).PATHKEY;
    }

    var isEmptyTo = Object.keys(to.query).length != 0 ? (0, _util.copyObject)(to.query) : (0, _util.copyObject)(to.params);
    var isEmptyFrom = Object.keys(from.query).length != 0 ? (0, _util.copyObject)(from.query) : (0, _util.copyObject)(from.params);
    /* eslint-disable */
    delete isEmptyTo.__id__; // 删除uni-app下的内置属性
    delete isEmptyFrom.__id__;
    /* eslint-enable */
    var toQuery = _config.Global.$parseQuery.queryGet(isEmptyTo).decode;
    var fromQuery = _config.Global.$parseQuery.queryGet(isEmptyFrom).decode;
    toRoute = (0, _util.resolveRule)(Router, toPath, toQuery, Object.keys(toPath)[0]);
    fromRoute = (0, _util.resolveRule)(Router, fromPath, fromQuery, Object.keys(fromPath)[0]);
  } else {
    if (fromRoute.name == null && toRoute.name != null) {// 这种情况是因为uni-app在使用vue-router时搞了骚操作。
      fromRoute = _objectSpread({},
      fromRoute, {},
      {
        name: toRoute.name });

      // 这个情况一般出现在首次加载页面
    }
  }
  return {
    toRoute: toRoute,
    fromRoute: fromRoute };

};exports.getRouterNextInfo = getRouterNextInfo;
var vueDevRouteProxy = function vueDevRouteProxy(routes, Router) {
  var proxyRoutes = [];
  for (var i = 0; i < routes.length; i += 1) {
    var item = routes[i];
    var childrenRoutes = Reflect.get(item, 'children');
    if (childrenRoutes != null) {
      var childrenProxy = vueDevRouteProxy(childrenRoutes, Router);
      item.children = childrenProxy;
    }
    var ProxyRoute = (0, _proxy.proxyBeforeEnter)(Router, item);
    proxyRoutes.push(ProxyRoute);
  }
  return proxyRoutes;
};
/**
    * 组装成编码后的路由query传递信息
    * @param {Object} CONFIG simple-router 对象配置
    * @param {Object} query 传递的参数
    * @param {Object} mode 路由模式
    */exports.vueDevRouteProxy = vueDevRouteProxy;

var encodeURLQuery = function encodeURLQuery(CONFIG, query, mode) {
  if (Object.keys(query).length == 0) {// 没有传值的时候 我们啥都不管
    return '';
  }
  if (CONFIG.h5.vueRouterDev === false) {// 没有采取完全模式开发时 才转换
    var _Global$$parseQuery$q = _config.Global.$parseQuery.queryGet(query),strQuery = _Global$$parseQuery$q.strQuery,historyObj = _Global$$parseQuery$q.historyObj;
    if (mode === 'history') {
      return historyObj;
    }
    return strQuery;
  } // 完全彩种 vue-router 开发的时候 我们不用管
  if (mode === 'history') {// 此模式下 需要的就是对象
    return query;
  }
  return _config.Global.$parseQuery.stringify(query); // hash转成字符串拼接
};
/**
    * 把一个未知的路由跳转规则进行格式化为 hash、history 可用的,主要表现在 history模式下直接传入path会报错__id__错误的问题
    * @param {*} path 需要判断修改的路径规则
    */exports.encodeURLQuery = encodeURLQuery;
var strPathToObjPath = function strPathToObjPath(path) {
  if (path == null) {// 我们也不用管啦,这个情况是路由守卫中传递的
    return path;
  }
  if ((0, _util.isObject)(path)) {// 是对象我们不用管
    return path;
  }
  return { // 这种情况就是只有path时,直接返回path对象了
    path: path };

};
/**
    * 通过 getCurrentPages() api 获取指定页面的 page 对象 默认是获取当前页面page对象
    * @param {Number} index //需要获取的页面索引
    * @param {Boolean} all //是否获取全部的页面
    */exports.strPathToObjPath = strPathToObjPath;
var getPages = function getPages() {var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;var all = arguments.length > 1 ? arguments[1] : undefined;
  var pages = getCurrentPages(all);
  return pages.reverse()[index];
};
/**
    * 获取当前页面下的 Route 信息
    *
    * @param {Object} pages 获取页面对象集合
    * @param {Object} Vim 用户传递的当前页面对象
    */exports.getPages = getPages;
var H5GetPageRoute = function H5GetPageRoute(pages, Vim) {
  if (pages.length > 0) {// 直接取当前页面的对象
    var currentRoute = pages[pages.length - 1].$route;
    return getRouterNextInfo(currentRoute, currentRoute, this).toRoute;
  }if (Vim && Vim.$route) {
    return getRouterNextInfo(Vim.$route, Vim.$route, this).toRoute;
  }
  return {};
};

/**
    * 在useUniConfig:true 的情况下重新拼装路由表 useUniConfig:false 不需要读取page.json中的数据 直接使用component作为页面组件
    * @param {Router} Router//unis-simple-router 路由对象
    * @param {vueRouter} vueRouter//vue-router对象
    * @param {Boolean} useUniConfig//是否采用uni-page.json中的配置选项
    * @param {Array} routes//需要循环的routes表
    */exports.H5GetPageRoute = H5GetPageRoute;
var diffRouter = function diffRouter(Router, vueRouter, useUniConfig, routes) {
  var newRouterMap = [];
  if (useUniConfig) {// 使用pages.json的样式配置 只是单纯的把url路径改成用户自定义的 保留uni的所以的配置及生命周期、缓存
    var Routes = routes || vueRouter.options.routes;
    var cloneSelfRoutes = (0, _util.copyObject)(Router.selfRoutes); // copy一个对象随便搞xxoo
    Routes.forEach(function (item) {
      var path = item.path === '/' ? item.alias : item.path;
      var vueRoute = Router.vueRoutes[path] || Router.vueRoutes[item.path] || Router.selfRoutes[path];
      var CselfRoute = Router.selfRoutes[path];
      delete cloneSelfRoutes[path]; // 移除已经添加到容器中的路由，用于最后做对比 是否page.json中没有，而实例化时传递了
      if (CselfRoute == null) {
        return (0, _warn.err)("\u8BFB\u53D6 \u2018pages.json\u2019 \u4E2D\u9875\u9762\u914D\u7F6E\u9519\u8BEF\u3002\u5B9E\u4F8B\u5316\u65F6\u4F20\u9012\u7684\u8DEF\u7531\u8868\u4E2D\u672A\u627E\u5230\u8DEF\u5F84\u4E3A\uFF1A".concat(
        path, " \r\n\r\n \u53EF\u4EE5\u5C1D\u8BD5\u628A \u2018useUniConfig\u2019 \u8BBE\u7F6E\u4E3A \u2018false\u2019\u3002\u6216\u8005\u914D\u7F6E\u6B63\u786E\u7684\u8DEF\u5F84\u3002\u5982\u679C\u4F60\u662F\u52A8\u6001\u6DFB\u52A0\u7684\u5219\u4E0D\u7528\u7406\u4F1A"));

      }
      var pageConfigJson = {
        config: {} };

      if (vueRoute.component) {
        pageConfigJson = getFuntionConfig(vueRoute.component.render.toString());
        CselfRoute.component = {
          render: function render(h) {return vueRoute.component.render(h);} };

      }
      delete CselfRoute.components; // useUniConfig:true 时不允许携带components
      delete CselfRoute.children; // useUniConfig:true 时不允许携带children
      CselfRoute.meta = _objectSpread({},
      pageConfigJson.config, {},
      item.meta || {}, {
        PATHKEY: CselfRoute.aliasPath ? 'aliasPath' : 'path',
        pagePath: CselfRoute.path.substring(1) });

      CselfRoute.path = CselfRoute.aliasPath || (item.path === '/' ? item.path : CselfRoute.path);
      item.alias = item.path === '/' ? item.alias : CselfRoute.path; // 重新给vueRouter赋值一个新的路径，欺骗uni-app源码判断
      var ProxyRoute = (0, _proxy.proxyBeforeEnter)(Router, CselfRoute);
      newRouterMap.push(ProxyRoute);
    });
    if (Object.keys(cloneSelfRoutes).length > 0) {// 确实page.json中没有，而实例化时传递了
      var testG = cloneSelfRoutes['*']; // 全局通配符,他是个例外'通配符'可以被添加
      if (testG && routes == null) {
        var ProxyRoute = (0, _proxy.proxyBeforeEnter)(Router, Router.selfRoutes['*']);
        newRouterMap.push(ProxyRoute);
      }
      if (routes == null) {// 非动态添加时才打印警告
        var cloneSelfRoutesKeys = Object.keys(cloneSelfRoutes);
        for (var i = 0; i < cloneSelfRoutesKeys.length; i += 1) {
          var key = cloneSelfRoutesKeys[i];
          if (key !== '*') {// 通配符不警告
            (0, _warn.warn)("\u5B9E\u4F8B\u5316\u65F6\u4F20\u9012\u7684routes\u53C2\u6570\uFF1A\r\n\r\n ".concat(JSON.stringify(cloneSelfRoutes[key]), " \r\n\r\n \u5728pages.json\u4E2D\u672A\u627E\u5230\u3002\u81EA\u5B9A\u6392\u9664\u6389\uFF0C\u4E0D\u4F1A\u6DFB\u52A0\u5230\u8DEF\u7531\u4E2D"));
          }
        }
      }
    }
  } else {// 不使用任何的uni配置完全使用 完全使用component作为页面使用
    var _Routes = routes || Router.selfRoutes;
    var RoutesKeys = Object.keys(_Routes);
    for (var _i = 0; _i < RoutesKeys.length; _i += 1) {
      var _key = RoutesKeys[_i];
      var item = _Routes[_key];
      // eslint-disable-next-line
      if (item._ROUTERPATH != null) {// 不寻找children下的路径，只取第一层
        continue;
      }
      delete item.components;
      delete item.children;
      item.path = item.aliasPath || item.path; // 优先获取别名为路径
      if (item.path !== '*') {
        item.component = item.component.render || item.component; // render可能是用户使用addRoutes api进行动态添加的
      }
      item.meta = _objectSpread({},
      item.meta || {}, {
        PATHKEY: item.aliasPath ? 'aliasPath' : 'path',
        pagePath: item.path.substring(1) });

      var _ProxyRoute = (0, _proxy.proxyBeforeEnter)(Router, item);
      newRouterMap.push(_ProxyRoute);
    }
  }
  return newRouterMap;
};exports.diffRouter = diffRouter;

/***/ }),
/* 88 */
/*!*************************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/vueRouter/proxy/proxy.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.proxyEachHooks = exports.proxyBeforeEnter = void 0;var _concat = __webpack_require__(/*! ../concat */ 89);
var _base = __webpack_require__(/*! ../base */ 76);
var _myArray = _interopRequireDefault(__webpack_require__(/*! ../extends/myArray */ 90));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                    * 通过 Object.defineProperty 代理一个对象主要是拦截beforeEnter 生命钩子
                                                                                                                                                                    * @param {Router} Router  路由实例对象
                                                                                                                                                                    * @param {Object} BeProxy 需要代理的路由表
                                                                                                                                                                    */
var proxyBeforeEnter = function proxyBeforeEnter(Router, BeProxy) {
  var proxyDc = Object.create(null); // 创建没有继承的属性
  var BeProxyKeys = Object.keys(BeProxy);var _loop = function _loop(
  i) {
    var key = BeProxyKeys[i];
    Object.defineProperty(proxyDc, key, {
      enumerable: true,
      configurable: true,
      get: function get() {
        var value = BeProxy[key];
        if (key == 'beforeEnter' && value !== undefined) {
          return function (to, from, next) {
            (0, _concat.beforeEnterHooks)(to, from, next, value, Router);
          };
        }
        return value;
      },
      set: function set(v) {
        BeProxy[key] = v;
      } });};for (var i = 0; i < BeProxyKeys.length; i += 1) {_loop(i);

  }
  return proxyDc;
};

/**
    * 在uni-app没有注入生命周期时先直接代理相关生命周期数组
    * @param {Object} Router
    * @param {Object} key
    * @param {Funtion} hookFun
    */exports.proxyBeforeEnter = proxyBeforeEnter;
var proxyEachHooks = function proxyEachHooks(Router, key, hookFun) {
  var vueOldHooks = _base.vuelifeHooks[key];
  return new _myArray.default(Router, vueOldHooks, hookFun);
};exports.proxyEachHooks = proxyEachHooks;

/***/ }),
/* 89 */
/*!********************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/vueRouter/concat.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.registerRouter = exports.triggerLifeCycle = exports.beforeHooks = exports.afterHooks = exports.beforeEnterHooks = exports.forMatNext = exports.appMount = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 22));var _warn = __webpack_require__(/*! ../helpers/warn */ 77);
var _util = __webpack_require__(/*! ./util */ 87);


var _util2 = __webpack_require__(/*! ../helpers/util */ 74);
var _base = __webpack_require__(/*! ./base */ 76);
var _config = __webpack_require__(/*! ../helpers/config */ 75);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var beforeEachCount = 0;
var afterEachCount = 0;
var resolveLaunch = null;
var beforeEnterDep = []; // 记录当前是否有重复的页面进入 避免重复触发
var beforeEachLaunch = new Promise(function (resolve) {return resolveLaunch = resolve;});

/**
                                                                                           * 把vue实例进行挂载到dom下
                                                                                           * @param {Router} Router uni-simple-router实例对象
                                                                                           */
var appMount = function appMount() {
  if (_base.vueMount.length == 0) {
    return (0, _warn.err)('检测到您未进行dom模型挂载操作，请调用api\r\n\r\n RouterMount(Vim: any, el: any): void');
  }var _vueMount$ =



  _base.vueMount[0],Vim = _vueMount$.Vim,el = _vueMount$.el;
  var formatEl = el;
  if (el == null) {
    formatEl = '#app'; // 这是uni-app在h5中的官方节点
  }
  try {
    Vim.$mount(formatEl);
  } catch (error) {
    (0, _warn.warn)("\u6302\u8F7Dvue\u8282\u70B9\u65F6\u9519\u8BEF\u5566".concat(error));
  }
};

/**
    * 格式化 next传递过来的参数 作为vue-router可用的
    * @param {Object} to//即将跳转到的路由页面
    * @param {*} Intercept
    * @param {Funtion} next//路由连接管道
    * @param {Router} Router//路由对象
    */exports.appMount = appMount;
var forMatNext = function forMatNext(to, Intercept, next, Router) {var
  CONFIG = Router.CONFIG,selfRoutes = Router.selfRoutes;
  if (CONFIG.h5.vueRouterDev) {// 完全使用vue-router开发的时候 vueRouterDev:true 不用做啥直接略过
    next(Intercept);
    return Intercept;
  }
  if (typeof Intercept === 'object') {// 只有是对象类型的时候 我们才进行格式化
    var navType = Reflect.get(Intercept, 'NAVTYPE');
    delete Intercept.NAVTYPE;
    if (navType == 'push') {
      Intercept.replace = false;
      Intercept.type = 'navigateTo';
    } else {
      Intercept.replace = true; // uni-app导航api所谓的NAVTYPE取值在h5都是replace:true
      Intercept.type = 'reLaunch';
    }
    var name = Reflect.get(Intercept, 'name'); // 统一格式化path
    Intercept.query = Intercept.params || Intercept.query;
    delete Intercept.name;
    delete Intercept.params;
    if (Intercept.query == null) {
      Intercept.query = {};
    }
    if (name != null) {var _nameToRute =
      (0, _util.nameToRute)(name, selfRoutes),aliasPath = _nameToRute.aliasPath,path = _nameToRute.path;
      Intercept.path = aliasPath || path;
    } else {// 当设置别名时可以是别名跳转也可以path跳转
      Intercept.path = Reflect.get(Intercept, 'path');
      var rute = (0, _util.formatUserRule)(Intercept.path, selfRoutes, CONFIG);
      if (rute == null) {
        return false;
      }
      Intercept.path = rute;
    }
    if (CONFIG.encodeURI) {// 如果设置的编码传递则进行编码后传递
      var query = encodeURIComponent(JSON.stringify(Intercept.query));
      var formatQuery = (0, _util2.formatURLQuery)(query);
      Intercept.query = {};
      if (formatQuery != '') {
        Intercept.query.query = formatQuery;
      }
    }
  } else if (Intercept != null && Intercept.constructor === String) {
    Intercept = (0, _util.formatUserRule)(Intercept, selfRoutes, CONFIG);
  }
  var objPath = Intercept;
  if (Intercept != null && Intercept.constructor !== Boolean) {
    objPath = (0, _util.strPathToObjPath)(Intercept);
    if (objPath != null) {
      var type = Reflect.get(objPath, 'type');
      if (type == null) {// 当next()是一个路径时
        objPath.type = 'navigateTo';
      }
    }
  } else if (Intercept === false) {
    Router.lifeCycle.routerAfterHooks[0].call(Router, { H5Intercept: true });
  }
  next(objPath); // 统一格式化为对象的方式传递
  return Intercept;
};
/**
    *  v1.5.4+
    * beforeRouteLeave 生命周期
    * @param {Object} to       将要去的那个页面 vue-router to对象
    * @param {Object} from     从那个页面触发的 vue-router from对象
    * @param {Object} next      vue-router beforeEach next管道函数
    * @param {Object} Router   Router路由对象
    */exports.forMatNext = forMatNext;
var beforeRouteLeaveHooks = function beforeRouteLeaveHooks(to, from, next, Router) {
  return new Promise(function (resolve) {var
    currentRoute = Router.$route.currentRoute;
    if (currentRoute.path == to.path) {// 如果是同一个页面直接返回  不执行页面中的Leave事件
      return resolve();
    }
    var page = (0, _util.getPages)(); // 获取到当前的页面对象
    if (page == null || page._HHYANGbeforeRouteLeaveCalled) {
      (0, _warn.warn)('当前环境下无须执行 beforeRouteLeave。 原因：1.page等于null  2.真的的无须执行');
      return resolve();
    }
    var beforeRouteLeaveArray = page.$options.beforeRouteLeave; // 获取到页面下的 beforeRouteLeave 路由守卫
    if (beforeRouteLeaveArray == null) {// 当前页面没有预设 beforeRouteLeave 啥都不做
      return resolve();
    }var _getRouterNextInfo =
    (0, _util.getRouterNextInfo)(to, from, Router),toRoute = _getRouterNextInfo.toRoute,fromRoute = _getRouterNextInfo.fromRoute;
    var beforeRouteLeave = beforeRouteLeaveArray[0]; // 不管怎么样 只执行第一个钩子  其他都不管
    beforeRouteLeave.call(page, toRoute, fromRoute, function (Intercept) {// 开始执行生命周期
      if (Intercept == null) {// 放行状态  直接返回
        return resolve();
      }
      page._HHYANGbeforeRouteLeaveCalled = true; // 标记一下当前已经做过 beforeRouteLeave 啦
      forMatNext(to, Intercept, next, Router); // 直接交给vue-router 处理
    });
  });
};

/**
    * 修复首页beforeEnter执行两次的问题 https://github.com/SilurianYang/uni-simple-router/issues/67
    *
    * beforeEnter 生命周期
    * @param {Object} to
    * @param {Object} from
    * @param {Object} next
    * @param {Object} userHooks
    * @param {Object} Router
    */
var beforeEnterHooks = function beforeEnterHooks(to, from, next, userHooks, Router) {
  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(resolve) {var res;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:if (!

              beforeEnterDep.includes(to.path)) {_context2.next = 3;break;}
              next();return _context2.abrupt("return",
              resolve());case 3:

              beforeEnterDep = [to.path];if (!

              Reflect.get(Router, 'H5RouterReady')) {_context2.next = 11;break;}_context2.next = 7;return (
                new Promise( /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolveNext) {var _getRouterNextInfo2, toRoute, fromRoute;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_getRouterNextInfo2 =



                            (0, _util.getRouterNextInfo)(to, from, Router), toRoute = _getRouterNextInfo2.toRoute, fromRoute = _getRouterNextInfo2.fromRoute;_context.next = 3;return (
                              userHooks(toRoute, fromRoute, resolveNext));case 3:case "end":return _context.stop();}}}, _callee);}));return function (_x2) {return _ref2.apply(this, arguments);};}()));case 7:res = _context2.sent;

              forMatNext(to, res, next, Router);_context2.next = 12;break;case 11:

              next();case 12:

              resolve();case 13:case "end":return _context2.stop();}}}, _callee2);}));return function (_x) {return _ref.apply(this, arguments);};}());

};
/**
    * vueAfter 生命周期
    * @param {Object} to
    * @param {Object} from
    * @param {Object} next
    * @param {Object} Router
    */exports.beforeEnterHooks = beforeEnterHooks;
var afterHooks = /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(to, from, next, Router) {var _getRouterNextInfo3, toRoute, fromRoute;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
            _base.vuelifeHooks.afterHooks[0](to, from);if (!
            _config.lifeCycle.afterHooks[0]) {_context3.next = 10;break;}if (!(
            afterEachCount === 0)) {_context3.next = 6;break;}_context3.next = 5;return (
              beforeEachLaunch);case 5:
            appMount(Router);case 6:_getRouterNextInfo3 =




            (0, _util.getRouterNextInfo)(to, from, Router), toRoute = _getRouterNextInfo3.toRoute, fromRoute = _getRouterNextInfo3.fromRoute;
            _config.lifeCycle.afterHooks[0](toRoute, fromRoute);_context3.next = 11;break;case 10:
            if (afterEachCount === 0) {
              appMount(Router);
            }case 11:
            afterEachCount += 1;
            Router.lifeCycle.routerAfterHooks[0].call(Router);case 13:case "end":return _context3.stop();}}}, _callee3);}));return function afterHooks(_x3, _x4, _x5, _x6) {return _ref3.apply(this, arguments);};}();

/**
                                                                                                                                                                                                                        * vueBefore 生命周期
                                                                                                                                                                                                                        * @param {Object} to       将要去的那个页面 vue-router to对象
                                                                                                                                                                                                                        * @param {Object} from     从那个页面触发的 vue-router from对象
                                                                                                                                                                                                                        * @param {Object} next      vue-router beforeEach next管道函数
                                                                                                                                                                                                                        * @param {Object} H5Config
                                                                                                                                                                                                                        */exports.afterHooks = afterHooks;
var beforeHooks = function beforeHooks(to, from, next, Router) {
  return new Promise( /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(resolve) {var H5;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.next = 2;return (
                Router.lifeCycle.routerbeforeHooks[0].call(Router));case 2:_context6.next = 4;return (
                beforeRouteLeaveHooks(to, from, next, Router));case 4: // 执行1.5.4+ beforeRouteLeave生命钩子
              H5 = Router.CONFIG.h5;
              _base.vuelifeHooks.beforeHooks[0](to, from, /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(Intercept) {var res, beforeIntercept, selfRoutes, beforeEnter;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:if (!(
                          Intercept != null && H5.keepUniIntercept === true && H5.vueRouterDev === false)) {_context5.next = 5;break;}
                          next(Intercept);
                          (0, _warn.warn)('uni-app 内部强制触发跳转拦截');
                          beforeEachCount += 1;return _context5.abrupt("return",
                          resolve());case 5:if (


                          _config.lifeCycle.beforeHooks[0]) {_context5.next = 10;break;}
                          next();
                          beforeEachCount += 1;
                          resolveLaunch();return _context5.abrupt("return",
                          resolve());case 10:_context5.next = 12;return (

                            new Promise( /*#__PURE__*/function () {var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(resolveNext) {var _getRouterNextInfo4, toRoute, fromRoute;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_getRouterNextInfo4 =



                                        (0, _util.getRouterNextInfo)(to, from, Router), toRoute = _getRouterNextInfo4.toRoute, fromRoute = _getRouterNextInfo4.fromRoute;_context4.next = 3;return (
                                          _config.lifeCycle.beforeHooks[0](toRoute, fromRoute, resolveNext));case 3:case "end":return _context4.stop();}}}, _callee4);}));return function (_x9) {return _ref6.apply(this, arguments);};}()));case 12:res = _context5.sent;

                          beforeIntercept = forMatNext(to, res, next, Router);if (!(
                          beforeEachCount == 0 && beforeIntercept == null && to.meta.isTabBar)) {_context5.next = 20;break;} // 首次触发beforeEach，并且首页没有进行跳转的情况下才触发beforeEnter 主要是keep-alive

                          selfRoutes =
                          Router.selfRoutes;
                          beforeEnter = Reflect.get(selfRoutes["/".concat(to.meta.pagePath)], 'beforeEnter');if (!
                          beforeEnter) {_context5.next = 20;break;}_context5.next = 20;return (
                            beforeEnterHooks(to, from, next, beforeEnter, Router));case 20:


                          beforeEachCount += 1;
                          resolveLaunch();
                          resolve();case 23:case "end":return _context5.stop();}}}, _callee5);}));return function (_x8) {return _ref5.apply(this, arguments);};}());case 6:case "end":return _context6.stop();}}}, _callee6);}));return function (_x7) {return _ref4.apply(this, arguments);};}());


};
/**
    * 通过自动调用router api来完成触发生命周期
    * 修复 history 模式下报错的问题  https://github.com/SilurianYang/uni-simple-router/issues/38
    * 修复 history 模式下刷新页面参数丢失的问题 https://github.com/SilurianYang/uni-simple-router/issues/45
    * 修复 history 模式下首次打开页面url错误时不走 path:* 的匹配项  https://github.com/SilurianYang/uni-simple-router/issues/58
    *
    * @param {Object} Router //当前simple-router 对象
    * @param {Object} vueRouter vue-router对象
    */exports.beforeHooks = beforeHooks;
var triggerLifeCycle = function triggerLifeCycle(Router, vueRouter) {var
  CONFIG = Router.CONFIG;
  var currRoute = vueRouter.currentRoute;
  if (vueRouter.mode === 'hash') {var

    query =

    currRoute.query,path = currRoute.path;

    var URLQuery = (0, _util.encodeURLQuery)(CONFIG, query, 'hash');

    vueRouter.replace("".concat(path).concat(URLQuery));
  } else {var _getRouterNextInfo5 =


    (0, _util.getRouterNextInfo)(currRoute, currRoute, Router),toRoute = _getRouterNextInfo5.toRoute;
    var _URLQuery = (0, _util.encodeURLQuery)(CONFIG, currRoute.query, 'history');
    vueRouter.replace({
      path: toRoute.aliasPath || toRoute.path || currRoute.path,
      query: _URLQuery,
      type: 'redirectTo' });

  }
};

/** 注册自定义的路由到vue-router中 前提是必须使用vueRouter开发模式
    * @param {Object} Router
    * @param {Object} vueRouter
    * @param {Boolean} vueRouterDev
    */exports.triggerLifeCycle = triggerLifeCycle;
var registerRouter = function registerRouter(Router, vueRouter, vueRouterDev) {
  var routeMap = [];
  if (!vueRouterDev) {// 则进行对比两个路由表  主要工作是做路径的优化
    routeMap = (0, _util.diffRouter)(Router, vueRouter, Router.CONFIG.h5.useUniConfig);
  } else {// 完全使用vue-router开发时直接采用开发者的路由表
    routeMap = (0, _util.vueDevRouteProxy)(Router.CONFIG.routes, Router);
  }
  var createRouter = function createRouter() {return new vueRouter.constructor({
      base: vueRouter.options.base,
      mode: vueRouter.options.mode,
      routes: routeMap });};

  var router = createRouter();
  vueRouter.matcher = router.matcher;
  _config.Global.vueRouter = vueRouter; // 把当前vueRouter缓存到全局对象中
  _config.Global.RouterReadyPromise(); // router已经准备就绪 调用promise.resolve();
  Router.H5RouterReady = true; // 并挂载到Router对象下
  // 注册完成所有的钩子及相关参数，手动触发Router的生命周期
  setTimeout(function () {
    triggerLifeCycle(Router, vueRouter);
  });
};exports.registerRouter = registerRouter;

/***/ }),
/* 90 */
/*!*****************************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/vueRouter/extends/myArray.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _createSuper(Derived) {return function () {var Super = _getPrototypeOf(Derived),result;if (_isNativeReflectConstruct()) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct;} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         * 实现一个继承的 数组类  代理掉 vue-router 生命钩子的数据
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         */var
MyArray = /*#__PURE__*/function (_Array) {_inherits(MyArray, _Array);var _super = _createSuper(MyArray);
  function MyArray(Router, vueOldHooks, hookFun) {var _this;_classCallCheck(this, MyArray);
    _this = _super.call(this);
    _this.Router = Router;
    _this.vueOldHooks = vueOldHooks;
    _this.hookFun = hookFun;return _this;
  }_createClass(MyArray, [{ key: "push", value: function push(

    v) {var _this2 = this;
      this.vueOldHooks.splice(0, 1, v); // 把vue-router路由生命钩子保存起来
      this[this.length] = function (to, from, next) {
        _this2.hookFun(to, from, next, _this2.Router);
      };
    } }]);return MyArray;}( /*#__PURE__*/_wrapNativeSuper(Array));var _default =


MyArray;exports.default = _default;

/***/ }),
/* 91 */
/*!*******************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/lifeCycle/hooks.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.registerRouterHooks = exports.registerHook = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 22));var _util = __webpack_require__(/*! ../helpers/util */ 74);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}







var registerHook = function registerHook(list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) list.splice(i, 1);
  };
};
/**
    * 注册全局Router生命钩子
    */exports.registerHook = registerHook;
var registerRouterHooks = function registerRouterHooks() {
  registerHook(this.lifeCycle.routerbeforeHooks, function () {var _this = this;
    return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                _this.CONFIG.routerBeforeEach(); // 触发暴露给开发者的生命钩子
                if ((0, _util.appPlatform)(true) === 'H5') {
                  H5PATCH.on('toogle', 'startLodding');
                }return _context.abrupt("return",
                resolve(true));case 3:case "end":return _context.stop();}}}, _callee);}));return function (_x) {return _ref.apply(this, arguments);};}());

  });
  registerHook(this.lifeCycle.routerAfterHooks, function () {var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (res.H5Intercept !== true) {
      this.CONFIG.routerAfterEach(); // 触发暴露给开发者的生命钩子
    }
    if ((0, _util.appPlatform)(true) === 'H5') {
      H5PATCH.on('toogle', 'stopLodding');
    }
    return true;
  });
};exports.registerRouterHooks = registerRouterHooks;

/***/ }),
/* 92 */
/*!***********************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/patch/applets-patch.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
/**
                                                                                                      * 截止 1.3.5 版本 不做任何操作
                                                                                                      * @param {element} el dom节点
                                                                                                      */
var appletsMount = function appletsMount(Vim) {
  Vim.$mount();
};var _default =

appletsMount;exports.default = _default;

/***/ }),
/* 93 */
/*!*******************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/patch/app-patch.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 截止 1.3.5 版本 不做任何操作
                                                                                                      * @param {element} el dom节点
                                                                                                      */
var appMount = function appMount(Vim) {
  Vim.$mount();
};var _default =
appMount;exports.default = _default;

/***/ }),
/* 94 */
/*!******************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/helpers/mixins.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _config = __webpack_require__(/*! ./config */ 75);
var _init = _interopRequireDefault(__webpack_require__(/*! ../vueRouter/init */ 95));
var _init2 = __webpack_require__(/*! ../appRouter/init */ 96);
var _init3 = _interopRequireDefault(__webpack_require__(/*! ../appletsRouter/init */ 97));
var _util = __webpack_require__(/*! ./util */ 74);
var _hooks = __webpack_require__(/*! ../appRouter/hooks */ 79);
var _hooks2 = __webpack_require__(/*! ../appletsRouter/hooks */ 82);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * 获取一些需要在各个平台混入的事件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @param {Object} Router 当前原始路由对象
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
var getMixins = function getMixins(Router) {
  return {
    H5: {
      beforeCreate: function beforeCreate() {
        if (this.$options.router) {
          (0, _init.default)(Router.$root, this.$options.router, this);
        }
      } },

    APP: {
      onLaunch: function onLaunch() {
        _config.uniAppHook.onLaunched = true; // 标志已经触发了 onLaunch 事件
        _init2.appInit.call(this, Router.$root);
      },
      onLoad: function onLoad() {
        // 第一个页面 拦截所有生命周期
        if (_config.uniAppHook.onLaunched && !_config.uniAppHook.pageReady) {
          _config.uniAppHook.onLaunched = false;
          _hooks.proxyIndexHook.call(this, Router.$root);
        }
        (0, _init2.removeBackPressEvent)(this.$mp.page, this.$options); // 移除页面的onBackPress事件
      },
      onBackPress: function onBackPress() {for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}
        return _init2.pageIsHeadBack.call(Router.$root, this.$mp.page, this.$options, args);
      } },

    APPLETS: {
      onLaunch: function onLaunch() {
        _config.uniAppHook.onLaunched = true; // 标志已经触发了 onLaunch 事件
        _init3.default.call(this, Router.$root);
      },
      onLoad: function onLoad() {
        if (_config.uniAppHook.onLaunched && !_config.uniAppHook.pageReady) {// 必须是第一个页面
          _config.uniAppHook.onLaunched = false;
          _hooks2.appletsProxyIndexHook.call(this, Router.$root);
        }
      } } };


};

var initMixins = function initMixins(Vue, Router) {
  Vue.mixin(_objectSpread({},
  getMixins(Router)[(0, _util.appPlatform)(true)]));

};var _default =

initMixins;exports.default = _default;

/***/ }),
/* 95 */
/*!******************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/vueRouter/init.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _concat = __webpack_require__(/*! ./concat */ 89);
var _util = __webpack_require__(/*! ./util */ 87);
var _warn = __webpack_require__(/*! ../helpers/warn */ 77);
var _proxy = __webpack_require__(/*! ./proxy/proxy */ 88);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * 重写掉H5端 uni-app原始存在的bug
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * @param {Object} Router
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   */
var rewriteUniFun = function rewriteUniFun(Router) {
  if (Router.CONFIG.h5.rewriteFun === false) {// 不需要重写
    return false;
  }
  uni.reLaunch = function (_ref)

  {var url = _ref.url;
    if (url === '/') {
      (0, _warn.warn)('H5端 uni.reLaunch(\'/\')时 默认被重写了! 你可以使用 this.$Router.replaceAll() 或者 uni.reLaunch(\'/\'?xxx)');
      // eslint-disable-next-line
      if (history.length > 1) {// 只有在有历史记录的时候才返回  不然直接返回首页
        return Router.back();
      }
      return Router.replaceAll('/');
    }
    var path = url.match(/^[^?]+|(\/)/)[0];
    try {
      var query = {};
      url.replace(/([^?&]+)=([^?&]+)/g, function (s, v, k) {
        query[v] = decodeURIComponent(k);
        return "".concat(k, "=").concat(v);
      });
      Router.replaceAll({
        path: path,
        query: query });

    } catch (e) {
      (0, _warn.err)("".concat(url, "\u89E3\u6790\u5931\u8D25\u4E86....  \u8BD5\u8BD5 this.$Router.replaceAll() \u5427"));
    }
  };
  uni.navigateBack = function (delta) {
    var backLayer = delta;
    if (delta.constructor === Object) {// 这种可能就只是uni-app自带的返回按钮,还有种可能就是开发者另类传递的
      backLayer = 1;
    }
    Router.back(backLayer, delta);
  };
};
/**
    * 拦截并注册vueRouter中的生命钩子，路由表解析
    * @param {Object} Router
    * @param {vueRouter} vueRouter
    */
var init = function init(Router, vueRouter) {
  var CONFIG = Router.CONFIG.h5;
  vueRouter.afterHooks = (0, _proxy.proxyEachHooks)(Router, 'afterHooks', _concat.afterHooks);
  vueRouter.beforeHooks = (0, _proxy.proxyEachHooks)(Router, 'beforeHooks', _concat.beforeHooks);
  var objVueRoutes = (0, _util.fromatRoutes)(vueRouter.options.routes, false, {}); // 返回一个格式化好的routes 键值对的形式
  var objSelfRoutes = (0, _util.fromatRoutes)(Router.CONFIG.routes, true, CONFIG);
  Router.vueRoutes = objVueRoutes; // 挂载vue-routes到当前的路由下
  Router.selfRoutes = _objectSpread({},
  Router.selfRoutes || {}, {},
  objSelfRoutes);
  // 挂载self-routes到当前路由下
  Router.$route = vueRouter; // 挂载vue-router到$route
  rewriteUniFun(Router); // 重新掉uniapp上的一些有异常的方法
  (0, _concat.registerRouter)(Router, vueRouter, CONFIG.vueRouterDev);
};var _default =
init;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 96 */
/*!******************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/appRouter/init.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.appInit = exports.pageIsHeadBack = exports.removeBackPressEvent = exports.registerLoddingPage = exports.rewriteUniFun = void 0;var _hooks = __webpack_require__(/*! ./hooks */ 79);


var _config = __webpack_require__(/*! ../helpers/config */ 75);
var _util = __webpack_require__(/*! ./util */ 80);
var _warn = __webpack_require__(/*! ../helpers/warn */ 77);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * 重写掉uni-app的 uni.getLocation 和 uni.chooseLocation APi
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @param {Object} Router  当前路由对象
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
var rewriteUniFun = function rewriteUniFun(Router) {
  var oldSwitchTab = uni.switchTab; // 缓存 跳转到 tabBar 页面
  uni.switchTab = function (_ref) {var url = _ref.url,args = _objectWithoutProperties(_ref, ["url"]);var normal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (normal === true || _config.uniAppHook.pageReady === false) {// 调用原始的uni-app  api
      oldSwitchTab(_objectSpread({
        url: url },
      args));

    } else {
      if (_config.uniAppHook.pageReady) {// 只有在路由守卫等  处理完所有操作后才能触发
        var path = Router.$Route.path; // 获取当前路径
        if (path == url) {// 路径相同不执行
          return (0, _warn.warn)("\u5F53\u524D\u8DF3\u8F6C\u8DEF\u5F84\uFF1A".concat(url, "  \u5DF2\u5728\u672C\u9875\u9762\u65E0\u987B\u8DF3\u8F6C"));
        }
        _hooks.beforeTabHooks.call(Router, url.substring(1)); // 不要 /
      } else {
        (0, _warn.warn)('路由守卫正在忙碌中 不允许执行 ‘uni.switchTab’');
      }
    }
  };
};

/**
    * 对当前app做一个动画页面 用来过渡首次next 等待时间过长的尴尬
    * @param {Object} Router 当前路由对象
    */exports.rewriteUniFun = rewriteUniFun;
var registerLoddingPage = function registerLoddingPage(Router) {var _Router$CONFIG$APP =
  Router.CONFIG.APP,loddingPageHook = _Router$CONFIG$APP.loddingPageHook,loddingPageStyle = _Router$CONFIG$APP.loddingPageStyle; // 获取app所有配置
  var view = new plus.nativeObj.View('router-loadding', _objectSpread({
    top: '0px',
    left: '0px',
    height: '100%',
    width: '100%' },
  loddingPageStyle.call(Router)));

  loddingPageHook.call(Router, view); // 触发等待页面生命周期
};
/**
    * 移除当前 页面上 非router 声明的 onBackPress 事件
    * @param {Object} page 当前 vue 组件对象
    * @param {Object} options	当前page对象的 $options
    * 修复 https://github.com/SilurianYang/uni-simple-router/issues/106
    */exports.registerLoddingPage = registerLoddingPage;
var removeBackPressEvent = function removeBackPressEvent(page, options) {
  var isBack = (0, _util.assertCanBack)(page);
  if (isBack) {// 可返回
    options.onBackPress = [options.onBackPress[0]]; // 路由混入的都干掉
  }
};
/**
    * 判断当前页面是否需要拦截返回
    *
    * @param {Object} page 当前 vue 组件对象
    * @param {Object} options 当前 vue 组件对象下的$options对象
    * @param {Array} args  当前页面是点击头部返回还是底部返回
    * 修复 https://github.com/SilurianYang/uni-simple-router/issues/66
    *
    * this 为当前 Router 对象
    */exports.removeBackPressEvent = removeBackPressEvent;
var pageIsHeadBack = function pageIsHeadBack(page, options, args) {
  if (args[0].from == 'navigateBack') {// 调用api返回
    if (_config.Global.LockStatus) {// 正在跳转的时候 返回按键按的太快啦
      (0, _warn.warn)('当前页面正在处于跳转状态，请稍后再进行跳转....');
      return true;
    }
    _config.Global.LockStatus = true; // 设置为锁住状态
    _hooks.backApiCallHook.call(this, options, args);
    return true;
  }
  var isBack = (0, _util.assertCanBack)(page);
  if (isBack) {// 可返回
    if (_config.Global.LockStatus) {// 正在跳转的时候 返回按键按的太快啦
      (0, _warn.warn)('当前页面正在处于跳转状态，请稍后再进行跳转....');
      return true;
    }
    _config.Global.LockStatus = true; // 设置为锁住状态
    _hooks.beforeBackHooks.call(this, options, args);
    return true;
  }
  return false;
};

/**
    * 开始初始化app端路由配置
    *
    * @param {Object} Router
    *
    * this 为当前 page 对象
    */exports.pageIsHeadBack = pageIsHeadBack;
var appInit = function appInit(Router) {
  _hooks.proxyLaunchHook.call(this);var
  holdTabbar = Router.CONFIG.APP.holdTabbar;
  if (holdTabbar) {// 开启tab拦截时
    rewriteUniFun(Router);
  }
  registerLoddingPage(Router);
};exports.appInit = appInit;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 97 */
/*!**********************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/appletsRouter/init.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _hooks = __webpack_require__(/*! ./hooks */ 82);

/**
                                                                                                                                      * 开始初始化app端路由配置
                                                                                                                                      *
                                                                                                                                      * @param {Object} Router 	当前Router对象
                                                                                                                                      *
                                                                                                                                      * this 为当前 page 对象
                                                                                                                                      */
var appletsInit = function appletsInit() {
  _hooks.proxyLaunchHook.call(this);
};var _default =
appletsInit;exports.default = _default;

/***/ }),
/* 98 */
/*!********************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/uni-simple-router/helpers/urlQuery.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _config = __webpack_require__(/*! ./config */ 75);
var _warn = __webpack_require__(/*! ./warn */ 77);function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var nodeURL = __webpack_require__(/*! query-string */ 99);var

ParseQuery = /*#__PURE__*/function () {function ParseQuery() {_classCallCheck(this, ParseQuery);}_createClass(ParseQuery, [{ key: "isDepthObject",




    /**
                                                                                                                                                    * 判断当前这个对象是否为深度对象
                                                                                                                                                    * @param {Object} obj
                                                                                                                                                    */value: function isDepthObject(
    obj) {
      var str = JSON.stringify(obj);
      return str.match(/}/g).length > 1;
    }

    /**
       * 从URL中提取查询字符串
       * @param {String} url
       */ }, { key: "extract", value: function extract(
    url) {
      return nodeURL.extract(url);
    }

    /**
       * 把一个 key=value&key1=value 的字符串转成对象
       * @param {string} strQuery key=value&key1=value 类型的字符串
       */ }, { key: "parse", value: function parse(
    strQuery) {
      return nodeURL.parse(strQuery);
    }

    /**
       * 把一个对象转成 key=value&key1=value 类型的字符串
       * @param {Object} ObjQuery 符合js标注的对象
       * @param {Boolean} intact 是否在转成的字符串前添加？号
       */ }, { key: "stringify", value: function stringify(
    ObjQuery) {var intact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var strQuery = nodeURL.stringify(ObjQuery);
      if (intact) {
        return "?".concat(strQuery);
      }
      return strQuery;
    }

    /**
       * 把一个对象或者 key=value&key1=value 类型的数据加密成 query=encodeURIComponent(value)
       * @param {Object|String} query 符合js标注的对象 或者 key=value&key1=value 字符串
       * @param {Boolean} intact 是否在转成的字符串前添加？号
       */ }, { key: "encode", value: function encode(
    query) {var intact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var
      strQuery = '',formatQuery = '';
      if (query == null) {
        (0, _warn.warn)('加密参数没有传递，你知道？', true);
        return '';
      }
      if (query.constructor === String) {// 字符串 尝试 转成 对象
        strQuery = JSON.stringify(this.parse(query));
      } else if (query.constructor === Object) {// 直接转成字符串对象即可
        if (Object.keys(query).length === 0) {
          (0, _warn.warn)('当前参数不满足加密规范！');
          return '';
        }
        strQuery = JSON.stringify(query);
      }
      if (intact) {
        formatQuery = '?';
      }
      formatQuery += "query=".concat(encodeURIComponent(strQuery));
      return formatQuery;
    }

    /**
       * 把一个已经加密好的字符串 query=encodeURIComponent(value) 解密成 对象
       * @param {string} strQuery  已经加密好的字符串 query=encodeURIComponent(value)
       */ }, { key: "decode", value: function decode(
    strQuery) {
      if (strQuery == null) {
        (0, _warn.warn)('解密参数没有传递，你知道？', true);
        return {};
      }
      var jsonQuery = strQuery;
      if (strQuery.constructor === Object) {// 如果是对象 看能不能满足要求
        jsonQuery = strQuery.query;
        if (jsonQuery == null) {
          (0, _warn.warn)('当前解密参数不满足编码规则');
          return {};
        }
        jsonQuery = "query=".concat(jsonQuery);
      }
      var decode = {};
      // query 长这个样  query=encodeURIComponent(value)
      var decodeStr = decodeURIComponent(jsonQuery);var _this$parse =
      this.parse(decodeStr),query = _this$parse.query; // 转成 json 获取到正真的json字符串
      if (query == null) {
        (0, _warn.warn)('当前解密参数不满足编码规则');
      } else {
        try {
          decode = JSON.parse(query);
        } catch (error) {
          (0, _warn.warn)('当前解密参数不满足编码规则');
        }
      }
      return decode;
    } }, { key: "queryGet", value: function queryGet(

    query) {var
      encodeURI = _config.Global.Router.CONFIG.encodeURI; // 获取到路由配置
      var decode = query,historyObj = query,strQuery = '';
      switch (encodeURI) {
        case true:{// 加密模式
            decode = this.decode(query);
            strQuery = this.encode(decode);
            historyObj = {
              query: encodeURIComponent(JSON.stringify(decode)) };

            break;
          }
        case false:{// 不加密模式
            strQuery = this.stringify(query);
            break;
          }
        default:{
            (0, _warn.err)('未知参数模式，请检查 \'encodeURI\'', true);
          }}

      return { strQuery: strQuery, historyObj: historyObj, decode: decode };
    }


    /**
       * 对需要传递的参数进行加密解密
       * @param {Object|String} query get为false 必须为 Object 类型
       * @param {String} get 是取值 还是通过api传值
       */ }, { key: "transfer", value: function transfer()
    {var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var
      encodeURI = _config.Global.Router.CONFIG.encodeURI; // 获取到路由配置
      switch (encodeURI) {
        case true:{
            // 加密模式
            return this.encode(query, false);
          }
        case false:{
            // 不加密模式
            return this.stringify(query);
          }
        default:{
            (0, _warn.err)('未知参数模式，请检查 \'encodeURI\' ', true);
          }}

    } }, { key: "queryName", get: function get() {return nodeURL;} }]);return ParseQuery;}();var _default =


ParseQuery;exports.default = _default;

/***/ }),
/* 99 */
/*!********************************************!*\
  !*** ./node_modules/query-string/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__(/*! strict-uri-encode */ 100);
var objectAssign = __webpack_require__(/*! object-assign */ 101);

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

exports.extract = function (str) {
	return str.split('?')[1] || '';
};

exports.parse = function (str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^(\?|#|&)/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		formatter(decodeURIComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
};

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};


/***/ }),
/* 100 */
/*!*************************************************!*\
  !*** ./node_modules/strict-uri-encode/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ }),
/* 101 */
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */
/*!******************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/index/index_header_style.png ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/images/pages/index/index_header_style.png";

/***/ }),
/* 107 */
/*!******************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/index/coach_icon_confirm.png ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 108 */
/*!****************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/index/coach_icon_teach.png ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 109 */
/*!**************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/index/coach_icon_end.png ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 110 */
/*!*****************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/index/coach_icon_lesson.png ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 111 */,
/* 112 */,
/* 113 */
/*!***************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/mixins/mobileMixin.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.mobileMixin = void 0;var mobileMixin = {
  data: function data() {
    return {
      isLoading: false,
      pageLoaded: false };

  },
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    next();
  },
  methods: {
    isIphone: function isIphone() {
      return /iphone|ipod|ipad/i.test(navigator.appVersion);
    },
    loading: function loading() {
      uni.showLoading({
        duration: 0,
        title: "加载中..." });

      this.isLoading = true;
    },
    loaded: function loaded() {
      this.isLoading = false;
      uni.hideLoading();
    },
    normalizeImage: function normalizeImage(selectors) {
      // let images = document.querySelectorAll(`${selectors} img`);
      // for (let image of images) {
      //   image.removeAttribute("width");
      //   image.removeAttribute("height");
      // }
    } } };exports.mobileMixin = mobileMixin;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 114 */
/*!***********************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/services/ticketTypeService.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 22));var _ajax = _interopRequireDefault(__webpack_require__(/*! @/utils/ajax.js */ 26));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =

{
  getTicketTypesForWeiXinSaleAsync: function getTicketTypesForWeiXinSaleAsync(input) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var response;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                _ajax.default.post("/ticketType/GetTicketTypesForWeiXinSaleAsync", input));case 2:response = _context.sent;return _context.abrupt("return",
              response.result);case 4:case "end":return _context.stop();}}}, _callee);}))();
  },
  getTicketTypeDescriptionAsync: function getTicketTypeDescriptionAsync(ticketTypeId) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var response;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                _ajax.default.get("/ticketType/GetTicketTypeDescriptionAsync?ticketTypeId=".concat(
                ticketTypeId)));case 2:response = _context2.sent;return _context2.abrupt("return",

              response.result);case 4:case "end":return _context2.stop();}}}, _callee2);}))();
  },
  getTicketTypeForWeiXinSaleAsync: function getTicketTypeForWeiXinSaleAsync(ticketTypeId) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {var response;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
                _ajax.default.get("/ticketType/GetTicketTypeForWeiXinSaleAsync?ticketTypeId=".concat(
                ticketTypeId)));case 2:response = _context3.sent;return _context3.abrupt("return",

              response.result);case 4:case "end":return _context3.stop();}}}, _callee3);}))();
  },
  getTicketTypeChangCiComboboxItemsAsync: function getTicketTypeChangCiComboboxItemsAsync(ticketTypeId, date) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var response;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (
                _ajax.default.get("/ticketType/GetTicketTypeChangCiComboboxItemsAsync?ticketTypeId=".concat(
                ticketTypeId, "&date=").concat(date)));case 2:response = _context4.sent;return _context4.abrupt("return",

              response.result);case 4:case "end":return _context4.stop();}}}, _callee4);}))();
  } };exports.default = _default;

/***/ }),
/* 115 */
/*!*******************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/services/scenicService.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 22));var _ajax = _interopRequireDefault(__webpack_require__(/*! ./../utils/ajax.js */ 26));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =

{
  getScenicAsync: function getScenicAsync() {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var response;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                _ajax.default.get("/scenic/GetScenicAsync"));case 2:response = _context.sent;return _context.abrupt("return",
              response.result);case 4:case "end":return _context.stop();}}}, _callee);}))();
  },
  getGroundComboboxItemsAsync: function getGroundComboboxItemsAsync() {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var response;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                _ajax.default.get("/scenic/GetGroundComboboxItemsAsync"));case 2:response = _context2.sent;return _context2.abrupt("return",
              response.result);case 4:case "end":return _context2.stop();}}}, _callee2);}))();
  },
  getGateGroupComboboxItemsAsync: function getGateGroupComboboxItemsAsync(groundId) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {var response;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
                _ajax.default.get("/scenic/GetGateGroupComboboxItemsAsync?groundId=".concat(groundId)));case 2:response = _context3.sent;return _context3.abrupt("return",
              response.result);case 4:case "end":return _context3.stop();}}}, _callee3);}))();
  } };exports.default = _default;

/***/ }),
/* 116 */
/*!*******************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/services/memberService.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 22));var _ajax = _interopRequireDefault(__webpack_require__(/*! @/utils/ajax.js */ 26));
var _tokenService = _interopRequireDefault(__webpack_require__(/*! @/services/tokenService.js */ 55));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =

{
  loginFromWeChatAsync: function loginFromWeChatAsync(input) {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var response;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                _ajax.default.post("/member/LoginFromWeChatAsync", input));case 2:response = _context.sent;
              _this.setMember(response);case 4:case "end":return _context.stop();}}}, _callee);}))();
  },
  loginFromMiniAsync: function loginFromMiniAsync(userInfo) {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var self;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
              self = _this2;_context4.next = 3;return (
                uni.login({
                  success: function success(res) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {var params, response;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:if (!
                              res.code) {_context3.next = 12;break;}if (!

                              userInfo) {_context3.next = 8;break;}
                              params = {
                                code: res.code,
                                userInfo: userInfo };_context3.next = 5;return (

                                _ajax.default.post('/member/LoginFromWechatMiniProgramAsync', params).
                                then(function (res) {

                                  self.setMember(res);
                                }));case 5:response = _context3.sent;_context3.next = 10;break;case 8:_context3.next = 10;return (

                                uni.getUserInfo({
                                  success: function success(rest) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var params, response;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                                              params = {
                                                code: res.code,
                                                userInfo: rest.userInfo };_context2.next = 3;return (

                                                _ajax.default.post('/member/LoginFromWechatMiniProgramAsync', params).
                                                then(function (res) {

                                                  self.setMember(res);
                                                }));case 3:response = _context2.sent;case 4:case "end":return _context2.stop();}}}, _callee2);}))();
                                  } }));case 10:_context3.next = 13;break;case 12:



                              console.log('登录失败！' + res.errMsg);case 13:case "end":return _context3.stop();}}}, _callee3);}))();

                  } }));case 3:case "end":return _context4.stop();}}}, _callee4);}))();

  },
  bindStaffAsync: function bindStaffAsync(input) {var _this3 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var response;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
                _ajax.default.post("/member/BindStaffAsync", input));case 2:response = _context5.sent;
              _this3.setMember(response);case 4:case "end":return _context5.stop();}}}, _callee5);}))();
  },
  registMemberCardAsync: function registMemberCardAsync(input) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.next = 2;return (
                _ajax.default.post("/member/RegistMemberCardAsync", input));case 2:return _context6.abrupt("return", _context6.sent);case 3:case "end":return _context6.stop();}}}, _callee6);}))();
  },
  getElectronicMemberCardAsync: function getElectronicMemberCardAsync() {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7() {var response;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:_context7.next = 2;return (
                _ajax.default.get("/member/GetElectronicMemberCardAsync"));case 2:response = _context7.sent;return _context7.abrupt("return",
              response.result);case 4:case "end":return _context7.stop();}}}, _callee7);}))();
  },
  renewMemberCardAsync: function renewMemberCardAsync(id) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee8() {return _regenerator.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:_context8.next = 2;return (
                _ajax.default.post("/member/RenewMemberCardAsync", {
                  id: id }));case 2:return _context8.abrupt("return", _context8.sent);case 3:case "end":return _context8.stop();}}}, _callee8);}))();

  },
  setMember: function setMember(response) {
    var member = response.result.member;
    member.permissions = response.result.permissions;
    uni.setStorageSync("member", JSON.stringify(member));

    _tokenService.default.setToken(response.result.token);
  },
  getMember: function getMember() {
    var member = uni.getStorageSync("member");
    if (member) {
      return JSON.parse(member);
    }
    return null;
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 117 */
/*!****************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/index/index_swiper_one.png ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/images/pages/index/index_swiper_one.png";

/***/ }),
/* 118 */
/*!****************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/index/index_swiper_two.png ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/images/pages/index/index_swiper_two.png";

/***/ }),
/* 119 */
/*!******************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/index/index_swiper_three.png ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/images/pages/index/index_swiper_three.png";

/***/ }),
/* 120 */
/*!*******************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/index/activity_swiper_one.png ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/images/pages/index/activity_swiper_one.png";

/***/ }),
/* 121 */
/*!*******************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/index/activity_swiper_two.png ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/images/pages/index/activity_swiper_two.png";

/***/ }),
/* 122 */
/*!*********************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/index/activity_swiper_three.png ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/images/pages/index/activity_swiper_three.png";

/***/ }),
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */
/*!************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/utils/validator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var strategies = {
  required: function required(val, name) {
    var result = new ValidateResult();
    if (isNullOrEmpty(val)) {
      result.success = false;
      result.message = name + "不能为空";
      return result;
    }

    return result;
  },
  minLength: function minLength(val, len, name) {
    var result = new ValidateResult();
    if (isNullOrEmpty(val)) {
      return result;
    }

    if (val.length < len) {
      result.success = false;
      result.message = name + "长度不能小于" + len;
      return result;
    }

    return result;
  },
  maxLength: function maxLength(val, len, name) {
    var result = new ValidateResult();
    if (isNullOrEmpty(val)) {
      return result;
    }

    if (val.length > len) {
      result.success = false;
      result.message = name + "长度不能大于" + len;
      return result;
    }

    return result;
  },
  isMobile: function isMobile(val, name) {
    var result = new ValidateResult();
    if (isNullOrEmpty(val)) {
      return result;
    }

    var pattern = /^1\d{10}$/;
    if (!pattern.test(val)) {
      result.success = false;
      result.message = name + "格式不正确";
      return result;
    }

    return result;
  },
  isIdCard: function isIdCard(val, name) {
    var result = new ValidateResult();
    if (isNullOrEmpty(val)) {
      return result;
    }

    var failResult = {
      success: false,
      message: name + "格式不正确" };

    if (val.length != 15 && val.length != 18) {
      return failResult;
    }

    var pattern =
    val.length === 15 ?
    /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/ :
    /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if (!pattern.test(val)) {
      return failResult;
    }

    if (val.length === 18) {
      var weightingFactor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      var total = 0;
      for (var i = 0; i < weightingFactor.length; i++) {
        total += weightingFactor[i] * val[i];
      }
      var code = "10X98765432";
      if (code[total % 11] != val[val.length - 1].toUpperCase()) {
        return failResult;
      }
    }

    return result;
  } };


function isNullOrEmpty(val) {
  if (val === undefined || val === null || val === "") {
    return true;
  }

  return false;
}

function ValidateResult() {
  this.success = true;
  this.message = "";
}

/* 接受验证的数组
      [{
          value: "test",
          name: "关键词",
          rules: [{
              rule: 'required',
              msg: '关键词不能为空'
          }]
      }] */

var validate = function validate(arr) {
  var result = new ValidateResult();
  for (var i = 0, l1 = arr.length; i < l1; i++) {
    var item = arr[i];
    var stop = false;
    for (var k = 0, l2 = item.rules.length; k < l2; k++) {
      var r = item.rules[k];
      var arg = r.rule.split(":");
      var rule = arg.shift();
      if (r.type) {
        arg.unshift(r.type);
      }
      arg.unshift(item.value);
      arg.push(item.name);
      var status = strategies[rule].apply(null, arg);
      if (!status.success) {
        result = status;
        if (r.msg) {
          result.message = r.msg;
        }
        stop = true;
        break;
      }
    }
    if (stop) break;
  }
  return result;
};var _default =

validate;exports.default = _default;

/***/ }),
/* 134 */
/*!**************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/utils/toastHelper.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  noneToast: function noneToast(message) {
    uni.showToast({
      title: message,
      icon: 'none' });

  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 135 */
/*!**********************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/mixins/KeyboardPopupMixin.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.keyboardPopupMixin = void 0;var keyboardPopupMixin = {
  mounted: function mounted() {
  },
  beforeDestroy: function beforeDestroy() {
  },
  methods: {
    onSubPopupChange: function onSubPopupChange(show, height) {
    } } };exports.keyboardPopupMixin = keyboardPopupMixin;

/***/ }),
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */
/*!********************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/ticket-type/ice_icon_right.png ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAYAAADd/14OAAAArUlEQVQokYXRIYpCURQG4M83hikibkCbuIPBFRhMosHkCkyuwqB1wgTBJRjEaLCYB6bOAsSgYBNRrjzhBe97f7pcPvjPPbdkcW9giBluIknQxhQrVPNgkp672KMZg9m0UtwpgiE1rDEpgiEfmGOJzzz4yghbVIpgyBfqRfCCPv7KOegfPfzmzRjmCpVPFIPf6R6P2cts9RVj/LyrCPCEAwbYxQYOcJP+7zn6LDwAXrYaFEg/rnsAAAAASUVORK5CYII="

/***/ }),
/* 143 */,
/* 144 */,
/* 145 */
/*!********************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/ticket-type/ice_swiper_one.jpg ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/images/pages/ticket-type/ice_swiper_one.jpg";

/***/ }),
/* 146 */
/*!********************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/ticket-type/ice_swiper_two.jpg ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/images/pages/ticket-type/ice_swiper_two.jpg";

/***/ }),
/* 147 */
/*!**********************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/ticket-type/ice_swiper_three.jpg ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/images/pages/ticket-type/ice_swiper_three.jpg";

/***/ }),
/* 148 */
/*!*********************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/ticket-type/ice_swiper_four.jpg ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/images/pages/ticket-type/ice_swiper_four.jpg";

/***/ }),
/* 149 */
/*!*********************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/ticket-type/ice_swiper_five.jpg ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/images/pages/ticket-type/ice_swiper_five.jpg";

/***/ }),
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */
/*!***********************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/my/my_icon_course.png ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 167 */
/*!*********************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/my/my_icon_card.png ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAvCAYAAACsaemzAAADB0lEQVRoge2aS2gUQRRFz0wmZhTED5r4AQNKFgomKLjKQkQQREHNVgkKuhbFVVyYLISg6FpFENyI4lZBRdSNoAuDEvwQxe/KaNQo+Weu1PAayhiT7swM3S25UHTXq+LNvV1Vr15XT0YSEXEE2AV8BC4CD6I6qCicoAjlkP7GWUl1Ef1UrERxXC+pz+S8kNTjSXsn6aCkqjQJOm/kC5I2Slok6ZKkcU/YDUmNaRC0xSN9ZkLbDkkPvfYhSZ2SliZVUF5Sl5F9LWnBJH1qJB2W9M0T1i2pNYmC2jySe6fpu0bSZZuWAa5LakqKIEew14jdjeC4RdITT9RPScclLY5b0BUjNCxpQ0Tn1ZLaJf3whDmR2+MStM8jcrKEH3EP4uqE3eu2pOZKCJoqU1gJ1AKjQHcZNvd1QBaoAZYAXcDncicNM0l9Eo2ckdsK7AbmA4UU8c+47M1m0DlgwAnab0lmVQIIloLVQKcT1Gpi+oH7pjibEhEjwFpbny3Ao5w3Mj3AnpgJRoV7+MeAU7ZU5jlBY+akkLL1E8DnP+ZPrUx8nErCH2s/LWslNGYFJR1ZixQO4ynVMORXXJTL2/0q4EQK96HNdl8cECdorhmWA+3xcSsZxfCds2waG7o3Fs/TNEIrgLqAsxM0YI0vLUlN05QbBo4CHUGinfOyA9fYFy+/GSHgXEwMsl6GkNZsO+9XZjfWpCMOQaeBZ8AFz7YMeGz2bZ79gNnu2FnEtMiF6VRmrLcy4rl1ZDfZfa1nr7e+DWEffhwj1G/X756t4KUww5492FK+einalJhdQ2VAsBbylXAeh6BgGv2qhPM4goI70LgJvKqE8zgEdVnx4bKVaqv7sybIXqoJiaQEBRfBBu2dxn/RHLX6YFhHcYzQZOgFdlqg8EfvGvDcQvxIGEdJETT0j/87fLASGv/lPhS8PoxO0zepCMK/05FxU26OGRYCjSkU1GBXFxFzTtB7oNlO8Z/GTK4UuMDxNmsnPbfSq6OIL0AbcC/4JOmOsprc54gUfsFzx1ef3OgA/AZ6qCnC0qzMmAAAAABJRU5ErkJggg=="

/***/ }),
/* 168 */
/*!***********************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/my/my_icon_search.png ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA0CAYAAADIZmusAAADe0lEQVRoge2a7WtPYRjHP7/52cxsVoY8bUQJaVKKrRjlMcqb/QFeidKKlHjhOeWNJXsjXijJqL2QpzYiFitJs0JDJvKQrchYnnbp/rlObmcPv7Od8zu/M/2+dXfuOte57ut7rvu+r+u+zkFETkv0sU9E6K/FgXb+oBv4AgjRQAzIA7KAj8ksilv9p8BqoCMiRCYBV4ASL8I2kV/qnc+ps21AyFGbPCHLEorpw1FBjto0YCJDGhkiUUOGSNTw3xCJe5AZD8zWrbA74PGHAd+AJuCnH0VeiKwETvkZJAm+AhOBT36URGFqxYLI77x4pB5YFtSALhidP9QrvuCFyDttkUZm+40aMnEkIGTiiBuZOBIQMnHEjSjvWsa2Qu2PSCbsxSPpgpkFS7QI8WooE/kOtHgVTkUccSqET4BnXg3xi1TGkWPAFo+yS4EVwDRgjL4MU/FsA64BDckUpHtqrQd2AfP6sWU70AwcAs71pShVcSQbeJ7k/hFgk1VNNAva1J9f6ziTgenAVCVaq14zXu7qoVFEqvWjwiMRKUpWvg+g5YrIBetDRouIVInI2F50F4rIZhG5b8k3iEiBWzYdRE5aRtX2QcDdRovICeu5s+kmUmkZc8bnS9iQLiLDrSnyWETyB6EjW0QeWPaOcu6FmaIsB+Zr/+Agv8OYILlH+7OAVc6NMIks1utLoM6HnssabNEUJoGwiJiT4BztN/pM203af1P7c4FcQiQyEhin/RcB6GvTa5GmQ6F6xBkriHO/E5hjTkANi0gn8EH7UwLQ5+ho10/qoRExFZJW7ZcFkOOV6bXVWW9h7lp39TpTs93BYiFQqs82OTrCJHLdSiR3+xh7r665t/pDQQK2su4gqhn9wMzno3q7XIPiQLFTM2CDauCN87w9V/NV6L2Xw74HmLP2Q3swoAZYq1F+h1YZ93v4w8HsTFst8kbv4X8kRKQmhf8GbewlXyoRkWZL5pKIVIhIXi+yJuUvF5E6l95Od9IY10gZJkyKsk6PzxXAGm23gDvqQRMnJgCLXBvDVf3JxuRZx3VbP59wmYjM0JvdAVcSC4B7uih7g3mJ24AqNbo/dOj6OgAUAzf05Nilx+X6WCKXTy+KdfEbr5Rq2pGlxjfrztToSm0WABettKcyCkRsmE3GeMosbhNEe57N/8JUd0wmbGQjR2SgMNOqA7j9Gz6Uinec1dt+AAAAAElFTkSuQmCC"

/***/ }),
/* 169 */
/*!*************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/my/my_icon_evaluate.png ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA1CAYAAAAOJMhOAAAEoElEQVRoge2aaWgdVRiGn5tobbqnhqJJaRsquFXcfvpDUBGqaAT9oSCCvwSrKChFTCut2iZp1UpdatWiFRfqhrWL1tatrhU0pZYqiogKSovirihtXjnxGzk5mUnm3nvm3lzwhck9M/POOd+b75vvzFlKkmggTAauBdYCP6SZ3dRAYiYBTwHLgMeAqaks56EGOFokPauh2CJpQmh7GHLNwInAeGAg0n/W1fk3sAc4VMHzzpYNwIV2vheYZ+VtwCXAb/+xPXXzJb0s6Q/Fx0+SplQQCZMkbfOsWWv19HjX3pF0ZPKM+9Mk6QpJAwUISXBI0tQyxTj+Vq+OdZJK3v2+QFSnu+8IF1nWmAF8C9wK7ANaogTcv4nHhdxO4GDOZyYCTwBddn4/sCCFdwdwg5V3A1c7pc+byj8lnT0GEkSLvfB+mKXxxkva5PHulTTb3ei3C3vHgBj3frzqGflQBm+GpLc93nL/HdpnF3fXWUyrpO2ekQ9k8I6W9J7H6/XvY55x2FNnz/hhtjqD57LZmx5vWcgZC4ImBqn5ngyey3qve7yeNF69BU2TtNMz8r4Rwux9j3dbVp31FNQm6bUcnpkp6YM8YuopqNW+ShLcmcELs9nto9VdD0GTJe3IIcaJ9sNxRM/US9B0Se96Rt6dwWsPwmxJ3jZqKSgMn1UZvFmSPqxETC0FtQVh1pvBOyroNJeW21YtBIX9R5aY6YEH84hx7+O5ks6T1FELQc4zuzwjV2TwXGr+yOMtyln/qd4zVxUtKPzm6svgddp3ZIJbymhjnqQf7bnLixTkEsAbnpFZ/UdH4MFyxNRMUN7+oy3w4OIK2hom6LBIo9IE7cCLwOl2vhxYnMKbBWwETrHzm4GeGAbEnJdzQ/aHAzHdKby5wBZPTHcsMUQWdAIw38orMsQ4zzztTUMtMuHREDPkLrDfn4G7Uu67SZhngNPsvDu2GCIKGgdcamVn9P7g/mxgE3CSnS8EVkZqewhihdyZwLFW3uBdP8JmNrd7Ym4qSgwRPXSZ/X4KfAmcAVwJnAV0ejyXzfoitZmKGIJazPCk7ELr+IDzMfAIsCpCeyMihqCLLXth70qCTyzU3gJeAn6Pb/5wVCuoZOFWsvMvLCnssFWCMDkUjmoFzbFVtfXAoybi+1qL8FGtILcseD7wa1yzKke1gn6pp/FpaKQ11lz4X9BYR5OXchtqw4LBt3lQR5O3Mt1cL6uqwEHPIYNwgr6zshttHtdIaoCTrR/E1ocH0/YLwDlAK7DGxikHjFTKrmsYDrf+6Juc/DY7yt27IGvrGNtV4pzyFbBr0GC3GwO4EVjqPZR8spSTNMZZR+sGbetG4bqhxOPAzAoEDdiwZJp3rcvmMoZsvLhO0n7FwcIRZmrmSPo8UjufSery6w+3xrTbf6/DXJs38/1lm4kWePMFq4HrgzqmAFttvOTQC/QDEyrw0tc2LBm6KyvybOncYBnkSdt34O41S9pY5TzcqEf0Cm2icbNn+Cs2Ifigd21lEWKKEpR4Y40n4IBXXl+UmCIFJceS4CV+ruD2arIB8BoT029rQIW2V6s9p66fcKNZN0QvDsA/2rNvjAX3niUAAAAASUVORK5CYII="

/***/ }),
/* 170 */
/*!*************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/my/my_icon_integral.png ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 171 */
/*!*********************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/my/my_icon_data.png ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTA2LTI2VDE3OjUxOjI0KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTA2LTI2VDE3OjUxOjI0KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wNi0yNlQxNzo1MToyNCswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MjVjMjFlMi05YzNkLWE2NDMtYjU4YS02ZWQ0YTU4YzVhZGUiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDplYmIxZGVmZS0yYzQ4LTdkNGUtOTI2Yy03ODM1MTRmZTg3NDEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1ZmY3ZWM0ZS05NTk1LTEzNDItYTZkMS05ZjUwOWIyZGRiMmYiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjVmZjdlYzRlLTk1OTUtMTM0Mi1hNmQxLTlmNTA5YjJkZGIyZiIgc3RFdnQ6d2hlbj0iMjAyMC0wNi0yNlQxNzo1MToyNCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MjVjMjFlMi05YzNkLWE2NDMtYjU4YS02ZWQ0YTU4YzVhZGUiIHN0RXZ0OndoZW49IjIwMjAtMDYtMjZUMTc6NTE6MjQrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6oMUJMAAALD0lEQVRoga2aeXRU1RnAf/ctk0kmO2GVLUUtSFGBGjZTRZaiuLAEtC3KKpJSRDwoIIgbFBVOWSO2gAhaF0BBEauCRYmI7GLFjQoINkgC2QhkmZl3+8cseTPz3swk+p0z57373e373fvd9Y0YNFeq1IuwebcK/xyRUcLR4qLpANBM73YwvyRYwBBhEY4WZw7b6YB6oHhg7EBiAVoZEtDHAgnPGw4QodOIDRDRQwO7od+Zy+UZyeToKjmKoL0QZABSSsoNyQm3l31lVRx4cQffFR7F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"

/***/ }),
/* 172 */,
/* 173 */,
/* 174 */
/*!*********************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/my/my_icon_head.png ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 175 */
/*!**********************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/my/my_login_head.png ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */
/*!*********************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/integral/integral_icon_item.png ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */
/*!***********************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/static/images/pages/message-list/message_item_img.jpg ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/images/pages/message-list/message_item_img.jpg";

/***/ }),
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */
/*!********************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/services/paymentService.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 22));var _ajax = _interopRequireDefault(__webpack_require__(/*! @/utils/ajax.js */ 26));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =

{
  getNetPayOrderAsync: function getNetPayOrderAsync(listNo) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var response;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                _ajax.default.get("/payment/GetNetPayOrderAsync?listNo=".concat(listNo)));case 2:response = _context.sent;return _context.abrupt("return",
              response.result);case 4:case "end":return _context.stop();}}}, _callee);}))();
  },
  jsApiPayAsync: function jsApiPayAsync(listNo) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var response;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                _ajax.default.post("/payment/JsApiPayAsync?listNo=".concat(listNo)));case 2:response = _context2.sent;return _context2.abrupt("return",
              response.result);case 4:case "end":return _context2.stop();}}}, _callee2);}))();
  },
  miniProgramPayAsync: function miniProgramPayAsync(listNo) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {var response;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
                _ajax.default.post("/payment/MiniprogramPayAsync?listNo=".concat(listNo)));case 2:response = _context3.sent;return _context3.abrupt("return",
              response.result);case 4:case "end":return _context3.stop();}}}, _callee3);}))();
  } };exports.default = _default;

/***/ }),
/* 217 */
/*!*******************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/services/commonService.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 22));var _ajax = _interopRequireDefault(__webpack_require__(/*! @/utils/ajax.js */ 26));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =

{
  logError: function logError(message) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              if (typeof message == "object") {
                message = JSON.stringify(message);
              }_context.next = 3;return (

                _ajax.default.post("/common/LogError?message=".concat(message)));case 3:case "end":return _context.stop();}}}, _callee);}))();
  },
  getEducationComboboxItems: function getEducationComboboxItems() {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var response;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                _ajax.default.get("/common/GetEducationComboboxItems"));case 2:response = _context2.sent;return _context2.abrupt("return",
              response.result);case 4:case "end":return _context2.stop();}}}, _callee2);}))();
  },
  getNationComboboxItems: function getNationComboboxItems() {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {var response;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
                _ajax.default.get("/common/GetNationComboboxItems"));case 2:response = _context3.sent;return _context3.abrupt("return",
              response.result);case 4:case "end":return _context3.stop();}}}, _callee3);}))();
  },
  getAgeRangeComboboxItemsAsync: function getAgeRangeComboboxItemsAsync() {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var response;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (
                _ajax.default.get("/common/GetAgeRangeComboboxItemsAsync"));case 2:response = _context4.sent;return _context4.abrupt("return",
              response.result);case 4:case "end":return _context4.stop();}}}, _callee4);}))();
  },
  getTouristOriginTreeAsync: function getTouristOriginTreeAsync() {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var response;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
                _ajax.default.get("/common/GetTouristOriginTreeAsync"));case 2:response = _context5.sent;return _context5.abrupt("return",
              response.result);case 4:case "end":return _context5.stop();}}}, _callee5);}))();
  } };exports.default = _default;

/***/ }),
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */
/*!***************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/utils/qrcodeHelper.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 22));var _qrcode = _interopRequireDefault(__webpack_require__(/*! qrcode */ 227));
var _ajax = _interopRequireDefault(__webpack_require__(/*! ./ajax.js */ 26));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =

{
  createQRCodeAsync: function createQRCodeAsync(value) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var response;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.prev = 0;_context.next = 3;return (

                _qrcode.default.toDataURL(value, {
                  width: 200 }));case 3:return _context.abrupt("return", _context.sent);case 6:_context.prev = 6;_context.t0 = _context["catch"](0);_context.next = 10;return (


                _ajax.default.get("/common/CreateQRCodeAsync?value=".concat(value)));case 10:response = _context.sent;return _context.abrupt("return",
              response.result);case 12:case "end":return _context.stop();}}}, _callee, null, [[0, 6]]);}))();

  } };exports.default = _default;

/***/ }),
/* 227 */
/*!****************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/browser.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var canPromise = __webpack_require__(/*! ./can-promise */ 228);

var QRCode = __webpack_require__(/*! ./core/qrcode */ 229);
var CanvasRenderer = __webpack_require__(/*! ./renderer/canvas */ 257);
var SvgRenderer = __webpack_require__(/*! ./renderer/svg-tag.js */ 259);

function renderCanvas(renderFunc, canvas, text, opts, cb) {
  var args = [].slice.call(arguments, 1);
  var argsNum = args.length;
  var isLastArgCb = typeof args[argsNum - 1] === 'function';

  if (!isLastArgCb && !canPromise()) {
    throw new Error('Callback required as last argument');
  }

  if (isLastArgCb) {
    if (argsNum < 2) {
      throw new Error('Too few arguments provided');
    }

    if (argsNum === 2) {
      cb = text;
      text = canvas;
      canvas = opts = undefined;
    } else if (argsNum === 3) {
      if (canvas.getContext && typeof cb === 'undefined') {
        cb = opts;
        opts = undefined;
      } else {
        cb = opts;
        opts = text;
        text = canvas;
        canvas = undefined;
      }
    }
  } else {
    if (argsNum < 1) {
      throw new Error('Too few arguments provided');
    }

    if (argsNum === 1) {
      text = canvas;
      canvas = opts = undefined;
    } else if (argsNum === 2 && !canvas.getContext) {
      opts = text;
      text = canvas;
      canvas = undefined;
    }

    return new Promise(function (resolve, reject) {
      try {
        var data = QRCode.create(text, opts);
        resolve(renderFunc(data, canvas, opts));
      } catch (e) {
        reject(e);
      }
    });
  }

  try {
    var data = QRCode.create(text, opts);
    cb(null, renderFunc(data, canvas, opts));
  } catch (e) {
    cb(e);
  }
}

exports.create = QRCode.create;
exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);

// only svg for now.
exports.toString = renderCanvas.bind(null, function (data, _, opts) {
  return SvgRenderer.render(data, opts);
});

/***/ }),
/* 228 */
/*!********************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/can-promise.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157

module.exports = function () {
  return typeof Promise === 'function' && Promise.prototype && Promise.prototype.then;
};

/***/ }),
/* 229 */
/*!********************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/core/qrcode.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var BufferUtil = __webpack_require__(/*! ../utils/buffer */ 230);
var Utils = __webpack_require__(/*! ./utils */ 232);
var ECLevel = __webpack_require__(/*! ./error-correction-level */ 233);
var BitBuffer = __webpack_require__(/*! ./bit-buffer */ 234);
var BitMatrix = __webpack_require__(/*! ./bit-matrix */ 235);
var AlignmentPattern = __webpack_require__(/*! ./alignment-pattern */ 236);
var FinderPattern = __webpack_require__(/*! ./finder-pattern */ 237);
var MaskPattern = __webpack_require__(/*! ./mask-pattern */ 238);
var ECCode = __webpack_require__(/*! ./error-correction-code */ 239);
var ReedSolomonEncoder = __webpack_require__(/*! ./reed-solomon-encoder */ 240);
var Version = __webpack_require__(/*! ./version */ 246);
var FormatInfo = __webpack_require__(/*! ./format-info */ 250);
var Mode = __webpack_require__(/*! ./mode */ 247);
var Segments = __webpack_require__(/*! ./segments */ 251);
var isArray = __webpack_require__(/*! isarray */ 231);

/**
                                   * QRCode for JavaScript
                                   *
                                   * modified by Ryan Day for nodejs support
                                   * Copyright (c) 2011 Ryan Day
                                   *
                                   * Licensed under the MIT license:
                                   *   http://www.opensource.org/licenses/mit-license.php
                                   *
                                  //---------------------------------------------------------------------
                                  // QRCode for JavaScript
                                  //
                                  // Copyright (c) 2009 Kazuhiko Arase
                                  //
                                  // URL: http://www.d-project.com/
                                  //
                                  // Licensed under the MIT license:
                                  //   http://www.opensource.org/licenses/mit-license.php
                                  //
                                  // The word "QR Code" is registered trademark of
                                  // DENSO WAVE INCORPORATED
                                  //   http://www.denso-wave.com/qrcode/faqpatent-e.html
                                  //
                                  //---------------------------------------------------------------------
                                  */

/**
                                      * Add finder patterns bits to matrix
                                      *
                                      * @param  {BitMatrix} matrix  Modules matrix
                                      * @param  {Number}    version QR Code version
                                      */
function setupFinderPattern(matrix, version) {
  var size = matrix.size;
  var pos = FinderPattern.getPositions(version);

  for (var i = 0; i < pos.length; i++) {
    var row = pos[i][0];
    var col = pos[i][1];

    for (var r = -1; r <= 7; r++) {
      if (row + r <= -1 || size <= row + r) continue;

      for (var c = -1; c <= 7; c++) {
        if (col + c <= -1 || size <= col + c) continue;

        if (r >= 0 && r <= 6 && (c === 0 || c === 6) ||
        c >= 0 && c <= 6 && (r === 0 || r === 6) ||
        r >= 2 && r <= 4 && c >= 2 && c <= 4) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}

/**
   * Add timing pattern bits to matrix
   *
   * Note: this function must be called before {@link setupAlignmentPattern}
   *
   * @param  {BitMatrix} matrix Modules matrix
   */
function setupTimingPattern(matrix) {
  var size = matrix.size;

  for (var r = 8; r < size - 8; r++) {
    var value = r % 2 === 0;
    matrix.set(r, 6, value, true);
    matrix.set(6, r, value, true);
  }
}

/**
   * Add alignment patterns bits to matrix
   *
   * Note: this function must be called after {@link setupTimingPattern}
   *
   * @param  {BitMatrix} matrix  Modules matrix
   * @param  {Number}    version QR Code version
   */
function setupAlignmentPattern(matrix, version) {
  var pos = AlignmentPattern.getPositions(version);

  for (var i = 0; i < pos.length; i++) {
    var row = pos[i][0];
    var col = pos[i][1];

    for (var r = -2; r <= 2; r++) {
      for (var c = -2; c <= 2; c++) {
        if (r === -2 || r === 2 || c === -2 || c === 2 ||
        r === 0 && c === 0) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}

/**
   * Add version info bits to matrix
   *
   * @param  {BitMatrix} matrix  Modules matrix
   * @param  {Number}    version QR Code version
   */
function setupVersionInfo(matrix, version) {
  var size = matrix.size;
  var bits = Version.getEncodedBits(version);
  var row, col, mod;

  for (var i = 0; i < 18; i++) {
    row = Math.floor(i / 3);
    col = i % 3 + size - 8 - 3;
    mod = (bits >> i & 1) === 1;

    matrix.set(row, col, mod, true);
    matrix.set(col, row, mod, true);
  }
}

/**
   * Add format info bits to matrix
   *
   * @param  {BitMatrix} matrix               Modules matrix
   * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
   * @param  {Number}    maskPattern          Mask pattern reference value
   */
function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
  var size = matrix.size;
  var bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
  var i, mod;

  for (i = 0; i < 15; i++) {
    mod = (bits >> i & 1) === 1;

    // vertical
    if (i < 6) {
      matrix.set(i, 8, mod, true);
    } else if (i < 8) {
      matrix.set(i + 1, 8, mod, true);
    } else {
      matrix.set(size - 15 + i, 8, mod, true);
    }

    // horizontal
    if (i < 8) {
      matrix.set(8, size - i - 1, mod, true);
    } else if (i < 9) {
      matrix.set(8, 15 - i - 1 + 1, mod, true);
    } else {
      matrix.set(8, 15 - i - 1, mod, true);
    }
  }

  // fixed module
  matrix.set(size - 8, 8, 1, true);
}

/**
   * Add encoded data bits to matrix
   *
   * @param  {BitMatrix} matrix Modules matrix
   * @param  {Buffer}    data   Data codewords
   */
function setupData(matrix, data) {
  var size = matrix.size;
  var inc = -1;
  var row = size - 1;
  var bitIndex = 7;
  var byteIndex = 0;

  for (var col = size - 1; col > 0; col -= 2) {
    if (col === 6) col--;

    while (true) {
      for (var c = 0; c < 2; c++) {
        if (!matrix.isReserved(row, col - c)) {
          var dark = false;

          if (byteIndex < data.length) {
            dark = (data[byteIndex] >>> bitIndex & 1) === 1;
          }

          matrix.set(row, col - c, dark);
          bitIndex--;

          if (bitIndex === -1) {
            byteIndex++;
            bitIndex = 7;
          }
        }
      }

      row += inc;

      if (row < 0 || size <= row) {
        row -= inc;
        inc = -inc;
        break;
      }
    }
  }
}

/**
   * Create encoded codewords from data input
   *
   * @param  {Number}   version              QR Code version
   * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
   * @param  {ByteData} data                 Data input
   * @return {Buffer}                        Buffer containing encoded codewords
   */
function createData(version, errorCorrectionLevel, segments) {
  // Prepare data buffer
  var buffer = new BitBuffer();

  segments.forEach(function (data) {
    // prefix data with mode indicator (4 bits)
    buffer.put(data.mode.bit, 4);

    // Prefix data with character count indicator.
    // The character count indicator is a string of bits that represents the
    // number of characters that are being encoded.
    // The character count indicator must be placed after the mode indicator
    // and must be a certain number of bits long, depending on the QR version
    // and data mode
    // @see {@link Mode.getCharCountIndicator}.
    buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));

    // add binary data sequence to buffer
    data.write(buffer);
  });

  // Calculate required number of bits
  var totalCodewords = Utils.getSymbolTotalCodewords(version);
  var ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
  var dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;

  // Add a terminator.
  // If the bit string is shorter than the total number of required bits,
  // a terminator of up to four 0s must be added to the right side of the string.
  // If the bit string is more than four bits shorter than the required number of bits,
  // add four 0s to the end.
  if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
    buffer.put(0, 4);
  }

  // If the bit string is fewer than four bits shorter, add only the number of 0s that
  // are needed to reach the required number of bits.

  // After adding the terminator, if the number of bits in the string is not a multiple of 8,
  // pad the string on the right with 0s to make the string's length a multiple of 8.
  while (buffer.getLengthInBits() % 8 !== 0) {
    buffer.putBit(0);
  }

  // Add pad bytes if the string is still shorter than the total number of required bits.
  // Extend the buffer to fill the data capacity of the symbol corresponding to
  // the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
  // and 00010001 (0x11) alternately.
  var remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
  for (var i = 0; i < remainingByte; i++) {
    buffer.put(i % 2 ? 0x11 : 0xEC, 8);
  }

  return createCodewords(buffer, version, errorCorrectionLevel);
}

/**
   * Encode input data with Reed-Solomon and return codewords with
   * relative error correction bits
   *
   * @param  {BitBuffer} bitBuffer            Data to encode
   * @param  {Number}    version              QR Code version
   * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
   * @return {Buffer}                         Buffer containing encoded codewords
   */
function createCodewords(bitBuffer, version, errorCorrectionLevel) {
  // Total codewords for this QR code version (Data + Error correction)
  var totalCodewords = Utils.getSymbolTotalCodewords(version);

  // Total number of error correction codewords
  var ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);

  // Total number of data codewords
  var dataTotalCodewords = totalCodewords - ecTotalCodewords;

  // Total number of blocks
  var ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);

  // Calculate how many blocks each group should contain
  var blocksInGroup2 = totalCodewords % ecTotalBlocks;
  var blocksInGroup1 = ecTotalBlocks - blocksInGroup2;

  var totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);

  var dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
  var dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;

  // Number of EC codewords is the same for both groups
  var ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;

  // Initialize a Reed-Solomon encoder with a generator polynomial of degree ecCount
  var rs = new ReedSolomonEncoder(ecCount);

  var offset = 0;
  var dcData = new Array(ecTotalBlocks);
  var ecData = new Array(ecTotalBlocks);
  var maxDataSize = 0;
  var buffer = BufferUtil.from(bitBuffer.buffer);

  // Divide the buffer into the required number of blocks
  for (var b = 0; b < ecTotalBlocks; b++) {
    var dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;

    // extract a block of data from buffer
    dcData[b] = buffer.slice(offset, offset + dataSize);

    // Calculate EC codewords for this data block
    ecData[b] = rs.encode(dcData[b]);

    offset += dataSize;
    maxDataSize = Math.max(maxDataSize, dataSize);
  }

  // Create final data
  // Interleave the data and error correction codewords from each block
  var data = BufferUtil.alloc(totalCodewords);
  var index = 0;
  var i, r;

  // Add data codewords
  for (i = 0; i < maxDataSize; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      if (i < dcData[r].length) {
        data[index++] = dcData[r][i];
      }
    }
  }

  // Apped EC codewords
  for (i = 0; i < ecCount; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      data[index++] = ecData[r][i];
    }
  }

  return data;
}

/**
   * Build QR Code symbol
   *
   * @param  {String} data                 Input string
   * @param  {Number} version              QR Code version
   * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
   * @param  {MaskPattern} maskPattern     Mask pattern
   * @return {Object}                      Object containing symbol data
   */
function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
  var segments;

  if (isArray(data)) {
    segments = Segments.fromArray(data);
  } else if (typeof data === 'string') {
    var estimatedVersion = version;

    if (!estimatedVersion) {
      var rawSegments = Segments.rawSplit(data);

      // Estimate best version that can contain raw splitted segments
      estimatedVersion = Version.getBestVersionForData(rawSegments,
      errorCorrectionLevel);
    }

    // Build optimized segments
    // If estimated version is undefined, try with the highest version
    segments = Segments.fromString(data, estimatedVersion || 40);
  } else {
    throw new Error('Invalid data');
  }

  // Get the min version that can contain data
  var bestVersion = Version.getBestVersionForData(segments,
  errorCorrectionLevel);

  // If no version is found, data cannot be stored
  if (!bestVersion) {
    throw new Error('The amount of data is too big to be stored in a QR Code');
  }

  // If not specified, use min version as default
  if (!version) {
    version = bestVersion;

    // Check if the specified version can contain the data
  } else if (version < bestVersion) {
    throw new Error('\n' +
    'The chosen QR Code version cannot contain this amount of data.\n' +
    'Minimum version required to store current data is: ' + bestVersion + '.\n');

  }

  var dataBits = createData(version, errorCorrectionLevel, segments);

  // Allocate matrix buffer
  var moduleCount = Utils.getSymbolSize(version);
  var modules = new BitMatrix(moduleCount);

  // Add function modules
  setupFinderPattern(modules, version);
  setupTimingPattern(modules);
  setupAlignmentPattern(modules, version);

  // Add temporary dummy bits for format info just to set them as reserved.
  // This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
  // since the masking operation must be performed only on the encoding region.
  // These blocks will be replaced with correct values later in code.
  setupFormatInfo(modules, errorCorrectionLevel, 0);

  if (version >= 7) {
    setupVersionInfo(modules, version);
  }

  // Add data codewords
  setupData(modules, dataBits);

  if (isNaN(maskPattern)) {
    // Find best mask pattern
    maskPattern = MaskPattern.getBestMask(modules,
    setupFormatInfo.bind(null, modules, errorCorrectionLevel));
  }

  // Apply mask pattern
  MaskPattern.applyMask(maskPattern, modules);

  // Replace format info bits with correct values
  setupFormatInfo(modules, errorCorrectionLevel, maskPattern);

  return {
    modules: modules,
    version: version,
    errorCorrectionLevel: errorCorrectionLevel,
    maskPattern: maskPattern,
    segments: segments };

}

/**
   * QR Code
   *
   * @param {String | Array} data                 Input data
   * @param {Object} options                      Optional configurations
   * @param {Number} options.version              QR Code version
   * @param {String} options.errorCorrectionLevel Error correction level
   * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
   */
exports.create = function create(data, options) {
  if (typeof data === 'undefined' || data === '') {
    throw new Error('No input text');
  }

  var errorCorrectionLevel = ECLevel.M;
  var version;
  var mask;

  if (typeof options !== 'undefined') {
    // Use higher error correction level as default
    errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
    version = Version.from(options.version);
    mask = MaskPattern.from(options.maskPattern);

    if (options.toSJISFunc) {
      Utils.setToSJISFunction(options.toSJISFunc);
    }
  }

  return createSymbol(data, version, errorCorrectionLevel, mask);
};

/***/ }),
/* 230 */
/*!********************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/utils/typedarray-buffer.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Implementation of a subset of node.js Buffer methods for the browser.
 * Based on https://github.com/feross/buffer
 */

/* eslint-disable no-proto */



var isArray = __webpack_require__(/*! isarray */ 231);

function typedArraySupport() {
  // Can typed array instances be augmented?
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function foo() {return 42;} };
    return arr.foo() === 42;
  } catch (e) {
    return false;
  }
}

Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();

var K_MAX_LENGTH = Buffer.TYPED_ARRAY_SUPPORT ?
0x7fffffff :
0x3fffffff;

function Buffer(arg, offset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, offset, length);
  }

  if (typeof arg === 'number') {
    return allocUnsafe(this, arg);
  }

  return from(this, arg, offset, length);
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;

  // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
  if (typeof Symbol !== 'undefined' && Symbol.species &&
  Buffer[Symbol.species] === Buffer) {
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true,
      enumerable: false,
      writable: false });

  }
}

function checked(length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
    'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes');
  }
  return length | 0;
}

function isnan(val) {
  return val !== val; // eslint-disable-line no-self-compare
}

function createBuffer(that, length) {
  var buf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    buf = new Uint8Array(length);
    buf.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    buf = that;
    if (buf === null) {
      buf = new Buffer(length);
    }
    buf.length = length;
  }

  return buf;
}

function allocUnsafe(that, size) {
  var buf = createBuffer(that, size < 0 ? 0 : checked(size) | 0);

  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      buf[i] = 0;
    }
  }

  return buf;
}

function fromString(that, string) {
  var length = byteLength(string) | 0;
  var buf = createBuffer(that, length);

  var actual = buf.write(string);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual);
  }

  return buf;
}

function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  var buf = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255;
  }
  return buf;
}

function fromArrayBuffer(that, array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
  }

  var buf;
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array);
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset);
  } else {
    buf = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    buf.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    buf = fromArrayLike(that, buf);
  }

  return buf;
}

function fromObject(that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    var buf = createBuffer(that, len);

    if (buf.length === 0) {
      return buf;
    }

    obj.copy(buf, 0, 0, len);
    return buf;
  }

  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' &&
    obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }
      return fromArrayLike(that, obj);
    }

    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        }

        // valid lead
        leadSurrogate = codePoint;

        continue;
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(
      codePoint >> 0x6 | 0xC0,
      codePoint & 0x3F | 0x80);

    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(
      codePoint >> 0xC | 0xE0,
      codePoint >> 0x6 & 0x3F | 0x80,
      codePoint & 0x3F | 0x80);

    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(
      codePoint >> 0x12 | 0xF0,
      codePoint >> 0xC & 0x3F | 0x80,
      codePoint >> 0x6 & 0x3F | 0x80,
      codePoint & 0x3F | 0x80);

    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function byteLength(string) {
  if (Buffer.isBuffer(string)) {
    return string.length;
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (
  ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0;

  return utf8ToBytes(string).length;
}

function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }
  return i;
}

function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function from(that, value, offset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, offset, length);
  }

  if (typeof value === 'string') {
    return fromString(that, value, offset);
  }

  return fromObject(that, value);
}

Buffer.prototype.write = function write(string, offset, length) {
  // Buffer#write(string)
  if (offset === undefined) {
    length = this.length;
    offset = 0;
    // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    length = this.length;
    offset = 0;
    // Buffer#write(string, offset[, length])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
    } else {
      length = undefined;
    }
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  return utf8Write(this, string, offset, length);
};

Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    // Return an augmented `Uint8Array` instance
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf;
};

Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0;

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds');

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(
    target,
    this.subarray(start, start + len),
    targetStart);

  }

  return len;
};

Buffer.prototype.fill = function fill(val, start, end) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val) ?
    val :
    new Buffer(val);
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
};

Buffer.concat = function concat(list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return createBuffer(null, 0);
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = allocUnsafe(null, length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer;
};

Buffer.byteLength = byteLength;

Buffer.prototype._isBuffer = true;
Buffer.isBuffer = function isBuffer(b) {
  return !!(b != null && b._isBuffer);
};

module.exports.alloc = function (size) {
  var buffer = new Buffer(size);
  buffer.fill(0);
  return buffer;
};

module.exports.from = function (data) {
  return new Buffer(data);
};

/***/ }),
/* 231 */
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 232 */
/*!*******************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/core/utils.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toSJISFunction;
var CODEWORDS_COUNT = [
0, // Not used
26, 44, 70, 100, 134, 172, 196, 242, 292, 346,
404, 466, 532, 581, 655, 733, 815, 901, 991, 1085,
1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185,
2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706];


/**
                                                              * Returns the QR Code size for the specified version
                                                              *
                                                              * @param  {Number} version QR Code version
                                                              * @return {Number}         size of QR code
                                                              */
exports.getSymbolSize = function getSymbolSize(version) {
  if (!version) throw new Error('"version" cannot be null or undefined');
  if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
  return version * 4 + 17;
};

/**
    * Returns the total number of codewords used to store data and EC information.
    *
    * @param  {Number} version QR Code version
    * @return {Number}         Data length in bits
    */
exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
  return CODEWORDS_COUNT[version];
};

/**
    * Encode data with Bose-Chaudhuri-Hocquenghem
    *
    * @param  {Number} data Value to encode
    * @return {Number}      Encoded value
    */
exports.getBCHDigit = function (data) {
  var digit = 0;

  while (data !== 0) {
    digit++;
    data >>>= 1;
  }

  return digit;
};

exports.setToSJISFunction = function setToSJISFunction(f) {
  if (typeof f !== 'function') {
    throw new Error('"toSJISFunc" is not a valid function.');
  }

  toSJISFunction = f;
};

exports.isKanjiModeEnabled = function () {
  return typeof toSJISFunction !== 'undefined';
};

exports.toSJIS = function toSJIS(kanji) {
  return toSJISFunction(kanji);
};

/***/ }),
/* 233 */
/*!************************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/core/error-correction-level.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.L = { bit: 1 };
exports.M = { bit: 0 };
exports.Q = { bit: 3 };
exports.H = { bit: 2 };

function fromString(string) {
  if (typeof string !== 'string') {
    throw new Error('Param is not a string');
  }

  var lcStr = string.toLowerCase();

  switch (lcStr) {
    case 'l':
    case 'low':
      return exports.L;

    case 'm':
    case 'medium':
      return exports.M;

    case 'q':
    case 'quartile':
      return exports.Q;

    case 'h':
    case 'high':
      return exports.H;

    default:
      throw new Error('Unknown EC Level: ' + string);}

}

exports.isValid = function isValid(level) {
  return level && typeof level.bit !== 'undefined' &&
  level.bit >= 0 && level.bit < 4;
};

exports.from = function from(value, defaultValue) {
  if (exports.isValid(value)) {
    return value;
  }

  try {
    return fromString(value);
  } catch (e) {
    return defaultValue;
  }
};

/***/ }),
/* 234 */
/*!************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/core/bit-buffer.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function BitBuffer() {
  this.buffer = [];
  this.length = 0;
}

BitBuffer.prototype = {

  get: function get(index) {
    var bufIndex = Math.floor(index / 8);
    return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
  },

  put: function put(num, length) {
    for (var i = 0; i < length; i++) {
      this.putBit((num >>> length - i - 1 & 1) === 1);
    }
  },

  getLengthInBits: function getLengthInBits() {
    return this.length;
  },

  putBit: function putBit(bit) {
    var bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }

    if (bit) {
      this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
    }

    this.length++;
  } };


module.exports = BitBuffer;

/***/ }),
/* 235 */
/*!************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/core/bit-matrix.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var BufferUtil = __webpack_require__(/*! ../utils/buffer */ 230);

/**
                                              * Helper class to handle QR Code symbol modules
                                              *
                                              * @param {Number} size Symbol size
                                              */
function BitMatrix(size) {
  if (!size || size < 1) {
    throw new Error('BitMatrix size must be defined and greater than 0');
  }

  this.size = size;
  this.data = BufferUtil.alloc(size * size);
  this.reservedBit = BufferUtil.alloc(size * size);
}

/**
   * Set bit value at specified location
   * If reserved flag is set, this bit will be ignored during masking process
   *
   * @param {Number}  row
   * @param {Number}  col
   * @param {Boolean} value
   * @param {Boolean} reserved
   */
BitMatrix.prototype.set = function (row, col, value, reserved) {
  var index = row * this.size + col;
  this.data[index] = value;
  if (reserved) this.reservedBit[index] = true;
};

/**
    * Returns bit value at specified location
    *
    * @param  {Number}  row
    * @param  {Number}  col
    * @return {Boolean}
    */
BitMatrix.prototype.get = function (row, col) {
  return this.data[row * this.size + col];
};

/**
    * Applies xor operator at specified location
    * (used during masking process)
    *
    * @param {Number}  row
    * @param {Number}  col
    * @param {Boolean} value
    */
BitMatrix.prototype.xor = function (row, col, value) {
  this.data[row * this.size + col] ^= value;
};

/**
    * Check if bit at specified location is reserved
    *
    * @param {Number}   row
    * @param {Number}   col
    * @return {Boolean}
    */
BitMatrix.prototype.isReserved = function (row, col) {
  return this.reservedBit[row * this.size + col];
};

module.exports = BitMatrix;

/***/ }),
/* 236 */
/*!*******************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/core/alignment-pattern.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */

var getSymbolSize = __webpack_require__(/*! ./utils */ 232).getSymbolSize;

/**
                                                       * Calculate the row/column coordinates of the center module of each alignment pattern
                                                       * for the specified QR Code version.
                                                       *
                                                       * The alignment patterns are positioned symmetrically on either side of the diagonal
                                                       * running from the top left corner of the symbol to the bottom right corner.
                                                       *
                                                       * Since positions are simmetrical only half of the coordinates are returned.
                                                       * Each item of the array will represent in turn the x and y coordinate.
                                                       * @see {@link getPositions}
                                                       *
                                                       * @param  {Number} version QR Code version
                                                       * @return {Array}          Array of coordinate
                                                       */
exports.getRowColCoords = function getRowColCoords(version) {
  if (version === 1) return [];

  var posCount = Math.floor(version / 7) + 2;
  var size = getSymbolSize(version);
  var intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
  var positions = [size - 7]; // Last coord is always (size - 7)

  for (var i = 1; i < posCount - 1; i++) {
    positions[i] = positions[i - 1] - intervals;
  }

  positions.push(6); // First coord is always 6

  return positions.reverse();
};

/**
    * Returns an array containing the positions of each alignment pattern.
    * Each array's element represent the center point of the pattern as (x, y) coordinates
    *
    * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}
    * and filtering out the items that overlaps with finder pattern
    *
    * @example
    * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.
    * The alignment patterns, therefore, are to be centered on (row, column)
    * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).
    * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns
    * and are not therefore used for alignment patterns.
    *
    * var pos = getPositions(7)
    * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]
    *
    * @param  {Number} version QR Code version
    * @return {Array}          Array of coordinates
    */
exports.getPositions = function getPositions(version) {
  var coords = [];
  var pos = exports.getRowColCoords(version);
  var posLength = pos.length;

  for (var i = 0; i < posLength; i++) {
    for (var j = 0; j < posLength; j++) {
      // Skip if position is occupied by finder patterns
      if (i === 0 && j === 0 || // top-left
      i === 0 && j === posLength - 1 || // bottom-left
      i === posLength - 1 && j === 0) {// top-right
        continue;
      }

      coords.push([pos[i], pos[j]]);
    }
  }

  return coords;
};

/***/ }),
/* 237 */
/*!****************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/core/finder-pattern.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getSymbolSize = __webpack_require__(/*! ./utils */ 232).getSymbolSize;
var FINDER_PATTERN_SIZE = 7;

/**
                              * Returns an array containing the positions of each finder pattern.
                              * Each array's element represent the top-left point of the pattern as (x, y) coordinates
                              *
                              * @param  {Number} version QR Code version
                              * @return {Array}          Array of coordinates
                              */
exports.getPositions = function getPositions(version) {
  var size = getSymbolSize(version);

  return [
  // top-left
  [0, 0],
  // top-right
  [size - FINDER_PATTERN_SIZE, 0],
  // bottom-left
  [0, size - FINDER_PATTERN_SIZE]];

};

/***/ }),
/* 238 */
/*!**************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/core/mask-pattern.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Data mask pattern reference
 * @type {Object}
 */
exports.Patterns = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7 };


/**
                    * Weighted penalty scores for the undesirable features
                    * @type {Object}
                    */
var PenaltyScores = {
  N1: 3,
  N2: 3,
  N3: 40,
  N4: 10 };


/**
             * Check if mask pattern value is valid
             *
             * @param  {Number}  mask    Mask pattern
             * @return {Boolean}         true if valid, false otherwise
             */
exports.isValid = function isValid(mask) {
  return mask != null && mask !== '' && !isNaN(mask) && mask >= 0 && mask <= 7;
};

/**
    * Returns mask pattern from a value.
    * If value is not valid, returns undefined
    *
    * @param  {Number|String} value        Mask pattern value
    * @return {Number}                     Valid mask pattern or undefined
    */
exports.from = function from(value) {
  return exports.isValid(value) ? parseInt(value, 10) : undefined;
};

/**
   * Find adjacent modules in row/column with the same color
   * and assign a penalty value.
   *
   * Points: N1 + i
   * i is the amount by which the number of adjacent modules of the same color exceeds 5
   */
exports.getPenaltyN1 = function getPenaltyN1(data) {
  var size = data.size;
  var points = 0;
  var sameCountCol = 0;
  var sameCountRow = 0;
  var lastCol = null;
  var lastRow = null;

  for (var row = 0; row < size; row++) {
    sameCountCol = sameCountRow = 0;
    lastCol = lastRow = null;

    for (var col = 0; col < size; col++) {
      var module = data.get(row, col);
      if (module === lastCol) {
        sameCountCol++;
      } else {
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        lastCol = module;
        sameCountCol = 1;
      }

      module = data.get(col, row);
      if (module === lastRow) {
        sameCountRow++;
      } else {
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
        lastRow = module;
        sameCountRow = 1;
      }
    }

    if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
    if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
  }

  return points;
};

/**
    * Find 2x2 blocks with the same color and assign a penalty value
    *
    * Points: N2 * (m - 1) * (n - 1)
    */
exports.getPenaltyN2 = function getPenaltyN2(data) {
  var size = data.size;
  var points = 0;

  for (var row = 0; row < size - 1; row++) {
    for (var col = 0; col < size - 1; col++) {
      var last = data.get(row, col) +
      data.get(row, col + 1) +
      data.get(row + 1, col) +
      data.get(row + 1, col + 1);

      if (last === 4 || last === 0) points++;
    }
  }

  return points * PenaltyScores.N2;
};

/**
    * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
    * preceded or followed by light area 4 modules wide
    *
    * Points: N3 * number of pattern found
    */
exports.getPenaltyN3 = function getPenaltyN3(data) {
  var size = data.size;
  var points = 0;
  var bitsCol = 0;
  var bitsRow = 0;

  for (var row = 0; row < size; row++) {
    bitsCol = bitsRow = 0;
    for (var col = 0; col < size; col++) {
      bitsCol = bitsCol << 1 & 0x7FF | data.get(row, col);
      if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++;

      bitsRow = bitsRow << 1 & 0x7FF | data.get(col, row);
      if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++;
    }
  }

  return points * PenaltyScores.N3;
};

/**
    * Calculate proportion of dark modules in entire symbol
    *
    * Points: N4 * k
    *
    * k is the rating of the deviation of the proportion of dark modules
    * in the symbol from 50% in steps of 5%
    */
exports.getPenaltyN4 = function getPenaltyN4(data) {
  var darkCount = 0;
  var modulesCount = data.data.length;

  for (var i = 0; i < modulesCount; i++) {darkCount += data.data[i];}

  var k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);

  return k * PenaltyScores.N4;
};

/**
    * Return mask value at given position
    *
    * @param  {Number} maskPattern Pattern reference value
    * @param  {Number} i           Row
    * @param  {Number} j           Column
    * @return {Boolean}            Mask value
    */
function getMaskAt(maskPattern, i, j) {
  switch (maskPattern) {
    case exports.Patterns.PATTERN000:return (i + j) % 2 === 0;
    case exports.Patterns.PATTERN001:return i % 2 === 0;
    case exports.Patterns.PATTERN010:return j % 3 === 0;
    case exports.Patterns.PATTERN011:return (i + j) % 3 === 0;
    case exports.Patterns.PATTERN100:return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
    case exports.Patterns.PATTERN101:return i * j % 2 + i * j % 3 === 0;
    case exports.Patterns.PATTERN110:return (i * j % 2 + i * j % 3) % 2 === 0;
    case exports.Patterns.PATTERN111:return (i * j % 3 + (i + j) % 2) % 2 === 0;

    default:throw new Error('bad maskPattern:' + maskPattern);}

}

/**
   * Apply a mask pattern to a BitMatrix
   *
   * @param  {Number}    pattern Pattern reference number
   * @param  {BitMatrix} data    BitMatrix data
   */
exports.applyMask = function applyMask(pattern, data) {
  var size = data.size;

  for (var col = 0; col < size; col++) {
    for (var row = 0; row < size; row++) {
      if (data.isReserved(row, col)) continue;
      data.xor(row, col, getMaskAt(pattern, row, col));
    }
  }
};

/**
    * Returns the best mask pattern for data
    *
    * @param  {BitMatrix} data
    * @return {Number} Mask pattern reference number
    */
exports.getBestMask = function getBestMask(data, setupFormatFunc) {
  var numPatterns = Object.keys(exports.Patterns).length;
  var bestPattern = 0;
  var lowerPenalty = Infinity;

  for (var p = 0; p < numPatterns; p++) {
    setupFormatFunc(p);
    exports.applyMask(p, data);

    // Calculate penalty
    var penalty =
    exports.getPenaltyN1(data) +
    exports.getPenaltyN2(data) +
    exports.getPenaltyN3(data) +
    exports.getPenaltyN4(data);

    // Undo previously applied mask
    exports.applyMask(p, data);

    if (penalty < lowerPenalty) {
      lowerPenalty = penalty;
      bestPattern = p;
    }
  }

  return bestPattern;
};

/***/ }),
/* 239 */
/*!***********************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/core/error-correction-code.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ECLevel = __webpack_require__(/*! ./error-correction-level */ 233);

var EC_BLOCKS_TABLE = [
// L  M  Q  H
1, 1, 1, 1,
1, 1, 1, 1,
1, 1, 2, 2,
1, 2, 2, 4,
1, 2, 4, 4,
2, 4, 4, 4,
2, 4, 6, 5,
2, 4, 6, 6,
2, 5, 8, 8,
4, 5, 8, 8,
4, 5, 8, 11,
4, 8, 10, 11,
4, 9, 12, 16,
4, 9, 16, 16,
6, 10, 12, 18,
6, 10, 17, 16,
6, 11, 16, 19,
6, 13, 18, 21,
7, 14, 21, 25,
8, 16, 20, 25,
8, 17, 23, 25,
9, 17, 23, 34,
9, 18, 25, 30,
10, 20, 27, 32,
12, 21, 29, 35,
12, 23, 34, 37,
12, 25, 34, 40,
13, 26, 35, 42,
14, 28, 38, 45,
15, 29, 40, 48,
16, 31, 43, 51,
17, 33, 45, 54,
18, 35, 48, 57,
19, 37, 51, 60,
19, 38, 53, 63,
20, 40, 56, 66,
21, 43, 59, 70,
22, 45, 62, 74,
24, 47, 65, 77,
25, 49, 68, 81];


var EC_CODEWORDS_TABLE = [
// L  M  Q  H
7, 10, 13, 17,
10, 16, 22, 28,
15, 26, 36, 44,
20, 36, 52, 64,
26, 48, 72, 88,
36, 64, 96, 112,
40, 72, 108, 130,
48, 88, 132, 156,
60, 110, 160, 192,
72, 130, 192, 224,
80, 150, 224, 264,
96, 176, 260, 308,
104, 198, 288, 352,
120, 216, 320, 384,
132, 240, 360, 432,
144, 280, 408, 480,
168, 308, 448, 532,
180, 338, 504, 588,
196, 364, 546, 650,
224, 416, 600, 700,
224, 442, 644, 750,
252, 476, 690, 816,
270, 504, 750, 900,
300, 560, 810, 960,
312, 588, 870, 1050,
336, 644, 952, 1110,
360, 700, 1020, 1200,
390, 728, 1050, 1260,
420, 784, 1140, 1350,
450, 812, 1200, 1440,
480, 868, 1290, 1530,
510, 924, 1350, 1620,
540, 980, 1440, 1710,
570, 1036, 1530, 1800,
570, 1064, 1590, 1890,
600, 1120, 1680, 1980,
630, 1204, 1770, 2100,
660, 1260, 1860, 2220,
720, 1316, 1950, 2310,
750, 1372, 2040, 2430];


/**
                         * Returns the number of error correction block that the QR Code should contain
                         * for the specified version and error correction level.
                         *
                         * @param  {Number} version              QR Code version
                         * @param  {Number} errorCorrectionLevel Error correction level
                         * @return {Number}                      Number of error correction blocks
                         */
exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel.L:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
    case ECLevel.M:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
    case ECLevel.Q:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
    case ECLevel.H:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
    default:
      return undefined;}

};

/**
    * Returns the number of error correction codewords to use for the specified
    * version and error correction level.
    *
    * @param  {Number} version              QR Code version
    * @param  {Number} errorCorrectionLevel Error correction level
    * @return {Number}                      Number of error correction codewords
    */
exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel.L:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
    case ECLevel.M:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
    case ECLevel.Q:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
    case ECLevel.H:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
    default:
      return undefined;}

};

/***/ }),
/* 240 */
/*!**********************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/core/reed-solomon-encoder.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var BufferUtil = __webpack_require__(/*! ../utils/buffer */ 230);
var Polynomial = __webpack_require__(/*! ./polynomial */ 241);
var Buffer = __webpack_require__(/*! buffer */ 243).Buffer;

function ReedSolomonEncoder(degree) {
  this.genPoly = undefined;
  this.degree = degree;

  if (this.degree) this.initialize(this.degree);
}

/**
   * Initialize the encoder.
   * The input param should correspond to the number of error correction codewords.
   *
   * @param  {Number} degree
   */
ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
  // create an irreducible generator polynomial
  this.degree = degree;
  this.genPoly = Polynomial.generateECPolynomial(this.degree);
};

/**
    * Encodes a chunk of data
    *
    * @param  {Buffer} data Buffer containing input data
    * @return {Buffer}      Buffer containing encoded data
    */
ReedSolomonEncoder.prototype.encode = function encode(data) {
  if (!this.genPoly) {
    throw new Error('Encoder not initialized');
  }

  // Calculate EC for this data block
  // extends data size to data+genPoly size
  var pad = BufferUtil.alloc(this.degree);
  var paddedData = Buffer.concat([data, pad], data.length + this.degree);

  // The error correction codewords are the remainder after dividing the data codewords
  // by a generator polynomial
  var remainder = Polynomial.mod(paddedData, this.genPoly);

  // return EC data blocks (last n byte, where n is the degree of genPoly)
  // If coefficients number in remainder are less than genPoly degree,
  // pad with 0s to the left to reach the needed number of coefficients
  var start = this.degree - remainder.length;
  if (start > 0) {
    var buff = BufferUtil.alloc(this.degree);
    remainder.copy(buff, start);

    return buff;
  }

  return remainder;
};

module.exports = ReedSolomonEncoder;

/***/ }),
/* 241 */
/*!************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/core/polynomial.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var BufferUtil = __webpack_require__(/*! ../utils/buffer */ 230);
var GF = __webpack_require__(/*! ./galois-field */ 242);

/**
                                     * Multiplies two polynomials inside Galois Field
                                     *
                                     * @param  {Buffer} p1 Polynomial
                                     * @param  {Buffer} p2 Polynomial
                                     * @return {Buffer}    Product of p1 and p2
                                     */
exports.mul = function mul(p1, p2) {
  var coeff = BufferUtil.alloc(p1.length + p2.length - 1);

  for (var i = 0; i < p1.length; i++) {
    for (var j = 0; j < p2.length; j++) {
      coeff[i + j] ^= GF.mul(p1[i], p2[j]);
    }
  }

  return coeff;
};

/**
    * Calculate the remainder of polynomials division
    *
    * @param  {Buffer} divident Polynomial
    * @param  {Buffer} divisor  Polynomial
    * @return {Buffer}          Remainder
    */
exports.mod = function mod(divident, divisor) {
  var result = BufferUtil.from(divident);

  while (result.length - divisor.length >= 0) {
    var coeff = result[0];

    for (var i = 0; i < divisor.length; i++) {
      result[i] ^= GF.mul(divisor[i], coeff);
    }

    // remove all zeros from buffer head
    var offset = 0;
    while (offset < result.length && result[offset] === 0) {offset++;}
    result = result.slice(offset);
  }

  return result;
};

/**
    * Generate an irreducible generator polynomial of specified degree
    * (used by Reed-Solomon encoder)
    *
    * @param  {Number} degree Degree of the generator polynomial
    * @return {Buffer}        Buffer containing polynomial coefficients
    */
exports.generateECPolynomial = function generateECPolynomial(degree) {
  var poly = BufferUtil.from([1]);
  for (var i = 0; i < degree; i++) {
    poly = exports.mul(poly, [1, GF.exp(i)]);
  }

  return poly;
};

/***/ }),
/* 242 */
/*!**************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/core/galois-field.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var BufferUtil = __webpack_require__(/*! ../utils/buffer */ 230);

var EXP_TABLE = BufferUtil.alloc(512);
var LOG_TABLE = BufferUtil.alloc(256)
/**
                                       * Precompute the log and anti-log tables for faster computation later
                                       *
                                       * For each possible value in the galois field 2^8, we will pre-compute
                                       * the logarithm and anti-logarithm (exponential) of this value
                                       *
                                       * ref {@link https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Introduction_to_mathematical_fields}
                                       */;
(function initTables() {
  var x = 1;
  for (var i = 0; i < 255; i++) {
    EXP_TABLE[i] = x;
    LOG_TABLE[x] = i;

    x <<= 1; // multiply by 2

    // The QR code specification says to use byte-wise modulo 100011101 arithmetic.
    // This means that when a number is 256 or larger, it should be XORed with 0x11D.
    if (x & 0x100) {// similar to x >= 256, but a lot faster (because 0x100 == 256)
      x ^= 0x11D;
    }
  }

  // Optimization: double the size of the anti-log table so that we don't need to mod 255 to
  // stay inside the bounds (because we will mainly use this table for the multiplication of
  // two GF numbers, no more).
  // @see {@link mul}
  for (i = 255; i < 512; i++) {
    EXP_TABLE[i] = EXP_TABLE[i - 255];
  }
})();

/**
       * Returns log value of n inside Galois Field
       *
       * @param  {Number} n
       * @return {Number}
       */
exports.log = function log(n) {
  if (n < 1) throw new Error('log(' + n + ')');
  return LOG_TABLE[n];
};

/**
    * Returns anti-log value of n inside Galois Field
    *
    * @param  {Number} n
    * @return {Number}
    */
exports.exp = function exp(n) {
  return EXP_TABLE[n];
};

/**
    * Multiplies two number inside Galois Field
    *
    * @param  {Number} x
    * @param  {Number} y
    * @return {Number}
    */
exports.mul = function mul(x, y) {
  if (x === 0 || y === 0) return 0;

  // should be EXP_TABLE[(LOG_TABLE[x] + LOG_TABLE[y]) % 255] if EXP_TABLE wasn't oversized
  // @see {@link initTables}
  return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
};

/***/ }),
/* 243 */
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ 244)
var ieee754 = __webpack_require__(/*! ieee754 */ 245)
var isArray = __webpack_require__(/*! isarray */ 231)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ 3)))

/***/ }),
/* 244 */
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),
/* 245 */
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 246 */
/*!*********************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/core/version.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Utils = __webpack_require__(/*! ./utils */ 232);
var ECCode = __webpack_require__(/*! ./error-correction-code */ 239);
var ECLevel = __webpack_require__(/*! ./error-correction-level */ 233);
var Mode = __webpack_require__(/*! ./mode */ 247);
var VersionCheck = __webpack_require__(/*! ./version-check */ 248);
var isArray = __webpack_require__(/*! isarray */ 231);

// Generator polynomial used to encode version information
var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
var G18_BCH = Utils.getBCHDigit(G18);

function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
  for (var currentVersion = 1; currentVersion <= 40; currentVersion++) {
    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
      return currentVersion;
    }
  }

  return undefined;
}

function getReservedBitsCount(mode, version) {
  // Character count indicator + mode indicator bits
  return Mode.getCharCountIndicator(mode, version) + 4;
}

function getTotalBitsFromDataArray(segments, version) {
  var totalBits = 0;

  segments.forEach(function (data) {
    var reservedBits = getReservedBitsCount(data.mode, version);
    totalBits += reservedBits + data.getBitsLength();
  });

  return totalBits;
}

function getBestVersionForMixedData(segments, errorCorrectionLevel) {
  for (var currentVersion = 1; currentVersion <= 40; currentVersion++) {
    var length = getTotalBitsFromDataArray(segments, currentVersion);
    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
      return currentVersion;
    }
  }

  return undefined;
}

/**
   * Returns version number from a value.
   * If value is not a valid version, returns defaultValue
   *
   * @param  {Number|String} value        QR Code version
   * @param  {Number}        defaultValue Fallback value
   * @return {Number}                     QR Code version number
   */
exports.from = function from(value, defaultValue) {
  if (VersionCheck.isValid(value)) {
    return parseInt(value, 10);
  }

  return defaultValue;
};

/**
    * Returns how much data can be stored with the specified QR code version
    * and error correction level
    *
    * @param  {Number} version              QR Code version (1-40)
    * @param  {Number} errorCorrectionLevel Error correction level
    * @param  {Mode}   mode                 Data mode
    * @return {Number}                      Quantity of storable data
    */
exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
  if (!VersionCheck.isValid(version)) {
    throw new Error('Invalid QR Code version');
  }

  // Use Byte mode as default
  if (typeof mode === 'undefined') mode = Mode.BYTE;

  // Total codewords for this QR code version (Data + Error correction)
  var totalCodewords = Utils.getSymbolTotalCodewords(version);

  // Total number of error correction codewords
  var ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);

  // Total number of data codewords
  var dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;

  if (mode === Mode.MIXED) return dataTotalCodewordsBits;

  var usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);

  // Return max number of storable codewords
  switch (mode) {
    case Mode.NUMERIC:
      return Math.floor(usableBits / 10 * 3);

    case Mode.ALPHANUMERIC:
      return Math.floor(usableBits / 11 * 2);

    case Mode.KANJI:
      return Math.floor(usableBits / 13);

    case Mode.BYTE:
    default:
      return Math.floor(usableBits / 8);}

};

/**
    * Returns the minimum version needed to contain the amount of data
    *
    * @param  {Segment} data                    Segment of data
    * @param  {Number} [errorCorrectionLevel=H] Error correction level
    * @param  {Mode} mode                       Data mode
    * @return {Number}                          QR Code version
    */
exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
  var seg;

  var ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);

  if (isArray(data)) {
    if (data.length > 1) {
      return getBestVersionForMixedData(data, ecl);
    }

    if (data.length === 0) {
      return 1;
    }

    seg = data[0];
  } else {
    seg = data;
  }

  return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
};

/**
    * Returns version information with relative error correction bits
    *
    * The version information is included in QR Code symbols of version 7 or larger.
    * It consists of an 18-bit sequence containing 6 data bits,
    * with 12 error correction bits calculated using the (18, 6) Golay code.
    *
    * @param  {Number} version QR Code version
    * @return {Number}         Encoded version info bits
    */
exports.getEncodedBits = function getEncodedBits(version) {
  if (!VersionCheck.isValid(version) || version < 7) {
    throw new Error('Invalid QR Code version');
  }

  var d = version << 12;

  while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
    d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
  }

  return version << 12 | d;
};

/***/ }),
/* 247 */
/*!******************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/core/mode.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var VersionCheck = __webpack_require__(/*! ./version-check */ 248);
var Regex = __webpack_require__(/*! ./regex */ 249);

/**
                                 * Numeric mode encodes data from the decimal digit set (0 - 9)
                                 * (byte values 30HEX to 39HEX).
                                 * Normally, 3 data characters are represented by 10 bits.
                                 *
                                 * @type {Object}
                                 */
exports.NUMERIC = {
  id: 'Numeric',
  bit: 1 << 0,
  ccBits: [10, 12, 14] };


/**
                           * Alphanumeric mode encodes data from a set of 45 characters,
                           * i.e. 10 numeric digits (0 - 9),
                           *      26 alphabetic characters (A - Z),
                           *   and 9 symbols (SP, $, %, *, +, -, ., /, :).
                           * Normally, two input characters are represented by 11 bits.
                           *
                           * @type {Object}
                           */
exports.ALPHANUMERIC = {
  id: 'Alphanumeric',
  bit: 1 << 1,
  ccBits: [9, 11, 13] };


/**
                          * In byte mode, data is encoded at 8 bits per character.
                          *
                          * @type {Object}
                          */
exports.BYTE = {
  id: 'Byte',
  bit: 1 << 2,
  ccBits: [8, 16, 16] };


/**
                          * The Kanji mode efficiently encodes Kanji characters in accordance with
                          * the Shift JIS system based on JIS X 0208.
                          * The Shift JIS values are shifted from the JIS X 0208 values.
                          * JIS X 0208 gives details of the shift coded representation.
                          * Each two-byte character value is compacted to a 13-bit binary codeword.
                          *
                          * @type {Object}
                          */
exports.KANJI = {
  id: 'Kanji',
  bit: 1 << 3,
  ccBits: [8, 10, 12] };


/**
                          * Mixed mode will contain a sequences of data in a combination of any of
                          * the modes described above
                          *
                          * @type {Object}
                          */
exports.MIXED = {
  bit: -1 };


/**
              * Returns the number of bits needed to store the data length
              * according to QR Code specifications.
              *
              * @param  {Mode}   mode    Data mode
              * @param  {Number} version QR Code version
              * @return {Number}         Number of bits
              */
exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
  if (!mode.ccBits) throw new Error('Invalid mode: ' + mode);

  if (!VersionCheck.isValid(version)) {
    throw new Error('Invalid version: ' + version);
  }

  if (version >= 1 && version < 10) return mode.ccBits[0];else
  if (version < 27) return mode.ccBits[1];
  return mode.ccBits[2];
};

/**
    * Returns the most efficient mode to store the specified data
    *
    * @param  {String} dataStr Input data string
    * @return {Mode}           Best mode
    */
exports.getBestModeForData = function getBestModeForData(dataStr) {
  if (Regex.testNumeric(dataStr)) return exports.NUMERIC;else
  if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;else
  if (Regex.testKanji(dataStr)) return exports.KANJI;else
  return exports.BYTE;
};

/**
    * Return mode name as string
    *
    * @param {Mode} mode Mode object
    * @returns {String}  Mode name
    */
exports.toString = function toString(mode) {
  if (mode && mode.id) return mode.id;
  throw new Error('Invalid mode');
};

/**
    * Check if input param is a valid mode object
    *
    * @param   {Mode}    mode Mode object
    * @returns {Boolean} True if valid mode, false otherwise
    */
exports.isValid = function isValid(mode) {
  return mode && mode.bit && mode.ccBits;
};

/**
    * Get mode object from its name
    *
    * @param   {String} string Mode name
    * @returns {Mode}          Mode object
    */
function fromString(string) {
  if (typeof string !== 'string') {
    throw new Error('Param is not a string');
  }

  var lcStr = string.toLowerCase();

  switch (lcStr) {
    case 'numeric':
      return exports.NUMERIC;
    case 'alphanumeric':
      return exports.ALPHANUMERIC;
    case 'kanji':
      return exports.KANJI;
    case 'byte':
      return exports.BYTE;
    default:
      throw new Error('Unknown mode: ' + string);}

}

/**
   * Returns mode from a value.
   * If value is not a valid mode, returns defaultValue
   *
   * @param  {Mode|String} value        Encoding mode
   * @param  {Mode}        defaultValue Fallback value
   * @return {Mode}                     Encoding mode
   */
exports.from = function from(value, defaultValue) {
  if (exports.isValid(value)) {
    return value;
  }

  try {
    return fromString(value);
  } catch (e) {
    return defaultValue;
  }
};

/***/ }),
/* 248 */
/*!***************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/core/version-check.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Check if QR Code version is valid
 *
 * @param  {Number}  version QR Code version
 * @return {Boolean}         true if valid version, false otherwise
 */
exports.isValid = function isValid(version) {
  return !isNaN(version) && version >= 1 && version <= 40;
};

/***/ }),
/* 249 */
/*!*******************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/core/regex.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var numeric = '[0-9]+';
var alphanumeric = '[A-Z $%*+\\-./:]+';
var kanji = '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|' +
'[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|' +
'[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|' +
'[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+';
kanji = kanji.replace(/u/g, "\\u");

var _byte = '(?:(?![A-Z0-9 $%*+\\-./:]|' + kanji + ')(?:.|[\r\n]))+';

exports.KANJI = new RegExp(kanji, 'g');
exports.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g');
exports.BYTE = new RegExp(_byte, 'g');
exports.NUMERIC = new RegExp(numeric, 'g');
exports.ALPHANUMERIC = new RegExp(alphanumeric, 'g');

var TEST_KANJI = new RegExp('^' + kanji + '$');
var TEST_NUMERIC = new RegExp('^' + numeric + '$');
var TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\-./:]+$');

exports.testKanji = function testKanji(str) {
  return TEST_KANJI.test(str);
};

exports.testNumeric = function testNumeric(str) {
  return TEST_NUMERIC.test(str);
};

exports.testAlphanumeric = function testAlphanumeric(str) {
  return TEST_ALPHANUMERIC.test(str);
};

/***/ }),
/* 250 */
/*!*************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/core/format-info.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Utils = __webpack_require__(/*! ./utils */ 232);

var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
var G15_BCH = Utils.getBCHDigit(G15);

/**
                                       * Returns format information with relative error correction bits
                                       *
                                       * The format information is a 15-bit sequence containing 5 data bits,
                                       * with 10 error correction bits calculated using the (15, 5) BCH code.
                                       *
                                       * @param  {Number} errorCorrectionLevel Error correction level
                                       * @param  {Number} mask                 Mask pattern
                                       * @return {Number}                      Encoded format information bits
                                       */
exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
  var data = errorCorrectionLevel.bit << 3 | mask;
  var d = data << 10;

  while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
    d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
  }

  // xor final data with mask pattern in order to ensure that
  // no combination of Error Correction Level and data mask pattern
  // will result in an all-zero data string
  return (data << 10 | d) ^ G15_MASK;
};

/***/ }),
/* 251 */
/*!**********************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/core/segments.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Mode = __webpack_require__(/*! ./mode */ 247);
var NumericData = __webpack_require__(/*! ./numeric-data */ 252);
var AlphanumericData = __webpack_require__(/*! ./alphanumeric-data */ 253);
var ByteData = __webpack_require__(/*! ./byte-data */ 254);
var KanjiData = __webpack_require__(/*! ./kanji-data */ 255);
var Regex = __webpack_require__(/*! ./regex */ 249);
var Utils = __webpack_require__(/*! ./utils */ 232);
var dijkstra = __webpack_require__(/*! dijkstrajs */ 256);

/**
                                       * Returns UTF8 byte length
                                       *
                                       * @param  {String} str Input string
                                       * @return {Number}     Number of byte
                                       */
function getStringByteLength(str) {
  return unescape(encodeURIComponent(str)).length;
}

/**
   * Get a list of segments of the specified mode
   * from a string
   *
   * @param  {Mode}   mode Segment mode
   * @param  {String} str  String to process
   * @return {Array}       Array of object with segments data
   */
function getSegments(regex, mode, str) {
  var segments = [];
  var result;

  while ((result = regex.exec(str)) !== null) {
    segments.push({
      data: result[0],
      index: result.index,
      mode: mode,
      length: result[0].length });

  }

  return segments;
}

/**
   * Extracts a series of segments with the appropriate
   * modes from a string
   *
   * @param  {String} dataStr Input string
   * @return {Array}          Array of object with segments data
   */
function getSegmentsFromString(dataStr) {
  var numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
  var alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
  var byteSegs;
  var kanjiSegs;

  if (Utils.isKanjiModeEnabled()) {
    byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
    kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
  } else {
    byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
    kanjiSegs = [];
  }

  var segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);

  return segs.
  sort(function (s1, s2) {
    return s1.index - s2.index;
  }).
  map(function (obj) {
    return {
      data: obj.data,
      mode: obj.mode,
      length: obj.length };

  });
}

/**
   * Returns how many bits are needed to encode a string of
   * specified length with the specified mode
   *
   * @param  {Number} length String length
   * @param  {Mode} mode     Segment mode
   * @return {Number}        Bit length
   */
function getSegmentBitsLength(length, mode) {
  switch (mode) {
    case Mode.NUMERIC:
      return NumericData.getBitsLength(length);
    case Mode.ALPHANUMERIC:
      return AlphanumericData.getBitsLength(length);
    case Mode.KANJI:
      return KanjiData.getBitsLength(length);
    case Mode.BYTE:
      return ByteData.getBitsLength(length);}

}

/**
   * Merges adjacent segments which have the same mode
   *
   * @param  {Array} segs Array of object with segments data
   * @return {Array}      Array of object with segments data
   */
function mergeSegments(segs) {
  return segs.reduce(function (acc, curr) {
    var prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
    if (prevSeg && prevSeg.mode === curr.mode) {
      acc[acc.length - 1].data += curr.data;
      return acc;
    }

    acc.push(curr);
    return acc;
  }, []);
}

/**
   * Generates a list of all possible nodes combination which
   * will be used to build a segments graph.
   *
   * Nodes are divided by groups. Each group will contain a list of all the modes
   * in which is possible to encode the given text.
   *
   * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.
   * The group for '12345' will contain then 3 objects, one for each
   * possible encoding mode.
   *
   * Each node represents a possible segment.
   *
   * @param  {Array} segs Array of object with segments data
   * @return {Array}      Array of object with segments data
   */
function buildNodes(segs) {
  var nodes = [];
  for (var i = 0; i < segs.length; i++) {
    var seg = segs[i];

    switch (seg.mode) {
      case Mode.NUMERIC:
        nodes.push([seg,
        { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
        { data: seg.data, mode: Mode.BYTE, length: seg.length }]);

        break;
      case Mode.ALPHANUMERIC:
        nodes.push([seg,
        { data: seg.data, mode: Mode.BYTE, length: seg.length }]);

        break;
      case Mode.KANJI:
        nodes.push([seg,
        { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }]);

        break;
      case Mode.BYTE:
        nodes.push([
        { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }]);}


  }

  return nodes;
}

/**
   * Builds a graph from a list of nodes.
   * All segments in each node group will be connected with all the segments of
   * the next group and so on.
   *
   * At each connection will be assigned a weight depending on the
   * segment's byte length.
   *
   * @param  {Array} nodes    Array of object with segments data
   * @param  {Number} version QR Code version
   * @return {Object}         Graph of all possible segments
   */
function buildGraph(nodes, version) {
  var table = {};
  var graph = { 'start': {} };
  var prevNodeIds = ['start'];

  for (var i = 0; i < nodes.length; i++) {
    var nodeGroup = nodes[i];
    var currentNodeIds = [];

    for (var j = 0; j < nodeGroup.length; j++) {
      var node = nodeGroup[j];
      var key = '' + i + j;

      currentNodeIds.push(key);
      table[key] = { node: node, lastCount: 0 };
      graph[key] = {};

      for (var n = 0; n < prevNodeIds.length; n++) {
        var prevNodeId = prevNodeIds[n];

        if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
          graph[prevNodeId][key] =
          getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) -
          getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);

          table[prevNodeId].lastCount += node.length;
        } else {
          if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;

          graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) +
          4 + Mode.getCharCountIndicator(node.mode, version); // switch cost
        }
      }
    }

    prevNodeIds = currentNodeIds;
  }

  for (n = 0; n < prevNodeIds.length; n++) {
    graph[prevNodeIds[n]]['end'] = 0;
  }

  return { map: graph, table: table };
}

/**
   * Builds a segment from a specified data and mode.
   * If a mode is not specified, the more suitable will be used.
   *
   * @param  {String} data             Input data
   * @param  {Mode | String} modesHint Data mode
   * @return {Segment}                 Segment
   */
function buildSingleSegment(data, modesHint) {
  var mode;
  var bestMode = Mode.getBestModeForData(data);

  mode = Mode.from(modesHint, bestMode);

  // Make sure data can be encoded
  if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
    throw new Error('"' + data + '"' +
    ' cannot be encoded with mode ' + Mode.toString(mode) +
    '.\n Suggested mode is: ' + Mode.toString(bestMode));
  }

  // Use Mode.BYTE if Kanji support is disabled
  if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
    mode = Mode.BYTE;
  }

  switch (mode) {
    case Mode.NUMERIC:
      return new NumericData(data);

    case Mode.ALPHANUMERIC:
      return new AlphanumericData(data);

    case Mode.KANJI:
      return new KanjiData(data);

    case Mode.BYTE:
      return new ByteData(data);}

}

/**
   * Builds a list of segments from an array.
   * Array can contain Strings or Objects with segment's info.
   *
   * For each item which is a string, will be generated a segment with the given
   * string and the more appropriate encoding mode.
   *
   * For each item which is an object, will be generated a segment with the given
   * data and mode.
   * Objects must contain at least the property "data".
   * If property "mode" is not present, the more suitable mode will be used.
   *
   * @param  {Array} array Array of objects with segments data
   * @return {Array}       Array of Segments
   */
exports.fromArray = function fromArray(array) {
  return array.reduce(function (acc, seg) {
    if (typeof seg === 'string') {
      acc.push(buildSingleSegment(seg, null));
    } else if (seg.data) {
      acc.push(buildSingleSegment(seg.data, seg.mode));
    }

    return acc;
  }, []);
};

/**
    * Builds an optimized sequence of segments from a string,
    * which will produce the shortest possible bitstream.
    *
    * @param  {String} data    Input string
    * @param  {Number} version QR Code version
    * @return {Array}          Array of segments
    */
exports.fromString = function fromString(data, version) {
  var segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());

  var nodes = buildNodes(segs);
  var graph = buildGraph(nodes, version);
  var path = dijkstra.find_path(graph.map, 'start', 'end');

  var optimizedSegs = [];
  for (var i = 1; i < path.length - 1; i++) {
    optimizedSegs.push(graph.table[path[i]].node);
  }

  return exports.fromArray(mergeSegments(optimizedSegs));
};

/**
    * Splits a string in various segments with the modes which
    * best represent their content.
    * The produced segments are far from being optimized.
    * The output of this function is only used to estimate a QR Code version
    * which may contain the data.
    *
    * @param  {string} data Input string
    * @return {Array}       Array of segments
    */
exports.rawSplit = function rawSplit(data) {
  return exports.fromArray(
  getSegmentsFromString(data, Utils.isKanjiModeEnabled()));

};

/***/ }),
/* 252 */
/*!**************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/core/numeric-data.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Mode = __webpack_require__(/*! ./mode */ 247);

function NumericData(data) {
  this.mode = Mode.NUMERIC;
  this.data = data.toString();
}

NumericData.getBitsLength = function getBitsLength(length) {
  return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
};

NumericData.prototype.getLength = function getLength() {
  return this.data.length;
};

NumericData.prototype.getBitsLength = function getBitsLength() {
  return NumericData.getBitsLength(this.data.length);
};

NumericData.prototype.write = function write(bitBuffer) {
  var i, group, value;

  // The input data string is divided into groups of three digits,
  // and each group is converted to its 10-bit binary equivalent.
  for (i = 0; i + 3 <= this.data.length; i += 3) {
    group = this.data.substr(i, 3);
    value = parseInt(group, 10);

    bitBuffer.put(value, 10);
  }

  // If the number of input digits is not an exact multiple of three,
  // the final one or two digits are converted to 4 or 7 bits respectively.
  var remainingNum = this.data.length - i;
  if (remainingNum > 0) {
    group = this.data.substr(i);
    value = parseInt(group, 10);

    bitBuffer.put(value, remainingNum * 3 + 1);
  }
};

module.exports = NumericData;

/***/ }),
/* 253 */
/*!*******************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/core/alphanumeric-data.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Mode = __webpack_require__(/*! ./mode */ 247);

/**
                               * Array of characters available in alphanumeric mode
                               *
                               * As per QR Code specification, to each character
                               * is assigned a value from 0 to 44 which in this case coincides
                               * with the array index
                               *
                               * @type {Array}
                               */
var ALPHA_NUM_CHARS = [
'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
' ', '$', '%', '*', '+', '-', '.', '/', ':'];


function AlphanumericData(data) {
  this.mode = Mode.ALPHANUMERIC;
  this.data = data;
}

AlphanumericData.getBitsLength = function getBitsLength(length) {
  return 11 * Math.floor(length / 2) + 6 * (length % 2);
};

AlphanumericData.prototype.getLength = function getLength() {
  return this.data.length;
};

AlphanumericData.prototype.getBitsLength = function getBitsLength() {
  return AlphanumericData.getBitsLength(this.data.length);
};

AlphanumericData.prototype.write = function write(bitBuffer) {
  var i;

  // Input data characters are divided into groups of two characters
  // and encoded as 11-bit binary codes.
  for (i = 0; i + 2 <= this.data.length; i += 2) {
    // The character value of the first character is multiplied by 45
    var value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;

    // The character value of the second digit is added to the product
    value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);

    // The sum is then stored as 11-bit binary number
    bitBuffer.put(value, 11);
  }

  // If the number of input data characters is not a multiple of two,
  // the character value of the final character is encoded as a 6-bit binary number.
  if (this.data.length % 2) {
    bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
  }
};

module.exports = AlphanumericData;

/***/ }),
/* 254 */
/*!***********************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/core/byte-data.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var BufferUtil = __webpack_require__(/*! ../utils/buffer */ 230);
var Mode = __webpack_require__(/*! ./mode */ 247);

function ByteData(data) {
  this.mode = Mode.BYTE;
  this.data = BufferUtil.from(data);
}

ByteData.getBitsLength = function getBitsLength(length) {
  return length * 8;
};

ByteData.prototype.getLength = function getLength() {
  return this.data.length;
};

ByteData.prototype.getBitsLength = function getBitsLength() {
  return ByteData.getBitsLength(this.data.length);
};

ByteData.prototype.write = function (bitBuffer) {
  for (var i = 0, l = this.data.length; i < l; i++) {
    bitBuffer.put(this.data[i], 8);
  }
};

module.exports = ByteData;

/***/ }),
/* 255 */
/*!************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/core/kanji-data.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Mode = __webpack_require__(/*! ./mode */ 247);
var Utils = __webpack_require__(/*! ./utils */ 232);

function KanjiData(data) {
  this.mode = Mode.KANJI;
  this.data = data;
}

KanjiData.getBitsLength = function getBitsLength(length) {
  return length * 13;
};

KanjiData.prototype.getLength = function getLength() {
  return this.data.length;
};

KanjiData.prototype.getBitsLength = function getBitsLength() {
  return KanjiData.getBitsLength(this.data.length);
};

KanjiData.prototype.write = function (bitBuffer) {
  var i;

  // In the Shift JIS system, Kanji characters are represented by a two byte combination.
  // These byte values are shifted from the JIS X 0208 values.
  // JIS X 0208 gives details of the shift coded representation.
  for (i = 0; i < this.data.length; i++) {
    var value = Utils.toSJIS(this.data[i]);

    // For characters with Shift JIS values from 0x8140 to 0x9FFC:
    if (value >= 0x8140 && value <= 0x9FFC) {
      // Subtract 0x8140 from Shift JIS value
      value -= 0x8140;

      // For characters with Shift JIS values from 0xE040 to 0xEBBF
    } else if (value >= 0xE040 && value <= 0xEBBF) {
      // Subtract 0xC140 from Shift JIS value
      value -= 0xC140;
    } else {
      throw new Error(
      'Invalid SJIS character: ' + this.data[i] + '\n' +
      'Make sure your charset is UTF-8');
    }

    // Multiply most significant byte of result by 0xC0
    // and add least significant byte to product
    value = (value >>> 8 & 0xff) * 0xC0 + (value & 0xff);

    // Convert result to a 13-bit binary string
    bitBuffer.put(value, 13);
  }
};

module.exports = KanjiData;

/***/ }),
/* 256 */
/*!*****************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/dijkstrajs/dijkstra.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/******************************************************************************
               * Created 2008-08-19.
               *
               * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
               *
               * Copyright (C) 2008
               *   Wyatt Baldwin <self@wyattbaldwin.com>
               *   All rights reserved
               *
               * Licensed under the MIT license.
               *
               *   http://www.opensource.org/licenses/mit-license.php
               *
               * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
               * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
               * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
               * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
               * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
               * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
               * THE SOFTWARE.
               *****************************************************************************/
var dijkstra = {
  single_source_shortest_paths: function single_source_shortest_paths(graph, s, d) {
    // Predecessor map for each node that has been encountered.
    // node ID => predecessor node ID
    var predecessors = {};

    // Costs of shortest paths from s to all nodes encountered.
    // node ID => cost
    var costs = {};
    costs[s] = 0;

    // Costs of shortest paths from s to all nodes encountered; differs from
    // `costs` in that it provides easy access to the node that currently has
    // the known shortest path from s.
    // XXX: Do we actually need both `costs` and `open`?
    var open = dijkstra.PriorityQueue.make();
    open.push(s, 0);

    var closest,
    u, v,
    cost_of_s_to_u,
    adjacent_nodes,
    cost_of_e,
    cost_of_s_to_u_plus_cost_of_e,
    cost_of_s_to_v,
    first_visit;
    while (!open.empty()) {
      // In the nodes remaining in graph that have a known cost from s,
      // find the node, u, that currently has the shortest path from s.
      closest = open.pop();
      u = closest.value;
      cost_of_s_to_u = closest.cost;

      // Get nodes adjacent to u...
      adjacent_nodes = graph[u] || {};

      // ...and explore the edges that connect u to those nodes, updating
      // the cost of the shortest paths to any or all of those nodes as
      // necessary. v is the node across the current edge from u.
      for (v in adjacent_nodes) {
        if (adjacent_nodes.hasOwnProperty(v)) {
          // Get the cost of the edge running from u to v.
          cost_of_e = adjacent_nodes[v];

          // Cost of s to u plus the cost of u to v across e--this is *a*
          // cost from s to v that may or may not be less than the current
          // known cost to v.
          cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;

          // If we haven't visited v yet OR if the current known cost from s to
          // v is greater than the new cost we just found (cost of s to u plus
          // cost of u to v across e), update v's cost in the cost list and
          // update v's predecessor in the predecessor list (it's now u).
          cost_of_s_to_v = costs[v];
          first_visit = typeof costs[v] === 'undefined';
          if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
            costs[v] = cost_of_s_to_u_plus_cost_of_e;
            open.push(v, cost_of_s_to_u_plus_cost_of_e);
            predecessors[v] = u;
          }
        }
      }
    }

    if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
      var msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');
      throw new Error(msg);
    }

    return predecessors;
  },

  extract_shortest_path_from_predecessor_list: function extract_shortest_path_from_predecessor_list(predecessors, d) {
    var nodes = [];
    var u = d;
    var predecessor;
    while (u) {
      nodes.push(u);
      predecessor = predecessors[u];
      u = predecessors[u];
    }
    nodes.reverse();
    return nodes;
  },

  find_path: function find_path(graph, s, d) {
    var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
    return dijkstra.extract_shortest_path_from_predecessor_list(
    predecessors, d);
  },

  /**
      * A very naive priority queue implementation.
      */
  PriorityQueue: {
    make: function make(opts) {
      var T = dijkstra.PriorityQueue,
      t = {},
      key;
      opts = opts || {};
      for (key in T) {
        if (T.hasOwnProperty(key)) {
          t[key] = T[key];
        }
      }
      t.queue = [];
      t.sorter = opts.sorter || T.default_sorter;
      return t;
    },

    default_sorter: function default_sorter(a, b) {
      return a.cost - b.cost;
    },

    /**
        * Add a new item to the queue and ensure the highest priority element
        * is at the front of the queue.
        */
    push: function push(value, cost) {
      var item = { value: value, cost: cost };
      this.queue.push(item);
      this.queue.sort(this.sorter);
    },

    /**
        * Return the highest priority element in the queue.
        */
    pop: function pop() {
      return this.queue.shift();
    },

    empty: function empty() {
      return this.queue.length === 0;
    } } };




// node.js module exports
if (true) {
  module.exports = dijkstra;
}

/***/ }),
/* 257 */
/*!************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/renderer/canvas.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Utils = __webpack_require__(/*! ./utils */ 258);

function clearCanvas(ctx, canvas, size) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!canvas.style) canvas.style = {};
  canvas.height = size;
  canvas.width = size;
  canvas.style.height = size + 'px';
  canvas.style.width = size + 'px';
}

function getCanvasElement() {
  try {
    return document.createElement('canvas');
  } catch (e) {
    throw new Error('You need to specify a canvas element');
  }
}

exports.render = function render(qrData, canvas, options) {
  var opts = options;
  var canvasEl = canvas;

  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
    opts = canvas;
    canvas = undefined;
  }

  if (!canvas) {
    canvasEl = getCanvasElement();
  }

  opts = Utils.getOptions(opts);
  var size = Utils.getImageWidth(qrData.modules.size, opts);

  var ctx = canvasEl.getContext('2d');
  var image = ctx.createImageData(size, size);
  Utils.qrToImageData(image.data, qrData, opts);

  clearCanvas(ctx, canvasEl, size);
  ctx.putImageData(image, 0, 0);

  return canvasEl;
};

exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
  var opts = options;

  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
    opts = canvas;
    canvas = undefined;
  }

  if (!opts) opts = {};

  var canvasEl = exports.render(qrData, canvas, opts);

  var type = opts.type || 'image/png';
  var rendererOpts = opts.rendererOpts || {};

  return canvasEl.toDataURL(type, rendererOpts.quality);
};

/***/ }),
/* 258 */
/*!***********************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/renderer/utils.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function hex2rgba(hex) {
  if (typeof hex === 'number') {
    hex = hex.toString();
  }

  if (typeof hex !== 'string') {
    throw new Error('Color should be defined as hex string');
  }

  var hexCode = hex.slice().replace('#', '').split('');
  if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
    throw new Error('Invalid hex color: ' + hex);
  }

  // Convert from short to long form (fff -> ffffff)
  if (hexCode.length === 3 || hexCode.length === 4) {
    hexCode = Array.prototype.concat.apply([], hexCode.map(function (c) {
      return [c, c];
    }));
  }

  // Add default alpha value
  if (hexCode.length === 6) hexCode.push('F', 'F');

  var hexValue = parseInt(hexCode.join(''), 16);

  return {
    r: hexValue >> 24 & 255,
    g: hexValue >> 16 & 255,
    b: hexValue >> 8 & 255,
    a: hexValue & 255,
    hex: '#' + hexCode.slice(0, 6).join('') };

}

exports.getOptions = function getOptions(options) {
  if (!options) options = {};
  if (!options.color) options.color = {};

  var margin = typeof options.margin === 'undefined' ||
  options.margin === null ||
  options.margin < 0 ? 4 : options.margin;

  var width = options.width && options.width >= 21 ? options.width : undefined;
  var scale = options.scale || 4;

  return {
    width: width,
    scale: width ? 4 : scale,
    margin: margin,
    color: {
      dark: hex2rgba(options.color.dark || '#000000ff'),
      light: hex2rgba(options.color.light || '#ffffffff') },

    type: options.type,
    rendererOpts: options.rendererOpts || {} };

};

exports.getScale = function getScale(qrSize, opts) {
  return opts.width && opts.width >= qrSize + opts.margin * 2 ?
  opts.width / (qrSize + opts.margin * 2) :
  opts.scale;
};

exports.getImageWidth = function getImageWidth(qrSize, opts) {
  var scale = exports.getScale(qrSize, opts);
  return Math.floor((qrSize + opts.margin * 2) * scale);
};

exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
  var size = qr.modules.size;
  var data = qr.modules.data;
  var scale = exports.getScale(size, opts);
  var symbolSize = Math.floor((size + opts.margin * 2) * scale);
  var scaledMargin = opts.margin * scale;
  var palette = [opts.color.light, opts.color.dark];

  for (var i = 0; i < symbolSize; i++) {
    for (var j = 0; j < symbolSize; j++) {
      var posDst = (i * symbolSize + j) * 4;
      var pxColor = opts.color.light;

      if (i >= scaledMargin && j >= scaledMargin &&
      i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
        var iSrc = Math.floor((i - scaledMargin) / scale);
        var jSrc = Math.floor((j - scaledMargin) / scale);
        pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
      }

      imgData[posDst++] = pxColor.r;
      imgData[posDst++] = pxColor.g;
      imgData[posDst++] = pxColor.b;
      imgData[posDst] = pxColor.a;
    }
  }
};

/***/ }),
/* 259 */
/*!*************************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/node_modules/qrcode/lib/renderer/svg-tag.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Utils = __webpack_require__(/*! ./utils */ 258);

function getColorAttrib(color, attrib) {
  var alpha = color.a / 255;
  var str = attrib + '="' + color.hex + '"';

  return alpha < 1 ?
  str + ' ' + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' :
  str;
}

function svgCmd(cmd, x, y) {
  var str = cmd + x;
  if (typeof y !== 'undefined') str += ' ' + y;

  return str;
}

function qrToPath(data, size, margin) {
  var path = '';
  var moveBy = 0;
  var newRow = false;
  var lineLength = 0;

  for (var i = 0; i < data.length; i++) {
    var col = Math.floor(i % size);
    var row = Math.floor(i / size);

    if (!col && !newRow) newRow = true;

    if (data[i]) {
      lineLength++;

      if (!(i > 0 && col > 0 && data[i - 1])) {
        path += newRow ?
        svgCmd('M', col + margin, 0.5 + row + margin) :
        svgCmd('m', moveBy, 0);

        moveBy = 0;
        newRow = false;
      }

      if (!(col + 1 < size && data[i + 1])) {
        path += svgCmd('h', lineLength);
        lineLength = 0;
      }
    } else {
      moveBy++;
    }
  }

  return path;
}

exports.render = function render(qrData, options, cb) {
  var opts = Utils.getOptions(options);
  var size = qrData.modules.size;
  var data = qrData.modules.data;
  var qrcodesize = size + opts.margin * 2;

  var bg = !opts.color.light.a ?
  '' :
  '<path ' + getColorAttrib(opts.color.light, 'fill') +
  ' d="M0 0h' + qrcodesize + 'v' + qrcodesize + 'H0z"/>';

  var path =
  '<path ' + getColorAttrib(opts.color.dark, 'stroke') +
  ' d="' + qrToPath(data, size, opts.margin) + '"/>';

  var viewBox = 'viewBox="' + '0 0 ' + qrcodesize + ' ' + qrcodesize + '"';

  var width = !opts.width ? '' : 'width="' + opts.width + '" height="' + opts.width + '" ';

  var svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + '</svg>\n';

  if (typeof cb === 'function') {
    cb(null, svgTag);
  }

  return svgTag;
};

/***/ }),
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */
/*!*******************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/services/ticketService.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 22));var _ajax = _interopRequireDefault(__webpack_require__(/*! @/utils/ajax.js */ 26));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =

{
  checkTicketFromMobileAsync: function checkTicketFromMobileAsync(input, config) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var response;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                _ajax.default.post("/ticket/CheckTicketFromMobileAsync", input, config));case 2:response = _context.sent;return _context.abrupt("return",
              response.result);case 4:case "end":return _context.stop();}}}, _callee);}))();
  },
  enrollFaceAsync: function enrollFaceAsync(formData) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var response;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                _ajax.default.post("/ticket/EnrollFaceAsync", formData));case 2:response = _context2.sent;return _context2.abrupt("return",
              response.result);case 4:case "end":return _context2.stop();}}}, _callee2);}))();
  },
  deleteFaceAsync: function deleteFaceAsync(id) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {var response;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
                _ajax.default.post("/ticket/DeleteFaceAsync", { id: id }));case 2:response = _context3.sent;return _context3.abrupt("return",
              response);case 4:case "end":return _context3.stop();}}}, _callee3);}))();
  },
  getMemberTicketsForMobileAsync: function getMemberTicketsForMobileAsync(input) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var response;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (
                _ajax.default.post("/ticket/GetMemberTicketsForMobileAsync", input));case 2:response = _context4.sent;return _context4.abrupt("return",
              response.result);case 4:case "end":return _context4.stop();}}}, _callee4);}))();
  },
  getTicketFullInfoAsync: function getTicketFullInfoAsync(input) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var response;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
                _ajax.default.post("/ticket/GetTicketFullInfoAsync", input));case 2:response = _context5.sent;return _context5.abrupt("return",
              response.result);case 4:case "end":return _context5.stop();}}}, _callee5);}))();
  },
  getTicketSalePhotosByListNoAsync: function getTicketSalePhotosByListNoAsync(listNo) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {var response;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.next = 2;return (
                _ajax.default.get("/ticket/GetTicketSalePhotosByListNoAsync?listNo=".concat(listNo)));case 2:response = _context6.sent;return _context6.abrupt("return",
              response.result);case 4:case "end":return _context6.stop();}}}, _callee6);}))();
  },
  getLocalTicketsForEnrollFaceAsync: function getLocalTicketsForEnrollFaceAsync() {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7() {var response;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:_context7.next = 2;return (
                _ajax.default.get("/ticket/GetLocalTicketsForEnrollFaceAsync"));case 2:response = _context7.sent;return _context7.abrupt("return",
              response.result);case 4:case "end":return _context7.stop();}}}, _callee7);}))();
  },
  getLocalTicketForEnrollFaceAsync: function getLocalTicketForEnrollFaceAsync(ticketCode) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee8() {var response;return _regenerator.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:_context8.next = 2;return (
                _ajax.default.get("/ticket/GetLocalTicketForEnrollFaceAsync?ticketCode=".concat(
                ticketCode)));case 2:response = _context8.sent;return _context8.abrupt("return",

              response.result);case 4:case "end":return _context8.stop();}}}, _callee8);}))();
  },
  statTouristBySexAsync: function statTouristBySexAsync(input) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee9() {var response;return _regenerator.default.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:_context9.next = 2;return (
                _ajax.default.post("/ticket/StatTouristBySexAsync", input));case 2:response = _context9.sent;return _context9.abrupt("return",
              response.result);case 4:case "end":return _context9.stop();}}}, _callee9);}))();
  },
  statTouristByAgeRangeAsync: function statTouristByAgeRangeAsync(input) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee10() {var response;return _regenerator.default.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:
              input.statType = 2;_context10.next = 3;return (
                _ajax.default.post("/ticket/StatTouristByAgeRangeAsync", input));case 3:response = _context10.sent;return _context10.abrupt("return",
              response.result);case 5:case "end":return _context10.stop();}}}, _callee10);}))();
  },
  statTouristByAreaAsync: function statTouristByAreaAsync(input) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee11() {var response;return _regenerator.default.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:
              input.statType = 2;_context11.next = 3;return (
                _ajax.default.post("/ticket/StatTouristByAreaAsync", input));case 3:response = _context11.sent;return _context11.abrupt("return",
              response.result);case 5:case "end":return _context11.stop();}}}, _callee11);}))();
  },
  getTicketCheckOverviewAsync: function getTicketCheckOverviewAsync(date) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee12() {var response;return _regenerator.default.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:_context12.next = 2;return (
                _ajax.default.post("/ticket/GetTicketCheckOverviewAsync", {
                  StartDate: date,
                  EndDate: date }));case 2:response = _context12.sent;return _context12.abrupt("return",

              response.result);case 4:case "end":return _context12.stop();}}}, _callee12);}))();
  },
  getStadiumTicketCheckOverviewAsync: function getStadiumTicketCheckOverviewAsync(input) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee13() {var response;return _regenerator.default.wrap(function _callee13$(_context13) {while (1) {switch (_context13.prev = _context13.next) {case 0:_context13.next = 2;return (
                _ajax.default.post("/ticket/GetStadiumTicketCheckOverviewAsync", input));case 2:response = _context13.sent;return _context13.abrupt("return",
              response.result);case 4:case "end":return _context13.stop();}}}, _callee13);}))();
  },
  getScenicCheckInQuantityAsync: function getScenicCheckInQuantityAsync(input) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee14() {var response;return _regenerator.default.wrap(function _callee14$(_context14) {while (1) {switch (_context14.prev = _context14.next) {case 0:_context14.next = 2;return (
                _ajax.default.post("/ticket/GetScenicCheckInQuantityAsync", input));case 2:response = _context14.sent;return _context14.abrupt("return",
              response.result);case 4:case "end":return _context14.stop();}}}, _callee14);}))();
  },
  statTicketCheckInByGroundAndGateGroupAsync: function statTicketCheckInByGroundAndGateGroupAsync(input) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee15() {var response;return _regenerator.default.wrap(function _callee15$(_context15) {while (1) {switch (_context15.prev = _context15.next) {case 0:_context15.next = 2;return (
                _ajax.default.post("/ticket/StatTicketCheckInByGroundAndGateGroupAsync", input));case 2:response = _context15.sent;return _context15.abrupt("return",
              response.result);case 4:case "end":return _context15.stop();}}}, _callee15);}))();
  },
  statTicketCheckByGroundAndTimeAsync: function statTicketCheckByGroundAndTimeAsync(input) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee16() {var response;return _regenerator.default.wrap(function _callee16$(_context16) {while (1) {switch (_context16.prev = _context16.next) {case 0:_context16.next = 2;return (
                _ajax.default.post("/ticket/StatTicketCheckByGroundAndTimeAsync", input));case 2:response = _context16.sent;return _context16.abrupt("return",
              response.result);case 4:case "end":return _context16.stop();}}}, _callee16);}))();
  },
  statTicketCheckByTradeSourceAsync: function statTicketCheckByTradeSourceAsync(input) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee17() {var response;return _regenerator.default.wrap(function _callee17$(_context17) {while (1) {switch (_context17.prev = _context17.next) {case 0:_context17.next = 2;return (
                _ajax.default.post("/ticket/StatTicketCheckByTradeSourceAsync", input));case 2:response = _context17.sent;return _context17.abrupt("return",
              response.result);case 4:case "end":return _context17.stop();}}}, _callee17);}))();
  },
  statTicketSaleAsync: function statTicketSaleAsync(input) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee18() {var response;return _regenerator.default.wrap(function _callee18$(_context18) {while (1) {switch (_context18.prev = _context18.next) {case 0:_context18.next = 2;return (
                _ajax.default.post("/ticket/StatTicketSaleAsync", input));case 2:response = _context18.sent;return _context18.abrupt("return",
              response.result);case 4:case "end":return _context18.stop();}}}, _callee18);}))();
  } };exports.default = _default;

/***/ }),
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */
/*!*************************************************************************!*\
  !*** D:/Code/Self/HBuilder/rink_mobile/components/calendar/calendar.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}var _default = {
  //当某月的天数
  getDaysInOneMonth: function getDaysInOneMonth(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var d = new Date(year, month, 0);
    return d.getDate();
  },
  //向前空几个
  getMonthweek: function getMonthweek(date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var dateFirstOne = new Date(year, month, 1);
    return this.sundayStart ?
    dateFirstOne.getDay() == 0 ?
    7 :
    dateFirstOne.getDay() :
    dateFirstOne.getDay() == 0 ?
    6 :
    dateFirstOne.getDay() - 1;
  },
  /**
      * 获取当前日期上个月或者下个月
      */
  getOtherMonth: function getOtherMonth(date) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "nextMonth";
    var timeArray = this.dateFormat(date).split("-");
    var year = timeArray[0];
    var month = timeArray[1];
    var day = timeArray[2];
    var year2 = year;
    var month2;
    if (str === "nextMonth") {
      month2 = parseInt(month) + 1;
      if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
      }
    } else {
      month2 = parseInt(month) - 1;
      if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
      }
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0).getDate();
    if (day2 > days2) {
      day2 = days2;
    }
    if (month2 < 10) {
      month2 = "0" + month2;
    }
    if (day2 < 10) {
      day2 = "0" + day2;
    }
    var t2 = year2 + "/" + month2 + "/" + day2;
    return new Date(t2);
  },
  //上个月末尾的一些日期
  getLeftArr: function getLeftArr(date) {
    var arr = [];
    var leftNum = this.getMonthweek(date);
    var num = this.getDaysInOneMonth(this.getOtherMonth(date, "preMonth")) - leftNum + 1;
    var preDate = this.getOtherMonth(date, "preMonth");
    var year = preDate.getFullYear();
    var month = preDate.getMonth();
    //上个月多少开始
    for (var i = 0; i < leftNum; i++) {
      var day = num + i;
      var nowTime = this.dateFormat(new Date(year, month, day));
      arr.push({
        id: num + i,
        date: nowTime,
        isToday: false,
        otherMonth: "preMonth" });

    }
    return arr;
  },
  //下个月末尾的一些日期
  getRightArr: function getRightArr(date) {
    var arr = [];
    var nextDate = this.getOtherMonth(date, "nextMonth");
    var leftLength = this.getDaysInOneMonth(date) + this.getMonthweek(date);
    var _length = 7 - leftLength % 7;
    var year = nextDate.getFullYear();
    var month = nextDate.getMonth();
    for (var i = 0; i < _length; i++) {
      var day = i + 1;
      var nowTime = this.dateFormat(new Date(year, month, day));
      arr.push({
        id: i + 1,
        date: nowTime,
        isToday: false,
        otherMonth: "nextMonth" });

    }
    return arr;
  },
  //format日期
  dateFormat: function dateFormat(date) {
    date = typeof date === "string" ? new Date(date.replace("/-/g", "/")) : date;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return year + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day;
  },
  //获取某月的列表不包括上月和下月
  getMonthListNoOther: function getMonthListNoOther(date) {
    var arr = [];
    var num = this.getDaysInOneMonth(date);
    var year = date.getFullYear();
    var month = date.getMonth();
    var toDay = this.dateFormat(new Date());

    for (var i = 0; i < num; i++) {
      var day = i + 1;
      var nowTime = this.dateFormat(new Date(year, month, day));
      arr.push({
        id: i + 1,
        date: nowTime,
        isToday: toDay === nowTime,
        otherMonth: "nowMonth" });

    }
    return arr;
  },
  //获取某月的列表 用于渲染
  getMonthList: function getMonthList(date) {
    return [].concat(_toConsumableArray(this.getLeftArr(date)), _toConsumableArray(this.getMonthListNoOther(date)), _toConsumableArray(this.getRightArr(date)));
  },
  //默认是周一开始
  sundayStart: false };exports.default = _default;

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map