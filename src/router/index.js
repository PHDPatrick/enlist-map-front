import { createRouter, createWebHistory } from "vue-router";


import LoginView from "../views/LoginView.vue";
import AdminLayoutView from "../views/AdminLayoutView.vue";
import UserView from "../views/admin/UserView.vue";
import SoldierView from "../views/admin/SoldierView.vue";
import ChartsLayout from "../views/ChartsLayout.vue";


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
		redirect: "/admin/user",
		children: [
			{
				path: "/admin/user",
				component: UserView
			}, {
				path: "/admin/soldier",
				component: SoldierView
			}
		]
	}, {
		path: "/user",
		component: ChartsLayout
	}
];


const router = createRouter({
	history: createWebHistory(),
	routes
});


export default router;