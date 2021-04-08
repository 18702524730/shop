<template>
<!-- 下拉菜单 、展开 -->
<div class="navMenu" :indexurl="CONFIG.indexUrl">
  <p class="title">服务分类</p>
  <!-- v-show="showClass" -->
  <!-- <ul class="mainMenu" >
    <li class="menuli trademark-ser">
      <p class="nav_name">
        <a :href="CONFIG.indexUrl+'/service/tm.htm'" target="_blank" class="line">商标服务</i></a>
        <a :href="CONFIG.indexUrl+'/service/tm.htm'" target="_blank" class="main">商标注册</a>
        <a :href="CONFIG.indexUrl+'/service/tm.htm'" target="_blank" class="main">商标转让</a>
      </p>
      <div class="expand-con" >
        <ul class="expand-con-list" id="nav_left">
          <li>
            <h5>国内商标申请</h5>
            <div class="list">
              <a :href="CONFIG.indexUrl+'/products/1.htm'">国内商标极速申请</a>
              <a :href="CONFIG.indexUrl+'/products/2.htm'" target="_blank">国内商标续展</a>
              <a :href="CONFIG.indexUrl+'/products/3.htm'" target="_blank">国内商标变更</a>
              <a :href="CONFIG.indexUrl+'/products/4.htm'" target="_blank">国内商标许可</a>
              <a :href="CONFIG.indexUrl+'/products/5.htm'" target="_blank">国内商标转让</a>
              <a :href="CONFIG.indexUrl+'/products/6.htm'" target="_blank">国内补发商标注册证</a>
              <a :href="CONFIG.indexUrl+'/products/7.htm'" target="_blank">国内商标更正</a>
              <a :href="CONFIG.indexUrl+'/products/8.htm'" target="_blank">国内出具商标证明</a>
              <a :href="CONFIG.indexUrl+'/sebe/pages/selfRegister.html#/one'" target="_blank">国内商标自助注册</a>
            </div>
          </li>
          <li>
            <h5>国际商标申请</h5>
            <div class="list">
              <a :href="CONFIG.indexUrl+'/products/9.htm'">美国商标意向申请</a>
              <a :href="CONFIG.indexUrl+'/products/10.htm'">美国商标使用申请</a>
              <a :href="CONFIG.indexUrl+'/products/11.htm'">日本商标注册申请</a>
              <a :href="CONFIG.indexUrl+'/products/69.htm'">英国商标注册申请</a>
              <a :href="CONFIG.indexUrl+'/products/76.htm'">俄罗斯商标注册申请</a>
              <a :href="CONFIG.indexUrl+'/products/77.htm'">韩国商标注册申请</a>
              <a :href="CONFIG.indexUrl+'/products/105.htm'">法国商标注册申请</a>
              <a :href="CONFIG.indexUrl+'/products/106.htm'">欧盟商标注册申请</a>
            </div>
          <li>
            <h5>商标疑难服务</h5>
            <div class="list">
              <a :href="CONFIG.indexUrl+'/products/12.htm'">商标驳回复审申请</a>
              <a :href="CONFIG.indexUrl+'/products/13.htm'">商标异议申请</a>
              <a :href="CONFIG.indexUrl+'/products/14.htm'">商标撤三申请</a>
              <a :href="CONFIG.indexUrl+'/products/15.htm'">商标无效宣告申请</a>
              <a :href="CONFIG.indexUrl+'/products/16.htm'">商标不予注册复审答辩</a>
              <a :href="CONFIG.indexUrl+'/products/17.htm'">商标异议答辩</a>
              <a :href="CONFIG.indexUrl+'/products/18.htm'">商标撤三答辩</a>
              <a :href="CONFIG.indexUrl+'/products/19.htm'">商标无效宣告答辩</a>
            </div>
          </li>
        </ul>
      </div>
    </li>
    <li class="menuli patent-ser">
      <p class="nav_name">
        <a :href="CONFIG.indexUrl+'/service/tm.htm'" target="_blank" class="line">专利服务</i></a>
        <a :href="CONFIG.indexUrl+'/service/tm.htm'" target="_blank" class="main">外观专利</a>
        <a :href="CONFIG.indexUrl+'/service/tm.htm'" target="_blank" class="main">发明专利</a>
      </p>
      <div class="expand-con">
        <ul class="expand-con-list">
          <li>
            <h5>国内专利服务</h5>
            <div class="list">
              <a :href="CONFIG.indexUrl+'/products/21.htm'">外观专利申请</a>
              <a :href="CONFIG.indexUrl+'/products/20.htm'">发明专利申请</a>
              <a :href="CONFIG.indexUrl+'/products/22.htm'">实用新型专利申请</a>
            </div>
          </li>
          <li>
            <h5>疑难专利服务</h5>
            <div class="list">
              <a :href="CONFIG.indexUrl+'/products/36.htm'">外观专利驳回复审申请</a>
              <a :href="CONFIG.indexUrl+'/products/70.htm'">实用新型专利驳回复审申请</a>
              <a :href="CONFIG.indexUrl+'/products/71.htm'">发明专利驳回复审申请</a>
            </div>
          </li>
        </ul>
      </div>
    </li>
    <li class="menuli copyright-ser">
      <p class="nav_name">
        <a :href="CONFIG.indexUrl+'/service/copyright.htm'" target="_blank" class="line">版权服务</i></a>
        <a :href="CONFIG.indexUrl+'/service/tm.htm'" target="_blank" class="main">美术作品</a>
        <a :href="CONFIG.indexUrl+'/service/tm.htm'" target="_blank" class="main">软件著作权</a>
      </p>
      <div class="expand-con">
        <ul class="expand-con-list">
          <li>
            <h5>作品著作权登记</h5>
            <div class="list">
              <a :href="CONFIG.indexUrl+'/products/41.htm'">美术作品登记</a>
              <a :href="CONFIG.indexUrl+'/products/42.htm'">文字/口述作品登记</a>
            </div>
          </li>
          <li>
            <h5>软件著作权登记</h5>
            <div class="list">
              <a :href="CONFIG.indexUrl+'/products/40.htm'">软件著作权登记</a>
            </div>
          </li>
        </ul>
      </div>
    </li>
    <li class="menuli declare-ser">
      <p class="nav_name">
        <a :href="CONFIG.indexUrl+'/service/copyright.htm'" target="_blank" class="line">政府服务</i></a>
        <a :href="CONFIG.indexUrl+'/service/tm.htm'" target="_blank" class="main">高新技术</a>
        <a :href="CONFIG.indexUrl+'/service/tm.htm'" target="_blank" class="main">全国双软</a>
      </p>
      <div class="expand-con">
        <ul class="expand-con-list">
          <li>
            <h5>资质认定</h5>
            <div class="list">
              <a :href="CONFIG.indexUrl+'/service/declare.htm'">高新技术企业认定</a>
              <a :href="CONFIG.indexUrl+'/service/declare.htm'">全国双软企业认定</a>
            </div>
          </li>
          <li>
            <h5>资金申请</h5>
            <div class="list">
              <a :href="CONFIG.indexUrl+'/service/declare.htm'">杭州市重大科技创新项目</a>
              <a :href="CONFIG.indexUrl+'/service/declare.htm'">杭州市科技初创企业培育工程</a>
            </div>
          </li>
          <li>
            <h5>行政许可</h5>
            <div class="list">
              <a :href="CONFIG.indexUrl+'/service/declare.htm'">行政许可</a>
            </div>
          </li>
        </ul>
      </div>
    </li>
    <li class="menuli declare-ser">
      <p class="nav_name">
        <a :href="CONFIG.indexUrl+'/service/righttort.htm'" target="_blank" class="line">维权诉讼</i></a>
        <a :href="CONFIG.indexUrl+'/service/tm.htm'" target="_blank" class="main">商业调查</a>
        <a :href="CONFIG.indexUrl+'/service/tm.htm'" target="_blank" class="main">证据安全</a>
      </p>
      <div class="expand-con">
        <ul class="expand-con-list">
          <li>
            <h5>确权存证</h5>
            <div class="list">
              <a :href="CONFIG.indexUrl+'/service/rightoriginal.htm#cunz'">原创版权存证</a>
              <a :href="CONFIG.indexUrl+'/service/rightoriginal.htm#qingq'">网页侵权存证</a>
            </div>
          </li>
          <li>
            <h5>存证服务包</h5>
            <div class="list">
              <a :href="CONFIG.indexUrl+'/products/87.htm'">存证服务包</a>
            </div>
          </li>
        </ul>
      </div>
    </li>
    <li class="menuli maintenance-right">
      <p class="nav_name">
        <a :href="CONFIG.indexUrl+'/service/righttort.htm'" target="_blank" class="line">商标交易</i></a>
        <a :href="CONFIG.indexUrl+'/service/tm.htm'" target="_blank" class="main">电子产品</a>
        <a :href="CONFIG.indexUrl+'/service/tm.htm'" target="_blank" class="main">广告销售</a>
      </p>
      <div class="expand-con">
        <ul class="expand-con-list">
          <li>
            <h5>侵权存证</h5>
            <div class="list">
              <a :href="CONFIG.indexUrl+'/service/righttort.htm'">侵权网页存证</a>
              <a :href="CONFIG.indexUrl+'/service/righttort.htm'">侵权文件存证</a>
            </div>
          </li>
          <li>
            <h5>维权服务</h5>
            <div class="list">
              <a :href="CONFIG.indexUrl+'/service/righttort.htm'">维权服务</a>
            </div>
          </li>
        </ul>
      </div>
    </li>
    <li class="menuli other">
      <p class="nav_name">
        <a :href="CONFIG.indexUrl+'/service/game.htm'" target="_blank" class="line">企业服务</i></a>
        <a :href="CONFIG.indexUrl+'/service/tm.htm'" target="_blank" class="main">工商注册</a>
        <a :href="CONFIG.indexUrl+'/service/tm.htm'" target="_blank" class="main">代理记账</a>
      </p>
      <div class="expand-con">
        <ul class="expand-con-list">
          <li>
            <h5>会员服务</h5>
            <div class="list">
              <a :href="CONFIG.cartUrl+'/shop/pages/sebeTong.html'">拾贝通</a>
              <a :href="CONFIG.cartUrl+'/shop/pages/memberVip.html'">拾贝VIP</a>
            </div>
          </li>
          <li>
            <h5>行业报告</h5>
            <div class="list">
              <a :href="CONFIG.indexUrl+'/products/90.htm'">企业知识产权分析报告</a>
              <a :href="CONFIG.indexUrl+'/products/92.htm'">电商监测及销售报告</a>
              <a :href="CONFIG.indexUrl+'/products/91.htm'">近似商标监测报告</a>
            </div>
          </li>
          <li>
            <h5>游戏版号</h5>
            <div class="list">
              <a :href="CONFIG.indexUrl+'/service/game.htm'">游戏出版备案</a>
              <a :href="CONFIG.indexUrl+'/service/game.htm'">游戏运营备案</a>
            </div>
          </li>
          <li>
            <h5>资质办理</h5>
            <div class="list">
              <a :href="CONFIG.indexUrl+'/service/game.htm'">互联网信息服务业务经营许可证办理</a>
              <a :href="CONFIG.indexUrl+'/service/game.htm'">网络文化经营许可证办理</a>
            </div>
          </li>
        </ul>
      </div>
    </li>
  </ul> -->
  <ul class="mainMenu" >
    <li class="menuli" v-for="(item, index_) in navList" v-if="item.childs && item.childs.length && index_<=5">
      <p class="nav_name">
        <a :href="CONFIG.indexUrl+'/shop/pages/search.html#/serviceList?firstCategory='+item.bs_class_id" target="_blank" class="line">{{ item.name }}</i></a>
        <a :href="CONFIG.indexUrl+'/shop/pages/search.html#/serviceList?thirdCategory='+link.bs_id+'&firstCategory='+item.bs_class_id+'&secondCategory='+item.childs[0].bs_class_id" target="_blank" class="main" v-if="index<=1 && link.bs_id" v-for="(link, index) in item.childs[0].bsList">{{ link.alias }}</a>
        <a :href="CONFIG.indexUrl+'/shop/pages/search.html#/tmList?category='+link.id" target="_blank" class="main" v-if="index<=1 && !item.bs_id" v-for="(link, index) in item.childs[0].bsList">{{ link.goodsname }}</a>
      </p>
      <div class="expand-con" >
        <ul class="expand-con-list" id="nav_left">
          <li v-for="info in item.childs">
            <a :href="CONFIG.indexUrl+'/shop/pages/search.html#/serviceList?firstCategory='+item.bs_class_id+'&secondCategory='+info.bs_class_id">{{ info.name }}</a>
            <div class="list">
              <a v-if="link.bs_id" v-for="link in info.bsList" :href="CONFIG.indexUrl+'/shop/pages/search.html#/serviceList?thirdCategory='+link.bs_id+'&firstCategory='+item.bs_class_id+'&secondCategory='+info.bs_class_id"  target="_blank" >{{ link.name }}</a>
              <a v-if="!link.bs_id" v-for="link in info.bsList" :href="CONFIG.indexUrl+'/shop/pages/search.html#/tmList?category='+link.id"  target="_blank" >{{ link.goodsname }}</a>
            </div>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
const cartUrl = CONFIG.cartUrl;
const indexUrl = CONFIG.indexUrl;
const userUrl = CONFIG.userUrl;
const findALLbSuRL = userUrl + '/api/findAllBs';

import $ from 'jquery';
import intClsData from '../../assets/common/intClsData.js';

export default {
  data() {
    return {
      CONFIG: CONFIG,
      userUrl: userUrl,
      cartUrl: cartUrl,
      indexUrl: indexUrl,
      navList: [],  //所有分类列表
      cateIdData: intClsData.cateIdData,
    }
  },
  props: {
    showClass: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 查询所有分类列表
    getNavList () {
      this.$http.get(findALLbSuRL)
      .then( (resp) => {
        resp.data.forEach( (item, index) => {
          if (index<=5) {
            this.navList.push(item);
          }
        })
        localStorage.setItem('findAllBsList', JSON.stringify(resp.data));  //缓存所有三级分类数据，便于其他地方使用，但这个地方一定要请求，为了保证数据更新
        this.navList.push({
          name: '商标交易',
          childs: [
            {
              name: '商标交易',
              bsList: this.cateIdData
            }
          ]
        })
      })
    }
  },
  mounted () {
    this.getNavList();
  }
}

$(function(){
  $('#nav_left').each(function(index, el) {
    $(this).find('.menuli').hover(function() {
      console.log(888)
      setTimeout(function(){
        $(this).find('.expand-con').show();
      }, 200);
    }, function() {
      $(this).find('.expand-con').hide();
    });
  });
})


</script>

<style>
.navMenu{position: absolute;top: 114px;left: 0;z-index: 10001;display: none;}
  .navMenu .title {width:200px; height:50px;font-size: 14px;margin:0;color: #fff;line-height: 50px;padding-left: 21px;background: #3db1fa url(~assets/img/header_footer/menu_bg.png) 64px 18px no-repeat; text-align: center; background-size: 7%;}
  .navMenu .mainMenu{ display: none; position: relative; background-color: rgba(2,11,39,.8); padding-top: 20px; padding-bottom: 20px;height: 452px;}
  .navMenu:hover .mainMenu{display: block;box-shadow: 3px 5px 10px 0 #b8b8b8; }
  .active .mainMenu{display: block;}
  .navMenu .mainMenu li.menuli {width: 200px;height: 60px;}
  .navMenu .mainMenu li.menuli:last-child{height: 54px}
  .navMenu .mainMenu li h4{width: 210px;height: 51px;font-size:16px;line-height: 51px;border-bottom: 1px solid #e6e6e6;padding-left: 20px;z-index: 10002;position: absolute;left: 0;}
  .navMenu .mainMenu li .nav_name {width: 100%; height: 60px; padding-top: 8px; box-sizing: border-box; padding-left: 46px; }
  .navMenu .mainMenu li .nav_name .line { width: 150px; float: left; font-size: 14px; color: #fff; text-align: left; margin-bottom: 4px;}
  .navMenu .mainMenu li .nav_name .main {font-size: 13px; color: #aaa; margin-right: 10px; float: left; width: 65px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;}
  .navMenu .mainMenu li .nav_name a{color: #fff; display: block; font-weight: normal;}
  .navMenu .mainMenu li.menuli:nth-child(1) {background: url(~assets/img/header_footer/s_1.png) 20px 10px no-repeat; background-size: 18px 18px;}
  .navMenu .mainMenu li.menuli:nth-child(2) {background: url(~assets/img/header_footer/s_2.png) 20px 10px no-repeat; background-size: 18px 18px;}
  .navMenu .mainMenu li.menuli:nth-child(3) {background: url(~assets/img/header_footer/s_3.png) 20px 10px no-repeat; background-size: 18px 18px;}
  .navMenu .mainMenu li.menuli:nth-child(4) {background: url(~assets/img/header_footer/s_4.png) 20px 10px no-repeat; background-size: 18px 18px;}
  .navMenu .mainMenu li.menuli:nth-child(5) {background: url(~assets/img/header_footer/s_5.png) 20px 10px no-repeat; background-size: 18px 18px;}
  .navMenu .mainMenu li.menuli:nth-child(6) {background: url(~assets/img/header_footer/s_6.png) 20px 10px no-repeat; background-size: 18px 18px;}
  .navMenu .mainMenu li.menuli:nth-child(7) {background: url(~assets/img/header_footer/s_7.png) 20px 10px no-repeat; background-size: 18px 18px;}
  .navMenu .mainMenu li.menuli:nth-child(1):hover {background: url(~assets/img/header_footer/a_1.png) 20px 10px no-repeat #fff; background-size: 18px 18px;}
  .navMenu .mainMenu li.menuli:nth-child(2):hover {background: url(~assets/img/header_footer/a_2.png) 20px 10px no-repeat #fff; background-size: 18px 18px;}
  .navMenu .mainMenu li.menuli:nth-child(3):hover {background: url(~assets/img/header_footer/a_3.png) 20px 10px no-repeat #fff; background-size: 18px 18px;}
  .navMenu .mainMenu li.menuli:nth-child(4):hover {background: url(~assets/img/header_footer/a_4.png) 20px 10px no-repeat #fff; background-size: 18px 18px;}
  .navMenu .mainMenu li.menuli:nth-child(5):hover {background: url(~assets/img/header_footer/a_5.png) 20px 10px no-repeat #fff; background-size: 18px 18px;}
  .navMenu .mainMenu li.menuli:nth-child(6):hover {background: url(~assets/img/header_footer/a_6.png) 20px 10px no-repeat #fff; background-size: 18px 18px;}
  .navMenu .mainMenu li.menuli:nth-child(7):hover {background: url(~assets/img/header_footer/a_7.png) 20px 10px no-repeat #fff; background-size: 18px 18px;}

  .navMenu .mainMenu li.menuli:hover { color: #333; }
  .navMenu .mainMenu li.menuli:hover .nav_name .line {color: #333;}
  .navMenu .mainMenu li.menuli .nav_name a:hover{text-decoration: none; color:#3DB1FA;}
  .navMenu .mainMenu li.menuli .nav_name .line:hover {color:#3DB1FA;}

  .navMenu .mainMenu li:hover .expand-con {display: block;}

  .navMenu .mainMenu li .expand-con{display:none;position:absolute;top: 20px; left:200px; width:725px;height:432px;background-color: #fff;padding: 30px; z-index: 10001;}
  .expand-con-list li{margin-bottom: 20px; }
  .expand-con-list li:last-child{border-bottom: none;}
  .expand-con-list li>a{font-size: 14px;line-height: 20px;height: 20px;color: #3DB1FA; margin-bottom: 8px;}
  .expand-con-list li .list{padding:5px 0;}
  .expand-con-list li .list a{line-height: 22px; color: #333; font-size:13px; margin-right: 30px; text-align: left; display: inline-block; margin-bottom: 10px;}
  .expand-con-list li .list a:hover{color:#ff7019;}
  .expand-con-list li .list .pipe{display: inline-block;width:24px;text-align: center;color: #ccc;height:14px;line-height: 14px}
</style>
