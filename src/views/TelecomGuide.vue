<template>
  <div class="min-h-screen bg-[#f6f6f6]">
    <header class="border-b border-border bg-[#f6f6f6]/90 backdrop-blur">
      <div class="max-w-3xl mx-auto px-md py-md flex items-center justify-between">
        <router-link to="/pairings" class="text-xl font-serif font-semibold text-text-primary hover:text-primary transition">
          CSUST DateDrop
        </router-link>
        <router-link to="/pairings" class="text-sm text-text-secondary hover:text-primary transition">
          返回配对管理
        </router-link>
      </div>
    </header>

    <main class="max-w-3xl mx-auto px-md py-4xl space-y-xl">
      <div class="space-y-md">
        <h1 class="text-2xl md:text-3xl font-serif font-bold">电信5G-A校园套餐 · 长理人专属</h1>
        <img
          src="/telecom/plan-promo.webp"
          alt="电信5G-A校园套餐 29元/月 150G全国流量"
          class="w-full max-w-sm mx-auto object-contain"
        />
        <p class="text-sm text-text-secondary leading-relaxed">
          <strong class="text-text-primary">一句话总结：实付29元/月 = 150G全国流量 + 200分钟通话 + 每月白嫖2个会员</strong>，随时可注销，无任何套路。
        </p>
      </div>

      <section class="space-y-md">
        <h2 class="text-xl font-semibold">两档套餐，怎么选？</h2>
        <div class="overflow-x-auto rounded-lg border border-border">
          <table class="w-full min-w-[420px] text-sm text-center border-collapse">
            <thead>
              <tr class="bg-surface/50">
                <th class="border-b border-border py-sm px-md font-medium">资费项</th>
                <th class="border-b border-border py-sm px-md font-medium">39元/月（实付 <span class="text-primary font-semibold">29元</span>）</th>
                <th class="border-b border-border py-sm px-md font-medium">59元/月</th>
              </tr>
            </thead>
            <tbody class="text-text-secondary">
              <tr>
                <td class="border-b border-border py-sm px-md text-text-primary">全国通用流量</td>
                <td class="border-b border-border py-sm px-md">150G</td>
                <td class="border-b border-border py-sm px-md">150G</td>
              </tr>
              <tr>
                <td class="border-b border-border py-sm px-md text-text-primary">国内语音</td>
                <td class="border-b border-border py-sm px-md">200分钟</td>
                <td class="border-b border-border py-sm px-md">200分钟</td>
              </tr>
              <tr>
                <td class="border-b border-border py-sm px-md text-text-primary">国内短信</td>
                <td class="border-b border-border py-sm px-md">100条</td>
                <td class="border-b border-border py-sm px-md">100条</td>
              </tr>
              <tr>
                <td class="border-b border-border py-sm px-md text-text-primary">会员权益</td>
                <td class="border-b border-border py-sm px-md">每月N选2</td>
                <td class="border-b border-border py-sm px-md">每月N选2</td>
              </tr>
              <tr>
                <td class="border-b border-border py-sm px-md text-text-primary">校园宽带</td>
                <td class="border-b border-border py-sm px-md text-text-muted">❌</td>
                <td class="border-b border-border py-sm px-md">✅ WiFi双终端</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-sm text-text-secondary leading-relaxed">
          💡 <strong class="text-text-primary">39元档校园电信营业厅每月垫付10元，实际只扣29元</strong>，优惠自动到账，不用您操作。
        </p>
        <p class="text-sm text-text-secondary leading-relaxed">
          <strong class="text-text-primary">csustdate用户专属优惠：</strong>只需160元办理校园卡，原价200，卡内含200元话费。云塘、金盆岭两个校区，可上门办理。办理方式：添加微信，备注 <strong class="text-text-primary">csustdate用户</strong>。
        </p>
        <video
          ref="videoEl"
          src="/telecom/plan-video.webm"
          class="w-full max-w-sm rounded-lg border border-border object-contain"
          autoplay
          muted
          loop
          playsinline
          disablepictureinpicture
          disableRemotePlayback
        ></video>
      </section>

      <section class="space-y-md">
        <h2 class="text-xl font-semibold">为什么说它香？</h2>
        <ul class="list-disc pl-lg space-y-sm text-sm text-text-secondary leading-relaxed">
          <li>
            <strong class="text-text-primary">150G是全国通用流量</strong>，不是"仅限某App"的定向套路，随便造。月底室友排队蹭你热点时，你就懂了：流量自由，就是宿舍社交地位。
          </li>
          <li>
            <strong class="text-text-primary">会员N选2，一直有</strong>：B站、爱奇艺、芒果TV、网易云、KFC、奈雪、美团……700+种每月任选。流量月月准时到、会员一直送——这大概是你大学里最稳定的一段关系。
          </li>
          <li>
            <strong class="text-text-primary">在本站匹配到TA之后，最怕的不是没话题，是"对方正在输入…"时流量告急</strong>。脱单靠算法，秒回靠流量：算法我们包了，流量电信包了，剩下的靠你自己。
          </li>
          <li><strong class="text-text-primary">校园网免费上知网查论文</strong>，写论文查文献不用自己掏钱买库。</li>
          <li><strong class="text-text-primary">AI天翼云盘4T</strong>：AI课堂笔记 + 智能搜图，四年的课件和照片随便存。</li>
          <li><strong class="text-text-primary">假期特权</strong>：每年1/2/7/8月每月送10G国内流量；校园网还能找办理人办理假期暂停，不在校不花冤枉钱。</li>
          <li><strong class="text-text-primary">充值白捡</strong>：充100送30，充200送60 或送半年会员。</li>
          <li><strong class="text-text-primary">随时可注销</strong>：没有合约绑架，不合适随时走人，零试错成本。</li>
        </ul>
      </section>

      <section class="space-y-sm">
        <h2 class="text-xl font-semibold">算账时间 🧮</h2>
        <p class="text-sm text-text-secondary leading-relaxed">
          29元 ÷ 30天 ≈ <strong class="text-text-primary">1天不到1块钱</strong>，比一瓶矿泉水还便宜。
        </p>
        <p class="text-sm text-text-secondary leading-relaxed">
          B站大会员单买25/月，爱奇艺30/月——<strong class="text-text-primary">等于流量白送还倒贴</strong>。
        </p>
        <p class="text-sm text-text-secondary leading-relaxed">
          29块确实买不到爱情，但买得到等爱情时刷的每一条消息。
        </p>
      </section>

      <img
        src="/telecom/creature.webp"
        alt="电信5G-A校园套餐吉祥物"
        class="block mx-auto w-44 md:w-56 object-contain"
      />

      <section class="space-y-sm">
        <h2 class="text-xl font-semibold">怎么办？</h2>
        <ol class="list-decimal pl-lg space-y-sm text-sm text-text-secondary leading-relaxed">
          <li><strong class="text-text-primary">确认资格</strong>：湖南省内在读高校学生，14（满）~28（未满）周岁，本人办理，一人一次。</li>
          <li><strong class="text-text-primary">扫码加负责人微信</strong>，或直接打电话：<a href="tel:19067187369" class="text-primary hover:underline font-semibold">19067187369</a>（微信同号）。</li>
          <li><strong class="text-text-primary">选档开卡</strong>，当月开爽；不想用了随时注销。</li>
        </ol>
        <p class="text-sm text-text-secondary leading-relaxed">
          ⏰ 活动有效期至 <strong class="text-text-primary">2026年12月31日</strong>，会员权益每日 12:00 / 18:00 / 21:00 补库存，先到先得。
        </p>
      </section>

      <p class="text-xs text-text-muted leading-relaxed">
        温馨提示：校园特惠流量不可结转/赠送/共享；超出资费流量5元/GB、语音0.15元/分钟、短信0.1元/条；规则如有变更以官方公示为准。
      </p>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const videoEl = ref(null)

// 兜底：确保 webm 像动图一样自动循环播放（个别环境下 autoplay 属性可能不生效）
onMounted(() => {
  const v = videoEl.value
  if (!v) return
  const play = () => v.play().catch(() => {})
  play()
  v.addEventListener('loadeddata', play, { once: true })
})
</script>

<style scoped>
/* 让 webm 像动图一样融入页面，不暴露任何播放器控件 */
video::-webkit-media-controls,
video::-webkit-media-controls-panel,
video::-webkit-media-controls-start-playback-button {
  display: none !important;
  -webkit-appearance: none;
}
</style>
