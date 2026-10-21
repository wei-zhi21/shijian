<script setup>
import { ref, computed } from 'vue'
import TemplateBar from './TemplateBar.vue'
import ResumeForm from './ResumeForm.vue'
import ResumePreview from './ResumePreview.vue'
import { resume, save } from '../resume'
import { t } from '../i18n'
import { evaluateResume } from '../scoring'

const activeTemplate = ref('classic')
const savedTip = ref(false)
let tipTimer = null

function onSave() {
  if (save()) {
    savedTip.value = true
    clearTimeout(tipTimer)
    tipTimer = setTimeout(() => (savedTip.value = false), 2000)
  }
}

// 实时评分
const evaluation = computed(() => evaluateResume(resume))
const score = computed(() => evaluation.value.score)
const tips = computed(() => evaluation.value.tips)
const scoreColor = computed(() => {
  if (score.value >= 80) return 'bg-emerald-500'
  if (score.value >= 60) return 'bg-indigo-500'
  return 'bg-amber-500'
})
</script>

<template>
  <div class="space-y-5">
    <TemplateBar v-model="activeTemplate" />

    <!-- 实时评分 -->
    <div class="bg-white rounded-xl border border-slate-200 px-5 py-4">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-4">
          <span class="text-sm text-slate-500">{{ t('scoreLabel') }}</span>
          <div class="flex items-center gap-1">
            <span class="text-2xl font-bold text-indigo-600">{{ score }}</span>
            <span class="text-sm text-slate-400">{{ t('scoreOf') }}</span>
          </div>
        </div>
        <span class="text-xs text-slate-400">{{ t('scoreHint') }}</span>
      </div>
      <div class="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
        <div class="h-full transition-all duration-300" :class="scoreColor"
          :style="{ width: score + '%' }"></div>
      </div>

      <!-- STAR 优化建议 -->
      <div v-if="tips.length" class="mt-3 space-y-1">
        <p v-for="(tip, i) in tips" :key="i"
          class="flex items-start gap-2 text-sm text-slate-600">
          <span class="mt-0.5 w-4 h-4 rounded-full bg-amber-100 text-amber-600 text-xs flex items-center justify-center shrink-0">!</span>
          {{ tip }}
        </p>
      </div>
      <p v-else class="mt-3 text-sm text-emerald-600">✓ {{ t('saved') }} · 简历质量优秀，可继续完善</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <ResumeForm :resume="resume" @save="onSave" />
      <ResumePreview :resume="resume" :active-template="activeTemplate" />
    </div>

    <div v-if="savedTip"
      class="fixed bottom-6 right-6 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm shadow-lg">
      {{ t('saved') }}
    </div>
  </div>
</template>
