// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Layout from './components/layout'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import IndexPage from './pages/index'
import orderListPage from './pages/orderList'
import DetailPage from './pages/details/detail'
import OrderListPage from './pages/orderList'
import DetailCouPage from './pages/details/count'
import DetailForPage from './pages/details/forecast'
import DetailAnaPage from './pages/details/analysis'
import DetailPubPage from './pages/details/publish'

import store from './store/index'
Vue.use(VueRouter)
Vue.use(VueResource)


let router = new VueRouter({
  mode:'history',
  routes:[
    {
      path:'/',
      component:IndexPage
    },
    {
      path:'/orderList',
      component:orderListPage
    },
    {
      path:'/detail',
      component:DetailPage,
      redirect: '/detail/analysis',//moren
      children:[
        {
          path:'count',
          component:DetailCouPage
        },
        {
          path:'forecast',
          component:DetailForPage
        },
        {
          path:'analysis',
          component:DetailAnaPage
        },
        {
          path:'publish',
          component:DetailPubPage
        }
      ]
    }
  ]
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<Layout/>',
  components: { Layout }
})
