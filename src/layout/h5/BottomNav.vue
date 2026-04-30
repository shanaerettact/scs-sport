<template>
  <div class="pointer-events-none fixed bottom-0 left-0 right-0 z-[100] pb-[env(safe-area-inset-bottom,0px)]">
    <!-- Frosted glass background -->
    <div
      class="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-[70px] border-t border-[var(--color-bottom-nav-border)] bg-[var(--color-bottom-nav-bg)] [-webkit-backdrop-filter:blur(24px)_saturate(1.8)] [backdrop-filter:blur(24px)_saturate(1.8)]"
      :style="{ boxShadow: 'var(--color-bottom-nav-shadow)' }"
      aria-hidden="true"
    />

    <nav
      class="pointer-events-auto relative z-[2] flex h-[60px] items-end justify-around px-1"
      role="navigation"
      aria-label="主导航"
    >
      <!-- Left items -->
      <button
        v-for="item in leftItems"
        :key="item.key"
        type="button"
        class="group relative flex h-full flex-1 cursor-pointer flex-col items-center justify-center gap-[3px] border-none bg-transparent p-0 text-[var(--color-subtle)] transition-[color,transform] duration-200 [-webkit-tap-highlight-color:transparent] active:scale-[0.93]"
        :class="activeKey === item.key ? 'text-[var(--color-primary)]' : 'hover:text-[var(--color-main)]'"
        :aria-label="item.label"
        :aria-current="activeKey === item.key ? 'page' : undefined"
        @click="handleNav(item)"
      >
        <span class="relative flex items-center justify-center">
          <component
            :is="item.icon"
            class="h-[21px] w-[21px] transition-transform duration-200"
            :class="activeKey === item.key ? 'scale-110 drop-shadow-[0_0_5px_var(--color-primary-glow)]' : 'group-hover:scale-105'"
          />
          <span
            v-if="item.badge && item.badge > 0"
            class="pointer-events-none absolute -right-2 -top-[5px] h-4 min-w-4 rounded-full bg-[var(--color-live)] px-1 text-center text-[9px] font-bold leading-4 text-white whitespace-nowrap"
            :aria-label="`${item.badge} 个项目`"
          >
            {{ item.badge > 99 ? '99+' : item.badge }}
          </span>
        </span>
        <span
          class="text-[9.5px] font-semibold leading-none tracking-wide whitespace-nowrap"
          :class="activeKey === item.key ? 'text-[var(--color-primary)]' : ''"
        >
          {{ item.label }}
        </span>
        <!-- Active line -->
        <span
          class="absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[var(--color-primary)] transition-all duration-300"
          :class="activeKey === item.key ? 'w-5 opacity-100' : 'w-0 opacity-0'"
        />
      </button>

      <!-- Center spacer for home FAB -->
      <div class="pointer-events-none flex-[1.3]" aria-hidden="true" />

      <!-- Right items -->
      <button
        v-for="item in rightItems"
        :key="item.key"
        type="button"
        class="group relative flex h-full flex-1 cursor-pointer flex-col items-center justify-center gap-[3px] border-none bg-transparent p-0 text-[var(--color-subtle)] transition-[color,transform] duration-200 [-webkit-tap-highlight-color:transparent] active:scale-[0.93]"
        :class="activeKey === item.key ? 'text-[var(--color-primary)]' : 'hover:text-[var(--color-main)]'"
        :aria-label="item.label"
        :aria-current="activeKey === item.key ? 'page' : undefined"
        @click="handleNav(item)"
      >
        <span class="relative flex items-center justify-center">
          <component
            :is="item.icon"
            class="h-[21px] w-[21px] transition-transform duration-200"
            :class="activeKey === item.key ? 'scale-110 drop-shadow-[0_0_5px_var(--color-primary-glow)]' : 'group-hover:scale-105'"
          />
        </span>
        <span
          class="text-[9.5px] font-semibold leading-none tracking-wide whitespace-nowrap"
          :class="activeKey === item.key ? 'text-[var(--color-primary)]' : ''"
        >
          {{ item.label }}
        </span>
        <!-- Active line -->
        <span
          class="absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[var(--color-primary)] transition-all duration-300"
          :class="activeKey === item.key ? 'w-5 opacity-100' : 'w-0 opacity-0'"
        />
      </button>
    </nav>

    <!-- Center home FAB -->
    <button
      type="button"
      class="group pointer-events-auto absolute bottom-[12px] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 border-none bg-transparent p-0 [-webkit-tap-highlight-color:transparent]"
      :class="activeKey === 'home' ? 'is-active' : ''"
      aria-label="首页"
      :aria-current="activeKey === 'home' ? 'page' : undefined"
      @click="handleNav(homeItem)"
    >
      <span class="flex flex-col items-center gap-[5px] will-change-transform [animation:bn-home-float_2.4s_ease-in-out_infinite] group-active:[animation:none]">
        <span
          class="relative flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[var(--color-primary)] shadow-[0_4px_18px_var(--color-primary-glow),0_2px_6px_rgba(0,0,0,0.28),inset_0_1.5px_0_rgba(255,255,255,0.32)] outline outline-[2px] outline-white/10 outline-offset-[2px] transition-all duration-200 group-[.is-active]:scale-[1.07] group-[.is-active]:shadow-[0_6px_28px_var(--color-primary-glow),0_3px_10px_rgba(0,0,0,0.38),inset_0_1.5px_0_rgba(255,255,255,0.36)] group-hover:shadow-[0_6px_22px_var(--color-primary-glow)] group-active:scale-[0.95]"
        >
          <HomeIcon class="h-[23px] w-[23px] text-[var(--color-on-primary)] stroke-[2.2]" />
        </span>
        <span
          class="text-[9.5px] font-semibold leading-none tracking-wide text-[var(--color-primary)]"
        >
          首页
        </span>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, inject, type Ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useBetStore } from '@/store/module/bet';

const router = useRouter();
const route  = useRoute();
const betStore = useBetStore();

const openMatchSideFromNav   = inject<(() => void) | undefined>('h5OpenMatchSide');
const openMatchResultFromNav  = inject<(() => void) | undefined>('h5OpenMatchResult');
const openBetHistoryFromNav   = inject<(() => void) | undefined>('h5OpenBetHistory');
const openBetSlipFromNav      = inject<(() => void) | undefined>('h5OpenBetSlip');
const showMatchResultRef      = inject<Ref<boolean> | undefined>('h5ShowMatchResult');
const showBetHistoryRef       = inject<Ref<boolean> | undefined>('h5ShowBetHistory');
const goH5Home                = inject<(() => void) | undefined>('h5GoHome');

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
  label: '首页',
  icon: HomeIcon,
  route: '/h5',
};

const leftItems = computed<NavItem[]>(() => [
  { key: 'match-result', label: '赛事结果', icon: ResultsIcon, route: '/match-result' },
  { key: 'bet-slip',     label: '投注单',   icon: BetSlipIcon, badge: betBadge.value },
]);

const rightItems = computed<NavItem[]>(() => [
  { key: 'bet-history', label: '投注记录', icon: HistoryIcon, route: '/bet-history' },
  { key: 'profile',     label: '我的',     icon: ProfileIcon, route: '/profile' },
]);

const activeKey = computed(() => {
  const path = route.path;
  if (path === '/h5') {
    if (showMatchResultRef?.value) return 'match-result';
    if (showBetHistoryRef?.value)  return 'bet-history';
    return 'home';
  }
  if (path.startsWith('/sports'))       return 'home';
  if (path.startsWith('/match-result')) return 'match-result';
  if (path.startsWith('/bet-history'))  return 'bet-history';
  return '';
});

function handleNav(item: NavItem) {
  if (item.key === 'home') {
    if (goH5Home) { goH5Home(); } else if (item.route) { router.push(item.route); }
    return;
  }
  if (item.key === 'match-result') {
    if (openMatchResultFromNav) { openMatchResultFromNav(); return; }
    if (item.route) router.push(item.route);
    return;
  }
  if (item.key === 'bet-history') {
    if (openBetHistoryFromNav) { openBetHistoryFromNav(); return; }
    if (item.route) router.push(item.route);
    return;
  }
  if (item.key === 'profile') {
    if (item.route) router.push(item.route);
    return;
  }
  if (item.key === 'bet-slip') {
    if (openBetSlipFromNav) { openBetSlipFromNav(); return; }
    if (item.action) item.action();
    return;
  }
  if (openMatchSideFromNav) { openMatchSideFromNav(); return; }
  if (item.action) { item.action(); } else if (item.route) { router.push(item.route); }
}
</script>

<style scoped lang="scss"></style>
