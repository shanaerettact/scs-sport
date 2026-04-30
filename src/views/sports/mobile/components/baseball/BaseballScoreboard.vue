<template>
  <div class="flex flex-col rounded-md bg-surface font-semibold p-3 team">
    <div class="flex justify-between items-center text-base">
      <div class="flex items-center gap-1">
        <img src="/images/sports/baseball.png" class="w-4">
        <span>{{ matchStore.respSportMarketList.leagueInfo.leagueName }}</span>
      </div>
      <div class="space-x-1">
        <span>{{ matchStore.respSportMarketList.matchInfo.matchPeriodId != '' ? matchStore.respSportMarketList.matchInfo.matchPeriodName : dayjs(matchStore.respSportMarketList.matchInfo.matchTime).format('MM-DD HH:mm') }}</span>
      </div>
    </div>
    <div class="grid grid-cols-3 m-auto">
      <!-- home team -->
      <div class="flex flex-col items-center gap-2">
        <img :src="matchStore.respSportMarketList.matchInfo.homeTeamLogo" alt="" class="w-13 h-13 object-fit" onerror="this.src='/images/sports/homeTeam.png'" />
        <div class="grid grid-cols-3 gap-2 text-sm" v-if="matchStore.respSportMarketList.matchInfo.matchPeriodId != ''">
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
        <div class="grid grid-cols-3 gap-2 text-sm" v-if="matchStore.respSportMarketList.matchInfo.matchPeriodId != ''">
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
import { computed } from 'vue';
import { NIcon, NTooltip } from 'naive-ui';
import { useMatchStore } from '@/store/module/match';
import dayjs from 'dayjs';

const matchStore = useMatchStore();

</script>

<style lang="scss" scoped></style>