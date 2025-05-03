import { backApiManagerWithRefreshToken, backApiManagerWithoutAuth } from '@/service/apiManager';
import type { ApiHandleSuccessResult } from '@/service/apiManager/types';
import type {
  LoginByGoogleParamsType,
  LoginByGoogleResType,
  RefreshefreshAccessTokenResType,
} from './types';
import { LoginByGoogleResSchema, RefreshAccessTokenResSchema } from './schemas';

export const loginByGoogleApi: (
  params: LoginByGoogleParamsType,
) => Promise<ApiHandleSuccessResult<LoginByGoogleResType>> = (params) => {
  return backApiManagerWithoutAuth<LoginByGoogleResType>('post', '/api/login/', {
    requestOptions: {
      params,
    },
    responseOptions: {
      responseSchema: LoginByGoogleResSchema,
    },
  });
};

export const refreshAccessTokenApi: () => Promise<ApiHandleSuccessResult<RefreshefreshAccessTokenResType>> = () => {
  return backApiManagerWithRefreshToken<RefreshefreshAccessTokenResType>('post', '/api/refresh/', {
    responseOptions: {
      responseSchema: RefreshAccessTokenResSchema,
    },
  });
};

export const logoutApi: () => Promise<ApiHandleSuccessResult<void>> = () => {
  return backApiManagerWithRefreshToken<void>('post', '/api/logout/');
};
