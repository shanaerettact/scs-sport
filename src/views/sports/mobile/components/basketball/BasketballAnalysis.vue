<template>
  <div class="space-y-2 mb-2 p-1">
    <div class="text-xl">{{ $t('label.historyVS') }}</div>
    <div class="grid grid-cols-2">
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1">
          <span>{{ $t('label.winRate') }}</span>
          <span class="text-lg text-red-500">
            <template v-if="respBasketballAnalysis.history.vsStats.totalMatches > 0">
              {{ Math.round(respBasketballAnalysis.history.vsStats.win / respBasketballAnalysis.history.vsStats.totalMatches * 100) }}%
            </template>
            <template v-else>0%</template>
          </span>
        </div>
        <div class="flex">
          <div>
            <span>{{ respBasketballAnalysis.history.vsStats.win }}</span>
            <span>{{ $t('label.win') }}</span>
          </div>
          <div>
            <span>{{ respBasketballAnalysis.history.vsStats.draw }}</span>
            <span>{{ $t('label.draw') }}</span>
          </div>
          <div>
            <span>{{ respBasketballAnalysis.history.vsStats.lose }}</span>
            <span>{{ $t('label.lose') }}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1">
          <span>{{ $t('label.oddRate') }}</span>
          <span class="text-lg text-red-500">
            <template v-if="respBasketballAnalysis.history.vsStats.totalMatches > 0">
              {{ Math.round(respBasketballAnalysis.history.vsStats.odd / respBasketballAnalysis.history.vsStats.totalMatches * 100) }}%
            </template>
            <template v-else>0%</template>
          </span>
        </div>
        <div class="flex">
          <div>
            <span>{{ respBasketballAnalysis.history.vsStats.odd }}</span>
            <span>{{ $t('label.odd') }}</span>
          </div>
          <div>
            <span>{{ respBasketballAnalysis.history.vsStats.even }}</span>
            <span>{{ $t('label.even') }}</span>
          </div>
        </div>
      </div>
    </div>
    <n-table :single-line="true" size="small">
      <thead>
        <tr>
          <th>{{ $t('label.date') }}</th>
          <th>{{ $t('label.home') }}</th>
          <th>{{ $t('label.score') }}</th>
          <th>{{ $t('label.away') }}</th>
          <th>{{ $t('label.winLose') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in respBasketballAnalysis.history.vs">
          <template v-if="index <= 9">
            <td>{{ dayjs(item.matchTime).format('YY/MM/DD') }}</td>
            <td>{{ item.homeTeamName }}</td>
            <td>{{ item.score.home }}:{{ item.score.away }}</td>
            <td>{{ item.awayTeamName }}</td>
            <td>{{ $t(`basketball_result.${item.result}`) }}</td>
          </template>
        </tr>
      </tbody>
    </n-table>
    <div class="flex items-center justify-between gap-2">
      <div class="flex items-center gap-2">
        <img :src="respBasketballAnalysis.homeTeamLogo" alt="" height="50" width="50" onerror="this.src='/images/sports/homeTeam.png'" />
      </div>
      <div class="flex-1">
        <div class="flex justify-between">
          <span>{{ respBasketballAnalysis.history.vsStats.win }}{{ $t('label.win') }}</span>
          <span>{{ respBasketballAnalysis.history.vsStats.lose }}{{ $t('label.win') }}</span>
        </div>
        <div>
          <n-progress type="line" status="warning" :height="3" :percentage="Math.round(respBasketballAnalysis.history.vsStats.win / respBasketballAnalysis.history.vsStats.totalMatches * 100)" :show-indicator="false" />
        </div>
        <div class="flex justify-between">
          <span>{{ $t('label.averageScore', { score: averageHomeScore }) }}</span>
          <span>{{ $t('label.totalMatchesDesc', { count: respBasketballAnalysis.history.vsStats.totalMatches }) }}</span>
          <span>{{ $t('label.averageScore', { score: averageAwayScore }) }}</span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <img :src="respBasketballAnalysis.awayTeamLogo" alt="" height="50" width="50" onerror="this.src='/images/sports/awayTeam.png'" />
      </div>
    </div>
  </div>
  <div class="space-y-2 mb-2 p-1">
    <div class="text-xl">{{ $t('label.recentVS') }}</div>
    <div class="flex items-center gap-2">
      <img :src="respBasketballAnalysis.homeTeamLogo" alt="" height="30" width="30" onerror="this.src='/images/sports/homeTeam.png'" />
      <div>{{ respBasketballAnalysis.homeTeamName }}</div>
    </div>
    <div class="grid grid-cols-2">
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1">
          <span>{{ $t('label.winRate') }}</span>
          <span class="text-lg text-red-500">
            <template v-if="respBasketballAnalysis.history.homeStats.totalMatches > 0">
              {{ Math.round(respBasketballAnalysis.history.homeStats.win / respBasketballAnalysis.history.homeStats.totalMatches * 100) }}%
            </template>
            <template v-else>0%</template>
          </span>
        </div>
        <div class="flex">
          <div>
            <span>{{ respBasketballAnalysis.history.homeStats.win }}</span>
            <span>{{ $t('label.win') }}</span>
          </div>
          <div>
            <span>{{ respBasketballAnalysis.history.homeStats.draw }}</span>
            <span>{{ $t('label.draw') }}</span>
          </div>
          <div>
            <span>{{ respBasketballAnalysis.history.homeStats.lose }}</span>
            <span>{{ $t('label.lose') }}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1">
          <span>{{ $t('label.oddRate') }}</span>
          <span class="text-lg text-red-500">
            <template v-if="respBasketballAnalysis.history.homeStats.totalMatches > 0">
              {{ Math.round(respBasketballAnalysis.history.homeStats.odd / respBasketballAnalysis.history.homeStats.totalMatches * 100) }}%
            </template>
            <template v-else>0%</template>
          </span>
        </div>
        <div class="flex">
          <div>
            <span>{{ respBasketballAnalysis.history.homeStats.odd }}</span>
            <span>{{ $t('label.odd') }}</span>
          </div>
          <div>
            <span>{{ respBasketballAnalysis.history.homeStats.even }}</span>
            <span>{{ $t('label.even') }}</span>
          </div>
        </div>
      </div>
    </div>
    <n-table :single-line="true" size="small">
      <thead>
        <tr>
          <th>{{ $t('label.date') }}</th>
          <th>{{ $t('label.home') }}</th>
          <th>{{ $t('label.score') }}</th>
          <th>{{ $t('label.away') }}</th>
          <th>{{ $t('label.winLose') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in respBasketballAnalysis.history.home">
          <template v-if="index <= 9">
            <td>{{ dayjs(item.matchTime).format('YY/MM/DD') }}</td>
            <td>{{ item.homeTeamName }}</td>
            <td>{{ item.score.home }}:{{ item.score.away }}</td>
            <td>{{ item.awayTeamName }}</td>
            <td>{{ $t(`basketball_result.${item.result}`) }}</td>
          </template>
        </tr>
      </tbody>
    </n-table>
    <div class="flex items-center gap-2">
      <img :src="respBasketballAnalysis.awayTeamLogo" alt="" height="30" width="30" onerror="this.src='/images/sports/awayTeam.png'" />
      <div>{{ respBasketballAnalysis.awayTeamName }}</div>
    </div>
    <div class="grid grid-cols-2">
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1">
          <span>{{ $t('label.winRate') }}</span>
          <span class="text-lg text-red-500">
            <template v-if="respBasketballAnalysis.history.awayStats.totalMatches > 0">
              {{ Math.round(respBasketballAnalysis.history.awayStats.win / respBasketballAnalysis.history.awayStats.totalMatches * 100) }}%
            </template>
            <template v-else>0%</template>
          </span>
        </div>
        <div class="flex">
          <div>
            <span>{{ respBasketballAnalysis.history.awayStats.win }}</span>
            <span>{{ $t('label.win') }}</span>
          </div>
          <div>
            <span>{{ respBasketballAnalysis.history.awayStats.draw }}</span>
            <span>{{ $t('label.draw') }}</span>
          </div>
          <div>
            <span>{{ respBasketballAnalysis.history.awayStats.lose }}</span>
            <span>{{ $t('label.lose') }}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1">
          <span>{{ $t('label.oddRate') }}</span>
          <span class="text-lg text-red-500">
            <template v-if="respBasketballAnalysis.history.awayStats.totalMatches > 0">
              {{ Math.round(respBasketballAnalysis.history.awayStats.odd / respBasketballAnalysis.history.awayStats.totalMatches * 100) }}%
            </template>
            <template v-else>0%</template>
          </span>
        </div>
        <div class="flex">
          <div>
            <span>{{ respBasketballAnalysis.history.awayStats.odd }}</span>
            <span>{{ $t('label.odd') }}</span>
          </div>
          <div>
            <span>{{ respBasketballAnalysis.history.awayStats.even }}</span>
            <span>{{ $t('label.even') }}</span>
          </div>
        </div>
      </div>
    </div>
    <n-table :single-line="true" size="small">
      <thead>
        <tr>
          <th>{{ $t('label.date') }}</th>
          <th>{{ $t('label.home') }}</th>
          <th>{{ $t('label.score') }}</th>
          <th>{{ $t('label.away') }}</th>
          <th>{{ $t('label.winLose') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in respBasketballAnalysis.history.away">
          <template v-if="index <= 9">
            <td>{{ dayjs(item.matchTime).format('YY/MM/DD') }}</td>
            <td>{{ item.homeTeamName }}</td>
            <td>{{ item.score.home }}:{{ item.score.away }}</td>
            <td>{{ item.awayTeamName }}</td>
            <td>{{ $t(`basketball_result.${item.result}`) }}</td>
          </template>
        </tr>
      </tbody>
    </n-table>
  </div>
</template>

<script setup lang="ts">
import { ReqBasketballAnalysis, RespBasketballAnalysis } from '@/model/basketball';
import { apiSrv, errorHandling } from '@/service';
import { useLangStore } from '@/store/module/lang';
import { useMatchStore } from '@/store/module/match';
import { useUserStore } from '@/store/module/user';
import { NProgress, NTable } from 'naive-ui';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import dayjs from 'dayjs';

const userStore = useUserStore();
const matchStore = useMatchStore();
const langStore = useLangStore();

const averageHomeScore = computed(() => {
  const score = respBasketballAnalysis.value.history.vs.map(d => d.score.home);
  const total = score.reduce((sum, val) => sum! + val!, 0) ?? 0;
  const average = Math.round(total / respBasketballAnalysis.value.history.vsStats.totalMatches * 10) / 10;
  return isNaN(average) ? 0 : average;
});

const averageAwayScore = computed(() => {
  const score = respBasketballAnalysis.value.history.vs.map(d => d.score.away);
  const total = score.reduce((sum, val) => sum! + val!, 0) ?? 0;
  const average = Math.round(total / respBasketballAnalysis.value.history.vsStats.totalMatches * 10) / 10;
  return isNaN(average) ? 0 : average;
});


const reqBasketballAnalysis = reactive(new ReqBasketballAnalysis());
const respBasketballAnalysis = ref(new RespBasketballAnalysis());
const getBasketballAnalysis = () => {
  userStore.loadingCount++;

  reqBasketballAnalysis.productId = userStore.productId;
  reqBasketballAnalysis.matchId = matchStore.matchId;
  reqBasketballAnalysis.lang = langStore.current;

  apiSrv.post("/basketball/analysis", reqBasketballAnalysis)
    .then((response) => {
      respBasketballAnalysis.value = response.data;
    })
    .catch((error) => {
      errorHandling(error);
    })
    .finally(() => userStore.loadingCount--);
};

watch(() => matchStore.matchId, () => {
  getBasketballAnalysis();
});

onMounted(() => {
  if (matchStore.matchId) {
    getBasketballAnalysis();
  }
});
</script>

<style lang="scss" scoped></style>