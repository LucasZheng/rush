import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import ResData from "./ResData";

import {
  DEFAULT_CONFIG,
  RequestConfig as reqConfig,
  ExtraParamsConfig,
  defalutOnResponse,
} from "./config";

export default class HttpService {
  // axios 实例
  instance: AxiosInstance;
  // 实例
  instanceConfig: reqConfig;
  constructor(config?: reqConfig) {
    const concatConfig = Object.assign({}, DEFAULT_CONFIG, config);
    this.instance = axios.create(concatConfig);
    this.instanceConfig = concatConfig;

    this.instance.interceptors.request.use((config: reqConfig) => {
      const { onRequest } = config;
      return onRequest ? onRequest(config) : config;
    });

    this.instance.interceptors.response.use(
      (response) => {
        // 响应处理
        if (this.instanceConfig.onResponse) {
          return this.instanceConfig.onResponse(response, this.instanceConfig);
        }
        // 返回axios原始响应数据
        return response;
      },
      (error) => {
        const { onError } = this.instanceConfig;
        return onError ? Promise.reject(onError(error)) : Promise.reject(error);
      }
    );
  }

  private request<T = any>(config: reqConfig): Promise<ResData<T>> {
    return this.instance.request(config);
  }

  public get<T>(
    url: string,
    config?: reqConfig,
    extraParams?: ExtraParamsConfig
  ): Promise<ResData<T>> {
    return this.request({
      ...config,
      method: "get",
      url,
      extraParams,
    });
  }

  public post<T>(
    url: string,
    config?: RequestConfig,
    extraParams?: ExtraParamsConfig
  ): Promise<ResData<T>> {
    return this.request({
      ...config,
      method: "post",
      url,
      extraParams,
    });
  }

  public put<T>(
    url: string,
    config?: RequestConfig,
    extraParams?: ExtraParamsConfig
  ): Promise<ResData<T>> {
    return this.request({
      ...config,
      method: "put",
      url,
      extraParams,
    });
  }

  public del<T>(
    url: string,
    config?: RequestConfig,
    extraParams?: ExtraParamsConfig
  ): Promise<ResData<T>> {
    return this.request({
      ...config,
      method: "delete",
      url,
      extraParams,
    });
  }
}

export { AxiosRequestConfig, AxiosResponse, defalutOnResponse };

export type RequestConfig = reqConfig;
