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
            {{userinfo.userName}}
            <el-avatar :size="60"
                       :src="userinfo.headUrl?sysConfig.serverUrl+userinfo.headUrl:'/logo.png'"
                       class="headimg"></el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item desabled>
              <router-link to="/myinfo"
                           tag="div">
                <el-avatar :size="90"
                           :src="userinfo.headUrl?sysConfig.serverUrl+userinfo.headUrl:'/logo.png'"></el-avatar>
                <span class="uname">{{userinfo.userName}}
                  <i :class="userinfo.gender==1?'el-icon-male':'el-icon-female'"></i>{{userinfo.age}}
                  <br>
                  <i class="el-icon-s-custom"></i>{{userinfo.role}}</span>
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <router-link to="/myinfo"
                           tag="span">个人中心</router-link>
            </el-dropdown-item>
            <el-dropdown-item @click.native="editpwdDialogVisible = true">修改密码</el-dropdown-item>
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

    <!-- 修改密码 -->
    <el-dialog title="修改密码"
               :visible.sync="editpwdDialogVisible"
               width="50%">
      <el-form :model="editpwd"
               :rules="editpwdrules"
               label-width="100px"
               ref="editpwdForm">
        <el-form-item label="旧密码"
                      prop="oldpwd">
          <el-input v-model="editpwd.oldpwd"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码"
                      prop="newpwd">
          <el-input v-model="editpwd.newpwd"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码"
                      prop="repwd">
          <el-input v-model="editpwd.repwd"
                    type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editpwdDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="edit('editpwdForm')">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
//读取系统配置
import { sysConfig } from '@/common/config.js'
//菜单组件导入
import sidebar from './Sidebar'
//api导入
import { getTreeMenu, modifyPassword } from '../api/api'
import router from '../router/index'

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
      menus: [],
      editpwdDialogVisible: false,
      editpwd: {
        oldpwd: '',
        newpwd: '',
        repwd: ''
      },
      editpwdrules: {
        oldpwd: [
          { required: true, message: '密码是必填的', trigger: 'blur' },
          { min: 6, max: 16, message: '长度应该在6-16个字符', trigger: 'blur' }
        ],
        newpwd: [
          { required: true, message: '密码是必填的', trigger: 'blur' },
          { min: 6, max: 16, message: '长度应该在6-16个字符', trigger: 'blur' }
        ],
        repwd: [
          { required: true, message: '密码是必填的', trigger: 'blur' },
          { min: 6, max: 16, message: '长度应该在6-16个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginOut () {
      window.localStorage.removeItem('Token')
      window.localStorage.removeItem('TokenExpire')
      window.localStorage.removeItem('refreshtime')
      this.$store.commit("saveToken", '')
      this.$router.replace('/login')
    },
    edit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.editpwd.newpwd != this.editpwd.repwd)
            this.$message({
              message: '两次输入的密码不同',
              type: 'error'
            })
          if (this.editpwd.oldpwd == this.editpwd.repwd)
            this.$message({
              message: '新旧密码不能相同',
              type: 'error'
            })
          let form = new FormData()
          form.append("oldpwd", this.editpwd.oldpwd)
          form.append("newpwd", this.editpwd.newpwd)
          modifyPassword(form).then(res => {
            if (res.issuccess) {
              this.$message({
                message: '修改成功,请重新登录',
                type: 'success'
              })
              // 隐藏编辑窗口
              this.editpwdDialogVisible = false
              // 退出登录
              this.loginOut()
            }
            else {
              this.$message({
                message: '修改失败',
                type: 'error'
              })
            }
          })
        }
      })
    }
  },
  mounted () {
    // 获取左侧导航栏菜单
    getTreeMenu().then(res => {
      // console.log(res)
      if (res.issuccess) {
        this.$notify({
          type: "success",
          message: `获取菜单成功`,
          duration: 3000
        })
        this.menus = res.result
        let mainMenu = [{ id: 0, name: '主菜单' }]
        for (let m of res.result) {
          mainMenu.push({ id: m.id, name: m.name })
        }
        this.$store.commit('saveMainMenu', mainMenu)
      }
      else
        this.$notify({
          type: "error",
          message: `获取菜单失败`
        })
    }).catch(err => {
      console.log(err)
    })
    if (this.$store.state.uinfo)
      this.userinfo = this.$store.state.uinfo
    else
      this.userinfo = JSON.parse(window.localStorage.getItem('uinfo'))
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
  margin: 0 10px;
  float: right;
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
.el-icon-male {
  color: cyan;
}
.el-icon-female {
  color: fuchsia;
}
</style>