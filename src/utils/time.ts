// 封装时间判断函数,为了全局使用
export const  getTime = ()=>{
    let message = '';
    const hour = new Date().getHours();
    if(hour <= 10){
        message = '早上好';
    }else if(hour <= 14){
        message = '中午好';
    } else if(hour <= 18){
        message = '下午好'; 
    }else{
        message = '晚上好'; 
    }
    return message;
}