<template>
  <header
    class="relative sticky top-0 z-[90] border-b border-[var(--color-header-border)] bg-[var(--color-header-bg)]"
  >
    <div class="flex min-h-[56px] items-center justify-between gap-3 px-4 py-2">
      <div class="flex shrink-0 items-center">
        <img :src="logoSrc" alt="logo" class="h-8 w-auto object-contain" />
      </div>

      <div class="flex min-w-0 flex-1 items-center justify-end gap-2.5">
        <div
          class="flex min-w-0 max-w-full items-center gap-1.5 rounded-2xl border border-[var(--color-border-subtle)] bg-[color-mix(in_srgb,var(--color-header-bg)_94%,var(--color-subtle)_6%)] py-1 pl-1.5 pr-1 shadow-[0_1px_3px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.45)] [backdrop-filter:blur(8px)] dark:border-white/[0.08] dark:bg-white/[0.05] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_2px_12px_rgba(0,0,0,0.25)]"
        >
          <div
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[color-mix(in_srgb,var(--color-primary)_32%,transparent)] to-[color-mix(in_srgb,var(--color-primary)_16%,var(--color-header-bg))] ring-1 ring-[var(--color-primary-border)]/90 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
            aria-hidden="true"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[var(--color-primary)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
          </div>

          <div class="min-w-0 flex flex-col justify-center leading-none pr-0.5">
            <span class="truncate text-[11px] font-medium tracking-wide text-[var(--color-header-muted)]">
              {{ userName }}
            </span>
            <div class="mt-[3px] flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 shrink-0 text-[var(--color-balance)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.75 14.5v1h-1.5v-1.02c-1.43-.27-2.53-1.28-2.53-2.73h1.5c0 .83.9 1.5 2.03 1.5 1.13 0 2.03-.67 2.03-1.5 0-.83-.7-1.2-2.1-1.54-1.9-.46-3.46-1.1-3.46-2.96 0-1.38 1.07-2.54 2.53-2.8V7h1.5v1.02c1.43.27 2.5 1.28 2.5 2.73h-1.5c0-.83-.9-1.5-2.03-1.5-1.13 0-2.03.67-2.03 1.5 0 .8.68 1.18 2.1 1.53 1.9.46 3.46 1.12 3.46 2.97 0 1.38-1.07 2.54-2.5 2.75z"/>
              </svg>
              <span class="text-[13px] font-bold tabular-nums text-[var(--color-balance)]">
                {{ formattedBalance }}
              </span>
            </div>
          </div>

          <div class="h-6 w-px shrink-0 self-center bg-gradient-to-b from-transparent via-[var(--color-header-divider)] to-transparent" aria-hidden="true" />

          <button
            class="group flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-transparent text-[var(--color-header-icon-muted)] transition-[background-color,transform,box-shadow] hover:bg-[var(--color-primary-soft)] active:scale-95"
            :aria-label="isRefreshing ? '更新中…' : '更新積分'"
            :disabled="isRefreshing"
            @click="refreshBalance"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 transition-colors group-hover:text-[var(--color-primary)]"
              :class="{ 'animate-spin-once text-[var(--color-primary)]': isRefreshing }"
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

        <div class="h-9 w-px shrink-0 self-center bg-[var(--color-header-divider)] opacity-70" aria-hidden="true" />

        <button
          type="button"
          class="group relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-primary)_32%,transparent)] bg-gradient-to-br from-[var(--color-primary-tint)] via-[var(--color-header-bg)] to-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-header-bg))] text-[var(--color-primary)] shadow-[0_2px_10px_-2px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.14)] transition-[transform,box-shadow,border-color,background-color] [transition-duration:200ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-[radial-gradient(80%_80%_at_30%_20%,color-mix(in_srgb,var(--color-primary)_22%,transparent),transparent_65%)] before:opacity-0 before:transition-opacity group-hover:shadow-[0_4px_16px_-3px_color-mix(in_srgb,var(--color-primary)_35%,transparent),inset_0_1px_0_rgba(255,255,255,0.18)] group-hover:before:opacity-100 active:scale-[0.96] dark:shadow-[0_2px_14px_-2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] dark:group-hover:shadow-[0_4px_20px_-4px_color-mix(in_srgb,var(--color-primary)_28%,transparent),inset_0_1px_0_rgba(255,255,255,0.1)]"
          :aria-label="themeStore.isDark ? '切換為淺色系' : '切換為深色系'"
          @click="setThemeMode(themeStore.isDark ? 'light' : 'dark')"
        >
          <span class="relative z-[1] flex h-full w-full items-center justify-center">
            <svg
              v-if="themeStore.isDark"
              xmlns="http://www.w3.org/2000/svg"
              class="h-[17px] w-[17px] drop-shadow-[0_0_6px_color-mix(in_srgb,var(--color-primary)_40%,transparent)]"
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
              class="h-[17px] w-[17px] drop-shadow-[0_0_6px_color-mix(in_srgb,var(--color-primary)_35%,transparent)]"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M21 14.2A8.6 8.6 0 0 1 9.8 3a7.6 7.6 0 1 0 11.2 11.2z" />
            </svg>
          </span>
        </button>
      </div>
    </div>

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
