<style lang="scss">
*{box-sizing: border-box;}
.mr0{margin-right: 0!important;}
.cutPrice{
	text-align: center;
	display: block;
	font-size: 13px;
	color: #fff;
	background: #FF763C;
	width: 48px;
	line-height: 22px;
	height: 22px;
	position: absolute;
	top: -5px;
	border-radius: 2px;
	right: -50px;
	transform: scale(0.75);
	&:hover{color: #fff;}
}
#sj {
		display: block;
		position: absolute;
		top: 5px;
		left: -5px;
		width: 0;
		height: 0;
		border-bottom: 5px solid #FF763C;
		border-left: 5px solid transparent;
}
@keyframes heightUp {
	from {
		height: 46px; opacity: 0;
	}
	to {
		height: 190px; opacity: 1;
	}
}
.search_container{
	margin: 20px auto;width: 1200px;padding: 20px 20px 0;background: #fff;
	.breadcrumb_container{position: relative;
		.result_num{position: absolute;right: 0; top: 0;
			span{color:#00B3FF;}
			i {width: 18px; height: 18px; line-height: 18px; background-color: #ccc; color: #fff; text-align: center; border-radius: 50%; font-size: 12px; margin-left: 10px; cursor: pointer;}
		}
	}
	.search_type{padding: 0 20px 0 20px;font-size: 12px;color:#333;border:1px solid rgba(232,232,232,1);margin-top: 20px;
		.one_level{border-bottom: 1px dashed #eee; background: #fff;
			&.noBorder{border-bottom: none;position: relative;
				.slideDown{position: absolute;top: 13px;right: 10px;color:#00B3FF; cursor: pointer;
					i{padding-left: 5px;}
				}
			}
			>p{color: #999;width: 80px;padding:11px 20px 11px 0;line-height: 22px;}
			>div{
				width: 1038px;
				.level_item{
					padding: 5px 0 5px 0; 
					&.level3_item{padding-right: 90px; }
					&.level_item_type {transition: height 0.5s; height:190px; overflow: hidden;}
					&.line {height: 46px; overflow: hidden; }
					li{float: left;margin: 6px 18px 6px 0;line-height: 16px;padding: 3px 8px;cursor: pointer; box-sizing: border-box; height: 24px;
						&.active {border:1px solid #9AD8FF; background-color: #F0F8FC; color: #3DB1FA;}
					}
					.range {
						margin: 0; color: #999;
						.el-input--mini {display: inline-block; width: 66px; height: 22px;}
						.el-input__inner {padding-right: 0;}
						.el-button {margin-left: 10px;}
					}
					.checkbox {
						.el-checkbox+.el-checkbox {margin-left: 10px;}
					}
				}
			}
		}
	}
	.search_main{
		.search_nav{margin: 20px 0px;height: 46px;line-height: 46px;border:1px solid rgba(232,232,232,1);background:rgba(245,245,245,1);
			.type_box {
				span{line-height: 16px;padding: 14px 20px;display: block;float: left; font-size: 12px; cursor: pointer;}
				.active {background-color: #fff; color: #3DB1FA};
			}
			.turn_page {
				border-left: 1px solid #E8E8E8; padding: 0 20px;
				.num {
					padding: 10 10px; display: inline-block; font-size: 13px; color: #666;
					.current {color: #3DB1FA; }
				}
				i {
					cursor: pointer;
					&:hover {color: #3DB1FA;}
				}
			}
		}
		.search_recommend{
			&>h2{font-size: 18px;color: #666;line-height: 25px;text-align: center;}
			&>p{font-size: 13px;line-height: 38px;background: rgba(255,251,238,1);text-align: center;color: #999;
			border:1px solid rgba(250,217,132,1);margin: 20px 0;
				span{color:#FF763C;}
			}
			.null_title {
				img {float: left;}
				span { display: inline-block; width: 140px;height: 30px; line-height: 30px; font-size: 18px; color: #666666; vertical-align: bottom; float:left; text-align:center;}
			}
		}
		.search_result{
			.result_item{
				width: 210px;font-size: 0;margin: 0 27.5px 20px 0;border:1px solid rgba(237,237,237,1); position: relative; overflow: hidden;
				&:nth-child(5n+5){margin-right: 0;}
				&.trademarkItem {
					.img{
						width: 208px;height: 210px;padding: 20px;transition: all 0.3s;
						&:hover {transform: scale(1.15);}
					}
				}
				.img{width: 208px;height: 210px; padding: 8px 7px;}
				.type_lab {height: 22px; line-height: 22px; display: inline-block; background: #E1EAF3; text-align: center; color: #3771AC; font-size: 12px; padding: 0 5px; position: absolute; left: 0; top: 168px; border-radius:0px 2px 2px 0px;}
				.item_des{
					padding: 5px 10px 9px;
					.item_price{position: relative;}
					>p{line-height: 25px;font-size: 18px;color: #FF763C;
						a{
							img{ width: 20px; height: 20px;}}
					}
					>a{display:block;text-decoration: none;
					// color: #3DB1FA
						&.item_name{line-height: 20px;padding: 5px 0;color: #333;font-size: 14px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; cursor: pointer;
							span{color: #333;}
						}
						&.shop_name{line-height: 17px;color: #BBBBBB;font-size: 12px;padding-bottom: 8px;}
					}
					.item_icon{height: 25px;}
				}
				&:hover {
					box-shadow: 0 2px 12px 0 #D9D9D9; transition: all 0.3s;
				}
			}
		}
		.el-pagination {text-align: center; padding: 20px 0 30px 0;}
	}
}
</style>
<template>
	<div id="app">
		<!-- 公共头部 -->
		<sebe-header :cartNum="cartNum"  ></sebe-header>

		<div class="search_container">
			<div class="breadcrumb_container">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item >全部结果</el-breadcrumb-item>
					<el-breadcrumb-item v-if="cateIdData[selectedBigIndex-1]">{{ cateIdData[selectedBigIndex-1] && cateIdData[selectedBigIndex-1].goodsname }}</el-breadcrumb-item>
					<el-breadcrumb-item v-if="comby">{{ combination[comby].name }}</el-breadcrumb-item>
					<el-breadcrumb-item v-if="WordCount">{{ wordsNumber[WordCount].name }}</el-breadcrumb-item>
					<el-breadcrumb-item v-if="priceCost">{{ priceList[priceCost].name }}</el-breadcrumb-item>
					<el-breadcrumb-item v-if="yearsOld">{{ yearsList[yearsOld].name }}</el-breadcrumb-item>
				</el-breadcrumb>
				<span class="result_num">共 <span> {{ total }} </span> 件相关搜索结果
					<i class="el-icon-arrow-down" v-if="!showAllType" @click="showAllType=true"></i>
					<i class="el-icon-arrow-up" v-if="showAllType" @click="showAllType=false"></i>
				</span>
			</div>

			<div class="search_type" >
				<!-- 商标分类 -->
				<div class="one_level clearfix noBorder ">
					<p class="fl">商标分类:</p>
					<div class="fl">
						<ul class="fl clearfix level_item level_item_type" :class="{'line': !showTmType}">
							<li @click="clsClick()" :class="{'active' : selectedBigIndex == 0||!selectedBigIndex}">不限</li>
							<li v-for="item in cateIdData" :class="{'active': item.id==selectedBigIndex}" @click="clsClick(item)">{{ clsname(item.id) }}</li>
						</ul>
					</div>
					<span class="slideDown" v-if="showTmType" @click="showTmType=false">收起<i class="el-icon-arrow-up"></i></span>
					<span class="slideDown" v-if="!showTmType" @click="showTmType=true">展开<i class="el-icon-arrow-down"></i></span>
				</div>
				<el-collapse-transition>
				<div v-show="showAllType">
				<!-- 商标组合 -->
				<div class="one_level clearfix">
					<p class="fl">商标组合:</p>
					<div class="fl">
						<ul class="fl clearfix level_item">
							<li v-for="(item, index) in combination" :class="{'active': item.id==comby}" @click="comby = item.id,routeChange()">{{ item.name }}</li>
						</ul>
					</div>
				</div>
				<!-- 字数 -->
				<div class="one_level clearfix">
					<p class="fl">字数:</p>
					<div class="fl">
						<ul class="fl clearfix level_item">
							<li v-for="(item, index) in wordsNumber" :class="{'active': item.id==WordCount}" @click="WordCountClick(item.id)">{{ item.name }}</li>
						</ul>
					</div>
				</div>
				<!-- 价格 -->
				<div class="one_level clearfix">
					<p class="fl">价格:</p>
					<div class="fl">
						<ul class="fl clearfix level_item">
							<li v-for="(item, index) in priceList" :class="{'active': item.id==priceCost}" @click="priceCostClick(item.id)">{{ item.name }}</li>
							<li class="range">
								<el-input
									placeholder="最低价"
									v-model="minPlatformPrice"
									@change="priceCahngeFn"
									size="mini"
									clearable>
								</el-input>
								<span>-</span>
								<el-input
									placeholder="最高价"
									v-model="maxPlatformPrice"
									@change="priceCahngeFn"
									size="mini"
									clearable>
								</el-input>
								<el-button type="primary" size="mini" @click="searchByPriceFn">确定</el-button>
							</li>
							<li class="checkbox">
								<el-radio v-model="selectPriceType" label="1" @change="priceTypeChangeFn">一口价</el-radio>
								<el-radio v-model="selectPriceType" label="2" @change="priceTypeChangeFn">可议价</el-radio>
								<el-radio v-model="selectPriceType" label="3" @change="priceTypeChangeFn">面议</el-radio>
							</li>
						</ul>
					</div>
				</div>
				<!-- 注册年限 -->
				<div class="one_level clearfix">
					<p class="fl">注册年限:</p>
					<div class="fl">
						<ul class="fl clearfix level_item">
							<li v-for="(item, index) in yearsList" :class="{'active': item.id==yearsOld}" @click="yearsOld = item.id,tearsTime(item.id)">{{ item.name }}</li>
						</ul>
					</div>
				</div>
				</div>
				</el-collapse-transition>
				<div class="border_fold" v-show="!showAllType"></div>
			</div>

			<div class="search_main">
				<div class="search_nav">
					<div class="fl type_box">
						<span @click="selectTypeFn('Comprehensive')" :class="{'active': sortType=='Comprehensive'}">综合排序</span>
						<el-dropdown trigger="click" @command="selectPriceFn">
							<span class="el-dropdown-link" :class="{'active': sortType=='Price_Desc'|| sortType=='Price_Asc'}">
								{{ priceName }}<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown" >
								<el-dropdown-item command="Price_Asc">价格从低到高</el-dropdown-item>
								<el-dropdown-item command="Price_Desc">价格从高到低</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
						<el-dropdown trigger="click" @command="selectDateeFn">
							<span class="el-dropdown-link" :class="{'active': sortType=='Regist_Trial_Asc'|| sortType=='Regist_Trial_Desc'}">
								{{ dateName }}<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown" >
								<el-dropdown-item command="Regist_Trial_Asc">下证时间 升序</el-dropdown-item>
								<el-dropdown-item command="Regist_Trial_Desc">下证时间 降序</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
						<el-dropdown trigger="click" @command="selectWordNumFn">
							<span class="el-dropdown-link" :class="{'active': sortType=='Word_Count_Desc'|| sortType=='Word_Count_Asc'}">
								{{ wordName }}<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown" >
								<el-dropdown-item command="Word_Count_Asc">字符数量升序</el-dropdown-item>
								<el-dropdown-item command="Word_Count_Desc">字符数量降序</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
					<div class="fr turn_page" v-if="total">
						<i class="el-icon-arrow-left lef" @click="prevePageFn"></i>
						<span class="num"><span class="current">{{ pageNum }}</span>/ {{ totalPage }}</span>
						<i class="el-icon-arrow-right rig" @click="nextPageFn"></i>
					</div>
				</div>

				<div class="search_recommend" v-if="!total">
					<div class="null_title clearfix">
						<img src="~assets/img/shop/dotted.png" alt="">
						<span>为您推荐</span>
						<img src="~assets/img/shop/dotted.png" alt="">
					</div>
					<p>由于符合<span>"{{ keyword || '您的搜索条件' }}"</span>的结果较少，尝试为您推荐以下搜索的结果</p>
				</div>

				<div class="search_result clearfix"  style="min-height: 200px;" v-loading="loading" v-if="searchData.length">
					<div class="result_item trademarkItem fl" v-for="item in searchData">
						<a :href="markrtUrl + '/trademark/'+ item.goodsSn + '.htm'" target="_blank">
							<img :src="item.package_picture" :onerror="defaultImg" class="img" />
						</a>
						<span class="type_lab">{{ item.category<10 ? '0'+item.category : item.category }}-{{ cateIdData[item.category-1].goodsname }}</span>
						<div class="item_des">
							<p class="item_price">
								<span style="position:relative;display:inline-block" v-if="item.price_type == 3">面议
 
								</span>
								<span style="position:relative;display:inline-block" v-else>￥{{item.seller_price | priceformat }}
									<a href="javascript:;" v-if="item.price_type == 2" class="cutPrice">{{ item.price_type | priceTypeFormat }}
											<span id="sj"></span>
									</a>
								</span>
								<a v-if="item.storeType != 1" :href="'http://wpa.qq.com/msgrd?v=3&uin='+ item.storeQq +'&site=qq&menu=yes'" target="_blank" class="fr" ><img src="~assets/img/icon/chat.png" /></a>
								<a v-if="item.storeType == 1" href="https://pct.zoosnet.net/LR/Chatpre.aspx?id=PCT70172520&lng=cn&p=http%3a%2f%2fwww.ipsebe.com" target="_blank" class="fr" ><img src="~assets/img/icon/chat.png" /></a>
							</p>
							<a class="item_name" :href="markrtUrl + '/trademark/'+ item.goodsSn + '.htm'" target="_blank" :style="{color: keyword == item.trademark_name ? '#3DB1FA' : '#333'}" >{{ item.trademark_name }}</a>
							<a class="shop_name" :href="`${indexUrl}/store/${item.storeCode}.htm`" >{{ item.storeName }}</a>
							<div class="item_icon">
								<a class="mr5" v-for="it in item.tagsList" href="javascript:void(0)" :title="it.name"><img :onerror="defaultImg" :src="it.iconUrl" /></a>
							</div>
						</div>
					</div>
					<el-pagination
						background
						v-if="total"
						@current-change="handleCurrentChange"
						:current-page.sync="pageNum"
						:page-size="pageSize"
						layout="total, prev, pager, next, jumper"
						:total="total">
					</el-pagination>
				</div>

			</div>
		</div>
		<sebe-footer></sebe-footer>
	</div>
</template>
<script>
import Vue from 'vue'
import $ from 'jquery'
import Filters from 'assets/filters.js'
import sebeHeader from 'components/Header.vue'
import sebeFooter from 'components/Footer.vue';
import Lib from 'assets/Lib.js'
import intClsData from '../../assets/common/intClsData.js';
import qs from 'qs';

const indexUrl = CONFIG.indexUrl;
const payUrl = CONFIG.payUrl;
const findAllBsUrl = CONFIG.userUrl + '/api/findAllBs';  //查询所有服务分类
const searchTmUrl = CONFIG.path + '/searchTrademark.htm';  // 商标搜索
const markrtUrl = CONFIG.trademarkUrl;

// 商标组合
const combination = [
	{
		id:0,
		name:'不限',
		selected:false
	},{
		id:1,
		name:'中文',
		selected:false
	},{
		id:2,
		name:'字母',
		selected:false
	},{
		id:3,
		name:'图形',
		selected:false
	},{
		id:4,
		name:'数字',
		selected:false
	},{
		id:5,
		name:'组合',
		selected:false
	}
]
// 注册年限
const yearsList = [
	{
		id:0,
		name:'不限',
		selected:false
	},{
		id:1,
		name:'1年以内',
		selected:false
	},{
		id:2,
		name:'1~3年',
		selected:false
	},{
		id:3,
		name:'3~10年',
		selected:false
	},{
		id:4,
		name:'10年以上',
		selected:false
	}
]
// 价格
const priceList = [
	{
		id:0,
		name:'不限',
		selected:false
	},{
		id:1,
		name:'1万以下',
		selected:false
	},{
		id:2,
		name:'1~2万',
		selected:false
	},{
		id:3,
		name:'2~3万',
		selected:false
	},{
		id:4,
		name:'3~10万',
		selected:false
	},{
		id:5,
		name:'10万以上',
		selected:false
	}
]
// 字数
const wordsNumber = [
	{
		id:0,
		name:'不限',
		selected:false
	},{
		id:1,
		name:'1~2字',
		selected:false
	},{
		id:2,
		name:'2字',
		selected:false
	},{
		id:3,
		name:'3字',
		selected:false
	},{
		id:4,
		name:'4字',
		selected:false
	},{
		id:5,
		name:'4字以上',
		selected:false
	}
]

export default{
	components: {
		sebeHeader,
		sebeFooter,
		// headerMall
	},
	data () {
		return {
			cartNum: '',
			userName: '',
			loading: true,
			defaultImg: 'this.src="' + require('../../assets/img/serviceList/imgError.png') + '"',
			showAllType: true, //展示所有分类
			showTmType: false,  // 商标分类展示全部
			cateIdData: intClsData.cateIdData,
			combination: combination,  //商标组合
			wordsNumber: wordsNumber, //字数
			priceList: priceList,  //价格
			yearsList: yearsList,  //注册年限
			searchContent: '',  //搜索内容
			sortType: 'Comprehensive',  //排序类别  默认综合排序
			priceName: '价格',  //价格排序
			dateName: '下证时间',  //下正式件排序
			wordName: '字符数量',  //字符数量排序
			indexUrl: indexUrl,

			wordsNumber:wordsNumber,
			priceType:[],
			currentPage3:0,
			cls:'',
			selectedBigIndex:0,//选中的大类
			minSelected:[],//选中的群组
			comby: 0,//商标类别
			WordCount:0,//商标字数
			priceCost:0,//价格
			yearsOld:0,//年限
			pageSize: 15,
			pageNum: 1,
			total:0,
			totalPage: 1,  //所有页数

			minWordCount:null,
			maxWordCount:null,
			minPlatformPrice:'',
			maxPlatformPrice:'',
			minMoney:'',
			maxMoney:'',
			minTime:'',
			maxTime:'',
			sort:1,
			minInfo:[],
			searchData:[],//搜索结果
			keyword:'',//商标名
			trademarkName:'',
			trademarkPhone:'',
			scroll: '',//页面滚动距离

			selectPriceType: '',  // 1.一口价 2.可议价 3.面议
			markrtUrl: markrtUrl,
		}
	},
	methods: {
		// 去商标详情页
		goDetailFn (item) {
			location.href = markrtUrl + '/trademark/'+ item.goodsSn + '.htm';
		},
		// 议价类型变化
		priceTypeChangeFn () {
			this.routeChange();
		},
		// 根据自定义价格筛选
		searchByPriceFn () {
			if (this.minPlatformPrice > this.maxPlatformPrice) {
				alert('最高价必须大于或等于最低价');
				return
			}
			this.routeChange();
		},
		// 自定义筛选价格变化
		priceCahngeFn () {
			this.priceCost = null;
		},
		// 选择价格小排序类型
		selectPriceFn (command) {
			this.sortType = command;  //价格
			if (command == 'Price_Desc') {
				this.priceName = '价格从高到低';
			}
			else if (command == 'Price_Asc') {
				this.priceName = '价格从低到高';
			}
			this.routeChange();
		},
		// 选择下证时间排序类型
		selectDateeFn (command) {
			this.sortType = command;  //下证时间
			if (command == 'Regist_Trial_Asc') {
				this.dateName = '下证时间 升序';
			}
			else if (command == 'Regist_Trial_Desc') {
				this.dateName = '下证时间 降序';
			}
			this.routeChange();
		},
		// 选择字符数量排序类型
		selectWordNumFn (command) {
			this.sortType = command;  //字数
			if (command == 'Word_Count_Asc') {
				this.wordName = '字符数量 升序';
			}
			else if (command == 'Word_Count_Desc') {
				this.wordName = '字符数量 降序';
			}
			this.routeChange();
		},
		// 选择排序类别
		selectTypeFn (type) {
			this.sortType = type;
			this.priceName = '价格';
			this.dateName = '下证时间';
			this.wordName = '字符数量';
			this.routeChange();
		},
		// 上一页
		prevePageFn () {
			if (this.pageNum > 1) {
				this.pageNum = this.pageNum-1;
			}
			else{
				this.pageNum = 1;
			}
			this.routeChange();
		},
		// 下一页
		nextPageFn () {
			if (this.pageNum < this.totalPage) {
				this.pageNum = this.pageNum + 1;
			}
			else{
				this.pageNum = this.totalPage;
			}
			this.routeChange();
		},
		quickBuy(){
			var reg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
			let self = this;
			if(this.quickBuyTxt){
				if(!reg.test(this.quickBuyTxt)){
					this.errMsg='手机号码格式不对';
					return;
				}else{
					var data = {"contactPhone":this.quickBuyTxt};
					self.$http.post(premarketUrl+'/seek/marks',data)
					.then((resp)=>{
						this.errMsg='';
						if (resp.data.code == '00') {
							this.$message({
								message: '提交成功，商标顾问正火速赶来',
								type: 'success'
							});
						} else {
							this.$message({
								message: resp.data.msg,
								type: 'error'
							});
						}
					})
				}
			}else if(!this.quickBuyTxt){
				this.errMsg='请输入手机号码';
				return;
			}
		},
		toDetail(item){//跳转详情页
			// substring(2);
			let str = item.goodsSn+'';
			console.log(str.substring(1))
			window.open(premarketUrl+'/trademark/'+str.substring(1)+'.htm');
		},
		shopTrademark(){//商标求购
			if(!this.cls){
				this.$message({
					message: '请选择商标大类',
					type: 'warning'
				});
				return;
			}
			if(!this.trademarkName){
				this.$message({
					message: '请填写商标信息',
					type: 'warning'
				});
				return;
			}
			if(!this.trademarkPhone){
				this.$message({
					message: '请填写联系方式',
					type: 'warning'
				});
				return;
			}
			var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
			if(!reg.test(this.trademarkPhone)){
				this.$message({
					message: '您输入的手机号码有误',
					type: 'warning'
				});
				return;
			}
			let data = {
				category:this.cls,
				buyGoodDetail:this.trademarkName,
				contactPhone:this.trademarkPhone,
			}
			this.$http.post(premarketUrl + '/seek/marks',data)
			.then((resp)=>{
				if (resp.data.code == '00') {
					this.$message({
						message: '提交成功，商标顾问正火速赶来',
						type: 'success'
					});
				} else {
					this.$message({
						message: resp.data.msg,
						type: 'error'
					});
				}
			})
			.catch((err)=>{

			})
		},
		toBottom(){//滚动底部
			var container = this.$el.querySelector('#trademarkShop');
			container.scrollIntoView();
		},
		search(item){//子组件回调
			console.log(item)
			this.keyword = item;
			this.routeChange();
		},
		routeChange(turnPage){//搜索参数，动态改变路由
			// if(this.sort == 1){
			//   this.sortType = 'Comprehensive';
			// }
			var data = {
				keyword: this.$route.query.keyword ? this.$route.query.keyword : '',
				category:this.selectedBigIndex || null,
				minWordCount:this.minWordCount,
				maxWordCount:this.maxWordCount,
				comby:this.comby || null,
				minPlatformPrice:this.minPlatformPrice === '' ? null : this.minPlatformPrice,
				maxPlatformPrice:this.maxPlatformPrice === '' ? null : this.maxPlatformPrice,
				minTime:this.minTime,
				maxTime:this.maxTime,
				priceType: this.selectPriceType,
				sortType:this.sortType,
				// similarGroup:this.minSelected.join(','),
				pageNum: turnPage==='turnPage' ? this.pageNum : 1,  //除了翻页之外其他搜索都把页数变成1
				pageSize: this.pageSize
			}
			this.$router.replace({query: Object.assign({}, data)});
		},
		// 查询
		searchQueryFn () {
			this.pageNum = parseInt(this.$route.query.pageNum) || 1;
			this.pageSize = parseInt(this.$route.query.pageSize) || 15;
			this.keyword = decodeURIComponent(decodeURIComponent(this.$route.query.keyword)) || '';  //关键词
			this.selectedBigIndex = this.$route.query.category || 0;  //大类
			this.comby = this.$route.query.comby || 0;  //商标组合
			// 字数
			if (this.$route.query.minWordCount || this.$route.query.maxWordCount) {
				if(this.$route.query.minWordCount == 1 && this.$route.query.maxWordCount == 2){
					this.WordCount = 1;
				}else if(this.$route.query.minWordCount == this.$route.query.maxWordCount) {
				 this.WordCount = this.$route.query.minWordCount;
				}else if(this.$route.query.minWordCount == 5 && this.$route.query.maxWordCount == 0){
					this.WordCount = 5;
				}else{
					this.WordCount = 0;
				}
			}
			else{
				this.WordCount = 0;
			}
			// 价格
			if (this.$route.query.minPlatformPrice || this.$route.query.maxPlatformPrice ) {
				if (this.$route.query.minPlatformPrice==0 && this.$route.query.maxPlatformPrice==10000) {
					this.priceCost = 1;
				}
				else if (this.$route.query.minPlatformPrice==10000 && this.$route.query.maxPlatformPrice==20000) {
					this.priceCost = 2;
				}
				else if (this.$route.query.minPlatformPrice==20000 && this.$route.query.maxPlatformPrice==30000) {
					this.priceCost = 3;
				}
				else if (this.$route.query.minPlatformPrice==30000 && this.$route.query.maxPlatformPrice==100000) {
					this.priceCost = 4;
				}
				else if (this.$route.query.minPlatformPrice==100000 && this.$route.query.maxPlatformPrice=='') {
					this.priceCost = 5;
				}
				else{
					this.priceCost = 0;
				}
			}
			else{
				this.priceCost = 0;
			}
			// 注册年限
			if (this.$route.query.minTime || this.$route.query.maxTime ) {
				if (this.$route.query.minTime=='' && this.$route.query.maxTime==1) {
					this.yearsOld = 1;
				}
				else if (this.$route.query.minTime==1 && this.$route.query.maxTime==3) {
					this.yearsOld = 2;
				}
				else if (this.$route.query.minTime==3 && this.$route.query.maxTime==10) {
					this.yearsOld = 3;
				}
				else if (this.$route.query.minTime==10 && this.$route.query.maxTime=='') {
					this.yearsOld = 4;
				}
				else{
					this.yearsOld = 0;
				}
			}
			else{
				this.yearsOld = 0;
			}
			// 地址栏页码取出赋值
			this.loading = true
			let params = Object.assign({}, this.$route.query);
			params.pageSize = Number(params.pageSize) || this.pageSize;
			params.keyword = params.keyword ? decodeURIComponent(decodeURIComponent(params.keyword)) : '';
			this.$http.post(searchTmUrl, params)
			.then( (resp) => {
				this.loading = false
				this.searchData = resp.data.data;
				this.total = resp.data.total_count;
				this.totalPage = Math.ceil(this.total / this.pageSize);
			}).catch(err => {
				this.loading = false
			})
		},
		allReMove(){//重置，中间取值需要过滤，故此需要单个初始化
			this.selectedBigIndex = null;
			this.minWordCount = null;
			this.maxWordCount = null;
			this.minPlatformPrice = null;
			this.maxPlatformPrice = null;
			this.minMoney = '';
			this.maxMoney = '';
			this.minSelected = [];
			this.comby = null;
			this.WordCount = null;
			this.priceCost = null;
			this.yearsOld = null;
			this.minTime = null;
			this.maxTime = null;

			this.routeChange();
		},
		clsAll(){
			this.selectedBigIndex = 0;
			this.minSelected = [];
			for(let index in this.cateIdData){
				this.cateIdData[index].selected = false;
			}
			this.routeChange();
		},
		clsClick(item){//大类
			if (!item) {
				this.selectedBigIndex = 0;
			}
			else{
				this.selectedBigIndex = item.id;
			}
			this.routeChange();
		},
		minLists(index){//小项，群组
			let self = this;
			this.$http.get(premarketUrl + '/trademark/findGroup?classId='+index)
			.then((resp)=>{
				this.minInfo = resp.data.data;
				for(let n in this.minInfo){
					this.minInfo[n].selected = false;
				}
				this.minSelected = this.$route.query.similarGroup.split(",");
				this.minSelected.forEach((item)=>{
					for(let i in self.minInfo){
						if(self.minInfo[i].groupId == item){
							self.minInfo[i].selected = true;
						}
					}
				})
			})
			.catch((err)=>{

			})
		},
		allMin(){//小项初始化
			this.minSelected = [];
			for(let index in this.minInfo){
				this.minInfo[index].selected = false;
			}
			this.routeChange();
		},
		minClick(item,index){//小项选中
			let obj = {
				groupId:item.groupId,
				selected:true
			}
			let groupId = item.groupId > 9 ? item.groupId : '0' + item.groupId;
			console.log('min_select', this.minSelected, obj)
			if(!this.minSelected[0]){
				this.minSelected.splice(0, 1);
			}
			if(this.minSelected.length){
				if (!this.minSelected.includes(obj.groupId)) {
					this.minSelected.push(groupId)
				}
				// this.minSelected.forEach((r)=>{
				//   console.log('r', r, obj.groupId)
				//   if(obj.groupId == r){
				//     return;
				//   }else{
				//     this.minSelected.push(groupId);
				//   }
				// })
			}else{
				this.minSelected.push(groupId);
			}
			console.log(this.minSelected,groupId)

			this.$set(this.minInfo, index, obj);
			this.routeChange();
		},
		moveminClick(item,index){//删除选中
			for(let i=0;i<this.minSelected.length;i++){
				if(~~this.minSelected[i] == item.groupId){//将获取的数据前面的0去掉
					this.minSelected.splice(i,1);
					let obj = {
						groupId:item.groupId,
						selected:false
					}
					this.$set(this.minInfo, index, obj);
					console.log('取消',this.minSelected.length)
					// return;
				}
			}
			this.routeChange();
		},
		WordCountClick(id){//处理为最大最小字数
			this.WordCount = id;
			if(id == 1){
				this.minWordCount = 1;
				this.maxWordCount = 2;
			}else if(id == 2 || id == 3 || id == 4){
				this.minWordCount = id;
				this.maxWordCount = id;
			}else if(id == 5){
				this.minWordCount = 5;
				this.maxWordCount = 0;
			}else{
				this.minWordCount = null;
				this.maxWordCount = null;
			}
			this.routeChange();
		},
		priceCostClick(id){//价格大小值处理
			this.priceCost = id;
			if(id == 1){
				this.minPlatformPrice = 0;
				this.maxPlatformPrice = 10000;
			}else if(id == 2){
				this.minPlatformPrice = 10000;
				this.maxPlatformPrice = 20000;
			}else if(id == 3){
				this.minPlatformPrice = 20000;
				this.maxPlatformPrice = 30000;
			}else if(id == 4){
				this.minPlatformPrice = 30000;
				this.maxPlatformPrice = 100000;
			}else if(id == 5){
				this.minPlatformPrice = 100000;
				this.maxPlatformPrice = '';
			}else{
				this.minPlatformPrice = null;
				this.maxPlatformPrice = null;
			}
			this.routeChange();
		},
		priceClick(){//价格区间确认
			if(!this.minMoney&&!this.maxMoney){
				this.$message({
					message: '请输入商标价格',
					type: 'warning'
				});
				return;
			}
			if(this.minMoney > this.maxMoney){
				this.minPlatformPrice = this.maxMoney;
				this.maxPlatformPrice = this.minMoney;
			}else{
				this.minPlatformPrice = this.minMoney;
				this.maxPlatformPrice = this.maxMoney;
			}
			this.priceCost = 7;//表示价格区间未选中
			this.routeChange();
		},
		tearsTime(id){//年份区间
			if(id == 1){
				this.minTime = '';
				this.maxTime = 1;
			}else if(id == 2){
				this.minTime = 1;
				this.maxTime = 3;
			}else if(id == 3){
				this.minTime = 3;
				this.maxTime = 10;
			}else if(id == 4){
				this.minTime = 10;
				this.maxTime = '';
			}else{
				this.minTime = null;
				this.maxTime = null;
				this.yearsOld = 0;
			}
			this.routeChange();
		},
		priceTypeClick(){//价格类型
			console.log(this.priceType)
			this.routeChange();
		},
		composite(){//综合排序
			this.sort = 1;
			this.sortType = 'Comprehensive';
			this.routeChange();
		},
		priceSort(){//价格排序
			if(1 < this.sort < 4){
				if(this.sort == 2){
					this.sort = 3;
					this.sortType = 'Price_Desc';
				}else{
					this.sort = 2;
					this.sortType = 'Price_Asc';
				}
			}
			this.routeChange();
		},
		timeSort(){//时间排序
			if(3 < this.sort < 6){
				if(this.sort == 4){
					this.sort = 5;
					this.sortType = 'Regist_Trial_Desc'
				}else{
					this.sort = 4;
					this.sortType = 'Regist_Trial_Asc'
				}
			}
			this.routeChange();
		},
		wordSort(){//字数排序
			if(5 < this.sort < 8){
				if(this.sort == 6){
					this.sort = 7;
					this.sortType = 'Word_Count_Desc'
				}else{
					this.sort = 6;
					this.sortType = 'Word_Count_Asc'
				}
			}
			this.routeChange();
		},
		openNewWin() {
			let height = document.documentElement.clientHeight;
			let width = document.documentElement.clientWidth;
			console.log(height, width, 'width=600,height=500,left='+ (width - 600) +'px,top=' + (height - 550) + 'px')
			window.open(
				'https://pct.zoosnet.net/LR/Chatpre.aspx?id=PCT70172520&lng=cn&p=http%3a%2f%2fwww.ipsebe.com','',
			// 'width=600,height=500,left='+ (width - 600) +'px,top=' + (height - 550) + 'px,toolbar=no,status=no,menubar=no,resizable=yes,scrollbars=yes');
			'width=600,height=500,left='+ (width - 600) +'px,top=' + (height - 550) + 'px');
			return false;
		},
		handleSizeChange(){//翻页，输入页码
			this.routeChange();
			// this.toBack();
		},
		handleCurrentChange(){//翻页
			let turnPage = 'turnPage';
			this.routeChange(turnPage);
			// this.toBack();
		},
		goodsname(item){
			if(item){
				var str = '第'+ item + '类-' + this.cateIdData[item-1]['goodsname'];
				return str;
			}else{
				var str = '--';
				return str;
			}
		},
		goodsname2(item){
			if(item){
				var str = '0' + item + '类-' + this.cateIdData[item-1]['goodsname'];
				return str;
			}else{
				var str = '--';
				return str;
			}
		},
		clsname(item){
			if(item){
				var str = (item>9 ? item : '0'+item) + '-' + this.cateIdData[item-1]['goodsname'];
				return str;
			}else{
				var str = '--';
				return str;
			}
		},
		trademarkLists(){//查询列表
			let params = this.$route.query;
			params.pageSize = query.pageSize || this.pageSize;
			this.$http.post(premarketUrl + '/trademark/search', params)
			.then((resp)=>{
				this.searchData = resp.data.data;
				this.total = resp.data.total_count;
			})
			.catch((err)=>{

			})
		},
		searchRoute(){
			//搜索条件为最大和最小值，需要从路由获取后转换为单独的值，方便页面参数高亮
			let self = this;
			console.log(this.$route.query,'jiasdasdasdasd')
			if(this.$route.query){//因为参数不在一个data中，且需要对参数区间进行处理，只能一个个对应
				let data = self.$route.query;
				self.keyword = data.keyword;
				self.selectedBigIndex = data.category || null;//大类
				if(data.minWordCount){
					self.WordCount = data.minWordCount;//字数
					self.WordCountClick(self.WordCount);
				}
				self.comby = data.comby || 0;//组合
				if(data.priceType){
					let priceType = data.priceType.split(",");
					for(let n in priceType){
						this.$set(this.priceType, n, priceType[n]);
						console.log(self.priceType)
					}
				}
				if(data.similarGroup){
					let similarGroup = data.similarGroup.split(",");
					this.minSelected = similarGroup;
				}

				if(data.minPlatformPrice===0 && data.maxPlatformPrice == 10000){// 价格区间
					this.priceCost = 1;
					this.priceCostClick(this.priceCost);
				}else if(data.minPlatformPrice == 10000 && data.maxPlatformPrice == 20000){
					this.priceCost = 2;
					this.priceCostClick(this.priceCost);
				}else if(data.minPlatformPrice == 20000 && data.maxPlatformPrice == 30000){
					this.priceCost = 3;
					this.priceCostClick(this.priceCost);
				}else if(data.minPlatformPrice == 30000 && data.maxPlatformPrice == 100000){
					this.priceCost = 4;
					this.priceCostClick(this.priceCost);
				}else if(data.minPlatformPrice == 100000 && !data.maxPlatformPrice){
					this.priceCost = 5;
					this.priceCostClick(this.priceCost);
				}else if(data.minPlatformPrice === 0 && data.maxPlatformPrice === 0){
					this.priceCost = 0;
					this.priceCostClick(this.priceCost);
				}else{
					this.maxMoney = data.maxPlatformPrice >= 0 ? data.maxPlatformPrice : null;
					this.minMoney = data.minPlatformPrice >= 0 ? data.minPlatformPrice : null;
				}
				if(data.minTime == 1){// 年限
					if(data.maxTime == 3){
						this.yearsOld = 2;
					}
				}else if(data.minTime == 3){
					this.yearsOld = 3;
				}else if(data.minTime == 10){
					this.yearsOld = 4;
				}else if(!data.minTime){
					if(!data.maxTime){
						this.yearsOld = 0;
					}else{
						this.yearsOld = 1;
					}
				}
				this.tearsTime(this.yearsOld)
				if(data.sortType == 'Comprehensive'){//排序
					this.sort = 1;
				}else if(data.sortType == 'Price_Asc'){
					this.sort = 2;
				}else if(data.sortType == 'Price_Desc'){
					this.sort = 3;
				}else if(data.sortType == 'Regist_Trial_Asc'){
					this.sort = 4;
				}else if(data.sortType == 'Regist_Trial_Desc'){
					this.sort = 5;
				}else if(data.sortType == 'Word_Count_Asc'){
					this.sort = 6;
				}else if(data.sortType == 'Word_Count_Desc'){
					this.sort = 7;
				}
				if(self.selectedBigIndex){//查询群组
					this.minLists(self.selectedBigIndex)
				}
			}
		},
		menu() {//监测页面滚动
			this.scroll = document.documentElement.scrollTop;
		},
		toBack(){//回到顶部
			let back = setInterval(() => {
				if(document.body.scrollTop||document.documentElement.scrollTop){
					document.body.scrollTop-=50;
					document.documentElement.scrollTop-=50;
				}else {
					clearInterval(back)
				}
			});
		}
	},
	mounted () {
		this.searchQueryFn();  //默认查询列表

	},
	filters: {
		priceformat:Filters.priceformat,
		ellipsis: Filters.ellipsis,
		priceTypeFormat: (val) => {
			let priceLabel = ''
			switch (val) {
				case 1:
					priceLabel = '一口价'
					break
				case 2:
					priceLabel = '可议价'
					break
				case 3:
					priceLabel = '面议'
					break
				default:
					priceLabel = '' 
			}
			return priceLabel
		}
	},
	watch: {
		'$route': ['searchQueryFn']
	}
}
</script>

