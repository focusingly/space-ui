import { useAdminRouteTabsStore, type RouteTab } from "@/stores/use-route-tabs";
import { NMenu, useMessage } from "naive-ui";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { defaultRouteMenus } from "./route-extract";

export const SidebarMenus = defineComponent({
  name: "SidebarMenus",
  setup() {
    const router = useRouter();
    const message = useMessage();
    const adminRouteTabsStore = useAdminRouteTabsStore();

    return () => (
      <NMenu
        value={adminRouteTabsStore.openedRoute.routeName}
        inverted={true}
        collapsedWidth={50}
        collapsedIconSize={22}
        options={defaultRouteMenus}
        class={`select-none pt-3`}
        onUpdateValue={async (v1: string) => {
          try {
            await router.replace({
              name: v1
            });
            const currentRoute = router.currentRoute.value;
            if (currentRoute.path.startsWith("/admin")) {
              const rt: RouteTab = {
                closeable: v1 !== "dash",
                displayName: currentRoute.meta.displayName!,
                routeName: currentRoute.name?.toString() || currentRoute.fullPath
              };
              const findIndex = adminRouteTabsStore.cachedTabs.findIndex((t) => t.routeName === v1);
              if (findIndex === -1) {
                adminRouteTabsStore.cachedTabs.push(rt);
              }
              adminRouteTabsStore.openedRoute = rt;
            }
          } catch (err) {
            message.error("切换路由失败");
            adminRouteTabsStore.openedRoute = adminRouteTabsStore.fallbackRouteTab;
          }
        }}
      />
    );
  }
});

export default SidebarMenus;
