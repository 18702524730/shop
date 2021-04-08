<template>
	<div id="app">
		<sebe-header :username="userName" :title="'收银台'"></sebe-header>
		<div class="pay-success-wrap">
			<div class="commWidth status-info-wrap">
				<div class="autoJump" v-if="source==1">
					<div class="paying-ok"><span v-if="paytipinfoObj['paying-ok']"><i>{{timeLeft}}</i>秒之后前往<a href="" @click.prevent="viewService">我的服务</a>，请及时上传申请材料，进入申报阶段</span></div>
				</div>
				<div class="status-info-in clearfix">
					<div class="fl status-info">
						<div :class="paytipinfoObj">
							<i v-if="paymentState == 1" class="el-icon-success mr15"></i>
							<i v-if="paymentState == 2" class="el-icon-error mr15"></i>
							<img v-if="paymentState == -1" class="mr15" src="~assets/img/pay/payLoad.gif" alt="">
							{{tip}}
							<p>
							<!-- 原型说明只显示前两个，超出部分... -->
								<span v-if="payData.orderBsNames&&payData.orderBsNames[0]">{{payData.orderBsNames[0]}}</span>
								<span v-if="payData.orderBsNames&&payData.orderBsNames.length>1">等{{payData.orderBsNames.length}}件商品 </span>
								订单金额：<b>¥{{payData.payMoney|priceformat}}</b>
							</p>
						</div>
					</div>
					<div class="pay_btn fr">
					
						<a :href="indexUrl"><el-button size="medium" type="primary">去首页看看</el-button></a>
						<a class="ml30 mr40" @click.prevent="view"><el-button size="medium">查看订单详情</el-button></a>
					</div>
				</div>
			</div>
		</div>
		<div class="commWidth recommend_list mb20">
			<div class="recommend_head">
				<img src="~assets/img/pay/attention.png" alt="">
				<span class="ml5">购买了该商品的用户还购买了</span>
			</div>
			<div class="clearfix mt20">
				<div class="list fl" v-for="(item,index) in paySuccPurchanseList" :class="{'ml25':index>0}" @click="toDetails(item)">
					<img class="list_trademark" :src="item.businessService.picture" alt="">
					<div>
						<p class="list_heade mt5">¥{{(item.businessService.standardPrice-0).toFixed(2)}}
							<img class="fr" src="~assets/img/icon/link.png" alt="" @click.stop="toService(item)">
						</p>
						<p class="list_name mt5">{{item.businessService.name}}</p>
						<p class="list_store mt5" @click.stop="toDetailShop(item.storeCode)">{{item.storeName}}</p>
						<img v-for="info in item.tagsList" :title="info.name" class="list_gold mt5 mr5" :src="info.iconUrl" alt="">
					</div>
				</div>
			</div>
		</div>
		<customer-service :cartNum="cartNum"></customer-service>
		<sebe-footer></sebe-footer>
	</div>
</template>

<script>

	import Vue from 'vue'
	import sebeHeader from 'components/HeaderSm.vue'
	import sebeFooter from 'components/Footer.vue'
	import customerService from 'components/CustomerService.vue'
	import Filters from 'assets/filters.js'
	const userUrl = CONFIG.userUrl;
	const indexUrl = CONFIG.indexUrl;
	const trademarkUrl = CONFIG.trademarkUrl;

	export default {
		components: {
			sebeHeader,
			customerService,
			sebeFooter
		},
		data() {
			return {
				indexUrl:indexUrl,
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
				paySuccPurchanseList:[]
			}
		},
		mounted () {
			this.payData.orderNum = this.$route.query.order_sn;
			this.source = this.$route.query.source;
			this.getPayInfo();
			var userName = this.$cookie.get('truename');
			var phone = this.$cookie.get('phone');
			if (phone) {
				phone = phone.slice(0, 3) + '****' + phone.slice(-4);
			}
			this.userName = userName ? userName : phone;
			this.cartNum = this.$cookie.get('cart_num') || '0';
		},
		methods: {
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
					self.$http.post('./payweb/paymentstatus.htm', {
						order_sn: self.payData.orderNum
					}, {
						emulateJSON: true
					}).then(function(response) {
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
