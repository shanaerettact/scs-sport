import { createI18n } from "vue-i18n";
import zh_cn from "./i18n/zh-cn.json";
import en from "./i18n/en.json";

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') ?? 'zh_cn',
  fallbackLocale: "en",
  messages: {
    en,
    zh_cn
  },
});

export default i18n;