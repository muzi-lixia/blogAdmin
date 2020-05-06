<template>
  <div>
    <el-table
        :data="messageList"
        style="width: 100%">
      <el-table-column
          label="用户名"
          width="180"
          prop="user.user"
      >
      </el-table-column>
      <el-table-column
          label="内容"
          width="300"
      >
        <template slot-scope="scope">{{getText(scope.row.content)}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getMessageList,deleteMessage} from "../../../api";
  export default {
    name: "UserAdmin",
    data(){
      return{
        messageList: []
      }
    },
    methods: {
      //删除操作
      handleDelete(index,row){
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteMessage(row._id).then(()=>{
            this.messageList.splice(index,1);
            this.$message({
              message: "删除成功",
              type: "success",
              duration: 2000
            });
          }).catch(()=>{
            this.$message({
              message: "删除失败",
              type: "error",
              duration: 2000
            });
          });
        }).catch(() => {});
      },
      /*请求用户数据*/
      getMessageList(){
        getMessageList().then(res=>{
          this.messageList = JSON.parse(JSON.stringify(res.data.data));
        });
      },
      getText(content){
        let div = document.createElement("div");
        div.innerHTML = content;
        return div.innerText;
      }
    },
    mounted() {
      this.getMessageList();
    }
  }
</script>

<style scoped>

</style>