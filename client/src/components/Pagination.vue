<template>
  <div>
    <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :page-count="5"
        @current-change="currentChange"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    data(){
      return {
      }
    },
    props:["pageSize","total"],
    methods: {
      currentChange(pageIndex){
        this.$emit('currentChange',pageIndex,this.pageSize);
      }
    }
  }
</script>

<style scoped>

</style>