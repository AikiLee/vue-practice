/* 
    封装本地存储token的相关方法
*/

export const SET_TOKEN = (token: string) => {
    localStorage.setItem('token', token)

}

export const GET_TOKEN = () => {
    return localStorage.getItem('token');

}

export const REMOVE_TOKEN = () => {
    localStorage.removeItem('token'); 
}