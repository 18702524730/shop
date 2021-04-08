import Vue from 'vue'
import VueRouter from "vue-router"
import VueResource from 'vue-resource'
import Element from 'element-ui'
import VueCookie from 'vue-cookie'
import 'element-ui/lib/theme-chalk/index.css';
import Lib from 'assets/Lib.js'
import successApp from './app.vue'
import successMiniApp from './miniApp.vue'

Vue.use(Element)
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
Vue.config.productionTip = isDebug_mode;

Vue.use(VueCookie);

Vue.use(VueRouter);
Vue.use(VueResource);
// HTTP配置
Vue.http.options.crossOrigin = true
Vue.http.options.credentials = true


// 定义组件, 也可以像教程之前教的方法从别的文件引入
//const searchMain = { template: '<div><h2>我是第 1 个子页面</h2></div>' }

//import searchDetail from './component/searchDetail.vue'

const routes = [
  { path: '/', redirect:'/app' },
  { path: '/app', name:'app', component: successApp },
	{ path: '/miniApp', name:'miniApp', component: successMiniApp }
]

// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
	routes: routes 
})

/*new Vue({
	el: '#app',
	render: h => h(App)
})*/

global.Path = Vue.http.options.root = CONFIG.path;

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
	router: router
}).$mount('#app')
