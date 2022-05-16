import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Setting.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Setting',
    component: Home,
    meta: {
      haveItem: false,
      title: '設定'
    }
  },
  {
    path: '/jiugongge',
    name: 'Jiugongge',
    component: () => import('../views/Jiugongge.vue'),
    meta: {
      haveItem: true,
      title: '九宮格'
    }
  },
  {
    path: '/slot',
    name: 'Slot',
    component: () => import('../views/Slot.vue'),
    meta: {
      haveItem: true,
      title: '老虎機'
    }
  },
  {
    path: '/wheel',
    name: 'Wheel',
    component: () => import('../views/Wheel.vue'),
    meta: {
      haveItem: true,
      title: '轉盤'
    }
  },
  {
    path: '/records',
    name: 'Records',
    component: () => import('../views/Records.vue'),
    meta: {
      title: '中獎記錄'
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.haveItem && store.getters.checkedItem.length <= 1) {
    next('/')
  } else {
    next()
  }
})

export default router
