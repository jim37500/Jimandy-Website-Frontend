import './assets/main.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

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

app.use(PrimeVue, {
  theme: {
    preset: Aura,
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
