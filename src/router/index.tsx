import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  strict: true,
  scrollBehavior: (_, _from, pos) => {
    return (
      pos || {
        el: "#router-layout",
        behavior: "smooth",
        top: 0,
        left: 0
      }
    );
  },
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        requireAuth: false,
        title: "Welcome Shalling Space"
      },
      component: () => import("@/views/home")
    },
    {
      path: "/article",
      name: "article",
      meta: {
        title: "您正在阅读"
      },

      component: () => import("@/views/article")
    },
    {
      path: "/about",
      name: "about",
      meta: {
        title: "关于我"
      },
      component: () => import("@/views/about")
    },
    // No match route found
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/error")
    }
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
    favicon.href = "/favicon.ico";
    document.title = meta.title;
  }
});

export { router };
