import Vue from 'vue'
import Router from 'vue-router'
import PersonalCenter from '@/components/personal-center/index'
import calc from '@/components/demo-function/calc/calc'
import game_2048 from '@/components/games/2048/game_2048'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'index',
      component:PersonalCenter
    },
    {
      path:'/demo-function/calc/',
      name:'calc',
      component:calc
    },
    {
      path: '/games/2048/',
      name: '2048',
      component: game_2048,
    }
  ]
})
