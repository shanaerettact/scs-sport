<template>
  <div class="match-card">
    <div class="league-header">
      <img :src="match.leagueLogo" alt="" onerror="this.src='/images/sports/league.png'" class="w-[14px] h-[14px] object-contain rounded-sm opacity-90" />
      <span class="text-[11px] font-medium text-subtle truncate flex-1">{{ match.leagueName }}</span>
      <div class="flex items-center gap-1.5 ml-auto shrink-0">
        <template v-if="matchTimeType == 1">
          <span class="live-badge">LIVE</span>
          <span class="text-[11px] font-semibold text-red-500">{{ match.matchPeriodId == '' || match.matchPeriodName == '' ? $t('label.inPlay') : match.matchPeriodName }}</span>
        </template>
        <template v-else>
          <span class="text-[11px] text-subtle-light tabular-nums">{{ dayjs(match.matchTime).format('MM/DD HH:mm') }}</span>
        </template>
      </div>
    </div>

    <div class="p-2.5">
      <div class="grid grid-cols-5 gap-2">
        <div class="col-span-2 flex flex-col justify-between gap-1 pr-1">
          <div class="h-5"></div>
          <div class="flex items-center gap-1.5 min-w-0 py-0.5">
            <img :src="match.homeTeamLogo" alt="" class="h-[22px] w-[22px] object-contain rounded-sm flex-shrink-0" onerror="this.src='/images/sports/homeTeam.png'" />
            <span class="truncate text-[12.5px] font-semibold text-main leading-tight">{{ match.homeTeamName }}</span>
          </div>
          <div class="flex items-center gap-1.5 min-w-0 py-0.5">
            <img :src="match.awayTeamLogo" alt="" class="h-[22px] w-[22px] object-contain rounded-sm flex-shrink-0" onerror="this.src='/images/sports/awayTeam.png'" />
            <span class="truncate text-[12.5px] font-semibold text-main leading-tight">{{ match.awayTeamName }}</span>
          </div>
        </div>

        <template v-for="[marketMapKey, marketMapItem] in marketMap" :key="marketMapKey">
          <div class="flex flex-col gap-1">
            <div class="text-center text-[10px] font-medium text-subtle-light h-5 flex items-center justify-center">
              {{ $t(`market_id.${marketMapKey}`) }}
            </div>
            <template v-for="[outcomeMapKey, outcomeMapItem] in marketMapItem.outcomeMap" :key="outcomeMapKey">
              <template v-if="getMarket(match, marketMapKey)">
                <div
                  class="outcome-btn min-h-[38px] flex flex-col items-center justify-center px-1 py-1"
                  :class="{
                    'odds-up':   getOddsChange(match, marketMapKey, outcomeMapKey) === 'up',
                    'odds-down': getOddsChange(match, marketMapKey, outcomeMapKey) === 'down',
                  }"
                  @click="betStore.setBetsList(match.leagueId, match, getMarket(match, marketMapKey), getOutcome(match, marketMapKey, outcomeMapKey))"
                >
                  <div class="text-center text-[10px] text-subtle leading-tight">{{ getOutcome(match, marketMapKey, outcomeMapKey)?.teamHandicap ?? '' }}</div>
                  <div class="font-bold text-[13px] leading-tight flex items-center gap-0.5"
                    :class="{
                      'text-emerald-500': getOddsChange(match, marketMapKey, outcomeMapKey) === 'up',
                      'text-red-500':     getOddsChange(match, marketMapKey, outcomeMapKey) === 'down',
                      'text-main':        getOddsChange(match, marketMapKey, outcomeMapKey) === 'same',
                    }">
                    <span>{{ getOutcome(match, marketMapKey, outcomeMapKey)?.odds ?? '-' }}</span>
                    <n-icon size="8" v-html="Triangle12Filled" v-if="getOddsChange(match, marketMapKey, outcomeMapKey) !== 'same'" :class="{ 'rotate-180': getOddsChange(match, marketMapKey, outcomeMapKey) === 'down' }" />
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="outcome-btn min-h-[38px] flex items-center justify-center opacity-50">
                  <n-icon size="14" v-html="Lock" />
                </div>
              </template>
            </template>
          </div>
        </template>
      </div>
    </div>

    <div class="section-divider"></div>
    <div class="flex items-center px-2.5 py-1.5 gap-2">
      <button class="flex items-center gap-1 text-[11px] font-medium text-[var(--color-primary)] cursor-pointer bg-transparent border-none p-0" @click="matchStore.handleMoreBets(match.matchId, 'score')">
        <span>{{ $t('label.moreMarkets') }}</span>
        <span class="opacity-70">{{ match.extraMarketCount }}</span>
        <n-icon size="8" v-html="Triangle12Filled" class="rotate-90 opacity-70" />
      </button>
      <div class="flex items-center gap-1.5 text-[11px] text-subtle-light ml-auto" v-if="matchTimeType == 1">
        <span class="font-semibold text-main tabular-nums">{{ match.tabletennisData?.homeScore ?? '-' }}:{{ match.tabletennisData?.awayScore ?? '-' }}</span>
      </div>
      <div class="flex items-center gap-2 text-subtle-light" :class="matchTimeType == 1 ? '' : 'ml-auto'">
        <n-icon size="20" v-html="Shipin" class="cursor-pointer hover:text-[var(--color-primary)] transition-colors" @click="matchStore.handleMoreBets(match.matchId, 'live')" v-if="match.videoInfo.hasVideo" />
        <n-icon size="20" v-html="Donghua" class="cursor-pointer hover:text-[var(--color-primary)] transition-colors" @click="matchStore.handleMoreBets(match.matchId, 'ani')" v-if="match.animationInfo.hasAnimation" />
        <n-icon size="20" v-html="Shuju" class="cursor-pointer hover:text-[var(--color-primary)] transition-colors" @click="matchStore.handleMoreBets(match.matchId, 'score')" />
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
  ["4001", {
    marketLabel: '全场独赢',
    outcomeMap: new Map([
      ["4001_1", { outcomeLabel: '' }],
      ["4001_2", { outcomeLabel: '' }],
    ]),
  }],
  ["4002", {
    marketLabel: '让分',
    outcomeMap: new Map([
      ["4002_1", { outcomeLabel: '' }],
      ["4002_2", { outcomeLabel: '' }],
    ]),
  }],
  ["4003", {
    marketLabel: '总分大小',
    outcomeMap: new Map([
      ["4003_4", { outcomeLabel: '' }],
      ["4003_5", { outcomeLabel: '' }],
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

</script>

<style lang="scss" scoped></style>
