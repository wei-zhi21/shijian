<script setup>
import { useResumeFields } from './templateUtils'
const props = defineProps({ resume: { type: Object, required: true } })
const { name, title, educationText } = useResumeFields(props)
</script>

<template>
  <div class="flex h-full">
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
</template>
