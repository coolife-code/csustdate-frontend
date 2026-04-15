import { createRouter, createWebHistory } from 'vue-router'
import { getQuestionnaireCompleteness } from '@/utils/questionnaireProgress'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('@/views/Landing.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/questionnaire',
    name: 'Questionnaire',
    component: () => import('@/views/Questionnaire.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/match',
    name: 'Match',
    component: () => import('@/views/Match.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/pairings',
    name: 'Pairings',
    component: () => import('@/views/Pairings.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/want-now',
    name: 'WantNow',
    component: () => import('@/views/WantNow.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/login')
    return
  }

  if (!token) {
    next()
    return
  }

  if (to.path === '/') {
    const completeness = await getQuestionnaireCompleteness({
      token,
      baseURL: import.meta.env.VITE_API_BASE_URL || '/api'
    })
    if (completeness === null) {
      next('/match')
      return
    }
    next(completeness >= 100 ? '/match' : '/questionnaire')
    return
  }

  const requiresCompletedQuestionnaire = to.path === '/match' || to.path === '/pairings'
  if (!requiresCompletedQuestionnaire) {
    next()
    return
  }

  const completeness = await getQuestionnaireCompleteness({
    token,
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api'
  })
  if (completeness !== null && completeness < 100) {
    next('/questionnaire')
    return
  }

  next()
})

export default router
