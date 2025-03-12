<template>
    <!-- 顶部左侧静态 -->
    <el-icon style="margin-right:10px" @click="changeIcon">
        <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
	<!-- 左侧的面包屑 -->
	<el-breadcrumb separator-icon="ArrowRight">
		<el-breadcrumb-item
			v-for="(item, index) in $route.matched"
			:key="index"
			v-show="item.meta.title"
			:to="item.path">
			<!-- 图标 -->
			<el-icon>
				<component :is="item.meta.icon"></component>
			</el-icon>
			<!-- 面包屑展示匹配路由的标题 -->
			<span>{{ item.meta.title }}</span>
		</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import useLayoutStore from "@/store/modules/setting";
const LayOutSettingStore = useLayoutStore();
const changeIcon = () => {
	LayOutSettingStore.fold = !LayOutSettingStore.fold;
};

let $route = useRoute();
console.log($route.matched);
</script>

<style lang="scss" scoped></style>
