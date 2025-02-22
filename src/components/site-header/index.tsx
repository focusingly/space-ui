import { router } from "@/router";
import { ClientRoute } from "@/router/routes/client";
import { useThemeStore } from "@/stores/use-theme";
import { Icon } from "@iconify/vue";
import { useCycleList } from "@vueuse/core";
import { computed, defineComponent, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";

export const SiteHeader = defineComponent({
  name: "SiteHeader",
  setup: () => {
    const themeStore = useThemeStore();
    const { state, next } = useCycleList(["auto", "dark", "light"] as const, {
      initialValue: themeStore.theme
    });
    const routes = ClientRoute.children;
    const route = useRoute();

    watch(state, (val) => {
      themeStore.theme = val;
    });

    const icon = computed(() => {
      switch (state.value) {
        case "auto":
          return "material-symbols:laptop-windows-outline-rounded";
        case "dark":
          return "material-symbols:dark-mode";
        case "light":
        default:
          return "material-symbols:sunny-rounded";
      }
    });

    return () => (
      <header
        class={`w-full h-[70px] sticky top-0 flex items-center justify-between backdrop-blur-xl z-40 px-2`}
        style={{
          background: "rgba(246, 246, 246, 0.13)"
        }}
      >
        <nav class={"flex items-center gap-x-5"}>
          {routes?.map((t) => (
            <RouterLink to={t.path} key={t.path}>
              {t.name}
            </RouterLink>
          ))}
        </nav>
        <button onClick={() => next()} class={`rounded-lg border dark:text-zinc-400 select-none p-1`}>
          <Icon icon={icon.value} width={20} height={20} class={`select-none touch-none`} />
        </button>
      </header>
    );
  }
});
