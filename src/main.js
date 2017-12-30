// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import http from './common/js/httpService'

const $http = http.http

Vue.config.productionTip = false

Vue.prototype.http = $http
window.http = $http

Vue.use(ElementUI)

window.He = {
  menuList: []
}

/* 必须先拿到菜单列表 */
http.getJSON("../static/data/menu.json").then(data => {
  window.He.menuList = data.data;

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  })
})


