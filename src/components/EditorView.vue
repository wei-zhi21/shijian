<script setup>
import { ref } from 'vue'
import TemplateBar from './TemplateBar.vue'
import ResumeForm from './ResumeForm.vue'
import ResumePreview from './ResumePreview.vue'
import { resume, save } from '../resume'
import { t } from '../i18n'

const activeTemplate = ref('modern')
const savedTip = ref(false)
let tipTimer = null

function onSave() {
  if (save()) {
    savedTip.value = true
    clearTimeout(tipTimer)
    tipTimer = setTimeout(() => (savedTip.value = false), 2000)
  }
}
</script>

<template>
  <div class="space-y-5">
    <TemplateBar v-model="activeTemplate" />

    <!-- 评分与优化建议 -->
    <div class="flex items-center justify-between bg-white rounded-xl border border-slate-200 px-5 py-3">
      <div class="flex items-center gap-4">
        <span class="text-sm text-slate-500">{{ t('scoreLabel') }}</span>
        <div class="flex items-center gap-1">
          <span class="text-2xl font-bold text-indigo-600">--</span>
          <span class="text-sm text-slate-400">{{ t('scoreOf') }}</span>
        </div>
        <div class="w-40 h-2 rounded-full bg-slate-100 overflow-hidden">
          <div class="h-full w-0 bg-indigo-500"></div>
        </div>
      </div>
      <span class="text-xs text-slate-400">{{ t('scoreHint') }}</span>
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
