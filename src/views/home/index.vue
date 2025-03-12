<template>
	<div class="">我是home路由</div>
</template>

<script setup lang="ts">
/* 
    当组件挂载完毕之后
*/
import { onMounted } from "vue";
import useUserStore from "@/store/modules/user";
let userStore = useUserStore();
onMounted(() => {
	userStore.userInfo();
});
</script>

<style scoped lang="sass"></style>
