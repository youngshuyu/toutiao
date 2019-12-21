import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../src/permission' // 引入导航守卫
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import Component from './components/index'
import axios from '../src/utils/request'// 引入自己封装过后的axios

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
