import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

// 前置守卫

const whiteList = ['/login', '/404'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    // 存在token
    if (to.path === '/login') {
      // 跳转到主页
      next('/')
      nprogress.done()
    } else {
      next()
    }
  } else {
    // 无token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }

  next()
})

// 后置守卫
router.afterEach(() => {
  nprogress.done()
})
