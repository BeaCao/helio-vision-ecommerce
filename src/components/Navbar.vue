<template>
  <header class="fixed inset-x-0 top-0 z-40 transition-all duration-300"
    :class="scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-transparent'">
    
    <!-- Top Promo Banner -->
    <div v-if="showPromo" class="bg-violet-600 px-4 py-1.5 text-center text-[10px] sm:text-xs font-semibold text-white relative flex justify-center items-center gap-2 transition-all">
      <span>{{ t('nav.promo') }} <span class="font-mono text-yellow-300 font-bold ml-1">{{ countdownTime }}</span></span>
      <button @click="showPromo = false" class="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors text-lg leading-none">
        &times;
      </button>
    </div>

    <div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:px-10" :class="{'mt-0': !showPromo}">

      <!-- Logo -->
      <a href="#overview" id="nav-logo"
        class="flex items-center gap-2.5 text-white hover:opacity-70 transition-opacity">
        <div class="h-6 w-6 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/30" />
        <span class="text-base font-bold tracking-tight">HELIO</span>
      </a>

      <!-- Desktop nav -->
      <nav class="hidden items-center gap-8 md:flex">
        <a v-for="link in navLinks" :key="link.label" :href="link.href"
          :id="`nav-${link.label}`"
          class="text-xs font-medium text-white/50 transition-colors hover:text-white">
          {{ t(link.label) }}
        </a>
      </nav>

      <!-- Right -->
      <div class="flex items-center gap-4">
        <!-- Search -->
        <button id="nav-search" @click="searchOpen = !searchOpen"
          class="text-white/50 hover:text-white transition-colors hidden md:block">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z"/>
          </svg>
        </button>



        <!-- Wishlist -->
        <button id="nav-wishlist" @click="$emit('openWishlist')"
          class="relative text-white/50 hover:text-white transition-colors">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
          </svg>
          <Transition name="badge">
            <span v-if="wishlistCount > 0"
              class="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center
                     rounded-full bg-pink-500 text-[9px] font-bold text-white">
              {{ wishlistCount }}
            </span>
          </Transition>
        </button>

        <!-- Cart -->
        <button id="nav-cart" @click="$emit('openCart')"
          class="relative text-white/50 hover:text-white transition-colors">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"/>
          </svg>
          <Transition name="badge">
            <span v-if="cartCount > 0"
              class="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center
                     rounded-full bg-violet-500 text-[9px] font-bold text-white">
              {{ cartCount }}
            </span>
          </Transition>
        </button>

        <!-- Buy CTA -->
        <Transition name="slide-in">
          <a v-if="scrolled" href="#buy" id="nav-buy-cta"
            class="rounded-full bg-violet-600 px-5 py-1.5 text-xs font-bold text-white
                   transition-all hover:bg-violet-500 active:scale-95
                   shadow-lg shadow-violet-600/20 hidden md:block">
            {{ t('nav.buy') }} — {{ formatPrice(2999) }}
          </a>
        </Transition>

        <!-- Settings Dropdown (Lang & Currency) -->
        <div class="relative hidden lg:block" @click.stop>
           <button @click="settingsOpen = !settingsOpen" class="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/50 hover:text-white transition-colors">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
           </button>
           <Transition name="dropdown">
              <div v-if="settingsOpen"
                   class="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-white/[0.08] bg-[#111] p-3 shadow-xl backdrop-blur-xl z-50">
                  <p class="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2 px-2">{{ t('nav.lang') }}</p>
                  <div class="space-y-1 mb-3">
                     <button v-for="l in languages" :key="l.value" @click="setLocale(l.value); settingsOpen = false"
                             class="w-full flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-left transition-colors"
                             :class="locale === l.value ? 'bg-violet-600/20 text-violet-300' : 'text-white/60 hover:bg-white/[0.06] hover:text-white'">
                        <span>{{ l.flag }}</span>
                        <span>{{ l.label }}</span>
                     </button>
                  </div>
                  <p class="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2 px-2 pt-2 border-t border-white/[0.08]">{{ t('nav.currency') }}</p>
                  <div class="space-y-1">
                     <button v-for="c in currencies" :key="c.value" @click="setCurrency(c.value); settingsOpen = false"
                             class="w-full flex items-center justify-between rounded-lg px-2 py-1.5 text-xs text-left transition-colors"
                             :class="currency === c.value ? 'bg-violet-600/20 text-violet-300' : 'text-white/60 hover:bg-white/[0.06] hover:text-white'">
                        <span>{{ c.label }}</span>
                        <span class="font-bold opacity-50">{{ c.symbol }}</span>
                     </button>
                  </div>
              </div>
           </Transition>
        </div>

        <!-- Hamburger -->
        <button id="nav-hamburger" @click="mobileOpen = !mobileOpen"
          class="md:hidden text-white/60 hover:text-white transition-colors">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round"
              :d="mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="mobile-menu">
      <div v-if="mobileOpen"
        class="border-t border-white/[0.06] bg-black/95 backdrop-blur-xl px-6 py-4 md:hidden">
        <nav class="flex flex-col gap-1">
          <a v-for="link in navLinks" :key="link.label" :href="link.href"
            @click="mobileOpen = false"
            class="rounded-xl px-3 py-3 text-sm font-medium text-white/60
                   transition-all hover:bg-white/[0.05] hover:text-white">
            {{ t(link.label) }}
          </a>
        </nav>
        <a href="#buy" @click="mobileOpen = false"
          class="mt-4 block rounded-full bg-violet-600 py-3 text-center text-sm font-bold
                 text-white transition-all hover:bg-violet-500">
          {{ t('nav.buy') }} — {{ formatPrice(2999) }}
        </a>
      </div>
    </Transition>

    <!-- Search overlay -->
    <Transition name="search-bar">
      <div v-if="searchOpen"
        class="border-t border-white/[0.06] bg-black/95 backdrop-blur-xl px-6 py-4">
        <div class="mx-auto flex max-w-2xl items-center gap-3">
          <svg class="h-4 w-4 shrink-0 text-white/30" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z"/>
          </svg>
          <input v-model="searchQuery" id="search-input"
            :placeholder="t('nav.search')"
            class="flex-1 bg-transparent py-1 text-sm text-white outline-none placeholder-white/25"
            @keyup.enter="searchOpen = false"
            @keyup.esc="searchOpen = false"
            ref="searchInputEl" />
          <button @click="searchOpen = false" class="text-white/30 hover:text-white transition-colors text-xs">ESC</button>
        </div>
        <!-- Quick suggestions -->
        <div v-if="searchQuery.length === 0" class="mx-auto mt-3 max-w-2xl flex flex-wrap gap-2">
          <button v-for="s in suggestions" :key="s" @click="searchQuery = s"
            class="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1
                   text-xs text-white/50 hover:text-white hover:border-white/15 transition-all">
            {{ s }}
          </button>
        </div>
        <!-- Search Results -->
        <div v-else class="mx-auto mt-4 max-w-2xl">
          <p class="text-xs text-white/30 mb-2">{{ t('nav.search_results') }}</p>
          <div class="grid gap-2">
            <div v-for="res in searchResults" :key="res.id"
                 @click="handleResultClick(res)"
                 class="flex items-center gap-4 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 hover:bg-white/[0.05] cursor-pointer transition-colors">
              <div class="h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br flex items-center justify-center text-xl" :class="res.bg">
                {{ res.icon }}
              </div>
              <div>
                <p class="text-sm font-bold text-white">{{ res.title }}</p>
                <p class="text-xs text-white/50">{{ res.desc }}</p>
              </div>
            </div>
            <div v-if="searchResults.length === 0" class="text-sm text-white/40 py-4 text-center">
              {{ t('nav.no_results').replace('{0}', searchQuery) }}
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, watch, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t, locale, setLocale, currency, setCurrency, formatPrice } = useI18n()

const settingsOpen = ref(false)
const languages = [
  { value: 'en', flag: '🇬🇧', label: 'English' },
  { value: 'es', flag: '🇪🇸', label: 'Español' },
  { value: 'fr', flag: '🇫🇷', label: 'Français' },
  { value: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { value: 'ja', flag: '🇯🇵', label: '日本語' },
]
const currencies = [
  { value: 'EUR', label: 'Euro', symbol: '€' },
  { value: 'USD', label: 'US Dollar', symbol: '$' },
  { value: 'GBP', label: 'British Pound', symbol: '£' },
  { value: 'JPY', label: 'Japanese Yen', symbol: '¥' },
]

const closeSettings = () => { settingsOpen.value = false }
onMounted(() => { document.addEventListener('click', closeSettings) })
onUnmounted(() => { document.removeEventListener('click', closeSettings) })

defineProps<{ cartCount: number, wishlistCount: number }>()
defineEmits(['openCart', 'openWishlist'])

const scrolled     = ref(false)
const mobileOpen   = ref(false)
const searchOpen   = ref(false)
const searchQuery  = ref('')
const searchInputEl = ref<HTMLInputElement | null>(null)
const showPromo    = ref(true)
const countdownTime = ref('03:45:12')
let timerInt: ReturnType<typeof setInterval>

const navLinks = [
  { label: 'nav.overview',  href: '#overview'  },
  { label: 'nav.features',  href: '#features'  },
  { label: 'nav.specs',     href: '#specs'     },
  { label: 'nav.ecosystem',  href: '#ecosystem' },
  { label: 'nav.reviews',   href: '#reviews'   },
  { label: 'nav.buy',       href: '#buy'       },
]

const suggestions = computed(() => [
  t.value('nav.sug_battery'), 
  t.value('nav.sug_specs'), 
  t.value('nav.sug_light'), 
  t.value('nav.sug_optical'), 
  t.value('nav.sug_reviews')
])

const allSearchableItems = computed(() => [
  { id: 1, title: 'HELIO Vision Pro', desc: t.value('hero.subtitle'), icon: '🥽', bg: 'from-violet-500/20 to-blue-500/20', href: '#overview' },
  { id: 2, title: 'HELIO Air', desc: t.value('spec.design_spec_val_4'), icon: '🥽', bg: 'from-cyan-500/20 to-blue-500/20', href: '#more-products' },
  { id: 3, title: 'HaloBattery Pro', desc: t.value('spec.battery'), icon: '🔋', bg: 'from-emerald-500/20 to-teal-500/20', href: '#more-products' },
  { id: 4, title: t.value('nav.sug_optical'), desc: t.value('buy.optical_desc'), icon: '👓', bg: 'from-purple-500/20 to-pink-500/20', href: '#buy' },
  { id: 5, title: 'HELIO Care+', desc: t.value('buy.care_desc'), icon: '🛡️', bg: 'from-orange-500/20 to-red-500/20', href: '#buy' },
  { id: 6, title: t.value('nav.sug_specs'), desc: t.value('spec.desc_perf'), icon: '⚙️', bg: 'from-zinc-500/20 to-slate-500/20', href: '#specs' },
  { id: 7, title: t.value('nav.sug_reviews'), desc: t.value('rev.ratings'), icon: '⭐️', bg: 'from-yellow-500/20 to-amber-500/20', href: '#reviews' },
  { id: 8, title: 'HELIO Neural Band', desc: t.value('eco.neural_desc'), icon: '🧠', bg: 'from-fuchsia-500/20 to-pink-500/20', href: '#ecosystem' },
  { id: 9, title: 'HELIO Smart Gloves', desc: t.value('eco.gloves_desc'), icon: '🧤', bg: 'from-yellow-500/20 to-orange-500/20', href: '#ecosystem' }
])

const searchResults = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return []
  return allSearchableItems.filter(item => 
    item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.href.toLowerCase().includes(q)
  )
})

function handleResultClick(res: any) {
  searchOpen.value = false
  setTimeout(() => {
    const el = document.querySelector(res.href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 300)
}

function onScroll() { scrolled.value = window.scrollY > 60 }
onMounted(()   => {
  window.addEventListener('scroll', onScroll)
  
  // Fake countdown
  let totalSeconds = 3 * 3600 + 45 * 60 + 12
  timerInt = setInterval(() => {
    totalSeconds--
    if (totalSeconds < 0) totalSeconds = 0
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
    const s = String(totalSeconds % 60).padStart(2, '0')
    countdownTime.value = `${h}:${m}:${s}`
  }, 1000)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  clearInterval(timerInt)
})

watch(searchOpen, async (v) => {
  if (v) { await nextTick(); searchInputEl.value?.focus() }
  else searchQuery.value = ''
})
</script>

<style scoped>
.slide-in-enter-active, .slide-in-leave-active  { transition: opacity .2s, transform .2s; }
.slide-in-enter-from, .slide-in-leave-to        { opacity: 0; transform: translateY(-4px); }

.badge-enter-active, .badge-leave-active        { transition: all .2s; }
.badge-enter-from, .badge-leave-to              { opacity: 0; transform: scale(0); }

.mobile-menu-enter-active, .mobile-menu-leave-active { transition: opacity .2s, transform .2s; transform-origin: top; }
.mobile-menu-enter-from, .mobile-menu-leave-to  { opacity: 0; transform: scaleY(0.95); }

.search-bar-enter-active, .search-bar-leave-active { transition: opacity .2s, transform .2s; }
.search-bar-enter-from, .search-bar-leave-to    { opacity: 0; transform: translateY(-6px); }

.dropdown-enter-active, .dropdown-leave-active { transition: opacity 0.2s, transform 0.2s; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(10px) scale(0.95); }
</style>
