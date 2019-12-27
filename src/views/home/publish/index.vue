<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form
      label-width="80px"
      style="margin-left:30px"
      :model="formData"
      ref="publishForm"
      :rules="publishRules"
      v-loading="loading"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" style="width:40%" placeholder="文章名称"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <!-- <el-input v-model="formData.content" type="textarea" :rows="4"></el-input> -->
        <quill-editor v-model="formData.content" style="height:400px"></quill-editor>
      </el-form-item>
      <el-form-item label="封面" prop="type" style="margin-top:120px">
        <el-radio-group v-model="formData.cover.type" @change="changeType">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        {{formData.cover}}
      </el-form-item>
      <cover-image :list="formData.cover.images"></cover-image>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="publishArticle(false)" type="primary">发布</el-button>
        <el-button @click="publishArticle(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      channels: [],
      loading: false,
      publishRules: {
        title: [
          {
            required: true,
            message: '标题内容不能为空',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 30,
            message: '标题长度需要在5到30字符之间',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '文章内容不能为空',
            trigger: 'blur'
          }
        ],
        channel_id: [
          {
            required: true,
            message: '频道分类不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    $route: function (to) {
      if (Object.keys(to.params).length) {
        //  有参数  => 修改
        this.getArticleById(to.params.articleId)
      } else {
        // 无参数 => 发布文章
        this.formData = {
          title: '',
          content: '',
          cover: {
            type: 0,
            images: []
          },
          channel_id: null
        }
      }
    }
    // 'formData.cover.type': function () {
    //   if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
    //     this.formData.cover.images = []
    //   } else if (this.formData.cover.type === 1) {
    //     this.formData.cover.images = ['']
    //   } else if (this.formData.cover.type === 3) {
    //     this.formData.cover.images = ['', '', '']
    //   }
    // }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    publishArticle (draft) {
      this.$refs.publishForm.validate(isOk => {
        if (isOk) {
          // 可以去进行 发布接口调用
          let { articleId } = this.$route.params
          // 如果url 路径有参数就是修改文章，否则是发布文章
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: {
              draft // 是否存为草稿
            },
            data: this.formData
          }).then(() => {
            // 新增成功 => 应该去内容列表
            this.$router.push('/home/articles') // 回到内容列表
          })
        }
      })
    },
    changeType (value) {
      switch (value) {
        case 0:
          this.formData.cover.images = []
          break
        case -1:
          this.formData.cover.images = []
          break
        case 1:
          this.formData.cover.images = ['']
          break
        case 3:
          this.formData.cover.images = ['', '', '']
          break
        default:
          break
      }
    },
    getArticleById (id) {
      this.loading = true
      this.$axios({
        url: `/articles/${id}`
      }).then(res => {
        this.formData = res.data
        this.loading = false
      })
    }
  },
  created () {
    this.getChannels()
    let { articleId } = this.$route.params
    // 创建组件后，如果url 路径有参数就是修改文章，否则是发布文章
    articleId && this.getArticleById(articleId)
  }
}
</script>

<style>
</style>
