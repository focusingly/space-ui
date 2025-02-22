import type { RouteRecordRaw } from "vue-router";

export const ClientRoute: RouteRecordRaw = {
  path: "/index",
  name: "index",
  redirect: {
    name: "home"
  },
  component: () => import("@/client"),
  children: [
    {
      path: "/home",
      name: "home",
      meta: {
        title: "welcome to shalling space"
      },
      component: () => import("@/client/home")
    },
    {
      path: "/article",
      name: "article",
      meta: {
        title: "文章"
      },
      component: () => import("@/client/article")
    },
    {
      path: "/about",
      name: "about",
      meta: {
        title: "关于我"
      },
      component: () => import("@/client/about")
    }
  ]
};
