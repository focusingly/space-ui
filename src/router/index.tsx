import { createRouter, createWebHistory } from "vue-router";
import { AdminRoute } from "./routes/admin";
import { ClientRoute } from "./routes/client";
import { FallbackRoute } from "./routes/fallback";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  strict: true,
  sensitive: true,
  routes: [
    {
      path: "/",
      meta: {
        requireAuth: false,
        title: "Welcome Shalling Space"
      },
      redirect(_to) {
        return {
          name: "index",
          path: "/index"
        };
      }
    },
    ClientRoute,
    AdminRoute,
    FallbackRoute
  ]
});

const meta = {
  title: document.querySelector<HTMLLinkElement>("link[rel='icon']")!.href
};
router.afterEach((to, from, failure) => {
  if (to.meta.title) {
    document.title = to.meta.title;
    meta.title = to.meta.title;
  }
});

window.addEventListener("visibilitychange", (evt) => {
  const favicon = document.querySelector<HTMLLinkElement>("link[rel='icon']");
  if (!favicon) {
    return;
  }
  if (document.hidden) {
    favicon.href = "/leave.svg";
    document.title = "...非活跃状态";
  } else {
    favicon.href = "/favicon.svg";
    document.title = meta.title;
  }
});

export { router };
