import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

//引入页面
import welcome from '../views/welcome.vue'
import thinks from '../views/thinks.vue'
import login from '../views/login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "欢迎页",
    component: welcome
  },
  {
    path: "/thinks",
    name: "致谢页",
    component: thinks
  },
  {
    path: "/login",
    name: "登录",
    component: login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//未登录请求重定向到登录页
router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem("Token")
  if (token) {
    store.commit("saveToken", token);
  }
  if (to.path != '/login' && token == '') {
    next('/login')
  }
  next()
})

router.afterEach((to, from) => {
  store.commit('setCurrentPage', to.name)
})

export default router