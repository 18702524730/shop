<template>
  <div class="vips">
      <div v-loading='loading' style='min-height: 300px'>
          <h4 class='title'>{{ titleName ? titleName : '选择会员'}}</h4>
          <p class="current-card" v-if=' isLogin == true '>当前身份: <span>{{vipLevel ? vipLevel : '免费会员'}}</span>
            <span v-if='vipCurrentLevel > 0'  class="effective">(有效期至{{vipEffectTime | getTimeType }})</span>
          </p>
          <p v-else class='login-btn' @click=" showMini = true ">请先登录</p>
            <div class='vip-list'>
               <!-- 表示的是进入页面默认显示-->
              <div class='list' v-for=" (v,index) in vipLevelArr" v-if=' hasClick == false && vipCurrentLevel <= 6 ' >
                  <div class="vip"  v-if=" isLogin == false "  @click="getMemberVip(index)" >
                    <p class="num">可托管知识产权数：</p>
                    <span class="all-num">{{v.productIntroduce}}件</span>
                    <p class='vip-level'>{{v.name}}<span>¥{{v.standardPrice}}元/年</span></p>
                  </div>

                  <div class="vip disabled"  v-if = ' isLogin == true && vipCurrentLevel > index ' >
                    <p class="num">可托管知识产权数：</p>
                    <span class="all-num">{{v.productIntroduce}}件</span>
                    <p class='vip-level'>{{v.name}}<span>¥{{v.standardPrice}}元/年</span></p>
                  </div>

                  <div class="vip current_bg"  v-if = ' isLogin == true && vipCurrentLevel == index '  >
                    <p class="num">可托管知识产权数：</p>
                    <span class="all-num">{{v.productIntroduce}}件</span>
                    <p class='vip-level'>{{v.name}}<span>¥{{v.standardPrice}}元/年</span></p>
                  </div>

                  <div class="vip "  v-if= 'vipCurrentLevel < index && isLogin == true' :class=" index == vipIndex + 1  ? 'checked' : '' "  @click="getMemberVip(index)">
                    <p class="num">可托管知识产权数：</p>
                    <span class="all-num">{{v.productIntroduce}}件</span>
                    <p class='vip-level'>{{v.name}}<span>¥{{v.standardPrice}}元/年</span></p>
                  </div>

              </div>

                <!-- 表示的是 vip6 或以下-->
              <div class='list' v-for=" (v,index) in vipLevelArr"  v-if=' hasClick == true && vipCurrentLevel <= 6 ' >
                  <div class="vip"  v-if=' isLogin == false'  :class=" index == vipIndex ? 'checked' : '' "  @click="getMemberVip(index)" >
                    <p class="num">可托管知识产权数：&nbsp</p>
                    <span class="all-num">{{v.productIntroduce}}件</span>
                    <p class='vip-level'>{{v.name}}<span>¥{{v.standardPrice}}元/年</span></p>
                  </div>
  
                  
                  <div class="vip disabled"  v-if=" isLogin == true &&  index < vipCurrentLevel" :class="  index  == vipIndex ? 'checked' : ''" >
                    <p class="num">可托管知识产权数：&nbsp</p>
                    <span class="all-num">{{v.productIntroduce}}件</span>
                    <p class='vip-level'>{{v.name}}<span>¥{{v.standardPrice}}元/年</span></p>
                  </div>

                  <div class="vip current_bg"  v-if=" isLogin == true && index == vipCurrentLevel " >
                    <p class="num">可托管知识产权数：&nbsp</p>
                    <span class="all-num">{{v.productIntroduce}}件</span>
                    <p class='vip-level'>{{v.name}}<span>¥{{v.standardPrice}}元/年</span></p>
                  </div>

                  <div class="vip"  v-if=" isLogin == true && index > vipCurrentLevel"  :class="  index  == vipIndex + 1 ? 'checked' : ''"   @click="getMemberVip(index)">
                    <p class="num">可托管知识产权数：&nbsp</p>
                    <span class="all-num">{{v.productIntroduce}}件</span>
                    <p class='vip-level'>{{v.name}}<span>¥{{v.standardPrice}}元/年</span></p>
                  </div>
              </div>

              <!-- 表示的是 vip7-->
              <div class='list' v-for=" (v,index) in vipLevelArr" v-if=' vipCurrentLevel == 7 ' >
                  <div class="vip disabled" v-if=' index < 7 '>
                    <p class="num">可托管知识产权数：&nbsp</p>
                    <span class="all-num">{{v.productIntroduce}}次</span>
                    <p class='vip-level'>{{v.name}}<span>¥{{v.standardPrice}}元/年</span></p>
                  </div>   

                  <div class="vip disabled current_bg" v-else>
                    <p class="num">可托管知识产权数：&nbsp</p>
                    <span class="all-num">{{v.productIntroduce}}次</span>
                    <p class='vip-level'>{{v.name}}<span>¥{{v.standardPrice}}元/年</span></p>
                  </div>                 
              </div>

          </div>
          <p class="notes">注: 知识产权数量包括国内商标和国内专利数量 ，当前仅可以托管国内商标</p>
          <mini-login :showMini='showMini' @closeMini='closeMini' @callbackDo="callbackDo"></mini-login>
      </div>
  </div>
        
</template>

<script>

    import Vue from 'vue'
    import VueCookie from 'vue-cookie'
    import miniLogin from 'components/miniLogin.vue'
    const indexUrl = CONFIG.indexUrl;
    const userUrl = CONFIG.userUrl;
    const payUrl = CONFIG.payUrl;

    Vue.use(VueCookie);

    export default {
      components: {
        miniLogin
      },
      props: [
        'titleName' ,'restAmount','isNotCheck'
      ],
      data () {
        return {
          current_level_api: '/api/findVip', //当前用户  等级的  接口
          vip_list_api: './productweb/findShopBybusinclassType.htm', // 表示获取商品的的 接口
          vipIndex: 0,              //表示的是  用来判断当前的 点击的 vip的标记
          vipLevel: '',             //表示的是当前等级
          vipCurrentLevel: '',      //表示的是 当前的实际等级  默认是为空  即表示 没有等级  未登录的情况
          hasClick: false,          //表示 点击过没有
          vipLevelArr: [],          //表示的是获取vip 列表
          effect_time: false,       //表示显示有效期  true 有有效期 false 无有效期
          vipEffectTime: '',        //表示的是  有效的时间
          isLogin: false,           //表示当前的登录状态
          showMini: false,          //表示的是 显示登录框  true  显示 false 不显示
          userName: '',             //表示用户名
          loading: false,           //表示的是 正在加载
          discountPrice: 0,          //表示的是折扣的值
          vip_checked: this.isNotCheck,
        }
    
      },

      mounted () {
        this.getVipList();  //获取当前等级
      },

      methods: {

        callbackDo(){
          this.$emit('homepageClick');
        },
        getNocheck () {  //表示不能购买 弹框无法选中
            this.vipIndex = 11;
        },

        //获取参数   如果传递过来参数的话  接收一下
        getLocationLevel () {
          var self = this;
          if ( !location.search ) {
          } else {
            var level = (location.search + '').charAt(location.search.length - 1 );   //如果有传递过来购买等级的值
            this.vipIndex = level - 1;  //这里表示的是接受传递过来的值 
          }
          // 事件向上发送
          this.$emit('getCurrentLevel',self.vipIndex,self.vipLevelArr,self.userName,self.discountPrice);
          
        }, 

        //表示获取商品
        getVipList () {
          this.loading = true;
          this.$http.get(this.vip_list_api + '?businclassType=9').then((resp)=>{
                this.vipLevelArr = resp.data.data;
                this.getCurrentLevel();
                this.$emit('getVipList',this.vipLevelArr);  //将vip数据数组 和当前等级向父组件传
          }).catch((error)=> {
                this.loading = false;
                this.$notify({
                  title: '警告',
                  message: error.response.data.msg,
                  type: 'warning'
                });
          });
          
        },

        //表示获取当前等级  
        getCurrentLevel () {
          var self = this;
          this.$http.get( userUrl + this.current_level_api + "?access_token=" + VueCookie.get('user_token')).then((resp)=>{
              this.vipLevel = resp.data.data.vipName;          // 获取当前用户等级
              if ( typeof this.discountPrice == 'underfined' ) {
                  this.discountPrice = 0;
              } else {
                  this.discountPrice = resp.data.discountPrice - 0;
              };
               //表示的是当前的 折扣的值
              this.vipEffectTime = resp.data.data.validTime;   // 获取有效时间
              this.isLogin = true;                             //表示登录成功                     //加载结束
              if( resp.data.data.vipName == '免费会员') {          // 根据vip名来判断等级 vipCurrentLevel  表示实际等级
                this.vipCurrentLevel = 0;
              } else if( resp.data.data.vipName == 'VIP1') {             
                this.vipCurrentLevel = 1;
              } else if( resp.data.data.vipName == 'VIP2') {             
                this.vipCurrentLevel = 2;
              } else if( resp.data.data.vipName == 'VIP3') {               
                this.vipCurrentLevel = 3;
              } else if( resp.data.data.vipName == 'VIP4') {               
                this.vipCurrentLevel = 4;
              } else if( resp.data.data.vipName == 'VIP5') {              
                this.vipCurrentLevel = 5;
              } else if( resp.data.data.vipName == 'VIP6') {              
                this.vipCurrentLevel = 6;
              } else {
                this.vipCurrentLevel = 7;
              };
              this.vipIndex = this.vipCurrentLevel;  
              this.userName = decodeURI(this.$cookie.get('truename'));  //在这里重新decode userName 防止会乱码的问题
              this.loading = false;
              this.getLocationLevel();
              
          }).catch((error)=>{
              this.loading= false;
              if( error.response.status == 100006) {
                 //如果没有购买 但是登录了 使用默认值 等级 0  普通会员
                  this.isLogin = true;
                  this.userName = decodeURI(this.$cookie.get('truename'));  //在这里重新decode userName 防止会乱码的问题
                  this.$emit('getCurrentLevel',0,this.vipLevelArr,this.userName,0,this.discountPrice);   
              } else {
                  this.$emit('getCurrentLevel',10,this.vipLevelArr,this.userName,0,this.discountPrice);  //表示登录失败了 或者是没有登录
                  if ( error.response.data.status == 401) {
                    this.$notify({
                      title: '',
                      message: '提示，您还未登录',
                      type: 'info'
                    });
                  } else {
                    this.$notify({
                      title: '提示',
                      message: '系统繁忙，请稍后再试',
                      type: 'info'
                    });
                  }
                  
              }
                 
          });
        },


        //表示的是 点击事件上传
        getMemberVip(index) {
          if( this.hasClick == false && this.isLogin == false ) {   //未点击  未登录的状态
            this.vipIndex = index;
            this.hasClick = true;
            this.$emit('getMemberVip',this.vipIndex,this.vipLevelArr,false);  //点击登录状态
          } else if ( this.hasClick == false && this.isLogin == true) { //未点击 登录
              if ( this.vipIndex == index - 1 ) {  //如果点击的是 同一个框   则取消选中的效果
                  this.vipIndex = 9;  
                  this.$emit('getMemberVip',this.vipIndex,this.vipLevelArr,true);  //点击登录状态
                  return false
              } else {
                  this.vipIndex = index - 1;
                  this.$emit('getMemberVip',this.vipIndex,this.vipLevelArr,true);  //点击登录状态
              }
              this.hasClick = true;
          } else if ( this.hasClick == true && this.isLogin == false) {  //点击  未登录的状态
              if ( this.vipIndex == index ) {  //如果点击的是 同一个框   则取消选中的效果
                  this.vipIndex = 9;  
                  this.$emit('getMemberVip',this.vipIndex,this.vipLevelArr,false);  //点击登录状态
                  return false
              } else {
                  
                  this.vipIndex = index;
                  this.$emit('getMemberVip',this.vipIndex,this.vipLevelArr,false);  //点击登录状态
              }
             
          } else if( this.isLogin == true && this.hasClick == true) { //点击  登录的状态
              if ( this.vipIndex == index - 1 ) {  //如果点击的是 同一个框   则取消选中的效果
                  this.vipIndex = 9;  
                  this.$emit('getMemberVip',this.vipIndex,this.vipLevelArr,true);  //点击登录状态
                  return false
              } else {
                  this.vipIndex = index - 1;
                  this.$emit('getMemberVip',this.vipIndex,this.vipLevelArr,true);  //点击登录状态
              }
          }

          
          
        },

    
        //关闭登录弹框
        closeMini ( ) {
          this.showMini = false;
          this.getCurrentLevel();
        }


      },

      filters: {
        getTimeType (val) {
          var date = new Date(val);
          var year = (date.getFullYear()).toString();
          var month = (date.getMonth() + 1).toString();
          var day  = (date.getDate()).toString();
          month.length == 1 ? month = '0' + month : '';
          day.length == 1 ? day = '0' + day : '';
          return  year + '.' + month + '.' + day

        }
      }

    }
</script>

<style scoped lang='scss'>
  .vips {
      background: #fff;


      .notes {
          height: 50px;
          line-height: 18px;
          background: #fff;
          font-size: 12px;
          text-indent: 60px;
          color: #999;

      }

      .title {
          margin: 15px auto 20px;
          padding-top: 15px;
          font-size: 15px;
          text-indent: 30px;
          color: #333;
      }

      .current-card {
          margin-bottom: 20px;
          text-indent: 55px;
          font-size: 12px;
          color: #333;

          .effective {
            font-size: 12px;
            color: #cdcdcd;
            
          }
      }

      .login-btn {
          margin-bottom: 20px;
          text-indent: 55px;
          text-decoration: underline;
          font-size: 12px;
          color: #3db1fa;
          cursor: pointer;
        


      }

      .vip-list {
          margin: 0 auto;
          clear: both;
          width: 1060px;
          background: #fff;
          overflow: hidden;

          .vip {
            float: left;
            margin: 0 14px 16px 0;
            position: relative;
            width: 198px;
            height: 110px;
            border:  1px solid #e8e8e8;
            cursor: pointer;

              .num {
                position: absolute;
                top: 22px;
                left: 24px;
                font-size: 14px;
                color: #666;
              }

              .all-num {
                position: absolute;
                top: 41px;
                left: 24px;
                font-size: 14px;
                color: #666;
              }

              .vip-level {
                position: absolute;
                top: 72px;
                left: 24px;
                width: 150px;
                font-size: 14px;
                color: #333; 

                span {
                  float: right;
                  color: #fe2200;
                }

              }
          }


          .checked {
            border: 1px solid #3db1fa;
          }

          .disabled {
            background: #f5f5f5;
            cursor: default;
          }

          .current_bg {
            
            background: url(../assets/img/bg_vip.png) no-repeat right top,#f5f5f5;
            background-size: 54px;
            cursor: default;
            
          }
            
    }

  }    

</style>


