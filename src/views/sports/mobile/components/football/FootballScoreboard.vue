<template>
  <div class="flex flex-col rounded-md bg-surface font-semibold p-3 team">
    <div class="flex justify-between items-center text-base">
      <div class="flex items-center gap-1">
        <img src="/images/sports/soccer.png" class="w-4">
        <span>{{ matchStore.respSportMarketList.leagueInfo.leagueName }}</span>
      </div>
      <div class="space-x-1">
        <span>{{ matchStore.respSportMarketList.matchInfo.matchPeriodName }}</span>
        <span>{{ matchStore.respSportMarketList.matchInfo.matchPeriodStartTime > 0 ? matchDuration : dayjs(matchStore.respSportMarketList.matchInfo.matchTime).format('MM-DD HH:mm') }}</span>
      </div>
    </div>
    <div class="grid grid-cols-3 m-auto">
      <!-- home team -->
      <div class="flex flex-col items-center gap-2">
        <img :src="matchStore.respSportMarketList.matchInfo.homeTeamLogo" alt="" class="w-13 h-13 object-fit" onerror="this.src='/images/sports/homeTeam.png'" />
        <div class="flex-1 flex items-center justify-center text-sm gap-1" v-if="matchStore.respSportMarketList.matchInfo.matchPeriodStartTime > 0">
          <n-tooltip trigger="hover">
            <template #trigger>
              <img class="w-5 h-5" src="/images/football-icon/full-corner.png"></img>
            </template>
            {{ $t('label.corner') }}
          </n-tooltip>
          {{ matchStore.respSportMarketList.matchInfo.footballData?.homeCorner ?? '-' }}
          <n-tooltip trigger="hover">
            <template #trigger>
              <img class="w-5 h-5" src="/images/football-icon/full-red.png"></img>
            </template>
            {{ $t('label.redCard') }}
          </n-tooltip>
          {{ matchStore.respSportMarketList.matchInfo.footballData?.homeRedCard ?? '-' }}
          <n-tooltip trigger="hover">
            <template #trigger>
              <img class="w-5 h-5" src="/images/football-icon/full-yellow.png"></img>
            </template>
            {{ $t('label.yellowCard') }}
          </n-tooltip>
          {{ matchStore.respSportMarketList.matchInfo.footballData?.homeYellowCard ?? '-' }}
        </div>
        <n-tooltip trigger="hover">
          <template #trigger>
            <div class="w-30 truncate text-center">{{ matchStore.respSportMarketList.matchInfo.homeTeamName }}</div>
          </template>
          {{ matchStore.respSportMarketList.matchInfo.homeTeamName }}
        </n-tooltip>
      </div>

      <!-- score -->
      <div class="flex items-center justify-center text-3xl">
        {{ matchStore.respSportMarketList.matchInfo.score ? matchStore.respSportMarketList.matchInfo.score : $t('label.notStarted') }}
      </div>

      <!-- away team -->
      <div class="flex flex-col items-center gap-2">
        <img :src="matchStore.respSportMarketList.matchInfo.awayTeamLogo" alt="" class="w-13 h-13 object-fit" onerror="this.src='/images/sports/awayTeam.png'" />
        <div class="flex-1 flex items-center justify-center text-sm gap-1" v-if="matchStore.respSportMarketList.matchInfo.matchPeriodStartTime > 0">
          <n-tooltip trigger="hover">
            <template #trigger>
              <img class="w-5 h-5" src="/images/football-icon/full-corner.png"></img>
            </template>
            {{ $t('label.corner') }}
          </n-tooltip>
          {{ matchStore.respSportMarketList.matchInfo.footballData?.awayCorner ?? '-' }}
          <n-tooltip trigger="hover">
            <template #trigger>
              <img class="w-5 h-5" src="/images/football-icon/full-red.png"></img>
            </template>
            {{ $t('label.redCard') }}
          </n-tooltip>
          {{ matchStore.respSportMarketList.matchInfo.footballData?.awayRedCard ?? '-' }}
          <n-tooltip trigger="hover">
            <template #trigger>
              <img class="w-5 h-5" src="/images/football-icon/full-yellow.png"></img>
            </template>
            {{ $t('label.yellowCard') }}
          </n-tooltip>
          {{ matchStore.respSportMarketList.matchInfo.footballData?.awayYellowCard ?? '-' }}
        </div>
        <n-tooltip trigger="hover">
          <template #trigger>
            <div class="w-30 truncate text-center">{{ matchStore.respSportMarketList.matchInfo.awayTeamName }}</div>
          </template>
          {{ matchStore.respSportMarketList.matchInfo.awayTeamName }}
        </n-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NIcon, NTooltip } from 'naive-ui';
import { useMatchStore } from '@/store/module/match';
import { useNow } from '@/composables/useNow';
import dayjs from 'dayjs';
import { computed } from 'vue';

const matchStore = useMatchStore();

const now = useNow();
const matchDuration = computed(() => {
  const diff = now.value - matchStore.respSportMarketList.matchInfo.matchPeriodStartTime;
  const dur = dayjs.duration(diff);

  const totalMinutes = String(Math.floor(dur.asMinutes())).padStart(2, '0');
  const seconds = String(dur.seconds()).padStart(2, '0');

  return `${totalMinutes}:${seconds}`;
});
</script>

<style lang="scss" scoped></style>