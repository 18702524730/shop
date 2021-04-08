export default {
  name: '2016/11/11common.js',
  //获取url中的查询关键字
	getQueryString(name) {
		var ret = '';
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = location.search.slice(1).match(reg);
		if (r != null) {
			ret = decodeURIComponent(r[2]);
		}
		return ret;
	},
	parseUnparam (param, decode){
		var vars = {}, hash, i,
				urlParams = param.indexOf('?') > -1 ? param.split('?')[1] : param;
		var hashes = urlParams.split('&');
		for(i = 0; i < hashes.length; i++){
				hash = hashes[i].split('=');
				vars[hash[0]] = decodeURIComponent(hash[1]).replace(/\+/g, ' ');
		}
		return vars;
	},
}




































