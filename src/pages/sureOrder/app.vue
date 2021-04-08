<template>
	<div id="appOrder" :class="{'bgc':sbjBol>=3,'bgi':sbjBol<3}" v-loading="loading">
		<template v-if="sbjBol==1">
			<div class="chooseSbj">
				<img src="~assets/img/sebelog.png" alt="">
				<div>
					<p>{{product.companyName ? decodeURIComponent(product.companyName) : product.applyName}}&nbsp;&nbsp;&nbsp;&nbsp;您好：</p>
					<span class="tit_img"><img width="30px" height="30px" :src="imgUrl" alt=""></span>
					<span class="tit_name ml5">{{product.invitePhone}}</span><span>邀请您确认的订单信息</span>
				</div>
			</div>
			<!--确认订单信息-->
			<div id="confirmOrder" class="clearfix">
				<div class="orderTil">
					<span class="td-1">商品名称</span>
					<span class="td-2">服务商</span>
					<span class="td-3">单价(元)</span>
					<span class="td-4">数量(个)</span>
					<span class="td-5" style="color:#666;">金额(元)</span>
				</div>
				<div class="orderBody">
					<div class="td" v-for="(item, index) in order">
						<div class="td-1">{{item.productName}}</div>
						<div class="td-2">{{item.idCode ? item.idCode +'服务商': '--'}}</div>
						<div class="td-3">{{(item.standardPrice-0).toFixed(2)}}</div>
						<div class="td-4">{{item.productNum}}</div>
						<div class="td-5">{{(item.standardPrice*item.productNum-0).toFixed(2)}}</div>
					</div>
				</div>
				<div class="order_result">
					<div class="payTotal">实付金额：<span>¥{{(product.productAmount-0).toFixed(2)}}</span></div>
				</div>
				<!-- 备注 -->
				<div class="memo">
					<p class="mome_l">备注信息:</p>
					<p class="mome_r">{{product.remarks}}</p>
				</div>
				<!-- 本人验证 -->
				<div class="user_comfirm" v-if="detailInfo.belong == 0">
					<p><span>——————————————————————————</span>&nbsp;&nbsp;&nbsp;&nbsp;本人验证&nbsp;&nbsp;&nbsp;&nbsp;<span>——————————————————————————</span></p>
					<el-form ref="formData" :rules="rules" :model="form" label-width="80px" class="form_code clearfix">
						<el-form-item label="手机号码" prop="phone" class="form_l fl">
							<el-input v-model="form.phone" disabled="disabled" :maxlength="11" placeholder="请输入需要创建订单的用户手机号码"></el-input>
							<span class="el-form-item__error">{{ver_tip}}</span>
						</el-form-item>
						<el-form-item label="验证码" class="form_r fl" prop="code">
							<el-input v-model="form.code" :maxlength="6" placeholder="请输入短信验证码"></el-input>
						</el-form-item>
						<el-button :disabled="preventCode" :class="{disabled: preventCode}" @click="getCode" class="ml15">{{codeText}}</el-button>
					</el-form>
				</div>

				<div class="orderResult">
					<button class="subOrder" @click="submitOrder" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="请稍候，正在提交中...">确认并支付</button>
					<p class="mt15">{{errorTxt}}</p>
					<div class="order_marn" v-if="marn">
						<span>为了保证您的合法权益，请先完成本人验证！</span>
					</div>
				</div>
			</div>
			<div style="text-align:center;">
				<img src="~assets/img/botbg.png" alt="">
			</div>

			<div class="footer">
				<div class="copyright">© 2018 拾贝  All rights reserved  <a target="_blank" href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action">浙ICP备15042618号</a> | <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010402003197">浙公网安备 33010402003197号</a>
					<p>杭州拾贝知识产权服务有限公司</p>
				</div>
			</div>
		</template>
		<template v-if="sbjBol==2">
			<div class="errSbj">
				<img src="~assets/img/sureOrder/error.png" alt="">
				<h2>订单已经完成确认</h2>
				<p class="mt15">{{timeSeconds}}s后系统将自动为您跳转到登录页面</p>
			</div>
		</template>
		<template>
			<div class="wranSbj" v-if="sbjBol==3">
				<img src="~assets/img/sureOrder/Artwork.png" alt="">
				<p v-if="warnNum>3" class="mt30">程序猿没有起来？您还可以联系客服<span>4000-315-426</span>帮助您</p>
				<p v-else class="mt30">程序猿睡着了，<span @click="refresh">刷新</span>叫他起床～</p>
			</div>
			<div class="wranSbj" v-if="sbjBol==4">
				<img src="~assets/img/sureOrder/move.png" alt="">
				<p class="mt30">很抱歉，未找到订单。您可以联系邀请人试试～</p>
				<button class="mt30" @click="knowUser">知道了</button>
			</div>
		</template>
	</div>
</template>

<script>
	import Vue from 'vue'
	import sebeHeader from 'components/HeaderSm.vue'
	import sebeFooter from 'components/FooterSm.vue'
	import customerService from 'components/CustomerService.vue'
	import applySubject from 'components/applySubject/ApplySubject.vue'
	import axios from 'axios'
	import qs from 'qs'
	import Lib from 'assets/Lib.js'
	const indexUrl = CONFIG.indexUrl;
	const path = CONFIG.path;
	const userUrl = CONFIG.userUrl;


	export default {
		name: 'app',
		data () {
			//大陆个体手机号码验证
			let dlgt_checkCode = (rule, value, callback) => {
				let reg = /^[0-9]{6}$/;
				if (!value) {
						return callback(new Error('请输入短信验证码'));
				}
				setTimeout(() => {
						if (!reg.test(value)) {
							callback(new Error('短信验证码错误'));
						} else {
							callback();
						}
				}, 300);
			};
			return {
				detailInfo: {},
				loading:false,
				imgUrl:'',
				asistantOrderCustomerId:'',
				sbjBol: 1,
				warnNum:1,
				errorTxt:'',
				timeSeconds: 3,
				marn:false,
				form:{
					phone:'',
					code:''
				},
				cartNum:"",
				loading: false,
				buyInfo:{},
				order:[],//确认订单信息
				product: 1,
				fullscreenLoading: false,
				rules:{
					code:[
						 { required: true, validator:dlgt_checkCode, trigger: 'blur' }
					]
				},
				codeText:"获取短信验证码",
				preventCode:false,
				userUrl:userUrl,
				ver_tip:''
			}
		},
		components: {
			sebeHeader,
			customerService,
			applySubject,
			sebeFooter
		},
		mounted () {
			this.asistantOrderCustomerId = parseUnparam(location.href);
			this.getApplicantOrderInfo();
			this.cartNum = this.$cookie.get('cart_num') || '0';
		},
		methods: {
			knowUser(){
				location.href = userUrl+'/iprp/#/access/login';
			},
			refresh(){
				this.getApplicantOrderInfo();
				this.warnNum+=1;
			},
			goLogin(){
				var self = this;
				var second = 3, timer;
				timer = setInterval(function(){
					if(second<=-1){
						clearInterval(timer);
						location.href = userUrl+'/iprp/#/access/login';
					}else{
						self.timeSeconds = second;
						second--;
					}
				}, 1000);
			},
			//获取手机验证码
			getCode(){
				var self = this;
				this.marn = false;
				if (self.preventCode) {
					return;
				}
				self.ver_tip = '';
				self.preventCode=true;
				self.$http.post(self.userUrl+'/api/login/sendPhoneCode', {phone: self.form.phone})
				.then((response) => {
					var data = response.data;
					self.$message('验证码已发送');
					self.timeout();
				})
				.catch((error) => {
					var data = error.response.data;
					self.preventCode=true;
					self.ver_tip = data.msg;
				});
			},
			timeout(){
				var self = this;
				var second = 60, timer;
				self.preventCode = true;
				timer = setInterval(function(){
					if(second<=0){
						clearInterval(timer);
						second = 60;
						self.codeText = "重发动态码";
						self.preventCode = false;
					}else{
						self.codeText = second + "s后可重发";
						self.preventCode = true;
						second--;
					}
				}, 1000);
			},
			//查询确认订单信息
			getApplicantOrderInfo(){
				//json数据模拟
				var self = this;
				self.loading = true;
				this.$http.get('./asistant/asistantList.htm?asistantOrderCustomerId='+this.asistantOrderCustomerId.id)
				.then(function(response) {
					self.loading = false;
					if(response.data.errorCode == 4003){
						self.sbjBol = 2;
						self.goLogin();
						return;
					}else if(response.data.errorCode == 4004){
						self.sbjBol = 4;
						return;
					}else if(response.data.errorCode == 400){
						self.sbjBol = 3;
						return;
					}else if(response.data.errorCode == 5001){
						self.sbjBol = 3;
						return;
					}else if(response.data.errorCode == 500){
						self.sbjBol = 3;
						return;
					}
					var data = response.data;
					self.order = data.asistantList;
					self.form.phone = data.customer.applyPhone
					self.product = data.customer;
					self.imgUrl = data.inviteAvatar;
					self.detailInfo = data;
				})
				.catch(function(error) {
					self.loading = false;
					self.sbjBol = 3;
					return;
				});
			},
			// 正式生成订单
			submitOrder (data) {
				var self = this;
				if(self.detailInfo.belong == 1){
					var data = {
						asistantOrderCustomerId:self.product.id,
						resourceType:1
					}
					self.payHome(data);
				}else{
					self.ver_tip='';
					this.$refs['formData'].validate((valid) => {
						if(valid){
							var data = {
								asistantOrderCustomerId:self.product.id,
								asistantPhoneCode:self.form.code,
								resourceType:1
							}
							self.payHome(data);
						}else{
							self.marn = true;
						}
					})
				}
			},
			payHome(data){
				var self = this;
				self.marn = false;
				self.fullscreenLoading = true;
				self.$http.post('./asistant/asistantOrder.htm', data)
				.then(function(response) {
					if(response.data.order_fictitious_sn){
						self.fullscreenLoading = false;
						var data = response.data;
						location.href = './pay.html?order_sn='+ data.order_fictitious_sn;
					}else if(response.data.errorCode == 4001){
						self.errorTxt = '登录失效请获取动态码';
						self.fullscreenLoading = false;
						return;
					}else if(response.data.errorCode == 4001){
						self.errorTxt = '登录失效请获取动态码';
						self.fullscreenLoading = false;
						return;
					}else if(response.data.errorCode == 4002){
						self.errorTxt = '短信验证码错误,请重新输入';
						self.fullscreenLoading = false;
						return;
					}else if(response.data.errorCode == 4003){
						self.errorTxt = '订单已支付';
						self.fullscreenLoading = false;
						return;
					}else if(response.data.errorCode == 4004){
						self.errorTxt = '订单不存在';
						self.fullscreenLoading = false;
						return;
					}else if(response.data.errorCode == 4005){
						self.errorTxt = '订单已关闭';
						self.fullscreenLoading = false;
						return;
					}else if(response.data.errorCode == 10013){
						self.errorTxt = '账号异常';
						self.fullscreenLoading = false;
						return;
					}
				})
				.catch(function(error) {
					self.$alert('系统繁忙，请稍候再试。');
					self.fullscreenLoading = false;
				});
			}
		}
	}
	function parseUnparam (param, decode){
		var vars = {}, hash, i,
				urlParams = param.indexOf('?') > -1 ? param.split('?')[1] : param;
		var hashes = urlParams.split('&');
		for(i = 0; i < hashes.length; i++){
				hash = hashes[i].split('=');
				vars[hash[0]] = decodeURIComponent(hash[1]).replace(/\+/g, ' ');
		}
		return vars;
	};
</script>

<style>
html ,body{height:100%;}
#appOrder{min-height:100%;}
#appOrder { color: #333;font-size: 12px;text-align: left;padding-top: 120px;}
#appOrder.bgi{filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#0096FF', endColorstr='#2F80F6',GradientType=1);background-image: linear-gradient(147deg, #0096FF 0%, #2F80F6 100%);}
#appOrder.bgc{background-color: #f8f8f8;}
#appOrder>div{width: 1000px;margin:0 auto;}
h1, h2 {color: red;font-weight: normal;}
ul {list-style-type: none;padding: 0;}
a {color: #333;}
.el-loading-spinner .circular{width: 30px;}
.selt{border-radius: 4px;border: 1px solid #bfcbd9;box-sizing: border-box;color: #1f2d3d;
				display: inline-block;font-size: inherit;height: 36px;line-height: 1;outline: 0;padding: 3px 10px;transition: border-color .2s cubic-bezier(.645,.045,.355,1);width: 100%;}
.valiMsg{ color: #ff4949;font-size: 12px;line-height: 1;padding-top: 4px;position: absolute;top: 100%;left: 0;}

.chooseSbj{padding-top: 50px;padding-left:56px;padding-right:56px;background-color: #fff;color: #999;text-align: center;border-radius: 3px 3px 0 0;}
.chooseSbj div{text-align: left;margin-top: 40px;}
.chooseSbj p{font-size:16px;color: #333;margin-bottom: 30px;}
.chooseSbj div span{display: inline-block;line-height: 30px;height: 30px;vertical-align: top;font-size: 14px;color:#666;}
.chooseSbj div .tit_img{border-radius: 50%;overflow: hidden;border:1px solid #eee;}
.chooseSbj div .tit_name{color: #09BB07;}

.sbj{margin-top: 18px;display: inline-block;float: left;}
.sbjItem{background-color: #fff;height: 89px;border: 1px solid #e6e6e6;display: inline-block;padding:21px 33px;margin-right: 15px;margin-bottom:10px;cursor: pointer;}
.kind{font-size: 14px;color: #999;display: block;}
.checked{background-color: #3db1fa;color: #fff;border-color: #3db1fa;}
.addSbj{background-color:#fff;border:1px solid #e6e6e6;display:inline-block;padding: 32.5px 24.5px;cursor: pointer;margin-top: 10px;}
.addSbj:hover{border-color: #3db1fa}
.addCont{font-size: 14px;}
.memo p{padding-top: 10px;}
.memo .mome_l{font-size: 14px;color: #333333;}
.memo .mome_r{font-size: 13px;color: #666666;}
.user_comfirm{margin-top: 40px;text-align: center;}
.user_comfirm p{font-size:14px;color:#888;margin-bottom: 30px;}
.user_comfirm p span{font-size:14px;color:#eee;}
.user_comfirm .form_l{width: 340px;}
.user_comfirm .form_r{width: 250px;}
.user_comfirm .form_code{width: 715px;margin:0 auto;}
.user_comfirm .form_code .el-button{width: 106px;height: 34px;text-align: center;border-radius: 3px;border: 1px solid #3DB1FA;padding: 0;background-color: #fff;}
.user_comfirm .form_code .el-button span{font-size: 12px;color: #3DB1FA;}
.user_comfirm .form_code .disabled{border-color:#ddd;}
.user_comfirm .form_code .disabled span{color:#bbb;}
#confirmOrder{width: 1170px;margin: 0 auto;background-color: #fff;margin-bottom: 15px;padding-left: 56px;padding-right: 56px;padding-top: 10px;}
#confirmOrder h3{font-size:14px;font-weight: bold;}
.orderTil{height: 40px;line-height: 40px;font-size: 14px;border-top: 1px dashed #DDDDDD;}
.orderTil span{float: left;display: inline-block;text-align: right}
#confirmOrder >div>span{color:#666;font-size: 13px;}
#confirmOrder .td-1{text-align: left;width: 25%;height: 100%;vertical-align: middle;display: table-cell;}
#confirmOrder .td-2{width: 17%;height: 100%;vertical-align: middle;display: table-cell;text-align: right;}
#confirmOrder .td-3 span{text-align: right;}
#confirmOrder .td-3{width: 18%;height: 100%;vertical-align: middle;display: table-cell;text-align: right;}
#confirmOrder .td-4{width: 20%;height: 100%;vertical-align: middle;display: table-cell;text-align: right;}
#confirmOrder .td-5{width: 20%;height: 100%;vertical-align: middle;display: table-cell;color: #F64744;text-align: right;}

.orderBody{width: 100%;overflow: hidden;line-height: 26px;text-align: center;}
.orderBody .td{width: 100%;display: table;border-top: 1px dashed #e6e6e6;font-size: 14px;color: #666;height: 58px;line-height: 58px;}
.order_result{text-align: right;}
.order_result .payTotal{font-size: 14px;color: #666666;border-top: 1px dashed #DDDDDD;border-bottom: 1px dashed #DDDDDD;line-height: 40px;}
.order_result .payTotal span{color: #F64744;}


.perPrice{display: block;padding-right: 95px;text-align: right;}
.oldPrice{display: block;color: red;padding-right: 90px;text-align: right;}
.through{text-decoration: line-through;}
.dicount{color: #ff4546}
.orderResult{clear: both;text-align: right;text-align: center;height: 120px;}
.orderResult .total{font-size: 14px;height: 28px;line-height: 28px;}
.orderResult .total span{font-family: arial;}
.orderResult .payTotal{font-size: 16px;height: 30px;line-height: 30px;}
.orderResult .payTotal span{color:#fe2200;font-family: arial;font-weight: bold;}
.orderResult .chgPro{height: 46px;line-height: 46px;color: #999;font-size: 14px;border:0;margin-top: 20px;margin-right:30px;}
.orderResult .subOrder{width: 260px;height: 50px;line-height: 50px;color: #fff;font-size: 16px;filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0096FF', endColorstr='#2F80F6',GradientType=1 );background-image: linear-gradient(147deg, #0096FF 0%, #2F80F6 100%);border-radius: 100px;margin-top: 10px;font-size: 18px;}
.orderResult .order_marn{background:url('~assets/img/marn.png') no-repeat;width: 286px;height: 44px;margin: 0 auto;padding-top: 13px;padding-left: 15px;color: #888;}
.orderResult .order_marn span{font-size: 12px;}
.orderResult p{text-align: center;color: #ff4949;font-size: 12px;}

.dialog-confirm > .el-dialog{width:650px;min-height:300px;padding:20px 30px 35px;}
.el-dialog__body{padding:0;}
.el-dialog__header{padding: 6px 0 16px;}

.footer{margin: 0 auto;height: 115px;text-align: center;padding-top: 40px;}
.footer .copyright{color:#fff;opacity: 0.5;}
.footer .copyright a{color:#fff;opacity: 0.95;}
.el-form-item__content{line-height: 34px;}
.el-input__inner{height: 34px;border-radius: 3px;}
/*.el-form-item__label{    padding: 10px 12px 10px 0;}*/
.el-input__inner{line-height: 34px;}

#appOrder .errSbj{text-align: center;margin-top: 200px;}
.errSbj h2{font-size: 30px;color: #FFFFFF;margin-top: 40px;}
.errSbj p{font-size: 20px;color: #FFFFFF;}

#appOrder .wranSbj{text-align: center;margin-top: 200px;}
.wranSbj p{font-size: 20px;color: #8795A8;}
.wranSbj span{font-size: 20px;color: #2F80F6;}
.wranSbj button{background-image: linear-gradient(147deg, #0096FF 0%, #2F80F6 100%);border-radius: 100px;width: 220px;height: 50px;color:#fff;font-size: 18px;}
</style>
