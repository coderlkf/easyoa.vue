<template>
  <div>
    <el-form :model="uinfo"
             label-width="100px">
      <el-form-item label="头像">
        <!-- <el-avatar shape="square"
                   :size=80
                   :src="uinfo.headUrl">
          <img src="/logo.png" />
        </el-avatar> -->
        <el-upload class="avatar-uploader"
                   action=""
                   :http-request="handelUpload"
                   :show-file-list="false">
          <img v-if="imgurl"
               :src="imgurl"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>

        </el-upload>
      </el-form-item>
      <el-form-item label="Id">
        <el-input v-model="uinfo.id"
                  disabled></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="uinfo.userName"
                  disabled></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="uinfo.nickName"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="uinfo.trueName"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="uinfo.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker v-model="uinfo.birthdate"
                        type="date"></el-date-picker>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="uinfo.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="modify">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserInfo, uploadHeadUrl, modifyUserInfo } from '../../api/api'
import { sysConfig } from '../../common/config'

export default {
  data () {
    return {
      imgurl: "",
      tempurl: "",
      uinfo: {}
    }
  },
  created () {
    getUserInfo().then(res => {
      if (res.issuccess) {
        this.uinfo = res.result
        this.imgurl = sysConfig.serverUrl + res.result.headUrl
      }
    })
  },
  methods: {
    // 上传图片并删除临时图片
    handelUpload (file) {
      let form = new FormData()
      form.append("file", file.file)
      form.append("oldPath", this.tempurl)
      uploadHeadUrl(form).then(res => {
        if (res.issuccess) {
          this.tempurl = res.result
          this.imgurl = sysConfig.serverUrl + res.result
          this.$message({
            message: "上传成功",
            title: "提示",
            type: "success"
          })
        }
      })
    },
    modify () {
      this.uinfo.headUrl = this.tempurl
      modifyUserInfo(this.uinfo).then(res => {
        if (res.issuccess)
          this.$message({
            message: "修改成功",
            title: "提示",
            type: "success"
          })
        else
          this.$message({
            message: "修改失败",
            title: "提示",
            type: "error"
          })
      })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>