import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import type { Linter } from "eslint";
import pluginVue from "eslint-plugin-vue";

const config: Array<Linter.Config> = [
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue}"]
  },
  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]
  },
  {
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: []
      }
    ]
  },
  ...(pluginVue.configs["flat/essential"] as unknown as any),
  ...vueTsEslintConfig(),
  skipFormatting
];

export default config;
