import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  setup() {
    return () => (
      <div class={`w-full h-full`}>
        <img src="/favicon.svg" alt="" class={`w-[100px] rounded-full`} />
      </div>
    );
  }
});
