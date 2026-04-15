<template>
  <div class="min-h-screen bg-gradient-to-b from-white to-rose-50/30">
    <header class="border-b border-border bg-white/90 backdrop-blur">
      <div class="max-w-6xl mx-auto px-md py-md flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-serif font-semibold">CSUST DateDrop</h1>
          <p class="text-sm text-text-secondary mt-1">红楼藏梦，云桥牵缘，把你介绍给更合拍的人</p>
        </div>
        <nav class="flex gap-lg items-center">
          <router-link to="/match" class="text-text-secondary hover:text-primary transition">本周匹配</router-link>
          <router-link to="/pairings" class="text-text-secondary hover:text-primary transition">我的配对</router-link>
          <button @click="logout" class="text-text-secondary hover:text-primary transition">退出</button>
        </nav>
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-md py-2xl space-y-xl">
      <div class="rounded-2xl border border-border bg-white p-lg md:p-xl shadow-sm">
        <h2 class="text-3xl font-serif font-semibold">个人资料</h2>
        <p class="text-sm text-text-secondary mt-1">不必张扬，无需尴尬，真实一点就很好</p>
      </div>

      <div class="rounded-2xl border border-border bg-white p-lg md:p-xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-md">
        <div>
          <h3 class="text-xl font-semibold">问卷入口</h3>
          <p class="text-sm text-text-secondary mt-1">放心，问卷不会考高数。</p>
        </div>
        <router-link to="/questionnaire" class="inline-flex items-center justify-center px-lg py-sm rounded-full bg-primary text-white hover:bg-secondary transition whitespace-nowrap">
          我的问卷
        </router-link>
      </div>

      <form @submit.prevent="handleSave" class="space-y-xl">
        <section class="rounded-2xl border border-border bg-white p-lg md:p-xl shadow-sm">
          <h3 class="text-xl font-semibold mb-lg">基本信息</h3>
          <p class="text-sm text-text-secondary mb-lg">写得越走心，算法越不容易把你分配给“嗯……再看看”的人。</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <div>
              <label class="block text-sm font-semibold mb-sm">昵称</label>
              <input v-model="form.nickname" type="text" placeholder="将用于匹配展示与匹配邮件" class="w-full px-md py-sm rounded-xl border border-border focus:border-primary focus:outline-none transition" />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-sm">姓名</label>
              <input v-model="form.name" type="text" placeholder="仅双向解锁后可见" class="w-full px-md py-sm rounded-xl border border-border focus:border-primary focus:outline-none transition" />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-sm">性别</label>
              <select v-model="form.gender" class="w-full px-md py-sm rounded-xl border border-border focus:border-primary focus:outline-none transition">
                <option value="">请选择</option>
                <option value="male">男</option>
                <option value="female">女</option>
                <option value="other">其他</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold mb-sm">校区</label>
              <select v-model="form.campus" class="w-full px-md py-sm rounded-xl border border-border focus:border-primary focus:outline-none transition">
                <option value="">请选择</option>
                <option value="云塘校区">云塘校区</option>
                <option value="金盆岭校区">金盆岭校区</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold mb-sm">学院</label>
              <select v-model="form.college" class="w-full px-md py-sm rounded-xl border border-border focus:border-primary focus:outline-none transition">
                <option value="">请选择</option>
                <option v-for="college in colleges" :key="college.id" :value="college.name">{{ college.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold mb-sm">专业</label>
              <select v-model="form.major" class="w-full px-md py-sm rounded-xl border border-border focus:border-primary focus:outline-none transition">
                <option value="你猜">你猜</option>
                <option v-for="major in currentCollegeMajors" :key="major" :value="major">{{ major }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold mb-sm">年级</label>
              <select v-model="form.grade" class="w-full px-md py-sm rounded-xl border border-border focus:border-primary focus:outline-none transition">
                <option value="">请选择</option>
                <option v-for="grade in grades" :key="grade.id" :value="grade.name">{{ grade.name }}</option>
              </select>
            </div>
          </div>
          <div class="mt-lg">
            <label class="block text-sm font-semibold mb-sm">个人简介</label>
            <textarea v-model="form.bio" rows="4" maxlength="500" placeholder="给TA留个好印象" class="w-full px-md py-sm rounded-xl border border-border focus:border-primary focus:outline-none transition resize-none"></textarea>
            <p class="text-xs text-text-muted mt-xs">{{ form.bio.length }}/500</p>
          </div>
        </section>

        <section class="rounded-2xl border border-border bg-white p-lg md:p-xl shadow-sm">
          <h3 class="text-xl font-semibold mb-lg">联系方式（双向解锁后可见）</h3>
          <p class="text-sm text-text-secondary mb-lg">双向奔赴总得有留个联系方式吧</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-lg">
            <div>
              <label class="block text-sm font-semibold mb-sm">微信号</label>
              <input v-model="form.wechat" type="text" class="w-full px-md py-sm rounded-xl border border-border focus:border-primary focus:outline-none transition" />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-sm">QQ号</label>
              <input v-model="form.qq" type="text" class="w-full px-md py-sm rounded-xl border border-border focus:border-primary focus:outline-none transition" />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-sm">手机号</label>
              <input v-model="form.phone" type="text" class="w-full px-md py-sm rounded-xl border border-border focus:border-primary focus:outline-none transition" />
            </div>
          </div>
        </section>

        <section class="relative overflow-hidden rounded-2xl border border-border bg-white p-lg md:p-xl shadow-sm">
          <video
            class="pointer-events-none absolute inset-0 h-full w-full object-cover"
            :src="basicInfoBgVideo"
            autoplay
            loop
            muted
            playsinline
          ></video>
          <div class="pointer-events-none absolute inset-0 bg-white/82 backdrop-blur-[1px]"></div>
          <div class="relative z-10">
            <h3 class="text-xl font-semibold mb-sm">匹配偏好</h3>
            <p class="text-sm text-text-secondary mb-lg">算法都尽力捞人了，咱就别给它加难度啦</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <div>
                <label class="block text-sm font-semibold mb-sm">期望性别</label>
                <select v-model="form.preferredGender" class="w-full px-md py-sm rounded-xl border border-border focus:border-primary focus:outline-none transition">
                  <option value="both">不限</option>
                  <option value="male">男</option>
                  <option value="female">女</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold mb-sm">期望校区</label>
                <select v-model="form.preferredCampus" class="w-full px-md py-sm rounded-xl border border-border focus:border-primary focus:outline-none transition">
                  <option value="">不限</option>
                  <option value="云塘校区">云塘校区</option>
                  <option value="金盆岭校区">金盆岭校区</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold mb-sm">期望学院</label>
                <select v-model="form.preferredCollege" class="w-full px-md py-sm rounded-xl border border-border focus:border-primary focus:outline-none transition">
                  <option value="">不限</option>
                  <option v-for="college in colleges" :key="`preferred-${college.id}`" :value="college.name">{{ college.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold mb-sm">期望专业</label>
                <select v-model="form.preferredMajor" class="w-full px-md py-sm rounded-xl border border-border focus:border-primary focus:outline-none transition">
                  <option value="">不限</option>
                  <option v-for="major in currentPreferredCollegeMajors" :key="`preferred-major-${major}`" :value="major">{{ major }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold mb-sm">期望年级</label>
                <select v-model="form.preferredGrade" class="w-full px-md py-sm rounded-xl border border-border focus:border-primary focus:outline-none transition">
                  <option value="">不限</option>
                  <option v-for="grade in grades" :key="`preferred-${grade.id}`" :value="grade.name">{{ grade.name }}</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <div class="rounded-2xl border border-border bg-white p-lg md:p-xl shadow-sm space-y-md">
          <div v-if="saveMessage" class="rounded-xl border px-md py-sm text-sm" :class="saveMessage.type === 'error' ? 'border-red-300 bg-red-50 text-red-700' : 'border-emerald-300 bg-emerald-50 text-emerald-700'">
            {{ saveMessage.text }}
          </div>
          <p class="text-sm text-text-secondary">保存后立即生效，下一轮匹配会优先按你的偏好进行过滤。。</p>
          <button type="submit" :disabled="loading" class="w-full py-md rounded-xl bg-primary text-white font-semibold hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition">
            {{ loading ? '保存中...' : '保存资料与偏好' }}
          </button>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import api from '@/api'

const basicInfoBgVideo = new URL('../../fodder/もなかもち_tears.webm', import.meta.url).href

const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const saveMessage = ref('')
const colleges = ref([])
const grades = ref([])
const collegeMajors = ref({})
const getDefaultPreferredGender = (gender) => {
  if (gender === 'male') {
    return 'female'
  }
  if (gender === 'female') {
    return 'male'
  }
  return 'both'
}

const form = ref({
  nickname: '',
  name: '',
  gender: '',
  campus: '',
  college: '',
  major: '你猜',
  grade: '',
  bio: '',
  wechat: '',
  qq: '',
  phone: '',
  preferredGender: '',
  preferredCampus: '',
  preferredCollege: '',
  preferredMajor: '',
  preferredGrade: ''
})

const loadColleges = async () => {
  try {
    const res = await api.get('/users/colleges')
    colleges.value = res.data.colleges
  } catch (error) {
    console.error('加载学院列表失败', error)
  }
}

const loadGrades = async () => {
  try {
    const res = await api.get('/users/grades')
    grades.value = res.data.grades
  } catch (error) {
    console.error('加载年级列表失败', error)
  }
}

const loadMajors = async () => {
  try {
    const res = await api.get('/users/majors')
    collegeMajors.value = res.data.college_majors || {}
  } catch (error) {
    console.error('加载专业列表失败', error)
  }
}

const currentCollegeMajors = computed(() => {
  if (!form.value.college) {
    return []
  }
  return collegeMajors.value[form.value.college] || []
})

const currentPreferredCollegeMajors = computed(() => {
  if (!form.value.preferredCollege) {
    return []
  }
  return collegeMajors.value[form.value.preferredCollege] || []
})

const loadProfile = async () => {
  const applyUserToForm = (userData) => {
    if (!userData) {
      return
    }
    Object.assign(form.value, {
      nickname: userData.nickname || '',
      name: userData.name || '',
      gender: userData.gender || '',
      campus: userData.campus || '',
      college: userData.college || '',
      major: userData.major || '你猜',
      grade: userData.grade || '',
      bio: userData.bio || '',
      wechat: userData.wechat || '',
      qq: userData.qq || '',
      phone: userData.phone || ''
    })
  }
  const applyPreferencesToForm = (preferences) => {
    const otherPreferences = preferences?.other_preferences || {}
    const incomingPreferredGender = preferences?.preferred_gender
    form.value.preferredGender = (!incomingPreferredGender || incomingPreferredGender === 'both')
      ? getDefaultPreferredGender(form.value.gender)
      : incomingPreferredGender
    form.value.preferredCampus = otherPreferences.preferred_campus || ''
    form.value.preferredCollege = otherPreferences.preferred_college || ''
    form.value.preferredMajor = otherPreferences.preferred_major || ''
    form.value.preferredGrade = otherPreferences.preferred_grade || ''
  }
  if (userStore.user) {
    applyUserToForm(userStore.user)
    applyPreferencesToForm(userStore.user.preferences)
  }
  try {
    const res = await userStore.fetchProfile()
    applyUserToForm(res.user)
    applyPreferencesToForm(res.preferences)
  } catch (error) {
    try {
      const meRes = await api.get('/auth/me')
      applyUserToForm(meRes.data)
      userStore.user = {
        ...(userStore.user || {}),
        ...meRes.data
      }
    } catch {
      if (userStore.user) {
        applyUserToForm(userStore.user)
        applyPreferencesToForm(userStore.user.preferences)
      }
    }
  }
}

const handleSave = async () => {
  loading.value = true
  try {
    saveMessage.value = ''
    await userStore.updateProfile(form.value)
    saveMessage.value = {
      type: 'success',
      text: '资料保存成功，下一次匹配会按你的最新偏好进行。'
    }
  } catch (error) {
    saveMessage.value = {
      type: 'error',
      text: error.error?.message || '保存失败，请稍后重试'
    }
  } finally {
    loading.value = false
  }
}

const logout = () => {
  userStore.logout()
  router.push('/login')
}

onMounted(() => {
  loadColleges()
  loadGrades()
  loadMajors()
  loadProfile()
})

watch(() => form.value.college, (nextCollege) => {
  if (!nextCollege) {
    form.value.major = '你猜'
    return
  }
  const majors = collegeMajors.value[nextCollege] || []
  if (form.value.major !== '你猜' && !majors.includes(form.value.major)) {
    form.value.major = '你猜'
  }
})

watch(() => form.value.preferredCollege, (nextCollege) => {
  if (!nextCollege) {
    form.value.preferredMajor = ''
    return
  }
  const majors = collegeMajors.value[nextCollege] || []
  if (form.value.preferredMajor && !majors.includes(form.value.preferredMajor)) {
    form.value.preferredMajor = ''
  }
})

watch(() => form.value.gender, (nextGender) => {
  if (!form.value.preferredGender || form.value.preferredGender === 'both') {
    form.value.preferredGender = getDefaultPreferredGender(nextGender)
  }
})
</script>
