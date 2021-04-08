<template>
  <header>
    <!-- 吊顶 -->
    <top-bar :cartNum="cartNum" :name="userName"></top-bar>

    <!-- logo 主导航 -->
    <div class="header header_mall commWidth clearfix" id="main_header">
      <h1 class="logo fl">
        <a class="sebelogo" :href="indexUrl" title="拾贝"><img src="~assets/img/header_footer/logo_new.png" alt="拾贝" width="160" height="56" /></a>
      </h1>
      <div class="mall_info">
        <p class="title">杭州拾贝旗舰店<a href="" class="link"><img src="~assets/img/icon/chat.png" alt=""></a></p>
        <img src="~assets/img/icon/icon_1.png" class="tag" alt="">
      </div>
      <div class="search_box">
        <div class="tab_line">
          <span class="lab active">搜服务</span>
          
        </div>
        <div class="search_content">
          <div class="input_box">
            <i class="el-icon-search"></i>
            <input type="text" class="text" placeholder="国内商标注册申请">
          </div>
          <button type="button" class="el-button s_btn el-button--primary"><span>搜本旺铺</span></button>
          <button type="button" class="el-button s_btn el-button--primary is-plain"><span>搜全站</span></button>
        </div>
      </div>

    </div>
    <!-- 固定导航 -->
    <div class="fixed_header" id="fixed_header">
      <div class="commWidth">
        <a href="" class="log_img"><img src="~assets/img/header_footer/logo_line.png" alt="" width="330" height="26"></a>
        <div class="search_content">
          <div class="input_box">
            <select class="type_list">
              <option value="" selected>搜服务</option>
              <!-- <option value="">买商标</option> -->
              <option value="">找店铺</option>
            </select>
            <input type="text" class="text" placeholder="国内商标注册申请">
          </div>
          <button type="button" class="el-button s_btn el-button--primary"><span>搜索</span></button>
        </div>
      </div>
    </div>

  </header>
</template>

<script>
import TopBar from 'components/headerFComponents/TopBar.vue'
import NavMenu from 'components/headerFComponents/NavMenu.vue'
const indexUrl = CONFIG.indexUrl;
const spUrl = CONFIG.spUrl;
//import {indexUrl} from 'src/config'
export default {
  props:['cartNum', 'userName'],
  components: {
    TopBar,
    NavMenu
  },
  data() {
    return {
    	indexUrl: indexUrl,
      spUrl: spUrl
    }
  },
  methods: {
  },
  mounted(){
    window.addEventListener('scroll', function(e){
      let top_ = document.documentElement.scrollTop || document.body.scrollTop;
      let fixedDom = document.getElementById('fixed_header');
      let headerDom = document.getElementById('main_header');
      if (top_ > 180 ) {
        fixedDom.style.display = 'block';
      }
      else{
        fixedDom.style.display = 'none';
      }
    })
  }
}
</script>

<style>
  header{background-color: #fff;border-bottom: 1px solid #e6e6e6;text-align: left;}
  div.header{position: relative;z-index: 100;}
  div.header_mall {height: 122px; }
  .header .logo{margin-top: 30px;padding-bottom: 3px;width: 200px;height: 62px;}
  .header .logo .sebelogo {display: inline-block; width: 100%; height: 100%; text-align: center; padding-right: 20px; border-right: 1px solid #f1f1f1; }
  .header .navBar{position: absolute; left: 200px; bottom: 0; padding-left: 10px;}
  .header .navBar>li{float: left;height: 50px;line-height: 50px; padding: 0 20px;}
  .header .navBar>li>a{display:block;height: 50px;line-height: 50px;font-size:14px;color: #333;}
  .header .navBar>li.cur>a,.header .navBar li:hover>a{color: #3db1fa; border-bottom: 2px solid #3db1fa; }
  .header .navBar>li>a:hover{color: #3db1fa;text-decoration: none;}
  .header .navBar>li.hot{background: transparent url(~assets/img/header_footer/hot_new.png) right top no-repeat;}
  .header .navBar>li.xcx {background: url(~assets/img/header_footer/xcx_icon.png) left center no-repeat; padding-left: 24px; margin-left: 20px;}

  .header .navBar li.products{height: auto;position: relative;}
  .header .navBar li.products span{text-align: left;display:block;height: 36px;line-height: 36px;font-size:16px;color: #333;padding: 0 20px;}
  .header .navBar li.products span .fa{margin-left:10px;}
  .header .navBar li.products span .fa-angle-up{display: none;}
  .header .navBar li.products:hover{color: #fff;background-color: #3db1fa;border-top-left-radius:3px;border-top-right-radius:3px;cursor: default;}
  .header .navBar li.products:hover span .fa-angle-down{display: none;}
  .header .navBar li.products:hover span .fa-angle-up{display: inline-block;}
  .header .navBar li.products ul{width: 100%;display: none;padding-bottom:10px;position: absolute;top: 36px;left: 0;background-color: #3db1fa;border-bottom-right-radius:3px;border-bottom-left-radius:3px;z-index: 10002;}
  .header .navBar li.products ul li{height: 34px;line-height: 34px;width: 100%;}
  .header .navBar li.products ul li a{padding-left:20px;font-size:14px;display: block;color: #d1e9f8;height: 34px;line-height: 34px;}
  .header .navBar li.products:hover span{color:#fff;}
  .header .navBar li.products:hover ul{display: block;}
  .header .navBar li.products:hover ul li a:hover{background-color: #0082d3;color: #fff;border-radius: 0;text-decoration: none;}

  .mall_info {float: left; width: 200px; margin-top: 30px; margin-left: 20px;}
  .mall_info .title {width: 180px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap; font-size: 18px; color: #333; float: left; margin-bottom: 6px;}
  .mall_info .title .link {width: 16px; height: 16px; margin-left: 8px;}
  .mall_info .tag {width: 16px; height: 15px; float: left; margin-right: 10px;}

  .search_box {float: left; width: 620px; margin-left: 150px;  margin-top: 25px;}
  .search_box .tab_line {width: 100%; float: left; height: 28px; line-height: 28px;}
  .search_box .tab_line .lab {display: inline-block; margin-right: 30px; font-size: 13px; color: #333; cursor: pointer;}
  .search_box .tab_line .lab.active {color: #3DB1FA;}
  .search_box .search_content {float: left; height: 40px; width: 100%;}
  .search_box .search_content .input_box {width: 360px; height: 40px; float: left; line-height: 40px; box-sizing: border-box; border: 1px solid #E6E6E6; border-right: none; }
  .search_content .input_box i {font-size: 18px; margin: 0 10px; color: #ddd; line-height: 40px; float: left;}
  .search_content .input_box .text {font-size: 14px; width: 320px; height: 38px; line-height: 38px; border: none; float: left;}
  .search_content .s_btn {float: left; background:linear-gradient(135deg,rgba(16,174,255,1),rgba(77,160,255,1)); border-radius:0px 2px 2px 0px; width: 120px; height: 40px; font-size: 16px;}

  .wx_erweima {width: 80px; height: 102px; background:rgba(255,255,255,1); box-shadow:0px 1px 4px 0px rgba(163,176,185,0.3); border-radius:2px; text-align: center; margin-top: 30px;}
  .wx_erweima img {width: 73px; height: 73px; margin: 5px auto 0 auto;}
  .wx_erweima .title {font-size: 12px; color: #333; text-align: center; line-height: 12px;}

  /*固定导航*/
  .fixed_header {display: none; position: fixed; width: 100%; height: 60px; top:0; background: #fff; box-shadow:0px 1px 4px 0px rgba(163,176,185,0.3); z-index: 1000;}
  .fixed_header .log_img {float: left; margin-top: 15px;}
  .fixed_header .search_content {float: right; height: 40px; width: 700px; margin-top: 10px;}
  .fixed_header .search_content .input_box {width: 580px; height: 40px; float: left; line-height: 40px; box-sizing: border-box; border: 1px solid #E6E6E6; border-right: none; }
  .fixed_header .search_content .input_box i {float: right;}
  .fixed_header .search_content .text {font-size: 14px; width: 470px; padding-left: 10px; height: 38px; line-height: 38px; border: none; float: left;}
  .fixed_header .search_content .s_btn {float: left; background:linear-gradient(135deg,rgba(16,174,255,1),rgba(77,160,255,1)); border-radius:0px 2px 2px 0px; width: 120px; height: 40px; font-size: 16px;}
  .fixed_header .search_content .type_list {float: left; width: 80px; height: 38px; line-height: 38px; border:none; text-align: center; padding-left: 10px; border-right: 1px solid #E6E6E6;}
  .fixed_header .search_content .type_list option {padding-left: 10px;}

</style>
