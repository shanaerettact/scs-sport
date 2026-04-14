<template>
  <n-layout class="min-h-dvh">
    <n-layout-header bordered>
      <div class="header p-4">

        <div class="flex items-center gap-4">
          <div class="logo">Sports</div>
          <template v-for="item in respMenuProduct.datas">
            <div @click="marketFilter(item.productId)" class="sport-filter-btn min-w-[50px] justify-center" style="border-radius: 24px;" :class="{ 'is-active': item.productId === userStore.productId && activeKey }">{{ getLangText(item.productLangs, 'name') }}</div>
          </template>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center bg-surface rounded-full pe-2 py-0.5 space-x-2" v-if="userStore.isLogin">
            <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-black">$</div>
            <span class="font-bold">{{ numberFormate(userStore.balance) }}</span>
            <n-button text :class="{ 'animate-spin': isRefreshBalance }" @click="handleRefreshBalance">
              <n-icon size="18" v-html="Refresh"></n-icon>
            </n-button>
          </div>

          <!-- 投注單浮動按鈕 -->
          <BetSlipFloating />

          <n-button @click="router.push('/match-result')">{{ $t('label.matchResult') }}</n-button>
          <n-button :disabled="!userStore.isLogin" @click="router.push('/bet-history')">{{ $t('label.betHistory') }}</n-button>
          <n-select v-model:value="langValue" :options="langOptions" :consistent-menu-width="false" :render-label="renderLangLabel" />
          <n-select v-model:value="oddsTypeValue" :options="marketMap.get(userStore.productId)?.oddsOptions" :consistent-menu-width="false" :render-label="(option: any) => $t(option.label)" @update:value="oddsTypeChange" style="width: 100px;" />
          <n-button @click="themeStore.setDark">{{ $t('label.darkTheme') }}</n-button>
          <n-button @click="themeStore.setLight">{{ $t('label.lightTheme') }}</n-button>
        </div>
      </div>
    </n-layout-header>

    <n-layout has-sider>
      <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="true">
        <n-menu :value="activeKey" :options="sportsMenuOptions" :collapsed="true" :collapsed-width="64" :width="240" @update:value="handleMenuSelect" />
      </n-layout-sider>
      <n-layout-content style="background-color: var(--color-background-color)">
        <router-view v-slot="{ Component }">
          <component :is="Component" ref="currentPageRef" />
        </router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>

</template>

<script lang="ts" setup>
import { computed, h, onMounted, reactive, ref, watch, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getSportsMenuOptions } from '../menu';
import { NButton, NIcon, NLayout, NLayoutContent, NLayoutHeader, NLayoutSider, NMenu, NSelect } from 'naive-ui';
import { useThemeStore } from '@/store/module/theme';
import { apiSrv, errorHandling, getLangText, numberFormate } from '@/service';
import { useLangStore } from '@/store/module/lang';
import { useUserStore } from '@/store/module/user';
import { useI18n } from 'vue-i18n';
import Refresh from "@/assets/ionIcons5/Refresh.svg?raw";
import BetSlipFloating from '@/views/sports/pc/components/BetSlipFloating.vue';
import { ReqMenuProduct, RespMenuProduct } from '@/model/menu';
import { useMatchStore } from '@/store/module/match';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const langStore = useLangStore();
const themeStore = useThemeStore();
const matchStore = useMatchStore();

const currentPageRef = ref();
const sportsMenuOptions = computed(() => getSportsMenuOptions(t));
const isRefreshBalance = ref(false);

const marketMap = new Map([
  ['fb', {
    label: "FB",
    oddsOptions: [
      { label: 'odds_type.1', value: '1' },
      { label: 'odds_type.2', value: '2' }
    ]
  }],
  ['dcr', {
    label: "DCR",
    oddsOptions: [
      { label: 'odds_type.1', value: '1' },
      { label: 'odds_type.2', value: '2' }
    ]
  }],
  ['livesports', {
    label: "LiveSports",
    oddsOptions: [
      { label: 'odds_type.1', value: '1' },
    ]
  }],
  ['db', {
    label: "DB",
    oddsOptions: [
      { label: 'odds_type.2', value: '2' },
    ]
  }],
]);

const langValue = computed({
  get: () => langStore.current,
  set: (val) => langStore.setLang(val)
});
const langOptions = [
  { label: '中文', value: 'zh_cn', flag: `/images/flag/chn.webp` },
  { label: 'English', value: 'en', flag: `/images/flag/usa.webp` },
];

const oddsTypeValue = computed({
  get: () => userStore.oddsType,
  set: (val) => userStore.setOddsType(val)
});

const marketFilter = (type: any) => {
  if (activeKey.value == '') {
    userStore.productId = type;
    handleMenuSelect('soccer');
    return;
  }

  userStore.setOddsType(marketMap.get(type)?.oddsOptions[0].value as string);
  userStore.productId = type;
  matchStore.reqSportMatchList.productId = type;
  matchStore.reqSportMatchList.pageIndex = 1;
  matchStore.getSportMatchList();

  matchStore.reqSportMatchCount.productId = type;
  matchStore.getSportMatchCount();
};

const oddsTypeChange = () => {
  matchStore.isCompareEnabled = false;
  matchStore.reqSportMatchList.oddsType = Number(oddsTypeValue.value);
  matchStore.getSportMatchList();
};

const activeKey = ref(route.params.sport as string || '');

const reqMenuProduct = reactive(new ReqMenuProduct());
const respMenuProduct = ref(new RespMenuProduct());
const getMenuProduct = () => {
  userStore.loadingCount++;

  apiSrv.post("/menu/product", reqMenuProduct)
    .then((response) => {
      respMenuProduct.value = response.data;
      userStore.productId = respMenuProduct.value.datas[0].productId;
    })
    .catch((error) => {
      errorHandling(error);
    })
    .finally(() => userStore.loadingCount--);
};

watchEffect(() => {
  const sportParam = route.params.sport;
  activeKey.value = typeof sportParam === 'string' ? sportParam : '';
});

watch(
  () => [userStore.productId, oddsTypeValue.value],
  ([productId, currOddsType]) => {
    const options = marketMap.get(productId)?.oddsOptions ?? [];
    const isValid = options.some(opt => opt.value === currOddsType);

    if (!isValid && options.length > 0) {
      oddsTypeValue.value = options[0].value;
    }
  },
  { immediate: true }
);

onMounted(() => {
  getMenuProduct();
  if (userStore.isLogin) {
    userStore.getBalance();
  }
});

function handleMenuSelect(key: string) {
  userStore.setSportType(key);
  matchStore.activeNames = [];
  matchStore.collapseSide = false;
  router.push(`/sports/${key}`);
}

function renderLangLabel(option: any) {
  return h('div', { style: 'display: flex; align-items: center;' }, [
    h('img', {
      src: option.flag,
      alt: option.label,
      style: 'width: 20px; height: 14px; margin-right: 8px;'
    }),
    h('span', null, option.label)
  ]);
}

function handleRefreshBalance() {
  userStore.getBalance();
  isRefreshBalance.value = true;
  setTimeout(() => {
    isRefreshBalance.value = false;
  }, 1000);
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    font-size: 20px;
  }

  .user {
    font-size: 14px;
  }
}

.n-layout-sider {
  min-height: calc(100dvh - 75px);
}
</style>
