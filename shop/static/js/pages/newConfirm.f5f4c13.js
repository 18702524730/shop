webpackJsonp([16],{285:function(t,e,a){a(702);var r=a(3)(a(384),a(792),null,null);t.exports=r.exports},346:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){var e=a(17),r=a.n(e),n=a(1),s=a(285),i=a.n(s),o=a(12),c=a(8),l=a.n(c),d=a(4),u=a.n(d),f=a(9),p=(a.n(f),a(2),a(7)),v=a.n(p),m=a(11),_=a.n(m);n.default.use(l.a);n.default.config.debug=!1,n.default.config.devtools=!1,n.default.config.productionTip=!1,n.default.use(u.a),n.default.use(o.a),a(14).polyfill(),n.default.use(_.a,v.a),t.Path=v.a.defaults.baseURL=CONFIG.path,v.a.interceptors.request.use(function(t){return t.headers.Authorization=u.a.get("user_token"),t},function(t){return r.a.reject(t)});new n.default({render:function(t){return t(i.a)}}).$mount("#app")}.call(e,a(5))},384:function(t,e,a){"use strict";function r(t,e){var a,r,n={},s=t.indexOf("?")>-1?t.split("?")[1]:t,i=s.split("&");for(r=0;r<i.length;r++)a=i[r].split("="),n[a[0]]=decodeURIComponent(a[1]).replace(/\+/g," ");return n}Object.defineProperty(e,"__esModule",{value:!0});var n=(a(1),a(26)),s=a.n(n),i=a(29),o=a.n(i),c=a(42),l=a.n(c),d=a(7),u=(a.n(d),a(24)),f=(a.n(u),a(2),CONFIG.path,CONFIG.indexUrl,CONFIG.userUrl);e.default={name:"app",data:function(){return{cartNum:"",loading:!1,visible:!1,userName:"",buyGoodData:{},orderData:[],order:[],itemId:"",productNum:1,payPrice:"",totalPrice:"",arr:[],bodyList:"",submitDisabled:!1,fullscreenLoading:!1}},components:{sebeHeader:s.a,customerService:l.a,sebeFooter:o.a},mounted:function(){this.buyGoodData=JSON.parse(r(location.href).params),this.getOrderInfo();var t=this.$cookie.get("truename"),e=this.$cookie.get("phone");e&&(e=e.slice(0,3)+"****"+e.slice(-4)),this.userName=t||e,this.cartNum=this.$cookie.get("cart_num")||"0"},computed:{},methods:{getOrderInfo:function(){var t=this;t.loading=!0,this.$http.post("./cartWeb/nowPlaceOrders.htm",this.buyGoodData).then(function(e){t.loading=!1;var a=e.data;console.log(a),0==a.code?(t.order=a.data.order,t.payPrice=a.payPrice,t.totalPrice=a.totalPrice,t.itemId=t.order[0].itemId,t.productNum=t.order[0].productNum):"请登录"==a.msg||"0100002"==a.code?t.$confirm("登录已失效，请重新登录","提示",{confirmButtonText:"重新登录",showCancelButton:!1,type:"warning"}).then(function(){location.href=f+"/iprp/#/access/login?return_url="+location.href}).catch(function(){location.href=f+"/iprp/#/access/login?return_url="+location.href}):t.$alert("系统繁忙，请稍候再试。")}).catch(function(t){})},submitOrder:function(t){var e=this;e.submitDisabled||(e.submitDisabled=!0,e.fullscreenLoading=!0,e.$http.post("./cartWeb/nowPlaceOrderCombine.htm",e.buyGoodData).then(function(t){e.submitDisabled=!1,e.fullscreenLoading=!1;var a=t.data;console.log(a),"success"==a.code?location.href="./pay.html?order_sn="+a.data.payOrder[0].orderNum:"请登录"==a.msg||"0100002"==a.code?e.$confirm("登录已失效，请重新登录","提示",{confirmButtonText:"重新登录",showCancelButton:!1,type:"warning"}).then(function(){location.href=f+"/iprp/#/access/login?return_url="+location.href}).catch(function(){location.href=f+"/iprp/#/access/login?return_url="+location.href}):e.$alert("系统繁忙，请稍候再试。")}).catch(function(t){e.$alert("系统繁忙，请稍候再试。"),e.submitDisabled=!1,e.fullscreenLoading=!1}))}}}},702:function(t,e){},792:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("sebe-header",{attrs:{username:t.userName,title:"确认订单"}}),t._v(" "),a("div",{staticClass:"commWidth clearfix",attrs:{id:"confirmOrder"}},[a("h3",[t._v("确认订单信息")]),t._v(" "),t._m(0),t._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"orderBody"},t._l(t.order,function(e,r){return a("div",{staticClass:"td"},[a("div",{staticClass:"td-1"},[t._v(t._s(e.productName))]),t._v(" "),a("div",{staticClass:"td-2"},[a("span",{staticClass:"perPrice"},[t._v(t._s((e.standardPrice-0).toFixed(2)))])]),t._v(" "),a("div",{staticClass:"td-3"},[t._v(t._s(e.productNum))]),t._v(" "),a("div",{staticClass:"td-4"},[a("span",{staticClass:"oldPrice"},[t._v(t._s((e.payMoney-0).toFixed(2)))])])])}),0),t._v(" "),a("div",{staticClass:"orderResult"},[a("div",{staticClass:"total"},[t._v("商品价格总计："),a("span",[t._v("¥"+t._s((t.totalPrice-0).toFixed(2)))])]),t._v(" "),a("div",{staticClass:"payTotal"},[t._v("实付金额："),a("span",[t._v("¥"+t._s((t.payPrice-0).toFixed(2)))])]),t._v(" "),a("button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:t.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"subOrder",attrs:{"element-loading-text":"请稍候，正在提交中..."},on:{click:t.submitOrder}},[t._v("立即下单")])])]),t._v(" "),a("customer-service",{attrs:{cartNum:t.cartNum}}),t._v(" "),a("sebe-footer")],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"orderTil"},[a("span",{staticClass:"td-1"},[t._v("商品名称")]),t._v(" "),a("span",{staticClass:"td-2"},[t._v("单价(元)")]),t._v(" "),a("span",{staticClass:"td-3"},[t._v("数量")]),t._v(" "),a("span",{staticClass:"td-4"},[t._v("金额(元)")])])}]}}},[346]);