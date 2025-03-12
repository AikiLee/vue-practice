<template>
	<div class="login_container">
		我是login路由
		<el-row class="login_form">
			<el-form
				:model="loginForm"
				:rules="rules"
				ref="loginForms">
				<h1>Hello,请登录</h1>
				<el-form-item prop="username">
					<el-input
						v-model="loginForm.username"
						:prefix-icon="User"
						class="login_input"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input
						class="login_input"
						v-model="loginForm.password"
						:prefix-icon="Lock"
						type="password"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button
						class="login_btn"
						type="primary"
						@click="login"
						:loading="loading">
						登录
					</el-button>
				</el-form-item>
			</el-form>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import { ElMessage, ElNotification } from "element-plus";
import useUserStore from "@/store/modules/user";
import { useRouter,useRoute } from "vue-router";
import { getTime } from "@/utils/time";
import type { loginForm } from "@/api/user/type";
const $router = useRouter();
const userStore = useUserStore();
const $route = useRoute();
const loading = ref(false);
// 控制按钮加载

/* 
登录成功：
	1. 跳转到首页
    2. 记录登录状态，存放在pinia中

登录失败：
	提示用户登录失败，提示信息
*/
const loginForm = reactive({
	username: "admin",
	password: "111111",
});
// vue再标签上绑定ref属性，就可以拿到这个标签的dom元素，再到script中接受就行了
const loginForms = ref();
/* 
    为了使用表单element校验
    1. 给表单绑定ref属性,用loginForms接收,这一步是拿到表单的dom元素。这里我使用的是loginForms接收
    2. 给表单绑定rules属性，用rules接收。之后给form-item绑定prop属性，并赋上待绑定的字段名。rules = { 
        username:[
            规则
        ]
    }
    3. 在登录的事件上异步调用：	await loginForms.value.validate();
    4. 简单认识一下几个参数：
        - required: true, // required,代表这个字段务必要校验的
        - min: 5, //min:文本长度至少多少位
        - max: 10, // max:文本长度最多多少位
        - trigger: "change", //trigger:触发校验表单的时机 change->文本发生变化触发校验, blur:失去焦点的时候触发校验规则
        - message:错误的提示信息

    5.还有自定义规则......
*/

const rules = {
	username: [
		//规则对象属性:
		{
			required: true, // required,代表这个字段务必要校验的
			min: 5, //min:文本长度至少多少位
			max: 10, // max:文本长度最多多少位
			message: "长度应为6-10位", // message:错误的提示信息
			trigger: "change", //trigger:触发校验表单的时机 change->文本发生变化触发校验, blur:失去焦点的时候触发校验规则
		},
	],
	password: [
		{
			required: true,
			min: 6,
			max: 10,
			message: "长度应为6-15位",
			trigger: "change",
		},
	],
}; 



/* 
    自定义校验规则
    需要自定义validator这个函数:
        1. 接收三个参数:rule,value,callback
        2. rules: 校验规则对象；
        3. value: 表单字段的值
        4. callback: 回调函数，用于通知校验结果。
        5. 定义好函数之后，可以在rules中国，通过validator属性来指定自定义校验函数。
*/ 
/* const validateUsername = (rule: any, value: string, callback: any) => {

	if (/^\d{5,10}$/.test(value)) {
		callback();	
	}else{
        callback(new Error("密码必须是5-10位的数字"));
    }
}
const rules ={
    username: [
        {
            required: true,
            trigger: "change",
            validator: validateUsername,

        },
    ]
} */

// 登录按钮回调
const login = async () => {
	await loginForms.value.validate();
	loading.value = true;
	/* 
        学习：
            1. 使用封装的接口，进行模块化处理api
            2. promise
    
    */
	try {
		await userStore.userLogin(loginForm);
        // 登录成功后，跳转到之前的页面
        let redirect:  any = $route.query.redirect;
		$router.push({ path: redirect || "/"});
		ElNotification({
			title: `Hi! ${getTime()}`,
			message: "登录成功",
			type: "success",
		});
		// 登录成功加载效果也消失
		loading.value = false;
	} catch (err) {
		loading.value = false;
		ElMessage({
			type: "error",
			// as 自定义类型断言
			message: (err as Error).message,
		});
	}
};
</script>

<style scoped lang="scss">
.login_container {
	width: 100%;
	height: 100vh;
	background: url(@/assets/images/background.jpg) no-repeat;
	background-size: cover;
	background-size: cover;
	position: relative;
	.login_form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
		margin: 0;
		padding: 0;
		position: absolute;
		width: 40%;
		top: 25vh;
		left: 55%;
		background: url(@/assets/images/login_form.png) no-repeat;
		background-size: cover;
		padding: 40px;
		.el-form {
			width: 100%;
			margin: 0 auto;
			:deep(.el-form-item__content) {
				// 深度选择器穿透组件作用域
				flex: 1; // 让内容区域充满剩余空间
				> .login_input {
					// 选中所有直接子元素（包括 Element 组件）
					width: 100%;
				}
			}
		}
		.login_input {
			width: 90%;
		}
		h1 {
			color: white;
			font-size: 40px;
			margin-bottom: 20px;
		}
		h2 {
			color: white;
			font-size: 40px;
		}
		.login_btn {
			width: 100%;
			margin: 0 auto;
			border-radius: 10px;
		}
	}
}
</style>
