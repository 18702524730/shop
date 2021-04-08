<template>
	<div id="app">
		<sebe-header :cartNum="cartNum" :username="userName" :title="'我的购物车'"></sebe-header>
		<div class="shop" v-loading="loading">
			<div id="confirmOrder" v-if="cartData.length && !loading">
			<h3>全部商品</h3>
			<div class="orderTil">
				<span class="td-0"><label><input type="checkbox" id="checkall" name="" @click="checkSelectAll($event, cartData)" :checked="isCheckedAll">&nbsp;&nbsp;全选</label></span>
				<span class="td-1">商品名称</span>
				<span class="td-2">单价</span>
				<span class="td-3">数量</span>
				<span class="td-4">金额（元）</span>
				<span class="td-5">服务商</span>
				<span class="td-6">操作</span>
			</div>
			<div class="orderBody">
				<template v-for="(item, index) in cartData">
					<transition name="fade">
						<div class="td" v-if="item">
							<div class="td-0"><input type="checkbox" name="goodcheckbox"  class="checkbox" @click="checkSelect(item)" :checked="item.check"></div>
							<div class="td-1">{{item.productName}} <span v-if="item.status!=1">(已下架)</span></div>
							<div class="td-2">{{(item.standardPrice-0).toFixed(2)}}</div>
							<div class="td-3">
								<ul class="number">
									<li>
									<input type="button" value="-" :class="{diab:item.status!=1||item.productNum==1,hove:item.status==1&&item.productNum>1}" class="move" @click="move(item)">
									</li>
									<li>
									<input class="ordernumber" type="text" :class="{diab:item.status!=1}" v-model="item.productNum" @change="number(item)">
									</li>
									<li><input type="button" value="+" :class="{diab:item.status!=1,hove:item.status==1}" class="add" @click="add(item)"></li>
								</ul>
							</div>
							<div class="td-4">
								<span class="dicount">{{(item.standardPrice*item.productNum-0).toFixed(2) || 0}}</span>
							</div>
							<div class="td-5 service_code" :class="{ipt_focus: isFocus}" v-if="item.codes === 'sbfw_gnsb_zs'">
								<input v-show="item.isEdit" type="text" name="idCode" v-model="idCode" class="service_code_ipt" @focus="isFocus=true"  @blur="isFocus=false" placeholder="输入识别码"><span v-show="isIE9 && item.isEdit && !idCode" class="placeholder" @click="placeholderHanddle">输入识别码</span><a v-show="item.isEdit" href="" @click.prevent="saveServicerCode(cartData, item)" class="confirm_idcode">确定</a>
								<div class="tip-wrap" v-show="item.isEdit && isFocus">
									<i class="fa fa-caret-up" aria-hidden="true"></i><span class="service_code_tip">下单后如需修改，请联系客服4000-315-426</span>
								</div>
								<div class="has_servicer" v-show="!item.isEdit && item.idCode">
									<span class="ser_num">{{item.idCode}}服务商</span><span class="edit_service_code" @click="edit(cartData, item)">修改</span>
								</div>
							</div>
							<div class="td-5 service_code" v-if="item.codes !== 'sbfw_gnsb_zs'">--</div>
							<div class="td-6">
								<span class="del" @click="delItem(cartData,item,index)">删除</span>
							</div>
						</div>
					</transition>
				</template>
			</div>

			<div class="orderResult" :class="{orderResultFix:(cartData.length>13&&fixed)}">
				<div class="fl action">
					<p>共&nbsp;<span class="cartColor">{{totalGoods}}</span>&nbsp;件商品，已选择&nbsp;<span class="cartColor">{{checkedNumber}}</span>&nbsp;件<span class="cartText">（同一商品购买多件视为多件商品）</span></p>
				</div>
				<div class="fr total">
					合计：<span>&yen;{{amount.toFixed(2)}}</span>
					<button class="subOrder" @click="submitOrder">结算</button>
				</div>
			</div>
		</div>
		<div id="confirmOrder"  v-if="cartData.length==0 && !loading">
			<h3>我的购物车</h3>
			<div class="empty">
				<span class="tip">购物车是空的，先去选购服务吧！</span>
				<a :href="indexUrl" class="goshopping">前往首页</a>
			</div>
			
		</div>
		</div>
		<customer-service :cartNum="cartNum"></customer-service>
		<sebe-footer></sebe-footer>
	</div>
</template>

<script>
	import Vue from 'vue'
	import $ from 'jquery'
	import sebeHeader from 'components/HeaderSm.vue'
	import sebeFooter from 'components/FooterSm.vue'
	import customerService from 'components/CustomerService.vue'
	import qs from 'qs'
	const indexUrl = CONFIG.indexUrl;
	const userUrl = CONFIG.userUrl;
	// 检查标签是否支持该属性
	const ElementSupportAttribute = function(elm, attr) {
		var test = document.createElement(elm);
		return attr in test;
	};
	// 粗略判断，因为只要兼容ie9+
	const isIE9 = !ElementSupportAttribute('input', 'placeholder');
	export default {
		name: 'app',
		data () {
			return {
				isIE9: isIE9,
				idCode: '',
				isFocus:false,
				timer:'',
				indexUrl: indexUrl,
				loading: false,
				totalGoods:0,
				hover:false,
				fixed:true,
				scroll: '',
				isCheckedAll: true, //用于控制全选的checkbox
				isChecked: false, //用于控制商品条目的checkbox
				checkedNumber: 0,
				amount: 0,
				userName: "",
				cartNum:"",
				cartData: [
			],
			selectedIds: [],
				index:[]
			}
		},
		components: {
			sebeHeader,
			customerService,
			sebeFooter
		},
		mounted () {
			this.getCartList(true);
			var userName = this.$cookie.get('truename');
			var phone = this.$cookie.get('phone');
			if (phone) {
				phone = phone.slice(0, 3) + '****' + phone.slice(-4);
			}
			this.userName = userName ? userName : phone;
			this.cartNum = this.$cookie.get('cart_num') || '0';
			window.addEventListener('scroll', this.menu);
		},
		methods: {
			// 鼠标滚动
			menu() {
				this.scroll = $(window).scrollTop();
				if(this.cartData.length>13){
					var index = this.cartData.length*49-242;
					if(index-this.scroll<383){
						this.fixed = false;
					}else{
						this.fixed = true;
					}
				}
			},
			//动态数据
			changenumber(){
					var self = this;
					this.checkedNumber = 0;
					this.totalGoods = 0;
					var productNum = 0;
					for(var i=0;i<this.cartData.length;i++){
						this.totalGoods += parseInt(self.cartData[i].productNum);
						if(self.cartData[i].check){
							this.checkedNumber += parseInt(this.cartData[i].productNum);
						}
					}
			},
			numberurl(item,num){
				var self = this;
				self.load = false;
				this.$http.post('./cartWeb/addProductNum.htm', qs.stringify({
						cartId:item.id,
						productNum:num
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
								self.getCartList(false);
							}else{
								self.$message.warning("服务器繁忙，请稍后再试");
								self.getCartList(false);
						}
					}).catch(function (data) {
					})
			},
			// 计算器
			move(item){
				if(item.productNum>1){
					var self = this;
					item.productNum = parseInt(item.productNum)-1;
					self.changenumber();
					self.calculate(self.cartData);
					clearInterval(this.timer);
					this.timer = setTimeout(function(){
							self.number(item);
					},300);
				}
			},
			number(item){
				var self = this;
				self.load = false;
				let reg = /^[1-9]\d*$/;
				if(!reg.test(item.productNum)){
					this.$message.error("输入信息有误，请重新输入！");
					self.getCartList(false);
				}else if(item.productNum>=1){
					self.changenumber();
					self.calculate(self.cartData);
					this.numberurl(item,item.productNum);
				}
			},
			add(item){  
				var self = this;
				item.productNum++;
				self.changenumber();
				self.calculate(self.cartData);
				clearInterval(this.timer);
				this.timer = setTimeout(function(){
						self.number(item);
				},300);
			},
			// 查询预订单数据
			getCartList(isloaded){
				var self = this;
				if(isloaded){
					self.loading = true;
				}
				this.$http.post('./cartWeb/listcarts.htm', {}).then(function(response) {
					self.loading = false;
					var data = response.data;
					if (data.code == '0') {
						var cartData = data.data;
						if(cartData){
							for(var i=0;i<cartData.length;i++){
								var item = cartData[i];
								item.check = true;
								item.isEdit = false;
								if (item.isTrueIdCode === 0 || !item.idCode){
									item.isEdit = true;
								}
							}
							self.index.push(cartData);
							self.cartData = cartData;
							self.showServicerErrTip();
							self.calculate(self.cartData);
							self.changenumber();
							self.showEmpty = false;
						}
					} else if(data.code === '0100002'){
						self.$alert('登录已失效，请重新登录', '提示', {
							confirmButtonText: '重新登录',
							callback: action => {
								location.href = userUrl + '/iprp/#/access/login?return_url='+ location.href;
							}
							});
					}else if(data.code === '0140000'){
						self.$alert('系统繁忙，请稍后再试', '提示', {
							confirmButtonText: '确定'
							});
					}
				}).catch(function(response) {
					//location.href= userUrl + "/iprp/#/access/login?return_url="+location.href;
				});
			},
			// 去结算
			submitOrder (data) {
				console.log(data)
				if (!this.selectedIds.length) {
					this.$message('请选择商品条目');
				}else{
					location.href = './confirm.html?from=cart&ids='+this.selectedIds.join();
				}
			},
			delAjax (delIdsArr, tips, cal){
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
								idsList: delIdsArr
							}).then(function(response) {
								var data = response.data;
								if (data.code == 'success') {
									cal && cal();
								} else {
									self.$alert('服务器繁忙，请稍后再试', '提示', {
										confirmButtonText: '确定'
									});
								}
							}).catch(function(response) {
							});
						}
					}
				});
			},
			// 单条删除
			delItem (data,item,index){
				console.log(item)
				var tips = '确认删除选中商品？';
				var self = this;
				var number = index;
				this.delAjax([item.id], tips, function(){
					data.splice(number,1);
					self.changenumber();
					self.calculate(self.cartData);
					self.cartNum = self.$cookie.get("cart_num");
				});
			},
			// 批量删除
			delItems (temp){
				var self = this;
				var ids = this.selectedIds;
				var tips = '确认删除选中商品？';
				if (temp === true) {
					ids = ['-1'];
					tips = '确认清空购物车？';
				}else if(!ids.length) {
					this.$alert('请选择商品', '提示', {
						confirmButtonText: '确定'
					});
					return;
				}
				this.delAjax(ids, tips, function(){
					if (temp === true) {
						self.showEmpty = true;
						return;
					}
					var selectedIds = self.selectedIds;
					for (var i = selectedIds.length - 1; i >= 0; i--) {
						var id = selectedIds[i];
						var cartData = self.cartData;
					}
					self.selectedIds = [];
					self.checkRemainder();
				});
			},

			// 检查是否已全部删除
			checkRemainder(){
				var cartData = this.cartData, temp = 0;
				if (temp === cartData.length) {
					this.showEmpty = true;
				}
			},

			// 单条目勾选
			checkSelect(item){
				item.check=!item.check;
				var id = item.id; 
				this.changenumber();
				var temp = 0;
				$.each(this.cartData,function(index,item) {
					if(!item.check){
						temp = true
					}
				})
				if(!temp){
					this.isCheckedAll=true;
				}else{
					this.isCheckedAll=false;
				}
				this.calculate(this.cartData);
			},
			// 计算勾选的数量和金额
			calculate(arr){
				this.amount = 0;
				this.checkedNumber = 0;
				this.selectedIds = [];
				for (var l = arr.length, i = l - 1; i >= 0; i--) {
					var item = arr[i];
					var checkedNumber = parseInt(item.productNum);
					if(item.check){
						var price = item.standardPrice*item.productNum;
						this.selectedIds.push(item.id);
						this.amount += (price);
						this.checkedNumber += checkedNumber;
					}
				}
			},
			// 全选操作
			checkSelectAll(e, arr){
				var checked = e.target.checked;
				if (checked) {
					this.isCheckedAll = true;
					// 勾选单条目的checkbox
					for (var l = arr.length, i = l - 1; i >= 0; i--) {
						var el = arr[i];
						if(arr[i].status=="1"){
							el.check = true;
						}else{
							el.disabled=true;
							$(".add")[i].disabled=true;
							$(".move")[i].disabled=true;
						}
					}
					this.calculate(arr);
				} else {
					this.isCheckedAll = false;
					this.checkedNumber = 0;
					this.amount = 0;
					//去除勾选
					for (var l = arr.length, i = l - 1; i >= 0; i--) {
						var el = arr[i];
						el.check = false;
					}
				}
			},
			showServicerErrTip(){
				var cartData = this.cartData;
				var errIdCodeArr = [];
				cartData.forEach(function(item, i){
					//isTrueIdCode表示服务商状态 0 异常 1正常
					if (!item.isTrueIdCode && item.idCode) {
						errIdCodeArr.push(item.idCode);
					}
				});
				if (errIdCodeArr.length) {
					this.$message.warning(errIdCodeArr.join('、')+ '服务商账号异常。');
				}
			},
			placeholderHanddle(){
				$('.service_code_ipt').focus();
			},
			//点击修改
			edit(data, item){
				if (item.isBind) {
					this.$message.warning(item.idCode + '服务商正在为您服务中，如需修改指定服务商，请联系客服4000-315-426');
					return;
				}
				item.isEdit = true;
				this.idCode = item.idCode;
				this.cartData = [].concat(data);
			},
			//修改服务商后保存
			saveServicerCode(cartdata, item){
				//this.isFocus = false;
				var self = this;
				var cartId = item.id;
				var idCode = this.idCode;
				if (idCode && !/^[1-9]\d{3}$/.test(idCode)) {
					this.$message.error('服务商识别码为4位正整数');
					return;
				}
				this.$http.post('./cartWeb/addIdCode.htm', qs.stringify({
					cartId: cartId,
					idCode: idCode
				})).then(function(response) {
					var data = response.data;
					if (data.code == '200') {
						item.idCode = data.idCode || '';
						if (data.idCode) {
							item.isEdit = false;
						}
						self.cartData = [].concat(cartdata);
					} else if(data.code == '0100012'){
						self.$message.warning('当前'+idCode+'服务商暂时不具备该项服务能力，请核对识别码');
					}else if(data.code == '0100011' || data.code == '0100013'){
						self.$message.warning('当前'+idCode+'服务商账号异常，请重新指定');
					}else if(data.code == '0100010'){
						self.$message.warning(idCode+'服务商不存在');
					}else{
						//self.$message.warning(data.msg);
					}
				}).catch(function(response) {

				});
			}
		}
	}
	// 删除数组的某值
	function delArrayItem (arr, item){
		var idx = arr.indexOf(item);
		if(idx !== -1){
			arr.splice(idx, 1);
		}
	} 

	//获取url中的查询关键字
	function getQueryString(name) {
		var ret = '';
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = location.search.slice(1).match(reg);
		if (r != null) {
			ret = decodeURIComponent(r[2]);
		}
		return ret;
	}
	function parseUnparam (param, decode){
		var vars = {}, hash, i,
				urlParams = param.indexOf('?') > -1 ? param.split('?')[1] : param;
		var hashes = urlParams.split('&');
		for(i = 0; i < hashes.length; i++){
				hash = hashes[i].split('=');
				vars[hash[0]] = decodeURIComponent(hash[1]).replace(/\+/g, ' ');
		}
		return vars;
	};
</script>

<style >
.shop{background: #f5f5f5;padding-top: 15px;padding-bottom: 15px;min-height: 326px}
.cartColor{color: #fe2200}
.cartText{color: #666666}
.action p{font-size: 14px}
#app {
	color: #2c3e50;
	font-size: 12px;
	text-align: left;

}
h1, h2 {
	color: red;
	font-weight: normal;
}

ul {
	list-style-type: none;
	padding: 0;
}

a {
	color: #333;
} 
.el-loading-spinner .circular{width: 30px;}
.orderResultFix{position: fixed;bottom: 10px}

#confirmOrder{width: 1200px;margin: 0 auto;padding-bottom: 30px;background: #ffffff;padding: 25px 23px;border-radius: 1px}
#confirmOrder h3{font-size: 14px;height: 36px;line-height: 36px;margin-top: -8px;text-align: left;}
.orderTil{height: 56px;line-height: 56px;background-color: #e6e6e6;color: #333333;font-size: 14px;margin-top: 12px;}
.orderTil span{float: left;display: inline-block;text-align: center;}
#confirmOrder .td-0{width: 10%;height: 100%;vertical-align: middle;display: table-cell;text-align: center}
#confirmOrder .td-1{width: 21%;height: 100%;vertical-align: middle;display: table-cell;text-align: left;font-size: 14px}
#confirmOrder .td-1 span{color: #999}
#confirmOrder .td-2{width: 14%;height: 100%;vertical-align: middle;display: table-cell;text-align: right;padding-right: 60px;font-size: 14px}
#confirmOrder .td-3{width: 12%;height: 100%;vertical-align: middle;display: table-cell;}
#confirmOrder .td-4{width: 15%;height: 100%;vertical-align: middle;display: table-cell;text-align: right;padding-right: 40px}
#confirmOrder .td-5{width: 19%;height: 100%;vertical-align: middle;display: table-cell;}
#confirmOrder .td-6{width: 9%;height: 100%;vertical-align: middle;display: table-cell;}

.number{overflow: hidden;width: 83px;margin: auto;}
.number li{float: left;height: 28px;position: relative;margin-left: -1px;}
.number li:first-child{margin-left: 0;}
.number li .ordernumber{font-size: 14px;font-weight: 100;color: #666666;margin: -1px -1px 0;width: 35px;text-align: center;border: 1px solid #e0e0e0;height: 26px}
.number li input{line-height: 24px;border: 1px solid #e0e0e0;color: #b6b6b6;font-size: 21px;font-weight: 600;height:26px;width: 26px;margin-top: -1px;background: #fff}
.number li .diab{background: #eee;cursor: default;}
.hove{cursor: pointer}
.hove:hover{color: #333}
.orderBody .td{width: 100%;line-height: 26px;padding: 10px 0;text-align: center;display: table;border: 1px solid #e6e6e6;border-top: 0px}
.oldPrice{display: block;}
.through{text-decoration: line-through;}
.dicount{color: #ff4546;font-size: 14px;padding-right: 10px;}
span.del{cursor: pointer;color: #999999;font-size: 14px}
.orderResult{width: 1154px;z-index: 100;height:70px;clear: both;text-align: right;padding:10px 10px;background-color: #ffffff;margin-top: 20px;border: 1px solid #e6e6e6}
.action{height: 48px;line-height: 48px;font-size: 14px;}
.delSelected, .delAll{padding-left: 20px;cursor: pointer;}
.orderResult .total{font-size: 14px;height: 48px;line-height: 48px;}
.orderResult .total span{color:#ff4546;font-weight: 600}
.orderResult .subOrder{width: 160px;height: 50px;line-height: 50px;color: #fff;font-size: 16px;background-color: #f1331a;border-radius: 4px;margin-left: 20px;}
.orderResult .subOrder:hover{background: #e20000}
.goshopping{display: block;width: 160px;height: 50px;line-height: 50px;color: #fff;font-size: 16px;background-color: #ff4546;border-radius: 4px;text-align: center;}
.empty{text-align: right;font-size:18px;width:752px; margin:0 auto;height:400px;background: #fff url(~assets/img/empty.png) left center no-repeat;padding-top: 170px}
.empty .tip{font-size: 26px;color: #666}
.empty a{text-decoration: none;margin-left: 362px;margin-top: 25px;color: #fff;}
.empty a:hover{color: #fff;}
.fade-enter-active, .fade-leave-active {
	transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
	opacity: 0
}

.service_code{position: relative;}
.service_code .service_code_ipt{font-size:14px; width:100px;height: 30px;line-height:1 ;padding:0 10px;border: 1px solid #ddd; border-radius: 3px;color: #666;}
.service_code .service_code_ipt:focus{border-color: #3db2fa;}
.service_code .edit_service_code{color: #3db2fa;cursor: pointer;font-style: normal;margin-left: 5px;padding: 0 5px;}

.tip-wrap{position: absolute;top:35px;left: 40px;}
.service_code span.service_code_tip{display: none; width: 255px;height: 28px;padding-left:10px;line-height: 28px;border-radius: 3px;font-size: 12px;color: #fff;background-color: #424242;text-align: left;}
.ipt_focus span.service_code_tip{display: inline-block;}
.service_code a.confirm_idcode{margin-left: 10px;font-size: 14px;}
.service_code a.confirm_idcode:hover{text-decoration: none;}
.service_code .placeholder{position: absolute;left: 52px;top: 2px;color: #999;}

.service_code .fa{display:none; color: #424242;}
.ipt_focus .fa{display:inline-block;position: absolute;top: -8px;left: 15px;}
.has_servicer{font-size: 14px;height: 30px;line-height:30px;}
</style>
