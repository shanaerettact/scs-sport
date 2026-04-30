<template>
  <div class="flex items-stretch border-b border-[var(--color-surface-hover)] bg-transparent">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      type="button"
      class="flex flex-1 cursor-pointer items-center justify-center gap-1.5 border-b-2 border-transparent bg-transparent px-1 py-[11px] text-[13px] font-medium text-[var(--color-subtle)] transition-[color,border-color,font-weight] duration-200 [-webkit-tap-highlight-color:transparent] hover:text-[var(--color-main)]"
      :class="tabButtonClass(tab.key)"
      @click="activeTab = tab.key"
      :aria-pressed="activeTab === tab.key"
    >
      <span v-if="tab.key === 'roll'" class="relative flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center" aria-hidden="true">
        <span
          class="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-red-500/50 motion-reduce:animate-none"
        />
        <span
          class="relative inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-[0_0_6px_rgba(239,68,68,0.7)] animate-time-tab-blink motion-reduce:animate-none motion-reduce:opacity-100"
        />
      </span>
      <span class="whitespace-nowrap">{{ tab.label }}</span>
      <span
        v-if="counts[tab.key] !== undefined && counts[tab.key] > 0"
        class="inline-flex h-4 min-w-[18px] flex-shrink-0 items-center justify-center rounded-full px-1.5 text-[10px] font-bold leading-none tracking-normal transition-[background-color,color]"
        :class="tabCountBadgeClass(tab.key)"
        :aria-label="`${counts[tab.key]} 場賽事`"
      >{{ counts[tab.key] }}</span>
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

function tabButtonClass(tabKey: string) {
  if (activeTab.value !== tabKey) return '';
  return 'border-b-[var(--color-primary)] font-bold text-[var(--color-primary)]';
}

function tabCountBadgeClass(tabKey: string) {
  const active = activeTab.value === tabKey;
  const live = tabKey === 'roll';
  if (active) {
    return 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]';
  }
  if (live) return 'bg-red-500/18 text-red-400';
  return 'bg-[var(--color-surface-hover)] text-[var(--color-subtle)]';
}
</script>
