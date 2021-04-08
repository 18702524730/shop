<template>
  <div id="app">
    <!-- 普通头部 -->
    <sebe-header :userName="userName" :title="'收银台'" v-if="!isMiniApp"></sebe-header>
    <!-- 小程序支付头部 -->
    <mini-header v-if="isMiniApp"></mini-header>
    <div id="payWrap" v-if="!noOrderState">

      <div class="orderinfo commWidth" v-if="!isMiniApp">
        <div class="order_success fl mr15">
          <i class="el-icon-success"></i>
        </div>
        <p class="tipinfo">支付订单已提交，请尽快支付！</p>
        <p class="orderNum">订单号：{{payData.order_sn}}</p>
        <!-- <p class="time-tip">请在提交支付订单后<b>72</b>小时内完成支付，否则订单将自动取消</p> -->
        <div class="countdown-wrap" v-if="payData.leftTime"><count-down class="countdown" @end_callback="countDownE_cb(payData)" :leftTime="payData.leftTime" :dayTxt="'天'" :hourTxt="'小时'" :minutesTxt="'分钟'" :secondsTxt="'秒'"></count-down>后订单将自动取消</div>
        <div class="amount">
          实付款：<b>¥{{payData.payMoney|priceformat}}</b>
          <a href="" @click.prevent="view(payData.order_sn)">订单详情<!-- <i class="el-icon-arrow-down ml10"></i> --></a>
        </div>
      </div>

      <div class="orderinfo order_info_mini commWidth" v-if="isMiniApp">
        <div class="order_success fl mr15">
          <i class="el-icon-success"></i>
        </div>
        <p class="tipinfo tip_mini">支付订单已提交，请尽快支付！</p>
        <p class="order_info">店铺：<span class="value">{{ miniPayData.storeName }}</span></p>
        <p class="order_info">下单用户：<span class="value">{{ miniPayData.nickName }} &nbsp; ({{ miniPayData.orderBuyerPhone }})</span></p>
        <div class="amount">
          <span class="text">实付款：</span><b class="num">¥{{ miniPayData.orderAmount | priceformat }}</b>
          <div class="countdown_box" v-if="miniPayData.leftTime"><count-down class="countdown" @end_callback="countDownE_cb(miniPayData)" :leftTime="miniPayData.leftTime" :dayTxt="'天'" :hourTxt="'小时'" :minutesTxt="'分钟'" :secondsTxt="'秒'"></count-down>后订单将自动取消</div>
        </div>
        <div class="goods_list">
          <p class="tit">商品详情如下: </p>
          <p class="item" v-for="(item, index) in miniPayData.serviceList">
            <span class="name">{{ item.orderBsName }} <span class="link" @click="getTmDetailFn(item)" v-if="item.trademarkName">查看商标详情</span></span>
            <span class="price">¥{{ item.orderAmount | priceformat }}</span>
            <span class="num">x1</span>
          </p>
        </div>
      </div>

      <!-- 选择支付方式 -->
      <div class="select-paytype commWidth" v-if="!needQcode">
        <div class="payClass">
          <span v-if="isSurport('upacp_personal') || isSurport('alipay_pc_direct') || isSurport('wx_pub_qr')" :class="{active: bankType==2}" @click="bankType=2">个人支付</span><span class="division" v-if="isSurport('upacp_public') && (isSurport('upacp_personal') || isSurport('alipay_pc_direct') || isSurport('wx_pub_qr'))"></span><span v-if="isSurport('upacp_public')" :class="{active: bankType==1}" @click="bankType=1">企业支付</span>
        </div>
        <div class="com personal" v-if="bankType==2" v-loading="loading">
          <template v-if="isSurport('alipay_pc_direct') || isSurport('wx_pub_qr')">
            <p class="title">快捷支付</p>
            <div class="paytype">
              <ul class="bankInfo clearfix">
                <li :class="{active: payAccountBank=='alipay_pc_direct'}" @click="payAccountBank='alipay_pc_direct'" v-if="isSurport('alipay_pc_direct')">
                  <img src="~assets/img/pay/zfb.png" style="margin-top:7px;">
                </li>
                <li :class="{active: payAccountBank=='wx_pub_qr'}" @click="payAccountBank='wx_pub_qr'" v-if="isSurport('wx_pub_qr')">
                  <img src="~assets/img/pay/wx.png" style="margin-top:7px;">
                </li>
              </ul>
            </div>
          </template>
          <template v-if="isSurport('upacp_personal')">
            <p class="title">银行卡支付<b>（银行卡仅支持借记卡）</b></p>
            <div class="paytype">
              <ul class="bankInfo clearfix">
                <li :class="{active: payAccountBank==item.code}" v-for="(item, index) in banksData" @click="payAccountBank=item.code">
                  <img :src="item.url" width="136" height="40">
                </li>
              </ul>
            </div>
          </template>
        </div>
        <div class="com enterprise" v-if="bankType==1 && isSurport('upacp_public')" v-loading="loading">
          <p class="title">银行卡支付<b>（银行卡仅支持借记卡）</b></p>
          <div class="paytype">
            <ul class="bankInfo clearfix">
              <li :class="{active: payAccountBank==item.code}" v-for="(item, index) in banksData" @click="payAccountBank=item.code">
                <img :src="item.url" width="136" height="40">
              </li>
            </ul>
          </div>
        </div>
        <!-- <p class="time"></p> -->
        <!-- <div class="agree"><el-checkbox v-model="isChecked">我已经阅读并同意<a :href="agreementUrl" target="_blank">《拾贝网服务协议》</a></el-checkbox></div> -->
        <a target="_blank" :href="paymentUrl + '?payAccountKind=1&payAccountType=' + bankType + '&payAccountBank=' + payAccountBank + '&' + parseParam(postData)" class="btn submitBtn" @click="getPayment">{{btnText}}</a>
      </div>

      <!-- 支付二维码 -->
      <div class="qcode_wrap commWidth" v-if="needQcode">
        <div class="qcode">
          <!-- <img src="qcodeUrl" width="190" height="190"> -->
          <qrcode v-if="qcodeUrl" :val="qcodeUrl" :size="180"></qrcode>
          <img class="mdimg" src="~assets/img/pay/zfb_icon.png" v-if="payAccountBank == 'alipay_pc_direct'">
          <img class="mdimg" src="~assets/img/pay/wx_icon.png" v-if="payAccountBank == 'wx_pub_qr'">
          <div class="tip">
            <img src="~assets/img/pay/s.png"><span v-if="payAccountBank == 'alipay_pc_direct'">打开手机支付宝扫一扫继续付款</span><span v-if="payAccountBank == 'wx_pub_qr'" style="width:96px;">请使用微信扫一扫扫描二维码支付</span>
          </div>
        </div>
        <p class="other" @click="chooseOther"><选择其他付款方式></p>
      </div>


      <!-- 支付订单详情 -->
      <el-dialog title="支付订单详情" :visible.sync="orderdetailVisible" custom-class="dialog-orderdetail">
        <div class="pop_window">
          <!-- <h4>支付订单详情</h4>
          <span class="close">X</span> -->
          <div class="order_detail" v-loading="detailLoading">
            <p><span>订单号：{{payData.order_sn}}</span><span>下单时间：{{payData.createTime}}</span><span>订单金额：<i class="highlight">￥{{payData.payMoney}}</i></span><br> 已分拆为<i class="highlight">{{productOrderData.length}}</i>个服务订单：</p>
            <div class="order_table_wrap">
              <table width="100%" class="table order_table">
                <thead>
                  <tr>
                    <th width="150">服务单号</th>
                    <th class="til" width="240" style="text-align:center;">商品信息</th>
                    <th>金额</th>
                    <!-- <th>服务商</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in productOrderData">
                    <td>{{item.orderNum}}</td>
                    <td class="til">{{item.productName}}</td>
                    <td class="amount">{{item.payMoney|priceformat}}</td>
                    <!-- <td>{{item.idCode ? item.idCode +'服务商': '--'}}</td> -->
                  </tr>
                  <tr v-if="!productOrderData.length && !detailLoading">
                    <td colspan="3" v-if="nologin">登录已失效，请重新登录。</td>
                    <td colspan="3" v-else>查询订单详情失败，请<a href="javascript:;" @click.prevent="refresh(payData.order_sn)">刷新</a>重试。</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </el-dialog>

      <!-- 支付订单详情 -->
      <el-dialog title="支付提示" :visible.sync="payingVisible" custom-class="dialog-paying" @close="closeAction" :lock-scroll="false" :close-on-click-modal="false" :close-on-press-escape="false">
        <div class="paying-tip-wrap">
          <ul>
            <li>
              <p>支付成功了</p>
              <a href="" @click.prevent="gotoView(payData)">立即查看订单详情</a>
            </li>
            <li>
              <p>如果支付失败</p>
              <a href="./payProblem.html" target="_blank">查看支付常见问题</a>
            </li>
          </ul>
        </div>
        <div class="e_tips">支付成功后，若页面长时间未跳转，请点击“查看订单详情”按钮。</div>
      </el-dialog>

      <!-- 商标详情 -->
      <el-dialog title="查看商标详情" :visible.sync="goodsDetailShow" custom-class="goods_detail_dialog" width="450px" @close="closeAction" :lock-scroll="false" :close-on-click-modal="false" :close-on-press-escape="false">
        <div class="tm_info">
          <p class="tit">商标信息</p>
          <p class="item">
            <span class="key">商标名称</span>
            <span class="value">{{ tmDetailObj.trademarkName }}</span>
          </p>
          <p class="item">
            <span class="key">商标说明</span>
            <span class="value">{{ tmDetailObj.trademarkDesc }}</span>
          </p>
          <p class="item">
            <span class="key">商标图样</span>
            <img :src="tmDetailObj.blackWhitePicUrl" alt="" class="img">
          </p>
        </div>
        <div class="tm_type">
          <div class="item" v-for="(info, idx) in tmDetailObj.workOrderSerivice" :key="idx">
            <p class="big">{{ info.classId }} 化工产品 <span class="num">{{ info.minNumber }} 个小项</span></p>
            <p class="small">{{ info.min }}</p>
          </div>
          <p class="total">大类：<span class="red">{{ tmDetailObj.classNumber }}类</span>，超出小项：<span class="red">{{ tmDetailObj.minAddNumber }}个</span></p>
        </div>
        <div class="btn_box">
          <el-button @click="goodsDetailShow = false">取消</el-button>
          <el-button @click="goodsDetailShow = false" type="primary">确定</el-button>
        </div>
      </el-dialog>

    </div>
    <div class="payFailWrap"  :style="{height: winHeight-214 + 'px'}" v-else>
      <img src="~assets/img/pay/notFound.png" alt="">
      <h2>抱歉！找不到您的订单！</h2>
      <p>请检查链接是否正确并与店铺取得联系</p>
    </div>
    <customer-service :cartNum="cartNum"></customer-service>
    <!-- 公共底部 -->
    <sebe-footer v-if="!isMiniApp"></sebe-footer>
    <!-- 微信支付底部 -->
    <mini-footer v-if="isMiniApp"></mini-footer>
  </div>
</template>

<script>

  import Vue from 'vue'
  import $ from 'jquery'
  import qs from 'qs'
  import qrcode from 'components/qrcode/qrcode.vue'
  import sebeHeader from 'components/HeaderSm.vue'
  import miniHeader from 'components/HeaderMini.vue'
  import sebeFooter from 'components/Footer.vue'
  import miniFooter from 'components/FooterMini.vue'
  import customerService from 'components/CustomerService.vue'
  import CountDown from 'components/countdown.vue'
  import zhifubaoPic from 'assets/img/pay/zfb.png'
  import weixinPic from 'assets/img/pay/wx.png'
  import yinlianPic from 'assets/img/pay/yl.png'
  import filters from 'assets/filters.js'
  const path = CONFIG.path;
  const indexUrl = CONFIG.indexUrl;
  const payUrl = CONFIG.payUrl;
  const userUrl = CONFIG.userUrl;
  const bankUrl = CONFIG.payUrl + '/iprp_app/api/getBank';
  const paymentUrl = CONFIG.payUrl + '/iprp_app/api/payment';

  export default {
    components: {
      sebeHeader,
      miniHeader,
      customerService,
      CountDown,
      sebeFooter,
      qrcode,
      miniFooter
    },
    data() {
      return {
        parseParam: parseParam,
        winHeight: 900, // 视窗高度
        postData:{},
        paymentUrl: paymentUrl,
        btnText: '立即支付',
        timer:'', //定时器
        count: 1, //计次
        qcodeUrl:'', //支付二维码
        needQcode: false,
        payAccountBank: '',
        banksData: [],
        bankType: 2,
        agreementUrl: '',
        isChecked: false,
        cartNum:"",
        paymentState:-1, //后台0支付失败 1支付成功
        nologin: false,
        loading:false,
        detailLoading: false,
        orderdetailVisible: false,
        payingVisible: false,
        userName: "",
        payType:[zhifubaoPic, weixinPic, yinlianPic],
        payData: {
          "standardPrice": "",    //标准价格
          "depositPrice": "",     //定金
          "preferentialPrice": "", //订金优惠价
          "payMoney": "",  //实际支付价格=定金-订金优惠价
          "order_sn": "",
          "paymentsList": [/*{payment_id: 0},{payment_id: 1},{payment_id: 2}*/],
          "subject": ""
        },
        productOrderData:[],
        source:'', //来源
        orderNum: '',
        payurl:'', //拼装而成的ping++支付地址
        payInfo:'',
        isMiniApp: false,  //是否是小程序支付
        miniPayData: {},  //小程序支付数据
        goodsDetailShow: false,  //商标详情
        tmDetailObj: {}, //商标详情
        orderNumMd5: '',  //经md5加密过后的订单号
        noOrderState: false
      }
    },
    mounted () {
      var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      if (!getQueryString('order_sn_md5')) {
        link.href = 'https://www.ipsebe.com/cms/webfile/sebe16-3.ico';
      } else {
        link.href = '../static/bitbug_favicon.ico';
      }
      document.getElementsByTagName('head')[0].appendChild(link);

      this.winHeight = document.documentElement.clientHeight;
      if (this.winHeight < 600) {
				this.winHeight = 600;
			}
      this.isMiniApp = getQueryString('isMiniApp') || false;
      this.orderNum = getQueryString('order_sn') || '';
      this.orderNumMd5 = getQueryString('order_sn_md5') || '';
      this.source = getQueryString('source');
      //先获取订单状态，如果是已支付订单，直接跳转到支付成功页面
      this.getPaySatatus();
      // 查询支付信息
      if (this.isMiniApp) {  //小程序支付信息
        this.getMiniPayInfoFn();
      }
      else{
        this.getPayInfo();  //正常支付
      }
      this.getBankInfo(2);
      this.init();
    },
    methods: {
      // 查看商标详情
      getTmDetailFn (data) {
        this.findConfirmTrademark(data.orderSn);
        this.goodsDetailShow = true;
      },
      // 查询商标详情
      findConfirmTrademark (sn) {
        this.$http.get(`${indexUrl}/createOrder/findConfirmTrademark.htm?orderSn=${sn}`)
        .then( resp => {
          console.log(resp);
          this.tmDetailObj = resp.data;
        })
        .catch( (e) => {})
      },
      init(){
        var userName = this.$cookie.get('truename');
        var phone = this.$cookie.get('phone');
        var phoneOri = phone;
        if (phone) {
          phone = phone.slice(0, 3) + '****' + phone.slice(-4);
        }
        this.userName = userName ? userName : phone;
        this.cartNum = this.$cookie.get('cart_num') || '0';
        //禁止
        if (window.history && window.history.pushState) {
          history.pushState(null, null, location.href);
          window.addEventListener('popstate', function () {
            history.pushState(null, null, location.href);
          });
        }
        this.agreementUrl = './serviceAgreement.html?'+encodeURIComponent($.param({
          name: userName,
          phone: phoneOri,
          order_sn: this.orderNum,
          amount: this.payData.payMoney || '0.00'
        }));
      },
      isSurport(code){
        var ret = false,
            paymentsList = this.payData.paymentsList;
        for (var i = paymentsList.length - 1; i >= 0; i--) {
          if(paymentsList[i].code == code){
            ret = true;
            break;
          }
        }
        return ret;
      },
      countDownE_cb(item){
        item.leftTime = 0;
        this.closeAction();
      },
      getPostData(){
        var self = this;
        var payData = this.payData;
        // 获取支付方式的code
        var getChannelCode = function(){
          var ret = '';
          if (self.payAccountBank == 'alipay_pc_direct' || self.payAccountBank == 'wx_pub_qr') {
            ret = self.payAccountBank;
          }else{
            ret = self.bankType === 2 ? 'upacp_personal' : self.bankType === 1 ? 'upacp_public' : '';
          }
          return ret;
        };
        let hash_ = this.isMiniApp ? '#/miniApp' : '#/app';
        var success_url = 'https:'+ path+'/shop/pages/paySuccess.html' + hash_ + '?order_sn='+payData.order_sn + (this.source ? '&source=' + this.source : '');
        this.postData = {
          order_sn: payData.order_sn,
          payment_sn: payData.payment_sn,
          channel: getChannelCode(),
          client_ip: payData.client_ip,
          subject: encodeURIComponent(payData.subject),
          body: encodeURIComponent(payData.body),
          success_url: encodeURIComponent(success_url),
          timestamp: payData.timestamp,
          sign: payData.sign
        };
      },
      //快捷支付采用ajax, 银联直接是超链接触发
      getPayment(e){
        var self = this;
        if (!this.payAccountBank) {
          e.preventDefault();
          self.$message.warning('请选择支付方式');
          return;
        }
        // if (!this.isChecked) {
        //   e.preventDefault();
        //   self.$message.warning('亲，不要忘了阅读并勾选《拾贝网服务协议》哦~');
        //   return;
        // }

        var isFast = this.payAccountBank == 'alipay_pc_direct' || this.payAccountBank == 'wx_pub_qr';
        var payAccountBank = isFast ? '' : this.payAccountBank;
        if (isFast) {
          e.preventDefault();
          this.btnText = '请稍候...';
          this.$http.post(paymentUrl + '?payAccountKind=1&payAccountType=' + this.bankType + '&payAccountBank=' + payAccountBank, this.postData)
          .then((resp) => {
            var data = resp.data;
            if (data.body) {
              this.needQcode = true;
              this.qcodeUrl = data.body;
              this.btnText = '立即支付';
            }else{
              this.$alert('系统繁忙，请稍候重试。', '提示', {
                confirmButtonText: '确定',
              });
              this.closeAction();
            }
          })
          .catch((error) => {
            this.btnText = '立即支付';
            this.$alert('系统繁忙，请稍候重试。', '提示', {
              confirmButtonText: '确定',
            });
            this.closeAction();
          });
        }else{
          this.payingVisible = true;
        }
      },
      interGetPaySatatus(){
        this.timer && clearInterval(this.timer);
        this.timer = setInterval(() => {
          if (this.count > 150) {
            this.timer && clearInterval(this.timer);
            this.chooseOther();
            return;
          }
          this.count ++ ;
          this.getPaySatatus();
        }, 2000);
      },
      getPaySatatus (){
        var self = this;
        self.$http.post('./payweb/paymentstatus.htm', qs.stringify({
          order_sn: self.orderNum
        }))
        .then((response) => {
          var data = response.data;
          this.payInfo = data;//获取轮循信息，用来判断跳转详情页
          if(data.code == 'success'){
            var paymentState = self.paymentState = data.data.payment_state;
            if (paymentState === 1) {
              this.timer && clearInterval(this.timer);
              let hash_ = this.isMiniApp ? '#/miniApp' : '#/app';
              // if (this.isMiniApp) {
              //   hash_ = '#/miniApp';
              //   location.href = path+'/shop/pages/paySuccess.html' + hash_ + '?order_sn_md5='+ self.orderNumMd5 + (self.source ? '&source=' + self.source : '');
              // } else {
                // hash_ = '#/app';
                location.href = path+'/shop/pages/paySuccess.html' + hash_ + '?order_sn='+ self.orderNum + (self.source ? '&source=' + self.source : '');
              // }
            }
          }
        })
        .catch((error) => {
          //console.log(response)
        });
      },
      refresh(order_sn){
        this.view(order_sn);
      },
      getPayInfo(){
        var self = this;
        this.$http.post('./payweb/topay.htm', qs.stringify({order_sn: this.orderNum}))
        .then((response) => {
          var data = response.data;
          if (data.code == 'success') {
            self.payData = data.data;
            var paymentsList = self.payData.paymentsList;
            //test
            /*var arr = [];
            arr[0] = paymentsList[0];
            arr[1] = paymentsList[1];
            arr[2] = paymentsList[3];
            arr[3] = paymentsList[4];
            self.payData.paymentsList = arr;*/
            if (!self.isSurport('upacp_personal') && self.isSurport('upacp_public')) {
              self.bankType = 1;
            }
            if (!paymentsList.length) {
              self.$alert('系统繁忙，请稍候重试。', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  self.closeAction();
                },
                beforeClose: action => {
                  self.closeAction();
                }
              });
              return;
            }
            self.channel = self.payData.paymentsList[0].payment_id;
          }else{
            self.$alert('系统繁忙，请稍候重试。', '提示', {
              confirmButtonText: '确定',
            });
          }
        })
        .catch((error) => {
        });
      },
      // 查询小程序支付信息
      getMiniPayInfoFn () {
        this.$http.get(`${indexUrl}/createOrder/findConfirmPartnerOrderByMD5.htm?md5=${this.orderNumMd5}`)
        .then( resp => {
          this.miniPayData = resp.data;
          sessionStorage.setItem('miniPayData', JSON.stringify(resp.data));
          this.orderNum = resp.data.orderSn;
          if (!!resp.data.orderState) {
            // 不是待支付状态则跳转至支付成功页面
            location.href = path+'/shop/pages/paySuccess.html#/miniApp' + '?order_sn='+ this.orderNum + (this.source ? '&source=' + this.source : '');
          }
          this.getPayInfo();  //正常支付
        })
        .catch( (err) => {
          // if (err.response.data.msg == '订单不存在或者以过期') {
          this.noOrderState = true;
          // }
          console.log(err.response)
        })
      },
      getBankInfo(type){
        var self = this;
        self.loading = true;
        this.$http.get(bankUrl, {
          params: {bankType: type}
        })
        .then((response) => {
          var data = response.data;
          self.loading = false;
          self.banksData = data;
        })
        .catch((error) => {
          self.loading = false;
          self.$message.error('银行信息加载失败，请稍候重试。');
        });
      },
      gotoView(item){
        if (this.payInfo.orderBussinessType == 4) {
          location.href = userUrl + '/iprp/#/orders/' + item.order_sn + '?type=jyfw_gnsb_sbjy';
        }else{
          location.href = userUrl + '/iprp/#/orders/' + item.order_sn;
        }
      },
      view(orderNum){
        var self = this;
        self.orderdetailVisible = true;
        self.detailLoading = true;
        this.$http.post('./cartWeb/orderDetail.htm', qs.stringify({orderNum: this.orderNum}))
        .then((response) => {
          var data = response.data;
          self.detailLoading = false;
          if (data.code == 'success') {
            self.productOrderData = data.data.productOrder;
          }else{
            self.productOrderData = [];
            if (data.msg == '请登录') {
              self.nologin = true;
            }else{
              self.nologin = false;
            }
          }
        })
        .catch((error) => {
          self.detailLoading = false;
        });
      },
      closeAction(){
        this.btnText = '立即支付';
        this.payAccountBank = '';
        this.getPaySatatus();
        this.getPayInfo();
      },
      chooseOther(){
        this.needQcode = false;
        this.closeAction();
      }
    },
    filters: {
      dateFormat: filters.formatDate.dateFormat,
      priceformat: filters.priceformat
    },
    watch:{
      payAccountBank(){
        this.getPostData();
      },
      bankType(){
        this.payAccountBank = '';
        if (this.isSurport('upacp_personal') && this.bankType == 2) {
          this.getBankInfo(this.bankType)
        }else if(this.isSurport('upacp_public') && this.bankType == 1){
          this.getBankInfo(this.bankType)
        }
      },
      payingVisible(){
        if (this.payingVisible) {
          this.interGetPaySatatus();
        }else{
          this.timer && clearInterval(this.timer);
        }
      },
      needQcode(){
        if (this.needQcode) {
          this.interGetPaySatatus();
        }else{
          this.timer && clearInterval(this.timer);
        }
      }
    }
  }
  /**
   * param 将要转为URL参数字符串的对象
   * key URL参数字符串的前缀
   * encode true/false 是否进行URL编码,默认为true
   *
   * return URL参数字符串
   */
  function parseParam (param, key, encode){
    if(param==null) param = '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
      paramStr += '&' + key + '=' + (encode ? encodeURIComponent(param) : param);
    } else {
      for (var i in param) {
        var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
        paramStr += '&' + parseParam(param[i], k, encode);
      }
    }
    return paramStr.slice(1);
  };
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
#payWrap{background-color: #f5f5f5;padding-top: 13px;padding-bottom: 20px;}
.orderinfo{
  position: relative;
  background-color:#fff;
  padding: 50px 0 40px 70px;
  font-size:14px;
  .order_success{
    i{font-size:58px;color:#36AF47;}
  }
  .countdown-wrap{
    color:#999;
    .countdown{
      display: inline-block;color:#ff3939;
      i{font-style: normal;}
      span{margin-right:0;}
    }
  }
  .tipinfo{
    font-size:18px;color:#333;font-weight:bold;margin-top: -5px;
  }
  .order_info {
    color: #999; font-size: 14px; line-height: 20px; margin-top: 5px;
    .value {color: #333;}
  }
  .orderNum{
    color: #999;
    height: 30px;line-height:30px;
    a{color: #3db1fa;margin-left:5px;}
  }
  .time-tip{
    color: #999;
    b{color: #fe2200;}
  }
  .amount{
    position: absolute;top:52px;right: 37px;color:#333;text-align:center;
    b{font-size:18px;color: #ff3939;font-family: Arial;font-weight:normal;vertical-align: middle;}
    a{display:block;width:60px;position: absolute;right:0;
      i{font-size:12px;color:#999;}
    }
    .text {font-weight: bold; vertical-align: -webkit-baseline-middle; vertical-align: sub;}
    .num {font-size: 28px; color: #F64744; }
  }
}
.order_info_mini {
  padding: 30px;
  .tip_mini { margin-bottom: 10px; line-height: 25px;}
  .order_success {
    padding: 10px 0;
    i {font-size: 50px;}
  }
  .goods_list {
    width: 100%; height: auto; margin-top: 30px;
    .tit {padding-left: 15px; height: 40px; line-height: 40px; background: #F6FAFF; color: #333; font-size: 14px;}
    .item {
      padding-left: 15px; height: 40px; line-height: 40px; color: #333; font-size: 14px; border-bottom: 1px solid #eee;
      .name {
        display: inline-block; width: 450px;
        .link {color: #2F80F6; cursor: pointer; margin-left: 10px;}
      }
      .price {width: 120px; text-align: left; display: inline-block;}
      .num {}
    }
  }
  .countdown_box {
    color: #999; position: absolute; width: 400px; display: block; right: 0; text-align: right;
    .countdown{
      display: inline-block; color:#ff3939;
      i{font-style: normal;}
      span{margin-right:0;}
    }
  } 
}

.select-paytype{
  font-size:14px;
  background-color: #FFF;
  margin-top: 20px;
  padding-bottom:40px;
  text-align: center;
  h3{text-align: left;height: 50px;line-height:50px;padding-left:25px;border-bottom:1px solid #e6e6e6}
  .payClass{
    height: 50px;border-bottom: 1px solid #E6E6E6;text-align: left;color: #DDDDDD;font-size:16px;
    span{text-align: center;display: inline-block;height: 50px;line-height: 50px;width:124px;font-size: 16px;color: #333;margin: 0 20px;cursor: pointer;border-bottom: 2px solid transparent;}
    span.active{border-bottom: 2px solid #3DB1FA;color: #3DB1FA;}
    span.division{width:1px;height: 20px;background-color: #ddd;line-height:20px;margin: 0;border:0;vertical-align: top;margin-top:14px;}
  }
  .com{
    padding: 30px 25px 0;text-align: left;min-height:150px;
    p.title{
      height: 19px;line-height: 19px;font-size: 14px;color: #333333;padding-left: 5px;
      b{color: #999;font-weight:normal;}
    }
    .paytype{
      margin-top:15px;padding-bottom: 20px;width:100%;
      .bankInfo{
        text-align: left;min-height:46px;
        li{float: left;width:214px;height: 46px; text-align: center;border: 1px solid #EEEEEE;margin:0 5px; margin-bottom: 10px;cursor: pointer;
          img{margin-top:2px;}
        }
        li.active,li:hover{border:1px solid #3db1fa;}
      }
    }
  }
  p.time{color: #999;height: 50px;line-height:50px;}
  .agree{
    label a{color: #3db1fa;}
  }
  .submitBtn,.submitBtn:visited{width:160px;height: 50px;line-height: 50px;font-size: 18px;background-color: #F64744;margin: 20px auto 0;display: inline-block;color:#fff;}
  .submitBtn:hover{background-color:#e20000;text-decoration: none;}
}

.qcode_wrap{
  font-size:14px;background-color: #FFF;margin-top: 20px;padding-bottom:70px;text-align: center;padding-top: 70px;
  .qcode{
    width:200px;height: 260px;border:1px solid #DDDDDD;margin: 0 auto 20px;padding-top:10px;position: relative;
    .mdimg{position: absolute;top:80px;left:80px;}
    .tip{
      padding:10px 0 20px;
      img{display: inline-block;margin-right:10px;}
      span{display: inline-block; width:84px; height: 36px;font-size: 12px;line-height: 18px;color: #666666;text-align: left;}
    }
  }
  .other{cursor: pointer;font-size: 14px;color: #666666;}
}



/* 查看订单详情 */
.dialog-orderdetail{
  width:650px;min-height:300px;padding:20px 30px 35px;
  .el-dialog__body{padding:0;}
  .el-dialog__header{padding: 6px 0 16px;}
}
.pop_window{
  position: relative;
  font-size:14px;
  color: #333;
  .order_detail{
    .order_table_wrap{max-height: 290px;overflow-y: auto;}
    p{
      line-height:27px;
      color: #666;
      span{
        margin-right: 20px;
      }
      i.highlight{color: #fe2200;font-style: normal;}
    }
    .order_table{
      height: 100%;
      margin-top:12px;
      text-align:center;
      th{height: 45px;border: 1px solid #e6e6e6;background-color: #eee;font-weight:normal; }
      th.til{text-align:left; padding-left:30px;}
      td{
        height: 46px;border: 1px solid #e6e6e6;padding:5px 10px 5px 10px;
        a{color: #3db1fa;}
      }
      td.til{text-align:left; padding-left:30px;}
      td.amount{padding-right: 20px;color: #fe2200}
    }
  }
}

/* 正在支付... 弹窗 */
.dialog-paying{
  width:400px;height:260px;padding:20px 30px 35px;
  .el-dialog__body{padding:0;}
  .el-dialog__header{
    padding: 6px 0 16px;
    .el-dialog__title{font-size:14px;font-weight:normal;}
  }
}
.paying-tip-wrap{
  margin-top:20px;
  background: #FFF url(~assets/img/pay/paying_bg.png) 65px 0 no-repeat;
  padding-left:170px;
  ul{
    font-size:14px;
    li{
      margin-bottom: 5px;
      p{font-weight:bold;line-height:18px;}
      a{color: #3db1fa;line-height:18px;}
    }
  }
}
.e_tips{color: #999;padding: 20px 0;}
.el-message{top: 36px;z-index: 10000!important;}
/* 商标详情弹窗 */
.goods_detail_dialog {
  width: 450px; height: auto;
  .el-dialog__header {
    padding-bottom: 10px; padding-top: 20px !important;
    .el-dialog__title {font-weight: bold !important;}
  }
  .el-dialog__headerbtn {right: 30px; top: 25px;}
  .tm_info {
    width: 100%; padding: 20px; border: 1px solid #eee; margin-bottom: 10px;
    .tit {font-size: 14px; line-height: 20px; color: #333; font-weight: bold; width: 100%; margin-bottom: 10px;}
    .item {
      width: 100%; line-height: 20px; margin-bottom: 10px; font-size: 14px; color: #333;
      .value {color: #999; margin-left: 10px;}
      .img {width: 90px; height: 60px; border: 1px solid #eee; margin-left: 10px; vertical-align: text-top;}
    }
  }
  .tm_type {
    width: 100%; border: 1px solid #eee; padding: 20px;
    .item {
      .big {
        font-size: 14px; color: #333; margin-bottom: 10px;
        .num {font-size: 12px; color: #999; margin-left: 10px;}
      }
      .small {color: #666; font-size: 12px; margin-bottom: 20px; width: 100%;}
    }
    .total {
      font-size: 14px; color: #333;
      .red {color: #F64744;}
    }
  }
  .btn_box {
    text-align: right; margin-top: 15px;
    .el-button {height: 34px; line-height: 32px; width: 80px; padding: 0; color: #666; border: 1px solid #ddd; font-size: 14px;}
    .el-button--primary {background: #2F80F6; color: #fff; border: 1px solid #2F80F6;}
  }
}
/* 订单不存在或已关闭 */
.payFailWrap{
  width: 1170px;margin: 0 auto;background: #fff;text-align: center;font-size: 0;height: 521px;margin-top: 30px;
  img{width: 150px;padding-top: 130px;}
  h2{font-size: 18px;color: #333;line-height: 25px;padding-top: 15px;}
  p{padding-top: 5px;font-size: 14px;line-height: 20px;color: #bbb;}
}
</style>
