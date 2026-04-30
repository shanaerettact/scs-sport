<template>
  <div class="flex flex-col gap-[7px] px-2.5 pb-3">
    <div
      class="sticky top-0 z-[9] -mx-2.5 flex flex-col gap-[7px] bg-[var(--color-background-color)] px-2.5 pb-1.5 pt-2 shadow-[var(--color-sticky-shadow)]"
    >
      <div
        class="rounded-xl border border-[var(--color-surface-hover)] bg-gradient-to-br from-[color-mix(in_srgb,var(--color-surface-soft)_95%,var(--color-primary)_5%)] to-[var(--color-surface-soft)] p-2 px-2 py-[7px] shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.08)] transition-shadow duration-300 dark:from-[color-mix(in_srgb,var(--color-surface-soft)_95%,var(--color-primary)_3%)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]"
      >
        <div class="flex flex-row items-center gap-1">
          <div class="flex min-w-0 flex-1 flex-nowrap gap-1">
          <button
            v-for="opt in rangeOptions"
            :key="opt.key"
            type="button"
            class="min-h-[26px] min-w-0 flex-1 basis-0 rounded-full border px-1 py-1 text-center text-[10.5px] font-semibold leading-none tracking-wide transition-[color,background,border-color,box-shadow,font-weight] duration-200 [-webkit-tap-highlight-color:transparent] active:opacity-80"
            :class="
              activePreset === opt.key
                ? 'border-[color:color-mix(in_srgb,var(--color-primary)_60%,transparent)] bg-[var(--color-primary-soft)] font-bold text-[var(--color-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_0_1px_var(--color-primary-glow)]'
                : 'border-[var(--color-surface-hover)] bg-[var(--color-surface-soft)] text-[var(--color-subtle)]'
            "
            @click="onSelect(opt.key)"
          >
            {{ opt.label }}
          </button>
        </div>
          <button
            type="button"
            class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--color-surface-hover)] bg-[var(--color-surface-soft)] text-[var(--color-subtle)] transition-[color,background,border-color,box-shadow] duration-200 [-webkit-tap-highlight-color:transparent] active:opacity-80 [@media(hover:hover)]:hover:border-[color:color-mix(in_srgb,var(--color-primary)_45%,transparent)] [@media(hover:hover)]:hover:text-[var(--color-primary)]"
            aria-label="选择日期"
            @click="onCalendarClick"
          >
            <svg
              class="h-[15px] w-[15px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </button>
        </div>
      </div>

      <div
        class="flex items-stretch rounded-[10px] border border-[var(--color-surface-hover)] bg-[var(--color-surface-soft)] px-[7px] py-1.5 shadow-[0_1px_4px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[8px] dark:shadow-[0_1px_4px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.03)]"
      >
        <div class="flex min-w-0 flex-1 items-center px-0.5">
          <div class="user-select-none flex items-center gap-1.5 px-1 py-0.5 [-webkit-user-select:none]">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="h-[13px] w-[13px] shrink-0 text-[color-mix(in_srgb,var(--color-primary)_65%,var(--color-subtle))] [filter:drop-shadow(0_0_2px_color-mix(in_srgb,var(--color-primary)_25%,transparent))]" aria-hidden="true">
              <rect x="2" y="3" width="12" height="11" rx="1.5" />
              <path d="M11 1.5v3M5 1.5v3M2 6.5h12" />
            </svg>
            <span class="whitespace-nowrap text-xs font-bold leading-none tracking-wide text-[var(--color-main)] [text-shadow:0_1px_2px_rgba(0,0,0,0.03)]">{{ displayDateRange }}</span>
          </div>
        </div>

        <div
          class="mx-1.5 h-6 w-px shrink-0 self-center bg-gradient-to-b from-transparent from-20% via-[var(--color-surface-hover)] via-20% to-transparent to-80% [background:linear-gradient(180deg,transparent_0%,var(--color-surface-hover)_20%,var(--color-surface-hover)_80%,transparent_100%)]"
        />

        <div class="flex shrink-0 items-center gap-1.5">
          <div
            class="inline-flex items-center gap-0.5 rounded-lg bg-[color-mix(in_srgb,var(--color-surface-hover)_40%,transparent)] p-0.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.18)]"
            role="tablist"
            aria-label="时间排序"
          >
            <button
              type="button"
              role="tab"
              class="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border-none px-2 py-1.5 text-[10.5px] font-bold leading-none tracking-wider transition-[color,background-color,box-shadow,transform] duration-200 [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[color-mix(in_srgb,var(--color-primary)_60%,transparent)] active:scale-[0.94]"
              :class="
                timeSort === 'newest'
                  ? 'bg-gradient-to-br from-[var(--color-primary)] to-[color-mix(in_srgb,var(--color-primary)_90%,white)] text-[var(--color-on-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.42),0_2px_8px_color-mix(in_srgb,var(--color-primary)_40%,transparent),0_0_0_1px_color-mix(in_srgb,var(--color-primary)_30%,transparent)] [&_svg]:drop-shadow-[0_1px_1px_rgba(0,0,0,0.12)]'
                  : 'bg-transparent text-[var(--color-subtle)] hover:bg-[color-mix(in_srgb,var(--color-surface-hover)_50%,transparent)] hover:text-[var(--color-main)]'
              "
              :aria-selected="timeSort === 'newest'"
              @click="setTimeSort('newest')"
            >
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-[9px] w-[9px] shrink-0 transition-transform duration-200" aria-hidden="true">
                <path d="M6 1v10M3 4 6 1l3 3" />
              </svg>
              <span class="leading-none">较新</span>
            </button>
            <button
              type="button"
              role="tab"
              class="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border-none px-2 py-1.5 text-[10.5px] font-bold leading-none tracking-wider transition-[color,background-color,box-shadow,transform] duration-200 [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[color-mix(in_srgb,var(--color-primary)_60%,transparent)] active:scale-[0.94]"
              :class="
                timeSort === 'oldest'
                  ? 'bg-gradient-to-br from-[var(--color-primary)] to-[color-mix(in_srgb,var(--color-primary)_90%,white)] text-[var(--color-on-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.42),0_2px_8px_color-mix(in_srgb,var(--color-primary)_40%,transparent),0_0_0_1px_color-mix(in_srgb,var(--color-primary)_30%,transparent)] [&_svg]:drop-shadow-[0_1px_1px_rgba(0,0,0,0.12)]'
                  : 'bg-transparent text-[var(--color-subtle)] hover:bg-[color-mix(in_srgb,var(--color-surface-hover)_50%,transparent)] hover:text-[var(--color-main)]'
              "
              :aria-selected="timeSort === 'oldest'"
              @click="setTimeSort('oldest')"
            >
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-[9px] w-[9px] shrink-0 transition-transform duration-200" aria-hidden="true">
                <path d="M6 11V1M3 8l3 3 3-3" />
              </svg>
              <span class="leading-none">较旧</span>
            </button>
          </div>

          <button
            type="button"
            class="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-[1.5px] border-transparent bg-[color-mix(in_srgb,var(--color-surface-hover)_35%,transparent)] text-[var(--color-subtle)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-200 [-webkit-tap-highlight-color:transparent] active:scale-[0.92] [@media(hover:hover)]:hover:border-[color-mix(in_srgb,var(--color-primary)_40%,transparent)] [@media(hover:hover)]:hover:bg-[color-mix(in_srgb,var(--color-primary)_15%,var(--color-surface-hover))] [@media(hover:hover)]:hover:text-[var(--color-primary)] [@media(hover:hover)]:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_6px_color-mix(in_srgb,var(--color-primary)_20%,transparent)]"
            :class="
              selectedTeams.length > 0
                ? 'border-[color-mix(in_srgb,var(--color-primary)_50%,transparent)] bg-gradient-to-br from-[color-mix(in_srgb,var(--color-primary)_18%,var(--color-surface-soft))] to-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-surface-soft))] text-[var(--color-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_8px_color-mix(in_srgb,var(--color-primary)_28%,transparent)]'
                : ''
            "
            aria-label="筛选联赛"
            @click="showTeamFilter = true"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5" aria-hidden="true">
              <path d="M2 4h16M5 8h10M8 12h4M10 16h0" />
            </svg>
            <span
              v-if="selectedTeams.length > 0"
              class="absolute -right-1 -top-1 flex h-[15px] min-w-[15px] animate-badge-pulse items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[color-mix(in_srgb,var(--color-primary)_85%,white)] px-1 text-[8.5px] font-extrabold leading-none text-[var(--color-on-primary)] shadow-[0_0_0_2px_var(--color-surface-soft),0_2px_6px_color-mix(in_srgb,var(--color-primary)_45%,transparent)]"
            >{{ selectedTeams.length }}</span>
          </button>

          <button
            type="button"
            class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-[1.5px] border-transparent bg-[color-mix(in_srgb,var(--color-surface-hover)_35%,transparent)] text-[var(--color-subtle)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-200 [-webkit-tap-highlight-color:transparent] active:scale-[0.92] disabled:cursor-not-allowed disabled:opacity-40 [@media(hover:hover)]:enabled:hover:border-[color-mix(in_srgb,var(--color-primary)_40%,transparent)] [@media(hover:hover)]:enabled:hover:bg-[color-mix(in_srgb,var(--color-primary)_15%,var(--color-surface-hover))] [@media(hover:hover)]:enabled:hover:text-[var(--color-primary)] [@media(hover:hover)]:enabled:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_6px_color-mix(in_srgb,var(--color-primary)_20%,transparent)]"
            :class="
              isEveryMatchStatOpen
                ? 'border-[color-mix(in_srgb,var(--color-primary)_50%,transparent)] bg-gradient-to-br from-[color-mix(in_srgb,var(--color-primary)_18%,var(--color-surface-soft))] to-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-surface-soft))] text-[var(--color-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_8px_color-mix(in_srgb,var(--color-primary)_28%,transparent)]'
                : ''
            "
            :disabled="allMatchStatIds.length === 0"
            :aria-expanded="isEveryMatchStatOpen"
            :aria-label="isEveryMatchStatOpen ? '收合全部技术统计' : '展开全部技术统计'"
            :title="isEveryMatchStatOpen ? '收合全部统计' : '展开全部统计'"
            @click="toggleAllMatchStats"
          >
            <svg
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              stroke-width="1.65"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-[11px] w-[11px] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              :class="isEveryMatchStatOpen ? 'rotate-180' : 'rotate-0'"
              aria-hidden="true"
            >
              <path d="M3 4.5L6 1.5 9 4.5" />
              <path d="M3 7.5L6 10.5 9 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <section class="flex flex-col gap-3.5" aria-label="赛事与技术统计">
      <article
        v-for="sec in demoMatchSections"
        :key="sec.id"
        class="relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-surface-hover)_82%,var(--color-primary)_10%)] pl-2.5 shadow-[0_4px_18px_rgba(0,0,0,0.065),inset_0_1px_0_rgba(255,255,255,0.09)] dark:border-[color-mix(in_srgb,var(--color-surface-hover)_65%,var(--color-background-color)_35%)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.04)]"
        :class="sec.cardShell"
      >
        <div
          class="absolute left-0 top-0 h-full w-[3px] rounded-l-2xl"
          :class="sec.accentStripe"
          aria-hidden="true"
        />
        <div
          class="relative px-2.5 pt-2 [background:radial-gradient(115%_75%_at_50%_-25%,color-mix(in_srgb,var(--color-primary)_11%,transparent),transparent_52%)]"
          :class="sec.headerTint"
        >
          <div class="flex justify-center pb-1">
            <div
              class="inline-flex max-w-full items-center justify-center gap-1 rounded-full border border-[color-mix(in_srgb,var(--color-surface-hover)_42%,transparent)] bg-[color-mix(in_srgb,var(--color-surface-hover)_14%,transparent)] px-2.5 py-0.5 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.06),0_0_0_1px_color-mix(in_srgb,var(--color-primary)_12%,transparent)]"
            >
              <div
                class="flex h-4.5 w-4.5 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/90 bg-white p-0.5 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_0_0_0.5px_rgba(0,0,0,0.05)] [isolation:isolate] dark:border-white/20 dark:bg-[#f0eef5] dark:shadow-[0_1px_4px_rgba(0,0,0,0.45),0_0_0_0.5px_rgba(255,255,255,0.08)]"
              >
                <img
                  v-if="sec.leagueLogo"
                  :src="sec.leagueLogo"
                  :alt="sec.leagueTitle"
                  class="h-full w-full object-contain [filter:drop-shadow(0_0_0.5px_rgba(0,0,0,0.12))] dark:[filter:drop-shadow(0_0_0.5px_rgba(0,0,0,0.35))]"
                />
              </div>
              <span
                class="line-clamp-1 min-w-0 text-center text-[10.5px] font-extrabold leading-none tracking-[0.1em] text-[var(--color-main)]/95 [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]"
              >{{ sec.leagueTitle }}</span>
            </div>
          </div>
        </div>

        <div
          v-for="(m, mi) in sec.matches"
          :key="m.id"
          :class="mi > 0 ? 'border-t border-[var(--color-surface-hover)]/75' : ''"
        >
          <div class="flex min-w-0 items-center gap-1.5 px-1.5 pb-1 pt-1">
            <div
              class="inline-flex max-w-full shrink-0 flex-nowrap items-center gap-1 whitespace-nowrap border-r border-[color-mix(in_srgb,var(--color-surface-hover)_65%,transparent)] pr-2 [box-shadow:1px_0_0_rgba(255,255,255,0.04)] dark:[box-shadow:1px_0_0_rgba(255,255,255,0.03)]"
              role="group"
              :aria-label="`开赛时间 ${m.matchDateText}  ${m.matchTimeText}  ${m.timeZoneLabel}`"
            >
              <span
                class="max-w-[3.75rem] shrink-0 truncate rounded-md border border-[color-mix(in_srgb,var(--color-primary)_28%,var(--color-surface-hover))] bg-[color-mix(in_srgb,var(--color-primary)_9%,var(--color-surface-soft))] px-1 py-px text-[8px] font-extrabold uppercase leading-none tracking-[0.06em] text-[color-mix(in_srgb,var(--color-main)_72%,#020617)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] dark:border-[color-mix(in_srgb,var(--color-primary)_35%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-primary)_14%,transparent)] dark:text-[color-mix(in_srgb,var(--color-main)_62%,#020617)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              >{{ m.timeZoneLabel }}</span>
              <span class="shrink-0 text-[10px] font-extrabold tabular-nums leading-none tracking-tight text-[color-mix(in_srgb,var(--color-main)_68%,#020617)] [text-shadow:0_1px_1px_rgba(15,23,42,0.04)] dark:text-[color-mix(in_srgb,var(--color-main)_58%,#020617)] dark:[text-shadow:none]">{{ m.matchDateText }} {{ m.matchTimeText }}</span>
            </div>
            <div class="flex min-w-0 flex-1 items-center gap-1">
              <div class="w-full min-w-0 text-center">
                <div class="mb-px flex justify-start">
                  <div class="inline-flex min-w-0 max-w-full items-center gap-0.5">
                    <span
                      class="min-w-0 truncate text-left text-[12px] font-extrabold leading-tight text-[var(--color-main)]"
                    >{{ m.home }}</span>
                  </div>
                </div>
              </div>
              <div
                class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--color-primary)_15%,var(--color-surface-hover))] bg-gradient-to-br from-[color-mix(in_srgb,var(--color-primary)_8%,var(--color-surface-soft))] to-[var(--color-surface-soft)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm"
              >
                <img
                  src="/images/sports/homeTeam.png"
                  alt="主队"
                  class="h-[18px] w-[18px] object-contain"
                />
              </div>
            </div>

            <div class="flex shrink-0 flex-col items-center gap-0.5 px-1">
              <div class="flex items-baseline gap-0.5">
                <span
                  class="text-[1.35rem] font-extrabold leading-none tabular-nums tracking-tight text-[var(--color-main)] [text-shadow:0_1px_2px_rgba(15,23,42,0.06)]"
                >{{ m.homeScore }}</span>
                <span class="self-center text-[11px] font-bold leading-none text-[var(--color-subtle)]">-</span>
                <span
                  class="text-[1.35rem] font-extrabold leading-none tabular-nums tracking-tight text-[var(--color-main)] [text-shadow:0_1px_2px_rgba(15,23,42,0.06)]"
                >{{ m.awayScore }}</span>
              </div>
            </div>

            <div class="flex min-w-0 flex-1 items-center gap-1">
              <div
                class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[var(--color-surface-hover)] bg-gradient-to-br from-[var(--color-surface-soft)] to-[color-mix(in_srgb,var(--color-surface-soft)_96%,var(--color-subtle)_4%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm"
              >
                <img
                  src="/images/sports/awayTeam.png"
                  alt="客队"
                  class="h-[18px] w-[18px] object-contain"
                />
              </div>
              <div class="w-full min-w-0 text-center">
                <div class="mb-px flex">
                  <div class="inline-flex min-w-0 max-w-full items-center gap-0.5">
                    <span
                      class="min-w-0 truncate text-right text-[12px] font-extrabold leading-tight text-[var(--color-main)]"
                    >{{ m.away }}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              class="match-stat-toggle flex h-4 w-4 shrink-0 items-center justify-center rounded-lg border border-[var(--color-surface-hover)] bg-[color-mix(in_srgb,var(--color-surface-hover)_18%,transparent)] text-[var(--color-subtle)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-[color,background-color,border-color,box-shadow,transform] duration-200 [-webkit-tap-highlight-color:transparent] hover:border-[color-mix(in_srgb,var(--color-primary)_35%,transparent)] hover:text-[var(--color-primary)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_color-mix(in_srgb,var(--color-primary)_16%,transparent)] active:scale-[0.92] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[color-mix(in_srgb,var(--color-primary)_45%,transparent)]"
              :aria-expanded="isMatchStatOpen(m.id)"
              :aria-controls="`match-stat-details-${m.id}`"
              :title="isMatchStatOpen(m.id) ? '收合技术统计' : '展开技术统计'"
              @click="toggleMatchStat(m.id)"
            >
              <svg
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="match-stat-toggle__icon h-[15px] w-[15px] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                :class="isMatchStatOpen(m.id) ? 'rotate-180' : 'rotate-0'"
                aria-hidden="true"
              >
                <path d="M2.5 4.25L6 7.75l3.5-3.5" />
              </svg>
            </button>
          </div>
          <div
            :class="[
              'match-stat-details-grid relative grid transition-[grid-template-rows] duration-300 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]',
              isMatchStatOpen(m.id) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
            ]"
          >
            <div class="min-h-0 overflow-hidden">
              <div
                :id="`match-stat-details-${m.id}`"
                :aria-hidden="!isMatchStatOpen(m.id)"
                class="border-t border-[var(--color-surface-hover)]/90 bg-gradient-to-b from-[color-mix(in_srgb,var(--color-surface-hover)_7%,transparent)] to-transparent px-2.5 pt-1 pb-1.5 mb-3 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.04)]"
                aria-label="分阶段技术统计"
              >
                <div
                  class="overflow-hidden rounded-md border border-[var(--color-surface-hover)]/40 bg-[color-mix(in_srgb,var(--color-surface-soft)_50%,transparent)] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.05)] divide-y divide-[var(--color-surface-hover)]/30"
                >
                  <div
                    class="grid grid-cols-[2.25rem_1fr_1fr_1fr] items-center gap-0.5 bg-[color-mix(in_srgb,var(--color-surface-hover)_10%,transparent)] px-0.5 py-0.5"
                  >
                    <span class="text-center text-[11px] font-extrabold leading-none tracking-tight text-[var(--color-subtle)]">项目</span>
                    <span
                      v-for="h in phaseScoreHeaders"
                      :key="`${m.id}-${h}`"
                      class="text-center text-[11px] font-extrabold leading-none tracking-tight text-[var(--color-subtle)]"
                    >{{ h }}</span>
                  </div>
                  <div
                    v-for="row in m.statRows"
                    :key="`${m.id}-${row.id}`"
                    :class="[
                      'grid grid-cols-[2.25rem_1fr_1fr_1fr] items-center gap-0.5 px-0.5 py-[4px]',
                      row.edge,
                    ]"
                  >
                    <div
                      :class="[
                        'mx-auto flex h-[20px] w-full min-w-0 max-w-[2.5rem] items-center justify-center rounded px-0.5 text-[10px] font-extrabold leading-none [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.05)]',
                        row.pill,
                      ]"
                    >{{ row.label }}</div>
                    <div
                      v-for="(sc, i) in row.scores"
                      :key="`${m.id}-${row.id}-p${i}`"
                      class="flex min-w-0 items-center justify-center gap-0.5"
                    >
                      <img
                        :src="`/images/football-icon/${row.icons[i]}`"
                        :alt="`${row.label} ${phaseScoreHeaders[i]}`"
                        :class="['h-[13px] w-[13px] shrink-0 object-contain [image-rendering:-webkit-optimize-contrast]', row.iconDim]"
                        loading="lazy"
                        decoding="async"
                      />
                      <span
                        :class="['min-w-0 font-extrabold tabular-nums leading-none', row.nums]"
                      >{{ sc }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>

    <n-drawer
      v-model:show="showDateDrawer"
      placement="bottom"
      :height="drawerPx"
      display-directive="show"
      :style="{ borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }"
    >
      <n-drawer-content
        closable
        body-content-style="padding: 0 12px 12px;"
        header-style="padding: 12px 12px 8px;"
        :native-scrollbar="false"
        @close="showDateDrawer = false"
      >
        <template #header>
          <div class="w-full text-center text-base font-bold text-[var(--color-main)]">选择日期区间</div>
        </template>

        <div
          class="mb-3 flex overflow-hidden rounded-xl border border-[var(--color-surface-hover)] bg-[var(--color-surface-soft)]"
        >
          <div class="flex flex-1 flex-col items-center gap-0.5 py-3 pl-2 pr-1 text-center">
            <span class="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--color-subtle)]">开始</span>
            <span class="text-[17px] font-bold leading-tight text-[var(--color-main)]">{{ rangeSummary.startDate }}</span>
            <span class="text-[11px] text-[var(--color-subtle)]">{{ rangeSummary.startWeek }}</span>
          </div>
          <div class="w-px shrink-0 self-stretch bg-[var(--color-surface-hover)]" />
          <div class="flex flex-1 flex-col items-center gap-0.5 py-3 pl-1 pr-2 text-center">
            <span class="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--color-subtle)]">结束</span>
            <span class="text-[17px] font-bold leading-tight text-[var(--color-main)]">{{ rangeSummary.endDate }}</span>
            <span class="text-[11px] text-[var(--color-subtle)]">{{ rangeSummary.endWeek }}</span>
          </div>
        </div>

        <div
          ref="datePickerHostRef"
          class="-mx-3 overflow-x-auto px-1 pb-2 [-webkit-overflow-scrolling:touch]"
          :class="{ 'calendar-host--hide-end': hideEndCalendar }"
        >
          <n-date-picker
            v-model:value="calendarRangeValue"
            type="daterange"
            panel
            :actions="null"
            :is-date-disabled="isDateDisabled"
            class="min-w-full [&_.n-date-panel]:!border-none"
          />
        </div>

        <div
          class="flex gap-2 pt-1"
          style="padding-bottom: max(8px, env(safe-area-inset-bottom, 0px))"
        >
          <n-button class="flex-1" secondary @click="showDateDrawer = false">取消</n-button>
          <n-button class="flex-1" type="primary" :disabled="!calendarRangeValue" @click="applyCalendarRange">应用</n-button>
        </div>
      </n-drawer-content>
    </n-drawer>

    <n-drawer
      v-model:show="showTeamFilter"
      placement="right"
      :width="teamFilterDrawerWidth"
      display-directive="show"
    >
      <n-drawer-content
        closable
        title="筛选联赛"
        body-content-style="padding: 0; display: flex; flex-direction: column; height: 100%;"
        header-style="border-bottom: 1px solid var(--color-surface-hover); padding: 14px 16px;"
        :native-scrollbar="false"
      >
        <div class="flex h-full flex-col">
          <div class="border-b border-[var(--color-surface-hover)] px-4 pb-2.5 pt-3.5">
            <div class="relative flex items-center">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pointer-events-none absolute left-3 h-4 w-4 text-[var(--color-subtle)]" aria-hidden="true">
                <circle cx="8.5" cy="8.5" r="5.5" />
                <path d="m13 13 4 4" />
              </svg>
              <input
                v-model="teamSearchQuery"
                type="text"
                placeholder="搜索球队名称…"
                class="h-[38px] w-full rounded-[10px] border-[1.5px] border-[var(--color-surface-hover)] bg-[var(--color-surface-soft)] py-0 pl-9 pr-9 text-[13px] text-[var(--color-main)] outline-none transition-[border-color,background-color] placeholder:text-[var(--color-subtle)] focus:border-[color-mix(in_srgb,var(--color-primary)_50%,transparent)] focus:bg-[var(--color-surface)]"
              />
              <button
                v-if="teamSearchQuery"
                type="button"
                class="absolute right-2 flex h-6 w-6 items-center justify-center rounded-full border-none bg-transparent text-[var(--color-subtle)] transition-[background-color,color] [-webkit-tap-highlight-color:transparent] active:scale-90 hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-main)]"
                aria-label="清除搜索"
                @click="teamSearchQuery = ''"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
                  <path d="M10 8.586l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 10l3.293 3.293a1 1 0 0 1-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L8.586 10 5.293 6.707a1 1 0 0 1 1.414-1.414L10 8.586z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex gap-2 border-b border-[var(--color-surface-hover)] px-4 py-2.5">
            <button
              type="button"
              class="h-8 flex-1 cursor-pointer rounded-lg border border-[var(--color-surface-hover)] bg-[var(--color-surface-soft)] text-xs font-semibold text-[var(--color-subtle)] transition-all [-webkit-tap-highlight-color:transparent] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40 hover:enabled:bg-[var(--color-surface-hover)] hover:enabled:text-[var(--color-main)]"
              :disabled="selectedTeams.length === 0"
              @click="clearSelectedTeams"
            >
              清除全部 {{ selectedTeams.length > 0 ? `(${selectedTeams.length})` : '' }}
            </button>
            <button
              type="button"
              class="h-8 flex-1 cursor-pointer rounded-lg border border-[color-mix(in_srgb,var(--color-primary)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_15%,var(--color-surface-soft))] text-xs font-semibold text-[var(--color-primary)] transition-all [-webkit-tap-highlight-color:transparent] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40 hover:enabled:bg-[color-mix(in_srgb,var(--color-primary)_25%,var(--color-surface-soft))]"
              @click="toggleSelectAllFiltered"
            >
              {{ isAllFilteredSelected ? '取消全选' : '全选' }}
            </button>
          </div>

          <div class="flex-1 overflow-y-auto px-4 py-2 [scrollbar-color:rgba(255,255,255,0.1)_transparent] [scrollbar-width:thin]">
            <div
              v-for="team in filteredTeams"
              :key="team.id"
              class="mb-1.5 flex cursor-pointer items-center justify-between gap-3 rounded-[10px] border-[1.5px] border-transparent bg-[var(--color-surface-soft)] p-2.5 px-3 transition-all [-webkit-tap-highlight-color:transparent] active:scale-[0.98] hover:bg-[var(--color-surface-hover)]"
              :class="selectedTeams.includes(team.id) ? 'border-[color-mix(in_srgb,var(--color-primary)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-surface-soft))]' : ''"
              @click="toggleTeam(team.id)"
            >
              <div class="flex min-w-0 flex-1 items-center gap-3">
                <div class="h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-[var(--color-surface-hover)]">
                  <img v-if="team.logo" :src="team.logo" :alt="team.name" class="h-full w-full object-cover" />
                  <div v-else class="flex h-full w-full items-center justify-center text-[13px] font-bold text-[var(--color-subtle)]">
                    {{ team.name.substring(0, 2) }}
                  </div>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="mb-0.5 truncate text-sm font-semibold text-[var(--color-main)]">{{ team.name }}</div>
                </div>
              </div>
              <div
                class="shrink-0 text-[var(--color-subtle)] transition-colors"
                :class="selectedTeams.includes(team.id) ? 'text-[var(--color-primary)]' : ''"
              >
                <svg v-if="selectedTeams.includes(team.id)" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z" />
                </svg>
                <svg v-else viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" class="h-5 w-5">
                  <circle cx="10" cy="10" r="7" />
                </svg>
              </div>
            </div>

            <div v-if="filteredTeams.length === 0" class="flex flex-col items-center justify-center px-5 py-14 text-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mb-3 h-12 w-12 text-[var(--color-subtle)] opacity-50">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
              </svg>
              <div class="mb-1 text-[15px] font-semibold text-[var(--color-main)]">找不到符合的球队</div>
              <div class="text-xs text-[var(--color-subtle)]">请尝试其他关键字</div>
            </div>
          </div>

          <div
            class="flex gap-2.5 border-t border-[var(--color-surface-hover)] bg-[var(--color-surface-soft)] px-4 py-3"
            style="padding-bottom: max(12px, env(safe-area-inset-bottom, 0px))"
          >
            <n-button secondary class="flex-1" @click="showTeamFilter = false">取消</n-button>
            <n-button type="primary" class="flex-1" @click="applyTeamFilter">
              应用筛选 {{ selectedTeams.length > 0 ? `(${selectedTeams.length})` : '' }}
            </n-button>
          </div>
        </div>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { NButton, NDatePicker, NDrawer, NDrawerContent } from 'naive-ui';
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';

export type DateRangePreset =
  | 'yesterday'
  | 'today'
  | 'last7'
  | 'last30'
  | 'thisMonth'
  | 'custom';

export interface DateRangePayload {
  preset: DateRangePreset;
  start: Date;
  end: Date;
}

export type TimeSortOrder = 'newest' | 'oldest';

export interface Team {
  id: string;
  name: string;
  logo?: string;
  matchCount: number;
}

const WEEKDAY_CN = ['日', '一', '二', '三', '四', '五', '六'] as const;

const emit = defineEmits<{
  (e: 'rangeChange', payload: DateRangePayload): void;
  (e: 'calendarClick'): void;
  (e: 'timeSortChange', order: TimeSortOrder): void;
  (e: 'teamFilterChange', teamIds: string[]): void;
}>();

const timeSort = ref<TimeSortOrder>('newest');

const phaseScoreHeaders = ['上半场', '下半场', '全场'] as const;

type PhaseTriple = readonly [string, string, string];

type MatchStatBandRow = {
  id: 'score' | 'corner' | 'yellow' | 'red';
  label: string;
  edge: string;
  pill: string;
  nums: string;
  iconDim: string;
  scores: PhaseTriple;
  icons: readonly [string, string, string];
};

function bandRowsFor(phase: {
  score: PhaseTriple;
  corner: PhaseTriple;
  yellow: PhaseTriple;
  red: PhaseTriple;
}): MatchStatBandRow[] {
  return [
    {
      id: 'score',
      label: '得分',
      edge: 'border-l-2 border-l-[color-mix(in_srgb,var(--color-primary)_38%,transparent)]',
      pill:
        'bg-[color-mix(in_srgb,var(--color-surface-hover)_32%,transparent)] text-[var(--color-main)] ring-1 ring-[color-mix(in_srgb,var(--color-surface-hover)_45%,transparent)]',
      nums: 'text-[10px] text-[var(--color-main)]',
      iconDim: 'opacity-92',
      scores: phase.score,
      icons: ['first-half-score.png', 'second-half-score.png', 'full-score.png'] as const,
    },
    {
      id: 'corner',
      label: '角球',
      edge: 'border-l-2 border-l-sky-500/55',
      pill:
        'bg-sky-500/12 text-sky-800 ring-1 ring-sky-500/22 dark:text-sky-100',
      nums: 'text-[10px] text-sky-800 dark:text-sky-100',
      iconDim: 'opacity-92',
      scores: phase.corner,
      icons: ['first-half-corner.png', 'second-half-corner.png', 'full-corner.png'] as const,
    },
    {
      id: 'yellow',
      label: '黄牌',
      edge: 'border-l-2 border-l-amber-500/55',
      pill:
        'bg-amber-500/11 text-amber-900 ring-1 ring-amber-500/25 dark:text-amber-50',
      nums: 'text-[10px] text-amber-900 dark:text-amber-50',
      iconDim: 'opacity-90',
      scores: phase.yellow,
      icons: ['first-half-yellow.png', 'second-half-yellow.png', 'full-yellow.png'] as const,
    },
    {
      id: 'red',
      label: '红牌',
      edge: 'border-l-2 border-l-red-500/50',
      pill: 'bg-red-500/9 text-red-800 ring-1 ring-red-500/24 dark:text-red-100',
      nums: 'text-[10px] text-red-800 dark:text-red-100',
      iconDim: 'opacity-92',
      scores: phase.red,
      icons: ['first-half-red.png', 'second-half-red.png', 'full-red.png'] as const,
    },
  ];
}

type DemoMatchRow = {
  id: string;
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  /** 开赛展示用时区（如 GMT+8、CET） */
  timeZoneLabel: string;
  matchDateText: string;
  matchTimeText: string;
  statRows: MatchStatBandRow[];
};

type DemoMatchSection = {
  id: string;
  leagueTitle: string;
  leagueLogo: string;
  cardShell: string;
  headerTint: string;
  accentStripe: string;
  matches: DemoMatchRow[];
};

const demoMatchSections: DemoMatchSection[] = [
  {
    id: 'sec-pl',
    leagueTitle: '英超',
    leagueLogo: '/images/PL-logo.png',
    cardShell:
      'bg-gradient-to-b from-[color-mix(in_srgb,var(--color-surface-soft)_92%,var(--color-primary)_8%)] via-[var(--color-surface-soft)] to-[color-mix(in_srgb,var(--color-surface-soft)_97%,var(--color-subtle)_3%)]',
    headerTint: '',
    accentStripe:
      'bg-[color-mix(in_srgb,var(--color-primary)_78%,transparent)] shadow-[2px_0_12px_color-mix(in_srgb,var(--color-primary)_35%,transparent)]',
    matches: [
      {
        id: 'm-pl',
        home: '曼彻斯特城',
        away: '利物浦',
        homeScore: 2,
        awayScore: 1,
        timeZoneLabel: 'GMT+1',
        matchDateText: '04-28',
        matchTimeText: '23:30',
        statRows: bandRowsFor({
          score: ['1:0', '1:1', '2:1'],
          corner: ['3:2', '2:3', '5:5'],
          yellow: ['0:1', '1:2', '1:3'],
          red: ['0:0', '0:0', '0:0'],
        }),
      },
    ],
  },
  {
    id: 'sec-es',
    leagueTitle: '西甲',
    leagueLogo: '/images/sports/premier-league.svg',
    cardShell:
      'bg-gradient-to-b from-[color-mix(in_srgb,var(--color-surface-soft)_94%,#6366f1_6%)] via-[var(--color-surface-soft)] to-[color-mix(in_srgb,var(--color-surface-soft)_97%,var(--color-subtle)_3%)]',
    headerTint:
      '[background:radial-gradient(115%_75%_at_50%_-25%,color-mix(in_srgb,#6366f1_14%,transparent),transparent_52%)]',
    accentStripe: 'bg-indigo-500/78 shadow-[2px_0_12px_rgba(99,102,241,0.28)]',
    matches: [
      {
        id: 'm-es',
        home: '皇家马德里',
        away: '巴塞罗那',
        homeScore: 3,
        awayScore: 2,
        timeZoneLabel: 'CET',
        matchDateText: '04-28',
        matchTimeText: '03:00',
        statRows: bandRowsFor({
          score: ['2:1', '1:1', '3:2'],
          corner: ['4:3', '2:4', '6:7'],
          yellow: ['1:2', '2:1', '3:3'],
          red: ['0:0', '0:1', '0:1'],
        }),
      },
      {
        id: 'm-es-2',
        home: '马德里竞技',
        away: '塞维利亚',
        homeScore: 2,
        awayScore: 0,
        timeZoneLabel: 'CET',
        matchDateText: '04-27',
        matchTimeText: '22:15',
        statRows: bandRowsFor({
          score: ['1:0', '1:0', '2:0'],
          corner: ['2:2', '3:1', '5:3'],
          yellow: ['1:1', '0:2', '1:3'],
          red: ['0:0', '0:0', '0:0'],
        }),
      },
      {
        id: 'm-es-3',
        home: '毕尔巴鄂竞技',
        away: '瓦伦西亚',
        homeScore: 1,
        awayScore: 1,
        timeZoneLabel: 'CET',
        matchDateText: '04-27',
        matchTimeText: '20:00',
        statRows: bandRowsFor({
          score: ['0:0', '1:1', '1:1'],
          corner: ['3:4', '2:3', '5:7'],
          yellow: ['2:0', '1:2', '3:2'],
          red: ['0:0', '0:0', '0:0'],
        }),
      },
      {
        id: 'm-es-4',
        home: '比利亚雷亚尔',
        away: '皇家贝蒂斯',
        homeScore: 3,
        awayScore: 1,
        timeZoneLabel: 'CET',
        matchDateText: '04-26',
        matchTimeText: '01:30',
        statRows: bandRowsFor({
          score: ['2:0', '1:1', '3:1'],
          corner: ['4:2', '3:5', '7:7'],
          yellow: ['0:2', '2:1', '2:3'],
          red: ['0:0', '0:0', '0:0'],
        }),
      },
      {
        id: 'm-es-5',
        home: '赫罗纳',
        away: '塞尔塔',
        homeScore: 0,
        awayScore: 2,
        timeZoneLabel: 'CET',
        matchDateText: '04-26',
        matchTimeText: '19:00',
        statRows: bandRowsFor({
          score: ['0:1', '0:1', '0:2'],
          corner: ['1:2', '2:4', '3:6'],
          yellow: ['1:3', '2:2', '3:5'],
          red: ['0:0', '0:1', '0:1'],
        }),
      },
    ],
  },
  {
    id: 'sec-de',
    leagueTitle: '德甲',
    leagueLogo: '/images/logo.png',
    cardShell:
      'bg-gradient-to-b from-[color-mix(in_srgb,var(--color-surface-soft)_94%,#f59e0b_7%)] via-[var(--color-surface-soft)] to-[color-mix(in_srgb,var(--color-surface-soft)_97%,var(--color-subtle)_3%)]',
    headerTint:
      '[background:radial-gradient(115%_75%_at_50%_-25%,color-mix(in_srgb,#f59e0b_13%,transparent),transparent_52%)]',
    accentStripe: 'bg-amber-500/80 shadow-[2px_0_12px_rgba(245,158,11,0.3)]',
    matches: [
      {
        id: 'm-de',
        home: '拜仁慕尼黑',
        away: '多特蒙德',
        homeScore: 1,
        awayScore: 1,
        timeZoneLabel: 'CET',
        matchDateText: '04-28',
        matchTimeText: '00:30',
        statRows: bandRowsFor({
          score: ['0:0', '1:1', '1:1'],
          corner: ['2:3', '4:2', '6:5'],
          yellow: ['1:0', '1:2', '2:2'],
          red: ['0:0', '0:0', '0:0'],
        }),
      },
    ],
  },
  {
    id: 'sec-it',
    leagueTitle: '意甲',
    leagueLogo: '/images/sports/premier-league.svg',
    cardShell:
      'bg-gradient-to-b from-[color-mix(in_srgb,var(--color-surface-soft)_94%,#0ea5e9_7%)] via-[var(--color-surface-soft)] to-[color-mix(in_srgb,var(--color-surface-soft)_97%,var(--color-subtle)_3%)]',
    headerTint:
      '[background:radial-gradient(115%_75%_at_50%_-25%,color-mix(in_srgb,#0ea5e9_13%,transparent),transparent_52%)]',
    accentStripe: 'bg-sky-500/80 shadow-[2px_0_12px_rgba(14,165,233,0.28)]',
    matches: [
      {
        id: 'm-it',
        home: '尤文图斯',
        away: 'AC米兰',
        homeScore: 0,
        awayScore: 2,
        timeZoneLabel: 'CET',
        matchDateText: '04-27',
        matchTimeText: '02:45',
        statRows: bandRowsFor({
          score: ['0:1', '0:1', '0:2'],
          corner: ['1:4', '2:3', '3:7'],
          yellow: ['2:1', '1:3', '3:4'],
          red: ['0:0', '1:0', '1:0'],
        }),
      },
    ],
  },
];

const matchStatExpanded = ref<Record<string, boolean>>({});

const allMatchStatIds = computed(() =>
  demoMatchSections.flatMap((s) => s.matches.map((m) => m.id)),
);

const isEveryMatchStatOpen = computed(() => {
  const ids = allMatchStatIds.value;
  if (ids.length === 0) return false;
  return ids.every((id) => matchStatExpanded.value[id] === true);
});

function isMatchStatOpen(id: string) {
  return matchStatExpanded.value[id] === true;
}

function toggleMatchStat(id: string) {
  const open = !isMatchStatOpen(id);
  matchStatExpanded.value = { ...matchStatExpanded.value, [id]: open };
}

function toggleAllMatchStats() {
  const ids = allMatchStatIds.value;
  if (ids.length === 0) return;
  const shouldOpen = !isEveryMatchStatOpen.value;
  const next = { ...matchStatExpanded.value };
  for (const id of ids) {
    next[id] = shouldOpen;
  }
  matchStatExpanded.value = next;
}

function setTimeSort(order: TimeSortOrder) {
  if (timeSort.value === order) return;
  timeSort.value = order;
  emit('timeSortChange', order);
}

const showTeamFilter = ref(false);
const teamSearchQuery = ref('');
const selectedTeams = ref<string[]>([]);

const teamFilterDrawerWidth = computed(() =>
  typeof window !== 'undefined' ? Math.min(380, window.innerWidth) : 380,
);

const demoTeams = ref<Team[]>([
  { id: 't1', name: '曼彻斯特城', logo: '/images/sports/homeTeam.png', matchCount: 3 },
  { id: 't2', name: '利物浦', logo: '/images/sports/awayTeam.png', matchCount: 2 },
  { id: 't3', name: '巴塞罗那', logo: '/images/sports/homeTeam.png', matchCount: 1 },
  { id: 't4', name: '皇家马德里', logo: '/images/sports/awayTeam.png', matchCount: 2 },
  { id: 't5', name: '拜仁慕尼黑', logo: '/images/sports/homeTeam.png', matchCount: 1 },
  { id: 't6', name: '多特蒙德', logo: '/images/sports/awayTeam.png', matchCount: 1 },
  { id: 't7', name: '尤文图斯', logo: '/images/sports/homeTeam.png', matchCount: 1 },
  { id: 't8', name: 'AC米兰', logo: '/images/sports/awayTeam.png', matchCount: 1 },
  { id: 't9', name: '南墨尔本', logo: '/images/sports/homeTeam.png', matchCount: 1 },
  { id: 't10', name: '布拉足球俱乐部', logo: '/images/sports/awayTeam.png', matchCount: 1 },
]);

const filteredTeams = computed(() => {
  if (!teamSearchQuery.value.trim()) return demoTeams.value;
  const q = teamSearchQuery.value.toLowerCase().trim();
  return demoTeams.value.filter((t) => t.name.toLowerCase().includes(q));
});

const isAllFilteredSelected = computed(() => {
  if (filteredTeams.value.length === 0) return false;
  return filteredTeams.value.every((t) => selectedTeams.value.includes(t.id));
});

function toggleTeam(id: string) {
  const idx = selectedTeams.value.indexOf(id);
  if (idx > -1) {
    selectedTeams.value.splice(idx, 1);
  } else {
    selectedTeams.value.push(id);
  }
}

function clearSelectedTeams() {
  selectedTeams.value = [];
}

function toggleSelectAllFiltered() {
  if (isAllFilteredSelected.value) {
    const ids = new Set(filteredTeams.value.map((t) => t.id));
    selectedTeams.value = selectedTeams.value.filter((id) => !ids.has(id));
  } else {
    const newIds = filteredTeams.value.map((t) => t.id);
    const existing = new Set(selectedTeams.value);
    newIds.forEach((id) => {
      if (!existing.has(id)) selectedTeams.value.push(id);
    });
  }
}

function applyTeamFilter() {
  emit('teamFilterChange', [...selectedTeams.value]);
  showTeamFilter.value = false;
}

const showDateDrawer = ref(false);
const calendarRangeValue = ref<[number, number] | null>(null);
const customStart = ref<Date | null>(null);
const customEnd = ref<Date | null>(null);
const datePickerHostRef = ref<HTMLElement | null>(null);
const hideEndCalendar = ref(false);
let endCalendarObserver: MutationObserver | null = null;

function syncHideEndCalendar() {
  const root = datePickerHostRef.value;
  if (!root) {
    hideEndCalendar.value = false;
    return;
  }
  const endCal = root.querySelector('.n-date-panel-calendar--end');
  if (!endCal) {
    hideEndCalendar.value = false;
    return;
  }
  const cells = endCal.querySelectorAll('.n-date-panel-date');
  if (cells.length === 0) {
    hideEndCalendar.value = false;
    return;
  }
  let anySelectable = false;
  cells.forEach((el) => {
    if (
      !el.classList.contains('n-date-panel-date--disabled') &&
      !el.classList.contains('n-date-panel-date--excluded')
    ) {
      anySelectable = true;
    }
  });
  hideEndCalendar.value = !anySelectable;
}

function attachEndCalendarObserver() {
  endCalendarObserver?.disconnect();
  const root = datePickerHostRef.value;
  if (!root) return;
  endCalendarObserver = new MutationObserver(() => {
    syncHideEndCalendar();
  });
  endCalendarObserver.observe(root, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['class'],
  });
}

onBeforeUnmount(() => {
  endCalendarObserver?.disconnect();
  endCalendarObserver = null;
});

const drawerPx = computed(() =>
  typeof window !== 'undefined' ? Math.min(Math.round(window.innerHeight * 0.88), 640) : 580,
);

const rangeSummary = computed(() => {
  const v = calendarRangeValue.value;
  if (!v) {
    return {
      startDate: '—',
      startWeek: '',
      endDate: '—',
      endWeek: '',
    };
  }
  const [a, b] = v;
  const s = dayjs(a);
  const e = dayjs(b);
  return {
    startDate: s.format('M月D日'),
    startWeek: `周${WEEKDAY_CN[s.day()]}`,
    endDate: e.format('M月D日'),
    endWeek: `周${WEEKDAY_CN[e.day()]}`,
  };
});

function isDateDisabled(ts: number): boolean {
  return ts > endOfDay(new Date()).getTime();
}

function onCalendarClick() {
  emit('calendarClick');
  showDateDrawer.value = true;
}

const rangeOptions: { key: DateRangePreset; label: string }[] = [
  { key: 'yesterday', label: '昨天' },
  { key: 'today', label: '今天' },
  { key: 'last7', label: '近7天' },
  { key: 'last30', label: '近30天' },
  { key: 'thisMonth', label: '本月' },
];

const activePreset = ref<DateRangePreset>('today');

const displayDateRange = computed(() => {
  const { start, end } = getRange(activePreset.value);
  const s = dayjs(start);
  const e = dayjs(end);
  
  if (activePreset.value === 'custom') {
    if (s.isSame(e, 'day')) {
      return s.format('M月D日');
    }
    if (s.isSame(e, 'month')) {
      return `${s.format('M月D日')} - ${e.format('D日')}`;
    }
    return `${s.format('M/D')} - ${e.format('M/D')}`;
  }
  
  const presetLabel = rangeOptions.find((opt) => opt.key === activePreset.value)?.label;
  if (presetLabel) {
    if (activePreset.value === 'yesterday' || activePreset.value === 'today') {
      return `${presetLabel} ${s.format('M/D')}`;
    }
    if (s.isSame(e, 'day')) {
      return `${presetLabel} ${s.format('M/D')}`;
    }
    return `${presetLabel} ${s.format('M/D')}-${e.format('M/D')}`;
  }
  
  return s.format('M月D日');
});

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function endOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function getRange(preset: DateRangePreset): { start: Date; end: Date } {
  if (preset === 'custom' && customStart.value && customEnd.value) {
    return { start: customStart.value, end: customEnd.value };
  }
  const now = new Date();
  switch (preset) {
    case 'yesterday': {
      const y = addDays(now, -1);
      return { start: startOfDay(y), end: endOfDay(y) };
    }
    case 'today':
      return { start: startOfDay(now), end: endOfDay(now) };
    case 'last7':
      return { start: startOfDay(addDays(now, -6)), end: endOfDay(now) };
    case 'last30':
      return { start: startOfDay(addDays(now, -29)), end: endOfDay(now) };
    case 'thisMonth': {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      return { start: startOfDay(start), end: endOfDay(now) };
    }
    default:
      return { start: startOfDay(now), end: endOfDay(now) };
  }
}

function onSelect(preset: DateRangePreset) {
  activePreset.value = preset;
  const { start, end } = getRange(preset);
  emit('rangeChange', { preset, start, end });
}

function applyCalendarRange() {
  const v = calendarRangeValue.value;
  if (!v) return;
  let start = startOfDay(new Date(v[0]));
  let end = endOfDay(new Date(v[1]));
  if (start.getTime() > end.getTime()) {
    const t = start;
    start = startOfDay(new Date(v[1]));
    end = endOfDay(new Date(v[0]));
  }
  customStart.value = start;
  customEnd.value = end;
  activePreset.value = 'custom';
  showDateDrawer.value = false;
  emit('rangeChange', { preset: 'custom', start, end });
}

watch(showDateDrawer, (open) => {
  if (open) {
    const { start, end } = getRange(activePreset.value);
    calendarRangeValue.value = [startOfDay(start).getTime(), endOfDay(end).getTime()];
    hideEndCalendar.value = false;
    nextTick(() => {
      syncHideEndCalendar();
      attachEndCalendarObserver();
    });
  } else {
    endCalendarObserver?.disconnect();
    endCalendarObserver = null;
    hideEndCalendar.value = false;
  }
});

watch(calendarRangeValue, () => {
  if (showDateDrawer.value) {
    nextTick(() => syncHideEndCalendar());
  }
});
</script>

<style scoped>
.calendar-host--hide-end :deep(.n-date-panel-calendar--end),
.calendar-host--hide-end :deep(.n-date-panel-vertical-divider) {
  display: none !important;
}

.calendar-host--hide-end :deep(.n-date-panel--daterange) {
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas:
    'left-calendar'
    'footer'
    'action';
}

.match-stat-details-grid {
  will-change: grid-template-rows;
}

.match-stat-toggle:focus-visible .match-stat-toggle__icon {
  filter: drop-shadow(0 0 3px color-mix(in srgb, var(--color-primary) 45%, transparent));
}
</style>
