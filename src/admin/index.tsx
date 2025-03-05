import { useThemeStore } from "@/stores/use-theme";
import { darkTheme, dateZhCN, lightTheme, NConfigProvider, NMessageProvider, zhCN } from "naive-ui";
import { computed, defineComponent } from "vue";
import { AdminWidget } from "./widget";

export const AdminView = defineComponent({
  name: "AdminView",
  setup() {
    const themeStore = useThemeStore();
    const currentTheme = computed(() => {
      return themeStore.shouldUseTheme == "dark" ? darkTheme : lightTheme;
    });

    return () => (
      <NConfigProvider
        locale={zhCN}
        dateLocale={dateZhCN}
        class={`w-full h-full`}
        theme={currentTheme.value}
        themeOverrides={{
          common: {
            fontWeightStrong: "600",
            borderRadius: "6px",
            borderRadiusSmall: "4px",
            primaryColor: "#8EA3E6FF",
            primaryColorHover: "#9EB0EAFF",
            primaryColorPressed: "#718DCFFF",
            primaryColorSuppl: "rgba(104, 125, 196, 1)"
          }
        }}
      >
        <NMessageProvider>
          <AdminWidget />
        </NMessageProvider>
      </NConfigProvider>
    );
  }
});

export default AdminView;
