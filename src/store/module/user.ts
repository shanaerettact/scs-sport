import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { apiSrv, errorHandling } from '@/service';

export const useUserStore = defineStore('user-store', () => {
  const token = ref(localStorage.getItem('user_sessionKey'));
  const isLogin = computed(() => Boolean(token.value));
  const loadingCount = ref(0);
  const oddsType = ref(localStorage.getItem('odds_type') || '1');
  const player = ref(localStorage.getItem('player'));
  const balance = ref(0);
  const productId = ref('dcr');
  const sportType = ref(localStorage.getItem('sport_type') || '1');

  const sportTypeMap: Record<string, string> = {
    soccer: '1',
    basketball: '2',
    tennis: '3',
    volleyball: '4',
    tableTennis: '5',
    baseball: '6',
  };

  const getToken = () => {
    const storedToken = localStorage.getItem('user_sessionKey');

    if (!storedToken) {
      return '';
    }

    if (storedToken !== token.value) {
      token.value = storedToken;
    }
    return token.value;
  };

  const setOddsType = (val: string) => {
    oddsType.value = val;
    localStorage.setItem('odds_type', val);
  };

  const setSportType = (val: string) => {
    const type = sportTypeMap[val] ?? '1';
    sportType.value = type;
    localStorage.setItem('sport_type', type);
  };

  const getBalance = () => {
    apiSrv.post("/player/balance", { playerSessionKey: getToken() })
      .then((response) => {
        balance.value = response.data.balance;
      })
      .catch((error) => {
        errorHandling(error);
      })
      .finally(() => { });
  };

  const logout = () => {
    token.value = null;
    localStorage.removeItem('user_sessionKey');
    localStorage.removeItem('player');
    localStorage.removeItem('odds_type');
  };

  return {
    token,
    isLogin,
    loadingCount,
    oddsType,
    sportType,
    player,
    balance,
    productId,
    getToken,
    setOddsType,
    setSportType,
    getBalance,
    logout
  };
});

