import { AdminRoute } from "@/admin/route";
import type { MenuMixedOption } from "naive-ui/es/menu/src/interface";
import type { RouteRecordRaw } from "vue-router";

export type MenuOptionWithRoute = MenuMixedOption & {
  children?: MenuOptionWithRoute[];
  fullPath: string;
  routeName?: string | symbol;
  breadCrumbs: Array<{
    routeName: string;
    label: string;
  }>;
};

export function extractRouteForMenus(
  rootRoute: RouteRecordRaw,
  basePath: string = "",
  parentBreadCrumbs: Array<{
    routeName: string;
    label: string;
  }> = []
) {
  const menuRoutes: Array<MenuOptionWithRoute> = [];
  if (rootRoute.children) {
    for (const childRoute of rootRoute.children) {
      const routeMenu: MenuOptionWithRoute = {
        key: childRoute.name as string,
        fullPath: basePath + rootRoute.path + "/" + childRoute.path,
        routeName: childRoute.name,
        icon: childRoute.meta?.routeIcon,
        label: childRoute.meta?.displayName || childRoute.meta?.title || childRoute.name,
        breadCrumbs: [
          ...parentBreadCrumbs,
          {
            label:
              (childRoute.meta?.displayName || childRoute.meta?.title || childRoute.name)?.toString() ||
              rootRoute.path + "/" + childRoute.path,
            routeName: childRoute.name?.toString() || rootRoute.path + "/" + childRoute.path
          }
        ]
      };
      if (childRoute.children) {
        routeMenu.children = extractRouteForMenus(childRoute, routeMenu.fullPath, routeMenu.breadCrumbs);
      }
      menuRoutes.push(routeMenu);
    }
  }

  return menuRoutes;
}

export const defaultRouteMenus = extractRouteForMenus(AdminRoute, "");
