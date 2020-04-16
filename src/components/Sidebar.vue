<template>
  <div>
    <el-menu>
      <div class="el-logo">
        <router-link to="/"
                     tag="div">
          <img class="logo"
               src="/logo.png"
               alt="">
          <div class="title">
            <slot>
              系统名称
            </slot>
          </div>
        </router-link>
      </div>
      <div v-if="menus.length>0">
        <div v-for="(menu,index) in menus"
             :key="menu.id">
          <el-submenu v-if="menu.hasChildren"
                      :index="''+index">
            <template slot="title"><i :class="menu.icon"></i>{{menu.name}}</template>
            <el-menu-item-group>
              <router-link tag="span"
                           v-for="(cmenu,cindex) in menu.children"
                           :to="cmenu.path"
                           :key="index+''+cindex">
                <el-menu-item :index="index+'-'+cindex">
                  <i :class="cmenu.icon"></i>
                  {{cmenu.name}}
                </el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <router-link v-else
                       :to="menu.path"
                       tag="span">
            <el-menu-item :index="''+index">
              <i :class="menu.icon"></i>
              <span slot="title">
                {{menu.name}}
              </span>
            </el-menu-item>
          </router-link>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
    };
  },
  props: {
    isCollapse: true,
    menus: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.logo {
  width: 60px;
  float: left;
  margin-left: 20px;
  margin-right: 5px;
}
.title {
  text-align: left;
}
</style>