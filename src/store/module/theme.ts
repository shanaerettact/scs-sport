import { apiSrv, errorHandling } from "@/service";
import { darkTheme } from "naive-ui";
import type { BuiltInGlobalTheme } from "naive-ui/es/themes/interface";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const useThemeStore = defineStore('theme-store', () => {
  const theme = ref<BuiltInGlobalTheme | null>(null);
  const isDark = computed(() => theme.value?.name === 'dark');

  const applyHtmlClass = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const setDark = () => {
    theme.value = darkTheme;
    localStorage.setItem('user-theme', 'dark');
    applyHtmlClass();
  };

  const setLight = () => {
    theme.value = null;
    localStorage.setItem('user-theme', 'light');
    applyHtmlClass();
  };

  const initTheme = () => {
    const saved = localStorage.getItem('user-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (saved === 'dark' || (saved === null && prefersDark)) {
      setDark();
    } else {
      setLight();
    }
  };

  return {
    theme,
    isDark,
    setDark,
    setLight,
    applyHtmlClass,
    initTheme
  };
});