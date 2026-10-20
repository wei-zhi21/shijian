<script setup>
defineProps({
  modelValue: { type: String, default: 'modern' }
})
defineEmits(['update:modelValue'])

const templates = [
  { id: 'modern', name: '现代简约', desc: '清晰 · 商务', accent: 'bg-indigo-500' },
  { id: 'classic', name: '经典蓝调', desc: '稳重 · 规范', accent: 'bg-blue-600' },
  { id: 'creative', name: '创意左栏', desc: '个性 · 醒目', accent: 'bg-emerald-600' }
]
</script>

<template>
  <div class="bg-white rounded-xl border border-slate-200 p-4">
    <div class="text-sm font-medium mb-3 flex items-center gap-2">
      <span class="text-slate-600">简历模板</span>
      <span class="text-xs text-slate-400">至少 3 套 · 点击切换</span>
    </div>

    <div class="grid grid-cols-3 gap-3">
      <button
        v-for="t in templates"
        :key="t.id"
        class="group rounded-lg border p-3 text-left transition
               hover:border-indigo-300 hover:shadow-sm
               relative overflow-hidden"
        :class="modelValue === t.id ? 'border-indigo-500 ring-2 ring-indigo-100' : 'border-slate-200'"
        @click="$emit('update:modelValue', t.id)"
      >
        <div class="flex items-center gap-2 mb-2">
          <span class="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-semibold"
            :class="t.accent">{{ t.name.slice(0, 1) }}</span>
          <span class="text-sm font-medium">{{ t.name }}</span>
        </div>
        <div class="text-xs text-slate-400">{{ t.desc }}</div>
        <!-- 选中标记 -->
        <span v-if="modelValue === t.id"
          class="absolute top-2 right-2 w-5 h-5 rounded-full bg-indigo-600 text-white
                 flex items-center justify-center text-xs">✓</span>
      </button>
    </div>
  </div>
</template>
