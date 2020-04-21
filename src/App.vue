<template>
  <div id="app">
    <transition v-if="!$route.meta.NoNeedHome"
                name="fade">
      <container v-if="$store.state.token!=''"></container>
    </transition>
    <transition v-else
                name="fade"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import container from './components/Container'
import login from './views/login'

export default {
  components: { container, login }
}
</script>

<style>
.el-logo {
  text-align: center;
  font-size: 36px;
  color: antiquewhite;
  margin-bottom: 15px;
}
.el-menu {
  border-right: none !important;
  background-color: #2b343d !important;
  border-top: 1px solid #36424e;
}
.el-submenu__title {
  color: antiquewhite !important;
  border-top: 1px solid #36424e !important;
  border-bottom: 1px solid #1c2126 !important;
}
.el-submenu__title:hover {
  background-color: #666565 !important;
}
.el-submenu__title i {
  color: antiquewhite !important;
}
.el-menu-item-group__title {
  color: #cdc0a3 !important;
}
.el-menu-item,
.el-menu-item a {
  color: #fff !important;
  text-decoration: none;
}
.el-menu-item:focus,
.el-menu-item:hover,
.el-menu-item a:focus,
.el-menu-item a:hover {
  background-color: #666565 !important;
}
.el-aside {
  background-color: #2b343d !important;
  color: #fff !important;
  border-top: 1px solid #36424e !important;
  border-bottom: 1px solid #1c2126 !important;
  box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.9);
}
@import url("./assets/css/base.css");
</style>
