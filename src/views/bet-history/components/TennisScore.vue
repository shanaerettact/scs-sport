<template>
  <div class="grid grid-cols-2 gap-y-2 min-w-xs">
    <div class="flex flex-col gap-1">
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              1
            </span>
          </template>
          {{ $t('tennis.set1') }}
        </n-tooltip>
        {{ tennisData?.setsScore.set1.home ?? '-' }}：{{ tennisData?.setsScore.set1.away ?? '-' }}
      </div>
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              2
            </span>
          </template>
          {{ $t('tennis.set2') }}
        </n-tooltip>
        {{ tennisData?.setsScore.set2.home ?? '-' }}：{{ tennisData?.setsScore.set2.away ?? '-' }}
      </div>
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              3
            </span>
          </template>
          {{ $t('tennis.set3') }}
        </n-tooltip>
        {{ tennisData?.setsScore.set3.home ?? '-' }}：{{ tennisData?.setsScore.set3.away ?? '-' }}
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              4
            </span>
          </template>
          {{ $t('tennis.set4') }}
        </n-tooltip>
        {{ tennisData?.setsScore.set4.home ?? '-' }}：{{ tennisData?.setsScore.set4.away ?? '-' }}
      </div>
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              5
            </span>
          </template>
          {{ $t('tennis.set5') }}
        </n-tooltip>
        {{ tennisData?.setsScore.set5.home ?? '-' }}：{{ tennisData?.setsScore.set5.away ?? '-' }}
      </div>
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span>
              T
            </span>
          </template>
          {{ $t('tennis.totalSets') }}
        </n-tooltip>
        {{ tennisData?.setsScore.total.home ?? '-' }}：{{ tennisData?.setsScore.total.away ?? '-' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NTooltip } from 'naive-ui';

defineProps<{
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
