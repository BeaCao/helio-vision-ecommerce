<template>
  <section class="bg-black py-20">
    <div class="mx-auto max-w-3xl px-6 lg:px-10">
      <div class="mb-12 text-center">
        <p class="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-violet-400">{{ t('faq.label') }}</p>
        <h2 class="text-3xl font-bold text-white md:text-4xl">
          <span class="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            {{ t('faq.title') }}
          </span>
        </h2>
      </div>

      <div class="space-y-3">
        <div v-for="(item, i) in faqs" :key="i" class="rounded-2xl border border-white/[0.07] bg-white/[0.025]
                 overflow-hidden transition-all duration-200 hover:border-white/10">
          <!-- Question -->
          <button :id="`faq-${i}`" @click="toggleFaq(i)"
            class="flex w-full items-center justify-between px-6 py-5 text-left">
            <span class="text-sm font-semibold text-white pr-4">{{ item.q }}</span>
            <div class="shrink-0 flex h-6 w-6 items-center justify-center rounded-full
                        border border-white/10 transition-all duration-300"
              :class="openFaq === i ? 'bg-violet-600 border-violet-600 rotate-45' : 'bg-white/[0.04]'">
              <svg class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
          </button>
          <!-- Answer -->
          <Transition name="faq-expand">
            <div v-if="openFaq === i" class="px-6 pb-5">
              <p class="text-sm leading-relaxed text-white/50">{{ item.a }}</p>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Still have questions -->
      <div class="mt-10 flex flex-col items-center gap-4 rounded-3xl border border-white/[0.07]
                  bg-white/[0.02] p-8 text-center">
        <p class="text-sm font-semibold text-white">{{ t('faq.still_q') }}</p>
        <p class="text-xs text-white/40">{{ t('faq.specialists') }}</p>
        <div class="flex gap-3">
          <button id="faq-chat" class="rounded-full bg-violet-600 px-5 py-2 text-xs font-semibold text-white
                   transition-all hover:bg-violet-500 active:scale-95" @click="emit('openChat')">
            {{ t('faq.chat') }}
          </button>
          <button id="faq-call" class="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-xs
                   font-semibold text-white transition-all hover:bg-white/[0.07] active:scale-95">
            {{ t('faq.call') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const emit = defineEmits(['openChat'])

const openFaq = ref<number | null>(null)

function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? null : i
}

const faqs = computed(() => [
  { q: t.value('faq.q1'), a: t.value('faq.a1') },
  { q: t.value('faq.q2'), a: t.value('faq.a2') },
  { q: t.value('faq.q3'), a: t.value('faq.a3') },
  { q: t.value('faq.q4'), a: t.value('faq.a4') },
  { q: t.value('faq.q5'), a: t.value('faq.a5') },
  { q: t.value('faq.q6'), a: t.value('faq.a6') },
  { q: t.value('faq.q7'), a: t.value('faq.a7') },
])
</script>

<style scoped>
.faq-expand-enter-active,
.faq-expand-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}

.faq-expand-enter-from,
.faq-expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.faq-expand-enter-to,
.faq-expand-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
