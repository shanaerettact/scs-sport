<template>
  <div class="bottom-nav-wrapper">
    <!-- Frosted glass base layer -->
    <div class="bottom-nav-glass" aria-hidden="true" />

    <!-- Nav bar -->
    <nav class="bottom-nav" role="navigation" aria-label="主導航">
      <!-- Left two items -->
      <button
        v-for="item in leftItems"
        :key="item.key"
        class="nav-item"
        :class="{ 'is-active': activeKey === item.key }"
        :aria-label="item.label"
        :aria-current="activeKey === item.key ? 'page' : undefined"
        @click="handleNav(item)"
      >
        <span class="nav-icon-wrap">
          <component :is="item.icon" class="nav-icon" />
          <span v-if="item.badge && item.badge > 0" class="nav-badge" aria-label="`${item.badge} 個項目`">
            {{ item.badge > 99 ? '99+' : item.badge }}
          </span>
        </span>
        <span class="nav-label">{{ item.label }}</span>
        <span class="nav-active-bar" />
      </button>

      <!-- Center home button placeholder (keeps layout spacing) -->
      <div class="nav-home-placeholder" aria-hidden="true" />

      <!-- Right two items -->
      <button
        v-for="item in rightItems"
        :key="item.key"
        class="nav-item"
        :class="{ 'is-active': activeKey === item.key }"
        :aria-label="item.label"
        :aria-current="activeKey === item.key ? 'page' : undefined"
        @click="handleNav(item)"
      >
        <span class="nav-icon-wrap">
          <component :is="item.icon" class="nav-icon" />
        </span>
        <span class="nav-label">{{ item.label }}</span>
        <span class="nav-active-bar" />
      </button>
    </nav>

    <!-- Floating center HOME button (absolutely positioned above bar) -->
    <button
      class="nav-home-btn"
      :class="{ 'is-active': activeKey === 'home' }"
      aria-label="首頁"
      :aria-current="activeKey === 'home' ? 'page' : undefined"
      @click="handleNav(homeItem)"
    >
      <span class="nav-home-inner">
        <HomeIcon class="nav-home-icon" />
      </span>
      <span class="nav-home-label">首頁</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineComponent, h } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useBetStore } from '@/store/module/bet';
import { useThemeStore } from '@/store/module/theme';

const router = useRouter();
const route = useRoute();
const betStore = useBetStore();
const themeStore = useThemeStore();

// ---- Icon components (inline SVG) ----

const ResultsIcon = defineComponent({
  render: () =>
    h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
      h('path', { d: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2' }),
      h('rect', { x: '9', y: '3', width: '6', height: '4', rx: '1' }),
      h('path', { d: 'M9 12h6M9 16h4' }),
    ]),
});

const BetSlipIcon = defineComponent({
  render: () =>
    h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
      h('path', { d: 'M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V7z' }),
      h('path', { d: 'M12 7v10M9 10h6M9 14h6' }),
    ]),
});

const HomeIcon = defineComponent({
  render: () =>
    h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
      h('path', { d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }),
      h('polyline', { points: '9 22 9 12 15 12 15 22' }),
    ]),
});

const HistoryIcon = defineComponent({
  render: () =>
    h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
      h('path', { d: 'M12 8v4l3 3' }),
      h('path', { d: 'M3.05 11a9 9 0 1 0 .5-4.5' }),
      h('polyline', { points: '3 3 3 7 7 7' }),
    ]),
});

const ProfileIcon = defineComponent({
  render: () =>
    h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
      h('path', { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }),
      h('circle', { cx: '12', cy: '7', r: '4' }),
    ]),
});

// ---- Nav items ----

interface NavItem {
  key: string;
  label: string;
  icon: ReturnType<typeof defineComponent>;
  route?: string;
  badge?: number;
  action?: () => void;
}

const betBadge = computed(() => betStore.betsList.length + betStore.comboBetsList.length);

const homeItem: NavItem = {
  key: 'home',
  label: '首頁',
  icon: HomeIcon,
  route: '/sports/soccer',
};

const leftItems = computed<NavItem[]>(() => [
  { key: 'match-result', label: '賽事結果', icon: ResultsIcon, route: '/match-result' },
  { key: 'bet-slip',     label: '投注單',   icon: BetSlipIcon,  action: () => { betStore.floatBetting = true; }, badge: betBadge.value },
]);

const rightItems = computed<NavItem[]>(() => [
  { key: 'bet-history', label: '投注紀錄', icon: HistoryIcon, route: '/bet-history' },
  { key: 'profile',     label: '我的',     icon: ProfileIcon, route: '/profile' },
]);

// Derive active key from current route
const activeKey = computed(() => {
  const path = route.path;
  if (path.startsWith('/sports'))       return 'home';
  if (path.startsWith('/match-result')) return 'match-result';
  if (path.startsWith('/bet-history'))  return 'bet-history';
  return '';
});

function handleNav(item: NavItem) {
  if (item.action) {
    item.action();
  } else if (item.route) {
    router.push(item.route);
  }
}


</script>

<style scoped lang="scss">
/* ---- Layout wrapper ---- */
.bottom-nav-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding-bottom: env(safe-area-inset-bottom, 0px);
  pointer-events: none;
}

/* ---- Frosted glass base ---- */
/* Full-width, fully opaque frosted panel — backdrop-filter blurs page content behind it. */
.bottom-nav-glass {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 72px;
  /* frosted tint — dark mode */
  background: rgba(15, 18, 19, 0.82);
  backdrop-filter: blur(28px) saturate(1.9) brightness(0.85);
  -webkit-backdrop-filter: blur(28px) saturate(1.9) brightness(0.85);
  /* top edge: green LED line + glass shine */
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow:
    0 -1px 0 0 rgba(44, 217, 125, 0.25),
    0 -8px 32px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  pointer-events: none;
  z-index: 0;
}

:global(html:not(.dark)) .bottom-nav-glass {
  background: rgba(240, 244, 245, 0.85);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow:
    0 -1px 0 0 rgba(44, 217, 125, 0.2),
    0 -8px 32px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

/* ---- Nav bar ---- */
.bottom-nav {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 60px;
  padding: 0 4px;
  pointer-events: all;
}

/* ---- Individual nav item ---- */
.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  height: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  position: relative;
  color: var(--color-subtle-light);
  transition: color 0.22s ease;
  -webkit-tap-highlight-color: transparent;

  &:active {
    opacity: 0.75;
    transform: scale(0.93);
  }

  &.is-active {
    color: var(--color-primary);

    .nav-active-bar {
      opacity: 1;
      width: 20px;
    }
  }
}

/* ---- Icon wrap (for badge positioning) ---- */
.nav-icon-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon {
  width: 22px;
  height: 22px;
  transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);

  .is-active & {
    transform: translateY(-2px) scale(1.12);
  }
}

/* ---- Badge ---- */
.nav-badge {
  position: absolute;
  top: -5px;
  right: -8px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 9999px;
  background-color: #ef4444;
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  line-height: 16px;
  text-align: center;
  white-space: nowrap;
  pointer-events: none;
}

/* ---- Label ---- */
.nav-label {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.02em;
  line-height: 1;
  transition: color 0.22s ease;
  white-space: nowrap;
}

/* ---- Active indicator bar ---- */
.nav-active-bar {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2.5px;
  background-color: var(--color-primary);
  border-radius: 9999px;
  opacity: 0;
  transition: width 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
}

/* ---- Center placeholder to hold space in flex row ---- */
.nav-home-placeholder {
  flex: 1.2;
  pointer-events: none;
}

/* ---- Floating home button ---- */
.nav-home-btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  /* lift above the flat glass bar — more pronounced float */
  bottom: 14px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  pointer-events: all;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.18s ease;

  &:active {
    transform: translateX(-50%) scale(0.9);
  }

  /* Radial halo on the glass bar surface behind the button */
  &::before {
    content: '';
    position: absolute;
    bottom: -14px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 20px;
    background: radial-gradient(ellipse at center, rgba(44, 217, 125, 0.22) 0%, transparent 75%);
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
  }
}

.nav-home-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  /* premium layered green gradient */
  background: linear-gradient(150deg, #52f99a 0%, #2cd97d 40%, #1aae60 100%);
  /* outer ring for separation from the notch */
  outline: 2.5px solid rgba(255, 255, 255, 0.12);
  outline-offset: 2px;
  box-shadow:
    0 0 0 1px rgba(44, 217, 125, 0.3),
    0 6px 24px rgba(44, 217, 125, 0.6),
    0 2px 8px rgba(0, 0, 0, 0.35),
    inset 0 1.5px 0 rgba(255, 255, 255, 0.38),
    inset 0 -1px 0 rgba(0, 0, 0, 0.12);
  transition:
    box-shadow 0.25s ease,
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);

  .nav-home-btn.is-active & {
    box-shadow:
      0 0 0 1px rgba(44, 217, 125, 0.5),
      0 8px 32px rgba(44, 217, 125, 0.8),
      0 3px 10px rgba(0, 0, 0, 0.4),
      inset 0 1.5px 0 rgba(255, 255, 255, 0.42),
      inset 0 -1px 0 rgba(0, 0, 0, 0.14);
    transform: scale(1.06);
  }

  .nav-home-btn:active & {
    transform: scale(0.91);
    box-shadow:
      0 2px 10px rgba(44, 217, 125, 0.4),
      0 1px 3px rgba(0, 0, 0, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
  }
}

.nav-home-icon {
  width: 26px;
  height: 26px;
  color: #000;
  stroke-width: 2.2px;
}

.nav-home-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-primary);
  line-height: 1;
  white-space: nowrap;
  transition: color 0.2s ease;

  .nav-home-btn.is-active & {
    color: var(--color-primary);
  }
}

/* ---- Ripple animation on tap ---- */
@keyframes ripple-out {
  0%   { box-shadow: 0 0 0 0 rgba(44, 217, 125, 0.55); }
  100% { box-shadow: 0 0 0 14px rgba(44, 217, 125, 0); }
}

.nav-home-btn.is-active .nav-home-inner {
  animation: ripple-out 1.4s ease-out infinite;
}
</style>
