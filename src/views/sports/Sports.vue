<template>
  <template v-if="isPC">
    <SportPC />
  </template>
  <template v-if="isMobile">
    <SportMobile />
  </template>
</template>

<script setup lang="ts">
import SportPC from '@/views/sports/pc/Sport.vue';
import SportMobile from '@/views/sports/mobile/Sport.vue';
import { useDevice } from '@/composables/useDevice';


const { isPC, isMobile } = useDevice();
</script>

<style lang="scss" scoped></style>