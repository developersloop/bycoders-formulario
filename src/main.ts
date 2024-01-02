import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "@/main.scss";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
createApp(App).use(router).mount("#app");
