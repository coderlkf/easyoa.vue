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
  }
}