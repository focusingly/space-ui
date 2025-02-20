import { createNoise } from "@/util/noise";

export const DarkMode = "rgb(29, 29, 30)";
export const LightMode = "rgb(255, 250, 250)";
export const getSystemTheme = () => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  return mediaQuery.matches ? "dark" : "light";
};

export const [DarkNoise, LightNoise] = await Promise.all([createNoise(DarkMode), createNoise(LightMode)]);
