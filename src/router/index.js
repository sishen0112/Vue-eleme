import Vue from 'vue'
import Router from 'vue-router'
import vGoods from '@/components/vGoods/vGoods'
import vRatings from '@/components/vRatings/vRatings'
import vSeller from '@/components/vSeller/vSeller'
import Api from '@/common/js/Api.js'
import '@/common/styles/index.styl'

Vue.use(Router)
Vue.prototype.$api = Api

Vue.prototype.$eventHub = new Vue()

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: vGoods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: vRatings
    },
    {
      path: '/seller',
      name: 'sellser',
      component: vSeller
    }
  ]
})
