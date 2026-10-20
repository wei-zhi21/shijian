<script setup>
import { ref } from 'vue'
import TemplateBar from './TemplateBar.vue'
import ResumeForm from './ResumeForm.vue'
import ResumePreview from './ResumePreview.vue'

// 当前选中模板（页面阶段仅用于静态切换预览）
const activeTemplate = ref('modern')
</script>

<template>
  <div class="space-y-5">
    <!-- 模板选择条 -->
    <TemplateBar v-model="activeTemplate" />

    <!-- 评分与优化建议（静态占位，不做功能） -->
    <div class="flex items-center justify-between bg-white rounded-xl border border-slate-200 px-5 py-3">
      <div class="flex items-center gap-4">
        <span class="text-sm text-slate-500">简历评分</span>
        <div class="flex items-center gap-1">
          <span class="text-2xl font-bold text-indigo-600">--</span>
          <span class="text-sm text-slate-400">/ 100</span>
        </div>
        <div class="w-40 h-2 rounded-full bg-slate-100 overflow-hidden">
          <div class="h-full w-0 bg-indigo-500"></div>
        </div>
      </div>
      <span class="text-xs text-slate-400">评分与 STAR 优化建议功能开发中</span>
    </div>

    <!-- 主体：左表单 + 右预览 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <ResumeForm />
      <ResumePreview :active-template="activeTemplate" />
    </div>
  </div>
</template>
