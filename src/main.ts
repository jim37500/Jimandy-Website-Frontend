import './assets/main.css';
import 'primeicons/primeicons.css';
import '@/validation/veeValidate';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import Button from 'primevue/button';
import Tooltip from 'primevue/tooltip';

import App from './App.vue';
import router from './router';
import { i18n } from '@/locale/index';
import { clickOutside } from './directives/clickOutside';

library.add(faGlobe, faUser);

const app = createApp(App);

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e6f0ff',
      100: '#cce0f5',
      200: '#99c2eb',
      300: '#66a3e0',
      400: '#3385d6',
      500: '#0066cc', // 主色，科技藍
      600: '#005cb8',
      700: '#0052a3',
      800: '#00478f',
      900: '#003d7a',
    },
    secondary: {
      50: '#f9f9f9',
      100: '#e5e5e5',
      200: '#cccccc',
      300: '#b3b3b3',
      400: '#999999', // 輔助色，灰色系，用來做區分
      500: '#808080',
      600: '#666666',
      700: '#4d4d4d',
      800: '#333333',
      900: '#1a1a1a',
    },
    accent: {
      50: '#d9f7e7',
      100: '#b3f0d1',
      200: '#80e3b8',
      300: '#4dd59f',
      400: '#1ac78a',
      500: '#00b87e', // 較亮的綠色，用來強調關鍵元素
      600: '#00a471',
      700: '#008c64',
      800: '#007256',
      900: '#005c47',
    },

    success: { 500: '#22c55e' },
    warning: { 500: '#f59e0b' },
    error: { 500: '#ef4444' },
  },
});

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
  },
});

app.use(createPinia());
app.use(router);
app.use(i18n);

app.component('Button', Button);
app.component('FontAwesomeIcon', FontAwesomeIcon);

app.directive('tooltip', Tooltip);
app.directive('click-outside', clickOutside);

app.mount('#app');
