<template>
  <footer class="border-t border-white/[0.05] bg-black pt-16 pb-10">
    <div class="mx-auto max-w-7xl px-6 lg:px-10">

      <!-- Newsletter -->
      <div class="mb-16 rounded-3xl border border-violet-500/20 bg-violet-500/5 p-6 sm:p-8
                  md:flex md:items-center md:justify-between md:gap-8">
        <div class="mb-6 text-center md:mb-0 md:text-left">
          <h3 class="text-lg font-bold text-white">{{ t('footer.newsletter.title') }}</h3>
          <p class="mt-1 text-sm text-white/45">
            {{ t('footer.newsletter.desc') }}
          </p>
        </div>
        <form @submit.prevent="subscribe" class="flex flex-col sm:flex-row gap-3 md:min-w-[400px]">
          <input v-model="email" id="newsletter-email" type="email"
            :placeholder="t('footer.newsletter.placeholder')"
            class="flex-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-6 py-3.5
                   text-sm text-white placeholder-white/25 outline-none
                   focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30
                   transition-all"/>
          <button id="newsletter-submit" type="submit"
            class="rounded-full bg-violet-600 px-8 py-3.5 text-sm font-bold text-white
                   transition-all hover:bg-violet-500 active:scale-95 whitespace-nowrap shadow-lg shadow-violet-600/20"
            :disabled="subscribed || loading">
            <span v-if="loading">{{ t('footer.newsletter.subscribing') }}</span>
            <span v-else-if="subscribed">{{ t('footer.newsletter.subscribed') }}</span>
            <span v-else>{{ t('footer.newsletter.submit') }}</span>
          </button>
        </form>
        <p v-if="emailError" class="mt-2 text-xs text-red-400 md:hidden">{{ emailError }}</p>
      </div>

      <!-- Link grid -->
      <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        <div class="sm:col-span-2 lg:col-span-2">
          <div class="flex items-center justify-center sm:justify-start gap-2.5">
            <div class="h-7 w-7 rounded-full bg-gradient-to-br from-violet-500 to-blue-500" />
            <span class="text-base font-bold text-white tracking-tight">HELIO</span>
          </div>
          <p class="mt-4 mx-auto sm:mx-0 max-w-xs text-center sm:text-left text-sm leading-relaxed text-white/40">
            {{ t('footer.desc') }}
          </p>
          <div class="mt-6 flex justify-center sm:justify-start gap-3">
            <a v-for="s in socials" :key="s.name" :href="s.href" :id="`footer-${s.name}`"
              class="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08]
                     text-white/35 transition-all hover:border-white/20 hover:text-white hover:bg-white/[0.05]">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path :d="s.path"/>
              </svg>
            </a>
          </div>
 
          <!-- Payment methods -->
          <div class="mt-12 pt-8 border-t border-white/[0.05] flex flex-col items-center sm:items-start">
            <div class="flex items-center gap-2 mb-4">
              <svg class="h-3 w-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M2.166 4.9L10 .155 17.834 4.9a2 2 0 011.166 1.8v3.3c0 5.174-3.462 9.633-8.4 10.845a2 2 0 01-1.2 0c-4.938-1.212-8.4-5.671-8.4-10.845V6.7a2 2 0 011.166-1.8zM10 3.041l-6 3.6v3.3c0 4.131 2.766 7.695 6.72 8.66a1 1 0 00.56 0c3.954-.965 6.72-4.529 6.72-8.66V6.641l-6-3.6z" clip-rule="evenodd" />
              </svg>
              <p class="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">{{ t('footer.secure_payments') }}</p>
            </div>
            <div class="flex flex-wrap justify-center sm:justify-start gap-3">
              <div v-for="pay in paymentMethods" :key="pay.name"
                class="group flex h-10 w-20 items-center justify-center rounded-xl border border-white/[0.06]
                       bg-white/[0.03] shadow-sm transition-all duration-500
                       hover:border-white/20 hover:bg-white/[0.08] hover:scale-105 hover:-translate-y-0.5"
                :title="pay.name">
                <div class="flex items-center gap-2 px-2">
                  <div v-html="pay.svg" class="h-4 w-4 shrink-0 text-white/70 transition-all duration-500 group-hover:text-white"></div>
                  <span class="text-[9px] font-bold tracking-tight text-white/40 transition-colors duration-500 group-hover:text-white">{{ pay.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
 
        <div v-for="col in footerCols" :key="col.heading" class="text-center sm:text-left">
          <p class="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/80">{{ t(col.heading) }}</p>
          <ul class="space-y-3">
            <li v-for="link in col.links" :key="link.label">
              <a :href="link.href" class="text-sm text-white/40 transition-colors hover:text-white">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
 
      <!-- Bottom -->
      <div class="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/[0.05]
                  pt-8 md:flex-row md:items-center">
        <div class="flex flex-col items-center gap-4 md:flex-row md:gap-8">
          <p class="text-xs text-white/25">{{ t('footer.rights') }}</p>
          <div class="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a v-for="link in legalLinks" :key="link" href="#" class="text-[10px] uppercase tracking-widest text-white/20 hover:text-white/60 transition-colors">{{ link }}</a>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <!-- Custom Language selector -->
          <div class="relative" @click.stop>
            <button @click="langDropdownOpen = !langDropdownOpen"
              class="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-2
                     text-xs text-white/50 outline-none cursor-pointer hover:text-white/80 hover:bg-white/[0.08] transition-all">
              <span>{{ currentLangLabel }}</span>
              <svg class="h-3 w-3 transition-transform" :class="{ 'rotate-180': langDropdownOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown list -->
            <Transition name="dropdown">
              <div v-if="langDropdownOpen"
                   class="absolute bottom-full right-0 md:left-0 mb-2 w-40 rounded-2xl border border-white/[0.08] bg-[#111]/90 p-2 shadow-2xl backdrop-blur-xl z-50">
                <button v-for="l in languages" :key="l.value" @click="selectLang(l.value)"
                        class="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-left transition-all"
                        :class="lang === l.value ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-white/60 hover:bg-white/[0.05] hover:text-white'">
                  <span class="text-base">{{ l.flag }}</span>
                  <span class="font-medium">{{ l.label }}</span>
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from '@/composables/useI18n'

const email      = ref('')
const subscribed = ref(false)
const loading    = ref(false)
const emailError = ref('')

const { t, locale, setLocale } = useI18n()
const lang       = locale

const langDropdownOpen = ref(false)
const languages = [
  { value: 'en', flag: '🇬🇧', label: 'English' },
  { value: 'es', flag: '🇪🇸', label: 'Español' },
  { value: 'fr', flag: '🇫🇷', label: 'Français' },
  { value: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { value: 'ja', flag: '🇯🇵', label: '日本語' },
]

const currentLangLabel = computed(() => {
  const selected = languages.find(l => l.value === lang.value)
  return selected ? `${selected.flag} ${selected.label}` : t.value('nav.lang')
})

function selectLang(value: string) {
  setLocale(value)
  langDropdownOpen.value = false
}

const closeDropdown = () => { langDropdownOpen.value = false }
onMounted(() => { document.addEventListener('click', closeDropdown) })
onUnmounted(() => { document.removeEventListener('click', closeDropdown) })

watch(lang, (newLang) => {
  const event = new CustomEvent('toast', { detail: { type: 'success', title: t.value('footer.lang_changed'), sub: t.value('footer.lang_now').replace('{0}', newLang.toUpperCase()) }})
  window.dispatchEvent(event)
})

function subscribe() {
  if (!email.value.includes('@')) { emailError.value = t.value('footer.email_error'); return }
  emailError.value = ''
  loading.value = true
  setTimeout(() => {
    loading.value = false
    subscribed.value = true
    const event = new CustomEvent('toast', { detail: { type: 'success', title: t.value('footer.subscribed_title'), sub: t.value('footer.subscribed_sub') }})
    window.dispatchEvent(event)
  }, 1000)
}

const socials = [
  { name:'twitter',   href:'#', path:'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117Z' },
  { name:'instagram', href:'#', path:'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z' },
  { name:'youtube',   href:'#', path:'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
  { name:'tiktok',    href:'#', path:'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
]

const footerCols = computed(() => [
  { heading: 'footer.products',  links: [
    { label: 'HELIO Vision',     href: '#' },
    { label: 'HELIO Vision Pro', href: '#' },
    { label: 'HELIO Air',        href: '#' },
    { label: 'HaloBattery',      href: '#' },
    { label: t.value('footer.acc'),      href: '#' },
  ]},
  { heading: 'footer.support', links: [
    { label: t.value('footer.help'),  href: '#' },
    { label: 'HELIO Care+',  href: '#' },
    { label: t.value('footer.repair'), href: '#' },
    { label: t.value('footer.community'),    href: '#' },
    { label: t.value('footer.dev'), href: '#' },
  ]},
  { heading: 'footer.company', links: [
    { label: t.value('footer.about'),  href: '#' },
    { label: t.value('footer.jobs'),      href: '#' },
    { label: t.value('footer.press'),        href: '#' },
    { label: t.value('footer.investors'),    href: '#' },
    { label: t.value('footer.sustainability'), href: '#' },
  ]},
])

const legalLinks = computed(() => [
  t.value('footer.privacy'), 
  t.value('footer.terms'), 
  t.value('footer.refund'), 
  t.value('footer.cookies'), 
  t.value('footer.sitemap')
])

const paymentMethods = [
  { name: 'Visa', svg: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2 4h20v16H2V4zm17 13l1-8h-2l-1 8h2zm-5-8h-2v1h2v1h-2v1h2v1h-3V9h3v1zm-6 0L6 17h2l1-3h2l1 3h2L11 9H8zm1 2l.5 2.5h-1L9 11z" fill="currentColor"/></svg>' },
  { name: 'Mastercard', svg: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="12" r="6" fill="currentColor" fill-opacity="0.6"/><circle cx="15" cy="12" r="6" fill="currentColor" fill-opacity="0.6"/></svg>' },
  { name: 'Amex', svg: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="6" width="18" height="12" rx="2" fill="currentColor"/></svg>' },
  { name: 'PayPal', svg: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 3h7c4 0 6 2 6 5s-2 5-6 5H9l-1 8H5l2-18z" fill="currentColor"/></svg>' },
  { name: 'Apple Pay', svg: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 5c-1 0-2 1-2 2s1 2 2 2 2-1 2-2-1-2-2-2zM7 19c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2zm10 0c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2zM7 5c-1 0-2 1-2 2s1 2 2 2 2-1 2-2-1-2-2-2z" fill="currentColor"/></svg>' }
]
</script>

<style scoped>
.dropdown-enter-active, .dropdown-leave-active { transition: opacity 0.2s, transform 0.2s; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(10px) scale(0.95); }
</style>
