<template>
  <div class="min-h-screen bg-gradient-to-b from-white via-rose-50/20 to-amber-50/30">
    <header class="border-b border-border bg-white/90 backdrop-blur">
      <div class="max-w-3xl mx-auto px-md py-md">
        <router-link to="/" class="text-xl font-serif font-semibold text-text-primary hover:text-primary transition">CSUST DateDrop</router-link>
      </div>
    </header>

    <main class="max-w-3xl mx-auto px-md py-4xl space-y-xl">
      <h1 class="text-3xl font-serif font-bold">用户协议</h1>
      <p class="text-sm text-text-muted">最后更新日期：2026年1月1日</p>

      <section class="rounded-2xl bg-amber-50 border border-amber-200 p-lg">
        <p class="text-sm text-amber-800 leading-relaxed">
          <strong>重要提示：</strong>在使用 CSUST DateDrop 平台服务前，请务必仔细阅读并充分理解本协议的全部内容。点击"同意"或使用本平台服务即视为您已阅读、理解并同意接受本协议的全部条款。
        </p>
      </section>

      <section class="space-y-md">
        <h2 class="text-xl font-semibold">一、协议范围</h2>
        <p class="text-sm text-text-secondary leading-relaxed">
          本协议是您与 CSUST DateDrop 平台运营方之间关于使用本平台服务所订立的协议。本协议内容包括协议正文及所有我们已经发布或将来可能发布的各类规则、公告、说明等。
        </p>
      </section>

      <section class="space-y-md">
        <h2 class="text-xl font-semibold">二、账号注册与使用</h2>
        <div class="space-y-lg pl-md border-l-2 border-primary/30">
          <div>
            <h3 class="font-semibold mb-sm">2.1 注册资格</h3>
            <p class="text-sm text-text-secondary leading-relaxed">
              您应具有完全民事行为能力，且为长沙理工大学在校学生或教职工。注册时必须使用有效的 @csust.edu.cn 教育邮箱进行验证。
            </p>
          </div>
          <div>
            <h3 class="font-semibold mb-sm">2.2 账号安全</h3>
            <p class="text-sm text-text-secondary leading-relaxed">
              您有责任妥善保管账号和密码，并对以其账号进行的所有活动和事件承担法律责任。如发现账号被他人非法使用，应立即通知我们。
            </p>
          </div>
          <div>
            <h3 class="font-semibold mb-sm">2.3 真实信息</h3>
            <p class="text-sm text-text-secondary leading-relaxed">
              您承诺所提供的信息真实、准确、完整。如信息发生变更，应及时更新。因信息不实导致的后果由您自行承担。
            </p>
          </div>
        </div>
      </section>

      <section class="space-y-md">
        <h2 class="text-xl font-semibold">三、服务内容</h2>
        <p class="text-sm text-text-secondary leading-relaxed">
          本平台为长沙理工大学学生提供一个校园社交匹配服务，主要功能包括：
        </p>
        <ul class="list-disc pl-lg space-y-sm text-sm text-text-secondary">
          <li>基于问卷偏好的智能匹配推荐</li>
          <li>每周定时推送匹配结果至教育邮箱</li>
          <li>双向确认机制下的联系方式交换</li>
          <li>个人资料管理与配对历史查询</li>
        </ul>
        <p class="text-sm text-text-secondary leading-relaxed mt-md">
          我们保留随时修改、中断或终止服务的权利，且无需事先通知用户。
        </p>
      </section>

      <section class="space-y-md">
        <h2 class="text-xl font-semibold">四、用户行为规范</h2>
        <p class="text-sm text-text-secondary leading-relaxed">您在使用本平台服务时，承诺不从事以下行为：</p>
        <ul class="list-disc pl-lg space-y-sm text-sm text-text-secondary">
          <li>利用本平台从事违法违规活动</li>
          <li>发布虚假、误导性或不良信息</li>
          <li>骚扰、威胁、侮辱其他用户</li>
          <li>冒充他人或盗用他人账号</li>
          <li>干扰、破坏本平台的正常运行</li>
          <li>将本平台用于商业用途或未经授权的推广</li>
          <li>传播涉及政治敏感、色情、暴力等内容</li>
        </ul>
      </section>

      <section class="space-y-md">
        <h2 class="text-xl font-semibold">五、知识产权</h2>
        <p class="text-sm text-text-secondary leading-relaxed">
          本平台的所有内容，包括但不限于文字、图片、音频、视频、软件、程序、版面设计等，均受著作权法、商标法、专利法及其他知识产权法律的保护。未经书面许可，任何人不得擅自使用。
        </p>
      </section>

      <section class="space-y-md">
        <h2 class="text-xl font-semibold">六、免责声明</h2>
        <ul class="list-disc pl-lg space-y-sm text-sm text-text-secondary">
          <li>本平台仅提供匹配推荐服务，不对用户之间的线下交往行为承担责任</li>
          <li>用户应自行判断交往风险，提高自我保护意识</li>
          <li>因不可抗力导致的服务中断，我们不承担相关责任</li>
          <li>用户违反本协议造成的损失由用户自行承担</li>
        </ul>
      </section>

      <section class="space-y-md">
        <h2 class="text-xl font-semibold">七、隐私保护</h2>
        <p class="text-sm text-text-secondary leading-relaxed">
          我们重视您的隐私保护。关于我们如何收集、使用和保护您的个人信息，请参阅我们的
          <router-link to="/privacy" class="text-primary hover:underline">《隐私政策》</router-link>。
        </p>
      </section>

      <section class="space-y-md">
        <h2 class="text-xl font-semibold">八、协议变更与终止</h2>
        <p class="text-sm text-text-secondary leading-relaxed">
          我们有权根据需要不时修改本协议内容。修改后的协议将在平台上公布。如您不同意修改后的协议，可以停止使用本平台服务。继续使用即视为接受修改后的协议。
        </p>
        <p class="text-sm text-text-secondary leading-relaxed mt-sm">
          如您需要注销账号，可通过页面内联系渠道向我们提出申请。
        </p>
      </section>

      <section class="space-y-md">
        <h2 class="text-xl font-semibold">九、争议解决</h2>
        <p class="text-sm text-text-secondary leading-relaxed">
          因本协议引起的或与本协议有关的任何争议，双方应友好协商解决；协商不成的，任何一方均有权向平台运营方所在地有管辖权的人民法院提起诉讼。
        </p>
      </section>

      <section class="space-y-md">
        <h2 class="text-xl font-semibold">十、联系我们</h2>
        <p class="text-sm text-text-secondary leading-relaxed">
          如果您对本协议有任何疑问，请通过以下方式联系我们：
        </p>
        <p class="text-sm text-text-secondary leading-relaxed">
          邮箱：<a href="mailto:318044943@qq.com" class="text-primary hover:underline">318044943@qq.com</a>
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
