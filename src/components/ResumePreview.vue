<script setup>
import { computed } from 'vue'

const props = defineProps({
  activeTemplate: { type: String, default: 'modern' }
})

// 静态示例简历数据（页面阶段展示用）
const sample = {
  name: '张三',
  title: '前端开发工程师',
  phone: '138-0000-0000',
  email: 'zhangsan@example.com',
  city: '北京',
  education: 'XX大学 · 软件工程 · 本科 2022-2026',
  summary: '3 年前端开发经验，熟练使用 Vue 3、TypeScript，注重代码质量与用户体验，具备良好的团队协作与沟通能力。',
  experiences: [
    { org: 'XX 科技公司', role: '前端开发工程师', time: '2024.07 - 至今', desc: '负责核心业务前端开发，使用 Vue 3 + TypeScript 构建后台管理系统，优化页面性能。' },
    { org: '校园项目 · 简历生成系统', role: '项目负责人', time: '2023.09 - 2024.06', desc: '独立完成前端架构与多模板简历渲染，实现模板切换与实时预览。' }
  ],
  skills: ['Vue 3', 'TypeScript', 'TailwindCSS', 'Node.js', 'Git'],
  languages: ['中文（母语）', '英语（CET-6）']
}

const is = computed(() => ({
  modern: props.activeTemplate === 'modern',
  classic: props.activeTemplate === 'classic',
  creative: props.activeTemplate === 'creative'
}))
</script>

<template>
  <div class="bg-white rounded-xl border border-slate-200 p-4">
    <div class="flex items-center justify-between mb-3">
      <span class="text-sm font-medium text-slate-600">实时预览</span>
      <span class="text-xs text-slate-400">示例数据 · 页面原型</span>
    </div>

    <div class="paper-card bg-white rounded-lg overflow-hidden"
      style="min-height: 620px">

      <!-- ===== 模板一：现代简约 ===== -->
      <div v-if="is.modern" class="flex h-full">
        <div class="w-44 bg-indigo-700 text-white p-6 space-y-5">
          <div>
            <div class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold mb-4">
              {{ sample.name.slice(0, 1) }}
            </div>
            <h2 class="text-xl font-bold mb-1">{{ sample.name }}</h2>
            <p class="text-sm text-indigo-200">{{ sample.title }}</p>
          </div>
          <div class="text-xs space-y-1 text-indigo-100">
            <p>{{ sample.phone }}</p>
            <p>{{ sample.email }}</p>
            <p>{{ sample.city }}</p>
          </div>
          <div>
            <p class="text-xs font-semibold text-indigo-200 mb-2">语言</p>
            <p v-for="l in sample.languages" :key="l" class="text-xs text-indigo-100 mb-1">{{ l }}</p>
          </div>
        </div>
        <div class="flex-1 p-6 space-y-5">
          <section>
            <h3 class="text-sm font-bold border-b border-slate-200 pb-1 mb-2 text-slate-700">教育背景</h3>
            <p class="text-sm text-slate-600">{{ sample.education }}</p>
          </section>
          <section>
            <h3 class="text-sm font-bold border-b border-slate-200 pb-1 mb-2 text-slate-700">工作 / 项目经历</h3>
            <div v-for="e in sample.experiences" :key="e.org" class="mb-3">
              <div class="flex justify-between text-sm">
                <span class="font-semibold text-slate-700">{{ e.org }}</span>
                <span class="text-xs text-slate-400">{{ e.time }}</span>
              </div>
              <p class="text-xs text-indigo-600 mb-1">{{ e.role }}</p>
              <p class="text-xs text-slate-500 leading-relaxed">{{ e.desc }}</p>
            </div>
          </section>
          <section>
            <h3 class="text-sm font-bold border-b border-slate-200 pb-1 mb-2 text-slate-700">专业技能</h3>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="s in sample.skills" :key="s" class="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded">{{ s }}</span>
            </div>
          </section>
          <section>
            <h3 class="text-sm font-bold border-b border-slate-200 pb-1 mb-2 text-slate-700">自我评价</h3>
            <p class="text-xs text-slate-500 leading-relaxed">{{ sample.summary }}</p>
          </section>
        </div>
      </div>

      <!-- ===== 模板二：经典蓝调 ===== -->
      <div v-else-if="is.classic" class="p-8 space-y-5">
        <div class="text-center border-b-2 border-blue-700 pb-4">
          <h2 class="text-2xl font-bold text-blue-900">{{ sample.name }}</h2>
          <p class="text-sm text-blue-700 mt-1">{{ sample.title }} · {{ sample.city }}</p>
          <p class="text-xs text-slate-400 mt-1">{{ sample.phone }} | {{ sample.email }}</p>
        </div>
        <section>
          <h3 class="text-sm font-bold text-blue-800 border-l-4 border-blue-700 pl-2 mb-2">教育背景</h3>
          <p class="text-sm text-slate-600">{{ sample.education }}</p>
        </section>
        <section>
          <h3 class="text-sm font-bold text-blue-800 border-l-4 border-blue-700 pl-2 mb-2">工作 / 项目经历</h3>
          <div v-for="e in sample.experiences" :key="e.org" class="mb-3">
            <div class="flex justify-between">
              <span class="text-sm font-semibold text-slate-700">{{ e.org }} · {{ e.role }}</span>
              <span class="text-xs text-slate-400">{{ e.time }}</span>
            </div>
            <p class="text-xs text-slate-500 mt-1 leading-relaxed">{{ e.desc }}</p>
          </div>
        </section>
        <section>
          <h3 class="text-sm font-bold text-blue-800 border-l-4 border-blue-700 pl-2 mb-2">专业技能</h3>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="s in sample.skills" :key="s" class="px-2.5 py-0.5 bg-blue-50 text-blue-800 text-xs rounded">{{ s }}</span>
          </div>
        </section>
        <section>
          <h3 class="text-sm font-bold text-blue-800 border-l-4 border-blue-700 pl-2 mb-2">自我评价</h3>
          <p class="text-xs text-slate-500 leading-relaxed">{{ sample.summary }}</p>
        </section>
      </div>

      <!-- ===== 模板三：创意左栏 ===== -->
      <div v-else-if="is.creative" class="flex h-full">
        <div class="w-40 bg-emerald-900 text-emerald-50 p-5">
          <h2 class="text-xl font-bold mb-1">{{ sample.name }}</h2>
          <p class="text-sm text-emerald-200 mb-4">{{ sample.title }}</p>
          <div class="space-y-1 text-xs mb-5">
            <p>{{ sample.phone }}</p>
            <p class="break-all">{{ sample.email }}</p>
            <p>{{ sample.city }}</p>
          </div>
          <p class="text-xs font-semibold text-emerald-300 mb-2">语言能力</p>
          <div class="space-y-1">
            <p v-for="l in sample.languages" :key="l" class="text-xs">{{ l }}</p>
          </div>
        </div>
        <div class="flex-1 p-6 space-y-5">
          <section>
            <h3 class="text-sm font-bold text-emerald-700 mb-2">✦ 教育背景</h3>
            <p class="text-sm text-slate-600">{{ sample.education }}</p>
          </section>
          <section>
            <h3 class="text-sm font-bold text-emerald-700 mb-2">✦ 经历</h3>
            <div v-for="e in sample.experiences" :key="e.org" class="mb-3 border-b border-dashed border-slate-200 pb-2">
              <div class="flex justify-between">
                <span class="text-sm font-semibold text-slate-700">{{ e.org }}</span>
                <span class="text-xs text-slate-400">{{ e.time }}</span>
              </div>
              <p class="text-xs text-emerald-600 mb-1">{{ e.role }}</p>
              <p class="text-xs text-slate-500 leading-relaxed">{{ e.desc }}</p>
            </div>
          </section>
          <section>
            <h3 class="text-sm font-bold text-emerald-700 mb-2">✦ 技能</h3>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="s in sample.skills" :key="s" class="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs rounded-full">{{ s }}</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
