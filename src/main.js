// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store/store'
import '@/assets/css/css.css'
import '@/assets/css/style.css'
import axios from 'axios'
import $$ from '@/assets/js/methods'
// import VCharts from 'v-charts'

import publicTable from '@/components/public/publicTable'
import tableData from '@/components/public/tableData'

axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'

// Vue.use(VCharts)
Vue.use(elementUI)
Vue.use('axios')
Vue.config.productionTip = false

Vue.component('publicTable', publicTable)
Vue.component('tableData', tableData)

// import ECharts from 'vue-echarts/components/ECharts'
// import 'echarts/lib/chart/line'
// Vue.component('chart', ECharts)

Vue.prototype.$$ = $$
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	store,
  components: { App },
  template: '<App/>'
})
