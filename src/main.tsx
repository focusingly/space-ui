import "reset-css";
/* set order mark */
import "@/assets/main.scss";
import "@/conf/init";

import { App } from "@/App";
import { router } from "@/router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";

const app = createApp(App);
app.use(router);
app.use(createPinia().use(piniaPluginPersistedstate));
app.mount(document.getElementById("app")!);
