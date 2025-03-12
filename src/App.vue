<template>
	<div>
        <router-view></router-view>
	</div>
</template>
<script setup lang="ts">
import { defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";
import T1 from "./components/T1.vue";
import request from "./utils/request";
import { onMounted } from "vue";
import { Check, Delete, Edit, Message, Search, Star } from "@element-plus/icons-vue";
import axios from "axios";

// onMounted(() => {
// 	axios({
// 		url: "/api/user/login",
// 		method: "post",
// 		data: {
// 			username: "admin",
// 			password: "123456",
// 		},
// 	}).then((res) => {
// 		console.log(res);
// 	});
// });
</script>
