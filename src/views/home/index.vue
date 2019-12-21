<template>
  <div>
    <el-container>
      <el-aside  style="height:100vh;background-color:#323745;width:230px">
        <layout-aside/>
      </el-aside>
      <el-container>
        <el-header>
          <layout-header></layout-header>
        </el-header>
        <el-main>主要内容</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import layoutAside from '../../components/home/layout-aside'
// import layoutHeader from '../../components/home/layout-header'

export default {
  components: {

  }
}
</script>
