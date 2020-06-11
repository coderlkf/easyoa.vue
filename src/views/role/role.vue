<template>
  <div>
    <div>
      <!-- 搜索框 -->
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input v-model="searchkey"
                    placeholder="输入角色名称可以模糊搜索">
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
        <el-table-column prop="name"
                         label="角色名称"
                         sortable
                         width="100"></el-table-column>
        <el-table-column prop="description"
                         label="说明"></el-table-column>
        <el-table-column label="是否禁用"
                         width="80">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isEnable?'success':'info'">{{scope.row.isEnable?'启用':'禁用'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini"
                       @click="handelEditPermissions(scope.$index, scope.row)">配置权限</el-button>
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
                 label-width="80px"
                 ref="addForm">
          <el-form-item label="角色名称"
                        prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="说明">
            <el-input v-model="addForm.description"></el-input>
          </el-form-item>
          <el-form-item label="是否启用">
            <el-switch v-model="addForm.isEnable"
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
          <el-form-item label="角色名称"
                        prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="说明">
            <el-input v-model="addForm.description"></el-input>
          </el-form-item>
          <el-form-item label="是否启用">
            <el-switch v-model="addForm.isEnable"
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
      <!-- 权限窗口 -->
      <el-dialog title="编辑权限"
                 :visible.sync="permissionsDialogVisible"
                 width="50%">
        <el-row v-for="permission in permissions"
                :key="permission.id">
          <el-col :span="permission.permissions.length>0?3:24">
            <el-checkbox :label="permission.name"
                         @click.native="mmChange($event,permission.id)"></el-checkbox>
            <!-- {{permission.name}} -->
          </el-col>
          <el-col :span="21">
            <el-checkbox v-for="pm in permission.permissions"
                         :key="pm.code"
                         :label="pm.name"
                         v-model="pm.isCheck">
            </el-checkbox>
          </el-col>
          <el-col :span="22"
                  :push="2"
                  v-for="cm in permission.children"
                  :key="cm.id">
            <el-checkbox :label="cm.name"
                         @click.native="cmChange($event,permission.id,cm.id)"></el-checkbox>
            <el-checkbox v-for="cpm in cm.permissions"
                         :key="cpm.code"
                         :label="cpm.name"
                         v-model="cpm.isCheck">
            </el-checkbox>
          </el-col>
        </el-row>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="permissionsDialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="editPermissions">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    

  </div>
</template>

<script>
import { getRoleList, editRole, addRole, delRole, getMenuPermissions, setRolePermissions } from '../../api/api'

export default {
  data () {
    return {
      searchkey: '',
      total: 0,
      pageIndex: 1,
      addDialogVisible: false,
      editDialogVisible: false,
      permissionsDialogVisible: false,
      currentEditId: 0,
      roles: [],
      addForm: {
        id: 0,
        name: '',
        description: '',
        isEnable: true
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      permissions: [{
        id: 0,
        name: '',
        permissions: [],
        children: [{
          id: 0,
          name: '',
          permissions: []
        }]
      }]
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
      getRoleList(params).then(res => {
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
          addRole(this.addForm).then(res => {
            if (res.issuccess) {
              this.$message({
                message: '添加成功,重登才能使用该角色',
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
          editRole(this.addForm).then(res => {
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
    handelEditPermissions (index, row) {
      this.currentEditId = row.id
      getMenuPermissions({ id: row.id }).then(res => {
        if (res.issuccess) {
          this.permissions = res.result
        }
      })
      this.permissionsDialogVisible = true
    },
    handleDelete (index, row) {
      // console.log(index, row);
      const _this = this
      this.$confirm('真的要删除' + row.name + '吗', '请确认', {
        type: 'error',
        callback (action) {
          if (action === 'confirm') {
            delRole({ id: row.id }).then(res => {
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
    // 使菜单下的复选框全选
    mmChange (e, id) {
      if (e.target.tagName !== 'INPUT') return
      let isCheck = e.target.checked
      for (let m of this.permissions) {
        if (m.id === id) {
          for (let p of m.permissions)
            p.isCheck = isCheck
          for (let cm of m.children) {
            for (let cp of cm.permissions)
              cp.isCheck = isCheck
          }
        }
      }
    },
    // 子菜单复选框全选
    cmChange (e, id, cid) {
      if (e.target.tagName !== 'INPUT') return
      let isCheck = e.target.checked
      for (let m of this.permissions) {
        if (m.id === id) {
          for (let cm of m.children) {
            if (cm.id === cid) {
              for (let cp of cm.permissions)
                cp.isCheck = isCheck
            }
          }
        }
      }
    },
    // 提交编辑的权限
    editPermissions () {
      let data = new FormData()
      data.append('id', this.currentEditId)
      data.append('permissions', JSON.stringify(this.permissions))
      setRolePermissions(data).then(res => {
        if (res.issuccess) {
          this.$message({
            message: '设置成功',
            type: 'success'
          })
          this.permissionsDialogVisible = false
        }
      })
    }
  }
}
</script>

<style>
</style>