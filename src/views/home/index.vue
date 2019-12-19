<template>
  <div>
    <el-container>
      <el-aside>
        <layout-aside/>
      </el-aside>
      <el-container>
        <el-header>顶部</el-header>
        <el-main>主要内容</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>
