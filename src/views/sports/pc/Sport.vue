<template>
  <div class="grid grid-cols-20 gap-2">
    <div :class="{ 'col-span-19': !matchStore.collapseSide, 'col-span-13': matchStore.collapseSide }">
      <div class="p-5 pe-0">
        <div class="space-y-5">
          <HotCarousel />
          <div class="space-y-5">
            <div class="flex flex-wrap gap-3 relative">
              <!-- 聯賽 -->
              <n-popover v-model:show="showLeaguePopup" trigger="click" placement="bottom-start" style="--n-padding: 0; --n-border-radius: var(--radius-lg)">
                <template #trigger>
                  <div class="sport-filter-btn">
                    <span>{{ $t('label.league') }}</span>
                    <span>{{ $t('label.selected') }}({{ matchStore.reqSportMatchList.leagueIds.length }})</span>
                  </div>
                </template>
                <template #default>
                  <n-scrollbar style="height: calc(100vh - 400px);min-height: 200px;">
                    <div class="rounded-lg p-4 space-y-2">
                      <div class="flex gap-3">
                        <n-button type="primary" @click="handleCheckLeague('check')">{{ $t('label.confirm') }}</n-button>
                        <n-button type="tertiary" secondary @click="handleCheckLeague('cancel')">{{ $t('label.cancel') }}</n-button>
                        <n-button @click="matchStore.reqSportMatchList.leagueIds = [];">{{ $t('label.clear') }}</n-button>
                        <n-input v-model:value="matchStore.leagueFilterName" autosize class="w-48" @update:value="matchStore.leagueFilter()" />
                      </div>
                      <n-checkbox-group v-model:value="matchStore.reqSportMatchList.leagueIds">
                        <div class="grid grid-cols-4">
                          <div class="border p-2" v-for="item in matchStore.leagueList">
                            <n-checkbox :value="item.leagueId">
                              <div class="flex items-center gap-1">
                                <img :src="item.leagueLogo" alt="" onerror="this.src='/images/sports/league.png'" class="w-4 h-4 object-contain">
                                <span>{{ item.leagueName }}</span>
                              </div>
                            </n-checkbox>
                          </div>
                        </div>
                      </n-checkbox-group>
                    </div>
                  </n-scrollbar>
                </template>
              </n-popover>

              <!-- 篩選按鈕區 -->
              <template v-for="[key, item] in matchStore.filterMap">
                <div @click="timeFilter(key)" class="sport-filter-btn" :class="{ 'is-active': key === matchStore.filterType }">
                  {{ $t(`matchTime_type.${item.matchTimeType}`) }}
                  <template v-if="item.matchTimeType == 1">({{ matchStore.respSportMatchCount.inPlayCount }})</template>
                  <template v-if="item.matchTimeType == 2">({{ matchStore.respSportMatchCount.todayCount }})</template>
                  <template v-if="item.matchTimeType == 3">({{ matchStore.respSportMatchCount.earlyCount }})</template>
                  <template v-if="item.matchTimeType == 4">({{ matchStore.respSportMatchCount.outrightsCount }})</template>
                </div>
              </template>

              <div class="flex items-center">
                <n-button @click="matchStore.toggleAll()">{{ matchStore.allExpanded ? `🔽 ${$t('label.collapseAll')}` : `▶️ ${$t('label.expandAll')}` }}</n-button>
              </div>

              <div @click="showRecommend = true" v-if="matchStore.filterType != 'roll'">
                <FloatingRecommendBtn />
              </div>
            </div>

            <!-- 卡片清單 -->
            <div class="bg-surface-soft rounded-md px-3 league-collapse relative overflow-hidden" id="drawer-target">
              <template v-if="matchStore.respSportMatchList.datas.length > 0">
                <n-scrollbar style="height: calc(100vh - 450px);">
                  <div class="flex items-center gap-3 bg-surface-soft py-2 w-full absolute z-10" v-if="matchStore.filterType == 'early'">
                    <template v-for="item in matchStore.earlyFilterList">
                      <div class="sport-filter-btn" :class="{ 'is-active': item.start == matchStore.reqSportMatchList.startTime }" @click="earlyTimeFilter(item)">{{ item.date }}</div>
                    </template>
                  </div>
                  <div :class="{ 'pt-15': matchStore.filterType == 'early' }">
                    <n-collapse v-model:expanded-names="matchStore.activeNames" style="--n-item-margin: 0; --n-title-padding: 0">
                      <n-collapse-item v-for="item in matchStore.respSportMatchList.datas" :key="item.leagueId" :title="item.leagueName" :name="item.leagueId" class="pt-0">
                        <template #header>
                          <div class="flex items-center gap-1 py-2">
                            <img :src="item.leagueLogo" alt="" onerror="this.src='/images/sports/league.png'" class="w-4 h-4 object-contain">
                            <span>{{ item.leagueName }}</span>
                          </div>
                        </template>
                        <template #default>
                          <template v-for="(match, matchIndex) in item.matchList">
                            <component :is="getSportComponent(userStore.sportType)" :match="match" :prevMatch="matchStore.prevSportMatchList" :matchIndex="matchIndex" :sportMatch="item" :matchTimeType="matchStore.reqSportMatchList.matchTimeType" />
                          </template>
                        </template>
                      </n-collapse-item>
                    </n-collapse>
                  </div>
                </n-scrollbar>
              </template>
              <template v-else>
                <div class="flex items-center gap-3 bg-surface-soft py-2 w-full" v-if="matchStore.filterType == 'early'">
                  <template v-for="item in matchStore.earlyFilterList">
                    <div class="sport-filter-btn" :class="{ 'is-active': item.start == matchStore.reqSportMatchList.startTime }" @click="earlyTimeFilter(item)">{{ item.date }}</div>
                  </template>
                </div>
                <div class="flex items-center justify-center p-10">
                  <n-empty size="large" :description="$t('label.noMatches')"></n-empty>
                </div>
              </template>
              <n-pagination v-model:page="matchStore.reqSportMatchList.pageIndex" v-model:page-size="matchStore.reqSportMatchList.pageSize" :item-count="matchStore.respSportMatchList.total" show-size-picker :page-sizes="[10, 20, 30, 40]" @update:page="handleUpdatePage" @update:page-size="handleUpdatePageSize" class="justify-center py-3" />

              <n-drawer v-model:show="showRecommend" :width="400" placement="right" :trap-focus="false" :block-scroll="false" to="#drawer-target" content-class="bg-surface-soft">
                <n-drawer-content :title="$t('label.recommendMatch')" :native-scroll="true" closable>
                  <OutcomeRecommend />
                </n-drawer-content>
              </n-drawer>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center gap-2 p-5 pe-2 ps-0" :class="{ 'col-span-1': !matchStore.collapseSide, 'col-span-7': matchStore.collapseSide }">
      <MatchSide />
    </div>
  </div>

</template>

<script setup lang="ts">
import { NButton, NCheckbox, NCheckboxGroup, NCollapse, NCollapseItem, NDrawer, NDrawerContent, NEmpty, NIcon, NInput, NPagination, NPopover, NScrollbar } from 'naive-ui';
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
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

const intervalId = ref<ReturnType<typeof setInterval> | null>(null);
const showLeaguePopup = ref(false);
const showRecommend = ref(false);

const timeFilter = (type: string) => {
  matchStore.filterType = type;
  matchStore.reqSportMatchList.matchTimeType = matchStore.filterMap.get(type)?.matchTimeType ?? 1;
  matchStore.reqSportMatchList.startTime = -1;
  matchStore.reqSportMatchList.endTime = -1;
  matchStore.reqSportMatchList.pageIndex = 1;
  matchStore.activeNames = [];
  matchStore.getSportMatchList();
  setupInterval();

  showRecommend.value = false;
};

const earlyTimeFilter = (item: any) => {
  matchStore.reqSportMatchList.startTime = item.start;
  matchStore.reqSportMatchList.endTime = item.end;
  matchStore.reqSportMatchList.pageIndex = 1;
  matchStore.getSportMatchList();
};

const setupInterval = () => {
  if (intervalId.value) clearInterval(intervalId.value);
  if (matchStore.filterType === 'champion') return;

  const time = matchStore.filterType === 'roll' ? 10000 : matchStore.filterType === 'today' ? 60000 : 300000;

  intervalId.value = setInterval(matchStore.getSportMatchList, time);
};

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

const handleCheckLeague = (action: string) => {
  showLeaguePopup.value = false;
  if (action === 'check') {
    matchStore.getSportMatchList();
  }
};

const handleUpdatePage = (page: number) => {
  matchStore.reqSportMatchList.pageIndex = page;
  matchStore.getSportMatchList();
};

const handleUpdatePageSize = (pageSize: number) => {
  matchStore.reqSportMatchList.pageIndex = 1;
  matchStore.reqSportMatchList.pageSize = pageSize;
  matchStore.getSportMatchList();
};


onMounted(() => {
  matchStore.reqSportMatchCount.productId = userStore.productId;
  matchStore.reqSportMatchCount.sportType = matchStore.sportTypeMap.get(route.params.sport as string)?.type ?? 1;
  matchStore.getSportMatchCount();

  matchStore.filterType = 'roll';
  matchStore.reqSportMatchList.productId = userStore.productId;
  matchStore.reqSportMatchList.sportType = matchStore.sportTypeMap.get(route.params.sport as string)?.type ?? 1;
  matchStore.reqSportMatchList.matchTimeType = 1;
  matchStore.reqSportMatchList.oddsType = Number(userStore.oddsType);
  matchStore.getSportMatchList();
  setupInterval();

  matchStore.reqSportLeagueList.productId = userStore.productId;
  matchStore.reqSportLeagueList.sportType = matchStore.sportTypeMap.get(route.params.sport as string)?.type ?? 1;
  matchStore.getSportLeagueList();

  matchStore.setEarlyFilter();
});

watch(() => route.fullPath, () => {
  matchStore.reqSportMatchCount.sportType = matchStore.sportTypeMap.get(route.params.sport as string)?.type ?? 1;
  matchStore.getSportMatchCount();

  matchStore.reqSportMatchList.sportType = matchStore.sportTypeMap.get(route.params.sport as string)?.type ?? 1;
  matchStore.getSportMatchList();

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
      matchStore.getSportMatchList();
      matchStore.getSportLeagueList();
      matchStore.setEarlyFilter();
    }
  }
);

</script>

<style lang="scss" scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.league-collapse {
  :deep(.n-collapse .n-collapse-item .n-collapse-item__content-wrapper .n-collapse-item__content-inner) {
    padding-top: 0;
  }
}
</style>