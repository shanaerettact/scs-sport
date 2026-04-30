<template>
  <template v-if="resultType == 'th'">
    <th class="!text-center" style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          {{ $t('label.full') }}
        </template>
        {{ $t('label.full') }}{{ $t('label.score') }}
      </n-tooltip>
    </th>
    <th class="!text-center" style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
            1
          </span>
        </template>
        {{ $t('label.q1') }}{{ $t('label.score') }}
      </n-tooltip>
    </th>
    <th class="!text-center" style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
            2
          </span>
        </template>
        {{ $t('label.q2') }}{{ $t('label.score') }}
      </n-tooltip>
    </th>
    <th class="!text-center" style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
            3
          </span>
        </template>
        {{ $t('label.q3') }}{{ $t('label.score') }}
      </n-tooltip>
    </th>
    <th class="!text-center" style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
            4
          </span>
        </template>
        {{ $t('label.q4') }}{{ $t('label.score') }}
      </n-tooltip>
    </th>
    <th class="!text-center" style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          {{ $t('label.ot') }}
        </template>
        {{ $t('label.ot') }}{{ $t('label.score') }}
      </n-tooltip>
    </th>
    <th class="!text-center" style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          {{ $t('label.firstHalf') }}
        </template>
        {{ $t('label.firstHalf') }}{{ $t('label.score') }}
      </n-tooltip>
    </th>
    <th class="!text-center" style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          {{ $t('label.secondHalf') }}
        </template>
        {{ $t('label.secondHalf') }}{{ $t('label.score') }}
      </n-tooltip>
    </th>
  </template>

  <template v-if="resultType == 'td'">
    <td>
      <div class="text-center">{{ basketballData?.score.full.home ?? '-' }}</div>
      <div class="text-center">{{ basketballData?.score.full.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ basketballData?.score.q1.home ?? '-' }}</div>
      <div class="text-center">{{ basketballData?.score.q1.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ basketballData?.score.q2.home ?? '-' }}</div>
      <div class="text-center">{{ basketballData?.score.q2.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ basketballData?.score.q3.home ?? '-' }}</div>
      <div class="text-center">{{ basketballData?.score.q3.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ basketballData?.score.q4.home ?? '-' }}</div>
      <div class="text-center">{{ basketballData?.score.q4.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ basketballData?.score.ot.home ?? '-' }}</div>
      <div class="text-center">{{ basketballData?.score.ot.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ basketballData?.score.firstHalf.home ?? '-' }}</div>
      <div class="text-center">{{ basketballData?.score.firstHalf.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ basketballData?.score.secondHalf.home ?? '-' }}</div>
      <div class="text-center">{{ basketballData?.score.secondHalf.away ?? '-' }}</div>
    </td>
  </template>
</template>

<script setup lang="ts">
import { NTooltip } from 'naive-ui';

defineProps<{
  resultType: string;
  basketballData?: {
    score: {
      firstHalf: { home: number | null, away: number | null; },
      secondHalf: { home: number | null, away: number | null; },
      full: { home: number | null, away: number | null; },
      q1: { home: number | null, away: number | null; },
      q2: { home: number | null, away: number | null; },
      q3: { home: number | null, away: number | null; },
      q4: { home: number | null, away: number | null; },
      ot: { home: number | null, away: number | null; },
    },
  },
}>();
</script>

<style lang="scss" scoped></style>