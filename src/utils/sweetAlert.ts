import type { SweetAlertIcon } from 'sweetalert2';
import Swal from 'sweetalert2';
import { i18n } from '@/locale';

const { t } = i18n.global;

export const showAlert = (title: string, icon: SweetAlertIcon = 'info', timer = 1000) => {
  return Swal.fire({ title, icon, timer });
};

export const showConfirm = (title: string, text?: string) => {
  return Swal.fire({
    icon: 'question',
    title,
    text,
    showCancelButton: true,
    confirmButtonText: t('sweetAlert.common.confirm'),
    cancelButtonText: t('sweetAlert.common.cancel'),
  });
};

export const showLoading = (title: string) => {
  return Swal.fire({
    title,
    timerProgressBar: true,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const closeSweetalert = () => {
  setTimeout(() => {
    Swal.close();
  }, 1000);
};
