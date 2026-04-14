<template>
  <div class="grid border-b border-slate-300" :class="{ 'border-t': matchIndex === 0, 'grid-cols-[120px_1fr_repeat(4,_minmax(0,1fr))]': matchStore.collapseSide, 'grid-cols-[120px_1fr_repeat(7,_minmax(0,1fr))]': !matchStore.collapseSide }">
    <!-- 左側比賽資訊 -->
    <div class="col-span-1 border-x border-slate-300 bg-surface">
      <div class="min-h-8 border-b border-slate-300 px-2 py-1" v-if="matchIndex === 0"></div>
      <div class="grid grid-rows-3 min-h-28 px-2 py-1 gap-2">
        <div class="flex items-center">
          <template v-if="match.matchPeriodStartTime <= 0">{{ dayjs(match.matchTime).format('YYYY-MM-DD') }}</template>
          <template v-else-if="match.matchPeriodId == ''">{{ $t('label.inPlay') }}</template>
          <template v-else>{{ match.matchPeriodName }}</template>
        </div>
        <div class="flex items-center">
          <template v-if="match.matchPeriodStartTime > 0">{{ getInPlayDuration(match.matchElapsedSeconds) }}</template>
          <template v-else>{{ dayjs(match.matchTime).format('HH:mm') }}</template>
        </div>
      </div>
    </div>

    <!-- 隊伍資訊 -->
    <div class="col-span-2 border-x border-slate-300 bg-surface">
      <!-- 表頭 -->
      <div class="min-h-8 grid border-b border-slate-300 text-center font-semibold px-2 py-1" :style="{ gridTemplateColumns: `1fr repeat(${match.totalPeriods}, minmax(0,30px)) 30px` }" v-if="matchIndex === 0">
        <template v-if="matchTimeType == 1">
          <div></div>
          <template v-if="match.totalPeriods != 2">
            <div v-for="i in match.totalPeriods">
              <n-tooltip trigger="hover">
                <template #trigger>
                  <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
                    {{ i }}
                  </span>
                </template>
                {{ $t(`label.q${i}`) }}
              </n-tooltip>
            </div>
          </template>
          <template v-else>
            <div>
              <n-tooltip trigger="hover">
                <template #trigger>
                  <span>FH</span>
                </template>
                {{ $t('label.firstHalf') }}
              </n-tooltip>
            </div>
            <div>
              <n-tooltip trigger="hover">
                <template #trigger>
                  <span>SH</span>
                </template>
                {{ $t('label.secondHalf') }}
              </n-tooltip>
            </div>
          </template>
          <div>
            <n-tooltip trigger="hover">
              <template #trigger>
                <span>T</span>
              </template>
              {{ $t('label.totalScore') }}
            </n-tooltip>
          </div>
        </template>
      </div>
      <div class="grid grid-rows-3 min-h-28 px-2 py-1 gap-2">
        <!-- 主隊 -->
        <div class="grid items-center" :style="matchTimeType == 1
          ? { gridTemplateColumns: `1fr repeat(${match.totalPeriods}, minmax(0,30px)) 30px` }
          : {}">
          <div class="flex items-center gap-2 min-w-0">
            <img :src="match.homeTeamLogo" alt="" class="h-6 w-6 object-contain" onerror="this.src='/images/sports/homeTeam.png'" />
            <div class="truncate">{{ match.homeTeamName }}</div>
          </div>
          <template v-if="matchTimeType == 1">
            <template v-if="match.totalPeriods != 2">
              <div class="text-center">{{ match.basketballData?.q1Home ?? '-' }}</div>
              <div class="text-center">{{ match.basketballData?.q2Home ?? '-' }}</div>
              <div class="text-center">{{ match.basketballData?.q3Home ?? '-' }}</div>
              <div class="text-center">{{ match.basketballData?.q4Home ?? '-' }}</div>
            </template>
            <template v-else>
              <div class="text-center">{{ match.basketballData?.firstHalfHomeScore ?? '-' }}</div>
              <div class="text-center">{{ match.basketballData?.secondHalfHomeScore ?? '-' }}</div>
            </template>
            <div class="text-center">{{ match.basketballData?.homeScore ?? '-' }}</div>
          </template>
        </div>

        <!-- 客隊 -->
        <div class="grid items-center" :style="matchTimeType == 1
          ? { gridTemplateColumns: `1fr repeat(${match.totalPeriods}, minmax(0,30px)) 30px` }
          : {}">
          <div class="flex items-center gap-2 min-w-0">
            <img :src="match.awayTeamLogo" alt="" class="h-6 w-6 object-contain" onerror="this.src='/images/sports/awayTeam.png'" />
            <div class="truncate">{{ match.awayTeamName }}</div>
          </div>
          <template v-if="matchTimeType == 1">
            <template v-if="match.totalPeriods != 2">
              <div class="text-center">{{ match.basketballData?.q1Away ?? '-' }}</div>
              <div class="text-center">{{ match.basketballData?.q2Away ?? '-' }}</div>
              <div class="text-center">{{ match.basketballData?.q3Away ?? '-' }}</div>
              <div class="text-center">{{ match.basketballData?.q4Away ?? '-' }}</div>
            </template>
            <template v-else>
              <div class="text-center">{{ match.basketballData?.firstHalfAwayScore ?? '-' }}</div>
              <div class="text-center">{{ match.basketballData?.secondHalfAwayScore ?? '-' }}</div>
            </template>
            <div class="text-center">{{ match.basketballData?.awayScore ?? '-' }}</div>
          </template>
        </div>

        <div class="flex items-center">
          <div class="flex items-center gap-2 cursor-pointer text-blue-400" @click="matchStore.handleMoreBets(match.matchId, 'score')">
            <span>{{ $t('label.moreMarkets') }}</span>
            <span>{{ match.extraMarketCount }}</span>
            <n-icon size="10" v-html="Triangle12Filled" class="rotate-90"></n-icon>
          </div>
          <div class="ml-auto space-x-2">
            <n-icon size="24" v-html="Shipin" class="ml-auto cursor-pointer" @click="matchStore.handleMoreBets(match.matchId, 'live')" v-if="match.videoInfo.hasVideo"></n-icon>
            <n-icon size="24" v-html="Donghua" class="ml-auto cursor-pointer" @click="matchStore.handleMoreBets(match.matchId, 'ani')" v-if="match.animationInfo.hasAnimation"></n-icon>
            <n-icon size="24" v-html="Shuju" class="ml-auto cursor-pointer" @click="matchStore.handleMoreBets(match.matchId, 'score')"></n-icon>
          </div>
        </div>
      </div>
    </div>

    <!-- 賠率 -->
    <template v-for="[marketMapKey, marketMapItem] in marketMap" :key="marketMapKey">
      <div class="col-span-1 border-r border-slate-300 bg-surface" :class="{ 'hidden': matchStore.collapseSide && hiddenMarket.includes(marketMapKey) }">
        <div class="flex min-h-8 border-b border-slate-300 px-2 py-1" v-if="matchIndex === 0">
          <span class="flex-1 text-center">{{ $t(`market_id.${marketMapKey}`) }}</span>
        </div>
        <div class="grid grid-rows-3 px-2 py-1 gap-2">
          <template v-for="[outcomeMapKey, outcomeMapItem] in marketMapItem.outcomeMap" :key="outcomeMapKey">
            <template v-if="getMarket(match, marketMapKey)">
              <div class="flex items-center gap-2">
                <div class="flex-1 flex items-center gap-1 min-h-8 rounded-md bg-outcome bg-surface-hover p-1 cursor-pointer" @click="betStore.setBetsList(sportMatch.leagueId, match, getMarket(match, marketMapKey), getOutcome(match, marketMapKey, outcomeMapKey))">
                  <div class="text-center">{{ $t(`outcome_id.${outcomeMapKey}`) }}</div>
                  <div>{{ getOutcome(match, marketMapKey, outcomeMapKey)?.teamHandicap ?? '-' }}</div>
                  <div class="font-bold space-x-1 ml-auto" :class="{
                    'text-green-500': getOddsChange(match, marketMapKey, outcomeMapKey) === 'up',
                    'text-red-500': getOddsChange(match, marketMapKey, outcomeMapKey) === 'down',
                  }">
                    <span>{{ getOutcome(match, marketMapKey, outcomeMapKey)?.odds ?? '-' }}</span>
                    <n-icon size="10" v-html="Triangle12Filled" v-if="getOddsChange(match, marketMapKey, outcomeMapKey) !== 'same'" :class="{ 'rotate-180': getOddsChange(match, marketMapKey, outcomeMapKey) === 'down' }" />
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="flex-1 inline-flex items-center justify-center min-h-8 rounded-md bg-outcome p-1">
                <n-icon size="20" v-html="Lock"></n-icon>
              </div>
            </template>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">

import { NIcon, NTooltip } from 'naive-ui';
import { MatchInfo } from '@/model/sport';
import { useBetStore } from '@/store/module/bet';
import Triangle12Filled from "@/assets/fluent/Triangle12Filled.svg?raw";
import Lock from "@/assets/tabler/Lock.svg?raw";
import Donghua from "@/assets/donghua.svg?raw";
import Shuju from "@/assets/shuju.svg?raw";
import Shipin from "@/assets/shipin.svg?raw";
import dayjs from "dayjs";
import { computed, onBeforeUnmount, onMounted, onUnmounted, ref, watch } from 'vue';
import { useNow } from '@/composables/useNow';
import { useMatchStore } from '@/store/module/match';

const props = defineProps<{
  sportMatch: any;
  match: any;
  matchIndex: number;
  prevMatch: any;
  matchTimeType: any;
}>();

const marketMap = new Map([
  ["1001", {
    marketLabel: '全场独赢',
    outcomeMap: new Map([
      ["1001_1", { outcomeLabel: '主队' }],
      ["1001_2", { outcomeLabel: '客队' }],
    ]),
  }],
  ["1002", {
    marketLabel: '全场让分',
    outcomeMap: new Map([
      ["1002_1", { outcomeLabel: '主队' }],
      ["1002_2", { outcomeLabel: '客队' }],
    ]),
  }],
  ["1003", {
    marketLabel: '总分大小',
    outcomeMap: new Map([
      ["1003_4", { outcomeLabel: '大' }],
      ["1003_5", { outcomeLabel: '小' }],
    ]),
  }],
  ["1004", {
    marketLabel: '上半场独赢',
    outcomeMap: new Map([
      ["1004_1", { outcomeLabel: '主队' }],
      ["1004_2", { outcomeLabel: '客队' }],
    ]),
  }],
  ["1005", {
    marketLabel: '上半场让分',
    outcomeMap: new Map([
      ["1005_1", { outcomeLabel: '主队' }],
      ["1005_2", { outcomeLabel: '客队' }],
    ]),
  }],
  ["1006", {
    marketLabel: '上半场总分大小',
    outcomeMap: new Map([
      ["1006_4", { outcomeLabel: '大' }],
      ["1006_5", { outcomeLabel: '小' }],
    ]),
  }],
]);

const hiddenMarket = ['1004', '1005', '1006'];

const betStore = useBetStore();
const matchStore = useMatchStore();

const getMarket = (match: any, marketId: string) => {
  return match.marketList.find((m: any) => m.marketId === marketId);
};

const getOutcome = (match: any, marketId: string, outcomeId: string) => {
  return getMarket(match, marketId)?.outcomeList.find((o: any) => o.outcomeId === outcomeId);
};

const getOddsChange = (match: MatchInfo, marketId: string, outcomeId: string): 'up' | 'down' | 'same' => {
  const prevMatch = props.prevMatch.datas
    .flatMap((data: { matchList: any; }) => data.matchList)
    .find((m: { matchId: string; }) => m.matchId === match.matchId);

  if (!prevMatch) return 'same';

  const prevOdds = getOutcome(prevMatch, marketId, outcomeId)?.odds;
  const currOdds = getOutcome(match, marketId, outcomeId)?.odds;

  if (prevOdds === undefined || currOdds === undefined) return 'same';
  if (currOdds > prevOdds) return 'up';
  if (currOdds < prevOdds) return 'down';
  return 'same';
};

const getInPlayDuration = (seconds: number) => {
  const min = String(Math.floor(seconds / 60)).padStart(2, '0');
  const sec = String(seconds % 60).padStart(2, '0');

  return `${min}:${sec}`;
};

</script>

<style lang="scss" scoped></style>