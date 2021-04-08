<template>
  <!-- 正在支付 -->
  <el-dialog title="正在支付..." v-model="visible" custom-class="dialog-paying">
    <div class="paying-tip-wrap">
      <ul>
        <li>
          <p>支付成功了</p>
          <a href="">立即查看订单详情</a>
        </li>
        <li>
          <p>如果支付失败</p>
          <a href="">查看支付常见问题</a>
        </li>
      </ul>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props:['visible'],
    data() {
      return {
      }
    },
    mounted () {
    },
    methods: {
      
    }
  }
</script>


<style lang="scss">
.dialog-paying{
  width:400px;height:220px;padding:20px 30px 35px;
  .el-dialog__body{padding:0;}
  .el-dialog__header{
    padding: 6px 0 16px;
    .el-dialog__title{font-size:14px;font-weight:normal;}
  }
}
.paying-tip-wrap{
  margin-top:20px;
  background: #FFF url(~assets/img/pay/paying_bg.png) 65px 0 no-repeat;
  padding-left:170px;
  ul{
    font-size:14px;
    li{
      margin-bottom: 5px;
      p{font-weight:bold;line-height:18px;}
      a{color: #3db1fa;line-height:18px;}
    }
  }
}
</style>
