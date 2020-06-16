<template>
  <div class="m-nav">
    <ul class="nav">
      <li class="list">
        <nuxt-link to="/my">我的美团</nuxt-link>
        <dl>
          <dd><nuxt-link to="/order">我的订单</nuxt-link></dd>
          <dd><nuxt-link to="/collect">收藏</nuxt-link></dd>
          <dd><nuxt-link to="/voucher">抵用券</nuxt-link></dd>
          <dd><nuxt-link to="/set">账户设置</nuxt-link></dd>
        </dl>
      </li>
      <li>
        <nuxt-link to="/app">手机App</nuxt-link>
      </li>
      <li class="list bd">
        <nuxt-link to="/center">商家中心</nuxt-link>
        <dl>
          <dd><nuxt-link to="/userCenter">登录商家中心</nuxt-link></dd>
          <dd><nuxt-link to="/corporate">我想合作</nuxt-link></dd>
          <dd><nuxt-link to="/open">免费手机开店</nuxt-link></dd>
          <dd><nuxt-link to="/invoice">商家申请开票</nuxt-link></dd>
        </dl>
      </li>
      <li class="list site">
        <nuxt-link to="/site">网站导航</nuxt-link>
        <div class="subContainer">
          <dl class="hotel">
            <dt>酒店旅游</dt>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
          </dl>
          <dl class="food">
            <dt>吃美食</dt>
            <dd>烤鱼</dd>
            <dd>特色小吃</dd>
            <dd>烤鱼</dd>
            <dd>特色小吃</dd>
            <dd>烧烤</dd>
            <dd>烤鱼</dd>
            <dd>特色小吃</dd>
            <dd>烧烤</dd>
          </dl>
          <dl class="movie">
            <dt>看电影</dt>
            <dd>热映电影</dd>
            <dd>热映电影</dd>
            <dd>热映电影</dd>
            <dd>热映电影</dd>
            <dd>热映电影</dd>
            <dd>热映电影</dd>
            <dd>热映电影</dd>
          </dl>
          <dl class="app">
            <dt>手机应用</dt>
            <dd>
              <a href="#">
                <img src="../../../assets/img/logo.png" alt="">
              </a>
              <a href="#">
                <img src="../../../assets/img/logo.png" alt="">
              </a>
              <a href="#">
                <img src="../../../assets/img/logo.png" alt="">
              </a>
              <a href="#">
                <img src="../../../assets/img/logo.png" alt="">
              </a>
              <a href="#">
                <img src="../../../assets/img/logo.png" alt="">
              </a>
            </dd>
          </dl>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "MyNav"
    }
</script>

<style lang="scss" scoped>

</style>
