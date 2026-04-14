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
          <template v-if="match.matchPeriodStartTime > 0">{{ getInPlayDuration(match.matchPeriodStartTime) }}</template>
          <template v-else>{{ dayjs(match.matchTime).format('HH:mm') }}</template>
        </div>
      </div>
    </div>

    <!-- 隊伍資訊 -->
    <div class="col-span-2 border-x border-slate-300 bg-surface">
      <!-- 表頭 -->
      <div class="min-h-8 grid grid-cols-[1fr_30px_30px_30px_30px] border-b border-slate-300 text-center font-semibold px-2 py-1" v-if="matchIndex === 0">
        <template v-if="matchTimeType == 1">
          <div></div>
          <div>
            <n-tooltip trigger="hover">
              <template #trigger>
                <img class="m-auto w-5 h-5" src="/images/football-icon/full-score.png"></img>
              </template>
              {{ $t('label.score') }}
            </n-tooltip>
          </div>
          <div>
            <n-tooltip trigger="hover">
              <template #trigger>
                <img class="m-auto w-5 h-5" src="/images/football-icon/full-corner.png"></img>
              </template>
              {{ $t('label.corner') }}
            </n-tooltip>
          </div>
          <div>
            <n-tooltip trigger="hover">
              <template #trigger>
                <img class="m-auto w-5 h-5" src="/images/football-icon/full-red.png"></img>
              </template>
              {{ $t('label.redCard') }}
            </n-tooltip>
          </div>
          <div>
            <n-tooltip trigger="hover">
              <template #trigger>
                <img class="m-auto w-5 h-5" src="/images/football-icon/full-yellow.png"></img>
              </template>
              {{ $t('label.yellowCard') }}
            </n-tooltip>
          </div>
        </template>
      </div>
      <div class="grid grid-rows-3 min-h-28 px-2 py-1 gap-2">
        <!-- 主隊 -->
        <div class="grid grid-cols-[1fr_30px_30px_30px_30px] items-center">
          <div class="flex items-center gap-2 min-w-0">
            <img :src="match.homeTeamLogo" alt="" class="h-6 w-6 object-contain" onerror="this.src='/images/sports/homeTeam.png'" />
            <div class="truncate">{{ match.homeTeamName }}</div>
          </div>
          <template v-if="matchTimeType == 1">
            <div class="text-center">{{ match.footballData.homeScore ?? '-' }}</div>
            <div class="text-center">{{ match.footballData.homeCorner ?? '-' }}</div>
            <div class="text-center"> {{ match.footballData.homeRedCard ?? '-' }}</div>
            <div class="text-center">{{ match.footballData.homeYellowCard ?? '-' }}</div>
          </template>
        </div>

        <!-- 客隊 -->
        <div class="grid grid-cols-[1fr_30px_30px_30px_30px] items-center">
          <div class="flex items-center gap-2 min-w-0">
            <img :src="match.awayTeamLogo" alt="" class="h-6 w-6 object-contain" onerror="this.src='/images/sports/awayTeam.png'" />
            <div class="truncate">{{ match.awayTeamName }}</div>
          </div>
          <template v-if="matchTimeType == 1">
            <div class="text-center">{{ match.footballData.awayScore ?? '-' }}</div>
            <div class="text-center">{{ match.footballData.awayCorner ?? '-' }}</div>
            <div class="text-center">{{ match.footballData.awayRedCard ?? '-' }}</div>
            <div class="text-center">{{ match.footballData.awayYellowCard ?? '-' }}</div>
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
import { computed, onMounted, onUnmounted, ref } from 'vue';
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
  ["1", {
    marketLabel: '全场独赢',
    outcomeMap: new Map([
      ["1_1", { outcomeLabel: '主队' }],
      ["1_2", { outcomeLabel: '客队' }],
      ["1_3", { outcomeLabel: '平' }],
    ]),
  }],
  ["2", {
    marketLabel: '全场让球',
    outcomeMap: new Map([
      ["2_1", { outcomeLabel: '主队' }],
      ["2_2", { outcomeLabel: '客队' }],
    ]),
  }],
  ["3", {
    marketLabel: '全场大/小',
    outcomeMap: new Map([
      ["3_4", { outcomeLabel: '大' }],
      ["3_5", { outcomeLabel: '小' }],
    ]),
  }],
  ["6", {
    marketLabel: '上半场独赢',
    outcomeMap: new Map([
      ["6_1", { outcomeLabel: '主队' }],
      ["6_2", { outcomeLabel: '客队' }],
      ["6_3", { outcomeLabel: '平' }],
    ]),
  }],
  ["7", {
    marketLabel: '上半场让球',
    outcomeMap: new Map([
      ["7_1", { outcomeLabel: '主队' }],
      ["7_2", { outcomeLabel: '客队' }],
    ]),
  }],
  ["5", {
    marketLabel: '上半场大/小',
    outcomeMap: new Map([
      ["5_4", { outcomeLabel: '大' }],
      ["5_5", { outcomeLabel: '小' }],
    ]),
  }],
]);

const hiddenMarket = ['5', '6', '7'];

const betStore = useBetStore();
const matchStore = useMatchStore();
const now = useNow();

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

const getInPlayDuration = (matchTime: number) => {
  const diff = now.value - matchTime;
  const dur = dayjs.duration(diff);

  const totalMinutes = String(Math.floor(dur.asMinutes())).padStart(2, '0');
  const seconds = String(dur.seconds()).padStart(2, '0');

  return `${totalMinutes}:${seconds}`;
};
</script>

<style lang="scss" scoped></style>