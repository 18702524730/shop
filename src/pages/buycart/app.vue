<template>
<div id="app">
	<sebe-header :cartNum="cartNum" :username="userName" :title="'我的购物车'"></sebe-header>
	<div class="all_list clearfix commWidth" v-loading="loading">
		<searchHeard></searchHeard>
		<div class="shop_list shopWidth mt20" v-if="cartData && cartData.length && !loading">
			<div class="shop_list_heade clearfix">
				<h4>全部商品&nbsp;{{allCommodity}}</h4>
				<div class="chec_info fr">
					<p class="mr10">已选商品&nbsp;<span>{{babyNum}}</span>&nbsp;件<i style="width:10px;display:inline-block;"></i>合计：&nbsp;<span class="money">¥{{(totalPrices-0).toFixed(2)}}</span></p>
					<el-button size="mini" type="primary" @click="toDesk">结算</el-button>
				</div>
			</div>
			<div class="shop_info_list mt20">
				<table>
					<thead class="list_head">
						<th width="50"></th>    
						<th width="350" class="tl">店铺商品</th>
						<th width="200" class="tl">单价</th>
						<th width="170">数量</th>
						<th width="200" class="tl" style="padding-left:80px;">总计</th>
						<th>操作</th>
					</thead> 
				</table>
				<transition-group name="fade" tag="table">
					<table v-for="(item,indexNum) in cartData" class="mt20" :key="item.store.store_id">
						<thead class="list_head mb10">
							<th colspan="6" class="tl" style="padding-bottom:5px;">
								<el-checkbox v-model="item.store.check" :disabled="item.store.disabledBol" @change="storeCheck(item)">
									<span class="shop_name">店铺：<a :href="indexUrl+'/store/'+item.store.store_code+'.htm'" target="_blank">{{item.store.store_name|textIndex}}</a></span>
								</el-checkbox>
								<!-- 商务通 -->
								<a v-if="item.store.store_type == 1" class="link_seller" href="https://pct.zoosnet.net/LR/Chatpre.aspx?id=PCT70172520&lng=cn&p=http%3a%2f%2fwww.ipsebe.com">和我联系</a>
								<!-- qq -->
								<a v-if="item.store.store_type == 2" class="link_seller" target="_blank" :href="'http://wpa.qq.com/msgrd?v=3&amp;uin='+item.store.store_qq+'&amp;site=qq&amp;menu=yes'">和我联系</a>
							</th>
						</thead> 
						<tbody class="mt10">
							<tr v-for="(info,index) in item.services" :class="{'bor_detted':index>0,'check_hover':info.check}">
								<td style="width:400px;">
									<el-checkbox class="ml10 mr20" v-model="info.check" :disabled="info.groundStatus == 3||info.disabledBol" @change="commodityCheck(info,item)"></el-checkbox>
									<img :src="info.productPicture" alt="" @click="toDetails(info)">
									<p class="commodity ml25" :title="info.productName" :class="{'uncommodity':info.groundStatus == 3}" @click="toDetails(info)">
										{{info.productName}}
									</p>
									<div class="sold_out" v-if="info.groundStatus == 3">
										<img src="~assets/img/shop/SoldOut.png" alt="">
									</div>
								</td>
								<td width="200">
									<p class="unit_cost" v-if="info.payMoney" :class="{'uncost':info.groundStatus == 3}">¥{{(info.payMoney-0).toFixed(2)}}</p>
									<p class="unit_cost" v-else :class="{'uncost':info.groundStatus == 3}">¥{{(info.standardPrice-0).toFixed(2)}}</p>
								</td>
								<td width="150" class="tc">
									 <el-input-number size="small" v-model="info.productNum" :disabled="info.disabledBol" @change="numberurl(item.services,info)" :min="1" :max="45" label="" v-if="info.groundStatus != 3"></el-input-number>
								</td>
								<td width="200" style="padding-left:80px;">
									<p class="total_price" v-if="info.groundStatus != 3 && info.payMoney">¥{{((info.payMoney*info.productNum)-0).toFixed(2)}}</p>
									<p class="total_price" v-if="info.groundStatus != 3 && !info.payMoney">¥{{((info.standardPrice*info.productNum)-0).toFixed(2)}}</p>
								</td>
								<td class="tc" style="border-right:1px solid #eee;">
									<p class="cur_pointer" @click="delItem(item,info,index,indexNum)">删除</p>
								</td>
							</tr>
						</tbody>
					</table>
				</transition-group>
			</div>
			<div class="shop_footer clearfix mt35" :class="{'shop_footer_pos':scloll,'mb20':!scloll}">
				<p class="fr settle_accounts" @click="toDesk">结算</p>
				<p class="fr settle_sum mr10">合计：<span>¥{{(totalPrices-0).toFixed(2)}}</span></p>
				<p class="fr check_num mr10">已选商品&nbsp;<span>{{babyNum}}</span>&nbsp;件</p>
			</div>
		</div>
		<div class="shop_null shopWidth mt20" v-if="!cartData.length&&!loading">
			<img src="~assets/img/shop/shopNull.png" alt="">
			<p class="mt25">购物车内暂时没有商品哦，快去添加吧</p>
			<a :href="indexUrl"><el-button class="mt25" size="small">去添加</el-button></a>
		</div>
	</div>
	<el-dialog
	title=""
	:visible.sync="shopAllNum"
	width="30%"
	center
	class="max_shop_num">
	<p class="mb15"><i class="el-icon-warning"></i></p>
	<span>购物车数量上限是45件，请先完成支付！</span>
	<span slot="footer" class="dialog-footer">
		<el-button type="primary" @click="shopAllNum = false">知道了</el-button>
	</span>
</el-dialog>
	<sebeFooter></sebeFooter>
</div>
</template>

<script>
	import Vue from 'vue';
	import $ from 'jquery';
	import qs from 'qs';
	import sebeHeader from 'components/HeaderSm.vue';
	import sebeFooter from 'components/Footer.vue';
	import searchHeard from 'components/header/searchHead.vue';
	import Filters from 'assets/filters.js'
	const indexUrl = CONFIG.indexUrl;
	const trademarkUrl = CONFIG.trademarkUrl;
	
	const userUrl = CONFIG.userUrl;
	// 检查标签是否支持该属性
	const ElementSupportAttribute = function(elm, attr) {
		var test = document.createElement(elm);
		return attr in test;
	};
	// 粗略判断，因为只要兼容ie9+
	const isIE9 = !ElementSupportAttribute('input', 'placeholder');
	export default {
		data () {
			return {
				shopAllNum:false,
				shopNum:0,
				allCommodity:0,
				isIE9: isIE9,
				indexUrl: indexUrl,
				loading: false,
				userName: "",
				cartNum:"",
				cartData: [],
				index:[],
			 
				totalPrices:0,
				selectedIds:[],
				babyNum:0,
				scloll:false
			}
		},
		components: {
			sebeHeader,
			sebeFooter,
			searchHeard
		},
		mounted () {
			let self = this;
			var userName = this.$cookie.get('truename');
			var phone = this.$cookie.get('phone');
			if (phone) {
				phone = phone.slice(0, 3) + '****' + phone.slice(-4);
			}
			this.userName = userName ? userName : phone;
			this.cartNum = this.$cookie.get('cart_num') || '0';
			this.getCartList();
			window.onscroll = function(){
				//变量scrollTop是滚动条滚动时，距离顶部的距离
				var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
				//变量windowHeight是可视区的高度
				var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
				//变量scrollHeight是滚动条的总高度
				var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
				if(scrollTop+windowHeight>=scrollHeight-450){
					self.scloll=false;
				}else{
					self.scloll=true;
				}
			}
		},
		methods: {
			toDetails(item){
				if(item.orderBussinessType == 4){//交易订单
					window.open(trademarkUrl+'/trademark/'+item.productSn+'.htm')
				}else{
					window.open(indexUrl+'/store/service/'+item.productSn+'.htm')
				} 
			},
			toDesk(){//跳转收银台
				let self = this;
				if(this.babyNum > 45){
					this.shopAllNum = true;
					return;
				}
				this.cartData.forEach((item)=>{
						item.services.forEach((info)=>{
							if(info.check){
								self.selectedIds.push(info.id);
							}
						})
						return
				})
				if (!this.selectedIds.length) {
					this.$message('请选择商品条目');
				}else{
					location.href = './confirm.html?from=cart&ids='+this.selectedIds.join();
				}
			},
			allMove(){//全部选中状态初始化
				let self = this;
				self.cartData.forEach((item)=>{//初始化
					self.$set(item.store,'check',false);
					self.$set(item.store,'disabledBol',false);
					item.services.forEach((info)=>{
						self.$set(info,'check',false);
						self.$set(info,'disabledBol',false);
					})
				})
			},
			numberurl(item,data){//商品数量修改
				var self = this;
				console.log(item)
				this.allMoney(item)
				self.load = false;
				this.$http.post('./cartWeb/addProductNum.htm', qs.stringify({
						cartId:data.id,
						productNum:data.productNum
					})).then(function (data) {
						if(data.data.code == 0){
							self.cartNum = self.$cookie.get("cart_num");
						}else if(data.data.code === '0100002'){
							self.$alert('登录已失效，请重新登录', '提示', {
								confirmButtonText: '确定',
								callback: action => {
									location.href = userUrl + '/iprp/#/access/login?return_url='+ location.href;
								}
								});
						}else if(data.data.code === '0100005'){
							self.$message.warning("购物车数量上限为"+data.data.body+"，请先完成支付");
							self.getCartList();
						}else{
							self.$message.warning("服务器繁忙，请稍后再试");
							self.getCartList();
						}
					}).catch(function (data) {
					})
			},
			delAjax (index,delIdsArr, tips, cal){
				var self = this;
				self.load = false;
				self.$alert(tips, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					showCancelButton: true,
					callback: function(action){
						if (action == 'confirm') {
							self.$http.post('./cartWeb/deletecarts.htm', {
								idsList: [delIdsArr.id]
							}).then(function(response) {
								var data = response.data;
								if (data.code == 'success') {
									cal();
									self.delIndex(index,delIdsArr);
								} else {
									self.$alert(data.msg, '提示', {
										confirmButtonText: '确定'
									});
								}
							}).catch(function(response) {
							});
						}
					}
				});
			},
			delItem (data,item,index,indexNum){// 单条删除,要从cartData里面删除，便面删除为空时候头部还存在
				var tips = '确认删除选中商品？';
				var self = this;
				var number = index;
				this.delAjax(index,item, tips, function(){
					self.cartData[indexNum].services.splice(number,1);
					self.cartNum = self.$cookie.get("cart_num");
				});
				console.log(data)
			},
			delIndex(index,item){//删除商品后已选商品对应的变化
				console.log(this.cartData[index])
				if(item.check){
					this.babyNum = this.babyNum - item.productNum;
					this.totalPrices = this.totalPrices-(item.payMoney*item.productNum);
				}
				this.cartData.forEach((item,index)=>{//删除店铺下面没有数据的店铺
					if(!item.services.length){
						this.cartData.splice(index,1);
					}
				})
			},
			getCartList(){// 查询预订单数据
				let self = this;
				this.babyNum = 0;
				this.totalPrices = 0;
				console.log(self.allCommodity)
				self.loading = true;
				this.$http.post('./cartWeb/listcarts.htm', {}).then(function(response) {
					console.log(response.data.code,8888888888)
					self.loading = false;
				 if(response.data.code == 0){
							self.cartNum = self.$cookie.get("cart_num");
							self.allCommodity = 0;//全部商品数量初始化
							let data = response.data.data;
							if(data.length){
								data.forEach((item)=>{//添加check属性,添加禁止点击属性
									self.$set(item.store,'check',false);
									self.$set(item.store,'disabledBol',false);
									item.services.forEach((info)=>{
										info.payMoney = info.payMoney?info.payMoney / info.productNum:info.payMoney;
										self.$set(info,'check',false);
										self.$set(info,'disabledBol',false);
										self.allCommodity += 1;
									})
								})
								self.cartData = data;
							}else{
								self.cartData = data;
							}
							console.log(data)
						}else if(response.data.code === '0140000'){
							self.$alert('系统繁忙，请稍后再试', '提示', {
								confirmButtonText: '确定'
							});
						}else{//未登录，登录失效等，直接跳登录页
						// self.$alert('登录已失效，请重新登录', '提示', {
						//   confirmButtonText: '重新登录',
						//   callback: action => {
						//     location.href = userUrl + '/iprp/#/access/login?return_url='+ location.href;
						//   }
						//   });
						 location.href = userUrl + '/iprp/#/access/login?return_url='+ location.href; 
						}
				})
				.catch(function(err) {
					self.loading = false;
					console.log(err)
					//location.href= userUrl + "/iprp/#/access/login?return_url="+location.href;
				});
			},
			storeCheck(storeBol){//选中店铺
				console.log(storeBol)
				let self = this;
				if(!storeBol.store.check){
					self.totalPrices = 0;
					self.babyNum = 0;
					self.allMove()
					return;
				}else{
					self.cartData.forEach((item)=>{//初始化,不能跨店铺支付，所以其他店铺的选中全部设为未选中，且不能选中
						if(item.store.store_id == storeBol.store.store_id){
							this.$set(item.store,'disabledBol',false);
							item.services.forEach((info)=>{
								if(info.groundStatus != 3){
									self.$set(info,'check',true);
									self.$set(info,'disabledBol',false);
								}
							})
							this.allMoney(storeBol.services)
						}else{
							this.$set(item.store,'disabledBol',true);
							item.services.forEach((info)=>{
								this.$set(info,'check',false);
								this.$set(info,'disabledBol',true);
							})
						}
					})
				}
			},
			commodityCheck(data,storeData){//选中商品,需要对店铺状态进行处理
				let self = this;
				console.log(storeData)
				if(data.check){
					self.allMoney(storeData.services)
					self.cartData.forEach((item)=>{//初始化,不能跨店铺支付，所以其他店铺的选中全部设为未选中，且不能选中
						if(item.store.store_id == storeData.store.store_id){//选中的商品所在商铺不做处理
							self.$set(item.store,'disabledBol',false);
							item.services.forEach((info)=>{
								self.$set(info,'disabledBol',false);
							})
						}else{//未选中的商铺禁止选中
							self.$set(item.store,'disabledBol',true);
							item.services.forEach((info)=>{
								self.$set(info,'check',false);
								self.$set(info,'disabledBol',true);
							})
						}
					})
				}else{
					self.cartData.forEach((item)=>{//商铺下如果有未选中商品，取消全选状态
						if(item.store.store_id == storeData.store.store_id){
							console.log(item)
							item.store.check = false
							self.$set(item.store,'disabledBol',false);
						}
					})
					for(let r in storeData.services){//如果还有选中商品，则不做初始化
						if(storeData.services[r].check){
							self.allMoney(storeData.services)
							return;
						}
					}
					this.allMove();
					self.babyNum = 0;
					self.totalPrices = 0;
				}
			},
			allMoney(data){//总价计算
				let self = this;
				let allSum = 0;
				let babyNum = 0;
				data.forEach((infoNum)=>{
					if(infoNum.check){
						babyNum = infoNum.productNum + babyNum;
						allSum = (infoNum.payMoney*infoNum.productNum)+allSum;
					}
				})
				console.log(allSum)
				self.babyNum = babyNum;//宝贝数量
				self.totalPrices = allSum;
			}
		},
		filters:{
			textIndex:Filters.textIndex
		}
	}

</script>
<style lang="scss">
html body{background-color:#f8f8f8;min-width:1280px;height:100%;}
#app{
	.all_list{min-height:420px;background-color:#fff;}
	.shopWidth{width: 1200px;margin-left: auto;margin-right: auto;position: relative;}
	.shop_list{padding:30px 40px;background-color:#fff;margin-bottom: 30px;min-height:400px;padding-bottom:90px;
		.shop_list_heade{
			span,h4{font-size:16px;color:#3db1fa;line-height:22px;display:inline-block;}
			.chec_info{font-size:0;
				p{display:inline-block;font-size:14px;color:#666;
					span{display:inline-block;line-height:20px;}
					.money{color:#ff3939;font-size:14px;font-weight:bold;}
				}
			}
			.el-button{
				padding:4px 10px;vertical-align: baseline;border-radius:2px;
				span{line-height:14px;display:inline-block;font-size:14px;color:#fff;}
			}
			&:after{content:'';height:2px;width:1120px;background:linear-gradient(135deg,rgba(16,174,255,1),rgba(77,160,255,1));display:block;margin-top:10px;}
		}
		.shop_info_list{
			table{width:100%;
				.list_head{color:#999;
					.el-checkbox__input{vertical-align: initial;}
					.shop_name{display: inline-block;transform: translateY(3px);line-height:20px;color:#666;vertical-align: super;}
					.link_seller{padding-left: 34px;color: #666;background: url(~assets/img/icon/link.png) no-repeat 12px 1px;text-decoration: none;
					background-size: 16px 15px;vertical-align: bottom;}
				}
				thead{
					th{font-size:14px;font-weight:normal;padding:0 20px;}
				}
				tbody{
					border:1px solid #eee;background-color:#FCFCFC;
					tr{
						td{padding:20px;font-size:0;position: relative;
							img{width:90px;height:90px;vertical-align: middle;cursor: pointer;}
							span{font-size:14px;color:#333;}
							p{font-size:14px;cursor: pointer;}
							.commodity{display:inline-block;position: relative;width:200px;overflow:hidden;height:21px;vertical-align: inherit;white-space:nowrap;text-overflow:ellipsis;
								span{position: absolute;display:block;width:70px;height:20px;background-color:#ff3939;color:#fff;font-size:12px;text-align:center;line-height:20px;top:25px;left:3px;}
							}
							p.uncommodity{color:#999;}
							.unit_cost{color:#666;}
							p.uncost{color:#999;}
							.total_price{color:#333;font-weight:bold;}
							.el-input-number__decrease,.el-input-number__increase{top:2px;background-color:#f0f0f0;border-color:#e5e5e5;}
							.cur_pointer{cursor: pointer;}
							.sold_out{
								width:90px;height:90px;background-color:rgba(255,255,255,0.6);position: absolute;left:64px;top:20px;
								img{width:74px;height:74px;margin:8px;}
							}
						}
					}
					.bor_detted{border-top:1px dashed #eee;}
					.check_hover{background-color:#FFFAEC;}
				}
			}
		}
	}
	.shop_null{
		height:440px;background-color:#fff;text-align:center;padding-top:60px;margin-bottom: 20px;
		p{font-size:16px;color:#333;line-height:22px;}
		.el-button{color:#00B3FF;border-color:#01B4FF;font-size:14px;}
	}
	.shop_footer{
		width:1120px;background-color:#f1f1f1;height:50px;position: absolute;bottom:0;
		p{font-size:14px;line-height:50px;height:50px;
			span{line-height:50px;vertical-align: baseline;display:inline-block;}
			&.settle_sum{
				span{font-size:20px;color:#ff3939;}
			}
			&.check_num{
				span{font-size:18px;color:#3db1fa;line-height:52px;}
			}
		}
		.settle_accounts{width:144px;height:50px;background:linear-gradient(135deg,rgba(16,174,255,1),rgba(77,160,255,1));color:#fff;text-align:center;cursor: pointer;}
	}
	div.shop_footer_pos{position: fixed;width:1200px;bottom:0;background-color:#fff;z-index: 10;margin-left: -40px;padding-right: 39px;box-shadow: 0px -3px 13px #ddd;}
}
// 字体居中
.tl{text-align:left;}
.tc{text-align:center;}
.tr{text-align:right;}
.max_shop_num{
	.el-dialog{
		.el-dialog__body{
			text-align:center;
			p{
				i{font-size:40px;color:#ffc839;}
			}
		}
	}
}
</style>
