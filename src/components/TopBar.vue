<template>
  <div class="min-h-full">
    <!-- 桌機版 TopBar -->
    <nav class="bg-gray-800 w-full fixed z-10 hidden md:block">
      <div class="w-full flex justify-center">
        <div class="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0 cursor-pointer" @click="navigateTo('/')">
                <img class="size-10 rounded-full" src="@/assets/images/JimAndy.png" alt="Your Company" />
              </div>
              <div class="hidden md:block">
                <div class="ml-2 flex items-center">
                  <div class="px-3 py-2 font-medium text-2xl cursor-pointer text-yellow-500" @click="navigateTo('/')">
                    JAGrowth
                  </div>
                  <div
                    :class="determineNavbarItemClass('/my-sports')"
                    @click="navigateTo('/my-sports')"
                  >
                    {{ t('mySports') }}
                  </div>
                  <DropdownMenu :items="articleMenuItems" triggerType="hover" alignment="left">
                    <template #trigger>
                      <div :class="determineNavbarItemClass('/article-share')">
                        {{ t('articleShare') }}
                      </div>
                    </template>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-8">
              <DropdownMenu :items="languageMenuItems" triggerType="click" alignment="right">
                <template #trigger>
                  <FontAwesomeIcon :icon="['fas', 'globe']" class="text-white text-2xl" />
                </template>
              </DropdownMenu>
              <DropdownMenu :items="userMenuItems" triggerType="click" alignment="right">
                <template #trigger>
                  <FontAwesomeIcon :icon="['far', 'user']" class="text-white text-2xl" />
                </template>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- 手機版 TopBar -->
    <nav class="bg-gray-800 w-full fixed z-10 md:hidden">
      <div class="flex items-center justify-between h-16 px-4">
        <!-- 左側 Logo -->
        <div
          class="flex items-center h-16 flex-shrink-0 cursor-pointer"
          @click="handleMobileMenuClick(() => navigateTo('/'))"
        >
          <img class="size-10 rounded-full my-auto" src="@/assets/images/JimAndy.png" alt="Your Company" />
        </div>
        <!-- 右側語言選擇與漢堡選單 -->
        <div class="flex items-center gap-4">
          <DropdownMenu class="pt-1" :items="languageMenuItems" triggerType="click" alignment="right">
            <template #trigger>
              <FontAwesomeIcon :icon="['fas', 'globe']" class="text-white text-2xl" />
            </template>
          </DropdownMenu>
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="focus:outline-none">
            <svg
              v-if="!isMobileMenuOpen"
              class="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              v-else
              class="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
      <!-- 窗簾選單，覆蓋 TopBar 下方 -->
      <transition name="curtain">
        <div
          v-if="isMobileMenuOpen"
          class="fixed left-0 right-0 top-16 bottom-0 z-20 bg-gray-800 bg-opacity-95 flex flex-col p-4"
        >
          <div class="flex flex-col gap-2">
            <div
              :class="determineNavbarItemClass('/')"
              @click="handleMobileMenuClick(() => navigateTo('/'))"
            >
              {{ t('home') }}
            </div>
            <div
              :class="determineNavbarItemClass('/my-sports')"
              @click="handleMobileMenuClick(() => navigateTo('/my-sports'))"
            >
              {{ t('mySports') }}
            </div>
            <div :class="determineNavbarItemClass('/article-share')">
              {{ t('articleShare') }}
            </div>
            <div class="pl-4 flex flex-col gap-1 mb-4">
              <div
                :class="determineNavbarItemClass('/sports-notes')"
                @click="handleMobileMenuClick(() => navigateTo('/sports-notes'))"
              >
                {{ t('sportsNotes') }}
              </div>
              <div
                :class="determineNavbarItemClass('/coding-notes')"
                @click="handleMobileMenuClick(() => navigateTo('/coding-notes'))"
              >
                {{ t('codingNotes') }}
              </div>
              <div
                :class="determineNavbarItemClass('/reading-notes')"
                @click="handleMobileMenuClick(() => navigateTo('/reading-notes'))"
              >
                {{ t('readingNotes') }}
              </div>
            </div>
            <div class="border-t border-gray-600 my-2"></div>
            <div class="flex items-center gap-3 px-3 py-2">
              <FontAwesomeIcon :icon="['far', 'user']" class="text-white text-2xl" />
              <span class="text-gray-300">{{ t('notLogin') }}</span>
            </div>
            <div class="text-gray-300 px-3 py-2 text-lg cursor-pointer" @click="handleMobileMenuClick(login)">
              {{ t('login') }}
            </div>
          </div>
        </div>
      </transition>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { updateLocale } from '@/locale/utils';
import DropdownMenu from './DropdownMenu.vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const { t } = useI18n();
const router = useRouter();

const isMobileMenuOpen = ref(false);

// 提供一個重新渲染的觸發器
const reloadKey = ref(0);
provide('reloadKey', reloadKey);

const articleMenuItems = computed(() => [
  {
    label: t('sportsNotes'),
    icon: 'pi pi-book',
    command: () => navigateTo('/sports-notes'),
  },
  {
    label: t('codingNotes'),
    icon: 'pi pi-code',
    command: () => navigateTo('/coding-notes'),
  },
  {
    label: t('readingNotes'),
    icon: 'pi pi-bookmark',
    command: () => navigateTo('/reading-notes'),
  },
]);

const languageMenuItems = ref([
  {
    label: 'English',
    command: () => setLanguage('en'),
  },
  {
    label: '繁體中文',
    command: () => setLanguage('zh-Hant-TW'),
  },
  {
    label: '日本語',
    command: () => setLanguage('jp'),
  },
]);

const userMenuItems = computed(() => [
  {
    label: t('login'),
    icon: 'pi pi-sign-in',
    command: () => login(),
  },
]);

const setLanguage = (language: string) => {
  updateLocale(language);
  reloadKey.value += 1;
};

const login = () => {
  console.log('login');
};

const navigateTo = (path: string) => {
  router.push(path);
};

const isRouteActive = (path: string) => {
  if (path === '/') {
    return router.currentRoute.value.path === '/';
  }

  return router.currentRoute.value.path.includes(path);
};

const determineNavbarItemClass = (path: string) => {
  if (isRouteActive(path)) {
    return 'narbar-item-active';
  }

  return 'narbar-item-inactive';
};

const handleMobileMenuClick = (fn: () => void) => {
  isMobileMenuOpen.value = false;
  setTimeout(fn, 200); // 等動畫結束再執行
};
</script>

<style scoped>
@reference "../assets/main.css";

.narbar-item-active {
  @apply rounded-md bg-gray-900 px-3 py-2 ml-2 text-lg font-medium text-white cursor-pointer;
}

.narbar-item-inactive {
  @apply rounded-md px-3 py-2 ml-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer;
}

.curtain-enter-active,
.curtain-leave-active {
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.2s;
  overflow: hidden;
}
.curtain-enter-from,
.curtain-leave-to {
  transform: scaleY(0);
  opacity: 0;
  transform-origin: top;
}
.curtain-enter-to,
.curtain-leave-from {
  transform: scaleY(1);
  opacity: 1;
  transform-origin: top;
}
</style>
