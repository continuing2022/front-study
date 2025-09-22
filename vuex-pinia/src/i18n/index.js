import { createI18n } from "vue-i18n";
import zh from "./lang/zh";
import en from "./lang/en";

const messages={
  zh,
  en
}
const i18n = createI18n({
  locale: localStorage.getItem("locale") || "zh", // 设置默认语言
  fallbackLocale: "en", // 设置回退语言
  messages, // 设置语言包
});
export default i18n;