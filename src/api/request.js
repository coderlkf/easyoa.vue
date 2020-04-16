import axios from 'axios'

const request = axios.create({
  timeout: 5000,
  baseURL: 'http://127.0.0.1:5000/api/',
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Accept': 'application/json'
    }
  }
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // console.log(config)
  return config;
})

export default request