<template>
  <div class="match-side">

    <!-- ── Match info strip ───────────────────────────────── -->
    <div class="match-info">
      <button class="icon-btn" aria-label="返回" @click="onClose">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="icon">
          <path d="M19 12H5M12 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <div class="w-70">
        <!-- League row -->
        <div class="info-league">
          <img
            :src="match.leagueLogo"
            :alt="match.leagueName"
            class="league-logo"
            @error="($event.target as HTMLImageElement).src = '/images/sports/league.png'"
          />
          <span class="league-name">{{ match.leagueName }}</span>
          <span v-if="match.isLive" class="live-badge">LIVE</span>
          <span class="match-time">
            <template v-if="match.isLive">{{ match.period }}&nbsp;{{ match.clock }}</template>
            <template v-else>{{ match.time }}</template>
          </span>
        </div>

        <!-- Teams + score row -->
        <div class="info-teams">
          <!-- Home team -->
          <div class="team-block">
            <img
              :src="match.homeTeamLogo"
              :alt="match.homeTeamName"
              class="team-crest"
              @error="($event.target as HTMLImageElement).src = '/images/sports/homeTeam.png'"
            />
            <span class="team-label">{{ match.homeTeamName }}</span>
          </div>

          <!-- Score -->
          <div class="score-badge" :class="{ 'is-live': match.isLive }">
            <span class="score-num">{{ match.stats.homeScore }}</span>
            <span class="score-colon">:</span>
            <span class="score-num">{{ match.stats.awayScore }}</span>
          </div>

          <!-- Away team -->
          <div class="team-block team-block--away">
            <img
              :src="match.awayTeamLogo"
              :alt="match.awayTeamName"
              class="team-crest"
              @error="($event.target as HTMLImageElement).src = '/images/sports/awayTeam.png'"
            />
            <span class="team-label">{{ match.awayTeamName }}</span>
          </div>
        </div>
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
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          class="tab-icon"
          v-html="insightTabSvgInner[tab.mode] ?? ''"
        ></svg>
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </div>

    <!-- <div class="market-filter-wrap">
      <div class="market-filter-pill" role="tablist" aria-label="玩法種類">
        <button
          v-for="tab in marketFilterTabs"
          :key="tab.id"
          type="button"
          role="tab"
          class="market-filter-tab"
          :class="{ 'is-active': currentMarketFilter === tab.id }"
          :aria-selected="currentMarketFilter === tab.id"
          @click="currentMarketFilter = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
    </div> -->

    <!-- ── Market list ────────────────────────────────────── -->
    <div class="market-scroll">
      <div
        v-for="market in filteredMarkets"
        :key="market.marketId"
        class="market-card"
      >
        <!-- Market card header -->
        <div class="market-header">
          <span class="market-title">{{ market.marketName }}</span>
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
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

let prevHtmlOverflow = '';
let prevBodyOverflow = '';

onMounted(() => {
  prevHtmlOverflow = document.documentElement.style.overflow;
  prevBodyOverflow = document.body.style.overflow;
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
});

onBeforeUnmount(() => {
  document.documentElement.style.overflow = prevHtmlOverflow;
  document.body.style.overflow = prevBodyOverflow;
});

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
  /** 對應 marketFilterTabs.id，用於篩選（不含 all） */
  filterTags: string[];
}

// Re-use the canonical MatchEvent type so real data flows from the parent
import { type MatchEvent as MatchInfo } from './MatchEventCard.vue';

interface InsightTab  { mode: string; label: string; }
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
/** 玩法列表篩選（預設熱門，與附圖一致） */
const currentMarketFilter = ref<string>('popular');

interface MarketFilterTab {
  id: string;
  label: string;
}

const marketFilterTabs: MarketFilterTab[] = [
  { id: 'popular', label: '熱門' },
  { id: 'all', label: '全部' },
  { id: 'handicap_ou', label: '讓球&大小' },
  { id: 'half', label: '半場' },
  { id: 'full', label: '全場' },
  { id: 'correct_score', label: '波膽' },
];

// ─── Static: view-mode buttons ───────────────────────────────────────────────

const viewButtons: ViewButton[] = [
  { mode: 'video',  label: '影片',  svgPath: '<polygon points="5 3 19 12 5 21 5 3" />' },
  { mode: 'ani',    label: '動畫',  svgPath: '<circle cx="12" cy="12" r="2" /><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />' },
  { mode: 'score',  label: '計分板', svgPath: '<path d="M18 20V10M12 20V4M6 20v-6" />' },
];

// ─── Static: insight tabs ─────────────────────────────────────────────────────

const insightTabs: InsightTab[] = [
  { mode: 'outcome',    label: '更多玩法' },
  { mode: 'live',       label: '即時' },
  { mode: 'lineup',     label: '陣容' },
  { mode: 'statistics', label: '統計' },
  { mode: 'analysis',   label: '分析' },
];

/** SVG 內層 path，依 tab.mode 對應；不掛在 InsightTab 上 */
const insightTabSvgInner: Record<string, string> = {
  live: '<circle cx="12" cy="12" r="3" /><path d="M6.34 6.34a8 8 0 1 0 11.32 0M6.34 17.66a8 8 0 0 0 0-11.32" />',
  lineup: '<circle cx="12" cy="8" r="3" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /><circle cx="5" cy="14" r="2" /><circle cx="19" cy="14" r="2" />',
  statistics: '<path d="M18 20V10M12 20V4M6 20v-6" />',
  analysis: '<rect x="3" y="3" width="18" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><path d="M7 7h10M7 11h6" />',
  outcome: '<path d="M4 6h16M4 12h16M4 18h10" />',
};

// ─── Static: market / outcome data (更多玩法) ─────────────────────────────────

const staticMarkets: Market[] = [
  {
    marketId: 'mk001', marketName: '全場獨贏',
    filterTags: ['full', 'popular'],
    outcomeList: [
      { outcomeId: 'o1', outcomeName: '主隊勝', odds: '2.15', change: 'up' },
      { outcomeId: 'o2', outcomeName: '客隊勝', odds: '3.40', change: 'same' },
      { outcomeId: 'o3', outcomeName: '和局',   odds: '3.10', change: 'down' },
    ],
  },
  {
    marketId: 'mk002', marketName: '全場讓球',
    filterTags: ['full', 'handicap_ou', 'popular'],
    outcomeList: [
      { outcomeId: 'o4', outcomeName: '主隊 -0.5', odds: '1.85', change: 'same' },
      { outcomeId: 'o5', outcomeName: '客隊 +0.5', odds: '2.05', change: 'up' },
    ],
  },
  {
    marketId: 'mk003', marketName: '全場大小',
    filterTags: ['full', 'handicap_ou', 'popular'],
    outcomeList: [
      { outcomeId: 'o6', outcomeName: '大 2.5', odds: '1.92', change: 'down' },
      { outcomeId: 'o7', outcomeName: '小 2.5', odds: '1.88', change: 'same' },
    ],
  },
  {
    marketId: 'mk004', marketName: '半場獨贏',
    filterTags: ['half'],
    outcomeList: [
      { outcomeId: 'o8',  outcomeName: '主隊勝', odds: '2.60', change: 'same' },
      { outcomeId: 'o9',  outcomeName: '客隊勝', odds: '3.80', change: 'up' },
      { outcomeId: 'o10', outcomeName: '和局',   odds: '2.90', change: 'same' },
    ],
  },
  {
    marketId: 'mk005', marketName: '半場讓球',
    filterTags: ['half', 'handicap_ou'],
    outcomeList: [
      { outcomeId: 'o11', outcomeName: '主隊 0', odds: '1.95', change: 'same' },
      { outcomeId: 'o12', outcomeName: '客隊 0', odds: '1.95', change: 'same' },
    ],
  },
  {
    marketId: 'mk006', marketName: '半場大小',
    filterTags: ['half', 'handicap_ou'],
    outcomeList: [
      { outcomeId: 'o13', outcomeName: '大 1.5', odds: '1.78', change: 'up' },
      { outcomeId: 'o14', outcomeName: '小 1.5', odds: '2.10', change: 'down' },
    ],
  },
  {
    marketId: 'mk007', marketName: '雙重機會',
    filterTags: ['full', 'popular'],
    outcomeList: [
      { outcomeId: 'o15', outcomeName: '主隊或和', odds: '1.40', change: 'same' },
      { outcomeId: 'o16', outcomeName: '主或客勝', odds: '1.25', change: 'same' },
      { outcomeId: 'o17', outcomeName: '客隊或和', odds: '1.85', change: 'same' },
    ],
  },
  {
    marketId: 'mk008', marketName: '兩隊皆進',
    filterTags: ['full', 'popular'],
    outcomeList: [
      { outcomeId: 'o18', outcomeName: '是', odds: '1.70', change: 'up' },
      { outcomeId: 'o19', outcomeName: '否', odds: '2.20', change: 'down' },
    ],
  },
  {
    marketId: 'mk009', marketName: '正確比分',
    filterTags: ['correct_score', 'popular', 'full'],
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
    filterTags: ['full', 'popular'],
    outcomeList: [
      { outcomeId: 'o26', outcomeName: '0-1 球', odds: '2.80', change: 'same' },
      { outcomeId: 'o27', outcomeName: '2-3 球', odds: '2.20', change: 'up' },
      { outcomeId: 'o28', outcomeName: '4+ 球',  odds: '3.10', change: 'down' },
    ],
  },
];

const filteredMarkets = computed(() => {
  const id = currentMarketFilter.value;
  if (id === 'all') return staticMarkets;
  return staticMarkets.filter((m) => m.filterTags.includes(id));
});

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
  overflow: hidden;
}

/* ── Match info strip ────────────────────────────────────── */
.match-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  padding: 6px 10px 7px 0;
  background: linear-gradient(
    160deg,
    var(--color-surface-soft, #14171e) 0%,
    rgba(22, 119, 255, 0.06) 100%
  );
  border-bottom: 1px solid var(--color-border-subtle, rgba(255,255,255,0.06));
}

.w-70 {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

/* League row */
.info-league {
  display: flex;
  align-items: center;
  gap: 5px;
}

.league-logo {
  width: 13px;
  height: 13px;
  object-fit: contain;
  flex-shrink: 0;
  opacity: 0.85;
}

.league-name {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-subtle, #8b929e);
  letter-spacing: 0.02em;
  line-height: 1.2;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.live-badge {
  flex-shrink: 0;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #fff;
  background: #ef4444;
  padding: 0 4px;
  border-radius: 2px;
  line-height: 1.35;
}

.match-time {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 700;
  color: var(--color-primary, #1677ff);
  letter-spacing: 0.04em;
  font-variant-numeric: tabular-nums;
  line-height: 1.2;
}

/* Teams row */
.info-teams {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 8px;
}

.team-block {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  min-width: 0;

  &--away {
    flex-direction: row-reverse;
  }
}

.team-crest {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 50%;
  object-fit: contain;
  background: var(--color-btn-bg, rgba(255,255,255,0.05));
  padding: 1px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
}

.team-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-main, #e4e8f0);
  letter-spacing: 0.01em;
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1.25;
}

/* Score badge */
.score-badge {
  display: flex;
  align-items: center;
  gap: 1px;
  background: var(--color-btn-bg, rgba(255,255,255,0.05));
  border: 1px solid var(--color-border-subtle, rgba(255,255,255,0.08));
  border-radius: 6px;
  padding: 3px 8px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.22);

  &.is-live {
    border-color: rgba(22, 119, 255, 0.3);
    box-shadow: 0 0 0 1px rgba(22,119,255,0.12), 0 2px 10px rgba(22,119,255,0.1);
  }
}

.score-num {
  font-size: 16px;
  font-weight: 800;
  color: var(--color-main, #e4e8f0);
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.score-colon {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-subtle, #8b929e);
  line-height: 1;
  margin: 0 1px;
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
  width: 28px;
  height: 28px;
  border-radius: 7px;
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
  width: 14px;
  height: 14px;
  pointer-events: none;
}

/* ── Insight strip ───────────────────────────────────────── */
.insight-strip {
  display: flex;
  align-items: stretch;
  gap: 2px;
  padding: 3px 10px ;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

.insight-tab {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 8px 9px 5px;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--color-subtle, #8b929e);
  cursor: pointer;
  white-space: nowrap;
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
  flex-shrink: 0;
  pointer-events: none;
}

.tab-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1.2;
}

/* ── 玩法種類篩選（專案深色語意 + 分段膠囊） ─────────────────── */
.market-filter-wrap {
  flex-shrink: 0;
  padding: 8px 12px 10px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.028) 0%,
    transparent 65%
  );
  border-bottom: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.06));
}

.market-filter-pill {
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  gap: 3px;
  padding: 4px;
  background: rgba(0, 0, 0, 0.28);
  border: 1px solid var(--color-border-subtle, rgba(255, 255, 255, 0.08));
  border-radius: 999px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 4px 18px rgba(0, 0, 0, 0.35);
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
}

.market-filter-tab {
  flex: 1 0 auto;
  min-width: fit-content;
  padding: 7px 13px;
  margin: 0;
  border: none;
  border-radius: 999px;
  background: transparent;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-subtle, #8b929e);
  letter-spacing: 0.02em;
  cursor: pointer;
  white-space: nowrap;
  transition:
    color 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease;
  -webkit-tap-highlight-color: transparent;

  &:hover:not(.is-active) {
    color: var(--color-main, #e4e8f0);
    background: var(--color-btn-bg-hover, rgba(255, 255, 255, 0.07));
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary, #1677ff);
    outline-offset: 2px;
  }

  &.is-active {
    font-weight: 600;
    color: var(--color-main, #e4e8f0);
    background: linear-gradient(
      165deg,
      rgba(22, 119, 255, 0.38) 0%,
      rgba(22, 119, 255, 0.12) 100%
    );
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.14),
      0 0 0 1px rgba(22, 119, 255, 0.38),
      0 2px 12px rgba(22, 119, 255, 0.2);
  }
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
  max-height: calc(100dvh - 258px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 6px 10px 16px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.1) transparent;
  padding-bottom: 5rem;

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
