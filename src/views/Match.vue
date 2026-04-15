<template>
  <div class="min-h-screen bg-gradient-to-b from-white to-rose-50/30">
    <header class="border-b border-border bg-white/90 backdrop-blur">
      <div class="max-w-4xl mx-auto px-md py-md flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-serif font-semibold">本周匹配</h1>
          <p class="text-sm text-text-secondary mt-1">不必慌张，无需言说，本期匹配已至</p>
        </div>
        <nav class="flex gap-lg">
          <router-link to="/pairings" class="text-text-secondary hover:text-primary transition">我的配对</router-link>
          <router-link to="/profile" class="text-text-secondary hover:text-primary transition">个人资料</router-link>
        </nav>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-md py-xl space-y-lg">
      <div class="rounded-2xl border border-border bg-white/85 p-lg shadow-sm">
        <p class="text-sm text-text-secondary">每周二，你的教育邮箱会如约收到一封来信</p>
        <p class="text-sm text-text-secondary mt-1">那是算法悄悄为你觅得的，一个灵魂相近的人</p>
      </div>
      <p v-if="registeredCount !== null" class="text-sm text-text-secondary">
        当前已注册 <span class="font-semibold text-primary">{{ registeredCount }}</span> 人
      </p>
      <div v-if="actionMessage" class="rounded-xl border px-md py-sm text-sm" :class="actionMessage.type === 'error' ? 'border-red-300 bg-red-50 text-red-700' : 'border-emerald-300 bg-emerald-50 text-emerald-700'">
        {{ actionMessage.text }}
      </div>
      <div v-if="loading" class="text-center text-text-muted">加载中...</div>
      <div v-else-if="!match" class="relative">
        <button
          @click="goWantNow"
          class="absolute -top-3 right-2 text-xs text-text-muted/60 hover:text-text-secondary transition tracking-wide"
        >
          我现在就要
        </button>
        <div class="rounded-2xl border border-border bg-white p-xl text-center space-y-md shadow-sm">
          <p>本周暂未生成匹配，先完善个人信息会更容易遇见合拍的人。</p>
          <button @click="goFillProfile" class="px-lg py-sm rounded-full bg-primary text-white hover:bg-secondary transition">立即尝试填写</button>
        </div>
        <div class="mt-md rounded-2xl border border-border bg-white p-xl text-center space-y-md shadow-sm">
          <p class="text-text-secondary">标注：记得关注你的教育邮箱哦</p>
        </div>
      </div>
      <template v-else>
        <div class="rounded-2xl border border-border bg-white p-xl space-y-lg shadow-sm">
          <div class="flex items-center justify-between gap-md">
            <h2 class="text-2xl font-semibold">{{ match.match_user?.nickname || '匿名同学' }}</h2>
            <span class="px-sm py-1 rounded-full text-xs border border-border bg-surface text-text-secondary">匹配分数 {{ match.match_score }}</span>
          </div>
          <div class="rounded-xl border border-border bg-surface/50 p-md">
            <p class="text-text-secondary leading-relaxed">“{{ match.match_user?.bio || '这位同学比较神秘，简介留白了。建议你们先从“今天吃了啥”破冰。' }}”</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-md text-sm">
            <p class="rounded-xl border border-border bg-surface/70 px-md py-sm">学院：{{ match.match_user?.college || '你猜' }}</p>
            <p class="rounded-xl border border-border bg-surface/70 px-md py-sm">专业：{{ match.match_user?.major || '你猜' }}</p>
            <p class="rounded-xl border border-border bg-surface/70 px-md py-sm">年级：{{ match.match_user?.grade || '你猜' }}</p>
          </div>
          <div v-if="isFullyUnlocked" class="rounded-xl border border-emerald-200 bg-emerald-50/70 px-md py-sm">
            <p class="text-sm text-emerald-700">恭喜双向解锁成功，联系方式已发邮件，也可去“我的配对”查看详情。</p>
          </div>
          <div v-if="showActionButtons" class="flex gap-md">
            <button @click="unlock" :disabled="acting" class="flex-1 py-sm rounded-full bg-primary text-white hover:bg-secondary disabled:opacity-50 transition">解锁</button>
            <button @click="skip" :disabled="acting" class="flex-1 py-sm rounded-full border border-border hover:bg-gray-50 disabled:opacity-50 transition">暂不解锁</button>
          </div>
          <div v-if="showRegretButton" class="flex gap-md">
            <button @click="regret" :disabled="acting" class="flex-1 py-sm rounded-full bg-primary text-white hover:bg-secondary disabled:opacity-50 transition">反悔并解锁</button>
          </div>
          <p v-if="showActionButtons" class="text-sm text-text-secondary">建议你们直接原地组队，别祸害别人了。</p>
          <p v-if="showRegretButton" class="text-sm text-text-secondary">后悔药已备好，给孩子一条活路吧</p>
          <p class="text-sm text-text-secondary">当前状态：{{ statusLabel }}</p>
        </div>
        <p class="text-xs text-text-muted px-sm">
          可以将教育邮箱登录在手机上的邮箱软件中，第一时间获取心动来信
        </p>
      </template>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'

const router = useRouter()
const loading = ref(true)
const acting = ref(false)
const match = ref(null)
const registeredCount = ref(null)
const actionMessage = ref('')
const currentUserId = ref(null)

const isFullyUnlocked = computed(() => {
  return match.value?.status === 'both_unlocked' || match.value?.status === 'paired'
})

const showActionButtons = computed(() => {
  const status = match.value?.status
  if (!status) {
    return false
  }
  if (status === 'both_unlocked' || status === 'paired' || status === 'both_skipped') {
    return false
  }
  if (status === 'user1_skipped' || status === 'user2_skipped') {
    return false
  }
  return true
})

const skippedByCurrentUser = computed(() => {
  const status = match.value?.status
  const userId = currentUserId.value
  if (!status || !userId) {
    return false
  }
  if (status === 'both_skipped') {
    return true
  }
  if (status === 'user1_skipped') {
    return match.value?.user1_id === userId
  }
  if (status === 'user2_skipped') {
    return match.value?.user2_id === userId
  }
  return false
})

const showRegretButton = computed(() => skippedByCurrentUser.value)

const statusLabel = computed(() => {
  const status = match.value?.status
  if (!status) {
    return '缘分加载中，马上就到'
  }
  if (status === 'pending') {
    return '你们都在观望，空气里有点小紧张'
  }
  if (status === 'user1_unlocked' || status === 'user2_unlocked' || status === 'unlocked') {
    return '一方已解锁，另一方正在思考人生'
  }
  if (status === 'both_unlocked' || status === 'paired') {
    return '双向解锁完成，月老在工位上鼓掌'
  }
  if (status === 'user1_skipped' || status === 'user2_skipped' || status === 'skipped') {
    return '一方已跳过，这次先礼貌退场'
  }
  if (status === 'both_skipped') {
    return '双方都选择跳过，缘分本轮休假'
  }
  return `状态：${status}`
})

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

const loadCurrentMatch = async () => {
  loading.value = true
  try {
    const res = await api.get('/matches/current')
    match.value = res.data?.match || null
  } finally {
    loading.value = false
  }
}

const decodeCurrentUserId = () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      currentUserId.value = null
      return
    }
    const payload = JSON.parse(atob(token.split('.')[1]))
    const parsedId = Number(payload?.id)
    currentUserId.value = Number.isFinite(parsedId) ? parsedId : null
  } catch {
    currentUserId.value = null
  }
}

const goFillProfile = () => {
  router.push('/profile')
}

const goWantNow = () => {
  router.push('/want-now')
}

const unlock = async () => {
  if (!match.value) {
    return
  }
  acting.value = true
  try {
    const res = await api.post(`/matches/${match.value.id}/unlock`)
    match.value.status = res.data.status
    if (res.data.pairing_id) {
      actionMessage.value = {
        type: 'success',
        text: '你们已双向解锁，联系方式已通过邮件发送。'
      }
      return
    }
    actionMessage.value = {
      type: 'success',
      text: '已解锁，等对方回应就会收到下一封来信。'
    }
  } catch (error) {
    actionMessage.value = {
      type: 'error',
      text: error.error?.message || '操作失败，请稍后再试'
    }
  } finally {
    acting.value = false
  }
}

const skip = async () => {
  if (!match.value) {
    return
  }
  acting.value = true
  try {
    const res = await api.post(`/matches/${match.value.id}/skip`)
    match.value.status = res.data.status
    actionMessage.value = {
      type: 'success',
      text: '已跳过本次匹配，愿下一次刚好遇见。'
    }
  } catch (error) {
    actionMessage.value = {
      type: 'error',
      text: error.error?.message || '操作失败，请稍后再试'
    }
  } finally {
    acting.value = false
  }
}

const regret = async () => {
  if (!match.value) {
    return
  }
  acting.value = true
  try {
    const res = await api.post(`/matches/${match.value.id}/regret`)
    match.value.status = res.data.status
    actionMessage.value = {
      type: 'success',
      text: '已反悔并恢复为解锁状态，等待对方回应。'
    }
  } catch (error) {
    actionMessage.value = {
      type: 'error',
      text: error.error?.message || '操作失败，请稍后再试'
    }
  } finally {
    acting.value = false
  }
}

onMounted(() => {
  decodeCurrentUserId()
  loadCurrentMatch()
  loadRegisteredCount()
})
</script>
