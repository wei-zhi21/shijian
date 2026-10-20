<script setup>
import EditorView from './components/EditorView.vue'
import { downloadMarkdown, downloadPDF } from './export'
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-800">
    <!-- 顶部导航（静态） -->
    <header class="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
            简
          </div>
          <div>
            <div class="font-semibold leading-tight">一键式求职简历生成系统</div>
            <div class="text-xs text-slate-400">Resume Builder</div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 text-xs rounded-md bg-slate-100 text-slate-500">中文</span>
          <button class="px-3 py-1.5 text-sm rounded-lg border border-slate-200 hover:bg-slate-50"
            title="导出为 PDF" @click="downloadPDF">导出 PDF</button>
          <button class="px-3 py-1.5 text-sm rounded-lg border border-slate-200 hover:bg-slate-50"
            title="导出为 Markdown" @click="downloadMarkdown">导出 MD</button>
          <button class="px-4 py-1.5 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            title="一键生成简历（功能开发中）">生成简历</button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-6">
      <EditorView />
    </main>

    <footer class="py-6 text-center text-xs text-slate-400">
      就业指导课程 · 项目一 · 一键式求职简历生成系统（页面原型，功能待开发）
    </footer>
  </div>
</template>
