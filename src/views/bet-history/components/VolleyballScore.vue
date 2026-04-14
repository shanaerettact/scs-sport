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
          {{ $t('volleyball.set1') }}
        </n-tooltip>
        {{ volleyballData?.setsScore.set1.home ?? '-' }}：{{ volleyballData?.setsScore.set1.away ?? '-' }}
      </div>
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              2
            </span>
          </template>
          {{ $t('volleyball.set2') }}
        </n-tooltip>
        {{ volleyballData?.setsScore.set2.home ?? '-' }}：{{ volleyballData?.setsScore.set2.away ?? '-' }}
      </div>
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              3
            </span>
          </template>
          {{ $t('volleyball.set3') }}
        </n-tooltip>
        {{ volleyballData?.setsScore.set3.home ?? '-' }}：{{ volleyballData?.setsScore.set3.away ?? '-' }}
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
          {{ $t('volleyball.set4') }}
        </n-tooltip>
        {{ volleyballData?.setsScore.set4.home ?? '-' }}：{{ volleyballData?.setsScore.set4.away ?? '-' }}
      </div>
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              5
            </span>
          </template>
          {{ $t('volleyball.set5') }}
        </n-tooltip>
        {{ volleyballData?.setsScore.set5.home ?? '-' }}：{{ volleyballData?.setsScore.set5.away ?? '-' }}
      </div>
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              6
            </span>
          </template>
          {{ $t('volleyball.set6') }}
        </n-tooltip>
        {{ volleyballData?.setsScore.set6.home ?? '-' }}：{{ volleyballData?.setsScore.set6.away ?? '-' }}
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
          {{ $t('volleyball.set7') }}
        </n-tooltip>
        {{ volleyballData?.setsScore.set7.home ?? '-' }}：{{ volleyballData?.setsScore.set7.away ?? '-' }}
      </div>
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              G
            </span>
          </template>
          {{ $t('volleyball.golden') }}
        </n-tooltip>
        {{ volleyballData?.setsScore.golden.home ?? '-' }}：{{ volleyballData?.setsScore.golden.away ?? '-' }}
      </div>
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span>
              T
            </span>
          </template>
          {{ $t('volleyball.totalSets') }}
        </n-tooltip>
        {{ volleyballData?.setsScore.total.home ?? '-' }}：{{ volleyballData?.setsScore.total.away ?? '-' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NTooltip } from 'naive-ui';

defineProps<{
  volleyballData?: {
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
      golden: { home: number | null, away: number | null; },
    };
  },
}>();
</script>
