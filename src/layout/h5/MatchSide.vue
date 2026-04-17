<template>
  <div class="w-full bg-surface-soft rounded-md p-3 more-bets">
    <!-- Header toolbar -->
    <div class="flex mb-3 items-center gap-2">
      <button
        class="side-icon-btn"
        aria-label="返回"
        @click="onClose"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon">
          <path d="M19 12H5M12 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <div class="flex gap-2 ml-auto">
        <!-- View mode buttons -->
        <button
          v-for="btn in viewButtons"
          :key="btn.mode"
          class="side-icon-btn"
          :class="{ 'is-active': currentView === btn.mode }"
          :aria-label="btn.label"
          @click="currentView = btn.mode"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="btn-icon" v-html="btn.svgPath" />
        </button>
      </div>
    </div>

    <!-- Scoreboard area (always rendered, hidden via CSS when not in score view) -->
    <div class="scoreboard-area">
      <div class="score-panel" :class="{ 'is-visible': currentView === 'score' }">
        <slot name="scoreboard">
          <div class="score-placeholder">
            <div class="team-row">
              <img :src="match.homeTeamLogo" :alt="match.homeTeamName" class="team-logo" @error="onImgError" />
              <span class="team-name">{{ match.homeTeamName }}</span>
              <span class="score-val">{{ match.stats.homeScore }}</span>
            </div>
            <div class="score-sep">:</div>
            <div class="team-row">
              <img :src="match.awayTeamLogo" :alt="match.awayTeamName" class="team-logo" @error="onImgError" />
              <span class="team-name">{{ match.awayTeamName }}</span>
              <span class="score-val">{{ match.stats.awayScore }}</span>
            </div>
          </div>
        </slot>
      </div>
    </div>

    <!-- Insight tab bar -->
    <div class="flex justify-end gap-2 mb-3">
      <button
        v-for="tab in insightTabs"
        :key="tab.mode"
        class="side-icon-btn"
        :class="{ 'is-active': currentInsight === tab.mode }"
        :title="tab.label"
        :aria-label="tab.label"
        @click="currentInsight = tab.mode"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="btn-icon" v-html="tab.svgPath" />
      </button>
    </div>

    <!-- Market list – rendered from static data, no conditional blocks -->
    <div class="market-scroll">
      <div
        v-for="market in staticMarkets"
        :key="market.marketId"
        class="market-group"
      >
        <div class="market-name">{{ market.marketName }}</div>
        <div
          class="outcome-grid"
          :style="{ gridTemplateColumns: `repeat(${market.outcomeList.length === 3 ? 3 : 2}, 1fr)` }"
        >
          <button
            v-for="outcome in market.outcomeList"
            :key="outcome.outcomeId"
            class="outcome-cell"
            :class="{
              'odds-up':   outcome.change === 'up',
              'odds-down': outcome.change === 'down',
            }"
            @click="onSelectOutcome(market, outcome)"
          >
            <span class="outcome-name">{{ outcome.outcomeName }}</span>
            <span class="outcome-odds">
              {{ outcome.odds }}
              <svg
                v-if="outcome.change !== 'same'"
                viewBox="0 0 8 8"
                class="odds-arrow"
                :class="{ 'arrow-down': outcome.change === 'down' }"
                fill="currentColor"
              >
                <path d="M4 1L7 6H1z" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Outcome {
  outcomeId: string;
  outcomeName: string;
  odds: string;
  change: 'up' | 'down' | 'same';
}

interface Market {
  marketId: string;
  marketName: string;
  outcomeList: Outcome[];
}

interface MatchInfo {
  homeTeamName: string;
  homeTeamLogo: string;
  awayTeamName: string;
  awayTeamLogo: string;
  stats: { homeScore: number; awayScore: number };
}

interface InsightTab {
  mode: string;
  label: string;
  svgPath: string;
}

interface ViewButton {
  mode: string;
  label: string;
  svgPath: string;
}

// ─── Props / Emits ───────────────────────────────────────────────────────────

const props = withDefaults(defineProps<{
  match?: MatchInfo;
}>(), {
  match: () => ({
    homeTeamName: '主隊',
    homeTeamLogo: '/images/sports/homeTeam.png',
    awayTeamName: '客隊',
    awayTeamLogo: '/images/sports/awayTeam.png',
    stats: { homeScore: 0, awayScore: 0 },
  }),
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'selectOutcome', market: Market, outcome: Outcome): void;
}>();

// ─── Local state ─────────────────────────────────────────────────────────────

const currentView    = ref<string>('score');
const currentInsight = ref<string>('outcome');

// ─── Static: view-mode buttons ───────────────────────────────────────────────

const viewButtons: ViewButton[] = [
  {
    mode: 'video',
    label: '影片',
    svgPath: '<polygon points="5 3 19 12 5 21 5 3" />',
  },
  {
    mode: 'ani',
    label: '動畫',
    svgPath: '<circle cx="12" cy="12" r="2" /><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />',
  },
  {
    mode: 'score',
    label: '計分板',
    svgPath: '<path d="M18 20V10M12 20V4M6 20v-6" />',
  },
];

// ─── Static: insight tab buttons ─────────────────────────────────────────────

const insightTabs: InsightTab[] = [
  {
    mode: 'live',
    label: '即時',
    svgPath: '<circle cx="12" cy="12" r="3" /><path d="M6.34 6.34a8 8 0 1 0 11.32 0M6.34 17.66a8 8 0 0 0 0-11.32" />',
  },
  {
    mode: 'lineup',
    label: '陣容',
    svgPath: '<circle cx="12" cy="8" r="3" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /><circle cx="5" cy="14" r="2" /><circle cx="19" cy="14" r="2" />',
  },
  {
    mode: 'statistics',
    label: '統計',
    svgPath: '<path d="M18 20V10M12 20V4M6 20v-6" />',
  },
  {
    mode: 'analysis',
    label: '分析',
    svgPath: '<rect x="3" y="3" width="18" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><path d="M7 7h10M7 11h6" />',
  },
  {
    mode: 'outcome',
    label: '更多玩法',
    svgPath: '<path d="M4 6h16M4 12h16M4 18h10" />',
  },
];

// ─── Static: market / outcome data (更多玩法) ─────────────────────────────────
// Replace this array with real API data as needed; the template remains unchanged.

const staticMarkets: Market[] = [
  {
    marketId: 'mk001',
    marketName: '全場獨贏',
    outcomeList: [
      { outcomeId: 'o1', outcomeName: '主隊勝', odds: '2.15', change: 'up' },
      { outcomeId: 'o2', outcomeName: '客隊勝', odds: '3.40', change: 'same' },
      { outcomeId: 'o3', outcomeName: '和局',   odds: '3.10', change: 'down' },
    ],
  },
  {
    marketId: 'mk002',
    marketName: '全場讓球',
    outcomeList: [
      { outcomeId: 'o4', outcomeName: '主隊 -0.5', odds: '1.85', change: 'same' },
      { outcomeId: 'o5', outcomeName: '客隊 +0.5', odds: '2.05', change: 'up' },
    ],
  },
  {
    marketId: 'mk003',
    marketName: '全場大小',
    outcomeList: [
      { outcomeId: 'o6', outcomeName: '大 2.5', odds: '1.92', change: 'down' },
      { outcomeId: 'o7', outcomeName: '小 2.5', odds: '1.88', change: 'same' },
    ],
  },
  {
    marketId: 'mk004',
    marketName: '半場獨贏',
    outcomeList: [
      { outcomeId: 'o8',  outcomeName: '主隊勝', odds: '2.60', change: 'same' },
      { outcomeId: 'o9',  outcomeName: '客隊勝', odds: '3.80', change: 'up' },
      { outcomeId: 'o10', outcomeName: '和局',   odds: '2.90', change: 'same' },
    ],
  },
  {
    marketId: 'mk005',
    marketName: '半場讓球',
    outcomeList: [
      { outcomeId: 'o11', outcomeName: '主隊 0',  odds: '1.95', change: 'same' },
      { outcomeId: 'o12', outcomeName: '客隊 0',  odds: '1.95', change: 'same' },
    ],
  },
  {
    marketId: 'mk006',
    marketName: '半場大小',
    outcomeList: [
      { outcomeId: 'o13', outcomeName: '大 1.5', odds: '1.78', change: 'up' },
      { outcomeId: 'o14', outcomeName: '小 1.5', odds: '2.10', change: 'down' },
    ],
  },
  {
    marketId: 'mk007',
    marketName: '雙重機會',
    outcomeList: [
      { outcomeId: 'o15', outcomeName: '主隊或和', odds: '1.40', change: 'same' },
      { outcomeId: 'o16', outcomeName: '主或客勝', odds: '1.25', change: 'same' },
      { outcomeId: 'o17', outcomeName: '客隊或和', odds: '1.85', change: 'same' },
    ],
  },
  {
    marketId: 'mk008',
    marketName: '兩隊皆進',
    outcomeList: [
      { outcomeId: 'o18', outcomeName: '是', odds: '1.70', change: 'up' },
      { outcomeId: 'o19', outcomeName: '否', odds: '2.20', change: 'down' },
    ],
  },
  {
    marketId: 'mk009',
    marketName: '正確比分',
    outcomeList: [
      { outcomeId: 'o20', outcomeName: '1-0', odds: '5.50', change: 'same' },
      { outcomeId: 'o21', outcomeName: '2-0', odds: '7.00', change: 'same' },
      { outcomeId: 'o22', outcomeName: '2-1', odds: '7.50', change: 'same' },
      { outcomeId: 'o23', outcomeName: '0-0', odds: '8.00', change: 'same' },
      { outcomeId: 'o24', outcomeName: '1-1', odds: '5.80', change: 'same' },
      { outcomeId: 'o25', outcomeName: '0-1', odds: '7.20', change: 'same' },
    ],
  },
  {
    marketId: 'mk010',
    marketName: '進球數',
    outcomeList: [
      { outcomeId: 'o26', outcomeName: '0-1 球', odds: '2.80', change: 'same' },
      { outcomeId: 'o27', outcomeName: '2-3 球', odds: '2.20', change: 'up' },
      { outcomeId: 'o28', outcomeName: '4+ 球',  odds: '3.10', change: 'down' },
    ],
  },
];

// ─── Handlers ─────────────────────────────────────────────────────────────────

const onClose = () => emit('close');

const onSelectOutcome = (market: Market, outcome: Outcome) => {
  emit('selectOutcome', market, outcome);
};

const onImgError = (e: Event) => {
  (e.target as HTMLImageElement).src = '/images/sports/homeTeam.png';
};
</script>

<style scoped lang="scss">
.more-bets {
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* ── Icon button ─────────────────────────────────────────── */
.side-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: none;
  background: var(--color-outcome-background);
  color: var(--color-subtle);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  -webkit-tap-highlight-color: transparent;

  &:hover { background: var(--color-surface-hover); }
  &:active { opacity: 0.7; }

  &.is-active {
    background: var(--color-primary);
    color: #fff;
  }
}

.btn-icon {
  width: 16px;
  height: 16px;
  pointer-events: none;
}

/* ── Scoreboard area ─────────────────────────────────────── */
.scoreboard-area {
  overflow: hidden;
  transition: max-height 0.25s ease, opacity 0.2s ease, margin-bottom 0.25s ease;
}

.score-panel {
  max-height: 0;
  opacity: 0;
  margin-bottom: 0;
  overflow: hidden;
  transition: max-height 0.25s ease, opacity 0.2s ease, margin-bottom 0.2s ease;

  &.is-visible {
    max-height: 200px;
    opacity: 1;
    margin-bottom: 12px;
  }
}

.score-placeholder {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 12px;
  border-radius: 8px;
  background: var(--color-surface);
}

.team-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
}

.team-logo {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: contain;
}

.team-name {
  font-size: 12px;
  color: var(--color-subtle);
  text-align: center;
}

.score-val {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-primary);
}

.score-sep {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-subtle-light);
  align-self: center;
  margin-top: 24px;
}

/* ── Market list ─────────────────────────────────────────── */
.market-scroll {
  flex: 1;
  overflow-y: auto;
  max-height: calc(100dvh - 220px);
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 8px;
}

.market-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.market-name {
  font-size: 12px;
  color: var(--color-subtle);
  padding-left: 2px;
}

.outcome-grid {
  display: grid;
  gap: 6px;
}

/* ── Outcome cell ────────────────────────────────────────── */
.outcome-cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border-radius: 8px;
  border: none;
  background: var(--color-outcome-background);
  color: var(--color-main);
  cursor: pointer;
  gap: 4px;
  transition: background 0.15s, transform 0.1s;
  -webkit-tap-highlight-color: transparent;

  &:active { transform: scale(0.97); background: var(--color-surface-hover); }
  &:hover  { background: var(--color-surface-hover); }
}

.outcome-name {
  font-size: 12px;
  color: var(--color-subtle);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.outcome-odds {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
}

.outcome-cell.odds-up   .outcome-odds { color: #22c55e; }
.outcome-cell.odds-down .outcome-odds { color: #ef4444; }
.outcome-cell:not(.odds-up):not(.odds-down) .outcome-odds { color: var(--color-main); }

/* ── Odds arrow ──────────────────────────────────────────── */
.odds-arrow {
  width: 7px;
  height: 7px;

  &.arrow-down { transform: rotate(180deg); }
}
</style>
