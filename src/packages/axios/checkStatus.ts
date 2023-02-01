import type { ErrorMessageMode } from "#/axios";
import { s } from "$locales";
import { ElMessage, ElMessageBox } from "element-plus";
import { removeToken } from "@/utils/token";
import { useUserStoreWithOut } from "@/stores/modules/user";

export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = "message",
): void {
  let errMessage = "";

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page  如果未登录，则跳转到登录页面，并携带当前页面的路径
    // Return to the current page after successful login. This step needs to be operated on the login page. 登录成功后返回当前界面。该步骤需要在登录页面进行操作。
    case 401:
      removeToken();
      errMessage = msg || s("用户没有权限（令牌、用户名、密码错误）!");
      const userStore = useUserStoreWithOut();
      userStore.Logout(true);
      break;
    case 403:
      errMessage = s("用户得到授权，但是访问是被禁止的。!");
      break;
    // 404请求不存在
    case 404:
      errMessage = s("网络请求错误,未找到该资源!");
      break;
    case 405:
      errMessage = s("网络请求错误,请求方法未允许!");
      break;
    case 408:
      errMessage = s("网络请求超时!");
      break;
    case 500:
      errMessage = s("服务器错误,请联系管理员!");
      break;
    case 501:
      errMessage = s("网络未实现!");
      break;
    case 502:
      errMessage = s("网络错误!");
      break;
    case 503:
      errMessage = s("服务不可用，服务器暂时过载或维护!");
      break;
    case 504:
      errMessage = s("网络超时!");
      break;
    case 505:
      errMessage = s("http版本不支持该请求!");
      break;
    default:
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
      ElMessage.error({
        message: errMessage,
      });
    }
  }
}
