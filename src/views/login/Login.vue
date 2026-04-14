<template>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/module/user';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { jwtDecode } from "jwt-decode";

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();

const initLogin = () => {
  const token = route.query.token as string;
  if (token) {
    const decode = jwtDecode<{ player: string, sessionKey: string; }>(token);
    localStorage.setItem('player', decode.player);
    localStorage.setItem('user_sessionKey', decode.sessionKey);
    userStore.player = decode.player;
    userStore.token = decode.sessionKey;
    userStore.setSportType('1');
    router.push('/sports/soccer');
  } else {
    userStore.setSportType('1');
    router.push('/sports/soccer');
  }
};

onMounted(() => {
  initLogin();
});
</script>

<style lang="scss" scoped></style>