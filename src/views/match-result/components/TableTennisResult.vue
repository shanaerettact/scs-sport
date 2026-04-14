<template>
  <template v-if="resultType == 'th'">
    <th class="!text-center" style="--n-th-padding: 0" v-for="i in 7">
      <n-tooltip trigger="hover">
        <template #trigger>
          <span>{{ $t(`tableTennis.set${i}`) }}</span>
        </template>
        {{ $t(`tableTennis.set${i}`) }}
      </n-tooltip>
    </th>
    <th class="!text-center" style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          {{ $t('tableTennis.totalGames') }}
        </template>
        {{ $t('tableTennis.totalGames') }}
      </n-tooltip>
    </th>
    <th class="!text-center" style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          {{ $t('tableTennis.totalSets') }}
        </template>
        {{ $t('tableTennis.totalSets') }}
      </n-tooltip>
    </th>
  </template>

  <template v-if="resultType == 'td'">
    <td>
      <div class="text-center">{{ tabletennisData?.setsScore.set1.home ?? '-' }}</div>
      <div class="text-center">{{ tabletennisData?.setsScore.set1.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ tabletennisData?.setsScore.set2.home ?? '-' }}</div>
      <div class="text-center">{{ tabletennisData?.setsScore.set2.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ tabletennisData?.setsScore.set3.home ?? '-' }}</div>
      <div class="text-center">{{ tabletennisData?.setsScore.set3.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ tabletennisData?.setsScore.set4.home ?? '-' }}</div>
      <div class="text-center">{{ tabletennisData?.setsScore.set4.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ tabletennisData?.setsScore.set5.home ?? '-' }}</div>
      <div class="text-center">{{ tabletennisData?.setsScore.set5.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ tabletennisData?.setsScore.set6.home ?? '-' }}</div>
      <div class="text-center">{{ tabletennisData?.setsScore.set6.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ tabletennisData?.setsScore.set7.home ?? '-' }}</div>
      <div class="text-center">{{ tabletennisData?.setsScore.set7.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ tabletennisData?.setsScore.total.home ?? '-' }}</div>
      <div class="text-center">{{ tabletennisData?.setsScore.total.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ tabletennisData?.gamesScore.home ?? '-' }}</div>
      <div class="text-center">{{ tabletennisData?.gamesScore.away ?? '-' }}</div>
    </td>
  </template>
</template>

<script setup lang="ts">
import { NTooltip } from 'naive-ui';

defineProps<{
  resultType: string;
  tabletennisData?: {
    gamesScore: { home: number | null, away: number | null; },
    setsScore: {
      total: { home: number | null, away: number | null; },
      set1: { home: number | null, away: number | null; },
      set2: { home: number | null, away: number | null; },
      set3: { home: number | null, away: number | null; },
      set4: { home: number | null, away: number | null; },
      set5: { home: number | null, away: number | null; },
      set6: { home: number | null, away: number | null; },
      set7: { home: number | null, away: number | null; },
    };
  },
}>();
</script>

<style lang="scss" scoped></style>