<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-rose-50/30 to-amber-50/40">
    <header class="border-b border-border bg-white/90 backdrop-blur">
      <div class="max-w-6xl mx-auto px-md py-md">
        <div>
          <h1 class="text-2xl font-serif font-semibold">CSUST DateDrop</h1>
          <p class="text-xs text-text-secondary mt-1">于书香与林荫之间，等一场恰好的心动</p>
        </div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-md py-4xl">
      <div class="relative overflow-hidden text-center mb-4xl rounded-3xl border border-border/70 bg-white/80 p-2xl shadow-sm">
        <video
          :src="teaserVideoUrl"
          class="absolute inset-0 h-full w-full object-cover pointer-events-none select-none"
          autoplay
          loop
          muted
          playsinline
          disablepictureinpicture
          tabindex="-1"
          aria-hidden="true"
        />
        <div class="absolute inset-0 bg-white/78" />
        <div class="relative z-10">
        <p class="text-sm text-text-secondary tracking-[0.2em] mb-md">CSUST DATE · 双向为约</p>
        <h2 class="text-5xl font-serif font-bold mb-lg leading-tight">每周二的晚风，都会捎来一封温柔的信</h2>
        <p class="text-xl text-text-secondary mb-md">那是算法悄悄为你觅得的，一个灵魂相近的人</p>
        <p class="text-base text-text-secondary mb-2xl">不必张扬，无需尴尬，双向奔赴才会遇见</p>
        <p v-if="registeredCount !== null" class="text-sm text-text-secondary mb-lg">
          当前已注册 <span class="font-semibold text-primary">{{ registeredCount }}</span> 人
        </p>
        <router-link 
          to="/register" 
          class="inline-block px-2xl py-lg rounded-full bg-primary text-white text-lg font-semibold hover:bg-secondary transition"
        >
          开启这周的缘分
        </router-link>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-lg mb-4xl">
        <div class="rounded-2xl border border-border bg-white/85 p-lg shadow-sm">
          <p class="text-text-secondary">风过金村的樟道，月落云塘的湖光。</p>
          <p class="text-text-secondary mt-sm">红楼藏梦，云桥牵缘，九云鼎下，一诺千年。</p>
        </div>
        <div class="rounded-2xl border border-border bg-white/85 p-lg shadow-sm">
          <p class="text-text-secondary">我们把藏在云影与樟荫间的缘分，整理成一次恰好的相遇。</p>
          <p class="text-text-secondary mt-sm">愿你在长理的时光，总有不期而遇的惊喜。</p>
        </div>
      </div>

      <div class="border-t border-border pt-4xl">
        <h3 class="text-3xl font-serif text-center mb-2xl">简单三步，遇见TA</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2xl mt-2xl">
          <div class="text-center rounded-2xl border border-border bg-white/85 p-lg hover:-translate-y-1 transition">
            <div class="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-md text-2xl font-bold">1</div>
            <h4 class="text-xl font-semibold mb-sm">注册账号</h4>
            <p class="text-text-secondary">使用教育邮箱完成注册</p>
          </div>
          <div class="text-center rounded-2xl border border-border bg-white/85 p-lg hover:-translate-y-1 transition">
            <div class="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-md text-2xl font-bold">2</div>
            <h4 class="text-xl font-semibold mb-sm">填写问卷</h4>
            <p class="text-text-secondary">把你的喜好与节奏告诉我们</p>
          </div>
          <div class="text-center rounded-2xl border border-border bg-white/85 p-lg hover:-translate-y-1 transition">
            <div class="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-md text-2xl font-bold">3</div>
            <h4 class="text-xl font-semibold mb-sm">等待匹配</h4>
            <p class="text-text-secondary">每周二在邮箱里收下这封来信</p>
          </div>
        </div>
      </div>
    </main>

    <footer class="border-t border-border py-xl text-center text-text-muted">
      <p>&copy; 2024 CSUST DateDrop. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import api from '@/api'

const registeredCount = ref(null)
const teaserVideoUrl = new URL('../../fodder/d5e263288a5f1306024e46992b980f3c.webm', import.meta.url).href

const loadRegisteredCount = async () => {
  try {
    const res = await api.get('/docs/registered-count')
    if (typeof res.data?.registered_count === 'number') {
      registeredCount.value = res.data.registered_count
    }
  } catch (error) {
    registeredCount.value = null
  }
}

onMounted(() => {
  loadRegisteredCount()
})
</script>
