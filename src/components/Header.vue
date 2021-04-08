<template>
	<header>
		<!-- 吊顶 -->
		<top-bar :cartNum="cartNum" :name="userName"></top-bar>

		<!-- logo 主导航 -->
		<!-- <div class="header commWidth clearfix" id="main_header">
			<h1 class="logo fl">
				<a class="sebelogo" :href="indexUrl" title="拾贝"><img src="~assets/img/header_footer/logo_new.png" alt="拾贝" width="160" height="56" /></a>
			</h1>
			<div class="search_box search_box_index">
				<div class="tab_line">
					<span class="lab" v-for="item in typeList" :class="{'active': selectId==item.id}" @click="selectTypeFn(item)">{{ item.name }}</span>
				</div>
				<div class="search_content">
					<div class="input_box">
						<i class="el-icon-search"></i>
						<input type="text" v-model="keyword" class="text" >
					</div>
					<button type="button" class="el-button s_btn el-button--primary" @click="searchFn"><span>搜索</span></button>
				</div>
			</div>
			
			<div class="wx_erweima fr">
				<img src="~assets/img/header_footer/wx_fwh.png" alt="">
				<p class="title">微信服务号</p>
			</div>
			
			<nav-menu :indexUrl="indexUrl"></nav-menu>
			
			<ul class="navBar">
				<li class="cur"><a :href="indexUrl">首页</a></li>
				<li class="hot"><a :href="indexUrl + '/cms/service/serviceSolve.htm'" target="_blank">服务贸易</a></li>
				<li class=""><a :href="indexUrl + '/cms/service/foreignCompany.htm'" target="_blank">进驻中国</a></li>
				<li class=""><a :href="indexUrl + '/cms/service/ecommerce.htm'" target="_blank">电商服务</a></li>
				<li class=""><a :href="indexUrl + '/cms/service/unicorn.htm'" target="_blank">独角兽服务</a></li>
				<li class=""><a :href="indexUrl + '/cms/service/rightoriginal.htm'" target="_blank">公证存证</a></li>
				<li class="xcx">
					<a href="" target="_blank">小程序</a>
					<div class="xcx_box">
						<div class="item">
							<img src="~assets/img/header_footer/xcx_1.png" alt="">
							<p class="tit">拾贝商标管家</p>
							<p class="info">管家在手，商标无忧</p>
						</div>
						<div class="item">
							<img src="~assets/img/header_footer/xcx_2.png" alt="">
							<p class="tit">IP大脑</p>
							<p class="info">专利查询，专利续费</p>
						</div>
						<div class="item">
							<img src="~assets/img/header_footer/xcx_3.png" alt="">
							<p class="tit">拾贝推单助手</p>
							<p class="info">移动端订单推送工具</p>
						</div>
						<div class="item">
							<img src="~assets/img/header_footer/xcx_4.png" alt="">
							<p class="tit">拾贝微商城</p>
							<p class="info">随时随地，知识产权 服务在线</p>
						</div>
					</div>
				</li>
			</ul>
		</div> -->
		<!-- 固定导航 -->
		<!-- <div class="fixed_header" id="fixed_header" v-if="showFixedHead">
			<div class="commWidth">
				<a :href="indexUrl" class="log_img"><img src="~assets/img/header_footer/logo_line.png" alt="" width="330" height="26"></a>
				<div class="search_content">
					<div class="input_box">

						<el-select v-model="selectId" placeholder="请选择">
					    <el-option
					      v-for="item in typeList"
					      :key="item.id"
					      :label="item.name"
					      :value="item.id">
					    </el-option>
					  </el-select>
						<input type="text" v-model="keyword" class="text" placeholder="" >
					</div>
					<button type="button" class="el-button s_btn el-button--primary" @click="searchFn"><span>搜索</span></button>
				</div>
			</div>
		</div> -->

		<!-- 侧边栏 -->
		<sider-bar></sider-bar>

	</header>
</template>

<script>
import TopBar from 'components/headerFComponents/TopBar.vue'
import NavMenu from 'components/headerFComponents/NavMenu.vue';
import siderBar from 'components/CustomerService.vue';
import $ from 'jquery';
const cartUrl = CONFIG.cartUrl;
const indexUrl = CONFIG.indexUrl;
const userUrl = CONFIG.userUrl;
const toolsUrl = CONFIG.toolsUrl;
const spUrl = CONFIG.spUrl;
const czUrl = CONFIG.czUrl;
//import {indexUrl} from 'src/config'
export default {
	components: {
		TopBar,
		NavMenu,
		siderBar
	},
	data() {
		return {
			indexUrl: indexUrl,
			spUrl: spUrl,
			keyword: '',  //关键词
			userName: '',
			typeList: [
				{name: '搜服务', id:1},
				//{name: '买商标', id:2},
				{name: '找店铺', id:3}
			],
			selectId: 1,  //选择的类型ID
			cartNum: '',  //购物车数量
			showFixedHead: false,  //展示固定头
		}
	},
	methods: {
		// 去购物车
		cartNavTo(){
			location.href = this.userName ? cartUrl+'/shop/pages/buycart.html' : userUrl + '/iprp/#/access/login?return_url=' + encodeURIComponent(cartUrl+'/shop/pages/buycart.html');
		},
		selectTypeFn (item) {
			this.selectId = item.id;
		},
		// 搜索
		searchFn () {
			let thePage = this.$route.path;
			// 搜服务
			if (this.selectId == 1) {
				if (thePage == '/serviceList') {    //为了搜索本页面时只是添加关键词这一个参数，其他参数不变
					let query_ = Object.assign({}, {keyword: encodeURIComponent(encodeURIComponent(this.keyword)) });
					this.$router.replace({path: '/serviceList', query: query_ });
				} else{
					location.href = cartUrl + `/shop/pages/search.html#/serviceList?keyword=` + encodeURIComponent(encodeURIComponent(this.keyword));
				}
			}
			// 买商标
			else if (this.selectId == 2) {
				if (thePage == '/tmList') {
					let query_ = Object.assign({}, {keyword: encodeURIComponent(encodeURIComponent(this.keyword)) });
					this.$router.replace({path: '/tmList', query: query_ });
				} else{
					location.href = cartUrl + `/shop/pages/search.html#/tmList?keyword=` + encodeURIComponent(encodeURIComponent(this.keyword));
				}
			}
			// 搜店铺
			else if (this.selectId == 3) {
				if (thePage == '/storeList') {
					let query_ = Object.assign({}, {keyword: encodeURIComponent(encodeURIComponent(this.keyword)) });
					this.$router.replace({path: '/storeList', query: query_ });
				} else{
					location.href = cartUrl + `/shop/pages/search.html#/storeList?keyword=` + encodeURIComponent(encodeURIComponent(this.keyword));
				}
			}
		}
	},
	mounted(){
		this.userName = this.$cookie.get('truename');
		if (this.$route.query.keyword) {
			this.keyword = decodeURIComponent(decodeURIComponent(this.$route.query.keyword));
		}
		if (this.$route.path == '/tmList') {
			this.selectId = 2;
		}
		if (this.$route.path == '/serviceList') {
			this.selectId = 1;
		}
		if (this.$route.path == '/storeList') {
			this.selectId = 3;
		}
		this.cartNum = this.$cookie.get('cart_num') || '0';
		let self = this;
		$(window).on('scroll', function(){
      if($(this).scrollTop() > 180){
        self.showFixedHead = true;
      }else{
        self.showFixedHead = false;
      }
    });

	}
}
</script>

<style lang="scss">
	.fixed_header {
		.el-input--suffix .el-input__inner {border:none; padding: 0; font-size:13px;}
		.el-select {overflow:hidden; float: left; width: 80px; height: 38px; line-height: 38px; border:none; text-align: center; padding-left: 10px; border-right: 1px solid #E6E6E6;}
		.search_content .input_box i {margin: 0;}
	}
	.el-select-dropdown {margin-left: -12px;}
	/*头部样式*/
	header{background-color: #fff; text-align: left;}
	div.header{height: 164px;position: relative;z-index: 100;}
	div.header_mall {height: 122px; }
	.header .logo{margin-top: 30px;padding-bottom: 3px;width: 200px;height: 62px;}
	.header .logo .sebelogo {display: inline-block; width: 100%; height: 100%; text-align: center;}
	.header .navBar{position: absolute; left: 200px; bottom: 0; padding-left: 10px; width: 800px;display: none;}
	.header .navBar>li{float: left;height: 50px;line-height: 50px; padding: 0 20px;}
	.header .navBar>li>a{display:block;height: 50px;line-height: 50px;font-size:14px;color: #333;}
	.header .navBar>li.cur>a,.header .navBar li:hover>a{color: #3db1fa; border-bottom: 2px solid #3db1fa; }
	.header .navBar>li>a:hover{color: #3db1fa;text-decoration: none;}
	.header .navBar>li.hot{background: transparent url(~assets/img/header_footer/hot_new.png) right top no-repeat; background-size: 22px 22px;}
	.header .navBar>li.xcx {background: url(~assets/img/header_footer/wxxcx_icon.png) left center no-repeat; background-size:20px 20px; padding-left: 24px; margin-left: 20px; float: right; padding-right: 0; position: relative;}
	.header .navBar>li.xcx .xcx_box {display:none; animation: fadeOut 0.5s linear; animation-fill-mode: forwards; position: absolute; width: 742px; box-sizing:border-box; padding: 40px; height: 250px; background: #fff; right: 0; top: 45px; box-shadow:0px 2px 12px 0px rgba(0,0,0,0.06);border:1px solid #E6E6E6;border-radius:2px;}
	.header .navBar>li.xcx .xcx_box:after {background: url(~assets/img/header_footer/arrow1.png) left center no-repeat;position: absolute; content: "";top: -8px;width:16px;height:8px;}
	.xcx .xcx_box .item {width: 120px; margin-right: 60px; float: left;}
	.xcx .xcx_box .item:last-child {margin-right: 0;}
	.xcx .xcx_box .item>img {width: 120px; height: 120px; float: left; margin-bottom: 5px;}
	.xcx .xcx_box .item>.tit {width: 100%; text-align: center; font-size: 14px; color: #333; line-height: 24px; float: left;}
	.xcx .xcx_box .item>.info {width: 100%; text-align: center; font-size: 13px; color: #999; line-height: 20px; float: left;}
	@keyframes fadeIn {
	  from {
	    opacity: 0;
	  }
	  to {
	    opacity: 1;
	  }
	}
	@keyframes fadeOut {
	  from {
	    opacity: 1;
	  }
	  to {
	    opacity: 0;
	  }
	}
	.header .navBar>li.xcx:hover .xcx_box {animation: fadeIn 0.5s linear; animation-fill-mode: forwards; display: block; }


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
	/* 搜索框 兼容详情页面头部 */
	.search_box {float: left; width: 620px; margin-left: 150px;  margin-top: 25px;}
	.search_box .tab_line {width: 100%; float: left; height: 28px; line-height: 28px;}
	.search_box .tab_line .lab {display: inline-block; margin-right: 30px; font-size: 13px; color: #333; cursor: pointer;}
	.search_box .tab_line .lab.active {color: #3DB1FA;}
	.search_box .search_content {float: left; height: 40px; width: 100%;}
	.search_box .search_content .input_box {width: 360px; height: 40px; float: left; line-height: 40px; box-sizing: border-box; border: 1px solid #E6E6E6; border-right: none; }
	.search_content .input_box i {font-size: 18px; margin: 0 10px; color: #ddd; line-height: 40px; float: left;}
	.search_content .input_box .text {font-size: 14px; width: 320px; height: 38px; line-height: 38px; border: none; float: left;}
	.search_content .s_btn {float: left; border-radius:0px 2px 2px 0px; width: 120px; height: 40px; font-size: 16px; text-align: center; padding: 0;}

	/* 首页搜索框 */
	.search_box_index {width: 700px; margin-left: 165px;}
	.search_box_index .search_content .input_box {width: 520px;}
	.search_box_index .search_content .input_box .text {width: 470px;}
	.search_box_index .search_content .s_btn{background:linear-gradient(135deg,rgba(16,174,255,1),rgba(77,160,255,1));}

	.wx_erweima {width: 80px; height: 102px; background:rgba(255,255,255,1); box-shadow:0px 1px 4px 0px rgba(163,176,185,0.3); border-radius:2px; text-align: center; margin-top: 30px;}
	.wx_erweima img {width: 73px; height: 73px; margin: 5px auto 0 auto;}
	.wx_erweima .title {font-size: 12px; color: #333; text-align: center; line-height: 12px;}

	/*下拉菜单*/
	.navMenu{position: absolute;top: 114px;left: 0;z-index: 10001;}
	.navMenu .title {width:200px; height:50px;font-size: 14px;margin:0;color: #fff;line-height: 50px;padding-left: 21px;background: #3db1fa url(~assets/img/header_footer/menu_bg.png) 64px 18px no-repeat; text-align: center; background-size: 7%;}
	.navMenu .mainMenu{ display: none; position: relative; background-color: rgba(2,11,39,.8); padding-top: 20px; padding-bottom: 20px;}
	.navMenu:hover .mainMenu{display: block; }
	.active .mainMenu{display: block;}
	.navMenu .mainMenu li.menuli {width: 200px;height: 60px;}
	.navMenu .mainMenu li.menuli:last-child{height: 54px}
	.navMenu .mainMenu li h4{width: 210px;height: 51px;font-size:16px;line-height: 51px;border-bottom: 1px solid #e6e6e6;padding-left: 20px;z-index: 10002;position: absolute;left: 0;}
	.navMenu .mainMenu li .nav_name {width: 100%; height: 60px; padding-top: 8px; box-sizing: border-box; padding-left: 46px; }
	.navMenu .mainMenu li .nav_name .line { width: 150px; float: left; font-size: 14px; color: #fff; text-align: left; margin-bottom: 4px;}
	.navMenu .mainMenu li .nav_name .main {font-size: 13px; color: #aaa; margin-right: 10px; float: left; width: 65px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;}
	.navMenu .mainMenu li .nav_name a{color: #fff; display: block; font-weight: normal;}
	.navMenu .mainMenu li.menuli:nth-child(1) {background: url(~assets/img/header_footer/s_1.png) 20px 10px no-repeat;}
	.navMenu .mainMenu li.menuli:nth-child(2) {background: url(~assets/img/header_footer/s_2.png) 20px 10px no-repeat;}
	.navMenu .mainMenu li.menuli:nth-child(3) {background: url(~assets/img/header_footer/s_3.png) 20px 10px no-repeat;}
	.navMenu .mainMenu li.menuli:nth-child(4) {background: url(~assets/img/header_footer/s_4.png) 20px 10px no-repeat;}
	.navMenu .mainMenu li.menuli:nth-child(5) {background: url(~assets/img/header_footer/s_5.png) 20px 10px no-repeat;}
	.navMenu .mainMenu li.menuli:nth-child(6) {background: url(~assets/img/header_footer/s_6.png) 20px 10px no-repeat;}
	.navMenu .mainMenu li.menuli:nth-child(7) {background: url(~assets/img/header_footer/s_7.png) 20px 10px no-repeat;}
	.navMenu .mainMenu li.menuli:nth-child(1):hover {background: url(~assets/img/header_footer/a_1.png) 20px 10px no-repeat #fff;}
	.navMenu .mainMenu li.menuli:nth-child(2):hover {background: url(~assets/img/header_footer/a_2.png) 20px 10px no-repeat #fff;}
	.navMenu .mainMenu li.menuli:nth-child(3):hover {background: url(~assets/img/header_footer/a_3.png) 20px 10px no-repeat #fff;}
	.navMenu .mainMenu li.menuli:nth-child(4):hover {background: url(~assets/img/header_footer/a_4.png) 20px 10px no-repeat #fff;}
	.navMenu .mainMenu li.menuli:nth-child(5):hover {background: url(~assets/img/header_footer/a_5.png) 20px 10px no-repeat #fff;}
	.navMenu .mainMenu li.menuli:nth-child(6):hover {background: url(~assets/img/header_footer/a_6.png) 20px 10px no-repeat #fff;}
	.navMenu .mainMenu li.menuli:nth-child(7):hover {background: url(~assets/img/header_footer/a_7.png) 20px 10px no-repeat #fff;}

	.navMenu .mainMenu li.menuli:hover { color: #333; }
	.navMenu .mainMenu li.menuli:hover .nav_name .line {color: #333;}
	.navMenu .mainMenu li.menuli .nav_name a:hover{text-decoration: none; color:#3DB1FA;}
	.navMenu .mainMenu li.menuli .nav_name .line:hover {color:#3DB1FA;}

	.navMenu .mainMenu li:hover .expand-con {display: block;}

	.navMenu .mainMenu li .expand-con{display:none;position:absolute;top: 20px; left:200px; width:725px;height:432px;background-color: #fff;padding: 30px; z-index: 10001;overflow: hidden;}
	.expand-con-list li{margin-bottom: 20px; }
	.expand-con-list li:last-child{border-bottom: none;}
	.expand-con-list li a{font-size: 14px;line-height: 20px;height: 20px;color: #3DB1FA; margin-bottom: 8px;}
	.expand-con-list li .list{padding:5px 0;}
	.expand-con-list li .list a{line-height: 22px; color: #333; font-size:13px; margin-right:30px; text-align: left; display: inline-block; margin-bottom: 10px;}
	.expand-con-list li .list a:hover{color:#ff7019;}
	.expand-con-list li .list .pipe{display: inline-block;width:24px;text-align: center;color: #ccc;height:14px;line-height: 14px}

	/*固定导航*/
	.fixed_header { position: fixed; width: 100%; height: 60px; top:0; background: #fff; box-shadow:0px 1px 4px 0px rgba(163,176,185,0.3); z-index: 1000;}
	.fixed_header .log_img {float: left; margin-top: 15px;}
	.fixed_header .search_content {float: right; height: 40px; width: 700px; margin-top: 10px;}
	.fixed_header .search_content .input_box {width: 580px; height: 40px; float: left; line-height: 40px; box-sizing: border-box; border: 1px solid #E6E6E6; border-right: none; }
	.fixed_header .search_content .input_box i {float: right;}
	.fixed_header .search_content .text {font-size: 14px; width: 470px; padding-left: 10px; height: 38px; line-height: 38px; border: none; float: left;}
	.fixed_header .search_content .s_btn {float: left; background:linear-gradient(135deg,rgba(16,174,255,1),rgba(77,160,255,1)); border-radius:0px 2px 2px 0px; width: 120px; height: 40px; font-size: 16px;}



</style>
