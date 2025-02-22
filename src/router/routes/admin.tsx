import type { RouteRecordRaw } from "vue-router";

export const AdminRoute: RouteRecordRaw = {
  path: "/admin",
  name: "admin",
  meta: {
    title: "轻管理"
  },
  redirect(_to) {
    return {
      name: "dash"
    };
  },
  component: () => import("@/admin"),
  children: [
    {
      path: "dash",
      name: "dash",
      meta: {
        title: "轻管理面板"
      },
      component: () => import("@/admin/dash")
    }
  ]
};
