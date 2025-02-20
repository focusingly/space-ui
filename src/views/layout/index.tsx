/** @format */

import { Scrollbar } from "@/components/scrollbar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { defineComponent, KeepAlive, Transition, type VNode } from "vue";
import { RouterView, type RouteLocationNormalizedLoaded } from "vue-router";
import "./style.scss";

export const Layout = defineComponent({
  name: "Layout",
  setup() {
    return () => (
      <Scrollbar
        {...{
          id: "router-layout"
        }}
        class={`w-full h-auto overflow-auto bg-auto-noise bg-repeat`}
      >
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
    );
  }
});
