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
        <el-main>
          主要内容
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  components: {

  }
}
</script>
