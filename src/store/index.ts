import { de } from "element-plus/es/locale";
import { createPinia } from "pinia";

/* 
    这里是pinia的入口文件
        1.负责引入pinia并暴露出去
        2.到main.ts中注册

*/
const pinia = createPinia();

// 添加浏览器插件支持
// 添加开发环境调试配置

pinia.use(({ store }) => {
	store.$onAction(() => {
		console.debug("🛒 Pinia action:", store.$id);
	}, true);
});

export default pinia;
