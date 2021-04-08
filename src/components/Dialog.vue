<template>
	<div class="sebe-dialog">
		<!-- 吊顶 -->
		<nav class="topBar">
			
	</div>
</template>

<script>
export default {
	props:['username', 'title'],
	data() {
		return {
			username:'',
			root: 'http://www.ipsebe.com/',
				isLeave: true,
				codeShow:false,
		}
	},
	methods: {
		jumpRegister(){},
		jumpLogin(){},
		showCode(){
			this.codeShow = true;
		},
		hodeCode(){
			this.codeShow = false;
		},
		logout(){
			location.href = this.root+ "iprp_portal/api/logout?access_token=" + this.$cookie.get('user_token')
		}
	}
}
</script>

<style>
.sebe-dialog{
	width:650px;min-height:300px;padding:20px 30px 35px;
	position: relative;
	font-size:14px;
	border-radius:4px;
	h4{font-size:16px;height:35px;line-height:35px;}
	.close{position: absolute;right: 30px;top: 27px;}
}
</style>
