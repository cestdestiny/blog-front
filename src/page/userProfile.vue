<template>
  <el-container>
    <el-header>
      <span>个人信息</span>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-avatar :size="60" :src="user.url"></el-avatar>
        <p @click="updatePhoto">修改头像</p>
        <zDialog ref="updateAvatar" title="上传头像">
          <div slot="content">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div slot="footer">
            <el-button type="primary" @click="submitAvatar">确认</el-button>
            <el-button  @click="cancelAvatar">取消</el-button>
          </div>
        </zDialog>
      </el-aside>
      <el-main>
        个人信息展示及修改
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import zDialog from '../components/dialog'
import http from '../util/http'
import common from '../util/common'
export default {
  name: 'userProfile',
  components: {
    zDialog
  },
  data () {
    return {
      user: {
        url: ''
      },
      imageUrl: ''
    }
  },
  methods: {
    updatePhoto () {
      this.$refs.updateAvatar.dialogVisible = true
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    cancelAvatar () {
      // todo 删除服务器上的图片
      this.$refs.updateAvatar.dialogVisible = false
      this.imageUrl = ''
    },
    submitAvatar () {
      http.request('/user/id', 'POST', this.user, () => {
        common.commonMessage('修改成功')
      })
      this.$refs.updateAvatar.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>
