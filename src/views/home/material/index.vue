<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 素材内容 -->
    <el-tabs v-model="activeName" @tab-click="changeTab" v-loading="loading">
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <el-card v-for="item in list" :key="item.id" class="img-item">
            <img :src="item.url" alt />
            <el-row
              class="operate"
              type="flex"
              justify="space-around"
              style="font-size:20px"
              align="middle"
            >
              <i class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
        <el-row type="flex" style="height:80px" align="middle" justify="center">
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
      <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
          <el-card v-for="item in list" :key="item.id" class="img-item">
            <img :src="item.url" alt />
          </el-card>
        </div>
        <el-row type="flex" style="height:80px" align="middle" justify="center">
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
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选中
      list: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      loading: false
    }
  },
  methods: {
    getData () {
      this.loading = true
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
        this.loading = false
      })
    },
    changeTab () {
      this.getData()
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getData()
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  .img-item {
    width: 200px;
    height: 240px;
    margin: 20px 10px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      height: 30px;
      position: absolute;
      bottom: 0;
      background-color: #f4f5f6;
      width: 100%;
      left: 0;
    }
  }
}
</style>
