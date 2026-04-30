<template>
  <div class="pointer-events-none fixed bottom-0 left-0 right-0 z-[100] pb-[env(safe-area-inset-bottom,0px)]">
    <div
      class="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-[72px] border-t border-[var(--color-bottom-nav-border)] bg-[var(--color-bottom-nav-bg)] shadow-[var(--color-bottom-nav-shadow)] [-webkit-backdrop-filter:blur(28px)_saturate(1.9)_brightness(0.85)] [backdrop-filter:blur(28px)_saturate(1.9)_brightness(0.85)]"
      aria-hidden="true"
    />

    <nav class="pointer-events-auto relative z-[2] flex h-[60px] items-end justify-around px-1" role="navigation" aria-label="主导航">
      <button
        v-for="item in leftItems"
        :key="item.key"
        type="button"
        class="group relative flex h-full flex-1 cursor-pointer flex-col items-center justify-center gap-[3px] border-none bg-transparent p-0 text-[var(--color-subtle-light)] transition-[color,transform] duration-[220ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] [-webkit-tap-highlight-color:transparent] active:scale-[0.93] active:opacity-75 [@media(hover:hover)]:hover:-translate-y-[3px] [@media(hover:hover)]:hover:text-[var(--color-primary)]"
        :class="activeKey === item.key ? 'is-active text-[var(--color-primary)]' : ''"
        :aria-label="item.label"
        :aria-current="activeKey === item.key ? 'page' : undefined"
        @click="handleNav(item)"
      >
        <span class="relative flex items-center justify-center">
          <component
            :is="item.icon"
            class="h-[22px] w-[22px] transition-transform duration-[220ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-[.is-active]:-translate-y-0.5 group-[.is-active]:scale-[1.12] [@media(hover:hover)]:group-hover:-translate-y-0.5 [@media(hover:hover)]:group-hover:scale-110 [@media(hover:hover)]:group-hover:[filter:drop-shadow(0_0_4px_var(--color-primary-glow))]"
          />
          <span
            v-if="item.badge && item.badge > 0"
            class="pointer-events-none absolute -right-2 -top-[5px] h-4 min-w-4 rounded-full bg-red-500 px-1 text-center text-[9px] font-bold leading-4 text-white whitespace-nowrap"
            :aria-label="`${item.badge} 个项目`"
          >
            {{ item.badge > 99 ? '99+' : item.badge }}
          </span>
        </span>
        <span class="text-[10px] font-medium leading-none tracking-wide whitespace-nowrap transition-colors duration-[220ms] [@media(hover:hover)]:group-hover:text-[var(--color-primary)]">
          {{ item.label }}
        </span>
        <span
          class="absolute bottom-0 left-1/2 h-[2.5px] w-0 -translate-x-1/2 rounded-full bg-[var(--color-primary)] opacity-0 transition-[width,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-[.is-active]:w-5 group-[.is-active]:opacity-100"
        />
      </button>

      <div class="pointer-events-none flex-[1.2]" aria-hidden="true" />

      <button
        v-for="item in rightItems"
        :key="item.key"
        type="button"
        class="group relative flex h-full flex-1 cursor-pointer flex-col items-center justify-center gap-[3px] border-none bg-transparent p-0 text-[var(--color-subtle-light)] transition-[color,transform] duration-[220ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] [-webkit-tap-highlight-color:transparent] active:scale-[0.93] active:opacity-75 [@media(hover:hover)]:hover:-translate-y-[3px] [@media(hover:hover)]:hover:text-[var(--color-primary)]"
        :class="activeKey === item.key ? 'is-active text-[var(--color-primary)]' : ''"
        :aria-label="item.label"
        :aria-current="activeKey === item.key ? 'page' : undefined"
        @click="handleNav(item)"
      >
        <span class="relative flex items-center justify-center">
          <component
            :is="item.icon"
            class="h-[22px] w-[22px] transition-transform duration-[220ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-[.is-active]:-translate-y-0.5 group-[.is-active]:scale-[1.12] [@media(hover:hover)]:group-hover:-translate-y-0.5 [@media(hover:hover)]:group-hover:scale-110 [@media(hover:hover)]:group-hover:[filter:drop-shadow(0_0_4px_var(--color-primary-glow))]"
          />
        </span>
        <span
          class="text-[10px] font-medium leading-none tracking-wide whitespace-nowrap transition-colors duration-[220ms] [@media(hover:hover)]:group-hover:text-[var(--color-primary)]"
        >
          {{ item.label }}
        </span>
        <span
          class="absolute bottom-0 left-1/2 h-[2.5px] w-0 -translate-x-1/2 rounded-full bg-[var(--color-primary)] opacity-0 transition-[width,opacity] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-[.is-active]:w-5 group-[.is-active]:opacity-100"
        />
      </button>
    </nav>

    <button
      type="button"
      class="group pointer-events-auto absolute bottom-[14px] left-1/2 z-10 flex -translate-x-1/2 cursor-pointer flex-col items-center border-none bg-transparent p-0 [-webkit-tap-highlight-color:transparent]"
      :class="activeKey === 'home' ? 'is-active' : ''"
      aria-label="首页"
      :aria-current="activeKey === 'home' ? 'page' : undefined"
      @click="handleNav(homeItem)"
    >
      <span
        class="flex flex-col items-center gap-1 will-change-transform [animation:bn-home-float_2.2s_ease-in-out_infinite] group-active:[animation:none]"
      >
        <span
          class="relative flex h-[58px] w-[58px] origin-center items-center justify-center rounded-full bg-[linear-gradient(150deg,color-mix(in_srgb,var(--color-primary)_72%,white)_0%,var(--color-primary)_40%,color-mix(in_srgb,var(--color-primary)_72%,black)_100%)] shadow-[0_0_0_1px_var(--color-primary-border),0_5px_18px_var(--color-primary-glow),0_2px_8px_rgba(0,0,0,0.35),inset_0_1.5px_0_rgba(255,255,255,0.38),inset_0_-1px_0_rgba(0,0,0,0.12)] outline outline-[2.5px] outline-white/12 outline-offset-[2px] transition-[box-shadow,transform] duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] before:pointer-events-none before:absolute before:bottom-[-14px] before:left-1/2 before:z-[-1] before:h-3.5 before:w-14 before:-translate-x-1/2 before:rounded-full before:bg-[radial-gradient(ellipse_at_center,var(--color-primary-soft)_0%,transparent_72%)] before:opacity-100 before:transition-opacity before:duration-200 before:content-[''] [@media(hover:hover)]:group-hover:before:opacity-70 [@media(hover:hover)]:group-hover:scale-[1.04] [@media(hover:hover)]:group-hover:shadow-[0_0_0_1px_var(--color-primary-border),0_4px_14px_var(--color-primary-glow),0_2px_6px_rgba(0,0,0,0.3),inset_0_1.5px_0_rgba(255,255,255,0.42),inset_0_-1px_0_rgba(0,0,0,0.12)] group-[.is-active]:scale-[1.06] group-[.is-active]:animate-bn-ripple group-[.is-active]:shadow-[0_0_0_1px_var(--color-primary-border),0_8px_32px_var(--color-primary-glow),0_3px_10px_rgba(0,0,0,0.4),inset_0_1.5px_0_rgba(255,255,255,0.42),inset_0_-1px_0_rgba(0,0,0,0.14)] group-active:scale-[0.94] group-[.is-active]:group-active:scale-[0.94] group-active:shadow-[0_2px_10px_var(--color-primary-glow),0_1px_3px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.25)]"
        >
          <HomeIcon class="h-[26px] w-[26px] text-[var(--color-on-primary)] stroke-[2.2]" />
        </span>
        <span
          class="mt-2 text-[10px] font-semibold leading-none tracking-wide whitespace-nowrap text-[var(--color-primary)] transition-[color,transform,opacity] duration-200 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] [@media(hover:hover)]:group-hover:-translate-y-px [@media(hover:hover)]:group-hover:opacity-100"
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
const route = useRoute();
const betStore = useBetStore();

const openMatchSideFromNav = inject<(() => void) | undefined>('h5OpenMatchSide');
const openMatchResultFromNav = inject<(() => void) | undefined>('h5OpenMatchResult');
const openBetHistoryFromNav = inject<(() => void) | undefined>('h5OpenBetHistory');
const openBetSlipFromNav = inject<(() => void) | undefined>('h5OpenBetSlip');
const showMatchResultRef = inject<Ref<boolean> | undefined>('h5ShowMatchResult');
const showBetHistoryRef = inject<Ref<boolean> | undefined>('h5ShowBetHistory');
const goH5Home = inject<(() => void) | undefined>('h5GoHome');

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
  { key: 'bet-slip', label: '投注单', icon: BetSlipIcon, badge: betBadge.value },
]);

const rightItems = computed<NavItem[]>(() => [
  { key: 'bet-history', label: '投注记录', icon: HistoryIcon, route: '/bet-history' },
  { key: 'profile', label: '我的', icon: ProfileIcon, route: '/profile' },
]);

const activeKey = computed(() => {
  const path = route.path;
  if (path === '/h5') {
    if (showMatchResultRef?.value) return 'match-result';
    if (showBetHistoryRef?.value) return 'bet-history';
    return 'home';
  }
  if (path.startsWith('/sports')) return 'home';
  if (path.startsWith('/match-result')) return 'match-result';
  if (path.startsWith('/bet-history')) return 'bet-history';
  return '';
});

function handleNav(item: NavItem) {
  if (item.key === 'home') {
    if (goH5Home) {
      goH5Home();
    } else if (item.route) {
      router.push(item.route);
    }
    return;
  }
  if (item.key === 'match-result') {
    if (openMatchResultFromNav) {
      openMatchResultFromNav();
      return;
    }
    if (item.route) router.push(item.route);
    return;
  }
  if (item.key === 'bet-history') {
    if (openBetHistoryFromNav) {
      openBetHistoryFromNav();
      return;
    }
    if (item.route) router.push(item.route);
    return;
  }
  if (item.key === 'profile') {
    if (item.route) router.push(item.route);
    return;
  }
  if (item.key === 'bet-slip') {
    if (openBetSlipFromNav) {
      openBetSlipFromNav();
      return;
    }
    if (item.action) {
      item.action();
    }
    return;
  }
  if (openMatchSideFromNav) {
    openMatchSideFromNav();
    return;
  }
  if (item.action) {
    item.action();
  } else if (item.route) {
    router.push(item.route);
  }
}
</script>

<style scoped lang="scss"></style>