<template>
  <div class="px-3 space-y-5 relative overflow-hidden" v-if="!matchStore.collapseSide">
    <!-- <div>
      <HotCarousel />
    </div> -->

    <div>
      <div class="flex gap-3 overflow-scroll">
        <template v-for="[key, item] in matchStore.filterMap">
          <div @click="timeFilter(key);" class="sport-filter-btn" :class="{ 'is-active': key === matchStore.filterType }">
            {{ $t(`matchTime_type.${item.matchTimeType}`) }}
            <template v-if="item.matchTimeType == 1">({{ matchStore.respSportMatchCount.inPlayCount }})</template>
            <template v-if="item.matchTimeType == 2">({{ matchStore.respSportMatchCount.todayCount }})</template>
            <template v-if="item.matchTimeType == 3">({{ matchStore.respSportMatchCount.earlyCount }})</template>
            <template v-if="item.matchTimeType == 4">({{ matchStore.respSportMatchCount.outrightsCount }})</template>
          </div>
        </template>
      </div>
      <div class="flex items-center gap-3 overflow-scroll py-2" v-if="matchStore.filterType == 'early'">
        <template v-for="item in matchStore.earlyFilterList">
          <div class="sport-filter-btn whitespace-nowrap" :class="{ 'is-active': item.start == matchStore.reqSportH5MatchList.startTime }" @click="earlyTimeFilter(item)">{{ item.date }}</div>
        </template>
      </div>
    </div>

    <template v-if="matchStore.respSportH5MatchList.datas.length > 0">
      <n-scrollbar ref="scrollbarRef" :style="{ height: matchStore.filterType != 'early' ? 'calc(100vh - 294px)' : 'calc(100vh - 350px)' }">
        <div class="mb-2" v-for="(item, index) in matchStore.respSportH5MatchList.datas" :key="item.matchId">
          <component :is="getSportComponent(userStore.sportType)" :match="item" :prevMatch="matchStore.prevSportH5MatchList" :matchIndex="index" :matchTimeType="matchStore.reqSportH5MatchList.matchTimeType" />
        </div>
      </n-scrollbar>
      <n-pagination v-model:page="matchStore.reqSportH5MatchList.pageIndex" v-model:page-size="matchStore.reqSportH5MatchList.pageSize" :item-count="matchStore.respSportH5MatchList.total" show-size-picker :page-sizes="[10, 20, 30, 40]" :page-slot="5" size="large" @update:page="handleUpdatePage" class="justify-center" />
    </template>


    <div @click="showRecommend = true" v-if="matchStore.filterType != 'roll'">
      <FloatingRecommendBtn />
    </div>
    <n-drawer v-model:show="showRecommend" width="100%" placement="right" :trap-focus="false" :block-scroll="false" content-class="bg-surface-soft">
      <n-drawer-content :title="$t('label.recommendMatch')" :native-scroll="true" closable>
        <OutcomeRecommend />
      </n-drawer-content>
    </n-drawer>
  </div>
  <div v-if="matchStore.collapseSide">
    <MatchSide />
  </div>
</template>

<script setup lang="ts">
import { NButton, NDrawer, NDrawerContent, NPagination, NScrollbar } from 'naive-ui';
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { useUserStore } from '@/store/module/user';
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import { useRoute } from 'vue-router';
import { useLangStore } from '@/store/module/lang';
import { useMatchStore } from '@/store/module/match';
import HotCarousel from './components/HotCarousel.vue';
import FootballMatch from './components/football/FootballMatch.vue';
import BasketballMatch from './components/basketball/BasketballMatch.vue';
import MatchSide from './components/MatchSide.vue';
import TennisMatch from './components/tennis/TennisMatch.vue';
import VolleyballMatch from './components/volleyball/VolleyballMatch.vue';
import TableTennisMatch from './components/tableTennis/TableTennisMatch.vue';
import BaseballMatch from './components/baseball/BaseballMatch.vue';
import OutcomeRecommend from './components/OutcomeRecommend.vue';
import FloatingRecommendBtn from './components/FloatingRecommendBtn.vue';

dayjs.extend(duration);

const route = useRoute();
const userStore = useUserStore();
const langStore = useLangStore();
const matchStore = useMatchStore();

const scrollbarRef = ref();
const intervalId = ref<ReturnType<typeof setInterval> | null>(null);
const showRecommend = ref(false);

const getSportComponent = (sportType: string) => {
  switch (Number(sportType)) {
    case 1:
      return FootballMatch;
    case 2:
      return BasketballMatch;
    case 3:
      return TennisMatch;
    case 4:
      return VolleyballMatch;
    case 5:
      return TableTennisMatch;
    case 6:
      return BaseballMatch;
  }
};

const timeFilter = (type: string) => {
  matchStore.filterType = type;
  matchStore.reqSportH5MatchList.matchTimeType = matchStore.filterMap.get(type)?.matchTimeType ?? 1;
  matchStore.reqSportH5MatchList.startTime = -1;
  matchStore.reqSportH5MatchList.endTime = -1;
  matchStore.reqSportH5MatchList.pageIndex = 1;
  matchStore.getSportH5MatchList();
  setupInterval();

  showRecommend.value = false;
};

const earlyTimeFilter = (item: any) => {
  matchStore.reqSportH5MatchList.startTime = item.start;
  matchStore.reqSportH5MatchList.endTime = item.end;
  matchStore.reqSportH5MatchList.pageIndex = 1;
  matchStore.getSportH5MatchList();
};

const setupInterval = () => {
  if (intervalId.value) clearInterval(intervalId.value);
  if (matchStore.filterType === 'champion') return;

  const time = matchStore.filterType === 'roll' ? 10000 : matchStore.filterType === 'today' ? 60000 : 300000;

  intervalId.value = setInterval(matchStore.getSportH5MatchList, time);
};

const handleUpdatePage = (page: number) => {
  scrollbarRef.value?.scrollTo({ top: 0 });
  matchStore.reqSportH5MatchList.pageIndex = page;
  matchStore.getSportH5MatchList();
};

const handleUpdatePageSize = (pageSize: number) => {
  matchStore.reqSportH5MatchList.pageIndex = 1;
  matchStore.reqSportH5MatchList.pageSize = pageSize;
  matchStore.getSportH5MatchList();
};

onMounted(() => {
  matchStore.filterType = 'roll';
  matchStore.reqSportH5MatchList.productId = userStore.productId;
  matchStore.reqSportH5MatchList.sportType = matchStore.sportTypeMap.get(route.params.sport as string)?.type ?? 1;
  matchStore.reqSportH5MatchList.matchTimeType = 1;
  matchStore.reqSportH5MatchList.oddsType = Number(userStore.oddsType);
  matchStore.getSportH5MatchList();
  setupInterval();

  matchStore.reqSportMatchCount.productId = userStore.productId;
  matchStore.reqSportMatchCount.sportType = matchStore.sportTypeMap.get(route.params.sport as string)?.type ?? 1;
  matchStore.getSportMatchCount();

  matchStore.reqSportLeagueList.productId = userStore.productId;
  matchStore.reqSportLeagueList.sportType = matchStore.sportTypeMap.get(route.params.sport as string)?.type ?? 1;
  matchStore.getSportLeagueList();

  matchStore.setEarlyFilter();
});

watch(() => route.fullPath, () => {
  matchStore.reqSportH5MatchList.sportType = matchStore.sportTypeMap.get(route.params.sport as string)?.type ?? 1;
  matchStore.getSportH5MatchList();

  matchStore.reqSportMatchCount.sportType = matchStore.sportTypeMap.get(route.params.sport as string)?.type ?? 1;
  matchStore.getSportMatchCount();

  matchStore.reqSportLeagueList.sportType = matchStore.sportTypeMap.get(route.params.sport as string)?.type ?? 1;
  matchStore.getSportLeagueList();
});

onBeforeUnmount(() => {
  if (intervalId.value) clearInterval(intervalId.value);
});

watch(
  () => langStore.current,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      matchStore.getSportH5MatchList();
      matchStore.getSportLeagueList();
      matchStore.setEarlyFilter();
    }
  }
);
</script>

<style lang="scss" scoped></style>