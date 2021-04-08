<template>
	<!-- 页尾 -->
	<footer class="fac_footer">
		<div class="container clearfix">
			<div class="fl nav ">
				<h3>为您导航<span>Navigation</span></h3>
				<ul class="clearfix clearfix">
					<li>
						<p>我是商家</p>
						<a :href="CONFIG.indexUrl+'/sebe/pages/facilitator.html#/'" target="_blank">成为商家</a>
						<a :href="CONFIG.spUrl+'/#index/general'" target="_blank">商家中心</a>
					</li>
					<li>
						<p href="#">我是会员</p>
						<a @click="jumpRegister">成为会员</a>
						<a :href="CONFIG.userUrl +'/iprp/#/main'"target="_blank">会员中心</a>
					</li>
					<li>
						<p>我是合伙人</p>
						<a :href="CONFIG.indexUrl+'/sebe/pages/channel.html#/'" target="_blank">加入合伙人</a>
					</li>
					<li>
						<p>关于拾贝</p>
						<a :href="CONFIG.indexUrl + '/cms/service/aboutsebe.htm'" target="_blank">关于我们</a>
						<a :href="CONFIG.indexUrl + '/cms/service/developprogress.htm'" target="_blank">发展历程</a>
						<a href="https://www.zhipin.com/gongsi/517d195406427d0403Fy09s~.html" target="_blank">诚聘英才</a>
						<a :href="CONFIG.indexUrl + '/cms/service/contactus.htm'" target="_blank">联系我们</a>
						<!-- <a :href="CONFIG.indexUrl + '/cms/sitemap.htm'" target="_blank">网站导航</a> -->
					</li>
				</ul>
			</div>
			<div class="fl link_us ">
				<h3>联系我们<span>Contact Us</span></h3>
				<p>联系地址：浙江省杭州市江干区红普路788号创智绿谷发展中心6号楼1202室</p>
				<p>客服热线：4000-315-426</p>
				<p>周一至周五：8:30-18:00</p>
				<div class="erweima">
					<div class="wechat">
						<img src="~assets/img/icon/wechat.png" />
						<div class="img_box">
							<div class="item">
								<img src="~assets/img/header_footer/wx_fwh.png" alt="">
								<p class="tit">拾贝服务号</p>
							</div>
							<div class="item dyh_item">
								<img src="~assets/img/header_footer/wx_dyh.png" alt="">
								<p class="tit">拾贝订阅号</p>
							</div>
						</div>
					</div>
					<div href="#" class="wechat weibo">
						<img src="~assets/img/icon/weibo.png" />
						<div class="img_box">
							<div class="item">
								<img src="~assets/img/header_footer/weibo.png" alt="">
								<p class="tit">拾贝微博</p>
							</div>
						</div>
					</div>
				</div>
				<p class="link_box">
					<a target="_blank" href="http://www.zjsgat.gov.cn:8080/was/portals/index.jsp"><img src="~assets/img/header_footer/wljc.png"></a>
					<a target="_blank" href="http://webscan.360.cn/index/checkwebsite/url/www.ipsebe.com"><img src="~assets/img/header_footer/360.png"></a>
				</p>
			</div>
			<div class="link fl">
				<span>友情链接：</span>
				<a href="https://ipp.alibabagroup.com/index.htm" target="_blank">阿里巴巴知识产权保护平台</a>
				<a href="http://sbj.saic.gov.cn/" target="_blank">商标局</a>
				<a href="http://www.sipo.gov.cn/" target="_blank">专利局</a>
				<a href="http://www.ncac.gov.cn/" target="_blank">版权局</a>
				<a href="http://www.cac315.net/" target="_blank">中国防伪网</a>
				<a href="http://samr.saic.gov.cn/" target="_blank">国家质量监督检测检疫总局</a>
				<a href="http://www.chinatt315.org.cn/zxss.html" target="_blank">产品质量申诉处理中心</a>
			</div>
			<div class="footer_bot clearfix">
				<div class="fl caasa">
					<a class="fl"><img src="~assets/img/header_footer/caasa1.png" alt=""></a>
					<p>中国产学研合作促进会反侵权假冒创新战略联盟 <a class="link" href="https://baike.baidu.com/item/%E4%B8%AD%E5%9B%BD%E5%8F%8D%E4%BE%B5%E6%9D%83%E5%81%87%E5%86%92%E5%88%9B%E6%96%B0%E6%88%98%E7%95%A5%E8%81%94%E7%9B%9F?sefr=ps" target="_blank">联盟简介</a></p>
					<p>China Anti-Infringement and Anti-Counterfeit Innovation Strategic Alliance</p>
				</div>
				<div class="fl sebe">
					<a href="#" class="fl"><img src="~assets/img/header_footer/sebe.png" alt=""></a>
					<p>杭州拾贝知识产权服务有限公司为中国产学研合作促进会反侵权假冒创新战略联盟理事长单位</p>
					<p><a href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action" target="_blank" class="link">浙ICP备15042618号</a> | <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010402003197" target="_blank" class="link">浙公网安备 33010402003197号</a> © 2018 拾贝公司 All Rights Reserved</p>
				</div>
			</div>
		</div>

	</footer>
</template>

<script>

const userUrl = CONFIG.userUrl;
import VueCookie from 'vue-cookie';

export default {
	data () {
		return {
			CONFIG: CONFIG,
			tipsShow: false,  // 入驻状态弹窗
			content: '',  //弹窗内容
			btnText: '',  //按钮内容
			enterStatus: 1,  //1.未入驻 2.正在审核 
		}
	},
	methods: {
		jumpRegister(){
			var url = location.href;
			location.href = userUrl + '/iprp/#/register?return_url=' + encodeURIComponent(url);
		},
	},
	mounted () {}
}
</script>


<style lang="scss">
/* 底部样式 */
.fac_footer{
	position: relative;
	&::after{content: '';height: 1px;width: 100%;background: #333;position: absolute;bottom: 82px;right: 0px}
	color: #999;background: #222;padding: 30px 0 0;
	h3{font-size: 14px;line-height: 30px;padding-bottom: 10px;
		span{padding-left: 10px;color:#666;}
	}
	.nav{
		padding: 0 150px 30px 0; width: 750px;
		ul{
			padding:10px 40px 0 0;
			border-top: 1px solid #333;
			font-size: 13px;
			li{float: left;line-height: 34px;padding: 0 40px 0 0;width: 140px;
				a{
					text-decoration: none;display: block;color:#999;
					&:hover {color: #3DB1FA;}
				}
			}
		}
	}
	.link_us{
		h3{width: 440px;border-bottom: 1px solid #333;margin-bottom: 10px;}
		p{font-size: 13px;line-height: 34px;}
		.link_box {
			text-align: left; width: 100%; height: 35px; float: left;
			a {
				float: left;
				width: 97px; height: 35px; display: inline-block; margin-right: 10px; position: relative;
				img {width: 100%; position: absolute; left: 0; top: 0; z-index: 10;}
				&:after {position: absolute; content:''; display: inline-block; width: 100%; height: 100%; z-index: 11; background: rgba(0,0,0,.5); }
			}
		}
		.erweima {
			width: 100%; height: 28px;
			a {
				float: left;
				img {width: 28px; height: 28px; margin: 0 10px 0 0;}
			}
			.wechat {
				position: relative; float: left; margin: 10px 10px 10px 0; cursor: pointer;
				.img_box {
					display:none; position: absolute; height: 120px; background: #fff; left: -200px; top: -50px; box-sizing: border-box; padding: 15px; box-shadow:4px 10px 30px 0px rgba(194,79,47,0.1); border-radius:2px;
					.item {
						width: 70px; margin-right: 15px; float: left;
						img {width: 70px; height: 70px; float: left; margin: 0;}
						.tit {text-align: center; font-size: 12px; color: #666; line-height: 20px; width: 100%; float: left;}
					}
					.dyh_item {margin-right: 0;};
				}
				&:after {display:none; position: absolute; content: ''; border: 6px solid transparent; border-right-width: 10px; border-left-width: 10px; width: 0; height: 0; border-left-color: #fff; left: -15px; top: 6px;}
				&:hover {
					.img_box {display: block;z-index: 12;}
					&:after {display: block;}
				};
			}
			.weibo {
				.img_box {
					left: 45px; display: none;
					.item {margin-right: 0;}
				}
				&:after {display:none; position: absolute; content: ''; border: 6px solid transparent; border-right-width: 10px; border-left-width: 10px; width: 0; height: 0; border-right-color: #fff; left: 25px; top: 6px;}
			}
		}
	}
	.link{
		font-size: 14px;
		// margin: 30px 0 20px;
		margin-bottom: 20px;
		>span{color: #999;line-height: 30px;}
		a{text-decoration: none;color: #666;padding-right: 30px;position: relative;line-height: 30px;
			&::after{content: '';height: 14px;width: 1px;background: #666;position: absolute;top: 3px;right: 15px}
			&:last-child::after{height: 0;}
			&:hover {color: #3DB1FA;}
		}
	}
	.footer_bot{
		padding: 20px 0 24px;
		.link {
			color: #999; font-size: 12px;
			&:hover { color: #3DB1FA;}
		}
		.caasa{
			p{padding-left: 80px;}
		}
		.sebe{padding:  0 0 0 93px;width: 688px;
			p{padding-left: 84px }
		}
	}
}
.fac_footer .container { width: 1200px; margin: 0 auto; overflow: hidden; }
</style>
