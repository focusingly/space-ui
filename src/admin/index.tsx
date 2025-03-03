import { dateZhCN, NConfigProvider, zhCN } from "naive-ui";
import { defineComponent, KeepAlive, Transition, type VNode } from "vue";
import { RouterView, type RouteLocationNormalizedLoaded } from "vue-router";

export const AdminView = defineComponent({
  name: "AdminView",
  setup() {
    return () => (
      <NConfigProvider locale={zhCN} dateLocale={dateZhCN} class={`w-full h-full`}>
        <RouterView
          class={`w-full h-fit relative`}
          v-slots={{
            default: ({ Component }: { Component: VNode; route: RouteLocationNormalizedLoaded }) => (
              <Transition name="fade">
                <KeepAlive>{Component}</KeepAlive>
              </Transition>
            )
          }}
        />
      </NConfigProvider>
    );
  }
});

export default AdminView;
