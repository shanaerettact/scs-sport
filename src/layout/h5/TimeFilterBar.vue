<template>
  <div class="flex items-stretch bg-[var(--color-surface)] border-b border-[var(--color-border-subtle)]">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      type="button"
      class="relative flex flex-1 cursor-pointer items-center justify-center gap-1.5 bg-transparent px-1 py-3 text-[12.5px] font-medium transition-colors duration-200 [-webkit-tap-highlight-color:transparent] hover:text-[var(--color-main)]"
      :class="activeTab === tab.key
        ? 'text-[var(--color-primary)]'
        : 'text-[var(--color-subtle)]'"
      @click="activeTab = tab.key"
      :aria-pressed="activeTab === tab.key"
    >
      <!-- Live pulsing dot for roll tab -->
      <span v-if="tab.key === 'roll'" class="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center" aria-hidden="true">
        <span class="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-[var(--color-live)] opacity-30 motion-reduce:animate-none" />
        <span class="relative inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-live)] shadow-[0_0_6px_rgba(239,68,68,0.65)]" />
      </span>

      <span class="whitespace-nowrap font-semibold tracking-wide">{{ tab.label }}</span>

      <!-- Count badge -->
      <span
        v-if="counts[tab.key] !== undefined && counts[tab.key] > 0"
        class="inline-flex h-[18px] min-w-[18px] shrink-0 items-center justify-center rounded-full px-1.5 text-[10px] font-bold leading-none tracking-tight transition-colors duration-200"
        :class="activeTab === tab.key
          ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
          : tab.key === 'roll'
            ? 'bg-[var(--color-live-bg)] text-[var(--color-live)]'
            : 'bg-[var(--color-surface-hover)] text-[var(--color-subtle)]'"
        :aria-label="`${counts[tab.key]} 場賽事`"
      >{{ counts[tab.key] }}</span>

      <!-- Active underline bar -->
      <span
        class="absolute bottom-0 left-1/2 h-[2.5px] rounded-full bg-[var(--color-primary)] transition-all duration-300"
        :class="activeTab === tab.key
          ? '-translate-x-1/2 w-[60%] opacity-100'
          : '-translate-x-1/2 w-0 opacity-0'"
        aria-hidden="true"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

withDefaults(
  defineProps<{
    counts?: Record<string, number>;
  }>(),
  {
    counts: () => ({}),
  }
);

const activeTab = ref('roll');

const tabs = [
  { key: 'hot',   label: '熱門' },
  { key: 'roll',  label: '滾球' },
  { key: 'today', label: '今日' },
  { key: 'early', label: '早盤' },
];
</script>
