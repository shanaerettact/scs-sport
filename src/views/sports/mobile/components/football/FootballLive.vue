<template>
  <div class="bg-surface border border-zinc-700 rounded-lg space-y-4 mb-2 px-2 py-3">
    <div class="grid grid-cols-3 gap-2">
      <div class="flex flex-col items-center">
        <div class="text-center">{{ $t('football.attack') }}</div>
        <div class="flex items-center gap-2">
          <div>{{ respFootballLive.stats.attack.home ?? 0 }}</div>
          <n-progress type="circle" :show-indicator="false" :stroke-width="30" :color="themeVars.errorColor" :rail-color="themeVars.infoColor" :percentage="handleCircleProgress(respFootballLive.stats.attack.home, respFootballLive.stats.attack.away)" class="!w-7" />
          <div>{{ respFootballLive.stats.attack.away ?? 0 }}</div>
        </div>
      </div>
      <div class="flex flex-col items-center">
        <div class="text-center">{{ $t('football.dangerousAttack') }}</div>
        <div class="flex items-center gap-2">
          <div>{{ respFootballLive.stats.dangerousAttack.home ?? 0 }}</div>
          <n-progress type="circle" :show-indicator="false" :stroke-width="30" :color="themeVars.errorColor" :rail-color="themeVars.infoColor" :percentage="handleCircleProgress(respFootballLive.stats.dangerousAttack.home, respFootballLive.stats.dangerousAttack.away)" class="!w-7" />
          <div>{{ respFootballLive.stats.dangerousAttack.away ?? 0 }}</div>
        </div>
      </div>
      <div class="flex flex-col items-center">
        <div class="text-center">{{ $t('football.possession') }}</div>
        <div class="flex items-center gap-2">
          <div>{{ respFootballLive.stats.possession.home ?? 0 }}</div>
          <n-progress type="circle" :show-indicator="false" :stroke-width="30" :color="themeVars.errorColor" :rail-color="themeVars.infoColor" :percentage="handleCircleProgress(respFootballLive.stats.possession.home, respFootballLive.stats.possession.away)" class="!w-7" />
          <div>{{ respFootballLive.stats.possession.away ?? 0 }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-surface border border-zinc-700 rounded-lg space-y-4 mb-2 px-2 py-3">
    <div class="text-xl">{{ $t('label.textLive') }}</div>
    <template v-if="respFootballLive.tlive.length == 0">
      <div class="flex min-h-36">
        <n-empty size="large" class="m-auto"></n-empty>
      </div>
    </template>
    <template v-for="item in respFootballLive.tlive">
      <div class="flex items-center justify-between rounded-md bg-gray-100 dark:bg-gray-500/30 px-3 py-2">
        <span>{{ item.data }}</span>
        <img v-if="item.position == 1" :src="respFootballLive.homeTeamLogo" alt="" height="25" width="25" onerror="this.src='/images/sports/homeTeam.png'" />
        <img v-if="item.position == 2" :src="respFootballLive.awayTeamLogo" alt="" height="25" width="25" onerror="this.src='/images/sports/awayTeam.png'" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ReqFootballLive, RespFootballLive } from '@/model/baseball';
import { apiSrv, errorHandling } from '@/service';
import { useLangStore } from '@/store/module/lang';
import { useMatchStore } from '@/store/module/match';
import { useUserStore } from '@/store/module/user';
import { NEmpty, NProgress } from 'naive-ui';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useThemeVars } from 'naive-ui';

const themeVars = useThemeVars();

const userStore = useUserStore();
const matchStore = useMatchStore();
const langStore = useLangStore();

const handleCircleProgress = (home: any, away: any) => {
  if (!home) return 0;
  if (!away) return 100;
  return Math.round(home / (home + away) * 100);
};

const reqFootballLive = reactive(new ReqFootballLive());
const respFootballLive = ref(new RespFootballLive());
const getFootballLive = () => {
  userStore.loadingCount++;

  reqFootballLive.productId = userStore.productId;
  reqFootballLive.matchId = matchStore.matchId;
  reqFootballLive.lang = langStore.current;

  apiSrv.post("/football/live", reqFootballLive)
    .then((response) => {
      respFootballLive.value = response.data;
    })
    .catch((error) => {
      errorHandling(error);
    })
    .finally(() => userStore.loadingCount--);
};

watch(() => matchStore.matchId, () => {
  getFootballLive();
});

onMounted(() => {
  if (matchStore.matchId) {
    getFootballLive();
  }
});
</script>

<style lang="scss" scoped></style>