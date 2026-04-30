<template>
  <div class="grid grid-cols-4 gap-y-2 min-w-xs">
    <div class="flex flex-col gap-1">
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              1
            </span>
          </template>
          {{ $t('baseball.inning1') }}
        </n-tooltip>
        {{ baseballData ?? '-' }}：{{ baseballData?.score.inning1.away ?? '-' }}
      </div>
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              2
            </span>
          </template>
          {{ $t('baseball.inning2') }}
        </n-tooltip>
        {{ baseballData?.score.inning2.home ?? '-' }}：{{ baseballData?.score.inning2.away ?? '-' }}
      </div>
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              3
            </span>
          </template>
          {{ $t('baseball.inning3') }}
        </n-tooltip>
        {{ baseballData?.score.inning3.home ?? '-' }}：{{ baseballData?.score.inning3.away ?? '-' }}
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
          {{ $t('baseball.inning4') }}
        </n-tooltip>
        {{ baseballData?.score.inning4.home ?? '-' }}：{{ baseballData?.score.inning4.away ?? '-' }}
      </div>
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              5
            </span>
          </template>
          {{ $t('baseball.inning5') }}
        </n-tooltip>
        {{ baseballData?.score.inning5.home ?? '-' }}：{{ baseballData?.score.inning5.away ?? '-' }}
      </div>
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              6
            </span>
          </template>
          {{ $t('baseball.inning6') }}
        </n-tooltip>
        {{ baseballData?.score.inning6.home ?? '-' }}：{{ baseballData?.score.inning6.away ?? '-' }}
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
          {{ $t('baseball.inning7') }}
        </n-tooltip>
        {{ baseballData?.score.inning7.home ?? '-' }}：{{ baseballData?.score.inning7.away ?? '-' }}
      </div>
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              8
            </span>
          </template>
          {{ $t('baseball.inning8') }}
        </n-tooltip>
        {{ baseballData?.score.inning8.home ?? '-' }}：{{ baseballData?.score.inning8.away ?? '-' }}
      </div>
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">
              9
            </span>
          </template>
          {{ $t('baseball.inning9') }}
        </n-tooltip>
        {{ baseballData?.score.inning9.home ?? '-' }}：{{ baseballData?.score.inning9.away ?? '-' }}
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span>
              F5
            </span>
          </template>
          {{ $t('baseball.firstFive') }}
        </n-tooltip>
        {{ baseballData?.score.firstFive.home ?? '-' }}：{{ baseballData?.score.firstFive.away ?? '-' }}
      </div>
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span>
              FT
            </span>
          </template>
          {{ $t('baseball.full') }}
        </n-tooltip>
        {{ baseballData?.score.full.home ?? '-' }}：{{ baseballData?.score.full.away ?? '-' }}
      </div>
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <span>
              H
            </span>
          </template>
          {{ $t('baseball.hits') }}
        </n-tooltip>
        {{ baseballData?.hits.home ?? '-' }}：{{ baseballData?.hits.away ?? '-' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NTooltip } from 'naive-ui';

defineProps<{
  baseballData?: {
    hits: { home: number | null, away: number | null; },
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
