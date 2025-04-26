<template>
  <div :key="reloadKey">
    <TopBar />
    <div class="pt-16">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import TopBar from '@/components/TopBar.vue';

const reloadKey = inject('reloadKey', 0);
</script>
