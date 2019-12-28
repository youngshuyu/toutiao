<template>
  <div class="layout-aside">
    <div class="title">
      <img :src="collapse ? smallLogo : BigLogo" alt />
    </div>
    <el-menu
      router
      background-color="#353b4e"
      text-color="#adafb5"
      active-text-color="#ffd04b"
      style="border-right:1px solid #323745;"
      :collapse="collapse"
      :style="{width : collapse ? '60px' : '230px'}"
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>文章管理</span>
        </template>
        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/articles">文章列表</el-menu-item>
        <el-menu-item index="/home/comment">评论列表</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-flag"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item index="/home/picture">图文数据</el-menu-item>
        <el-menu-item index="/home/fansinfo">粉丝画像</el-menu-item>
        <el-menu-item index="/home/fanslife">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home/accountInfo">
      <i class="el-icon-user"></i>
      <span>账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ['collapse'],
  data () {
    return {
      smallLogo: require('../../assets/img/toutiao.png'),
      BigLogo: require('../../assets/img/logo_admin.png')
    }
  }
}
</script>

<style lang="less" scoped>
.layout-aside {
  background-color: #323745;
  .title {
    text-align: center;
    background-color: #2e2f32;
    padding: 10px 0;
    img {
      height: 35px;
    }
  }
}
</style>
