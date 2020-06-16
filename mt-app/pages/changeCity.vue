<template>
    <div class="page-changeCity">
      <el-row>
        <el-col :span="24">
          <iSelect ></iSelect>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <hot></hot>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <category ></category>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import iSelect from "../components/changeCity/iselect";
  import hot from "../components/changeCity/hot"
  import category from "../components/changeCity/category";
    export default {
        name: "changeCity",
      components:{
        iSelect,
        hot,
        category
      },
      data() {
        return {
          cities: []
        }
      },
      async mounted() {

      },
      methods: {

      }
    }
</script>

<style scoped>

</style>
