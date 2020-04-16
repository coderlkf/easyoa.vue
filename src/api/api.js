import req from './request'

// 获取左侧菜单json
export const getTreeMenu = () => {
  return req.get('menu/treelist').then(res => res.data)
}
// 获取菜单列表
export const getMenu = () => {
  return req.get('menu/list').then(res => res.data)
}
// 添加菜单
export const addMenu = params => {
  return req.post('menu', { params }).then(res => res.data)
}
// 更新菜单
export const updateMenu = params => {
  return req.put('menu', { params }).then(res => res.data)
}
// 删除菜单
export const delMenu = params => {
  return req.delete('menu', { params }).then(res => res.data)
}
// 批量删除菜单
export const delMenus = params => {
  return req.delete('menu/delbyids', { params }).then(res => res.data)
}