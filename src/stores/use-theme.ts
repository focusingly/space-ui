import { DarkNoise, getSystemTheme, LightNoise } from "@/conf/color-design";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { StoreID } from "./store-id";

export const useThemeStore = defineStore(
  StoreID.ThemeStore,
  () => {
    const styleEl = document.createElement("style");
    styleEl.setAttribute("type", "text/css");
    styleEl.innerText = /* css */ `
      :root {
        --dark-bg-noise: url(${DarkNoise});
        --light-bg-noise: url(${LightNoise});
        --theme-bg-noise: var(--light-bg-noise);
      }
      body.dark {
        --theme-bg-noise: var(--dark-bg-noise);
      }
    `.trim();
    document.head.appendChild(styleEl);

    const theme = ref<"auto" | "light" | "dark">("auto");
    const shouldUseTheme = computed(() => {
      if (theme.value === "auto") {
        return getSystemTheme();
      }
      return theme.value === "dark" ? "dark" : "light";
    });

    // 监听设备的颜色模式切换
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
      if (theme.value !== "auto") {
        return;
      }

      document.startViewTransition(() => {
        if (event.matches) {
          document.body.classList.add("dark");
        } else {
          document.body.classList.remove("dark");
        }
      });
    });

    watch(theme, (newVal) => {
      let useDark = false;
      switch (newVal) {
        case "light":
          useDark = false;
          break;
        case "dark":
          useDark = true;
          break;
        case "auto":
        default:
          if (getSystemTheme() === "dark") {
            useDark = true;
          } else {
            useDark = false;
          }
      }

      document.startViewTransition(() => {
        if (useDark) {
          document.body.classList.add("dark");
        } else {
          document.body.classList.remove("dark");
        }
      });

      // document
      //   .startViewTransition(() => {
      //     if (useDark) {
      //       document.body.classList.add("dark");
      //     } else {
      //       document.body.classList.remove("dark");
      //     }
      //   })
      //   .ready.then(() => {
      //     const clipPath = [`inset(0 0 0 0)`, `inset(100% 0 0 0)`];
      //     document.documentElement.animate(
      //       {
      //         easing: "ease-out",
      //         clipPath: clipPath
      //       },
      //       {
      //         duration: 1000,
      //         pseudoElement: useDark ? "::view-transition-old(root)" : "::view-transition-new(root)"
      //       }
      //     );
      //   });
    });

    return {
      theme,
      shouldUseTheme
    };
  },
  {
    persist: {
      storage: window.localStorage
    }
  }
);
