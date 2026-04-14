<template>
  <n-drawer v-model:show="betStore.floatBetting" :height="500" placement="bottom" content-class="bg-bet-panel">
    <div class="p-2">
      <n-tabs :default-value="defaultTab" type="line" size="large" class="justify-center" justify-content="space-evenly" @update:value="tabChange" style="--n-tab-padding: 7px 20px">
        <n-tab-pane :tab="$t('label.single')" name="single">
          <template v-if="betStore.betsList.length > 0">
            <div class="p-4 space-y-2">
              <template v-for="(item, index) in betStore.betsList">
                <transition name="slide-fade" @after-leave="onBetRemoved(index)">
                  <div class="flex overflow-hidden relative" v-if="item.showCard">
                    <div class="flex items-center justify-center w-[40px] rounded-s-md bg-surface cursor-pointer" :class="{ 'z-10': !item.marketOpen }" @click="removeBets(index)">
                      <n-icon size="18" v-html="Close"></n-icon>
                    </div>
                    <div class="flex-1 flex flex-col bg-surface-soft rounded-e-md space-y-1 p-3 min-w-0">
                      <div class="flex items-center gap-2">
                        <span class="font-semibold text-sm">{{ item.outcomeShowName }}</span>
                      </div>
                      <div class="text-xs text-subtle">{{ item.marketName }}</div>
                      <div class="text-sm text-subtle-light truncate">
                        {{ item.homeTeamName }} v {{ item.awayTeamName }}
                      </div>
                      <div class="flex justify-between items-center mt-1 font-semibold text-sm">
                        <span class="text-primary">@ {{ item.odds }}</span>
                        <div class="flex flex-col items-end gap-1">
                          <div class="flex items-center gap-2">
                            <span>$</span>
                            <n-input-number v-model:value="item.bet" size="small" :show-button="false" class="max-w-15" />
                          </div>
                          <div class="text-xs text-subtle ml-auto">
                            <span>{{ $t('label.betLimit') }}：</span>
                            <span>{{ betStore.minBet }}-{{ betStore.maxBet }}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-col items-center justify-center w-full h-full bg-white/60 dark:bg-black/30 absolute left-0 top-0" v-if="!item.marketOpen">
                      <n-icon size="32" v-html="LockClosed24Regular"></n-icon>
                      <span class="text-lg font-bold">{{ $t('error_code.452') }}</span>
                    </div>
                  </div>
                </transition>
              </template>

              <div class="text-sm space-y-2">
                <div class="flex justify-between">
                  <span class="text-subtle">{{ $t('label.betAmount') }}：</span>
                  <span>${{ numberFormate(totalBet) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-subtle">{{ $t('label.potentialPayout') }}：</span>
                  <span class="text-primary">${{ numberFormate(totalProfit) }}</span>
                </div>
                <div>
                  <n-radio-group v-model:value="reqPlayerBet.oddsMode" name="radiogroup" size="small" :default-value="1">
                    <div class="flex flex-col">
                      <n-radio key="oddsMode1" :value="1">{{ $t('label.acceptBetterOdds') }}</n-radio>
                      <n-radio key="oddsMode2" :value="2">{{ $t('label.acceptAnyOdds') }}</n-radio>
                      <n-radio key="oddsMode3" :value="3">{{ $t('label.rejectOddsChange') }}</n-radio>
                      <n-radio key="oddsMode4" :value="4">{{ $t('label.acceptSmallOddsChange') }}(0.2)</n-radio>
                    </div>
                  </n-radio-group>
                </div>
                <div class="flex items-center gap-2">
                  <n-button type="primary" class="flex-1" :disabled="disabledBet" @click="handlePlayerBet">{{ userStore.isLogin ? $t('label.placeBet') : $t('label.loginAgain') }}</n-button>
                  <div class="flex items-center justify-center cursor-pointer" @click="removeAllBets">
                    <n-icon size="30" v-html="TrashOutline"></n-icon>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="flex min-h-60 p-5">
              <div class="flex flex-col items-center justify-center gap-2 m-auto p-5">
                <n-icon size="48" v-html="EmptyBetSlip"></n-icon>
                <div>{{ userStore.isLogin ? $t('label.selectionsAppear') : $t('label.loginAgain') }}</div>
              </div>
            </div>
          </template>
        </n-tab-pane>
        <n-tab-pane :tab="$t('label.parlay')" name="parlay">
          <template v-if="betStore.comboBetsList.length > 0">
            <div class="p-4 space-y-2">
              <template v-for="(item, index) in betStore.comboBetsList">
                <transition name="slide-fade" @after-leave="onBetRemoved(index)">
                  <div class="flex overflow-hidden relative" v-if="item.showCard">
                    <div class="flex items-center justify-center w-[40px] rounded-s-md bg-surface cursor-pointer" :class="{ 'z-10': !item.marketOpen || !item.supportCombo }" @click="removeBets(index)">
                      <n-icon size="18" v-html="Close"></n-icon>
                    </div>
                    <div class="flex-1 flex flex-col bg-surface-soft rounded-e-md space-y-1 p-3 min-w-0" :class="{ 'opacity-15': !item.marketOpen || !item.supportCombo }">
                      <div class="flex items-center gap-2">
                        <span class="font-semibold text-sm">{{ item.outcomeShowName }}</span>
                      </div>
                      <div class="text-xs text-subtle">{{ item.marketName }}</div>
                      <div class="text-sm text-subtle-light truncate">
                        {{ item.homeTeamName }} v {{ item.awayTeamName }}
                      </div>
                      <div class="flex justify-between items-center mt-1 font-semibold text-sm" v-if="item.eoIor != 0">
                        <span class="text-primary">@ {{ item.eoIor }}</span>
                      </div>
                    </div>

                    <template v-if="!item.marketOpen">
                      <div class="flex flex-col items-center justify-center w-[calc(100%-40px)] h-full border rounded-sm  absolute left-10 top-0">
                        <n-icon size="32" v-html="LockClosed24Regular"></n-icon>
                        <span class="text-lg font-bold">{{ $t('error_code.452') }}</span>
                      </div>
                    </template>
                    <template v-else-if="!item.supportCombo">
                      <div class="flex flex-col items-center justify-center w-[calc(100%-40px)] h-full border rounded-sm text-amber-500 border-amber-500 absolute left-10 top-0">
                        <n-icon size="32" v-html="LockClosed24Regular"></n-icon>
                        <span class="text-lg font-bold">{{ $t('label.comboNoCombined') }}</span>
                      </div>
                    </template>
                  </div>
                </transition>
              </template>

              <div class="text-sm space-y-2">
                <template v-if="betStore.comboBetsList.length == betStore.comboSeries">
                  <div class="flex items-center gap-2 text-lg">
                    <span>{{ betStore.comboSeries }}{{ $t('label.concat') }} 1</span>
                    <span class="text-primary">@ {{ betStore.comboSeriesOdds }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span>$</span>
                    <n-input-number v-model:value="betStore.comboBetsAmount" size="small" :show-button="false" class="w-full" />
                  </div>
                </template>
                <div class="flex justify-between">
                  <span class="text-subtle">{{ $t('label.betLimit') }}：</span>
                  <span>{{ betStore.minBet }}-{{ betStore.maxBet }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-subtle">{{ $t('label.betAmount') }}：</span>
                  <span>${{ numberFormate(totalBet) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-subtle">{{ $t('label.potentialPayout') }}：</span>
                  <span class="text-primary">${{ numberFormate(totalProfit) }}</span>
                </div>
                <div>
                  <n-radio-group v-model:value="reqPlayerComboBet.oddsMode" name="radiogroup" size="small" :default-value="1">
                    <div class="flex flex-col">
                      <n-radio key="oddsMode1" :value="1">{{ $t('label.acceptBetterOdds') }}</n-radio>
                      <n-radio key="oddsMode2" :value="2">{{ $t('label.acceptAnyOdds') }}</n-radio>
                      <n-radio key="oddsMode3" :value="3">{{ $t('label.rejectOddsChange') }}</n-radio>
                      <n-radio key="oddsMode4" :value="4">{{ $t('label.acceptSmallOddsChange') }}(0.2)</n-radio>
                    </div>
                  </n-radio-group>
                </div>
                <div class="flex items-center gap-2">
                  <n-button type="primary" class="flex-1" :disabled="disabledBet" @click="handlePlayerComboBet">{{ userStore.isLogin ? $t('label.placeBet') : $t('label.loginAgain') }}</n-button>
                  <div class="flex items-center justify-center cursor-pointer" @click="removeAllBets">
                    <n-icon size="30" v-html="TrashOutline"></n-icon>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="flex min-h-60 p-5">
              <div class="flex flex-col items-center justify-center gap-2 m-auto p-5">
                <n-icon size="48" v-html="EmptyBetSlip"></n-icon>
                <div>{{ userStore.isLogin ? $t('label.selectionsAppear') : $t('label.loginAgain') }}</div>
              </div>
            </div>
          </template>
        </n-tab-pane>
      </n-tabs>
    </div>
  </n-drawer>
</template>

<script setup lang="ts">
import { NButton, NDrawer, NDrawerContent, NIcon, NInputNumber, NRadio, NRadioGroup, NTabPane, NTabs, useMessage } from 'naive-ui';
import { computed, reactive, ref, watch } from 'vue';
import Close from "@/assets/ionIcons5/Close.svg?raw";
import TrashOutline from "@/assets/ionIcons5/TrashOutline.svg?raw";
import LockClosed24Regular from "@/assets/fluent/LockClosed24Regular.svg?raw";
import EmptyBetSlip from "@/assets/emptyBetSlip.svg?raw";
import { useUserStore } from '@/store/module/user';
import { apiSrv, cryptoMd5Password, errorHandling, numberFormate } from '@/service';
import { md5 } from 'js-md5';
import { ReqPlayerBet, ReqPlayerComboBet } from '@/model/player';
import { useBetStore } from '@/store/module/bet';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const message = useMessage();
const userStore = useUserStore();
const betStore = useBetStore();

const defaultTab = ref('single');

const totalBet = computed(() => {
  if (betStore.isComboOrder) {
    return betStore.comboBetsAmount || 0;
  } else {
    return betStore.betsList.reduce((sum, item) => sum + (item.bet || 0), 0);
  }
});
const totalProfit = computed(() => {
  if (betStore.isComboOrder) {
    return betStore.comboBetsAmount * betStore.comboSeriesOdds || 0;
  } else {
    return betStore.betsList.reduce((sum, item) => {
      const bet = item.bet || 0;
      const eoIor = item.eoIor || 0;
      return sum + bet * eoIor;
    }, 0);
  }
});
const disabledBet = computed(() => {
  const noAmount = betStore.isComboOrder ? !betStore.comboBetsAmount : betStore.betsList.some(d => !d.bet);
  const isClosed = betStore.isComboOrder ? betStore.comboBetsList.some(d => !d.marketOpen) : betStore.betsList.some(d => !d.marketOpen);
  const isOverLimit = (totalBet.value < betStore.minBet || totalBet.value > betStore.maxBet);
  return !userStore.isLogin || noAmount || isClosed || !reqPlayerBet.oddsMode || isOverLimit;
});

const tabChange = (value: any) => {
  betStore.isComboOrder = value == 'single' ? false : true;
};

const removeBets = (index: any) => {
  if (betStore.isComboOrder) {
    betStore.comboBetsList[index].showCard = false;
  } else {
    betStore.betsList[index].showCard = false;
  }
};

const removeAllBets = () => {
  if (betStore.isComboOrder) {
    betStore.comboBetsList = [];
  } else {
    betStore.betsList = [];
  }
};

const onBetRemoved = (index: any) => {
  if (betStore.isComboOrder) {
    betStore.comboBetsList.splice(index, 1);
  } else {
    betStore.betsList.splice(index, 1);
  }
};

const reqPlayerBet = reactive(new ReqPlayerBet());
const handlePlayerBet = () => {
  if (!userStore.isLogin) return;
  if (betStore.betsList.length <= 0) return;
  betStore.betsList.forEach(d => {
    if (!d.bet) return;
  });

  userStore.loadingCount++;

  const now = Date.now();

  reqPlayerBet.playerSessionKey = userStore.getToken();
  reqPlayerBet.transactionId = md5(`${userStore.player}${Date.now()}`);
  reqPlayerBet.time = now;
  reqPlayerBet.sign = cryptoMd5Password(userStore.getToken() + userStore.player + now);
  reqPlayerBet.amount = totalBet.value;
  reqPlayerBet.bets = new Array();

  betStore.betsList.forEach(d => {
    reqPlayerBet.bets.push({
      productId: userStore.productId,
      sportType: Number(userStore.sportType),
      oddsType: Number(userStore.oddsType),
      matchId: d.matchId,
      bet: d.bet,
      eoIor: d.eoIor,
      outcomeId: d.outcomeId,
      sourceId: d.sourceId,
    });
  });

  apiSrv.post("/player/bet", reqPlayerBet)
    .then((response) => {
      betStore.floatBetting = false;
      reqPlayerBet.transactionId = '';
      betStore.betsList = [];
      userStore.getBalance();
      message.success(t('label.betSuccess'));
    })
    .catch((error) => {
      errorHandling(error);
      if ([452].includes(error.response.status)) {
        betStore.verifyBet();
      }
    })
    .finally(() => userStore.loadingCount--);
};

const reqPlayerComboBet = reactive(new ReqPlayerComboBet());
const handlePlayerComboBet = () => {
  if (!userStore.isLogin) return;
  if (betStore.comboBetsList.length <= 0) return;
  betStore.comboBetsList.forEach(d => {
    if (!d.bet) return;
  });

  userStore.loadingCount++;

  const now = Date.now();

  reqPlayerComboBet.playerSessionKey = userStore.getToken();
  reqPlayerComboBet.transactionId = md5(`${userStore.player}${Date.now()}`);
  reqPlayerComboBet.time = now;
  reqPlayerComboBet.sign = cryptoMd5Password(userStore.getToken() + userStore.player + now);
  reqPlayerComboBet.productId = userStore.productId;
  reqPlayerComboBet.sportType = Number(userStore.sportType);
  reqPlayerComboBet.oddsType = Number(userStore.oddsType);
  reqPlayerComboBet.series = betStore.comboSeries;
  reqPlayerComboBet.seriesOdds = betStore.comboSeriesOdds;

  reqPlayerComboBet.amount = totalBet.value;
  reqPlayerComboBet.comboBets = new Array();

  betStore.comboBetsList.forEach(d => {
    reqPlayerComboBet.comboBets.push({
      matchId: d.matchId,
      outcomeId: d.outcomeId,
      sourceId: d.sourceId,
      eoIor: d.eoIor
    });
  });
  apiSrv.post("/player/combobet", reqPlayerComboBet)
    .then((response) => {
      betStore.floatBetting = false;
      reqPlayerComboBet.transactionId = '';
      betStore.comboBetsList = [];
      betStore.comboBetsAmount = 0;
      userStore.getBalance();
      message.success(t('label.betSuccess'));
    })
    .catch((error) => {
      errorHandling(error);
      if ([452, 459].includes(error.response.status)) {
        betStore.verifyCombo();
      }
    })
    .finally(() => userStore.loadingCount--);
};

watch(() => betStore.floatBetting, () => {
  defaultTab.value = betStore.isComboOrder ? 'parlay' : 'single';
});
</script>

<style lang="scss" scoped></style>