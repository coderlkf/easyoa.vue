export default {
  setCurrentPage(state, data) {
    state.currentPage = data
  },
  saveToken(state, data) {
    state.token = data
    window.localStorage.setItem("Token", data);
  }
}