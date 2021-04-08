<template>
	<div id="app" class="body_wrap" :style="{minHeight: winHeight + 'px'}">
		<!-- 小程序支付头部 -->
    <mini-header ></mini-header>
		<div class="pay-success-wrap">
			<div class="commWidth status-info-wrap status_info_mini">
				<div class="autoJump" v-if="source==1">
					<div class="paying-ok"><span v-if="paytipinfoObj['paying-ok']"><i>{{timeLeft}}</i>秒之后前往<a href="" @click.prevent="viewService">我的服务</a>，请及时上传申请材料，进入申报阶段</span></div>
				</div>
				<div class="status-info-in clearfix">
					<div class="fl status-info">
						<div :class="paytipinfoObj">
							<i v-if="paymentState == 1" class="el-icon-success mr15"></i>
							<i v-if="paymentState == 2" class="el-icon-error mr15"></i>
							<img v-if="paymentState == -1" class="mr15" src="~assets/img/pay/payLoad.gif" alt="">
						</div>
						<p class="tip_mini">{{ tip }}</p>
		        <p class="order_info">店铺：<span class="value">{{ miniPayData.storeName }}</span></p>
		        <p class="order_info">下单用户：<span class="value">{{ miniPayData.nickName }} &nbsp; ({{ miniPayData.orderBuyerPhone }})</span></p>
					</div>
					<div class="amount fr">
						<span class="text">实付款：</span><b class="num">¥{{ miniPayData.orderAmount | priceformat }}</b>
					</div>
				</div>
			</div>
		</div>


		<div class="commWidth recommend_list mb20">
			<div class="mini_box clearfix">
				<img src="~assets/img/pay/sebe+.png" alt="" class="mini">
				<div class="tips_box">
					<img src="~assets/img/pay/sao.png" alt="" class="sao">
					<p class="tip">微信扫码，打开拾贝宝+ 查看订单详情！</p>
				</div>
			</div>
		</div>
		<customer-service :cartNum="cartNum"></customer-service>

		<!-- 微信支付底部 -->
    <mini-footer ></mini-footer>	</div>
</template>

<script>

	import Vue from 'vue'
	import sebeHeader from 'components/HeaderSm.vue'
	import miniHeader from 'components/HeaderMini.vue'
	import sebeFooter from 'components/Footer.vue'
	import miniFooter from 'components/FooterMini.vue'
	import customerService from 'components/CustomerService.vue'
	import Filters from 'assets/filters.js'
	const userUrl = CONFIG.userUrl;
	const indexUrl = CONFIG.indexUrl;
	const trademarkUrl = CONFIG.trademarkUrl;
	const cartUrl = CONFIG.cartUrl;

	export default {
		components: {
			sebeHeader,
			miniHeader,
			customerService,
			sebeFooter,
			miniFooter
		},
		data() {
			return {
				indexUrl:indexUrl,
				winHeight:900, // 视窗高度
				timeLeft: 5,
				cartNum:"",
				showTip: false, // 非存证订单显示提示
				orderdetailVisible: false,
				userName: "",
				productOrderData:[],
				tip: '正在支付中...',
				paymentState: -1, // 2支付失败 1 支付成功 -1支付中 (后台0支付失败 1支付成功)
				paytipinfoObj: {
					'paying': true,
					'paying-ok': false,
					'paying-error':false
				},
				payData: {
					"orderNum": "",    //订单号
					"payment_sn": "",     //支付单号
					"channel": "", //支付渠道
					"payMoney": "",  //实际支付价格=定金-订金优惠价
					"creatTime": "",
					"orderBsNames":[]//订单服务名称
				},
				source: '', // ''：默认  1：商标自助注册
				paySuccPurchanseList:[],
				miniPayData: {},  //小程序支付数据
				orderNumMd5: '',  //经md5加密过后的订单号
			}
		},
		mounted () {
      var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = '../static/bitbug_favicon.ico';
      document.getElementsByTagName('head')[0].appendChild(link);
			this.winHeight = document.documentElement.clientHeight;
			if (this.winHeight < 600) {
				this.winHeight = 600;
			}
			this.orderNumMd5 = this.$route.query.order_sn_md5 || '';
			this.payData.orderNum = this.$route.query.order_sn;
			this.orderNum = this.$route.query.order_sn;
			this.source = this.$route.query.source;
			this.getPayInfo();
			this.getMiniPayInfoFn();
			var userName = this.$cookie.get('truename');
			var phone = this.$cookie.get('phone');
			if (phone) {
				phone = phone.slice(0, 3) + '****' + phone.slice(-4);
			}
			this.userName = userName ? userName : phone;
			this.cartNum = this.$cookie.get('cart_num') || '0';
		},
		methods: {
			// 查询小程序支付信息
      getMiniPayInfoFn () {
        this.miniPayData = JSON.parse(sessionStorage.getItem('miniPayData'));
      },
			toService(item){
				if(item.manageType == 1){
					window.open('https://pct.zoosnet.net/LR/Chatpre.aspx?id=PCT70172520&lng=cn&p=http%3a%2f%2fwww.ipsebe.com')
				}else if(item.manageType == 2){
					window.open('http://wpa.qq.com/msgrd?v=3&amp;uin='+item.storeQQ+'&amp;site=qq&amp;menu=yes')
				}
			},
			toDetailShop(item){
				console.log(item)
				location.href = indexUrl+'/store/'+item+'.htm';
			},
			toDetails(item){
				location.href = indexUrl+'/store/service/'+item.businessService.serviceSn+'.htm';
			},
			startTimer(){
				var self = this;
				var timer = setInterval(function(){
					self.timeLeft--;
					if (self.timeLeft === 0) {
						clearInterval(timer);
						self.viewService();
					}
				},1000);
			},
			viewService(){
				location.href = userUrl+'/iprp/#/serviceList';
			},
			getPayInfo(){
				var self = this;
				var i = 0;
				var timer = setInterval(function(){
					i++;
					if (i > 40) {
						clearInterval(timer);
						self.tip = '支付失败，请重新支付。'
						self.paymentState = 2;
						//location.href = './pay.html?notarizationType='+ self.notarizationType +'&order_sn='+ self.orderNum;
						return;
					}
					getPaySatatus();
				},1000);

				function getPaySatatus (){
					// self.$http.get(`${indexUrl}/createOrder/findConfirmPartnerOrderByMD5.htm?md5=${self.orderNumMd5}`)
					self.$http.post( cartUrl + '/payweb/paymentstatus.htm', {
						order_sn: self.payData.orderNum
					}, {
						emulateJSON: true
					})
					.then(function(response) {
						var data = response.data;
						if(data.code == 'success'){
							var payment_description = data.data.payment_description || '';
							self.payData.payMoney = data.data.payment_amount;
							self.payData.payTime = data.data.payment_time;
							self.payData.orderBsNames = data.orderBsNames;
							self.showTip = payment_description.indexOf('存证') === -1 ? true : false;
							self.paySuccPurchanseList = data.paySuccPurchanseList || [];
							var paymentState = self.paymentState = data.data.payment_state;
							if (paymentState === 1) {
								self.tip = '支付成功';
								clearInterval(timer);
								if (self.source == 1) {
									self.startTimer();
								}
							}
						}
					}, function(response) {
						console.log(response)
					});
				}
			},
			view(){
				var self = this;
				location.href = userUrl+'/iprp/#/orders/' + this.$route.query.order_sn;
			}
		},
		watch: {
			//支付状态 2支付失败 1 支付成功 -1支付中 (后台0支付失败 1支付成功)
			paymentState(){
				this.paytipinfoObj = {
					'paying': this.paymentState === -1,
					'paying-ok': this.paymentState === 1,
					'paying-error': this.paymentState === 2
				}
			}
		},
		filters: {
			dateFormat: Filters.formatDate.dateFormat,
			priceformat: Filters.priceformat
		}
	}
	/**
	 * param 将要转为URL参数字符串的对象
	 * key URL参数字符串的前缀
	 * encode true/false 是否进行URL编码,默认为true
	 *
	 * return URL参数字符串
	 */
	// function parseParam (param, key, encode){
	//   if(param==null) param = '';
	//   var paramStr = '';
	//   var t = typeof (param);
	//   if (t == 'string' || t == 'number' || t == 'boolean') {
	//     paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
	//   } else {
	//     for (var i in param) {
	//       var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
	//       paramStr += '&' + parseParam(param[i], k, encode);
	//     }
	//   }
	//   return paramStr.slice(1);
	// };
	//获取url中的查询关键字
	function getQueryString(name) {
		var ret = '';
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = location.search.slice(1).match(reg);
		if (r != null) {
			ret = decodeURIComponent(r[2]);
		}
		return ret;
	}
</script>


<style lang="scss">
.body_wrap {
	background: #f5f5f5;
}
.pay-success-wrap{padding:15px 0 20px;background-color: #f5f5f5}
.status-info-wrap{
	font-size: 14px;
	// height: 380px;
	background-color: #FFF;
	padding-top: 50px;padding-bottom: 60px;
	.autoJump{
		width:635px;margin: 0 auto;position: relative;top: -30px;text-align: center;
		.paying-ok{height: 42px;line-height:42px;font-size:18px;}
		span{
			i{color: #fe2200;font-style: normal;width: 24px;}
		}
		a{color: #3db1fa;padding: 0 3px;}
	}
	.status-info-in{margin-left: 70px;
		.status-info{
			.paying-gif{position: relative;top: -5px;}
			.paying{padding-left: 48px;line-height:58px;font-size:18px;
				img{height:58px;width:58px;vertical-align: bottom;}
			}
			.paying-ok{padding-left: 48px;line-height:58px;font-size:18px;
				i{color:#36AF47;}
			}
			.paying-error{padding-left: 48px;line-height:58px;font-size:18px;
				i{color:#ff3939;}
			}
			.tip1{height: 45px;line-height:40px;padding-top:5px;}
			.tip2{height: 15px;line-height:15px;}
			.orderinfo{line-height:28px;padding-bottom: 10px;
				b{color: #fe2200;}
			}
			.view{color: #3db1fa}
			div{font-weight:bold;
				i{font-size:58px;vertical-align: bottom;}
				>p{line-height:25px;font-size:14px;padding-top:22px;font-weight:normal;
					span{display:inline-block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;vertical-align: bottom;}
					b{color:#ff3939;}
				}
			}
		}
		.gzh{
			p{line-height: 24px;}
			img{display: block;margin-top: 5px;margin-left: -10px;}
		}
		.pay_btn{font-size:0;margin-top:76px;
			a{display:inline-block;text-decoration:none;}
			.el-button--primary,.el-button--medium{height:40px;border-radius:2px;}
		}
	}
}
.status_info_mini {
	padding: 30px 0 30px 30px;
	.status-info-in {
		margin-left: 0;
		.status-info {
			width: 50%;
			.paying-ok {padding: 10px 0; float: left;}
			.paying-error {padding: 10px 0; float:left;}
			.paying {
				width: 58px; margin-right: 15px; float: left; padding: 10px 0;
				img {float: left; margin: 0;}
			}
			.tip_mini { margin-bottom: 10px; line-height: 25px; float: left; width: 490px; font-size: 18px; color: #333; font-weight: bold;}
			.order_info {
		    color: #999; font-size: 14px; line-height: 20px; margin-bottom: 5px; padding: 0; float: left; width: 490px;
		    .value {color: #333;}
		  }
		}
	} 
	.amount {
		margin: 20px 40px 0 0;
		.text {font-weight: 600; vertical-align: -webkit-baseline-middle; vertical-align: baseline;}
    .num {font-size: 28px; color: #F64744; }
	}
}
.mini_box {
	width: 180px; margin: 55px auto; text-align: center;
	.mini {width: 180px; height: 180px; margin-bottom: 10px;}
	.tips_box {
		width: 100%;
		.sao {width: 29px; height: 26px; margin-right: 10px; vertical-align: middle; display: inline-block;}
		.tip {color: #666; font-size: 12px; width: 129px; line-height: 18px; text-align: left; vertical-align: middle; display: inline-block;}
	}
}
.recommend_list{
	padding:25px;background-color:#fff;
	.recommend_head{font-size:0;
		span{font-size:14px;color:#333;}
		img{vertical-align: bottom;}
	}
	div{
		.list{
			width:210px;height:330px;border:1px solid #ededed;font-size:0;cursor: pointer; transition: all 0.3s;
			&:hover{box-shadow: 0 2px 12px 0 #D9D9D9; transition: all 0.3s;}
			.list_trademark{width:208px;height:210px;}
			>div{padding:5px 10px;
				.list_heade{font-size:18px;font-weight:bold;color:#ff763c;line-height:25px;
					img{width:18px;height:18px;cursor: pointer;}
				}
				.list_name{width:190px;font-size:14px;line-height:20px;color:#333;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
				.list_store{font-size:12px;color:#999;line-height:17px;background: url(~assets/img/pay/look.png) no-repeat 0px 5px;background-size: 7px 9px;padding-left:14px;display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;width:188px;}
			}
			.list_gold{width:18px;height:18px;}
		}
	}
}


</style>
