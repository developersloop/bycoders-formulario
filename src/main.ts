import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

// @ts-ignore
import VueTheMask from "vue-the-mask";
import "@/main.scss";

const pinia = createPinia();
const app = createApp(App);

createApp(App).use(pinia).use(router).use(VueTheMask).mount("#app");
