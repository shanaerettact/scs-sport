<template>
  <div class="match-card">
    <!-- 聯賽 header -->
    <div class="match-card__header">
      <div class="flex items-center gap-2 min-w-0">
        <img
          :src="match.leagueLogo"
          :alt="match.leagueName"
          class="w-4 h-4 object-contain flex-shrink-0"
          @error="($event.target as HTMLImageElement).src = '/images/sports/league.png'"
        />
        <span class="match-card__league truncate">{{ match.leagueName }}</span>
        <span v-if="match.isLive" class="live-badge">LIVE</span>
      </div>
      <div class="match-card__time">
        <span v-if="match.isLive" class="live-period">{{ match.period }}</span>
        <span v-if="match.isLive" class="live-clock">{{ match.clock }}</span>
        <span v-else>{{ match.time }}</span>
      </div>
    </div>

    <!-- 賠率標題列 -->
    <div class="match-card__odds-header">
      <div class="col-team" />
      <div class="col-odds text-center">獨贏</div>
      <div class="col-odds text-center">讓球</div>
      <div class="col-odds text-center">大/小</div>
    </div>

    <!-- 主隊行 -->
    <div class="match-card__team-row">
      <div class="col-team flex items-center gap-2 min-w-0">
        <img
          :src="match.homeTeamLogo"
          :alt="match.homeTeamName"
          class="w-7 h-7 object-contain flex-shrink-0 rounded-full"
          @error="($event.target as HTMLImageElement).src = '/images/sports/homeTeam.png'"
        />
        <span class="team-name truncate">{{ match.homeTeamName }}</span>
      </div>
      <div class="col-odds">
        <OddsCell :value="match.odds.home.win" :change="match.odds.home.winChange" />
      </div>
      <div class="col-odds">
        <OddsCell :value="match.odds.home.handicap" :change="match.odds.home.handicapChange" :label="match.odds.home.handicapLine" />
      </div>
      <div class="col-odds">
        <OddsCell :value="match.odds.home.over" :change="match.odds.home.overChange" :label="match.odds.home.overLine" />
      </div>
    </div>

    <!-- 客隊行 -->
    <div class="match-card__team-row">
      <div class="col-team flex items-center gap-2 min-w-0">
        <img
          :src="match.awayTeamLogo"
          :alt="match.awayTeamName"
          class="w-7 h-7 object-contain flex-shrink-0 rounded-full"
          @error="($event.target as HTMLImageElement).src = '/images/sports/awayTeam.png'"
        />
        <span class="team-name truncate">{{ match.awayTeamName }}</span>
      </div>
      <div class="col-odds">
        <OddsCell :value="match.odds.away.win" :change="match.odds.away.winChange" />
      </div>
      <div class="col-odds">
        <OddsCell :value="match.odds.away.handicap" :change="match.odds.away.handicapChange" :label="match.odds.away.handicapLine" />
      </div>
      <div class="col-odds">
        <OddsCell :value="match.odds.away.under" :change="match.odds.away.underChange" :label="match.odds.away.underLine" />
      </div>
    </div>

    <!-- 和局行 (足球) -->
    <div v-if="match.hasDraw" class="match-card__draw-row">
      <div class="col-team flex items-center gap-2">
        <span class="draw-label">和局</span>
      </div>
      <div class="col-odds">
        <OddsCell :value="match.odds.draw" :change="match.odds.drawChange" />
      </div>
      <div class="col-odds"><OddsCell :locked="true" /></div>
      <div class="col-odds"><OddsCell :locked="true" /></div>
    </div>

    <!-- 底部：更多玩法 + 操作按鈕 + 賽況統計 -->
    <div class="match-card__footer">

      <!-- Row 1: 更多玩法 (left) + 操作按鈕 (right) -->
      <div class="footer-top-row">
        <button class="more-markets-btn" @click="$emit('moreMarkets', match.matchId)">
          更多玩法
          <span class="more-markets-count">{{ match.extraMarketCount }}</span>
          <svg class="chevron-icon" viewBox="0 0 12 12" fill="none">
            <path d="M4.5 2L8.5 6L4.5 10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <div class="footer-actions">
          <button v-if="match.hasVideo" class="action-btn" @click="$emit('openVideo', match.matchId)" aria-label="影片">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-4 h-4">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </button>
          <button v-if="match.hasAni" class="action-btn" @click="$emit('openAni', match.matchId)" aria-label="動畫">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-4 h-4">
              <circle cx="12" cy="12" r="2" />
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </button>
          <button class="action-btn" @click="$emit('openStats', match.matchId)" aria-label="數據">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-4 h-4">
              <path d="M18 20V10M12 20V4M6 20v-6" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Row 2: 賽況統計 bar -->
      <div class="footer-stats-row">
        <div class="stat-chip">
          <img src="/images/football-icon/full-corner.png" alt="角球" class="stat-icon" />
          <span class="stat-label">角</span>
          <span class="stat-score">{{ match.stats.homeCorner }}<em>:</em>{{ match.stats.awayCorner }}</span>
        </div>

        <div class="stat-divider" aria-hidden="true" />

        <div class="stat-chip">
          <img src="/images/football-icon/full-red.png" alt="紅牌" class="stat-icon" />
          <span class="stat-label">紅</span>
          <span class="stat-score">{{ match.stats.homeRed }}<em>:</em>{{ match.stats.awayRed }}</span>
        </div>

        <div class="stat-divider" aria-hidden="true" />

        <div class="stat-chip">
          <img src="/images/football-icon/full-yellow.png" alt="黃牌" class="stat-icon" />
          <span class="stat-label">黃</span>
          <span class="stat-score">{{ match.stats.homeYellow }}<em>:</em>{{ match.stats.awayYellow }}</span>
        </div>

        <div class="stat-divider stat-divider--accent" aria-hidden="true" />

        <!-- Score chip: highlighted -->
        <div class="stat-chip stat-chip--score">
          <img src="/images/football-icon/full-score.png" alt="比分" class="stat-icon" />
          <span class="stat-label">比分</span>
          <span class="stat-score stat-score--score">{{ match.stats.homeScore }}<em>:</em>{{ match.stats.awayScore }}</span>
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

<style scoped lang="scss">
.match-card {
  background-color: var(--color-surface);
  border-radius: 10px;
  overflow: hidden;
  font-size: 13px;
  color: var(--color-main);
}

.match-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: var(--color-surface-soft);
  border-bottom: 1px solid var(--color-surface-hover);
  gap: 8px;
}

.match-card__league {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-subtle);
}

.live-badge {
  font-size: 10px;
  font-weight: 700;
  color: #fff;
  background: #ef4444;
  border-radius: 4px;
  padding: 1px 5px;
  flex-shrink: 0;
  letter-spacing: 0.05em;
}

.match-card__time {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  font-size: 12px;
  color: var(--color-subtle);
}

.live-period {
  color: var(--color-primary);
  font-weight: 600;
}

.live-clock {
  color: var(--color-primary);
  font-weight: 700;
  letter-spacing: 0.05em;
}

/* Column layout shared across header / team rows */
.match-card__odds-header,
.match-card__team-row,
.match-card__draw-row {
  display: grid;
  grid-template-columns: 1fr repeat(3, 72px);
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
}

.match-card__odds-header {
  padding-top: 8px;
  padding-bottom: 4px;
  font-size: 11px;
  color: var(--color-subtle-light);
  font-weight: 500;
}

.match-card__team-row + .match-card__team-row {
  border-top: 1px solid var(--color-surface-hover);
}

.match-card__draw-row {
  border-top: 1px solid var(--color-surface-hover);
  padding-top: 4px;
  padding-bottom: 4px;
}

.col-team {
  min-width: 0;
}

.col-odds {
  /* cells sized by OddsCell */
}

.team-name {
  font-size: 13px;
  font-weight: 600;
}

.draw-label {
  font-size: 12px;
  color: var(--color-subtle);
}

/* ── Footer wrapper ─────────────────────────────────── */
.match-card__footer {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--color-surface-hover);
}

/* ── Row 1: 更多玩法 + action buttons ───────────────── */
.footer-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  gap: 8px;
}

.more-markets-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
  color: #60a5fa;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  white-space: nowrap;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;

  &:active { opacity: 0.65; }
}

.more-markets-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 16px;
  padding: 0 4px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  background-color: rgba(96, 165, 250, 0.15);
  color: #93c5fd;
  letter-spacing: 0;
}

.chevron-icon {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  color: #60a5fa;
  opacity: 0.7;
}

.footer-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  border: 1px solid var(--color-surface-hover);
  background: var(--color-outcome-background);
  color: var(--color-subtle);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: var(--color-surface-hover);
    color: var(--color-main);
  }

  &:active { opacity: 0.7; }
}

/* ── Row 2: stats bar ───────────────────────────────── */
.footer-stats-row {
  display: flex;
  align-items: stretch;
  border-top: 1px solid var(--color-surface-hover);
  background-color: var(--color-surface-soft);
}

.stat-chip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex: 1;
  padding: 5px 6px;
  min-width: 0;
}

.stat-chip--score {
  background-color: rgba(44, 217, 125, 0.06);
  flex: 1.2;
}

.stat-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
  flex-shrink: 0;
  opacity: 0.85;
}

.stat-label {
  font-size: 10px;
  font-weight: 500;
  color: var(--color-subtle-light);
  letter-spacing: 0.02em;
  flex-shrink: 0;
}

.stat-score {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-subtle);
  letter-spacing: 0.03em;
  white-space: nowrap;

  em {
    font-style: normal;
    opacity: 0.45;
    margin: 0 1px;
  }
}

.stat-score--score {
  color: var(--color-primary);
  font-weight: 700;
  font-size: 12px;
}

.stat-divider {
  width: 1px;
  align-self: stretch;
  background-color: var(--color-surface-hover);
  flex-shrink: 0;
}

.stat-divider--accent {
  background-color: rgba(44, 217, 125, 0.18);
}
</style>
