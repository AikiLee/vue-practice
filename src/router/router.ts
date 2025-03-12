export const constantRouter = [
	{
		path: "/login",
		component: () => import("@/views/login/index.vue"),
		// component: () => import("@/views/home/index.vue"),

		name: "login", //命名路由
		meta: {
			/* 
                为了实现路由的动态加载，需要路由meta属性中添加属性
            */
			title: "登录", //标题
			hidden: true,
			icon: "Promotion",
		},
	},
	{
		// 登录后展示数据的路由
		path: "/",
		component: () => import("@/layout/index.vue"),
		name: "layout", //命名路由
		redirect: "/home",
		meta: {
			title: "首页测试",
			hidden: false,
			icon: "",
		},
		children: [
			{
				path: "/home",
				component: () => import("@/views/home/index.vue"),
				meta: {
					title: "首页",
					hidden: false,
					icon: "HomeFilled",
				},
			},
			{
				path: "/test",
				component: () => import("@/views/home/index.vue"),
				meta: {
					title: "测试",
					hidden: false,
					icon: "HomeFilled",
				},
			},
		],
	},

	{
		path: "/404",
		component: () => import("@/views/404/index.vue"),
		name: "404",
		meta: {
			title: "404",
			hidden: true,
			icon: "HomeFilled",
		},
	},
	{
		path: "/acl",
		component: () => import("@/layout/index.vue"),
		name: "Acl",
		meta: {
			hidden: false,
			title: "权限管理",
			icon: "Lock",
		},
		children: [
			{
				path: "/acl/user",
				component: () => import("@/views/acl/user/index.vue"),
				name: "User",
				meta: {
					hidden: false,
					title: "用户管理",
					icon: "User",
				},
			},
			{
				path: "/acl/role",
				component: () => import("@/views/acl/role/index.vue"),
				name: "Role",
				meta: {
					hidden: false,
					title: "角色管理",
					icon: "UserFilled",
				},
			},
			{
				path: "/acl/permission",
				component: () => import("@/views/acl/permission/index.vue"),
				name: "Permission",
				meta: {
					hidden: false,
					title: "菜单管理",
					icon: "Monitor",
				},
			},
		],
	},
	{
		path: "/product",
		component: () => import("@/layout/index.vue"),
		name: "Product",
		meta: {
			title: "商品管理",
			icon: "Goods",
		},
		redirect: "/product/trademark",
		children: [
			{
				path: "/product/trademark",
				component: () => import("@/views/product/trademark/index.vue"),
				name: "Trademark",
				meta: {
					title: "品牌管理",
					icon: "ShoppingCartFull",
				},
			},
			{
				path: "/product/attr",
				component: () => import("@/views/product/attr/index.vue"),
				name: "Attr",
				meta: {
					title: "属性管理",
					icon: "ChromeFilled",
				},
			},
			{
				path: "/product/spu",
				component: () => import("@/views/product/spu/index.vue"),
				name: "Spu",
				meta: {
					title: "SPU管理",
					icon: "Calendar",
				},
			},
			{
				path: "/product/sku",
				component: () => import("@/views/product/sku/index.vue"),
				name: "Sku",
				meta: {
					title: "SKU管理",
					icon: "Orange",
				},
			},
		],
	},
	// {
	// 	// 没有匹配到路径，重定向到404
	// 	path: "/:pathMatch(.*)*",
	// 	redirect: "/404",
	//     meta: {
	// 		title: "任意路由",
	// 		hidden: false,
	// 		icon: "HomeFilled",
	// 	},
	// },
];
