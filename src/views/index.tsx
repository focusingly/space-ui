import "./style.scss";

import { defineComponent } from "vue";
import { RouterView } from "vue-router";

export const Layout = defineComponent({
  name: "Layout",
  setup() {
    return () => (
      <div class={`w-full h-full bg-auto-noise bg-repeat`}>
        <RouterView />
      </div>
    );
  }
});
