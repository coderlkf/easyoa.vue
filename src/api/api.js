import req from './request'

export const getTreeMenu = params => {
  return req.get('menu/treelist', { params }).then(res => res.data)
}

export const getMenu = params => {
  return req.get('menu/list', { params }).then(res => res.data)
}