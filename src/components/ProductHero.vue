<template>

  <!-- ─── Hero ──────────────────────────────────────────────────── -->
  <section id="overview" class="relative h-screen w-full overflow-hidden bg-black">
    <canvas ref="canvasEl" class="absolute inset-0 h-full w-full" aria-hidden="true" />

    <!-- Bottom fade into next section -->
    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-48
                bg-gradient-to-t from-black to-transparent z-10" />

    <!-- Headline -->
    <div class="pointer-events-none absolute inset-0 z-20 flex flex-col
                items-center justify-end pb-20 text-center px-4">
      <p class="mb-3 text-[10px] font-semibold uppercase tracking-[0.45em] text-white/40">
        {{ t('hero.subtitle').split(' ')[0] }}
      </p>
      <h1 class="text-4xl font-bold leading-none tracking-tight text-white
                 xs:text-5xl md:text-7xl lg:text-[5.5rem]">
        HELIO&nbsp;<span class="bg-gradient-to-r from-violet-400 to-blue-400
                               bg-clip-text text-transparent">Vision</span>
      </h1>
      <p class="mt-4 text-sm font-light text-white/50 md:text-base max-w-md">
        {{ t('hero.desc') }}
      </p>
      <!-- Scroll cue -->
      <a href="#features" class="pointer-events-auto mt-10 flex flex-col items-center gap-2 text-white/30
               hover:text-white/60 transition-colors">
        <span class="text-[9px] uppercase tracking-[0.35em]">{{ t('nav.overview') }}</span>
        <svg class="h-4 w-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

// ── Refs ────────────────────────────────────────────
const canvasEl = ref<HTMLCanvasElement | null>(null)
const ready = ref(false)

// ── Canvas ───────────────────────────────────────────
let ctx2d: CanvasRenderingContext2D | null = null
let currentT = 0
let tickerAdded = false

function drawFrame(t: number) {
  if (!ctx2d || !canvasEl.value) return
  const { width: cw, height: ch } = canvasEl.value
  
  const iw = 1920
  const ih = 1080
  const s = Math.max(cw / iw, ch / ih)

  ctx2d.clearRect(0, 0, cw, ch)
  ctx2d.save()
  ctx2d.translate((cw - iw * s) / 2, (ch - ih * s) / 2)
  ctx2d.scale(s, s)

  const colorT = 0.5 - 0.5 * Math.cos(t * Math.PI * 2)

  // Background
  const bg = ctx2d.createRadialGradient(960, 540, 0, 960, 540, 980)
  bg.addColorStop(0, `hsl(${260 + colorT * 40}, 50%, ${8 + colorT * 5}%)`)
  bg.addColorStop(1, '#000')
  ctx2d.fillStyle = bg; ctx2d.fillRect(0, 0, 1920, 1080)

  // Product
  const cx = 960, cy = 540, w = 420, h = 280
  ctx2d.save(); ctx2d.translate(cx, cy); ctx2d.rotate(t * Math.PI * 2)

  const visor = ctx2d.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2)
  visor.addColorStop(0, `hsla(${260 + colorT * 60},70%,72%,0.93)`)
  visor.addColorStop(1, `hsla(${220 + colorT * 40},60%,32%,0.68)`)
  ctx2d.fillStyle = visor; ctx2d.beginPath()
  ctx2d.roundRect(-w / 2, -h / 2, w, h, [h / 2]); ctx2d.fill()

  const shine = ctx2d.createLinearGradient(-w / 3, -h / 3, w / 6, h / 6)
  shine.addColorStop(0, 'rgba(255,255,255,0.38)'); shine.addColorStop(1, 'rgba(255,255,255,0)')
  ctx2d.fillStyle = shine; ctx2d.beginPath()
  ctx2d.roundRect(-w / 2 + 24, -h / 2 + 20, w / 2, h / 2, [h / 4]); ctx2d.fill()

    ;[-130, 130].forEach(off2 => {
      const pod = ctx2d.createRadialGradient(off2, 0, 0, off2, 0, 74)
      pod.addColorStop(0, `hsla(${200 + colorT * 100},90%,70%,0.95)`)
      pod.addColorStop(1, `hsla(${240 + colorT * 60},70%,18%,0)`)
      ctx2d.fillStyle = pod; ctx2d.beginPath()
      ctx2d.ellipse(off2, 0, 74, 54, 0, 0, Math.PI * 2); ctx2d.fill()
    })
  ctx2d.fillStyle = 'rgba(255,255,255,0.09)'; ctx2d.beginPath()
  ctx2d.roundRect(-w / 2, -h / 2, w, 30, [h / 2, h / 2, 0, 0]); ctx2d.fill()
  ctx2d.restore()

  // Particles
  for (let p = 0; p < 60; p++) {
    ctx2d.beginPath()
    const px = (p * 1234567) % 1920
    const py = (p * 7654321) % 1080
    // slow drift
    const driftX = Math.sin(t * Math.PI * 2 + p) * 30
    const driftY = Math.cos(t * Math.PI * 2 + p) * 30
    ctx2d.arc((px + driftX + 1920) % 1920, (py + driftY + 1080) % 1080, 0.4 + (p % 3) * 0.5, 0, Math.PI * 2)
    ctx2d.fillStyle = `rgba(255,255,255,${0.04 + (p % 8) * 0.05})`; ctx2d.fill()
  }

  ctx2d.restore()
}

function resizeCanvas() {
  if (!canvasEl.value) return
  canvasEl.value.width = window.innerWidth
  canvasEl.value.height = window.innerHeight
  drawFrame(currentT)
}

// Auto-play ticker (slower for premium feel, continuous t)
function tick() {
  // Advance t by a small fraction each frame. 
  // 0.0006 per frame * 60fps = 0.036 per second -> full rotation in ~27 seconds (very slow and premium)
  currentT = (currentT + 0.0006) % 1
  drawFrame(currentT)
}

onMounted(() => {
  ctx2d = canvasEl.value!.getContext('2d')
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  
  // No preloading needed, ready immediately
  ready.value = true
  drawFrame(0)
  gsap.ticker.add(tick)
  tickerAdded = true
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  if (tickerAdded) gsap.ticker.remove(tick)
})
</script>


