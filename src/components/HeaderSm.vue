<template>
  <header>
    <!-- 吊顶 -->
    <top-bar :cartNum="cartNum" :name='userName'></top-bar>

    <div class="header-sm commWidth">
      <h1 class="logo fl">
        <a :href="indexUrl" title="拾贝"><img src="~assets/img/header_footer/logo-sm.png" alt="拾贝"/></a>
      </h1>
      <div class="fl name" v-if="title">
        <i></i><span>{{title}}</span>
      </div>
      <!-- <div class="fr goback"><a :href="indexUrl">返回首页</a></div> -->
    </div>
  </header>
</template>

<script>
import TopBar from 'components/headerFComponents/TopBar.vue'
const indexUrl = CONFIG.indexUrl;
export default {
  props:['title', 'cartNum','userName'],
  components: {
    TopBar
  },
  data() {
    return {
    	indexUrl: indexUrl
    }
  },
  methods: {
  },
  mounted(){
  }
}
</script>

<style lang="scss">
header{
	background-color: #fff;text-align: left;
	.header-sm{
		height: 122px;
		.logo{margin:0;padding:0;margin-top: 24px;}
	  .name{
	  	padding-left:15px;height: 122px;line-height: 122px;position: relative;
	  	i{position: absolute;left: 0;top:30px;height: 62px;background-color: #F1F1F1;width: 1px;display: inline-block;}
	  	span{display: inline-block;font-size: 24px;color: #333;}
	  }
	  .goback{
	  	margin-right: 33px;height: 75px;line-height: 75px;font-size: 14px;
	  	a{color: #666}
	  }
	}
}
</style>
