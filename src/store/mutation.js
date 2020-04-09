export default {
  setCurrentPage (state, data) {
    state.currentPage = data
  },
  saveToken (state, data) {
    state.token = data
    console.log(state.token)
    window.localStorage.setItem("Token", data);
  }
}