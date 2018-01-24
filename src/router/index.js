import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/page/Pos'
import Shop from '@/components/page/shop'
import Food from '@/components/page/food'
import Total from '@/components/page/total'
import Set from '@/components/page/set'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'pos',
      component: Pos
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop
    },
    {
      path: '/food',
      name: 'food',
      component: Food
    },
    {
      path: '/total',
      name: 'total',
      component: Total
    },
    {
      path: '/set',
      name: 'set',
      component: Set
    }
  ]
})
