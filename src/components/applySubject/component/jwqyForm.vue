<template>
  <div class="jwqyForm">
    <el-form ref="ruleForm" :rules="rules" :model="conForm" label-width="160px">
      <!--境外企业-->
      <div>
        <el-form-item label="企业名称(英文)：" prop="name_en">
          <el-input v-model ="conForm.name_en"></el-input>
        </el-form-item>
        <el-form-item label="企业名称(中文)：" prop="apply_name">
          <el-input v-model ="conForm.apply_name"></el-input>
        </el-form-item>
        <el-form-item label="企业联系电话：" prop="apply_phone">
          <el-input v-model="conForm.apply_phone"></el-input>
        </el-form-item>
        <el-form-item label="企业邮箱：" prop="apply_email">
          <el-input v-model="conForm.apply_email"></el-input>
        </el-form-item>
        <el-form-item label="企业传真：" prop="apply_fax">
          <el-input v-model="conForm.apply_fax"></el-input>
        </el-form-item>
        <el-form-item label="企业注册地址：" prop="area_id">
          <el-select v-model="conForm.area_id" placeholder="请选择国家/地区" style="width:100%;">
            <el-option v-for="item in areaData" :label="item.zh_name" :value="item.country_id+''" :key="item.country_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="address" style="margin-top:22px;">
          <el-input v-model="conForm.address" auto-complete="off" class="form-ipt" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item label="邮编：" prop="zip_code">
          <el-input v-model="conForm.zip_code"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox v-model="isDefault">设为默认</el-checkbox>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="add('ruleForm')" :disabled="submitDisabled">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import Vue from 'vue'
import $ from 'jquery'
import qs from 'qs'
const indexUrl = CONFIG.indexUrl;
const userUrl = CONFIG.userUrl;
const addressUrl = userUrl + '/api/areas';
const countryUrl = userUrl + '/api/country';
import VueCookie from 'vue-cookie'
const addSebjectUrl = userUrl + '/api/subject';
const editSebjectUrl = userUrl + '/api/subjectModify';

export default {
	//formData:表单数据  applyType:当前选中的类型  dataIsNeedInit:判断是否需要置空表单数据
  props:['formData',  'applyType', 'dataIsNeedInit'],
  data () {
    //境外企业邮箱验证
    let jwqy_checkEmail = (rule, value, callback) =>{
      let emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!value) {
          return callback(new Error('企业邮箱不能为空'));
      }
      if (value.length > 30) {
          return callback(new Error('邮箱不能超过30个字符'));
      }
      setTimeout(() => {
          if (!emailReg.test(value)) {
            callback(new Error('邮箱格式错误'));
          } else {
            callback();
          }
      }, 300);
    };

    //统一邮编验证
    let checkZipCode = (rule, value, callback) =>{
      let zipCodeReg = /^[a-zA-Z0-9\-]{1,10}$/;
      if (!value) {
          return callback(new Error('邮编不能为空'));
      }
      if (value.length > 10) {
          return callback(new Error('邮编不能超过10个字符'));
      }
      setTimeout(() => {
          if (!zipCodeReg.test(value)) {
            callback(new Error('邮编格式错误'));
          } else {
            callback();
          }
      }, 300);
    };
    return {
      submitDisabled: false,
      //是否为修改
      isEdit: false,
      //省市区数据集
      provinceData:[],
      cityData:[],
      areaData:[],

      ///境外个体
      jwgt_areaData:[],

      ///境外企业
      jwqy_areaData:[],

      isDefault: true,
      conForm:{
        apply_id:'',
        apply_type:2,//主体类型
        is_default:'', //是否默认主体
        apply_name:'',//姓名
        name_en:'',//英文名
        apply_number:'',//身份证号或证件号
        apply_phone:'',//手机号或电话
        apply_email:'',//邮箱
        province_id:'',//省id
        city_id:'',//市id
        area_id:'',//区id
        area_info:'', //省市县名称拼接以空格隔开，境外则国家名称以空格隔开
        address:'',//详细地址
        zip_code:'',//邮编
        apply_fax:''
      },
      rules:{
        //境外企业
        name_en:[
          { required: true, message: '请输入企业英文名称', trigger: 'blur' },
          { min: 1, max: 45, message: '企业名称长度 1到 45个字符', trigger: 'blur' }
        ],
        apply_name:[
          { required: true, message: '请输入企业中文名称', trigger: 'blur' },
          { min: 1, max: 30, message: '企业名称长度 1到 30个字符', trigger: 'blur' }
        ],
        apply_phone: [
          { required: true, message: '请输入企业联系电话', trigger: 'blur' },
          { min: 2, max: 20, message: '电话长度 2到 20个字符', trigger: 'blur' }
        ],
        apply_email:[
          { required: true, validator:jwqy_checkEmail, trigger: 'blur' }
        ],
        apply_fax:[
          /*{ required: true, message: '请输入企业传真', trigger: 'blur' },*/
          { min: 2, max: 20, message: '传真长度 2到 20个字符', trigger: 'blur' }
        ],
        area_id:[
          { required: true, message: '请选择国家/地区', trigger: 'change' }
        ],
        address:[
          { required: true, message: '请输入详细地址', trigger: 'blur' },
          { min: 2, max: 30, message: '详细地址长度 2到 30个字符', trigger: 'blur' }
        ],
        zip_code:[
          { required: true, validator:checkZipCode, trigger: 'blur' }
          /*{ required: true, message: '请输入邮政编码', trigger: 'blur' },
          { max: 12, message: '邮编最长12个字符', trigger: 'blur' }*/
        ]
      }
    }
  },
  mounted () {
    this.initCountry();
  },
  methods: {
    //初始化国家
    initCountry(){
      var self = this;
      this.$http.get(countryUrl).then(function(resp){
        self.areaData = resp.data;
        self.initData();
      })
      .catch((error) => {
        console.error(error);
      });
    },
    getSelectName (code, dataName){
      var self = this;
      var data = self[dataName];
      var ret = '';
      $.each(data, function(i, item){
        if (item.country_id == code) {
          ret = item.zh_name;
          return false;
        }
      });
      return ret;
    },
    //国家拼接
    getAreaInfo(){
      var data = this.conForm;
      var area_id = data.area_id;
      return [this.getSelectName(area_id, 'areaData')].join(' ');
    },
    //添加主体请求
    add(formName){
      var self = this;
      if (self.submitDisabled) {
        return;
      }
      self.submitDisabled = true;
      self.$refs[formName].validate((valid) => {
        if (valid) {
          var tip = self.isEdit ? '修改': '增加';
          self.$confirm('确认'+tip+'该主体吗?', '提示', {
            type: 'warning',
            closeOnClickModal: false
          }).then(() => {
            self.conForm.area_info = self.getAreaInfo();
            self.conForm.is_default = self.isDefault ? 1 : 0;
            self.conForm.apply_type = self.applyType || 1;
            //var method = self.isEdit ? 'put' : 'post';
            var url = self.isEdit ? editSebjectUrl : addSebjectUrl;
            // put 修改接口 post 新增
            // put ie9下跨域不支持，改用post
            self.$http.post(url+'?access_token='+ VueCookie.get('user_token'), self.conForm)
            .then(function(resp){
              self.submitDisabled = false;
              //console.log(resp.data);
              var data = resp.data;
              if(data.code=="fail"){
                self.$notify({
                  title: '失败',
                  message: data.msg,
                  type: 'error'
                });
              }else{
                self.$notify({
                  title: '成功',
                  message: '保存成功',
                  type: 'success'
                });
                self.$emit('addSuccess')
              }
            }).catch((error) => {
              self.submitDisabled = false;
              var data = error.response.data;
              if(data.status == 10034){//最大上限
                self.$notify({
                  title: '失败',
                  message: data.msg,
                  type: 'error'
                });
              }
            });
          }).catch(() => {
            self.submitDisabled = false;
          });
        }else{
          self.submitDisabled = false;
        }
      });
    },
    //初始化表单数据
    initData(){
      var self = this;
      if (this.formData.apply_type) {
        this.isEdit = true;
      }else{
        this.isEdit = false;
      }
      var conForm = this.conForm;
      var formData = self.formData;
      var applyId = formData.apply_id;
      if (self.dataIsNeedInit && applyId) {
        $.each(conForm, function(key, val){
          Vue.set(conForm, key, formData[key]);
        });
      }else{
        $.each(conForm, function(key, val){
          Vue.set(conForm, key, null);
        });
        if (applyId) {
          Vue.set(conForm, 'apply_id', applyId);
        }
      }
      self.conForm.area_id = self.conForm.area_id ? (self.conForm.area_id+'') : '';
    }
  },
  watch:{
    formData(){
      //console.log(this.conForm);
      this.initData();
    }
  }
}
</script>


<style lang="scss">
.jwqyForm{
  width: 590px;
}
</style>
