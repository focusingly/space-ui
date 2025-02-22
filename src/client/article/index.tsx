import { Posts } from "@/components/posts";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Article",
  setup() {
    return () => (
      <div class={`w-full`}>
        <Posts />
      </div>
    );
  }
});
