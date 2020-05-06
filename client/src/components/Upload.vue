<template>
  <el-upload
      class="avatar-uploader"
      action="http://118.190.201.130:3001/upload/articleSurface"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
  >
    <img width="200" v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
  export default {
    name: "Upload",
    data() {
      return {
        imageUrl: ''
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.$emit('uploadSuccess',res.surface);
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isType = /^(image\/jpeg|image\/png|image\/gif|image\/jpg)$/.test(file.type);
        if (!isType) {
          this.$message.error('上传头像图片只能是 JPG/PNG/GIF 格式!');
        }
        return isType;
      },

    }
  }
</script>

<style scoped>

</style>