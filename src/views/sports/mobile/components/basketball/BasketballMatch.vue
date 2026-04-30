<template>
  <div class="bg-surface rounded-sm p-2">
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-1">
        <img :src="match.leagueLogo" alt="" onerror="this.src='/images/sports/league.png'" class="w-4 h-4 object-contain">
        <span>{{ match.leagueName }}</span>
      </div>
      <div class="flex items-center gap-2">
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

    <div class="grid grid-cols-5 gap-2">
      <!-- 左側隊伍 -->
      <div class="col-span-2 grid grid-rows-[20px_repeat(2,_minmax(0,1fr))]">
        <div></div>
        <div class="flex items-center gap-2 min-w-0">
          <img :src="match.homeTeamLogo" alt="" class="h-6 w-6 object-contain" onerror="this.src='/images/sports/homeTeam.png'" />
          <div class="truncate">{{ match.homeTeamName }}</div>
        </div>
        <div class="flex items-center gap-2 min-w-0">
          <img :src="match.awayTeamLogo" alt="" class="h-6 w-6 object-contain" onerror="this.src='/images/sports/awayTeam.png'" />
          <div class="truncate">{{ match.awayTeamName }}</div>
        </div>
      </div>

      <!-- 右側投注項目 -->
      <template v-for="[marketMapKey, marketMapItem] in marketMap" :key="marketMapKey">
        <div>
          <div class="text-center">{{ $t(`market_id.${marketMapKey}`) }}</div>
          <div class="flex flex-col gap-1 text-xs">
            <template v-for="[outcomeMapKey, outcomeMapItem] in marketMapItem.outcomeMap" :key="outcomeMapKey">
              <template v-if="getMarket(match, marketMapKey)">
                <div class="min-h-10 flex flex-col items-center rounded-md bg-outcome bg-surface-hover p-1 cursor-pointer" @click="betStore.setBetsList(match.leagueId, match, getMarket(match, marketMapKey), getOutcome(match, marketMapKey, outcomeMapKey))">
                  <div class="text-center">{{ getOutcome(match, marketMapKey, outcomeMapKey)?.teamHandicap ?? '' }}</div>
                  <div class="font-bold m-auto space-x-1" :class="{
                    'text-green-500': getOddsChange(match, marketMapKey, outcomeMapKey) === 'up',
                    'text-red-500': getOddsChange(match, marketMapKey, outcomeMapKey) === 'down',
                  }">
                    <span>{{ getOutcome(match, marketMapKey, outcomeMapKey)?.odds ?? '-' }}</span>
                    <n-icon size="10" v-html="Triangle12Filled" v-if="getOddsChange(match, marketMapKey, outcomeMapKey) !== 'same'" :class="{ 'rotate-180': getOddsChange(match, marketMapKey, outcomeMapKey) === 'down' }" />
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="min-h-10 flex-1 inline-flex items-center justify-center rounded-md bg-outcome p-1">
                  <n-icon size="15" v-html="Lock"></n-icon>
                </div>
              </template>
            </template>
          </div>
        </div>
      </template>
    </div>

    <div class="flex items-center mt-1">
      <div class="flex items-center gap-1 text-xs cursor-pointer text-blue-400" @click="matchStore.handleMoreBets(match.matchId, 'score')">
        <span>{{ $t('label.moreMarkets') }}</span>
        <span>{{ match.extraMarketCount }}</span>
        <n-icon size="9" v-html="Triangle12Filled" class="rotate-90"></n-icon>
      </div>

      <div class="flex items-center gap-2 ml-auto">
        <n-icon size="24" v-html="Shipin" class="cursor-pointer" @click="matchStore.handleMoreBets(match.matchId, 'live')" v-if="match.videoInfo.hasVideo"></n-icon>
        <n-icon size="24" v-html="Donghua" class="cursor-pointer" @click="matchStore.handleMoreBets(match.matchId, 'ani')" v-if="match.animationInfo.hasAnimation"></n-icon>
        <n-icon size="24" v-html="Shuju" class="cursor-pointer" @click="matchStore.handleMoreBets(match.matchId, 'score')"></n-icon>
      </div>
    </div>

    <div class="flex gap-2 text-xs mt-1" v-if="matchTimeType == 1">
      <template v-if="match.totalPeriods != 2">
        <!-- 第1節 -->
        <div class="flex items-center justify-center gap-0.5">
          <span class="text-center">{{ match.basketballData?.q1Home ?? '-' }}</span>
          <span>:</span>
          <span class="text-center">{{ match.basketballData?.q1Away ?? '-' }}</span>
        </div>

        <!-- 第2節 -->
        <div class="flex items-center justify-center">
          <span class="text-center">{{ match.basketballData?.q2Home ?? '-' }}</span>
          <span>:</span>
          <span class="text-center">{{ match.basketballData?.q2Away ?? '-' }}</span>
        </div>

        <!-- 第3節 -->
        <div class="flex items-center justify-center">
          <span class="text-center">{{ match.basketballData?.q3Home ?? '-' }}</span>
          <span>:</span>
          <span class="text-center">{{ match.basketballData?.q3Away ?? '-' }}</span>
        </div>

        <!-- 第4節 -->
        <div class="flex items-center justify-center">
          <span class="text-center">{{ match.basketballData?.q4Home ?? '-' }}</span>
          <span>:</span>
          <span class="text-center">{{ match.basketballData?.q4Away ?? '-' }}</span>
        </div>
      </template>
      <template v-else>
        <!-- 上半場 -->
        <div class="flex items-center justify-center gap-0.5">
          <span class="text-center">{{ match.basketballData?.firstHalfHomeScore ?? '-' }}</span>
          <span>:</span>
          <span class="text-center">{{ match.basketballData?.firstHalfAwayScore ?? '-' }}</span>
        </div>

        <!-- 下半場 -->
        <div class="flex items-center justify-center gap-0.5">
          <span class="text-center">{{ match.basketballData?.secondHalfHomeScore ?? '-' }}</span>
          <span>:</span>
          <span class="text-center">{{ match.basketballData?.secondHalfAwayScore ?? '-' }}</span>
        </div>
      </template>

      <div class="flex items-center justify-center">
        <span class="text-center">{{ match.basketballData?.homeScore ?? '-' }}</span>
        <span>:</span>
        <span class="text-center">{{ match.basketballData?.awayScore ?? '-' }}</span>
      </div>
    </div>
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
import { useNow } from '@/composables/useNow';
import { useMatchStore } from '@/store/module/match';

const props = defineProps<{
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
]);

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
  const prevMatch = props.prevMatch.datas.find((m: { matchId: string; }) => m.matchId === match.matchId);

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