// 权限拦截 守卫导航
import router from '../router'
// 引入进度条组件
import progress from 'nprogress'
import 'nprogress/nprogress.css'
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  progress.start()
  // 拦截谁 判断拦截地址
  if (to.path.startsWith('/home')) {
    // 进行权限判断，判断有无token
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()// 有就放行
    } else {
      next('/login')// 没有直接跳到登录页面
    }
  } else {
    next()// 直接放行
  }
})
router.afterEach(function () {
  progress.done()
})
