import req from './request'

// 登录请求
export const login = params => {
  return req.get('login', { params }).then(res => res.data)
}

// 获取左侧菜单json
export const getTreeMenu = () => {
  return req.get('menu/treelist').then(res => res.data)
}
// 获取菜单列表
export const getMenu = params => {
  return req.get('menu/list', { params }).then(res => res.data)
}
// 添加菜单
export const addMenu = params => {
  return req.post('menu', params).then(res => res.data)
}
// 更新菜单
export const updateMenu = params => {
  return req.put('menu', params).then(res => res.data)
}
// 删除菜单
export const delMenu = params => {
  return req.delete('menu', { params }).then(res => res.data)
}
// 批量删除菜单
export const delMenus = params => {
  return req.delete('menu/delbyids', { params }).then(res => res.data)
}
// 获取菜单权限列表
export const getMenuPermissions = () => {
  return req.get('menu/permissions').then(res => res.data)
}

// 获取用户信息
export const getUserInfo = () => {
  return req.get('user').then(res => res.data)
}
// 修改用户信息
export const modifyUserInfo = params => {
  return req.put('user', params).then(res => res.data)
}
// 修改用户密码
export const modifyPassword = params => {
  return req.put('user/modifypwd', params).then(res => res.data)
}
// 上传头像
export const uploadHeadUrl = params => {
  return req.post('user', params).then(res => res.data)
}

// 获取角色
export const getRoles = () => {
  return req.get('role').then(res => res.data)
}
// 获取角色列表
export const getRoleList = params => {
  return req.get('role/list', { params }).then(res => res.data)
}
// 添加角色
export const addRole = params => {
  return req.post('role', params).then(res => res.data)
}
// 修改角色
export const editRole = params => {
  return req.put('role', params).then(res => res.data)
}
// 设置角色权限
export const setRolePermissions = params => {
  return req.put('role/setpermissions', params).then(res => res.data)
}
// 删除角色
export const delRole = params => {
  return req.delete('role', { params }).then(res => res.data)
}

// 获取员工列表
export const getEmployeeList = params => {
  return req.get('employee', { params }).then(res => res.data)
}
// 添加员工
export const addEmployee = params => {
  return req.post('employee', params).then(res => res.data)
}
// 修改员工
export const editEmployee = params => {
  return req.put('employee', params).then(res => res.data)
}
// 删除员工
export const delEmployee = params => {
  return req.delete('employee', { params }).then(res => res.data)
}