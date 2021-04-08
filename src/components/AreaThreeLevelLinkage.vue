<template>
	<div>
        <select v-model="province" @change="chgProvince(province);" placeholder="请选择所在省份" class="selt">
            <option v-for="item,$index in provinces" :value="item">{{ item.name }}</option>
        </select>
        <select v-model="city" @change="chgCity(city);" placeholder="请选择所在城市" class="selt">
            <option v-for="item,$index in citys" :value="item">{{ item.name }}</option>
        </select>
        <select v-model="county" @change="chgCounty(county)" placeholder="请选择所在区县" class="selt">
            <option v-for="item,$index in countys" :value="item">{{ item.name }}</option>
        </select>
    </div>
</template>

<script>

    export default {
	name: 'AreaThreeLevelLinkage',
 	props: [],
 	data() {
 		return {
            province:{
                area_id:null,
                name:''
            },
            city:{
                area_id:null,
                name:''
            },
            county:{
                area_id:null,
                name:''
            },
 			provinces:[],
            citys:[],
            countys:[],
            //用户初始化地址
            area_info:'',
            province_id:null,
            city_id:null,
            area_id:null,
            pro:'',
            ct:'',
            cty:'',
 		}
 	},
 	mounted(){
        this.getProvinceData();
    },
 	methods: {
        //获取省数据
        getProvinceData(){
            let para = {'pId':0}
            getLocation(qs.stringify(para)).then((res) => {  
                var elements = res.elements;
                this.provinces = elements.map(function(item){
                    return {
                        area_id:item.area_id,
                        name:item.name
                    }
                })
            }); 
        },
        chgPro(provinceObj){
            this.countys.length = 0;
            let para = {'pId':provinceObj.area_id}
            getLocation(qs.stringify(para)).then((res) => { 
                var elements = res.elements;
                this.citys = elements.map(function(item){
                    return {
                        area_id:item.area_id,
                        name:item.name
                    }
                })
            });
        },
        chgProvince(provinceObj){
            this.countys.length = 0;
            let para = {'pId':provinceObj.area_id}
            getLocation(qs.stringify(para)).then((res) => { 
                var elements = res.elements;
                this.citys = elements.map(function(item){
                    return {
                        area_id:item.area_id,
                        name:item.name
                    }
                })
            });
            this.city.name = '';
            this.county.name = '';

            //向父组件传播事件,数据
            this.$emit('provinceChg', provinceObj, this.city.name, this.county.name);
        },
        chgCounty(countyObj){
            //向父组件传播事件,数据
            this.$emit('countyChg', countyObj);
        },
        chgCt(cityObj){
            let para = {'pId':cityObj.area_id}
            getLocation(qs.stringify(para)).then((res) => { 
                var elements = res.elements;
                this.countys = elements.map(function(item){
                    return {
                        area_id:item.area_id,
                        name:item.name
                    }
                })
            });
        },
        chgCity(cityObj){
            let para = {'pId':cityObj.area_id}
            getLocation(qs.stringify(para)).then((res) => { 
                var elements = res.elements;
                this.countys = elements.map(function(item){
                    return {
                        area_id:item.area_id,
                        name:item.name
                    }
                })
            });
            //向父组件传播事件,数据
            this.$emit('cityChg', cityObj);
        },
        chgCounty(countyObj){
            //向父组件传播事件,数据
            this.$emit('countyChg', countyObj);
        },

 	},
}
</script>

<style scoped>
	ul,li{
 		list-style-type: none;
	}
	.detail{
		padding:10px 0px;
		display:block;
		width:438px;
	}
    .selt{
        border-radius: 4px;
        border: 1px solid #bfcbd9;
        box-sizing: border-box;
        color: #1f2d3d;
        display: inline-block;
        font-size: inherit;
        height: 36px;
        line-height: 1;
        outline: 0;
        padding: 3px 10px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 12%;
    }
</style>
