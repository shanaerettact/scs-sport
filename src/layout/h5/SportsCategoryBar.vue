<template>
  <div class="bg-[var(--color-surface)] border-b border-[var(--color-border-subtle)]">
    <div
      class="flex items-center gap-1 overflow-x-auto px-3 py-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <button
        v-for="sport in sports"
        :key="sport.key"
        class="group relative flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-all duration-200 outline-none [-webkit-tap-highlight-color:transparent] active:scale-[0.93]"
        :class="activeSport === sport.key
          ? 'border-[var(--color-primary-border)] bg-[var(--color-primary-tint)] text-[var(--color-primary)] shadow-[0_0_0_1px_var(--color-primary-border),0_2px_8px_var(--color-primary-glow)]'
          : 'border-transparent text-[var(--color-subtle)] hover:border-[var(--color-border-subtle)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-main)]'"
        :aria-pressed="activeSport === sport.key"
        :aria-label="sport.label"
        @click="activeSport = sport.key"
      >
        <img
          :src="sport.icon"
          :alt="sport.label"
          class="h-[16px] w-[16px] shrink-0 object-contain transition-all duration-200"
          :class="activeSport === sport.key
            ? 'opacity-100 drop-shadow-[0_0_4px_var(--color-primary-glow)]'
            : 'opacity-55 grayscale group-hover:opacity-80 group-hover:grayscale-[40%]'"
        />
        <span class="whitespace-nowrap leading-none">{{ sport.label }}</span>

        <!-- Active dot indicator -->
        <span
          class="absolute -bottom-[9px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--color-primary)] transition-all duration-200"
          :class="activeSport === sport.key ? 'opacity-100 scale-100' : 'opacity-0 scale-0'"
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
