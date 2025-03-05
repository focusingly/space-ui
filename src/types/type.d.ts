import type { VNode } from "vue";
import "vue-router";
export {};

declare module "vue-router" {
  interface RouteMeta {
    requireAuth?: boolean;
    title?: string;
    displayName?: string;
    routeIcon?: () => VNode;
  }
}
