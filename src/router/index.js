import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useUserStore } from 'src/stores/userStore'


export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach(async (to, from, next) => {
    const requiredAuth = to.meta.auth
    const userStore = useUserStore()

    //si existe el token
    if(userStore.token) {
      return next()
    }

    if(requiredAuth || sessionStorage.getItem('user')) {
      await userStore.refreshToken()
      if(userStore.token) {
        return next()
      }
      return next('/login')
    }

    return next()

    // //si no existe el token
    // if(sessionStorage.getItem('user') && !requiredAuth) {
    //   await userStore.refreshToken()
    //   if(requiredAuth) {
    //     // validar usuario o token

    //     await userStore.refreshToken()
    //     if(userStore.token) {
    //       return next()
    //     }
    //     return next('/login')
    //   } else {
    //     return next()
    //   }
    // } else {
    //   if(requiredAuth) {
    //     await userStore.refreshToken()
    //     if(userStore.token) {
    //       return next()
    //     }
    //     return next('/login')
    //   }
    //   next()
    // }

  })

  return Router
})
