import { i18n } from './index';

export function getSystemLanguage() {
  if (navigator.language.startsWith('zh')) {
    return 'zh-Hant-TW';
  } else if (navigator.language.startsWith('ja')) {
    return 'ja';
  } else {
    return 'en';
  }
}

export function updateLocale(newLanguage: string) {
  i18n.global.locale.value = newLanguage || getSystemLanguage();
}

export function getDefaultLanguage() {
  const systemLanguage = getSystemLanguage();
  return systemLanguage;
}
