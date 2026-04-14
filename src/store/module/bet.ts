import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { apiSrv, errorHandling } from '@/service';
import type { MatchInfo } from '@/model/sport';
import { useUserStore } from './user';
import { ReqPlayerVerifyBet, ReqPlayerVerifyCombo, RespPlayerVerifyBet, RespPlayerVerifyCombo } from '@/model/player';

interface betInfo {
  leagueId: string,
  matchId: string,
  homeTeamName: string,
  awayTeamName: string,
  marketId: string,
  marketName: string,
  outcomeId: string,
  outcomeName: string,
  outcomeShowName: string,
  odds: number,
  sourceId: string,
  sourceRatio: string,
  sourceStrong: string,
  bet: number,
  eoIor: number,
  showCard: boolean,
  marketOpen: boolean;
  supportCombo: boolean;
  minBet: number;
  maxBet: number;
}

const userStore = useUserStore();

export const useBetStore = defineStore('bet-store', () => {

  const betsList = ref(new Array<betInfo>());
  const comboBetsList = ref(new Array<betInfo>());
  const floatBetting = ref(false);
  const isComboOrder = ref(false);
  const comboBetsAmount = ref(0);
  const comboSeries = ref(0);
  const comboSeriesOdds = ref(0);
  const minBet = ref(0);
  const maxBet = ref(0);

  const setBetsList = (leagueId: string, match: any = {}, marketData: any = {}, outcomeData: any = {}) => {
    if (isComboOrder.value) {
      handleComboBet(leagueId, match, marketData, outcomeData);
    } else {
      handleSingleBet(leagueId, match, marketData, outcomeData);
    }
  };

  const handleSingleBet = (leagueId: string, match: any = {}, marketData: any = {}, outcomeData: any = {}) => {
    betsList.value = [];
    floatBetting.value = true;

    if (!userStore.isLogin) return;

    betsList.value = [...betsList.value, {
      leagueId: leagueId,
      matchId: match.matchId,
      homeTeamName: match.homeTeamName,
      awayTeamName: match.awayTeamName,
      marketId: marketData.marketId,
      marketName: marketData.marketName,
      outcomeId: outcomeData.outcomeId,
      outcomeName: outcomeData.outcomeName,
      outcomeShowName: outcomeData.outcomeShowName,
      odds: outcomeData.odds,
      sourceId: outcomeData.sourceId,
      sourceRatio: outcomeData.sourceRatio,
      sourceStrong: outcomeData.sourceStrong,
      bet: 0,
      eoIor: outcomeData.odds,
      showCard: true,
      marketOpen: true,
      supportCombo: true,
      minBet: 0,
      maxBet: 0,
    }];

    verifyBet();
  };

  const handleComboBet = (leagueId: string, match: MatchInfo, marketData: any = {}, outcomeData: any = {}) => {
    comboBetsList.value = comboBetsList.value.filter((d: { matchId: any; }) => d.matchId != match.matchId);

    floatBetting.value = true;

    if (!userStore.isLogin) return;

    comboBetsList.value = [...comboBetsList.value, {
      leagueId: leagueId,
      matchId: match.matchId,
      homeTeamName: match.homeTeamName,
      awayTeamName: match.awayTeamName,
      marketId: marketData.marketId,
      marketName: marketData.marketName,
      outcomeId: outcomeData.outcomeId,
      outcomeName: outcomeData.outcomeName,
      outcomeShowName: outcomeData.outcomeShowName,
      odds: outcomeData.odds,
      sourceId: outcomeData.sourceId,
      sourceRatio: outcomeData.sourceRatio,
      sourceStrong: outcomeData.sourceStrong,
      bet: 0,
      eoIor: 0,
      showCard: true,
      marketOpen: true,
      supportCombo: true,
      minBet: 0,
      maxBet: 0,
    }];

    if (comboBetsList.value.length > 1) {
      verifyCombo();
    }
  };

  const reqPlayerVerifyBet = reactive(new ReqPlayerVerifyBet());
  const respPlayerVerifyBet = ref(new RespPlayerVerifyBet());
  const verifyBet = () => {
    userStore.loadingCount++;

    reqPlayerVerifyBet.playerSessionKey = userStore.getToken();
    reqPlayerVerifyBet.bets = new Array();

    betsList.value.forEach(d => {
      reqPlayerVerifyBet.bets.push({
        productId: userStore.productId,
        sportType: Number(userStore.sportType),
        oddsType: Number(userStore.oddsType),
        matchId: d.matchId,
        outcomeId: d.outcomeId,
        sourceId: d.sourceId,
      });
    });

    apiSrv.post("/player/verifybet", reqPlayerVerifyBet)
      .then((response) => {
        respPlayerVerifyBet.value = response.data;
        respPlayerVerifyBet.value.datas.forEach((d) => {
          const targetBet = betsList.value.find(bet => bet.sourceId === d.sourceId);
          if (targetBet) {
            targetBet.eoIor = d.eoIor;
            targetBet.marketOpen = d.isMarketOpen;
            targetBet.supportCombo = d.isSupportCombo;
            targetBet.minBet = d.minBet;
            targetBet.maxBet = d.maxBet;
          }

          minBet.value = d.minBet;
          maxBet.value = d.maxBet;
        });
      })
      .catch((error) => {
        errorHandling(error);
      })
      .finally(() => userStore.loadingCount--);
  };

  const reqPlayerVerifyCombo = reactive(new ReqPlayerVerifyCombo());
  const respPlayerVerifyCombo = ref(new RespPlayerVerifyCombo());
  const verifyCombo = () => {
    userStore.loadingCount++;

    reqPlayerVerifyCombo.playerSessionKey = userStore.getToken();
    reqPlayerVerifyCombo.comboBets = new Array();

    comboBetsList.value.forEach(d => {
      reqPlayerVerifyCombo.comboBets.push({
        productId: userStore.productId,
        sportType: Number(userStore.sportType),
        oddsType: Number(userStore.oddsType),
        matchId: d.matchId,
        outcomeId: d.outcomeId,
        sourceId: d.sourceId,
      });
    });

    apiSrv.post("/player/verifycombo", reqPlayerVerifyCombo)
      .then((response) => {
        respPlayerVerifyCombo.value = response.data;
        respPlayerVerifyCombo.value.datas.forEach((d) => {
          const targetBet = comboBetsList.value.find(bet => bet.sourceId === d.sourceId);
          if (targetBet) {
            targetBet.eoIor = d.eoIor;
            targetBet.marketOpen = d.isMarketOpen;
            targetBet.supportCombo = d.isSupportCombo;
          }


        });

        comboSeries.value = respPlayerVerifyCombo.value.series;
        comboSeriesOdds.value = respPlayerVerifyCombo.value.seriesOdds;
        minBet.value = respPlayerVerifyCombo.value.minBet;
        maxBet.value = respPlayerVerifyCombo.value.maxBet;
      })
      .catch((error) => {
        errorHandling(error);
      })
      .finally(() => userStore.loadingCount--);
  };

  return {
    betsList,
    comboBetsList,
    floatBetting,
    isComboOrder,
    comboBetsAmount,
    comboSeries,
    comboSeriesOdds,
    minBet,
    maxBet,
    setBetsList,
    handleComboBet,
    handleSingleBet,
    verifyBet,
    verifyCombo
  };
});

