export interface ProjectSetting {
  // 项目名
  projectName: string;
  // Load Element-plus on demand
  loadOnDemandEl: boolean;
  // element ui size
  elementSize: string;
}

export interface GlobEnvSetting {
  // Whether to enable multiple languages
  VITE_MULTIPLE_LANGUAGES: string;
  // BASE URL
  VITE_GLOB_API_URL: string;
}


export type LocaleTypeArr = ["zh_CN", "简体中文"] | ["en", "English"];
export type LocaleType = "zh_CN" | "en";
export interface LocaleSetting {
  showPicker: boolean;
  // Current language
  locale: LocaleType;
  // default language
  fallback: LocaleType;
  // available Locales
  availableLocales: LocaleType[];
}