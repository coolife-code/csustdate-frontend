<template>
  <div class="min-h-screen bg-gradient-to-b from-white to-rose-50/20">
    <header class="border-b border-border bg-white/90 backdrop-blur">
      <div class="max-w-5xl mx-auto px-md py-md flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-serif font-semibold">配对管理</h1>
          <p class="text-sm text-text-secondary mt-1">双向奔赴才会遇见，所有记录都在这里</p>
        </div>
        <nav class="flex gap-lg">
          <router-link to="/match" class="text-text-secondary hover:text-primary transition">本周匹配</router-link>
          <router-link to="/profile" class="text-text-secondary hover:text-primary transition">个人资料</router-link>
        </nav>
      </div>
    </header>
    <main class="max-w-5xl mx-auto px-md py-xl space-y-xl">
      <div v-if="actionMessage" class="rounded-xl border px-md py-sm text-sm" :class="actionMessage.type === 'error' ? 'border-red-300 bg-red-50 text-red-700' : 'border-emerald-300 bg-emerald-50 text-emerald-700'">
        {{ actionMessage.text }}
      </div>
      <div class="rounded-2xl border border-border bg-white p-lg shadow-sm">
        <p class="text-sm text-text-secondary mt-1">建议：聊天卡壳时，问一句“你今天吃了啥”通常比“在吗”更有生命力。</p>
      </div>
      <section class="rounded-2xl border border-border bg-white p-xl shadow-sm">
        <h2 class="text-xl font-semibold mb-md">当前配对</h2>
        <div v-if="loadingActive" class="text-text-muted">加载中...</div>
        <div v-else-if="!activePairing" class="text-text-secondary">无。但未来的机会总比过去多</div>
        <div v-else class="space-y-sm">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-md text-sm">
            <p class="rounded-xl border border-border bg-surface/70 px-md py-sm">昵称：{{ activePairing.match_user?.nickname || '未填写' }}</p>
            <p class="rounded-xl border border-border bg-surface/70 px-md py-sm">姓名：{{ activePairing.match_user?.name || '未填写' }}</p>
            <p class="rounded-xl border border-border bg-surface/70 px-md py-sm">邮箱：{{ activePairing.match_user?.email || '未填写' }}</p>
            <p class="rounded-xl border border-border bg-surface/70 px-md py-sm">微信：{{ activePairing.match_user?.wechat || '未填写' }}</p>
            <p class="rounded-xl border border-border bg-surface/70 px-md py-sm">QQ：{{ activePairing.match_user?.qq || '未填写' }}</p>
            <p class="rounded-xl border border-border bg-surface/70 px-md py-sm">电话：{{ activePairing.match_user?.phone || '未填写' }}</p>
          </div>
          <p class="text-sm text-text-secondary">你们多熟熟就聊了，其实很合拍。</p>
          <button @click="endCurrentPairing" class="mt-md px-lg py-sm rounded-full border border-border hover:bg-gray-50 transition">解除配对</button>
        </div>
      </section>

      <section class="rounded-2xl border border-border bg-white p-xl shadow-sm">
        <h2 class="text-xl font-semibold mb-md">历史配对</h2>
        <p class="text-sm text-text-secondary mb-md">每一段记录都算数：有些是故事开头，有些是下次更会爱的伏笔。</p>
        <div v-if="loadingHistory" class="text-text-muted">加载中...</div>
        <div v-else-if="history.length === 0" class="text-text-secondary">暂无，故事正要开始。</div>
        <div v-else class="space-y-md">
          <div v-for="item in history" :key="item.id" class="rounded-xl border border-border p-md bg-surface/40">
            <p>对象：{{ item.match_user?.nickname || item.match_user?.name || '未填写' }}</p>
            <p>状态：{{ statusText(item.status) }}</p>
            <p>创建时间：{{ formatTime(item.created_at) }}</p>
            <p v-if="item.ended_at">结束时间：{{ formatTime(item.ended_at) }}</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api'

const activePairing = ref(null)
const history = ref([])
const loadingActive = ref(true)
const loadingHistory = ref(true)
const actionMessage = ref('')

const formatTime = (time) => {
  if (!time) {
    return '-'
  }
  return new Date(time).toLocaleString()
}

const loadActivePairing = async () => {
  loadingActive.value = true
  try {
    const res = await api.get('/pairings/active')
    activePairing.value = res.data?.pairing || null
  } finally {
    loadingActive.value = false
  }
}

const loadHistory = async () => {
  loadingHistory.value = true
  try {
    const res = await api.get('/pairings/history')
    history.value = res.data.pairings || []
  } finally {
    loadingHistory.value = false
  }
}

const statusText = (status) => {
  if (status === 'active') {
    return '进行中'
  }
  if (status === 'ended') {
    return '已结束'
  }
  return status || '未知'
}

const endCurrentPairing = async () => {
  if (!activePairing.value) {
    return
  }
  try {
    actionMessage.value = ''
    await api.post(`/pairings/${activePairing.value.id}/end`)
    await Promise.all([loadActivePairing(), loadHistory()])
    actionMessage.value = {
      type: 'success',
      text: '配对已解除，愿下一次相遇更合拍。'
    }
  } catch (error) {
    actionMessage.value = {
      type: 'error',
      text: error.error?.message || '解除失败，请稍后重试'
    }
  }
}

onMounted(() => {
  loadActivePairing()
  loadHistory()
})
</script>
