<template>
  <div class="relative flex h-dvh flex-col overflow-hidden bg-[var(--color-background-color)]">
    <div v-show="!showBetSlip" class="shrink-0 z-10 flex flex-col">
      <div class="bg-[var(--color-header-bg)] dark:bg-[var(--color-header-bg)]">
        <MobileLayoutHeader />
      </div>

      <div v-if="!showMatchSide">
        <SportsCategoryBar />
      </div>

      <div v-if="!showMatchSide && !showMatchResult">
        <TimeFilterBar :counts="tabCounts" />
      </div>
    </div>


    <main
      class="relative flex min-h-0 min-w-0 flex-1 flex-col"
      :class="showBetSlip ? 'pointer-events-none' : ''"
    >
      <div
        class="relative min-h-0 min-w-0 flex-1 pb-[calc(110px+env(safe-area-inset-bottom,0px))]"
        :class="showMatchSide ? 'overflow-y-hidden' : 'overflow-y-auto'"
      >
        <Transition
          mode="out-in"
          enter-active-class="absolute left-0 right-0 top-0 w-full transition-[transform,opacity] duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          leave-active-class="absolute left-0 right-0 top-0 w-full transition-[transform,opacity] duration-[200ms] ease-in"
          enter-from-class="translate-x-full opacity-0"
          leave-to-class="-translate-x-[30%] opacity-0"
        >
          <MatchSide
            v-if="showMatchSide && activeMatch"
            key="side"
            :match="activeMatch"
            @close="handleCloseSide"
            @select-outcome="handleSelectOutcome"
            class="px-1 pb-3 pt-0"
          />

          <H5MatchResultView
            v-else-if="showMatchResult"
            key="result"
          />

          <H5BetHistory
            v-else-if="showBetHistory"
            key="betRecodHistory"
          />

          <div v-else key="list" class="flex flex-col gap-3 px-3 py-3">
            <MatchEventCard
              v-for="match in demoMatches"
              :key="match.matchId"
              :match="match"
              @more-markets="handleMoreMarkets"
              @open-video="handleOpenVideo"
              @open-ani="handleOpenAni"
              @open-stats="handleOpenStats"
              @add-to-bet-slip="handleAddToBetSlip"
            />
          </div>
        </Transition>
      </div>
    </main>

    <BetSlipDrawer
      v-model="showBetSlip"
      v-model:lines-single="betSlipLinesSingle"
      v-model:lines-parlay="betSlipLinesParlay"
      v-model:slip-mode="betSlipMode"
      @place-bet="onBetSlipPlace"
    />

    <BottomNav v-show="!showBetSlip" />
  </div>
</template>

<script setup lang="ts">
import BottomNav from './BottomNav.vue';
import MobileLayoutHeader from './MobileLayoutHeader.vue';
import SportsCategoryBar from './SportsCategoryBar.vue';
import TimeFilterBar from './TimeFilterBar.vue';
import MatchEventCard, { type MatchEvent } from './MatchEventCard.vue';
import MatchSide from './MatchSide.vue';
import H5MatchResultView from './H5MatchResultView.vue';
import H5BetHistory from './H5BetHistory.vue';
import BetSlipDrawer, { type BetSlipAddPayload, type BetSlipLineState } from './BetSlipDrawer.vue';
import { computed, provide, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const showMatchSide = ref(false);
const showMatchResult = ref(false);
const showBetHistory = ref(false);
const showBetSlip = ref(false);
const betSlipLinesSingle = ref<BetSlipLineState[]>([]);
const betSlipLinesParlay = ref<BetSlipLineState[]>([]);
const betSlipMode = ref<'single' | 'parlay'>('single');
const activeMatchId = ref<string | null>(null);


const activeMatch = computed<MatchEvent | null>(
  () => demoMatches.find((m) => m.matchId === activeMatchId.value) ?? null,
);

const handleMoreMarkets = (id: string) => {
  showMatchResult.value = false;
  showBetHistory.value = false;
  activeMatchId.value = id;
  showMatchSide.value = true;
};

const handleCloseSide = () => {
  showMatchSide.value = false;
  activeMatchId.value = null;
};

const handleSelectOutcome = (_market: unknown, _outcome: unknown) => {
};

const handleAddToBetSlip = (p: BetSlipAddPayload) => {
  const bucket = betSlipMode.value === 'parlay' ? betSlipLinesParlay : betSlipLinesSingle;
  if (bucket.value.some((l) => l.selectionKey === p.selectionKey)) {
    showBetSlip.value = true;
    return;
  }
  bucket.value = [
    ...bucket.value,
    {
      selectionKey: p.selectionKey,
      marketTitle: p.marketTitle,
      marketSub: p.marketSub,
      matchLabel: p.matchLabel,
      odds: p.odds,
      stake: '0',
      minStake: 10,
      maxStake: 1000,
    },
  ];
  showBetSlip.value = true;
};

const onBetSlipPlace = () => {
  showBetSlip.value = false;
};

const handleOpenVideo   = (id: string) => { };
const handleOpenAni     = (id: string) => { };
const handleOpenStats   = (id: string) => { };

const tabCounts = computed<Record<string, number>>(() => {
  const liveCount  = demoMatches.filter((m) => m.isLive).length;
  const todayCount = demoMatches.filter((m) => !m.isLive && m.time?.startsWith('今日')).length;
  const earlyCount = demoMatches.filter((m) => !m.isLive && !m.time?.startsWith('今日')).length;
  return {
    hot:   demoMatches.length,
    roll:  liveCount,
    today: todayCount,
    early: earlyCount,
  };
});

const demoMatches: MatchEvent[] = [
  {
    matchId: 'm001',
    leagueName: '大洋洲职业足球联赛',
    leagueLogo: '/images/sports/league.png',
    isLive: true,
    period: '上半场',
    clock: '07:01',
    homeTeamName: '南墨尔本',
    homeTeamLogo: '/images/sports/homeTeam.png',
    awayTeamName: '布拉足球俱乐部',
    awayTeamLogo: '/images/sports/awayTeam.png',
    hasDraw: true,
    extraMarketCount: 11,
    hasVideo: true,
    hasAni: true,
    stats: { homeCorner: 0, awayCorner: 0, homeRed: 0, awayRed: 0, homeYellow: 0, awayYellow: 0, homeScore: 0, awayScore: 0 },
    odds: {
      home: { win: '2.15', winChange: 'up', handicap: '1.85', handicapChange: 'same', handicapLine: '-0.5', over: '1.92', overChange: 'down', overLine: '2.5' },
      away: { win: '3.40', winChange: 'same', handicap: '2.05', handicapChange: 'up', handicapLine: '+0.5', under: '1.88', underChange: 'same', underLine: '2.5' },
      draw: '3.10', drawChange: 'same',
    },
  },
  {
    matchId: 'm002',
    leagueName: '英格兰超级联赛',
    leagueLogo: '/images/sports/league.png',
    isLive: true,
    period: '下半场',
    clock: '62:34',
    homeTeamName: '曼彻斯特城',
    homeTeamLogo: '/images/sports/homeTeam.png',
    awayTeamName: '利物浦',
    awayTeamLogo: '/images/sports/awayTeam.png',
    hasDraw: true,
    extraMarketCount: 24,
    hasVideo: true,
    hasAni: true,
    stats: { homeCorner: 3, awayCorner: 5, homeRed: 0, awayRed: 1, homeYellow: 2, awayYellow: 3, homeScore: 1, awayScore: 2 },
    odds: {
      home: { win: '2.60', winChange: 'down', handicap: '2.10', handicapChange: 'same', handicapLine: '+0.5', over: '1.78', overChange: 'up', overLine: '3.5' },
      away: { win: '1.72', winChange: 'up', handicap: '1.88', handicapChange: 'down', handicapLine: '-0.5', under: '2.05', underChange: 'same', underLine: '3.5' },
      draw: '3.50', drawChange: 'down',
    },
  },
  {
    matchId: 'm003',
    leagueName: '西班牙甲级联赛',
    leagueLogo: '/images/sports/league.png',
    isLive: false,
    time: '今日 20:45',
    homeTeamName: '巴塞罗那',
    homeTeamLogo: '/images/sports/homeTeam.png',
    awayTeamName: '皇家马德里',
    awayTeamLogo: '/images/sports/awayTeam.png',
    hasDraw: true,
    extraMarketCount: 18,
    hasVideo: false,
    hasAni: false,
    stats: { homeCorner: 0, awayCorner: 0, homeRed: 0, awayRed: 0, homeYellow: 0, awayYellow: 0, homeScore: 0, awayScore: 0 },
    odds: {
      home: { win: '2.20', winChange: 'same', handicap: '1.95', handicapChange: 'same', handicapLine: '0', over: '1.88', overChange: 'same', overLine: '2.5' },
      away: { win: '3.00', winChange: 'same', handicap: '2.00', handicapChange: 'same', handicapLine: '0', under: '1.95', underChange: 'same', underLine: '2.5' },
      draw: '3.20', drawChange: 'same',
    },
  },
  {
    matchId: 'm004',
    leagueName: '德国甲级联赛',
    leagueLogo: '/images/sports/league.png',
    isLive: true,
    period: '上半场',
    clock: '38:12',
    homeTeamName: '拜仁慕尼黑',
    homeTeamLogo: '/images/sports/homeTeam.png',
    awayTeamName: '多特蒙德',
    awayTeamLogo: '/images/sports/awayTeam.png',
    hasDraw: true,
    extraMarketCount: 20,
    hasVideo: true,
    hasAni: false,
    stats: { homeCorner: 2, awayCorner: 1, homeRed: 0, awayRed: 0, homeYellow: 1, awayYellow: 2, homeScore: 1, awayScore: 0 },
    odds: {
      home: { win: '1.65', winChange: 'up', handicap: '1.72', handicapChange: 'same', handicapLine: '-1', over: '1.85', overChange: 'same', overLine: '3.5' },
      away: { win: '4.80', winChange: 'down', handicap: '2.20', handicapChange: 'up', handicapLine: '+1', under: '2.00', underChange: 'same', underLine: '3.5' },
      draw: '3.90', drawChange: 'up',
    },
  },
  {
    matchId: 'm005',
    leagueName: '意大利甲级联赛',
    leagueLogo: '/images/sports/league.png',
    isLive: false,
    time: '明日 02:45',
    homeTeamName: '尤文图斯',
    homeTeamLogo: '/images/sports/homeTeam.png',
    awayTeamName: 'AC米兰',
    awayTeamLogo: '/images/sports/awayTeam.png',
    hasDraw: true,
    extraMarketCount: 16,
    hasVideo: false,
    hasAni: true,
    stats: { homeCorner: 0, awayCorner: 0, homeRed: 0, awayRed: 0, homeYellow: 0, awayYellow: 0, homeScore: 0, awayScore: 0 },
    odds: {
      home: { win: '2.35', winChange: 'same', handicap: '2.05', handicapChange: 'same', handicapLine: '+0.5', over: '1.90', overChange: 'same', overLine: '2.5' },
      away: { win: '2.80', winChange: 'same', handicap: '1.90', handicapChange: 'same', handicapLine: '-0.5', under: '1.92', underChange: 'same', underLine: '2.5' },
      draw: '3.40', drawChange: 'same',
    },
  },
];

const openMatchSideFromBottomNav = () => {
  showMatchResult.value = false;
  showBetHistory.value = false;
  const first = demoMatches[0];
  if (first) {
    activeMatchId.value = first.matchId;
    showMatchSide.value = true;
  }
};

const openMatchResultPage = () => {
  handleCloseSide();
  showBetHistory.value = false;
  showMatchResult.value = true;
};

const openBetHistoryPage = () => {
  handleCloseSide();
  showMatchResult.value = false;
  showBetHistory.value = true;
  if (route.path !== '/h5') {
    router.push('/h5');
  }
};

const h5GoHome = () => {
  showMatchResult.value = false;
  showBetHistory.value = false;
  handleCloseSide();
  if (route.path !== '/h5') {
    router.push('/h5');
  }
};

provide('h5OpenMatchSide', openMatchSideFromBottomNav);
provide('h5OpenMatchResult', openMatchResultPage);
provide('h5OpenBetHistory', openBetHistoryPage);
provide('h5ShowMatchResult', showMatchResult);
provide('h5ShowBetHistory', showBetHistory);
provide('h5GoHome', h5GoHome);

const openBetSlipDrawer = () => {
  showBetSlip.value = true;
};
provide('h5OpenBetSlip', openBetSlipDrawer);
</script>
