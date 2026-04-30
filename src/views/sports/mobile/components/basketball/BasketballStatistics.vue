<template>
  <div class="bg-surface border border-zinc-700 rounded-lg space-y-4 mb-2 px-2 py-3">
    <n-tabs v-if="respBasketballStatistics.matchId != ''" type="line" justify-content="space-evenly" class="custom-tabs">
      <n-tab-pane :name="respBasketballStatistics.homeTeamId" :tab="() => h('div', { class: 'max-w-[120px] truncate' }, respBasketballStatistics.homeTeamName)">
        <template v-if="respBasketballStatistics.playerStats.home.length <= 0">
          <div class="flex min-h-36">
            <n-empty size="large" class="m-auto"></n-empty>
          </div>
        </template>
        <template v-else>
          <div class="overflow-x-auto">
            <n-table :bordered="false" size="small" class="min-w-max !overflow-visible">
              <thead>
                <tr>
                  <th class="min-w-32 sticky -left-px z-10">{{ $t('basketball.player') }}</th>
                  <th>{{ $t('basketball.points') }}</th>
                  <th>{{ $t('basketball.rebounds') }}</th>
                  <th>{{ $t('basketball.assists') }}</th>
                  <th>{{ $t('basketball.fieldGoals') }}</th>
                  <th>{{ $t('basketball.threePointers') }}</th>
                  <th>{{ $t('basketball.freeThrows') }}</th>
                  <th>{{ $t('basketball.offensiveRebounds') }}</th>
                  <th>{{ $t('basketball.defensiveRebounds') }}</th>
                  <th>{{ $t('basketball.steals') }}</th>
                  <th>{{ $t('basketball.blocks') }}</th>
                  <th>{{ $t('basketball.turnovers') }}</th>
                  <th>{{ $t('basketball.fouls') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in respBasketballStatistics.playerStats.home">
                  <td class="flex items-center sticky -left-px z-10">
                    <div class="inline-flex items-center justify-center relative">
                      <img src="/images/sports/homeTeam.png" class="w-7 h-7">
                      <span class="text-white text-[10px] absolute">{{ item.jerseyNo }}</span>
                    </div>
                    <span class="text-xs">{{ item.name }}</span>
                  </td>
                  <td>{{ item.points }}</td>
                  <td>{{ item.rebounds }}</td>
                  <td>{{ item.assists }}</td>
                  <td>{{ item.fieldGoals }}</td>
                  <td>{{ item.threePointers }}</td>
                  <td>{{ item.freeThrows }}</td>
                  <td>{{ item.offensiveRebounds }}</td>
                  <td>{{ item.defensiveRebounds }}</td>
                  <td>{{ item.steals }}</td>
                  <td>{{ item.blocks }}</td>
                  <td>{{ item.turnovers }}</td>
                  <td>{{ item.fouls }}</td>
                </tr>
              </tbody>
            </n-table>
          </div>
        </template>
      </n-tab-pane>
      <n-tab-pane :name="respBasketballStatistics.awayTeamId" :tab="() => h('div', { class: 'max-w-[120px] truncate' }, respBasketballStatistics.awayTeamName)">
        <template v-if="respBasketballStatistics.playerStats.away.length <= 0">
          <div class="flex min-h-36">
            <n-empty size="large" class="m-auto"></n-empty>
          </div>
        </template>
        <template v-else>
          <div class="overflow-x-auto">
            <n-table :bordered="false" size="small" class="min-w-max !overflow-visible">
              <thead>
                <tr>
                  <th class="min-w-32 sticky -left-px z-10">{{ $t('basketball.player') }}</th>
                  <th>{{ $t('basketball.points') }}</th>
                  <th>{{ $t('basketball.rebounds') }}</th>
                  <th>{{ $t('basketball.assists') }}</th>
                  <th>{{ $t('basketball.fieldGoals') }}</th>
                  <th>{{ $t('basketball.threePointers') }}</th>
                  <th>{{ $t('basketball.freeThrows') }}</th>
                  <th>{{ $t('basketball.offensiveRebounds') }}</th>
                  <th>{{ $t('basketball.defensiveRebounds') }}</th>
                  <th>{{ $t('basketball.steals') }}</th>
                  <th>{{ $t('basketball.blocks') }}</th>
                  <th>{{ $t('basketball.turnovers') }}</th>
                  <th>{{ $t('basketball.fouls') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in respBasketballStatistics.playerStats.away">
                  <td class="flex items-center sticky -left-px z-10">
                    <div class="inline-flex items-center justify-center relative">
                      <img src="/images/sports/awayTeam.png" class="w-7 h-7">
                      <span class="text-black text-[10px] absolute">{{ item.jerseyNo }}</span>
                    </div>
                    <span class="text-xs">{{ item.name }}</span>
                  </td>
                  <td>{{ item.points }}</td>
                  <td>{{ item.rebounds }}</td>
                  <td>{{ item.assists }}</td>
                  <td>{{ item.fieldGoals }}</td>
                  <td>{{ item.threePointers }}</td>
                  <td>{{ item.freeThrows }}</td>
                  <td>{{ item.offensiveRebounds }}</td>
                  <td>{{ item.defensiveRebounds }}</td>
                  <td>{{ item.steals }}</td>
                  <td>{{ item.blocks }}</td>
                  <td>{{ item.turnovers }}</td>
                  <td>{{ item.fouls }}</td>
                </tr>
              </tbody>
            </n-table>
          </div>
        </template>
      </n-tab-pane>
    </n-tabs>
  </div>

  <div class="bg-surface border border-zinc-700 rounded-lg space-y-4 mb-2 px-2 py-3">
    <div class="grid grid-cols-2">
      <div class="flex items-center gap-1">
        <img :src="respBasketballStatistics.homeTeamLogo" alt="" height="28" width="28" onerror="this.src='/images/sports/homeTeam.png'" />
        <span>{{ respBasketballStatistics.homeTeamName }}</span>
      </div>
      <div class="flex items-center justify-end gap-1">
        <span>{{ respBasketballStatistics.awayTeamName }}</span>
        <img :src="respBasketballStatistics.awayTeamLogo" alt="" height="28" width="28" onerror="this.src='/images/sports/awayTeam.png'" />
      </div>
    </div>

    <div class="px-2">
      <div class="flex items-center justify-between">
        <span>{{ respBasketballStatistics.teamStats.home.score }}</span>
        <span>{{ $t('basketball.points') }}</span>
        <span>{{ respBasketballStatistics.teamStats.away.score }}</span>
      </div>
      <div class="flex items-center gap-1">
        <n-progress type="line" status="error" :height="5" :percentage="handleHomeProgress(respBasketballStatistics.teamStats.home.score, respBasketballStatistics.teamStats.away.score)" :show-indicator="false" class="custom-progress" />
        <n-progress type="line" status="info" :height="5" :percentage="handleAwayProgress(respBasketballStatistics.teamStats.home.score, respBasketballStatistics.teamStats.away.score)" :show-indicator="false" />
      </div>
    </div>

    <div class="px-2">
      <div class="flex items-center justify-between">
        <span>{{ respBasketballStatistics.teamStats.home.rebounds }}</span>
        <span>{{ $t('basketball.rebounds') }}</span>
        <span>{{ respBasketballStatistics.teamStats.away.rebounds }}</span>
      </div>
      <div class="flex items-center gap-1">
        <n-progress type="line" status="error" :height="5" :percentage="handleHomeProgress(respBasketballStatistics.teamStats.home.rebounds, respBasketballStatistics.teamStats.away.rebounds)" :show-indicator="false" class="custom-progress" />
        <n-progress type="line" status="info" :height="5" :percentage="handleAwayProgress(respBasketballStatistics.teamStats.home.rebounds, respBasketballStatistics.teamStats.away.rebounds)" :show-indicator="false" />
      </div>
    </div>


    <div class="px-2">
      <div class="flex items-center justify-between">
        <span>{{ respBasketballStatistics.teamStats.home.assists }}</span>
        <span>{{ $t('basketball.assists') }}</span>
        <span>{{ respBasketballStatistics.teamStats.away.assists }}</span>
      </div>
      <div class="flex items-center gap-1">
        <n-progress type="line" status="error" :height="5" :percentage="handleHomeProgress(respBasketballStatistics.teamStats.home.assists, respBasketballStatistics.teamStats.away.assists)" :show-indicator="false" class="custom-progress" />
        <n-progress type="line" status="info" :height="5" :percentage="handleAwayProgress(respBasketballStatistics.teamStats.home.assists, respBasketballStatistics.teamStats.away.assists)" :show-indicator="false" />
      </div>
    </div>


    <div class="px-2">
      <div class="flex items-center justify-between">
        <span>{{ respBasketballStatistics.teamStats.home.steals }}</span>
        <span>{{ $t('basketball.steals') }}</span>
        <span>{{ respBasketballStatistics.teamStats.away.steals }}</span>
      </div>
      <div class="flex items-center gap-1">
        <n-progress type="line" status="error" :height="5" :percentage="handleHomeProgress(respBasketballStatistics.teamStats.home.steals, respBasketballStatistics.teamStats.away.steals)" :show-indicator="false" class="custom-progress" />
        <n-progress type="line" status="info" :height="5" :percentage="handleAwayProgress(respBasketballStatistics.teamStats.home.steals, respBasketballStatistics.teamStats.away.steals)" :show-indicator="false" />
      </div>
    </div>


    <div class="px-2">
      <div class="flex items-center justify-between">
        <span>{{ respBasketballStatistics.teamStats.home.blocks }}</span>
        <span>{{ $t('basketball.blocks') }}</span>
        <span>{{ respBasketballStatistics.teamStats.away.blocks }}</span>
      </div>
      <div class="flex items-center gap-1">
        <n-progress type="line" status="error" :height="5" :percentage="handleHomeProgress(respBasketballStatistics.teamStats.home.blocks, respBasketballStatistics.teamStats.away.blocks)" :show-indicator="false" class="custom-progress" />
        <n-progress type="line" status="info" :height="5" :percentage="handleAwayProgress(respBasketballStatistics.teamStats.home.blocks, respBasketballStatistics.teamStats.away.blocks)" :show-indicator="false" />
      </div>
    </div>


    <div class="px-2">
      <div class="flex items-center justify-between">
        <span>{{ respBasketballStatistics.teamStats.home.turnovers }}</span>
        <span>{{ $t('basketball.turnovers') }}</span>
        <span>{{ respBasketballStatistics.teamStats.away.turnovers }}</span>
      </div>
      <div class="flex items-center gap-1">
        <n-progress type="line" status="error" :height="5" :percentage="handleHomeProgress(respBasketballStatistics.teamStats.home.turnovers, respBasketballStatistics.teamStats.away.turnovers)" :show-indicator="false" class="custom-progress" />
        <n-progress type="line" status="info" :height="5" :percentage="handleAwayProgress(respBasketballStatistics.teamStats.home.turnovers, respBasketballStatistics.teamStats.away.turnovers)" :show-indicator="false" />
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import { apiSrv, errorHandling } from '@/service';
import { useLangStore } from '@/store/module/lang';
import { useMatchStore } from '@/store/module/match';
import { useUserStore } from '@/store/module/user';
import { NEmpty, NProgress, NScrollbar, NTable, NTabPane, NTabs } from 'naive-ui';
import { computed, h, onMounted, reactive, ref, watch } from 'vue';
import { ReqBasketballStatistics, RespBasketballStatistics } from '@/model/basketball';

const userStore = useUserStore();
const matchStore = useMatchStore();
const langStore = useLangStore();

const handleHomeProgress = (home: any, away: any) => {
  if (!home) return 0;
  return Math.round(home / (home + away) * 100);
};

const handleAwayProgress = (home: any, away: any) => {
  if (!away) return 0;
  return Math.round(away / (home + away) * 100);
};

const reqBasketballStatistics = reactive(new ReqBasketballStatistics());
const respBasketballStatistics = ref(new RespBasketballStatistics());
const getBasketballStatistics = () => {
  userStore.loadingCount++;

  reqBasketballStatistics.productId = userStore.productId;
  reqBasketballStatistics.matchId = matchStore.matchId; // 3602351
  reqBasketballStatistics.lang = langStore.current;

  apiSrv.post("/basketball/statistics", reqBasketballStatistics)
    .then((response) => {
      respBasketballStatistics.value = response.data;
    })
    .catch((error) => {
      errorHandling(error);
    })
    .finally(() => userStore.loadingCount--);
};

watch(() => matchStore.matchId, () => {
  getBasketballStatistics();
});

onMounted(() => {
  if (matchStore.matchId) {
    getBasketballStatistics();
  }
});
</script>

<style lang="scss" scoped>
.custom-progress {
  :deep(.n-progress-graph-line-fill) {
    margin-left: auto;
  }
}
</style>