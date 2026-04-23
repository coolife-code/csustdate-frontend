import { ref, onMounted } from 'vue'

export function useBrowserDetect() {
  const isBaiduBrowser = ref(false)

  const detectBrowser = () => {
    const userAgent = navigator.userAgent.toLowerCase()
    isBaiduBrowser.value = userAgent.includes('baidu') || userAgent.includes('spider')
  }

  onMounted(() => {
    detectBrowser()
  })

  return {
    isBaiduBrowser
  }
}