<template>
  <div class="bg-surface-soft rounded-md p-2" v-show="!matchStore.collapseSide">
    <n-button size="small" type="primary" @click="matchStore.collapseSide = !matchStore.collapseSide">
      <n-icon size="18" v-html="ArrowBack"></n-icon>
    </n-button>
  </div>
  <div class="w-full bg-surface-soft rounded-md p-3 more-bets" v-show="matchStore.collapseSide">
    <div class="flex mb-2">
      <n-button size="small" type="primary" @click="matchStore.collapseSide = !matchStore.collapseSide">
        <n-icon size="18" v-html="ArrowForward"></n-icon>
      </n-button>
      <div class="flex gap-2 ml-auto" v-if="matchStore.collapseSide">
        <template v-if="['fb', 'dcr'].includes(userStore.productId)">
          <n-tooltip trigger="hover" placement="top" v-if="matchStore.hasVideo">
            <template #trigger>
              <n-button size="small" :type="matchStore.viewMode === 'video' ? 'primary' : 'default'" @click="matchStore.handleShowVideo()">
                <n-icon size="18" v-html="Shipin"></n-icon>
              </n-button>
            </template>
            {{ $t('label.video') }}
          </n-tooltip>
          <n-tooltip trigger="hover" placement="top" v-if="matchStore.hasAni">
            <template #trigger>
              <n-button size="small" :type="matchStore.viewMode === 'ani' ? 'primary' : 'default'" @click="matchStore.handleShowAni()">
                <n-icon size="18" v-html="Donghua"></n-icon>
              </n-button>
            </template>
            {{ $t('label.animation') }}
          </n-tooltip>
        </template>
        <n-tooltip trigger="hover" placement="top">
          <template #trigger>
            <n-button size="small" :type="matchStore.viewMode === 'score' ? 'primary' : 'default'" @click="matchStore.handleShowScore()">
              <n-icon size="18" v-html="Shuju"></n-icon>
            </n-button>
          </template>
          {{ $t('label.scoreboard') }}
        </n-tooltip>
      </div>
    </div>
    <template v-if="matchStore.viewMode === 'video'">
      <div class="flex justify-center">
        <n-spin :show="iframeLoading" size="large">
          <iframe :src="matchStore.respSportMarketList.videoInfo.webUrl" frameborder="0" @load="iframeLoading = false" :style="{ width: iframeSize.width + 'px', height: iframeSize.height + 'px' }"></iframe>
        </n-spin>
      </div>
    </template>
    <template v-else-if="matchStore.viewMode === 'ani'">
      <div class="flex justify-center">
        <n-spin :show="iframeLoading" size="large">
          <iframe :src="matchStore.respSportMarketList.animationInfo.animationUrl" frameborder="0" @load="iframeLoading = false" :style="{ width: iframeSize.width + 'px', height: iframeSize.height + 'px' }"></iframe>
        </n-spin>
      </div>
    </template>
    <template v-else>
      <component :is="getScoreboardComponent(userStore.sportType)" />
    </template>
    <div class="mt-4 space-y-2">
      <div class="flex justify-end gap-2 ml-auto">
        <template v-for="item in insightMap[userStore.sportType]">
          <n-tooltip trigger="hover" placement="top">
            <template #trigger>
              <n-button size="small" :type="matchStore.insightMode === item.mode ? 'primary' : 'default'" @click="matchStore.handleShowInsight(item.mode)">
                <n-icon size="18" v-html="item.icon"></n-icon>
              </n-button>
            </template>
            {{ $t('label.' + item.label) }}
          </n-tooltip>
        </template>
        <n-tooltip trigger="hover" placement="top">
          <template #trigger>
            <n-button size="small" :type="matchStore.insightMode === 'outcome' ? 'primary' : 'default'" @click="matchStore.handleShowInsight('outcome')">
              <n-icon size="18" v-html="SlideText20Regular"></n-icon>
            </n-button>
          </template>
          {{ $t('label.outcome') }}
        </n-tooltip>
      </div>
      <n-scrollbar :style="{ height: matchStore.viewMode !== 'score' ? `calc(100vh - ${nonScoreOffset}px)` : `calc(100vh - ${scoreOffset}px)` }">
        <template v-if="matchStore.insightMode === 'outcome'">
          <div v-for="market in matchStore.respSportMarketList.datas">
            <div class="text-subtle">{{ market.marketName }}</div>
            <div class="grid gap-2 mb-2" :class="[market.outcomeList.length == 3 ? 'grid-cols-3' : 'grid-cols-2']">
              <template v-for="outcome in market.outcomeList">
                <div class="flex justify-between rounded-md p-2 cursor-pointer bg-outcome side-outcome" @click="betStore.setBetsList(matchStore.respSportMarketList.leagueInfo.leagueId, matchStore.respSportMarketList.matchInfo, market, outcome)">
                  <span class="text-subtle truncate">{{ outcome.outcomeShowName }}</span>
                  <div class="flex items-center gap-1" :class="{
                    'text-green-500': getOddsChange(market.marketId, outcome.outcomeId) === 'up',
                    'text-red-500': getOddsChange(market.marketId, outcome.outcomeId) === 'down',
                    'text-main': getOddsChange(market.marketId, outcome.outcomeId) === 'same',
                  }">
                    <span>{{ outcome.odds }}</span>
                    <n-icon size="10" v-html="Triangle12Filled" v-if="getOddsChange(market.marketId, outcome.outcomeId) !== 'same'" :class="{ 'rotate-180': getOddsChange(market.marketId, outcome.outcomeId) === 'down' }" />
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>
        <template v-else>
          <component :is="getInsightComponent(userStore.sportType)" />
        </template>
      </n-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton, NIcon, NScrollbar, NSpin, NTooltip } from 'naive-ui';
import { useUserStore } from '@/store/module/user';
import { useBetStore } from '@/store/module/bet';
import { useMatchStore } from '@/store/module/match';
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { useLangStore } from '@/store/module/lang';
import FootballScoreboard from './football/FootballScoreboard.vue';
import BasketballScoreboard from './basketball/BasketballScoreboard.vue';
import BasketballAnalysis from './basketball/BasketballAnalysis.vue';
import ArrowBack from "@/assets/ionIcons5/ArrowBack.svg?raw";
import ArrowForward from "@/assets/ionIcons5/ArrowForward.svg?raw";
import Donghua from "@/assets/donghua.svg?raw";
import Shuju from "@/assets/shuju.svg?raw";
import Shipin from "@/assets/shipin.svg?raw";
import SlideText20Regular from "@/assets/fluent/SlideText20Regular.svg?raw";
import DeviceDesktopAnalytics from '@/assets/tabler/DeviceDesktopAnalytics.svg?raw';
import Triangle12Filled from "@/assets/fluent/Triangle12Filled.svg?raw";
import StatsChart from "@/assets/ionIcons5/StatsChart.svg?raw";
import Pitch from "@/assets/pitch.svg?raw";
import Live20Filled from "@/assets/fluent/Live20Filled.svg?raw";
import TennisScoreboard from './tennis/TennisScoreboard.vue';
import VolleyballScoreboard from './volleyball/VolleyballScoreboard.vue';
import TableTennisScoreboard from './tableTennis/TableTennisScoreboard.vue';
import BaseballScoreboard from './baseball/BaseballScoreboard.vue';
import BasketballLive from './basketball/BasketballLive.vue';
import BasketballStatistics from './basketball/BasketballStatistics.vue';
import FootballLineup from './football/FootballLineup.vue';
import FootballLive from './football/FootballLive.vue';

const langStore = useLangStore();
const userStore = useUserStore();
const betStore = useBetStore();
const matchStore = useMatchStore();

const intervalId = ref<ReturnType<typeof setInterval> | null>(null);
const iframeLoading = ref(true);

const insightMap: Record<string, Array<{ mode: string, label: string, icon: string; }>> = {
  '1': [
    { mode: 'live', label: 'realTime', icon: Live20Filled },
    { mode: 'lineup', label: 'lineup', icon: Pitch },
  ], // soccer
  '2': [
    { mode: 'live', label: 'realTime', icon: Live20Filled },
    { mode: 'statistics', label: 'statistics', icon: StatsChart },
    { mode: 'analysis', label: 'analysis', icon: DeviceDesktopAnalytics },
  ], // basketball
};

const sizeMap: Record<string, { width: number; height: number; }> = {
  '1': { width: 430, height: 300 }, // soccer
  '2': { width: 430, height: 350 }, // basketball
  '3': { width: 430, height: 300 }, // tennis
  '4': { width: 430, height: 300 }, // volleyball
  '5': { width: 430, height: 300 }, // table tennis
  '6': { width: 430, height: 300 }, // baseball
};

const iframeSize = computed(() => {
  const sportType = matchStore.respSportMarketList.matchInfo.sportType;
  return sizeMap[sportType] ?? { width: 430, height: 300 };
});

const baseNonScoreOffset = 237;
const baseScoreOffset = 125;

const currentIframeHeight = computed(() => {
  if (matchStore.viewMode === 'score') return 300;
  const sportType = matchStore.respSportMarketList.matchInfo.sportType;
  return sizeMap[sportType].height ?? 300;
});

const nonScoreOffset = computed(() => {
  return baseNonScoreOffset + currentIframeHeight.value;
});

const scoreOffset = computed(() => {
  return baseScoreOffset + currentIframeHeight.value;
});

const getMarket = (market: any, marketId: string) => {
  return market.find((m: any) => m.marketId === marketId);
};

const getOutcome = (market: any, marketId: string, outcomeId: string) => {
  return getMarket(market, marketId)?.outcomeList.find((o: any) => o.outcomeId === outcomeId);
};

const getOddsChange = (marketId: string, outcomeId: string): 'up' | 'down' | 'same' => {
  // 儲存的前一場玩法資料與當下使用的 matchId 不同，代表是其他賽事，預設顯示相同數據狀態
  if (matchStore.prevSportMarketList.matchInfo.matchId !== matchStore.matchId) {
    return 'same';
  }

  if (matchStore.prevSportMarketList.datas.length <= 0) return 'same';

  const prevOdds = getOutcome(matchStore.prevSportMarketList.datas, marketId, outcomeId)?.odds;
  const currOdds = getOutcome(matchStore.respSportMarketList.datas, marketId, outcomeId)?.odds;

  if (prevOdds === undefined || currOdds === undefined) return 'same';
  if (currOdds > prevOdds) return 'up';
  if (currOdds < prevOdds) return 'down';
  return 'same';
};

const getScoreboardComponent = (sportType: string) => {
  switch (Number(sportType)) {
    case 1:
      return FootballScoreboard;
    case 2:
      return BasketballScoreboard;
    case 3:
      return TennisScoreboard;
    case 4:
      return VolleyballScoreboard;
    case 5:
      return TableTennisScoreboard;
    case 6:
      return BaseballScoreboard;
  }
};

const getInsightComponent = (sportType: string) => {
  switch (Number(sportType)) {
    case 1:
      if (matchStore.insightMode === 'live') return FootballLive;
      if (matchStore.insightMode === 'lineup') return FootballLineup;
      break;
    case 2:
      if (matchStore.insightMode === 'analysis') return BasketballAnalysis;
      if (matchStore.insightMode === 'live') return BasketballLive;
      if (matchStore.insightMode === 'statistics') return BasketballStatistics;
      break;
  }
};

const setupInterval = () => {
  if (intervalId.value) clearInterval(intervalId.value);
  if (!matchStore.collapseSide) return;
  intervalId.value = setInterval(matchStore.getSportMarketList, 10000);
};

watch(
  () => userStore.oddsType, () => {
    matchStore.getSportMarketList();
  }
);

watch(
  () => langStore.current, () => {
    if (matchStore.collapseSide) {
      matchStore.needResetMatch = true;
    }
  }
);

watch(() => matchStore.viewMode, () => {
  iframeLoading.value = true;
});

watch(() => matchStore.collapseSide, (nV) => {
  if (nV === true) {
    setupInterval();
  } else {
    if (intervalId.value) clearInterval(intervalId.value);
  }
});

onBeforeUnmount(() => {
  if (intervalId.value) clearInterval(intervalId.value);
});
</script>

<style lang="scss" scoped>
.more-bets {
  .team {
    width: 100%;
    height: 190px;
    background-image: url('/images/sports/bg-match.png');
    background-repeat: no-repeat;
    background-size: cover;
    color: white;
  }
}
</style>