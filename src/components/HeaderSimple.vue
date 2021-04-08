<template>
  <header class="header-sm-wrap">
    <div class="header-sm commWidth">
      <h1 class="logo fl">
        <a :href="indexUrl" title="拾贝"><img src="~assets/img/header_footer/logo-sm.png" alt="拾贝"/></a>
      </h1>
      <div class="fr goback"><a :href="indexUrl">返回首页</a></div>
    </div>
  </header>
</template>

<script>
const indexUrl = CONFIG.indexUrl;
export default {
  props:[],
  data() {
    return {
    	indexUrl: indexUrl
    }
  },
  methods: {
  }
}
</script>

<style>
.header-sm-wrap{border-bottom: 0;background-color: #fff;text-align: left;}
  .header-sm{height: 75px;}
  .header-sm .logo{margin:0;padding:0;}
  .header-sm .goback{margin-right: 33px;height: 75px;line-height: 75px;font-size: 14px;}
  .header-sm .goback a{color: #666}
</style>
