import { useAdminRouteTabsStore } from "@/stores/use-route-tabs";
import { NGradientText, NLayout, NLayoutContent, NLayoutHeader, NLayoutSider, NScrollbar, NSpace } from "naive-ui";
import { defineComponent, KeepAlive, onMounted, ref, Transition, type VNode } from "vue";
import { RouterView, useRouter, type RouteLocationNormalizedLoaded } from "vue-router";
import OperationBar from "./operation-bar";
import SidebarMenus from "./sidebar-menu";
import TabRoutesBar from "./tab-routes-bar";

export const AdminWidget = defineComponent({
  name: "AdminWidget",
  setup() {
    const router = useRouter();
    const collapsed = ref(false);
    const adminRouteTabsStore = useAdminRouteTabsStore();

    onMounted(() => {
      router.replace({
        name: adminRouteTabsStore.openedRoute.routeName
      });
    });

    return () => (
      <NLayout hasSider={true} class={`w-full h-full`} siderPlacement={"left"} embedded={true}>
        {/* 菜单栏 */}
        <NLayoutSider
          nativeScrollbar={false}
          bordered={true}
          showTrigger={false}
          collapseMode={"width"}
          collapsedWidth={50}
          width={240}
          collapsed={collapsed.value}
          inverted={true}
        >
          <NSpace class={`w-full`} align="center" justify="center">
            {!collapsed.value ? (
              <NGradientText class={`pt-3 select-none font-bold`} size={24}>
                Shalling Space
              </NGradientText>
            ) : null}
          </NSpace>
          <SidebarMenus />
        </NLayoutSider>

        {/* 内容区域 */}
        <NLayoutContent>
          {/* 头部信息 */}
          <NLayoutHeader class={`w-full h-[105px] p-3`}>
            {/* 操作栏 */}
            <NSpace vertical={true}>
              {/* 配置栏 + 面包屑 */}
              <OperationBar collapsed={collapsed.value} onUpdateCollapsedVal={(val) => (collapsed.value = val)} />
              {/* 打开的路由记录 */}
              <TabRoutesBar />
            </NSpace>
          </NLayoutHeader>

          {/* 路由页面信息 */}
          <NScrollbar class={`h-[calc(100%-105px)]`}>
            <main class={`w-full h-full px-3 pb-3`}>
              <RouterView
                class={`w-full relative`}
                v-slots={{
                  default: ({ Component }: { Component: VNode; route: RouteLocationNormalizedLoaded }) => (
                    <Transition name="fade">
                      <KeepAlive>{Component}</KeepAlive>
                    </Transition>
                  )
                }}
              />
            </main>
          </NScrollbar>
        </NLayoutContent>
      </NLayout>
    );
  }
});
