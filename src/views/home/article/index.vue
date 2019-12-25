<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <!-- 搜索工具栏 -->
    <el-row class="searchTool">
      <el-col :span="2">
        <span>文章状态:</span>
      </el-col>
      <el-col :span="20">
        <el-radio v-model="radio" label="0">全部</el-radio>
        <el-radio v-model="radio" label="1">草稿</el-radio>
        <el-radio v-model="radio" label="2">待审核</el-radio>
        <el-radio v-model="radio" label="3">审核通过</el-radio>
        <el-radio v-model="radio" label="4">审核失败</el-radio>
      </el-col>
    </el-row>
    <el-row class="searchTool" type="flex" align="middle">
      <el-col :span="2">
        <span>频道列表:</span>
      </el-col>
      <el-col :span="18">
        <el-select v-model="select.id" placeholder="请选择">
          <el-option
            v-for="item in select.options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="searchTool" type="flex" align="middle">
      <el-col :span="2">
        <span>时间选择:</span>
      </el-col>
      <el-col :span="20">
        <div class="block">
          <el-date-picker
            v-model="select.dateRange"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      radio: 0,
      select: {
        options: [],
        id: '',
        dateRange: []
      }
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        console.log(res)

        this.select.options = res.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style lang="less" scoped>
.searchTool {
  margin: 25px;
}
</style>
