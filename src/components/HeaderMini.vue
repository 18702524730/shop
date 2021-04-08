<template>
  <header>
    <div class="header_mini commWidth">
      <a :href="indexUrl" title="拾贝" class="logo fl"><img src="~assets/img/header_footer/logo_mini.png" alt="拾贝"/></a>
    </div>
  </header>
</template>

<script>
const indexUrl = CONFIG.indexUrl;
export default {
  props:['title', 'cartNum','userName'],
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
  .header_mini {
    height: 70px; line-height: 70px;
    .logo{ 
      margin-top: 20px; display: inline-block; width: 122px; height: 30px; position: relative;
      img {width: 100%; height: 100%; position: absolute;}
    }
  }
}
</style>
