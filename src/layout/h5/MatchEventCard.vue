<template>
  <div
    class="overflow-hidden rounded-[10px] bg-[var(--color-surface)] text-[13px] text-[var(--color-main)]"
  >
    <div
      class="flex items-center justify-between gap-2 border-b border-[var(--color-surface-hover)] bg-[var(--color-surface-soft)] px-3 py-2"
    >
      <div class="flex min-w-0 items-center gap-2">
        <img
          :src="match.leagueLogo"
          :alt="match.leagueName"
          class="h-4 w-4 flex-shrink-0 object-contain"
          @error="($event.target as HTMLImageElement).src = '/images/sports/league.png'"
        />
        <span class="truncate text-xs font-semibold text-[var(--color-subtle)]">{{ match.leagueName }}</span>
        <span
          v-if="match.isLive"
          class="shrink-0 rounded bg-[#ef4444] px-[5px] py-px text-[10px] font-bold tracking-[0.05em] text-white"
        >LIVE</span>
      </div>
      <div class="flex shrink-0 items-center gap-1.5 text-xs text-[var(--color-subtle)]">
        <span v-if="match.isLive" class="font-semibold text-[var(--color-primary)]">{{ match.period }}</span>
        <span v-if="match.isLive" class="font-bold tracking-[0.05em] text-[var(--color-primary)]">{{ match.clock }}</span>
        <span v-else>{{ match.time }}</span>
      </div>
    </div>

    <div
      class="grid grid-cols-[1fr_72px_72px_72px] items-center gap-1 px-3 pb-1 pt-2 text-[11px] font-medium text-[var(--color-subtle-light)]"
    >
      <div class="min-w-0" />
      <div class="text-center">獨贏</div>
      <div class="text-center">讓球</div>
      <div class="text-center">大/小</div>
    </div>

    <div class="grid grid-cols-[1fr_72px_72px_72px] items-center gap-1 px-3 py-1.5">
      <div class="flex min-w-0 items-center gap-2">
        <img
          :src="match.homeTeamLogo"
          :alt="match.homeTeamName"
          class="h-7 w-7 flex-shrink-0 rounded-full object-contain"
          @error="($event.target as HTMLImageElement).src = '/images/sports/homeTeam.png'"
        />
        <span class="truncate text-[13px] font-semibold">{{ match.homeTeamName }}</span>
      </div>
      <div>
        <OddsCell :value="match.odds.home.win" :change="match.odds.home.winChange" />
      </div>
      <div>
        <OddsCell :value="match.odds.home.handicap" :change="match.odds.home.handicapChange" :label="match.odds.home.handicapLine" />
      </div>
      <div>
        <OddsCell :value="match.odds.home.over" :change="match.odds.home.overChange" :label="match.odds.home.overLine" />
      </div>
    </div>

    <div
      class="grid grid-cols-[1fr_72px_72px_72px] items-center gap-1 border-t border-[var(--color-surface-hover)] px-3 py-1.5"
    >
      <div class="flex min-w-0 items-center gap-2">
        <img
          :src="match.awayTeamLogo"
          :alt="match.awayTeamName"
          class="h-7 w-7 flex-shrink-0 rounded-full object-contain"
          @error="($event.target as HTMLImageElement).src = '/images/sports/awayTeam.png'"
        />
        <span class="truncate text-[13px] font-semibold">{{ match.awayTeamName }}</span>
      </div>
      <div>
        <OddsCell :value="match.odds.away.win" :change="match.odds.away.winChange" />
      </div>
      <div>
        <OddsCell :value="match.odds.away.handicap" :change="match.odds.away.handicapChange" :label="match.odds.away.handicapLine" />
      </div>
      <div>
        <OddsCell :value="match.odds.away.under" :change="match.odds.away.underChange" :label="match.odds.away.underLine" />
      </div>
    </div>

    <div
      v-if="match.hasDraw"
      class="grid grid-cols-[1fr_72px_72px_72px] items-center gap-1 border-t border-[var(--color-surface-hover)] px-3 py-1"
    >
      <div class="flex min-w-0 items-center gap-2">
        <span class="text-xs text-[var(--color-subtle)]">和局</span>
      </div>
      <div>
        <OddsCell :value="match.odds.draw" :change="match.odds.drawChange" />
      </div>
      <div><OddsCell :locked="true" /></div>
      <div><OddsCell :locked="true" /></div>
    </div>

    <div class="flex flex-col border-t border-[var(--color-surface-hover)]">

      <!-- Row 1: 更多玩法 (left) + 操作按鈕 (right) -->
      <div class="flex items-center justify-between gap-2 px-3 py-1.5">
        <button
          type="button"
          class="inline-flex shrink-0 cursor-pointer items-center gap-1 whitespace-nowrap border-0 bg-transparent p-0 text-xs font-medium text-blue-400 [-webkit-tap-highlight-color:transparent] active:opacity-[0.65]"
          @click="$emit('moreMarkets', match.matchId)"
        >
          更多玩法
          <span
            class="inline-flex h-4 min-w-[18px] items-center justify-center rounded-full bg-blue-400/15 px-1 text-[10px] font-bold tracking-normal text-blue-300"
          >{{ match.extraMarketCount }}</span>
          <svg class="h-2.5 w-2.5 shrink-0 text-blue-400 opacity-70" viewBox="0 0 12 12" fill="none">
            <path d="M4.5 2L8.5 6L4.5 10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <div class="flex shrink-0 items-center gap-1">
          <button
            v-if="match.hasVideo"
            type="button"
            class="flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-md border border-[color:color-mix(in_srgb,var(--color-primary)_65%,transparent)] bg-[var(--color-outcome-background)] text-[var(--color-primary)] transition-colors duration-150 [-webkit-tap-highlight-color:transparent] hover:bg-[var(--color-surface-hover)] hover:opacity-90 active:opacity-70"
            aria-label="影片"
            @click="$emit('openVideo', match.matchId)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </button>
          <button
            v-if="match.hasAni"
            type="button"
            class="flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-md border border-[color:color-mix(in_srgb,var(--color-primary)_65%,transparent)] bg-[var(--color-outcome-background)] text-[var(--color-primary)] transition-colors duration-150 [-webkit-tap-highlight-color:transparent] hover:bg-[var(--color-surface-hover)] hover:opacity-90 active:opacity-70"
            aria-label="動畫"
            @click="$emit('openAni', match.matchId)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4">
              <circle cx="12" cy="12" r="2" />
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </button>
          <button
            type="button"
            class="flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-md border border-[color:color-mix(in_srgb,var(--color-primary)_65%,transparent)] bg-[var(--color-outcome-background)] text-[var(--color-primary)] transition-colors duration-150 [-webkit-tap-highlight-color:transparent] hover:bg-[var(--color-surface-hover)] hover:opacity-90 active:opacity-70"
            aria-label="數據"
            @click="$emit('openStats', match.matchId)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4">
              <path d="M18 20V10M12 20V4M6 20v-6" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Row 2: 賽況統計 bar -->
      <div class="flex items-stretch border-t border-[var(--color-surface-hover)] bg-[var(--color-surface-soft)]">
        <div class="flex min-w-0 flex-1 items-center justify-center gap-1 px-1.5 py-[5px]">
          <img src="/images/football-icon/full-corner.png" alt="角球" class="h-3.5 w-3.5 shrink-0 object-contain opacity-85" />
          <span class="shrink-0 text-[10px] font-medium tracking-[0.02em] text-[var(--color-subtle-light)]">角</span>
          <span class="whitespace-nowrap text-[11px] font-semibold tracking-[0.03em] text-[var(--color-subtle)] [&_em]:mx-px [&_em]:not-italic [&_em]:opacity-45">{{ match.stats.homeCorner }}<em>:</em>{{ match.stats.awayCorner }}</span>
        </div>

        <div class="w-px shrink-0 self-stretch bg-[var(--color-surface-hover)]" aria-hidden="true" />

        <div class="flex min-w-0 flex-1 items-center justify-center gap-1 px-1.5 py-[5px]">
          <img src="/images/football-icon/full-red.png" alt="紅牌" class="h-3.5 w-3.5 shrink-0 object-contain opacity-85" />
          <span class="shrink-0 text-[10px] font-medium tracking-[0.02em] text-[var(--color-subtle-light)]">紅</span>
          <span class="whitespace-nowrap text-[11px] font-semibold tracking-[0.03em] text-[var(--color-subtle)] [&_em]:mx-px [&_em]:not-italic [&_em]:opacity-45">{{ match.stats.homeRed }}<em>:</em>{{ match.stats.awayRed }}</span>
        </div>

        <div class="w-px shrink-0 self-stretch bg-[var(--color-surface-hover)]" aria-hidden="true" />

        <div class="flex min-w-0 flex-1 items-center justify-center gap-1 px-1.5 py-[5px]">
          <img src="/images/football-icon/full-yellow.png" alt="黃牌" class="h-3.5 w-3.5 shrink-0 object-contain opacity-85" />
          <span class="shrink-0 text-[10px] font-medium tracking-[0.02em] text-[var(--color-subtle-light)]">黃</span>
          <span class="whitespace-nowrap text-[11px] font-semibold tracking-[0.03em] text-[var(--color-subtle)] [&_em]:mx-px [&_em]:not-italic [&_em]:opacity-45">{{ match.stats.homeYellow }}<em>:</em>{{ match.stats.awayYellow }}</span>
        </div>

        <div class="w-px shrink-0 self-stretch bg-[rgba(44,217,125,0.18)]" aria-hidden="true" />

        <!-- Score chip: highlighted -->
        <div class="flex min-w-0 flex-[1.2] items-center justify-center gap-1 bg-[rgba(44,217,125,0.06)] px-1.5 py-[5px]">
          <img src="/images/football-icon/full-score.png" alt="比分" class="h-3.5 w-3.5 shrink-0 object-contain opacity-85" />
          <span class="shrink-0 text-[10px] font-medium tracking-[0.02em] text-[var(--color-subtle-light)]">比分</span>
          <span class="whitespace-nowrap text-xs font-bold tracking-[0.03em] text-[var(--color-primary)] [&_em]:mx-px [&_em]:not-italic [&_em]:opacity-45">{{ match.stats.homeScore }}<em>:</em>{{ match.stats.awayScore }}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import OddsCell from './OddsCell.vue';

export interface MatchEvent {
  matchId: string;
  leagueName: string;
  leagueLogo: string;
  isLive: boolean;
  period?: string;
  clock?: string;
  time?: string;
  homeTeamName: string;
  homeTeamLogo: string;
  awayTeamName: string;
  awayTeamLogo: string;
  hasDraw: boolean;
  extraMarketCount: number;
  hasVideo: boolean;
  hasAni: boolean;
  stats: {
    homeCorner: number; awayCorner: number;
    homeRed: number;    awayRed: number;
    homeYellow: number; awayYellow: number;
    homeScore: number;  awayScore: number;
  };
  odds: {
    home: { win: string; winChange: string; handicap: string; handicapChange: string; handicapLine: string; over: string; overChange: string; overLine: string };
    away: { win: string; winChange: string; handicap: string; handicapChange: string; handicapLine: string; under: string; underChange: string; underLine: string };
    draw?: string;
    drawChange?: string;
  };
}

defineProps<{ match: MatchEvent }>();
defineEmits<{
  (e: 'moreMarkets', id: string): void;
  (e: 'openVideo',   id: string): void;
  (e: 'openAni',     id: string): void;
  (e: 'openStats',   id: string): void;
}>();
</script>
