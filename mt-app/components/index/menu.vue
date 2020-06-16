<template>
    <div class="m-menu">
      <dl class="nav" @mouseleave="leave">
        <dt>全部分类</dt>
        <dd v-for="(item, index) in menuList" :key="index" @mouseenter="enter">
          <i :class="item.type"></i>{{item.name}}<span class="arrow"></span>
        </dd>
      </dl>
      <div class="detail" v-if="kind" @mouseenter="sover" @mouseleave="sout">
        <div v-for="(item, index) in currentDetail" :key="index">
          <h4>{{item.title}}</h4>
          <span v-for="(content, idx) in item.child" :key="idx">
            {{content}}
          </span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "mMenu",
      data() {
          return {
            kind: '',
          }
      },
      computed: {
          menuList() {
            return this.$store.state.home.menu.menu
          },
          currentDetail () {
            return this.menuList.filter((item) => item.type === this.kind)[0].child
          }
      },
      methods: {
        leave () {
          let that = this;
          that._timer = setTimeout(() => {
            that.kind = ''
          },150)
        },
        enter (e) {
          this.kind = e.target.querySelector('i').className
        },
        sover () {
          clearTimeout(this._timer)
        },
        sout () {
          this.kind = ''
        }
      }
    }
</script>

<style scoped>

</style>
