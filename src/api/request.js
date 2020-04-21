import axios from 'axios'
import store from '../store';
import Vue from 'vue';

const request = axios.create({
  timeout: 5000,
  baseURL: 'http://127.0.0.1:5000/api/'
})

var storeTemp = store
// 请求拦截器
request.interceptors.request.use(config => {
  var curTime = new Date()
  var expiretime = new Date(Date.parse(storeTemp.state.tokenExpire))
  // console.log(config)
  // api拦截，加上token
  if (storeTemp.state.token && (curTime < expiretime && storeTemp.state.tokenExpire)) {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = "Bearer " + storeTemp.state.token
  }

  saveRefreshtime()
  return config
})

// http response 拦截器
request.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // 超时请求处理
    var originalRequest = error.config;
    if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1 && !originalRequest._retry) {

      Vue.prototype.$message({
        message: '请求超时！',
        type: 'error'
      });
      originalRequest._retry = true
      return null;
    }
    if (error.response) {
      if (error.response.status == 401) {
        var curTime = new Date()
        var refreshtime = new Date(Date.parse(window.localStorage.refreshtime))
        // 在用户操作的活跃期内
        if (window.localStorage.refreshtime && (curTime <= refreshtime) && window.localStorage.Token != 'undefined') {
          return refreshToken({ token: window.localStorage.Token }).then((res) => {
            if (res.issuccess) {
              Vue.prototype.$message({
                message: 'refreshToken success! loading data...',
                type: 'success'
              });

              store.commit("saveToken", res.result.token);

              var curTime = new Date();
              var expiredate = new Date(curTime.setSeconds(curTime.getSeconds() + 60 * 60));
              store.commit("saveTokenExpire", expiredate);

              error.config.__isRetryRequest = true;
              error.config.headers.Authorization = 'Bearer ' + res.token;
              return request(error.config);
            } else {
              // 刷新token失败 清除token信息并跳转到登录页面
              ToLogin()
            }
          });
        } else {
          // 返回 401，并且不知用户操作活跃期内 清除token信息并跳转到登录页面
          ToLogin()
        }

      }
      // 403 无权限
      if (error.response.status == 403) {
        Vue.prototype.$message({
          message: '失败！该操作无权限',
          type: 'error'
        });
        return null;
      }
      // 429 ip限流
      if (error.response.status == 429) {
        Vue.prototype.$message({
          message: '刷新次数过多，请稍事休息重试！',
          type: 'error'
        });
        return null;
      }
    }


  }
);

export default request

export const saveRefreshtime = params => {
  let nowtime = new Date();
  let lastRefreshtime = window.localStorage.refreshtime ? new Date(window.localStorage.refreshtime) : new Date(-1)
  let expiretime = new Date(Date.parse(window.localStorage.TokenExpire))
  let refreshCount = 1 // 滑动系数
  if (lastRefreshtime >= nowtime) {
    lastRefreshtime = nowtime > expiretime ? nowtime : expiretime;
    lastRefreshtime.setMinutes(lastRefreshtime.getMinutes() + refreshCount)
    window.localStorage.refreshtime = lastRefreshtime
  } else {
    window.localStorage.refreshtime = new Date(-1)
  }
};

// 刷新token
const refreshToken = params => {
  return request.get('login/refreshtoken', { params }).then(res => res.data)
}

const ToLogin = params => {
  store.commit("saveToken", "");
  store.commit("saveTokenExpire", "")

  window.location = '/login'
  // Vue.prototype.$router.replace('/login')
};