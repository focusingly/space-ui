import "vue-router";
export {};

declare module "vue-router" {
  interface RouteMeta {
    requireAuth?: boolean;
    title?: string;
  }
}
