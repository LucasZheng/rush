import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import ResData from "./ResData";
export declare type ExtraParamsConfig = Record<string, any>;
declare type CustomerConfig = {
    successCode?: string | number;
    messageFiled?: string;
    onRequest?: (config: RequestConfig) => any;
    onError?: (error: AxiosError) => any;
    onResponse?: (res: AxiosResponse, config: RequestConfig) => any;
    extraParams?: ExtraParamsConfig;
};
export declare type RequestConfig = AxiosRequestConfig & CustomerConfig;
declare function defalutOnError(error: AxiosError): ResData<any>;
export declare const BASE_CONFIG: {
    timeout: number;
    successCode: string;
    messageFiled: string;
};
export declare const DEFAULT_CONFIG: {
    headers: {};
    timeout: number;
    successCode: string;
    messageFiled: string;
    onRequest: (config: RequestConfig) => RequestConfig;
    onResponse: typeof defalutOnResponse;
    onError: typeof defalutOnError;
};
export declare function defalutOnResponse(res: AxiosResponse, instanceConfig: RequestConfig): ResData<any>;
export {};
