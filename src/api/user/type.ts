import type { RouteRecordRaw } from "vue-router";

// 登录接口需要携带的参数
export interface loginForm {
	username: string;
	password: string;
}

// 登录接口返回的类型
// export interface loginResponseData {
// 	token: string;
// 	data: dataType;
// }

//定义小仓库数据state类型
export interface UserState {
	username: string;
	avatar: string;
	token: string | null;
	menuRoutes: RouteRecordRaw[];
}

//定义全部接口返回数据都有的数据类型
export interface ResponseData {
	code: number;
	message: string;
	ok: boolean;
}

//定义登录接口返回数据类型
export interface loginResponseData extends ResponseData {
	data: string;
}

//定义获取用户信息返回的数据类型
export interface userInfoResponseData extends ResponseData {
	data: {
		routes: string[];
		button: string[];
		roles: string[];
		name: string;
		avatar: string;
	};
}
