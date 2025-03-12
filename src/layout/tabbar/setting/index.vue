<template>
	<el-button
		size="small"
		icon="Refresh"
		circle
		@click="updateRefresh"></el-button>
	<el-button
		size="small"
		icon="FullScreen"
		circle
		@click="fullScreen"></el-button>
	<el-button
		size="small"
		icon="Setting"
		circle></el-button>
	<img
		src="../../../../public/logo.png"
		style="width: 24px; height: 24px; margin: 0px 10px; border-radius: 50%;" />
	<!-- 下拉菜单 -->
	<el-dropdown>
		<span class="el-dropdown-link">
			{{ userStore.username }}
			<el-icon class="el-icon--right">
				<arrow-down />
			</el-icon>
		</span>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import useLayOutSettingStore from "@/store/modules/setting";
import useUserStore from "@/store/modules/user";
import { useRouter, useRoute } from "vue-router";

const $router = useRouter();
const $route = useRoute();
const userStore = useUserStore();
const LayOutSettingStore = useLayOutSettingStore();

const updateRefresh = () => {
	LayOutSettingStore.refresh = !LayOutSettingStore.refresh;
};

//退出登陆点击的回调
const logout = async() => {
  //第一件事：需要项服务器发请求【退出登录接口】（我们这里没有）
  //第二件事：仓库当中和关于用户的相关的数据清空
//   还可以携带路由参数，方便下次再回到登录也米娜
  await userStore.userLogout();
  $router.push({ path: '/login', query: { redirect: $route.path } })
  //第三件事：跳转到登陆页面
}

//全屏按钮点击的回调
const fullScreen = () => {
	//DOM对象的一个属性：可以用来判断当前是不是全屏的模式【全屏：true，不是全屏：false】
	let full = document.fullscreenElement;
	//切换成全屏
	if (!full) {
		//文档根节点的方法requestFullscreen实现全屏
		document.documentElement.requestFullscreen();
	} else {
		//退出全屏
		document.exitFullscreen();
	}
};


</script>

<style lang="scss" scoped></style>
