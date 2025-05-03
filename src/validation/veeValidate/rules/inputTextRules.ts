import { i18n } from '@/locale';
import { defineRule } from 'vee-validate';
import { z } from 'zod';
import { isEmpty } from '@/validation/veeValidate/utils';

/**
 * @description 輸入值符合 email 格式
 */
defineRule('email', (value: unknown) => {
  if (isEmpty(value)) {
    return true;
  }

  try {
    const zodEmailRule = z.string().email();
    zodEmailRule.parse(value);
    return true;
  } catch {
    return i18n.global.t('veeValidate.email');
  }
});
