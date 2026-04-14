<template>
  <div class="grid grid-cols-2">
    <div class="flex flex-col gap-1">
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            F
          </template>
          {{ $t('label.full') }}{{ $t('label.score') }}
        </n-tooltip>
        {{ basketballData?.score.full.home ?? '-' }}：{{ basketballData?.score.full.away ?? '-' }}
      </div>

      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            H
          </template>
          {{ $t('label.firstHalf') }}{{ $t('label.score') }}
        </n-tooltip>
        {{ basketballData?.score.firstHalf.home ?? '-' }}：{{ basketballData?.score.firstHalf.away ?? '-' }}
      </div>

      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            S
          </template>
          {{ $t('label.secondHalf') }}{{ $t('label.score') }}
        </n-tooltip>
        {{ basketballData?.score.secondHalf.home ?? '-' }}：{{ basketballData?.score.secondHalf.away ?? '-' }}
      </div>

      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            O
          </template>
          {{ $t('label.ot') }}{{ $t('label.score') }}
        </n-tooltip>
        {{ basketballData?.score.ot.home ?? '-' }}：{{ basketballData?.score.ot.away ?? '-' }}
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              1
            </span>
          </template>
          {{ $t('label.q1') }}{{ $t('label.score') }}
        </n-tooltip>
        {{ basketballData?.score.q1.home ?? '-' }}：{{ basketballData?.score.q1.away ?? '-' }}
      </div>

      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              2
            </span>
          </template>
          {{ $t('label.q2') }}{{ $t('label.score') }}
        </n-tooltip>
        {{ basketballData?.score.q2.home ?? '-' }}：{{ basketballData?.score.q2.away ?? '-' }}
      </div>

      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              3
            </span>
          </template>
          {{ $t('label.q3') }}{{ $t('label.score') }}
        </n-tooltip>
        {{ basketballData?.score.q3.home ?? '-' }}：{{ basketballData?.score.q3.away ?? '-' }}
      </div>

      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              4
            </span>
          </template>
          {{ $t('label.q4') }}{{ $t('label.score') }}
        </n-tooltip>
        {{ basketballData?.score.q4.home ?? '-' }}：{{ basketballData?.score.q4.away ?? '-' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NTooltip } from 'naive-ui';

defineProps<{
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
