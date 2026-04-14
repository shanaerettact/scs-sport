<template>
  <template v-if="resultType == 'th'">
    <th class="!text-center" style="--n-th-padding: 0" v-for="i in 9">
      <n-tooltip trigger="hover">
        <template #trigger>
          <span>{{ $t(`baseball.inning${i}`) }}</span>
        </template>
        {{ $t(`baseball.inning${i}`) }}
      </n-tooltip>
    </th>
    <th class="!text-center" style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          {{ $t('baseball.firstFive') }}
        </template>
        {{ $t('baseball.firstFive') }}
      </n-tooltip>
    </th>
    <th class="!text-center" style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          {{ $t('baseball.full') }}
        </template>
        {{ $t('baseball.full') }}
      </n-tooltip>
    </th>
    <th class="!text-center" style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          {{ $t('baseball.hits') }}
        </template>
        {{ $t('baseball.hits') }}
      </n-tooltip>
    </th>
  </template>

  <template v-if="resultType == 'td'">
    <td>
      <div class="text-center">{{ baseballData?.score.inning1.home ?? '-' }}</div>
      <div class="text-center">{{ baseballData?.score.inning1.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ baseballData?.score.inning2.home ?? '-' }}</div>
      <div class="text-center">{{ baseballData?.score.inning2.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ baseballData?.score.inning3.home ?? '-' }}</div>
      <div class="text-center">{{ baseballData?.score.inning3.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ baseballData?.score.inning4.home ?? '-' }}</div>
      <div class="text-center">{{ baseballData?.score.inning4.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ baseballData?.score.inning5.home ?? '-' }}</div>
      <div class="text-center">{{ baseballData?.score.inning5.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ baseballData?.score.inning6.home ?? '-' }}</div>
      <div class="text-center">{{ baseballData?.score.inning6.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ baseballData?.score.inning7.home ?? '-' }}</div>
      <div class="text-center">{{ baseballData?.score.inning7.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ baseballData?.score.inning8.home ?? '-' }}</div>
      <div class="text-center">{{ baseballData?.score.inning8.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ baseballData?.score.inning9.home ?? '-' }}</div>
      <div class="text-center">{{ baseballData?.score.inning9.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ baseballData?.score.firstFive.home ?? '-' }}</div>
      <div class="text-center">{{ baseballData?.score.firstFive.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ baseballData?.score.full.home ?? '-' }}</div>
      <div class="text-center">{{ baseballData?.score.full.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ baseballData?.hitsScore.home ?? '-' }}</div>
      <div class="text-center">{{ baseballData?.hitsScore.away ?? '-' }}</div>
    </td>
  </template>
</template>

<script setup lang="ts">
import { NTooltip } from 'naive-ui';

defineProps<{
  resultType: string;
  baseballData?: {
    hitsScore: { home: number | null, away: number | null; },
    score: {
      full: { home: number | null, away: number | null; },
      firstFive: { home: number | null, away: number | null; },
      inning1: { home: number | null, away: number | null; },
      inning2: { home: number | null, away: number | null; },
      inning3: { home: number | null, away: number | null; },
      inning4: { home: number | null, away: number | null; },
      inning5: { home: number | null, away: number | null; },
      inning6: { home: number | null, away: number | null; },
      inning7: { home: number | null, away: number | null; },
      inning8: { home: number | null, away: number | null; },
      inning9: { home: number | null, away: number | null; },
    };
  },
}>();
</script>

<style lang="scss" scoped></style>