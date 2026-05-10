import { ref } from 'vue'

export interface PreloaderState {
  progress: number
  isComplete: boolean
  images: HTMLImageElement[]
}

/**
 * Composable that preloads a sequence of numbered image frames.
 * Emits reactive progress (0–100) and resolves when all frames are ready.
 *
 * @param buildUrl - function that maps frame index → URL string
 * @param totalFrames - total number of frames to load
 */
export function useImagePreloader(
  buildUrl: (index: number) => string,
  totalFrames: number
) {
  const progress = ref(0)
  const isComplete = ref(false)
  const images = ref<HTMLImageElement[]>([])

  async function load(): Promise<HTMLImageElement[]> {
    const loaded: HTMLImageElement[] = new Array(totalFrames)
    let done = 0

    await Promise.all(
      Array.from({ length: totalFrames }, (_, i) =>
        new Promise<void>((resolve) => {
          const img = new Image()
          img.src = buildUrl(i)

          const finish = () => {
            loaded[i] = img
            done++
            progress.value = Math.round((done / totalFrames) * 100)
            if (done === totalFrames) {
              isComplete.value = true
              images.value = loaded
            }
            resolve()
          }

          img.onload = finish
          img.onerror = () => {
            // On error still mark as "loaded" to avoid blocking
            loaded[i] = img
            finish()
          }
        })
      )
    )

    return loaded
  }

  return { progress, isComplete, images, load }
}
