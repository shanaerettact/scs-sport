<template>
  <div class="flex flex-col gap-[7px] px-2.5 pb-3">
    <div
      class="sticky top-0 z-[9] -mx-2.5 flex flex-col gap-[7px] bg-[var(--color-background-color)] px-2.5 pb-1.5 pt-2 shadow-[var(--color-sticky-shadow)]"
    >
      <div
        class="rounded-xl border border-[var(--color-surface-hover)] bg-gradient-to-br from-[color-mix(in_srgb,var(--color-surface-soft)_95%,var(--color-primary)_5%)] to-[var(--color-surface-soft)] p-2 px-2 py-[7px] shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.08)] transition-shadow duration-300 dark:from-[color-mix(in_srgb,var(--color-surface-soft)_95%,var(--color-primary)_3%)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]"
      >
        <div class="flex flex-row items-center gap-1">
          <div
            class="flex min-w-0 flex-1 flex-nowrap gap-1 overflow-x-auto [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
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
        <div class="flex min-w-0 flex-1 items-center gap-1.5 px-0.5">
          <div class="user-select-none flex min-w-0 flex-1 basis-0 items-center gap-1.5 overflow-hidden px-1 py-0.5 [-webkit-user-select:none]">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="h-[13px] w-[13px] shrink-0 text-[color-mix(in_srgb,var(--color-primary)_65%,var(--color-subtle))] [filter:drop-shadow(0_0_2px_color-mix(in_srgb,var(--color-primary)_25%,transparent))]" aria-hidden="true">
              <rect x="2" y="3" width="12" height="11" rx="1.5" />
              <path d="M11 1.5v3M5 1.5v3M2 6.5h12" />
            </svg>
            <span class="min-w-0 flex-1 truncate text-xs font-bold leading-none tracking-wide text-[var(--color-main)] [text-shadow:0_1px_2px_rgba(0,0,0,0.03)]">{{ displayDateRange }}</span>
          </div>
          <div
            class="inline-flex w-max min-w-[4rem] shrink-0 items-stretch rounded-lg bg-[color-mix(in_srgb,var(--color-surface-hover)_40%,transparent)] p-0.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.18)]"
          >
            <n-select
              v-model:value="betStatusFilter"
              :options="betStatusOptions"
              size="small"
              :consistent-menu-width="false"
              :theme-overrides="betStatusSelectThemeOverrides"
              aria-label="投注状态筛选"
              :class="[
                'block min-h-0 w-full max-w-full min-w-0',
                '[&_.n-base-selection]:box-border [&_.n-base-selection]:!min-h-0 [&_.n-base-selection]:!min-w-0 [&_.n-base-selection]:!w-full [&_.n-base-selection]:!max-w-full [&_.n-base-selection]:overflow-hidden [&_.n-base-selection]:rounded-md [&_.n-base-selection]:border-none [&_.n-base-selection]:bg-transparent [&_.n-base-selection]:text-[var(--color-subtle)] [&_.n-base-selection]:transition-[color,background-color,box-shadow,transform] [&_.n-base-selection]:duration-200 [&_.n-base-selection]:[-webkit-tap-highlight-color:transparent] [&_.n-base-selection]:hover:bg-[color-mix(in_srgb,var(--color-surface-hover)_50%,transparent)] [&_.n-base-selection]:hover:text-[var(--color-main)] [&_.n-base-selection]:focus-within:outline [&_.n-base-selection]:focus-within:outline-2 [&_.n-base-selection]:focus-within:outline-offset-1 [&_.n-base-selection]:focus-within:outline-[color-mix(in_srgb,var(--color-primary)_60%,transparent)] [&_.n-base-selection]:![--n-border-radius:6px] [&_.n-base-selection]:![--n-height:28px] [&_.n-base-selection]:![--n-font-size:10.5px] [&_.n-base-selection]:![--n-padding-single:0_22px_0_6px]',
                '[&_.n-base-selection-label]:!font-bold [&_.n-base-selection-label]:!leading-none [&_.n-base-selection-label]:!tracking-wider [&_.n-base-selection-label]:!whitespace-nowrap [&_.n-base-selection-label]:!pr-2 [&_.n-base-suffix]:!ml-0.5 [&_.n-base-suffix]:mr-0 [&_.n-base-suffix]:!text-[var(--color-subtle)] [&_.n-base-selection:hover_.n-base-suffix]:!text-[var(--color-main)]',
              ]"
            />
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

        </div>
      </div>
    </div>

    <section class="flex flex-col gap-3" aria-label="投注记录列表">
      <article
        class="relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-surface-hover)_82%,var(--color-primary)_10%)] bg-gradient-to-b from-[color-mix(in_srgb,var(--color-surface-soft)_94%,var(--color-primary)_6%)] via-[var(--color-surface-soft)] to-[color-mix(in_srgb,var(--color-surface-soft)_97%,var(--color-subtle)_3%)] pl-2.5 shadow-[0_4px_18px_rgba(0,0,0,0.065),inset_0_1px_0_rgba(255,255,255,0.09)] dark:border-[color-mix(in_srgb,var(--color-surface-hover)_65%,var(--color-background-color)_35%)] dark:from-[color-mix(in_srgb,var(--color-surface-soft)_92%,var(--color-primary)_5%)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.04)]"
      >
        <div
          class="absolute left-0 top-0 h-full w-[3px] rounded-l-2xl bg-[color-mix(in_srgb,var(--color-primary)_78%,transparent)] shadow-[2px_0_12px_color-mix(in_srgb,var(--color-primary)_35%,transparent)]"
          aria-hidden="true"
        />
        <div
          class="relative px-2.5 pt-2.5 pb-1 [background:radial-gradient(115%_75%_at_50%_-25%,color-mix(in_srgb,var(--color-primary)_11%,transparent),transparent_52%)]"
        >
          <div class="flex justify-center pb-2">
            <div
              class="inline-flex max-w-full items-center justify-center gap-1 rounded-full border border-[color-mix(in_srgb,var(--color-surface-hover)_42%,transparent)] bg-[color-mix(in_srgb,var(--color-surface-hover)_14%,transparent)] px-2.5 py-0.5 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.06),0_0_0_1px_color-mix(in_srgb,var(--color-primary)_12%,transparent)]"
            >
              <span
                class="line-clamp-1 text-center text-[10.5px] font-extrabold leading-none tracking-[0.12em] text-[var(--color-main)]/95 [text-shadow:0_1px_1px_rgba(0,0,0,0.05)]"
              >投注明细</span>
            </div>
          </div>
        </div>

        <div
          class="relative overflow-x-auto px-2 pb-2.5 [-webkit-overflow-scrolling:touch] [scrollbar-color:color-mix(in_srgb,var(--color-primary)_35%,transparent)_transparent] [scrollbar-width:thin]"
        >
          <table
            class="min-w-[58rem] w-full border-separate border-spacing-0 text-left"
          >
            <thead>
              <tr
                class="bg-[color-mix(in_srgb,var(--color-surface-hover)_12%,transparent)] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.05)]"
              >
                <th
                  scope="col"
                  class="sticky left-0 z-[1] whitespace-nowrap rounded-tl-lg border-b border-r border-[var(--color-surface-hover)]/80 bg-[color-mix(in_srgb,var(--color-surface-soft)_96%,var(--color-surface-hover)_4%)] px-2 py-2 pl-2.5 text-[10px] font-extrabold uppercase tracking-wide text-[var(--color-subtle)] backdrop-blur-sm dark:bg-[color-mix(in_srgb,var(--color-surface)_88%,var(--color-surface-soft)_12%)]"
                >
                  投注时间
                </th>
                <th
                  scope="col"
                  class="whitespace-nowrap border-b border-r border-[var(--color-surface-hover)]/80 px-2 py-2 text-[10px] font-extrabold uppercase tracking-wide text-[var(--color-subtle)]"
                >
                  投注单
                </th>
                <th
                  scope="col"
                  class="whitespace-nowrap border-b border-r border-[var(--color-surface-hover)]/80 px-2 py-2 text-[10px] font-extrabold uppercase tracking-wide text-[var(--color-subtle)]"
                >
                  盘口类型
                </th>
                <th
                  scope="col"
                  class="whitespace-nowrap border-b border-r border-[var(--color-surface-hover)]/80 px-2 py-2 text-[10px] font-extrabold uppercase tracking-wide text-[var(--color-subtle)]"
                >
                  联赛/赛事
                </th>
                <th
                  scope="col"
                  class="whitespace-nowrap border-b border-r border-[var(--color-surface-hover)]/80 px-2 py-2 text-[10px] font-extrabold uppercase tracking-wide text-[var(--color-subtle)]"
                >
                  投注项/赔率
                </th>
                <th
                  scope="col"
                  class="whitespace-nowrap border-b border-r border-[var(--color-surface-hover)]/80 px-2 py-2 text-[10px] font-extrabold uppercase tracking-wide text-[var(--color-subtle)]"
                >
                  赛事结果
                </th>
                <th
                  scope="col"
                  class="whitespace-nowrap border-b border-r border-[var(--color-surface-hover)]/80 px-2 py-2 text-[10px] font-extrabold uppercase tracking-wide text-[var(--color-subtle)]"
                >
                  投注
                </th>
                <th
                  scope="col"
                  class="whitespace-nowrap border-b border-r border-[var(--color-surface-hover)]/80 px-2 py-2 text-[10px] font-extrabold uppercase tracking-wide text-[var(--color-subtle)]"
                >
                  派彩
                </th>
                <th
                  scope="col"
                  class="whitespace-nowrap border-b border-r border-[var(--color-surface-hover)]/80 px-2 py-2 text-[10px] font-extrabold uppercase tracking-wide text-[var(--color-subtle)]"
                >
                  输赢
                </th>
                <th
                  scope="col"
                  class="whitespace-nowrap border-b border-r border-[var(--color-surface-hover)]/80 px-2 py-2 text-[10px] font-extrabold uppercase tracking-wide text-[var(--color-subtle)]"
                >
                  投注结果
                </th>
                <th
                  scope="col"
                  class="whitespace-nowrap rounded-tr-lg border-b border-[var(--color-surface-hover)]/80 px-2 py-2 pr-2.5 text-[10px] font-extrabold uppercase tracking-wide text-[var(--color-subtle)]"
                >
                  结算时间
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, ri) in demoBetHistoryRows"
                :key="row.id"
                class="transition-colors duration-150 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] hover:bg-[color-mix(in_srgb,var(--color-primary)_6%,transparent)] dark:hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]"
              >
                <td
                  class="sticky left-0 z-[1] border-b border-r border-[var(--color-surface-hover)]/70 bg-[color-mix(in_srgb,var(--color-surface-soft)_94%,transparent)] px-2 py-2 pl-2.5 text-[11px] font-semibold tabular-nums text-[var(--color-main)] backdrop-blur-[6px] dark:bg-[color-mix(in_srgb,var(--color-surface)_90%,var(--color-surface-soft)_10%)]"
                  :class="ri === demoBetHistoryRows.length - 1 ? 'rounded-bl-lg border-b-0' : ''"
                >
                  {{ row.betTime }}
                </td>
                <td
                  class="border-b border-r border-[var(--color-surface-hover)]/70 px-2 py-2 font-mono text-[11px] font-bold tabular-nums text-[color-mix(in_srgb,var(--color-primary)_72%,var(--color-main))]"
                  :class="ri === demoBetHistoryRows.length - 1 ? 'border-b-0' : ''"
                >
                  {{ row.slipId }}
                </td>
                <td
                  class="border-b border-r border-[var(--color-surface-hover)]/70 px-2 py-2 text-[11px] text-[var(--color-main)]"
                  :class="ri === demoBetHistoryRows.length - 1 ? 'border-b-0' : ''"
                >
                  {{ row.marketType }}
                </td>
                <td
                  class="max-w-[10rem] border-b border-r border-[var(--color-surface-hover)]/70 px-2 py-2 text-[11px] leading-snug text-[var(--color-main)]"
                  :class="ri === demoBetHistoryRows.length - 1 ? 'border-b-0' : ''"
                >
                  <span class="line-clamp-2">{{ row.leagueMatch }}</span>
                </td>
                <td
                  class="border-b border-r border-[var(--color-surface-hover)]/70 px-2 py-2 text-[11px] text-[var(--color-main)]"
                  :class="ri === demoBetHistoryRows.length - 1 ? 'border-b-0' : ''"
                >
                  <span class="font-semibold text-[var(--color-primary)]">{{ row.selection }}</span>
                  <span class="text-[var(--color-subtle)]"> / </span>
                  <span class="font-bold tabular-nums">{{ row.odds }}</span>
                </td>
                <td
                  class="border-b border-r border-[var(--color-surface-hover)]/70 px-2 py-2 text-center text-[11px] font-bold tabular-nums text-[var(--color-main)]"
                  :class="ri === demoBetHistoryRows.length - 1 ? 'border-b-0' : ''"
                >
                  {{ row.matchResult }}
                </td>
                <td
                  class="border-b border-r border-[var(--color-surface-hover)]/70 px-2 py-2 text-right text-[11px] font-semibold tabular-nums text-[var(--color-main)]"
                  :class="ri === demoBetHistoryRows.length - 1 ? 'border-b-0' : ''"
                >
                  {{ row.stake }}
                </td>
                <td
                  class="border-b border-r border-[var(--color-surface-hover)]/70 px-2 py-2 text-right text-[11px] font-semibold tabular-nums text-[var(--color-main)]"
                  :class="ri === demoBetHistoryRows.length - 1 ? 'border-b-0' : ''"
                >
                  {{ row.payout }}
                </td>
                <td
                  class="border-b border-r border-[var(--color-surface-hover)]/70 px-2 py-2 text-right text-[11px] font-extrabold tabular-nums"
                  :class="[plClass(row.plTone), ri === demoBetHistoryRows.length - 1 ? 'border-b-0' : '']"
                >
                  {{ row.pl }}
                </td>
                <td
                  class="border-b border-r border-[var(--color-surface-hover)]/70 px-2 py-2"
                  :class="ri === demoBetHistoryRows.length - 1 ? 'border-b-0' : ''"
                >
                  <span
                    class="inline-flex rounded-md border px-1.5 py-0.5 text-[10px] font-extrabold leading-none tracking-wide"
                    :class="betResultPillClass(row.betResult)"
                  >{{ row.betResult }}</span>
                </td>
                <td
                  class="border-b border-[var(--color-surface-hover)]/70 px-2 py-2 pr-2.5 text-[11px] tabular-nums text-[var(--color-subtle)]"
                  :class="ri === demoBetHistoryRows.length - 1 ? 'rounded-br-lg border-b-0' : ''"
                >
                  {{ row.settleTime }}
                </td>
              </tr>
            </tbody>
          </table>
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
          :class="[
            '-mx-3 overflow-x-auto px-1 pb-2 [-webkit-overflow-scrolling:touch]',
            hideEndCalendar && CALENDAR_HOST_HIDE_END_TW,
          ]"
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
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { NButton, NDatePicker, NDrawer, NDrawerContent, NSelect } from 'naive-ui';
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';

type DateRangePreset =
  | 'yesterday'
  | 'today'
  | 'last7'
  | 'last30'
  | 'thisMonth'
  | 'custom';

type TimeSortOrder = 'newest' | 'oldest';

type BetStatusFilter = 'all' | 'unsettled' | 'settled' | 'cancelled';

const WEEKDAY_CN = ['日', '一', '二', '三', '四', '五', '六'] as const;

/** Tailwind：單月可選時隱藏結束日曆（等同原 calendar-host--hide-end） */
const CALENDAR_HOST_HIDE_END_TW =
  "[&_.n-date-panel-calendar--end]:!hidden [&_.n-date-panel-vertical-divider]:!hidden [&_.n-date-panel--daterange]:![grid-template-columns:minmax(0,1fr)] [&_.n-date-panel--daterange]:![grid-template-areas:'left-calendar'_'footer'_'action']";

const betStatusFilter = ref<BetStatusFilter>('all');
const betStatusOptions: { label: string; value: BetStatusFilter }[] = [
  { label: '全部', value: 'all' },
  { label: '未結算', value: 'unsettled' },
  { label: '結算', value: 'settled' },
  { label: '取消', value: 'cancelled' },
];

/** 下拉選單：選中項文字／勾選色使用主題主要文字色（亮版即 --color-main） */
const betStatusSelectThemeOverrides = {
  peers: {
    InternalSelectMenu: {
      optionTextColorActive: 'var(--color-main)',
      optionCheckColor: 'var(--color-main)',
    },
  },
};

type BetHistoryPlTone = 'win' | 'loss' | 'neutral';

type BetHistoryRow = {
  id: string;
  betTime: string;
  slipId: string;
  marketType: string;
  leagueMatch: string;
  selection: string;
  odds: string;
  matchResult: string;
  stake: string;
  payout: string;
  pl: string;
  plTone: BetHistoryPlTone;
  betResult: string;
  settleTime: string;
};

const demoBetHistoryRows: BetHistoryRow[] = [
  {
    id: 'bh-1',
    betTime: '04-28 14:32',
    slipId: 'S88210421',
    marketType: '让球',
    leagueMatch: '英超 · 曼城 vs 利物浦',
    selection: '主队',
    odds: '1.92',
    matchResult: '2-1',
    stake: '100.00',
    payout: '192.00',
    pl: '+92.00',
    plTone: 'win',
    betResult: '已结算',
    settleTime: '04-28 16:05',
  },
  {
    id: 'bh-2',
    betTime: '04-28 12:10',
    slipId: 'S88210388',
    marketType: '大小',
    leagueMatch: '西甲 · 皇马 vs 巴萨',
    selection: '大 2.5',
    odds: '1.88',
    matchResult: '1-1',
    stake: '50.00',
    payout: '0.00',
    pl: '-50.00',
    plTone: 'loss',
    betResult: '已结算',
    settleTime: '04-28 14:20',
  },
  {
    id: 'bh-3',
    betTime: '04-27 21:45',
    slipId: 'S88209912',
    marketType: '独赢',
    leagueMatch: '德甲 · 拜仁 vs 多特',
    selection: '主队',
    odds: '1.65',
    matchResult: '—',
    stake: '200.00',
    payout: '—',
    pl: '—',
    plTone: 'neutral',
    betResult: '未结算',
    settleTime: '—',
  },
];

function plClass(tone: BetHistoryPlTone) {
  if (tone === 'win') {
    return 'text-emerald-600 dark:text-emerald-400 [text-shadow:0_0_12px_color-mix(in_srgb,emerald_35%,transparent)]';
  }
  if (tone === 'loss') {
    return 'text-red-600 dark:text-red-400 [text-shadow:0_0_12px_color-mix(in_srgb,red_28%,transparent)]';
  }
  return 'text-[var(--color-subtle)]';
}

function betResultPillClass(label: string) {
  if (label === '已结算') {
    return 'border-[color-mix(in_srgb,var(--color-primary)_42%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_14%,var(--color-surface-soft))] text-[var(--color-primary)]';
  }
  if (label === '未结算') {
    return 'border-amber-500/35 bg-amber-500/10 text-amber-800 dark:text-amber-200';
  }
  if (label === '取消' || label.includes('取消')) {
    return 'border-[var(--color-surface-hover)] bg-[color-mix(in_srgb,var(--color-surface-hover)_22%,transparent)] text-[var(--color-subtle)]';
  }
  return 'border-[var(--color-surface-hover)] bg-[var(--color-surface-soft)] text-[var(--color-main)]';
}

const timeSort = ref<TimeSortOrder>('newest');

const showTeamFilter = ref(false);
const selectedTeams = ref<string[]>([]);

const allMatchStatIds = computed(() => [] as string[]);
const isEveryMatchStatOpen = computed(() => false);

function toggleAllMatchStats() {}

function setTimeSort(order: TimeSortOrder) {
  if (timeSort.value === order) return;
  timeSort.value = order;
}

const showDateDrawer = ref(false);
const calendarRangeValue = ref<[number, number] | null>(null);
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
const customStart = ref<Date | null>(null);
const customEnd = ref<Date | null>(null);

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
}

function applyCalendarRange() {
  const v = calendarRangeValue.value;
  if (!v) return;
  let start = startOfDay(new Date(v[0]));
  let end = endOfDay(new Date(v[1]));
  if (start.getTime() > end.getTime()) {
    start = startOfDay(new Date(v[1]));
    end = endOfDay(new Date(v[0]));
  }
  customStart.value = start;
  customEnd.value = end;
  activePreset.value = 'custom';
  showDateDrawer.value = false;
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