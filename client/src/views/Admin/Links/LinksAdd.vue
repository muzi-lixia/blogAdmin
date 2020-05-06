<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input placeholder="请输入内容" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input placeholder="请输入内容" v-model="form.href"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input placeholder="请输入内容" v-model="form.icon"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input placeholder="请输入内容" v-model="form.desc"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="handleSubmit">添加</el-button>
  </div>
</template>

<script>
  import Upload from "../../../components/Upload";
  import {linksAdd} from "../../../api/index";
  export default {
    name: "DiaryAdd",
    components: {Upload},
    data(){
      return {
        form: {
          name: '',
          href: '',
          icon: '',
          desc: ''
        }
      }
    },
    methods: {
      handleSubmit(){
        //有数据，发送Ajax请求
        linksAdd(this.form).then(res=>{
          if (res.data.code === 0) {
            this.$message({
              type: "success",
              message: "添加成功",
              duration: 2000
            });
            setTimeout(()=>{
              window.location.reload();
            },1000);
          }else{
            this.$message({
              type: "error",
              message: "添加失败,请稍后再试",
              duration: 2000
            });
          }
        }).catch(()=>{
          this.$message({
            type: "error",
            message: "添加失败",
            duration: 2000
          });
        });
      }
    }
  }
</script>

<style scoped>

</style>