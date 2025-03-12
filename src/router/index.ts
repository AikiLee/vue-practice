import { createRouter, createMemoryHistory, createWebHashHistory } from "vue-router";
import { constantRouter } from "./router";

/* 
    通过router插件配置模板路由
*/

let router = createRouter({
	history: createWebHashHistory(),
    // 统一在这里暴露
	routes: constantRouter,
	scrollBehavior() {
		return {
			top: 0,
			left: 0,
		};
	},
});

export default router;
