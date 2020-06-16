<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar" style="z-index: 0">
      <el-col :span="3" class="left">
        <img
          src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
          alt="美团">
      </el-col>
      <el-col :span="14" class="center">
        <div class="wrapper">
          <el-input
            v-model="search"
            placeholder="搜素商家和地点"
            @focus="isFocus = true"
            @blur="inputBlur"
            @input="inputAskData"
          ></el-input>
          <button class="el-button el-button--primary">
            <i class="el-icon-search"></i>
          </button>
          <dl class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item, index) in hotList" :key="index">
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{item.name}}</a>
            </dd>
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <dd v-for="(item, index) in searchList" :key="index">
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{item.name}}</a>
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <a :href="'/products?keyword='+encodeURIComponent(item.name)" v-for="(item, index) in hotList" :key="index">{{item.name}}</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="4" class="right">
        <ul class="security">
          <li><i class="refund"></i><p class="txt">随时退</p></li>
          <li><i class="single"></i><p class="txt">不满意免单</p></li>
          <li><i class="overdue"></i><p class="txt">过期退</p></li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import _ from  'lodash'
    export default {
        name: "search",
      data() {
          return {
            isFocus: false,
            search: '',
            searchList: []
          }
      },
      computed: {
          isHotPlace () {
            return this.isFocus && !this.search
          },
          isSearchList () {
              return this.search && this.isFocus
          },
        hotList(){
            return this.$store.state.home.hotPlace.result.slice(0,5)
        }
      },
      methods: {
        inputBlur () {
          let that = this
          setTimeout(() => {
            that.isFocus = false
          },200)
        },
        inputAskData: _.debounce(async function() {
          let that = this
          let city = this.$store.state.geo.position.city.replace('市', '') // 去除城市最后的市
          this.searchList = []
          let {status, data:{top}} = await this.$axios.get('/search/top', {
            params: {
              input: that.search,
              city
            }
          })
          this.searchList = top.slice(0,10)
        },300)
      }
    }
</script>

<style scoped>
  .m-header .search-panel .center .wrapper .el-button{
    height: 42px;
  }
</style>
