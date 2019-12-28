<template>
  <div>
    <el-container>
      <el-aside :style="{width: collapse ? '60px' : '230px'}" style="min-height:100vh;background-color:#323745;width:230px;transition:all 0.3s">
        <layout-aside :collapse="collapse"/>
      </el-aside>
      <el-container>
        <el-header>
          <layout-header></layout-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapse: false
    }
  },
  created () {
    eventBus.$on('collapse', () => {
      this.collapse = !this.collapse
    })
  }
}
</script>
