<template>
  <Teleport to="body">
    <div class="contents">
      <Transition
        enter-active-class="transition-opacity duration-300 ease-out"
        leave-active-class="transition-opacity duration-200 ease-in"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="modelValue"
          class="fixed inset-0 z-[9998] bg-[rgba(2,6,23,0.82)] backdrop-blur-[6px] [-webkit-backdrop-filter:blur(6px)_brightness(0.5)_saturate(0.75)] [backdrop-filter:blur(6px)_brightness(0.5)_saturate(0.75)] dark:bg-[rgba(0,0,0,0.88)] dark:[-webkit-backdrop-filter:blur(6px)_brightness(0.4)_saturate(0.7)] dark:[backdrop-filter:blur(6px)_brightness(0.4)_saturate(0.7)]"
          aria-hidden="true"
          @click="close"
        />
      </Transition>
      <Transition
        enter-active-class="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
        leave-active-class="transition-transform duration-250 ease-[cubic-bezier(0.4,0,1,1)]"
        enter-from-class="translate-x-full"
        leave-to-class="translate-x-full"
      >
        <aside
          v-if="modelValue"
          class="fixed left-0 right-0 top-0 z-[9999] flex h-dvh w-full min-w-0 flex-col overflow-hidden border-none bg-gradient-to-b from-[var(--color-surface-soft)] via-[var(--color-surface-soft)] to-[color-mix(in_srgb,var(--color-surface-soft)_94%,var(--color-background-color)_6%)] shadow-[0_-8px_40px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.08)] dark:shadow-[0_-12px_48px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.04)]"
          aria-modal="true"
          role="dialog"
          aria-labelledby="bet-slip-title"
          @click.stop
        >
              <header
                class="bet-slip-header flex shrink-0 items-center gap-3 px-4 py-3.5 [padding-top:max(14px,env(safe-area-inset-top,0px))]"
              >
                <h2 id="bet-slip-title" class="bet-slip-header-title min-w-0 flex-1 text-[17px] font-black tracking-wide">
                  投注单
                </h2>
                <button
                  type="button"
                  class="bet-slip-header-close flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-[filter,transform] duration-200 [-webkit-tap-highlight-color:transparent] active:scale-95 [@media(hover:hover)]:hover:brightness-110"
                  aria-label="关闭投注单"
                  @click="close"
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="h-4 w-4" aria-hidden="true">
                    <path d="M4 4l8 8M12 4l-8 8" />
                  </svg>
                </button>
              </header>

              <div
                class="bet-slip-tablist relative z-[1] flex shrink-0 gap-1.5 bg-gradient-to-b from-[color-mix(in_srgb,var(--color-surface-hover)_8%,transparent)] to-transparent px-2.5 py-3"
                role="tablist"
                aria-label="过关方式"
              >
                <button
                  type="button"
                  role="tab"
                  class="bet-slip-tab relative flex-1 rounded-lg border-none py-2.5 text-center text-[13px] font-extrabold tracking-wide transition-all duration-200 [-webkit-tap-highlight-color:transparent] [@media(hover:hover)]:hover:bg-[color-mix(in_srgb,var(--color-surface-hover)_22%,transparent)]"
                  :class="slipMode === 'single' ? 'bet-slip-tab--active' : 'bet-slip-tab--inactive'"
                  :aria-selected="slipMode === 'single'"
                  @click="slipMode = 'single'"
                >
                  单关
                </button>
                <button
                  type="button"
                  role="tab"
                  class="bet-slip-tab relative flex-1 rounded-lg border-none py-2.5 text-center text-[13px] font-extrabold tracking-wide transition-all duration-200 [-webkit-tap-highlight-color:transparent] [@media(hover:hover)]:hover:bg-[color-mix(in_srgb,var(--color-surface-hover)_22%,transparent)]"
                  :class="slipMode === 'parlay' ? 'bet-slip-tab--active' : 'bet-slip-tab--inactive'"
                  :aria-selected="slipMode === 'parlay'"
                  @click="slipMode = 'parlay'"
                >
                  串关
                </button>
              </div>

              <div
                class="bet-slip-scroll min-h-0 flex-1 overflow-y-auto px-3.5 pb-4 [scrollbar-color:color-mix(in_srgb,var(--color-primary)_32%,transparent)_transparent] [scrollbar-width:thin]"
              >
                <div
                  v-if="slipLines.length === 0"
                  class="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[color-mix(in_srgb,var(--color-surface-hover)_65%,transparent)] bg-[color-mix(in_srgb,var(--color-surface-hover)_6%,transparent)] px-5 py-12 mt-3"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="h-12 w-12 text-[var(--color-subtle)] opacity-40" aria-hidden="true">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p class="text-center text-[13px] font-medium leading-relaxed text-[var(--color-subtle)]">
                    点击赛程赔率添加注单
                  </p>
                  <button
                    type="button"
                    class="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[color-mix(in_srgb,var(--color-primary)_42%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_14%,var(--color-surface-soft))] text-[var(--color-primary)] shadow-[0_2px_12px_color-mix(in_srgb,var(--color-primary)_22%,transparent)] transition-[transform,filter] duration-200 [-webkit-tap-highlight-color:transparent] active:scale-95 [@media(hover:hover)]:hover:brightness-110"
                    aria-label="前往首页添加注单"
                    @click="goHomeFromEmptyBetSlip"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" class="h-6 w-6" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>

                <div v-else class="bet-slip-bets-column">
                  <ul class="flex flex-col gap-3" aria-label="已选注项">
                    <template v-if="slipMode === 'parlay'">
                      <li
                        class="bet-slip-line group relative overflow-hidden rounded-xl transition-all duration-200"
                      >
                        <div class="flex flex-col relative">
                          <div
                            v-for="(line, idx) in slipLines"
                            :key="line.selectionKey"
                            :class="[
                              'flex min-h-0 transition-colors duration-150 bg-[color-mix(in_srgb,var(--color-surface-hover)_26%,transparent)] dark:bg-[color-mix(in_srgb,#0a1614_82%,var(--color-surface)_18%)]',
                            ]"
                          >
                            <button
                              type="button"
                              class="bet-slip-line-remove flex h-auto min-h-[3.25rem] w-10 shrink-0 flex-col items-center justify-center border-none transition-colors duration-200"
                              aria-label="移除此注项"
                              @click="removeLine(line.selectionKey)"
                            >
                              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" class="h-3.5 w-3.5" aria-hidden="true">
                                <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" />
                              </svg>
                            </button>
                            <div class="bet-slip-line-accent shrink-0 self-stretch" aria-hidden="true" />
                            <div
                              class="min-w-0 flex-1 pb-[0px]"
                              :class="idx % 2 === 1 ? 'parlay-stripe-even-leg' : ''"
                            >
                              <div class="bet-slip-line-info">
                                <div class="flex items-start gap-2">
                                  <div class="min-w-0 flex-1">
                                    <div class="bet-slip-line-market">
                                      <span class="bet-slip-line-market-title text-[12px] font-black leading-none">{{ line.marketTitle }}</span>
                                      <span class="bet-slip-line-market-sub text-[10px] font-semibold leading-none">{{ line.marketSub }}</span>
                                    </div>
                                    <div class="bet-slip-line-match truncate text-[11px] font-bold leading-tight">
                                      {{ line.matchLabel }}
                                    </div>
                                  </div>
                                  <div
                                    class="bet-slip-line-odds bet-slip-line-odds--inline shrink-0 self-start inline-flex items-baseline gap-px"
                                  >
                                    <span class="bet-slip-line-odds-at text-[8px] font-extrabold leading-none opacity-80">@</span>
                                    <span class="bet-slip-line-odds-num text-[13px] font-black tabular-nums leading-none tracking-tight">{{ line.odds }}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                              type="button"
                              class="bet-slip-add-parlay-btn absolute bottom-[-8px] right-3 mx-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[color-mix(in_srgb,var(--color-primary)_42%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_14%,var(--color-surface-soft))] text-[var(--color-primary)] transition-[transform,filter] duration-200 [-webkit-tap-highlight-color:transparent] active:scale-95 [@media(hover:hover)]:hover:brightness-110 motion-reduce:animate-none"
                              aria-label="回到首頁增加串關注單"
                              @click="goHomeFromEmptyBetSlip"
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" class="h-4 w-4" aria-hidden="true">
                                <path d="M12 5v14M5 12h14" />
                              </svg>
                            </button>

                        </div>
                        <div
                          v-if="slipLines[0]"
                          class="bet-slip-line-stake border-t border-[color-mix(in_srgb,var(--color-surface-hover)_92%,transparent)] px-3 py-2 mt-4 dark:border-[color-mix(in_srgb,var(--color-surface-hover)_55%,#0FA372_22%)]"
                        >
                          <div class="mb-2.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                            <span class="text-[13px] font-black tracking-tight text-[var(--color-main)] [text-shadow:0_1px_0_rgba(255,255,255,0.05)] dark:text-[var(--color-main)]">
                              {{ slipLines.length }}串1
                            </span>
                            <span class="inline-flex items-baseline gap-0.5">
                              <span class="bet-slip-line-odds-at text-[10px] font-extrabold leading-none opacity-80">@</span>
                              <span class="text-[17px] font-black tabular-nums leading-none tracking-tight text-[var(--color-primary)] dark:text-[#63e2b7]">{{ parlayComboOddsDisplay }}</span>
                            </span>
                          </div>
                          <div class="bet-slip-line-stake-head">
                            <span class="bet-slip-line-stake-label">投注金额</span>
                            <span class="bet-slip-line-stake-limit">
                              限红 {{ slipLines[0].minStake }}–{{ slipLines[0].maxStake }}
                            </span>
                          </div>
                          <div class="bet-slip-line-stake-field">
                            <span class="bet-slip-line-stake-prefix">$</span>
                            <input
                              :value="slipLines[0].stake"
                              type="text"
                              inputmode="decimal"
                              autocomplete="off"
                              placeholder="0"
                              class="bet-slip-line-stake-input min-w-0 flex-1 border-none bg-transparent py-1.5 pr-2.5 text-right text-[15px] font-black tabular-nums outline-none"
                              :aria-label="`投注金额 ${slipLines[0].marketTitle}`"
                              @input="onStakeInput(slipLines[0].selectionKey, ($event.target as HTMLInputElement).value)"
                            />
                          </div>
                        </div>
                      </li>
                    </template>
                    <template v-else>
                      <li
                        v-for="line in slipLines"
                        :key="line.selectionKey"
                        class="bet-slip-line group relative overflow-hidden rounded-xl transition-all duration-200"
                      >
                        <div class="flex min-h-0">
                          <button
                            type="button"
                            class="bet-slip-line-remove flex h-auto min-h-[3.25rem] w-10 shrink-0 flex-col items-center justify-center border-none transition-colors duration-200 [-webkit-tap-highlight-color:transparent]"
                            aria-label="移除此注项"
                            @click="removeLine(line.selectionKey)"
                          >
                            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" class="h-3.5 w-3.5" aria-hidden="true">
                              <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" />
                            </svg>
                          </button>
                          <div class="bet-slip-line-accent shrink-0 self-stretch" aria-hidden="true" />
                          <div class="min-w-0 flex-1 px-3 py-2">
                            <div class="bet-slip-line-info">
                              <div class="flex items-start gap-2">
                                <div class="min-w-0 flex-1">
                                  <div class="bet-slip-line-market">
                                    <span class="bet-slip-line-market-title text-[12px] font-black leading-none">{{ line.marketTitle }}</span>
                                    <span class="bet-slip-line-market-sub text-[10px] font-semibold leading-none">{{ line.marketSub }}</span>
                                  </div>
                                  <div class="bet-slip-line-match truncate text-[11px] font-bold leading-tight">
                                    {{ line.matchLabel }}
                                  </div>
                                </div>
                                <div
                                  class="bet-slip-line-odds bet-slip-line-odds--inline shrink-0 self-start inline-flex items-baseline gap-px"
                                >
                                  <span class="bet-slip-line-odds-at text-[8px] font-extrabold leading-none opacity-80">@</span>
                                  <span class="bet-slip-line-odds-num text-[13px] font-black tabular-nums leading-none tracking-tight">{{ line.odds }}</span>
                                </div>
                              </div>
                            </div>

                            <div class="bet-slip-line-stake mt-2">
                              <div class="bet-slip-line-stake-head">
                                <span class="bet-slip-line-stake-label">投注金额</span>
                                <span class="bet-slip-line-stake-limit">
                                  限红 {{ line.minStake }}–{{ line.maxStake }}
                                </span>
                              </div>
                              <div class="bet-slip-line-stake-field">
                                <span class="bet-slip-line-stake-prefix">$</span>
                                <input
                                  :value="line.stake"
                                  type="text"
                                  inputmode="decimal"
                                  autocomplete="off"
                                  placeholder="0"
                                  class="bet-slip-line-stake-input min-w-0 flex-1 border-none bg-transparent py-1.5 pr-2.5 text-right text-[15px] font-black tabular-nums outline-none"
                                  :aria-label="`投注金额 ${line.marketTitle}`"
                                  @input="onStakeInput(line.selectionKey, ($event.target as HTMLInputElement).value)"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </template>
                  </ul>

                  <fieldset
                    aria-labelledby="bet-slip-odds-pref-heading"
                    class="overflow-hidden rounded-2xl border-2 border-[var(--color-surface-hover)] bg-[var(--color-surface-soft)] p-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] dark:border-[color-mix(in_srgb,var(--color-surface-hover)_55%,#0FA372_22%)] dark:bg-[var(--color-surface)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_2px_14px_rgba(0,0,0,0.4)]"
                  >
                  <div
                    id="bet-slip-odds-pref-heading"
                    class="px-4 pb-2 pt-2 text-[12px] font-extrabold uppercase tracking-[0.08em] text-[var(--color-main)] dark:text-[var(--color-main)]"
                  >
                    赔率偏好
                  </div>
                  <div class="flex flex-col gap-0 px-3 pb-3">
                    <label
                      v-for="(opt, idx) in oddsPrefOptions"
                      :key="opt.value"
                      :class="[
                        'flex cursor-pointer items-start gap-3 rounded-xl border-2 px-3 py-1 transition-all duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[color-mix(in_srgb,var(--color-primary)_55%,transparent)]',
                        oddsPreference === opt.value
                          ? 'border-[color-mix(in_srgb,var(--color-bet-slip-accent)_55%,var(--color-surface-hover))] bg-[color-mix(in_srgb,var(--color-bet-slip-accent)_16%,var(--color-surface-soft))] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_2px_12px_color-mix(in_srgb,var(--color-bet-slip-accent)_22%,transparent)] dark:border-[color-mix(in_srgb,var(--color-bet-slip-accent)_45%,var(--color-surface-hover))] dark:bg-[color-mix(in_srgb,var(--color-bet-slip-accent)_22%,var(--color-surface-soft))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
                          : 'border-[var(--color-surface-hover)] bg-[var(--color-surface)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] dark:border-[var(--color-surface-hover)] dark:bg-[color-mix(in_srgb,var(--color-surface-soft)_96%,#0a1210)] [@media(hover:hover)]:hover:border-[color-mix(in_srgb,var(--color-primary)_35%,var(--color-surface-hover))] [@media(hover:hover)]:hover:bg-[color-mix(in_srgb,var(--color-surface-hover)_18%,var(--color-surface))]',
                        idx > 0 ? 'mt-2' : '',
                      ]"
                    >
                      <input
                        v-model="oddsPreference"
                        type="radio"
                        name="bet-slip-odds-pref"
                        :value="opt.value"
                        class="bet-slip-radio h-4 w-4 shrink-0 cursor-pointer accent-[color:var(--color-bet-slip-accent)]"
                      />
                      <span
                        class="text-[13px] font-bold leading-snug tracking-tight transition-colors duration-200 [text-shadow:0_1px_0_rgba(255,255,255,0.04)] dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.75)]"
                        :class="oddsPreference === opt.value ? 'text-[color:var(--color-bet-slip-accent)] dark:text-[var(--color-primary)]' : 'text-[var(--color-main)]'"
                      >{{ opt.label }}</span>
                    </label>
                  </div>
                </fieldset>
                </div>
              </div>

              <footer
                class="bet-slip-footer flex shrink-0 flex-col gap-3 px-4 pb-2 pt-3 sm:gap-3.5 [padding-bottom:max(14px,env(safe-area-inset-bottom,0px))]"
              >
                <dl
                  v-if="slipLines.length > 0"
                  aria-label="注单金额摘要"
                  class="flex w-full min-w-0 items-stretch gap-0 overflow-hidden rounded-2xl border-2 border-[color-mix(in_srgb,var(--color-surface-hover)_62%,var(--color-primary)_12%)] bg-[var(--color-surface-soft)] shadow-[inset_0_2px_0_rgba(255,255,255,0.14),0_4px_20px_rgba(0,0,0,0.07)] dark:border-[color-mix(in_srgb,var(--color-surface-hover)_58%,#0FA372_24%)] dark:bg-[color-mix(in_srgb,var(--color-surface)_96%,#070f0e)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_6px_24px_rgba(0,0,0,0.45)]"
                >
                  <div class="min-w-0 flex-1 px-3 py-2 sm:px-4">
                    <dt class="mb-0.5 block text-[10px] font-extrabold uppercase tracking-[0.14em] text-[var(--color-subtle)] dark:text-[color-mix(in_srgb,var(--color-subtle-light)_92%,#63e2b7)]">
                      投注额
                    </dt>
                    <dd class="flex min-h-0 items-baseline gap-2 truncate text-[17px] font-black tabular-nums leading-none tracking-tight text-[var(--color-main)] [text-shadow:0_1px_0_rgba(255,255,255,0.08)] dark:[text-shadow:0_2px_8px_rgba(0,0,0,0.55)]">
                      <span aria-hidden="true" class="shrink-0 text-[13px] font-black text-[var(--color-subtle)] opacity-80">$</span><span class="tabular-nums">{{ totalStakeDisplay }}</span>
                    </dd>
                  </div>
                  <div
                    class="w-px shrink-0 bg-gradient-to-b from-transparent via-[var(--color-surface-hover)] to-transparent dark:via-[color-mix(in_srgb,var(--color-surface-hover)_70%,#0FA372_30%)]"
                    aria-hidden="true"
                  />
                  <div class="relative min-w-0 flex-1 px-3 py-2 text-right sm:px-4">
                    <div
                      aria-hidden="true"
                      class="pointer-events-none absolute inset-y-2 right-0 w-[55%] rounded-l-full bg-[radial-gradient(ellipse_at_100%_50%,color-mix(in_srgb,var(--color-primary)_26%,transparent),transparent_72%)] opacity-95 dark:bg-[radial-gradient(ellipse_at_100%_50%,color-mix(in_srgb,#0FA372_32%,transparent),transparent_74%)]"
                    />
                    <dt class="relative mb-0.5 block text-[10px] font-extrabold uppercase tracking-[0.14em] text-[color-mix(in_srgb,var(--color-subtle)_88%,var(--color-primary)_12%)] dark:text-[color-mix(in_srgb,var(--color-subtle-light)_78%,var(--color-primary)_22%)]">
                      可赔付额
                    </dt>
                    <dd class="relative flex min-h-0 items-baseline justify-end gap-2 truncate text-[18px] font-black tabular-nums leading-none tracking-tight text-[var(--color-primary)] drop-shadow-[0_0_18px_color-mix(in_srgb,var(--color-primary)_30%,transparent)] dark:text-[#63e2b7] dark:drop-shadow-[0_0_22px_color-mix(in_srgb,var(--color-primary)_45%,transparent)]">
                      <span aria-hidden="true" class="shrink-0 text-[13px] font-black opacity-90">$</span><span class="tabular-nums">{{ potentialPayoutDisplay }}</span>
                    </dd>
                  </div>
                </dl>
                <div class="flex min-h-0 w-full shrink-0 items-center gap-3">
                  <button
                    type="button"
                    class="bet-slip-place relative flex min-h-[44px] flex-1 items-center justify-center overflow-hidden rounded-2xl border-none py-2 text-[15px] font-black tracking-wide transition-[filter,transform,box-shadow] duration-200 [-webkit-tap-highlight-color:transparent] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.15)_0%,transparent_50%)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 disabled:grayscale [@media(hover:hover)]:enabled:hover:brightness-110"
                    :disabled="slipLines.length === 0 || totalStake <= 0"
                    @click="emit('place-bet', { lines: slipLines, slipMode, oddsPreference, totalStake, potentialPayout })"
                  >
                    <span class="bet-slip-place-label relative z-10">下单</span>
                  </button>
                  <button
                    type="button"
                    class="flex size-[44px] shrink-0 items-center justify-center rounded-2xl border-2 border-[color-mix(in_srgb,var(--color-surface-hover)_65%,transparent)] bg-gradient-to-br from-[color-mix(in_srgb,var(--color-surface-hover)_18%,var(--color-surface))] to-[var(--color-surface)] text-[var(--color-main)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-200 [-webkit-tap-highlight-color:transparent] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:grayscale [@media(hover:hover)]:enabled:hover:border-[color-mix(in_srgb,var(--color-live)_42%,var(--color-surface-hover))] [@media(hover:hover)]:enabled:hover:bg-gradient-to-br [@media(hover:hover)]:enabled:hover:from-[color-mix(in_srgb,var(--color-live)_14%,var(--color-surface))] [@media(hover:hover)]:enabled:hover:to-[color-mix(in_srgb,var(--color-live)_8%,var(--color-surface))] [@media(hover:hover)]:enabled:hover:text-[var(--color-live)] [@media(hover:hover)]:enabled:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_16px_color-mix(in_srgb,var(--color-live)_25%,transparent)]"
                    :disabled="slipLines.length === 0"
                    aria-label="清空投注单"
                    @click="clearAll"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5" aria-hidden="true">
                      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" />
                    </svg>
                  </button>
                </div>
              </footer>
        </aside>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

export interface BetSlipLineState {
  selectionKey: string;
  marketTitle: string;
  marketSub: string;
  matchLabel: string;
  odds: string;
  stake: string;
  minStake: number;
  maxStake: number;
}

export interface BetSlipAddPayload {
  matchId: string;
  selectionKey: string;
  marketTitle: string;
  marketSub: string;
  matchLabel: string;
  odds: string;
}

const router = useRouter();
const goH5Home = inject<(() => void) | undefined>('h5GoHome');

const modelValue = defineModel<boolean>({ required: true });
const linesSingle = defineModel<BetSlipLineState[]>('linesSingle', { default: () => [] });
const linesParlay = defineModel<BetSlipLineState[]>('linesParlay', { default: () => [] });
const slipMode = defineModel<'single' | 'parlay'>('slipMode', { default: 'single' });

const emit = defineEmits<{
  'place-bet': [
    payload: {
      lines: BetSlipLineState[];
      slipMode: 'single' | 'parlay';
      oddsPreference: string;
      totalStake: number;
      potentialPayout: number;
    },
  ];
}>();

const oddsPreference = ref<'better' | 'any' | 'none' | 'small'>('better');

const slipLines = computed({
  get(): BetSlipLineState[] {
    return slipMode.value === 'single' ? linesSingle.value : linesParlay.value;
  },
  set(next: BetSlipLineState[]) {
    if (slipMode.value === 'single') {
      linesSingle.value = next;
    } else {
      linesParlay.value = next;
    }
  },
});

const oddsPrefOptions = [
  { value: 'better' as const, label: '接受更好的赔率' },
  { value: 'any' as const, label: '接受任何赔率' },
  { value: 'none' as const, label: '不接受赔率变动' },
  { value: 'small' as const, label: '接受小幅度赔率变动(0.2)' },
];

watch(
  () => modelValue.value,
  (open) => {
    if (open) {
      oddsPreference.value = 'better';
    }
  },
);

watch(
  [linesParlay, slipMode],
  () => {
    if (slipMode.value !== 'parlay' || linesParlay.value.length < 2) return;
    const stake0 = linesParlay.value[0]?.stake ?? '0';
    if (linesParlay.value.every((l, i) => (i === 0 ? true : l.stake === stake0))) return;
    linesParlay.value = linesParlay.value.map((l, i) => (i === 0 ? l : { ...l, stake: stake0 }));
  },
  { deep: true },
);

function close() {
  modelValue.value = false;
}

function goHomeFromEmptyBetSlip() {
  close();
  if (goH5Home) {
    goH5Home();
  } else if (router.currentRoute.value.path !== '/h5') {
    router.push('/h5');
  }
}

function removeLine(key: string) {
  slipLines.value = slipLines.value.filter((l) => l.selectionKey !== key);
}

function clearAll() {
  slipLines.value = [];
}

function onStakeInput(key: string, raw: string) {
  const cleaned = raw.replace(/[^\d.]/g, '');
  slipLines.value = slipLines.value.map((l) =>
    l.selectionKey === key ? { ...l, stake: cleaned } : l,
  );
}

const totalStake = computed(() => {
  const lst = slipLines.value;
  if (lst.length === 0) return 0;
  if (slipMode.value === 'single') {
    return lst.reduce((sum, l) => sum + (parseFloat(l.stake) || 0), 0);
  }
  return parseFloat(lst[0]?.stake || '0') || 0;
});

const totalStakeDisplay = computed(() => totalStake.value.toFixed(2));

const potentialPayout = computed(() => {
  const lst = slipLines.value;
  if (lst.length === 0) return 0;
  if (slipMode.value === 'single') {
    return lst.reduce((sum, l) => {
      const s = parseFloat(l.stake) || 0;
      const o = parseFloat(l.odds) || 0;
      return sum + s * o;
    }, 0);
  }
  const oddsProduct = lst.reduce((p, l) => p * (parseFloat(l.odds) || 1), 1);
  const parlayStake = parseFloat(lst[0]?.stake || '0') || 0;
  return parlayStake * oddsProduct;
});

const potentialPayoutDisplay = computed(() => potentialPayout.value.toFixed(2));

const parlayComboOddsDisplay = computed(() => {
  if (slipMode.value !== 'parlay' || slipLines.value.length === 0) return '—';
  const product = slipLines.value.reduce((p, l) => p * (parseFloat(l.odds) || 1), 1);
  if (!Number.isFinite(product) || product <= 0) return '—';
  return product.toFixed(2);
});
</script>
