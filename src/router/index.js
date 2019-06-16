import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Qr from '@/components/Qr'
import Qr2 from '@/components/Qr2'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/qr',
       name: 'Qr',
       component: Qr
      },
      {
        path: '/qr2',
         name: 'Qr2',
         component: Qr2
       }
  


  ]
})
