<template>
  <div>
    <el-table
        :data="userList"
        style="width: 100%">
      <el-table-column
          label="用户名"
          width="180"
          prop="user"
      >
      </el-table-column>
      <el-table-column
          label="禁用"
          width="180"
      >
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.disabled"
              @change="handleChange(scope.$index,scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
          label="是否管理员"
          width="180"
      >
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.admin"
              @change="handleChange(scope.$index,scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="success"
              :disabled="scope.row.switch"
              @click="handleSave(scope.$index, scope.row)">保存</el-button>
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
  import {getUserList,deleteUser,updateUser} from "../../../api";
  export default {
    name: "UserAdmin",
    data(){
      return{
        userList: [],
        sourceData: []
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
          deleteUser(row._id).then(res=>{
            this.userList.splice(index,1);
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
      //修改数据
      handleChange(index,row){
        let data = this.sourceData[index];
        row.switch = data.disabled === row.disabled && data.admin === row.admin;
      },
      //保存数据
      handleSave(index,row){
        updateUser(row._id,{disabled:row.disabled,admin:row.admin})
          .then(res=>{
            if (res.data.code === 0) {
              this.getUserList();
              this.$message({
                message: "更新成功",
                type: "success",
                duration: 2000
              })
            }else{
              this.$message({
                message: "更新失败",
                type: "error",
                duration: 2000
              })
            }
          })
          .catch(()=>{
            this.$message({
              message: "更新失败",
              type: "error",
              duration: 2000
            })
          });
      },
      /*请求用户数据*/
      getUserList(){
        getUserList().then(res=>{
          this.userList = JSON.parse(JSON.stringify(res.data.data));
          this.userList.forEach(item=>{item.switch=true});
          this.sourceData = res.data.data;
        });
      }
    },
    mounted() {
      this.getUserList();
    }
  }
</script>

<style scoped>

</style>