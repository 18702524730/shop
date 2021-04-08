<template>
	<!-- 侧边栏 -->
	<div class="sider_bar">
		<div class="item cart">
			<a href="javascript:void(0)" @click="cartNavTo" >
				<i class="icon"></i>
				<span class="num" v-if="cart_num">{{ cart_num }}</span>
				<p class="title">购物车</p>
			</a>
		</div>
		<div class="item">
			<a href="http://pct.zoosnet.net/LR/Chatpre.aspx?id=PCT70172520&lng=cn&p=http%3a%2f%2fwww.ipsebe.com" target="_blank">
				<i class="el-icon-service"></i>
				<p class="title">联系客服</p>
			</a>
		</div>
		<div class="item">
			<a href="http://pct.zoosnet.net/LR/Chatwin3.aspx?id=PCT70172520&amp;p=3" target="_blank">
				<i class="el-icon-edit-outline"></i>
				<p class="title">反馈意见</p>
			</a>
		</div>
		<div class="item back_top" id="back_top" v-if="showBackTop" @click="backtop">
			<i class="el-icon-upload2"></i>
			<p class="title">返回顶部</p>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'
const cartUrl = CONFIG.cartUrl;
const userUrl = CONFIG.userUrl;
export default {
	props: ['width', 'cartNum'],
	data () {
		return {
			cartUrl: cartUrl,
			cart_num: '0',
			consultantCompute: '',
			showBackTop: false
		}
	},
	mounted () {
		var self = this;
		self.init();
		$(window).on('scroll', function(){
			if($(this).scrollTop() > 180){
				self.showBackTop = true;
			}else{
				self.showBackTop = false;
			}
		});
	},
	methods: {
		init(){
			this.cart_num = this.$cookie.get('cart_num') || '0';
		},
		// 重新计算定位
		reCompute(){
			//this.consultantCompute = 'right:auto;left:'+ ((document.body.clientWidth-this.width)/2+this.width)+ 'px';
			this.consultantCompute = 'right:5px;';
		},
		// 返回顶部
		backtop(){
			$('body,html').animate({scrollTop: 0}, 300, 'swing');
		},
		cartNavTo(){
			var userName = this.$cookie.get('truename') || this.$cookie.get('phone');
			window.open(userName ? cartUrl+'/shop/pages/buycart.html' : userUrl + '/iprp/#/access/login?return_url=' + encodeURIComponent(cartUrl+'/shop/pages/buycart.html')); 
		}
	},
	watch:{
		cartNum(){
			this.cart_num = this.cartNum || '0';
		}
	}
}
</script>


<style lang="scss">  
	/*侧边栏*/
	.sider_bar {position: fixed; right: 0; top: 45%; width: 80px; height: auto; z-index: 999;}
	.sider_bar .item {width: 80px; height: 80px; float: right; border: 1px solid #eee;background-color: #fff; text-align: center; box-sizing:border-box; padding-top: 15px; cursor: pointer; position: relative;margin-top: -1px;}
	.sider_bar .cart .icon {display: inline-block; width: 26px; height: 26px; background: url(~assets/img/header_footer/cart.png) no-repeat; background-size: 26px 26px;}
	.sider_bar .cart:hover .icon {background: url(~assets/img/header_footer/cart_active.png) no-repeat; background-size: 26px 26px;}
	.sider_bar .item:last-child {border-bottom: 1px solid #eee;}
	.sider_bar .item i {font-size: 26px; color: #666;}
	.sider_bar .item .img {width: 26px; height: 26px;}
	.sider_bar .item .num {position: absolute; right: 22px; top: 12px; width: 16px; height: 16px; line-height: 16px; display: inline-block; font-size: 12px; color: #fff; text-align: center; background-color: #3DB1FA; border-radius: 50%;}
	.sider_bar .item .title {width: 100%; text-align: center; font-size: 12px; color: #666; margin-top: 5px;}
	.sider_bar .back_top {}
	.sider_bar .item:hover a{text-decoration: none;color: #3DB1FA;}
	.sider_bar .item:hover i, .sider_bar .item:hover .title{color: #3DB1FA;}
</style>
