<template>
  <div class="match-side">

    <!-- ── Header toolbar ─────────────────────────────────── -->
    <div class="toolbar">
      <button class="icon-btn" aria-label="返回" @click="onClose">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="icon">
          <path d="M19 12H5M12 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <div class="toolbar-right">
        <button
          v-for="btn in viewButtons"
          :key="btn.mode"
          class="icon-btn"
          :class="{ 'is-active': currentView === btn.mode }"
          :aria-label="btn.label"
          @click="currentView = btn.mode"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="icon" v-html="btn.svgPath" />
        </button>
      </div>
    </div>

    <!-- ── Insight tab strip ───────────────────────────────── -->
    <div class="insight-strip">
      <button
        v-for="tab in insightTabs"
        :key="tab.mode"
        class="insight-tab"
        :class="{ 'is-active': currentInsight === tab.mode }"
        :aria-label="tab.label"
        @click="currentInsight = tab.mode"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="tab-icon" v-html="tab.svgPath" />
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </div>

    <!-- ── Section header ─────────────────────────────────── -->
    <div class="section-header">
      <span class="section-accent" />
      <span class="section-title">更多玩法</span>
      <span class="section-count">{{ staticMarkets.length }} 個市場</span>
    </div>

    <!-- ── Market list ────────────────────────────────────── -->
    <div class="market-scroll">
      <div
        v-for="market in staticMarkets"
        :key="market.marketId"
        class="market-card"
      >
        <!-- Market card header -->
        <div class="market-header">
          <span class="market-title">{{ market.marketName }}</span>
          <span class="market-badge">{{ market.outcomeList.length }} 項</span>
        </div>

        <!-- Outcome grid -->
        <div
          class="outcome-grid"
          :class="market.outcomeList.length === 3 ? 'cols-3' : 'cols-2'"
        >
          <button
            v-for="outcome in market.outcomeList"
            :key="outcome.outcomeId"
            class="outcome-btn"
            :class="{
              'is-up':   outcome.change === 'up',
              'is-down': outcome.change === 'down',
            }"
            @click="onSelectOutcome(market, outcome)"
          >
            <span class="outcome-label">{{ outcome.outcomeName }}</span>
            <span class="outcome-value">
              <svg
                v-if="outcome.change === 'up'"
                viewBox="0 0 8 8"
                class="trend-arrow up"
                fill="currentColor"
              ><path d="M4 1L7 6H1z" /></svg>
              <svg
                v-else-if="outcome.change === 'down'"
                viewBox="0 0 8 8"
                class="trend-arrow down"
                fill="currentColor"
              ><path d="M4 7L1 2h6z" /></svg>
              {{ outcome.odds }}
            </span>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// ─── Types ────────────────────────────────────────────────────────────────────

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

// Re-use the canonical MatchEvent type so real data flows from the parent
import { type MatchEvent as MatchInfo } from './MatchEventCard.vue';

interface InsightTab  { mode: string; label: string; svgPath: string; }
interface ViewButton  { mode: string; label: string; svgPath: string; }

// ─── Props / Emits ────────────────────────────────────────────────────────────

const props = defineProps<{ match: MatchInfo }>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'selectOutcome', market: Market, outcome: Outcome): void;
}>();

// ─── Local state ──────────────────────────────────────────────────────────────

const currentView    = ref<string>('score');
const currentInsight = ref<string>('outcome');

// ─── Static: view-mode buttons ───────────────────────────────────────────────

const viewButtons: ViewButton[] = [
  { mode: 'video',  label: '影片',  svgPath: '<polygon points="5 3 19 12 5 21 5 3" />' },
  { mode: 'ani',    label: '動畫',  svgPath: '<circle cx="12" cy="12" r="2" /><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />' },
  { mode: 'score',  label: '計分板', svgPath: '<path d="M18 20V10M12 20V4M6 20v-6" />' },
];

// ─── Static: insight tabs ─────────────────────────────────────────────────────

const insightTabs: InsightTab[] = [
  { mode: 'live',       label: '即時',   svgPath: '<circle cx="12" cy="12" r="3" /><path d="M6.34 6.34a8 8 0 1 0 11.32 0M6.34 17.66a8 8 0 0 0 0-11.32" />' },
  { mode: 'lineup',     label: '陣容',   svgPath: '<circle cx="12" cy="8" r="3" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /><circle cx="5" cy="14" r="2" /><circle cx="19" cy="14" r="2" />' },
  { mode: 'statistics', label: '統計',   svgPath: '<path d="M18 20V10M12 20V4M6 20v-6" />' },
  { mode: 'analysis',   label: '分析',   svgPath: '<rect x="3" y="3" width="18" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><path d="M7 7h10M7 11h6" />' },
  { mode: 'outcome',    label: '更多玩法', svgPath: '<path d="M4 6h16M4 12h16M4 18h10" />' },
];

// ─── Static: market / outcome data (更多玩法) ─────────────────────────────────

const staticMarkets: Market[] = [
  {
    marketId: 'mk001', marketName: '全場獨贏',
    outcomeList: [
      { outcomeId: 'o1', outcomeName: '主隊勝', odds: '2.15', change: 'up' },
      { outcomeId: 'o2', outcomeName: '客隊勝', odds: '3.40', change: 'same' },
      { outcomeId: 'o3', outcomeName: '和局',   odds: '3.10', change: 'down' },
    ],
  },
  {
    marketId: 'mk002', marketName: '全場讓球',
    outcomeList: [
      { outcomeId: 'o4', outcomeName: '主隊 -0.5', odds: '1.85', change: 'same' },
      { outcomeId: 'o5', outcomeName: '客隊 +0.5', odds: '2.05', change: 'up' },
    ],
  },
  {
    marketId: 'mk003', marketName: '全場大小',
    outcomeList: [
      { outcomeId: 'o6', outcomeName: '大 2.5', odds: '1.92', change: 'down' },
      { outcomeId: 'o7', outcomeName: '小 2.5', odds: '1.88', change: 'same' },
    ],
  },
  {
    marketId: 'mk004', marketName: '半場獨贏',
    outcomeList: [
      { outcomeId: 'o8',  outcomeName: '主隊勝', odds: '2.60', change: 'same' },
      { outcomeId: 'o9',  outcomeName: '客隊勝', odds: '3.80', change: 'up' },
      { outcomeId: 'o10', outcomeName: '和局',   odds: '2.90', change: 'same' },
    ],
  },
  {
    marketId: 'mk005', marketName: '半場讓球',
    outcomeList: [
      { outcomeId: 'o11', outcomeName: '主隊 0', odds: '1.95', change: 'same' },
      { outcomeId: 'o12', outcomeName: '客隊 0', odds: '1.95', change: 'same' },
    ],
  },
  {
    marketId: 'mk006', marketName: '半場大小',
    outcomeList: [
      { outcomeId: 'o13', outcomeName: '大 1.5', odds: '1.78', change: 'up' },
      { outcomeId: 'o14', outcomeName: '小 1.5', odds: '2.10', change: 'down' },
    ],
  },
  {
    marketId: 'mk007', marketName: '雙重機會',
    outcomeList: [
      { outcomeId: 'o15', outcomeName: '主隊或和', odds: '1.40', change: 'same' },
      { outcomeId: 'o16', outcomeName: '主或客勝', odds: '1.25', change: 'same' },
      { outcomeId: 'o17', outcomeName: '客隊或和', odds: '1.85', change: 'same' },
    ],
  },
  {
    marketId: 'mk008', marketName: '兩隊皆進',
    outcomeList: [
      { outcomeId: 'o18', outcomeName: '是', odds: '1.70', change: 'up' },
      { outcomeId: 'o19', outcomeName: '否', odds: '2.20', change: 'down' },
    ],
  },
  {
    marketId: 'mk009', marketName: '正確比分',
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
    marketId: 'mk010', marketName: '進球數',
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
</script>

<style scoped lang="scss">
/* ── Root ────────────────────────────────────────────────── */
.match-side {
  display: flex;
  flex-direction: column;
  gap: 0;
  background: var(--color-surface-soft, #111318);
  border-radius: 12px;
  overflow: hidden;
}

/* ── Toolbar ─────────────────────────────────────────────── */
.toolbar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px 8px;
  border-bottom: 1px solid var(--color-border-subtle, rgba(255,255,255,0.06));
}

.toolbar-right {
  display: flex;
  gap: 6px;
  margin-left: auto;
}

/* ── Icon button ─────────────────────────────────────────── */
.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: var(--color-btn-bg, rgba(255,255,255,0.05));
  color: var(--color-subtle, #8b929e);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s, box-shadow 0.15s;
  -webkit-tap-highlight-color: transparent;
  flex-shrink: 0;

  &:hover {
    background: var(--color-btn-bg-hover, rgba(255,255,255,0.09));
    color: var(--color-main, #e4e8f0);
  }

  &:active { opacity: 0.7; }

  &.is-active {
    background: var(--color-primary, #1677ff);
    border-color: var(--color-primary, #1677ff);
    color: #fff;
    box-shadow: 0 0 0 3px rgba(22,119,255,0.18);
  }
}

.icon {
  width: 15px;
  height: 15px;
  pointer-events: none;
}

/* ── Insight strip ───────────────────────────────────────── */
.insight-strip {
  display: flex;
  align-items: stretch;
  gap: 2px;
  padding: 6px 10px 0;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

.insight-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 6px 10px 8px;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--color-subtle, #8b929e);
  cursor: pointer;
  white-space: nowrap;
  font-size: 11px;
  transition: color 0.15s, border-color 0.15s;
  -webkit-tap-highlight-color: transparent;
  flex-shrink: 0;

  &:hover { color: var(--color-main, #e4e8f0); }

  &.is-active {
    color: var(--color-primary, #1677ff);
    border-bottom-color: var(--color-primary, #1677ff);
  }
}

.tab-icon {
  width: 14px;
  height: 14px;
  pointer-events: none;
}

.tab-label {
  font-size: 10px;
  letter-spacing: 0.02em;
}

/* ── Section header ──────────────────────────────────────── */
.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 14px 6px;
}

.section-accent {
  display: block;
  width: 3px;
  height: 14px;
  border-radius: 2px;
  background: var(--color-primary, #1677ff);
  flex-shrink: 0;
  box-shadow: 0 0 6px rgba(22,119,255,0.5);
}

.section-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-main, #e4e8f0);
  letter-spacing: 0.02em;
  flex: 1;
}

.section-count {
  font-size: 11px;
  color: var(--color-subtle, #8b929e);
  background: var(--color-btn-bg, rgba(255,255,255,0.06));
  padding: 2px 7px;
  border-radius: 20px;
  flex-shrink: 0;
}

/* ── Market scroll container ─────────────────────────────── */
.market-scroll {
  flex: 1;
  overflow-y: auto;
  max-height: calc(100dvh - 200px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 6px 10px 16px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.1) transparent;

  &::-webkit-scrollbar        { width: 3px; }
  &::-webkit-scrollbar-track  { background: transparent; }
  &::-webkit-scrollbar-thumb  { background: rgba(255,255,255,0.12); border-radius: 3px; }
}

/* ── Market card ─────────────────────────────────────────── */
.market-card {
  background: var(--color-card-bg, rgba(255,255,255,0.04));
  border: 1px solid var(--color-border-subtle, rgba(255,255,255,0.07));
  border-radius: 10px;
  padding: 10px 10px 8px;
  transition: border-color 0.15s;

  &:hover {
    border-color: rgba(255,255,255,0.12);
  }
}

.market-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.market-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-main, #e4e8f0);
  letter-spacing: 0.01em;
}

.market-badge {
  font-size: 10px;
  color: var(--color-subtle, #8b929e);
  background: var(--color-btn-bg, rgba(255,255,255,0.06));
  padding: 1px 6px;
  border-radius: 20px;
}

/* ── Outcome grid ────────────────────────────────────────── */
.outcome-grid {
  display: grid;
  gap: 5px;

  &.cols-2 { grid-template-columns: repeat(2, 1fr); }
  &.cols-3 { grid-template-columns: repeat(3, 1fr); }
}

/* ── Outcome button ──────────────────────────────────────── */
.outcome-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  padding: 7px 6px;
  border-radius: 8px;
  border: 1px solid var(--color-border-subtle, rgba(255,255,255,0.07));
  background: var(--color-outcome-bg, rgba(255,255,255,0.04));
  color: var(--color-main, #e4e8f0);
  cursor: pointer;
  transition:
    background  0.15s,
    border-color 0.15s,
    box-shadow  0.15s,
    transform   0.1s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.14);
  }

  &:active {
    transform: scale(0.96);
    opacity: 0.8;
  }

  /* Odds up — green glow */
  &.is-up {
    border-color: rgba(34,197,94,0.35);
    background: rgba(34,197,94,0.07);
    box-shadow: inset 0 0 0 0 rgba(34,197,94,0);

    &:hover { box-shadow: 0 0 8px rgba(34,197,94,0.18); }

    .outcome-value {
      color: #22c55e;
    }

    .trend-arrow { color: #22c55e; }
  }

  /* Odds down — red glow */
  &.is-down {
    border-color: rgba(239,68,68,0.35);
    background: rgba(239,68,68,0.07);

    &:hover { box-shadow: 0 0 8px rgba(239,68,68,0.18); }

    .outcome-value {
      color: #ef4444;
    }

    .trend-arrow { color: #ef4444; }
  }
}

.outcome-label {
  font-size: 10.5px;
  color: var(--color-subtle, #8b929e);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  line-height: 1.3;
}

.outcome-value {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: var(--color-main, #e4e8f0);
  line-height: 1;
}

/* ── Trend arrow ─────────────────────────────────────────── */
.trend-arrow {
  width: 7px;
  height: 7px;
  flex-shrink: 0;
}
</style>
