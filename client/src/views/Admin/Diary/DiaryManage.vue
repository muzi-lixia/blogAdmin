<template>
  <div>
    <el-table
        :data="diaryList"
        style="width: 100%">
      <el-table-column
          label="时间"
          width="200"
          prop="date"
      >
      </el-table-column>
      <el-table-column
          label="内容"
          width="300"
          prop="txt"
      ></el-table-column>
      <el-table-column
          label="图片"
          width="200"
      >
        <template slot-scope="scope">
          <img v-if="scope.row.img" :src="scope.row.img" height="50px" alt="" />
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
  import {getDiary,deleteDiary} from "../../../api/index"
  export default {
    name: "DiaryManage",
    data(){
      return {
        diaryList: []
      }
    },
    methods: {
      handleDelete(index,row){
        this.$confirm('此操作将永久删除该日记, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteDiary(row._id).then(()=>{
            this.diaryList.splice(index,1);
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
      getDiary().then(res=>{
          this.diaryList = res.data.data;
      })
    }
  }
</script>

<style scoped>

</style>