import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import ResData from "./ResData";
import { RequestConfig as reqConfig, ExtraParamsConfig, defalutOnResponse } from "./config";
export default class HttpService {
    instance: AxiosInstance;
    instanceConfig: reqConfig;
    constructor(config?: reqConfig);
    private request;
    get<T>(url: string, config?: reqConfig, extraParams?: ExtraParamsConfig): Promise<ResData<T>>;
    post<T>(url: string, config?: RequestConfig, extraParams?: ExtraParamsConfig): Promise<ResData<T>>;
    put<T>(url: string, config?: RequestConfig, extraParams?: ExtraParamsConfig): Promise<ResData<T>>;
    del<T>(url: string, config?: RequestConfig, extraParams?: ExtraParamsConfig): Promise<ResData<T>>;
}
export { AxiosRequestConfig, AxiosResponse, defalutOnResponse };
export declare type RequestConfig = reqConfig;
