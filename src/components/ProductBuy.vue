<template>
  <section id="buy" class="relative overflow-hidden bg-black py-24 lg:py-32">
    <div class="pointer-events-none absolute left-1/3 top-1/2 h-[700px] w-[700px]
                -translate-y-1/2 rounded-full bg-violet-600/8 blur-[160px]" />

    <div class="relative mx-auto max-w-7xl px-6 lg:px-10">
      <div class="mb-14 text-center">
        <p class="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-violet-400">{{ t('buy.subtitle') }}</p>
        <h2 class="text-4xl font-bold tracking-tight text-white md:text-5xl">
          <span class="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">HELIO Vision.</span>
          <span class="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent"> {{
            t('buy.title_highlight') }}</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">

        <!-- ── Visual side ──────────────────────────────────── -->
        <div class="flex flex-col items-center">
          <!-- Product view -->
          <div class="relative flex h-72 w-72 items-center justify-center rounded-full
                      lg:h-80 lg:w-80 transition-all duration-700 cursor-pointer group"
            :style="{ background: activeColor.glow }" @click="cycleView">
            <!-- 360 hint -->
            <span class="absolute bottom-6 text-[10px] uppercase tracking-widest text-white/25
                         group-hover:text-white/50 transition-colors select-none">
              {{ t(viewLabel) }} · {{ t('buy.tap_rotate') }}
            </span>

            <svg viewBox="0 0 120 80" class="relative z-10 h-48 w-48 drop-shadow-2xl
                                             transition-transform duration-500"
              :style="{ transform: `rotateY(${viewAngle}deg) scale(${1 + viewIndex * 0.02})` }" fill="none">
              <rect x="8" y="20" width="104" height="40" rx="20" :fill="activeColor.body" fill-opacity="0.92" />
              <rect x="8" y="20" width="104" height="11" rx="5" fill="white" fill-opacity="0.14" />
              <ellipse cx="32" cy="40" rx="19" ry="14" :fill="activeColor.lens" fill-opacity="0.88" />
              <ellipse cx="88" cy="40" rx="19" ry="14" :fill="activeColor.lens" fill-opacity="0.88" />
              <ellipse cx="32" cy="37" rx="8" ry="6" fill="white" fill-opacity="0.28" />
              <ellipse cx="88" cy="37" rx="8" ry="6" fill="white" fill-opacity="0.28" />
              <line x1="51" y1="40" x2="69" y2="40" stroke="white" stroke-opacity="0.2" stroke-width="2" />
            </svg>
          </div>

          <!-- View dots -->
          <div class="mt-4 flex gap-2">
            <button v-for="(_, i) in views" :key="i" @click="viewIndex = i"
              class="h-1.5 rounded-full transition-all duration-300"
              :class="viewIndex === i ? 'bg-white w-4' : 'bg-white/20 w-1.5'" />
          </div>

          <p class="mt-3 text-xs font-semibold uppercase tracking-widest text-white/40">
            {{ t(activeColor.name) }}
          </p>

          <!-- Color swatches -->
          <div class="mt-4 flex gap-3">
            <button v-for="(c, i) in colors" :key="i" :id="`color-${i}`" @click="selectedColor = i"
              class="h-7 w-7 rounded-full ring-2 ring-offset-2 ring-offset-black transition-all duration-200"
              :class="selectedColor === i ? 'ring-white scale-110' : 'ring-transparent hover:ring-white/30'"
              :style="{ background: c.swatch }" :aria-label="c.name" :title="c.name" />
          </div>

          <!-- Trust badges -->
          <div class="mt-10 grid grid-cols-3 gap-3 w-full max-w-xs">
            <div v-for="b in badges" :key="b.label" class="flex flex-col items-center gap-1.5 rounded-2xl border border-white/[0.06]
                     bg-white/[0.02] p-3 text-center">
              <span class="text-lg">{{ b.icon }}</span>
              <p class="text-[10px] font-semibold text-white/40">{{ t(b.label) }}</p>
            </div>
          </div>

          <!-- Wishlist -->
          <button @click="handleWishlist" id="btn-wishlist"
            class="mt-5 flex items-center gap-2 text-xs transition-colors"
            :class="wishlisted ? 'text-pink-500' : 'text-white/30 hover:text-white'">
            <svg class="h-4 w-4 transition-all duration-200"
              :class="wishlisted ? 'fill-pink-500 scale-110' : 'fill-none'" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            {{ wishlisted ? t('buy.wishlist_saved') : t('buy.wishlist_add') }}
          </button>
        </div>

        <!-- ── Config panel ─────────────────────────────────── -->
        <div class="flex flex-col">
          <p class="text-[10px] font-semibold uppercase tracking-[0.4em] text-violet-400">HELIO Vision Pro</p>
          <div class="mt-2 flex items-baseline gap-3">
            <h3 class="text-4xl font-bold text-white">
              <span class="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                {{ formatPrice(totalNumeric) }}
              </span>
            </h3>
            <span class="text-sm text-white/30 line-through">{{ formatPrice(totalNumeric + 400) }}</span>
          </div>
          <p class="mt-1 text-sm text-white/35">{{ t('buy.or') }} {{ formatPrice(Math.round(totalNumeric / 12)) }}/{{
            t('buy.month') }} {{ t('buy.for_12') }}*</p>

          <!-- Storage -->
          <div class="mt-8">
            <div class="mb-3 flex items-center justify-between">
              <p class="text-[10px] font-semibold uppercase tracking-widest text-white/40">{{ t('buy.storage') }}</p>
              <button class="text-[10px] text-violet-400 hover:text-violet-300 transition-colors"
                @click="storageInfoOpen = !storageInfoOpen">
                {{ t('buy.how_much') }}
              </button>
            </div>
            <Transition name="expand">
              <div v-if="storageInfoOpen"
                class="mb-3 rounded-xl border border-violet-500/20 bg-violet-500/5 p-3 text-xs leading-relaxed text-white/50"
                v-html="t('buy.storage_info')">
              </div>
            </Transition>
            <div class="flex gap-3">
              <button v-for="opt in storageOpts" :key="opt.gb" :id="`storage-${opt.gb}`"
                @click="selectedStorage = opt.gb"
                class="flex-1 rounded-2xl border py-3 text-sm font-semibold transition-all duration-200" :class="selectedStorage === opt.gb
                  ? 'border-violet-500 bg-violet-500/10 text-white ring-1 ring-violet-500/30'
                  : 'border-white/[0.08] bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white'">
                {{ opt.gb === 1000 ? '1 TB' : opt.gb + ' GB' }}
                <span class="block text-[10px] font-normal"
                  :class="selectedStorage === opt.gb ? 'text-violet-400' : 'text-white/25'">
                  {{ formatPrice(opt.price) }}
                </span>
              </button>
            </div>
          </div>

          <!-- Frame material -->
          <div class="mt-6">
            <p class="mb-3 text-[10px] font-semibold uppercase tracking-widest text-white/40">{{ t('buy.material') }}
            </p>
            <div class="grid grid-cols-3 gap-2">
              <button v-for="mat in materials" :key="mat.name" :id="`mat-${mat.name}`" @click="selectedMat = mat.name"
                class="rounded-2xl border px-3 py-3 text-xs font-semibold transition-all duration-200 text-center"
                :class="selectedMat === mat.name
                  ? 'border-violet-500 bg-violet-500/10 text-white'
                  : 'border-white/[0.08] bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white'">
                {{ t(mat.name) }}
                <span class="block text-[10px] font-normal mt-0.5"
                  :class="selectedMat === mat.name ? 'text-violet-400' : 'text-white/25'">
                  {{ mat.extra > 0 ? '+' + formatPrice(mat.extra) : t(mat.extraLabel) }}
                </span>
              </button>
            </div>
          </div>

          <!-- Prescription -->
          <div class="mt-6 flex items-center justify-between rounded-2xl border border-white/[0.08]
                      bg-white/[0.02] px-4 py-3 cursor-pointer hover:border-white/15 transition-all"
            @click="withPrescription = !withPrescription">
            <div>
              <p class="text-sm font-semibold text-white">{{ t('buy.optical_title') }}</p>
              <p class="text-xs text-white/35">{{ t('buy.optical_desc') }} (+{{ formatPrice(149) }})</p>
            </div>
            <div class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 shrink-0"
              :class="withPrescription ? 'bg-violet-600' : 'bg-white/10'">
              <span
                class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200"
                :class="withPrescription ? 'translate-x-6' : 'translate-x-1'" />
            </div>
          </div>

          <!-- AppleCare analog -->
          <div class="mt-3 flex items-center justify-between rounded-2xl border border-white/[0.08]
                      bg-white/[0.02] px-4 py-3 cursor-pointer hover:border-white/15 transition-all"
            @click="withCare = !withCare">
            <div>
              <div class="flex items-center gap-2">
                <p class="text-sm font-semibold text-white">HELIO Care+</p>
                <span
                  class="rounded-full bg-violet-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-violet-400">
                  {{ t('buy.recommended') }}
                </span>
              </div>
              <p class="text-xs text-white/35">{{ t('buy.care_desc') }} (+{{ formatPrice(299) }})</p>
            </div>
            <div class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 shrink-0"
              :class="withCare ? 'bg-violet-600' : 'bg-white/10'">
              <span
                class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200"
                :class="withCare ? 'translate-x-6' : 'translate-x-1'" />
            </div>
          </div>

          <!-- Price summary -->
          <div class="my-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 space-y-2.5">
            <div class="flex justify-between text-sm">
              <span class="text-white/50">HELIO Vision {{ selectedStorage === 1000 ? '1TB' : selectedStorage + 'GB' }}
                ({{ t(selectedMat) }})</span>
              <span class="font-semibold text-white">{{ formatPrice(baseNumeric + matExtra) }}</span>
            </div>
            <div v-if="withPrescription" class="flex justify-between text-sm">
              <span class="text-white/50">{{ t('buy.optical_title') }}</span>
              <span class="font-semibold text-white">+{{ formatPrice(149) }}</span>
            </div>
            <div v-if="withCare" class="flex justify-between text-sm">
              <span class="text-white/50">HELIO Care+</span>
              <span class="font-semibold text-white">+{{ formatPrice(299) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-white/50">{{ t('buy.shipping') }}</span>
              <span class="font-semibold text-green-400">{{ t('buy.free') }}</span>
            </div>
            <div class="border-t border-white/[0.06] pt-2.5 flex justify-between font-bold text-white">
              <span>{{ t('buy.total') }}</span>
              <span>{{ formatPrice(totalNumeric) }}</span>
            </div>
          </div>

          <!-- Scarcity / Urgency -->
          <div class="mb-4 flex items-center gap-2 rounded-xl bg-orange-500/10 px-4 py-2.5 border border-orange-500/20">
            <span class="relative flex h-2.5 w-2.5">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
            </span>
            <p class="text-xs font-medium text-orange-400">
              {{ t('buy.demand') }}
            </p>
          </div>

          <div class="mb-5 flex items-center gap-2 text-xs text-white/40">
            <svg class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
            </svg>
            {{ t('buy.bought_month') }}
          </div>

          <!-- CTAs -->
          <button id="btn-add-to-bag" @click="handleAddToCart" class="group relative overflow-hidden rounded-full bg-violet-600 py-4
                   text-sm font-bold text-white transition-all duration-200
                   hover:bg-violet-500 hover:shadow-xl hover:shadow-violet-600/30 active:scale-[0.98]">
            <span class="relative z-10 flex items-center justify-center gap-2">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              {{ t('buy.add_cart') }}
            </span>
          </button>

          <button id="btn-buy-now" @click="handleBuyNow" class="mt-3 rounded-full border border-white/[0.12] bg-white/[0.03] py-4
                   text-sm font-bold text-white transition-all duration-200
                   hover:bg-white/[0.07] active:scale-[0.98]">
            {{ t('buy.buy_now') }}
          </button>

          <!-- Share -->
          <div class="mt-4 flex items-center justify-center gap-3">
            <button @click="copyLink" id="btn-share"
              class="flex items-center gap-2 text-xs text-white/30 hover:text-white transition-colors">
              <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
              {{ linkCopied ? t('buy.copied') : t('buy.share') }}
            </button>
          </div>

          <p class="mt-3 text-center text-[10px] text-white/20 pb-20 lg:pb-0">
            {{ t('buy.shipping_returns') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Sticky Mobile CTA -->
    <div class="fixed bottom-0 left-0 z-40 w-full border-t border-white/10 bg-black/80 p-4 backdrop-blur-md lg:hidden
                transition-all duration-500 transform"
         :class="showStickyCta ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'">
      <div class="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        <div class="flex flex-col">
          <span class="text-[10px] uppercase tracking-widest text-white/40">HELIO Vision Pro</span>
          <span class="text-lg font-bold text-white">{{ formatPrice(totalNumeric) }}</span>
        </div>
        <button @click="handleAddToCart" class="flex-1 rounded-full bg-violet-600 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/20 active:scale-95">
          {{ t('buy.add_cart') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t, formatPrice } = useI18n()

interface CartItem {
  id: string
  colorName: string; colorBody: string; colorLens: string; colorGlow: string
  storage: number; material: string; prescription: boolean
  quantity: number; unitPrice: number
}

const emit = defineEmits<{
  (e: 'addToCart', item: CartItem): void
  (e: 'toggleWishlist', item: CartItem): void
}>()

// ── Data ────────────────────────────────────────────────────────────
const colors = [
  { name: 'Negro Estelar', swatch: 'linear-gradient(135deg,#3a3a3c,#1c1c1e)', body: '#48484a', lens: '#7c3aed', glow: 'radial-gradient(circle,rgba(124,58,237,.25) 0%,transparent 70%)' },
  { name: 'Blanco Ártico', swatch: 'linear-gradient(135deg,#f0ece4,#d4cfc5)', body: '#e8e2d8', lens: '#3b82f6', glow: 'radial-gradient(circle,rgba(59,130,246,.22) 0%,transparent 70%)' },
  { name: 'Azul Medianoche', swatch: 'linear-gradient(135deg,#1e3a5f,#0f1f3d)', body: '#1e3a5f', lens: '#60a5fa', glow: 'radial-gradient(circle,rgba(96,165,250,.22) 0%,transparent 70%)' },
  { name: 'Oro Rosa', swatch: 'linear-gradient(135deg,#e8c4b0,#c4927c)', body: '#d4a896', lens: '#f472b6', glow: 'radial-gradient(circle,rgba(244,114,182,.22) 0%,transparent 70%)' },
]
const storageOpts = [
  { gb: 256, price: 2999, monthly: 249 },
  { gb: 512, price: 3249, monthly: 270 },
  { gb: 1000, price: 3499, monthly: 291 },
]
const materials = [
  { name: 'mat.titanium', extra: 0, extraLabel: 'mat.lighter' },
  { name: 'mat.aluminum', extra: 0, extraLabel: 'mat.standard' },
  { name: 'mat.carbon', extra: 200 },
]
const views = ['view.front', 'view.side', 'view.top', 'view.back']
const badges = [
  { icon: '🚚', label: 'badge.shipping' },
  { icon: '↩️', label: 'badge.returns' },
  { icon: '🛡️', label: 'badge.warranty' },
]

// ── State ────────────────────────────────────────────────────────────
const selectedColor = ref(0)
const selectedStorage = ref(256)
const selectedMat = ref('mat.titanium')
const withPrescription = ref(false)
const withCare = ref(false)
const wishlisted = ref(false)
const storageInfoOpen = ref(false)
const viewIndex = ref(0)
const linkCopied = ref(false)
const showStickyCta = ref(false)
const buySectionRef = ref<HTMLElement | null>(null)

// ── Computed ─────────────────────────────────────────────────────────
const activeColor = computed(() => colors[selectedColor.value])
const currentOpt = computed(() => storageOpts.find(o => o.gb === selectedStorage.value)!)
const baseNumeric = computed(() => currentOpt.value.price)
const matExtra = computed(() => selectedMat.value === 'mat.carbon' ? 200 : 0)
const totalNumeric = computed(() => baseNumeric.value + matExtra.value + (withPrescription.value ? 149 : 0) + (withCare.value ? 299 : 0))
const viewAngle = computed(() => viewIndex.value * 15)
const viewLabel = computed(() => views[viewIndex.value])

// ── Actions ───────────────────────────────────────────────────────────
function cycleView() { viewIndex.value = (viewIndex.value + 1) % views.length }

function handleAddToCart() {
  const c = activeColor.value
  emit('addToCart', {
    id: '', colorName: c.name, colorBody: c.body, colorLens: c.lens, colorGlow: c.glow,
    storage: selectedStorage.value, material: selectedMat.value,
    prescription: withPrescription.value, quantity: 1,
    unitPrice: totalNumeric.value,
  })
}

function handleBuyNow() {
  handleAddToCart()
  setTimeout(() => { document.getElementById('btn-checkout')?.scrollIntoView({ behavior: 'smooth' }) }, 200)
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href).catch(() => { })
  linkCopied.value = true
  setTimeout(() => { linkCopied.value = false }, 2500)
}

function handleWishlist() {
  wishlisted.value = !wishlisted.value
  const c = activeColor.value
  emit('toggleWishlist', {
    id: 'wish_' + selectedStorage.value + c.name, // unique-ish id for simplicity
    colorName: c.name, colorBody: c.body, colorLens: c.lens, colorGlow: c.glow,
    storage: selectedStorage.value, material: selectedMat.value,
    prescription: withPrescription.value, quantity: 1,
    unitPrice: totalNumeric.value,
  })
}

// ── Intersection Observer ──────────────────────────────────────────
let observer: IntersectionObserver | null = null
onMounted(() => {
  const el = document.getElementById('buy')
  if (!el) return
  observer = new IntersectionObserver(([entry]) => {
    showStickyCta.value = entry.isIntersecting && entry.boundingClientRect.top < 0
  }, { threshold: 0.1 })
  observer.observe(el)
})
onUnmounted(() => { observer?.disconnect() })
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all .25s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 200px;
}
</style>
