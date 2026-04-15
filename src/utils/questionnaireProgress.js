const CACHE_TTL_MS = 30 * 1000

const buildCacheKey = (token) => {
  const suffix = token ? token.slice(-16) : 'anonymous'
  return `questionnaire_progress:${suffix}`
}

const getCachedCompleteness = (token) => {
  try {
    const cacheKey = buildCacheKey(token)
    const raw = localStorage.getItem(cacheKey)
    if (!raw) {
      return null
    }
    const parsed = JSON.parse(raw)
    if (!parsed || parsed.expiresAt < Date.now()) {
      localStorage.removeItem(cacheKey)
      return null
    }
    if (typeof parsed.completeness !== 'number') {
      return null
    }
    return parsed.completeness
  } catch {
    return null
  }
}

const setCachedCompleteness = (token, completeness) => {
  try {
    const cacheKey = buildCacheKey(token)
    localStorage.setItem(cacheKey, JSON.stringify({
      completeness,
      expiresAt: Date.now() + CACHE_TTL_MS
    }))
  } catch {
    // Ignore cache write failures.
  }
}

const clearCachedCompleteness = (token) => {
  try {
    localStorage.removeItem(buildCacheKey(token))
  } catch {
    // Ignore cache remove failures.
  }
}

const getQuestionnaireCompleteness = async ({
  token,
  baseURL = '/api',
  forceRefresh = false
}) => {
  if (!forceRefresh) {
    const cached = getCachedCompleteness(token)
    if (cached !== null) {
      return cached
    }
  }

  try {
    const response = await fetch(`${baseURL}/questionnaire/progress`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!response.ok) {
      return null
    }
    const result = await response.json()
    const completeness = result?.data?.completeness
    if (typeof completeness === 'number') {
      setCachedCompleteness(token, completeness)
      return completeness
    }
    return null
  } catch {
    return null
  }
}

export {
  clearCachedCompleteness,
  getQuestionnaireCompleteness,
  setCachedCompleteness
}
