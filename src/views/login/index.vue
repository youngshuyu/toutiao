<template>
  <div class="bg">
    <div class="card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <el-form style="margin-top:20px;" :model="myForm" :rules="myRule" ref="myForm">
        <el-form-item prop="phoneNumber">
          <el-input  placeholder="请输入手机号码" v-model="myForm.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item prop="msgNumber">
          <el-input style="width:65%" placeholder="请输入短信验证码" v-model="myForm.msgNumber"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item style="text-align: center;" prop="will">
                 <!-- 同意选项 -->
            <el-checkbox v-model="myForm.will">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-for-item>
          <el-button type="primary" style="width:100%" @click="login">
            登录
          </el-button>
        </el-for-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    // rule当前规则
    // value当前表单项的值
    // callback 回调函数
    // 正常写法
    //   if (value) {
    //     // 正确 勾选了协议
    //     callBack() // 一切OK请继续
    //   } else {
    //     // 不对 没勾选协议
    //     callBack(new Error('您必须同意无条件被我们蒙骗'))
    let validator = function (rule, value, callBack) {
      value ? callBack() : callBack(new Error('您必须同意无条件被我们蒙骗'))
    }
    return {
      //   决定着校验规则  key(字段名):value(对象数组) => 一个对象就是一个校验规则
      // required 为true 就表示该字段必填 如果不填 就会提示消息
      myForm: { phoneNumber: '', msgNumber: '', will: false },
      myRule: { phoneNumber: [
        { required: true, message: '请输入活动名称' },
        { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }
      ],
      msgNumber: [
        { required: true, message: '请输入您的验证码' },
        { pattern: /^\d{6}$/, message: '验证码为6位数字' }
      ],
      will: [{ validator }] }
    }
  },
  methods: {
    login () {
      // validate 是一个方法 => 方法中传入的一个函数 两个校验参数  是否校验成功/未校验成功的字段
      this.$refs.myForm.validate(function (isOK) {
        if (isOK) {
          console.log('校验成功')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.bg {
  background-image: url('../../assets/img/login_bg.jpg');
  height: 100vh;
  position: relative;
  .card {
    width: 440px;
    height: 340px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding: 20px;
    .title {
      text-align: center;
      margin-top: 30px;
      img {
        height: 44px;
      }
    }
  }
}
</style>
