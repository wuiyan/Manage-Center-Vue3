import axios from 'axios'

const requests = axios.create({ // 创建axios请求对象，对其进行设置
        baseURL:"http://127.0.0.1:8080",  // 设置url请求基址，后续的请求可以省略掉这一部分
        timeout:5000,   // 设置超时时间
        withCredentials: true // 允许携带跨域请求的cookie
})

export default requests; // 将创建好的请求暴露出去