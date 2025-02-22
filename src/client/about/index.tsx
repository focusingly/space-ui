import { defineComponent } from "vue";

export default defineComponent({
  name: "About",
  setup() {
    return () => {
      return (
        <div class={`w-full h-full`}>
          <h1 class={`text-zinc-900`}>About Me</h1>
        </div>
      );
    };
  }
});
