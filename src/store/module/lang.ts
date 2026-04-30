import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { zhCN, enUS, dateZhCN, dateEnUS } from 'naive-ui';

export const useLangStore = defineStore('lang', () => {
  const { locale } = useI18n();

  // 初始語系
  const current = ref(localStorage.getItem('lang') || 'zh_cn');

  // Naive UI 對應語系
  const naiveLocale = computed(() => {
    return current.value === 'zh_cn' ? zhCN : enUS;
  });
  const naiveDateLocale = computed(() => {
    return current.value === 'zh_cn' ? dateZhCN : dateEnUS;
  });

  // 切換語系
  const setLang = (lang: string) => {
    current.value = lang;
    locale.value = lang;
    localStorage.setItem('lang', lang);
  };

  // 初始化
  const initLang = () => {
    const savedLang = localStorage.getItem('lang') || 'zh_cn';
    setLang(savedLang);
  };

  return {
    current,
    naiveLocale,
    naiveDateLocale,
    setLang,
    initLang
  };
});
