<template>
  <div class="relative flex min-h-dvh flex-col bg-[var(--color-background-color)] dark:bg-[rgb(16,16,20)]">
    <MobileLayoutHeader />
    <main class="flex-1 overflow-y-auto pb-[calc(60px+env(safe-area-inset-bottom,0px))]"></main>

    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import BottomNav from './BottomNav.vue';
import MobileLayoutHeader from './MobileLayoutHeader.vue';
</script>

<script setup lang="ts">

</script>
