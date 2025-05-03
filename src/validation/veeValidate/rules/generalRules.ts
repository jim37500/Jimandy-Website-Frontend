/**
 * @description 任何 component 都通用的 rules
 */

import { i18n } from '@/locale';
import { defineRule } from 'vee-validate';
import { isEmpty } from '@/validation/veeValidate/utils';

/**
 * @description 欄位必填
 */
defineRule('required', (value: unknown) => {
  if (isEmpty(value)) {
    return i18n.global.t('veeValidate.required');
  } else {
    return true;
  }
});
