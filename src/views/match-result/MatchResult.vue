<template>
  <div class="p-4 space-y-4">
    <div class="font-bold text-2xl">{{ $t('label.matchResult') }}</div>
    <div class="flex flex-wrap items-center gap-2">
      <n-form-item :label="$t('label.product')" :show-feedback="false">
        <n-select v-model:value="productVal" :options="productOptions" :consistent-menu-width="false" style="width: 120px;" />
      </n-form-item>
      <n-form-item :label="$t('label.sportType')" :show-feedback="false">
        <n-select v-model:value="sportType" :options="sportOptions" :consistent-menu-width="false" :render-label="(option: any) => $t(option.label)" />
      </n-form-item>
      <n-form-item :label="$t('label.dateSort')" :show-feedback="false">
        <n-select v-model:value="sort" :options="sortOptions" :consistent-menu-width="false" :render-label="(option: any) => $t(option.label)" />
      </n-form-item>
      <n-form-item :label="$t('label.date')" :show-feedback="false">
        <n-date-picker v-model:value="range" type="datetimerange" :shortcuts="shortcuts" class="max-w-" />
      </n-form-item>
      <n-form-item :label="$t('label.league')" :show-feedback="false">
        <n-input v-model:value="reqMatchesResults.leagueName" />
      </n-form-item>
      <n-form-item :label="$t('label.team')" :show-feedback="false">
        <n-input v-model:value="reqMatchesResults.teamName" />
      </n-form-item>
      <n-button class=" self-end" @click="searchMatchesResults()">{{ $t('label.search') }}</n-button>
    </div>
    <n-scrollbar x-scrollable>
      <n-table :single-line="false" size="small" class="min-w-7xl">
        <thead>
          <tr>
            <th>{{ $t('label.date') }}</th>
            <th>{{ $t('label.league') }}</th>
            <th>{{ $t('label.match') }}</th>
            <th class="!text-center">{{ $t('label.status') }}</th>
            <component :is="resultHeader.component" v-bind="resultHeader.props" />
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in respMatchesResults.datas">
            <td class="w-48">{{ dayjs(item.matchTime).format('YYYY-MM-DD HH:mm:ss') }}</td>
            <td class="w-60">
              <div class="flex items-center gap-2">
                <img :src="item.leagueLogo" alt="" height="28" width="28" onerror="this.src='/images/sports/league.png'" />
                <span>{{ item.leagueName }}</span>
              </div>
            </td>
            <td class="w-60">
              <div class="flex items-center gap-2">
                <img :src="item.homeTeamLogo" alt="" height="28" width="28" onerror="this.src='/images/sports/homeTeam.png'" />
                <span>{{ item.homeTeamName }}</span>
              </div>
              <div class="flex items-center gap-2">
                <img :src="item.awayTeamLogo" alt="" height="28" width="28" onerror="this.src='/images/sports/awayTeam.png'" />
                <span>{{ item.awayTeamName }}</span>
              </div>
            </td>
            <td class="text-center">
              {{ $t(`match_status.${item.status}`) }}
            </td>
            <component :is="resultRow(item).component" v-bind="resultRow(item).props" />
          </tr>
        </tbody>
      </n-table>
    </n-scrollbar>

    <n-pagination v-model:page="reqMatchesResults.pageIndex" v-model:page-size="reqMatchesResults.pageSize" :item-count="respMatchesResults.total" show-size-picker :page-sizes="[10, 20, 30, 40]" @update:page="handleUpdatePage" @update:page-size="handleUpdatePageSize" class="justify-center" />
  </div>
</template>

<script setup lang="ts">
import { apiSrv, errorHandling, getDateRange } from '@/service';
import { useUserStore } from '@/store/module/user';
import { NButton, NDatePicker, NFormItem, NIcon, NInput, NModal, NPagination, NScrollbar, NSelect, NTable, NTooltip } from 'naive-ui';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useLangStore } from '@/store/module/lang';
import { ReqSportMatchesResults, RespSportMatchesResults } from '@/model/sport';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';
import { ReqMenuProduct, RespMenuProduct } from '@/model/menu';
import FootballResult from './components/FootballResult.vue';
import BasketballResult from './components/BasketballResult.vue';
import TennisResult from './components/TennisResult.vue';
import VolleyballResult from './components/VolleyballResult.vue';
import TableTennisResult from './components/TableTennisResult.vue';
import BaseballResult from './components/BaseballResult.vue';

const { t } = useI18n();
const userStore = useUserStore();
const langStore = useLangStore();

const productOptions = ref(new Array<{ label: string, value: string; }>());
const productVal = ref('');
const sportType = ref(1);
const sportOptions = [
  { label: 'sport_type.1', value: 1 },
  { label: 'sport_type.2', value: 2 },
  { label: 'sport_type.3', value: 3 },
  { label: 'sport_type.4', value: 4 },
  { label: 'sport_type.5', value: 5 },
  { label: 'sport_type.6', value: 6 },
  { label: 'sport_type.7', value: 7 },
];
const sort = ref(2);
const sortOptions = [
  { label: 'date_sort.1', value: 1 },
  { label: 'date_sort.2', value: 2 },
];

const range = ref(getDateRange('yesterday'));
const shortcuts = computed(() => {
  return {
    [t('label.today')]: () => getDateRange('today'),
    [t('label.yesterday')]: () => getDateRange('yesterday'),
    [t('label.currentMonth')]: () => getDateRange('currentMonth'),
  };
});

const resultHeader = computed(() => getResultComponent(reqMatchesResults.sportType, null, 'th'));
const resultRow = (item: any) => getResultComponent(reqMatchesResults.sportType, item, 'td');

const getResultComponent = (sportType: number, item: any, resultType: string) => {
  const isRow = resultType == 'td';
  switch (sportType) {
    // 足球
    case 1:
      return {
        component: FootballResult,
        props: { resultType, footballData: isRow ? item.footballData : null }
      };
    // 籃球
    case 2:
      return {
        component: BasketballResult,
        props: { resultType, basketballData: isRow ? item.basketballData : null }
      };
    // 網球
    case 3:
      return {
        component: TennisResult,
        props: { resultType, tennisData: isRow ? item.tennisData : null }
      };
    // 排球
    case 4:
      return {
        component: VolleyballResult,
        props: { resultType, volleyballData: isRow ? item.volleyballData : null }
      };
    // 乒乓球
    case 5:
      return {
        component: TableTennisResult,
        props: { resultType, tabletennisData: isRow ? item.tabletennisData : null }
      };
    // 棒球
    case 6:
      return {
        component: BaseballResult,
        props: { resultType, baseballData: isRow ? item.baseballData : null }
      };
    default:
      return {
        component: null,
        props: {
          resultType
        }
      };
  }
};

const reqMenuProduct = reactive(new ReqMenuProduct());
const respMenuProduct = ref(new RespMenuProduct());
const getMenuProduct = () => {
  userStore.loadingCount++;

  apiSrv.post("/menu/product", reqMenuProduct)
    .then((response) => {
      respMenuProduct.value = response.data;
      productOptions.value = respMenuProduct.value.datas.map(d => ({
        label: d.productName,
        value: d.productId
      }));
      productVal.value = productOptions.value[0].value;
      searchMatchesResults();
    })
    .catch((error) => {
      errorHandling(error);
    })
    .finally(() => userStore.loadingCount--);
};

const reqMatchesResults = reactive(new ReqSportMatchesResults());
const respMatchesResults = ref(new RespSportMatchesResults());
const getMatchesResults = () => {
  userStore.loadingCount++;

  reqMatchesResults.lang = langStore.current;
  [reqMatchesResults.startTime, reqMatchesResults.endTime] = [range.value[0], range.value[1]];
  apiSrv.post("/sport/match/results", reqMatchesResults)
    .then((response) => {
      respMatchesResults.value = response.data;
    })
    .catch((error) => {
      errorHandling(error);
    })
    .finally(() => userStore.loadingCount--);
};


const searchMatchesResults = () => {
  reqMatchesResults.pageIndex = 1;
  reqMatchesResults.productId = productVal.value;
  reqMatchesResults.sportType = sportType.value;
  reqMatchesResults.sort = sort.value;
  getMatchesResults();
};

const handleUpdatePage = (page: number) => {
  reqMatchesResults.pageIndex = page;
  getMatchesResults();
};

const handleUpdatePageSize = (pageSize: number) => {
  reqMatchesResults.pageIndex = 1;
  reqMatchesResults.pageSize = pageSize;
  getMatchesResults();
};

onMounted(() => {
  getMenuProduct();
});

watch(() => langStore.current, (newVal) => {
  if (newVal) {
    searchMatchesResults();
  }
});
</script>

<style lang="scss" scoped></style>