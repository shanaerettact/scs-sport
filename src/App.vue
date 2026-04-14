<template>
  <n-config-provider :theme="themeStore.theme" :locale="langStore.naiveLocale" :date-locale="langStore.naiveDateLocale">
    <n-spin size="large" :show="userStore.loadingCount > 0" style="--n-opacity-spinning: 0.9">
      <n-message-provider>
        <RouterView />
      </n-message-provider>
    </n-spin>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider, NSpin } from 'naive-ui';
import { useThemeStore } from './store/module/theme';
import { onMounted } from 'vue';
import { useUserStore } from './store/module/user';
import { useLangStore } from './store/module/lang';

const langStore = useLangStore();
const themeStore = useThemeStore();
const userStore = useUserStore();

onMounted(() => {
  themeStore.initTheme();
});
</script>