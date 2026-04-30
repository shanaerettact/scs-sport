<template>
  <template v-if="respSportOutcomeRecommend.datas.length <= 0">
    <div class="flex min-h-36">
      <n-empty size="large" class="m-auto"></n-empty>
    </div>
  </template>
  <template v-else>
    <n-scrollbar>
      <div class="space-y-2">
        <template v-for="item in respSportOutcomeRecommend.datas">
          <div class="bg-surface border border-zinc-700 rounded-lg space-y-4 mb-2 px-2 py-3">
            <div class="grid grid-cols-3 gap-3">
              <div class="flex flex-col items-center gap-2">
                <img :src="item.homeTeamLogo" alt="" class="w-4 h-4 object-fit" onerror="this.src='/images/sports/homeTeam.png'" />
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <div class="w-24 truncate text-center text-xs">{{ item.homeTeamName }}</div>
                  </template>
                  {{ item.homeTeamName }}
                </n-tooltip>
              </div>
              <div class="text-center text-xs">
                <div>{{ item.leagueName }}</div>
                <div>{{ dayjs(item.matchTime).format('YYYY-MM-DD') }}</div>
                <div>{{ dayjs(item.matchTime).format('HH:mm') }}</div>
              </div>
              <div class="flex flex-col items-center gap-2">
                <img :src="item.awayTeamLogo" alt="" class="w-4 h-4 object-fit" onerror="this.src='/images/sports/awayTeam.png'" />
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <div class="w-24 truncate text-center text-xs">{{ item.awayTeamName }}</div>
                  </template>
                  {{ item.awayTeamName }}
                </n-tooltip>
              </div>
            </div>
            <div v-html="item.desc" class="bg-gray-100 dark:bg-gray-500/30 text-xs rounded-md p-2 recommend-desc"></div>
            <div class="">
              <div class="text-subtle">{{ item.marketName }}</div>
              <div class="flex justify-between rounded-md p-2 cursor-pointer bg-outcome side-outcome" @click="betStore.setBetsList(item.leagueId, item, item, item)">
                <span class="text-subtle truncate">{{ item.outcomeShowName }}</span>
                <div>
                  <span>{{ item.odds }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </n-scrollbar>
  </template>
</template>

<script setup lang="ts">
import { NEmpty, NIcon, NScrollbar, NTooltip } from 'naive-ui';
import { onMounted, reactive, ref, watch } from 'vue';
import { useUserStore } from '@/store/module/user';
import { useBetStore } from '@/store/module/bet';
import { useLangStore } from '@/store/module/lang';
import { useMatchStore } from '@/store/module/match';
import { apiSrv, errorHandling } from '@/service';
import dayjs from "dayjs";
import { ReqSportOutcomeRecommend, RespSportOutcomeRecommend } from '@/model/sport';

const langStore = useLangStore();
const userStore = useUserStore();
const betStore = useBetStore();
const matchStore = useMatchStore();

const reqSportOutcomeRecommend = reactive(new ReqSportOutcomeRecommend);
const respSportOutcomeRecommend = ref(new RespSportOutcomeRecommend);
const getSportOutcomeRecommend = () => {
  userStore.loadingCount++;

  let matchIds = [];
  for (const d of matchStore.respSportH5MatchList.datas) {
    if (matchIds.length >= 50) break;
    matchIds.push(d.matchId);
  }

  reqSportOutcomeRecommend.productId = userStore.productId;
  reqSportOutcomeRecommend.matchIds = matchIds;
  reqSportOutcomeRecommend.lang = langStore.current;
  reqSportOutcomeRecommend.oddsType = Number(userStore.oddsType);
  reqSportOutcomeRecommend.sportType = Number(userStore.sportType);

  apiSrv.post("/sport/outcome/recommend", reqSportOutcomeRecommend)
    .then((response) => {
      respSportOutcomeRecommend.value = response.data;
    })
    .catch((error) => {
      errorHandling(error);
    })
    .finally(() => userStore.loadingCount--);
};

onMounted(() => {
  getSportOutcomeRecommend();
});
</script>

<style lang="scss" scoped>
.recommend-desc {
  :deep(> span) {
    color: #f00;
  }
}
</style>