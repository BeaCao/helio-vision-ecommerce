<template>
  <section id="reviews" class="bg-black py-24 lg:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-10">
      <!-- Header -->
      <div class="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p class="mb-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-violet-400">{{ t('rev.label') }}</p>
          <h2 class="text-3xl font-bold text-white md:text-4xl">
            <span class="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">{{ t('rev.h1_1') }}</span><br/>
            <span class="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">{{ t('rev.h1_2') }}</span>
          </h2>
        </div>

        <!-- Controls -->
        <div class="flex items-center gap-3">
          <!-- Sort -->
          <select id="review-sort" v-model="sortBy"
            class="rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2
                   text-xs font-semibold text-white/60 outline-none cursor-pointer
                   hover:border-white/15 hover:text-white transition-all">
            <option value="recent">{{ t('rev.sort_recent') }}</option>
            <option value="helpful">{{ t('rev.sort_helpful') }}</option>
            <option value="high">{{ t('rev.sort_high') }}</option>
            <option value="low">{{ t('rev.sort_low') }}</option>
          </select>

          <!-- Rating summary -->
          <div class="flex items-center gap-3 rounded-xl border border-white/[0.08]
                      bg-white/[0.03] px-4 py-2">
            <p class="text-xl font-bold text-white">4.9</p>
            <div>
              <div class="flex gap-0.5">
                <svg v-for="i in 5" :key="i" class="h-3 w-3 text-yellow-400"
                  fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <p class="text-[9px] text-white/35 mt-0.5">{{ t('rev.ratings') }}</p>
            </div>
          </div>
        </div>
        <button @click="writingReview = true"
                class="rounded-full bg-white text-black px-6 py-3 text-sm font-bold transition-all hover:bg-white/90 active:scale-95 shrink-0">
          {{ t('rev.write') }}
        </button>
      </div>

      <!-- Filter chips -->
      <div class="mb-8 flex flex-wrap gap-2">
        <button
          v-for="f in filters" :key="f"
          @click="activeFilter = activeFilter === f ? null : f"
          :id="`filter-${f}`"
          class="rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200"
          :class="activeFilter === f
            ? 'border-violet-500 bg-violet-500/10 text-white'
            : 'border-white/[0.08] bg-white/[0.02] text-white/40 hover:border-white/15 hover:text-white'">
          {{ f }}
        </button>
      </div>

      <!-- Review grid -->
      <TransitionGroup name="review-list" tag="div"
        class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="r in visibleReviews" :key="r.id"
          class="flex flex-col rounded-3xl border border-white/[0.06] bg-white/[0.025]
                 p-7 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10">
          <!-- Stars + tag -->
          <div class="mb-4 flex items-center justify-between">
            <div class="flex gap-0.5">
              <svg v-for="j in 5" :key="j"
                class="h-3.5 w-3.5 transition-colors"
                :class="j <= r.stars ? 'text-yellow-400' : 'text-white/10'"
                fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <span v-if="r.tag"
              class="rounded-full bg-violet-500/10 px-2 py-0.5 text-[9px] font-bold
                     uppercase tracking-wide text-violet-400">
              {{ r.tag }}
            </span>
          </div>
          <p class="text-sm font-semibold text-white">"{{ r.title }}"</p>
          <p class="mt-2.5 flex-1 text-sm leading-relaxed text-white/45">{{ r.body }}</p>

          <div class="mt-5 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full
                          text-xs font-bold" :style="{ background: r.bg, color: r.fg }">
                {{ r.initials }}
              </div>
              <div>
                <p class="text-xs font-semibold text-white">{{ r.name }}</p>
                <p class="text-[10px] text-white/30">{{ r.role }} · {{ r.date }}</p>
              </div>
            </div>

            <!-- Helpful -->
            <button @click="toggleHelpful(r)"
              class="flex items-center gap-1.5 rounded-full border px-3 py-1.5
                     text-[10px] font-semibold transition-all duration-200"
              :class="r.votedHelpful
                ? 'border-violet-500/40 bg-violet-500/10 text-violet-400'
                : 'border-white/[0.07] bg-white/[0.02] text-white/30 hover:border-white/15 hover:text-white'">
              <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"/>
              </svg>
              {{ r.helpful + (r.votedHelpful ? 1 : 0) }}
            </button>
          </div>
        </div>
      </TransitionGroup>

      <!-- Load more -->
      <div class="mt-8 text-center">
        <button v-if="showingAll === false" @click="showingAll = true" id="load-more-reviews"
          class="rounded-full border border-white/[0.08] bg-white/[0.02] px-8 py-3
                 text-sm font-semibold text-white/50 transition-all hover:bg-white/[0.06] hover:text-white">
          {{ t('rev.load_more').replace('{0}', String(allReviews.length - 6)) }}
        </button>
        <p v-else class="text-xs text-white/25">{{ t('rev.showing').replace('{0}', String(allReviews.length)) }}</p>
      </div>
    </div>

    <!-- Write Review Modal -->
    <Transition name="modal-fade">
      <div v-if="writingReview" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/80 backdrop-blur-md" @click="writingReview = false"></div>
        
        <!-- Modal Content -->
        <div class="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/[0.08] bg-[#111] p-8 shadow-2xl">
          <div class="mb-6 flex items-center justify-between">
            <h3 class="text-2xl font-bold text-white">{{ t('rev.your_review') }}</h3>
            <button @click="writingReview = false" class="text-white/40 hover:text-white transition-colors">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <form @submit.prevent="submitReview" class="flex flex-col gap-4">
            <!-- Stars input -->
            <div class="flex items-center gap-2 mb-2">
              <span class="text-sm font-semibold text-white/50 mr-2">{{ t('rev.rating') }}</span>
              <button v-for="i in 5" :key="i" type="button" @click="newReview.stars = i"
                class="transition-transform hover:scale-110">
                <svg class="h-6 w-6 transition-colors"
                  :class="i <= newReview.stars ? 'text-yellow-400' : 'text-white/10 hover:text-yellow-400/50'"
                  fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </button>
            </div>

            <input v-model="newReview.name" type="text" :placeholder="t('rev.name_ph')" required
                   class="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all"/>
                   
            <input v-model="newReview.title" type="text" :placeholder="t('rev.title_ph')" required
                   class="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all"/>
                   
            <textarea v-model="newReview.body" :placeholder="t('rev.body_ph')" required rows="4"
                      class="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all resize-none"></textarea>

            <button type="submit"
                    class="mt-4 w-full rounded-full bg-violet-600 py-3.5 text-sm font-bold text-white transition-all hover:bg-violet-500 hover:shadow-xl hover:shadow-violet-600/25 active:scale-[0.98]">
              {{ t('rev.publish') }}
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const sortBy      = ref('recent')
const activeFilter = ref<string | null>(null)
const showingAll  = ref(false)
const writingReview = ref(false)
const filters = computed(() => [
  t.value('rev.f5'), t.value('rev.f4'),
  t.value('rev.f_display'), t.value('rev.f_audio'),
  t.value('rev.f_battery'), t.value('rev.f_gaming'), t.value('rev.f_productivity')
])

const newReview = ref({ name: '', title: '', body: '', stars: 5 })

interface Review { id: number; stars: number; title: string; body: string; name: string; role: string; date: string; initials: string; bg: string; fg: string; helpful: number; votedHelpful: boolean; tag?: string; tags: string[] }

const defaultReviews: Review[] = [
  { id:1, stars:5, title: t.value('rev.r1_title'), body: t.value('rev.r1_body'), name:'Marcus T.', role: t.value('rev.r_role_cd'), date: t.value('rev.r_date_apr'), initials:'MT', bg:'linear-gradient(135deg,#7c3aed,#3b82f6)', fg:'#fff', helpful:47, votedHelpful:false, tag: t.value('rev.verified'), tags:[t.value('rev.f_display'), t.value('rev.f_productivity')] },
  { id:2, stars:5, title: t.value('rev.r2_title'), body: t.value('rev.r2_body'), name:'Priya S.', role: t.value('rev.r_role_se'), date: t.value('rev.r_date_mar'), initials:'PS', bg:'linear-gradient(135deg,#ec4899,#f43f5e)', fg:'#fff', helpful:38, votedHelpful:false, tag: t.value('rev.verified'), tags:[t.value('rev.f_display'), t.value('rev.f_productivity')] },
  { id:3, stars:5, title: t.value('rev.r3_title'), body: t.value('rev.r3_body'), name:'James K.', role: t.value('rev.r_role_pd'), date: t.value('rev.r_date_mar'), initials:'JK', bg:'linear-gradient(135deg,#f59e0b,#f97316)', fg:'#000', helpful:29, votedHelpful:false, tags:[t.value('rev.f_battery')] },
]

const customReviews = ref<Review[]>([])

const allReviews = computed(() => [...customReviews.value, ...defaultReviews])

function toggleHelpful(r: Review) { r.votedHelpful = !r.votedHelpful }

function submitReview() {
  const initials = newReview.value.name.substring(0, 2).toUpperCase()
  const reviewObj: Review = {
    id: Date.now(),
    stars: newReview.value.stars,
    title: newReview.value.title,
    body: newReview.value.body,
    name: newReview.value.name,
    role: t.value('rev.client_verified'),
    date: t.value('rev.now'),
    initials,
    bg: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
    fg: '#fff',
    helpful: 0,
    votedHelpful: false,
    tag: t.value('rev.new'),
    tags: []
  }
  customReviews.value.unshift(reviewObj)
  writingReview.value = false
  newReview.value = { name: '', title: '', body: '', stars: 5 }
  sortBy.value = 'recent'
  
  const event = new CustomEvent('toast', { detail: { type: 'success', title: t.value('rev.published') } })
  window.dispatchEvent(event)
}

const visibleReviews = computed(() => {
  let list = [...allReviews.value]
  if (activeFilter.value) {
    const f = activeFilter.value
    if (f === t.value('rev.f5')) list = list.filter(r => r.stars === 5)
    else if (f === t.value('rev.f4')) list = list.filter(r => r.stars === 4)
    else list = list.filter(r => r.tags.includes(f))
  }
  if (sortBy.value === 'helpful') list.sort((a,b) => (b.helpful + (b.votedHelpful?1:0)) - (a.helpful + (a.votedHelpful?1:0)))
  else if (sortBy.value === 'high') list.sort((a,b) => b.stars - a.stars)
  else if (sortBy.value === 'low')  list.sort((a,b) => a.stars - b.stars)
  return showingAll.value ? list : list.slice(0, 6)
})
</script>

<style scoped>
.review-list-enter-active, .review-list-leave-active { transition: all .3s ease; }
.review-list-enter-from, .review-list-leave-to       { opacity: 0; transform: scale(0.97); }

.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-active > div:nth-child(2) { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-fade-enter-from > div:nth-child(2) { transform: scale(0.95) translateY(20px); }
.modal-fade-leave-active > div:nth-child(2) { transition: transform 0.3s ease; }
.modal-fade-leave-to > div:nth-child(2) { transform: scale(0.95) translateY(20px); }
</style>
