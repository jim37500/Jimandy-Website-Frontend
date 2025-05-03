import { defineStore } from 'pinia';
import { refreshAccessTokenApi } from '@/service/apis/auth';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const IsLogin = ref(false);

  const setToken = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('refreshToken', refreshToken);
    document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=strict`;
  };

  const getAccessToken = () => {
    return document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('accessToken='))
      ?.split('=')[1];
  };

  const getRefreshToken = () => {
    return localStorage.getItem('refreshToken') || '';
  };

  const removeToken = () => {
    localStorage.removeItem('refreshToken');
    document.cookie = 'accessToken=; path=/; secure; samesite=strict';
  };

  const refreshAccessToken = async () => {
    try {
      const { res } = await refreshAccessTokenApi();

      // 設置新的 access token（7天過期）
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 7);
      document.cookie = `accessToken=${res.accessToken}; expires=${tomorrow.toUTCString()}; path=/`;

      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  };

  const checkLoginStatus = async () => {
    let hasValidToken = !!getAccessToken();

    if (!hasValidToken && getRefreshToken()) {
      hasValidToken = await refreshAccessToken();
    }

    IsLogin.value = hasValidToken;
    return hasValidToken;
  };

  // Initialize login status
  checkLoginStatus();

  return {
    googleClientId,
    IsLogin,
    setToken,
    getAccessToken,
    getRefreshToken,
    removeToken,
    refreshAccessToken,
  };
});
