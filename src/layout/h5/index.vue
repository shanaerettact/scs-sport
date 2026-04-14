<template>
  <div class="h5-layout">
    <!-- Page content area — router-view will render here when children are set up -->
    <main class="h5-content">
      <slot />
    </main>

    <!-- Bottom navigation -->
    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import BottomNav from './BottomNav.vue';
</script>

<style scoped lang="scss">
.h5-layout {
  position: relative;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-color);
}

.h5-content {
  flex: 1;
  /* leave space for the fixed bottom nav (60px bar + safe area) */
  padding-bottom: calc(60px + env(safe-area-inset-bottom, 0px));
  overflow-y: auto;
}
</style>
