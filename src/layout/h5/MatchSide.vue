<template>
  <div class="flex min-h-0 flex-col overflow-hidden bg-[var(--color-surface-soft,#111318)]">
    <div
      class="flex items-start justify-between gap-1 border-b border-[var(--color-border-subtle)] bg-gradient-to-br from-[var(--color-surface-soft)] to-[var(--color-primary-tint)] pr-2 pb-1.5 pl-0 pt-1 [background:linear-gradient(160deg,var(--color-surface-soft)_0%,var(--color-primary-tint)_100%)]"
    >
      <button
        class="inline-flex h-[26px] w-[26px] shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent bg-[var(--color-btn-bg)] text-[var(--color-subtle)] transition [-webkit-tap-highlight-color:transparent] hover:bg-[var(--color-btn-bg-hover)] hover:text-[var(--color-main)] active:opacity-70"
        aria-label="返回"
        @click="onClose"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="pointer-events-none h-[13px] w-[13px]">
          <path d="M19 12H5M12 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <div class="flex min-w-0 flex-1 flex-col items-stretch gap-2">
        <div
          class="flex flex-wrap items-center justify-center gap-2 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-btn-bg)] px-2.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_1px_6px_rgba(0,0,0,0.18)]"
        >
          <div class="flex min-w-0 max-w-[min(220px,48vw)] flex-[0_1_auto] items-center justify-center gap-1.5">
            <img
              :src="match.leagueLogo"
              :alt="match.leagueName"
              class="h-3 w-3 shrink-0 object-contain opacity-85"
              @error="($event.target as HTMLImageElement).src = '/images/sports/league.png'"
            />
            <span
              class="min-w-0 max-w-full overflow-hidden text-center text-[11px] font-semibold leading-tight tracking-wide text-[var(--color-subtle,#8b929e)] [text-overflow:ellipsis] [white-space:nowrap]"
            >{{ match.leagueName }}</span>
          </div>
          <span
            class="h-3.5 w-px shrink-0 rounded-sm bg-gradient-to-b from-transparent from-0% via-[var(--color-border-subtle,rgba(255,255,255,0.14))] via-22% to-transparent to-100% opacity-95 [background:linear-gradient(180deg,transparent_0%,var(--color-border-subtle,rgba(255,255,255,0.14))_22%,var(--color-border-subtle,rgba(255,255,255,0.14))_78%,transparent_100%)]"
            aria-hidden="true"
          />
          <div class="flex shrink-0 items-center justify-center gap-1.5">
            <span
              class="shrink-0 text-center text-[11px] font-bold leading-tight tracking-wide text-[var(--color-primary)] [font-variant-numeric:tabular-nums]"
            >
              <template v-if="match.isLive">{{ match.period }}&nbsp;{{ match.clock }}</template>
              <template v-else>{{ match.time }}</template>
            </span>
          </div>
        </div>

        <div
          class="box-border flex w-full flex-row items-center justify-start gap-2.5 pr-9 [padding-right:35px]"
        >
          <div class="flex min-w-0 flex-1 flex-row items-center justify-end gap-1.5">
            <span
              class="min-w-0 flex-1 overflow-hidden text-end text-[11px] font-semibold leading-tight tracking-wide text-[var(--color-main,#e4e8f0)] [text-overflow:ellipsis] [white-space:nowrap]"
            >{{ match.homeTeamName }}</span>
            <img
              :src="match.homeTeamLogo"
              :alt="match.homeTeamName"
              class="h-6 w-6 shrink-0 rounded-full bg-[var(--color-btn-bg,rgba(255,255,255,0.05))] object-contain p-px shadow-[0_1px_3px_rgba(0,0,0,0.28)]"
              @error="($event.target as HTMLImageElement).src = '/images/sports/homeTeam.png'"
            />
          </div>

          <div
            class="flex shrink-0 items-center justify-center gap-px rounded border border-[var(--color-border-subtle,rgba(255,255,255,0.08))] bg-[var(--color-btn-bg,rgba(255,255,255,0.05))] px-1.5 py-0.5 shadow-[0_1px_5px_rgba(0,0,0,0.2)]"
            :class="match.isLive && 'border-[var(--color-primary-border)] shadow-[0_0_0_1px_var(--color-primary-tint),0_2px_10px_var(--color-primary-glow)]'"
          >
            <span class="text-sm font-extrabold leading-none tracking-tight text-[var(--color-main,#e4e8f0)] [font-variant-numeric:tabular-nums]">{{
              match.stats.homeScore
            }}</span>
            <span class="mx-0.5 text-xs font-bold leading-none text-[var(--color-subtle,#8b929e)]">:</span>
            <span class="text-sm font-extrabold leading-none tracking-tight text-[var(--color-main,#e4e8f0)] [font-variant-numeric:tabular-nums]">{{
              match.stats.awayScore
            }}</span>
          </div>

          <div
            class="flex min-w-0 flex-1 flex-row-reverse items-center justify-end gap-1.5"
          >
            <span
              class="min-w-0 flex-1 overflow-hidden text-start text-[11px] font-semibold leading-tight tracking-wide text-[var(--color-main,#e4e8f0)] [text-overflow:ellipsis] [white-space:nowrap]"
            >{{ match.awayTeamName }}</span>
            <img
              :src="match.awayTeamLogo"
              :alt="match.awayTeamName"
              class="h-6 w-6 shrink-0 rounded-full bg-[var(--color-btn-bg,rgba(255,255,255,0.05))] object-contain p-px shadow-[0_1px_3px_rgba(0,0,0,0.28)]"
              @error="($event.target as HTMLImageElement).src = '/images/sports/awayTeam.png'"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex items-stretch gap-0.5 overflow-x-auto px-2.5 py-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <button
        v-for="tab in insightTabs"
        :key="tab.mode"
        class="flex shrink-0 cursor-pointer flex-row items-center justify-center gap-0.5 border-none border-b-2 border-transparent bg-transparent px-2.5 pb-1.5 pt-2 text-[var(--color-subtle,#8b929e)] transition-[color,border-color] [-webkit-tap-highlight-color:transparent] hover:text-[var(--color-main,#e4e8f0)]"
        :class="currentInsight === tab.mode && 'border-b-[var(--color-primary)] text-[var(--color-primary)]'"
        :aria-label="tab.label"
        @click="currentInsight = tab.mode"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          class="pointer-events-none h-3.5 w-3.5 shrink-0"
          v-html="insightTabSvgInner[tab.mode] ?? ''"
        ></svg>
        <span class="whitespace-nowrap text-xs font-semibold leading-tight tracking-wide">{{ tab.label }}</span>
      </button>
    </div>

    <div
      v-if="
        currentInsight !== 'live' &&
        currentInsight !== 'analysis' &&
        currentInsight !== 'statistics'
      "
      class="shrink-0 border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-soft)] px-3 pb-2.5 pt-2 dark:border-[var(--color-border-subtle)] dark:bg-gradient-to-b dark:from-white/[0.04] dark:to-transparent"
    >
      <div
        class="flex items-stretch justify-start gap-0.5 overflow-x-auto rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-1 shadow-[0_1px_3px_rgba(15,23,42,0.07),inset_0_1px_0_rgba(255,255,255,0.85)] [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden dark:border-white/10 dark:bg-black/25 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_4px_18px_rgba(0,0,0,0.35)]"
        role="tablist"
        aria-label="玩法種類"
      >
        <button
          v-for="tab in marketFilterTabs"
          :key="tab.id"
          type="button"
          role="tab"
          class="m-0 min-w-fit flex-1 cursor-pointer whitespace-nowrap rounded-full border-none bg-transparent px-3.5 py-1.5 text-xs font-medium tracking-wide text-[var(--color-subtle)] transition [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] hover:[&:not([data-on=true])]:bg-[var(--color-surface-hover)]/80 hover:[&:not([data-on=true])]:text-[var(--color-main)] dark:hover:[&:not([data-on=true])]:bg-[var(--color-btn-bg-hover)]"
          :data-on="currentMarketFilter === tab.id"
          :class="
            currentMarketFilter === tab.id
              ? 'font-semibold text-[var(--color-main)] [background:linear-gradient(165deg,var(--color-primary-soft)_0%,var(--color-primary-tint)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_0_0_1px_color-mix(in_srgb,var(--color-primary)_32%,transparent),0_1px_8px_rgba(44,217,125,0.12)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_0_1px_var(--color-primary-border),0_2px_12px_var(--color-primary-glow)]'
              : ''
          "
          :aria-selected="currentMarketFilter === tab.id"
          @click="currentMarketFilter = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div
      v-if="currentInsight === 'live'"
      class="flex max-h-[calc(100dvh-248px)] flex-1 flex-col gap-2.5 overflow-y-auto px-1.5 pb-20 pt-1.5 [scrollbar-color:rgba(255,255,255,0.1)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-sm [&::-webkit-scrollbar-thumb]:bg-white/12 [&::-webkit-scrollbar]:w-0.5"
    >
      <div
        class="grid grid-cols-3 gap-1.5 rounded-xl border border-[var(--color-border-subtle,rgba(255,255,255,0.08))] bg-gradient-to-br from-black/30 to-[var(--color-card-bg,rgba(255,255,255,0.04))] p-2.5 px-2.5 pb-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_6px_22px_rgba(0,0,0,0.28)] [background:linear-gradient(165deg,rgba(0,0,0,0.32)_0%,var(--color-card-bg,rgba(255,255,255,0.04))_100%)]"
      >
        <div
          v-for="row in staticLiveStats"
          :key="row.label"
          class="flex min-w-0 flex-col items-center gap-1.5"
        >
          <div class="text-center text-[10px] font-semibold leading-tight tracking-wider text-[var(--color-subtle,#8b929e)]">
            {{ row.label }}
          </div>
          <div class="flex w-full min-w-0 flex-row items-center justify-center gap-1">
            <span class="min-w-0 flex-[0_1_auto] text-right text-xs font-extrabold leading-none [font-variant-numeric:tabular-nums] text-[#e07a85]">{{
              row.home
            }}</span>
            <div class="h-[38px] w-[38px] shrink-0" aria-hidden="true">
              <svg viewBox="0 0 40 40" class="h-full w-full">
                <circle
                  class="stroke-white/[0.08]"
                  style="stroke-width: 3.2"
                  cx="20"
                  cy="20"
                  r="12"
                  fill="none"
                />
                <circle
                  class="[stroke-linecap:round] [filter:drop-shadow(0_0_4px_rgba(224,122,133,0.35))]"
                  style="stroke: #e07a85; stroke-width: 3.2; fill: none"
                  cx="20"
                  cy="20"
                  r="12"
                  fill="none"
                  transform="rotate(-90 20 20)"
                  :stroke-dasharray="liveRingDash(row).homeDash"
                />
                <circle
                  class="[stroke-linecap:round] [filter:drop-shadow(0_0_4px_rgba(94,184,247,0.35))]"
                  style="stroke: #5eb8f7; stroke-width: 3.2; fill: none"
                  cx="20"
                  cy="20"
                  r="12"
                  fill="none"
                  transform="rotate(-90 20 20)"
                  :stroke-dasharray="liveRingDash(row).awayDash"
                  :stroke-dashoffset="liveRingDash(row).awayOffset"
                />
              </svg>
            </div>
            <span class="min-w-0 flex-[0_1_auto] text-left text-xs font-extrabold leading-none [font-variant-numeric:tabular-nums] text-[#5eb8f7]">{{
              row.away
            }}</span>
          </div>
        </div>
      </div>

      <div class="px-0.5 pb-3 pt-1">
        <div
          class="mb-3 mt-1 border-b border-[var(--color-border-subtle,rgba(255,255,255,0.07))] px-1.5 pb-2 text-center text-[15px] font-extrabold tracking-wide text-[var(--color-main,#e4e8f0)]"
        >
          文字直播
        </div>
        <ul class="m-0 flex list-none flex-col gap-2 p-0" role="list">
          <li
            v-for="item in staticTextLiveFeed"
            :key="item.id"
            class="flex flex-row items-start gap-2.5 rounded-[10px] border border-[var(--color-border-subtle,rgba(255,255,255,0.07))] bg-white/[0.045] p-3 pl-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.2)]"
          >
            <p class="m-0 min-w-0 flex-1 text-[13px] font-medium leading-[1.55] text-[var(--color-main,#e4e8f0)]">
              <span v-if="item.minute" class="mr-1.5 inline font-extrabold text-[var(--color-primary)]">{{ item.minute }}</span>
              <span class="text-[rgb(228,232,240)]/92">{{ item.text }}</span>
            </p>
            <img
              v-if="item.team === 'home'"
              :src="match.homeTeamLogo"
              :alt="match.homeTeamName"
              class="mt-0.5 h-[26px] w-[26px] shrink-0 rounded-full bg-[var(--color-btn-bg,rgba(255,255,255,0.06))] object-contain p-0.5 shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
              @error="($event.target as HTMLImageElement).src = '/images/sports/homeTeam.png'"
            />
            <img
              v-else-if="item.team === 'away'"
              :src="match.awayTeamLogo"
              :alt="match.awayTeamName"
              class="mt-0.5 h-[26px] w-[26px] shrink-0 rounded-full bg-[var(--color-btn-bg,rgba(255,255,255,0.06))] object-contain p-0.5 shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
              @error="($event.target as HTMLImageElement).src = '/images/sports/awayTeam.png'"
            />
          </li>
        </ul>
      </div>
    </div>

    <div
      v-else-if="currentInsight === 'analysis'"
      class="flex max-h-[calc(100dvh-248px)] flex-1 flex-col gap-2.5 overflow-y-auto px-1.5 pb-20 pt-1.5 [scrollbar-color:rgba(255,255,255,0.1)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-sm [&::-webkit-scrollbar-thumb]:bg-white/12 [&::-webkit-scrollbar]:w-0.5"
    >
      <div
        class="rounded-xl border border-[var(--color-border-subtle,rgba(255,255,255,0.08))] bg-gradient-to-br from-black/30 to-[var(--color-card-bg,rgba(255,255,255,0.04))] p-3 pb-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_6px_20px_rgba(0,0,0,0.26)] [background:linear-gradient(165deg,rgba(0,0,0,0.28)_0%,var(--color-card-bg,rgba(255,255,255,0.04))_100%)]"
      >
        <div class="mb-2.5 flex flex-row items-start justify-between gap-2.5 text-[11px] font-medium leading-snug text-[var(--color-subtle,#8b929e)]">
          <span class="min-w-0 flex-1">
            胜率
            <strong class="mx-0.5 font-extrabold [font-variant-numeric:tabular-nums] text-red-500">{{ staticAnalysisForm.winRatePct }}%</strong>
            {{ staticAnalysisForm.wins }}胜{{ staticAnalysisForm.draws }}平{{ staticAnalysisForm.losses }}负
          </span>
          <span class="min-w-0 flex-1 text-right">
            单率
            <strong class="mx-0.5 font-extrabold [font-variant-numeric:tabular-nums] text-red-500">{{ staticAnalysisForm.oddRatePct }}%</strong>
            {{ staticAnalysisForm.oddSingles }}单{{ staticAnalysisForm.oddDoubles }}双
          </span>
        </div>
        <div
          class="-mx-1 grid grid-cols-[1.15fr_1.35fr_0.75fr_1.35fr_0.65fr] items-center gap-1 rounded-lg border border-[var(--color-border-subtle,rgba(255,255,255,0.06))] bg-white/[0.055] p-2 px-2 text-center text-[10px] font-bold tracking-wide text-[var(--color-main,#e4e8f0)]"
          role="row"
        >
          <span>日期</span>
          <span>主队</span>
          <span>得分</span>
          <span>客队</span>
          <span>输赢</span>
        </div>
      </div>

      <div
        class="flex flex-row items-stretch justify-between gap-1.5 rounded-xl border border-[var(--color-border-subtle,rgba(255,255,255,0.08))] bg-gradient-to-br from-black/30 to-[var(--color-card-bg,rgba(255,255,255,0.04))] px-2.5 pb-4 pt-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_6px_20px_rgba(0,0,0,0.26)] [background:linear-gradient(165deg,rgba(0,0,0,0.28)_0%,var(--color-card-bg,rgba(255,255,255,0.04))_100%)]"
      >
        <div class="flex min-w-0 flex-1 flex-col items-center gap-1.5 text-center">
          <img
            :src="match.homeTeamLogo"
            :alt="match.homeTeamName"
            class="h-10 w-10 rounded-[10px] bg-[var(--color-btn-bg,rgba(255,255,255,0.06))] object-contain p-1 shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
            @error="($event.target as HTMLImageElement).src = '/images/sports/homeTeam.png'"
          />
          <div class="text-[13px] font-extrabold text-[var(--color-main,#e4e8f0)]">{{ staticAnalysisH2H.homeWins }}胜</div>
          <div class="text-[11px] font-semibold text-[var(--color-subtle,#8b929e)]">场均{{ staticAnalysisH2H.homeAvgPts }}分</div>
        </div>
        <div
          class="relative flex min-w-[76px] flex-none items-center justify-center self-center px-1 before:absolute before:left-0 before:right-0 before:top-1/2 before:h-px before:bg-[var(--color-border-subtle,rgba(255,255,255,0.12))] before:content-['']"
        >
          <span
            class="relative z-[1] rounded-full border border-[var(--color-border-subtle,rgba(255,255,255,0.08))] bg-[var(--color-surface-soft,#111318)] px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-[var(--color-subtle,#8b929e)] shadow-[0_1px_6px_rgba(0,0,0,0.2)]"
            >共{{ staticAnalysisH2H.totalGames }}场</span
          >
        </div>
        <div class="flex min-w-0 flex-1 flex-col items-center gap-1.5 text-center">
          <img
            :src="match.awayTeamLogo"
            :alt="match.awayTeamName"
            class="h-10 w-10 rounded-[10px] bg-[var(--color-btn-bg,rgba(255,255,255,0.06))] object-contain p-1 shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
            @error="($event.target as HTMLImageElement).src = '/images/sports/awayTeam.png'"
          />
          <div class="text-[13px] font-extrabold text-[var(--color-main,#e4e8f0)]">{{ staticAnalysisH2H.awayWins }}胜</div>
          <div class="text-[11px] font-semibold text-[var(--color-subtle,#8b929e)]">场均{{ staticAnalysisH2H.awayAvgPts }}分</div>
        </div>
      </div>

      <div class="mx-1.5 mb-0 mt-1 pb-1.5 text-[15px] font-extrabold tracking-wide text-[var(--color-main,#e4e8f0)]">近期战绩</div>

      <div
        v-for="row in analysisRecentTeamRows"
        :key="row.side"
        class="rounded-xl border border-[var(--color-border-subtle,rgba(255,255,255,0.08))] bg-gradient-to-br from-black/30 to-[var(--color-card-bg,rgba(255,255,255,0.04))] p-3 pb-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_6px_20px_rgba(0,0,0,0.26)] [background:linear-gradient(165deg,rgba(0,0,0,0.28)_0%,var(--color-card-bg,rgba(255,255,255,0.04))_100%)]"
      >
        <div
          class="mb-2 flex flex-row items-center gap-2.5 border-b border-[var(--color-border-subtle,rgba(255,255,255,0.07))] pb-2.5"
        >
          <img
            :src="row.logo"
            :alt="row.name"
            class="h-7 w-7 shrink-0 rounded-lg bg-[var(--color-btn-bg,rgba(255,255,255,0.06))] object-contain p-0.5"
            @error="
              ($event.target as HTMLImageElement).src =
                row.side === 'home' ? '/images/sports/homeTeam.png' : '/images/sports/awayTeam.png'
            "
          />
          <span class="min-w-0 text-sm font-bold leading-snug text-[var(--color-main,#e4e8f0)]">{{ row.name }}</span>
        </div>
        <div class="mt-1 mb-2.5 flex flex-row items-start justify-between gap-2.5 text-[11px] font-medium leading-snug text-[var(--color-subtle,#8b929e)]">
          <span class="min-w-0 flex-1">
            胜率
            <strong class="mx-0.5 font-extrabold [font-variant-numeric:tabular-nums] text-red-500">{{ staticAnalysisForm.winRatePct }}%</strong>
            {{ staticAnalysisForm.wins }}胜{{ staticAnalysisForm.draws }}平{{ staticAnalysisForm.losses }}负
          </span>
          <span class="min-w-0 flex-1 text-right">
            单率
            <strong class="mx-0.5 font-extrabold [font-variant-numeric:tabular-nums] text-red-500">{{ staticAnalysisForm.oddRatePct }}%</strong>
            {{ staticAnalysisForm.oddSingles }}单{{ staticAnalysisForm.oddDoubles }}双
          </span>
        </div>
        <div
          class="-mx-1 grid grid-cols-[1.15fr_1.35fr_0.75fr_1.35fr_0.65fr] items-center gap-1 rounded-lg border border-[var(--color-border-subtle,rgba(255,255,255,0.06))] bg-white/[0.055] p-2 px-2 text-center text-[10px] font-bold tracking-wide text-[var(--color-main,#e4e8f0)]"
          role="row"
        >
          <span>日期</span>
          <span>主队</span>
          <span>得分</span>
          <span>客队</span>
          <span>输赢</span>
        </div>
      </div>
    </div>

    <div
      v-else-if="currentInsight === 'statistics'"
      class="flex max-h-[calc(100dvh-248px)] w-full flex-1 flex-col gap-2.5 overflow-y-auto px-1.5 pb-20 pt-1.5 [scrollbar-color:rgba(255,255,255,0.1)_transparent] [scrollbar-width:thin] [&>div]:w-full [&>div]:shrink-0 [&::-webkit-scrollbar-thumb]:rounded-sm [&::-webkit-scrollbar-thumb]:bg-white/12 [&::-webkit-scrollbar]:w-0.5"
    >
      <div
        class="flex w-full flex-col items-stretch overflow-visible rounded-xl border border-[var(--color-border-subtle,rgba(255,255,255,0.08))] bg-gradient-to-b from-[rgb(44,49,49)]/90 to-[var(--color-card-bg,rgba(255,255,255,0.035))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_6px_22px_rgba(0,0,0,0.28)] [padding:0_0_16px_0]"
      >
        <div class="flex flex-row border-b border-[var(--color-border-subtle,rgba(255,255,255,0.08))]" role="tablist" aria-label="球队统计">
          <button
            id="stats-tab-home"
            type="button"
            role="tab"
            class="relative m-0 flex-1 cursor-pointer border-none bg-transparent px-2 py-3 pb-2.5 text-xs font-semibold tracking-wide text-[var(--color-main,#e4e8f0)] transition-colors [-webkit-tap-highlight-color:transparent] after:absolute after:bottom-0 after:left-[12%] after:right-[12%] after:h-0.5 after:rounded-t after:bg-transparent after:transition-colors data-[on=false]:text-[rgb(228,232,240)]/80 data-[on=false]:opacity-90 data-[on=true]:text-[#48b597] data-[on=true]:after:bg-gradient-to-r data-[on=true]:after:from-transparent data-[on=true]:after:via-[#48b597] data-[on=true]:after:to-transparent data-[on=true]:after:shadow-[0_0_12px_rgba(72,181,151,0.45)]"
            aria-controls="stats-team-data-panel"
            :data-on="statisticsTeamTab === 'home'"
            :aria-selected="statisticsTeamTab === 'home'"
            @click="statisticsTeamTab = 'home'"
          >
            {{ match.homeTeamName }}
          </button>
          <button
            id="stats-tab-away"
            type="button"
            role="tab"
            class="relative m-0 flex-1 cursor-pointer border-none bg-transparent px-2 py-3 pb-2.5 text-xs font-semibold tracking-wide text-[var(--color-main,#e4e8f0)] transition-colors [-webkit-tap-highlight-color:transparent] after:absolute after:bottom-0 after:left-[12%] after:right-[12%] after:h-0.5 after:rounded-t after:bg-transparent after:transition-colors data-[on=false]:text-[rgb(228,232,240)]/80 data-[on=false]:opacity-90 data-[on=true]:text-[#48b597] data-[on=true]:after:bg-gradient-to-r data-[on=true]:after:from-transparent data-[on=true]:after:via-[#48b597] data-[on=true]:after:to-transparent data-[on=true]:after:shadow-[0_0_12px_rgba(72,181,151,0.45)]"
            aria-controls="stats-team-data-panel"
            :data-on="statisticsTeamTab === 'away'"
            :aria-selected="statisticsTeamTab === 'away'"
            @click="statisticsTeamTab = 'away'"
          >
            {{ match.awayTeamName }}
          </button>
        </div>
        <div
          id="stats-team-data-panel"
          role="tabpanel"
          :aria-labelledby="statisticsTeamTab === 'home' ? 'stats-tab-home' : 'stats-tab-away'"
          class="box-border w-full min-h-[168px] flex-[0_0_auto] px-3 pb-1 pt-2"
        >
          <div
            :key="statisticsTeamTab"
            class="box-border flex min-h-[156px] flex-col items-center justify-center gap-3.5 rounded-[10px] border border-[rgba(72,181,151,0.28)] px-4 py-7 [background:linear-gradient(180deg,rgba(72,181,151,0.08)_0%,rgba(255,255,255,0.04)_100%)] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.06),0_4px_18px_rgba(0,0,0,0.22)]"
            role="status"
          >
            <svg
              class="h-[76px] w-[76px] shrink-0 text-[rgb(180,198,190)]/88 opacity-95"
              viewBox="0 0 64 64"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="12"
                y="16"
                width="40"
                height="36"
                rx="5"
                stroke="currentColor"
                stroke-width="1.85"
                opacity="0.62"
              />
              <path
                d="M20 44h24M24 44V34M32 44V28M40 44V38"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                opacity="0.68"
              />
            </svg>
            <p class="m-0 text-sm font-semibold tracking-wider text-[rgb(228,232,240)]/88">无数据</p>
          </div>
        </div>
      </div>

      <div
        class="w-full rounded-xl border border-[var(--color-border-subtle,rgba(255,255,255,0.08))] bg-gradient-to-b from-[rgb(44,49,49)]/90 to-[var(--color-card-bg,rgba(255,255,255,0.035))] px-3 py-3.5 pb-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_6px_22px_rgba(0,0,0,0.28)]"
      >
        <div class="mb-[18px] flex flex-row items-center justify-between gap-2.5 border-b border-[var(--color-border-subtle,rgba(255,255,255,0.07))] pb-3">
          <div class="flex min-w-0 flex-1 flex-row items-center gap-2">
            <img
              :src="match.homeTeamLogo"
              :alt="match.homeTeamName"
              class="h-8 w-8 shrink-0 rounded-[9px] bg-[var(--color-btn-bg,rgba(255,255,255,0.06))] object-contain p-0.5 shadow-[0_2px_8px_rgba(0,0,0,0.28)]"
              @error="($event.target as HTMLImageElement).src = '/images/sports/homeTeam.png'"
            />
            <span
              class="line-clamp-2 min-w-0 text-xs font-bold leading-tight text-[var(--color-main,#e4e8f0)] [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]"
              >{{ match.homeTeamName }}</span
            >
          </div>
          <div class="flex min-w-0 flex-1 flex-row-reverse items-center gap-2 text-right">
            <img
              :src="match.awayTeamLogo"
              :alt="match.awayTeamName"
              class="h-8 w-8 shrink-0 rounded-[9px] bg-[var(--color-btn-bg,rgba(255,255,255,0.06))] object-contain p-0.5 shadow-[0_2px_8px_rgba(0,0,0,0.28)]"
              @error="($event.target as HTMLImageElement).src = '/images/sports/awayTeam.png'"
            />
            <span
              class="line-clamp-2 min-w-0 text-xs font-bold leading-tight text-[var(--color-main,#e4e8f0)] [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]"
              >{{ match.awayTeamName }}</span
            >
          </div>
        </div>
        <div class="flex flex-col gap-3.5">
          <div
            v-for="row in staticStatCompareRows"
            :key="row.key"
            class="grid grid-cols-[28px_1fr_28px] items-center gap-2"
          >
            <span
              class="text-right text-[13px] font-extrabold [font-variant-numeric:tabular-nums] leading-none text-[var(--color-main,#e4e8f0)]"
              >{{ row.home }}</span
            >
            <div class="relative flex min-w-0 flex-col items-center justify-center gap-1.5">
              <div class="relative h-2 w-full overflow-hidden rounded bg-white/10">
                <div
                  class="absolute right-1/2 top-0 h-full max-w-[50%] rounded-l bg-gradient-to-l from-[#48b597] to-transparent transition-[width] duration-300"
                  :style="{ width: statCompareHomeWidth(row) }"
                />
                <div
                  class="absolute left-1/2 top-0 h-full max-w-[50%] rounded-r bg-gradient-to-r from-[rgba(72,181,151,0.42)] to-transparent transition-[width] duration-300"
                  :style="{ width: statCompareAwayWidth(row) }"
                />
              </div>
              <span
                class="text-[11px] font-semibold leading-tight tracking-wider text-[var(--color-subtle,#8b929e)]"
                >{{ row.label }}</span
              >
            </div>
            <span
              class="text-left text-[13px] font-extrabold [font-variant-numeric:tabular-nums] leading-none text-[var(--color-main,#e4e8f0)]"
              >{{ row.away }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="flex max-h-[calc(100dvh-248px)] flex-1 flex-col gap-2 overflow-y-auto px-1.5 pb-20 pt-1.5 [scrollbar-color:rgba(255,255,255,0.1)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-sm [&::-webkit-scrollbar-thumb]:bg-white/12 [&::-webkit-scrollbar]:w-0.5"
    >
      <div
        v-for="market in filteredMarkets"
        :key="market.marketId"
        class="rounded-[10px] border border-[var(--color-border-subtle,rgba(255,255,255,0.07))] bg-[var(--color-card-bg,rgba(255,255,255,0.04))] px-3 pb-1.5 pt-0.5 transition-[border-color] duration-150 hover:border-white/12"
      >
        <div class="mb-0.5 flex items-center justify-between">
          <span class="text-xs font-semibold tracking-wide text-[var(--color-main,#e4e8f0)]">{{
            market.marketName
          }}</span>
        </div>

        <div
          class="grid gap-[5px]"
          :class="market.outcomeList.length === 3 ? 'grid-cols-3' : 'grid-cols-2'"
        >
          <button
            v-for="outcome in orderedOutcomeList(market.outcomeList)"
            :key="outcome.outcomeId"
            class="flex cursor-pointer items-center justify-between gap-0.5 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-outcome-background)] px-1.5 py-3.5 text-[var(--color-main)] shadow-[0_1px_2px_rgba(15,23,42,0.04),inset_0_1px_0_rgba(255,255,255,0.65)] transition-[background-color,transform,box-shadow,border-color,opacity] duration-150 [-webkit-tap-highlight-color:transparent] dark:border-0 dark:shadow-none active:scale-[0.96] active:bg-[var(--color-surface-hover)] active:shadow-[0_1px_1px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.45)] dark:active:opacity-80 dark:active:shadow-none [@media(hover:hover)]:hover:border-[var(--color-primary-border)] [@media(hover:hover)]:hover:bg-[var(--color-surface-hover)] [@media(hover:hover)]:hover:shadow-[0_2px_4px_rgba(15,23,42,0.07),inset_0_1px_0_rgba(255,255,255,0.75)] dark:[@media(hover:hover)]:hover:border-white/14 dark:[@media(hover:hover)]:hover:bg-white/10 dark:[@media(hover:hover)]:hover:shadow-none data-[trend=up]:border-emerald-500/35 data-[trend=up]:bg-emerald-500/10 data-[trend=up]:[@media(hover:hover)]:hover:border-emerald-500/45 data-[trend=up]:[@media(hover:hover)]:hover:bg-emerald-500/12 data-[trend=up]:[@media(hover:hover)]:hover:shadow-[0_0_8px_rgba(34,197,94,0.22),0_2px_4px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.45)] data-[trend=up]:dark:hover:shadow-[0_0_8px_rgba(34,197,94,0.18)] data-[trend=down]:border-red-500/35 data-[trend=down]:bg-red-500/10 data-[trend=down]:[@media(hover:hover)]:hover:border-red-500/45 data-[trend=down]:[@media(hover:hover)]:hover:bg-red-500/12 data-[trend=down]:[@media(hover:hover)]:hover:shadow-[0_0_8px_rgba(239,68,68,0.2),0_2px_4px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.45)] data-[trend=down]:dark:hover:shadow-[0_0_8px_rgba(239,68,68,0.18)]"
            :data-trend="outcome.change"
            @click="onSelectOutcome(market, outcome)"
          >
            <span
              class="max-w-full overflow-hidden text-[13px] leading-tight text-[var(--color-subtle,#8b929e)] [text-overflow:ellipsis] [white-space:nowrap]"
            >{{ outcome.outcomeName }}</span>
            <span
              class="inline-flex shrink-0 items-center gap-0.5 text-[13px] font-bold tracking-wide [font-variant-numeric:tabular-nums]"
              :class="{
                'text-emerald-500': outcome.change === 'up',
                'text-red-500': outcome.change === 'down',
                'text-[var(--color-main,#e4e8f0)]': outcome.change === 'same',
              }"
            >
              {{ outcome.odds }}
              <svg
                v-if="outcome.change === 'up' || outcome.change === 'down'"
                viewBox="0 0 8 8"
                class="h-[7px] w-[7px] fill-current"
                :class="outcome.change === 'down' ? 'rotate-180' : ''"
                aria-hidden="true"
              >
                <path d="M4 1L7 6H1z" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { type MatchEvent as MatchInfo } from './MatchEventCard.vue';

let prevHtmlOverflow = '';
let prevBodyOverflow = '';

onMounted(() => {
  prevHtmlOverflow = document.documentElement.style.overflow;
  prevBodyOverflow = document.body.style.overflow;
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
});

onBeforeUnmount(() => {
  document.documentElement.style.overflow = prevHtmlOverflow;
  document.body.style.overflow = prevBodyOverflow;
});

interface Outcome {
  outcomeId: string;
  outcomeName: string;
  odds: string;
  change: 'up' | 'down' | 'same';
}

interface Market {
  marketId: string;
  marketName: string;
  outcomeList: Outcome[];
  filterTags: string[];
}

interface InsightTab  { mode: string; label: string; }
interface ViewButton  { mode: string; label: string; svgPath: string; }

const props = defineProps<{ match: MatchInfo }>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'selectOutcome', market: Market, outcome: Outcome): void;
}>();

const currentView    = ref<string>('score');
const currentInsight = ref<string>('outcome');
const statisticsTeamTab = ref<'home' | 'away'>('home');
const currentMarketFilter = ref<string>('popular');

interface MarketFilterTab {
  id: string;
  label: string;
}

const marketFilterTabs: MarketFilterTab[] = [
  { id: 'popular', label: '热门' },
  { id: 'all', label: '全部' },
  { id: 'handicap_ou', label: '让球&大小' },
  { id: 'half', label: '半场' },
  { id: 'full', label: '全场' },
  { id: 'correct_score', label: '波胆' },
];

const viewButtons: ViewButton[] = [
  { mode: 'video',  label: '视频',  svgPath: '<polygon points="5 3 19 12 5 21 5 3" />' },
  { mode: 'ani',    label: '动画',  svgPath: '<circle cx="12" cy="12" r="2" /><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />' },
  { mode: 'score',  label: '计分板', svgPath: '<path d="M18 20V10M12 20V4M6 20v-6" />' },
];

const insightTabs: InsightTab[] = [
  { mode: 'outcome',    label: '更多玩法' },
  { mode: 'live',       label: '实时' },
  { mode: 'lineup',     label: '动画' },
  { mode: 'broadcast',  label: '直播' },
  { mode: 'team',       label: '阵容' },
  { mode: 'statistics', label: '统计' },
  { mode: 'analysis',   label: '分析' },
];

const insightTabSvgInner: Record<string, string> = {
  live: '<path d="M3 12h2.5l2-6 3 12 3-10 2.5 8H21" />',
  lineup:
    '<circle cx="12" cy="12" r="2" /><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />',
  broadcast: '<path d="M8 5.5v13l11-6.5L8 5.5z" />',
  statistics: '<path d="M18 20V10M12 20V4M6 20v-6" />',
  team: '<circle cx="12" cy="7" r="3" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />',
  analysis: '<rect x="3" y="3" width="18" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><path d="M7 7h10M7 11h6" />',
  outcome:
    '<rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />',
};

const staticMarkets: Market[] = [
  {
    marketId: 'mk001', marketName: '全场独赢',
    filterTags: ['full', 'popular'],
    outcomeList: [
      { outcomeId: 'o1', outcomeName: '主队胜', odds: '2.15', change: 'up' },
      { outcomeId: 'o2', outcomeName: '客队胜', odds: '3.40', change: 'same' },
      { outcomeId: 'o3', outcomeName: '和',   odds: '3.10', change: 'down' },
    ],
  },
  {
    marketId: 'mk002', marketName: '全场让球',
    filterTags: ['full', 'handicap_ou', 'popular'],
    outcomeList: [
      { outcomeId: 'o4', outcomeName: '主队 -0.5', odds: '1.85', change: 'same' },
      { outcomeId: 'o5', outcomeName: '客队 +0.5', odds: '2.05', change: 'up' },
    ],
  },
  {
    marketId: 'mk003', marketName: '全场大小',
    filterTags: ['full', 'handicap_ou', 'popular'],
    outcomeList: [
      { outcomeId: 'o6', outcomeName: '大 2.5', odds: '1.92', change: 'down' },
      { outcomeId: 'o7', outcomeName: '小 2.5', odds: '1.88', change: 'same' },
    ],
  },
  {
    marketId: 'mk004', marketName: '半场独赢',
    filterTags: ['half'],
    outcomeList: [
      { outcomeId: 'o8',  outcomeName: '主队胜', odds: '2.60', change: 'same' },
      { outcomeId: 'o9',  outcomeName: '客队胜', odds: '3.80', change: 'up' },
      { outcomeId: 'o10', outcomeName: '和',   odds: '2.90', change: 'same' },
    ],
  },
  {
    marketId: 'mk005', marketName: '半场让球',
    filterTags: ['half', 'handicap_ou'],
    outcomeList: [
      { outcomeId: 'o11', outcomeName: '主队 0', odds: '1.95', change: 'same' },
      { outcomeId: 'o12', outcomeName: '客队 0', odds: '1.95', change: 'same' },
    ],
  },
  {
    marketId: 'mk006', marketName: '半场大小',
    filterTags: ['half', 'handicap_ou'],
    outcomeList: [
      { outcomeId: 'o13', outcomeName: '大 1.5', odds: '1.78', change: 'up' },
      { outcomeId: 'o14', outcomeName: '小 1.5', odds: '2.10', change: 'down' },
    ],
  },
  {
    marketId: 'mk007', marketName: '双重机会',
    filterTags: ['full', 'popular'],
    outcomeList: [
      { outcomeId: 'o15', outcomeName: '主/和', odds: '1.40', change: 'same' },
      { outcomeId: 'o16', outcomeName: '主/客胜', odds: '1.25', change: 'same' },
      { outcomeId: 'o17', outcomeName: '客/和', odds: '1.85', change: 'same' },
    ],
  },
  {
    marketId: 'mk008', marketName: '两队皆进',
    filterTags: ['full', 'popular'],
    outcomeList: [
      { outcomeId: 'o18', outcomeName: '是', odds: '1.70', change: 'up' },
      { outcomeId: 'o19', outcomeName: '否', odds: '2.20', change: 'down' },
    ],
  },
  {
    marketId: 'mk009', marketName: '正确比分',
    filterTags: ['correct_score', 'popular', 'full'],
    outcomeList: [
      { outcomeId: 'o20', outcomeName: '1-0', odds: '5.50', change: 'same' },
      { outcomeId: 'o21', outcomeName: '2-0', odds: '7.00', change: 'same' },
      { outcomeId: 'o22', outcomeName: '2-1', odds: '7.50', change: 'same' },
      { outcomeId: 'o23', outcomeName: '0-0', odds: '8.00', change: 'same' },
      { outcomeId: 'o24', outcomeName: '1-1', odds: '5.80', change: 'same' },
      { outcomeId: 'o25', outcomeName: '0-1', odds: '7.20', change: 'same' },
    ],
  },
  {
    marketId: 'mk010', marketName: '进球数',
    filterTags: ['full', 'popular'],
    outcomeList: [
      { outcomeId: 'o26', outcomeName: '0-1 球', odds: '2.80', change: 'same' },
      { outcomeId: 'o27', outcomeName: '2-3 球', odds: '2.20', change: 'up' },
      { outcomeId: 'o28', outcomeName: '4+ 球',  odds: '3.10', change: 'down' },
    ],
  },
];

const filteredMarkets = computed(() => {
  const id = currentMarketFilter.value;
  if (id === 'all') return staticMarkets;
  return staticMarkets.filter((m) => m.filterTags.includes(id));
});

interface LiveStatRow {
  label: string;
  home: number;
  away: number;
}

const staticLiveStats: LiveStatRow[] = [
  { label: '进攻', home: 113, away: 144 },
  { label: '危险进攻', home: 58, away: 73 },
  { label: '控球率', home: 47, away: 53 },
];

interface TextLiveItem {
  id: string;
  minute?: string;
  text: string;
  team?: 'home' | 'away';
}

const staticTextLiveFeed: TextLiveItem[] = [
  { id: 'tl1', text: '大家好，欢迎收看本场比赛直播。' },
  { id: 'tl2', text: '本场比赛场地情况：一般' },
  { id: 'tl3', text: '本场比赛天气情况：多云有雨' },
  { id: 'tl4', text: '随着主裁判一声哨响，上半场比赛开始' },
  {
    id: 'tl5',
    minute: "2'",
    text: '比赛第2分钟，阿特兰大竞技取得了本场比赛的第1个角球',
    team: 'away',
  },
];

const LIVE_RING_R = 12;

function liveRingDash(row: LiveStatRow) {
  const sum = row.home + row.away || 1;
  const c = 2 * Math.PI * LIVE_RING_R;
  const hLen = (row.home / sum) * c;
  const aLen = c - hLen;
  return {
    homeDash: `${hLen} ${c}`,
    awayDash: `${aLen} ${c}`,
    awayOffset: -hLen,
  };
}

interface AnalysisFormSnapshot {
  winRatePct: number;
  wins: number;
  draws: number;
  losses: number;
  oddRatePct: number;
  oddSingles: number;
  oddDoubles: number;
}

const staticAnalysisForm: AnalysisFormSnapshot = {
  winRatePct: 0,
  wins: 0,
  draws: 0,
  losses: 0,
  oddRatePct: 0,
  oddSingles: 0,
  oddDoubles: 0,
};

interface AnalysisH2H {
  totalGames: number;
  homeWins: number;
  awayWins: number;
  homeAvgPts: number;
  awayAvgPts: number;
}

const staticAnalysisH2H: AnalysisH2H = {
  totalGames: 0,
  homeWins: 0,
  awayWins: 0,
  homeAvgPts: 0,
  awayAvgPts: 0,
};

const analysisRecentTeamRows = computed(() => [
  {
    side: 'home' as const,
    name: props.match.homeTeamName,
    logo: props.match.homeTeamLogo,
  },
  {
    side: 'away' as const,
    name: props.match.awayTeamName,
    logo: props.match.awayTeamLogo,
  },
]);

interface StatCompareRow {
  key: string;
  label: string;
  home: number;
  away: number;
}

const staticStatCompareRows: StatCompareRow[] = [
  { key: 'pts', label: '得分', home: 0, away: 0 },
  { key: 'reb', label: '篮板', home: 0, away: 0 },
  { key: 'ast', label: '助攻', home: 0, away: 0 },
  { key: 'stl', label: '抢断', home: 0, away: 0 },
  { key: 'blk', label: '盖帽', home: 0, away: 0 },
];

function statCompareSum(row: StatCompareRow) {
  return row.home + row.away;
}

function statCompareHomeWidth(row: StatCompareRow) {
  const s = statCompareSum(row);
  if (!s) return '0%';
  return `${(row.home / s) * 50}%`;
}

function statCompareAwayWidth(row: StatCompareRow) {
  const s = statCompareSum(row);
  if (!s) return '0%';
  return `${(row.away / s) * 50}%`;
}

function orderedOutcomeList(list: Outcome[]): Outcome[] {
  if (list.length !== 3) return list;
  const t = (s: string) => s.trim();
  const home = list.find((o) => t(o.outcomeName) === '主队胜');
  const draw = list.find((o) => t(o.outcomeName) === '和');
  const away = list.find((o) => t(o.outcomeName) === '客队胜');
  if (home && draw && away) return [home, draw, away];
  return list;
}

const onClose = () => emit('close');

const onSelectOutcome = (market: Market, outcome: Outcome) => {
  emit('selectOutcome', market, outcome);
};
</script>


