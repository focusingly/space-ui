import { Scrollbar } from "@/components/scrollbar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { defineComponent, KeepAlive, Transition, type VNode } from "vue";
import { RouterView, type RouteLocationNormalizedLoaded } from "vue-router";

export const ClientView = defineComponent({
  name: "ClientView",
  setup() {
    return () => (
      <main class={`w-full h-full`}>
        <Scrollbar class={`w-full h-[100vh] overflow-auto`}>
          <SiteHeader />
          <RouterView
            class={`w-full h-fit min-h-[calc(100%-170px)] relative`}
            v-slots={{
              default: ({ Component }: { Component: VNode; route: RouteLocationNormalizedLoaded }) => (
                <Transition name="fade">
                  <KeepAlive>{Component}</KeepAlive>
                </Transition>
              )
            }}
          />
          <SiteFooter />
        </Scrollbar>
      </main>
    );
  }
});

export default ClientView;
