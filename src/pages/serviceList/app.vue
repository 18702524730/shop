<style lang="scss">
*{box-sizing: border-box;}
.mr0{margin-right: 0!important;}
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
      h2{font-size: 18px;color: #666;line-height: 25px;text-align: center;}
      p{font-size: 13px;line-height: 38px;background: rgba(255,251,238,1);text-align: center;color: #999;
      border:1px solid rgba(250,217,132,1);margin: 20px 0;
        span{color:#FF763C;}
      }
    }
    .search_result{
      .result_item{
        width: 210px;font-size: 0;margin: 0 27.5px 20px 0;border:1px solid rgba(237,237,237,1);
        &:nth-child(5n+5){margin-right: 0;}
        >img{width: 208px;height: 210px;}
        .item_des{
          padding: 5px 10px 9px;
          >p{line-height: 25px;font-size: 18px;color: #FF763C;
            a{
              img{padding-top: 3px;}}
          }
          >a{display:block;text-decoration: none;
            &.item_name{line-height: 20px;padding: 5px 0;color: #3DB1FA;font-size: 14px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
              span{color: #333;}
            }
            &.shop_name{line-height: 17px;color: #BBBBBB;font-size: 12px;padding-bottom: 8px;}
          }
          .item_icon{height: 25px;}
        }
      }
    }
    .el-pagination {text-align: center; padding: 40px 0;}
  }
}
</style>
<template>
  <div id="app">
    <!-- 公共头部 -->
    <sebe-header :cartNum="cartNum" :userName='userName' :title="'购买VIP'"></sebe-header>
    <!-- 店铺内头部 -->
    <!-- <header-mall :cartNum="cartNum" :userName='userName' ></header-mall> -->

    <div class="search_container">
      <div class="breadcrumb_container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">全部结果</el-breadcrumb-item>
          <el-breadcrumb-item>商标服务</el-breadcrumb-item>
          <el-breadcrumb-item>国际商标服务</el-breadcrumb-item>
        </el-breadcrumb>
        <span class="result_num">共 <span> {{ totalSize }} </span> 件相关搜索结果
          <i class="el-icon-arrow-down" v-if="!showAllType" @click="showAllType=true"></i>
          <i class="el-icon-arrow-up" v-if="showAllType" @click="showAllType=false"></i>
        </span>
      </div>

      <div class="search_type" v-show="showAllType">
        <div class="one_level clearfix">
          <p class="fl">一级分类:</p>
          <div class="fl">
            <ul class="fl clearfix level_item">
              <li @click="getListSecondFn(-1)" :class="{'active': firstCategory==''}">不限</li>
              <li v-for="(item, index) in allBsList" :class="{'active': item.bs_class_id==firstCategory}" @click="getListSecondFn(index, item)">{{ item.name }}</li>
            </ul>
          </div>
        </div>
        <div class="one_level clearfix" v-if="listSecond.length">
          <p class="fl">二级分类:</p>
          <div class="fl">
            <ul class="fl clearfix level_item">
              <li @click="getListThirdFn(-1)" :class="{'active': secondCategory==''}">不限</li>
              <li v-for="(item, index) in listSecond" :class="{'active': item.bs_class_id==secondCategory}" @click="getListThirdFn(index, item)">{{ item.name }}</li>
            </ul>
          </div>
        </div>
        <div class="one_level clearfix noBorder" v-if="listThird.length">
          <p class="fl">三级分类:</p>
          <div class="fl">
            <ul class="fl clearfix level_item level3_item" :class="{'line': !showThirdAll}">
              <li @click="selectThidFn(-1)" :class="{'active': thirdCategory==''}">不限</li>
              <li v-for="(item, index) in listThird" :class="{'active': item.bs_id==thirdCategory}" @click="selectThidFn(index, item)">{{ item.name }}</li>
            </ul>
          </div>
          <span class="slideDown" v-if="showThirdAll" @click="showThirdAll=flase">收起<i class="el-icon-arrow-up"></i></span>
          <span class="slideDown" v-if="!showThirdAll" @click="showThirdAll=true">展开<i class="el-icon-arrow-down"></i></span>
        </div>
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
                <el-dropdown-item command="asc">价格从低到高</el-dropdown-item>
                <el-dropdown-item command="desc">价格从高到低</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="fr turn_page">
            <i class="el-icon-arrow-left lef" @click="prevePageFn"></i>
            <span class="num"><span class="current">{{ currentPage }}</span>/ {{ totalPage }}</span>
            <i class="el-icon-arrow-right rig" @click="nextPageFn"></i>
          </div>
        </div>
        <div class="search_result clearfix">
          <div class="result_item fl" v-for="item in searchList">
            <img :src="item.picUrl" />
            <div class="item_des">
              <p class="item_price"><span>￥{{ item.amount }}</span><a href="javascript:void(0)" class="fr"><img src="~assets/img/icon/chat.png" /></a></p>
              <a class="item_name">{{ item.serviceTitle }}</a>
              <a class="shop_name">{{ item.storeName }}</a>
              <div class="item_icon">
                <a class="mr5" v-for="it in item.tagsList" href="javascript:void(0)" :title="it.name"><img :src="it.iconUrl" /></a>
              </div>
            </div>
          </div>
        </div>
        <el-pagination
          background
          @current-change="currentChangeFn"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="totalSize"
          layout="total, prev, pager, next, jumper">
        </el-pagination>

        <div class="search_recommend" v-if="!searchList.length">
          <h2>为您推荐</h2>
          <p>由于符合<span>"国内商标注册申请"</span>的结果较少，尝试为您推荐以下搜索的结果</p>
        </div>
        <div class="search_result clearfix" v-if="!searchList.length">
          <div class="result_item fl" v-for="item in 15">
            <img src="~assets/img/notfound.png" />
            <div class="item_des">
              <p class="item_price"><span>￥199.00</span><a href="javascript:void(0)" class="fr"><img src="~assets/img/serviceList/msgIcon.png" /></a></p>
              <a class="item_name">国内商标注册<span>（极速版）</span></a>
              <a class="shop_name">杭州拾贝旗舰店</a>
              <div class="item_icon">
                <a href="javascript:void(0)"><img src="~assets/img/serviceList/labelIcon.png" /></a>
              </div>
            </div>
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
// import headerMall from 'components/HeaderMall.vue'
import Lib from 'assets/Lib.js'
const indexUrl = CONFIG.indexUrl;
const payUrl = CONFIG.payUrl;
const findAllBsUrl = CONFIG.userUrl + '/api/findAllBs';  //查询所有服务分类
const searchServiceUrl = CONFIG.path + '/searchService.htm';  // 服务搜索

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
      showAllType: true, //展示所有分类
      showThirdAll: true,  // 三级分类展示全部
      allBsList: [],  //所有分类数据
      listSecond: [],  //二级分类数据
      listThird: [],  //三级分类数据
      firstCategory: '',  //选择的一级分类ID
      secondCategory: '',  //选择的二级分类ID
      thirdCategory: '',  //选择的三级分类ID
      searchContent: '',  //搜索内容
      sortType: '',  //排序类别
      priceName: '价格',  //价格排序
      searchList: [],  //搜索结果列表
      totalSize: 1,  //所有条数
      currentPage: 1,  //当前页数
      pageSize: 10,  //每页数量
      totalPage: 1,  //总页数
    }
  },
  methods: {
    // 上一页
    prevePageFn () {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage-1;
      }
      else{
        this.currentPage = 1;
      }
      this.searchFn();
    },
    // 下一页
    nextPageFn () {
      if (this.currentPage < this.totalPage) {
        this.currentPage = this.currentPage + 1;
      }
      else{
        this.currentPage = this.totalPage;
      }
      this.searchFn();
    },
    // 翻页
    currentChangeFn (data) {
      this.currentPage = data; //当前页
      this.searchFn();
    },
    // 选择排序类别
    selectTypeFn (type) {
      this.sortType = type;
      this.priceName = '价格';
      this.searchFn();
    },
    // 选择价格培训类型
    commandFn (command) {
      this.sortType = 3;  //价格
      this.sort = command;
      if (command == 'desc') {
        this.priceName = '价格从高到低';
      }
      else if (command == 'asc') {
        this.priceName = '价格从低到高';
      }
      this.searchFn();
    },
    // 查询素有分类数据
    getServiceTypeListFn () {
      this.$http.get(findAllBsUrl)
      .then( (resp) => {
        this.allBsList = resp.data;
      })
    },
    //选择一级分类，筛选二级分类
    getListSecondFn (index, item) {
      if (index === -1) {
        this.listSecond = [];
        this.listThird = [];
        this.firstCategory = '';
      }
      else{
        this.listSecond = this.allBsList[index].childs;
        this.firstCategory = item.bs_class_id;
      }
    },
    // 选择二级分类，筛选三级分流
    getListThirdFn (index, item) {
      if (index === -1) {
        this.listThird = [];
        this.secondCategory = '';
      }
      else {
        this.listThird = this.listSecond[index].bsList;
        this.secondCategory = item.bs_class_id;
      }
    },
    // 选择三级分类
    selectThidFn (index, item) {
      if (index == -1) {
        this.thirdCategory = '';
      }
      else{
        this.thirdCategory = item.bs_id;
      }
      this.searchFn();
    },
    // 搜索服务
    searchFn () {
      let parmas = {
        pg_index: this.currentPage,
        pg_count: this.pageSize,
        sort_type: this.sortType,
        sort: this.sort,  //desc 倒序  asc:升序
        keyword: this.searchContent,
        firstCategory: this.firstCategory,
        secondCategory: this.secondCategory,
        thirdCategory: this.thirdCategory
      }
      // let parmas = {
      //   pg_index:1,
      //   pg_count: 1,
      //   sort_type:2,
      //   sort: 'desc',
      //   keyword: '什么'
      // }
      console.log(parmas);
      this.$http.post(searchServiceUrl, parmas)
      .then( (resp) =>{
        this.searchList = resp.data.list;
        this.totalSize = resp.data.total_elements;
        this.totalPage = Math.ceil(this.totalSize / this.pageSize);  //总页数
      })
    }
  },
  mounted () {
    this.getServiceTypeListFn(); //查询素有分类数据
    this.searchFn();
  }
}
</script>

