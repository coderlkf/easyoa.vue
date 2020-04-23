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