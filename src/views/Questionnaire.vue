<template>
  <div class="min-h-screen bg-gradient-to-b from-white to-pink-50/40">
    <header class="border-b border-border bg-white/90 backdrop-blur">
      <div class="max-w-6xl mx-auto px-md py-md flex justify-center items-center">
        <div>
          <h1 class="text-2xl font-serif font-semibold">问卷系统</h1>
          <p class="text-sm text-text-secondary mt-1">把你的节奏告诉我们，让相遇更恰好</p>
        </div>
      </div>
    </header>
    <main class="max-w-6xl mx-auto px-md py-xl space-y-xl">
      <div class="rounded-2xl border border-border bg-white shadow-sm p-lg md:p-xl space-y-md">
        <p class="text-sm text-text-secondary">于书香与林荫之间，等一场恰好的心动</p>
        <div class="flex flex-wrap items-center justify-between gap-sm">
          <p class="text-sm text-text-secondary">已完成 {{ progress.completeness }}%</p>
          <p class="text-sm font-medium text-primary">{{ progressMessage }}</p>
        </div>
        <div class="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
          <div class="bg-primary h-3 transition-all duration-500" :style="{ width: `${progress.completeness}%` }"></div>
        </div>
        <p class="text-sm text-text-secondary">已答 {{ answeredCount }}/{{ totalQuestionCount }} 题，越认真越容易匹配到合拍的人</p>
        <p v-if="!canLeaveQuestionnaire" class="text-sm text-text-secondary">
          问卷未完成前将停留在此页，全部答完后点击“保存问卷并继续”即可离开。
        </p>
      </div>

      <div v-for="(section, sectionIndex) in sections" :key="section.name" class="rounded-2xl border border-border bg-white p-lg md:p-xl shadow-sm">
        <h2 class="text-xl font-semibold mb-lg">{{ section.title }}</h2>
        <div class="space-y-lg">
          <article v-for="(question, questionIndex) in section.questions" :key="question.id" class="rounded-2xl border border-border bg-slate-50/40 p-md md:p-lg space-y-md">
            <div class="flex items-start justify-between gap-md">
              <p class="font-medium leading-relaxed text-base md:text-lg">
                <span class="inline-flex items-center justify-center min-w-8 h-8 px-2 mr-sm rounded-full bg-primary text-white text-sm">
                  {{ getQuestionNo(sectionIndex, questionIndex) }}
                </span>
                {{ question.question_text }}
              </p>
              <span class="text-xs md:text-sm px-sm py-1 rounded-full bg-white border border-border text-text-secondary whitespace-nowrap">
                {{ getQuestionHint(question.id) }}
              </span>
            </div>
            <div v-if="question.question_type === 'single'" class="space-y-sm">
              <label v-for="option in normalizeOptions(question.options)" :key="option" class="flex items-start gap-sm p-sm md:p-md rounded-xl border border-border bg-white hover:border-primary hover:bg-pink-50/30 transition cursor-pointer">
                <input type="radio" :name="`q-${question.id}`" :value="option" v-model="answers[question.id]" class="mt-1" />
                <span class="leading-relaxed">{{ option }}</span>
              </label>
            </div>
            <div v-else-if="question.question_type === 'multiple'" class="space-y-sm">
              <label v-for="option in normalizeOptions(question.options)" :key="option" class="flex items-start gap-sm p-sm md:p-md rounded-xl border border-border bg-white hover:border-primary hover:bg-pink-50/30 transition cursor-pointer">
                <input type="checkbox" :value="option" :checked="isChecked(question.id, option)" @change="toggleMulti(question.id, option)" class="mt-1" />
                <span class="leading-relaxed">{{ option }}</span>
              </label>
            </div>
            <div v-else>
              <textarea v-model="answers[question.id]" rows="3" class="w-full px-md py-sm rounded-xl border border-border bg-white focus:border-primary focus:outline-none"></textarea>
            </div>
          </article>
        </div>
      </div>
      <div class="rounded-2xl border border-border bg-white p-lg md:p-xl space-y-md shadow-sm">
        <div v-if="saveMessage" class="rounded-xl border px-md py-sm text-sm" :class="saveMessage.type === 'error' ? 'border-red-300 bg-red-50 text-red-700' : 'border-emerald-300 bg-emerald-50 text-emerald-700'">
          {{ saveMessage.text }}
        </div>
        <p class="text-sm text-text-secondary">每一题都在帮系统更懂你，填完就去遇见更合拍的 TA</p>
        <button @click="saveAll" :disabled="saving" class="w-full py-md rounded-xl bg-primary text-white font-semibold hover:bg-secondary disabled:opacity-50">
          {{ saving ? '保存中...' : '保存问卷并继续' }}
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import api from '@/api'
import { setCachedCompleteness } from '@/utils/questionnaireProgress'

const router = useRouter()
const sections = ref([])
const answers = reactive({})
const saving = ref(false)
const progress = ref({
  completeness: 0
})
const saveMessage = ref('')
const hintLabels = ['再答一题更懂你', '缘分加载中', '高匹配加速中', '认真答更准', '冲刺理想匹配']

const totalQuestionCount = computed(() => {
  return sections.value.reduce((total, section) => total + section.questions.length, 0)
})

const answeredCount = computed(() => {
  return Object.values(answers).filter((value) => {
    return value !== '' && value !== null && value !== undefined && (!Array.isArray(value) || value.length > 0)
  }).length
})

const canLeaveQuestionnaire = computed(() => {
  return progress.value.completeness >= 100
})

const progressMessage = computed(() => {
  const completeness = progress.value.completeness || 0
  if (completeness >= 100) {
    return '满分进度，去看看你的匹配结果'
  }
  if (completeness >= 70) {
    return '马上完成了，缘分就在前方'
  }
  if (completeness >= 30) {
    return '状态不错，继续保持'
  }
  return '先热个身，后面会更有趣'
})

const normalizeOptions = (options) => {
  if (!options) {
    return []
  }
  if (Array.isArray(options)) {
    return options
  }
  if (typeof options === 'object') {
    return Object.values(options)
  }
  return []
}

const isChecked = (questionId, option) => {
  return Array.isArray(answers[questionId]) && answers[questionId].includes(option)
}

const toggleMulti = (questionId, option) => {
  const current = Array.isArray(answers[questionId]) ? [...answers[questionId]] : []
  if (current.includes(option)) {
    answers[questionId] = current.filter(item => item !== option)
  } else {
    answers[questionId] = [...current, option]
  }
}

const getQuestionNo = (sectionIndex, questionIndex) => {
  const beforeCount = sections.value
    .slice(0, sectionIndex)
    .reduce((total, section) => total + section.questions.length, 0)
  return beforeCount + questionIndex + 1
}

const getQuestionHint = (questionId) => {
  return hintLabels[questionId % hintLabels.length]
}

const loadBootstrap = async () => {
  const res = await api.get('/questionnaire/bootstrap')
  sections.value = res.data.sections || []
  progress.value = res.data.progress || {
    completeness: 0
  }
  const token = localStorage.getItem('token')
  if (token && typeof progress.value.completeness === 'number') {
    setCachedCompleteness(token, progress.value.completeness)
  }
  const serverAnswers = res.data.answers_by_question_id || {}
  for (const [questionId, answerValue] of Object.entries(serverAnswers)) {
    answers[Number(questionId)] = answerValue
  }
}

const loadProgress = async () => {
  const res = await api.get('/questionnaire/progress')
  progress.value = res.data
  const token = localStorage.getItem('token')
  if (token && typeof progress.value.completeness === 'number') {
    setCachedCompleteness(token, progress.value.completeness)
  }
}

const saveAll = async () => {
  const payload = Object.entries(answers)
    .filter(([, value]) => value !== '' && value !== null && value !== undefined && (!Array.isArray(value) || value.length > 0))
    .map(([questionId, answerValue]) => ({
      question_id: Number(questionId),
      answer_value: answerValue
    }))
  if (payload.length === 0) {
    saveMessage.value = {
      type: 'error',
      text: '请至少填写一题后再保存'
    }
    return
  }
  saving.value = true
  try {
    saveMessage.value = ''
    await api.post('/questionnaire/answers', { answers: payload })
    await loadProgress()
    if (progress.value.completeness >= 100) {
      saveMessage.value = {
        type: 'success',
        text: '全题已保存，准备送你去本周匹配。'
      }
      router.push('/match')
      return
    }
    const remainCount = Math.max(totalQuestionCount.value - answeredCount.value, 0)
    saveMessage.value = {
      type: 'success',
      text: `已保存，当前还差 ${remainCount} 题，先别溜，填完我们就放你去见缘分。`
    }
  } catch (error) {
    saveMessage.value = {
      type: 'error',
      text: error.error?.message || '保存失败，请稍后再试'
    }
  } finally {
    saving.value = false
  }
}

const handleBeforeUnload = (event) => {
  if (canLeaveQuestionnaire.value) {
    return
  }
  event.preventDefault()
  event.returnValue = ''
}

onBeforeRouteLeave(() => {
  if (canLeaveQuestionnaire.value) {
    return true
  }
  saveMessage.value = {
    type: 'error',
    text: '还没填完就想撤退？先把题目收尾并保存，再去下一页。'
  }
  return false
})

onMounted(async () => {
  window.addEventListener('beforeunload', handleBeforeUnload)
  await loadBootstrap()
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})
</script>
