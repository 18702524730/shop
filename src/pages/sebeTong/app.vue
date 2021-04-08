<template>
  <div id="app">
    <sebe-header :userName="userName" :title="'购买拾贝通'"></sebe-header>
    <div class='memberVip'>
      <h4 class='list-title'>拾贝通 <!-- <span @click='dialogVisible=true'>推荐套餐</span> --></h4>
      <div class='vip-body'>
        <vip-list :titleName ='titleName'  ref='vipList' :restAmount='rest_amount' :@NotCheck='NotCheck' @getVipList='getVipList'  @getCurrentLevel='getCurrentLevel'  @getMemberVip='getMemberVip' ></vip-list>
        <div class="evidences">
          <h4 class='title'>存证服务包</h4>
            <div v-loading='evidence_loading'>
              <div class='evidence-list'>
                <div class="evidence"   :class=" index== evidenveIndex ? 'checked' : '' " v-for='(e,index) in evidence_arr' @click='getEnvidence(index)' :id=" e.id">
                  <p class="num">存证次数 :&nbsp;<span>{{e.name.substr(6,e.name.length-1)}}</span></p>
                  <span class="paid-money">¥&nbsp;{{e.standardPrice}}</span>
                </div>
              </div>
              <p class="notes">注: 存证包含网页存证及文件存证 , 原价2元/次 , 不含续费</p>
            </div>
        </div>

        <div class="professional-reports">
          <h4 class='title'>专业报告</h4>
          <div v-loading= 'report_loading'>
            <div class='report_list'  v-for=" (v,index) in report_arr" >
              <!-- <div class="report"  v-if=' index == 0' >
                <div class='report-detail' :class=" current_report_f_index == 0 ? 'checked' : '' "  @click='getReport(index)'>
                  <span class="name">{{v.name}}</span>
                  <p class='prize'>单价&nbsp;:&nbsp<span>¥{{v.standardPrice}}</span></p>
                </div>
                <p class="btn">
                  <span class='prev-btn' :class=" report_f == 1 ? 'checked' : ''" @click.stop='getReduce(index)'>-</span>
                  <input type='text' @blur.stop.self='getBlurF'   class='value-btn' v-if='index == 0' v-model='report_f'>
                  <span class='next-btn' @click.stop.self='getIncrease(index)'>+</span>
                </p>
              </div>
              <div class="report"  v-if=' index == 1' >
                <div class='report-detail' :class=" current_report_s_index == 1 ? 'checked' : '' "  @click='getReport(index)'>
                  <span class="name">{{v.name}}</span>
                  <p class='prize'>单价&nbsp;:&nbsp<span>¥{{v.standardPrice}}</span></p>
                </div>
                <p class="btn">
                  <span class='prev-btn' :class=" report_s == 1 ? 'checked' : ''" @click.stop='getReduce(index)'>-</span>
                  <input type='text'  @blur.stop.self='getBlurS' class='value-btn' v-if='index == 1' v-model='report_s'>
                  <span class='next-btn' @click.stop.self='getIncrease(index)'>+</span>
                </p>

              </div> -->
              <div class="report"  v-if=' index == 2' >
                <div class='report-detail' :class=" current_report_t_index == 2 ? 'checked' : '' "  @click='getReport(index)'>
                  <span class="name">{{v.name}}</span>
                  <p class='prize'>单价&nbsp;:&nbsp<span>¥{{v.standardPrice}}</span></p>
                </div>
                <p class="btn">
                  <span class='prev-btn' :class=" report_t == 1 ? 'checked' : ''" @click.stop='getReduce(index)'>-</span>
                  <input type='text' @blur.stop.self='getBlurT'  class='value-btn'  v-if='index == 2' v-model='report_t'>
                  <span class='next-btn' @click.stop.self='getIncrease(index)'>+</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='order'>
        <p class="prize">价格总计:&nbsp;<span>¥{{need_paid}}</span></span></p>
        <p class='paid'>实付金额:&nbsp;<span>¥{{fact_paid}}</span></p>
        <button  v-loading.fullscreen.lock="fullscreenLoading"  class='btn' :class=" need_paid == 0 || vipCurrentLevel == 7 ? 'disabled' : '' "  @click='getOrder'>{{order_btn_message}}</button>
      </div>

    </div>
    <customer-service :cartNum='cartNum'></customer-service>
    <sebe-footer></sebe-footer>
    <mini-login :showMini='showMini' @closeMini='closeMini'></mini-login>
    <el-dialog
      custom-class="type-dialog"
      title="请选择行业"
      :visible.sync="dialogVisible">
      <el-radio class="radio" v-model="radio"  label="1">选择服装行业</el-radio>
      <el-radio class="radio" disabled v-model="radio" label="2">更多行业即将推出</el-radio>
    <span slot="footer" class="dialog-footer">
    <el-button class='btn-sure' type="primary" @click="goToType">确 定</el-button>
    <el-button lass='btn-cancel' @click="dialogVisible = false">取 消</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import $ from 'jquery'
  import Filters from 'assets/filters.js'
  import ElementUI from 'element-ui'
  import 'element-ui/lib/theme-chalk/index.css';
  import sebeHeader from 'components/HeaderSm.vue'
  import sebeFooter from 'components/Footer.vue'
  import customerService from 'components/CustomerService.vue'
  import miniLogin from 'components/miniLogin.vue'
  import vipList from 'components/vipList.vue'
  import Lib from 'assets/Lib.js'
  const indexUrl = CONFIG.indexUrl;
  const payUrl = CONFIG.payUrl;

  export default {
      components: {
        sebeHeader,
        sebeFooter,
        vipList,
        customerService,
        miniLogin
      },

      data () {
          return {
              trade_list_api: './productweb/findShopBybusinclassType.htm',// 表示获取商品的的 接口
              order_api: './cartWeb/nowPlaceOrderCombine.htm',  //下单接口
              titleName: '拾贝VIP-管家',
              userName: '', //表示的是用户名
              current_level: 0, //表示的是当前的等级
              evidence_loading: false, //表示的是存证的加载状态
              report_loading: false, //表示的是存证的加载状态
              fullscreenLoading: false,

              //列表数组 用来渲染页面
              vipLevelArr: [],  //vip的数组
              evidence_arr: [], // 存证的数组
              report_arr: [],   // 公司的报告的数组的

              // dialogFormVisible: false, // 选择类别的弹框 的状态 默认为1
              vip_num: 0,           //表示的购买vip商品的数量
              evidence_num: 1,      //表示的是存证包的数量
              report_f: 1,          //公司的订单的数量 report 企业知识
              r_f_num: 1,           //用来表示公司得行业的存证的数量  用来页面之间计算
              report_s: 1,          //行业的订单的数量 report 近似商标
              r_s_num: 1,           //用来表示公司得行业的存证的数量  用来页面之间计算
              report_t: 1,          //电商的订单的数量 report 电商监测
              r_t_num: 1,           //用来表示公司得行业的存证的数量  用来页面之间计算
              amount: 45,           //表示商标最多可以购买 默认上线为45
              rest_amount: 41,      //表示剩余的总数


              // 表示的是 下单传递的参数
              order_arr: [],        //表示的是当前购买的产品
              vip_obj: {},          //vip参数
              evidence_obj: {},     //存证下单要传递的参数
              report_f_obj: {},     // report 企业知识 传递的参数
              report_s_obj: {},     // report 近似商标 传递的参数
              report_t_obj: {},     // report 电商监测 传递的参数

              //表示是否要传递下单的参数  5个数组  true 表示可以传  false  不传递
              vipSend: true,        //vip
              evidenceSend: true,   //evidence
              report_f_send: true,  //report_f
              report_s_send: true,  //report_s
              report_t_send:true,   //report_t

              evidenveIndex: 0,     //表示的 选中的是 默认的值
              current_report_f_index: 5,  //用来判断 点击是否是同一个  report_f 的 状态标识
              current_report_s_index: 5,  //用来判断 点击是否是同一个  report_s 的 状态标识
              current_report_t_index: 5,  //用来判断 点击是否是同一个  report_t 的 状态标识


              //商品的价格
              //表示的是默认的价格
              vipPrimaryValue: 0, //表示的是购买vip的的价格
              evidenceValue: 0,   //表示的是  存证的默认值
              report_f_prize: 0,  // 表示的是 report_f 的单价  默认为0
              report_s_prize: 0,  // 表示的是 report_s 的单价  默认为0
              report_t_prize: 0,  // 表示的是 report_t 的单价  默认为0

              report_f_value: 0,  // report 企业知识 的总价格
              report_s_value: 0,  // report 近似商标 的总价格
              report_t_value: 0,  // report 电商监测 的总价格

              report_f_status: true, //表示的是当前的 加减按钮的状态
              report_s_status: true,  //表示的是当前的 加减按钮的状态
              report_t_status: true,  //表示的是当前的 加减按钮的状态

              order_btn_message: '立即下单',   //表示的是下单按钮的值
              showMini: false,                //表示的 是登录迷你框
              defaultBtn: true,               // 预防重复点击的  order 按钮
              regTest: /^[1-9]{1,}\d*$/,       //表示匹配的问题
              isNotCheck: true,
              dialogVisible: false,
              radio: '1'

        }
      },
      mounted () {
         this.init(); //初始化
      },

      watch: {
        vipSend () { //监听 vip当前的数量 选中的话 true 数量为1  false 数量为0
          if ( this.vipSend == true ) {
            this.vip_num = 1
          } else {
            this.vip_num = 0
          }
          var amount = (this.vip_num - 0) + (this.evidence_num - 0) + ( this.r_f_num - 0 ) + ( this.r_s_num - 0) + ( this.r_t_num - 0);
          this.rest_amount = this.amount - amount;
          if ( this.rest_amount < 0 ) {
            this.$notify({
              title:'警告',
              message: '一次最多只能购买45件商品',
              type: 'warning'
            });
            this.vipSend = false;
            this.isNotCheck = false;
            this.vip_obj = {};
            this.vipPrimaryValue = 0;
            this.$refs.vipList.getNocheck();
            return false;
          }

        },

        evidenceSend () {   //监听 存证当前的数量 true 数量为1  false 数量为0
          if ( this.evidenceSend == true ) {
            this.evidence_num = 1
          } else {
            this.evidence_num = 0
          }
        },
      },

      computed: {
        need_paid () {  //购买商品的总价格
          var paid = /*this.report_f_value +
                 this.report_s_value +*/
                 this.report_t_value +
                 this.evidenceValue +
                 this.vipPrimaryValue;
          return paid.toFixed(2);
        },

        fact_paid () {   //实际付款金额
          if ( this.vipPrimaryValue > 0 ) {
              var disCountPrice = this.vipPrimaryValue - this.discountPrice;  // 减去折扣金额
          } else {
              var disCountPrice = this.vipPrimaryValue
          }
          var paid = /*this.report_f_value +
                 this.report_s_value +*/
                 this.report_t_value +
                 this.evidenceValue +
                 disCountPrice;
          return paid.toFixed(0) + '.00';
        }

      },

      methods: {

        //表示初始化
        init () {
          this.getEnvidenceList(); //获取存证列表
          this.getReportList();    //获取报告列表
        },

        //获取列表  vip
        getVipList(vipLevelArr) {
          this.vipLevelArr = vipLevelArr;

        },

        //表示的是获取等级 level 实际等级 vipLevelArr vip列表数组  userName 用户名  discountPrice 折扣金额
        getCurrentLevel (level,vipLevelArr,userName,discountPrice) {
          this.userName = userName;  //向头部传递用户名
          this.discountPrice = discountPrice;
          this.current_level = level;
          if( level == 7 ) {
            this.vipSend = false;   //若是当前的等级为7  则 将vip价格和数量初始化为 0
            this.vip_num = 0;
            this.vipPrimaryValue = 0;
            return false;
          };
          if( level < 7 ) {   //能够正常的购买商品 默认购买当前等级的下一等级
            level++;
            this.vipSend = true;
            this.vip_num = 1;
            var obj = {  //初始化传递给下单的 vip参数
                'shopProductId': this.vipLevelArr[level].shopProductId ,
                'shopProductTypeIdProductType': this.vipLevelArr[level].shopProductTypeIdProductType ,
                'shopProductTypeIdServiceType': this.vipLevelArr[level].shopProductTypeIdServiceType,
                'number': 1
              };
            Object.assign( this.vip_obj , obj );
            this.vipPrimaryValue = this.vipLevelArr[level].standardPrice - 0 ;
          }
          if ( level == 10 ) { //如果等级=10  表示未登录  让价格初始化为 0  10 表示的是 用户未登录 登录失败
            this.vipPrimaryValue = 0;
            this.vipSend = false;
            return false
          }

        },

        //表示的是 点击vip当前的函数
        getMemberVip (index,vipLevelArr,state) {
          this.vipLevelArr = vipLevelArr;
          if( index > 7 ) {
            this.vipPrimaryValue = 0;
            this.vip_obj = {};
            this.vipSend = false;
            return false
          }
          this.vipCurrentIndex = index;
          this.vipSend = true;
          this.vip_obj = {};
          if ( state == true) {
            this.vipPrimaryValue = this.vipLevelArr[index + 1].standardPrice - 0;
            var obj = {
                'shopProductId': this.vipLevelArr[index + 1].shopProductId ,
                'shopProductTypeIdProductType': this.vipLevelArr[index + 1].shopProductTypeIdProductType ,
                'shopProductTypeIdServiceType': this.vipLevelArr[index + 1].shopProductTypeIdServiceType,
                'number': 1
            };
          } else {
            this.vipPrimaryValue = this.vipLevelArr[index].standardPrice - 0;
            var obj = {
                'shopProductId': this.vipLevelArr[index].shopProductId ,
                'shopProductTypeIdProductType': this.vipLevelArr[index].shopProductTypeIdProductType ,
                'shopProductTypeIdServiceType': this.vipLevelArr[index].shopProductTypeIdServiceType,
                'number': 1
            };
          }


          Object.assign( this.vip_obj , obj );
          this.vipSend = true;
        },


        //获取当前的存证
        getEnvidenceList () {
          this.getEnvidence_loading = true;
          this.$http.get(this.trade_list_api + '?businclassType=10').then((resp)=>{
            this.getEnvidence_loading = false;
            this.discountPrice = resp.data.discountPrice;  //表示折扣的钱
              this.evidence_arr  = resp.data.data;
              this.evidenceValue = (this.evidence_arr && this.evidence_arr.length && this.evidence_arr[0].standardPrice-0) || 0;
              this.evidence_obj = {
                'shopProductId': this.evidence_arr[0].shopProductId ,
                'shopProductTypeIdProductType': this.evidence_arr[0].shopProductTypeIdProductType,
                'shopProductTypeIdServiceType': this.evidence_arr[0].shopProductTypeIdServiceType,
                'number': 1
              };
          }).catch((error)=> {
              this.getEnvidence_loading = false;
              this.$notify({

                  title: '警告',
                  message: error.response.data.msg,
                  type: 'warning'
                });
          });

        },

        //表示的是 点击的  存证的 事件
        getEnvidence (index) {
          if( index == this.evidenveIndex) {  //点击同一个则取消状态
            this.evidenceValue = 0;   //总价为0
            this.evidence_num = 0;    //数量为0
            this.evidenveIndex = 9;   //9 表示未被选中 和checked 类名的绑定有关系
            this.evidence_obj = {};   //总价为0
            this.evidenceSend = false; //不传递当前的参数
            return false
          }
          this.evidenveIndex = index;
          this.evidence_num = 1;
          var amount = (this.vip_num - 0) + (this.evidence_num - 0) + ( this.r_f_num - 0 ) + ( this.r_s_num - 0) + ( this.r_t_num - 0);
          this.rest_amount = this.amount - amount;
          if ( this.rest_amount < 0 ) {
            this.$notify({
              title:'警告',
              message: '一次最多只能购买45件商品',
              type: 'warning'
            });
            this.evidenceValue = 0;   //总价为0
            this.evidence_num = 0;    //数量为0
            this.evidenveIndex = 9;   //9 表示未被选中 和checked 类名的绑定有关系
            this.evidence_obj = {};   //总价为0
            this.evidenceSend = false; //不传递当前的参数
            return false;
          }
          this.evidenceValue = Number(this.evidence_arr[index].standardPrice);
          this.evidence_obj = {};
          var obj =  {
                'shopProductId': this.evidence_arr[index].shopProductId ,
                'shopProductTypeIdProductType': this.evidence_arr[index].shopProductTypeIdProductType,
                'shopProductTypeIdServiceType': this.evidence_arr[index].shopProductTypeIdServiceType,
                'number': 1
              };
          Object.assign( this.evidence_obj , obj);
          this.evidenceSend = true;
        },

        //获取报告 列表

        getReportList () {
          this.report_loading = true;
          this.$http.get(this.trade_list_api + '?businclassType=8').then((resp)=>{
              this.report_loading = false;
              this.report_arr = resp.data.data;
              //初始化 报告的单价和 数量 和 向下单传递的参数
              this.report_f_value = this.report_arr[0].standardPrice - 0 ;  //报告1的总价格 的初始化
              this.report_f_prize = this.report_arr[0].standardPrice - 0 ;  //报告1的单价 的初始化
              this.report_f_obj = { //初始化报告1传递参数
                'shopProductId': this.report_arr[0].shopProductId ,
                'shopProductTypeIdProductType': this.report_arr[0].shopProductTypeIdProductType,
                'shopProductTypeIdServiceType': this.report_arr[0].shopProductTypeIdServiceType ,
                'number': 1

              };
              this.report_s_value = this.report_arr[1].standardPrice - 0;  //报告2的总价格的初始化
              this.report_s_prize = this.report_arr[1].standardPrice - 0;  //报告2的单价的初始化
              this.report_s_obj = {  //初始化报告2传递参数
                'shopProductId': this.report_arr[1].shopProductId ,
                'shopProductTypeIdProductType': this.report_arr[1].shopProductTypeIdProductType,
                'shopProductTypeIdServiceType': this.report_arr[1].shopProductTypeIdServiceType ,
                'number': 1
              };
              this.report_t_value = this.report_arr[2].standardPrice - 0;  // 报告3的总价格的初始化的初始化
              this.report_t_prize = this.report_arr[2].standardPrice - 0;  // 报告2的单价的初始化
              this.report_t_obj = { //初始化报告3传递参数
                'shopProductId': this.report_arr[2].shopProductId ,
                'shopProductTypeIdProductType': this.report_arr[2].shopProductTypeIdProductType,
                'shopProductTypeIdServiceType': this.report_arr[2].shopProductTypeIdServiceType ,
                'number': 1
              };
          }).catch((error)=> {
              this.report_loading = false;
              this.$notify({
                  title: '警告',
                  message: error.data.data.msg,
                  type: 'warning'
                });
          });

        },

        //表示的是 报告的点击的事件  减少
        getReduce (index) {
          if ( index == 0 ) {
            if ( !this.report_f_status  ) {
              return false
            }
            this.report_f - 0 <= 1 ? ' ' : this.report_f--;
            this.r_f_num = this.report_f;
            var obj = {
              'number': this.report_f
            };
            Object.assign( this.report_f_obj , obj);
            this.report_f_value = this.report_f_prize*Number(this.report_f_obj.number);
          } else if ( index == 1 ) {
            if ( !this.report_s_status  ) {
              return false
            }
            this.report_s - 0 <= 1 ? ' ' : this.report_s--;
            this.r_s_num = this.report_s;
            var obj = {
              'number': this.report_s
            };
            Object.assign( this.report_s_obj , obj);
            this.report_s_value = this.report_s_prize*Number(this.report_s_obj.number);
          } else if ( index == 2) {
            if ( !this.report_t_status  ) {
              return false
            }
            this.report_t - 0 <= 1 ? ' ' : this.report_t--;
            this.r_t_num = this.report_t;
            var obj = {
              'number': this.report_t
            };
            Object.assign( this.report_t_obj , obj);
            this.report_t_value = this.report_t_prize*Number(this.report_t_obj.number);
          }
          var amount = (this.vip_num - 0) + (this.evidence_num - 0) + ( this.report_f - 0 ) + ( this.report_s - 0) + ( this.report_t - 0);
          this.rest_amount = this.amount - amount;
        },

        //表示的是 点击的事件  增加
        getIncrease (index) {
          var amount = (this.vip_num - 0) + (this.evidence_num - 0) + ( this.r_f_num - 0 ) + ( this.r_s_num - 0) + ( this.r_t_num - 0);
          this.rest_amount = this.amount - amount;
          if ( index == 0 ) {
            if ( !this.report_f_status  ) {
              return false
            }

            if (  this.rest_amount > 0 ) {
                this.report_f++;
                this.r_f_num = this.report_f;
            } else {
              this.$notify({
                title: '警告',
                message: '最多一次只能购买45件商品',
                type: 'warning'
              });
            }
            var obj = {
              'number': this.report_f
            };
            Object.assign( this.report_f_obj , obj);
            this.report_f_value = this.report_f_prize*Number(this.report_f_obj.number);

          } else if ( index == 1 ) {
            if ( !this.report_s_status  ) {
              return false
            }
            if (  this.rest_amount > 0 ) {
                this.report_s++;
                this.r_s_num = this.report_s;
            } else {
              this.$notify({
                title: '警告',
                message: '最多一次只能购买45件商品',
                type: 'warning'
              });
            }
            var obj = {
              'number': this.report_s
            };
            Object.assign( this.report_s_obj , obj);
            this.report_s_value = this.report_s_prize*Number(this.report_s_obj.number);

          } else if ( index == 2) {
            if ( !this.report_t_status  ) {
              return false
            }
            if (  this.rest_amount > 0 ) {
                this.report_t++;
                this.r_t_num = this.report_t;
            } else {
              this.$notify({
                title: '警告',
                message: '最多一次只能购买45件商品',
                type: 'warning'
              });
            }
             var obj = {
              'number': this.report_t
            };
            Object.assign( this.report_t_obj , obj);
            this.report_t_value = this.report_t_prize*Number(this.report_t_obj.number);

          }
        },

        //表示的是 表单的失去焦点事件
        getBlurF () {
            var obj = {  //  先初始化当前的 数据  用来给后面传递参数
                'shopProductId': this.report_arr[0].shopProductId ,
                'shopProductTypeIdProductType': this.report_arr[0].shopProductTypeIdProductType,
                'shopProductTypeIdServiceType': this.report_arr[0].shopProductTypeIdServiceType ,
                'number': 1
            };
            if ( this.report_f_status ) {
              this.report_f_send = true;
              this.r_f_num = this.report_f;
              this.getAmountComputed();
              if (!this.getAmountComputed()) {
                this.report_f = 1;
                this.r_f_num = 1;
              }
              obj.number = this.r_f_num;    //这里是传递 报告1下单的数量 初始化单价和价格
              this.report_f_obj = {},
              Object.assign(this.report_f_obj , obj );
              this.report_f_prize = this.report_arr[0].standardPrice;
              this.report_f_value = this.report_f_prize*Number(this.report_f_obj.number);
            } else {
              this.r_f_num = 0;
              this.report_f_send = false;
              this.getAmountComputed();
            }

        },

        getBlurS () {
          var obj = {  //  先初始化当前的 数据  用来给后面传递参数
                'shopProductId': this.report_arr[1].shopProductId ,
                'shopProductTypeIdProductType': this.report_arr[1].shopProductTypeIdProductType,
                'shopProductTypeIdServiceType': this.report_arr[1].shopProductTypeIdServiceType ,
                'number': 1
            };
          if ( this.report_s_status ) {
              this.r_s_num = this.report_s;
              this.report_s_send = true;
              this.getAmountComputed();
              if (!this.getAmountComputed()) {
                this.report_s = 1;
                this.r_s_num = 1;
              }
              obj.number = this.r_s_num;    //这里是传递 报告1下单的数量 初始化单价和价格
              this.report_s_obj = {},
              Object.assign(this.report_s_obj , obj );
              this.report_s_prize = this.report_arr[1].standardPrice;
              this.report_s_value = this.report_s_prize*Number(this.report_s_obj.number);
            } else {
              this.r_s_num = 0;
              this.report_s_send = false;
              this.getAmountComputed();
            }

        },

        getBlurT () {
            var obj = {  //  先初始化当前的 数据  用来给后面传递参数
                'shopProductId': this.report_arr[2].shopProductId ,
                'shopProductTypeIdProductType': this.report_arr[2].shopProductTypeIdProductType,
                'shopProductTypeIdServiceType': this.report_arr[2].shopProductTypeIdServiceType ,
                'number': 1
            };
            if ( this.report_t_status ) {
              this.r_t_num = this.report_t;
              this.report_t_send = true;
              this.getAmountComputed();
              if (!this.getAmountComputed()) {
                this.report_t = 1;
                this.r_t_num = 1;
              }
              obj.number = this.r_t_num;    //这里是传递 报告1下单的数量 初始化单价和价格
              this.report_t_obj = {},
              Object.assign(this.report_t_obj , obj );
              this.report_t_prize = this.report_arr[2].standardPrice;
              this.report_t_value = this.report_t_prize*Number(this.report_t_obj.number);
            } else {
              this.r_t_num = 0;
              this.report_t_send = false;
              this.getAmountComputed();
            }
        },

        //表示计算数量的函数
        getAmountComputed () {
          if ( !this.regTest.test(this.report_f) ) {
                this.report_f = 1;
                this.r_f_num = this.report_f;

          }
          if ( !this.report_f_status ) {
                this.r_f_num = 0;
          }
          if ( !this.regTest.test(this.report_s) ) {
              this.report_s = 1;
              this.r_s_num = this.report_s;

          }
          if ( !this.report_s_status ) {
                this.r_s_num = 0;
          }
          if ( !this.regTest.test(this.report_t)  ) {
              this.report_t = 1;
              this.r_t_num = this.report_t;
          }
          if ( !this.report_t_status ) {
                this.r_t_num = 0;
          }
          var amount = (this.vip_num - 0) + (this.evidence_num - 0) + ( this.r_f_num - 0 ) + ( this.r_s_num - 0) + ( this.r_t_num - 0);
          this.rest_amount = this.amount - amount;
          if (this.rest_amount < 0 ) {
              this.$notify({
                  title: '提醒',
                  message: '最多一次只能购买45件商品',
                  type: 'warning'
              });
              return false
          } else {
            return true
          }
        },


        //表示的是报告的点击的事件  index: 0 企业知识 报告1 || 1 近似商标 报告2 || 2 电商监测报告3
        getReport (index) {
          var obj = {  //  先初始化当前的 数据  用来给后面传递参数
                'shopProductId': this.report_arr[index].shopProductId ,
                'shopProductTypeIdProductType': this.report_arr[index].shopProductTypeIdProductType,
                'shopProductTypeIdServiceType': this.report_arr[index].shopProductTypeIdServiceType ,
                'number': 1
          };
          if( index == 0) {  //默认是选中的  this.report_f_status 表示的当前是否需要传递   默认是true false 表示不选中
            var amount = (this.vip_num - 0) + (this.evidence_num - 0) + ( this.report_f - 0 ) + ( this.r_s_num - 0) + ( this.r_t_num - 0);
            this.rest_amount = this.amount - amount;
            if (this.rest_amount <0 ) {
              this.$notify({
                title: '警告',
                message: '一次最多只能购买45件商品',
                type: 'warning'
              });
              return false
            }
            this.report_f_status = !this.report_f_status;
            if( this.current_report_f_index != index) {
                this.r_f_num  = 0;
                this.current_report_f_index = 0;
                this.report_f_value = 0;
                this.report_f_prize = 0;
                this.report_f_send = false;  //表示未被选中
                return false
            }

            obj.number = this.report_f;    //这里是传递 报告1下单的数量 初始化单价和价格
            this.r_f_num  = this.report_f;
            this.report_f_obj = {},
            Object.assign(this.report_f_obj , obj );
            this.report_f_prize = this.report_arr[0].standardPrice;
            this.report_f_value = this.report_f_prize*Number(this.report_f_obj.number);
            this.current_report_f_index = 5;  //表示被选中
            this.report_f_send = true;
          } else if ( index == 1) {
            var amount = (this.vip_num - 0) + (this.evidence_num - 0) + ( this.r_f_num - 0 ) + ( this.report_s - 0) + ( this.r_t_num - 0);
            this.rest_amount = this.amount - amount;
            if (this.rest_amount <0 ) {
              this.$notify({
                title: '警告',
                message: '一次最多只能购买45件商品',
                type: 'warning'
              });
              return false
            }
            this.report_s_status = !this.report_s_status;
            this.r_s_num  = 0;
             if( this.current_report_s_index != index) {
                this.current_report_s_index = 1;
                this.report_s_value = 0;
                this.report_s_prize = 0;
                this.report_s_send = false;  //表示未被选中
                return false
              }
              obj.number = this.report_s; //这里是传递 报告2下单的数量  初始化单价和价格
              this.r_s_num  = this.report_s;
              this.report_s_obj = {},
              Object.assign(this.report_s_obj , obj );
              this.report_s_prize = this.report_arr[1].standardPrice;
              this.report_s_value = this.report_s_prize*Number(this.report_s_obj.number);
              this.current_report_s_index = 5;  //表示被选中
              this.report_s_send = true;
            } else if ( index == 2) {
              var amount = (this.vip_num - 0) + (this.evidence_num - 0) + ( this.r_f_num - 0 ) + ( this.r_s_num - 0) + ( this.report_t - 0);
              this.rest_amount = this.amount - amount;
              if (this.rest_amount <0 ) {
                this.$notify({
                  title: '警告',
                  message: '一次最多只能购买45件商品',
                  type: 'warning'
                });
                return false
              }
              this.report_t_status = !this.report_t_status;
              this.r_t_num  = 0;
                if( this.current_report_t_index != index) {
                  this.current_report_t_index = 2;
                  this.report_t_value = 0;
                  this.report_t_prize = 0;
                  this.report_t_send = false;  //表示未被选中
                  return false
              }
              obj.number = this.report_t;    //这里是传递 报告3下单的数量  初始化单价和价格
              this.r_t_num  = this.report_t;
              this.report_t_obj = {}
              Object.assign(this.report_t_obj , obj );
              this.report_t_prize = this.report_arr[2].standardPrice;
              this.report_t_value = this.report_t_prize*Number(this.report_t_obj.number);
              this.current_report_t_index = 5;   //表示被选中
              this.report_t_send = true;
            }
          },

         //表示的是登录


        closeMini () {
          this.$refs.vipList.getCurrentLevel();
          this.showMini = false;

        },

        //表示的是获取订单
        getOrder () {
          if ( this.prize_number > 45 ) {  //判断购买数量是否大于45
              return
          };
          if( !this.userName ) {   //判断用户名是否存在
            this.showMini = true;
            return false
          }

          if( !this.defaultBtn ) { //避免多次点击
            return false
          }

          if( this.need_paid == 0 ) { //计算总价
            return false;
          }
          this.order_arr = [];

          this.order_btn_message = '请稍等...';
          if( this.vipSend == true ) {
              this.order_arr.push(this.vip_obj);
          };

          if( this.evidenceSend == true ) {
              this.order_arr.push(this.evidence_obj);
          };

          if( this.report_f_send == true ) {
              //this.order_arr.push(this.report_f_obj);
          };

          if( this.report_s_send == true ) {
              //this.order_arr.push(this.report_s_obj);
          };

          if( this.report_t_send == true ) {
              this.order_arr.push(this.report_t_obj);
          };
          this.defaultBtn = false;
          var _this = this;
          this.fullscreenLoading = true;   //全屏加载
          _this.$http.post(_this.order_api,_this.order_arr).then((resp)=> {
            this.fullscreenLoading = false;
            if ( resp.data.code == '0140000') {
              this.order_btn_message = '立即下单';
              this.$notify({
                  title: '警告',
                  message: resp.data.msg,
                  type: 'warning'
              });
            } else if( resp.data.code == '0100001' ) {
              this.showMini = true;
              this.$refs.vipList.getCurrentLevel();
              this.$notify({
                  title: '警告',
                  message: resp.data.msg,
                  type: 'warning'
              });
              this.order_btn_message = '立即下单';
            } else if ( resp.data.code == '0100002') {
              this.order_btn_message = '立即下单';

              this.showMini = true;
            } else if(resp.data.code == 'success') {
               location.href = 'pay.html' +'?order_sn=' + resp.data.data.payOrder[0].orderNum;
            } else {
              this.order_btn_message = '立即下单';
              this.$notify({
                  title: '提示',
                  message: '系统繁忙，请稍后再试',
                  type: 'warning'
              });
            }
            this.defaultBtn = true;
          }).catch((error)=> {
            this.defaultBtn = true;
            this.fullscreenLoading = false;
            if( resp.response.data.code == '0100001' ) {
              this.showMini = true;
              this.$refs.vipList.getCurrentLevel();
              this.order_btn_message = '立即下单';
              this.$notify({
                title: '警告',
                message: resp.data.data.msg,
                type: 'warning'
              })
            }  else {
              this.order_btn_message = '立即下单';
              this.$notify({
                  title: '警告',
                  message: "系统繁忙，请稍后再试",
                  type: 'warning'
              });
            }

          })
        },

        goToType () { //跳到服装行业
          // location.href = './pay.html?type='+ data.data.payOrder[0]['orderNum']
          location.href = './sebeTongClothing.html';
        }

      }

  }

</script>


<style lang="scss">
    #app {
        font-family: Microsoft YaHei;
        background: #f5f5f5;

        .memberVip {
          margin: 0 auto;
          max-width: 1170px;
          padding: 9px 0 15px 20px;
          clear: both;

          .list-title {
            width: 100%;
            height:86px;
            background: #fff;
            line-height: 86px;
            text-indent: 30px;
            text-align: left;
            font-size: 18px;
            color: #3db1fa;

                span {
                  margin-left: 14px;
                  font-size: 14px;
                  font-weight: normal;
                  text-decoration: underline;
                  cursor: pointer;

                }

          }

          .vip-body {
            width:100%;

            .vips {
              border-top: 1px solid #e8e8e8;
            }

            .evidences {
              background: #fff;
              border-top: 1px solid #e8e8e8;


                .notes {
                  height: 50px;
                  font-size: 12px;
                  text-indent: 60px;
                  color: #999;
                  background: #fff;

                }

                .title {
                    margin: 30px auto 20px;
                    font-size: 15px;
                    text-indent: 30px;
                    color: #333;
                }

                .current-card {
                    margin-bottom: 20px;
                    text-indent: 60px;
                    font-size: 12px;
                    color: #333;
                }

                .evidence-list {
                  margin: 0 auto;
                  clear: both;
                  width: 1060px;
                  overflow: hidden;

                  .evidence {
                    float: left;
                    cursor: pointer;
                    margin: 0 14px 16px 0;
                    position: relative;
                    width: 198px;
                    height: 90px;
                    border:  1px solid #e8e8e8;

                      .num {
                        position: absolute;
                        top: 23px;
                        left: 24px;
                        font-size: 14px;
                        color: #666;

                      }

                      .paid-money {
                        position: absolute;
                        top: 52px;
                        left: 26px;
                        font-size: 14px;
                        color: #fe2200;
                      }


                  }

                  .checked{
                    border: 1px solid #3db1fa;
                  }


              }

            }

            .professional-reports {
              padding-bottom: 15px;
              border-top: 1px solid #e8e8e8;
              border-bottom: 1px solid #e8e8e8;
              background: #fff;

              .title {
                    margin: 30px auto 20px;
                    font-size: 15px;
                    text-indent: 30px;
                    color: #333;
              }

              .report{
                position: relative;
                margin: 0 0 15px 55px;
                width: 548px;
                height: 48px;
                line-height: 48px;
                background: #fff;
                cursor: pointer;

                .report-detail {
                    position: relative;
                    width: 548px;
                    height: 48px;
                    border: 1px solid #3db1fa;
                    .name {
                      display: block;
                      position: absolute;
                      left: 26px;
                      width: 200px;
                      height: 100%;
                      font-size: 14px;
                      color: #3db1fa;
                      text-overflow:ellipsis;
                      white-space:nowrap;
                      overflow:hidden;
                    }

                    .prize {
                      position: absolute;
                      left: 286px;
                      height: 100%;
                      font-size: 14px;
                      color: #3db1fa;

                      span {
                        color: #3db1fa;
                      }
                    }

                }

                .checked {
                  border: 1px solid #cdcdcd;

                  .name {
                      display: block;
                      position: absolute;
                      left: 26px;
                      width: 200px;
                      height: 100%;
                      font-size: 14px;
                      color: #cdcdcd;
                      text-overflow:ellipsis;
                      white-space:nowrap;
                      overflow:hidden;
                    }

                    .prize {
                      position: absolute;
                      left: 286px;
                      height: 100%;
                      font-size: 14px;
                      color: #cdcdcd;

                      span {
                        color: #cdcdcd;
                      }
                    }
                }

                .btn {
                  clear: both;
                  position: absolute;
                  top: 8px;
                  right: 8px;
                  width: 109px;
                  height: 29px;
                  border: 1px solid #cdcdcd;

                  span {
                    display: block;
                    float: left;
                    width: 28px;
                    height: 28px;
                    line-height: 28px;
                    font-size: 16px;
                    text-align: center;
                    color: #cdcdcd;
                  }

                  .prev-btn  {
                    float: left;
                    border-right: 1px solid #cdcdcd;
                    cursor: pointer;
                    color: #333;

                  }

                  .value-btn {
                     float: left;
                     width: 50px;
                     height: 27px;
                     line-height: 27px;
                     text-align: center;
                     border: 0;
                     outline: 0;
                     color: #333;

                  }


                  .next-btn {
                    float: left;
                    border-left: 1px solid #cdcdcd;
                    cursor: pointer;
                    color: #333;
                  }

                  .checked {
                    border: 0;
                    outline: 0;
                    border-right: 1px solid #cdcdcd;
                    color: #cdcdcd;
                    cursor: default;
                  }
                }

              }




            }

          }

          .order {
            position: relative;
            margin: 0 auto;
            max-width:1170px;
            height: 200px;
            background: #fff;

            p {
              position: absolute;
              right: 0;
              width: 195px;
              color: #333;

            }

            .prize {
                top: 30px;
                font-size: 14px;

                span {
                  font-size: 14px;
                  font-weight: bolder;
                  color: #333;
                }
            }

            .paid {
              top: 55px;
              font-size: 14px;

              span {
                font-size: 14px;
                font-weight: bolder;
                color: #fe2200;
              }


            }

            .btn {
              position: absolute;
              top: 85px;
              right: 54px;
              width: 140px;
              height: 42px;
              font-size: 16px;
              color: #fff;
              background: #fe2200;
              border: 0;
              outline: 0;
              border-radius: 3px;

            }

            .disabled {
              color: #555;
              background: #ccc;
            }

          }


          .left-btn {
            float: left;
            margin-left: 30px;
            color: #fff;
            background-color: #20a0ff;
            border-color: #20a0ff
          }

          .right-btn {
            float: right;
            margin-right: 30px;
            color: #20a0ff;
            background-color: #20a0ff;
            border-color: #fff
          }

        }
    }
</style>
<style lang='scss'>
  .type-dialog {
    width: 386px;
    height: 217px;
  }

.el-dialog__header {
  padding: 30px 40px 0;
}

  .el-dialog__body {
    padding: 30px 40px;
  }

  .el-radio {
    margin-left: 20px;
  }

  .el-button {
    width: 140px;
    height: 46px;
    float: left;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
  }

  .btn-sure {
    float: left;
    margin: 0 18px 0 19px;
  }

  .btn-cancel {
    float: left;
  }


</style>
