import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './app.vue'
import VueRouter from "vue-router"
import axios from 'axios'
import VueAxios from 'vue-axios'
require('es6-promise').polyfill();
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
Vue.use(VueAxios, axios)
global.Path = axios.defaults.baseURL = CONFIG.path;
axios.defaults.withCredentials = true;

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
  //router: router,
  render: h => h(App)
}).$mount('#app')
