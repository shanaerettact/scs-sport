<template>
  <template v-if="resultType == 'th'">
    <th class="!text-center" style="--n-th-padding: 0" v-for="i in 5">
      <n-tooltip trigger="hover">
        <template #trigger>
          <span>{{ $t(`tennis.set${i}`) }}</span>
        </template>
        {{ $t(`tennis.set${i}`) }}
      </n-tooltip>
    </th>
    <th class="!text-center" style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          {{ $t('tennis.totalGames') }}
        </template>
        {{ $t('tennis.totalGames') }}
      </n-tooltip>
    </th>
    <th class="!text-center" style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          {{ $t('tennis.totalSets') }}
        </template>
        {{ $t('tennis.totalSets') }}
      </n-tooltip>
    </th>
  </template>

  <template v-if="resultType == 'td'">
    <td>
      <div class="text-center">{{ tennisData?.setsScore.set1.home ?? '-' }}</div>
      <div class="text-center">{{ tennisData?.setsScore.set1.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ tennisData?.setsScore.set2.home ?? '-' }}</div>
      <div class="text-center">{{ tennisData?.setsScore.set2.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ tennisData?.setsScore.set3.home ?? '-' }}</div>
      <div class="text-center">{{ tennisData?.setsScore.set3.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ tennisData?.setsScore.set4.home ?? '-' }}</div>
      <div class="text-center">{{ tennisData?.setsScore.set4.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ tennisData?.setsScore.set5.home ?? '-' }}</div>
      <div class="text-center">{{ tennisData?.setsScore.set5.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ tennisData?.setsScore.total.home ?? '-' }}</div>
      <div class="text-center">{{ tennisData?.setsScore.total.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ tennisData?.gamesScore.home ?? '-' }}</div>
      <div class="text-center">{{ tennisData?.gamesScore.away ?? '-' }}</div>
    </td>
  </template>
</template>

<script setup lang="ts">
import { NTooltip } from 'naive-ui';

defineProps<{
  resultType: string;
  tennisData?: {
    gamesScore: { home: number | null, away: number | null; },
    setsScore: {
      total: { home: number | null, away: number | null; },
      set1: { home: number | null, away: number | null; },
      set2: { home: number | null, away: number | null; },
      set3: { home: number | null, away: number | null; },
      set4: { home: number | null, away: number | null; },
      set5: { home: number | null, away: number | null; },
    };
  },
}>();
</script>

<style lang="scss" scoped></style>