<script setup>
import { t } from '../i18n'
defineProps({
  modelValue: { type: String, default: 'classic' }
})
defineEmits(['update:modelValue'])

const templates = [
  { id: 'classic', name: 'tClassic', rec: 'rec1', accent: 'bg-blue-900', bar: '#1e40af' },
  { id: 'modern', name: 'tModern', rec: 'rec2', accent: 'bg-slate-700', bar: '#312e81' },
  { id: 'creative', name: 'tCreative', rec: 'rec3', accent: 'bg-orange-600', bar: '#b45309' },
  { id: 'data', name: 'tData', rec: 'rec4', accent: 'bg-teal-600', bar: '#0f766e' }
]
</script>

<template>
  <div class="bg-white rounded-xl border border-slate-200 p-4">
    <div class="text-sm font-medium mb-3 flex items-center gap-2">
      <span class="text-slate-600">{{ t('templateTitle') }}</span>
      <span class="text-xs text-slate-400">{{ t('templateHint') }}</span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button
        v-for="tp in templates"
        :key="tp.id"
        class="rounded-lg border p-4 text-left transition hover:shadow-md relative overflow-hidden"
        :class="modelValue === tp.id ? 'border-indigo-500 ring-2 ring-indigo-100' : 'border-slate-200 hover:border-indigo-300'"
        @click="$emit('update:modelValue', tp.id)"
      >
        <!-- 顶部色条 -->
        <div class="absolute top-0 left-0 right-0 h-1.5" :style="{ background: tp.bar }"></div>

        <div class="flex items-center gap-2 mt-1 mb-1.5">
          <span class="w-8 h-8 rounded-md flex items-center justify-center text-white text-sm font-semibold shrink-0"
            :class="tp.accent">{{ t(tp.name).slice(0, 1) }}</span>
          <span class="text-base font-semibold text-slate-800">{{ t(tp.name) }}</span>
          <span class="ml-auto px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[11px] font-medium shrink-0">{{ t('recTag') }}</span>
          <span v-if="modelValue === tp.id"
            class="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs shrink-0">✓</span>
        </div>

        <div class="text-xs leading-relaxed text-slate-500">{{ t(tp.rec) }}</div>
      </button>
    </div>
  </div>
</template>
