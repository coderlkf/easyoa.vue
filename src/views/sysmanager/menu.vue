<template>
  <div>
    <!-- 搜索框 -->
    <el-row :gutter="10">
      <el-col :span="6">
        <el-input v-model="searchkey"
                  placeholder="输入菜单名称可以模糊搜索">
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
              @selection-change="handleSelectionChange"
              :data="menus">
      <el-table-column type="selection"
                       width="50">
      </el-table-column>
      <el-table-column prop="id"
                       label="id"
                       sortable
                       width="80"></el-table-column>
      <el-table-column prop="name"
                       label="菜单名称"
                       sortable
                       width="100"></el-table-column>
      <el-table-column label="图标"
                       width="50">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="path"
                       label="路由"></el-table-column>
      <el-table-column prop="actionList"
                       label="api"></el-table-column>
      <el-table-column prop="description"
                       label="说明"></el-table-column>
      <el-table-column label="是否禁用"
                       width="80">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isEnable?'success':'info'">{{scope.row.isEnable?'启用':'禁用'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="permissionCode"
                       label="权限"></el-table-column>
      <el-table-column prop="sortId"
                       label="排序值"
                       width="50"></el-table-column>
      <el-table-column prop="createTime"
                       label="创建时间"
                       sortable></el-table-column>
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
      <!-- 批量删除 -->
      <el-button type="danger"
                 @click="delByIds">批量删除</el-button>
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
    <el-dialog title="新增菜单"
               :visible.sync="addDialogVisible"
               width="50%">
      <el-form :model="addMenuForm"
               :rules="rules"
               label-width="80px"
               ref="addMenuForm">
        <el-form-item label="菜单名称"
                      prop="name">
          <el-input v-model="addMenuForm.name"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="addMenuForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="路由">
          <el-input v-model="addMenuForm.path"></el-input>
        </el-form-item>
        <el-form-item label="api">
          <el-input v-model="addMenuForm.actionList"></el-input>
        </el-form-item>
        <el-form-item label="说明">
          <el-input v-model="addMenuForm.description"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="addMenuForm.isEnable"
                     active-color="#13ce66"
                     inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="父级菜单">
          <el-input v-model="addMenuForm.parentId.number"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-input v-model="addMenuForm.permissionCode"></el-input>
        </el-form-item>
        <el-form-item label="排序值">
          <el-input v-model.number="addMenuForm.sortId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="add('addMenuForm')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑窗口 -->
    <el-dialog title="编辑菜单"
               :visible.sync="editDialogVisible"
               width="50%">
      <el-form :model="addMenuForm"
               :rules="rules"
               label-width="80px"
               ref="editMenuForm">
        <el-form-item label="菜单名称"
                      prop="name">
          <el-input v-model="addMenuForm.name"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="addMenuForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="路由">
          <el-input v-model="addMenuForm.path"></el-input>
        </el-form-item>
        <el-form-item label="api">
          <el-input v-model="addMenuForm.actionList"></el-input>
        </el-form-item>
        <el-form-item label="说明">
          <el-input v-model="addMenuForm.description"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="addMenuForm.isEnable"
                     active-color="#13ce66"
                     inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="父级菜单">
          <el-input v-model="addMenuForm.parentId.number"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-input v-model="addMenuForm.permissionCode"></el-input>
        </el-form-item>
        <el-form-item label="排序值">
          <el-input v-model.number="addMenuForm.sortId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="edit('editMenuForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMenu, addMenu, updateMenu, delMenu, delMenus } from '../../api/api'

export default {
  data () {
    return {
      searchkey: '',
      menus: [],
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      addMenuForm: {
        id: 0,
        name: '',
        icon: '',
        path: '',
        actionList: '',
        description: '',
        sortId: 0,
        isEnable: true,
        permissionCode: 'read,add,edit,delete',
        parentId: 0,
      },
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度应该在3-10个字符', trigger: 'blur' }
        ]
      },
      selectids: [] // 选中的id数组
    }
  },
  created () {
    this.getmenus()
  },
  methods: {
    search () {
      // TODO 搜索菜单
      //console.log(this.searchkey)
    },
    add (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //console.log(this.addMenuForm)
          addMenu(this.addMenuForm).then(res => {
            if (res.issuccess) {
              this.$message({
                message: '添加成功,左侧菜单需要刷新/重登',
                type: 'success'
              })
              // 隐藏新增窗口
              this.addDialogVisible = false
              this.getmenus()
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
          updateMenu(this.addMenuForm).then(res => {
            if (res.issuccess) {
              this.$message({
                message: '编辑成功,左侧菜单需要刷新/重登',
                type: 'success'
              })
              // 隐藏编辑窗口
              this.editDialogVisible = false
              // 重新获取菜单
              this.getmenus()
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
    delByIds () {
      console.log('你选择了：' + this.selectids)
      const _this = this
      this.$confirm('真的要删除' + this.selectids + '吗', '请确认', {
        type: 'error',
        callback (action) {
          if (action == 'confirm') {
            delMenus({ ids: _this.selectids.join(',') }).then(res => {
              if (res.issuccess) {
                _this.$message({
                  message: '删除成功,左侧菜单需要刷新/重登',
                  type: 'success'
                })
                // 重新获取菜单
                _this.getmenus()
              }
              else {
                _this.$message({
                  message: '删除失败',
                  type: 'error'
                })
              }
            })
          }
        }
      })
    },
    getmenus () {
      getMenu().then(res => {
        // console.log(res)
        if (res.issuccess) {
          this.menus = res.result.list
          this.total = res.result.total
        }
        else
          this.$notify({
            title: '没有数据',
            type: 'warning'
          })
      }).catch(err => {
        console.log(err)
      })
    },
    handleEdit (index, row) {
      this.addMenuForm = row
      this.editDialogVisible = true
      // console.log(index, row);
    },
    handleDelete (index, row) {
      // console.log(index, row);
      const _this = this
      this.$confirm('真的要删除' + row.name + '吗', '请确认', {
        type: 'error',
        callback (action) {
          if (action == 'confirm') {
            delMenu({ id: row.id }).then(res => {
              if (res.issuccess) {
                _this.$message({
                  message: '删除成功,左侧菜单需要刷新/重登',
                  type: 'success'
                })
                // 重新获取菜单
                _this.getmenus()
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
      console.log('改变了页码:' + page)
    },
    handleSelectionChange (row) {
      // 获取选中的行的id
      this.selectids = row.map(r => r.id)
    }
  }
}
</script>

<style>
</style>