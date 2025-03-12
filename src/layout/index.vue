<!-- 定义页面基本布局
    1. 左侧菜单：layout_slider

    2. 顶部导航栏：layout_header

    3. 主体内容：layout_main
        


-->

<template>
	<div class="lay_container">
		<div
			class="layout_slider"
			:class="{ fold: LayOutSettingStore.fold ? true : false }">
			<Logo></Logo>
			<el-scrollbar
				class="scrollbar"
				collapse="true">
				<!-- 菜单组件 -->
				<el-menu
					background-color="#001529"
					text-color="white"
					:collapse="LayOutSettingStore.fold">
					<Menu :menuList="userStore.menuRoutes"></Menu>
				</el-menu>
			</el-scrollbar>
		</div>
		<div class="layout_tabbar" :class="{ fold: LayOutSettingStore.fold ? true : false }">
            <Tabbar></Tabbar>
        </div>
		<div class="layout_main" :class="{ fold: LayOutSettingStore.fold ? true : false }">
			<!-- <router-view></router-view> -->
			<Main></Main>
		</div>
	</div>
</template>

<script setup lang="ts">
import Logo from "@/layout/logo/index.vue";
import useUserStore from "@/store/modules/user";
import Menu from "@/layout/menu/index.vue";
import useLayoutStore from "@/store/modules/setting";
import Tabbar from "@/layout/tabbar/index.vue";
import Main from "@/layout/main/index.vue";
import {ref,watchEffect} from "vue";


const userStore = useUserStore();
const LayOutSettingStore = useLayoutStore();



</script>

<style scoped lang="scss">
.lay_container {
	width: 100%;
	height: 100vh;
	overflow: hidden;
	.layout_slider {
		width: $base-menu-width;
		height: 100%;
		background-color: $base-menu-background;
        transition: all 0.1s;
        &.fold{
                width: $base-menu-min-width;
            }
		.scrollbar {
			height: calc(100vh - $base-menu-logo-height);
			.el-menu {
				border-right: none;
			}
		}
	}
	.layout_tabbar {
        // $base-tabbar-height 为 60px
		position: fixed;
		width: calc(100% - $base-menu-width);
		height: $base-tabbar-height;
		top: 0;
        overflow: auto;
		left: $base-menu-width;
		background-color: #15aabf;
        transition: all 0.3s;
        &.fold{
            width: calc(100vw - $base-menu-min-width );
            left: $base-menu-min-width;
        }
	}
	.layout_main {
		position: absolute;
		width: calc(100% - $base-menu-width);
		height: calc(100vh - $base-tabbar-height);
		left: $base-menu-width;
		top: $base-tabbar-height;
		padding: 20px;
		overflow: auto;
		transition: all 0.3s;
        background-color: white;
        &.fold{
            width: calc(100vw - $base-menu-min-width );
            left: $base-menu-min-width;
        }
	}
}
</style>
