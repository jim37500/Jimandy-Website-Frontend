import { handleBaseApi } from './apiBase';
// import { verifyRefreshTokenApi } from '../apis/auth';
import type { ApiOptions, ApiMethod, ApiHandleSuccessResult } from './types';
// import type { CustomAxiosError } from './types';

const backApiUrl = import.meta.env.VITE_BACK_API_URL;

/**
 * API Manager
 * 依照 API server, 驗證方式選擇所需的 api manager，並傳入 method, path，以及可選的 apiOptions
 * apiOptions 可調整 requestOptions、responseOptions、errorOptions
 * @param requestOptions - 請求相關調整
 *                       headers - 請求 headers
 *                       params - 請求參數內容
 *                       requestId - 請求 ID，用以辨識多個相同請求
 *                       responseType - 回應類型
 *                       isUseNProgress - 是否使用 NProgress 進度條
 * @param responseOptions - 回應相關調整
 *                        responseSchema - response schema 定義，用以驗證 response 格式，發生錯誤時目前僅軟性提示 (console.warn)
 * @param errorOptions - 錯誤相關調整，僅可調整 regularError Status Code
 *                       statusCodeListForCloseGlobalErrorToast - 關閉特定 Status Code 的 Toast 錯誤提示，用以特例處理
 *                       friendlyMessageByStatusCodeDic - 自定義 Status Code 的錯誤提示
 * @example
 * backApiManagerWithAccessToken('post', '/test/',{
 *    requestOptions:{
 *       params:{
 *          page: 1
 *       },
 *       isUseNProgress: true,
 *    },
 *    errorOptions:{
 *      friendlyMessageByStatusCodeDic:{
 *        406: 'xxx 欄位填寫錯誤，請再次確認'
 *        409: '重複建立 xxx 相同項目，請再次確認'
 *      }
 *    }
 * });
 */

// 不需要認證的 API 請求
export async function handleWithoutAuthApi<ApiResType>(
  apiDomain: string,
  method: ApiMethod,
  path: string,
  apiOptions: ApiOptions<ApiResType> = {},
): Promise<ApiHandleSuccessResult<ApiResType>> {
  return handleBaseApi(apiDomain, method, path, apiOptions);
}

// 需要 refresh token 認證的 API 請求
export async function handleRefreshTokenApi<ApiResType>(
  apiDomain: string,
  method: ApiMethod,
  path: string,
  apiOptions: ApiOptions<ApiResType> = {},
): Promise<ApiHandleSuccessResult<ApiResType>> {
  const getRefreshTokenHeader = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return null;
    return { Authorization: `Bearer ${refreshToken}` };
  };

  return handleBaseApi(apiDomain, method, path, apiOptions, getRefreshTokenHeader);
}

// 需要 access token 認證的 API 請求
export async function handleAccessTokenApi<ApiResType>(
  apiDomain: string,
  method: ApiMethod,
  path: string,
  apiOptions: ApiOptions<ApiResType> = {},
): Promise<ApiHandleSuccessResult<ApiResType>> {
  const getAccessTokenHeader = async () => {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith('accessToken='));
    const accessToken = tokenCookie ? tokenCookie.split('=')[1] : null;
    if (!accessToken) return null;
    return { Authorization: `Bearer ${accessToken}` };
  };

  try {
    return await handleBaseApi(apiDomain, method, path, apiOptions, getAccessTokenHeader);
  } catch (error) {
    // 如果是 401 錯誤，嘗試刷新 token 後重試
    // if ((error as CustomAxiosError).response?.status === 401) {
    //   const { res } = await verifyRefreshTokenApi();

    //   // 設置新的 access token
    //   const tomorrow = new Date();
    //   tomorrow.setDate(tomorrow.getDate() + 7);
    //   document.cookie = `accessToken=${res.access_token}; expires=${tomorrow.toUTCString()}; path=/`;

    //   // 使用新的 access token 重試原始請求
    //   return handleAccessTokenApi(apiDomain, method, path, apiOptions);
    // }
    throw error;
  }
}

export function backApiManagerWithRefreshToken<ApiResType>(
  method: ApiMethod,
  path: string,
  apiOptions: ApiOptions<ApiResType> = {},
): Promise<ApiHandleSuccessResult<ApiResType>> {
  return handleRefreshTokenApi(backApiUrl, method, path, apiOptions);
}

export function backApiManagerWithAccessToken<ApiResType>(
  method: ApiMethod,
  path: string,
  apiOptions: ApiOptions<ApiResType> = {},
): Promise<ApiHandleSuccessResult<ApiResType>> {
  return handleAccessTokenApi(backApiUrl, method, path, apiOptions);
}

export function backApiManagerWithoutAuth<ApiResType>(
  method: ApiMethod,
  path: string,
  apiOptions: ApiOptions<ApiResType> = {},
): Promise<ApiHandleSuccessResult<ApiResType>> {
  return handleWithoutAuthApi(backApiUrl, method, path, apiOptions);
}
