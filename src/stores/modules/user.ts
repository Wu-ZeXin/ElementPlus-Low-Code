import Cookies from "js-cookie";

import { getToken, setToken, removeToken } from "@/utils/token";
import { defineStore } from "pinia";

import { login, logout } from "@/api/user";
import router from "@/router";
import { store } from "@/stores";
import { LoginEnum } from "@/enums/storageEnum";
interface LoginParams {
  username: string | undefined;
  password: string | undefined;
}

export const useUserStore = defineStore({
  id: "user-store",

  state: () => ({
    token: getToken(),
  }),

  getters: {},

  actions: {
    // 登录
    async Login(params: LoginParams, checked: boolean) {
      if (checked) {
        Cookies.set(LoginEnum.USERNAME, params.username as string, {
          expires: 7, // 有效期7天
        });
        Cookies.set(LoginEnum.PASSWORD, params.password as string, {
          expires: 7,
        });
        Cookies.set(LoginEnum.REMEMBERME, checked === true ? "true" : "false", {
          expires: 7,
        });
      } else {
        Cookies.remove(LoginEnum.USERNAME);
        Cookies.remove(LoginEnum.PASSWORD);
        Cookies.remove(LoginEnum.REMEMBERME);
      }
      const res = await login(params);
      setToken(res.token);
      Cookies.set(LoginEnum.USERNAME, params.username as string);
      this.token = res.token;
      return res;
    },
    // 退出
    async Logout(goLogin = false) {
      if (getToken()) {
        try {
          await logout();
        } catch {
          console.log("注销Token失败");
        }
      }
      sessionStorage.clear();
      removeToken();
      goLogin &&
        router.push({
          name: "Login",
        });
    },
  },
});

export function useUserStoreWithOut() {
  return useUserStore(store);
}
