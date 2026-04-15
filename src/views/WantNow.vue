<template>
  <div class="relative min-h-screen bg-black overflow-hidden">
    <video
      :src="ghostVideoUrl"
      class="absolute inset-0 h-full w-full object-cover pointer-events-none select-none"
      autoplay
      loop
      muted
      playsinline
      disablepictureinpicture
      controlslist="nodownload nofullscreen noremoteplayback"
      tabindex="-1"
      aria-hidden="true"
    />
    <div class="absolute inset-0 bg-black/25" />
    <header class="relative z-10 px-md py-md">
      <button
        @click="goBack"
        class="text-sm text-white/80 hover:text-white transition"
      >
        再等等
      </button>
    </header>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const ghostVideoUrl = new URL('../../fodder/b736ad4ade518634bbd28a646a6e74fc.webm', import.meta.url).href

const goBack = () => {
  router.back()
}
</script>
