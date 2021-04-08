import Vue from 'vue'
import 'assets/reset.css';
import 'assets/css/font-awesome.min.css';
import Element from 'element-ui'
import 'assets/css/element-variables.scss'
import 'assets/common.scss';
import Util from 'assets/common';
Vue.use(Element)
Vue.prototype.$util = Util;
