import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";

// 1.创建axios实例,可以配置一下默认信息：baseURL,timeout
let request = axios.create({
    /* 
        baseURL:请求地址的公共部分，多使用变量而不是字面量
        timeout:请求超时时间
    */
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
})



//请求拦截器，可以做很多事情，但这里我们只返回配置对象
request.interceptors.request.use(config => {
    const userStore = useUserStore();
    if(userStore.token){
        // 没有token，则请求头中携带token
        config.headers.token = userStore.token;
    }

    return config;
});
//响应拦截器
request.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    //处理网络错误
    let msg = '';
    let status = error.response.status;
    switch (status) {
        case 401:
            msg = "token过期";
            break;
        case 403:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = "无网络";

    }
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error);
});
export default request;