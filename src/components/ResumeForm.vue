<script setup>
// 简历信息表单（页面原型：静态展示，尚未绑定数据/功能）
const basicFields = [
  { label: '姓名', ph: '请输入姓名' },
  { label: '联系电话', ph: '请输入手机号' },
  { label: '邮箱', ph: '请输入邮箱' },
  { label: '求职城市', ph: '如：北京' }
]
const intentFields = [
  { label: '目标岗位', ph: '如：前端开发工程师' },
  { label: '期望薪资', ph: '如：15-20K' },
  { label: '到岗时间', ph: '如：一周内' }
]
const skills = ['Vue 3', 'JavaScript / TypeScript', 'TailwindCSS', 'Node.js']
const languages = ['中文（母语）', '英语（CET-6）']
</script>

<template>
  <div class="bg-white rounded-xl border border-slate-200 p-5 space-y-6">
    <h2 class="text-base font-semibold flex items-center gap-2">
      <span class="w-5 h-5 rounded bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center">1</span>
      基本信息
    </h2>
    <div class="grid grid-cols-2 gap-4">
      <div v-for="f in basicFields" :key="f.label">
        <label class="block text-sm text-slate-600 mb-1">{{ f.label }}</label>
        <input class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
          :placeholder="f.ph" />
      </div>
    </div>

    <h2 class="text-base font-semibold flex items-center gap-2">
      <span class="w-5 h-5 rounded bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center">2</span>
      求职意向
    </h2>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="f in intentFields" :key="f.label">
        <label class="block text-sm text-slate-600 mb-1">{{ f.label }}</label>
        <input class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
          :placeholder="f.ph" />
      </div>
    </div>

    <h2 class="text-base font-semibold flex items-center gap-2">
      <span class="w-5 h-5 rounded bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center">3</span>
      教育经历
    </h2>
    <div class="border border-slate-200 rounded-lg p-4 space-y-3">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm text-slate-600 mb-1">学校</label>
          <input class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" placeholder="学校名称" />
        </div>
        <div>
          <label class="block text-sm text-slate-600 mb-1">专业</label>
          <input class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" placeholder="专业名称" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm text-slate-600 mb-1">起止时间</label>
          <input class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" placeholder="2022.09 - 2026.06" />
        </div>
        <div>
          <label class="block text-sm text-slate-600 mb-1">学历</label>
          <input class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" placeholder="本科" />
        </div>
      </div>
      <button class="text-sm text-indigo-600 hover:text-indigo-800">+ 添加教育经历</button>
    </div>

    <h2 class="text-base font-semibold flex items-center gap-2">
      <span class="w-5 h-5 rounded bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center">4</span>
      工作 / 项目经历
    </h2>
    <div class="border border-slate-200 rounded-lg p-4 space-y-3">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm text-slate-600 mb-1">公司 / 项目</label>
          <input class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" placeholder="公司或项目名称" />
        </div>
        <div>
          <label class="block text-sm text-slate-600 mb-1">职位 / 角色</label>
          <input class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" placeholder="职位名称" />
        </div>
      </div>
      <div>
        <label class="block text-sm text-slate-600 mb-1">经历描述（建议用 STAR 法则）</label>
        <textarea rows="3" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none resize-none"
          placeholder="情境 / 任务 / 行动 / 结果"></textarea>
      </div>
      <button class="text-sm text-indigo-600 hover:text-indigo-800">+ 添加经历</button>
    </div>

    <h2 class="text-base font-semibold flex items-center gap-2">
      <span class="w-5 h-5 rounded bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center">5</span>
      专业技能
    </h2>
    <div class="flex flex-wrap gap-2">
      <span v-for="s in skills" :key="s"
        class="px-3 py-1 rounded-full bg-slate-100 text-sm text-slate-700">{{ s }}</span>
      <button class="px-3 py-1 rounded-full border border-dashed border-slate-300 text-sm text-slate-400">+ 添加技能</button>
    </div>

    <h2 class="text-base font-semibold flex items-center gap-2">
      <span class="w-5 h-5 rounded bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center">6</span>
      语言能力
    </h2>
    <div class="flex flex-wrap gap-2">
      <span v-for="l in languages" :key="l"
        class="px-3 py-1 rounded-full bg-slate-100 text-sm text-slate-700">{{ l }}</span>
      <button class="px-3 py-1 rounded-full border border-dashed border-slate-300 text-sm text-slate-400">+ 添加语言</button>
    </div>

    <h2 class="text-base font-semibold flex items-center gap-2">
      <span class="w-5 h-5 rounded bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center">7</span>
      自我评价
    </h2>
    <textarea rows="3" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none resize-none"
      placeholder="简要介绍你的优势与求职意愿（可基于 STAR 法则优化）"></textarea>

    <div class="pt-2">
      <button class="w-full py-2.5 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700"
        title="保存简历（功能开发中）">保存简历</button>
    </div>
  </div>
</template>
