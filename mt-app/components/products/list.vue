<template>
  <div class="m-products-list">
    <dl>
      <dd
        v-for="item in nav"
        :key="item.name"
        :class="[item.name,item.active?'s-nav-active':'',Filter]"
        @click="navSelect"
      >{{ item.txt }}</dd>
    </dl>
    <ul>
      <Item
        v-for="(item,idx) in list"
        :key="idx"
        :meta="item"/>
    </ul>
  </div>
</template>

<script>
import Item from './product.vue'
import Vue from 'vue'
export default {
  components: {
    Item
  },
  props: {
    list: {
      type:Array,
      default(){
        return []
      }
    }
  },
  computed: {
    Filter() {
      if(this.filter === ''){
        return 'default'
      }else if(this.filter === true) {
        return 'highTolow'
      }else {
        return 'lowTohigh'
      }
    }
  },
  data() {
    return {
      filter: '',
      nav: [
        {
          name: 's-default',
          txt: '智能排序',
          active: true
        }, {
          name: 's-price',
          txt: '价格最低',
          active: false
        }, {
          name: 's-visit',
          txt: '人气最高',
          active: false
        }, {
          name: 's-comment',
          txt: '评价最高',
          active: false
        }
      ]
    }
  },
  async asyncData(ctx) {
    let { data } = await ctx.$axios.get('searchList')
    return { items: data.list }
  },
  methods: {
    navSelect: function (e) {
      this.nav.filter(item => item.name === e.currentTarget.className.split(' ')[0]? item.active = true : item.active = false)
      console.log(e.currentTarget.className.split(' ')[0])
      if (e.currentTarget.className.split(' ')[0] === 's-price') {
        if (this.filter) {
          this.list.sort((a,b) => a.price - b.price )
        }else {
          this.list.sort((a,b) => b.price - a.price )
        }
        this.filter = !this.filter
      }
    },
  }
}
</script>

<style lang="scss">
  .highTolow::before{
    border-bottom-color: #2393ee !important;
  }
  .lowTohigh::after {
    border-top-color: #2393ee !important;
  }
</style>
