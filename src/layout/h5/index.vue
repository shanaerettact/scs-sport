<template>
  <div class="relative flex min-h-dvh flex-col bg-[var(--color-background-color)] dark:bg-[rgb(16,16,20)]">
    <div class="sticky top-0 z-10">

      <MobileLayoutHeader />
      <SportsCategoryBar />

      <TimeFilterBar :counts="tabCounts" />
    </div>


    <main class="flex-1 overflow-y-auto pb-[calc(60px+env(safe-area-inset-bottom,0px))]">

      <div class="match-list">
        <MatchEventCard
          v-for="match in demoMatches"
          :key="match.matchId"
          :match="match"
          @more-markets="handleMoreMarkets"
          @open-video="handleOpenVideo"
          @open-ani="handleOpenAni"
          @open-stats="handleOpenStats"
        />
      </div>
    </main>

    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import BottomNav from './BottomNav.vue';
import MobileLayoutHeader from './MobileLayoutHeader.vue';
import SportsCategoryBar from './SportsCategoryBar.vue';
import TimeFilterBar from './TimeFilterBar.vue';
import MatchEventCard, { type MatchEvent } from './MatchEventCard.vue';
import { computed } from 'vue';

const handleMoreMarkets = (id: string) => { };
const handleOpenVideo   = (id: string) => { };
const handleOpenAni     = (id: string) => { };
const handleOpenStats   = (id: string) => { };

const tabCounts = computed<Record<string, number>>(() => {
  const liveCount  = demoMatches.filter((m) => m.isLive).length;
  const todayCount = demoMatches.filter((m) => !m.isLive && m.time?.startsWith('今日')).length;
  const earlyCount = demoMatches.filter((m) => !m.isLive && !m.time?.startsWith('今日')).length;
  return {
    hot:   demoMatches.length,
    roll:  liveCount,
    today: todayCount,
    early: earlyCount,
  };
});

const demoMatches: MatchEvent[] = [
  {
    matchId: 'm001',
    leagueName: '大洋洲职业足球联赛',
    leagueLogo: '/images/sports/league.png',
    isLive: true,
    period: '上半场',
    clock: '07:01',
    homeTeamName: '南墨尔本',
    homeTeamLogo: '/images/sports/homeTeam.png',
    awayTeamName: '布拉足球俱乐部',
    awayTeamLogo: '/images/sports/awayTeam.png',
    hasDraw: true,
    extraMarketCount: 11,
    hasVideo: true,
    hasAni: true,
    stats: { homeCorner: 0, awayCorner: 0, homeRed: 0, awayRed: 0, homeYellow: 0, awayYellow: 0, homeScore: 0, awayScore: 0 },
    odds: {
      home: { win: '2.15', winChange: 'up', handicap: '1.85', handicapChange: 'same', handicapLine: '-0.5', over: '1.92', overChange: 'down', overLine: '2.5' },
      away: { win: '3.40', winChange: 'same', handicap: '2.05', handicapChange: 'up', handicapLine: '+0.5', under: '1.88', underChange: 'same', underLine: '2.5' },
      draw: '3.10', drawChange: 'same',
    },
  },
  {
    matchId: 'm002',
    leagueName: '英格兰超级联赛',
    leagueLogo: '/images/sports/league.png',
    isLive: true,
    period: '下半场',
    clock: '62:34',
    homeTeamName: '曼彻斯特城',
    homeTeamLogo: '/images/sports/homeTeam.png',
    awayTeamName: '利物浦',
    awayTeamLogo: '/images/sports/awayTeam.png',
    hasDraw: true,
    extraMarketCount: 24,
    hasVideo: true,
    hasAni: true,
    stats: { homeCorner: 3, awayCorner: 5, homeRed: 0, awayRed: 1, homeYellow: 2, awayYellow: 3, homeScore: 1, awayScore: 2 },
    odds: {
      home: { win: '2.60', winChange: 'down', handicap: '2.10', handicapChange: 'same', handicapLine: '+0.5', over: '1.78', overChange: 'up', overLine: '3.5' },
      away: { win: '1.72', winChange: 'up', handicap: '1.88', handicapChange: 'down', handicapLine: '-0.5', under: '2.05', underChange: 'same', underLine: '3.5' },
      draw: '3.50', drawChange: 'down',
    },
  },
  {
    matchId: 'm003',
    leagueName: '西班牙甲级联赛',
    leagueLogo: '/images/sports/league.png',
    isLive: false,
    time: '今日 20:45',
    homeTeamName: '巴塞罗那',
    homeTeamLogo: '/images/sports/homeTeam.png',
    awayTeamName: '皇家马德里',
    awayTeamLogo: '/images/sports/awayTeam.png',
    hasDraw: true,
    extraMarketCount: 18,
    hasVideo: false,
    hasAni: false,
    stats: { homeCorner: 0, awayCorner: 0, homeRed: 0, awayRed: 0, homeYellow: 0, awayYellow: 0, homeScore: 0, awayScore: 0 },
    odds: {
      home: { win: '2.20', winChange: 'same', handicap: '1.95', handicapChange: 'same', handicapLine: '0', over: '1.88', overChange: 'same', overLine: '2.5' },
      away: { win: '3.00', winChange: 'same', handicap: '2.00', handicapChange: 'same', handicapLine: '0', under: '1.95', underChange: 'same', underLine: '2.5' },
      draw: '3.20', drawChange: 'same',
    },
  },
  {
    matchId: 'm004',
    leagueName: '德国甲级联赛',
    leagueLogo: '/images/sports/league.png',
    isLive: true,
    period: '上半场',
    clock: '38:12',
    homeTeamName: '拜仁慕尼黑',
    homeTeamLogo: '/images/sports/homeTeam.png',
    awayTeamName: '多特蒙德',
    awayTeamLogo: '/images/sports/awayTeam.png',
    hasDraw: true,
    extraMarketCount: 20,
    hasVideo: true,
    hasAni: false,
    stats: { homeCorner: 2, awayCorner: 1, homeRed: 0, awayRed: 0, homeYellow: 1, awayYellow: 2, homeScore: 1, awayScore: 0 },
    odds: {
      home: { win: '1.65', winChange: 'up', handicap: '1.72', handicapChange: 'same', handicapLine: '-1', over: '1.85', overChange: 'same', overLine: '3.5' },
      away: { win: '4.80', winChange: 'down', handicap: '2.20', handicapChange: 'up', handicapLine: '+1', under: '2.00', underChange: 'same', underLine: '3.5' },
      draw: '3.90', drawChange: 'up',
    },
  },
  {
    matchId: 'm005',
    leagueName: '意大利甲级联赛',
    leagueLogo: '/images/sports/league.png',
    isLive: false,
    time: '明日 02:45',
    homeTeamName: '尤文图斯',
    homeTeamLogo: '/images/sports/homeTeam.png',
    awayTeamName: 'AC米兰',
    awayTeamLogo: '/images/sports/awayTeam.png',
    hasDraw: true,
    extraMarketCount: 16,
    hasVideo: false,
    hasAni: true,
    stats: { homeCorner: 0, awayCorner: 0, homeRed: 0, awayRed: 0, homeYellow: 0, awayYellow: 0, homeScore: 0, awayScore: 0 },
    odds: {
      home: { win: '2.35', winChange: 'same', handicap: '2.05', handicapChange: 'same', handicapLine: '+0.5', over: '1.90', overChange: 'same', overLine: '2.5' },
      away: { win: '2.80', winChange: 'same', handicap: '1.90', handicapChange: 'same', handicapLine: '-0.5', under: '1.92', underChange: 'same', underLine: '2.5' },
      draw: '3.40', drawChange: 'same',
    },
  },
];
</script>

<style scoped lang="scss">
.match-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 10px;
}
.hignt {
  color: white;
  padding: 20px;
}
</style>
