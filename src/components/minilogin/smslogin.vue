<template>
  <form autocomplete="off">
    <div class="ipt-wrap" :class="{inputfocus:!!regData.phone ||　iptphone}" @click="phoneclick()">
      <input type="text" class="ipt" @focus="iptphone=true" ref="phone" @blur="iptphone=false" v-model="regData.phone" maxlength="11">
      <label class="name label-name">请输入手机号</label>
    </div>
    <div class="ipt-wrap code-wrap" :class="{inputfocus:!!regData.token ||　ipttoken}" @click="tokenclick()">
      <input type="text" class="ipt" v-model="regData.token" ref="token" maxlength="6" @focus="ipttoken=true" @blur="ipttoken=false">
      <label class="name label-name">请输入动态密码</label>
      <button class="btn getcode" :class="{disabled: preventCode}" @click.prevent="getCode">{{codeText}}</button>
    </div>
    <div class="ipt-wrap captcha-wrap" v-if="showCode" :class="{inputfocus:!!regData.captcha ||　iptcap}" @click="iptcap=true">
      <input type="text" class="ipt" v-model="regData.captcha"  maxlength="4" @focus="iptcap=true" @blur="iptcap=false">
      <label class="name label-name">请输入校验码</label>
      <span>
        <img class="ver-code" :src="codeUrl + '/servlet/captchaCode?t='+ random" alt="校验码" width="80" height="25" />
        <img src="~assets/img/reg_login/gx.png" class="refresh" @click="capRefresh()">
      </span>
    </div>
    <span class="reminder">
      <label>{{ver_tip}}</label>
    </span>
    <div class="iread">
      <label @click="isRead=!isRead"><span :class="{active:isRead}"></span>我已阅读并同意<a :href="cartUrl+'/shop/pages/regAgreement.html'" target="_blank">《拾贝网用户注册协议》</a></label>
    </div>
    <button type="submit" class="btn btn-primary register-btn" :class="{disabled: submitDisabled}" @click.prevent="preLogin">{{buttonText}}</button>
  </form>
</template>
<script>
  import Vue from 'vue'
  import $ from 'jquery'
  const cartUrl = CONFIG.cartUrl;
  const userUrl = CONFIG.userUrl;
  import qs from 'qs'
  import md5 from 'md5'

  export default {
    data(){
      return{
        isRead:true,
        showCode:false,
        codeUrl: userUrl,
        random: Math.random(),
        iptcap:false,
        iptphone:false,
        ipttoken:false,
        iptpass:false,
        buttonText: '立即登录',
        cartUrl: cartUrl,
        codeText:'发送动态密码',
        isRead: true,
        isPasswordType: true,
        ver_tip:'',//校验提示
        passwordOrigin:'',
        regData: {
          phone: '',
          token: ''
        },
        preventCode: false,//控制重发验证码
        submitDisabled:false,//禁止重复提交
        userUrl:userUrl
      }
    },
    methods:{
      capRefresh(){
        this.random = Math.random();
      },
      phoneclick(){
        this.iptphone = true;
        this.$refs['phone'].focus();
      },
      tokenclick(){
        this.ipttoken = true;
        this.$refs['token'].focus();
      },
      //获取手机验证码
      getCode(){
        var self = this;
        if (self.preventCode || !this.checkPhone()) {
          return;
        }
        self.ver_tip = '';
        self.preventCode=true;
        self.$http.post(self.userUrl+'/api/login/sendPhoneCode', {phone: self.regData.phone})
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
      preLogin(){
        var self = this;
        if (self.submitDisabled || !self.checkValid()) {
          return;
        }
        self.buttonText = '登录中...';
        self.ver_tip = '';
        self.submitDisabled = true;
        self.$http.post(self.userUrl+'/api/beforeLogin', {
          account: self.regData.phone
        })
        .then((response) => {
          var data = response.data;
          self.regData.beforeLoginCode = data.code;
          self.login();
        })
        .catch((error) => {
          self.submitDisabled = false;
          self.ver_tip = '系统繁忙，请稍候再试';
          self.buttonText = '立即登录';
          console.log('preLogin:'+ error);
        });
      },
      login(){
        var self = this;
        var postData = self.regData,
          data = {};
        if (self.showCode) {
          data = {
            phone: postData.phone,
            phoneCode: postData.token,
            beforeLoginCode: postData.beforeLoginCode,
            captcha: postData.captcha,
            loginType:2
          }
        }else{
          data = {
            phone: postData.phone,
            phoneCode: postData.token,
            beforeLoginCode: postData.beforeLoginCode,
            loginType:2
          }
        }
        self.$http.post(self.userUrl+'/api/login', data)
        .then((response) => {
          self.submitDisabled = false;
          self.buttonText = '登录成功';
          var data = response.data;
          self.userName = data.truename;
          self.$emit('smsMini',response.data);
        })
        .catch((error) => {
          console.log(error.response);
          self.buttonText = '立即登录';
          var data = error.response.data;
          if (data.status === 10003) {
            self.showCode = true;
          }
          if (data.body) {
            if (data.body[0]) {
              self.showCode = true;
            } else {
              self.showCode = false;
            }
          }
          self.ver_tip = data.msg;
          self.submitDisabled = false;
          self.capRefresh();
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
      checkPhone(){
        var regData = this.regData;
        var phone = regData.phone;
        if (!phone.trim()) {
          this.ver_tip = '请输入手机号';
          return false;
        }else if(!/^1\d{10}$/.test(phone)){
          this.ver_tip = '请输入正确的手机号';
          return false;
        }
        return true;
      },
      checkValid(){
        var regData = this.regData;
        var phone = regData.phone;
        var captcha = regData.captcha;
        var token = regData.token;
        if (!phone.trim()) {
          this.ver_tip = '请输入手机号';
          return false;
        }else if(!/^1\d{10}$/.test(phone)){
          this.ver_tip = '请输入正确的手机号';
          return false;
        }
        if(!token){
          this.ver_tip = '请输入动态密码';
          return false;
        }
        if (this.showCode) {
          if (!captcha.trim()) {
            this.ver_tip = '请输入验证码';
            return false;
          }else if(captcha.length !== 4){
            this.ver_tip = '校验码为4位数';
            return false;
          }
        }
        if (!this.isRead) {
          this.ver_tip = '请阅读并同意《拾贝网用户注册协议》';
          return false;
        }
        return true;
      }
    }
  }
</script>
<style scoped lang="scss">
/*记住密码输入框背景不变黄*/
input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    background-color: #fff !important;;
    -webkit-box-shadow: 0 0 0px 1000px transparent  inset !important;  
    background-color:transparent;  
    background-image: none;  
    transition: background-color 50000s ease-in-out 0s; 
}
.name{font-size:14px;color:#999;position:absolute;top:0px;left:3px;transition: top 0.2s ease;cursor: text;font-weight: normal;}

form{overflow: hidden;padding-top:30px;}
form .inputfocus{
  .label-name{top:-20px;}
}
.minilogin form .inputfocus::after{-webkit-transform: translate3d(0, 0, 0);transform: translate3d(0, 0, 0);}
.ipt-wrap::after{position: absolute;top:18px;right: 0;bottom: 0;left: 0;overflow: hidden;height: 10px;content: '';-webkit-transition: -webkit-transform 0.3s ease;transition: transform 0.3s ease;-webkit-transform: translate3d(-101%, 0, 0);transform: translate3d(-101%, 0, 0);border-bottom: 1px solid #3db1fa;}
.reminder {line-height: 100%;display: block;margin-top:10px;margin-bottom: 10px;}
.reminder label {color: red;}
.ipt-wrap{position: relative;border-bottom: 1px solid #e5e5e5;}
.ipt-wrap input{width: 100%;height: 28px;line-height: 28px;border: 1px solid #fff;padding-left: 3px;font-size: 14px;}
.password-wrap {margin-top: 30px;}
.register-btn {margin-top: 14px;width: 100%;height: 48px;font-size: 16px;}
.forget-pwd{
  >p{display:inline-block;float: right;margin-top: 10px;color: #666;
    a{color: #666;}
    a:hover{color: #3db1fa;}
  }
  >a {float: left;margin-top: 10px;color: #666;}
  >a:hover{color: #3db1fa;}
}

.code-wrap,.captcha-wrap  {margin-top: 30px;}
.captcha-wrap span,.code-wrap span {position: absolute;right: 0;top: -4px;}
.captcha-wrap span img {margin-top: 3px;}
.getcode {position: absolute;top: -10px;right: 0;width: 85px;height: 32px;color: #3db1fa;border-color: #3db1fa;padding: 0;background-color:#fff;font-size:12px;}
.getcode:hover{background-color: #3db1fa;color: #fff;}
.iread {position: relative;padding-left: 18px;width: 100%;padding-top: 0px;font-size: 14px;height: 35px;color: #666;
  span{position: absolute;top:6px;left:0;width: 13px;height: 13px;background: #fff url(~assets/img/reg_login/check_bg.png) 0 0 no-repeat;display: inline-block;}
  span.active{background-position: 0 -20px;}
  a{ color: #3db1fa;}
}
.passwordEyes{position: absolute;top: 0px;right: 3px;cursor: pointer;font-size: 16px;color: #666;}
.getcode.disabled{cursor: not-allowed;color: #999;border-color: #ccc;}
#miniloginwrap .getcode.disabled {
    background-color: #ccc;
}
</style>