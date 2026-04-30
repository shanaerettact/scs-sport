<template>
  <button
    type="button"
    class="flex w-full min-h-[42px] flex-col items-center justify-center gap-px rounded-xl border bg-[var(--color-outcome-background)] px-1 py-1.5 transition-all duration-150 [-webkit-tap-highlight-color:transparent] dark:border-0 dark:bg-[var(--color-outcome-background)]"
    :class="locked
      ? 'cursor-default border-[var(--color-border-subtle)] opacity-60'
      : 'cursor-pointer border-[var(--color-border-subtle)] hover:border-[var(--color-primary-border)] hover:bg-[var(--color-primary-tint)] hover:shadow-[0_0_0_1px_var(--color-primary-border)] active:scale-95'"
    @click="onClick"
    :disabled="locked"
    :aria-label="locked ? '賠率鎖定' : `賠率 ${value}`"
  >
    <template v-if="locked">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4 text-[var(--color-subtle-light)]">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    </template>
    <template v-else>
      <!-- Hint label (line, win-hint, or handicap) -->
      <span v-if="label" class="text-[9.5px] font-semibold leading-none text-[var(--color-subtle-light)]">{{ label }}</span>
      <span v-else-if="winHint === 'home'" class="text-[9.5px] font-bold leading-none tracking-wider text-[var(--color-subtle-light)]">主</span>
      <span v-else-if="winHint === 'away'" class="text-[9.5px] font-bold leading-none tracking-wider text-[var(--color-subtle-light)]">客</span>
      <span v-else-if="winHint === 'draw'" class="text-[9.5px] font-bold leading-none tracking-wider text-[var(--color-subtle-light)]">和</span>

      <!-- Odds value + change arrow -->
      <span class="inline-flex items-center justify-center gap-[2px]">
        <span
          class="text-[13.5px] font-extrabold leading-snug tabular-nums transition-colors duration-300"
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
  if (props.locked) return 'text-[var(--color-subtle-light)]';
  if (props.change === 'up')   return 'text-emerald-500';
  if (props.change === 'down') return 'text-red-500';
  return 'text-[var(--color-main)]';
});
</script>
