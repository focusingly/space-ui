import { defineStore } from "pinia";
import { ref } from "vue";
import { StoreID } from "./store-id";

export type RouteTab = {
  closeable: boolean;
  displayName: string;
  routeName: string;
};

export const useAdminRouteTabsStore = defineStore(
  StoreID.RouteTabStore,
  () => {
    // 打开的路由
    const openedRoute = ref<RouteTab>({
      closeable: false,
      routeName: "dash",
      displayName: "控制台"
    });
    // 缓存的路由
    const cachedTabs = ref<Array<RouteTab>>([{ closeable: false, routeName: "dash", displayName: "控制台" }]);

    // 回退路由
    const fallbackRouteTab = {
      closeable: false,
      routeName: "dash",
      displayName: "控制台"
    } as const;

    return {
      fallbackRouteTab,
      openedRoute,
      cachedTabs
    };
  },
  {
    persist: {
      storage: window.localStorage
    }
  }
);
