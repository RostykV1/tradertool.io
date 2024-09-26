import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/app.scss";
import "./assets/css/body.scss";
import router from "./router";

createApp(App).use(router).use(createPinia()).mount("#app");
