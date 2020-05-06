<template>
  <div>
    <el-table
        :data="linksList"
        style="width: 100%">
      <el-table-column
          label="名称"
          width="200"
          prop="name"
      >
      </el-table-column>
      <el-table-column
          label="地址"
          width="200"
          prop="href"
      ></el-table-column>
      <el-table-column
          label="图标"
          width="200"
      >
        <template slot-scope="scope">
          <img v-if="scope.row.icon" :src="scope.row.icon" height="50px" alt="" />
        </template>
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
  import {getLinks,deleteLinks} from "../../../api/index"
  export default {
    name: "DiaryManage",
    data(){
      return {
        linksList: []
      }
    },
    methods: {
      handleDelete(index,row){
        this.$confirm('此操作将永久删除该链接, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteLinks(row._id).then(()=>{
            this.linksList.splice(index,1);
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
      }
    },
    created() {
      getLinks().then(res=>{
        this.linksList = res.data.data;
      })
    }
  }
</script>

<style scoped>

</style>