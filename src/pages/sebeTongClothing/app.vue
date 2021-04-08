<template>
  <div id="app">
    <sebe-header :username="userName" :title="'拾贝通-服饰'"></sebe-header>
    <div id="sebeTongClothing">
      <div class="banner commWidth"></div>
      <div class="type-lists commWidth clearfix" v-loading="loading">
        <div class="list-wrap" v-for="item in mealData">
          <div class="list">
            <h3>{{item.packageName}}</h3>
            <div class="con">
              <p class="desc">{{item.description}}</p>
              <ul class="listli">
                <li v-for="it in item.productList">{{it.productName}}：{{it.productNum}}{{it.productName.indexOf('知识产权托管')!==-1? '件':it.productName.indexOf('报告')!==-1?'份':'次'}}
                </li>
              </ul>
              <div class="oldP">原价：<b>{{item.packagePrice}}元</b></div>
              <div class="mealP">套餐价：{{item.packaDiscountgePrice}}元</div>
              <a class="buybtn" href="./newConfirm.html" @click.prevent="goToConfirm(item)">立即购买</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <customer-service :cartNum="cartNum"></customer-service>
    <mini-login @callbackDo="callbackDo" :showMini="showMini" @closeMini="showMini=false"></mini-login>
    <sebe-footer></sebe-footer>
  </div>
</template>

<script>
  import Vue from 'vue'
  import $ from 'jquery'
  import sebeHeader from 'components/HeaderSm.vue'
  import sebeFooter from 'components/FooterSm.vue'
  import customerService from 'components/CustomerService.vue'
  import miniLogin from 'components/miniLogin.vue'
  import axios from 'axios'
  import qs from 'qs'
  import Lib from 'assets/Lib.js'
  const indexUrl = CONFIG.indexUrl;
  const userUrl = CONFIG.userUrl;
  const getMealUrl = './products/packageLists.htm';
  const vipGradeUrl = '/api/findVip';


  export default {
    name: 'app',
    data () {
      return {
        showMini: false,
        loading: false,
        cartNum:"",
        userName: "",
        vipData:'',
        mealData: []
      }
    },
    components: {
      sebeHeader,
      customerService,
      miniLogin,
      sebeFooter
    },
    mounted () {
      this.getMealData();
      this.getVipGrade();
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
      //获取vip等级
      getVipGrade(cb){
        var self = this;
        this.$http.get(userUrl + vipGradeUrl)
        .then(function(response) {
          var data = response.data;
          self.vipData = data.data;
          cb && cb();
        })
        .catch(function(error) {
        });
      },
      // 登陆后跳转判断
      callbackDo (){
        var self = this;
        this.showMini = false;
        var userName = this.$cookie.get('truename');
        var phone = this.$cookie.get('phone');
        if (phone) {
          phone = phone.slice(0, 3) + '****' + phone.slice(-4);
        }
        this.userName = userName ? userName : phone;
        this.cartNum = this.$cookie.get('cart_num') || '0';
        this.getVipGrade(function(){
          self.goToConfirm(self.item);
        });
      },
      //获取套餐数据
      getMealData(url){
        var self = this;
        self.loading = true;
        this.$http.get(getMealUrl, {
          //此写法配合mock
          params: {
            industryId: 1
          }
        })
        .then(function (resp) {
          self.loading = false;
          var data = resp.data;
          if (data.code === 0) {
            self.mealData = data.data || []
          }else{
            self.$notify.error('套餐加载异常。')
          }
        })
        .catch(function (data) {
          self.loading = false;
        });
      },
      //立即购买
      goToConfirm(item){
        var self = this;
        //productId对应的vip等级
        var vipGrade = {
          '26': 0,
          '27': 1,
          '28': 2,
          '29': 3,
          '30': 4,
          '31': 5,
          '32': 6,
          '33': 7
        };
        var userName = this.$cookie.get('truename');
        var phone = this.$cookie.get('phone');
        if (!userName && !phone) {
          this.showMini = true;
          this.item = item;
          return;
        }
        var action = function(isFilter){
          var arr = item.productList;
          var temp = [];
          $.each(arr, function(i, item){
            //过滤会员等级（知识产权托管）的购买 productId26-33对应为vip0-7
            if (isFilter && item.productId < 34 && item.productId > 25) {
              return;
            }
            var ret = {
              shopProductId: item.productId,
              shopProductTypeIdProductType: item.shopProductTypeIdProductType,
              shopProductTypeIdServiceType: item.shopProductTypeIdServiceType,
              number: item.productId == 22 || (item.productId < 34 && item.productId > 25) ? 1 : item.productNum,
            };
            temp.push(ret);
          })
          console.log(JSON.stringify(temp))
          location.href = './newConfirm.html?params='+encodeURIComponent(JSON.stringify(temp));
        }
        if (this.vipData.vip > vipGrade[item.productList[0].productId+'']) {
          self.$confirm('您当前的会员等级高于套餐内会员服务等级，将为您过滤该服务。', '提示', {
            type: 'warning',
            closeOnClickModal: false
          })
          .then(() => {
            action(true);
          })
          .catch((error) => {
          });
        } else if (this.vipData.vip == vipGrade[item.productList[0].productId+'']) {
          if (this.vipData.vip != 0) {
            self.$confirm('您当前的会员等级与套餐内会员服务等级相同，将为您过滤该服务。', '提示', {
              type: 'warning',
              closeOnClickModal: false
            })
            .then(() => {
              action(true);
            })
            .catch((error) => {
            });
          }else{
            action(true);
          }
        } else {
          action();
        }
      }
    }
  }
</script>

<style lang="scss">
#sebeTongClothing{
  width:100%;background: #f8f8f8 url(~assets/img/sebeTongClothing/banner.jpg) center 0 no-repeat;padding-bottom: 35px;
  .banner{height: 320px;}
  .type-lists{
    margin-top:42px;background-color: #FFF;font-size:14px;
    .list-wrap{
      float: left;width:292px;height: 486px;border-right: 1px solid #e6e6e6;position: relative;
      .list{
        position: relative;width:291px;height: 486px;background-color: #FFF;z-index: 1;
        h3{height: 70px;line-height: 70px;font-size: 16px;text-align: center;background-color: #eeeeee;}
        .con{
          padding: 20px 25px;position: relative;
          p.desc{color: #666;line-height: 22px;}
          ul.listli{
            margin-top:17px;min-height: 150px;
            li{height: 30px;line-height: 30px;}
          }
          .oldP{
            margin-top:24px;height: 26px;line-height: 26px;text-align: center;color: #666;
            b{text-decoration: line-through;font-weight: normal;}
          }
          .mealP{height: 26px;line-height: 26px;text-align: center;color: #fe2200}
          .buybtn{height: 42px;line-height: 42px;text-align: center;width:144px;border: 1px solid #3db1fa;border-radius: 3px;color:#3db1fa;display: block;margin: 10px auto 0;text-decoration:none;}
          .buybtn:hover{background-color: #3db1fa;color: #fff;}
        }
      }
      .list:hover{
        transform: translate(-12px, -12px);width:316px; height:510px;z-index: 2;box-shadow: 0 0 12px #ccc;
        h3{height: 82px;line-height: 82px;background-color: #3db1fa;color: #fff;}
        .con{padding: 20px 37px;}
        .buybtn{background-color: #3db1fa;color: #fff;}
      }
    }
    .list-wrap:last-child{border-right:0;width:294px;
      .list{width:294px;}
      .list:hover{
        transform: translate(-12px, -12px);width:316px; height:510px;z-index: 2;box-shadow: 0 0 12px #ccc;
        h3{height: 82px;line-height: 82px;background-color: #3db1fa;color: #fff;}
        .con{padding: 20px 37px;}
        .buybtn{background-color: #3db1fa;color: #fff;}
      }
    }
  }
}
</style>
