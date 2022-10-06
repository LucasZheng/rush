/**
 * 响应数据包装类
 */
export declare class ResData<T = any> {
    httpStatus: number | undefined;
    success: boolean;
    message: string;
    data: T;
    code: string | undefined;
    error: any;
    originData: any;
    headers: any;
    constructor(options: any);
}
export default ResData;
