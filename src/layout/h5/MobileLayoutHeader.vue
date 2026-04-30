<template>
  <header
    class="relative z-[90] border-b border-[var(--color-header-border)] bg-[var(--color-header-bg)]"
    style="box-shadow: 0 1px 12px rgba(0,0,0,0.07);"
  >
    <div class="flex h-[54px] items-center justify-between gap-2 px-3.5">
      <!-- Logo -->
      <div class="flex shrink-0 items-center">
        <img :src="logoSrc" alt="logo" class="h-7 w-auto object-contain" />
      </div>

      <!-- Right cluster -->
      <div class="flex items-center gap-2">
        <!-- Balance pill -->
        <div
          class="flex items-center gap-1.5 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-soft)] px-2.5 py-1.5 shadow-[0_1px_4px_rgba(0,0,0,0.05)] dark:border-[var(--color-header-border)] dark:bg-[var(--color-surface)]"
        >
          <!-- Avatar ring -->
          <span
            class="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border border-[var(--color-primary-border)] bg-[var(--color-primary-tint)]"
            aria-hidden="true"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-[var(--color-primary)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
          </span>

          <div class="flex flex-col justify-center leading-none">
            <span class="truncate text-[10px] font-medium tracking-wide text-[var(--color-subtle)]">{{ userName }}</span>
            <div class="mt-[2px] flex items-center gap-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 shrink-0 text-[var(--color-balance)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.75 14.5v1h-1.5v-1.02c-1.43-.27-2.53-1.28-2.53-2.73h1.5c0 .83.9 1.5 2.03 1.5 1.13 0 2.03-.67 2.03-1.5 0-.83-.7-1.2-2.1-1.54-1.9-.46-3.46-1.1-3.46-2.96 0-1.38 1.07-2.54 2.53-2.8V7h1.5v1.02c1.43.27 2.5 1.28 2.5 2.73h-1.5c0-.83-.9-1.5-2.03-1.5-1.13 0-2.03.67-2.03 1.5 0 .8.68 1.18 2.1 1.53 1.9.46 3.46 1.12 3.46 2.97 0 1.38-1.07 2.54-2.5 2.75z"/>
              </svg>
              <span class="text-[12px] font-bold tabular-nums text-[var(--color-balance)]">{{ formattedBalance }}</span>
            </div>
          </div>

          <!-- Divider -->
          <div class="mx-0.5 h-5 w-px shrink-0 bg-[var(--color-header-divider)]" aria-hidden="true" />

          <!-- Refresh -->
          <button
            class="group flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[var(--color-header-icon-muted)] transition-colors hover:text-[var(--color-primary)] active:scale-90"
            :aria-label="isRefreshing ? '更新中…' : '更新積分'"
            :disabled="isRefreshing"
            @click="refreshBalance"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5"
              :class="{ 'animate-spin text-[var(--color-primary)]': isRefreshing }"
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

        <!-- Divider -->
        <div class="h-7 w-px shrink-0 bg-[var(--color-header-divider)]" aria-hidden="true" />

        <!-- Theme toggle -->
        <button
          type="button"
          class="group flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[var(--color-primary-border)] bg-[var(--color-primary-tint)] text-[var(--color-primary)] shadow-[0_1px_6px_var(--color-primary-glow)] transition-[transform,box-shadow] hover:shadow-[0_2px_12px_var(--color-primary-glow)] active:scale-95"
          :aria-label="themeStore.isDark ? '切換為淺色系' : '切換為深色系'"
          @click="setThemeMode(themeStore.isDark ? 'light' : 'dark')"
        >
          <svg
            v-if="themeStore.isDark"
            xmlns="http://www.w3.org/2000/svg"
            class="h-[15px] w-[15px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.1"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-[15px] w-[15px]"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M21 14.2A8.6 8.6 0 0 1 9.8 3a7.6 7.6 0 1 0 11.2 11.2z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Balance flash overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      leave-active-class="transition-opacity duration-300 ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showFlash"
        class="pointer-events-none absolute inset-0 bg-[var(--color-primary-tint)]"
        aria-hidden="true"
      />
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useThemeStore } from '@/store/module/theme';

const userName = ref('Player_8821');
const balance  = ref(12_458.75);
const themeStore = useThemeStore();

const logoSrc = computed(() =>
  themeStore.isDark ? '/images/logo-green.png' : '/images/logo.png',
);

const formattedBalance = computed(() =>
  balance.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
);

const isRefreshing = ref(false);
const showFlash    = ref(false);

function setThemeMode(mode: 'light' | 'dark') {
  if (mode === 'dark') {
    themeStore.setDark();
    return;
  }
  themeStore.setLight();
}

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
