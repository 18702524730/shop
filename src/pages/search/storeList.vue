<style lang="scss">
*{box-sizing: border-box;}
.mr0{margin-right: 0!important;}
a:hover{text-decoration: none;}
.allResult{
	.el-breadcrumb__inner{color: #999;font-weight: 500;}
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
		.one_level{border-bottom: 1px dashed #eee;
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
					&.line {height: 46px; overflow: hidden;}
					li{float: left;margin: 6px 18px 6px 0;line-height: 16px;padding: 3px 8px;cursor: pointer; box-sizing: border-box; height: 24px;
						&.active {border:1px solid #9AD8FF; background-color: #F0F8FC; color: #3DB1FA;}
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
		}

		.el-pagination {text-align: center; padding: 40px 0; float: left;width: 1200px;}
	}
	.storeList{margin: 20px 0 0 0;
		
		.storeItem{padding: 0 19px 25px;width: 570px;border: 1px solid #e8e8e8;float: left;margin: 0 20px 20px 0;transition: all .3s;
			&:hover{box-shadow: #D9D9D9 0 2px 13px;}
			&:nth-child(2n+2){margin-right: 0;}
			.storeTitle{line-height: 60px;border-bottom: 1px dotted #e8e8e8;font-size: 14px;color: #333;
				>img{cursor: pointer;}
			.storeImg{display: inline-block;vertical-align: middle;height: 30px;width: 30px;border-radius: 30px;margin-right: 6px;border: 1px solid #e6e6e6;}
			label{vertical-align: baseline;padding: 0px 8px;border: 1px solid  #3DB1FA;border-radius: 3px;margin-left: 6px;
			background:rgba(232,246,255,1);font-size: 12px;color: #3DB1FA;}
			>a{display: block;margin-right: 5px;
					img{vertical-align: middle; width:20px; height:20px;}
				}
			}
			.storeContent{padding-top: 25px;
				.contentItem{width:90px;height: 90px;font-size: 0;margin-right: 20px;position: relative;float: left;overflow: hidden;transition: all 0.3s;
				border: 1px solid rgba(241,241,241,1);
					&:hover{
						>a{top: 0;}
					}
					img{width: 90px;height: 90px;}
					>a{display: block;width: 90px;height: 90px;position: absolute;top: -90px;left: 0;background: rgba(0,0,0,.5);color: #fff;
					padding: 15px 10px 0;font-size: 14px;text-align: center;line-height: 20px;/*transition: all 0.3s;*/
					p{max-height: 40px;overflow: hidden;}
					}
				}
				.serviceNum{margin: 0;background: #f9f9f9;float:right;border: none;
					>a{display: block;height: 90px;width: 90px;background: #F9F9F9;top: 0;
						h4{font-size: 18px;line-height: 25px;color: #666;}
						p{font-size: 13px;color:#bbb;line-height: 18px;padding-top: 2px;}
					}
				}
			}
		}
	}
}
</style>
<template>
	<div id="app">
		<!-- 公共头部 -->
		<sebe-header :cartNum="cartNum" :userName='userName' ></sebe-header>
		<!-- 店铺内头部 -->
		<!-- <header-mall :cartNum="cartNum" :userName='userName' ></header-mall> -->

		<div class="search_container">
			<div class="breadcrumb_container">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item style="color: #999;" class="allResult" >全部结果</el-breadcrumb-item>
					<el-breadcrumb-item v-if="keyword">搜索"{{keyword}}"</el-breadcrumb-item>
				</el-breadcrumb>
				<span class="result_num">共 <span> {{ totalSize }} </span> 件相关搜索结果 

				</span>
			</div>


			<div class="search_main">
				<div class="search_nav">
					<div class="fl type_box">
						<span @click="selectTypeFn(1)" :class="{'active': sortType==1}">综合排序</span>
						<span @click="selectTypeFn(2)" :class="{'active': sortType==2}">销量</span>
						<el-dropdown trigger="click" @command="commandFn">
							<span class="el-dropdown-link" :class="{'active': sortType==3}">
								{{ priceName }}<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown" >
								<el-dropdown-item command="asc">服务数从多到少</el-dropdown-item>
								<el-dropdown-item command="desc">服务数从少到多</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
					<div class="fr turn_page">
						<i class="el-icon-arrow-left lef" @click="prevePageFn"></i>
						<span class="num"><span class="current">{{ currentPage }}</span>/ {{ totalPage || 1 }}</span>
						<i class="el-icon-arrow-right rig" @click="nextPageFn"></i>
					</div>
				</div>
				<div  v-loading="loading" style="min-height: 200px;">
					<div class="search_recommend" v-if="!totalSize && !loading">
						<div class="null_title clearfix">
							<img src="~assets/img/shop/dotted.png" alt="">
							<span>为您推荐</span>
							<img src="~assets/img/shop/dotted.png" alt="">
						</div>
						<p>由于符合<span>"{{keyword}}"</span>的结果较少，尝试为您推荐以下搜索的结果</p>
					</div>
				<div class="storeList clearfix" v-if="searchList.length > 0">
					<div>
						<div class="storeItem" v-for="item in searchList" :key="item.storeId">
							<div class="storeTitle clearfix">
								<a style="float: left;margin-right: 5px;" :href="`${indexUrl}/store/${item.storeCode}.htm`"><img class="storeImg" :src="item.storeLogo" :onerror="defaultImg" />{{item.storeName | ellipsis(20)}}
									<!-- <label v-for="tagItem in item.tagsList" :key="tagItem.tagId">{{tagItem.name}}</label> -->
								</a>
									<!-- <label v-if="item.storeType == 1">优选</label> -->
			
											<img style="vertical-align:middle;height: 16px;width:16px;;margin: -2px 4px 0 0"
											v-for="tagItem in item.tagsList" :key="tagItem.tagId" 
											:src="tagItem.iconUrl"
											:title="tagItem.name"
											slot="reference"
											:onerror="defaultImg"
										/>
								<a v-if="item.storeType != 1" key="link" class="fr" target="_blank"
								:href="'http://wpa.qq.com/msgrd?v=3&uin='+ item.storeQq +'&site=qq&menu=yes'">
								<img src="~assets/img/icon/chat.png" style="width: 24px;height: 24px;"/></a>
								<a v-else href="https://pct.zoosnet.net/LR/Chatpre.aspx?id=PCT70172520&lng=cn&p=http%3a%2f%2fwww.ipsebe.com" target="_blank" key="link" class="fr">
								<img src="~assets/img/icon/chat.png" style="width: 24px;height: 24px;" /></a>
							</div>
							<div class="storeContent clearfix">
								<div class="contentItem" @mouseover="handleMouseover" v-for="serviceItem in item.serviceList" :key="serviceItem.id">
									<img :src="serviceItem.picUrl" :onerror="defaultImg" />
									<a :href="serviceItem.type == 1 ? `${indexUrl}/store/service/${serviceItem.code}.htm` : `${trademarkUrl}/trademark/${serviceItem.code}.htm`">
										<p class="serviceName">{{serviceItem.serviceTitle}}</p>
										<p v-if="serviceItem.type === 2 && serviceItem.priceType === '面议'">面议</p>
										<p v-else>￥{{serviceItem.amount | priceformat}}</p>
									</a>
								</div>
								<div class="contentItem serviceNum" style="padding-top: 22px;">
									<a :href="`${indexUrl}/store/${item.storeCode}.htm?searchType=1&classId=-1`" style="cursor: pointer;">
										<h4>{{item.serviceNum > 999 ? '999+' : item.serviceNum}}</h4>
										<p>服务/商品</p>
									</a>
								</div>
							</div>
						</div>
					</div>

					<el-pagination
					 v-if="searchList.length > 0 && totalSize"
						background
						@current-change="currentChangeFn"
						:current-page="currentPage"
						:page-size="pageSize"
						:total="totalSize"
						layout="total, prev, pager, next, jumper">
					</el-pagination>
				</div>
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

const indexUrl = CONFIG.indexUrl;
const payUrl = CONFIG.payUrl;
const findAllBsUrl = CONFIG.userUrl + '/api/findAllBs';  //查询所有服务分类
const searchServiceUrl = CONFIG.path + '/searchService.htm';  // 服务搜索
const searchStoreUrl = CONFIG.path + '/searchShop.htm';
const trademarkUrl = CONFIG.trademarkUrl

export default{
	components: {
		sebeHeader,
		sebeFooter,
		// headerMall
	},
	data () {
		return {
			cartNum: '',
			defaultImg: 'this.src="' + require('../../assets/img/serviceList/imgError.png') + '"',
			userName: '',
			keyword: '', //搜索关键字
			indexUrl: indexUrl,
			trademarkUrl: trademarkUrl,
			sort: 'desc',
			loading: false,
			sortType: 1,  //排序类别
			storeType: '', // 商家类型
			priceName: '服务数',  //价格排序
			searchList: [],  //搜索结果列表
			totalSize: 1,  //所有条数
			currentPage: 1,  //当前页数
			pageSize: 10,  //每页数量
			totalPage: 1,  //总页数
		}
	},
	methods: {
				// 翻页
		currentChangeFn (data) {
			this.currentPage = data; //当前页
			this.$router.replace({query: Object.assign({}, this.$route.query, {pg_index: this.currentPage})});
			// this.searchFn();
		},
		handleMouseover (e) {
			var tarParent = $(e.target).parents('.contentItem')
			if (tarParent.find('.serviceName').height() < 30) {
				$('.serviceName').parent().css({'paddingTop': '22px'})
			} else {
				$('.serviceName').parent().css({'paddingTop': '15px'})
			}
		},
		routeChange () {//搜索参数，动态改变路由
			var data = {
				// keyword: this.keyword,
				sort_type: this.sortType,
				sort: 'desc',
				pg_index: this.currentPage,
				pg_count: this.pageSize
			}
			this.$http.post(searchStoreUrl, data).then( (resp) => {
				this.searchList = resp.data.data;
				this.totalSize = resp.data.total_count;
				this.totalPage = Math.ceil(this.total / this.pageSize);
				// window.history.replaceState(history.state, '', location.protocol + location.hostname + location.pathname + '?' + qs.stringify(data));
				// location.href = qs.stringify(data);
			})
		},
		// 上一页
		prevePageFn () {
			if (this.currentPage > 1) {
				this.currentPage = this.currentPage-1;
			}
			else{
				this.currentPage = 1;
			}
			this.$router.replace({query: Object.assign({}, this.$route.query, {pg_index: this.currentPage})});
			// this.searchFn();
		},
		// 下一页
		nextPageFn () {
			if (this.currentPage < this.totalPage) {
				this.currentPage = this.currentPage + 1;
			}
			else{
				this.currentPage = this.totalPage;
			}
			this.$router.replace({query: Object.assign({}, this.$route.query, {pg_index: this.currentPage})});
			// this.searchFn();
		},
		// 翻页
		currentChangeFn (data) {
			this.currentPage = data; //当前页
			this.$router.replace({query: Object.assign({}, this.$route.query, {pg_index: this.currentPage})});
			// this.searchFn();
		},
		// 选择排序类别
		selectTypeFn (type) {
			this.sortType = type;
			this.priceName = '服务数';
			this.sort = 'desc'
			this.$router.replace({query: Object.assign({}, this.$route.query, {sort_type: this.sortType, sort: this.sort})});
			// this.searchFn();
		},
		// 选择价格培训类型
		commandFn (command) {
			this.sortType = 3;  //价格
			this.sort = command;
			if (command == 'desc') {
				this.priceName = '服务数从多到少';
			}
			else if (command == 'asc') {
				this.priceName = '服务数从少到多';
			}
			this.$router.replace({query: Object.assign({}, this.$route.query, {sort_type: this.sortType, sort: this.sort})});
			// this.searchFn();
		},
		// 搜索服务
		searchFn () {
			let query = this.$route.query
			this.sortType = query.sortType || this.sortType
			this.currentPage = query.pg_index || this.currentPage
			this.pageSize = query.pageSize || this.pageSize
			this.sort = query.sort || this.sort
			this.keyword = decodeURIComponent(decodeURIComponent(query.keyword))
			this.storeType = query.storeType
			let parmas = {
				sort_type: this.sortType,
				pg_index: this.currentPage,
				pg_count: this.pageSize,
				sort: this.sort,  //desc 倒序  asc:升序
				keyword: this.keyword,
				storeType:this.storeType
			}
			this.loading = true
			this.$http.post(searchStoreUrl, parmas)
			.then( (resp) =>{
				this.loading = false
				this.searchList = resp.data.storelist;
				this.totalSize = resp.data.total_elements;
				console.log(this.totalSize)
				this.totalPage = Math.ceil(this.totalSize / this.pageSize);  //总页数
			}).catch(() => {
				this.loading = false
			})

			

		}
	},
	filters: {
		priceformat:Filters.priceformat,
		ellipsis: Filters.ellipsis,
		titleLengthFormat:Filters.titleLengthFormat
	},
	beforeMount () {
	},
	mounted () {
		const parmas = this.$route.query
		this.sortType = parmas.sort_type || this.sortType
		if (parmas.pg_index) {
			this.currentPage = parseInt(parmas.pg_index)
		}
		this.sort = parmas.sort || this.sort //desc 倒序  asc:升序
		this.keyword = parmas.keyword || this.keyword
		this.storeType = parmas.storeType || this.storeType
		this.searchFn();
	},
	watch: {
		'$route': ['searchFn']
	}
}
</script>

