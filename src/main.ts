import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "virtual:svg-icons-register";
//引入自定义插件对象:注册整个项目全局组件
import gloalComponent from '@/components';
import '@/styles/index.scss'
import axios from "axios"
import router from "./router";
import pinia from "./store";
import "./permission"

const app = createApp(App);

app.use(pinia);
app.use(ElementPlus, {
	locale: zhCn,
});
app.use(router);
app.use(gloalComponent);
app.mount("#app");
