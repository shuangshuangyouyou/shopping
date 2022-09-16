import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/vantui'

//安装reset-css 引入,去除默认样式
import 'reset-css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

