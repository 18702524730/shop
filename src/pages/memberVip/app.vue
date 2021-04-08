<template>
	<div id="app">
			<sebe-header :cartNum="cartNum" :userName='userName' :title="'购买VIP'"></sebe-header>
			<div class='memberVip'>
				<vip-list ref='vipList' @getVipList='getVipList' @getMemberVip = 'getMemberVip' @homepageClick='homepageClick'  @getCurrentLevel='getCurrentLevel'></vip-list>
				<div class='order'>
					<p class="prize">价格总计:&nbsp;<span>¥{{need_paid}}</span></span></p>
					<p class='paid'>实付金额:&nbsp;<span>¥{{fact_paid}}</span></p>
					<button v-loading.fullscreen.lock="fullscreenLoading"  :class=" need_paid == 0 || vipCurrentLevel == 7 ? 'disabled' : '' " @click='getOrder'>{{order_btn_message}}</button>
				</div>
			</div>
			<sebe-footer></sebe-footer>
			<customer-service :cartNum='cartNum'></customer-service>
			<mini-login :showMini='showMini' @closeMini='closeMini'></mini-login>
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
						 order_api: './cartWeb/nowPlaceOrderCombine.htm',  //下单接口
						 order_arr: [],      //订单  数组
						 vipLevelArr: [],    //vip 数组
						 vip_obj: {},        //传递的参数
						 defaultBtn: true,   //表示的是按钮
						 fullscreenLoading: false,
						 vipPrimaryValue: 0, //表示的是钱
						 vipSend: true,
						 vipCurrentLevel: '', //当前等级  9表示未登录
						 defaultBtn: true,   // 预防重复点击的  order 按钮
						 showMini: false,     //表示的是当前的属性
						 userName: '',        //表示的是用户名字
						 order_btn_message: '立即下单',
						 plain: false,   // 表示 提示消息
						 loading: false,  //表示还在加载
						 discountPrice: '', // 表示的是当前的折扣数值
							cartNum:'',
							userName:''

					}

			},
			computed: {

				need_paid () {  //表示的总价格
					return this.vipPrimaryValue.toFixed(2);
				},

				fact_paid () { //表示折扣的价格
						if ( this.vipPrimaryValue > 0 ) {
							var disCountPrice = this.vipPrimaryValue - this.discountPrice;
						} else {
							var disCountPrice = this.vipPrimaryValue
						}
						return disCountPrice.toFixed(0) + '.00';
				}
			},


			methods: {
				homepageClick(){
					var userName = this.$cookie.get('truename');
					var phone = this.$cookie.get('phone');
					if (phone) {
						phone = phone.slice(0, 3) + '****' + phone.slice(-4);
					}
					this.userName = userName ? userName : phone;
					this.cartNum = this.$cookie.get('cart_num') || '0';
				},
				//获取列表  vip
				getVipList(vipLevelArr) {
					this.vipLevelArr = vipLevelArr;
				},

				//表示的是获取等级
				getCurrentLevel (level,vipLevelArr,userName,discountPrice) {
					this.vipCurrentLevel = level; //实际等级
					this.discountPrice = discountPrice - 0;  //表示折扣的值
					this.userName = userName; //用户名
					this.vipLevelArr = vipLevelArr; //vip 列表
					if (!this.vipLevelArr.length) {return;}
					if( level == 7 ) {
						this.vipPrimaryValue = 0;
						return false
					}
					if( level < 7 ) { //如果登录  等级存在 则选择比等级高一级的vip商品
						level++;
						this.vipPrimaryValue = Number(this.vipLevelArr[level].standardPrice); // 初始化价格
						var obj = {
								'shopProductId': this.vipLevelArr[level].shopProductId ,
								'shopProductTypeIdProductType': this.vipLevelArr[level].shopProductTypeIdProductType ,
								'shopProductTypeIdServiceType': this.vipLevelArr[level].shopProductTypeIdServiceType,
								'number': 1
							};
						Object.assign( this.vip_obj , obj );
						return false
					}
					if ( level == 10 ) { //如果等级不存在 表示未登录  让价格初始化为0
						this.vipPrimaryValue = 0;
					}

				},


				//表示 点击vip框的事件  index 表示点击的框的index current_index为实际等级 viplevel 是vip列表数组
				getMemberVip (index,vipLevelArr,state) {
					this.vipLevelArr = vipLevelArr;
					if ( index == 9 ) { //这里如果index == 9 表示的是取消当期的  选中框
							this.vipPrimaryValue = 0;  // this.vipPrimaryValue  表示购买的vip的价格
							this.vipSend = false;
							return false;
					}
					this.vipSend = true;   //vipSend 表示是否要购买vip true为购买 false为不够买
					this.vipCurrentIndex = index;  //获取当前等级
					this.vip_obj = {};
					if (!this.vipLevelArr.length) {
						return;
					}
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
				},

				// open  表示 信息弹出提示
				open (msg) {
					this.$notify({
						title: '警告',
						message: msg,
						type: 'warning'
					});
					this.defaultBtn = true;   //商标下单事件结束  true按钮能够点击 false  按钮不能点击
				},

				 //表示的是登录
				closeMini () {
					this.$refs.vipList.getCurrentLevel();  //执行子组件的获取登录情况的事件
					this.showMini = false;
				},


				getOrder () {
					if( this.vipCurrentLevel == 10 ) { //如果当前等级为10级 表示当前用户未登录
						this.showMini = true;      //未登录显示登录框
						return false
					}
					if( !this.defaultBtn ) { //用来避免多次点击事件  false  事件还没有完成 true  事件完成了
						return false
					} ;
					this.defaultBtn = false;    //用来避免多次点击事件  false  事件还没有完成 true  事件完成了
					if ( this.vipCurrentLevel  == 7 ) { //如果是等级7了 表示已经是最高等级了
						this.$notify({
							title: '警告',
							message: '已经达到最高等级,请和管理员联系',
							type: 'warning'
						});
						this.defaultBtn = true;
						return;
					} ;
					this.order_arr = [];  //传递到后台的下单的参数
					if(!this.vipSend) {   //true 表示有购买的vip false  没有购买的vip
						return false
					}
					this.order_btn_message = '请稍等...';
					this.order_arr.push(this.vip_obj);
					this.fullscreenLoading = true;
					this.$http.post(this.order_api,this.order_arr).then((resp)=> {
						this.fullscreenLoading = false;
						if ( resp.data.code == '0140000') {
							this.order_btn_message = '立即下单';
							this.$notify({
									title: '警告',
									message: resp.data.msg,
									type: 'warning'
							});
							this.defaultBtn = true;   //表示 下单事件结束
						} else if( resp.data.code == '0100001' ) {
							this.showMini = true;
							this.$refs.vipList.getCurrentLevel();   //执行子组件的获取登录情况的事件
							this.$notify({
									title: '警告',
									message: resp.data.msg,
									type: 'warning'
							});
							this.order_btn_message = '立即下单'; //重置下单按钮的值
							this.defaultBtn = true; //表示 下单事件结束
						} else if ( resp.data.code == '0100002') { //表示登录失效 重新登录
							this.order_btn_message = '立即下单';
							// this.$notify({
							//     title: '警告',
							//     message: '您的登录已失效，请重新登录',
							//     type: 'warning'
							// });
							this.showMini = true;
							this.defaultBtn = true; //表示 下单事件结束
							return false
						} else if( resp.data.code == 'success') {
							location.href = 'pay.html' +'?order_sn=' + resp.data.data.payOrder[0].orderNum;
						} else {
								this.order_btn_message = '立即下单';  //重置下单按钮的值
								this.$notify({
										title: '提示',
										message: '系统繁忙，请稍后再试',
										type: 'warning'
								});
								this.defaultBtn = true;  //表示 下单事件结束
						}

					}).catch((error)=> {
						this.fullscreenLoading = false;
						if ( error.response.data.code == '0140000') {  // 系统错误
							this.order_btn_message = '立即下单';
							this.open('系统繁忙，请稍后再试');
							this.defaultBtn = true;
						} else if( error.response.data.code == '0100001' ) {
							this.showMini = true;
							this.$refs.vipList.getCurrentLevel();
							this.open (resp.response.data.msg);
							this.order_btn_message = '立即下单';
							this.defaultBtn = true;
						} else if ( error.response.data.code == '0100002') { //登录失效 重新执行子组价里面的获取登录情况
							this.order_btn_message = '立即下单';
							this.open(resp.response.data.msg);
							this.showMini = true;
							this.defaultBtn = true;
						} else {  //其他状况
								this.open ('系统繁忙，请稍后再试');
								this.defaultBtn = true;
						}
					})
				}

			}

	}

</script>


<style scoped lang="scss">
		#app {
				font-family: Microsoft YaHei;
				background: #f5f5f5;

				.memberVip {
					margin: 0 auto;
					padding: 0 0 15px 20px;
					max-width: 1170px;
					clear: both;

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
									font-weight: bolder;
									font-size: 14px;
									color: #333;
								}
						}

						.paid {
							top: 55px;
							font-size: 14px;

							span {
								font-weight: bolder;
								font-size: 14px;
								color: #fe2200;
							}


						}

						button {
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

					.checked {
						background: #000;
					}

				}


		}





</style>
