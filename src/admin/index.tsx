import { defineComponent, KeepAlive, Transition, type VNode } from "vue";
import { RouterView, type RouteLocationNormalizedLoaded } from "vue-router";

export const AdminView = defineComponent({
  name: "AdminView",
  setup() {
    return () => (
      <div class={`w-full h-full bg-white`}>
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
      </div>
    );
  }
});

export default AdminView;
