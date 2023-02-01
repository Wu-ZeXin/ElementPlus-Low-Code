import type { AxiosResponse } from "axios";
import type { RequestOptions, Result } from "#/axios";
import type { AxiosTransform, CreateAxiosOptions } from "@/packages/axios/axiosTransform";
import axios from "axios";
import { clone } from "lodash-es";
import { VAxios } from "@/packages/axios/Axios";
import { checkStatus } from "@/packages/axios/checkStatus";
import { AxiosRetry } from "@/packages/axios/axiosRetry";
import { joinTimestamp, formatRequestDate } from "@/packages/axios/helper";
import { RequestEnum, ResultEnum, ContentTypeEnum } from "@/enums/httpEnum";
import { deepMerge } from "@/utils";
import { getAppEnvConfig } from "@/utils/env";
import { removeToken, getToken } from "@/utils/token";
import { isString } from "@/utils/is";
import { useUserStoreWithOut } from "$stores/user";
import { ElMessage, ElMessageBox } from "element-plus";
import { s } from "$locales";

const { VITE_GLOB_API_URL } = getAppEnvConfig();

const transform: AxiosTransform = {
  /**
   * @description: 处理响应数据。如果数据不是预期格式，可直接抛出错误
   */
  transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformResponse, isReturnNativeResponse, successMessageMode } = options;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }
    // 错误的时候返回
    const result = res.data;
    if (!result) {
      // return '[HTTP] Request has no return value';
      throw new Error(s("请求出错，请稍后重试"));
    }
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, data, msg } = result;

    // 这里逻辑可以根据项目进行修改
    const hasSuccess = result && Reflect.has(result, "code") && code === ResultEnum.SUCCESS;
    if (hasSuccess) {
      if (successMessageMode === "message") {
        ElMessage({
          message: result.msg,
          type: "success",
        });
      }
      return data;
    }

    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    let timeoutMsg = "";
    switch (code) {
      case ResultEnum.TIMEOUT:
        timeoutMsg = s("登录超时，请重新登录！");
        const userStore = useUserStoreWithOut();
        removeToken();
        userStore.Logout(true);
        break;
      default:
        if (msg) {
          timeoutMsg = msg;
        }
    }

    // token过期的操作
    if (timeoutMsg === "登录过期，请重新登录!") {
      ElMessageBox({
        type: "error",
        title: s("错误提示"),
        message: timeoutMsg,
        confirmButtonText: s("确认"),
        callback: function (action: string) {
          if (action === "confirm") {
            removeToken();
            const userStore = useUserStoreWithOut();
            userStore.Logout(true);
          }
        },
      });
      return;
    }

    // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
    // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
    if (options.errorMessageMode === "modal") {
      if (timeoutMsg === "登录过期，请重新登录!") {
        ElMessageBox({
          type: "error",
          title: s("错误提示"),
          message: timeoutMsg,
          confirmButtonText: s("确认"),
          callback: function (action: string) {
            if (action === "confirm") {
              removeToken();
              const userStore = useUserStoreWithOut();
              userStore.Logout(true);
            }
          },
        });
      } else {
        ElMessageBox({
          type: "error",
          title: s("错误提示"),
          message: timeoutMsg,
          confirmButtonText: s("确认"),
        });
      }
    } else if (options.errorMessageMode === "message") {
      if (timeoutMsg === "登录过期，请重新登录!") {
        ElMessageBox({
          type: "error",
          title: s("错误提示"),
          message: timeoutMsg,
          confirmButtonText: s("确认"),
          callback: function (action: string) {
            if (action === "confirm") {
              removeToken();
              const userStore = useUserStoreWithOut();
              userStore.Logout(true);
            }
          },
        });
      } else {
        ElMessage.error(timeoutMsg);
      }
    }

    throw new Error(timeoutMsg || s("请求出错，请稍后重试"));
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { formatDate, joinTime = true } = options;

    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (
          Reflect.has(config, "data") &&
          config.data &&
          (Object.keys(config.data).length > 0 || config.data instanceof FormData)
        ) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config, options) => {
    // 请求之前处理config
    const token = getToken();
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      // jwt token
      (config as Recordable).headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token;
    }
    return config;
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (axiosInstance: AxiosResponse, error: any) => {
    const { response, code, message, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || "none";
    const msg: string = response?.data?.error?.message ?? "";
    const err: string = error?.toString?.() ?? "";
    let errMessage = "";

    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    try {
      if (code === "ECONNABORTED" && message.indexOf("timeout") !== -1) {
        errMessage = s("接口请求超时，请刷新页面重试！");
      }
      if (err?.includes("Network Error")) {
        errMessage = s("网络异常，请检查您的网络连接是否正常！");
      }

      if (errMessage) {
        if (errorMessageMode === "modal") {
          ElMessageBox({
            type: "error",
            title: s("错误提示"),
            message: errMessage,
            confirmButtonText: s("确认"),
          });
        } else if (errorMessageMode === "message") {
          ElMessage.error(errMessage);
        }
        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error as unknown as string);
    }

    checkStatus(error?.response?.status, msg, errorMessageMode);

    // 添加自动重试机制 保险起见 只针对GET请求
    const retryRequest = new AxiosRetry();
    const { isOpenRetry } = config.requestOptions.retryRequest;
    config.method?.toUpperCase() === RequestEnum.GET &&
      isOpenRetry &&
      // @ts-ignore
      retryRequest.retry(axiosInstance, error);
    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        authenticationScheme: "Bearer",
        timeout: 10 * 1000,
        // 基础接口地址
        baseURL: "basic-api",
        headers: { "Content-Type": ContentTypeEnum.JSON },
        // 数据处理方式 clone——克隆，对象的深拷贝
        transform: clone(transform),

        requestOptions: {
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: "message",
          // 成功请求消息提示
          successMessageMode: "message",
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
          retryRequest: {
            isOpenRetry: true,
            count: 5,
            waitTime: 100,
          },
        },
      },
      opt || {},
    ),
  );
}
export const defHttp = createAxios();
