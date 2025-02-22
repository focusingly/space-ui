import type { RouteRecordRaw } from "vue-router";

export const FallbackRoute: RouteRecordRaw = {
  path: "/:pathMatch(.*)*",
  name: "NotFound",
  component: () => import("@/components/error")
};
