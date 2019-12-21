import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../src/permission' // 引入导航守卫
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import Component from './components/index'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
