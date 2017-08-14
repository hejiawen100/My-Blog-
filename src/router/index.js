import Vue from 'vue'
import Router from 'vue-router'
import PersonalCenter from '@/components/personal-center/index'
import calc from '@/components/demo-function/calc/calc'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/personal-center/',
      name:'index',
      component:PersonalCenter
    },
    {
      path:'/demo-function/calc/',
      name:'calc',
      component:calc
    }
  ]
})
