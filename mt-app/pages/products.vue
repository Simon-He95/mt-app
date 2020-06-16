<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword"/>
      <categroy
        :types="types"
        :areas="areas"/>
      <list :list="list"/>
    </el-col>
    <el-col :span="5">
      <amap
        v-if="point.length"
        :width="230"
        :height="290"
        :point="point"
        :top="top"
      />
    </el-col>
  </el-row>

</template>

<script>
  import Crumbs from '@/components/products/crumbs.vue'
  import Categroy from '@/components/products/category.vue'
  import List from '@/components/products/list.vue'
  import Amap from '@/components/public/map.vue'
  export default {
    components:{
      Crumbs,
      Categroy,
      List,
      Amap
    },
    data(){
      return {
        list:[],
        types:[],
        areas:[],
        keyword:'',
        point:[],
        top: 0
      }
    },
    async asyncData(ctx){
      let keyword = ctx.query.keyword
      let city = ctx.store.state.geo.position.city
      let {status,data:{count,pois}} = await ctx.$axios.get('/search/resultsByKeywords',{
        params:{
          keyword,
          city
        }
      })
      let {status:status2,data:{areas,types}} = await ctx.$axios.get('/category/crumbs',{
        params:{
          city
        }
      })
      if(status===200&&count>0&&status2===200){
        return {
          list: pois.filter(item=>item.photos.length).map(item=>{
            return {
              type: item.type,
              img: item.photos[0].url,
              name: item.name,
              comment: Math.floor(Math.random()*10000),
              rate: Number(item.biz_ext.rating),
              price: Number(item.biz_ext.cost),
              scene: item.tag,
              tel: item.tel,
              status: '可订明日',
              location: item.location,
              module: item.type.split(';')[0]
            }
          }),
          keyword,
          areas: areas.filter(item=>item.type!=='').slice(0,5),
          types: types.filter(item=>item.type!=='').slice(0,5),
          point: (pois.find(item=>item.location).location||'').split(',')
        }
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll, true)
    },
    methods: {
      handleScroll () {
        var top = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageXOffset)
        if(top >= 230) {
          this.top = top-230
        }else {
          this.top = 0
        }
      }
    },
    watch: {
      Height: (newVal,oldVal) => {
      }
    },
    computed: {
      Height() {
        let length = this.list.length
        let arr = []
        for(var i=1; i <= length; i++) {
          arr.push(170.5*i)
        }
        arr.forEach((item,index) => {
          if(item <= this.top + 100) {
            this.point = this.list[index].location.split(',')
          }
        })
        return arr
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/products/index.scss";
</style>
