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
        <!-- Icon container with inner glow ring when active -->
        <span class="sport-btn__icon">
          <img :src="sport.icon" :alt="sport.label" class="sport-btn__img" />
        </span>
        <span class="sport-btn__label">{{ sport.label }}</span>
        <!-- Active indicator dot -->
        <span class="sport-btn__dot" aria-hidden="true" />
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
/* ── Container ─────────────────────────────────────────── */
.sports-category-bar {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-surface-hover);
  padding: 6px 0 4px;
}

/* ── Scroll track ───────────────────────────────────────── */
.sports-scroll-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 2px;
  overflow-x: auto;
  padding: 0 10px;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar { display: none; }
}

/* ── Button ─────────────────────────────────────────────── */
.sport-btn {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  /* Tighter padding: 5px vertical, 8px horizontal */
  padding: 5px 8px 6px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
  flex-shrink: 0;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    transform 0.12s ease,
    box-shadow 0.18s ease;
  -webkit-tap-highlight-color: transparent;
  outline: none;

  &:active {
    transform: scale(0.91);
  }

  /* ── Icon wrapper ── */
  &__icon {
    position: relative;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color: var(--color-outcome-background);
    border: 1px solid transparent;
    transition:
      background-color 0.18s ease,
      border-color 0.18s ease,
      box-shadow 0.18s ease;
  }

  /* ── Image ── */
  &__img {
    width: 18px;
    height: 18px;
    object-fit: contain;
    /* Desaturate inactive icons for visual hierarchy */
    filter: grayscale(40%) opacity(0.75);
    transition: filter 0.18s ease;
  }

  /* ── Label ── */
  &__label {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: var(--color-subtle);
    white-space: nowrap;
    transition: color 0.18s ease, font-weight 0.18s ease;
  }

  /* ── Active indicator dot (hidden by default) ── */
  &__dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: var(--color-primary);
    opacity: 0;
    transform: scale(0);
    transition: opacity 0.18s ease, transform 0.18s ease;
    position: absolute;
    bottom: 2px;
    left: 50%;
    translate: -50% 0;
  }

  /* ── Hover state (non-active) ── */
  &:not(.is-active):hover {
    background-color: var(--color-surface-hover);
    border-color: var(--color-surface-hover);

    .sport-btn__icon {
      background-color: var(--color-surface-hover);
    }

    .sport-btn__img {
      filter: grayscale(15%) opacity(0.9);
    }
  }

  /* ── Active state ── */
  &.is-active {
    background-color: rgba(44, 217, 125, 0.08);
    border-color: rgba(44, 217, 125, 0.22);
    box-shadow: 0 1px 6px rgba(44, 217, 125, 0.1);

    .sport-btn__icon {
      background-color: rgba(44, 217, 125, 0.15);
      border-color: rgba(44, 217, 125, 0.35);
      box-shadow: inset 0 0 0 1px rgba(44, 217, 125, 0.2);
    }

    .sport-btn__img {
      filter: grayscale(0%) opacity(1) drop-shadow(0 0 4px rgba(44, 217, 125, 0.5));
    }

    .sport-btn__label {
      color: var(--color-primary);
      font-weight: 700;
    }

    .sport-btn__dot {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>
