<template>
  <template v-if="resultType == 'th'">
    <th class="!text-center" style="--n-th-padding: 0" v-for="i in 7">
      <n-tooltip trigger="hover">
        <template #trigger>
          <span>{{ $t(`volleyball.set${i}`) }}</span>
        </template>
        {{ $t(`volleyball.set${i}`) }}
      </n-tooltip>
    </th>
    <th class="!text-center" style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          {{ $t('volleyball.golden') }}
        </template>
        {{ $t('volleyball.golden') }}
      </n-tooltip>
    </th>
    <th class="!text-center" style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          {{ $t('volleyball.totalGames') }}
        </template>
        {{ $t('volleyball.totalGames') }}
      </n-tooltip>
    </th>
    <th class="!text-center" style="--n-th-padding: 0">
      <n-tooltip trigger="hover">
        <template #trigger>
          {{ $t('volleyball.totalSets') }}
        </template>
        {{ $t('volleyball.totalSets') }}
      </n-tooltip>
    </th>
  </template>

  <template v-if="resultType == 'td'">
    <td>
      <div class="text-center">{{ volleyballData?.setsScore.set1.home ?? '-' }}</div>
      <div class="text-center">{{ volleyballData?.setsScore.set1.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ volleyballData?.setsScore.set2.home ?? '-' }}</div>
      <div class="text-center">{{ volleyballData?.setsScore.set2.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ volleyballData?.setsScore.set3.home ?? '-' }}</div>
      <div class="text-center">{{ volleyballData?.setsScore.set3.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ volleyballData?.setsScore.set4.home ?? '-' }}</div>
      <div class="text-center">{{ volleyballData?.setsScore.set4.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ volleyballData?.setsScore.set5.home ?? '-' }}</div>
      <div class="text-center">{{ volleyballData?.setsScore.set5.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ volleyballData?.setsScore.set6.home ?? '-' }}</div>
      <div class="text-center">{{ volleyballData?.setsScore.set6.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ volleyballData?.setsScore.set7.home ?? '-' }}</div>
      <div class="text-center">{{ volleyballData?.setsScore.set7.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ volleyballData?.setsScore.golden.home ?? '-' }}</div>
      <div class="text-center">{{ volleyballData?.setsScore.golden.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ volleyballData?.setsScore.total.home ?? '-' }}</div>
      <div class="text-center">{{ volleyballData?.setsScore.total.away ?? '-' }}</div>
    </td>
    <td>
      <div class="text-center">{{ volleyballData?.gamesScore.home ?? '-' }}</div>
      <div class="text-center">{{ volleyballData?.gamesScore.away ?? '-' }}</div>
    </td>
  </template>
</template>

<script setup lang="ts">
import { NTooltip } from 'naive-ui';

defineProps<{
  resultType: string;
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

<style lang="scss" scoped></style>