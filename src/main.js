// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAMap from 'vue-amap'
import store from './store'
import {
  Button,
  Icon,
  Cell,
  CellGroup,
  NavBar,
  Loading,
  Toast,
  Row,
  Col,
  Dialog
} from 'vant'
// import 'vant/lib/button/style'
import './assets/common.stylus'
import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest
} from './utils/api.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.Toast = Toast
Vue.prototype.Dialog = Dialog
Vue.config.productionTip = false

Vue.use(Button)
  .use(Icon)
  .use(NavBar)
  .use(Cell)
  .use(CellGroup)
  .use(Loading)
  .use(Row)
  .use(Col)
  .use(ElementUI)
  .use(Dialog)

/* eslint-disable no-new */
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'c9de8f9ce9958bc5a4567f51b7c4a37c',
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor'
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})

router.beforeEach((to, from, next) => {
  document.title = to.name
  next()
  if (
    !store.state.user.access_token.length > 0 &&
    to.path !== '/forget' &&
    to.path !== '/rest'
  ) {
    next('/login')
  }
  if (to.path === '/login' && store.state.user.access_token.length > 0) {
    next('/')
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
