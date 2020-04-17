import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

//引入页面
import welcome from '../views/welcome.vue'
import thinks from '../views/thinks.vue'
import target from '../views/target.vue'
import login from '../views/login.vue'

//系统管理
import menu from '../views/sysmanager/menu.vue'

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
    path: "/target",
    name: "学习目标",
    component: target
  },
  {
    path: "/login",
    name: "登录",
    component: login
  },
  {
    path: "/menu",
    name: "菜单管理",
    component: menu
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

//将当前页标题设置到sore
router.afterEach((to, from) => {
  document.title = "EASYOA-" + to.name
  store.commit('setCurrentPage', to.name)
})

export default router