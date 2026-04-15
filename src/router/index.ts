import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/sports',
      component: () => import('@/layout/Layout.vue'),
      children: [
        {
          path: ':sport', // 動態運動項目
          name: 'sport',
          component: () => import('@/views/sports/Sports.vue')
        }
      ]
    },
    {
      path: '/bet-history',
      component: () => import('@/layout/Layout.vue'),
      children: [
        {
          path: '',
          name: 'bet-history',
          component: () => import('@/views/bet-history/BetHistory.vue')
        }
      ]
    },
    {
      path: '/match-result',
      component: () => import('@/layout/Layout.vue'),
      children: [
        {
          path: '',
          name: 'match-result',
          component: () => import('@/views/match-result/MatchResult.vue')
        }
      ]
    },
    {
      path: '/h5',
      name: 'h5',
      component: () => import('@/layout/h5/index.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
});

export default router;
