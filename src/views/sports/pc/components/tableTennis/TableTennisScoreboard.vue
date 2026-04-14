<template>
  <div class="flex flex-col rounded-md bg-surface text-xl font-semibold p-3 team">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-1">
        <img src="/images/sports/table-tennis.png" class="w-6">
        <span>{{ matchStore.respSportMarketList.leagueInfo.leagueName }}</span>
      </div>
      <div class="space-x-1">
        <span>{{ matchStore.respSportMarketList.matchInfo.matchPeriodId != '' ? matchStore.respSportMarketList.matchInfo.matchPeriodName : dayjs(matchStore.respSportMarketList.matchInfo.matchTime).format('MM-DD HH:mm') }}</span>
      </div>
    </div>
    <div class="grid grid-cols-3 m-auto">
      <!-- home team -->
      <div class="flex flex-col items-center gap-2">
        <img :src="matchStore.respSportMarketList.matchInfo.homeTeamLogo" alt="" class="w-16 h-16 object-fit" onerror="this.src='/images/sports/homeTeam.png'" />
        <div class="flex-1 flex flex-wrap items-center justify-center text-sm gap-1" v-if="matchStore.respSportMarketList.matchInfo.matchPeriodId != ''">
          <n-tooltip trigger="hover">
            <template #trigger>
              <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
                1
              </span>
            </template>
            {{ $t('label.numberGame', { game: 1 }) }}
          </n-tooltip>
          {{ matchStore.respSportMarketList.matchInfo.tabletennisData?.game1HomeScore ?? '-' }}
          <n-tooltip trigger="hover">
            <template #trigger>
              <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
                2
              </span>
            </template>
            {{ $t('label.numberGame', { game: 2 }) }}
          </n-tooltip>
          {{ matchStore.respSportMarketList.matchInfo.tabletennisData?.game2HomeScore ?? '-' }}
          <n-tooltip trigger="hover">
            <template #trigger>
              <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
                3
              </span>
            </template>
            {{ $t('label.numberGame', { game: 3 }) }}
          </n-tooltip>
          {{ matchStore.respSportMarketList.matchInfo.tabletennisData?.game3HomeScore ?? '-' }}
          <n-tooltip trigger="hover">
            <template #trigger>
              <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
                4
              </span>
            </template>
            {{ $t('label.numberGame', { game: 4 }) }}
          </n-tooltip>
          {{ matchStore.respSportMarketList.matchInfo.tabletennisData?.game4HomeScore ?? '-' }}
          <n-tooltip trigger="hover">
            <template #trigger>
              <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
                5
              </span>
            </template>
            {{ $t('label.numberGame', { game: 5 }) }}
          </n-tooltip>
          {{ matchStore.respSportMarketList.matchInfo.tabletennisData?.game5HomeScore ?? '-' }}
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
        <img :src="matchStore.respSportMarketList.matchInfo.awayTeamLogo" alt="" class="w-16 h-16 object-fit" onerror="this.src='/images/sports/awayTeam.png'" />
        <div class="flex-1 flex flex-wrap items-center justify-center text-sm gap-1" v-if="matchStore.respSportMarketList.matchInfo.matchPeriodId != ''">
          <n-tooltip trigger="hover">
            <template #trigger>
              <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
                1
              </span>
            </template>
            {{ $t('label.numberGame', { game: 1 }) }}
          </n-tooltip>
          {{ matchStore.respSportMarketList.matchInfo.tabletennisData?.game1AwayScore ?? '-' }}
          <n-tooltip trigger="hover">
            <template #trigger>
              <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
                2
              </span>
            </template>
            {{ $t('label.numberGame', { game: 2 }) }}
          </n-tooltip>
          {{ matchStore.respSportMarketList.matchInfo.tabletennisData?.game2AwayScore ?? '-' }}
          <n-tooltip trigger="hover">
            <template #trigger>
              <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
                3
              </span>
            </template>
            {{ $t('label.numberGame', { game: 3 }) }}
          </n-tooltip>
          {{ matchStore.respSportMarketList.matchInfo.tabletennisData?.game3AwayScore ?? '-' }}
          <n-tooltip trigger="hover">
            <template #trigger>
              <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
                4
              </span>
            </template>
            {{ $t('label.numberGame', { game: 4 }) }}
          </n-tooltip>
          {{ matchStore.respSportMarketList.matchInfo.tabletennisData?.game4AwayScore ?? '-' }}
          <n-tooltip trigger="hover">
            <template #trigger>
              <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
                5
              </span>
            </template>
            {{ $t('label.numberGame', { game: 5 }) }}
          </n-tooltip>
          {{ matchStore.respSportMarketList.matchInfo.tabletennisData?.game5AwayScore ?? '-' }}
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