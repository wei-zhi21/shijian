<script setup>
import { useResumeFields } from './templateUtils'
import { t } from '../i18n'
const props = defineProps({ resume: { type: Object, required: true } })
const { name, title, avatar, educationText } = useResumeFields(props)
</script>

<template>
  <div class="flex h-full">
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
        <p class="text-xs font-semibold text-indigo-200 mb-2">{{ t('secLanguages') }}</p>
        <p v-for="(l, i) in resume.languages" :key="i" class="text-xs text-indigo-100 mb-1">{{ l }}</p>
        <p v-if="!resume.languages.length" class="text-xs text-indigo-200/60">{{ t('notFilled') }}</p>
      </div>
    </div>
    <div class="flex-1 p-6 space-y-5">
      <section>
        <h3 class="text-sm font-bold border-b border-slate-200 pb-1 mb-2 text-slate-700">{{ t('secEducation') }}</h3>
        <p class="text-sm text-slate-600">{{ educationText }}</p>
      </section>
      <section>
        <h3 class="text-sm font-bold border-b border-slate-200 pb-1 mb-2 text-slate-700">{{ t('secExperience') }}</h3>
        <template v-if="resume.experiences.length">
          <div v-for="(e, i) in resume.experiences" :key="i" class="mb-3">
            <div class="flex justify-between text-sm">
              <span class="font-semibold text-slate-700">{{ e.org || t('expName') }}</span>
              <span class="text-xs text-slate-400">{{ e.time }}</span>
            </div>
            <p class="text-xs text-indigo-600 mb-1">{{ e.role }}</p>
            <p class="text-xs text-slate-500 leading-relaxed whitespace-pre-line">{{ e.desc }}</p>
          </div>
        </template>
        <p v-else class="text-xs text-slate-400">{{ t('notFilled') }}</p>
      </section>
      <section>
        <h3 class="text-sm font-bold border-b border-slate-200 pb-1 mb-2 text-slate-700">{{ t('secSkills') }}</h3>
        <div v-if="resume.skills.length" class="flex flex-wrap gap-1.5">
          <span v-for="(s, i) in resume.skills" :key="i"
            class="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded">{{ s }}</span>
        </div>
        <p v-else class="text-xs text-slate-400">{{ t('notFilled') }}</p>
      </section>
      <section>
        <h3 class="text-sm font-bold border-b border-slate-200 pb-1 mb-2 text-slate-700">{{ t('secSummary') }}</h3>
        <p class="text-xs text-slate-500 leading-relaxed whitespace-pre-line">{{ resume.summary || t('notFilled') }}</p>
      </section>
    </div>
  </div>
</template>
