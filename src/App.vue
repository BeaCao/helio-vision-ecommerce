<template>
  <div class="bg-black">
    <Navbar :cart-count="cartItems.length" :wishlist-count="wishlistItems.length" @open-cart="cartOpen = true" @open-wishlist="wishlistOpen = true" />
    <ProductHero />
    <ProductFeatures />
    <ProductBuy @add-to-cart="addToCart" @toggle-wishlist="toggleWishlist" />
    <ProductFAQ @open-chat="chatOpen = true" />
    <ProductReviews />
    <ProductEcosystem @add-to-cart="addToCart" />
    <ProductList @add-to-cart="addToCart" />
    <SiteFooter />

    <!-- ── Cart Drawer ──────────────────────────────────────── -->
    <Transition name="drawer-bg">
      <div v-if="cartOpen" class="fixed inset-0 z-50 flex justify-end">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="cartOpen = false" />
        <Transition name="drawer-panel" appear>
          <div class="relative flex h-full w-full sm:max-w-md flex-col bg-[#0d0d0d] shadow-2xl">

            <!-- Header -->
            <div class="flex items-center justify-between border-b border-white/[0.07] px-6 py-5">
              <div class="flex items-center gap-3">
                <h2 class="text-base font-bold text-white">{{ t('cart.title') }}</h2>
                <span v-if="cartItems.length > 0"
                  class="flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white">
                  {{ cartItems.length }}
                </span>
                <button v-if="cartItems.length > 0" @click="clearCart" class="ml-4 text-xs text-white/40 hover:text-red-400 transition-colors">{{ t('cart.empty') }}</button>
              </div>
              <button @click="cartOpen = false" id="close-cart"
                class="text-white/40 hover:text-white transition-colors p-1">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- Items -->
            <div class="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              <!-- Empty state -->
              <div v-if="cartItems.length === 0"
                class="flex h-full flex-col items-center justify-center gap-4 text-white/25">
                <svg class="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke-width="0.75" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"/>
                </svg>
                <p class="text-sm">{{ t('cart.empty_msg') }}</p>
                <button @click="cartOpen = false; document.getElementById('buy')?.scrollIntoView({behavior:'smooth'})"
                  class="rounded-full border border-white/10 px-5 py-2 text-xs font-semibold
                         text-white/60 hover:border-white/25 hover:text-white transition-all">
                  {{ t('cart.configure') }}
                </button>
              </div>

              <!-- Cart items -->
              <TransitionGroup name="cart-item" tag="div" class="space-y-3">
                <div v-for="item in cartItems" :key="item.id"
                  class="group relative rounded-2xl border border-white/[0.07]
                         bg-white/[0.03] p-4 transition-all hover:border-white/10">
                  <div class="flex gap-4">
                    <!-- Mini product visual -->
                    <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl"
                      :style="{ background: item.colorGlow }">
                      <svg viewBox="0 0 120 80" class="h-10 w-14" fill="none">
                        <rect x="8" y="20" width="104" height="40" rx="20"
                          :fill="item.colorBody" fill-opacity="0.9"/>
                        <ellipse cx="32" cy="40" rx="19" ry="14" :fill="item.colorLens" fill-opacity="0.85"/>
                        <ellipse cx="88" cy="40" rx="19" ry="14" :fill="item.colorLens" fill-opacity="0.85"/>
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-semibold text-white">HELIO Vision Pro</p>
                      <p class="text-xs text-white/40 truncate">
                        {{ item.storage }}GB · {{ item.material }} · {{ item.colorName }}
                        <span v-if="item.prescription"> · {{ t('cart.optical') }}</span>
                      </p>
                      <div class="mt-2.5 flex items-center justify-between">
                        <p class="text-sm font-bold text-white">{{ formatPrice(item.unitPrice * item.quantity) }}</p>
                        <!-- Qty controls -->
                        <div class="flex items-center gap-2">
                          <button @click="decreaseQty(item.id)" id="qty-dec"
                            class="flex h-6 w-6 items-center justify-center rounded-full
                                   border border-white/10 text-white/50 hover:border-violet-500
                                   hover:text-white transition-all text-sm leading-none">
                            −
                          </button>
                          <span class="w-4 text-center text-sm font-semibold text-white">{{ item.quantity }}</span>
                          <button @click="item.quantity++" id="qty-inc"
                            class="flex h-6 w-6 items-center justify-center rounded-full
                                   border border-white/10 text-white/50 hover:border-violet-500
                                   hover:text-white transition-all text-sm leading-none">
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <!-- Remove -->
                    <button @click="removeItem(item.id)"
                      class="absolute right-3 top-3 text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </TransitionGroup>
            </div>

            <!-- Coupon + Summary + Checkout -->
            <div v-if="cartItems.length > 0"
              class="border-t border-white/[0.07] px-6 py-5 space-y-4">
              <!-- Coupon -->
              <div class="flex gap-2">
                <input v-model="couponCode" id="coupon-input"
                  :placeholder="t('cart.promo_code')"
                  class="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5
                         text-sm text-white placeholder-white/25 outline-none
                         focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30
                         transition-all"
                  @keyup.enter="applyCoupon"/>
                <button @click="applyCoupon" id="apply-coupon"
                  class="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5
                         text-xs font-semibold text-white/60 hover:text-white hover:border-white/20
                         transition-all">
                  {{ t('cart.apply') }}
                </button>
              </div>
              <p v-if="couponMsg"
                :class="couponValid ? 'text-green-400' : 'text-red-400'"
                class="text-xs font-semibold">
                {{ couponMsg }}
              </p>

              <!-- Totals -->
              <div class="space-y-2 text-sm">
                <div class="flex justify-between text-white/50">
                  <span>{{ t('cart.subtotal') }}</span>
                  <span>{{ formatPrice(subtotal) }}</span>
                </div>
                <div v-if="couponValid" class="flex justify-between text-green-400">
                  <span>{{ t('cart.discount') }}</span>
                  <span>−{{ formatPrice(discount) }}</span>
                </div>
                <div class="flex justify-between text-white/50">
                  <span>{{ t('cart.shipping') }}</span>
                  <span class="text-green-400">{{ t('cart.free') }}</span>
                </div>
                <div class="border-t border-white/[0.06] pt-2 flex justify-between font-bold text-white">
                  <span>{{ t('cart.total') }}</span>
                  <span>{{ formatPrice(total) }}</span>
                </div>
              </div>

              <!-- Checkout -->
              <button id="btn-checkout" @click="checkout"
                class="w-full rounded-full bg-violet-600 py-3.5 text-sm font-bold text-white
                       transition-all hover:bg-violet-500 hover:shadow-xl hover:shadow-violet-600/25
                       active:scale-[0.98]">
                {{ checkoutDone ? t('cart.checkout_done') : t('cart.checkout') }}
              </button>
              <button @click="cartOpen = false"
                class="w-full text-center text-xs text-white/30 hover:text-white transition-colors">
                {{ t('cart.continue') }}
              </button>
            </div>

            <!-- Cross-selling / Upsell in Cart -->
            <div v-if="cartItems.length > 0 && !cartItems.some(i => i.colorName === 'HELIO Care+')" 
                 class="border-t border-white/[0.07] bg-violet-900/10 px-6 py-4">
              <p class="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400">{{ t('cart.frequently_bought') }}</p>
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500/20 text-xl border border-orange-500/30">
                  🛡️
                </div>
                <div class="flex-1">
                  <p class="text-xs font-bold text-white">HELIO Care+</p>
                  <p class="text-[10px] text-white/50">{{ t('cart.care_desc') }} (+{{ formatPrice(299) }})</p>
                </div>
                <button @click="addToCart({ id: '', colorName: 'HELIO Care+', colorBody: '#000', colorLens: '#000', colorGlow: 'transparent', storage: 0, material: '-', prescription: false, quantity: 1, unitPrice: 299 })"
                        class="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[10px] font-bold text-white hover:bg-white hover:text-black transition-all">
                  {{ t('cart.add') }}
                </button>
              </div>
            </div>

          </div>
        </Transition>
      </div>
    </Transition>

    <!-- ── Wishlist Drawer ──────────────────────────────────────── -->
    <Transition name="drawer-bg">
      <div v-if="wishlistOpen" class="fixed inset-0 z-50 flex justify-end">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="wishlistOpen = false" />
        <Transition name="drawer-panel" appear>
          <div class="relative flex h-full w-full sm:max-w-md flex-col bg-[#0d0d0d] shadow-2xl">
            <!-- Header -->
            <div class="flex items-center justify-between border-b border-white/[0.07] px-6 py-5">
              <div class="flex items-center gap-3">
                <h2 class="text-base font-bold text-white">{{ t('wishlist.title') }}</h2>
                <span v-if="wishlistItems.length > 0"
                  class="flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white">
                  {{ wishlistItems.length }}
                </span>
                <button v-if="wishlistItems.length > 0" @click="clearWishlist" class="ml-4 text-xs text-white/40 hover:text-red-400 transition-colors">{{ t('wishlist.empty') }}</button>
              </div>
              <button @click="wishlistOpen = false" id="close-wishlist"
                class="text-white/40 hover:text-white transition-colors p-1">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <!-- Items -->
            <div class="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              <div v-if="wishlistItems.length === 0"
                class="flex h-full flex-col items-center justify-center gap-4 text-white/25">
                <svg class="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke-width="0.75" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                </svg>
                <p class="text-sm">{{ t('wishlist.empty_msg') }}</p>
                <button @click="wishlistOpen = false; document.getElementById('buy')?.scrollIntoView({behavior:'smooth'})"
                  class="rounded-full border border-white/10 px-5 py-2 text-xs font-semibold
                         text-white/60 hover:border-white/25 hover:text-white transition-all">
                  {{ t('wishlist.explore') }}
                </button>
              </div>
              <TransitionGroup name="cart-item" tag="div" class="space-y-3">
                <div v-for="item in wishlistItems" :key="item.id"
                  class="group relative rounded-2xl border border-white/[0.07]
                         bg-white/[0.03] p-4 transition-all hover:border-white/10">
                  <div class="flex gap-4">
                    <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl"
                      :style="{ background: item.colorGlow }">
                      <svg viewBox="0 0 120 80" class="h-10 w-14" fill="none">
                        <rect x="8" y="20" width="104" height="40" rx="20"
                          :fill="item.colorBody" fill-opacity="0.9"/>
                        <ellipse cx="32" cy="40" rx="19" ry="14" :fill="item.colorLens" fill-opacity="0.85"/>
                        <ellipse cx="88" cy="40" rx="19" ry="14" :fill="item.colorLens" fill-opacity="0.85"/>
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-semibold text-white">HELIO Vision Pro</p>
                      <p class="text-xs text-white/40 truncate">
                        {{ item.storage }}GB · {{ item.material }} · {{ item.colorName }}
                      </p>
                      <div class="mt-2.5 flex items-center justify-between">
                        <p class="text-sm font-bold text-white">{{ formatPrice(item.unitPrice) }}</p>
                        <button @click="moveWishlistToCart(item)"
                          class="rounded-full bg-violet-600/20 text-violet-400 px-3 py-1 text-[10px] font-bold hover:bg-violet-600 hover:text-white transition-colors">
                          {{ t('wishlist.add') }}
                        </button>
                      </div>
                    </div>
                    <button @click="removeWishlistItem(item.id)"
                      class="absolute right-3 top-3 text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </TransitionGroup>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>

    <!-- Toast -->
    <Transition name="toast">
      <div v-if="toast.show"
        class="fixed top-20 left-6 right-6 z-[60] sm:left-auto sm:right-6 sm:w-auto flex items-center gap-3 rounded-2xl
               border border-white/10 bg-[#111] px-5 py-3.5 shadow-2xl">
        <div class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
          :class="toast.type === 'success' ? 'bg-green-500' : toast.type === 'warn' ? 'bg-yellow-500' : 'bg-red-500'">
          <svg class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round"
              :d="toast.type === 'success' ? 'M4.5 12.75l6 6 9-13.5' : 'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'"/>
          </svg>
        </div>
        <div>
          <p class="text-sm font-semibold text-white">{{ toast.title }}</p>
          <p v-if="toast.sub" class="text-xs text-white/40">{{ toast.sub }}</p>
        </div>
      </div>
    </Transition>

    <!-- Back to top -->
    <Transition name="fab">
      <button v-if="showBackToTop" @click="scrollToTop" id="back-to-top"
        class="fixed bottom-6 left-6 z-40 flex h-10 w-10 items-center justify-center
               rounded-full border border-white/10 bg-white/[0.08] text-white/60
               backdrop-blur-xl transition-all hover:bg-white/15 hover:text-white
               hover:shadow-lg active:scale-90">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/>
        </svg>
      </button>
    </Transition>

    <!-- Social Proof Toast -->
    <Transition name="social-toast">
      <div v-if="showBuyerToast"
        class="fixed bottom-24 left-6 right-6 sm:right-auto sm:max-w-xs z-40 flex items-center gap-3 rounded-xl
               border border-white/10 bg-black/80 backdrop-blur-md px-4 py-3 shadow-2xl cursor-pointer
               hover:bg-black/90 transition-all">
        <div class="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
          {{ recentBuyerInitials }}
        </div>
        <div>
          <p class="text-xs font-semibold text-white">{{ recentBuyerText }}</p>
        </div>
      </div>
    </Transition>

    <!-- Live Chat Widget -->
    <div class="fixed bottom-6 right-6 z-40">
      <Transition name="chat-window">
        <div v-if="chatOpen" class="mb-4 w-[calc(100vw-3rem)] sm:w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl origin-bottom-right">
          <div class="bg-violet-600 px-4 py-3 flex justify-between items-center">
            <span class="text-sm font-bold text-white flex items-center gap-2">
              <div class="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
              {{ t('chat.title') }}
            </span>
            <button @click="chatOpen = false" class="text-white/60 hover:text-white transition-colors text-lg leading-none">&times;</button>
          </div>
          <div class="p-4 bg-black h-48 overflow-y-auto space-y-3">
            <div class="bg-white/10 rounded-xl rounded-tl-none p-3 text-xs text-white/90 w-5/6 leading-relaxed">
              {{ t('chat.hello') }}
            </div>
            <div v-if="chatMessages.length > 0" v-for="(msg, i) in chatMessages" :key="i"
                 class="rounded-xl p-3 text-xs leading-relaxed max-w-[85%]"
                 :class="msg.user ? 'bg-violet-600 text-white rounded-tr-none ml-auto' : 'bg-white/10 text-white/90 rounded-tl-none mr-auto'">
              {{ msg.text }}
            </div>
            <div v-if="isTyping" class="bg-white/10 rounded-xl rounded-tl-none p-3 text-xs text-white/90 w-16">
              <span class="flex gap-1 items-center h-full">
                <span class="h-1.5 w-1.5 bg-white/50 rounded-full animate-bounce"></span>
                <span class="h-1.5 w-1.5 bg-white/50 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
                <span class="h-1.5 w-1.5 bg-white/50 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
              </span>
            </div>
          </div>
          <form @submit.prevent="sendChatMessage" class="p-3 border-t border-white/10 bg-black flex gap-2">
            <input v-model="chatInput" type="text" :placeholder="t('chat.placeholder')" 
                   class="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-violet-500 transition-colors">
            <button type="submit" :disabled="!chatInput.trim()"
                    class="bg-violet-600 rounded-lg px-3 py-2 text-xs text-white font-bold hover:bg-violet-500 disabled:opacity-50 transition-colors">
              <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
            </button>
          </form>
        </div>
      </Transition>
      <button @click="chatOpen = !chatOpen"
              class="flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-xl shadow-violet-600/30 hover:bg-violet-500 transition-all hover:scale-110 ml-auto active:scale-95">
        <svg v-if="!chatOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
        <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Cookie Banner -->
    <Transition name="cookie-banner">
      <div v-if="showCookies"
        class="fixed bottom-0 inset-x-0 z-[100] border-t border-white/10 bg-[#0a0a0a] px-6 py-4
               flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
        <div class="text-[11px] text-white/60 max-w-4xl leading-relaxed">
          <strong>{{ t('cookies.title') }}</strong><br/>
          {{ t('cookies.desc') }}
        </div>
        <div class="flex gap-3 w-full md:w-auto shrink-0 mt-2 md:mt-0">
          <button @click="showCookies = false" class="flex-1 rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-[11px] font-bold text-white hover:bg-white/5 transition-colors">{{ t('cookies.config') }}</button>
          <button @click="acceptCookies" class="flex-1 rounded-full bg-white px-5 py-2.5 text-[11px] font-bold text-black hover:bg-gray-200 transition-colors">{{ t('cookies.accept') }}</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import Navbar          from '@/components/Navbar.vue'
import ProductHero     from '@/components/ProductHero.vue'
import ProductFeatures from '@/components/ProductFeatures.vue'
import ProductBuy      from '@/components/ProductBuy.vue'
import ProductFAQ      from '@/components/ProductFAQ.vue'
import ProductReviews  from '@/components/ProductReviews.vue'
import ProductEcosystem from '@/components/ProductEcosystem.vue'
import ProductList     from '@/components/ProductList.vue'
import SiteFooter      from '@/components/SiteFooter.vue'
import { useI18n }     from '@/composables/useI18n'

const { formatPrice, t } = useI18n()

// ── Types ─────────────────────────────────────────────────────────
interface CartItem {
  id: string
  colorName: string
  colorBody: string
  colorLens: string
  colorGlow: string
  storage: number
  material: string
  prescription: boolean
  quantity: number
  unitPrice: number
}

// ── State ──────────────────────────────────────────────────────────
const savedCart = localStorage.getItem('helio_cart')
const cartItems   = ref<CartItem[]>(savedCart ? JSON.parse(savedCart) : [])

const savedWishlist = localStorage.getItem('helio_wishlist')
const wishlistItems = ref<CartItem[]>(savedWishlist ? JSON.parse(savedWishlist) : [])

watch(cartItems, (newVal) => {
  localStorage.setItem('helio_cart', JSON.stringify(newVal))
}, { deep: true })

watch(wishlistItems, (newVal) => {
  localStorage.setItem('helio_wishlist', JSON.stringify(newVal))
}, { deep: true })

const cartOpen    = ref(false)
const wishlistOpen = ref(false)
const couponCode  = ref('')
const couponValid = ref(false)
const couponMsg   = ref('')
const checkoutDone = ref(false)
const showBackToTop = ref(false)

const chatOpen = ref(false)
const chatInput = ref('')
const isTyping = ref(false)
const chatMessages = ref<{text: string, user: boolean}[]>([])

function sendChatMessage() {
  if (!chatInput.value.trim()) return
  chatMessages.value.push({ text: chatInput.value, user: true })
  chatInput.value = ''
  isTyping.value = true
  
  setTimeout(() => {
    isTyping.value = false
    chatMessages.value.push({ text: 'Gracias por contactar con HELIO. En este momento todos nuestros agentes están ocupados, pero te responderemos en breve a tu correo electrónico.', user: false })
  }, 1500)
}

const toast = ref({ show: false, title: '', sub: '', type: 'success' as 'success'|'warn'|'error' })
let toastTimer: ReturnType<typeof setTimeout>

// ── Cart logic ─────────────────────────────────────────────────────
function addToCart(item: CartItem) {
  cartItems.value.push({ ...item, id: crypto.randomUUID(), quantity: 1 })
  cartOpen.value = false
  showToast('success', 'Añadido al Carrito', `${item.colorName} · ${item.storage}GB · ${item.material}`)
}

function decreaseQty(id: string) {
  const item = cartItems.value.find(i => i.id === id)
  if (!item) return
  if (item.quantity <= 1) removeItem(id)
  else item.quantity--
}

function removeItem(id: string) {
  cartItems.value = cartItems.value.filter(i => i.id !== id)
  showToast('warn', 'Artículo eliminado')
}

function clearCart() {
  cartItems.value = []
  showToast('warn', 'Carrito vaciado')
}

// ── Wishlist logic ─────────────────────────────────────────────────
function toggleWishlist(item: CartItem) {
  const existingIndex = wishlistItems.value.findIndex(i => i.id === item.id)
  if (existingIndex > -1) {
    wishlistItems.value.splice(existingIndex, 1)
    showToast('warn', 'Eliminado de deseos')
  } else {
    wishlistItems.value.push(item)
    showToast('success', 'Añadido a deseos', 'Puedes verlo en tu lista de deseos')
  }
}

function removeWishlistItem(id: string) {
  wishlistItems.value = wishlistItems.value.filter(i => i.id !== id)
  showToast('warn', 'Artículo eliminado de deseos')
}

function clearWishlist() {
  wishlistItems.value = []
  showToast('warn', 'Lista de deseos vaciada')
}

function moveWishlistToCart(item: CartItem) {
  removeWishlistItem(item.id)
  addToCart(item)
  wishlistOpen.value = false
}

// ── Coupon ─────────────────────────────────────────────────────────
function applyCoupon() {
  if (!couponCode.value.trim()) { couponMsg.value = 'Introduce un código promocional'; couponValid.value = false; return }
  if (couponCode.value.trim().toUpperCase() === 'HELIO10') {
    couponValid.value = true; couponMsg.value = '✓ ¡Descuento del 10% aplicado!'
  } else {
    couponValid.value = false; couponMsg.value = 'Código promocional no válido'
  }
}

// ── Totals ─────────────────────────────────────────────────────────
const subtotal = computed(() => cartItems.value.reduce((s, i) => s + i.unitPrice * i.quantity, 0))
const discount = computed(() => couponValid.value ? Math.round(subtotal.value * 0.1) : 0)
const total    = computed(() => subtotal.value - discount.value)

// ── Checkout ───────────────────────────────────────────────────────
function checkout() {
  checkoutDone.value = true
  setTimeout(() => {
    cartItems.value = []
    cartOpen.value  = false
    couponCode.value = ''
    couponValid.value = false
    couponMsg.value = ''
    checkoutDone.value = false
    showToast('success', '¡Pedido confirmado! 🎉', 'En breve recibirás un correo electrónico de confirmación.')
  }, 1200)
}

// ── Toast helper ───────────────────────────────────────────────────
function showToast(type: 'success'|'warn'|'error', title: string, sub = '') {
  clearTimeout(toastTimer)
  toast.value = { show: true, type, title, sub }
  toastTimer = setTimeout(() => { toast.value.show = false }, 3200)
}

// ── Back to top ────────────────────────────────────────────────────
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) }
function onScroll()    { showBackToTop.value = window.scrollY > 400 }

// ── Fake Social Proof & Cookies ────────────────────────────────────
const showBuyerToast = ref(false)
const recentBuyerInitials = ref('')
const recentBuyerText = ref('')
const recentBuyerLocation = ref('')
const recentBuyerTime = ref(0)
let socialProofTimer: any

const showCookies = ref(!localStorage.getItem('helio_cookies'))
function acceptCookies() {
  localStorage.setItem('helio_cookies', 'true')
  showCookies.value = false
}

const buyersData = [
  { name: 'María S.', loc: 'Madrid, ES', product: 'HELIO Vision Pro' },
  { name: 'David G.', loc: 'Barcelona, ES', product: 'HELIO Air' },
  { name: 'Lucía P.', loc: 'Valencia, ES', product: 'HaloBattery Pro' },
  { name: 'Carlos R.', loc: 'Sevilla, ES', product: 'HELIO Vision Pro' },
  { name: 'Anna M.', loc: 'Bilbao, ES', product: 'HELIO Care+' }
]

onMounted(()   => {
  window.addEventListener('scroll', onScroll)
  window.addEventListener('toast', (e: any) => showToast(e.detail.type, e.detail.title, e.detail.sub))
  
  // Random social proof popups
  socialProofTimer = setInterval(() => {
    if (Math.random() > 0.4 && !showBuyerToast.value) {
      const buyer = buyersData[Math.floor(Math.random() * buyersData.length)]
      recentBuyerInitials.value = buyer.name.split(' ').map(n=>n[0]).join('')
      recentBuyerText.value = t.value('proof.msg')
        .replace('{0}', buyer.name)
        .replace('{1}', buyer.loc)
        .replace('{2}', buyer.product)
        .replace('{3}', String(Math.floor(Math.random() * 14) + 1))
      showBuyerToast.value = true
      setTimeout(() => { showBuyerToast.value = false }, 4500)
    }
  }, 18000)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  clearInterval(socialProofTimer)
})
</script>

<style>
/* Drawer */
.drawer-bg-enter-active, .drawer-bg-leave-active { transition: opacity .3s ease; }
.drawer-bg-enter-from, .drawer-bg-leave-to { opacity: 0; }
.drawer-panel-enter-active, .drawer-panel-leave-active { transition: transform .35s cubic-bezier(.4,0,.2,1); }
.drawer-panel-enter-from, .drawer-panel-leave-to { transform: translateX(100%); }

/* Cart item */
.cart-item-enter-active { transition: all .3s ease; }
.cart-item-leave-active { transition: all .2s ease; position: absolute; width: 100%; }
.cart-item-enter-from   { opacity: 0; transform: translateX(20px); }
.cart-item-leave-to     { opacity: 0; transform: translateX(-20px); }

/* Toast */
.toast-enter-active, .toast-leave-active { transition: opacity .3s, transform .3s; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(-12px); }

/* FAB */
.fab-enter-active, .fab-leave-active { transition: opacity .3s, transform .3s; }
.fab-enter-from, .fab-leave-to { opacity: 0; transform: scale(0.7); }

/* Chat Window */
.chat-window-enter-active, .chat-window-leave-active { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.chat-window-enter-from, .chat-window-leave-to { opacity: 0; transform: scale(0.9) translateY(20px); }

/* Social Proof Toast */
.social-toast-enter-active, .social-toast-leave-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.social-toast-enter-from, .social-toast-leave-to { opacity: 0; transform: translateY(20px) scale(0.95); }

/* Cookie Banner */
.cookie-banner-enter-active, .cookie-banner-leave-active { transition: all 0.5s ease; }
.cookie-banner-enter-from, .cookie-banner-leave-to { opacity: 0; transform: translateY(100%); }
</style>
