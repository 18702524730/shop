<template>
  <!-- 支付订单详情 -->
  <el-dialog title="支付订单详情" v-model="visible" custom-class="dialog-orderdetail">
    <div class="pop_window">
      <div class="order_detail">
        <p><span>订单号：11349795</span><span>下单时间：2017-04-11 07:17:38</span><span>订单金额：<i class="highlight">￥9599.00</i></span><br> 已分拆为<i class="highlight">4</i>个服务订单：</p>
        <div class="order_table_wrap">
          <table width="100%" class="table order_table">
            <thead>
              <tr>
                <th width="170">服务单号</th>
                <th class="til" width="270">商品信息</th>
                <th>金额</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>50844683784</td>
                <td class="til">国内商标注册申请（担保版）</td>
                <td class="amount">1999.00</td>
              </tr>
              <tr>
                <td>50844683784</td>
                <td class="til">国内商标注册申请（担保版）</td>
                <td class="amount">199.00</td>
              </tr>
              <tr>
                <td>50844683784</td>
                <td class="til">国内商标注册申请（担保版）</td>
                <td class="amount">1999.00</td>
              </tr>
              <tr>
                <td>50844683784</td>
                <td class="til">国内商标注册申请（担保版）</td>
                <td class="amount">199.00</td>
              </tr>
              <!-- <tr>
                <td>50844683784</td>
                <td class="til">国内商标注册申请（担保版）</td>
                <td class="amount">1999.00</td>
              </tr>
              <tr>
                <td>50844683784</td>
                <td class="til">国内商标注册申请（担保版）</td>
                <td class="amount">199.00</td>
              </tr>
              <tr>
                <td>50844683784</td>
                <td class="til">国内商标注册申请（担保版）</td>
                <td class="amount">1999.00</td>
              </tr>
              <tr>
                <td>50844683784</td>
                <td class="til">国内商标注册申请（担保版）</td>
                <td class="amount">199.00</td>
              </tr>
              <tr>
                <td>50844683784</td>
                <td class="til">国内商标注册申请（担保版）</td>
                <td class="amount">1999.00</td>
              </tr>
              <tr>
                <td>50844683784</td>
                <td class="til">国内商标注册申请（担保版）</td>
                <td class="amount">199.00</td>
              </tr> -->
            </tbody>
          </table>
        </div>
      </div>
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
.dialog-orderdetail{
  width:650px;min-height:300px;padding:20px 30px 35px;
  .el-dialog__body{padding:0;}
  .el-dialog__header{padding: 6px 0 16px;}
}
.pop_window{
  position: relative;
  font-size:14px;
  color: #333;
  .order_detail{
    .order_table_wrap{max-height: 290px;overflow-y: auto;}
    p{
      line-height:27px;
      color: #666;
      span{
        margin-right: 20px;
      }
      i.highlight{color: #fe2200;font-style: normal;}
    }
    .order_table{
      height: 100%;
      margin-top:12px;
      text-align:center;
      th{height: 45px;border: 1px solid #e6e6e6;background-color: #eee;font-weight:normal; }
      th.til{text-align:left; padding-left:30px;}
      td{height: 46px;border: 1px solid #e6e6e6;}
      td.til{text-align:left; padding-left:30px;}
      td.amount{text-align: right;padding-right: 50px;color: #fe2200}
    }
  }
}
</style>
