<template>
<div class="sebe-dialog__wrapper">
  <div class="sebe-dialog sebe-dialog--small apply-popup" style="top: 15%;">
    <div class="sebe-dialog__header">
      <span class="sebe-dialog__title">{{title}}</span>
      <div class="sebe-dialog__headerbtn"><i class="sebe-dialog__close el-icon el-icon-close" @click="close"></i></div>
    </div>
    <div class="sebe-dialog__body">
      <sebe-apply-subject :formData="formData" :typeList="typeList" :parApplyType="formData.apply_type || typeList.slice(0,1)-0" @addSuccess="addSuccess"></sebe-apply-subject>
    </div>
  </div>
</div>
</template>

<script>

import Lib from 'assets/Lib.js'
import Vue from 'vue'
import $ from 'jquery'
import qs from 'qs'
import SebeApplySubject from './SebeApplySubject.vue'
const indexUrl = CONFIG.indexUrl;
const userUrl = CONFIG.userUrl;

export default {
  //typeList:显示类型
	props:['formData', 'typeList'],
  components: {
    SebeApplySubject
  },
  data () {
    return {
      title: '添加主体'
    }
  },
  mounted () {
    var self = this;
    this.initData();
  },
  methods: {
    close(){
  		this.$emit('close');
  	},
    addSuccess(){
      this.$emit('addSuccess');
    },
    initData(){
      if (this.formData.apply_type) {
        this.title = '修改主体';
      }else{
        this.title = '增加主体';
      }
    }
  },
  watch:{
  }
}
</script>


<style lang="scss">
.v-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: .5;
  background: #000;
}
.sebe-dialog__wrapper {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 2000;
  overflow: auto;
  margin: 0;
  .sebe-dialog {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-sizing: border-box;
    margin-bottom: 50px;
    .sebe-dialog__header {
      padding: 10px 0 0;
      .sebe-dialog__title {
        line-height: 1;
        font-size: 16px;
        font-weight: 700;
        color: #1f2d3d;
      }
      .sebe-dialog__headerbtn {
        float: right;
        .sebe-dialog__close {
          cursor: pointer;
          color: #bfcbd9;
        }
      }
    }
    .sebe-dialog__body{
      padding-top:20px;
    }
  }
  .sebe-dialog--small {
    width: 50%;
  }
  .apply-popup{
    width:650px;min-height:300px;padding:20px 30px 35px;transform:translateX(-50%);-ms-transform:translateX(-50%);  /* IE 9 */
    .selt{border-radius: 4px;border: 1px solid #bfcbd9;box-sizing: border-box;color: #1f2d3d;
          display: inline-block;font-size: inherit;height: 36px;line-height: 1;outline: 0;padding: 3px 10px;transition: border-color .2s cubic-bezier(.645,.045,.355,1);width: 100%;}
    .valiMsg{ color: #ff4949;font-size: 12px;line-height: 1;padding-top: 4px;position: absolute;top: 100%;left: 0;}
  }
}

</style>
