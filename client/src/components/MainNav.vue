<template>
  <div class="MainNav">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
          v-for="item in getRouters"
          :to="item.path">
        {{item.meta.cnName || item.name}}
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        {{$route.meta.cnName|| $route.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="photo">
      <el-button type="danger" plain @click="handleLogOut" size="mini">退出登录</el-button>
    </div>
  </div>
</template>

<script>
  import {loginOut} from "../api/index"
  export default {
    name: "MainNav",
    data(){
      return {
        ifLogin: true
      }
    },
    computed: {
      getRouters(){
        let arr = [...this.$route.matched];
        arr.pop();
        return arr;
      }
    },
    methods: {
      handleLogOut(){
        loginOut().then(()=>{
          setTimeout(()=>{
            window.location.reload();
          },1500);
        }).catch(()=>{
          this.$message({
            message: "退出失败",
            type: "error",
            duration: 2000
          });
        });
      }
    }
  }
</script>

<style scoped lang="less">
  .MainNav {
    box-sizing: border-box;
    padding: 0 20px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: #c8f0ff;
    .el-breadcrumb {
      line-height: 50px;
    }
    .photo {
      position: absolute;
      top: 0;
      right: 10%;
      width: 80px;
      height: 50px;
      line-height: 50px;
    }
  }
</style>