<template>
  <div class="match-card">
    <!-- ── League header ── -->
    <div class="league-header">
      <img
        :src="match.leagueLogo"
        alt=""
        onerror="this.src='/images/sports/league.png'"
        class="w-[14px] h-[14px] object-contain rounded-sm opacity-90"
      />
      <span class="text-[11px] font-medium text-subtle truncate flex-1">{{ match.leagueName }}</span>

      <!-- Status / time pill -->
      <div class="flex items-center gap-1.5 ml-auto shrink-0">
        <template v-if="match.matchPeriodStartTime > 0">
          <span class="live-badge">LIVE</span>
          <span class="text-[11px] font-semibold text-red-500">
            {{ match.matchPeriodId == '' ? $t('label.inPlay') : match.matchPeriodName }}
          </span>
          <span class="text-[11px] font-mono text-subtle-light tabular-nums">{{ getInPlayDuration(match.matchPeriodStartTime) }}</span>
        </template>
        <template v-else>
          <span class="text-[11px] text-subtle-light tabular-nums">{{ dayjs(match.matchTime).format('MM/DD') }}</span>
          <span class="text-[11px] font-semibold text-subtle tabular-nums">{{ dayjs(match.matchTime).format('HH:mm') }}</span>
        </template>
      </div>
    </div>

    <!-- ── Teams + Odds grid ── -->
    <div class="p-2.5">
      <div class="grid grid-cols-5 gap-2">
        <!-- Left: team names -->
        <div class="col-span-2 flex flex-col justify-between gap-1 pr-1">
          <!-- market header spacer -->
          <div class="h-5"></div>
          <div class="flex items-center gap-1.5 min-w-0 py-0.5">
            <img
              :src="match.homeTeamLogo"
              alt=""
              class="h-[22px] w-[22px] object-contain rounded-sm flex-shrink-0"
              onerror="this.src='/images/sports/homeTeam.png'"
            />
            <span class="truncate text-[12.5px] font-semibold text-main leading-tight">{{ match.homeTeamName }}</span>
          </div>
          <div class="flex items-center gap-1.5 min-w-0 py-0.5">
            <img
              :src="match.awayTeamLogo"
              alt=""
              class="h-[22px] w-[22px] object-contain rounded-sm flex-shrink-0"
              onerror="this.src='/images/sports/awayTeam.png'"
            />
            <span class="truncate text-[12.5px] font-semibold text-main leading-tight">{{ match.awayTeamName }}</span>
          </div>
        </div>

        <!-- Right: odds columns -->
        <template v-for="[marketMapKey, marketMapItem] in marketMap" :key="marketMapKey">
          <div class="flex flex-col gap-1">
            <!-- Market label -->
            <div class="text-center text-[10px] font-medium text-subtle-light h-5 flex items-center justify-center leading-tight">
              {{ $t(`market_id.${marketMapKey}`) }}
            </div>
            <!-- Outcome buttons -->
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
                  <div class="text-center text-[10px] text-subtle leading-tight">
                    <span v-if="marketMapKey == '1'">{{ $t(`outcome_id.${outcomeMapKey}`) }}</span>
                    <span>{{ getOutcome(match, marketMapKey, outcomeMapKey)?.teamHandicap ?? '' }}</span>
                  </div>
                  <div
                    class="font-bold text-[13px] leading-tight flex items-center gap-0.5"
                    :class="{
                      'text-emerald-500': getOddsChange(match, marketMapKey, outcomeMapKey) === 'up',
                      'text-red-500':     getOddsChange(match, marketMapKey, outcomeMapKey) === 'down',
                      'text-main':        getOddsChange(match, marketMapKey, outcomeMapKey) === 'same',
                    }"
                  >
                    <span>{{ getOutcome(match, marketMapKey, outcomeMapKey)?.odds ?? '-' }}</span>
                    <n-icon
                      size="8"
                      v-html="Triangle12Filled"
                      v-if="getOddsChange(match, marketMapKey, outcomeMapKey) !== 'same'"
                      :class="{ 'rotate-180': getOddsChange(match, marketMapKey, outcomeMapKey) === 'down' }"
                    />
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

    <!-- ── Footer: more markets + icons ── -->
    <div class="section-divider"></div>
    <div class="flex items-center px-2.5 py-1.5 gap-2">
      <button
        class="flex items-center gap-1 text-[11px] font-medium text-[var(--color-primary)] cursor-pointer bg-transparent border-none p-0 leading-none"
        @click="matchStore.handleMoreBets(match.matchId, 'score')"
      >
        <span>{{ $t('label.moreMarkets') }}</span>
        <span class="opacity-70">{{ match.extraMarketCount }}</span>
        <n-icon size="8" v-html="Triangle12Filled" class="rotate-90 opacity-70" />
      </button>

      <!-- Live stats footer (football in-play) -->
      <div class="flex items-center gap-2 text-[11px] text-subtle-light ml-auto" v-if="matchTimeType == 1">
        <div class="flex items-center gap-0.5">
          <n-tooltip trigger="hover">
            <template #trigger>
              <img class="w-3.5 h-3.5" src="/images/football-icon/full-score.png" />
            </template>
            {{ $t('label.score') }}
          </n-tooltip>
          <span class="font-semibold text-main">{{ match.footballData?.homeScore ?? '-' }}</span>
          <span class="opacity-50">:</span>
          <span class="font-semibold text-main">{{ match.footballData?.awayScore ?? '-' }}</span>
        </div>
        <div class="flex items-center gap-0.5">
          <n-tooltip trigger="hover">
            <template #trigger>
              <img class="w-3.5 h-3.5" src="/images/football-icon/full-corner.png" />
            </template>
            {{ $t('label.corner') }}
          </n-tooltip>
          <span>{{ match.footballData?.homeCorner ?? '-' }}</span>
          <span class="opacity-50">:</span>
          <span>{{ match.footballData?.awayCorner ?? '-' }}</span>
        </div>
        <div class="flex items-center gap-0.5">
          <n-tooltip trigger="hover">
            <template #trigger>
              <img class="w-3.5 h-3.5" src="/images/football-icon/full-yellow.png" />
            </template>
            {{ $t('label.yellowCard') }}
          </n-tooltip>
          <span>{{ match.footballData?.homeYellowCard ?? '-' }}</span>
          <span class="opacity-50">:</span>
          <span>{{ match.footballData?.awayYellowCard ?? '-' }}</span>
        </div>
        <div class="flex items-center gap-0.5">
          <n-tooltip trigger="hover">
            <template #trigger>
              <img class="w-3.5 h-3.5" src="/images/football-icon/full-red.png" />
            </template>
            {{ $t('label.redCard') }}
          </n-tooltip>
          <span>{{ match.footballData?.homeRedCard ?? '-' }}</span>
          <span class="opacity-50">:</span>
          <span>{{ match.footballData?.awayRedCard ?? '-' }}</span>
        </div>
      </div>

      <!-- Media icons -->
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
  ["1", {
    marketLabel: '全场独赢',
    outcomeMap: new Map([
      ["1_1", { outcomeLabel: '主队' }],
      ["1_2", { outcomeLabel: '客队' }],
      ["1_3", { outcomeLabel: '和' }],
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

const getInPlayDuration = (matchTime: number) => {
  const diff = now.value - matchTime;
  const dur = dayjs.duration(diff);

  const totalMinutes = String(Math.floor(dur.asMinutes())).padStart(2, '0');
  const seconds = String(dur.seconds()).padStart(2, '0');

  return `${totalMinutes}:${seconds}`;
};
</script>

<style lang="scss" scoped></style>
