<template>
  <div class="page-order">
    <el-row type="flex" justify="space-between">
      <el-col :span="4" class="navbar">
        <h3>我的美团</h3>
        <dl>
          <dt>我的订单</dt>
          <dd>全部订单<i class="el-icon-arrow-right"></i></dd>
          <dd>待付款<i class="el-icon-arrow-right"></i></dd>
          <dd>待使用<i class="el-icon-arrow-right"></i></dd>
        </dl>
        <dl>
          <dt>我的收藏</dt>
          <dd>收藏的商家<i class="el-icon-arrow-right"></i></dd>
          <dd>收藏的团购<i class="el-icon-arrow-right"></i></dd>
        </dl>
        <dl>
          <dt>抵用券</dt>
          <dd>可用券<i class="el-icon-arrow-right"></i></dd>
          <dd>失效券<i class="el-icon-arrow-right"></i></dd>
        </dl>
        <dl>
          <dt>个人信息</dt>
          <dd>账户设置<i class="el-icon-arrow-right"></i></dd>
        </dl>
      </el-col>
      <el-col :span="19" class="table">
        <el-tabs v-model="activeName"
                 @tab-click="handleClick" ref="tab">
          <el-tab-pane v-for="(item, idx) in tabList"
                       :label="item.label"
                       :name="item.name"
                       :key="idx">
            <List :cur="cur"/>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import List from '@/components/order/list.vue'

  export default {
    name: "order",
    components: {
      List
    },
    data() {
      return {
        activeName: 'all',
        cur: [],
        currentPage: 1,
        tabList: [
          {
            label:'全部订单',
            name: 'all'
          },
          {
            label:'待付款',
            name: 'unpay'
          },
          {
            label:'待使用',
            name: 'unuse'
          },
          {
            label:'待评价',
            name: 'unreplay'
          }
        ]
      }
    },
    watch: {
      activeName (newVal) {
        this.cur = this.list.filter(item => {
          if (newVal === 'unpay') {
            return item.status === 0
          } else if (newVal === 'all') {
            return true
          } else {
            return false
          }
        })
      }
    },
    methods: {
      handleClick() {
        this.activeName = this.$refs.tab.currentName
      },
    },
    async asyncData(ctx) {
      // 获取订单
      let {status, data: {code, list}} = await ctx.$axios.post('/order/getOrders')
      if (status === 200 && code === 0) {
        return {
          list: list.map(item => {
            return {
              img: item.imgs.length ? item.imgs[0].url : '/login.png',
              name: item.name,
              count: item.count || 1,
              total: item.total,
              status: item.status,
              statusText: item.status === 0 ? '待付款' : '已付款'
            }
          }),
          cur: list.map(item => {
            return {
              img: item.imgs.length ? item.imgs[0].url : '/login.png',
              name: item.name,
              count: item.count || 1,
              total: item.total,
              status: item.status,
              statusText: item.status === 0 ? '待付款' : '已付款'
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/order/index.scss";
  .block{
    text-align: right;
  }
</style>
