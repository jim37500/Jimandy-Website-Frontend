import { z } from 'zod';

export type ApiMethod = 'get' | 'delete' | 'post' | 'put' | 'patch';
export interface ApiOptions<ApiResType> {
  requestOptions?: RequestOptions;
  responseOptions?: ResponseOptions<ApiResType>;
  errorOptions?: ErrorOptions;
}

export interface RequestOptions {
  headers?: object;
  params?: object | FormData;
  data?: object | FormData;
  requestId?: string;
  responseType?: string;
  isUseNProgress?: boolean;
}

export interface ResponseOptions<ApiResType> {
  responseSchema?: z.ZodType<ApiResType>;
}

export interface ErrorOptions {
  statusCodeListForCloseGlobalErrorToast?: StatusCodeListForCloseGlobalErrorToastType;
  friendlyMessageByStatusCodeDic?: FriendlyMessageByStatusCodeDic;
}

export type StatusCodeListForCloseGlobalErrorToastType = number[];

export interface FriendlyMessageByStatusCodeDic {
  [statusCode: number]: string;
}

export interface ApiHandleSuccessResult<ApiResType> {
  res: ApiResType;
  headers: object;
}

export interface CustomAxiosError extends Error {
  response?: {
    status: number;
    data: any;
  };
}
