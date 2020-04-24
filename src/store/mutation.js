export default {
  setCurrentPage (state, data) {
    state.currentPage = data
  },
  saveToken (state, data) {
    state.token = data
    window.localStorage.setItem("Token", data);
  },
  saveTokenExpire (state, data) {
    state.tokenExpire = data;
    window.localStorage.setItem("TokenExpire", data);
  },
  saveUinfo (state, data) {
    state.uinfo = data
    window.localStorage.setItem("uinfo", JSON.stringify(data));
  },
  saveMainMenu (state, data) {
    state.mainMenu = data
  },
  saveRoleMap (state, data) {
    state.roles = [{ id: 0, name: '系统管理员' }]
    let roleMap = { 0: '系统管理员' }
    for (let role of data) {
      roleMap[role.id] = role.name
      state.roles.push(role)
    }
    state.roleMap = roleMap
  }
}