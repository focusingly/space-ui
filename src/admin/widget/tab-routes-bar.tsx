import { useAdminRouteTabsStore } from "@/stores/use-route-tabs";
import { NSpace, NTabPane, NTabs } from "naive-ui";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export const TabRoutesBar = defineComponent({
  name: "TabsBar",
  setup() {
    const router = useRouter();
    const adminRouteStore = useAdminRouteTabsStore();

    return () => (
      <NSpace>
        <NTabs
          value={adminRouteStore.openedRoute.routeName}
          size={"small"}
          type={"card"}
          onClose={(val: string) => {
            const findIndex = adminRouteStore.cachedTabs.findIndex((t) => t.routeName === val);
            if (findIndex === -1) {
              return;
            }
            const currentMenuIndex = adminRouteStore.cachedTabs.findIndex(
              (t) => t.routeName === adminRouteStore.openedRoute.routeName
            );

            switch (true) {
              case val === adminRouteStore.fallbackRouteTab.routeName || findIndex === 0:
                break;
              case currentMenuIndex === findIndex: // 关闭的为当前打开的 tab 页
                adminRouteStore.cachedTabs.splice(findIndex, 1);
                adminRouteStore.openedRoute = adminRouteStore.cachedTabs[findIndex - 1];
                break;
              default:
                adminRouteStore.cachedTabs.splice(findIndex, 1);
                adminRouteStore.openedRoute =
                  adminRouteStore.cachedTabs[
                    adminRouteStore.cachedTabs.findIndex((t) => t.routeName === adminRouteStore.openedRoute.routeName)
                  ];
                break;
            }
          }}
          onUpdateValue={(val: string) => {
            const find = adminRouteStore.cachedTabs.find((t) => t.routeName === val);
            if (!find) {
              return;
            }
            adminRouteStore.openedRoute = {
              closeable: find.routeName !== adminRouteStore.fallbackRouteTab.routeName,
              displayName: find.displayName,
              routeName: val
            };
            router.replace({
              name: val
            });
          }}
        >
          {adminRouteStore.cachedTabs.map((r) => (
            <NTabPane
              name={r.routeName}
              key={r.routeName}
              tab={r.displayName}
              closable={r.routeName !== adminRouteStore.fallbackRouteTab.routeName}
            />
          ))}
        </NTabs>
      </NSpace>
    );
  }
});

export default TabRoutesBar;
