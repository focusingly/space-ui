import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { defineConfig } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [vue(), vueJsx(), vueDevTools()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    },
    server: {
      port: 8088
    },
    build: {
      emptyOutDir: true,
      target: "ES2022"
      // rollupOptions: {
      //   external: ["vue", "vue-router", "pinia", "dayjs"],
      //   output: {
      //     paths: {
      //       vue: "https://cdnjs.cloudflare.com/ajax/libs/vue/3.5.13/vue.esm-browser.prod.min.js",
      //       ["vue-router"]: "https://cdnjs.cloudflare.com/ajax/libs/vue-router/4.5.0/vue-router.esm-browser.prod.js",
      //       pinia: "https://cdnjs.cloudflare.com/ajax/libs/pinia/2.3.0/pinia.esm-browser.min.js",
      //       dayjs: "https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.13/dayjs.min.js"
      //     }
      //   }
      // }
    }
  };
});
