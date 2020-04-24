<template>
  <div>
    <div>
      <!-- 搜索框 -->
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input v-model="searchkey"
                    placeholder="输入员工姓名/用户名/昵称可以模糊搜索">
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="1">
          <el-button @click="addDialogVisible = true"
                     type="primary">新增</el-button>
        </el-col>
      </el-row>

      <!-- 菜单表格 -->
      <el-table class="defaulttable"
                ref="menutable"
                :data="roles">
        <el-table-column prop="id"
                         label="id"
                         sortable
                         width="80"></el-table-column>
        <el-table-column prop="userName"
                         label="用户名"
                         sortable
                         width="100"></el-table-column>
        <el-table-column prop="nickName"
                         label="昵称"
                         width="100"></el-table-column>
        <el-table-column prop="trueName"
                         label="真实姓名"
                         width="100"></el-table-column>
        <el-table-column label="头像"
                         width="60">
          <template slot-scope="scope">
            <el-avatar :size="40"
                       shape="square"
                       :src="scope.row.headUrl?sysConfig.serverUrl+scope.row.headUrl:'/logo.png'"
                       class="headimg"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="性别"
                         width="80">
          <template slot-scope="scope">
            <el-tag :type="scope.row.gender===1?'success':'info'">{{scope.row.gender===1?'男':'女'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="birthdate"
                         label="生日"
                         width="100"></el-table-column>
        <el-table-column prop="phone"
                         label="手机号"
                         width="120"></el-table-column>
        <el-table-column label="是否禁用"
                         width="80">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isEnable?'success':'info'">{{scope.row.isEnable?'启用':'禁用'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否管理员"
                         width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isSystem?'success':'info'">{{scope.row.isSystem?'是':'否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template slot-scope="scope">
            {{$store.state.roleMap[scope.row.role]}}
          </template>
        </el-table-column>
        <el-table-column prop="project"
                         label="项目"></el-table-column>
        <el-table-column prop="createId"
                         label="创建者id"
                         width="80"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-col>
        <!-- 分页 -->
        <el-pagination class="pagination"
                       background
                       layout="prev, pager, next"
                       :page-size="10"
                       :total="total"
                       @current-change="handlePageChange">
        </el-pagination>
      </el-col>

      <!-- 新增窗口 -->
      <el-dialog title="新增"
                 :visible.sync="addDialogVisible"
                 width="50%">
        <el-form :model="addForm"
                 :rules="rules"
                 label-width="100px"
                 ref="addForm">
          <el-form-item label="用户名"
                        prop="userName">
            <el-input v-model="addForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="passWord">
            <el-input v-model="addForm.passWord"
                      type="password"
                      autocomplete="new-password"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="addForm.nickName"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="addForm.trueName"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="addForm.gender">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker v-model="addForm.birthdate"
                            type="date"></el-date-picker>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="addForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model.number="addForm.role"
                       placeholder="请选择">
              <el-option v-for="item in $store.state.roles"
                         :key="item.id"
                         :value="item.id"
                         :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目">
            <el-input v-model="addForm.project"></el-input>
          </el-form-item>
          <el-form-item label="是否启用">
            <el-switch v-model="addForm.isEnable"
                       active-color="#13ce66"
                       inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item label="是否管理员">
            <el-switch v-model="addForm.isSystem"
                       active-color="#13ce66"
                       inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="add('addForm')">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑窗口 -->
      <el-dialog title="编辑"
                 :visible.sync="editDialogVisible"
                 width="50%">
        <el-form :model="addForm"
                 :rules="rules"
                 label-width="80px"
                 ref="editForm">
          <el-form-item label="用户名"
                        prop="userName">
            <el-input v-model="addForm.userName"
                      :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="addForm.passWord"
                      type="password"
                      placeholder="不填不修改"
                      autocomplete="new-password"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="addForm.nickName"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="addForm.trueName"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="addForm.gender">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker v-model="addForm.birthdate"
                            type="date"></el-date-picker>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="addForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model.number="addForm.role"
                       placeholder="请选择">
              <el-option v-for="item in $store.state.roles"
                         :key="item.id"
                         :value="item.id"
                         :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目">
            <el-input v-model="addForm.project"></el-input>
          </el-form-item>
          <el-form-item label="是否启用">
            <el-switch v-model="addForm.isEnable"
                       active-color="#13ce66"
                       inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item label="是否管理员">
            <el-switch v-model="addForm.isSystem"
                       active-color="#13ce66"
                       inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="edit('editForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
//读取系统配置
import { sysConfig } from '@/common/config.js'
import { getEmployeeList, editEmployee, addEmployee, delEmployee } from '../../api/api'

export default {
  data () {
    return {
      sysConfig,
      searchkey: '',
      total: 0,
      pageIndex: 1,
      addDialogVisible: false,
      editDialogVisible: false,
      roles: [],
      addForm: {
        id: 0,
        userName: '',
        passWord: '',
        nickName: '',
        trueName: '',
        phone: '',
        project: '',
        birthdate: '',
        isSystem: false,
        isEnable: true,
        gender: 1,
        role: 0
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        passSord: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
    }
  },
  created () {
    this.getlist()
  },
  methods: {
    getlist () {
      let params = {
        searchkey: this.searchkey,
        pageIndex: this.pageIndex
      }
      getEmployeeList(params).then(res => {
        if (res.issuccess) {
          this.roles = res.result.list
          this.total = res.result.total
        }
      })
    },
    search () {
      this.pageIndex = 1
      this.getlist()
    },
    add (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //console.log(this.addMenuForm)
          addEmployee(this.addForm).then(res => {
            if (res.issuccess) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              // 隐藏新增窗口
              this.addDialogVisible = false
              this.getlist()
            }
          })
        }
        else {
          this.$message({
            message: '添加失败',
            type: 'error'
          })
        }
      })
    },
    edit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          editEmployee(this.addForm).then(res => {
            if (res.issuccess) {
              this.$message({
                message: '编辑成功',
                type: 'success'
              })
              // 隐藏编辑窗口
              this.editDialogVisible = false
              // 重新获取菜单
              this.getlist()
            }
            else {
              this.$message({
                message: '编辑失败',
                type: 'error'
              })
            }
          })
        }
      })
    },
    handleEdit (index, row) {
      this.addForm = row
      this.editDialogVisible = true
      // console.log(index, row);
    },
    handleDelete (index, row) {
      // console.log(index, row);
      const _this = this
      this.$confirm('真的要删除' + row.name + '吗', '请确认', {
        type: 'error',
        callback (action) {
          if (action === 'confirm') {
            delEmployee({ id: row.id }).then(res => {
              if (res.issuccess) {
                _this.$message({
                  message: '删除成功,左侧菜单需要刷新/重登',
                  type: 'success'
                })
                // 重新获取菜单
                _this.getlist()
              }
              else {
                _this.$message({
                  message: '删除失败',
                  type: 'error'
                })
              }
            })          }
        }
      })
    },
    handlePageChange (page) {
      this.pageIndex = page
      this.getlist(params)
    },
  }
}
</script>

<style>
</style>