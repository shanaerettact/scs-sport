<template>
  <div class="border-b border-[var(--color-surface-hover)] bg-transparent py-1.5 pb-1">
    <div
      class="flex items-start gap-0.5 overflow-x-auto px-2.5 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <button
        v-for="sport in sports"
        :key="sport.key"
        class="group relative flex shrink-0 cursor-pointer flex-col items-center gap-0.5 rounded-[10px] border border-transparent bg-transparent p-1.5 px-2 pb-1.5 pt-1.5 transition-[background-color,border-color,transform,box-shadow,filter] duration-[180ms] ease-in-out outline-none [-webkit-tap-highlight-color:transparent] active:scale-[0.91] hover:border-[var(--color-surface-hover)] hover:bg-[var(--color-surface-hover)] data-[on=true]:border-[var(--color-primary-border)] data-[on=true]:bg-[var(--color-primary-tint)] data-[on=true]:shadow-[0_1px_6px_var(--color-primary-glow)]"
        :data-on="activeSport === sport.key"
        @click="activeSport = sport.key"
        :aria-pressed="activeSport === sport.key"
        :aria-label="sport.label"
      >
        <span
          class="relative flex h-[30px] w-[30px] items-center justify-center rounded-lg border border-transparent bg-transparent transition-[background-color,border-color,box-shadow] dark:bg-[var(--color-surface-soft)] group-data-[on=true]:border-[var(--color-primary-border)] group-data-[on=true]:bg-[var(--color-primary-tint)] dark:group-data-[on=true]:bg-[var(--color-primary-tint)] group-data-[on=true]:group-hover:border-[var(--color-primary-border)] group-data-[on=true]:group-hover:bg-[var(--color-primary-tint)] group-hover:border-[var(--color-surface-hover)] group-hover:bg-[var(--color-surface-hover)]"
        >
          <img
            :src="sport.icon"
            :alt="sport.label"
            class="h-[18px] w-[18px] object-contain opacity-75 grayscale transition-[filter,opacity] duration-[180ms] group-hover:opacity-90 group-hover:grayscale-[15%] group-data-[on=true]:opacity-100 group-data-[on=true]:grayscale-0 group-data-[on=true]:drop-shadow-[0_0_4px_var(--color-primary-glow)]"
          />
        </span>
        <span
          class="text-[10px] font-medium tracking-wide whitespace-nowrap text-[var(--color-subtle)] transition-[color,font-weight] group-data-[on=true]:font-bold group-data-[on=true]:text-[var(--color-primary)]"
        >{{ sport.label }}</span>
        <span
          class="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 scale-0 rounded-full bg-[var(--color-primary)] opacity-0 transition-[opacity,transform] group-data-[on=true]:scale-100 group-data-[on=true]:opacity-100"
          aria-hidden="true"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeSport = ref('soccer');

const sports = [
  { key: 'soccer',      label: '足球',   icon: '/images/sports/soccer.png' },
  { key: 'basketball',  label: '籃球',   icon: '/images/sports/basketball.png' },
  { key: 'tennis',      label: '網球',   icon: '/images/sports/tennis.png' },
  { key: 'volleyball',  label: '排球',   icon: '/images/sports/volleyball.png' },
  { key: 'tableTennis', label: '乒乓球', icon: '/images/sports/table-tennis.png' },
  { key: 'baseball',    label: '棒球',   icon: '/images/sports/baseball.png' },
  { key: 'badminton',   label: '羽毛球', icon: '/images/sports/badminton.png' },
];
</script>
