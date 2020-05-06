<template>
  <el-container>
    <el-aside width="200px">
      <Menu></Menu>
    </el-aside>
    <el-main>
      <MainNav></MainNav>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  import Menu from '../../components/Menu'
  import MainNav from "../../components/MainNav";
  export default {
    name: "Admin",
    components: {
      Menu,MainNav
    }
  }
</script>

<style scoped lang="less">
  .el-container {
    .el-aside {
      overflow: hidden;
      height: 100vh;
      background-color: #545c64;
    }
    .el-main {
      position: relative;
      padding-top: 60px;
      height: 100vh;
    }
  }
</style>