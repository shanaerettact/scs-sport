import { ref, onMounted, onUnmounted } from 'vue';

const nowRef = ref(Date.now());
let timer: ReturnType<typeof setInterval> | null = null;
let counter = 0;

/**
 * 全域共用的時間 Ref，每秒自動更新
 */
export function useNow() {
  counter++;

  onMounted(() => {
    if (!timer) {
      timer = setInterval(() => {
        nowRef.value = Date.now();
      }, 1000);
    }
  });

  onUnmounted(() => {
    counter--;
    if (counter === 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  });

  return nowRef;
}
