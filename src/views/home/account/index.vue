<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <!-- 上传组件 -->
    <el-upload action :http-request="uploadImg" :show-file-list="false" class="photo">
      <img :src="formData.photo ? formData.photo : defaultImg" alt />
    </el-upload>
    <!-- 内容组件 -->
    <el-form ref="myForm" :model="formData" label-width="80px" style="margin-left:50px" label-position="left" :rules="rules">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="formData.name" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input v-model="formData.intro" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="formData.mobile" style="width:30%" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-left:110px" @click="saveUserInfo">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        email: '',
        mobile: '',
        photo: ''
      },
      defaultImg: require('../../../assets/img/touxiang.jpg'),
      rules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 1, max: 7, message: '用户名长度在 1 到 7 个字符', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' },
          { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不正确' }]
      }
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => (this.formData = res.data))
    },
    uploadImg (params) {
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        method: 'patch',
        url: '/user/photo',
        data
      }).then(res => {
        this.formData.photo = res.data.photo
      })
    },
    saveUserInfo () {
      this.$refs.myForm.validate((isOK) => {
        //   调用保存方法
        if (isOK) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(result => {
            //   认为保存成功
            this.$message({
              type: 'success',
              message: '保存信息成功'
            })
          })
        }
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.photo {
  position: absolute;
  right: 400px;
  cursor: pointer;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
}
</style>
