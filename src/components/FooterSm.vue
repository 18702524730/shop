<template>
  <!-- 页尾 -->
  <footer>
    <!-- 页尾上半部分 -->
    <div class="footer-top commWidth">
      <ul class="advantage">
        <li class="private">
          <div class="til">方案定制</div>
          <p class="desc">8小时内完成方案定制</p>
        </li>
        <li class="faster">
          <div class="til">极速申报</div>
          <p class="desc">24小时内完成申报</p>
        </li>
        <li class="vip">
          <div class="til">金牌团队</div>
          <p class="desc">全程贴心专业服务</p>
        </li>
        <li class="track">
          <div class="til">进度追踪</div>
          <p class="desc">进度实时掌握</p>
        </li>
      </ul>
      <div class="copyright">© 2018 拾贝  All rights reserved  <a target="_blank" href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action">浙ICP备15042618号</a> | <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010402003197">浙公网安备 33010402003197号</a>  杭州拾贝知识产权服务有限公司</div>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>


<style>
/* 底部样式 */
footer{font-size: 12px;background-color: #fff;}
  .footer-top{}
  .footer-top .advantage{height: 110px;padding:20px 42px 19px;border-bottom: 1px solid #e6e6e6; }
  .footer-top .advantage li{float: left;width:200px;height: 80px;padding-left: 80px;padding-top:10px;background: transparent url(~assets/img/header_footer/advantage.png) 0 0 no-repeat;margin-right: 95px;}
  .footer-top .advantage li:first-child{width:215px;}
  .footer-top .advantage li:last-child{margin-right: 0;width:180px;}
  /* .footer-top .advantage li:hover .til,.footer-top .advantage li:hover .desc{color: #3db1fa;} */
  .footer-top .advantage li .til{font-size: 18px;color: #333;font-weight: normal;}
  .footer-top .advantage li .desc{font-size: 14px;color: #666;}
  .footer-top .advantage li.private{background-position: 0 0;}
  /* .footer-top .advantage li.private:hover{background-position: 0 -94px;} */
  .footer-top .advantage li.faster{background-position: 0 -200px;}
  /* .footer-top .advantage li.faster:hover{background-position: 0 -294px;} */
  .footer-top .advantage li.vip{background-position: 0 -400px;}
  /* .footer-top .advantage li.vip:hover{background-position: 0 -494px;} */
  .footer-top .advantage li.track{background-position: 0 -600px;}
  /* .footer-top .advantage li.track:hover{background-position: 0 -694px;} */
  .footer-top .copyright{text-align:center;height: 67px;line-height: 67px;font-size: 14px;color: #666;}
  .footer-top .copyright a{color: #666;}
  .footer-top .copyright a:hover{color: #3db1fa;}
</style>
