<template>
  <!-- Marquee separator -->
  <div class="overflow-hidden border-t border-white/[0.05] bg-black py-4">
    <div class="marquee flex gap-10 whitespace-nowrap text-[10px] font-semibold
                uppercase tracking-[0.35em] text-white/12 select-none">
      <span v-for="i in 18" :key="i">HELIO Vision &nbsp;·&nbsp;</span>
    </div>
  </div>

  <!-- Features -->
  <section id="features" class="bg-black py-24 lg:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-10">
      <div class="mx-auto mb-16 max-w-xl text-center">
        <p class="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-violet-400">{{ t('feat.title') }}</p>
        <h2 class="reveal-h text-4xl font-bold tracking-tight text-white md:text-5xl xl:text-6xl">
          <span class="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">{{ t('feat.h1_1') }}</span><br/>
          <span class="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">{{ t('feat.h1_2') }}</span>
        </h2>
      </div>

      <!-- Big + small layout -->
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 mb-4">
        <!-- Big card -->
        <div class="reveal-card helio-card group rounded-3xl p-10 lg:p-12 transition-all duration-300 hover:bg-white/[0.05]">
          <div class="mb-6 inline-flex rounded-2xl bg-violet-500/10 p-3 ring-1 ring-violet-500/20">
            <svg class="h-6 w-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-semibold text-white">{{ t('feat.inner_title') }}</h3>
          <p class="mt-3 text-base font-light leading-relaxed text-white/50">
            {{ t('feat.inner_desc') }}
          </p>
          <div class="mt-6 flex items-center gap-2 text-xs font-semibold text-violet-400 group-hover:gap-3 transition-all">
            <span>{{ t('feat.learn_more') }}</span>
            <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
            </svg>
          </div>
        </div>
        <!-- Small cards -->
        <div class="grid grid-rows-2 gap-4">
          <div v-for="feat in smallFeats" :key="feat.title"
            class="reveal-card helio-card rounded-3xl p-7 transition-all duration-300 hover:bg-white/[0.05]">
            <p class="text-[10px] font-semibold uppercase tracking-widest text-violet-400 mb-2">{{ t(feat.tag) }}</p>
            <h3 class="text-lg font-semibold text-white">{{ t(feat.title) }}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-white/50">{{ t(feat.desc) }}</p>
          </div>
        </div>
      </div>

      <!-- Specs strip -->
      <div id="specs" class="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div v-for="spec in specStrip" :key="spec.value"
          class="reveal-card helio-card rounded-3xl p-6 text-center transition-all duration-300 hover:bg-white/[0.05]">
          <p class="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent
                    text-4xl font-bold lg:text-5xl">{{ spec.value }}</p>
          <p class="mt-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">{{ t(spec.label) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '@/composables/useI18n'

gsap.registerPlugin(ScrollTrigger)

const { t } = useI18n()

const smallFeats = [
  { tag: 'feat.audio_tag',  title: 'feat.audio_title', desc: 'feat.audio_desc' },
  { tag: 'feat.input_tag',  title: 'feat.input_title', desc: 'feat.input_desc' },
]
const specStrip = [
  { value: '34M',  label: 'spec.pixels'   },
  { value: '8ms',  label: 'spec.latency'  },
  { value: '3h', label: 'spec.battery'  },
  { value: '8K',   label: 'spec.eye'  },
]

onMounted(() => {
  gsap.utils.toArray<HTMLElement>('.reveal-h').forEach(el => {
    gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }, y: 32, opacity: 0, duration: 0.9, ease: 'power3.out' })
  })
  gsap.utils.toArray<HTMLElement>('.reveal-card').forEach((el, i) => {
    gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none reverse' }, y: 24, opacity: 0, duration: 0.65, delay: i * 0.06, ease: 'power2.out' })
  })
})
onUnmounted(() => ScrollTrigger.getAll().forEach(st => st.kill()))
</script>

<style scoped>
.helio-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); }
.marquee { animation: marquee 28s linear infinite; width: max-content; }
@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
</style>
