/* 
    统一管理用户相关的接口：

*/
import request from '@/utils/request'
import type {loginForm,loginResponseData} from '@/api/user/type'
// 使用一个enum来统一管理后端用户相关api
enum API{
    LOGIN_URL = '/login',
    USERINFO_URL = '/getUserinfo',
    LOGOUT_URL = '/logout'
}

// 暴露请求
// 登录接口方法
export const reqLogin = (data:loginForm) => request.post(API.LOGIN_URL,data)
// 获取用户信息方法
export const reqUserInfo = () => request.get(API.USERINFO_URL);

// 登录接口返回对象
//退出登录
export const reqLogout = () => request.get(API.LOGOUT_URL)