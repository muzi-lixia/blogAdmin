<template>
  <div id="Login">
    <h1>篱下的后台管理系统</h1>
    <div class="l-form">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="用户名" prop="user">
          <el-input v-model="form.user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="psw">
          <el-input v-model="form.psw" show-password></el-input>
        </el-form-item>
      <el-form-item>
        <el-button
            type="primary"
            @click="submitForm('form')"
            :disabled="submitDisabled">登录</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
  import {loginAdmin} from "../../api/index"
  export default {
    name: "Login",
    data(){
      return {
        form: {
          user: '',
          psw: ''
        },
        rules: {
          /*验证用户名*/
          user: {
            validator: (rule,value,cb)=>{
              if(!value){
                cb(new Error("请输入用户名！"))
              }else{
                if(/^[\w\u4e00-\u9fa5]{3,8}$/.test(value)){
                  cb();
                }else{
                  cb(new Error("请输入正确格式用户名！"))
                }
              }
            },
            required: true,
            trigger: 'blur',
          },

          /*验证密码*/
          psw: {
            type: 'string',
            validator: (rule,value,cb)=>{
              if(value){
                if(/^[\w.?!*<>{},;'"^\/\\\[\]]{6,12}$/.test(value)){
                  cb();
                }else{
                  cb(new Error("请输入正确格式密码！"));
                }
              }else{
                cb(new Error("请输入密码！"));
              }
            },
            required: true,
            trigger: ['blur', 'change']
          },
        },

        /*登录过程禁用*/
        submitDisabled: false
      }
    },
    methods: {
      submitForm(){
        /*点击登录禁用*/
        this.submitDisabled = true;
        this.$refs["form"].validate((valid) => {
          if (valid) {
            /*验证都通过*/
            loginAdmin(this.form).then(res=>{
              if(res.data.code){
                this.submitDisabled = false;
                /*登陆失败*/
                this.$message({
                  message: res.data.msg,
                  type: "error",
                  duration: 3000
                })
              }else{
                /*登陆成功*/
                this.submitDisabled = false;
                this.$router.push("/admin");
              }
            }).catch(()=>{
              this.$message({
                message: "登陆失败，请稍后再试。",
                type: "error",
                duration: 3000
              });
              this.submitDisabled = false;
            });
          } else {
            /*验证不通过*/
            this.submitDisabled = false;
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped lang="less">
  #Login {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100vh;
    background: url("../../assets/img/bg.jpg") center top/cover no-repeat;
    padding-top: 50px;
    h1 {
      font-size: 30px;
      color: #fff;
      line-height: 40px;
      text-align: center;
    }
    .l-form {
      overflow: hidden;
      margin: 80px auto 0;
      width: 400px;
      height: 230px;
      background-color: #fff;
      border-radius: 20px;
      .el-form {
        padding: 30px 30px 0 0;
      }
    }
  }
</style>