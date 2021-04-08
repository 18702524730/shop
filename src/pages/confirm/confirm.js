import Vue from 'vue'
//import VueRouter from "vue-router"
import VueCookie from 'vue-cookie'
import Lib from 'assets/Lib.js'
import App from './app.vue'
Vue.use(VueCookie);
//Vue.use(VueRouter);

const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
Vue.config.productionTip = isDebug_mode;

import axios from 'axios'
import VueAxios from 'vue-axios'
require('es6-promise').polyfill();
Vue.use(VueAxios, axios)

import { EventBus } from 'assets/common/event-bus.js';

// 配置全局根路径
global.Path = axios.defaults.baseURL = CONFIG.path;

// Add a request interceptor
axios.interceptors.request.use(function (config) {
	config.headers.Authorization = VueCookie.get('user_token');
	return config;
}, function (error) {
	return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  // Do something with response data
  var data = response && response.data;
  if(data && data.code == '4010008') {
    EventBus.$emit('needLogin');
  };
  return response;
}, function (error) {
  var data = error && error.response && error.response.data;
  if(data && (data.status == 401 || data.code == '4010008')) {
    EventBus.$emit('needLogin');
  };
  // Do something with response error
  return Promise.reject(error);
});

// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
	//router: router,
	render: h => h(App)
}).$mount('#app')
