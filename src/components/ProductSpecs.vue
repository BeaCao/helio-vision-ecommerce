<template>
  <!-- ══════════════════════════════════════════════════════════════════
       PRODUCT SPECS  —  aparece inmediatamente tras el canvas
       ══════════════════════════════════════════════════════════════════ -->
  <div class="relative bg-black">

    <!-- ── Marquee separator ──────────────────────────────────────── -->
    <div class="overflow-hidden border-t border-white/[0.06] py-5">
      <div class="marquee-track flex gap-12 whitespace-nowrap text-[10px] font-semibold
                  uppercase tracking-[0.3em] text-white/20 select-none">
        <span v-for="i in 14" :key="i">HELIO Vision Pro &nbsp;·&nbsp;</span>
      </div>
    </div>

    <!-- ── Section 1 — Design ─────────────────────────────────────── -->
    <section class="section-block mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
      <div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">

        <!-- Text (sticky on desktop) -->
        <div class="lg:sticky lg:top-28">
          <TagLabel>{{ t('spec.label_design') }}</TagLabel>
          <h2 class="reveal-heading mt-4 text-3xl font-semibold leading-tight tracking-tight
                     md:text-5xl xl:text-6xl">
            <span class="text-gradient-white">{{ t('spec.title_design_1') }}</span><br/>
            <span class="text-gradient-blue">{{ t('spec.title_design_2') }}</span>
          </h2>
          <p class="reveal-body mt-5 max-w-md text-base font-light leading-relaxed text-apple-silver
                    md:text-lg">
            {{ t('spec.desc_design') }}
          </p>

          <!-- Spec list -->
          <ul class="mt-8 space-y-3">
            <li
              v-for="item in designSpecs"
              :key="item.label"
              class="reveal-item flex items-start gap-3"
            >
              <span class="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center
                           rounded-full bg-apple-blue/15 ring-1 ring-apple-blue/30">
                <svg class="h-2.5 w-2.5 text-apple-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1
                       0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"/>
                </svg>
              </span>
              <div>
                <p class="text-sm font-semibold text-white">{{ item.label }}</p>
                <p class="text-sm text-apple-silver/80">{{ item.value }}</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Cards column -->
        <div class="space-y-4">
          <div
            v-for="(card, i) in designCards"
            :key="i"
            class="reveal-card glass group rounded-3xl p-7
                   transition-all duration-300 hover:bg-white/[0.07] hover:shadow-xl
                   hover:shadow-apple-blue/5"
          >
            <div class="mb-4 inline-flex rounded-2xl bg-apple-blue/10 p-2.5 ring-1 ring-apple-blue/20">
              <component :is="card.icon" class="h-5 w-5 text-apple-blue" />
            </div>
            <h3 class="text-base font-semibold text-white">{{ card.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-apple-silver/80">{{ card.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Thin rule ──────────────────────────────────────────────── -->
    <div class="mx-auto max-w-7xl px-6 lg:px-12">
      <div class="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
    </div>

    <!-- ── Section 2 — Performance ───────────────────────────────── -->
    <section class="section-block mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
      <div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">

        <!-- Stats grid -->
        <div class="grid grid-cols-2 gap-3">
          <div
            v-for="stat in perfStats"
            :key="stat.value"
            class="reveal-card glass rounded-3xl p-6 text-center"
          >
            <p class="text-gradient-blue text-4xl font-bold lg:text-5xl">{{ stat.value }}</p>
            <p class="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-apple-silver">
              {{ stat.label }}
            </p>
          </div>
        </div>

        <!-- Text (sticky) -->
        <div class="lg:sticky lg:top-28">
          <TagLabel>{{ t('spec.label_perf') }}</TagLabel>
          <h2 class="reveal-heading mt-4 text-3xl font-semibold leading-tight tracking-tight
                     md:text-5xl xl:text-6xl">
            <span class="text-gradient-white">{{ t('spec.title_perf_1') }}</span><br/>
            <span class="text-gradient-gold">{{ t('spec.title_perf_2') }}</span>
          </h2>
          <p class="reveal-body mt-5 max-w-md text-base font-light leading-relaxed text-apple-silver
                    md:text-lg">
            {{ t('spec.desc_perf') }}
          </p>

          <!-- Chip badges -->
          <div class="mt-8 flex gap-3">
            <span
              v-for="chip in ['M2', 'R1']"
              :key="chip"
              class="reveal-item rounded-full border border-white/10 bg-white/5
                     px-5 py-2 text-sm font-semibold text-white"
            >
              {{ chip }} chip
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Thin rule ──────────────────────────────────────────────── -->
    <div class="mx-auto max-w-7xl px-6 lg:px-12">
      <div class="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
    </div>

    <!-- ── Section 3 — Experience grid ──────────────────────────── -->
    <section class="section-block mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
      <div class="mx-auto mb-16 max-w-2xl text-center">
        <TagLabel class="mx-auto">{{ t('spec.label_exp') }}</TagLabel>
        <h2 class="reveal-heading mt-4 text-4xl font-semibold tracking-tight md:text-5xl xl:text-6xl">
          <span class="text-gradient-white">{{ t('spec.title_exp_1') }}</span><br/>
          <span class="text-gradient-blue">{{ t('spec.title_exp_2') }}</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(feat, i) in experienceFeatures"
          :key="i"
          class="reveal-card glass group rounded-3xl p-7
                 transition-all duration-300 hover:bg-white/[0.07] hover:scale-[1.02]
                 hover:shadow-lg hover:shadow-white/[0.03]"
        >
          <div class="mb-5 text-2xl">{{ feat.emoji }}</div>
          <h3 class="text-base font-semibold text-white">{{ feat.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-apple-silver/80">{{ feat.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ── CTA ────────────────────────────────────────────────────── -->
    <section class="relative overflow-hidden pb-32 pt-16 text-center">
      <!-- Glow -->
      <div class="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px]
                  -translate-x-1/2 -translate-y-1/2 rounded-full
                  bg-apple-blue/10 blur-[120px]" />

      <div class="relative">
        <TagLabel class="mx-auto">{{ t('spec.available') }}</TagLabel>
        <h2 class="reveal-heading mx-auto mt-6 text-3xl font-semibold md:text-5xl xl:text-6xl">
          {{ t('spec.from') }}&nbsp;<span class="text-gradient-blue">{{ formatPrice(3499) }}</span>
        </h2>
        <p class="mt-4 text-apple-silver">{{ t('spec.limited') }}</p>

        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            id="btn-order-now"
            class="group relative overflow-hidden rounded-full bg-apple-blue px-9 py-3.5
                   text-sm font-semibold text-white
                   transition-all duration-200
                   hover:shadow-xl hover:shadow-apple-blue/40
                   active:scale-95"
          >
            <span class="relative z-10">{{ t('spec.order_now') }}</span>
            <span class="absolute inset-0 translate-y-full bg-white/10 transition-transform
                         duration-300 group-hover:translate-y-0" />
          </button>
          <button
            id="btn-learn-more"
            class="rounded-full border border-white/15 bg-white/[0.04] px-9 py-3.5
                   text-sm font-semibold text-white
                   transition-all duration-200 hover:bg-white/10 active:scale-95"
          >
            {{ t('spec.learn_more_cta') }}
          </button>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, h, defineComponent, computed } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '@/composables/useI18n'

const { t, formatPrice } = useI18n()

gsap.registerPlugin(ScrollTrigger)

// ── Inline tag label component ─────────────────────────────────────────────────
const TagLabel = defineComponent({
  setup(_, { slots }) {
    return () => h('p', {
      class: 'inline-block text-[10px] font-semibold uppercase tracking-[0.4em] text-apple-blue',
    }, slots.default?.())
  },
})

// ── Data ──────────────────────────────────────────────────────────────────────
const designSpecs = computed(() => [
  { label: t.value('spec.design_spec_label_1'),  value: t.value('spec.design_spec_val_1') },
  { label: t.value('spec.design_spec_label_2'),    value: t.value('spec.design_spec_val_2') },
  { label: t.value('spec.design_spec_label_3'),      value: t.value('spec.design_spec_val_3') },
  { label: t.value('spec.design_spec_label_4'),   value: t.value('spec.design_spec_val_4') },
])

const IconEye = { render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', 'stroke-width': '1.5', stroke: 'currentColor' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z' }), h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' })]) }
const IconStar = { render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', 'stroke-width': '1.5', stroke: 'currentColor' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' })]) }
const IconShield = { render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', 'stroke-width': '1.5', stroke: 'currentColor' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z' })]) }

const designCards = computed(() => [
  { icon: IconEye,     title: t.value('spec.card_eyesight_title'),         desc: t.value('spec.card_eyesight_desc') },
  { icon: IconStar,    title: t.value('spec.card_visionos_title'),          desc: t.value('spec.card_visionos_desc') },
  { icon: IconShield,  title: t.value('spec.card_privacy_title'), desc: t.value('spec.card_privacy_desc') },
])

const perfStats = computed(() => [
  { value: '34M',  label: t.value('spec.pixels')     },
  { value: '8ms', label: t.value('spec.latency')    },
  { value: '3h', label: t.value('spec.battery')    },
  { value: '8K',   label: t.value('spec.eye') },
])

const experienceFeatures = computed(() => [
  { emoji: '🎬', title: t.value('spec.exp_feat_1_title'),  desc: t.value('spec.exp_feat_1_desc') },
  { emoji: '💼', title: t.value('spec.exp_feat_2_title'),   desc: t.value('spec.exp_feat_2_desc') },
  { emoji: '🎮', title: t.value('spec.exp_feat_3_title'),         desc: t.value('spec.exp_feat_3_desc') },
  { emoji: '🧘', title: t.value('spec.exp_feat_4_title'),    desc: t.value('spec.exp_feat_4_desc') },
  { emoji: '👨‍👩‍👧', title: t.value('spec.exp_feat_5_title'),      desc: t.value('spec.exp_feat_5_desc') },
  { emoji: '🔮', title: t.value('spec.exp_feat_6_title'), desc: t.value('spec.exp_feat_6_desc') },
])

// ── GSAP ──────────────────────────────────────────────────────────────────────
onMounted(() => {
  const stConfig = { start: 'top 88%', toggleActions: 'play none none reverse' }

  gsap.utils.toArray<HTMLElement>('.reveal-heading').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, ...stConfig },
      y: 36, opacity: 0, duration: 0.9, ease: 'power3.out',
    })
  })

  gsap.utils.toArray<HTMLElement>('.reveal-body').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, ...stConfig },
      y: 20, opacity: 0, duration: 0.8, delay: 0.12, ease: 'power2.out',
    })
  })

  gsap.utils.toArray<HTMLElement>('.reveal-card').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, ...stConfig },
      y: 28, opacity: 0, duration: 0.65, delay: i * 0.07, ease: 'power2.out',
    })
  })

  gsap.utils.toArray<HTMLElement>('.reveal-item').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none reverse' },
      x: -16, opacity: 0, duration: 0.55, delay: i * 0.08, ease: 'power2.out',
    })
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(st => st.kill())
})
</script>

<style scoped>
/* Infinite marquee */
.marquee-track {
  animation: marquee 22s linear infinite;
  width: max-content;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
</style>
