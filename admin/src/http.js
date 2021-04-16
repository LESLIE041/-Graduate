//用于接口请求
import axios from 'axios'
import Vue from 'vue'
import router from '../src/router/index'

//用于表示后台接口
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

// 加入全局接口请求头
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    if(localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 全局捕获错误,利用拦截器
http.interceptors.response.use(res => {
    return res
}, err => {
    if(err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })
        if(err.response.status === 401) {
            router.push('/login')
        }
    }
    return Promise.reject(err)
})

//导出文件,用于外部引用
export default http
