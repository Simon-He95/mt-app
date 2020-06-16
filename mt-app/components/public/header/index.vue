<template>
  <div class="m-header">
    <el-row>
      <el-col>
        <top-bar></top-bar>
      </el-col>
    </el-row>
    <el-row>
      <search-bar></search-bar>
    </el-row>
  </div>
</template>

<script>
  import topBar from "./topBar";
  import searchBar from "./searchBar";
    export default {
        name: "index",
      components: {
        topBar,
        searchBar
      }
    }
</script>

<style lang="scss" scoped>

</style>
