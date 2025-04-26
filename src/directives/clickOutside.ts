import type { Directive, DirectiveBinding } from 'vue';

declare module 'vue' {
  interface ComponentCustomProperties {
    vClickOutside: Directive;
  }
}

interface HTMLElement {
  clickOutsideEvent: (event: MouseEvent) => void;
  contains(other: HTMLElement | null): boolean;
}

const clickOutside: Directive = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    el.clickOutsideEvent = function (event: MouseEvent) {
      const target = event.target as unknown as HTMLElement;
      if (!(el === target || el.contains(target))) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('click', el.clickOutsideEvent);
  },
};

export { clickOutside };
