<template>
  <div id="app">
    <!-- <sebe-header :username="userName" :title="'我的购物车'"></sebe-header> -->
    <div class="serviceAgreement">
      <div class="serviceAgreementList">
      <img src="~assets/img/payProblem/logo.png" alt="">
      <h1>拾贝网商家入驻合作协议</h1>
      <div class="content-p">
      	<p class="time">版本生效日期：2018年8月10日</p>
      	<p class="text-p">甲方：{{info.name || ''}}</p>
      	<p class="text-p mb20">乙方：杭州拾贝知识产权服务有限公司</p>
      	<p class="text-p">说明：甲方是在拾贝网参与销售服务、出售技能以及接受服务的用户。乙方是面向经营者提供服务/应用的互联网电子服务平台的拾贝网（包括但不限于网页、电脑端及移动客户端等产品及其更新产品）之运营方“杭州拾贝知识产权服务有限公司（下称拾贝）”。</p>
        <p class="text-p">本协议中甲方亦简称为“商家”。为提升甲方的销售业绩和市场影响力、整合资源及捕捉商业机会，经甲方自愿申请入驻拾贝网，特此签订本商家入驻协议。</p>
        <p class="text-p">一、甲方权利和义务</p>
        <p class="text-p">1.1战略合作</p>
        <p class="text-p">鉴于拾贝网将为推广甲方业务，提了独特、优质的服务和资源，为甲方持续发展大量潜在客户，持续提升甲方市场影响力，同时，能为甲方用户提供了更好的产品和服务体验；为确保拾贝网的上述投入得到公平回报，经双方友好协商，甲方同意在协议有效期内，积极在拾贝网上开展业务，并积极配合乙方做好拾贝网的市场推广工作。</p>
        <p class="text-p">1.2经营合作</p>
        <p class="text-p">1.2.1交易约定</p>
        <p class="text-p">甲方通过拾贝网进行业务交易时，应当遵守拾贝网交易规范及流程，按照实际成交金额进行线上交易支付。不得擅自与其用户通过线下等非拾贝网渠道之外的交易方式进行交易。</p>
        <p class="text-p">1.2.2推广合作</p>
        <p class="text-p">甲方在线下、线上媒体曝光等一切对外宣传推广活动中（包括但不限于影像传媒、纸媒、互联网媒体、户外硬广、线下活动等），如需披露合作平台，应当体现拾贝网为其深度战略合作平台。</p>
        <p class="text-p">1.2.3创新合作</p>
        <p class="text-p">甲方需主动配合使用乙方在大数据分析、人工智能、物联网、虚拟现实/增强现实领域提供的创新技术或平台，并积极配合拾贝网的市场推广。</p>
        <p class="text-p">二、乙方权利和义务</p>
        <p class="text-p">合作期间，在甲方保障前述承诺条件有效兑现的情况下，乙方将会提供平台资源，支持甲方业务在拾贝网的成长和发展，经过双方友好协商，拾贝网按照以下条款向甲方提供支付及服务：</p>
        <p class="text-p">2.1推广支持：</p>
        <p class="text-p">2.1.1拾贝网推广支持：</p>
        <p class="text-p">a.给予甲方服务在拾贝网优先推荐的资格，具体形式以双方确定的运营计划的邮件为准；</p>
        <p class="text-p">b.给予甲方服务在拾贝网大促活动中优先拥有活动会场的资格，具体形式以双方确定的运营计划的邮件为准。</p>
        <p class="text-p">2.1.2为有效推进甲乙双方的业务发展，共建良好的商业环境，拾贝网会不定期组织各种类型的商家沟通交流会议，甲方作为战略合作伙伴享有优先参会权利；但拾贝网部分小范围圆桌会议仅限深度战略合作伙伴参与。</p>
        <p class="text-p">2.1.3在所有与战略合作相关的对外公关宣传活动中，甲方优先获得拾贝网统一宣传推广的机会，但因每次的活动目的不同，在进行宣传活动时，将针对性的选择符合需求的商家，不保证每次活动均有甲方参与。</p>
        <p class="text-p">2.2若甲方及其服务不符合拾贝网制定的基准活动及大促活动要求，或存在虚假交易等重大投诉违规行为，则乙方有权拒绝执行上述条款。</p>
        <p class="text-p">三、保密协议</p>
        <p class="text-p">3.1保密内容包括但不限于：本协议及其附件内容、双方履行本协议过程中获知的对方未向社会公开的技术秘密、商业秘密、客户资料、成交数据、售后投诉等均为保密信息。任何一方对该等保密信息负有保密义务，未经对方书面许可，该方不得自行使用（为履行本协议目的除外）或将其披露给任何第三方（法律法规强制要求披露的除外；唯该等情况下披露方需及时提前通知另一方并只披露法律法规要求披露的内容）。</p>
        <p class="text-p">3.2除非经各方书面确认，任何一方不得将本协议及附件内容透露给任何第三方。</p>
        <p class="text-p">3.3任何一方获知对方违反保密义务后均可立即解除本协议，并要求违约方支付相应的违约金。</p>
        <p class="text-p">3.4保密条款具有独立性，在本协议终止之后，各方仍需遵守本协议之保密条款，履行其所承诺的保密义务，直到对方书面同意解除此项义务为止，且一方应对方要求应销毁或返还相关的保密信息。</p>
        <p class="text-p">四、知识产权</p>
        <p class="text-p">4.1拾贝网平台所拥有的知识产权及所有权均由乙方所有，包括但不限于商标、专利、著作权、商业秘密、域名、网站内容等。</p>
        <p class="text-p">4.2未经拾贝网事先书面同意，甲方不得为任何营利性或非营利性的目的自行实施、利用、转让或许可任何第三方实施、利用、转让上述知识产权。</p>
        <p class="text-p">4.3如甲方或其服务侵犯第三方知识产权等权益的，均与乙方无关，由甲方承担全部责任；如给乙方造成损失的，甲方还应承担相应的赔偿责任。</p>
        <p class="text-p">五、反商业贿赂</p>
        <p class="text-p">5.1甲方不得直接或间接向乙方及其关联企业之员工、顾问提供任何形式的不正当利益，如有，则甲方同意乙方有权立即解除本协议，并由甲方按直接或间接提供的任何形式的不正当利益的总金额向乙方支付违约金。</p>
        <p class="text-p">5.2如甲方违反上述条款对乙方正常经营造成损失的，甲方应赔偿乙方全部损失。如因甲方的该等行为导致乙方被国家行政部门、知识产权权利人或任何第三方处罚或者索赔、提起仲裁或诉讼，则甲方除应承担上述赔偿外，还应赔偿乙方此等全部损失，由甲方解决此等事宜并使乙方免责。</p>
        <p class="text-p">六、免责条款</p>
        <p class="text-p">6.1拾贝网以“现状”、“有缺陷”和“当前功能”的状态提供本协议的平台服务事项及功能。拾贝网不保证甲方在操作上不会中断或没有错误，不保证其会纠正甲方的所有缺陷，亦不保证甲方能满足其用户的所有要求。拾贝网将在现有技术的基础上尽最大努力提供相应的安全措施以保障甲方的安全和正常运行。但由于可能存在的计算机病毒、网络通讯故障、系统维护等方面的因素以及可能发生的不可抗力事件或意外事件，拾贝网在此明确声明对甲方不作任何明示或暗示的保证，包括但不限于对软件的可适用性、没有错误或疏漏、持续性、准确性、可靠性、适用于某一特定用途或满足用户的需求、使用效果。除法律另有明确规定外，拾贝网不对因下述任一情况而导致的损害赔偿承担责任，包括但不限于利润、商誉、使用、数据等方面的损失或其他无形损失的损害赔偿（无论拾贝网是否已被告知该等损害赔偿的可能性）：</p>
        <p class="text-p">6.1.1受到计算机病毒、木马或其他恶意程序、黑客攻击的破坏；</p>
        <p class="text-p">6.1.2可能存在的网络通讯故障、系统停机维护；</p>
        <p class="text-p">6.1.3甲方或其用户操作不当；</p>
        <p class="text-p">6.1.4使用或未能使用软件；</p>
        <p class="text-p">6.1.5其他非拾贝网过错、拾贝网无法控制或合理预见的情形。</p>
        <p class="text-p">6.2通过甲方查询、查看的各项数据仅为通过计算机对拾贝网和/或其关联公司相关信息的客观统计数据以及基于算法模型计算得出的预测数据，拾贝网不保证甲方中数据内容的准确性、有效性、及时性、真实性，拾贝网不对用户基于数据查询、查看做出的任何行为的结果承担责任。</p>
        <p class="text-p">6.3除有生效司法裁判外，拾贝网不对源于、基于或因本协议或用户使用甲方服务而导致的数据的丢失、泄露和/或任何损害赔偿负责，包括但不限于非直接的、间接的、特殊的、附带性的或惩罚性的损害赔偿或其他任何形式的损害赔偿，即使拾贝网已被告知此等损害赔偿的可能性。</p>
        <p class="text-p">6.4尽管本协议中可能含有相悖的约定，但拾贝网对甲方承担的全部责任，无论因何种原因或何种行为方式，始终不超过甲方在对应的订购期间内已支付给拾贝网的软件服务费（如有）。</p>
        <p class="text-p">七、协议终止</p>
        <p class="text-p">本协议在符合以下任一情形时终止：</p>
        <p class="text-p">7.1本协议有效期届满时；</p>
        <p class="text-p">7.2如甲方与拾贝网签订的《商家入驻拾贝网合作协议》因任何原因（包括但不限于甲方因违规操作被拾贝网清退）终止，本协议同时终止；</p>
        <p class="text-p">7.3乙方有权以提前30天书面通知的方式终止本协议而无须承担违约责任。</p>
        <p class="text-p">八、违约责任</p>
        <p class="text-p">任何一方不履行或履行不符合本合同约定的，应承担违约责任，并赔偿守约方因此造成的所有损失。</p>
        <p class="text-p">九、通知和送达</p>
        <p class="text-p">9.1拾贝网对于甲方所有的通知均可通过页面公告、电子邮件、站内信、手机短信或常规的信件传送等方式进行；该等通知于发送之日视为已送达收件人。</p>
        <p class="text-p">9.2甲方对于拾贝网的通知应当通过拾贝网在软件商品页面公布的通信地址、传真号码、电子邮件等联系方式进行送达。</p>
        <p class="text-p">十、适用法律与争议解决</p>
        <p class="text-p">10.1本协议之订立、效力、解释、变更、执行、终止与争议解决均适用中华人民共和国大陆地区法律。</p>
        <p class="text-p">10.2因本协议引起的或与本协议有关的争议，应由双方友好协商解决，协商不成的，任何一方有权将争议提交至乙方所在地有管辖权的人民法院进行诉讼。</p>
        <p class="text-p">10.3因本协议而发生任何争议或任何争议正在进行诉讼时，除争议的事项外，本协议双方仍应继续行使各自在本协议项下的其他权利并履行各自在本协议合同项下的其他义务。</p>
        <p class="text-p">十一、合作期限</p>
        <p class="text-p">合作期限为 1 年，自甲方入驻之日起开始起算。</p>
        <p class="text-p">十二、其他</p>
        <p class="text-p">12.1未经乙方事先书面同意，甲方不得将其在本协议及其项下的权利义务转让给任何第三方。</p>
        <p class="text-p">12.2未尽事宜及发生纠纷的，由双方协商解决，协商不成的向乙方所在地法院起诉解决。</p>
        <p class="text-p">12.3乙方在拾贝网公布的用户注册协议、操作指南、法律声明等文件，系本协议的重要组成部分，与本协议具有同等法律效力。</p>
        <p class="text-p">12.4本协议自甲方入驻之日起开始生效。</p>
        <p class="text-p">12.5 本协议的更新调整最终解释权归本平台所有。</p>
        <!-- <p class="service">如未能解决您的问题，请<a href="">联系客服</a></p> -->
        </div>
      </div>
      <div class="footer">
        <p class="sebe">© 2018 拾贝  All rights reserved  <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010402003197">浙公网安备 33010402003197号</a></p>
        <p class="sebename">杭州拾贝知识产权服务有限公司</p>
      </div>

    </div>
    <!-- <sebe-footer></sebe-footer> -->
  </div>
</template>

<script>
  import Vue from 'vue'
  import $ from 'jquery'
  import qs from 'qs'
  import sebeHeader from 'components/HeaderSm.vue'
  import sebeFooter from 'components/FooterSm.vue'
  const userUrl = CONFIG.userUrl;
  const getOrderUrl = './cartWeb/orderDetail.htm'; //获取订单信息接口
  //获取url中的查询关键字
  function getQueryString(name) {
    var ret = '';
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var s = decodeURIComponent(location.search);
    var r = s.slice(1).match(reg);
    if (r != null) {
      ret = decodeURIComponent(r[2]);
    }
    return ret;
  }
  export default {
    name: 'app',
    data () {
      return {
        info:{},
        orderNum:'',
        payData: {},
        ids:'',
        category:'',
        productOrderData: []
      }
    },
    components: {
      sebeHeader,
      sebeFooter
    },
    mounted () {
      var self = this;
      this.info = {
        name: getQueryString('name'),
        phone: getQueryString('phone'),
        order_sn: getQueryString('order_sn'),
        amount: getQueryString('amount')
      };
      this.orderNum = this.info.order_sn;
      //this.getOrderInfo();
    },
    methods: {
      getOrderInfo(){

      }
    }
  }
</script>

<style scoped lang="scss">
.serviceAgreement h1{font-size: 26px;font-weight: 100;margin-bottom: 20px}
.serviceAgreement{background: #f5f5f5;text-align: center;}
.serviceAgreement img{position: absolute;top: 56px;left: 70px}
.brm{border-bottom: 1px solid #eee}
.serviceAgreementList{width: 1170px;background: #ffffff;margin: auto;position: relative;padding-top: 152px;padding-bottom: 72px}
.serviceAgreementList ul{width: 826px;margin: auto;}
.serviceAgreementList ul li{width: 826px;}
.serviceAgreementList ul li p{width: 826px;text-align: left;display: -webkit-inline-box;font-size: 14px;color: #333;line-height: 20px}
.pro{font-weight: 600;margin-bottom: 12px;margin-top: 14px}
.ans{margin-bottom: 23px}
.service{text-align: left;margin-left: 172px;font-size: 14px;margin-top: 25px}
.service a{color: #3db1fa}
.footer{padding: 30px 0}
.footer p,.footer p a{font-size: 14px;color: #666666}
.sebename{margin-top: 7px}

.serviceAgreementList{
  .content-p{
    width: 1000px;margin: 0 auto; padding:0 10px;
    .info{
      text-align: left;line-height: 30px;font-size:14px;padding-bottom: 10px;
      p{word-break: break-all;}
    }
  }
  .time{text-align: right;font-size:14px;line-height: 40px;}
  .text-p{line-height: 26px;font-size:14px; text-align: left;text-indent:26px; }
}
</style>
