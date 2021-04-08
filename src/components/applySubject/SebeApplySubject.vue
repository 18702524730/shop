<template>
  <div class="sebe-apply-subject">
    <div>
      <el-form>
        <el-form-item label="主体类型：" label-width="172px">
          <el-radio-group v-model="applyType" style="line-height:28px;" @change="applyTypeChange">
            <el-radio :label="item.id" :key="item.id" v-for="item in typeListData" v-if="item.show">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <!--大陆个体-->
    <dlgt-form v-if='applyType==1' :formData="formData" :applyType="applyType" :dataIsNeedInit="parApplyType==1" @addSuccess="addSuccess"></dlgt-form>
    <!--大陆企业-->
    <dlqy-form v-if='applyType==2' :formData="formData" :applyType="applyType" :dataIsNeedInit="parApplyType==2" @addSuccess="addSuccess"></dlqy-form>
    <!--境外个体-->
    <jwgt-form v-if='applyType==3' :formData="formData" :applyType="applyType" :dataIsNeedInit="parApplyType==3" @addSuccess="addSuccess"></jwgt-form>
    <!--境外企业-->
    <jwqy-form v-if='applyType==4' :formData="formData" :applyType="applyType" :dataIsNeedInit="parApplyType==4" @addSuccess="addSuccess"></jwqy-form>
  </div>
</template>

<script>


import Vue from 'vue'
import $ from 'jquery'
import qs from 'qs'
import dlgtForm from './component/dlgtForm.vue'
import dlqyForm from './component/dlqyForm.vue'
import jwgtForm from './component/jwgtForm.vue'
import jwqyForm from './component/jwqyForm.vue'
const indexUrl = CONFIG.indexUrl;
const userUrl = CONFIG.userUrl;


export default {
  //typeList:显示类型
	props:['formData', 'typeList', 'parApplyType'],
  components: {
    dlgtForm,
    dlqyForm,
    jwgtForm,
    jwqyForm
  },
  data () {
    return {
      applyType:2,
      typeListData:[
        {
          name: '大陆企业',
          id: 2,
          isShow: false
        },
        {
          name: '大陆个体',
          id: 1,
          isShow: false
        },
        {
          name: '境外企业',
          id: 4,
          isShow: false
        },
        {
          name: '境外个体',
          id: 3,
          isShow: false
        }
      ]
    }
  },
  mounted () {
    var self = this;
    this.applyType = this.parApplyType || 2;
    this.initTypeListData();
  },
  methods: {
    initTypeListData(){
      var arr = this.typeList.split(',');
      var typeListData = this.typeListData;
      $.each(arr, function(i, id){
        $.each(typeListData, function(idx, it){
          if ((it.id+'') === id) {
            Vue.set(it, 'show', true);
            return false;
          }
        });
      });
    },
    addSuccess(){
      this.$emit('addSuccess');
    },
    applyTypeChange(v){
      //this.formData = this.formData;
      //console.log(this.formData)
      //this.$refs['ruleForm'].resetFields();
    }
  },
  watch:{
    formData(){
      this.applyType = this.formData.apply_type || 2;
    }
  }
}
</script>


<style lang="scss">
.sebe-apply-subject{
  .disabled,.disabled:active,.disabled:focus,.disabled:hover,.disabled:visited{background-color: #eee;cursor: default;color: #999;border-color: #ccc;}
}
</style>
