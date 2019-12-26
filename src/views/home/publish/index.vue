<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form label-width="80px" style="margin-left:30px">
      <el-form-item label="标题">
        <el-input v-model="inputTitle" style="width:40%" placeholder="文章名称"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="inputContent" type="textarea" :rows="4"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="formData.coverRadio">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="2">三图</el-radio>
          <el-radio :label="3">无图</el-radio>
          <el-radio :label="4">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="value">
          <el-option
            v-for="item in channels"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        inputTitle: '',
        inputContent: '',
        coverRadio: 1
      },
      channels: []
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        console.log(res)
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>
</style>
