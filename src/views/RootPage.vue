<template>
  <div>
    <TopBar />
    <div class="pt-16">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import TopBar from '@/components/TopBar.vue';
</script>
