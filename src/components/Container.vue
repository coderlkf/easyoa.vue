<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside>
      <!-- 系统名称 -->
      <sidebar :menus="menus">{{sysConfig.projname}}</sidebar>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <span class="currentPage">{{$store.state.currentPage}}</span>
        <!-- 登录信息，设置 -->
        <el-dropdown :hide-on-click="false">
          <span class="el-dropdown-link">
            <i class="el-icon-s-custom"></i>
            {{userinfo.name}}
            <img class="headimg"
                 :src="userinfo.headurl"
                 alt="头像">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item desabled>
              <img class="bighead"
                   :src="userinfo.headurl"
                   alt="头像">
              <span class="uname">{{userinfo.name}}
                <br>
                <i class="el-icon-s-custom"></i>{{userinfo.role}}</span>
            </el-dropdown-item>
            <el-dropdown-item divided>个人中心</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item divided
                              @click.native="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 主要内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
//读取系统配置
import { sysConfig } from '@/common/config.js'
//菜单组件导入
import sidebar from './Sidebar'
//api导入
import { getTreeMenu } from '../api/api'
//菜单
{
  // const menus = []
  // menus.push({
  //   id: 1,
  //   name: '主菜单1',
  //   path: '/zcd/1',
  //   icon: 'el-icon-user',
  //   hasChildren: true,
  //   children: [{
  //     id: 101,
  //     name: '子菜单1',
  //     hasChildren: false,
  //     path: '/zcd/1',
  //     children: []
  //   }]
  // })
  // menus.push({
  //   id: 2,
  //   name: '主菜单2',
  //   icon: 'el-icon-user',
  //   path: '/zcd/1',
  //   hasChildren: true,
  //   children: [{
  //     id: 201,
  //     name: '子菜单2',
  //     hasChildren: false,
  //     path: '/zcd/1',
  //     children: []
  //   }]
  // })
  // menus.push({
  //   id: 3,
  //   name: '致谢页',
  //   icon: 'el-icon-sunny',
  //   path: '/thinks',
  //   hasChildren: false,
  //   children: []
  // })
}
export default {
  name: 'container',
  data: () => {
    return {
      sysConfig,
      userinfo: {
        name: '用户名',
        headurl: '/logo.png',
        role: '系统管理员'
      },
      menus: []
    }
  },
  methods: {
    loginOut () {
      this.$store.commit("saveToken", '');
      this.$router.replace('/login')
    },
  },
  created () {
    getTreeMenu().then(res => {
      console.log(res)
      if (res.issuccess) {
        this.$notify({
          type: "success",
          message: `获取菜单成功`,
          duration: 3000
        })
        this.menus = res.result
      }
      else
        this.$notify({
          type: "error",
          message: `获取菜单失败`
        })
    })
  },
  components: { sidebar }
}
</script>

<style>
.asideCollapse {
  width: 300px !important;
}
.asideNotCollapse {
  width: 70px !important;
}
.el-container {
  height: 100%;
}
.el-header {
  padding: 0 !important;
  background-color: #2b343d;
  border-left: 1px solid antiquewhite;
}
.collapse {
  color: antiquewhite;
  font-size: 36px;
  line-height: 60px !important;
  background-color: #494c4c;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-dropdown {
  float: right;
  font-size: 18px !important;
  line-height: 60px;
}
.headimg {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 10px 0 10px 10px;
  float: right;
  border: #494c4c 1px solid;
}
.bighead {
  width: 60px;
  height: 60px;
  margin: 0 auto;
  border-radius: 30px;
  box-shadow: 4px 4px 4px rgba(169, 169, 169, 0.9);
}
.uname {
  text-align: center;
  display: block;
}
.el-dropdown-menu__item {
  width: 200px;
  text-align: center;
}
.currentPage {
  font-size: 20px;
  line-height: 60px;
  color: antiquewhite;
  margin: 20px;
}
/* 分页样式 */
.pagination {
  text-align: center;
}
</style>