<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-rose-50/20 to-amber-50/30">
    <header class="border-b border-border bg-white/90 backdrop-blur">
      <div class="max-w-3xl mx-auto px-md py-md">
        <router-link to="/" class="text-xl font-serif font-semibold text-text-primary hover:text-primary transition">CSUST DateDrop</router-link>
      </div>
    </header>

    <main class="max-w-3xl mx-auto px-md py-4xl space-y-xl">
      <section class="text-center rounded-3xl border border-border/70 bg-white/85 p-2xl shadow-sm">
        <p class="text-sm text-text-secondary tracking-[0.2em] mb-md">CSUS TCHAT · 校园偶遇</p>
        <h1 class="text-3xl md:text-4xl font-serif font-bold mb-lg leading-tight">把附近的人，变成一次真实的相遇</h1>
        <p class="text-lg text-text-secondary mb-md">csustchat —— 一款走在校园里就能悄悄认识新朋友的匿名社交应用。</p>
        <p class="text-sm text-text-secondary mb-lg">
          无需手机号、无需注册、无中心服务器，端到端加密，离线也能用。
        </p>
        <a
          :href="apkUrl"
          download
          class="inline-block px-2xl py-lg rounded-full bg-primary text-white text-lg font-semibold hover:bg-secondary transition"
        >
          下载 Android 版
        </a>
        <p class="text-xs text-text-muted mt-md">v1.7.5 · Android 8.0 及以上（ARM 64）</p>
      </section>

      <section class="rounded-2xl border border-border bg-white p-lg md:p-xl shadow-sm space-y-md">
        <h2 class="text-xl font-semibold">它是什么？</h2>
        <p class="text-sm text-text-secondary leading-relaxed">
          csustchat 把「在校园里认识附近的人」变成一次可数字化的真实相遇。它基于去中心化通信技术改造，没有账号体系、没有中心服务器、没有手机号，端到端加密，离线也能用。
        </p>
      </section>

      <section>
        <h2 class="text-2xl font-serif font-semibold text-center mb-lg">核心功能</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
          <div class="rounded-2xl border border-border bg-white/85 p-lg shadow-sm">
            <h3 class="font-semibold mb-sm">即开即用，匿名身份</h3>
            <p class="text-sm text-text-secondary leading-relaxed">首次打开设置昵称、选择性别，自动生成匿名密钥身份；身份密钥本地保存，可一键重置。</p>
          </div>
          <div class="rounded-2xl border border-border bg-white/85 p-lg shadow-sm">
            <h3 class="font-semibold mb-sm">校园偶遇，箭头导航</h3>
            <p class="text-sm text-text-secondary leading-relaxed">双方都在「寻找」时自动匹配，屏幕箭头指向对方，靠近 3 米且面向对方即相遇成功。</p>
          </div>
          <div class="rounded-2xl border border-border bg-white/85 p-lg shadow-sm">
            <h3 class="font-semibold mb-sm">加密私信，实时共享</h3>
            <p class="text-sm text-text-secondary leading-relaxed">匹配即可发文字、语音、图片、文件；交换 geohash 后离开蓝牙范围仍能异步通信。</p>
          </div>
          <div class="rounded-2xl border border-border bg-white/85 p-lg shadow-sm">
            <h3 class="font-semibold mb-sm">#mesh 公共聊天</h3>
            <p class="text-sm text-text-secondary leading-relaxed">与附近所有用户公开聊天，消息 gossip 同步，完全离线工作。</p>
          </div>
          <div class="rounded-2xl border border-border bg-white/85 p-lg shadow-sm">
            <h3 class="font-semibold mb-sm">隐私与安全</h3>
            <p class="text-sm text-text-secondary leading-relaxed">私信端到端加密（Noise 协议）；精确坐标仅与对方实时共享；三击图标可一键 Panic Wipe 清除所有数据。</p>
          </div>
          <div class="rounded-2xl border border-border bg-white/85 p-lg shadow-sm">
            <h3 class="font-semibold mb-sm">IRC 风格命令</h3>
            <p class="text-sm text-text-secondary leading-relaxed">/msg、/block、/fav、/ping、/trace、/help 等，熟悉聊天工具的同学用起来很顺手。</p>
          </div>
        </div>
      </section>

      <section class="rounded-2xl border border-border bg-white p-lg md:p-xl shadow-sm space-y-md">
        <h2 class="text-xl font-semibold">三步开始</h2>
        <ol class="list-decimal pl-lg space-y-sm text-sm text-text-secondary">
          <li><strong>下载 APK</strong> 到手机</li>
          <li><strong>点击打开</strong>，按提示允许安装「未知来源」应用</li>
          <li><strong>首次启动</strong>按引导完成设置，即可开始校园偶遇</li>
        </ol>
      </section>
    </main>

    <footer class="border-t border-border py-xl text-center text-xs text-text-muted space-y-sm">
      <p>&copy; 2025 CSUST DateDrop. All rights reserved.</p>
      <div class="flex justify-center gap-md">
        <router-link to="/about" class="hover:text-primary transition">关于我们</router-link>
        <span>|</span>
        <router-link to="/privacy" class="hover:text-primary transition">隐私政策</router-link>
        <span>|</span>
        <router-link to="/terms" class="hover:text-primary transition">用户协议</router-link>
      </div>
    </footer>
  </div>
</template>

<script setup>
// APK 由云服务器 Nginx 静态托管；生产环境通过 VITE_APK_URL 指定完整下载地址。
// 未配置时回退到同域 /apk/（本地 dev 由 Vite public 目录提供）。
const apkUrl = import.meta.env.VITE_APK_URL || '/apk/csustchat-android-arm64.apk'
</script>