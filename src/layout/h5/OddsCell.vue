<template>
  <button
    class="odds-cell"
    :class="{
      'is-locked': locked,
      'is-up':     !locked && change === 'up',
      'is-down':   !locked && change === 'down',
    }"
    :disabled="locked"
    :aria-label="locked ? '賠率鎖定' : `賠率 ${value}`"
  >
    <template v-if="locked">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="lock-icon">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    </template>
    <template v-else>
      <span v-if="label" class="odds-line">{{ label }}</span>
      <span class="odds-value">{{ value ?? '-' }}</span>
      <span v-if="change && change !== 'same'" class="odds-arrow" :class="{ up: change === 'up', down: change === 'down' }">
        <svg viewBox="0 0 8 8" class="arrow-svg" fill="currentColor">
          <path d="M4 1L7 6H1z" />
        </svg>
      </span>
    </template>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  value?:  string | number;
  label?:  string;
  change?: 'up' | 'down' | 'same' | string;
  locked?: boolean;
}>();
</script>

<style scoped lang="scss">
.odds-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 40px;
  border-radius: 8px;
  border: none;
  background-color: var(--color-outcome-background);
  cursor: pointer;
  padding: 4px 2px;
  gap: 1px;
  transition: background-color 0.15s, transform 0.1s;
  -webkit-tap-highlight-color: transparent;

  &:active:not(:disabled) {
    transform: scale(0.95);
    background-color: var(--color-surface-hover);
  }

  &:hover:not(:disabled) {
    background-color: var(--color-surface-hover);
  }

  &.is-locked {
    cursor: default;
    opacity: 0.7;
  }

  &.is-up .odds-value   { color: #22c55e; }
  &.is-down .odds-value { color: #ef4444; }
}

.lock-icon {
  width: 18px;
  height: 18px;
  color: var(--color-subtle-light);
}

.odds-line {
  font-size: 10px;
  color: var(--color-subtle-light);
  line-height: 1;
}

.odds-value {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-main);
  line-height: 1.2;
  transition: color 0.3s;
}

.odds-arrow {
  display: flex;
  align-items: center;
  justify-content: center;

  &.down .arrow-svg {
    transform: rotate(180deg);
  }

  &.up   { color: #22c55e; }
  &.down { color: #ef4444; }
}

.arrow-svg {
  width: 7px;
  height: 7px;
}
</style>
