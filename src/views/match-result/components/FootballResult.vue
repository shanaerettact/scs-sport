<template>
  <template v-if="resultType == 'th'">
    <th style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          <img class="m-auto" src="/images/football-icon/first-half-score.png"></img>
        </template>
        {{ $t('label.firstHalf') }}{{ $t('label.score') }}
      </n-tooltip>
    </th>
    <th style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          <img class="m-auto" src="/images/football-icon/second-half-score.png"></img>
        </template>
        {{ $t('label.secondHalf') }}{{ $t('label.score') }}
      </n-tooltip>
    </th>
    <th style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          <img class="m-auto" src="/images/football-icon/full-score.png"></img>
        </template>
        {{ $t('label.full') }}{{ $t('label.score') }}
      </n-tooltip>
    </th>
    <th style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          <img class="m-auto" src="/images/football-icon/first-half-yellow.png"></img>
        </template>
        {{ $t('label.firstHalf') }}{{ $t('label.yellowCard') }}
      </n-tooltip>
    </th>
    <th style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          <img class="m-auto" src="/images/football-icon/second-half-yellow.png"></img>
        </template>
        {{ $t('label.secondHalf') }}{{ $t('label.yellowCard') }}
      </n-tooltip>
    </th>
    <th style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          <img class="m-auto" src="/images/football-icon/full-yellow.png"></img>
        </template>
        {{ $t('label.full') }}{{ $t('label.yellowCard') }}
      </n-tooltip>
    </th>
    <th style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          <img class="m-auto" src="/images/football-icon/first-half-red.png"></img>
        </template>
        {{ $t('label.firstHalf') }}{{ $t('label.redCard') }}
      </n-tooltip>
    </th>
    <th style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          <img class="m-auto" src="/images/football-icon/second-half-red.png"></img>
        </template>
        {{ $t('label.secondHalf') }}{{ $t('label.redCard') }}
      </n-tooltip>
    </th>
    <th style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          <img class="m-auto" src="/images/football-icon/full-red.png"></img>
        </template>
        {{ $t('label.full') }}{{ $t('label.redCard') }}
      </n-tooltip>
    </th>
    <th style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          <img class="m-auto" src="/images/football-icon/first-half-corner.png"></img>
        </template>
        {{ $t('label.firstHalf') }}{{ $t('label.corner') }}
      </n-tooltip>
    </th>
    <th style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          <img class="m-auto" src="/images/football-icon/second-half-corner.png"></img>
        </template>
        {{ $t('label.secondHalf') }}{{ $t('label.corner') }}
      </n-tooltip>
    </th>
    <th style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          <img class="m-auto" src="/images/football-icon/full-corner.png"></img>
        </template>
        {{ $t('label.full') }}{{ $t('label.corner') }}
      </n-tooltip>
    </th>
  </template>

  <template v-if="resultType == 'td'">
    <td>
      <div class="text-center">{{ footballData?.score.firstHalf.home ?? '-' }}</div>
      <div class="text-center">{{ footballData?.score.firstHalf.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ footballData?.score.secondHalf.home ?? '-' }}</div>
      <div class="text-center">{{ footballData?.score.secondHalf.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ footballData?.score.full.home ?? '-' }}</div>
      <div class="text-center">{{ footballData?.score.full.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ footballData?.yellowCard.firstHalf.home ?? '-' }}</div>
      <div class="text-center">{{ footballData?.yellowCard.firstHalf.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ footballData?.yellowCard.secondHalf.home ?? '-' }}</div>
      <div class="text-center">{{ footballData?.yellowCard.secondHalf.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ footballData?.yellowCard.full.home ?? '-' }}</div>
      <div class="text-center">{{ footballData?.yellowCard.full.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ footballData?.redCard.firstHalf.home ?? '-' }}</div>
      <div class="text-center">{{ footballData?.redCard.firstHalf.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ footballData?.redCard.secondHalf.home ?? '-' }}</div>
      <div class="text-center">{{ footballData?.redCard.secondHalf.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ footballData?.redCard.full.home ?? '-' }}</div>
      <div class="text-center">{{ footballData?.redCard.full.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ footballData?.corner.firstHalf.home ?? '-' }}</div>
      <div class="text-center">{{ footballData?.corner.firstHalf.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ footballData?.corner.secondHalf.home ?? '-' }}</div>
      <div class="text-center">{{ footballData?.corner.secondHalf.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ footballData?.corner.full.home ?? '-' }}</div>
      <div class="text-center">{{ footballData?.corner.full.away ?? '-' }}</div>
    </td>
  </template>
</template>

<script setup lang="ts">
import { NTooltip } from 'naive-ui';

defineProps<{
  resultType: string;
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

<style lang="scss" scoped></style>