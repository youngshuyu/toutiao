<template>
  <div>
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
          <el-radio-group v-model="radio" @change="selectStatus">
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row class="searchTool" type="flex" align="middle">
        <el-col :span="2">
          <span>频道列表:</span>
        </el-col>
        <el-col :span="18">
          <el-select v-model="select.id" placeholder="请选择" @change="selectStatus">
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
              value-format="yyyy-MM-dd"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="selectStatus"
            ></el-date-picker>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="main" v-loading="loading">
      <el-row slot="header">
        <span style="font-size:14px">共找到{{page.total}}条</span>
      </el-row>
      <el-row v-for="item in list" :key="item.id.toString()" class="articles">
        <el-col :span="14">
          <el-row type="flex" align="middle">
            <img :src="item.cover.images.length? item.cover.images[0] : defaultImg" alt />
            <div class="info">
              <span style="font-size:14px">{{item.title}}</span>
              <el-tag class="tag" :type="item.status | filterType">{{item.status | filterStatus}}</el-tag>
              <span class="date">{{item.pubdate}}</span>
            </div>
          </el-row>
        </el-col>
        <el-col :span="10">
          <el-row class="right" type="flex" justify="end">
            <span @click="toModify(item.id)">
              <i class="el-icon-edit"></i>修改
            </span>
            <span @click="delArticle(item.id)">
              <i class="el-icon-delete"></i> 删除
            </span>
          </el-row>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around" style="margin-top:20px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.total"
          :page-size="page.pageSize"
          :current-page="page.currentPage"
          @current-change="changePage"
        ></el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getChannels, getArticles } from '../../../actions/articles'
export default {
  data () {
    return {
      radio: 5,
      select: {
        options: [],
        id: null,
        dateRange: []
      },
      list: [],
      defaultImg: require('../../../assets/img/老婆.jpeg'),
      loading: false,
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      // value 是过滤器前面表达式计算得到的值
      // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    async getChannels () {
      let res = await getChannels()
      this.select.options = res.data.channels
    },
    async getArticles (params) {
      this.loading = true
      let res = await getArticles(params)
      this.list = res.data.results
      this.page.total = res.data.total_count
      this.loading = false
    },
    selectStatus () {
      this.page.currentPage = 1
      this.getConditionArticle()
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getConditionArticle()
    },
    getConditionArticle () {
      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.radio === 5 ? null : this.radio,
        channel_id: this.select.id,
        begin_pubdate: this.select.dateRange.length
          ? this.select.dateRange[0]
          : null,
        end_pubdate:
          this.select.dateRange.length > 1 ? this.select.dateRange[1] : null
      }
      this.getArticles(params)
    },
    async delArticle (id) {
      await this.$confirm('您确定要删除此文章吗?')
      await this.$axios({
        method: 'delete',
        url: `/articles/${id.toString()}`
      })
      this.$message({
        type: 'success',
        message: '文章已删除'
      })
      this.getConditionArticle()
    },
    toModify (id) {
      this.$router.push(`/home/publish/${id.toString()}`)
    }
  },
  created () {
    this.getChannels()
    this.getArticles()
  }
}
</script>

<style lang="less" scoped>
.searchTool {
  margin: 25px;
}
.main {
  margin-top: 10px;
  .articles {
    padding: 10px;
    border-bottom: 1px #999999 solid;
  }
  img {
    width: 150px;
    height: 100px;
  }
  .info {
    position: relative;
    margin-left: 10px;
    span {
      display: block;
    }
    .date {
      color: #999999;
      font-size: 12px;
      position: absolute;
      left: 0;
      bottom: -20px;
      width: 300px;
    }
    .tag {
      margin-top: 15px;
      display: inline-block;
    }
  }
  .right {
    span {
      font-size: 12px;
      cursor: pointer;
    }
  }
}
</style>
