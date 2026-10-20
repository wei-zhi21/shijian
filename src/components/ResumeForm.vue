<script setup>
import { ref } from 'vue'

defineProps({
  resume: { type: Object, required: true }
})
defineEmits(['save'])

const newSkill = ref('')
const newLang = ref('')

function addSkill(r) {
  const v = newSkill.value.trim()
  if (v && !r.skills.includes(v)) r.skills.push(v)
  newSkill.value = ''
}
function removeSkill(r, i) {
  r.skills.splice(i, 1)
}
function addLang(r) {
  const v = newLang.value.trim()
  if (v && !r.languages.includes(v)) r.languages.push(v)
  newLang.value = ''
}
function removeLang(r, i) {
  r.languages.splice(i, 1)
}
function addEducation(r) {
  r.education.push({ school: '', major: '', period: '', degree: '' })
}
function removeEducation(r, i) {
  if (r.education.length > 1) r.education.splice(i, 1)
}
function addExperience(r) {
  r.experiences.push({ org: '', role: '', time: '', desc: '' })
}
function removeExperience(r, i) {
  if (r.experiences.length > 1) r.experiences.splice(i, 1)
}
</script>

<template>
  <div class="bg-white rounded-xl border border-slate-200 p-5 space-y-6">
    <h2 class="text-base font-semibold flex items-center gap-2">
      <span class="w-5 h-5 rounded bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center">1</span>
      基本信息
    </h2>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm text-slate-600 mb-1">姓名</label>
        <input v-model="resume.basic.name"
          class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
          placeholder="请输入姓名" />
      </div>
      <div>
        <label class="block text-sm text-slate-600 mb-1">联系电话</label>
        <input v-model="resume.basic.phone"
          class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
          placeholder="请输入手机号" />
      </div>
      <div>
        <label class="block text-sm text-slate-600 mb-1">邮箱</label>
        <input v-model="resume.basic.email"
          class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
          placeholder="请输入邮箱" />
      </div>
      <div>
        <label class="block text-sm text-slate-600 mb-1">求职城市</label>
        <input v-model="resume.basic.city"
          class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
          placeholder="如：北京" />
      </div>
    </div>

    <h2 class="text-base font-semibold flex items-center gap-2">
      <span class="w-5 h-5 rounded bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center">2</span>
      求职意向
    </h2>
    <div class="grid grid-cols-3 gap-4">
      <div>
        <label class="block text-sm text-slate-600 mb-1">目标岗位</label>
        <input v-model="resume.intent.position"
          class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
          placeholder="如：前端开发工程师" />
      </div>
      <div>
        <label class="block text-sm text-slate-600 mb-1">期望薪资</label>
        <input v-model="resume.intent.salary"
          class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
          placeholder="如：15-20K" />
      </div>
      <div>
        <label class="block text-sm text-slate-600 mb-1">到岗时间</label>
        <input v-model="resume.intent.start"
          class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
          placeholder="如：一周内" />
      </div>
    </div>

    <h2 class="text-base font-semibold flex items-center gap-2">
      <span class="w-5 h-5 rounded bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center">3</span>
      教育经历
    </h2>
    <div v-for="(edu, i) in resume.education" :key="i" class="border border-slate-200 rounded-lg p-4 space-y-3">
      <div class="flex justify-end">
        <button v-if="resume.education.length > 1" @click="removeEducation(resume, i)"
          class="text-xs text-red-500 hover:text-red-700">删除</button>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm text-slate-600 mb-1">学校</label>
          <input v-model="edu.school" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" placeholder="学校名称" />
        </div>
        <div>
          <label class="block text-sm text-slate-600 mb-1">专业</label>
          <input v-model="edu.major" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" placeholder="专业名称" />
        </div>
        <div>
          <label class="block text-sm text-slate-600 mb-1">起止时间</label>
          <input v-model="edu.period" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" placeholder="2022.09 - 2026.06" />
        </div>
        <div>
          <label class="block text-sm text-slate-600 mb-1">学历</label>
          <input v-model="edu.degree" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" placeholder="本科" />
        </div>
      </div>
    </div>
    <button @click="addEducation(resume)" class="text-sm text-indigo-600 hover:text-indigo-800">+ 添加教育经历</button>

    <h2 class="text-base font-semibold flex items-center gap-2">
      <span class="w-5 h-5 rounded bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center">4</span>
      工作 / 项目经历
    </h2>
    <div v-for="(exp, i) in resume.experiences" :key="i" class="border border-slate-200 rounded-lg p-4 space-y-3">
      <div class="flex justify-end">
        <button v-if="resume.experiences.length > 1" @click="removeExperience(resume, i)"
          class="text-xs text-red-500 hover:text-red-700">删除</button>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm text-slate-600 mb-1">公司 / 项目</label>
          <input v-model="exp.org" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" placeholder="公司或项目名称" />
        </div>
        <div>
          <label class="block text-sm text-slate-600 mb-1">职位 / 角色</label>
          <input v-model="exp.role" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" placeholder="职位名称" />
        </div>
        <div class="col-span-2">
          <label class="block text-sm text-slate-600 mb-1">起止时间</label>
          <input v-model="exp.time" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" placeholder="2024.07 - 至今" />
        </div>
        <div class="col-span-2">
          <label class="block text-sm text-slate-600 mb-1">经历描述（建议用 STAR 法则）</label>
          <textarea v-model="exp.desc" rows="3" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none resize-none"
            placeholder="情境 / 任务 / 行动 / 结果"></textarea>
        </div>
      </div>
    </div>
    <button @click="addExperience(resume)" class="text-sm text-indigo-600 hover:text-indigo-800">+ 添加经历</button>

    <h2 class="text-base font-semibold flex items-center gap-2">
      <span class="w-5 h-5 rounded bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center">5</span>
      专业技能
    </h2>
    <div class="flex flex-wrap gap-2 items-center">
      <span v-for="(s, i) in resume.skills" :key="i"
        class="px-3 py-1 rounded-full bg-slate-100 text-sm text-slate-700 inline-flex items-center gap-1">
        {{ s }}
        <button @click="removeSkill(resume, i)" class="text-slate-400 hover:text-red-500">×</button>
      </span>
      <div class="inline-flex items-center gap-1">
        <input v-model="newSkill" @keyup.enter="addSkill(resume)"
          class="w-32 border border-dashed border-slate-300 rounded-full px-3 py-1 text-sm outline-none"
          placeholder="输入技能" />
        <button @click="addSkill(resume)" class="px-2 py-1 rounded-full border border-dashed border-slate-300 text-sm text-slate-400 hover:text-indigo-600">+ 添加</button>
      </div>
    </div>

    <h2 class="text-base font-semibold flex items-center gap-2">
      <span class="w-5 h-5 rounded bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center">6</span>
      语言能力
    </h2>
    <div class="flex flex-wrap gap-2 items-center">
      <span v-for="(l, i) in resume.languages" :key="i"
        class="px-3 py-1 rounded-full bg-slate-100 text-sm text-slate-700 inline-flex items-center gap-1">
        {{ l }}
        <button @click="removeLang(resume, i)" class="text-slate-400 hover:text-red-500">×</button>
      </span>
      <div class="inline-flex items-center gap-1">
        <input v-model="newLang" @keyup.enter="addLang(resume)"
          class="w-32 border border-dashed border-slate-300 rounded-full px-3 py-1 text-sm outline-none"
          placeholder="如：英语 CET-6" />
        <button @click="addLang(resume)" class="px-2 py-1 rounded-full border border-dashed border-slate-300 text-sm text-slate-400 hover:text-indigo-600">+ 添加</button>
      </div>
    </div>

    <h2 class="text-base font-semibold flex items-center gap-2">
      <span class="w-5 h-5 rounded bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center">7</span>
      自我评价
    </h2>
    <textarea v-model="resume.summary" rows="3"
      class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none resize-none"
      placeholder="简要介绍你的优势与求职意愿（可基于 STAR 法则优化）"></textarea>

    <div class="pt-2">
      <button @click="$emit('save')"
        class="w-full py-2.5 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700">
        保存简历
      </button>
    </div>
  </div>
</template>
