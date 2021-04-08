<template>
<div id="miniloginwrap" v-show="showMini">
	<div id="loginmark"></div>
	<div id="minilogin">
		<h3>您尚未登陆！<span>请登陆或者注册后进行操作</span></h3>
		<div class="closeL" @click="closeMini">X</div>
		<el-tabs type="card">
				<el-tab-pane label="新用户注册">
					<div class="reg">
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60" auto-complete="off">
							<el-form-item label="手机" prop="phone">
								<el-input v-model.number="ruleForm.phone" placeholder="请输入手机号" @blur="validatorP" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="验证码" prop="identifyingCode">
								<el-input class="lgcode" v-model.number="ruleForm.identifyingCode" placeholder="请输入验证码" auto-complete="off"></el-input>
								<button class="getcode" :class="{disabled: noPermission}" @click.prevent="getcodeHandle">{{getCodeTip}}</button>
							</el-form-item>
							<el-form-item label="淘宝账号" prop="tbname" v-if="isAliAccount">
								<el-input v-model="ruleForm.tbname" placeholder="请输入淘宝账号" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="姓名" prop="name">
								<el-input v-model="ruleForm.name" placeholder="请输入姓名" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="password">
								<el-input type="password" v-model="ruleForm.password" placeholder="设置密码" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="确认密码" prop="passwordAgain">
								<el-input type="password" v-model="passwordAgain" placeholder="再次确认密码" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button class="imdreg-btn" type="primary" @click="regHandle">立即注册</el-button>
							</el-form-item>
					</el-form>
					</div>
				</el-tab-pane>
				<el-tab-pane label="老用户登陆">
				<div class="login">
										<el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="60" auto-complete="off">
							<el-form-item label="手机" prop="phone">
								<el-input v-model.number="loginForm.phone" placeholder="请输入手机号" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="password">
								<el-input type="password" v-model="loginForm.password" placeholder="请输入密码" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button class="login-btn" type="primary" @click="loginHandle">登陆</el-button>
							</el-form-item>
					</el-form>
					</div>
				</el-tab-pane>
		 </el-tabs>
	</div>
</div>
</template>

<script>

import Lib from 'assets/Lib.js'
import Vue from 'vue'
import $ from 'jquery'
import Validator from 'vue-validator'
import md5 from 'md5'
import qs from 'qs'
Vue.use(Validator)
Vue.use(md5);
const loginRootUrl = CONFIG.loginRootUrl;
const getCookieUrl = loginRootUrl + '/login/getCookies.htm';
export default {
	props:['showMini'],
	data() {
		var validatePass2 = (rule, value, callback) => {
			if (this.passwordAgain === '') {
				callback(new Error('请再次输入密码'));
			} else if (this.passwordAgain !== this.ruleForm.password) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
			getCodeTip: '获取验证码',
			rules: {
				phone: [
						{type: 'integer', required: true, message: '请输入手机号', trigger: 'blur' },
						{ pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
				],
				identifyingCode: [
						{type: 'integer', required: true, message: '请输入验证码', trigger: 'blur' },
						{ pattern: /^\d{6}$/, message: '请输入6位验证码', trigger: 'blur' }
				],
				name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' },
						{ min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
				],
				tbname: [
						{ required: true, message: '请输入淘宝账号', trigger: 'blur' },
						{ min: 2, max: 10, message: '长度在 2 到 10个字符', trigger: 'blur' }
				],
				password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
				],
				passwordAgain: [
						{ validator: validatePass2, trigger: 'blur' }
				] 
			},
			isAliAccount: false,
			passwordAgain:'',
			ruleForm: {
				phone:'',
				identifyingCode: '',
				name: '',
				tbname: '',
				password: ''
			},
			loginForm: {
				phone:'',
				password: ''
			},
			noPermission: true
		}
	},
	methods: {
		closeMini (){
			this.$emit('closeMini', false);
		},
		validatorP(){
			var phone = this.ruleForm.phone+'';
			if(!phone || phone.length != 11){
				return;
			}
			var self = this;
			this.$http.post(loginRootUrl + '/index/judgeuser.htm', qs.stringify({phone: this.ruleForm.phone}))
			.then(function(response) {
				var data = response.data;
				if (data.code != 'success') {
					self.$message({
						message: data.msg,
						type: 'warning'
					});
				}else{
					self.noPermission = false;
				}
			})
			.catch(function(response) {
				console.log(response)
			});

			this.$http.post(loginRootUrl + '/publicSystem/isAccountForAli.htm', qs.stringify({phone: this.ruleForm.phone}))
			.then(function(response) {
				var data = response.data;
				if (data.code == 'success' && data.data === true) {
					self.isAliAccount = true;
				}else{
					self.isAliAccount = false;
				}
			})
			.catch(function(response) {
				console.log(response)
			});
		},
		regHandle(){
			var self = this;
			var submit = function(){
				//self.ruleForm.password = md5(self.ruleForm.password);
				self.$http.post(loginRootUrl + '/index/register.htm', qs.stringify(self.ruleForm))
				.then(function(response) {
					var data = response.data;
					if (data.code == 'success') {
						self.$alert('注册成功', '提示', {
						confirmButtonText: '确定',
						callback: action => {
							var ret = data.data;
							self.$emit('callbackDo', ret);
						}
					});
					}
				})
				.catch(function(response) {
					// 这里是处理错误的回调
					console.log(response)
				});
			}
			self.$refs.ruleForm.validate((valid) => {
				if (valid) {
					submit()
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		getCookieByJsonp(ret){
			var self = this;
			$.ajax({
				url: getCookieUrl,
				dataType: 'jsonp',
				success: function(data) {
					if (data.codes === 'ok') {
						//设置cookie
						document.domain = 'ipsebe.com';
						self.$cookie.set('user_token', data.user_token, {domain:data.domains, expires: data.expires || '1M'});
						//发起登录成功回调
						self.$emit('callbackDo', ret);
					}else{
						console.log(data)
					}
				}
			});
		},
		loginHandle(){
			var self = this;
			/*var submit = function(){
				//self.loginForm.password = md5(self.loginForm.password);
				self.$http.post(loginRootUrl + '/login/dologin.htm', qs.stringify(self.loginForm))
				.then(function(response) {
					var data = response.data;
					//self.getCookieByJsonp({});
					if (data.code == 'success') {
						var ret = data.data;
						self.getCookieByJsonp(ret);
					}else{
						self.$message({
							message: data.msg,
							type: 'warning'
						});
					}
				})
				.catch(function(response) {
					console.log(response)
				});
			}*/
			var submit = function(){
				self.$http.post(loginRootUrl + '/login/dothridlogin.htm', qs.stringify(self.loginForm))
				.then(function(response) {
					var data = response.data;
					if (data.codes == 'ok') {
						var ret = data.data;
						//设置cookie
						try{
							document.domain = 'ipsebe.com';
						}catch(error){
							console.log(error)
						}
						self.$cookie.set('user_token', data.user_token, {domain:data.domains, expires: data.expires || '1Y'});
						self.$cookie.set('truename', data.truename, {domain:data.domains, expires: data.expires || '1Y'});
						//发起登录成功回调
						self.$emit('callbackDo', ret);
					}else if(data.codes == 'no'){
						self.$message({
							message: data.msg,
							type: 'warning'
						});
					}else{
						self.$alert('登录异常');
					}
				})
				.catch(function(response) {
					console.log(response)
				});
			}
			self.$refs.loginForm.validate((valid) => {
				if (valid) {
					submit()
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		getcodeHandle(){
			var self = this;
			if (this.noPermission) {
				return;
			} 
			function timeout(){
				self.noPermission = true;
				var second = 60,
						timePromise = undefined;
				timePromise = setInterval(function(){
						if(second<=0){
								clearInterval(timePromise);
								second = 60;
								self.getCodeTip = "重发验证码";
								self.noPermission = false;
						}else{
								self.getCodeTip = second + "秒后可重发";
								self.noPermission = true;
								second--;
						}
				},1000);
			}
			this.$http.post(loginRootUrl + '/index/sendIdentifyingCode.htm', qs.stringify({phone: this.ruleForm.phone}))
			.then(function(response) {
				var data = response.data;
				if (data.codes == 'ok') {
					timeout();
					self.$message('验证码已发送');
				}else{
					self.$message({
						message: data.msg,
						type: 'warning'
					});
				}
			})
			.catch(function(response) {
				console.log(response)
			});
		}
	}
}
</script>


<style>
#miniloginwrap{position: fixed;top: 0;left:0;z-index:1000;width: 100%;height: 100%;}
#loginmark{position: absolute;top: 0;left:0;width: 100%;height: 100%;background-color: #000;opacity: 0.5;}
#minilogin{position: relative;top: 200px;margin:0 auto;z-index:1001;background-color: #fff;width: 540px;min-height: 450px;border: 1px solid #ccc;border-radius: 6px;padding-bottom: 20px;}
#minilogin h3{font-size: 30px;height: 66px;line-height: 66px;color: #444;padding-left: 32px;letter-spacing:2px;}
#minilogin h3 span{font-size: 14px;line-height: 24px;color: #999}
#minilogin .el-tabs__item{width: 270px;font-size: 18px;text-align: center;height: 48px;line-height: 48px;color: #999;}
#minilogin .is-active{color: #444}
#minilogin .reg{width: 350px;margin: 5px auto 0;}
#minilogin .login{width: 350px;margin: 40px auto 0;}
#minilogin .el-tabs{width: 100%;}
#minilogin .el-form-item__label{display: none;}
#minilogin .el-form-item{margin-bottom: 20px; }
.reg .form-group{margin-bottom: 10px; }
.login .form-group{margin-bottom: 20px; }
.reg .el-input__inner,.login .el-input__inner,.el-form-item__content{min-height: 36px;}
.reg .lgcode{width: 175px;display: inline-block;}
.getcode{float: right;width: 150px;background-color: #074e9e;height: 36px; line-height: 36px;border-radius: 5px;border: 1px solid #074e9e;color: #fff;font-size: 16px;margin-left: 10px;display: inline-block;}
.getcode.disabled{background-color: #ccc;border: 1px solid #ccc;cursor: default;}
.imdreg-btn,.login-btn{background-color: #ff4f4f;height: 40px; line-height: 38px;width: 350px;border-radius: 5px;border: 1px solid #ff4f4f;color: #fff;font-size: 18px;padding: 0}
.closeL{position: absolute;right: 15px;top: 10px;font-size: 22px;color: #b3b3b3;cursor: pointer;}
.imdreg-btn:focus,.login-btn:focus,.imdreg-btn:hover,.login-btn:hover{background-color: #ff4f4f;border: 1px solid #ff4f4f;}
</style>
