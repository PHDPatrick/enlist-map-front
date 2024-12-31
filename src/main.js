import "./assets/css/main.scss";
import "element-plus/dist/index.css";

import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";


const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);


createApp(App)
	.use(ElementPlus)
	.use(router)
	.use(pinia)
	.mount("#app");