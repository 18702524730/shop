<template>
  <!-- 存证主体模块 -->
  <div class="applySubject">
    <div class="mainOwern clearfix">
      <ul>
        <li v-for="(item, index) in listsData" :class="{active: applySubjectId==item.apply_id}" @click="selectApplySubject(item.apply_id)">
          <p class="name">{{item.apply_name}}</p>
          <p class="type">{{item.apply_type|applyTypeFilter}}</p>
          <i class="edit" @click.stop="showPopup(item)">修改</i>
        </li>
        <li @click="showPopup" :class="{disabled: total && total===limit}">
          <div class="main-add"><i>+</i><span>增加申请主体</span></div>
        </li>
      </ul>
    </div>
    <p class="limit-tip" v-if="total && total===limit">当前主体信息数量已达到上限。 <a :href="userUrl+'/iprp/#/subjectList'" target="_blank">管理主体信息</a></p>
    <popup v-if="visible" @close="visible=false" :visible="visible" :formData="popupData" @addSuccess="addSuccess" :typeList="applytype" :parApplyType="parApplyType"></popup>
  </div>
</template>

<script>
  import Lib from 'assets/Lib.js'
  import Vue from 'vue'
  import $ from 'jquery'
  import qs from 'qs'
  import popup from 'components/applySubject/Popup.vue'
  const indexUrl = CONFIG.indexUrl;
  const userUrl = CONFIG.userUrl;
  const getSubjectUrl = userUrl + '/api/subject';

  export default {
  	props:['applytype', 'needRender'],
    data() {
      return {
        userUrl: userUrl,
        visible: false,
        nologin: false,
        parApplyType: 2,
        popupData: {},
        applySubjectId: '',
        total:'', //主体总数量
        limit:'', //主体上限数量
        listsData: []
      }
    },
    components: {
      popup
    },
    mounted () {
      var self = this;
      this.initListsData();
    },
    methods: {
      initListsData(){
        this.getListsData(this.applytype);
      },
      // 会员主体类型，1：大陆个体，2：大陆企业，3：境外个体，4：境外企业 typesList: 1,4 逗号隔开
      getListsData(typesList){
    		var self = this;
        //qs.stringify({applyType: type})
        self.nologin = false;
    		this.$http.get(getSubjectUrl + '?typesList=' + typesList + '&access_token='+ this.$cookie.get('user_token') + '&t=' + new Date().getTime())
        .then(function(response) {
          var data = response.data;
          self.listsData = data.elements;
          self.total = data.total;
          self.limit = data.limit;
          if (data.elements.length) {
            self.applySubjectId = data.elements[0].apply_id;
            self.$emit('selectApplySubjectId', {orderApplySubjectId: data.elements[0].apply_id});
          }
        })
        .catch(function(error) {
          console.log(error)
          if (!error.response) {
            self.$emit('nologin');
            self.nologin = true;
            return;
          }
          var data = error.response.data;
          if(data.status == '401'){//未登录
            location.href = CONFIG.userUrl + '/iprp/#/access/login?return_url='+ encodeURIComponent(location.href);
            //self.$emit('nologin');
          }
        });
    	},
      addSuccess(){
        this.visible = false;
        this.initListsData();
      },
      selectApplySubject(applyTypeId){
        this.applySubjectId = applyTypeId;
        this.$emit('selectApplySubjectId', {orderApplySubjectId: applyTypeId});
      },
    	showPopup(item){
    		var self = this;
        if (item.apply_type) {
          this.popupData = item;
          this.parApplyType = item.apply_type;
        }else{
          if (self.nologin) {
            location.href = CONFIG.userUrl + '/iprp/#/access/login?return_url='+ encodeURIComponent(location.href);
            return;
          }
          this.popupData = {}
          if (self.total && self.total===self.limit) {
            return;
          }
        }
        this.visible = true;
    	}
    },
    watch:{
      needRender(){
        if (this.needRender) {
          this.nologin = false;
          this.initListsData();
        }
      },
      visible(){
        var v = $('.v-modal');
        if (this.visible) {
          if (v.length) {
            v.show()
          }else{
            $('body').append('<div class="v-modal" style="z-index: 1999;"></div>');
          }
        }else{
          v.hide();
        }
        /*this.initData();
        if (this.visible) {
          this.initProvince();
          this.initCountry();
        }*/
      }
    },
    filters:{
      applyTypeFilter(input){
        var ret = ''
        switch (input+''){
          case '1':
            ret = "大陆个体";
            break;
          case '2':
            ret = "大陆企业";
            break;
          case '3':
            ret = "境外个体";
            break;
          case '4':
            ret = "境外企业";
            break;
        }
        return ret;
      }
    }
  }
</script>


<style>
  .mainOwern{padding:20px 0 0;font-size: 14px;}
  .mainOwern li{position: relative;cursor: pointer;float: left;width:250px;height: 80px;border: 1px solid #e6e6e6;margin:0 16px 15px;padding: 10px;}
  .mainOwern li p{}
  .mainOwern li p.name{line-height: 16px;color: #333;max-height: 32px;overflow: hidden;}
  .mainOwern li p.type{position: absolute;bottom: 10px;left: 10px;color: #999;}
  .mainOwern li i.edit{display: none;position: absolute;bottom: 10px;right: 10px;font-style: normal;color: #3db1fa;cursor: pointer;}
  .mainOwern li .main-add{position: relative;height: 22px;color: #3db1fa;vertical-align: middle;top: 15px;text-align: center;}
  .mainOwern li .main-add i{display: inline-block;width: 16px;height: 24px;line-height: 20px;text-align: center;font-style: normal;vertical-align: middle;font-size: 24px;}
  .mainOwern li .main-add span{display: inline-block;height: 22px;line-height: 22px;padding-left: 3px;vertical-align: middle;}
  .mainOwern li:hover{
    border-color: #3db1fa;
  }
  .mainOwern li:hover i.edit{display: block;}
  .mainOwern li.active{
    border-color: #3db1fa;background-color: #3db1fa;
  }
  .mainOwern li.active p.name,.mainOwern li.active p.type,.mainOwern li.active i.edit{color: #fff;}
  .mainOwern li.disabled{background-color: #eee;cursor: default;}
  .mainOwern li.disabled .main-add{color:#ccc;}
  .mainOwern li.disabled:hover{border-color: #e6e6e6;}

  .applySubject .limit-tip{padding-left:16px;padding-bottom:10px;font-size: 14px;color: #666;}
  .applySubject .limit-tip a{color: #3db1fa;}
</style>
