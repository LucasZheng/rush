import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import ResData from "./ResData";

export type ExtraParamsConfig = Record<string, any>;
type CustomerConfig = {
  successCode?: string | number;
  messageFiled?: string;
  onRequest?: (config: RequestConfig) => any;
  onError?: (error: AxiosError) => any;
  onResponse?: (res: AxiosResponse, config: RequestConfig) => any;
  extraParams?: ExtraParamsConfig;
};

export type RequestConfig = AxiosRequestConfig & CustomerConfig;

function getHttpErrorMessage(error: AxiosError) {
  let message = "";
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = "接口重定向了";
        break;
      case 400:
        message = "参数不正确";
        break;
      case 401:
        message = "您未登录，或者登录已经超时，请先登录";
        break;
      case 403:
        message = "您没有权限操作";
        break;
      case 404:
        message = `请求地址出错`;
        break; // 在正确域名下
      case 408:
        message = "请求超时";
        break;
      case 409:
        message = "系统已存在相同数据";
        break;
      case 500:
        message = "服务器内部错误";
        break;
      case 501:
        message = "服务未实现";
        break;
      case 502:
        message = "网关错误";
        break;
      case 503:
        message = "服务不可用";
        break;
      case 504:
        message = "服务暂时无法访问，请稍后再试";
        break;
      case 505:
        message = "HTTP版本不受支持";
        break;
      default:
        message = "异常问题，请联系管理员";
        break;
    }
  }
  if (error.message.includes("timeout")) {
    message = "网络请求超时";
  }
  if (error.message.includes("Network")) {
    message = window.navigator.onLine ? "网络异常" : "您断网了";
  }
  return message;
}

function defalutOnError(error: AxiosError) {
  const message = getHttpErrorMessage(error);
  const resData = new ResData({
    error,
    message,
  });
  resData.success = false;
  return resData;
}

export const BASE_CONFIG = {
  timeout: 30 * 1000,
  successCode: "000000",
  messageFiled: "info",
};

export const DEFAULT_CONFIG = {
  headers: {},
  timeout: BASE_CONFIG.timeout,
  successCode: BASE_CONFIG.successCode,
  messageFiled: BASE_CONFIG.messageFiled,
  onRequest: (config: RequestConfig) => config,
  onResponse: defalutOnResponse,
  onError: defalutOnError,
};

export function defalutOnResponse(
  res: AxiosResponse,
  instanceConfig: RequestConfig
) {
  const { data: originData, status, headers } = res;
  const resData = new ResData({
    headers,
    status,
    originData,
  });

  if (originData) {
    const { data, code } = originData;
    const { successCode, messageFiled } = instanceConfig;
    resData.code = code;
    resData.data = data;
    resData.message = originData[messageFiled || "info"];
    resData.success = code === successCode;
  }
  return resData;
}
