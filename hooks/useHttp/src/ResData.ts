/**
 * 响应数据包装类
 */
export class ResData<T = any> {
  httpStatus: number | undefined;

  success = false;

  message = "";

  data: T;

  code: string | undefined;

  error: any;

  originData: any;

  headers: any;

  constructor(options: any) {
    const { headers, status, data, message, originData, error } = options;
    this.headers = headers;
    this.httpStatus = status;
    this.data = data;
    this.message = message;
    this.originData = originData;
    this.error = error;
  }
}

export default ResData;
