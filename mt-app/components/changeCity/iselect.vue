<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select
      v-model="pvalue"
      placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <el-select
      v-model="cvalue"
      :disabled="!city.length"
      placeholder="城市">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>

    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
  import _ from 'lodash';
  export default {
    data(){
      return {
        province:[],
        pvalue:'',
        city:[],
        cvalue:'',
        input:'',
        cities: []
      }
    },
    watch:{
      pvalue:async function(newPvalue){
        let self=this;
        let {status,data:{city}}=await self.$axios.get(`http://cp-tools.cn/geo/province/${newPvalue}`)
        if(status===200){
          self.city=city.map(item=>{
            return {
              value:item.id,
              label:item.name
            }
          })
          self.cvalue=''
        }
      }
    },
    mounted:async function(){
      let self=this;
      let {status, data:{province}}=await self.$axios.get('http://cp-tools.cn/geo/province')
      if(status===200){
        self.province=province.map(item=>{
          return {
            value:item.id,
            label:item.name
          }
        })
      }
    },
    methods:{
      querySearchAsync: _.debounce(async function(query, cb) {  //设置延时
        let that = this
        if (this.cities.length) {
          cb(that.cities.filter(item => item.value.indexOf(query) > -1))
        }else {
          console.log("远程搜索中。。。。")
          let {status, data: {city}} = await that.$axios.get('http://cp-tools.cn/geo/city')
          console.log(status, city)
          if (status === 200) {
            that.cities = city.map(item => {
              return {
                value: item.name
              }
            })
            cb(that.cities.filter(item => item.value.indexOf(query) > -1))
          }else {
            cb([])
          }
        }
      },200),
      handleSelect:function(item){
        console.log(item.value);
        this.$router.push({path:'/location',params:{city:item.value}})
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/changecity/iselect.scss";
</style>
