import { useThemeStore } from "@/stores/use-theme";
import { PanelLeft16Regular, PanelRight16Regular } from "@vicons/fluent";
import {
  DarkModeRound,
  DesktopMacRound,
  FullscreenRound,
  LightModeRound,
  RefreshRound,
  SettingsRound
} from "@vicons/material";
import { useCycleList } from "@vueuse/core";
import { NAvatar, NBreadcrumb, NBreadcrumbItem, NButton, NIcon, NInput, NSpace } from "naive-ui";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { defaultRouteMenus, type MenuOptionWithRoute } from "./route-extract";

export const OperationBar = defineComponent<{
  collapsed: boolean;
  onUpdateCollapsedVal?: (val: boolean) => void;
}>({
  name: "OperationBar",
  props: ["collapsed", "onUpdateCollapsedVal"],
  setup(props) {
    const themeStore = useThemeStore();
    const { state, next } = useCycleList<typeof themeStore.theme>(["auto", "dark", "light"], {
      initialValue: themeStore.theme
    });
    const route = useRoute();
    const getDepthRouteTabBreadCrumbs = (
      routeMenu: MenuOptionWithRoute
    ): Array<{
      routeName: string;
      label: string;
    }> | void => {
      if (routeMenu.key === route.name) {
        return routeMenu.breadCrumbs;
      } else {
        if (routeMenu.children) {
          for (const child of routeMenu.children) {
            const find = getDepthRouteTabBreadCrumbs(child);
            if (find) {
              return find;
            }
          }
        }
      }
    };

    const breadCrumbItems = computed(() => {
      for (const menuRote of defaultRouteMenus) {
        const find = getDepthRouteTabBreadCrumbs(menuRote);
        if (find) {
          return find;
        }
      }
      return [];
    });

    return () => (
      <NSpace align={"center"} justify={"space-between"}>
        <NSpace align={"center"}>
          <NButton
            class={`w-[30px] h-[30px]`}
            strong={true}
            onClick={() => {
              if (props.onUpdateCollapsedVal) {
                props.onUpdateCollapsedVal(!props.collapsed);
              }
            }}
            v-slots={{
              icon: () => <NIcon>{props.collapsed ? <PanelLeft16Regular /> : <PanelRight16Regular />}</NIcon>
            }}
          />

          <NButton
            class={`w-[30px] h-[30px]`}
            strong={true}
            v-slots={{
              icon: () => (
                <NIcon>
                  <RefreshRound />
                </NIcon>
              )
            }}
          />

          <NBreadcrumb>
            {breadCrumbItems.value.map((t) => (
              <NBreadcrumbItem class={`select-none`} clickable={false} key={t.routeName}>
                {t.label}
              </NBreadcrumbItem>
            ))}
          </NBreadcrumb>
        </NSpace>

        <NInput type="text" placeholder={"搜索"} />

        <NSpace align={"center"}>
          <NButton
            class={`w-[30px] h-[30px]`}
            strong={true}
            v-slots={{
              icon: () => (
                <NIcon>
                  <FullscreenRound />
                </NIcon>
              )
            }}
          />

          <NButton
            size="small"
            class={`w-[30px] h-[30px]`}
            strong={true}
            v-slots={{
              icon: () => (
                <NIcon>
                  <SettingsRound />
                </NIcon>
              )
            }}
          />

          {/* 主题切换 */}
          <NButton
            size="small"
            class={`w-[30px] h-[30px]`}
            onClick={() => {
              next();
              themeStore.theme = state.value;
            }}
            strong={true}
            v-slots={{
              icon: () => (
                <NIcon>
                  {(() => {
                    switch (state.value) {
                      case "auto":
                        return <DesktopMacRound />;
                      case "light":
                        return <LightModeRound />;
                      case "dark":
                        return <DarkModeRound />;
                    }
                  })()}
                </NIcon>
              )
            }}
          />

          <NAvatar bordered={true} circle={true} src="/favicon.svg" />
        </NSpace>
      </NSpace>
    );
  }
});

export default OperationBar;
