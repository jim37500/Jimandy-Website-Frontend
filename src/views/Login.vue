<template>
  <div>
    <TopBar />
    <div class="pt-16 flex justify-center items-center min-h-[60vh]">
      <Card class="w-full max-w-md">
        <template #title>{{ t('Login.login') }}</template>
        <template #content>
          <div ref="GoogleButton" />
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import TopBar from '@/components/TopBar.vue';
import { loginByGoogleApi } from '@/service/apis/auth';
import { useI18n } from 'vue-i18n';
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Card from 'primevue/card';
import { showAlert } from '@/utils/sweetAlert';

const { t, locale } = useI18n();
const authStore = useAuthStore();
const GoogleButton = ref(null);

const router = useRouter();

const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  );
  return JSON.parse(jsonPayload);
};

const handleCredentialResponse = (response: any) => {
  const decodedToken = parseJwt(response.credential);

  loginByGoogleApi({
    Name: decodedToken.name,
    Email: decodedToken.email,
  })
    .then((res) => {
      authStore.setToken(res.res.accessToken, res.res.refreshToken);
      authStore.IsLogin = true;
      router.push('/');
    })
    .catch(() => {
      showAlert(t('Login.loginFailed'), 'error');
    });
};

declare const google: any;

const setGoogleLocale = () => {
  if (locale.value === 'en') {
    return 'en';
  } else if (locale.value === 'ja') {
    return 'ja';
  } else {
    return 'zh-TW';
  }
};

const initializeGoogleLogin = () => {
  google.accounts.id.initialize({
    client_id: authStore.googleClientId,
    callback: handleCredentialResponse,
    use_fedcm_for_prompt: true,
  });
  google.accounts.id.renderButton(GoogleButton.value, { theme: 'outline', size: 'large' });
};

const setGoogleSdk = () => {
  const googleScript = document.createElement('script');
  googleScript.src = `https://accounts.google.com/gsi/client?hl=${setGoogleLocale()}`;
  googleScript.async = true;
  googleScript.defer = true;
  googleScript.onload = initializeGoogleLogin;
  document.head.appendChild(googleScript);
};

const removeGoogleScript = () => {
  const oldScript = document.querySelector('script[src^="https://accounts.google.com/gsi/client"]');
  if (oldScript) {
    oldScript.remove();
  }
};

onMounted(() => {
  setGoogleSdk();
});

watch(locale, () => {
  removeGoogleScript();
  setGoogleSdk();
});
</script>
