<script setup>
import { t } from '../i18n'
defineProps({
  modelValue: { type: String, default: 'classic' }
})
defineEmits(['update:modelValue'])

const templates = [
  { id: 'classic', name: 'tClassic', desc: 'dClassic', accent: 'bg-blue-900' },
  { id: 'modern', name: 'tModern', desc: 'dModern', accent: 'bg-slate-700' },
  { id: 'creative', name: 'tCreative', desc: 'dCreative', accent: 'bg-orange-600' },
  { id: 'data', name: 'tData', desc: 'dData', accent: 'bg-teal-600' }
]
</script>

<template>
  <div class="bg-white rounded-xl border border-slate-200 p-4">
    <div class="text-sm font-medium mb-3 flex items-center gap-2">
      <span class="text-slate-600">{{ t('templateTitle') }}</span>
      <span class="text-xs text-slate-400">{{ t('templateHint') }}</span>
    </div>

    <div class="grid grid-cols-4 gap-3">
      <button
        v-for="tp in templates"
        :key="tp.id"
        class="rounded-lg border p-3 text-left transition hover:border-indigo-300 hover:shadow-sm relative overflow-hidden"
        :class="modelValue === tp.id ? 'border-indigo-500 ring-2 ring-indigo-100' : 'border-slate-200'"
        @click="$emit('update:modelValue', tp.id)"
      >
        <div class="flex items-center gap-2 mb-2">
          <span class="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-semibold"
            :class="tp.accent">{{ t(tp.name).slice(0, 1) }}</span>
          <span class="text-sm font-medium">{{ t(tp.name) }}</span>
        </div>
        <div class="text-xs text-slate-400">{{ t(tp.desc) }}</div>
        <span v-if="modelValue === tp.id"
          class="absolute top-2 right-2 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">✓</span>
      </button>
    </div>
  </div>
</template>
