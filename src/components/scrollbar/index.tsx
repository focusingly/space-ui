import { defineComponent, useSlots, type VNode } from "vue";

export const Scrollbar = defineComponent({
  name: "Scrollbar",

  setup(_prop, { slots }) {
    slots;
    return () => (
      <section
        class={`scrollbar scrollbar-track-transparent scrollbar-corner-transparent scrollbar-w-[4px] scrollbar-thumb-rounded scrollbar-thumb-indigo-300 dark:scrollbar-thumb-slate-500`}
      >
        {slots.default?.()}
      </section>
    );
  }
});
