<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="all" v-loading="loading">
      <el-row type="flex" class="material">
        <div v-for="item in list" :key="item.id" @click="selectImg(item.url)">
          <img :src="item.url" alt />
        </div>
      </el-row>
      <!-- 分页组件 -->
      <el-row type="flex" justify="center">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.total"
          :page-size="page.pageSize"
          :current-page="page.currentPage"
          @current-change="changePage"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="put">上传图片</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      activeName: 'all',
      list: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 8
      }
    }
  },
  methods: {
    getMaterial () {
      this.loading = true
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
        this.loading = false
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    selectImg (url) {
      this.$emit('selectOneImg', url)
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.material {
  flex-wrap: wrap;
  justify-content: center;
  img {
    height: 100px;
    width: 140px;
    margin: 20px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
}
</style>
