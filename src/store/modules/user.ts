import type { loginForm, UserState } from "@/api/user/type";
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo,reqLogout } from "@/api/user";
import { constantRouter } from "@/router/router";
import { GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
/* 
    用户自定义持久化存储： 负责存储用户相关信息
        1.基本结构：使用defineStore()创建，之后返回一个对象包含{state,actions,getters}
        2.使用：
            2.1.在组件中使用：
                2.1.1.在组件中使用setup()中引入useUserStore()
                2.1.2.使用useUserStore()返回的对象中的数据
            2.2.在setup()外使用：

    需求说明：
        1.用户登录成功后，需要将用户数据如：用户名，token等数据存储
        2.将token存储到localStorage中
*/

let useUserStore = defineStore("User", {
	// 在state中存储数据
	state: (): UserState => {
		return {
			token: GET_TOKEN(),
			menuRoutes: constantRouter, //仓库存储生成菜单需要数组（路由）
			username: "",
			avatar: "",
		};
	},
	actions: {
		/* 
            异步处理用户登录逻辑：
                1.使用async/await来处理异步逻辑

        
        */
		async userLogin(data: loginForm) {
			// 使用awiat会自动解析Promise对象
			const result = await reqLogin(data);
			if (result.code === 200 && result.status === 1) {
				// 如果登录成功，将token存入本地存储中.因为pinia/vuex都是基于js对象的
                this.username = result.username;
				this.token = result.token;
				localStorage.setItem("token", result.token);
				console.log(result);
				return "ok";
			} else {
				// 失败的case
				return Promise.reject(new Error(result.message));
			}
		},
		//获取用户信息方法
		async userInfo() {
			//获取用户信息进行存储
			let result = await reqUserInfo();
			if (result.code == 200) {
				this.username = result.data.checkUser.username;
				this.avatar = result.data.checkUser.avatar;
			}
		},
		//退出登录
		userLogout() {
            const result = reqLogout();
			//当前没有mock接口（不做）：服务器数据token失效
			//本地数据清空
			if (result.code === 200) {
				this.token = "";
				this.username = "";
				this.avatar = "";
				REMOVE_TOKEN();
			}
		},
	},
	getters: {},
});
export default useUserStore;
