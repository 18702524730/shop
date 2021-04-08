require('es6-promise').polyfill();
import Vue from 'vue'
import App from './app.vue'
import VueRouter from "vue-router"
import VueResource from 'vue-resource'
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

Vue.use(VueAxios, axios)

const path = CONFIG.path;
const userUrl = CONFIG.userUrl;
global.Path = axios.defaults.baseURL = path;
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config) {
		// Do something before request is sent
		config.headers.Authorization = VueCookie.get('user_token'); // || 'iprp_member-d6681ea5d565483ea791342b58a0915892c8ee295375450f93dfed7d84e4fddb';
		return config;
}, function(error) {
		// Do something with request error
		return Promise.reject(error);

});

//
axios.interceptors.response.use(function(response) {
		// Do something with response data
		return response;
}, function(error) {
		// Do something with response error
		return Promise.reject(error);
});


const LoginUser = {
		member_id: '',
		email: '',
		phone: '',
		token: '',
		nickname: '',
		truename: '',
		avatar: '',
		sex: '',
		area_info: '',
		member_address: '',
		organization_id: '',
		parent: {
				member_id: '',
		},
};




// 定义组件, 也可以像教程之前教的方法从别的文件引入
//const searchMain = { template: '<div><h2>我是第 1 个子页面</h2></div>' }
//import searchResult from './component/searchResult.vue'

//import searchDetail from './component/searchDetail.vue'



// 创建一个路由器实例
// 并且配置路由规则
/*const router = new VueRouter({
	//mode: 'history',
	base: __dirname,
	routes: [
		{
			path: '/searchResult',
			component: searchResult
		},
		{
			name: 'searchDetail',
			path: '/searchDetail',
			component: searchDetail
		}
	]
})*/

/*new Vue({
	el: '#app',
	render: h => h(App)
})*/



// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
		//router: router,
		render: h => h(App)
}).$mount('#app')
