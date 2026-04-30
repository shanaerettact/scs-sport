import { useBreakpoints } from '@vueuse/core';
import { computed } from 'vue';

// Tailwind 預設斷點
const breakpointsTailwind = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export function useDevice() {
  const breakpoints = useBreakpoints(breakpointsTailwind);

  const isPC = breakpoints.greaterOrEqual('lg');
  const isMobile = computed(() => !isPC.value);

  return { isPC, isMobile };
}
