<script setup>
import TemplateModern from '../templates/TemplateModern.vue'
import TemplateClassic from '../templates/TemplateClassic.vue'
import TemplateCreative from '../templates/TemplateCreative.vue'
import { t } from '../i18n'

defineProps({
  resume: { type: Object, required: true },
  activeTemplate: { type: String, default: 'modern' }
})
</script>

<template>
  <div class="bg-white rounded-xl border border-slate-200 p-4">
    <div class="flex items-center justify-between mb-3">
      <span class="text-sm font-medium text-slate-600">{{ t('previewTitle') }}</span>
      <span class="text-xs text-slate-400">{{ t('previewHint') }}</span>
    </div>

    <div id="resume-pdf" class="paper-card bg-white rounded-lg overflow-hidden" style="min-height: 620px">
      <template v-if="activeTemplate === 'modern'">
        <TemplateModern :resume="resume" />
      </template>
      <template v-else-if="activeTemplate === 'classic'">
        <TemplateClassic :resume="resume" />
      </template>
      <template v-else-if="activeTemplate === 'creative'">
        <TemplateCreative :resume="resume" />
      </template>
    </div>
  </div>
</template>
