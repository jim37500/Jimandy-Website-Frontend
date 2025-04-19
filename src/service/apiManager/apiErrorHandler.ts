import type { CustomAxiosError, ErrorOptions } from './types'
// import router from '@/router'

export async function apiErrorHandler(error: CustomAxiosError, errorOptions?: ErrorOptions): Promise<never> {
  if (error.response) {
    const { status, data } = error.response

    // // 處理 401 錯誤：直接導向登入頁
    // if (status === 401) {
    //   localStorage.removeItem('refreshToken')
    //   document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    //   router.push('/login')
    // }

    if (errorOptions?.friendlyMessageByStatusCodeDic && errorOptions.friendlyMessageByStatusCodeDic[status]) {
      console.error(errorOptions.friendlyMessageByStatusCodeDic[status])
    } else {
      console.error(`API Error: ${status}`, data)
    }
  } else {
    console.error('API Error:', error.message)
  }

  throw error
}