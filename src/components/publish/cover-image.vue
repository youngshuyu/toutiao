<template>
  <div class="cover-image">
    <div v-for="(item,index) in list" :key="index" class="img-item" @click="openDialog(index)">
        <img :src="item ? item : defaultImg" alt="" >
    </div>
    <el-dialog :visible="dialogVisible" @close="closeDialog">
        <!-- 选择图片组件 -->
        <select-image @selectOneImg="receiveImg"></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: '../../assets/img/pic_bg.png',
      dialogVisible: false,
      number: null
    }
  },
  methods: {
    openDialog (index) {
      this.dialogVisible = true
      this.number = index
    },
    closeDialog () {
      this.dialogVisible = false
    },
    receiveImg (url) {
    //   props是只读的，不能更改，只能再次子传父，到父组件上改
      this.$emit('selectOneImg', url, this.number)
      this.closeDialog()
    }

  }
}
</script>

<style lang="less" scoped>
.cover-image{
    margin: 20px auto;
    margin-left: 80px;
    display: flex;
    .img-item {
        width: 250px;
        height: 250px;
        border: 1px solid #ccc;
        padding: 10px;
        img {
        width: 100%;
        height: 100%;
    }
    }

}
</style>
