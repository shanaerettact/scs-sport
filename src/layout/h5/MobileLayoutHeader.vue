<template>
  <header
    class="sticky top-0 z-[90] border-b border-black/[0.12] bg-[#0f1213] dark:border-white/[0.08]"
  >
    <div class="flex min-h-[56px] items-center justify-between px-4 py-2">
      <div class="flex shrink-0 items-center">
        <img src="/images/logo.png" alt="logo" class="h-8 w-auto object-contain" />
      </div>

      <div class="flex items-center gap-2">
        <div
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2cd97d]/30 to-[#1a9e5a]/20 ring-1 ring-[#2cd97d]/40"
          aria-hidden="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#2cd97d]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
          </svg>
        </div>

        <div class="flex flex-col justify-center leading-none">
          <span class="text-[11px] font-medium tracking-wide text-white/60">
            {{ userName }}
          </span>
          <div class="mt-[3px] flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 shrink-0 text-[#f5c842]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.75 14.5v1h-1.5v-1.02c-1.43-.27-2.53-1.28-2.53-2.73h1.5c0 .83.9 1.5 2.03 1.5 1.13 0 2.03-.67 2.03-1.5 0-.83-.7-1.2-2.1-1.54-1.9-.46-3.46-1.1-3.46-2.96 0-1.38 1.07-2.54 2.53-2.8V7h1.5v1.02c1.43.27 2.5 1.28 2.5 2.73h-1.5c0-.83-.9-1.5-2.03-1.5-1.13 0-2.03.67-2.03 1.5 0 .8.68 1.18 2.1 1.53 1.9.46 3.46 1.12 3.46 2.97 0 1.38-1.07 2.54-2.5 2.75z"/>
            </svg>
            <span class="text-[13px] font-bold tabular-nums text-[#f5c842]">
              {{ formattedBalance }}
            </span>
          </div>
        </div>

        <div class="mx-0.5 h-7 w-px bg-white/10" aria-hidden="true" />

        <button
          class="group flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-[#2cd97d]/15 active:scale-95"
          :class="{ 'animate-spin-once': isRefreshing }"
          :aria-label="isRefreshing ? '更新中…' : '更新積分'"
          :disabled="isRefreshing"
          @click="refreshBalance"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-white/50 transition-colors group-hover:text-[#2cd97d]"
            :class="{ 'text-[#2cd97d]': isRefreshing }"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
        </button>
      </div>
    </div>

    <Transition name="flash">
      <div
        v-if="showFlash"
        class="pointer-events-none absolute inset-0 bg-[#2cd97d]/5"
        aria-hidden="true"
      />
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const userName = ref('Player_8821');
const balance  = ref(12_458.75);

const formattedBalance = computed(() =>
  balance.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
);

const isRefreshing = ref(false);
const showFlash    = ref(false);

async function refreshBalance() {
  if (isRefreshing.value) return;
  isRefreshing.value = true;

  await new Promise<void>((resolve) => setTimeout(resolve, 900));

  balance.value = parseFloat((Math.random() * 5000 + 10000).toFixed(2));
  isRefreshing.value = false;

  showFlash.value = true;
  setTimeout(() => { showFlash.value = false; }, 400);
}
</script>

<style scoped lang="scss">
header {
  position: relative;
}

@keyframes spin-once {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.animate-spin-once svg {
  animation: spin-once 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.flash-enter-active,
.flash-leave-active {
  transition: opacity 0.3s ease;
}
.flash-enter-from,
.flash-leave-to {
  opacity: 0;
}
.flash-enter-to,
.flash-leave-from {
  opacity: 1;
}
</style>
