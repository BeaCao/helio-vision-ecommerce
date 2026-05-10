<template>
  <section id="more-products" class="bg-black py-24 border-t border-white/[0.05]">
    <div class="mx-auto max-w-7xl px-6 lg:px-10">
      <div class="mb-12">
        <p class="mb-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-violet-400">{{ t('list.label') }}</p>
        <h2 class="text-3xl font-bold text-white md:text-4xl">
          <span class="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">{{ t('list.h1_1') }}</span><br/>
          <span class="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">{{ t('list.h1_2') }}</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="product in products" :key="product.id"
          @click="openProduct(product)"
          class="group flex flex-col rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6
                 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/15 cursor-pointer">
          <!-- Visual -->
          <div class="mb-6 flex h-48 w-full items-center justify-center rounded-2xl
                      bg-gradient-to-br transition-all duration-500 group-hover:scale-[1.02]"
               :class="product.bgClass">
            <span class="text-6xl">{{ product.icon }}</span>
          </div>

          <!-- Info -->
          <div class="flex-1">
            <h3 class="text-lg font-bold text-white">{{ product.name }}</h3>
            <p class="mt-2 text-sm text-white/50 leading-relaxed">{{ product.desc }}</p>
          </div>

          <!-- Footer -->
          <div class="mt-6 flex items-center justify-between">
            <span class="text-base font-semibold text-white">{{ t('list.from') }} {{ formatPrice(product.basePrice) }}</span>
            <button class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10
                           text-white transition-all hover:bg-violet-600 hover:scale-110"
                    title="Ver detalles" @click.stop="openProduct(product)">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal del producto -->
    <Transition name="modal-fade">
      <div v-if="selectedProduct" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/80 backdrop-blur-md" @click="selectedProduct = null"></div>
        
        <!-- Modal Content -->
        <div class="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/[0.08] bg-[#111] shadow-2xl">
          <button @click="selectedProduct = null" 
                  class="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white/60 hover:text-white transition-colors">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          
          <div class="flex flex-col md:flex-row h-full">
            <!-- Left: Visual -->
            <div class="flex h-64 md:h-auto md:w-1/2 items-center justify-center bg-gradient-to-br"
                 :class="selectedProduct.bgClass">
              <span class="text-8xl md:text-[120px] filter drop-shadow-2xl animate-pulse">{{ selectedProduct.icon }}</span>
            </div>
            
            <!-- Right: Details -->
            <div class="flex flex-col p-8 md:w-1/2">
              <div class="mb-4">
                <p class="mb-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-400">{{ t('list.special') }}</p>
                <h3 class="text-2xl font-bold text-white">{{ selectedProduct.name }}</h3>
              </div>
              
              <p class="flex-1 text-sm text-white/50 leading-relaxed">
                {{ selectedProduct.desc }}
                <br/><br/>
                {{ t('list.designed_for') }}
              </p>
              
              <!-- Opciones dinámicas -->
              <div v-if="selectedProduct.options" class="mt-6 border-t border-white/[0.05] pt-5">
                <p class="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">{{ selectedProduct.options.label }}</p>
                
                <!-- Colores -->
                <div v-if="selectedProduct.options.type === 'color'" class="flex items-center gap-3">
                  <div class="flex gap-3">
                    <button v-for="(choice, i) in selectedProduct.options.choices" :key="choice.name"
                      @click="selectedOptionIndex = i"
                      class="h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-[#111] transition-all duration-200"
                      :class="selectedOptionIndex === i ? 'ring-white scale-110' : 'ring-transparent hover:ring-white/30'"
                      :style="{ background: choice.hex }" :title="choice.name"></button>
                  </div>
                  <span class="ml-2 text-xs text-white/50">{{ selectedProduct.options.choices[selectedOptionIndex].name }}</span>
                </div>

                <!-- Tamaños/Modelos -->
                <div v-else-if="selectedProduct.options.type === 'size'" class="flex gap-2">
                  <button v-for="(choice, i) in selectedProduct.options.choices" :key="choice.name"
                    @click="selectedOptionIndex = i"
                    class="flex-1 rounded-xl border py-2.5 text-xs font-semibold transition-all duration-200"
                    :class="selectedOptionIndex === i ? 'border-violet-500 bg-violet-500/15 text-white ring-1 ring-violet-500/30' : 'border-white/[0.08] bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white'">
                    {{ choice.name }}
                    <span v-if="choice.extra > 0" class="block text-[9px] text-violet-400 mt-1">+{{ choice.extra }}€</span>
                  </button>
                </div>

                <!-- Info texto -->
                <div v-else-if="selectedProduct.options.type === 'text'" class="rounded-xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-white/60">
                  <span class="text-lg mb-1 block">📄</span>
                  {{ selectedProduct.options.text }}
                </div>
              </div>

              <div class="mt-8">
                <div class="mb-4 flex items-center justify-between border-t border-white/[0.05] pt-5">
                  <span class="text-sm text-white/40">{{ t('list.total') }}</span>
                  <span class="text-3xl font-bold text-white">{{ formatPrice(finalPrice) }}</span>
                </div>
                
                <button @click="handleAddToCart(selectedProduct)"
                        class="w-full rounded-full bg-violet-600 py-3.5 text-sm font-bold text-white transition-all hover:bg-violet-500 hover:shadow-xl hover:shadow-violet-600/25 active:scale-[0.98]">
                  {{ t('list.add_cart') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t, formatPrice } = useI18n()

const emit = defineEmits(['add-to-cart'])

const selectedProduct = ref<any>(null)
const selectedOptionIndex = ref(0)

const finalPrice = computed(() => {
  if (!selectedProduct.value) return 0
  let extra = 0
  if (selectedProduct.value.options?.choices) {
    extra = selectedProduct.value.options.choices[selectedOptionIndex.value].extra || 0
  }
  return selectedProduct.value.basePrice + extra
})

const products = computed(() => [
  {
    id: 1,
    name: 'HELIO Air',
    desc: t.value('nav.sug_light'),
    basePrice: 1499,
    icon: '🥽',
    bgClass: 'from-blue-500/20 to-cyan-500/5',
    options: {
      type: 'color', label: t.value('buy.material'),
      choices: [
        { name: t.value('Negro Estelar'), extra: 0, hex: 'linear-gradient(135deg,#222,#000)' },
        { name: t.value('Blanco Ártico'), extra: 0, hex: 'linear-gradient(135deg,#eee,#ddd)' }
      ]
    }
  },
  {
    id: 2,
    name: 'HaloBattery Pro',
    desc: t.value('nav.sug_battery'),
    basePrice: 199,
    icon: '🔋',
    bgClass: 'from-emerald-500/20 to-teal-500/5',
    options: {
      type: 'size', label: t.value('spec.battery'),
      choices: [
        { name: 'Estándar (6h)', extra: 0 },
        { name: 'Max (12h)', extra: 99 }
      ]
    }
  },
  {
    id: 3,
    name: 'HELIO Vision Case',
    desc: t.value('list.designed_for'),
    basePrice: 99,
    icon: '💼',
    bgClass: 'from-orange-500/20 to-amber-500/5',
    options: {
      type: 'color', label: t.value('buy.material'),
      choices: [
        { name: 'Carbón', extra: 0, hex: '#333' },
        { name: 'Gris Ártico', extra: 0, hex: '#aaa' }
      ]
    }
  },
  {
    id: 4,
    name: t.value('nav.sug_optical'),
    desc: t.value('buy.optical_desc'),
    basePrice: 149,
    icon: '👓',
    bgClass: 'from-violet-500/20 to-purple-500/5',
    options: {
      type: 'text', label: t.value('cart.optical'), text: t.value('buy.optical_desc')
    }
  },
])

function openProduct(p: any) {
  selectedProduct.value = p
  selectedOptionIndex.value = 0
}

function handleAddToCart(product: any) {
  let optionName = ''
  if (product.options?.choices) {
    optionName = ` (${product.options.choices[selectedOptionIndex.value].name})`
  }

  emit('add-to-cart', {
    id: `addon-${product.id}-${selectedOptionIndex.value}`,
    colorName: product.name + optionName,
    colorBody: '#222',
    colorLens: '#000',
    colorGlow: product.bgClass.includes('emerald') ? 'rgba(16,185,129,0.2)' : 'rgba(139,92,246,0.2)',
    storage: 0,
    material: t.value('footer.acc'),
    prescription: false,
    quantity: 1,
    unitPrice: finalPrice.value
  })
  selectedProduct.value = null
}
</script>

<style scoped>
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-active > div:nth-child(2) { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-fade-enter-from > div:nth-child(2) { transform: scale(0.95) translateY(20px); }
.modal-fade-leave-active > div:nth-child(2) { transition: transform 0.3s ease; }
.modal-fade-leave-to > div:nth-child(2) { transform: scale(0.95) translateY(20px); }
</style>
