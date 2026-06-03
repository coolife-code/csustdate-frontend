<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-rose-50/20 to-amber-50/30">
    <header class="border-b border-border bg-white/90 backdrop-blur">
      <div class="max-w-3xl mx-auto px-md py-md">
        <router-link to="/" class="text-xl font-serif font-semibold text-text-primary hover:text-primary transition">CSUST DateDrop</router-link>
      </div>
    </header>

    <main class="max-w-3xl mx-auto px-md py-4xl space-y-xl">
      <h1 class="text-3xl font-serif font-bold">关于我们</h1>

      <section class="rounded-2xl border border-border bg-white p-lg md:p-xl shadow-sm space-y-md">
        <h2 class="text-xl font-semibold">CSUST DateDrop 是什么？</h2>
        <p class="text-sm text-text-secondary leading-relaxed">
          CSUST DateDrop（长理心动）是一个面向长沙理工大学在校学生的校园社交匹配平台。我们致力于用算法帮助同学们在校园里找到志同道合的朋友，让每一次相遇都更有意义。
        </p>
        <p class="text-sm text-text-secondary leading-relaxed">
          "于书香与林荫之间，等一场恰好的心动"——这是我们的初心，也是我们一直在做的事情。
        </p>
      </section>

      <section class="rounded-2xl border border-border bg-white p-lg md:p-xl shadow-sm space-y-md">
        <h2 class="text-xl font-semibold">如何使用？</h2>
        <ol class="list-decimal pl-lg space-y-sm text-sm text-text-secondary">
          <li><strong>注册账号</strong> — 使用你的 @csust.edu.cn 教育邮箱完成注册验证</li>
          <li><strong>填写问卷</strong> — 告诉我们你的喜好和节奏，越认真匹配越准</li>
          <li><strong>等待匹配</strong> — 每周二，你的教育邮箱会收到一封匹配来信</li>
          <li><strong>双向奔赴</strong> — 双方都选择解锁后，即可交换联系方式</li>
        </ol>
      </section>

      <section class="rounded-2xl border border-border bg-white p-lg md:p-xl shadow-sm space-y-md">
        <h2 class="text-xl font-semibold">联系我们</h2>
        <p class="text-sm text-text-secondary leading-relaxed">
          如果你有任何问题、建议或反馈，欢迎通过以下方式联系我们：
        </p>
        <div class="mt-md space-y-sm text-sm">
          <p class="flex items-center gap-sm">
            <span class="font-semibold w-16 shrink-0">电子邮箱</span>
            <a href="mailto:318044943@qq.com" class="text-primary hover:underline">318044943@qq.com</a>
          </p>
        </div>
      </section>

      <section class="rounded-2xl border border-border bg-white p-lg md:p-xl shadow-sm space-y-md">
        <h2 class="text-xl font-semibold">免责声明</h2>
        <p class="text-sm text-text-secondary leading-relaxed">
          本平台仅提供校园内的社交匹配推荐服务。用户在平台外的一切行为（包括但不限于线下见面、交流互动等）均为用户自主行为，本平台不承担任何责任。请用户在交往过程中注意人身安全和财产安全，保持理性判断。
        </p>
      </section>
    </main>

    <footer class="border-t border-border py-xl text-center text-xs text-text-muted space-y-sm">
      <p>&copy; 2025 CSUST DateDrop. All rights reserved.</p>
      <div class="flex justify-center gap-md">
        <router-link to="/privacy" class="hover:text-primary transition">隐私政策</router-link>
        <span>|</span>
        <router-link to="/terms" class="hover:text-primary transition">用户协议</router-link>
      </div>
    </footer>
  </div>
</template>
