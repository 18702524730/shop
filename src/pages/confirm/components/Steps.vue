<template>
	<el-steps :space="100" :active="1" :align-center="true" class="my-el-steps">
		<el-step title="1.下单"></el-step>
		<el-step title="2.填写核对订单信息"></el-step>
		<el-step title="3.成功提交订单"></el-step>
	</el-steps>
</template>

<script>
const spUrl = CONFIG.spUrl;
const czUrl = CONFIG.czUrl;
export default {
	data() {
		return {
		}
	},
	mounted(){
	},
	methods: {
	},
	watch:{
	}
}
</script>

<style lang="scss">
	.my-el-steps{
		padding-top: 30px;
		.el-step__icon-inner{font-size: 13px;font-weight: normal;}
		.el-step__icon.is-text{width: 34px;height: 34px;border-radius: 34px;border: 0;line-height: 34px;}
		.el-step.is-horizontal{
			.el-step__head{
				width: 120px;
				.el-step__line{height: 3px;top: 15px;left:0}
			}
			.el-step__head.is-finish {
		    color: #FFF;
		    border-color: #D2EAFF;
		    .el-step__icon.is-text{background-color: #D2EAFF;}
		    .el-step__line{background-color:#D2EAFF;}
		  }
		  .el-step__head.is-process {
		    color: #FFF;
		    border-color: #78CAFD;
		    .el-step__icon.is-text{background-color: #78CAFD;}
		    .el-step__line{background-color:#78CAFD;}
		  }
		  .el-step__head.is-wait {
		    color: #FFF;
		    border-color: #dddddd;
		    .el-step__icon.is-text{background-color: #dddddd;}
		    .el-step__line{background-color:#dddddd;right:0;display: block;}
		  }
		  .el-step__title{font-size: 12px;}
			.el-step__title.is-finish{color:#D2EAFF;}
		  .el-step__title.is-process{color:#78CAFD;}
		  .el-step__title.is-wait{color:#dddddd;}
		}
	}
</style>
