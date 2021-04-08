<style lang="scss">
*{box-sizing: border-box;}
.mr0{margin-right: 0!important;}
.search_container{
  margin: 20px auto;width: 1200px;padding: 20px 20px 0;background: #fff;
  .breadcrumb_container{position: relative;
    .result_num{position: absolute;right: 30px;top: 0;
      span{color:#00B3FF;}
    }
  }
  .search_type{padding: 0 20px 0 20px;font-size: 12px;color:#333;border:1px solid rgba(232,232,232,1);margin-top: 20px;
    .one_level{border-bottom: 1px dashed #eee;
      &.noBorder{border-bottom: none;position: relative;
        .slideDown{position: absolute;top: 13px;right: 10px;color:#00B3FF;
          i{padding-left: 5px;}
        }
      }
      >p{color: #999;width: 80px;padding:11px 20px 11px 0;line-height: 22px;}
      >div{
        width: 1038px;
        .level_item{
          padding: 5px 0 5px 0;
          &.level3_item{padding-right: 90px;}
          li{float: left;margin: 6px 18px 6px 0;line-height: 16px;padding: 3px 8px;cursor: pointer;
            &:first-child{margin-right: 26px;border: 1px solid #9AD8FF;border-radius: 2px;color:#3DB1FA;}
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
    .search_mall_result {
      .result_item {
        width: 570px; height: 204px; float: left; margin: 0 20px 20px 0;
        
      }
    }
  }
}
</style>
<template>
  <div id="app">
    <sebe-header :cartNum="cartNum" :userName='userName' :title="'购买VIP'"></sebe-header>
    <div class="search_container">
      <div class="breadcrumb_container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">全部结果</el-breadcrumb-item>
          <el-breadcrumb-item>搜索国内商标注册申请</el-breadcrumb-item>
        </el-breadcrumb>
        <span class="result_num">共 <span> 800 </span> 件相关搜索结果</span>
      </div>

      <!-- <div class="search_type">
        <div class="one_level clearfix noBorder">
          <p class="fl">一级分类:</p>
          <div class="fl">
            <ul class="fl clearfix level_item">
              <li>不限</li>
              <li>商标服务</li>
              <li>专利服务</li>
              <li>版权服务</li>
              <li>政府项目</li>
              <li>维权诉讼</li>
              <li>企业服务</li>
            </ul>
          </div>
        </div>
      </div> -->
      <div class="search_main">
        <div class="search_nav">
          <div class="fl type_box">
            <span class="item active">综合排序</span>
            <span class="item">销量</span>
            <el-dropdown trigger="click" @command="selectPriceFn">
              <span class="el-dropdown-link" :class="{'active': sortType=='Price_Desc'|| sortType=='Price_Asc'}">
                {{ serviceNumName }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="Price_Asc">价格从低到高</el-dropdown-item>
                <el-dropdown-item command="Price_Desc">价格从高到低</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
           <div class="fr turn_page">
            <i class="el-icon-arrow-left lef" @click="prevePageFn"></i>
            <span class="num"><span class="current">{{ pageNum }}</span>/ {{ totalPage }}</span>
            <i class="el-icon-arrow-right rig" @click="nextPageFn"></i>
          </div>
        </div>
        <div class="search_recommend">
          <h2>为您推荐</h2>
          <p>由于符合<span>"国内商标注册申请"</span>的结果较少，尝试为您推荐以下搜索的结果</p>
        </div>
        <div class="search_mall_result clearfix">
          <div class="result_item fl" v-for="item in 15">
            <div class="mall_name">
              <img src="" class="icon" alt="">
              <span class="tit">杭州拾贝知识产权服务有限公司</span>
              <span class="lab">自营</span>
              <img src="" class="fr" alt="">
            </div>
            <div class="item_des">
              <img src="" alt="">
              
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
import sebeFooter from 'components/Footer.vue'
import Lib from 'assets/Lib.js'
const indexUrl = CONFIG.indexUrl;
const payUrl = CONFIG.payUrl;
export default{
  components: {
    sebeHeader,
    sebeFooter
  },
  data () {
    return {
      serviceNumName: '服务数',
    }
  }
}
</script>

