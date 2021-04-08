<template>
	<div id="app">
		<!-- <sebe-header :username="userName" :title="'我的购物车'"></sebe-header> -->
		<div class="problem">
			<div class="problemList">
			<img class="lg" src="~assets/img/payProblem/logo.png" alt="">
			<h1>拾贝平台在线支付常见问题</h1>
			<template>
				<ul>
					<li v-for="(item, index) in cartData"  :class="{brm:item.show}">
						<p class="pro">Q{{index+1}}：{{item.problem}}</p>
						<p class="ans">A{{index+1}}：{{item.answer}}</p>
						<div class="con" v-if="item.content" v-html="item.content"></div>
					</li>
				</ul>
				</template>
				<p class="service">如未能解决您的问题，请联系客服 4000-315-426</p>
			</div>
			<div class="footer">
				<p class="sebe">© 2018 拾贝  All rights reserved  <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010402003197">浙公网安备 33010402003197号</a></p>
				<p class="sebename">杭州拾贝知识产权服务有限公司</p>
			</div>
			
		</div>
		<customer-service :cartNum="cartNum"></customer-service>
		<!-- <sebe-footer></sebe-footer> -->
	</div>
</template>

<script>
	import Vue from 'vue'
	import sebeHeader from 'components/HeaderSm.vue'
	import sebeFooter from 'components/FooterSm.vue'
	import customerService from 'components/CustomerService.vue'
	import bankimg1 from 'assets/img/payProblem/personal-new.png'
	import bankimg2 from 'assets/img/payProblem/public-new.png'


	export default {
		name: 'app',
		data () {
			return {
				cartNum:"",
				showEmpty: true,
				isCheckedAll: false, //用于控制全选的checkbox
				isChecked: false, //用于控制商品条目的checkbox
				checkedNumber: 0,
				amount: 0,
				userName: "",
				num:1,
				cartData: [
					{
						"show":true,
						"problem":"为什么支付宝显示已经支付，但是订单还是显示未支付成功？",
						"answer":"这是由于第三方平台同时支付的订单量较大，导致支付宝与我方数据同步略有滞后，原则上24小时内会同步状态，请注意查看。 给您带来的不便，敬请谅解。"
					},
					{
						"show":true,
						"problem":"如果银行卡未开通网上支付功能，如何进行支付？",
						"answer":"您可以使用支付宝快捷支付，无需开通网银，通过您的银行卡号和支付宝账户即可进行大额支付"
					},
					{
						"show":true,
						"problem":"如何开通网上银行？",
						"answer":"请您联系发卡银行办理。"
					},
					{
						"show":true,
						"problem":"在线支付订单需要在多长时间内完成付款？",
						"answer":"平台下单后，订单需在72小时内完成付款（商标交易业务为24小时）。超时后，您的订单将自动关闭。"
					},
					{
						"show":true,
						"problem":"如何查询是否支付成功？",
						"answer":"登录后打开“我的订单”查询订单状态。"
					},
					{
						"show":true,
						"problem":"如果无法付款，提示“您的支付限额不够”，怎么办？如何更改支付限额？",
						"answer":"请联系您的发卡行修改支付限额，或者使用支付宝快捷支付。"
					},
					{
						"show":true,
						"problem":"如何更改支付限额？",
						"answer":"因不同银行的办理方式不一致，请您联系所属银行的客户中心办理。"
					},
					{
						"show":true,
						"problem":"拾贝网支持的支付方式有哪些？",
						"answer":"平台目前支持个人支付和企业支付两种方式，其中支持支付宝、微信、及支持国内二十多家主流银行机构的储蓄卡的网上支付。",
						"content":'<p>个人支付</p><img src="'+ bankimg1 +'" alt="" /><p>企业支付</p><img src="'+ bankimg2 +'" alt="" />'
					}
				],
				selectedIds: []
			}
		},
		components: {
			sebeHeader,
			customerService,
			sebeFooter
		},
		mounted () {
			var userName = this.$cookie.get('truename');
			var phone = this.$cookie.get('phone');
			if (phone) {
				phone = phone.slice(0, 3) + '****' + phone.slice(-4);
			}
			this.userName = userName ? userName : phone;
			this.cartNum = this.$cookie.get('cart_num') || '0';
		}
	}
</script>

<style>
.problem h1{font-size: 26px;font-weight: 100;margin-bottom: 52px}
.problem{background: #f5f5f5;text-align: center;}
.problem .lg{position: absolute;top: 56px;left: 70px}
.brm{border-bottom: 1px solid #eee}
.problemList{width: 1170px;background: #ffffff;margin: auto;position: relative;padding-top: 152px;padding-bottom: 72px}
.problemList ul{width: 826px;margin: auto;}
.problemList ul li{width: 826px;}
.problemList ul li p{width: 826px;text-align: left;display: -webkit-inline-box;font-size: 14px;color: #333;line-height: 20px}
.pro{font-weight: 600;margin-bottom: 12px;margin-top: 14px}
.ans{margin-bottom: 23px}
.service{text-align: left;margin-left: 172px;font-size: 14px;margin-top: 25px}
.service a{color: #3db1fa}
.footer{padding: 30px 0}
.footer p,.footer p a{font-size: 14px;color: #666666}
.sebename{margin-top: 7px}
.problem .con{margin-top: -20px;padding-bottom:20px;text-align: left;}
.problem .con p{text-align: left;line-height: 40px;}
.problem .con img{text-align: left;width: 800px;}
</style>
