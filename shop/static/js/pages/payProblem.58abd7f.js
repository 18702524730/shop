webpackJsonp([11],{287:function(e,t,s){s(671);var n=s(3)(s(386),s(761),null,null);e.exports=n.exports},348:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){var t=s(17),n=s.n(t),r=s(1),a=s(287),o=s.n(a),c=s(12),i=(s(30),s(8)),u=s.n(i),l=s(4),p=s.n(l),m=s(9),d=(s.n(m),s(2),s(7)),f=s.n(d),v=s(11),_=s.n(v);s(14).polyfill(),r.default.use(u.a);r.default.config.debug=!1,r.default.config.devtools=!1,r.default.config.productionTip=!1,r.default.use(p.a),r.default.use(c.a),r.default.use(_.a,f.a),e.Path=f.a.defaults.baseURL=CONFIG.czUrl,f.a.interceptors.request.use(function(e){return e.headers.Authorization=p.a.get("user_token"),e},function(e){return n.a.reject(e)}),f.a.interceptors.response.use(function(e){return e},function(e){return n.a.reject(e)});new r.default({render:function(e){return e(o.a)}}).$mount("#app")}.call(t,s(5))},386:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=(s(1),s(26)),r=s.n(n),a=s(81),o=s.n(a),c=s(42),i=s.n(c),u=s(740),l=s.n(u),p=s(741),m=s.n(p);t.default={name:"app",data:function(){return{cartNum:"",showEmpty:!0,isCheckedAll:!1,isChecked:!1,checkedNumber:0,amount:0,userName:"",num:1,cartData:[{show:!0,problem:"为什么支付宝显示已经支付，但是订单还是显示未支付成功？",answer:"这是由于第三方平台同时支付的订单量较大，导致支付宝与我方数据同步略有滞后，原则上24小时内会同步状态，请注意查看。 给您带来的不便，敬请谅解。"},{show:!0,problem:"如果银行卡未开通网上支付功能，如何进行支付？",answer:"您可以使用支付宝快捷支付，无需开通网银，通过您的银行卡号和支付宝账户即可进行大额支付"},{show:!0,problem:"如何开通网上银行？",answer:"请您联系发卡银行办理。"},{show:!0,problem:"在线支付订单需要在多长时间内完成付款？",answer:"平台下单后，订单需在72小时内完成付款（商标交易业务为24小时）。超时后，您的订单将自动关闭。"},{show:!0,problem:"如何查询是否支付成功？",answer:"登录后打开“我的订单”查询订单状态。"},{show:!0,problem:"如果无法付款，提示“您的支付限额不够”，怎么办？如何更改支付限额？",answer:"请联系您的发卡行修改支付限额，或者使用支付宝快捷支付。"},{show:!0,problem:"如何更改支付限额？",answer:"因不同银行的办理方式不一致，请您联系所属银行的客户中心办理。"},{show:!0,problem:"拾贝网支持的支付方式有哪些？",answer:"平台目前支持个人支付和企业支付两种方式，其中支持支付宝、微信、及支持国内二十多家主流银行机构的储蓄卡的网上支付。",content:'<p>个人支付</p><img src="'+l.a+'" alt="" /><p>企业支付</p><img src="'+m.a+'" alt="" />'}],selectedIds:[]}},components:{sebeHeader:r.a,customerService:i.a,sebeFooter:o.a},mounted:function(){var e=this.$cookie.get("truename"),t=this.$cookie.get("phone");t&&(t=t.slice(0,3)+"****"+t.slice(-4)),this.userName=e||t,this.cartNum=this.$cookie.get("cart_num")||"0"}}},671:function(e,t){},740:function(e,t,s){e.exports=s.p+"static/img/personal-new.1a5e4c5.png"},741:function(e,t,s){e.exports=s.p+"static/img/public-new.b863645.png"},761:function(e,t,s){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"problem"},[n("div",{staticClass:"problemList"},[n("img",{staticClass:"lg",attrs:{src:s(128),alt:""}}),e._v(" "),n("h1",[e._v("拾贝平台在线支付常见问题")]),e._v(" "),[n("ul",e._l(e.cartData,function(t,s){return n("li",{class:{brm:t.show}},[n("p",{staticClass:"pro"},[e._v("Q"+e._s(s+1)+"："+e._s(t.problem))]),e._v(" "),n("p",{staticClass:"ans"},[e._v("A"+e._s(s+1)+"："+e._s(t.answer))]),e._v(" "),t.content?n("div",{staticClass:"con",domProps:{innerHTML:e._s(t.content)}}):e._e()])}),0)],e._v(" "),n("p",{staticClass:"service"},[e._v("如未能解决您的问题，请联系客服 4000-315-426")])],2),e._v(" "),e._m(0)]),e._v(" "),n("customer-service",{attrs:{cartNum:e.cartNum}})],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"footer"},[s("p",{staticClass:"sebe"},[e._v("© 2018 拾贝  All rights reserved  "),s("a",{attrs:{target:"_blank",href:"http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010402003197"}},[e._v("浙公网安备 33010402003197号")])]),e._v(" "),s("p",{staticClass:"sebename"},[e._v("杭州拾贝知识产权服务有限公司")])])}]}}},[348]);