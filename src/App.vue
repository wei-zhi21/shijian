<script setup>
import EditorView from './components/EditorView.vue'
import { downloadMarkdown, downloadPDF } from './export'
import { t, toggleLang, lang } from './i18n'
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-800">
    <!-- 顶部导航 -->
    <header class="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
            简
          </div>
          <div>
            <div class="font-semibold leading-tight">{{ t('appTitle') }}</div>
            <div class="text-xs text-slate-400">{{ t('appSubtitle') }}</div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button @click="toggleLang"
            class="px-2.5 py-1 text-xs rounded-md bg-slate-100 text-slate-500 hover:bg-slate-200">
            {{ lang === 'zh' ? '中文' : 'EN' }}
          </button>
          <button class="px-3 py-1.5 text-sm rounded-lg border border-slate-200 hover:bg-slate-50"
            title="Export PDF" @click="downloadPDF">{{ t('exportPdf') }}</button>
          <button class="px-3 py-1.5 text-sm rounded-lg border border-slate-200 hover:bg-slate-50"
            title="Export Markdown" @click="downloadMarkdown">{{ t('exportMd') }}</button>
          <button class="px-4 py-1.5 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
            {{ t('generate') }}
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-6">
      <EditorView />
    </main>

    <footer class="py-6 text-center text-xs text-slate-400">
      {{ t('footer') }}
    </footer>
  </div>
</template>
