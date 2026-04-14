<template>
  <div class="grid grid-cols-3 gap-y-2 min-w-xs">
    <div class="flex flex-col gap-1">
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              1
            </span>
          </template>
          {{ $t('tableTennis.set1') }}
        </n-tooltip>
        {{ tabletennisData?.setsScore.set1.home ?? '-' }}：{{ tabletennisData?.setsScore.set1.away ?? '-' }}
      </div>
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              2
            </span>
          </template>
          {{ $t('tableTennis.set2') }}
        </n-tooltip>
        {{ tabletennisData?.setsScore.set2.home ?? '-' }}：{{ tabletennisData?.setsScore.set2.away ?? '-' }}
      </div>
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              3
            </span>
          </template>
          {{ $t('tableTennis.set3') }}
        </n-tooltip>
        {{ tabletennisData?.setsScore.set3.home ?? '-' }}：{{ tabletennisData?.setsScore.set3.away ?? '-' }}
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
          {{ $t('tableTennis.set4') }}
        </n-tooltip>
        {{ tabletennisData?.setsScore.set4.home ?? '-' }}：{{ tabletennisData?.setsScore.set4.away ?? '-' }}
      </div>
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              5
            </span>
          </template>
          {{ $t('tableTennis.set5') }}
        </n-tooltip>
        {{ tabletennisData?.setsScore.set5.home ?? '-' }}：{{ tabletennisData?.setsScore.set5.away ?? '-' }}
      </div>
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              6
            </span>
          </template>
          {{ $t('tableTennis.set6') }}
        </n-tooltip>
        {{ tabletennisData?.setsScore.set6.home ?? '-' }}：{{ tabletennisData?.setsScore.set6.away ?? '-' }}
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              7
            </span>
          </template>
          {{ $t('tableTennis.set7') }}
        </n-tooltip>
        {{ tabletennisData?.setsScore.set7.home ?? '-' }}：{{ tabletennisData?.setsScore.set7.away ?? '-' }}
      </div>
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span>
              T
            </span>
          </template>
          {{ $t('tableTennis.totalSets') }}
        </n-tooltip>
        {{ tabletennisData?.setsScore.total.home ?? '-' }}：{{ tabletennisData?.setsScore.total.away ?? '-' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NTooltip } from 'naive-ui';

defineProps<{
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
