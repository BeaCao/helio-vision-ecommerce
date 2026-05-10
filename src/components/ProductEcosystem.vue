<template>
  <section id="ecosystem" class="relative overflow-hidden bg-black py-24 lg:py-32">
    <!-- Background glows -->
    <div class="pointer-events-none absolute -left-[20%] top-1/4 h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-[120px]" />
    <div class="pointer-events-none absolute -right-[20%] bottom-1/4 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[120px]" />

    <div class="relative mx-auto max-w-7xl px-6 lg:px-10">
      <div class="mb-20 text-center">
        <p class="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-violet-400">{{ t('eco.label') }}</p>
        <h2 class="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
          <span class="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">{{ t('eco.h1_1') }}</span><br/>
          <span class="bg-gradient-to-r from-fuchsia-400 to-orange-400 bg-clip-text text-transparent">{{ t('eco.h1_2') }}</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
        <!-- Neural Band -->
        <div class="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-white/[0.05] bg-white/[0.02] p-10 transition-all hover:bg-white/[0.04]">
          <div class="absolute inset-0 bg-gradient-to-b from-fuchsia-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div class="relative z-10 mb-10 flex h-64 items-center justify-center">
            <div class="absolute h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl transition-all duration-700 group-hover:bg-fuchsia-500/30 group-hover:scale-110" />
            <span class="relative text-9xl filter drop-shadow-[0_0_30px_rgba(217,70,239,0.5)] transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3">🧠</span>
          </div>
          <div class="relative z-10 flex flex-1 flex-col justify-end text-center md:text-left">
            <p class="mb-2 text-[10px] font-semibold uppercase tracking-widest text-fuchsia-400">{{ t('eco.new') }}</p>
            <h3 class="mb-4 text-3xl font-bold text-white">HELIO Neural Band</h3>
            <p class="mb-8 text-sm leading-relaxed text-white/50">{{ t('eco.neural_desc') }}</p>
            
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-white/10 pt-6">
              <div>
                <p class="text-2xl font-bold text-white">{{ formatPrice(499) }}</p>
                <div class="mt-2 flex gap-2">
                  <button v-for="size in ['S/M', 'M/L']" :key="size" @click="neuralSize = size"
                    class="rounded-lg border px-3 py-1 text-[10px] font-bold transition-all"
                    :class="neuralSize === size ? 'border-fuchsia-500 bg-fuchsia-500/20 text-white' : 'border-white/10 text-white/40 hover:text-white'">
                    {{ t('eco.size') }} {{ size }}
                  </button>
                </div>
              </div>
              <button @click="addNeural" class="rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-all hover:bg-fuchsia-400 hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] active:scale-95">
                {{ t('eco.add_cart') }}
              </button>
            </div>
          </div>
        </div>

        <!-- Smart Gloves -->
        <div class="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-white/[0.05] bg-white/[0.02] p-10 transition-all hover:bg-white/[0.04]">
          <div class="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div class="relative z-10 mb-10 flex h-64 items-center justify-center">
            <div class="absolute h-48 w-48 rounded-full bg-orange-500/20 blur-3xl transition-all duration-700 group-hover:bg-orange-500/30 group-hover:scale-110" />
            <span class="relative text-9xl filter drop-shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3">🧤</span>
          </div>
          <div class="relative z-10 flex flex-1 flex-col justify-end text-center md:text-left">
            <p class="mb-2 text-[10px] font-semibold uppercase tracking-widest text-orange-400">{{ t('eco.immersive') }}</p>
            <h3 class="mb-4 text-3xl font-bold text-white">HELIO Smart Gloves</h3>
            <p class="mb-8 text-sm leading-relaxed text-white/50">{{ t('eco.gloves_desc') }}</p>
            
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-white/10 pt-6">
              <div>
                <p class="text-2xl font-bold text-white">{{ formatPrice(299) }}</p>
                <div class="mt-2 flex gap-2 justify-center md:justify-start">
                  <button v-for="size in ['S', 'M', 'L']" :key="size" @click="gloveSize = size"
                    class="rounded-lg border px-3 py-1 text-[10px] font-bold transition-all"
                    :class="gloveSize === size ? 'border-orange-500 bg-orange-500/20 text-white' : 'border-white/10 text-white/40 hover:text-white'">
                    {{ t('eco.size') }} {{ size }}
                  </button>
                </div>
              </div>
              <button @click="addGloves" class="rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-all hover:bg-orange-400 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] active:scale-95">
                {{ t('eco.add_cart') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t, formatPrice } = useI18n()

const emit = defineEmits(['add-to-cart'])

const neuralSize = ref('S/M')
const gloveSize = ref('M')

function addNeural() {
  emit('add-to-cart', {
    id: `addon-neural-${neuralSize.value}`,
    colorName: `HELIO Neural Band (${neuralSize.value})`,
    colorBody: '#222',
    colorLens: '#000',
    colorGlow: 'rgba(217,70,239,0.2)',
    storage: 0,
    material: t.value('footer.acc'),
    prescription: false,
    quantity: 1,
    unitPrice: 499
  })
}

function addGloves() {
  emit('add-to-cart', {
    id: `addon-gloves-${gloveSize.value}`,
    colorName: `HELIO Smart Gloves (${t.value('eco.size')} ${gloveSize.value})`,
    colorBody: '#222',
    colorLens: '#000',
    colorGlow: 'rgba(249,115,22,0.2)',
    storage: 0,
    material: t.value('footer.acc'),
    prescription: false,
    quantity: 1,
    unitPrice: 299
  })
}
</script>
