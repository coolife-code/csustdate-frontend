<template>
  <div class="min-h-screen bg-white flex flex-col">
    <header class="border-b border-border">
      <div class="max-w-md mx-auto px-md py-md">
        <router-link to="/" class="text-2xl font-serif font-semibold">CSUST DateDrop</router-link>
      </div>
    </header>

    <main class="flex-1 flex items-center justify-center px-md">
      <div class="w-full max-w-md">
        <h2 class="text-3xl font-serif font-semibold text-center mb-2xl">欢迎回来</h2>
        
        <form @submit.prevent="handleLogin" class="space-y-lg">
          <div>
            <label class="block text-sm font-semibold mb-sm">邮箱</label>
            <div class="flex">
              <input
                v-model.trim="form.emailPrefix"
                type="text"
                placeholder="student"
                required
                class="flex-1 px-md py-sm border border-border border-r-0 focus:border-primary focus:outline-none transition"
              />
              <span class="px-md py-sm border border-border bg-surface text-text-secondary select-none">@csust.edu.cn</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold mb-sm">密码</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              required
              class="w-full px-md py-sm border border-border focus:border-primary focus:outline-none transition"
            />
          </div>

          <div class="text-right">
            <router-link to="/forgot-password" class="text-sm text-text-secondary hover:text-primary">
              忘记密码？
            </router-link>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-md bg-primary text-white font-semibold hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {{ loading ? '登录中...' : '登录' }}
          </button>

          <p class="text-center text-text-secondary">
            还没有账号？
            <router-link to="/register" class="text-primary font-semibold hover:underline">立即注册</router-link>
          </p>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { getQuestionnaireCompleteness } from '@/utils/questionnaireProgress'

const router = useRouter()
const userStore = useUserStore()

const form = ref({
  emailPrefix: '',
  password: ''
})

const loading = ref(false)

const handleLogin = async () => {
  if (!form.value.emailPrefix || form.value.emailPrefix.includes('@')) {
    alert('请输入正确的邮箱前缀')
    return
  }
  loading.value = true
  try {
    const email = `${form.value.emailPrefix}@csust.edu.cn`
    await userStore.login(email, form.value.password)
    const completeness = await getQuestionnaireCompleteness({
      token: userStore.token,
      baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
      forceRefresh: true
    })
    router.push(completeness >= 100 ? '/match' : '/questionnaire')
  } catch (error) {
    alert(error.error?.message || '登录失败，请检查邮箱和密码')
  } finally {
    loading.value = false
  }
}
</script>
