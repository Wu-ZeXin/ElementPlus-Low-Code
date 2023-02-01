import { useLocaleStoreWithOut } from "$stores/locale";
import { i18n } from "@/locales/setupI18n";

const { t } = i18n.global;

const locale = useLocaleStoreWithOut().getLocale;

export function s(word: string) {
  return locale === "zh_CN" ? word : t(word);
}
