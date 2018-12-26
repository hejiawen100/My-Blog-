import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import http from './common/js/httpService'

const $http = http.http
Vue.prototype.http = $http

Vue.config.productionTip = false

Vue.use(ElementUI)

import {markdown} from 'markdown';
console.log( markdown.toHTML( "Hello *World*!" ) );

// 初始化全局对象
window.He = {
  menuList: []
}

/* 获取菜单列表 */
$http.getJSON("../static/data/menu.json").then(data => {
  window.He.menuList = data.data;

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  })
})


