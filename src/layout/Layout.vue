<template>
  <template v-if="isPC">
    <LayoutPc />
  </template>
  <template v-if="isMobile">
    <LayoutMobile />
  </template>

</template>

<script lang="ts" setup>
import { useDevice } from '@/composables/useDevice';
import LayoutPc from '@/layout/pc/Layout.vue';
import LayoutMobile from '@/layout/mobile/Layout.vue';

const { isPC, isMobile } = useDevice();
</script>

<style scoped lang="scss"></style>
