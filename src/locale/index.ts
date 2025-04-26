import { createI18n } from 'vue-i18n';
import type { I18nOptions } from 'vue-i18n';
import { getDefaultLanguage } from './utils';
import en from './en';
import zhHantTW from './zh-Hant-TW';
import jp from './jp';
const options: I18nOptions = {
  legacy: false, // 使用 Composition API，需要設定為 false
  globalInjection: true, // 將 $i18n 注入到全域，供所有元件使用，不需要額外引入 useI18n
  locale: getDefaultLanguage(),
  fallbackLocale: 'zh-Hant-TW',
  messages: {
    en,
    'zh-Hant-TW': zhHantTW,
    jp,
  },
};

export const i18n = createI18n<false, typeof options>(options);
