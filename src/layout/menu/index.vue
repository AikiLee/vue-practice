<template>
	<template
		v-for="(item, index) in props.menuList"
		:key="item.path">
		<!-- case:无子路由 -->
		<template v-if="!item.children">
			<el-menu-item
				v-if="!item.meta.hidden"
				:index="item.path"
				@click="goRoute">
				<el-icon>
					<component :is="item.meta.icon"></component>
				</el-icon>
				<template #title>
					<span>{{ item.meta.title }}</span>
				</template>
			</el-menu-item>
		</template>

		<!-- case:有一个子路由 -->
		<template v-if="item.children && item.children.length == 1">
			<el-menu-item
				:index="item.children[0].path"
				v-if="!item.children[0].meta.hidden"
				@click="goRoute">
				<el-icon>
					<component :is="item.children[0].meta.icon"></component>
				</el-icon>
				<template #title>
					<span>{{ item.children[0].meta.title }}</span>
				</template>
			</el-menu-item>
		</template>

		<!-- 有多个子路由,递归执行，把每个child放入Menu中-->
		<el-sub-menu
			:index="item.path"
			v-if="item.children && item.children.length >= 2">
			<template #title>
				<el-icon>
					<component :is="item.children[0].meta.icon"></component>
				</el-icon>
				<span>{{ item.meta.title }}</span>
			</template>
			<Menu :menuList="item.children"></Menu>
		</el-sub-menu>
	</template>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const props = defineProps(["menuList"]);

//获取路由器对象
let $router = useRouter();
//点击菜单的回调
const goRoute = (vc: any) => {
	// console.log(vc.index);
	//路由跳转
	$router.push(vc.index || "/home");
};
</script>
<script lang="ts">
export default {
	name: "Menu",
};
</script>

<style scoped lang="scss"></style>
