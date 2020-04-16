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
        <el-button @click="dialogVisible = true"
                   type="primary">新增</el-button>
      </el-col>
    </el-row>

    <!-- 菜单表格 -->
    <el-table class="defaulttable"
              :data="menus">
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
                     @current-change="pageChange">
      </el-pagination>
    </el-col>

    <!-- 弹出新增/编辑页 -->
    <el-dialog title="新增菜单"
               :visible.sync="dialogVisible"
               width="50%">
      <el-form :model="menuForm"
               :rules="rules"
               label-width="80px"
               ref="menuForm">
        <el-form-item label="id">
          <el-input v-model="menuForm.id"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="菜单名称"
                      prop="name">
          <el-input v-model="menuForm.name"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="menuForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="路由">
          <el-input v-model="menuForm.path"></el-input>
        </el-form-item>
        <el-form-item label="api">
          <el-input v-model="menuForm.actionList"></el-input>
        </el-form-item>
        <el-form-item label="说明">
          <el-input v-model="menuForm.description"></el-input>
        </el-form-item>
        <el-form-item label="是否禁用">
          <el-switch v-model="menuForm.isEnable"
                     active-color="#13ce66"
                     inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="父级菜单">
          <el-input v-model="menuForm.parentId"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-input v-model="menuForm.permissionCode"></el-input>
        </el-form-item>
        <el-form-item label="排序值">
          <el-input v-model="menuForm.sortId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="add('menuForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMenu } from '../../api/api'

export default {
  data () {
    return {
      searchkey: '',
      menus: [],
      total: 0,
      dialogVisible: false,
      menuForm: {
        id: 0,
        name: '',
        icon: '',
        path: '',
        actionList: '',
        description: '',
        isEnable: true,
        permissionCode: 'read,add,edit,delete',
        parentId: '0'
      },
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度应该在3-10个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    getMenu().then(res => {
      console.log(res)
      if (res.issuccess) {
        this.menus = res.result.list
        this.total = res.result.total
      }
      else
        this.$notify({
          title: '没有数据',
          type: 'warning'
        })
    })
  },
  methods: {
    search () {
      // TODO 搜索菜单
      console.log(this.searchkey)
    },
    add (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: '提交',
            type: 'success'
          })
        }
        else {
          this.$message({
            message: '提交失败',
            type: 'error'
          })
        }
      })
    },
    handleEdit (index, row) {
      console.log(index, row);
    },
    handleDelete (index, row) {
      console.log(index, row);
    },
    pageChange (page) {
      console.log('改变了页码:' + page)
    },
    delByIds () {

    }
  }
}
</script>

<style>
</style>