<template>
	<div class="search_heade fr">
		<div class="mb5">
			<span class="mr30" :class="{'search_type':type==1}" @click="type=1">搜服务</span>
			<!-- <span class="mr30" :class="{'search_type':type==2}" @click="type=2">买商标</span> -->
			<span :class="{'search_type':type==3}" @click="type=3">找店铺</span>
		</div>
		<div class="search_txt">
			<i class="el-icon-search"></i>
			<el-input type="text" v-model="content">
				<el-button slot="append" @click="toSearch">搜索</el-button>
			</el-input>
		</div>
	</div>
</template>

<script>
const spUrl = CONFIG.spUrl;
const cartUrl = CONFIG.cartUrl;
export default {
	data() {
		return {
			type:1,
			content:''
		}
	},
	mounted(){
	},
	methods: {
		toSearch(){
			// window.open("./serviceList.html#/tmList?keyword="+encodeURI(encodeURI(this.content))+"&type="+this.type);
			// 搜服务
			if (this.type == 1) {
					window.open(cartUrl+'/shop/pages/search.html#/serviceList?keyword='+encodeURI(encodeURI(this.content)))
			}
			// 买啥航标
			else if (this.type == 2) {
					window.open(cartUrl+'/shop/pages/search.html#/tmList?keyword='+encodeURI(encodeURI(this.content)))
			}
			// 搜店铺
			else if (this.type == 3) {
					window.open(cartUrl+'/shop/pages/search.html#/storeList?keyword='+encodeURI(encodeURI(this.content)))
			}
		}
	},
	watch:{
	}
}
</script>

<style lang="scss">
	.search_heade{
		width:700px;margin-top:-117px;
		div{
			>span{font-size:13px;display:inline-block;line-height:18px;cursor: pointer;}
			.search_type{color:#3DB1FA;}
		}
		.search_txt{position: relative;
			i{font-size:20px;position: absolute;top:10px;left:10px;color:#ddd;z-index:10;}
			.el-input__inner{padding-left:40px;}
		}
		.el-input-group__append{background:linear-gradient(135deg,rgba(16,174,255,1),rgba(77,160,255,1));color:#fff;font-size:16px;width:120px;height:40px;border-radius:0px 2px 2px 0px;border:1px solid #4DA0FF;text-align:center;cursor: pointer;background-color:rgba(77,160,255,1);}
	}
</style>
