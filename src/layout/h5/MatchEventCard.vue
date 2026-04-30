<template>
  <article
    class="overflow-hidden rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-surface)] text-[13px] text-[var(--color-main)] shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_16px_rgba(0,0,0,0.32)]"
  >
    <!-- Card header: league + clock -->
    <div class="flex items-center justify-between gap-2 px-3.5 py-2.5">
      <div class="flex min-w-0 items-center gap-2">
        <img
          :src="match.leagueLogo"
          :alt="match.leagueName"
          class="h-4 w-4 shrink-0 rounded-sm object-contain"
          @error="($event.target as HTMLImageElement).src = '/images/sports/league.png'"
        />
        <span class="truncate text-[11px] font-semibold uppercase tracking-wider text-[var(--color-subtle)]">{{ match.leagueName }}</span>
      </div>

      <div class="flex shrink-0 items-center gap-1.5">
        <span
          v-if="match.isLive"
          class="inline-flex items-center gap-1 rounded-md bg-[var(--color-live-bg)] px-1.5 py-[2px] text-[10px] font-bold tracking-[0.08em] text-[var(--color-live)]"
        >
          <span class="h-[5px] w-[5px] rounded-full bg-[var(--color-live)] shadow-[0_0_4px_currentColor]" aria-hidden="true" />
          LIVE
        </span>
        <span v-if="match.isLive" class="text-[12px] font-bold tabular-nums tracking-[0.04em] text-[var(--color-primary)]">{{ match.period }} {{ match.clock }}</span>
        <span v-else class="text-[11px] font-medium text-[var(--color-subtle)]">{{ match.time }}</span>
      </div>
    </div>

    <!-- Separator -->
    <div class="mx-3.5 h-px bg-[var(--color-border-subtle)]" />

    <!-- Odds column headers -->
    <div class="grid grid-cols-[1fr_68px_68px_68px] items-center gap-1 px-3.5 pb-1 pt-2.5 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-[var(--color-subtle-light)]">
      <div />
      <div class="text-center">獨贏</div>
      <div class="text-center">讓球</div>
      <div class="text-center">大/小</div>
    </div>

    <!-- Home row -->
    <div class="grid grid-cols-[1fr_68px_68px_68px] items-center gap-1.5 px-3.5 pb-1">
      <div class="flex min-w-0 items-center gap-2">
        <img
          :src="match.homeTeamLogo"
          :alt="match.homeTeamName"
          class="h-7 w-7 shrink-0 rounded-full object-contain ring-1 ring-[var(--color-border-subtle)]"
          @error="($event.target as HTMLImageElement).src = '/images/sports/homeTeam.png'"
        />
        <span class="truncate text-[13px] font-bold leading-tight">{{ match.homeTeamName }}</span>
      </div>
      <OddsCell win-hint="home" :value="match.odds.home.win" :change="match.odds.home.winChange" @pick="addToSlip('hw', '主勝', '全場獨贏', match.odds.home.win)" />
      <OddsCell :value="match.odds.home.handicap" :change="match.odds.home.handicapChange" :label="match.odds.home.handicapLine" @pick="addToSlip('hh', `讓球 ${match.odds.home.handicapLine}`, '全場讓球', match.odds.home.handicap)" />
      <OddsCell :value="match.odds.home.over" :change="match.odds.home.overChange" :label="match.odds.home.overLine" @pick="addToSlip('ho', `大 ${match.odds.home.overLine}`, '全場大小', match.odds.home.over)" />
    </div>

    <!-- Away row -->
    <div class="grid grid-cols-[1fr_68px_68px_68px] items-center gap-1.5 px-3.5 py-1">
      <div class="flex min-w-0 items-center gap-2">
        <img
          :src="match.awayTeamLogo"
          :alt="match.awayTeamName"
          class="h-7 w-7 shrink-0 rounded-full object-contain ring-1 ring-[var(--color-border-subtle)]"
          @error="($event.target as HTMLImageElement).src = '/images/sports/awayTeam.png'"
        />
        <span class="truncate text-[13px] font-bold leading-tight">{{ match.awayTeamName }}</span>
      </div>
      <OddsCell win-hint="away" :value="match.odds.away.win" :change="match.odds.away.winChange" @pick="addToSlip('aw', '客勝', '全場獨贏', match.odds.away.win)" />
      <OddsCell :value="match.odds.away.handicap" :change="match.odds.away.handicapChange" :label="match.odds.away.handicapLine" @pick="addToSlip('ah', `讓球 ${match.odds.away.handicapLine}`, '全場讓球', match.odds.away.handicap)" />
      <OddsCell :value="match.odds.away.under" :change="match.odds.away.underChange" :label="match.odds.away.underLine" @pick="addToSlip('au', `小 ${match.odds.away.underLine}`, '全場大小', match.odds.away.under)" />
    </div>

    <!-- Draw row -->
    <div
      v-if="match.hasDraw"
      class="grid grid-cols-[1fr_68px_68px_68px] items-center gap-1.5 px-3.5 py-1"
    >
      <div class="flex min-w-0 items-center pl-9">
        <span class="text-[11px] font-semibold tracking-wide text-[var(--color-subtle)]">和局</span>
      </div>
      <OddsCell win-hint="draw" :value="match.odds.draw" :change="match.odds.drawChange" @pick="addToSlip('dr', '和局', '全場獨贏', match.odds.draw)" />
      <OddsCell :locked="true" />
      <OddsCell :locked="true" />
    </div>

    <!-- Footer: actions + stats -->
    <div class="mt-1 border-t border-[var(--color-border-subtle)]">
      <!-- Action row -->
      <div class="flex items-center justify-between gap-2 px-3.5 py-2">
        <button
          type="button"
          class="inline-flex shrink-0 cursor-pointer items-center gap-1 whitespace-nowrap bg-transparent p-0 text-[12px] font-semibold text-[var(--color-link)] [-webkit-tap-highlight-color:transparent] active:opacity-70"
          @click="$emit('moreMarkets', match.matchId)"
        >
          更多玩法
          <span
            class="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--color-link-soft)] px-1 text-[10px] font-bold text-[var(--color-link)]"
          >{{ match.extraMarketCount }}</span>
          <svg class="h-3 w-3 shrink-0 opacity-60" viewBox="0 0 12 12" fill="none">
            <path d="M4.5 2L8.5 6L4.5 10" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <div class="flex shrink-0 items-center gap-1.5">
          <button
            v-if="match.hasVideo"
            type="button"
            class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-[var(--color-primary-border)] bg-[var(--color-primary-tint)] text-[var(--color-primary)] transition-all duration-150 hover:bg-[var(--color-primary-soft)] active:scale-90"
            aria-label="影片"
            @click="$emit('openVideo', match.matchId)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </button>
          <button
            v-if="match.hasAni"
            type="button"
            class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-[var(--color-primary-border)] bg-[var(--color-primary-tint)] text-[var(--color-primary)] transition-all duration-150 hover:bg-[var(--color-primary-soft)] active:scale-90"
            aria-label="動畫"
            @click="$emit('openAni', match.matchId)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
              <circle cx="12" cy="12" r="2" />
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </button>
          <button
            type="button"
            class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-[var(--color-primary-border)] bg-[var(--color-primary-tint)] text-[var(--color-primary)] transition-all duration-150 hover:bg-[var(--color-primary-soft)] active:scale-90"
            aria-label="數據"
            @click="$emit('openStats', match.matchId)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-3.5 w-3.5">
              <path d="M18 20V10M12 20V4M6 20v-6" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Stats strip -->
      <div class="flex items-stretch border-t border-[var(--color-border-subtle)] bg-[var(--color-surface-soft)]">
        <div class="flex min-w-0 flex-1 items-center justify-center gap-1 px-1.5 py-[6px]">
          <img src="/images/football-icon/full-corner.png" alt="角球" class="h-3.5 w-3.5 shrink-0 object-contain opacity-75" />
          <span class="shrink-0 text-[9.5px] font-semibold uppercase tracking-wider text-[var(--color-subtle-light)]">角</span>
          <span class="whitespace-nowrap text-[11px] font-bold tracking-[0.03em] text-[var(--color-subtle)] [&_em]:mx-px [&_em]:not-italic [&_em]:opacity-40">{{ match.stats.homeCorner }}<em>:</em>{{ match.stats.awayCorner }}</span>
        </div>

        <div class="w-px shrink-0 self-stretch bg-[var(--color-border-subtle)]" aria-hidden="true" />

        <div class="flex min-w-0 flex-1 items-center justify-center gap-1 px-1.5 py-[6px]">
          <img src="/images/football-icon/full-red.png" alt="紅牌" class="h-3.5 w-3.5 shrink-0 object-contain opacity-75" />
          <span class="shrink-0 text-[9.5px] font-semibold uppercase tracking-wider text-[var(--color-subtle-light)]">紅</span>
          <span class="whitespace-nowrap text-[11px] font-bold tracking-[0.03em] text-[var(--color-subtle)] [&_em]:mx-px [&_em]:not-italic [&_em]:opacity-40">{{ match.stats.homeRed }}<em>:</em>{{ match.stats.awayRed }}</span>
        </div>

        <div class="w-px shrink-0 self-stretch bg-[var(--color-border-subtle)]" aria-hidden="true" />

        <div class="flex min-w-0 flex-1 items-center justify-center gap-1 px-1.5 py-[6px]">
          <img src="/images/football-icon/full-yellow.png" alt="黃牌" class="h-3.5 w-3.5 shrink-0 object-contain opacity-75" />
          <span class="shrink-0 text-[9.5px] font-semibold uppercase tracking-wider text-[var(--color-subtle-light)]">黃</span>
          <span class="whitespace-nowrap text-[11px] font-bold tracking-[0.03em] text-[var(--color-subtle)] [&_em]:mx-px [&_em]:not-italic [&_em]:opacity-40">{{ match.stats.homeYellow }}<em>:</em>{{ match.stats.awayYellow }}</span>
        </div>

        <div class="w-px shrink-0 self-stretch bg-[var(--color-primary-border)]" aria-hidden="true" />

        <div class="flex min-w-0 flex-[1.3] items-center justify-center gap-1 bg-[var(--color-primary-tint)] px-1.5 py-[6px]">
          <img src="/images/football-icon/full-score.png" alt="比分" class="h-3.5 w-3.5 shrink-0 object-contain" />
          <span class="shrink-0 text-[9.5px] font-semibold uppercase tracking-wider text-[var(--color-subtle-light)]">比分</span>
          <span class="whitespace-nowrap text-[12.5px] font-extrabold tracking-[0.04em] text-[var(--color-primary)] [&_em]:mx-px [&_em]:not-italic [&_em]:opacity-50">{{ match.stats.homeScore }}<em>:</em>{{ match.stats.awayScore }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import OddsCell from './OddsCell.vue';
import type { BetSlipAddPayload } from './BetSlipDrawer.vue';

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

const props = defineProps<{ match: MatchEvent }>();
const emit = defineEmits<{
  (e: 'moreMarkets', id: string): void;
  (e: 'openVideo',   id: string): void;
  (e: 'openAni',     id: string): void;
  (e: 'openStats',   id: string): void;
  (e: 'addToBetSlip', payload: BetSlipAddPayload): void;
}>();

function addToSlip(suffix: string, marketTitle: string, marketSub: string, odds: string | number | undefined) {
  if (odds === undefined || odds === '') return;
  const p: BetSlipAddPayload = {
    matchId: props.match.matchId,
    selectionKey: `${props.match.matchId}-${suffix}`,
    marketTitle,
    marketSub,
    matchLabel: `${props.match.homeTeamName} v ${props.match.awayTeamName}`,
    odds: String(odds),
  };
  emit('addToBetSlip', p);
}
</script>
