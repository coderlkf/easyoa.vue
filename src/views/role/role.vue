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
    </div>
  </div>
</template>

<script>
import { getRoleList, editRole, addRole, delRole } from '../../api/api'

export default {
  data () {
    return {
      searchkey: '',
      total: 0,
      pageIndex: 1,
      addDialogVisible: false,
      editDialogVisible: false,
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
  }
}
</script>

<style>
</style>