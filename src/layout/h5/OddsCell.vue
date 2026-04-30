<template>
  <button
    type="button"
    class="flex w-full min-h-10 flex-col items-center justify-center gap-px rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-outcome-background)] p-0.5 py-1 shadow-[0_1px_2px_rgba(15,23,42,0.04),inset_0_1px_0_rgba(255,255,255,0.65)] transition-[background-color,transform,box-shadow,border-color] duration-150 [-webkit-tap-highlight-color:transparent] dark:border-0 dark:shadow-none disabled:cursor-default disabled:opacity-70"
    @click="onClick"
    :class="
      !locked
        && 'cursor-pointer active:scale-95 active:bg-[var(--color-surface-hover)] active:shadow-[0_1px_2px_rgba(15,23,42,0.05)] active:[box-shadow:0_1px_1px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.45)] dark:active:shadow-none [@media(hover:hover)]:hover:border-[var(--color-primary-border)] [@media(hover:hover)]:hover:bg-[var(--color-surface-hover)] [@media(hover:hover)]:hover:shadow-[0_2px_4px_rgba(15,23,42,0.07),inset_0_1px_0_rgba(255,255,255,0.75)] dark:[@media(hover:hover)]:hover:border-0 dark:[@media(hover:hover)]:hover:shadow-none'
    "
    :disabled="locked"
    :aria-label="locked ? '賠率鎖定' : `賠率 ${value}`"
  >
    <template v-if="locked">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-[18px] w-[18px] text-[var(--color-subtle-light)]">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    </template>
    <template v-else>
      <span v-if="label" class="text-[10px] leading-none text-[var(--color-subtle-light)]">{{ label }}</span>
      <span v-if="winHint === 'home'" class="text-[10px] font-bold leading-none tracking-wider text-[var(--color-subtle-light)]">主</span>
      <span v-else-if="winHint === 'away'" class="text-[10px] font-bold leading-none tracking-wider text-[var(--color-subtle-light)]">客</span>
      <span v-else-if="winHint === 'draw'" class="text-[10px] font-bold leading-none tracking-wider text-[var(--color-subtle-light)]">和</span>
      <span class="inline-flex flex-row items-center justify-center gap-0.5">
        <span
          class="text-[13px] font-bold leading-snug transition-colors duration-300"
          :class="valueColorClass"
        >{{ value ?? '-' }}</span>
        <span
          v-if="change && change !== 'same'"
          class="flex items-center justify-center"
          :class="change === 'up' ? 'text-emerald-500' : 'text-red-500'"
        >
          <svg viewBox="0 0 8 8" class="h-[7px] w-[7px] fill-current" :class="change === 'down' && 'rotate-180'">
            <path d="M4 1L7 6H1z" />
          </svg>
        </span>
      </span>
    </template>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  value?:  string | number;
  label?:  string;
  change?: 'up' | 'down' | 'same' | string;
  locked?: boolean;
  winHint?: 'home' | 'away' | 'draw';
}>();

const emit = defineEmits<{
  pick: [];
}>();

function onClick() {
  if (!props.locked) emit('pick');
}

const valueColorClass = computed(() => {
  if (props.locked) return 'text-[var(--color-main)]';
  if (props.change === 'up') return 'text-emerald-500';
  if (props.change === 'down') return 'text-red-500';
  return 'text-[var(--color-main)]';
});
</script>
