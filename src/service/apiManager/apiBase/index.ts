import axios from 'axios';
import NProgress from 'nprogress';
import { z } from 'zod';
import type { ApiOptions, ApiMethod, ApiHandleSuccessResult } from '../types';
import type { CustomAxiosError } from '../types';
import { apiErrorHandler } from '../apiErrorHandler';

// 為了讓各 method 使用起來一致
const baseAxiosMethod = {
  get(path: string, queryParams: object | undefined, config: object | undefined) {
    return axios.get(path, { params: queryParams, ...config });
  },
  delete(path: string, bodyParams: object | undefined, config: object | undefined) {
    return axios.delete(path, { data: bodyParams, ...config });
  },
  post(path: string, bodyParams: object | undefined, config: object | undefined) {
    return axios.post(path, bodyParams, config);
  },
  put(path: string, bodyParams: object | undefined, config: object | undefined) {
    return axios.put(path, bodyParams, config);
  },
  patch(path: string, bodyParams: object | undefined, config: object | undefined) {
    return axios.patch(path, bodyParams, config);
  },
};

/**
 * 基礎 API 處理函數
 */
export async function handleBaseApi<ApiResType>(
  apiDomain: string,
  method: ApiMethod,
  path: string,
  apiOptions: ApiOptions<ApiResType> = {},
  getAuthHeader?: () => Promise<{ Authorization: string } | null>,
): Promise<ApiHandleSuccessResult<ApiResType>> {
  try {
    if (apiOptions.requestOptions?.isUseNProgress) {
      NProgress.start();
    }

    // 合併請求配置
    const mergedApiOptions: ApiOptions<ApiResType> = { ...apiOptions };

    // 如果需要認證，添加認證 header
    if (getAuthHeader) {
      const authHeader = await getAuthHeader();
      if (!authHeader) {
        throw new Error('No auth token found');
      }
      mergedApiOptions.requestOptions = {
        ...mergedApiOptions.requestOptions,
        headers: {
          ...mergedApiOptions.requestOptions?.headers,
          ...authHeader,
        },
      };
    }

    const axiosConfig = _handleAxiosConfig(mergedApiOptions);
    const { data, headers } = await baseAxiosMethod[method](`${apiDomain}${path}`, mergedApiOptions.requestOptions?.data || mergedApiOptions.requestOptions?.params, axiosConfig);

    // 對 api response 進行驗證
    if (mergedApiOptions.responseOptions?.responseSchema) {
      _checkApiResponseType({
        response: data,
        assertSchema: mergedApiOptions.responseOptions.responseSchema,
      });
    }

    return { res: data, headers };
  } catch (e) {
    throw apiErrorHandler(e as CustomAxiosError, apiOptions.errorOptions);
  } finally {
    if (apiOptions.requestOptions?.isUseNProgress) {
      NProgress.done();
    }
  }
}

function _handleAxiosConfig<ApiResType>(apiOptions: ApiOptions<ApiResType>) {
  const config: {
    headers?: object;
    onUploadProgress?: (progressEvent: ProgressEvent) => void;
    responseType?: string;
  } = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (apiOptions.requestOptions?.headers) {
    config.headers = {
      ...config.headers,
      ...apiOptions.requestOptions.headers,
    };
  }

  if (apiOptions.requestOptions?.isUseNProgress) {
    config.onUploadProgress = ({ loaded, total }: ProgressEvent) => {
      NProgress.inc(Math.floor(loaded * 1.0) / total);
    };
  }

  if (apiOptions.requestOptions?.responseType) {
    config.responseType = apiOptions.requestOptions.responseType;
  }

  return config;
}

function _checkApiResponseType<ApiResType>({ response, assertSchema }: { response: ApiResType; assertSchema: z.ZodType<ApiResType> }) {
  const checkResTypeSafe = assertSchema.safeParse(response);
  if (!checkResTypeSafe.success) {
    console.error('api response type error：', checkResTypeSafe);
  }
}
