<template>
	<div id="app">
		<sebe-header :username="userName" :title="'确认订单'"></sebe-header>
		<!--确认订单信息-->
		<div class="confirmOrder clearfix" v-loading="loading" element-loading-text="加载中...">
			<Steps class="steps"></Steps>
			<h3>填写并核对订单信息</h3>
			<h4 class="mt40">确认订单信息</h4>
			<ul class="mt10 top_header clearfix">
				<li class="tr_01">店铺商品</li>
				<li class="tr_02">单价</li>
				<li class="tr_03">数量</li>
				<li class="tr_04">总计</li>
			</ul>
			<div class="shop_til clearfix">
				<span>店铺：</span><span class="shop_name"><a :href="orderData.manageType === 1 ? 'https://pct.zoosnet.net/LR/Chatpre.aspx?id=PCT70172520&lng=cn&p=http%3a%2f%2fwww.ipsebe.com' : `${indexUrl}/store/${orderData.storeCode}.htm`" target="_blank">{{orderData.storeName}}</a></span><a target="_blank" :href="'http://wpa.qq.com/msgrd?v=3&amp;uin='+orderData.storeQQ+'&amp;site=qq&amp;menu=yes'" class="mr15 link_seller">和我联系</a><!-- <el-checkbox v-model="needTransfer">国内商标转让服务自己找其他商家服务</el-checkbox> -->
			</div>
			<div class="mt10 shop_body">
				<ul class="clearfix" v-for="(item, index) in order">
					<li class="tr_01">
						<div>
							<a :href="`${cartUrl}/store/service/${item.goodsNum}.htm`" target="_blank"><img :src="item.productPicture" width="90" height="90"></a>
							<a class="name" :href="`${cartUrl}/store/service/${item.goodsNum}.htm`" target="_blank"><span>{{item.productName}}</span></a>
						</div>
					</li>
					<li class="tr_02">¥{{(item.standardPrice-0).toFixed(2)}}</li>
					<li class="tr_03">x{{item.productNum || 1}}</li>
					<li class="tr_04">¥{{(item.payMoney-0).toFixed(2)}}</li>
				</ul>
			</div>

			<h4 class="mt30" v-if="orderData.need_ticket === 1">发票信息</h4>
			<div class="mt10 invoice" v-if="orderData.need_ticket === 1">
				<el-form class="ruleForm" label-position="left" ref="ruleForm" auto-complete="off" label-width="130px">
					<el-form-item label="是否需要发票">
						<el-checkbox v-model="needInvoice">需要开票</el-checkbox>
					</el-form-item>
					<el-form-item label="开票类型" v-if="needInvoice">
						<el-radio-group v-model="invoice_type" @change="invoiceTypeChange">
							<el-radio :label="item.id" :key="item.id" v-for="item in invoiceOptionsData">{{item.name}}</el-radio>
						</el-radio-group>
						<el-popover
						  placement="right"
						  width="300"
						  trigger="hover">
						  <div class="code_tip">若需增值税专用发票，请联系商家客服处理</div>
						  <i class="invoice_tip" slot="reference"> </i>
						  <!-- <i class="seven hight" style="vertical-align: baseline;" slot="reference">7</i> -->
						</el-popover>

					</el-form-item>
					<el-form-item label="发票抬头" v-if="needInvoice">
						<div class="invoice_name_list">
							<span :class="{'cur': item.member_invoiceId === curInvoiceId}" v-for="(item, index) in invoiceListData" v-if="item.invoice_type == invoice_type" @click="curInvoiceId=item.member_invoiceId,curInvoice=item">{{item.invoice_title}}<i v-if="item.member_invoiceId === curInvoiceId"></i></span>
							<!-- 当仅有专用发票时，也要显示 -->
							<el-button v-if="invoiceListData.length!==10 && !invoiceListData.filter(item => {return item.invoice_type == invoice_type}).length" size="small" @click.prevent="invoiceDialogVisible=true">新增发票</el-button>
							<i v-else>开票信息最多保存10条，已保存{{invoiceListData.length}}条。<a :href="userUrl + '/iprp/#/invoiceList'" target="_blank">管理发票</a></i>
						</div>
					</el-form-item>
				</el-form>
				<a v-if="needInvoice" href="#" class="add" @click.prevent="invoiceDialogVisible=true">新增发票</a>
			</div>

			<h4 class="mt30">收件地址</h4>
			<div class="mt10 address">
				<el-form class="ruleForm" label-position="left" auto-complete="off" label-width="130px">
					<el-form-item label="收件地址">
						<div class="list">
							<ul class="scrollbar" :class="{'isFold': isFold}">
								<li v-for="(item, index) in addressListData">
									<span class="name" :class="{'cur': index === curAddressIndex}" @click="curAddressIndex=index" title="">{{item.true_name}}<i v-if="index === curAddressIndex"></i></span>
									<span class="addr" title="">{{item.area_info}}{{item.address}} {{item.tel_phone|numToStar}}</span>
									<span class="ml5 default" v-if="item.is_default==1">默认地址</span>
								</li>
								<li v-if="!addressListData.length"><el-button size="small" @click.prevent="addrDialogVisible=true">新增地址</el-button></li>
							</ul>
							<div class="toggle" v-if="addressListData.length>1 && isFold" @click="isFold=false">更多地址 <i class="fa fa-angle-double-down" aria-hidden="true"></i></div>
							<div class="toggle" v-if="!isFold" @click="foldUp(!isFold)">收起地址 <i class="fa fa-angle-double-up" aria-hidden="true"></i></div>
						</div>
					</el-form-item>
				</el-form>
				<a href="#" class="add" @click.prevent="addrDialogVisible=true">新增地址</a>
			</div>

			<div class="order_footer lr">
				<div class="total_wrap">
					<div class="normal total">{{order.length}}件商品，店铺合计：<span>¥{{(totalPrice-0).toFixed(2)}}</span></div>
					<div class="normal preferent" v-if="orderData.totalSalePrice">优惠费用：<span>¥{{(orderData.totalSalePrice-0).toFixed(2)}}</span></div>
					<div class="payTotal">实付款：<span>¥{{(payPrice-0).toFixed(2)}}</span></div>
				</div>
				<!-- <button class="backto" @click="backto">修改商品</button> -->
				<button class="subOrder" @click="submitOrder" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="订单正在提交...">立即下单</button>
			</div>
		</div>

		<!-- 新增地址 -->
		<el-dialog
			title="增加收件地址"
			:visible.sync="addrDialogVisible" :lock-scroll="false"
			width="514px" class="addressDialog">
			<el-form label-position="left" :model="addressData" :rules="rules" ref="ruleForm" auto-complete="off" label-width="94px" class="ruleForm">
				<el-form-item class="addAddress" label="收件人" prop="true_name">
					<el-input v-model="addressData.true_name" placeholder="请填写收件人姓名" :maxlength="60" ></el-input>
				</el-form-item>
				<el-form-item class="addAddress" label="收件人电话" prop="tel_phone">
					<el-input v-model="addressData.tel_phone" placeholder="请填写收件人电话" :maxlength="13"></el-input>
				</el-form-item>

				<el-form-item class="addAddress" label="收件人邮箱" prop="email">
					<el-input v-model="addressData.email" placeholder="请填写收件人邮箱" :maxlength="50" ></el-input>
				</el-form-item>

				<el-form-item label="收件地址" class="form-group" required>
					<el-form-item class="address_option form-ipt-sm fl mr10" prop="province_id">
						<el-select v-model="addressData.province_id" placeholder="请选择省" @change="changeProvince('addressData', addressData.province_id)">
							<el-option
								v-for="item in provinceData"
								:key="item.area_id"
								:label="item.name"
								:value="item.area_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="address_option form-ipt-sm fl mr10" prop="city_id">
						<el-select v-model="addressData.city_id" placeholder="请选择市" @change="changeCity('addressData', addressData.city_id)">
							<el-option
								v-for="item in cityData"
								:key="item.area_id"
								:label="item.name"
								:value="item.area_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="address_option form-ipt-sm fl" prop="area_id">
						<el-select v-model="addressData.area_id" placeholder="请选择区">
							<el-option
								v-for="item in areaData"
								:label="item.name"
								:key="item.area_id"
								:value="item.area_id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form-item>
				<el-form-item class="addAddress" label="详细地址" prop="address">
					<el-input v-model="addressData.address" placeholder="具体到街道、门牌号等" :maxlength="80"></el-input>
				</el-form-item>

				<el-form-item class="addAddress" label="收件人邮编" prop="zip_code" :maxlength="6">
					<el-input v-model="addressData.zip_code" :maxlength="6" placeholder="请填写收件人邮编" ></el-input>
				</el-form-item>
				<el-form-item label="">
					<el-checkbox v-model="isDefault">设为默认</el-checkbox>
				</el-form-item>
				<div class="lc">
					<el-button class="btn_info" type="primary" @click="saveAddressAction('ruleForm')">保存</el-button>
				</div>
			</el-form>
		</el-dialog>

		<!-- 新增发票 -->
		<el-dialog
			title="增加开票信息"
			:visible.sync="invoiceDialogVisible" :lock-scroll="false"
			width="560px" class="invioceDialog">
			<el-form label-position="left" :model="invoiceData" :rules="invioceRules" ref="invioceRuleForm" auto-complete="off" label-width="110px" class="ruleForm">
				<el-form-item label="请选择开票类型" prop="invoice_type">
					<el-radio-group v-model="invoiceData.invoice_type">
						<el-radio :label="1">增值税普通发票</el-radio>
						<!-- <el-radio :label="2">增值税专用发票</el-radio> -->
					</el-radio-group>
				</el-form-item>
				<el-form-item class="addAddress" label="发票抬头" prop="invoice_title">
					<el-input v-model="invoiceData.invoice_title" placeholder="请填写发票抬头" :maxlength="60" ></el-input>
				</el-form-item>
				<el-form-item class="addAddress" label="纳税人识别号" prop="invoice_code">
					<el-input v-model="invoiceData.invoice_code" placeholder="请填写纳税人识别号" :maxlength="20"></el-input>
				</el-form-item>

				<el-form-item v-if="invoiceData.invoice_type == 2" class="addAddress" label="注册电话" prop="regist_phone">
					<el-input v-model="invoiceData.regist_phone" placeholder="请填写注册电话，固话区号后请加" :maxlength="13" ></el-input>
				</el-form-item>

				<el-form-item v-if="invoiceData.invoice_type == 2" label="注册地址" class="form-group" required>
					<el-form-item class="address_option form-ipt-sm fl mr10" prop="province_id">
						<el-select v-model="invoiceData.province_id" placeholder="请选择省" @change="changeProvince">
							<el-option
								v-for="item in provinceData"
								:label="item.name"
								:key="item.area_id"
								:value="item.area_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="address_option form-ipt-sm fl mr10" prop="city_id">
						<el-select v-model="invoiceData.city_id" placeholder="请选择市" @change="changeCity">
							<el-option
								v-for="item in cityData"
								:label="item.name"
								:key="item.area_id"
								:value="item.area_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="address_option form-ipt-sm fl" prop="area_id">
						<el-select v-model="invoiceData.area_id" placeholder="请选择区">
							<el-option
								v-for="item in areaData"
								:label="item.name"
								:key="item.area_id"
								:value="item.area_id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form-item>
				<el-form-item v-if="invoiceData.invoice_type == 2" class="addAddress" label="详细地址" prop="address">
					<el-input v-model="invoiceData.address" placeholder="具体到街道、门牌号等" :maxlength="80"></el-input>
				</el-form-item>

				<el-form-item v-if="invoiceData.invoice_type == 2" class="addAddress" label="开户行名称" prop="account_bank">
					<el-input v-model="invoiceData.account_bank" :maxlength="30" placeholder="请填写对公账户的开户行名称" ></el-input>
				</el-form-item>
				<el-form-item v-if="invoiceData.invoice_type == 2" class="addAddress" label="银行账号" prop="account_number">
					<el-input v-model="invoiceData.account_number" :maxlength="19" placeholder="请填写对公账户的银行账号" ></el-input>
				</el-form-item>
				<div class="taxbot">
					<p v-if="invoiceData.invoice_type == 1">大陆企业必填，其他开票申请人无需填写</p>
					<p v-if="invoiceData.invoice_type == 2">仅限一般纳税人企业填写，小规模纳税人请选择增值税普通发票</p>
				</div>
				<el-form-item label="">
					<el-checkbox v-model="isDefault">设为默认</el-checkbox>
				</el-form-item>
				<div class="lc">
					<el-button class="btn_info" type="primary" @click="saveInvioceAction('invioceRuleForm')">保存</el-button>
				</div>
			</el-form>
		</el-dialog>

		<!-- <customer-service :cartNum="cartNum"></customer-service> -->
		<sebe-footer></sebe-footer>
		<mini-login :showMini='showMini' @closeMini='closeMini' @callbackDo="loginSuccess"></mini-login>

	</div>
</template>

<script>
	import Vue from 'vue'
	import sebeHeader from 'components/HeaderSm.vue'
	import sebeFooter from 'components/Footer.vue'
	import customerService from 'components/CustomerService.vue'
	//import applySubject from 'components/applySubject/ApplySubject.vue'
	import Steps from './components/Steps.vue'
	import miniLogin from 'components/miniLogin.vue'
	import { EventBus } from 'assets/common/event-bus.js';
	import Filters from 'assets/filters.js'
	import qs from 'qs'
	const indexUrl = CONFIG.indexUrl;
	const cartUrl = CONFIG.cartUrl;
	const path = CONFIG.path;
	const userUrl = CONFIG.userUrl;
	const addressUrl = userUrl + '/api/areas';
	const invoiceOptionsData = [
		{
			id: 1,
			name: '增值税普通发票'
		}/*,
		{
			id: 2,
			name: '增值税专用发票'
		}*/
	];
	const InvoiceData = {
		invoice_type:2,
		member_invoiceId:'',
		is_default:0,
		invoice_title:'',
		invoice_code:'',
		regist_phone:'',
		province_id:'',
		city_id:'',
		area_Id:'',
		area_Info:'',
		address:'',
		account_bank:'',
		isDefault:false,
		account_number:''
	};
	const InvoiceDataSm = {
		invoice_type:1,
		is_default:0,
		invoice_title:'',
		invoice_code:'',
	};
	//纳税人识别号
	let invoiceCodeCheck = (rule, value, callback) => {
		let reg = /(^[a-zA-Z0-9]{15}$)|(^[a-zA-Z0-9]{18}$)|(^[a-zA-Z0-9]{20}$)/;
		if (!rule.required && !value) {
				callback();
		}
		if (rule.required && !value) {
				return callback(new Error('请填写纳税人识别号'));
		}
		setTimeout(() => {
				if (!reg.test(value)) {
					callback(new Error('纳税人识别号格式错误'));
				} else {
					callback();
				}
		}, 50);
	};
	//联系电话验证
	let inviocePhone = (rule, value, callback) => {
		let reg = /(^1\d{10}$)|(^\d{3,4}-\d{7,8}$)|(^\d{7,8}$)/;
		if (!value) {
				return callback(new Error('请填写企业联系电话'));
		}
		setTimeout(() => {
				if (!reg.test(value)) {
					callback(new Error('请填写正确的联系电话'));
				} else {
					callback();
				}
		}, 50);
	};
	//手机号码验证
	let checkPhone = (rule, value, callback) => {
		let reg = /(^1\d{10}$)|(^\d{3,4}-\d{7,8}$)|(^\d{7,8}$)/;
		if (!value) {
			return callback(new Error('请填写收件人电话'));
		}
		setTimeout(() => {
			if (!reg.test(value)) {
				callback(new Error('联系电话格式错误'));
			} else {
				callback();
			}
		}, 200);
	};
	let code = (rule, value, callback) => {
		let reg = /^[0-9]/;
		if (!value) {
			return callback(new Error('请填写邮政编码'));
		}
		if (value.length < 6) {
				return callback(new Error('邮政编码仅限6位字符'));
		}
		setTimeout(() => {
			if (!reg.test(value)) {
				callback(new Error('请填写6位阿拉伯数字'));
			} else {
				callback();
			}
		}, 200);
	};
	let email = (rule, value, callback) =>{
		let mail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!value) {
				return callback(new Error('请填写收件人邮箱'));
		}
		if (value.length > 50) {
				return callback(new Error('收件人邮箱输入过长'));
		}
		setTimeout(() => {
			if (!mail.test(value)) {
				callback(new Error('收件人邮箱格式错误'));
			} else {
				callback();
			}
		}, 200);
	}
	const InvioceRules = {
		invoice_title:[
			{ type: "string",required: true, message: '请填写发票抬头', trigger: 'blur' }
		],
		invoice_code:[
			{ required: true, validator:invoiceCodeCheck, trigger: 'blur' }
		],
		regist_phone: [
			{ type: "string",validator:inviocePhone, required: true,trigger: 'blur' }
		],
		account_number:[
			{ required: true, message: '请填写银行账号', trigger: 'blur' },
			{ pattern: /^[1-9]{1}\d{8,19}$/, message: '请输入正确的银行账号', trigger: 'blur' }
		],
		account_bank:[
			{ required: true, message: '请填写开户行名称', trigger: 'blur' },
		],
		province_id: [
			{type: 'integer', required: true, message: '请选择省份', trigger: 'change' }
		],
		city_id: [
			{type: 'integer', required: true, message: '请选择城市', trigger: 'change' }
		],
		area_id: [
			{type: 'integer', required: true, message: '请选择区', trigger: 'change' }
		],
		address: [
			{ required: true, message: '请填写企业注册地址，与企业登记证件保持一致', trigger: 'blur' },
		]
	};
	const InvioceRulesSm = {
		invoice_title:[
			{ type: "string",required: true, message: '请填写发票抬头', trigger: 'blur' }
		],
		invoice_code:[
			{ validator:invoiceCodeCheck, trigger: 'blur' }
		],
	};

	export default {
		name: 'app',
		data () {
			return {
				userUrl: userUrl,
				indexUrl: indexUrl,
				cartUrl: cartUrl,
				invoiceOptionsData: invoiceOptionsData,
				needInvoice: false,
				needTransfer: false,
				invoice_type: 1,
				curInvoice: {},
				curInvoiceId: '',
				curAddressIndex: 0,
				isFold: true,

				addrDialogVisible: false,
				invoiceDialogVisible: false,

				provinceData:[],
				cityData:[],
				areaData:[],
				isDefault:false,
				addressListData:[],//地址列表
				invoiceListData:[],//发票列表
				addressData:{
					true_name: '',
					tel_phone: '',
					email:'',
					province_id:'',
					city_id:'',
					area_id:'',
					address:'',
					zip_code:''
				},
				rules: {
					// address:[
					//   { type: "string",required: true, message: '请填写收件人地址', trigger: 'blur' }
					// ],
					true_name:[
						{ type: "string",required: true, message: '请填写收件人姓名', trigger: 'blur' },
						{ min: 1, max: 60, message: '收件人姓名不能超过60个字', trigger: 'blur' }
					],
					tel_phone: [
						{ type: "string",validator:checkPhone, required: true,trigger: 'blur' }
					],
					province_id: [
						{type: 'integer', required: true, message: '请选择省份', trigger: 'change' }
					],
					city_id: [
						{type: 'integer', required: true, message: '请选择城市', trigger: 'change' }
					],
					area_id: [
						{type: 'integer', required: true, message: '请选择区', trigger: 'change' }
					],
					address: [
						{type: "string", required: true, message: '请填写收件人地址', trigger: 'blur' },
						{ min: 1, max: 80, message: '详细地址输入过长', trigger: 'blur' }
					],
					email:[
						{ type: "string",validator:email, required: true,trigger: 'blur' }
					],
					zip_code:[
						{ type: "string",validator:code, required: true,trigger: 'blur' }
					]
				},
				invoiceData: InvoiceDataSm,
				invioceRules: InvioceRulesSm,

				showMini: false,
				cartNum:"",
				userName: "",

				loading: false, //查询加载
				buyGoodData: {}, //url带过来的参数
				orderData:{}, //订单信息
				order:[],//订单中的商品信息
				goodsNum:'', //商品id, 用于返回修改
				productNum: 1, //商品数量, 用于返回修改
				payPrice:'', //实付款
				totalPrice:'', //合计
				submitDisabled: false, //防二次提交
				fullscreenLoading: false, //提交时加载
			}
		},
		components: {
			sebeHeader,
			customerService,
			//applySubject,
			sebeFooter,
			Steps,
			miniLogin,
		},
		mounted () {
			EventBus.$on('needLogin', () => {
				this.needLogin();
			});
			this.initProvince();
			this.getAddressList();
			this.needInvoice && this.getInvoiceList();
			console.log(this.$filters)
			//return;
			this.buyGoodData = this.$util.parseUnparam(location.href);
			this.getApplicantOrderInfo();
			var userName = this.$cookie.get('truename');
			var phone = this.$cookie.get('phone');
			if (phone) {
				phone = phone.slice(0, 3) + '****' + phone.slice(-4);
			}
			this.userName = userName ? userName : phone;
			this.cartNum = this.$cookie.get('cart_num') || '0';
		},
		computed: {

		},
		methods: {
			resetForm(formName){
				this.$refs[formName].resetFields();
			},
			foldUp(isFold){
				this.isFold = !!isFold;
				if (this.curAddressIndex != 0) {
					let item = {...this.addressListData[0]};
					this.addressListData[0] = this.addressListData[this.curAddressIndex];
					this.addressListData[this.curAddressIndex] = item;
					this.curAddressIndex = 0;
				}
			},
			needLogin() {
				this.$message.warning('未登录或登录已失效，请登录');
				this.showMini = true;
			},
			closeMini () {
				this.showMini = false;
			},
			loginSuccess(){
				//this.isLogin = true;
				var userName = this.$cookie.get('truename');
				var phone = this.$cookie.get('phone');
				if (phone) {
					phone = phone.slice(0, 3) + '****' + phone.slice(-4);
				}
				this.userName = userName ? userName : phone;
				this.cartNum = this.$cookie.get('cart_num') || '0';
				this.getApplicantOrderInfo();
				this.getAddressList();
				this.needInvoice && this.getInvoiceList();
			},
			// 查询地址数据
			getAddressList(notMatchDefault, address_id){
				this.$http.get(userUrl + '/api/address?t='+new Date().getTime())
				.then((resp) => {
					this.loading = false;
					let data = resp.data;
					this.addressListData = data.elements;
					if (notMatchDefault) {
						this.addressListData.some((item, index) => {
							if(item.address_id == address_id) {
								this.curAddressIndex = index;
								return true;
							}
						});
						this.foldUp(this.isFold);
					}else{
						this.setAddressChecked();
					}
				})
				.catch((err) => {
					this.loading = false;
					this.addressListData = [];
				});
			},
			//设置地址选中的
			setAddressChecked(){
				if (
					!this.addressListData.some((item, index) => {
						if (item.is_default == 1) {
							this.curAddressIndex = index;
							return true;
						}
					})
				) {
					this.curAddressIndex = '';
				}
			},
			//查询发票数据
			getInvoiceList(notMatchDefault){
				this.$http.get(userUrl +'/api/invoice?t='+new Date().getTime())
				.then((resp) => {
					var data = resp.data;
					this.invoiceListData = data.elements;
					!notMatchDefault && this.setInvoiceChecked();
				})
				.catch((err) => {
					this.invoiceListData = [];
				});
			},
			//设置发票选中的
			setInvoiceChecked(){
				if (
					!this.invoiceListData.some(item => {
						if (item.invoice_type == this.invoice_type && item.is_default == 1) {
							this.curInvoiceId = item.member_invoiceId;
							this.curInvoice = item;
							return true;
						}
					})
				) {
					this.curInvoiceId = '';
				}
			},
			//保存地址
			saveAddress(formName){
				let self = this;
				if (self.submitDisabled) {
					return;
				}
				self.submitDisabled = true;
				let data = { ...self.addressData };
				data.is_default = self.isDefault ? '1' : '0';
				data.area_info = self.getAreaInfo(this.addressData);
				self.$http.post(userUrl + '/api/address',data)
				.then((resp) => {
					self.submitDisabled = false;
					let data = resp.data;
					if (data) {
						self.$notify({
							title: '成功',
							message: '新增收件地址成功',
							type: 'success'
						})
						//需要设置当前选中的
						self.getAddressList(true, data.address_id);
						self.resetForm(formName);
						self.addrDialogVisible = false;
					}
				})
				.catch((err) => {
					self.submitDisabled = false;
					self.$message.error(err.response.data.msg);
				});
			},
			//保存地址动作
			saveAddressAction(formName){
				var self = this;
				if (self.submitDisabled) {
					return;
				}
				self.submitDisabled = true;
				self.$refs[formName].validate((valid) => {
					if(valid){
						self.submitDisabled = false;
						self.$confirm('确认添加该地址吗?', '提示', {
							type: 'warning',
							closeOnClickModal: false,
							lockScroll: false,
						})
						.then(() => {
							self.saveAddress(formName);
						})
						.catch(() => {
						});
					}else{
						self.submitDisabled = false;
					}
				})
			},
			//保存发票
			saveInvioce(formName){
				let self = this;
				if (self.submitDisabled) {
					return;
				}
				self.submitDisabled = true;
				let data = { ...self.invoiceData };
				data.is_default = self.isDefault ? '1' : '0';
				if (data.province_id) {
					data.area_info = self.getAreaInfo(this.invoiceData);
				}
				self.$http.post(userUrl + '/api/invoice',data)
				.then((resp) => {
					self.submitDisabled = false;
					let data = resp.data;
					if (data) {
						console.log(data)
						self.$notify({
							title: '成功',
							message: '添加成功',
							type: 'success'
						})
						//设置当前选中的
						self.invoice_type = data.invoice_type;
						self.curInvoiceId = data.member_invoiceId;
						self.curInvoice = data;
						self.getInvoiceList(true);
						self.resetForm(formName);
						self.invoiceDialogVisible = false;
					}
				})
				.catch((err) => {
					self.submitDisabled = false;
					self.$message.error(err.response.data.msg);
				});
			},
			//保存发票动作
			saveInvioceAction(formName){
				var self = this;
				if (self.submitDisabled) {
					return;
				}
				self.submitDisabled = true;
				self.$refs[formName].validate((valid) => {
					if(valid){
						self.submitDisabled = false;
						self.$confirm('确认添加该开票信息吗?', '提示', {
							type: 'warning',
							closeOnClickModal: false,
							lockScroll: false,
						})
						.then(() => {
							self.saveInvioce(formName);
						})
						.catch((err) => {
						});
					}else{
						self.submitDisabled = false;
					}
				})
			},
			// 初始化省份
			initProvince(){
				var self = this;
				this.$http.get(addressUrl+'?pId=0')
				.then(function(resp){
					resp = resp.data;
					if(resp.elements){
						self.provinceData = resp.elements;
					}else {
						console.error(resp.msg);
					}
				})
				.catch((error) => {
					console.error(error);
				});
			},
			// 省份切换渲染城市 城市切换渲染区
			_triggerChange (code, dataName, callback){
				var self = this;
				self[dataName] = [];
				if(!code){
					return;
				}
				this.$http.get(addressUrl+'?pId='+ code)
				.then(function(resp){
					resp = resp.data;
					if(resp.elements){
						self[dataName] = resp.elements;
						callback && callback();
					}else {
						console.error(resp.msg);
					}
				})
				.catch((error) => {
					console.log(error);
				});
			},
			//更改省
			changeProvince(formName, provinceCode, prevfix){
				this[formName].area_id = '';
				this[formName].city_id = '';
				this._triggerChange(provinceCode,  (prevfix ? prevfix : '') + 'cityData');
			},
			//更改市
			changeCity(formName, cityCode, prevfix){
				this[formName].area_id = '';
				this._triggerChange(cityCode, (prevfix ? prevfix : '') + 'areaData');
			},
			//获取选中的省市区对应的中文名称
			getSelectName (code, dataName){
				var data = this[dataName];
				var ret = '';
				data.forEach((item, i) => {
					if (item.area_id == code) {
						ret = item.name;
						return false;
					}
				});
				return ret;
			},
			//地址拼接area_info
			getAreaInfo(data, prevfix){
				var area_id = data.area_id;
				var province_id = data.province_id;
				var city_id = data.city_id;
				return [this.getSelectName(province_id, 'provinceData'), this.getSelectName(city_id, (prevfix ? prevfix : '') + 'cityData'), this.getSelectName(area_id, (prevfix ? prevfix : '') + 'areaData')].join(' ');
			},
			invoiceTypeChange(){},
			//返回修改
			backto(){
				if (this.buyGoodData.from === 'cart') {
					location.href = path + '/shop/pages/buycart.html';
				}else{
					location.href = path + '/products/'+ this.goodsNum +'.htm?num='+ this.productNum;
				}
			},
			//查询确认订单信息 主体信息独立出去了
			getApplicantOrderInfo(){
				//json数据模拟
				//this.$http.get('/src/assets/json/listconfirm.json').then(function(response) {
				// console.log(this.buyGoodData.ids)
				var self = this;
				self.loading = true;
				this.$http.post('./cartWeb/cartPlaceOrderNew.htm', {idsList: this.buyGoodData.ids.split(',')})
				.then(function(response) {
					self.loading = false;
					var data = response.data;
					if (data.code == 'success') {
						self.orderData = data;
						self.order = data.data.order;
						self.payPrice = data.payPrice;
						self.totalPrice = data.totalPrice;
						//self.needInvoice = data.needTicket === 1;
						self.goodsNum = self.order[0].goodsNum;
						self.productNum = self.order[0].productNum;
					}else if(data.code == '0100002'){
						self.needLogin();
						/*self.$confirm('登录已失效，请重新登录', '提示', {
							confirmButtonText: '重新登录',
							showCancelButton: false,
							type: 'warning',
							lockScroll: false,
						}).then(() => {
							self.needLogin();
						}).catch(() => {
							self.needLogin();
						});*/
					}else{
						//location.href = path + '/error.html';
					}
				})
				.catch(function(error) {
					self.loading = false;
				});
			},
			// 正式生成订单
			submitOrder (data) {
				var self = this;
				// 通过购物车生成订单
				//if (this.buyGoodData.from === 'cart') {
					if (self.needInvoice && !self.curInvoiceId) {
						self.$message.error('请确认发票信息');
						return;
					}
					if (self.curAddressIndex === '') {
						self.$message.error('请确认收货地址');
						return;
					}
					if (self.submitDisabled) {
						return;
					}
					self.submitDisabled = true;
					self.fullscreenLoading = true;
					var d = {
						idsList:self.buyGoodData.ids.split(','),
						need_ticket: self.needInvoice ? 1 : 2,
						store_code: self.orderData.storeCode,
						member_address: self.addressListData[self.curAddressIndex]
					}
					if (self.needInvoice) {
						d.member_invoice = self.curInvoice;
					}
					self.$http.post('./cartWeb/generateservieorder.htm', d)
					.then((resp) => {
						self.submitDisabled = false;
						self.fullscreenLoading = false;
						var data = resp.data;
						if (data.code == 'success') {
							location.href = './pay.html?order_sn='+ data.data.payOrder[0]['orderNum']
						} else {
							if (data.msg == '请登录' || data.code == '0100002') {
								self.$confirm('登录已失效，请重新登录', '提示', {
									confirmButtonText: '重新登录',
									showCancelButton: false,
									type: 'warning',
									lockScroll: false,
								}).then(() => {
									self.needLogin();
								}).catch(() => {
									self.needLogin();
								});
							}else{
								self.$alert('系统繁忙，请稍候再试。', '提示', { lockScroll: false });
							}
						}
					})
					.catch((err) => {
						self.$alert('系统繁忙，请稍候再试。', '提示', { lockScroll: false });
						self.submitDisabled = false;
						self.fullscreenLoading = false;
					});

				// 通过详情页生成订单
				/*} else {
					this.$http.post('./orderweb/generateorder.htm', {
						idsList:this.buyGoodData.ids.split(','),
						bodyList: this.bodyList
					})
					.then(function(response) {
						var data = response.data;
						if (data.code == 'success') {
							location.href = './pay.html?order_sn='+ data.data.orderNum
						} else {
							console.log(data.msg);
						}
					})
					.catch(function(error) {

					});
				}*/

				function getOrderSn(arr){
					var ret = [];
					for (var i = arr.length - 1; i >= 0; i--) {
						ret.push(arr[i].orderNum);
					}
					return ret.join();
				}
			},
		},
		watch: {
			needInvoice(){
				this.needInvoice && this.getInvoiceList();
			},
			'invoiceData.invoice_type': function(){
				if (this.invoiceData.invoice_type == 1) {
					this.invioceRules = InvioceRulesSm;
					this.invioceData = Object.assign({}, InvoiceDataSm);
				}
				if (this.invoiceData.invoice_type == 2) {
					this.invioceRules = InvioceRules;
					this.invioceData = Object.assign({}, InvoiceData);
				}
				this.$nextTick(() => {
					this.$refs.invioceRuleForm.clearValidate();
				});
			},
			invoice_type() {
				this.invoiceData.invoice_type = this.invoice_type;
				this.getInvoiceList();
			},
			addrDialogVisible(){
				this.isDefault = false;
				if (this.addrDialogVisible) {
					this.$nextTick(() => {
						this.$refs.ruleForm.resetFields();
					});
				}
			},
			invoiceDialogVisible(){
				if (this.invoiceDialogVisible) {
					this.$nextTick(() => {
						this.invoiceData.invoice_type = this.invoice_type;
						this.$refs.invioceRuleForm.clearValidate();
					});
				}
			}
		},
		filters: {
			numToStar: Filters.numToStar,
		}
	}

</script>

<style lang="scss">
	.el-loading-spinner .circular{width: 30px;}
	.confirmOrder{
		width: 1200px;padding: 40px 40px 40px;font-size: 14px;
		margin: 20px auto 20px;min-height: 600px;background-color: #fff;
		.steps{float: right;margin-top: -182px; margin-right: -40px;}
		h3{font-size: 18px;color: #666;font-weight: normal;}
		h4{font-weight: 600;font-size: 16px;}
		//公用部分
		.tr_01{width: 500px;}
		.tr_02{width: 230px;}
		.tr_03{width: 275px;}
		.tr_04{width: 80px;}

		.top_header{
			border-top: 3px solid #eee;
			height:60px;line-height: 60px;
			li{float: left;color: #999;}
			.tr_01{padding-left: 68px;}
			.tr_02{padding-left: 10px;}
			.tr_03{}
			.tr_04{padding-left: 15px;}
		}
		.shop_til{
			vertical-align: middle;
			>span{height:20px;line-height:20px;display: inline-block;vertical-align: middle;color: #666;}
			.shop_name{max-width: 154px;display: inline-block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;vertical-align: middle;margin-right: 20px;}
			.el-checkbox__label{color: #333;padding-left: 5px;}
		}
		.shop_body{
			border: 1px solid #eee;
			ul{
				border-bottom: 1px dashed #eee;height:130px;background-color: #FCFCFC;
				li{float: left;height:130px;padding: 20px 0;line-height: 90px;overflow: hidden;}
				.tr_01{
					padding-left: 30px;overflow: hidden;
					>div{
						height:90px;display:table;vertical-align:middle;line-height: 20px;padding-right: 30px;
						a.name{height:90px;display:inline-block;vertical-align:middle;line-height: 20px;display:table-cell;padding-left: 25px;overflow: hidden;}
						a{
							img{border:1px solid #E8E8E8;}
						}
					}
				}
				.tr_02{color: #666;}
				.tr_03{color: #666;padding-left: 5px;}
				.tr_04{font-weight: bold;}
				&:last-child{border-bottom:0;}
			}
		}
		.invoice{
			position: relative;border: 1px solid #eee;padding:18px 30px 12px 30px;
			.el-form-item{
				margin-bottom: 0;line-height: 38px;min-height:38px;
				.el-form-item__label{color: #999;}
				.el-form-item__content,label{line-height: 38px;min-height:38px;}
				i.invoice_tip{vertical-align: middle;display: inline-block;width: 14px;height: 14px;line-height: 14px;background: transparent url(~assets/img/icon/info.png) 0 0 no-repeat;margin-left: 5px;background-size:14px 14px;
				}
			}
			.invoice_name_list{
				padding-top: 4px;
				>span{display: inline-block;height:30px;padding: 0 10px;color: #666;border: 1px solid #eee;line-height: 28px;margin-right: 10px;cursor: pointer;max-width:224px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
				span.cur{
					position: relative;background:#F6FCFF;color: #3DB1FA;border: 1px solid #3DB1FA;
					i{position: absolute;bottom: 0;right: 0px;width:12px;height:10px;background: transparent url(~assets/img/icon/checked.png) 0 0 no-repeat;}
				}
				>i{font-style: normal;color: #999;height:30px;line-height: 30px;display: inline-block;vertical-align: top;}
			}
			.add{line-height: 38px;height:38px;position: absolute;top: 18px;right: 60px;color: #3771AC;}
		}
		.address{
			position: relative;border: 1px solid #eee;padding:18px 20px 0px 30px;
			.el-form-item__label{color: #999;}
			.list{
				ul{
					max-height: 160px;overflow-y: auto;transition: all 0.3s ease-out;
					li{
						height:40px;padding-bottom: 10px;
						>span{vertical-align: middle;color: #666;}
						.name{position: relative;display: inline-block;height:30px;padding: 0 10px;color: #666;border: 1px solid #eee;line-height: 28px;margin-right: 10px;cursor: pointer;max-width:224px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
						.name.cur{
							background:#F6FCFF;color: #3DB1FA;border: 1px solid #3DB1FA;
							i{position: absolute;bottom: 0;right: 0px;width:12px;height:10px;background: transparent url(~assets/img/icon/checked.png) 0 0 no-repeat;}
						}
						.addr{display: inline-block; max-width:520px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
						.default{display: inline-block;padding: 0 5px;height:20px;line-height: 20px;text-align: center;background-color: #eee;font-size: 12px;border-radius:2px;}
					}
				}
				ul.isFold{max-height: 40px;overflow-y: hidden;}
				.toggle{height:30px;line-height: 30px;color: #666;cursor: pointer;display: inline-block;}
			}
			.add{line-height: 38px;height:38px;position: absolute;top: 20px;right: 60px;color: #3771AC;}
		}
		.order_footer{
			clear: both;text-align: right;padding-top: 40px;
			.total_wrap{
				background-color: #F6FCFF;padding: 15px 15px 20px;
				.normal{
					font-size: 14px;height: 20px;line-height: 20px;color: #999;margin-bottom: 5px;
					span{font-family: arial;color: #333;}
				}
				.payTotal{
					font-size: 14px;height: 28px;line-height: 28px;color: #333;font-weight: 600;
					span{font-size: 20px;color:#FF3939;font-family: arial;font-weight: 600;}
				}
			}
			.backto{height: 42px;line-height: 42px;color: #999;font-size: 14px;border:0;margin-right:30px;}
			.subOrder{
				font-size: 16px;width:164px;height:42px;line-height: 42px;color: #fff;background-color: rgba(77,160,255,1);background-image:linear-gradient(135deg,rgba(16,174,255,1),rgba(77,160,255,1));
			}
		}
		.test_postcss{display: flex;}
	}
	.form-ipt-sm{width: 120px;}
	.through{text-decoration: line-through;}
	.dicount{color: #ff4546}
	.dialog-confirm > .el-dialog{
		width:650px;min-height:300px;padding:20px 30px 35px;
	}
	.invioceDialog{
		.el-dialog{
			min-height: 384px;
			.form-ipt-sm{width: 130px;}
			.taxbot{
				padding-left: 110px;
			}
		}
	}
	.addressDialog{
		.el-form-item{height: 40px;}
	}
</style>
