<template>
  <div id="app">
    <sebe-header :username="userName" :title="'确认订单'"></sebe-header>

    <!--确认订单信息-->
    <div id="confirmOrder" class="commWidth clearfix">
      <h3>确认订单信息</h3>
      <div class="orderTil">
        <span class="td-1">商品名称</span>
        <span class="td-2">单价(元)</span>
        <span class="td-3">数量</span>
        <span class="td-4">金额(元)</span>
      </div>
      <div class="orderBody" v-loading="loading">
        <div class="td" v-for="(item, index) in order">
          <div class="td-1">{{item.productName}}</div>
          <div class="td-2">
            <span class="perPrice">{{(item.standardPrice-0).toFixed(2)}}</span>
          </div>
          <div class="td-3">{{item.productNum}}</div>
          <div class="td-4"><!--:class="{through: !!(item.payMoney-0)}"-->
            <span class="oldPrice">{{(item.payMoney-0).toFixed(2)}}</span>
            <!--<template v-if="(item.payMoney-0)">
              <span class="dicount">{{(item.payMoney-0).toFixed(2)}}</span>
              （已优惠{{(item.payMoney - 0).toFixed(2)}}元）
            </template>-->
          </div>
        </div>
      </div>

      <div class="orderResult">
        <div class="total">商品价格总计：<span>¥{{(totalPrice-0).toFixed(2)}}</span></div>
        <div class="payTotal">实付金额：<span>¥{{(payPrice-0).toFixed(2)}}</span></div>
        <!-- <button class="chgPro" @click="backto">修改商品</button> -->
        <button class="subOrder" @click="submitOrder" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="请稍候，正在提交中...">立即下单</button>
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
  import axios from 'axios'
  import qs from 'qs'
  import Lib from 'assets/Lib.js'
  const path = CONFIG.path;
  const indexUrl = CONFIG.indexUrl;
  const userUrl = CONFIG.userUrl;
  const orderInfoUrl = './cartWeb/nowPlaceOrders.htm';
  const createOrderUrl = './cartWeb/nowPlaceOrderCombine.htm';

  export default {
    name: 'app',
    data () {
      return {
        cartNum:"",
        loading: false,
        visible:false,
        userName: "",
        buyGoodData: {},
        orderData:[],//选择主体+确认订单信息
        order:[],//确认订单信息
        itemId:'',
        productNum: 1,
        payPrice:'',
        totalPrice:'',
        arr:[],
        bodyList:'', //选择主体
        submitDisabled: false,
        fullscreenLoading: false
      }
    },
    components: {
      sebeHeader,
      customerService,
      sebeFooter
    },
    mounted () {
      this.buyGoodData = JSON.parse(parseUnparam(location.href).params);
      this.getOrderInfo();
      var userName = this.$cookie.get('truename');
      var phone = this.$cookie.get('phone');
      if (phone) {
        phone = phone.slice(0, 3) + '****' + phone.slice(-4);
      }
      this.userName = userName ? userName : phone;
      this.cartNum = this.$cookie.get('cart_num') || '0';
    },
    computed: {

    },
    methods: {
      //查询确认订单信息 主体信息独立出去了
      getOrderInfo(){
        var self = this;
        self.loading = true;
        this.$http.post(orderInfoUrl, this.buyGoodData)
        .then(function(response) {
          self.loading = false;
          var data = response.data;
          console.log(data);
          if (data.code == 0) {
            self.order = data.data.order;
            self.payPrice = data.payPrice;
            self.totalPrice = data.totalPrice;
            self.itemId = self.order[0].itemId;
            self.productNum = self.order[0].productNum;
          }else{
            if (data.msg == '请登录' || data.code == '0100002') {
              self.$confirm('登录已失效，请重新登录', '提示', {
                confirmButtonText: '重新登录',
                showCancelButton: false,
                type: 'warning'
              }).then(() => {
                location.href = userUrl + '/iprp/#/access/login?return_url='+ location.href;
              }).catch(() => {
                location.href = userUrl + '/iprp/#/access/login?return_url='+ location.href;
              });
            }else{
              self.$alert('系统繁忙，请稍候再试。');
            }
            //location.href = path + '/error.html';
          }
        })
        .catch(function(error) {

        });
      },
      // 正式生成订单
      submitOrder (data) {
        var self = this;
        if (self.submitDisabled) {
          return;
        }
        self.submitDisabled = true;
        self.fullscreenLoading = true;
        self.$http.post(createOrderUrl, self.buyGoodData)
        .then(function(response) {
          self.submitDisabled = false;
          self.fullscreenLoading = false;
          var data = response.data;
          console.log(data)
          if (data.code == 'success') {
            location.href = './pay.html?order_sn='+ data.data.payOrder[0]['orderNum']
          } else {
            if (data.msg == '请登录' || data.code == '0100002') {
              self.$confirm('登录已失效，请重新登录', '提示', {
                confirmButtonText: '重新登录',
                showCancelButton: false,
                type: 'warning'
              }).then(() => {
                location.href = userUrl + '/iprp/#/access/login?return_url='+ location.href;
              }).catch(() => {
                location.href = userUrl + '/iprp/#/access/login?return_url='+ location.href;
              });
            }else{
              self.$alert('系统繁忙，请稍候再试。');
            }
          }
        })
        .catch(function(error) {
          self.$alert('系统繁忙，请稍候再试。');
          self.submitDisabled = false;
          self.fullscreenLoading = false;
        });
      }
    }
  }

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
  function parseUnparam(param, decode){
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

<style lang="scss">
#app {background-color: #f5f5f5;}
#confirmOrder{
  min-height: 600px;background-color: #fff;margin-top:15px;margin-bottom: 15px;padding-left: 20px;padding-right: 20px;padding-top: 25px;
  h3{font-size:14px;font-weight: bold;}
  .td-1{padding-left:45px;text-align: left;width: 25%;height: 100%;vertical-align: middle;display: table-cell;}
  .td-2{width: 25%;height: 100%;vertical-align: middle;display: table-cell;}
  .td-3{width: 25%;height: 100%;vertical-align: middle;display: table-cell;}
  .td-4{width: 25%;height: 100%;vertical-align: middle;display: table-cell;}
  .orderTil{
    height: 45px;line-height: 45px;background-color: #e6e6e6;font-size: 14px;margin-top: 25px;
    span{float: left;display: inline-block;text-align: center;}
    span.td-1{text-align: left;}
  }

  .orderBody{
    width: 100%;overflow: hidden;line-height: 26px;text-align: center;min-height: 60px;
    .td{width: 100%;display: table;border-bottom: 1px solid #e6e6e6;border-left: 1px solid #e6e6e6;border-right: 1px solid #e6e6e6;font-size: 14px;color: #666;height: 58px;line-height: 58px;}
    .perPrice{display: block;padding-right: 115px;text-align: right;}
    .oldPrice{display: block;color: red;padding-right: 115px;text-align: right;}
    .through{text-decoration: line-through;}
    .dicount{color: #ff4546}
  }

  .orderResult{
    clear: both;text-align: right;padding:30px 0 50px;
    .total{font-size: 14px;height: 28px;line-height: 28px;}
    .total span{font-family: arial;}
    .payTotal{font-size: 16px;height: 30px;line-height: 30px;}
    .payTotal span{color:#fe2200;font-family: arial;font-weight: bold;}
    .chgPro{height: 46px;line-height: 46px;color: #999;font-size: 14px;border:0;margin-top: 20px;margin-right:30px;}
    .subOrder{width: 168px;height: 46px;line-height: 46px;color: #fff;font-size: 16px;background-color: #f1331a;border-radius: 4px;margin-top: 20px;}
    .subOrder:hover{background: #e20000}
  }
}

.dialog-confirm > .el-dialog{width:650px;min-height:300px;padding:20px 30px 35px;}
.el-dialog__body{padding:0;}
.el-dialog__header{padding: 6px 0 16px;}
</style>
