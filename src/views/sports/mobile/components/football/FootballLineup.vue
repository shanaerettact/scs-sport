<template>
  <template v-if="respFootballLineup.hasLineupGraph"></template>
  <template v-else>
  </template>
  <div class="flex min-h-36">
    <n-empty size="large" class="m-auto"></n-empty>
  </div>
</template>

<script setup lang="ts">
import { ReqFootballLineup, RespFootballLineup } from '@/model/baseball';
import { apiSrv, errorHandling } from '@/service';
import { useLangStore } from '@/store/module/lang';
import { useMatchStore } from '@/store/module/match';
import { useUserStore } from '@/store/module/user';
import { NEmpty } from 'naive-ui';
import { computed, onMounted, reactive, ref, watch } from 'vue';

const userStore = useUserStore();
const matchStore = useMatchStore();
const langStore = useLangStore();

const reqFootballLineup = reactive(new ReqFootballLineup());
const respFootballLineup = ref(new RespFootballLineup());
const getFootballLineup = () => {
  userStore.loadingCount++;

  reqFootballLineup.productId = userStore.productId;
  reqFootballLineup.matchId = matchStore.matchId;
  reqFootballLineup.lang = langStore.current;

  apiSrv.post("/football/lineup", reqFootballLineup)
    .then((response) => {
      respFootballLineup.value = response.data;
    })
    .catch((error) => {
      errorHandling(error);
    })
    .finally(() => userStore.loadingCount--);
};

watch(() => matchStore.matchId, () => {
  getFootballLineup();
});

onMounted(() => {
  if (matchStore.matchId) {
    getFootballLineup();
  }
});
</script>

<style lang="scss" scoped></style>