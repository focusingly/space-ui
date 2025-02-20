import { router } from "@/router";
import { useThemeStore } from "@/stores/use-theme";
import { Icon } from "@iconify/vue";
import { useCycleList } from "@vueuse/core";
import { computed, defineComponent, watch } from "vue";
import { RouterLink } from "vue-router";

export const SiteHeader = defineComponent({
  name: "SiteHeader",
  setup: () => {
    const themeStore = useThemeStore();
    const { state, next } = useCycleList(["auto", "dark", "light"] as const, {
      initialValue: themeStore.theme
    });
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

    const links = router
      .getRoutes()
      .map((t) => {
        return t.name;
      })
      .filter((t) => t != "NotFound");

    return () => (
      <header
        class={`w-full h-[70px] sticky top-0 flex items-center justify-between backdrop-blur-xl z-40 px-2`}
        style={{
          background: "rgba(246, 246, 246, 0.13)"
        }}
      >
        <nav class={"flex items-center gap-x-5"}>
          {links.map((routeName) => (
            <RouterLink
              key={routeName}
              style={{
                "--underline-color": "rgb(128, 88, 240)"
              }}
              class={"text-zinc-700 dark:text-yellow-50 underline-anime"}
              activeClass={`bg-indigo-300 p-1 py-[2px] rounded-md`}
              to={{
                name: routeName
              }}
            >
              {routeName}
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
