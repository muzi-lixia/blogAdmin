<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="日记内容">
        <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="form.txt"
        ></el-input>
      </el-form-item>
      <el-form-item label="日记图片">
        <Upload @uploadSuccess="handleMessageSuccess"></Upload>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="handleSubmit">发表日记</el-button>
  </div>
</template>

<script>
  import Upload from "../../../components/Upload";
  import {diaryAdd} from "../../../api/index";
  export default {
    name: "DiaryAdd",
    components: {Upload},
    data(){
      return {
        form: {
          txt: "",
          img: ""
        }
      }
    },
    methods: {
      handleMessageSuccess(url){
        this.form.img = url;
      },
      handleSubmit(){
        let txt = this.form.txt,
          img = this.form.img;
        //没有数据
        if (!txt && !img){
          this.$message({
            type: "error",
            message: "请输入日记内容!",
            duration: 2000
          });
          return;
        }
        //有数据，发送Ajax请求
        diaryAdd(this.form.txt,this.form.img).then(res=>{
          if (res.data.code === 0) {
            this.$message({
              type: "success",
              message: "发表成功",
              duration: 2000
            });
            setTimeout(()=>{
              window.location.reload();
            },1000);
          }else{
            this.$message({
              type: "error",
              message: "发表失败,请稍后再试",
              duration: 2000
            });
          }
        }).catch(()=>{
          this.$message({
            type: "error",
            message: "发表失败",
            duration: 2000
          });
        });
      }
    }
  }
</script>

<style scoped>

</style>