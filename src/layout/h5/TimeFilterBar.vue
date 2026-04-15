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
      <span>{{ tab.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

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

.time-tab__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #ef4444;
  animation: blink 1.4s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}
</style>
