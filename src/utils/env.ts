import type { GlobEnvSetting } from "#/setting";

import { getConfigFileName } from "../../build/utils";

export function getMultipleLanguages() {
  const { VITE_MULTIPLE_LANGUAGES } = getAppEnvConfig();
  return VITE_MULTIPLE_LANGUAGES;
}

export function getAppEnvConfig() {
  const ENV_NAME = getConfigFileName(import.meta.env);

  const ENV = (import.meta.env.DEV
    ? // Get the global configuration (the configuration will be extracted independently when packaging)
    (import.meta.env as unknown as GlobEnvSetting)
    : window[ENV_NAME as any]) as unknown as GlobEnvSetting;

  const { VITE_MULTIPLE_LANGUAGES, VITE_GLOB_API_URL } = ENV;

  return {
    VITE_MULTIPLE_LANGUAGES,
    VITE_GLOB_API_URL,
  };
}
