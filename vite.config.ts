import { defineConfig, loadEnv, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { vitePluginFakeServer } from "vite-plugin-fake-server";

const localEnabled: boolean = (process.env.USE_MOCK as unknown as boolean) || false;
const prodEnabled: boolean = (process.env.USE_CHUNK_MOCK as unknown as boolean) || false;

// https://vite.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
	//获取各种环境下的对应的变量
	let env = loadEnv(mode, process.cwd());
	return {
		plugins: [
			vue(),
			createSvgIconsPlugin({
				iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
				symbolId: "icon-[dir]-[name]",
			}),
			vitePluginFakeServer({
				logger: true,
				include: "mock",
				infixName: false,
				enableProd: true,
			}),
		],
		resolve: {
			alias: {
				"@": path.resolve("./src"), // 相对路径别名配置，使用 @ 代替 src
			},
		},
		//scss全局变量一个配置
		css: {
			preprocessorOptions: {
				scss: {
					javascriptEnabled: true,
					//   不要使用相对路径
					additionalData: '@import "@/styles/variable.scss";',
				},
			},
		},
        // 代理跨域
		server: {
			proxy: {
				[env.VITE_APP_BASE_API]: {
					//获取数据的服务器地址设置
					target: "http://localhost:8080",
					//需要代理跨域
					changeOrigin: true,
					//路径重写
					rewrite: (path) => path.replace(/^\/api/, "myApi"),
				},
			},
		},
	};
});
