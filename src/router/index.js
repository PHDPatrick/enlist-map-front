import { createRouter, createWebHistory } from "vue-router";


import LoginView from "../views/LoginView.vue";
import AdminLayoutView from "../views/AdminLayoutView.vue";


const routes = [
	{
		path: "/",
		redirect: "/login"
	}, {
		path: "/login",
		component: LoginView
	}, {
		path: "/admin",
		component: AdminLayoutView,
		// redirect: "/user/list",
		children: []
	}
];


const router = createRouter({
	history: createWebHistory(),
	routes
});


export default router;