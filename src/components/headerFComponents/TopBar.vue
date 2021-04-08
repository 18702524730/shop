<template>
	<!-- 吊顶 -->
	<nav class="topBar">
		<div class="bar commWidth clearfix">
			<ul class="top-left fl">
				<li class="fl phone welcome" v-if="!userName">欢迎来到拾贝</li>
				<li class="fl phone welcome" v-if="userName">Hi,</li>
				<template v-if="!userName">
					<li class="top-login " >
						<a href="javascript:;" target="_blank" class="black_link" @click.prevent="jumpLogin">亲，请登录</a>
					</li>
					<li class="site-nav-pipe">|</li>
					<li class="top-regist highlight">
						<a href="javascript:;" target="_blank" class="black_link" @click.prevent="jumpRegister">免费注册</a>
					</li>
				</template>
				<template v-if="userName">
					<li class="fl top-user">
						<a class="til" :href="userUrl+'/iprp'"><span class="username">{{ userName | ellipsis(24) }}</span></a>
					</li>
					<li class="fl logout">
						<a href="javascript:;" @click.prevent="logout">退出</a>
					</li>
				</template>
			</ul>
			<ul class="top-right fr">
				<li class="">
					<a :href="CONFIG.indexUrl">拾贝首页</a>
				</li>
				<li class="fl small-menu-wrap zctools">
					<span class="hasmenu"><a :href="CONFIG.userUrl +'/iprp/#/main'" target="_blank" class="til">我的拾贝<i class="fa fa-caret-down" aria-hidden="true"></i><i class="fa fa-caret-up" aria-hidden="true"></i></a></span>
					<div class="small-menu zctools-list">
						<ul class="menu_ul">
							<li>
								<a :href="CONFIG.userUrl +'/iprp/#/main'" target="_blank">会员中心</a>
								<a :href="CONFIG.userUrl+'/iprp/#/orders'" target="_blank">已购买的服务</a>
								<a :href="CONFIG.userUrl+'/iprp/#/serviceList'" target="_blank">查看服务进度</a>
								<a :href="CONFIG.userUrl+'/iprp/#/myczlist'" target="_blank">我的存证</a>
							</li>
							<li>
								<a :href="CONFIG.spUrl+'/#index/general'" target="_blank">商家中心</a>
								<a :href="CONFIG.spUrl+'/#service/myServiceOrder/list'" target="_blank">服务中心</a>
								<a :href="CONFIG.spUrl+'/#trade/myOrder/list'" target="_blank">订单管理</a>
								<a :href="CONFIG.spUrl+'/#shop/shopManage/basicinfo'" target="_blank">店铺管理</a>
							</li>
							<li>
								<a :href="CONFIG.indexUrl+'/sebe/pages/channel.html#/'" target="_blank">合伙人中心</a>
								<a :href="CONFIG.indexUrl+'/sebe/pages/channel.html#/'" target="_blank">加入合伙人</a>
							</li>
						</ul>
					</div>
				</li>
				<li class="top-buycart">
						<a :href="cartUrl+'/shop/pages/buycart.html'" target="_blank" class="tocart" ><i class="cart_icon"></i>购物车(<b class="shop-color">{{cart_num}}</b>)件</a>
				</li>
				<li class="fl small-menu-wrap zctools platform">
					<!-- 跳转到生态开发平台落地页 -->
					<span class="hasmenu"><a class="til" :href="CONFIG.indexUrl+'/cms/service/sebeVersions.htm'" target="_blank" >生态开放平台<i class="fa fa-caret-down" aria-hidden="true"></i><i class="fa fa-caret-up" aria-hidden="true"></i></a></span>
					<div class="small-menu zctools-list menu_item">
						<ul class="menu_ul">
							<li>
								<a :href="CONFIG.spUrl+'/#index/general'" target="_blank">商家中心</a>
								<a :href="CONFIG.indexUrl+'/sebe/pages/channel.html#/'" target="_blank">加入合伙人</a>
							</li>
						</ul>
					</div>
				</li>
				<li class="kefu">
					<a href="http://pct.zoosnet.net/LR/Chatpre.aspx?id=PCT70172520&lng=cn&p=http%3a%2f%2fwww.ipsebe.com" target="_blank">联系客服</a>
				</li>
			</ul>
		</div>

	</nav>
</template>

<script>
import $ from 'jquery'
const cartUrl = CONFIG.cartUrl;
const indexUrl = CONFIG.indexUrl;
const userUrl = CONFIG.userUrl;
const toolsUrl = CONFIG.toolsUrl;
const spUrl = CONFIG.spUrl;
const czUrl = CONFIG.czUrl;
//import {indexUrl,userUrl} from 'src/config'
import VueCookie from 'vue-cookie';

export default {
	props:['cartNum', 'name'],
	data() {
		return {
			userName: '',
			cart_num: '',
			CONFIG: CONFIG,
			toolsUrl: toolsUrl,
			userUrl: userUrl,
			spUrl: spUrl,
			cartUrl: cartUrl,
			indexUrl: indexUrl,
			inspectionUrl:czUrl + '/notarization/pages/BlockChain.html',
			tipsShow: false,  // 入驻状态弹窗
			content: '',  //弹窗内容
			btnText: '',  //按钮内容
			enterStatus: 1,  //1.未入驻 2.正在审核
		}
	},
	mounted(){
		setTimeout(()=>{//不延时执行，下面走不到打印部分
			var userName = this.$cookie.get('nickname');
			var phone = this.$cookie.get('phone');
			if (phone) {
				phone = phone.slice(0, 3) + '****' + phone.slice(-4);
			}
			console.log(phone)
			this.userName = userName ? userName : phone;
			this.cart_num = this.$cookie.get('cart_num') || '0';
		},300)

	},
	methods: {
		//删除关键cookie
		clearCookie(){
			this.$cookie.delete('truename', {domain: '.ipsebe.com'});
			this.$cookie.delete('phone', {domain: '.ipsebe.com'});
			this.$cookie.delete('user_token', {domain: '.ipsebe.com'});
		},
		jumpRegister(){
			var url = location.href;
			location.href = userUrl + '/iprp/#/register?return_url=' + encodeURIComponent(url);
		},
		jumpLogin(){
			var url = location.href;
			location.href = userUrl + '/iprp/#/access/login?return_url=' + encodeURIComponent(url);
		},
		logout(){
			var self = this;
			self.$http.post(userUrl+ "/api/logout?access_token=" + self.$cookie.get('user_token'), {header: {withCredentials: true}})
			.then((response) => {
				self.clearCookie();
				//self.jumpLogin();
				//登录后回到首页
				location.href = userUrl + '/iprp/#/access/login?return_url=' + encodeURIComponent(indexUrl);
			})
			.catch((error) => {
				self.clearCookie();
				if (!error.response) {
					location.href = userUrl + '/iprp/#/access/login?return_url=' + encodeURIComponent(indexUrl);
					return;
				}
				var data = error.response.data;
				if (data.status === 401) {
					location.href = userUrl + '/iprp/#/access/login?return_url=' + encodeURIComponent(indexUrl);
				}else{
					self.$message.error(data.msg)
				}
			});
		},
		cartNavTo(){
			location.href = this.userName ? cartUrl+'/shop/pages/buycart.html' : userUrl + '/iprp/#/access/login?return_url=' + encodeURIComponent(cartUrl+'/shop/pages/buycart.html');
		},
		// 切换商家服务中心
		serviceClick(type){
			this.topIndex = true;
			let phone = VueCookie.get('phone');
			this.$http.get(`${userUrl}/api/member/phone/${phone}/exists`)
			.then( (resp) => {
				let data = resp.data;
				// 已经成功入驻，直接跳转商家中心首页
				if (data.spExists && data.applyExist) {
					console.log('跳转商家中心首页')
					this.enterStatus = 3;
					setTimeout(()=>{
						this.topIndex = false;
						if (location.host.indexOf('localhost') === 0) {
							location.href = 'http://localhost:9002/#/index/general?isBusinessUser=true';
						}
						else{
							let addr = '';
							// 商家中心
							if (type==1) {
								addr = '/#/index/general';
							}
							else if (type == 2) {  //服务中心
								addr = '/#service/myServiceOrder/list';
							}
							else if (type == 3) {  //订单管理
								addr = '/#trade/myOrder/list';
							}
							else if (type == 4) {  //店铺管理
								addr = '/#shop/shopManage/basicinfo';
							}
							location.href = decodeURIComponent(this.spUrl + addr) + '?isBusinessUser=true';
						}
					},600);
					return
				}
				if (data.applyExist && !data.spExists) {
					console.log('您提交的商家入驻申请正在审核中，请耐心等待。')
					this.enterStatus = 2;
					this.tipsShow = true;
					this.content = '您提交的商家入驻申请正在审核中，请耐心等待。如有疑问请咨询平台客服电话：0571-28253721。';
					this.btnText = '确定';
					return
				}
				if (!data.applyExist && !data.spExists) {
					console.log('您还未入驻成为拾贝商家！')
					this.enterStatus = 1;
					this.tipsShow = true;
					this.content = '您还未入驻成为拾贝商家！';
					this.btnText = '申请入驻';
					return
				}
			})
		}
	},
	filters: {
		ellipsis: function (pStr, pLen) {
			var cutString = function(pStr, pLen) {
				// 原字符串长度
				var _strLen = pStr.length;
				var _tmpCode;
				var _cutString;
				// 默认情况下，返回的字符串是原字符串的一部分
				var _cutFlag = "1";
				var _lenCount = 0;
				var _ret = false;
				if (_strLen <= pLen/2) {
						_cutString = pStr;
						_ret = true;
				}
				if (!_ret) {
						for (var i = 0; i < _strLen ; i++ ) {
								if (isFull(pStr.charAt(i))) {
										_lenCount += 2;
								} else {
										_lenCount += 1;
								}
								if (_lenCount > pLen) {
										_cutString = pStr.substring(0, i);
										_ret = true;
										break;
								} else if (_lenCount == pLen) {
										_cutString = pStr.substring(0, i + 1);
										_ret = true;
										break;
								}
						}
				}
				if (!_ret) {
						_cutString = pStr;
						_ret = true;
				}
				if (_cutString.length == _strLen) {
						_cutFlag = "0";
				}
				return {"cutstring":_cutString, "cutflag":_cutFlag};
			}
			var isFull = function(pChar) {
				if ((pChar.charCodeAt(0) > 128)) {
						return true;
				} else {
						return false;
				}
			}
			if (!pStr) {
				return pStr
			}
			var _ret = cutString(pStr, pLen);
			var _cutFlag = _ret.cutflag;
			var _cutStringn = _ret.cutstring;

			if ("1" == _cutFlag) {
					return _cutStringn + "...";
			} else {
					return _cutStringn;
			}
		},
	},
	watch:{
		cartNum(){
			this.cart_num = this.cartNum;
		},
		name(){
			this.userName = this.name;
		}
	}
}
</script>

<style>
	/*吊顶样式 从common.css 直接copy*/
	nav.topBar{background-color: #F8F8F8; color: #666; font-size: 13px;}
	.topBar{width: 100%;height: 36px;background: #fff;color: #666;font-size: 14px; }
	.topBar a{color: #666; font-size: 13px;}
	.topBar a:hover{color: #3db1fa;text-decoration: none;}
	.topBar a.black_link {color: #333;}
	.topBar a.black_link:hover {color: #3db1fa;}

	.topBar .top-left, .topBar .top-right {margin:0;padding:0;line-height: 35px;height: 35px;}
	.topBar .top-left>li, .topBar .top-right>li{line-height: 35px;height: 35px;float: left;margin-right:13px; font-size: 13px; }
	.topBar .top-right>li.zctools {margin-right: 0;}
	.topBar .top-left .phone{margin-right: 10px; }
	.topBar .top-left .welcome {color: #666;}
	.topBar .phone a{text-decoration: none;margin-right: 12px;font-weight: bold;color: #333;font-family: Arial;}
	.topBar .phone a:hover{cursor: default;}
	.topBar .top-buycart.top-buycart {padding: 0 10px; margin-right: 0;}
	.topBar .tocart{display: inline-block;}
	.topBar .tocart b{font-weight: normal;}
	.topBar .tocart .cart_icon {display: inline-block; width: 16px; height: 16px; background: url(~assets/img/header_footer/cart.png) no-repeat; background-size: 16px 16px; margin-right: 5px; position: relative; top: 2px;}
	.topBar .tocart:hover .cart_icon {background: url(~assets/img/header_footer/cart_active.png) no-repeat; background-size: 16px 16px;}
	.topBar .logout {margin-left: 10px;}
	.topBar .logout a{color: #999;}
	.topBar .top-right>li.kefu {margin-right: 0; padding: 0 10px;}
	.topBar .top-right>li.platform:before {position: absolute; content:''; width: 1px; height:10px; background: #ddd; left: 0; top: 13px; }
	.topBar .top-right>li.platform:after {position: absolute; content:''; width: 1px; height:10px; background: #ddd; right: 0; top: 13px; }
	.topBar .top-right>li.platform:hover:before {display: none;}
	.topBar .top-right>li.platform:hover:after {display: none;}

	/* 下拉菜单样式 */
	.topBar li.small-menu-wrap{position: relative;cursor: default; cursor: pointer; z-index: 102; border-left: 1px solid #F8F8F8;border-right: 1px solid #F8F8F8;}
	.topBar li.small-menu-wrap:hover {background-color: #fff; border-left: 1px solid #eee;border-right: 1px solid #eee;}
	.topBar .small-menu-wrap .hasmenu{display: inline-block; padding: 0 10px;position: relative;}
	.topBar .small-menu-wrap .til .fa{ color: #ddd;margin-left: 5px; font-size: 12px;width: 7px;position: relative;top: -1px;}
	.topBar .small-menu-wrap .til .fa-caret-up{display: none;}
	.topBar .small-menu-wrap .small-menu{
		box-sizing: content-box;
		margin-right: -1px;
		display: none;
		position:absolute;
		top: 34px;
		right: 0;
		z-index: 101;
		text-align: center;
		width: 280px;
		border:1px solid #eee;
		line-height: 30px;
		padding: 12px 0;
		background-color: #fff;
	}
	.topBar .small-menu-wrap .menu_item {width: 100%;}
	.topBar .small-menu-wrap .small-menu .menu_ul {width: 100%; min-height: 100%; overflow: hidden; padding: 0 15px; }
	.small-menu .menu_ul>li {width: 50px; float: left; margin-right: 30px;}
	.small-menu .menu_ul>li:first-child {width: 80px; }
	.small-menu .menu_ul>li:last-child {margin-right: 0; width: 60px;}
	.small-menu .menu_ul>li>a {display: inline-block; width: 100%; float: left; text-align: left; font-size: 12px; box-sizing:border-box; line-height: 24px; color: #333;}
	.small-menu .menu_ul>li>a:first-child {color: #333; font-weight: bold;}
	.small-menu .menu_ul>li>a:hover{color:#3db1fa;}
	.platform .menu_ul>li>a:first-child {color: #333; font-weight: normal;}

	.topBar .small-menu-wrap:hover span .fa-caret-up{display: inline-block;}
	.topBar .small-menu-wrap:hover span .fa-caret-down{display: none;}
	.topBar .small-menu-wrap:hover .hasmenu{height:34px;border-bottom: 1px solid #fff;box-sizing: content-box;z-index: 102;}
	.topBar .small-menu-wrap:hover .small-menu{display: block; }

	.topBar .top-left .site-nav-pipe,.topBar .top-right .site-nav-pipe{position: relative;top:12px;width: 1px; height: 10px;line-height: 10px;background-color: #999;overflow: hidden;}
	.topBar .top-buycart .shop-color{color: #666;}
	.topBar .top-buycart:hover .cart-icon{background-position: 0 -128px;}
	.topBar .top-buycart:hover a{text-decoration: none;}
	.topBar .top-buycart:hover a b{color:#3db1fa;}
	.topBar .top-login-regist{}
	.topBar .top-server{margin-right: 0;}
	.topBar .top-server a:hover{text-decoration: none;}
	.topBar .top-server a:hover .user-icon{background-position: 0 -78px;}
	.topBar .highlight a{color: #3DB1FA;}
</style>
