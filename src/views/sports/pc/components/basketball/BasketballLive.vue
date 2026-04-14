<template>
  <div class="bg-surface border border-zinc-700 rounded-lg space-y-4 mb-2 px-2 py-3">
    <div class="grid grid-cols-[1fr_repeat(5,_minmax(0,30px))] items-center">
      <div>{{ $t('label.team') }}</div>
      <template v-for="i in 4">
        <div class="text-center">
          <span class="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full border border-gray-400">{{ i }}</span>
        </div>
      </template>
      <div class="text-center">OT</div>
    </div>
    <div class="grid grid-cols-[1fr_repeat(5,_minmax(0,30px))]">
      <div class="flex items-center gap-2">
        <img :src="respBasketballLive.homeTeamLogo" alt="" height="25" width="25" onerror="this.src='/images/sports/homeTeam.png'" />
        <span>{{ respBasketballLive.homeTeamName }}</span>
      </div>
      <div class="text-center">{{ respBasketballLive.liveScore.home.q1 }}</div>
      <div class="text-center">{{ respBasketballLive.liveScore.home.q2 }}</div>
      <div class="text-center">{{ respBasketballLive.liveScore.home.q3 }}</div>
      <div class="text-center">{{ respBasketballLive.liveScore.home.q4 }}</div>
      <div class="text-center">{{ respBasketballLive.liveScore.home.ot }}</div>
    </div>
    <div class="grid grid-cols-[1fr_repeat(5,_minmax(0,30px))]">
      <div class="flex items-center gap-2">
        <img :src="respBasketballLive.awayTeamLogo" alt="" height="25" width="25" onerror="this.src='/images/sports/awayTeam.png'" />
        <span>{{ respBasketballLive.awayTeamName }}</span>
      </div>
      <div class="text-center">{{ respBasketballLive.liveScore.away.q1 }}</div>
      <div class="text-center">{{ respBasketballLive.liveScore.away.q2 }}</div>
      <div class="text-center">{{ respBasketballLive.liveScore.away.q3 }}</div>
      <div class="text-center">{{ respBasketballLive.liveScore.away.q4 }}</div>
      <div class="text-center">{{ respBasketballLive.liveScore.away.ot }}</div>
    </div>
  </div>
  <div class="bg-surface border border-zinc-700 rounded-lg space-y-4 mb-2 px-2 py-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <img :src="respBasketballLive.homeTeamLogo" alt="" height="25" width="25" onerror="this.src='/images/sports/homeTeam.png'" />
        <span>{{ respBasketballLive.homeTeamName }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span>{{ respBasketballLive.awayTeamName }}</span>
        <img :src="respBasketballLive.awayTeamLogo" alt="" height="25" width="25" onerror="this.src='/images/sports/awayTeam.png'" />
      </div>
    </div>
    <div class="grid grid-cols-[120px_1fr_120px] gap-2">
      <div class="flex flex-col items-center justify-between text-center">
        <div>
          <div>{{ $t('basketball.foulsInPeriod') }}</div>
          <div>{{ respBasketballLive.stats.foulsInPeriod.home ?? '-' }}</div>
        </div>
        <div>
          <div>{{ $t('basketball.timeoutsRemainingInPeriod') }}</div>
          <div>{{ respBasketballLive.stats.timeoutsRemainingInPeriod.home ?? '-' }}</div>
        </div>
        <div>
          <div>{{ $t('basketball.totalTimeouts') }}</div>
          <div>{{ respBasketballLive.stats.totalTimeouts.home ?? '-' }}</div>
        </div>
      </div>
      <div class="flex flex-col items-center justify-between text-center">
        <div class="w-full">
          <div>{{ $t('basketball.threePointGoals') }}</div>
          <div class="grid grid-cols-[2rem_1fr_2rem] items-center gap-2">
            <div class="text-right">{{ respBasketballLive.stats.threePointGoals.home ?? '-' }}</div>
            <n-progress type="line" status="warning" :height="5" :percentage="handleProgressPercentage(respBasketballLive.stats.threePointGoals.home, respBasketballLive.stats.threePointGoals.away)" :show-indicator="false" />
            <div class="text-left">{{ respBasketballLive.stats.threePointGoals.away ?? '-' }}</div>
          </div>
        </div>
        <div class="w-full">
          <div>{{ $t('basketball.twoPointGoals') }}</div>
          <div class="grid grid-cols-[2rem_1fr_2rem] items-center gap-2">
            <div class="text-right">{{ respBasketballLive.stats.twoPointGoals.home ?? '-' }}</div>
            <n-progress type="line" status="warning" :height="5" :percentage="handleProgressPercentage(respBasketballLive.stats.twoPointGoals.home, respBasketballLive.stats.twoPointGoals.away)" :show-indicator="false" />
            <div class="text-left">{{ respBasketballLive.stats.twoPointGoals.away ?? '-' }}</div>
          </div>
        </div>
        <div class="w-full">
          <div>{{ $t('basketball.freeThrowGoals') }}</div>
          <div class="grid grid-cols-[2rem_1fr_2rem] items-center gap-2">
            <div class="text-right">{{ respBasketballLive.stats.freeThrowGoals.home ?? '-' }}</div>
            <n-progress type="line" status="warning" :height="5" :percentage="handleProgressPercentage(respBasketballLive.stats.freeThrowGoals.home, respBasketballLive.stats.freeThrowGoals.away)" :show-indicator="false" />
            <div class="text-left">{{ respBasketballLive.stats.freeThrowGoals.away ?? '-' }}</div>
          </div>
        </div>
        <div class="w-full">
          <div>{{ $t('basketball.freeThrowPercentage') }}</div>
          <div class="grid grid-cols-[2rem_1fr_2rem] items-center gap-2">
            <div class="text-right">{{ respBasketballLive.stats.freeThrowPercentage.home ?? '-' }}</div>
            <n-progress type="line" status="warning" :height="5" :percentage="handleProgressPercentage(respBasketballLive.stats.freeThrowPercentage.home, respBasketballLive.stats.freeThrowPercentage.away)" :show-indicator="false" />
            <div class="text-left">{{ respBasketballLive.stats.freeThrowPercentage.away ?? '-' }}</div>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center justify-between text-center">
        <div>
          <div>{{ $t('basketball.foulsInPeriod') }}</div>
          <div>{{ respBasketballLive.stats.foulsInPeriod.away ?? '-' }}</div>
        </div>
        <div>
          <div>{{ $t('basketball.timeoutsRemainingInPeriod') }}</div>
          <div>{{ respBasketballLive.stats.timeoutsRemainingInPeriod.away ?? '-' }}</div>
        </div>
        <div>
          <div>{{ $t('basketball.totalTimeouts') }}</div>
          <div>{{ respBasketballLive.stats.totalTimeouts.away ?? '-' }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-surface border border-zinc-700 rounded-lg space-y-4 mb-2 px-2 py-3">
    <n-tabs type="line" justify-content="space-evenly" @update:value="handleTextLive">
      <n-tab name="1">{{ $t('basketball.q1') }}</n-tab>
      <n-tab name="2">{{ $t('basketball.q2') }}</n-tab>
      <n-tab name="3">{{ $t('basketball.q3') }}</n-tab>
      <n-tab name="4">{{ $t('basketball.q4') }}</n-tab>
    </n-tabs>
    <div class="space-y-2">
      <template v-if="textLiveList.length == 0">
        <div class="flex min-h-36">
          <n-empty size="large" class="m-auto"></n-empty>
        </div>
      </template>
      <template v-for="item in textLiveList">
        <div class="flex items-center text-sm gap-1">
          <span>{{ $t(`basketball.q${item.period}`) }}</span>
          <span>{{ item.remainingTime }}</span>
          <span class="ml-auto">{{ item.score }}</span>
        </div>
        <div class="flex items-center justify-between rounded-md bg-gray-100 dark:bg-gray-500/30 px-3 py-2">
          <span>{{ item.description }}</span>
          <img v-if="item.position == 1" :src="respBasketballLive.homeTeamLogo" alt="" height="25" width="25" onerror="this.src='/images/sports/homeTeam.png'" />
          <img v-if="item.position == 2" :src="respBasketballLive.awayTeamLogo" alt="" height="25" width="25" onerror="this.src='/images/sports/awayTeam.png'" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { apiSrv, errorHandling } from '@/service';
import { useLangStore } from '@/store/module/lang';
import { useMatchStore } from '@/store/module/match';
import { useUserStore } from '@/store/module/user';
import { NEmpty, NProgress, NTab, NTable, NTabPane, NTabs } from 'naive-ui';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import dayjs from 'dayjs';
import { ReqBasketballLive, RespBasketballLive } from '@/model/basketball';

const userStore = useUserStore();
const matchStore = useMatchStore();
const langStore = useLangStore();

const textLiveList = ref(new Array());

const handleProgressPercentage = (home: any, away: any) => {
  if (!home || !away) return 0;
  return Math.round(home / (home + away) * 100);
};

const handleTextLive = (value: any) => {
  textLiveList.value = [];
  if (respBasketballLive.value.tlive.length > 0) {
    textLiveList.value = respBasketballLive.value.tlive.filter(d => d.period == value).reverse();
  }
};

const reqBasketballLive = reactive(new ReqBasketballLive());
const respBasketballLive = ref(new RespBasketballLive());
const getBasketballLive = () => {
  userStore.loadingCount++;

  reqBasketballLive.productId = userStore.productId;
  reqBasketballLive.matchId = matchStore.matchId; // 3602351
  reqBasketballLive.lang = langStore.current;

  apiSrv.post("/basketball/live", reqBasketballLive)
    .then((response) => {
      respBasketballLive.value = response.data;
      handleTextLive(1);
    })
    .catch((error) => {
      errorHandling(error);
    })
    .finally(() => userStore.loadingCount--);
};

watch(() => matchStore.matchId, () => {
  getBasketballLive();
});

onMounted(() => {
  if (matchStore.matchId) {
    getBasketballLive();
  }
});
</script>

<style lang="scss" scoped></style>