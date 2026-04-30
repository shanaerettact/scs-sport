<template>
  <div class="w-full">
    <template v-if="respSportMatchPopular.datas.length > 0">
      <n-carousel :slides-per-view="slidersPerView" :space-between="20" :loop="false" draggable class="sports-carousel">
        <template v-for="(item, index) in respSportMatchPopular.datas">
          <div class="w-full h-[180px] rounded-lg relative cursor-pointer" @click.stop="matchStore.handleMoreBets(item.matchId, 'score')">
            <img class="w-full h-full object-cover rounded-lg" src="/images/sports/bg-match.png">
            <div class="w-full h-full bg-[#0063c8] mix-blend-overlay rounded-lg absolute top-0 left-0"></div>
            <div class="flex flex-col justify-between w-full h-full text-white p-2 absolute top-0 left-0">
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-1">
                  <span>{{ item.leagueName }}</span>
                </div>
                <div>{{ dayjs(item.matchTime).format('MM-DD HH:mm') }}</div>
              </div>
              <div class="flex justify-center items-center gap-10">
                <div class="flex flex-col items-center gap-2 w-4/12 text-center">
                  <img :src="item.homeTeamLogo" alt="" height="40" width="40" onerror="this.src='/images/sports/homeTeam.png'" />
                  <div>{{ item.homeTeamName }}</div>
                </div>
                <div class="flex-1 text-center">vs</div>
                <div class="flex flex-col items-center gap-2 w-4/12 text-center">
                  <img :src="item.awayTeamLogo" alt="" height="40" width="40" onerror="this.src='/images/sports/awayTeam.png'" />
                  <div>{{ item.awayTeamName }}</div>
                </div>
              </div>
              <div class="grid grid-cols-1 gap-4">
                <div class="grid gap-2" :class="[item.market.outcomeList.length == 3 ? 'grid-cols-3' : 'grid-cols-2']">
                  <template v-for="outcome in item.market.outcomeList">
                    <div class="flex justify-between rounded-md text=white bg-white/20 hover:bg-[#48A3FFcc] p-2 cursor-pointer" @click.stop="betStore.setBetsList(item.leagueId, { matchId: item.matchId, homeTeamName: item.homeTeamName, awayTeamName: item.awayTeamName, }, item.market, outcome)">
                      <span class="truncate">{{ outcome.outcomeName }}</span>
                      <span class="">{{ outcome.odds }}</span>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #dots="{ total, currentIndex, to }">
          <ul class="custom-dots">
            <li v-for="index of total" :key="index" :class="{ ['is-active']: currentIndex === index - 1 }" @click="to(index - 1)" />
          </ul>
        </template>
      </n-carousel>
    </template>
  </div>
</template>

<script setup lang="ts">
import { NCarousel, NEmpty, NIcon } from 'naive-ui';
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { ReqSportMatchPopular, RespSportMatchPopular } from '@/model/sport';
import { useUserStore } from '@/store/module/user';
import { apiSrv, errorHandling } from '@/service';
import dayjs from "dayjs";
import { useBetStore } from '@/store/module/bet';
import { useLangStore } from '@/store/module/lang';
import { useRoute } from 'vue-router';
import { useMatchStore } from '@/store/module/match';

const route = useRoute();
const betStore = useBetStore();
const langStore = useLangStore();
const userStore = useUserStore();
const matchStore = useMatchStore();

const slidersPerView = ref(3);

const reqSportMatchPopular = reactive(new ReqSportMatchPopular());
const respSportMatchPopular = ref(new RespSportMatchPopular());
const getPopular = () => {
  userStore.loadingCount++;

  reqSportMatchPopular.productId = userStore.productId;
  reqSportMatchPopular.sportType = Number(userStore.sportType);
  reqSportMatchPopular.lang = langStore.current;
  reqSportMatchPopular.oddsType = Number(userStore.oddsType);

  // 足球熱門順序
  const fbHotOrder = ["1_1", "1_3", "1_2"];

  apiSrv.post("/sport/match/popular", reqSportMatchPopular)
    .then((response) => {
      respSportMatchPopular.value = response.data;
      respSportMatchPopular.value.datas.forEach(data => {
        const market = data.market;

        if (market?.outcomeList && reqSportMatchPopular.sportType == 1) {
          market.outcomeList.sort((a: any, b: any) => {
            return fbHotOrder.indexOf(a.outcomeId) - fbHotOrder.indexOf(b.outcomeId);
          });
        }

      });
    })
    .catch((error) => {
      errorHandling(error);
    })
    .finally(() => userStore.loadingCount--);
};

const watchWidth = () => {
  const Width = document.body.clientWidth;
  if (Width <= 950) {
    slidersPerView.value = 1;
  }
  if (950 < Width && Width <= 1280) {
    slidersPerView.value = 2;
  }
  if (1280 < Width) {
    slidersPerView.value = 3;
  }
};

onMounted(() => {
  window.addEventListener('resize', watchWidth);
  getPopular();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", watchWidth);
});

watch(() => route.fullPath, () => {
  getPopular();
});

watch(() => userStore.productId, (newVal) => {
  if (newVal) {
    getPopular();
  }
});

watch(() => langStore.current, (newVal) => {
  if (newVal) {
    getPopular();
  }
});
</script>

<style lang="scss" scoped>
.sports-carousel {
  padding-bottom: 1rem;

  .item-bg {
    background-image: url('/images/sports/bg-match.png');
    background-repeat: no-repeat;
    background-size: cover;
  }

  .custom-dots {
    display: flex;
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .custom-dots li {
    display: inline-block;
    width: 12px;
    height: 4px;
    margin: 0 3px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.4);
    transition:
      width 0.3s,
      background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }

  .custom-dots li.is-active {
    width: 40px;
    background: #fff;
  }
}
</style>