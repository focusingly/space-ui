import "reset-css";
/* set order mark */
import "@/assets/main.scss";
// 通用字体
import "vfonts/Lato.css";
// 等宽字体
import "vfonts/FiraCode.css";

import "@/conf/init";

import { DarkMode, LightMode } from "@/conf/color-design";
import { router } from "@/router";
import { createNoise } from "@/util/noise";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp, defineAsyncComponent } from "vue";

const app = createApp(
  defineAsyncComponent({
    loader: async () => {
      const styleEl = document.createElement("style");
      styleEl.innerHTML = /* css */ `
      :root {
        --dark-bg-noise: url(${await createNoise(DarkMode)});
        --light-bg-noise: url(${await createNoise(LightMode)});
        --theme-bg-noise: var(--light-bg-noise);
      }
      body.dark {
        --theme-bg-noise: var(--dark-bg-noise);
      }
      `.trim();
      document.head.appendChild(styleEl);
      return import("@/App");
    }
  })
);
app.use(router);
app.use(createPinia().use(piniaPluginPersistedstate));
app.mount(document.getElementById("app")!);
