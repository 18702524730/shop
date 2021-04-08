import Vue from 'vue'
import App from './app.vue'
import VueRouter from "vue-router"
import Element from 'element-ui'
import VueCookie from 'vue-cookie'
import 'element-ui/lib/theme-chalk/index.css';
import Lib from 'assets/Lib.js'
Vue.use(Element)
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
Vue.config.productionTip = isDebug_mode;

Vue.use(VueCookie);

Vue.use(VueRouter);

import axios from 'axios'
import VueAxios from 'vue-axios'
require('es6-promise').polyfill();
Vue.use(VueAxios, axios)
// 配置全局根路径
global.Path = axios.defaults.baseURL = CONFIG.path;
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.Authorization = VueCookie.get('user_token');// || 'iprp_member-35f7bb9b6a63419ba3749c180b7fe6ee94859e86af844ce9b04d5d136aa21acf';
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
  // router: router,
  render: h => h(App)
}).$mount('#app')
