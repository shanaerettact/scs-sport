<template>
  <!-- 分類選單：熱門 / 滾球 / 今日 / 早盤 -->
  <div class="time-filter-bar">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      class="time-tab"
      :class="{ 'is-active': activeTab === tab.key }"
      @click="activeTab = tab.key"
      :aria-pressed="activeTab === tab.key"
    >
      <span class="time-tab__dot" v-if="tab.key === 'roll'" />
      <span class="time-tab__label">{{ tab.label }}</span>
      <span
        v-if="counts[tab.key] !== undefined && counts[tab.key] > 0"
        class="time-tab__badge"
        :class="{
          'is-live': tab.key === 'roll',
          'is-active-badge': activeTab === tab.key,
        }"
        aria-label="`${counts[tab.key]} 場賽事`"
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
</script>

<style scoped lang="scss">
.time-filter-bar {
  display: flex;
  align-items: stretch;
  background-color: var(--color-surface-soft);
  border-bottom: 1px solid var(--color-surface-hover);
}

.time-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 11px 4px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-subtle);
  border: none;
  background: transparent;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
  -webkit-tap-highlight-color: transparent;

  &.is-active {
    color: var(--color-primary);
    border-bottom-color: var(--color-primary);
    font-weight: 700;
  }

  &:not(.is-active):hover {
    color: var(--color-main);
  }
}

.time-tab__label {
  /* keeps label and badge on one line */
  white-space: nowrap;
}

.time-tab__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #ef4444;
  animation: blink 1.4s ease-in-out infinite;
  flex-shrink: 0;
}

/* Count badge */
.time-tab__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 16px;
  padding: 0 5px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0;
  background-color: var(--color-surface-hover);
  color: var(--color-subtle);
  transition: background-color 0.2s, color 0.2s;
  flex-shrink: 0;

  /* Live / 滾球 tab: red badge */
  &.is-live {
    background-color: rgba(239, 68, 68, 0.18);
    color: #f87171;
  }

  /* When the tab itself is active, badge inherits brand colour */
  &.is-active-badge {
    background-color: rgba(44, 217, 125, 0.18);
    color: var(--color-primary);
  }

  /* Live + active: keep red tint but slightly brighter */
  &.is-live.is-active-badge {
    background-color: rgba(239, 68, 68, 0.26);
    color: #fc8181;
  }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}
</style>
