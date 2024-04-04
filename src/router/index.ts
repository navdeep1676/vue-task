import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '../stores/user'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
pinia.use(piniaPluginPersistedState)

const store = useUserStore()
const isAuthenticated = store.token
console.log(store.token)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { auth: false }
    },
    {
      path: '/signup',
      name: 'signup',

      component: () => import('../views/SignUpView.vue'),
      meta: { auth: false }
    },
    {
      path: '/dashboard',
      name: 'dashboard',

      component: () => import('../views/Dashboard/DashboardView.vue'),
      meta: { auth: true }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if ('auth' in to.meta && to.meta.auth && !store.IS_USER_AUTHENTICATE_GETTER) {
    next('/')
  } else if ('auth' in to.meta && !to.meta.auth && store.IS_USER_AUTHENTICATE_GETTER) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
