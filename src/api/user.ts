import { defHttp } from "@/packages/axios";

import type { ErrorMessageMode } from "#/axios";
// 登录
export function login(params = {}, mode: ErrorMessageMode = "modal") {
  return defHttp.post(
    {
      url: "/login",
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
// 退出
export function logout(params = {}, mode: ErrorMessageMode = "modal") {
  return defHttp.post(
    {
      url: "/logout",
    },
    {
      errorMessageMode: mode,
    },
  );
}
