<template>
  <div class="cover-image">
    <div v-for="(item,index) in list" :key="index" class="img-item">
        <img :src="item ? item : defaultImg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: '../../assets/img/pic_bg.png'
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
