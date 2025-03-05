import { createRouter, createWebHistory } from "vue-router";
import { AdminRoute } from "@/admin/route";
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

export { router };
