import { Layout } from "@/views/layout";
import { defineComponent, onBeforeMount } from "vue";
import "./App.scss";
import { useThemeStore } from "./stores/use-theme";

export const App = defineComponent({
  setup: () => {
    const themeStore = useThemeStore();
    onBeforeMount(() => {
      if (themeStore.shouldUseTheme === "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    });

    return () => <Layout />;
  }
});
