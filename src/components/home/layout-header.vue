<template>
  <el-row class="layout-header" type="flex" justify="space-between" align="middle">
    <el-col :span="7" class="left">
      <i :class="{'el-icon-s-fold' : collapse,'el-icon-s-unfold' : !collapse}" @click="changeCollapse"></i>
      <span class="title">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="4">
      <div class="right">
          <el-row type="flex" justify="end" align="middle">
              <img :src="userInfo.photo ? userInfo.photo : defaultImg" alt="">
          <el-dropdown @command="handleCommend">
              <span class="el-dropdown-link">{{userInfo.name}}</span>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人信息</el-dropdown-item>
                  <el-dropdown-item command="git">Git地址</el-dropdown-item>
                  <el-dropdown-item command="lgOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
          </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapse: false,
      userInfo: {},
      defaultImg: require('../../assets/img/touxiang.jpg')// 默认头像
    }
  },
  created () {
    // 查询数据
    this.getUserInfo()
    eventBus.$on('saveUserInfoSuccess', () => {
      this.getUserInfo()
    })
  },
  methods: {
    changeCollapse () {
      this.collapse = !this.collapse
      eventBus.$emit('collapse')
    },
    async getUserInfo () {
      let result = await this.$axios({
        url: '/user/profile'
      })
      this.userInfo = result.data // 获取用户个人信息
    },
    handleCommend (command) {
      if (command === 'git') {
        window.location.href = 'https://github.com/shuiruohanyu/89heimatoutiao'
      } else if (command === 'lgOut') {
        window.localStorage.removeItem('user-token')
        this.$router.push('/')
      }
    }
  }
}

</script>

<style lang="less" scoped>
.layout-header {
  height: 60px;
  .left {
    font-size: 18px;
    .title {
      margin-left: 4px;
      font-size: 16px;
      color: #2c3e50;
    }
  }
  .right {
    float: right;
    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 5px;
    }
  }
}
</style>
