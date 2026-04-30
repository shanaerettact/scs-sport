import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { apiSrv, errorHandling } from '@/service';
import { ReqSportMarketList, RespSportMarketList, ReqSportLeagueList, ReqSportMatchCount, ReqSportMatchList, RespSportLeagueList, RespSportMatchCount, RespSportMatchList, ReqSportH5MatchList, RespSportH5MatchList } from '@/model/sport';
import { useUserStore } from './user';
import { useLangStore } from './lang';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';

const userStore = useUserStore();
const langStore = useLangStore();

export const useMatchStore = defineStore('match-store', () => {
  const { t } = useI18n();
  const matchId = ref('');
  const collapseSide = ref(false);
  const viewMode = ref<'video' | 'ani' | 'score'>('score');
  const hasVideo = ref(false);
  const hasAni = ref(false);
  const insightMode = ref<'outcome' | 'analysis' | 'live' | 'statistics' | 'lineup'>('outcome');
  const needResetMatch = ref(false);
  const isCompareEnabled = ref(true);
  const leagueFilterName = ref('');
  const leagueList = ref();
  const activeNames = ref(new Array());
  const earlyFilterList = ref(new Array());

  const sportTypeMap = new Map([
    ['soccer', { label: '足球', type: 1 }],
    ['basketball', { label: '籃球', type: 2 }],
    ['tennis', { label: '網球', type: 3 }],
    ['volleyball', { label: '排球', type: 4 }],
    ['tableTennis', { label: '乒乓球', type: 5 }],
    ['baseball', { label: '棒球', type: 6 }],
    ['other', { label: '其他', type: 7 }]
  ]);

  const filterType = ref('roll');
  const filterMap = new Map([
    ['hot', { label: "热门", matchTimeType: 5 }],
    ['roll', { label: "滚球", matchTimeType: 1 }],
    ['today', { label: "今日", matchTimeType: 2 }],
    ['early', { label: "早盘", matchTimeType: 3 }],
    // ['champion', { label: "冠军", matchTimeType: 4 }],
  ]);

  const allExpanded = computed(() => activeNames.value.length === respSportMatchList.value.datas.length);
  const toggleAll = () => {
    activeNames.value = allExpanded.value ? [] : activeNames.value = respSportMatchList.value.datas.map(item => item.leagueId);
  };

  const leagueFilter = () => {
    if (leagueFilterName.value === '') {
      leagueList.value = respSportLeagueList.value.datas.map(item => ({ ...item }));
      return;
    }

    leagueList.value = respSportLeagueList.value.datas.filter(d => d.leagueName.includes(leagueFilterName.value));
  };

  const setEarlyFilter = () => {
    earlyFilterList.value = [{
      date: t('label.all'),
      start: -1,
      end: -1
    }];
    for (let i = 1; i <= 7; i++) {
      const day = dayjs().add(i, 'day');
      earlyFilterList.value.push({
        date: day.format('MM/DD'),
        start: day.startOf('day').valueOf(),
        end: day.endOf('day').valueOf()
      });
    }
  };

  const handleMoreBets = (id: string, view: string = '') => {
    matchId.value = id;
    needResetMatch.value = false;

    if (view === 'video') handleShowVideo();
    if (view === 'ani') handleShowAni();
    if (view === 'score') handleShowScore();

    handleShowInsight('outcome');

    getSportMarketList();
  };

  const handleShowVideo = () => { viewMode.value = 'video'; };
  const handleShowAni = () => { viewMode.value = 'ani'; };
  const handleShowScore = () => { viewMode.value = 'score'; };

  const handleShowInsight = (mode: any = 'outcome') => {
    insightMode.value = mode;
  };

  const reqSportMarketList = reactive(new ReqSportMarketList());
  const respSportMarketList = ref(new RespSportMarketList());
  const prevSportMarketList = ref(new RespSportMarketList());
  const getSportMarketList = () => {
    // 判斷 matchId 為空，直接離開
    if (!matchId.value || matchId.value.trim() === "") {
      return;
    }

    if (isCompareEnabled.value) {
      prevSportMarketList.value = JSON.parse(JSON.stringify(respSportMarketList.value));
    } else {
      prevSportMarketList.value = new RespSportMarketList();
      isCompareEnabled.value = true;
    }

    reqSportMarketList.productId = userStore.productId;
    reqSportMarketList.matchId = matchId.value;
    reqSportMarketList.sportType = Number(userStore.sportType);
    reqSportMarketList.lang = langStore.current;
    reqSportMarketList.oddsType = Number(userStore.oddsType);
    apiSrv.post("/sport/market/list", reqSportMarketList)
      .then((response) => {
        respSportMarketList.value = response.data;
        collapseSide.value = true;
        hasVideo.value = respSportMarketList.value.videoInfo.hasVideo ? true : false;
        hasAni.value = respSportMarketList.value.animationInfo.hasAnimation ? true : false;

        if (!hasVideo.value && !hasAni.value) handleShowScore();
      })
      .catch((error) => {
        errorHandling(error);
      })
      .finally(() => { });
  };

  const reqSportMatchCount = reactive(new ReqSportMatchCount());
  const respSportMatchCount = ref(new RespSportMatchCount());
  const getSportMatchCount = () => {
    userStore.loadingCount++;

    apiSrv.post("/sport/match/count", reqSportMatchCount)
      .then((response) => {
        respSportMatchCount.value = response.data;
      })
      .catch((error) => {
        errorHandling(error);
      })
      .finally(() => userStore.loadingCount--);
  };

  const reqSportMatchList = reactive(new ReqSportMatchList());
  const respSportMatchList = ref(new RespSportMatchList());
  const prevSportMatchList = ref(new RespSportMatchList());
  const getSportMatchList = () => {
    if (isCompareEnabled.value) {
      prevSportMatchList.value = JSON.parse(JSON.stringify(respSportMatchList.value));
    } else {
      prevSportMatchList.value = new RespSportMatchList();
      isCompareEnabled.value = true; // 下次開始重新比對
    }

    reqSportMatchList.lang = langStore.current;
    reqSportMatchList.oddsType = Number(userStore.oddsType);
    apiSrv.post("/sport/match/list", reqSportMatchList)
      .then((response) => {
        respSportMatchList.value = response.data;

        respSportMatchList.value.datas.map(data => {
          data.matchList.map(match => {
            match.marketList.map(market => {
              market.outcomeList.sort((a: any, b: any) => {
                return a.outcomeId.split('_')[1] - b.outcomeId.split('_')[1];
              });
            });
          });
        });

        if (needResetMatch.value) {
          handleMoreBets(respSportMarketList.value.matchInfo.matchId);
        }
      })
      .catch((error) => {
        errorHandling(error);
      })
      .finally(() => { });
  };


  const reqSportH5MatchList = reactive(new ReqSportH5MatchList());
  const respSportH5MatchList = ref(new RespSportH5MatchList());
  const prevSportH5MatchList = ref(new RespSportH5MatchList());
  const getSportH5MatchList = () => {
    if (isCompareEnabled.value) {
      prevSportH5MatchList.value = JSON.parse(JSON.stringify(respSportH5MatchList.value));
    } else {
      prevSportH5MatchList.value = new RespSportH5MatchList();
      isCompareEnabled.value = true; // 下次開始重新比對
    }

    reqSportH5MatchList.lang = langStore.current;
    reqSportH5MatchList.oddsType = Number(userStore.oddsType);

    apiSrv.post("/sport/h5/match/list", reqSportH5MatchList)
      .then((response) => {
        respSportH5MatchList.value = response.data;
      })
      .catch((error) => {
        errorHandling(error);
      })
      .finally(() => { });
  };

  const reqSportLeagueList = reactive(new ReqSportLeagueList());
  const respSportLeagueList = ref(new RespSportLeagueList());
  const getSportLeagueList = () => {
    userStore.loadingCount++;

    reqSportLeagueList.lang = langStore.current;
    apiSrv.post("/sport/league/list", reqSportLeagueList)
      .then((response) => {
        respSportLeagueList.value = response.data;
        leagueList.value = respSportLeagueList.value.datas.map(item => ({ ...item }));
      })
      .catch((error) => {
        errorHandling(error);
      })
      .finally(() => userStore.loadingCount--);
  };


  return {
    matchId,
    collapseSide,
    hasVideo,
    hasAni,
    viewMode,
    insightMode,
    needResetMatch,
    filterType,
    filterMap,
    sportTypeMap,
    allExpanded,
    activeNames,
    earlyFilterList,
    isCompareEnabled,
    leagueFilterName,
    leagueList,
    respSportMarketList,
    prevSportMarketList,
    reqSportMatchCount,
    respSportMatchCount,
    reqSportMatchList,
    respSportMatchList,
    prevSportMatchList,
    reqSportH5MatchList,
    respSportH5MatchList,
    prevSportH5MatchList,
    reqSportLeagueList,
    respSportLeagueList,
    toggleAll,
    handleMoreBets,
    handleShowVideo,
    handleShowAni,
    handleShowScore,
    handleShowInsight,
    getSportMarketList,
    getSportMatchCount,
    getSportMatchList,
    getSportH5MatchList,
    getSportLeagueList,
    leagueFilter,
    setEarlyFilter,
  };
});

