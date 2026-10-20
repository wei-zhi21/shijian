<script setup>
import { useResumeFields } from './templateUtils'
const props = defineProps({ resume: { type: Object, required: true } })
const { name, title, educationText } = useResumeFields(props)
</script>

<template>
  <div class="p-8 space-y-5">
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
</template>
