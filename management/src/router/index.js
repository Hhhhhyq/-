import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path:'/home',
    name:'home',
    component: Home,
    redirect:'main',
    children:[
      {
        path: '/main',
        name: 'main',
        component: ()=>import ('@/views/home/Main.vue')
      },
      {
        path: '/screen',
        name: 'screen',
        component: ()=>import ('@/views/screen/Screen.vue')
      },
      {
        path: '/users',
        name: 'users',
        component: ()=>import ('@/views/users/Users.vue')
      },
      {
        path: '/translate/find',
        name: 'goods-approval',
        component: ()=>import ('@/views/approval/GoodsApproval.vue')
      },
      {
        path: '/translate/lose',
        name: 'lost-approval',
        component: ()=>import ('@/views/approval/LostApproval.vue')
      },
      {
        path: '/goods',
        name: 'goods',
        component: ()=>import ('@/views/goods/Goods.vue')
      },
      {
        path: '/artical',
        name: 'artical',
        component: ()=>import ('@/views/artical/Artical.vue')
      },
      {
        path: '/other',
        name: 'other',
        component: ()=>import ('@/views/other/Other.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
