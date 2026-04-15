<template>
  <!-- 水平可滑動的球類分類按鈕區域 -->
  <div class="sports-category-bar">
    <div class="sports-scroll-wrapper">
      <button
        v-for="sport in sports"
        :key="sport.key"
        class="sport-btn"
        :class="{ 'is-active': activeSport === sport.key }"
        @click="activeSport = sport.key"
        :aria-pressed="activeSport === sport.key"
        :aria-label="sport.label"
      >
        <span class="sport-btn__icon">
          <img :src="sport.icon" :alt="sport.label" class="w-6 h-6 object-contain" />
        </span>
        <span class="sport-btn__label">{{ sport.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeSport = ref('soccer');

const sports = [
  { key: 'soccer',      label: '足球',   icon: '/images/sports/soccer.png' },
  { key: 'basketball',  label: '籃球',   icon: '/images/sports/basketball.png' },
  { key: 'tennis',      label: '網球',   icon: '/images/sports/tennis.png' },
  { key: 'volleyball',  label: '排球',   icon: '/images/sports/volleyball.png' },
  { key: 'tableTennis', label: '乒乓球', icon: '/images/sports/table-tennis.png' },
  { key: 'baseball',    label: '棒球',   icon: '/images/sports/baseball.png' },
  { key: 'badminton',   label: '羽毛球', icon: '/images/sports/badminton.png' },
];
</script>

<style scoped lang="scss">
.sports-category-bar {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-surface-hover);
  padding: 8px 0;
}

.sports-scroll-wrapper {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding: 0 12px;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
}

.sport-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border: none;
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s, transform 0.15s;
  -webkit-tap-highlight-color: transparent;

  &:active {
    transform: scale(0.93);
  }

  &__icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: var(--color-outcome-background);
    transition: background 0.2s;
  }

  &__label {
    font-size: 11px;
    font-weight: 500;
    color: var(--color-subtle);
    white-space: nowrap;
    transition: color 0.2s;
  }

  &.is-active {
    .sport-btn__icon {
      background-color: var(--color-primary);
    }

    .sport-btn__label {
      color: var(--color-primary);
      font-weight: 700;
    }
  }

  &:not(.is-active):hover .sport-btn__icon {
    background-color: var(--color-surface-hover);
  }
}
</style>
