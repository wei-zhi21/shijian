<script setup>
import { computed } from 'vue'

const props = defineProps({
  resume: { type: Object, required: true },
  activeTemplate: { type: String, default: 'modern' }
})

const is = computed(() => ({
  modern: props.activeTemplate === 'modern',
  classic: props.activeTemplate === 'classic',
  creative: props.activeTemplate === 'creative'
}))

const name = computed(() => props.resume.basic.name || '未填写')
const title = computed(() => props.resume.intent.position || '求职意向未填写')
const avatar = computed(() => (props.resume.basic.name || '未').slice(0, 1))
const educationText = computed(() => {
  return props.resume.education
    .map((e) => [e.school, e.major, e.degree].filter(Boolean).join(' · ') + (e.period ? ' ' + e.period : ''))
    .filter(Boolean)
    .join('；') || '教育经历未填写'
})
</script>

<template>
  <div class="bg-white rounded-xl border border-slate-200 p-4">
    <div class="flex items-center justify-between mb-3">
      <span class="text-sm font-medium text-slate-600">实时预览</span>
      <span class="text-xs text-slate-400">编辑左侧表单将实时同步</span>
    </div>

    <div class="paper-card bg-white rounded-lg overflow-hidden" style="min-height: 620px">

      <!-- ===== 模板一：现代简约 ===== -->
      <div v-if="is.modern" class="flex h-full">
        <div class="w-44 bg-indigo-700 text-white p-6 space-y-5">
          <div>
            <div class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold mb-4">
              {{ avatar }}
            </div>
            <h2 class="text-xl font-bold mb-1">{{ name }}</h2>
            <p class="text-sm text-indigo-200">{{ title }}</p>
          </div>
          <div class="text-xs space-y-1 text-indigo-100">
            <p v-if="resume.basic.phone">{{ resume.basic.phone }}</p>
            <p v-if="resume.basic.email" class="break-all">{{ resume.basic.email }}</p>
            <p v-if="resume.basic.city">{{ resume.basic.city }}</p>
          </div>
          <div>
            <p class="text-xs font-semibold text-indigo-200 mb-2">语言</p>
            <p v-for="(l, i) in resume.languages" :key="i" class="text-xs text-indigo-100 mb-1">{{ l }}</p>
            <p v-if="!resume.languages.length" class="text-xs text-indigo-200/60">未填写</p>
          </div>
        </div>
        <div class="flex-1 p-6 space-y-5">
          <section>
            <h3 class="text-sm font-bold border-b border-slate-200 pb-1 mb-2 text-slate-700">教育背景</h3>
            <p class="text-sm text-slate-600">{{ educationText }}</p>
          </section>
          <section>
            <h3 class="text-sm font-bold border-b border-slate-200 pb-1 mb-2 text-slate-700">工作 / 项目经历</h3>
            <template v-if="resume.experiences.length">
              <div v-for="(e, i) in resume.experiences" :key="i" class="mb-3">
                <div class="flex justify-between text-sm">
                  <span class="font-semibold text-slate-700">{{ e.org || '经历名称' }}</span>
                  <span class="text-xs text-slate-400">{{ e.time }}</span>
                </div>
                <p class="text-xs text-indigo-600 mb-1">{{ e.role }}</p>
                <p class="text-xs text-slate-500 leading-relaxed whitespace-pre-line">{{ e.desc }}</p>
              </div>
            </template>
            <p v-else class="text-xs text-slate-400">未填写</p>
          </section>
          <section>
            <h3 class="text-sm font-bold border-b border-slate-200 pb-1 mb-2 text-slate-700">专业技能</h3>
            <div v-if="resume.skills.length" class="flex flex-wrap gap-1.5">
              <span v-for="(s, i) in resume.skills" :key="i"
                class="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded">{{ s }}</span>
            </div>
            <p v-else class="text-xs text-slate-400">未填写</p>
          </section>
          <section>
            <h3 class="text-sm font-bold border-b border-slate-200 pb-1 mb-2 text-slate-700">自我评价</h3>
            <p class="text-xs text-slate-500 leading-relaxed whitespace-pre-line">{{ resume.summary || '未填写' }}</p>
          </section>
        </div>
      </div>

      <!-- ===== 模板二：经典蓝调 ===== -->
      <div v-else-if="is.classic" class="p-8 space-y-5">
        <div class="text-center border-b-2 border-blue-700 pb-4">
          <h2 class="text-2xl font-bold text-blue-900">{{ name }}</h2>
          <p class="text-sm text-blue-700 mt-1">{{ title }} · {{ resume.basic.city }}</p>
          <p class="text-xs text-slate-400 mt-1">{{ resume.basic.phone }} | {{ resume.basic.email }}</p>
        </div>
        <section>
          <h3 class="text-sm font-bold text-blue-800 border-l-4 border-blue-700 pl-2 mb-2">教育背景</h3>
          <p class="text-sm text-slate-600">{{ educationText }}</p>
        </section>
        <section>
          <h3 class="text-sm font-bold text-blue-800 border-l-4 border-blue-700 pl-2 mb-2">工作 / 项目经历</h3>
          <template v-if="resume.experiences.length">
            <div v-for="(e, i) in resume.experiences" :key="i" class="mb-3">
              <div class="flex justify-between">
                <span class="text-sm font-semibold text-slate-700">{{ e.org || '经历名称' }} · {{ e.role }}</span>
                <span class="text-xs text-slate-400">{{ e.time }}</span>
              </div>
              <p class="text-xs text-slate-500 mt-1 leading-relaxed whitespace-pre-line">{{ e.desc }}</p>
            </div>
          </template>
          <p v-else class="text-xs text-slate-400">未填写</p>
        </section>
        <section>
          <h3 class="text-sm font-bold text-blue-800 border-l-4 border-blue-700 pl-2 mb-2">专业技能</h3>
          <div v-if="resume.skills.length" class="flex flex-wrap gap-1.5">
            <span v-for="(s, i) in resume.skills" :key="i"
              class="px-2.5 py-0.5 bg-blue-50 text-blue-800 text-xs rounded">{{ s }}</span>
          </div>
          <p v-else class="text-xs text-slate-400">未填写</p>
        </section>
        <section>
          <h3 class="text-sm font-bold text-blue-800 border-l-4 border-blue-700 pl-2 mb-2">自我评价</h3>
          <p class="text-xs text-slate-500 leading-relaxed whitespace-pre-line">{{ resume.summary || '未填写' }}</p>
        </section>
      </div>

      <!-- ===== 模板三：创意左栏 ===== -->
      <div v-else-if="is.creative" class="flex h-full">
        <div class="w-40 bg-emerald-900 text-emerald-50 p-5">
          <h2 class="text-xl font-bold mb-1">{{ name }}</h2>
          <p class="text-sm text-emerald-200 mb-4">{{ title }}</p>
          <div class="space-y-1 text-xs mb-5">
            <p v-if="resume.basic.phone">{{ resume.basic.phone }}</p>
            <p v-if="resume.basic.email" class="break-all">{{ resume.basic.email }}</p>
            <p v-if="resume.basic.city">{{ resume.basic.city }}</p>
          </div>
          <p class="text-xs font-semibold text-emerald-300 mb-2">语言能力</p>
          <div v-if="resume.languages.length" class="space-y-1">
            <p v-for="(l, i) in resume.languages" :key="i" class="text-xs">{{ l }}</p>
          </div>
          <p v-else class="text-xs text-emerald-200/60">未填写</p>
        </div>
        <div class="flex-1 p-6 space-y-5">
          <section>
            <h3 class="text-sm font-bold text-emerald-700 mb-2">✦ 教育背景</h3>
            <p class="text-sm text-slate-600">{{ educationText }}</p>
          </section>
          <section>
            <h3 class="text-sm font-bold text-emerald-700 mb-2">✦ 经历</h3>
            <template v-if="resume.experiences.length">
              <div v-for="(e, i) in resume.experiences" :key="i" class="mb-3 border-b border-dashed border-slate-200 pb-2">
                <div class="flex justify-between">
                  <span class="text-sm font-semibold text-slate-700">{{ e.org || '经历名称' }}</span>
                  <span class="text-xs text-slate-400">{{ e.time }}</span>
                </div>
                <p class="text-xs text-emerald-600 mb-1">{{ e.role }}</p>
                <p class="text-xs text-slate-500 leading-relaxed whitespace-pre-line">{{ e.desc }}</p>
              </div>
            </template>
            <p v-else class="text-xs text-slate-400">未填写</p>
          </section>
          <section>
            <h3 class="text-sm font-bold text-emerald-700 mb-2">✦ 技能</h3>
            <div v-if="resume.skills.length" class="flex flex-wrap gap-1.5">
              <span v-for="(s, i) in resume.skills" :key="i"
                class="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs rounded-full">{{ s }}</span>
            </div>
            <p v-else class="text-xs text-slate-400">未填写</p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
