<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5"><e-menu></e-menu></el-col>
      <el-col :span="19">
        <m-life></m-life>
      </el-col>
    </el-row>
    <el-row :span="24">
      <Artistic></Artistic>
    </el-row>
  </div>
</template>

<script>
import EMenu from '@/components/index/menu'
import MLife from '@/components/index/life'
import Artistic from '@/components/index/artistic'
export default {
  components: {
    EMenu,
    MLife,
    Artistic
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/index/index.scss";
</style>
