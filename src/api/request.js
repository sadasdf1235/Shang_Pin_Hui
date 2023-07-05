//axios二次封装
import axios from "axios";
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
const requests = axios.create({
    // 请求时路径上自动加上/api
    baseURL: "/api",
    //超时事件时间
    timeout: 5000,
})
//请求拦截器
requests.interceptors.request.use((config) => {
    //config 里包含了请求头
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //token
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    nprogress.start()
    return config
})
// 响应拦截器
requests.interceptors.response.use((res) => {
    nprogress.done()
    return res.data
}, (error) => {
    return Promise.reject(new Error('faile'))
})
export default requests