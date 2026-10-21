<script setup>
import { ref } from 'vue'
import { t } from '../i18n'

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
  r.education.push({ school: '', major: '', degree: '', period: '', courses: '', gpa: '', honors: '' })
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

const sections = [
  { key: 'formBasic', label: 'formBasic', num: 1 },
  { key: 'formIntent', label: 'formIntent', num: 2 },
  { key: 'formEducation', label: 'formEducation', num: 3 },
  { key: 'formExperience', label: 'formExperience', num: 4 },
  { key: 'formSkills', label: 'formSkills', num: 5 },
  { key: 'formLanguages', label: 'formLanguages', num: 6 },
  { key: 'formSummary', label: 'formSummary', num: 7 }
]
</script>

<template>
  <div class="bg-white rounded-xl border border-slate-200 p-5 space-y-6">
    <!-- 1 基本信息 -->
    <h2 class="text-base font-semibold flex items-center gap-2">
      <span class="w-5 h-5 rounded bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center">1</span>
      {{ t('formBasic') }}
    </h2>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm text-slate-600 mb-1">{{ t('name') }}</label>
        <input v-model="resume.basic.name"
          class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
          :placeholder="t('phName')" />
      </div>
      <div>
        <label class="block text-sm text-slate-600 mb-1">{{ t('phone') }}</label>
        <input v-model="resume.basic.phone"
          class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
          :placeholder="t('phPhone')" />
      </div>
      <div>
        <label class="block text-sm text-slate-600 mb-1">{{ t('email') }}</label>
        <input v-model="resume.basic.email"
          class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
          :placeholder="t('phEmail')" />
      </div>
      <div>
        <label class="block text-sm text-slate-600 mb-1">{{ t('city') }}</label>
        <input v-model="resume.basic.city"
          class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
          :placeholder="t('phCity')" />
      </div>
    </div>

    <!-- 2 求职意向 -->
    <h2 class="text-base font-semibold flex items-center gap-2">
      <span class="w-5 h-5 rounded bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center">2</span>
      {{ t('formIntent') }}
    </h2>
    <div class="grid grid-cols-3 gap-4">
      <div>
        <label class="block text-sm text-slate-600 mb-1">{{ t('position') }}</label>
        <input v-model="resume.intent.position"
          class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
          :placeholder="t('phPosition')" />
      </div>
      <div>
        <label class="block text-sm text-slate-600 mb-1">{{ t('salary') }}</label>
        <input v-model="resume.intent.salary"
          class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
          :placeholder="t('phSalary')" />
      </div>
      <div>
        <label class="block text-sm text-slate-600 mb-1">{{ t('startTime') }}</label>
        <input v-model="resume.intent.start"
          class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
          :placeholder="t('phStart')" />
      </div>
    </div>

    <!-- 3 教育经历 -->
    <h2 class="text-base font-semibold flex items-center gap-2">
      <span class="w-5 h-5 rounded bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center">3</span>
      {{ t('formEducation') }}
    </h2>
    <div v-for="(edu, i) in resume.education" :key="i" class="border border-slate-200 rounded-lg p-4 space-y-3">
      <div class="flex justify-end">
        <button v-if="resume.education.length > 1" @click="removeEducation(resume, i)"
          class="text-xs text-red-500 hover:text-red-700">{{ t('del') }}</button>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm text-slate-600 mb-1">{{ t('school') }}</label>
          <input v-model="edu.school" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" :placeholder="t('phSchool')" />
        </div>
        <div>
          <label class="block text-sm text-slate-600 mb-1">{{ t('major') }}</label>
          <input v-model="edu.major" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" :placeholder="t('phMajor')" />
        </div>
        <div>
          <label class="block text-sm text-slate-600 mb-1">{{ t('period') }}</label>
          <input v-model="edu.period" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" :placeholder="t('phPeriod')" />
        </div>
        <div>
          <label class="block text-sm text-slate-600 mb-1">{{ t('degree') }}</label>
          <input v-model="edu.degree" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" :placeholder="t('phDegree')" />
        </div>
        <div class="col-span-2">
          <label class="block text-sm text-slate-600 mb-1">{{ t('courses') }}</label>
          <input v-model="edu.courses" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" :placeholder="t('phCourses')" />
        </div>
        <div>
          <label class="block text-sm text-slate-600 mb-1">{{ t('gpa') }}</label>
          <input v-model="edu.gpa" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" :placeholder="t('phGpa')" />
        </div>
        <div>
          <label class="block text-sm text-slate-600 mb-1">{{ t('honors') }}</label>
          <input v-model="edu.honors" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" :placeholder="t('phHonors')" />
        </div>
      </div>
    </div>
    <button @click="addEducation(resume)" class="text-sm text-indigo-600 hover:text-indigo-800">{{ t('addEducation') }}</button>

    <!-- 4 工作/项目经历 -->
    <h2 class="text-base font-semibold flex items-center gap-2">
      <span class="w-5 h-5 rounded bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center">4</span>
      {{ t('formExperience') }}
    </h2>
    <div v-for="(exp, i) in resume.experiences" :key="i" class="border border-slate-200 rounded-lg p-4 space-y-3">
      <div class="flex justify-end">
        <button v-if="resume.experiences.length > 1" @click="removeExperience(resume, i)"
          class="text-xs text-red-500 hover:text-red-700">{{ t('del') }}</button>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-sm text-slate-600 mb-1">{{ t('org') }}</label>
          <input v-model="exp.org" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" :placeholder="t('phOrg')" />
        </div>
        <div>
          <label class="block text-sm text-slate-600 mb-1">{{ t('role') }}</label>
          <input v-model="exp.role" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" :placeholder="t('phRole')" />
        </div>
        <div class="col-span-2">
          <label class="block text-sm text-slate-600 mb-1">{{ t('period') }}</label>
          <input v-model="exp.time" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" :placeholder="t('phTime')" />
        </div>
        <div class="col-span-2">
          <label class="block text-sm text-slate-600 mb-1">{{ t('expDesc') }}</label>
          <textarea v-model="exp.desc" rows="3" class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none resize-none"
            :placeholder="t('phDesc')"></textarea>
        </div>
      </div>
    </div>
    <button @click="addExperience(resume)" class="text-sm text-indigo-600 hover:text-indigo-800">{{ t('addExperience') }}</button>

    <!-- 5 专业技能 -->
    <h2 class="text-base font-semibold flex items-center gap-2">
      <span class="w-5 h-5 rounded bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center">5</span>
      {{ t('formSkills') }}
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
          :placeholder="t('phSkill')" />
        <button @click="addSkill(resume)" class="px-2 py-1 rounded-full border border-dashed border-slate-300 text-sm text-slate-400 hover:text-indigo-600">{{ t('add') }}</button>
      </div>
    </div>

    <!-- 6 语言能力 -->
    <h2 class="text-base font-semibold flex items-center gap-2">
      <span class="w-5 h-5 rounded bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center">6</span>
      {{ t('formLanguages') }}
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
          :placeholder="t('phLang')" />
        <button @click="addLang(resume)" class="px-2 py-1 rounded-full border border-dashed border-slate-300 text-sm text-slate-400 hover:text-indigo-600">{{ t('add') }}</button>
      </div>
    </div>

    <!-- 7 自我评价 -->
    <h2 class="text-base font-semibold flex items-center gap-2">
      <span class="w-5 h-5 rounded bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center">7</span>
      {{ t('formSummary') }}
    </h2>
    <textarea v-model="resume.summary" rows="3"
      class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none resize-none"
      :placeholder="t('phSummary')"></textarea>

    <div class="pt-2">
      <button @click="$emit('save')"
        class="w-full py-2.5 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700">
        {{ t('save') }}
      </button>
    </div>
  </div>
</template>
