import SvgIcon from "./SvgIcon/index.vue";
import type { App, Component } from "vue";
const components: { [name: string]: Component } = { SvgIcon };

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const allGlobalComponent: any = {
	SvgIcon,
};

export default {
	// 注册项目的全部全局组件
	install(app: App) {
		Object.keys(components).forEach((key: string) => {
			// 注册为全局组件
			app.component(key, components[key]);
		});
		//将element-plus提供图标注册为全局组件
		for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
			app.component(key, component);
		}
	},
};
