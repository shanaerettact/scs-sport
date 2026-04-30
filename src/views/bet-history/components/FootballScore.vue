<template>
  <div class="grid grid-cols-4 gap-y-2 min-w-xs">
    <div class="flex flex-col gap-1">
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <img class="w-6" src="/images/football-icon/1H-dark.png"></img>
          </template>
          {{ $t('label.firstHalf') }}{{ $t('label.score') }}
        </n-tooltip>
        {{ footballData?.score.firstHalf.home ?? '-' }}：{{ footballData?.score.firstHalf.away ?? '-' }}
      </div>

      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <img class="w-6" src="/images/football-icon/2H-dark.png"></img>
          </template>
          {{ $t('label.secondHalf') }}{{ $t('label.score') }}
        </n-tooltip>
        {{ footballData?.score.secondHalf.home ?? '-' }}：{{ footballData?.score.secondHalf.away ?? '-' }}
      </div>

      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <img class="w-6" src="/images/football-icon/FT-dark.png"></img>
          </template>
          {{ $t('label.full') }}{{ $t('label.score') }}
        </n-tooltip>
        {{ footballData?.score.full.home ?? '-' }}：{{ footballData?.score.full.away ?? '-' }}
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <img class="w-6" src="/images/football-icon/first-half-corner.png"></img>
          </template>
          {{ $t('label.firstHalf') }}{{ $t('label.corner') }}
        </n-tooltip>
        {{ footballData?.corner.firstHalf.home ?? '-' }}：{{ footballData?.corner.firstHalf.away ?? '-' }}
      </div>

      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <img class="w-6" src="/images/football-icon/second-half-corner.png"></img>
          </template>
          {{ $t('label.secondHalf') }}{{ $t('label.corner') }}
        </n-tooltip>
        {{ footballData?.corner.secondHalf.home ?? '-' }}：{{ footballData?.corner.secondHalf.away ?? '-' }}
      </div>

      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <img class="w-6" src="/images/football-icon/full-corner.png"></img>
          </template>
          {{ $t('label.full') }}{{ $t('label.corner') }}
        </n-tooltip>
        {{ footballData?.corner.full.home ?? '-' }}：{{ footballData?.corner.full.away ?? '-' }}
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <img class="w-6" src="/images/football-icon/first-half-yellow.png"></img>
          </template>
          {{ $t('label.firstHalf') }}{{ $t('label.yellowCard') }}
        </n-tooltip>
        {{ footballData?.yellowCard.firstHalf.home ?? '-' }}：{{ footballData?.yellowCard.firstHalf.away ?? '-' }}
      </div>

      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <img class="w-6" src="/images/football-icon/second-half-yellow.png"></img>
          </template>
          {{ $t('label.secondHalf') }}{{ $t('label.yellowCard') }}
        </n-tooltip>
        {{ footballData?.yellowCard.secondHalf.home ?? '-' }}：{{ footballData?.yellowCard.secondHalf.away ?? '-' }}
      </div>

      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <img class="w-6" src="/images/football-icon/full-yellow.png"></img>
          </template>
          {{ $t('label.full') }}{{ $t('label.yellowCard') }}
        </n-tooltip>
        {{ footballData?.yellowCard.full.home ?? '-' }}：{{ footballData?.yellowCard.full.away ?? '-' }}
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <img class="w-6" src="/images/football-icon/first-half-red.png"></img>
          </template>
          {{ $t('label.firstHalf') }}{{ $t('label.redCard') }}
        </n-tooltip>
        {{ footballData?.redCard.firstHalf.home ?? '-' }}：{{ footballData?.redCard.firstHalf.away ?? '-' }}
      </div>

      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <img class="w-6" src="/images/football-icon/second-half-red.png"></img>
          </template>
          {{ $t('label.secondHalf') }}{{ $t('label.redCard') }}
        </n-tooltip>
        {{ footballData?.redCard.secondHalf.home ?? '-' }}：{{ footballData?.redCard.secondHalf.away ?? '-' }}
      </div>

      <div class="flex items-center justify-center gap-1">
        <n-tooltip trigger="hover">
          <template #trigger>
            <img class="w-6" src="/images/football-icon/full-red.png"></img>
          </template>
          {{ $t('label.full') }}{{ $t('label.redCard') }}
        </n-tooltip>
        {{ footballData?.redCard.full.home ?? '-' }}：{{ footballData?.redCard.full.away ?? '-' }}
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { NTooltip } from 'naive-ui';

defineProps<{
  footballData?: {
    score: {
      firstHalf: { home: number | null, away: number | null; },
      secondHalf: { home: number | null, away: number | null; },
      full: { home: number | null, away: number | null; };
    },
    yellowCard: {
      firstHalf: { home: number | null, away: number | null; },
      secondHalf: { home: number | null, away: number | null; },
      full: { home: number | null, away: number | null; };
    },
    redCard: {
      firstHalf: { home: number | null, away: number | null; },
      secondHalf: { home: number | null, away: number | null; },
      full: { home: number | null, away: number | null; };
    },
    corner: {
      firstHalf: { home: number | null, away: number | null; },
      secondHalf: { home: number | null, away: number | null; },
      full: { home: number | null, away: number | null; };
    },
  },
}>();
</script>
