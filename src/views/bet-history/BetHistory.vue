<template>
  <div class="p-4 space-y-4">
    <div class="font-bold text-2xl">{{ $t('label.betHistory') }}</div>
    <div class="flex flex-wrap items-center gap-2">
      <n-form-item :label="$t('label.betStatus')" :show-feedback="false">
        <n-select v-model:value="reqBetHistory.betStatus" :options="statusOptions" :consistent-menu-width="false" :render-label="(option: any) => $t(option.label)" />
      </n-form-item>
      <n-form-item :label="$t('label.date')" :show-feedback="false">
        <n-date-picker v-model:value="range" type="daterange" :shortcuts="shortcuts" />
      </n-form-item>
      <n-button class=" self-end" @click="searchBetHistory()">{{ $t('label.search') }}</n-button>
    </div>
    <n-scrollbar x-scrollable>
      <n-table :single-line="false">
        <thead>
          <tr>
            <th>{{ $t('label.product') }}</th>
            <th>{{ $t('label.betTime') }}/{{ $t('label.betId') }}</th>
            <th class="min-w-25">{{ $t('label.oddsType') }}</th>
            <th class="min-w-60">{{ $t('label.league') }}/{{ $t('label.match') }}</th>
            <th class="min-w-30">{{ $t('label.outcome') }}/{{ $t('label.odds') }}</th>
            <th class="min-w-30">{{ $t('label.matchResult') }}</th>
            <th>{{ $t('label.bet') }}</th>
            <th>{{ $t('label.payout') }}</th>
            <th>{{ $t('label.winLose') }}</th>
            <th>{{ $t('label.betResult') }}</th>
            <th class="min-w-30">{{ $t('label.settlementTime') }}</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in respBetHistory.datas">
            <template v-if="item.isCombo">
              <template v-for="(detail, index) in item.details">
                <tr>
                  <td v-if="index == 0" :rowspan="item.details.length">{{ item.productId }}</td>
                  <td v-if="index == 0" :rowspan="item.details.length">
                    {{ dayjs(item.betTime).format('YYYY-MM-DD HH:mm:ss') }}
                    <br>
                    <n-button text @click="copyBetId(item.betId)">
                      <template #icon>
                        <n-icon v-html="CopyIcon" size="18"></n-icon>
                      </template>
                      <span class="w-30 truncate">{{ item.betId }}</span>
                    </n-button>
                  </td>
                  <td v-if="index == 0" :rowspan="item.details.length">
                    {{ $t('label.parlay') }} <span class="text-xs">{{ item.details.length }}X1</span>
                    <br>
                    {{ $t(`odds_type.${item.oddsType}`) }}
                  </td>
                  <td>
                    <div class="inline-flex items-center gap-1">
                      <img :src="getSportIcon(item.sportType)" class="w-4">
                      {{ detail.leagueName }}
                    </div>
                    <br>
                    {{ detail.matchName }}
                  </td>
                  <td>
                    {{ detail.marketName }}
                    <br>
                    {{ detail.outcomeName }} <span class="text-primary">@ {{ item.odds }}</span>
                  </td>
                  <td style="border-right-width: 1px;">
                    <component :is="getResultScoreComponent(item.sportType, detail).component" v-bind="getResultScoreComponent(item.sportType, detail).props" />
                  </td>
                  <td v-if="index == 0" :rowspan="item.details.length">{{ item.bet }}</td>
                  <td v-if="index == 0" :rowspan="item.details.length">{{ item.win ?? '-' }}</td>
                  <td v-if="index == 0" :rowspan="item.details.length">
                    <span :class="{ 'text-red-500': item.winLose < 0 }">{{ item.winLose ?? '-' }}</span>
                  </td>
                  <td v-if="index == 0" :rowspan="item.details.length">
                    <span :class="{ 'text-red-500': item.betResult == 3 || item.betResult == 4 }">{{ $t(`bet_result.${item.betResult}`) }}</span>
                  </td>
                  <td v-if="index == 0" :rowspan="item.details.length">{{ item.settlementTime ? dayjs(item.settlementTime).format('YYYY-MM-DD HH:mm:ss') : '' }}</td>
                </tr>
              </template>
            </template>
            <template v-else>
              <tr>
                <td>{{ item.productId }}</td>
                <td>
                  {{ dayjs(item.betTime).format('YYYY-MM-DD HH:mm:ss') }}
                  <br>
                  <n-button text @click="copyBetId(item.betId)">
                    <template #icon>
                      <n-icon v-html="CopyIcon" size="18"></n-icon>
                    </template>
                    <span class="w-30 truncate">{{ item.betId }}</span>
                  </n-button>
                </td>
                <td>
                  {{ $t('label.single') }}
                  <br>
                  {{ $t(`odds_type.${item.oddsType}`) }}
                </td>
                <template v-for="detail in item.details">
                  <td>
                    <div class="inline-flex items-center gap-1">
                      <img :src="getSportIcon(item.sportType)" class="w-4">
                      {{ detail.leagueName }}
                    </div>
                    <br>
                    {{ detail.matchName }}
                  </td>
                  <td>
                    {{ detail.marketName }}
                    <br>
                    {{ detail.outcomeName }} <span class="text-primary">@ {{ item.odds }}</span>
                  </td>
                  <td>
                    <component :is="getResultScoreComponent(item.sportType, detail).component" v-bind="getResultScoreComponent(item.sportType, detail).props" />
                  </td>
                </template>
                <td>{{ item.bet }}</td>
                <td>{{ item.win ?? '-' }}</td>
                <td>
                  <span :class="{ 'text-red-500': item.winLose < 0 }">{{ item.winLose ?? '-' }}</span>
                </td>
                <td>
                  <span :class="{ 'text-red-500': item.betResult == 3 || item.betResult == 4 }">{{ $t(`bet_result.${item.betResult}`) }}</span>
                </td>
                <td>{{ item.settlementTime ? dayjs(item.settlementTime).format('YYYY-MM-DD HH:mm:ss') : '' }}</td>
              </tr>
            </template>
          </template>
        </tbody>
      </n-table>
    </n-scrollbar>

    <n-pagination v-model:page="reqBetHistory.pageIndex" v-model:page-size="reqBetHistory.pageSize" :item-count="respBetHistory.total" show-size-picker :page-sizes="[10, 20, 30, 40]" @update:page="handleUpdatePage" @update:page-size="handleUpdatePageSize" class="justify-center" />

  </div>

</template>

<script setup lang="ts">
import { ReqBetHistory, RespBetHistory } from '@/model/player';
import { apiSrv, errorHandling, getDateRange } from '@/service';
import { useUserStore } from '@/store/module/user';
import { NButton, NDatePicker, NFormItem, NIcon, NPagination, NScrollbar, NSelect, NTable, useMessage } from 'naive-ui';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useLangStore } from '@/store/module/lang';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';
import CopyIcon from '@/assets/tabler/Copy.svg?raw';
import FootballScore from './components/FootballScore.vue';
import BasketballScore from './components/BasketballScore.vue';
import TennisScore from './components/TennisScore.vue';
import VolleyballScore from './components/VolleyballScore.vue';
import TableTennisScore from './components/TableTennisScore.vue';
import BaseballScore from './components/BaseballScore.vue';

const statusOptions = [
  { label: 'label.all', value: -1 },
  { label: 'bet_status.0', value: 0 },
  { label: 'bet_status.1', value: 1 },
  { label: 'bet_status.2', value: 2 },
];
const range = ref(getDateRange('last7Days'));
const shortcuts = computed(() => {
  return {
    [t('label.today')]: () => getDateRange('today'),
    [t('label.yesterday')]: () => getDateRange('yesterday'),
    [t('label.currentMonth')]: () => getDateRange('currentMonth'),
  };
});

const { t } = useI18n();
const message = useMessage();
const userStore = useUserStore();
const langStore = useLangStore();

const reqBetHistory = reactive(new ReqBetHistory());
const respBetHistory = ref(new RespBetHistory());
const getBetHistory = () => {
  userStore.loadingCount++;

  reqBetHistory.playerSessionKey = userStore.getToken();
  reqBetHistory.lang = langStore.current;
  [reqBetHistory.startTime, reqBetHistory.endTime] = range.value;
  apiSrv.post("/player/bethistory", reqBetHistory)
    .then((response) => {
      respBetHistory.value = response.data;
    })
    .catch((error) => {
      errorHandling(error);
    })
    .finally(() => userStore.loadingCount--);
};

const searchBetHistory = () => {
  reqBetHistory.pageIndex = 1;
  getBetHistory();
};

const handleUpdatePage = (page: number) => {
  reqBetHistory.pageIndex = page;
  getBetHistory();
};

const handleUpdatePageSize = (pageSize: number) => {
  reqBetHistory.pageIndex = 1;
  reqBetHistory.pageSize = pageSize;
  getBetHistory();
};

const copyBetId = (betId: string) => {
  navigator.clipboard.writeText(betId);
  message.success(t('label.copied'));
};

const getSportIcon = (sportType: number) => {
  switch (sportType) {
    case 1:
      return '/images/sports/soccer.png';
    case 2:
      return '/images/sports/basketball.png';
    case 3:
      return '/images/sports/tennis.png';
    case 4:
      return '/images/sports/volleyball.png';
    case 5:
      return '/images/sports/table-tennis.png';
    case 6:
      return '/images/sports/baseball.png';
  }
};

const getResultScoreComponent = (sportType: number, detail: any) => {
  switch (sportType) {
    // 足球
    case 1:
      return {
        component: FootballScore,
        props: { footballData: detail.footballData }
      };
    // 籃球
    case 2:
      return {
        component: BasketballScore,
        props: { basketballData: detail.basketballData }
      };
    // 網球
    case 3:
      return {
        component: TennisScore,
        props: { tennisData: detail.tennisData }
      };
    // 排球
    case 4:
      return {
        component: VolleyballScore,
        props: { volleyballData: detail.volleyballData }
      };
    // 乒乓球
    case 5:
      return {
        component: TableTennisScore,
        props: { tabletennisData: detail.tabletennisData }
      };
    // 棒球
    case 6:
      return {
        component: BaseballScore,
        props: { baseballData: detail.baseballData }
      };
    default:
      return {
        component: null,
        props: {}
      };
  }
};

onMounted(() => {
  if (userStore.isLogin) {
    searchBetHistory();
  }
});

watch(() => langStore.current, (newVal) => {
  if (newVal) {
    searchBetHistory();
  }
});
</script>

<style lang="scss" scoped></style>