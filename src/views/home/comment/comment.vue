<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list">
      <el-table-column label="标题" width="600" prop="title"></el-table-column>
      <el-table-column label="评论状态" prop="comment_status" :formatter="formatterBool"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="openOrClose(obj.row)">{{obj.row.comment_status ? '关闭评论' : '打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getData () {
      this.$axios({
        url: 'articles',
        params: { response_type: 'comment' }
      })
        .then(res => {
          this.list = res.data.results
        })
    },
    formatterBool (row, column, cellValue, index) {
      // row 当前行数据
      // column 当前列数据
      // cellValue 当前单元格的值
      // index 当前下标
      return cellValue ? '正常' : '关闭'
    },
    openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`你确定要${mess}评论吗`)
        .then(() => {
          this.$axios({
            method: 'put',
            url: '/comments/status',
            params: {
              article_id: row.id.toString()
            },
            data: {
              allow_comment: !row.comment_status
            }
          })
            .then(res => {
              // 打开或者关闭评论成功之后
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.getData()// 重新请求列表
            })
        })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>

</style>
