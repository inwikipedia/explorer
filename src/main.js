// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import elementUI from 'element-ui'
import {
	Row,
	Col,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Menu,
	MenuItem,
  MenuItemGroup,
	Form,
	FormItem,
	Select,
	Submenu,
	Input,
	Table,
	TableColumn,
	Icon,
	Card,
	Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  // MessageBox,
  Message,
	Scrollbar,
	Button,
	Breadcrumb,
  BreadcrumbItem,
	Option,
	Tabs,
	TabPane,
	Dialog,
	Collapse,
  CollapseItem
} from 'element-ui'
import App from './App'
import router from './router'
import store from './store/store'
import axios from 'axios'
import $$ from '@/assets/js/methods'
// import LANG from '@/assets/js/language'
// import VCharts from 'v-charts'

import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import '@/assets/css/css.css'
import '@/assets/css/style.css'

import publicTable from '@/components/public/publicTable'
import tableData from '@/components/public/tableData'

axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'

// Vue.use(VCharts)
// Vue.use(elementUI)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Submenu)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Icon)
Vue.use(Card)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Loading)
// Vue.use(MessageBox)
// Vue.use(Message)
Vue.component(Message.name, Message)
Vue.use(Scrollbar)
Vue.use(Button)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Option)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Dialog)
Vue.use(Collapse)
Vue.use(CollapseItem)
// Vue.use(Pagination)
Vue.use('axios')
Vue.config.productionTip = false

Vue.component('publicTable', publicTable)
Vue.component('tableData', tableData)

// Vue.prototype.$loading = Loading.service
// Vue.prototype.$msgbox = MessageBox
// Vue.prototype.$alert = MessageBox.alert
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$prompt = MessageBox.prompt
// Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message

// import ECharts from 'vue-echarts/components/ECharts'
// import 'echarts/lib/chart/line'
// Vue.component('chart', ECharts)
// console.log(lang)
let langZh = require('@/assets/js/language/zh')
let langEn = require('@/assets/js/language/en')
let setLanguage = (lang) => {
  let langData
  if (lang === 'en') {
    langData = langEn
  } else if (lang === 'zh') {
    langData = langZh
  } else {
    langData = langEn
  }
  Vue.prototype.LANG = langData
}
let languageType = localStorage.getItem('EXPLORER_LANGUAGE_TYPE')
setLanguage(languageType)
Vue.prototype.changeLang = (lang) => {
  setLanguage(lang)
}
// Vue.prototype.LANG = LANG
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
