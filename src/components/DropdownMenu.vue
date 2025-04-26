<template>
  <div
    class="cursor-pointer relative"
    v-click-outside="closeMenu"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div @click="handleClick">
      <slot name="trigger"></slot>
    </div>
    <div
      v-if="isVisible"
      :class="[
        'absolute top-full min-w-40 mt-2 py-2 bg-gray-800 rounded-md shadow-lg whitespace-nowrap',
        alignment === 'left' ? 'left-0' : 'right-0',
      ]"
    >
      <div
        v-for="item in items"
        :key="item.label"
        @click="handleItemClick(item.command)"
        class="flex items-center text-lg px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 ease-in-out transform hover:scale-105"
      >
        <i v-if="item.icon" :class="item.icon" class="!mr-2 text-lg"></i>
        <span class="truncate">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface MenuItem {
  label: string;
  icon?: string;
  command: () => void;
}

const props = defineProps<{
  items: MenuItem[];
  triggerType?: 'click' | 'hover';
  alignment?: 'left' | 'right';
}>();

const isVisible = ref(false);

const closeMenu = () => {
  isVisible.value = false;
};

const handleClick = () => {
  if (props.triggerType === 'click') {
    isVisible.value = !isVisible.value;
  }
};

const handleMouseEnter = () => {
  if (props.triggerType === 'hover') {
    isVisible.value = true;
  }
};

const handleMouseLeave = () => {
  if (props.triggerType === 'hover') {
    isVisible.value = false;
  }
};

const handleItemClick = (command: () => void) => {
  command();
  closeMenu();
};
</script>
