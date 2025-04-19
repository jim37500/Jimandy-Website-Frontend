import { i18n } from './index'

export function getSystemLanguage() {
  return navigator.language.startsWith('zh') ? 'zh-Hant-TW' : 'en'
}

export function updateLocale(newLanguage: string) {
  i18n.global.locale.value = newLanguage || getSystemLanguage()
}

export function getDefaultLanguage() {
  const systemLanguage = getSystemLanguage()
  return systemLanguage
}