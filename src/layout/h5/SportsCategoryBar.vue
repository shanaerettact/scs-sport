<template>
  <div class="sport-category-bar">
    <!-- Scrollable pill row -->
    <div
      ref="scrollEl"
      class="sport-category-scroll"
      role="tablist"
      aria-label="運動分類"
    >
      <button
        v-for="sport in sports"
        :key="sport.key"
        role="tab"
        :aria-selected="activeSport === sport.key"
        :aria-label="sport.label"
        class="sport-pill"
        :class="{ 'sport-pill--active': activeSport === sport.key }"
        @click="select(sport.key)"
      >
        <!-- Icon wrapper with layered background -->
        <span class="sport-pill__icon-wrap">
          <img
            :src="sport.icon"
            :alt="sport.label"
            class="sport-pill__icon"
            :class="{ 'sport-pill__icon--active': activeSport === sport.key }"
          />
        </span>
        <span class="sport-pill__label">{{ sport.label }}</span>
      </button>
    </div>

    <!-- Subtle bottom rule -->
    <div class="sport-category-bar__rule" aria-hidden="true" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeSport = ref('soccer');
const scrollEl = ref<HTMLElement | null>(null);

function select(key: string) {
  activeSport.value = key;
}

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

<style scoped>
/* ─── Container ───────────────────────────────────────────── */
.sport-category-bar {
  background: linear-gradient(
    135deg,
    var(--color-sport-bar-bg-from) 0%,
    var(--color-sport-bar-bg-to) 100%
  );
  position: relative;
}

/* ─── Scroll track ────────────────────────────────────────── */
.sport-category-scroll {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow-x: auto;
  padding: 10px 12px 10px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.sport-category-scroll::-webkit-scrollbar {
  display: none;
}

/* ─── Pill base ────────────────────────────────────────────── */
.sport-pill {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 999px;
  padding: 6px 13px 6px 8px;
  border: 1px solid var(--color-sport-pill-inactive-border);
  background: var(--color-sport-pill-inactive-bg);
  color: var(--color-sport-pill-inactive-text);
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.01em;
  white-space: nowrap;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;
  /* Subtle glass sheen on inactive pills */
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.sport-pill:hover:not(.sport-pill--active) {
  background: rgba(79, 142, 247, 0.08);
  border-color: rgba(79, 142, 247, 0.22);
  color: var(--color-primary);
}

.sport-pill:active {
  transform: scale(0.94);
}

/* ─── Active pill ──────────────────────────────────────────── */
.sport-pill--active {
  background: linear-gradient(
    135deg,
    var(--color-sport-pill-active-from) 0%,
    var(--color-sport-pill-active-to) 100%
  );
  border-color: transparent;
  color: var(--color-sport-pill-active-text);
  box-shadow: var(--color-sport-pill-active-shadow);
  transform: translateY(-1px);
}

/* ─── Icon wrapper ─────────────────────────────────────────── */
.sport-pill__icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  flex-shrink: 0;
  transition: background 0.2s ease;
}

.sport-pill--active .sport-pill__icon-wrap {
  background: rgba(255, 255, 255, 0.26);
}

/* ─── Icon image ───────────────────────────────────────────── */
.sport-pill__icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
  transition: opacity 0.2s ease, filter 0.2s ease;
  opacity: 0.5;
  filter: grayscale(60%);
}

.sport-pill--active .sport-pill__icon,
.sport-pill:hover .sport-pill__icon {
  opacity: 1;
  filter: none;
}

.sport-pill--active .sport-pill__icon {
  filter: brightness(0) invert(1);
}

/* ─── Label ────────────────────────────────────────────────── */
.sport-pill__label {
  transition: color 0.2s ease;
}

/* ─── Bottom rule ──────────────────────────────────────────── */
.sport-category-bar__rule {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-sport-bar-separator) 20%,
    var(--color-sport-bar-separator) 80%,
    transparent 100%
  );
}
</style>
