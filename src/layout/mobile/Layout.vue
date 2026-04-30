<template>
  <n-layout class="min-h-dvh">
    <n-layout-header bordered>
      <div class="header p-4">
        <div class="flex items-center gap-4">
          <div class="logo">Sports</div>
        </div>
        <div class="flex gap-2">
          <n-button text @click="betStore.floatBetting = true">
            <n-icon size="28" v-html="SlideText20Regular"></n-icon>
          </n-button>
          <n-button text @click="activeDrawer = true">
            <n-icon size="28" v-html="Menu"></n-icon>
          </n-button>
        </div>
      </div>

      <n-drawer v-model:show="activeDrawer" :width="280" placement="right">
        <n-drawer-content closable>
          <div class="flex flex-col gap-4 p-2">

            <div v-if="userStore.isLogin" class="w-fit flex items-center bg-surface rounded-full m-auto pe-2 py-1 ps-2 gap-2 shadow-sm">
              <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-black font-bold">$</div>
              <span class="font-bold">{{ numberFormate(userStore.balance) }}</span>
              <n-button text :class="{ 'animate-spin': isRefreshBalance }" @click="handleRefreshBalance">
                <n-icon size="18" v-html="Refresh"></n-icon>
              </n-button>
            </div>

            <n-divider>{{ $t('label.menu') }}</n-divider>
            <div class="flex flex-col gap-2">
              <n-button block @click="router.push('/match-result')">
                {{ $t('label.matchResult') }}
              </n-button>
              <n-button block :disabled="!userStore.isLogin" @click="router.push('/bet-history')">
                {{ $t('label.betHistory') }}
              </n-button>
            </div>

            <n-divider>{{ $t('label.settings') }}</n-divider>
            <div class="flex flex-col gap-3">
              <n-select v-model:value="langValue" :options="langOptions" :consistent-menu-width="false" :render-label="renderLangLabel" size="small" />
              <n-select v-model:value="oddsTypeValue" :options="marketMap.get(userStore.productId)?.oddsOptions" :consistent-menu-width="false" :render-label="(option: any) => $t(option.label)" @update:value="oddsTypeChange" size="small" />

              <div class="flex items-center justify-between">
                <span>{{ $t('label.darkTheme') }}</span>
                <n-switch :value="themeStore.isDark" @update:value="(val) => val ? themeStore.setDark() : themeStore.setLight()" />
              </div>
            </div>
          </div>
        </n-drawer-content>
      </n-drawer>
    </n-layout-header>

    <BetSlipDrawer />

    <n-layout>
      <div class="mb-3 px-3 space-y-2">
        <n-tabs v-if="respMenuProduct.datas.length > 0" :default-value="respMenuProduct.datas[0].productId" type="bar" animated>
          <n-tab v-for="item in respMenuProduct.datas" :key="item.productId" :name="item.productId" @click="productFilter(item.productId)">{{ getLangText(item.productLangs, 'name') }}</n-tab>
        </n-tabs>
        <div class="flex gap-2 overflow-x-auto">
          <template v-for="item in sportsMenuOptions">
            <div class="sport-filter-btn gap-1" :class="{ 'is-active': item.key === activeKey }" @click="handleMenuSelect(item.key)">
              <component :is="item.icon" />
              <span>{{ item.label }}</span>
            </div>
          </template>
        </div>
      </div>
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
import { NButton, NDivider, NDrawer, NDrawerContent, NIcon, NLayout, NLayoutContent, NLayoutHeader, NMenu, NSelect, NSwitch, NTab, NTabs } from 'naive-ui';
import { useThemeStore } from '@/store/module/theme';
import { apiSrv, errorHandling, getLangText, numberFormate } from '@/service';
import { useLangStore } from '@/store/module/lang';
import { useUserStore } from '@/store/module/user';
import { useI18n } from 'vue-i18n';
import { ReqMenuProduct, RespMenuProduct } from '@/model/menu';
import { useMatchStore } from '@/store/module/match';
import { useBetStore } from '@/store/module/bet';
import BetSlipDrawer from '@/views/sports/mobile/components/BetSlipDrawer.vue';
import Refresh from "@/assets/ionIcons5/Refresh.svg?raw";
import Menu from "@/assets/ionIcons5/Menu.svg?raw";
import SlideText20Regular from "@/assets/fluent/SlideText20Regular.svg?raw";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const langStore = useLangStore();
const themeStore = useThemeStore();
const matchStore = useMatchStore();
const betStore = useBetStore();

const currentPageRef = ref();
const sportsMenuOptions = computed(() => getSportsMenuOptions(t));
const isRefreshBalance = ref(false);
const activeDrawer = ref(false);

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

const productFilter = (type: any) => {
  if (activeKey.value == '') {
    userStore.productId = type;
    handleMenuSelect('soccer');
    return;
  }

  userStore.setOddsType(marketMap.get(type)?.oddsOptions[0].value as string);
  userStore.productId = type;
  matchStore.reqSportH5MatchList.productId = type;
  matchStore.reqSportH5MatchList.pageIndex = 1;
  matchStore.getSportH5MatchList();

  matchStore.reqSportMatchCount.productId = type;
  matchStore.getSportMatchCount();
};

const oddsTypeChange = () => {
  matchStore.isCompareEnabled = false;
  matchStore.reqSportH5MatchList.oddsType = Number(oddsTypeValue.value);
  matchStore.getSportH5MatchList();
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
</style>
