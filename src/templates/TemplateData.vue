<script setup>
import { computed } from 'vue'
import { useResumeFields } from './templateUtils'
import { t } from '../i18n'
const props = defineProps({ resume: { type: Object, required: true } })
const { name, title } = useResumeFields(props)

const metrics = computed(() => [
  { num: props.resume.experiences.length, cap: t('secExperience') },
  { num: props.resume.skills.length, cap: t('secSkills') },
  { num: props.resume.languages.length, cap: t('secLanguages') },
  { num: props.resume.education.length, cap: t('secEducation') }
])
</script>

<template>
  <div class="data-sheet">
    <!-- 顶部深色区 -->
    <header class="top">
      <div class="row1">
        <div>
          <h1>{{ name }}</h1>
          <div class="role">{{ title }}</div>
        </div>
        <div class="contact">
          <span>{{ resume.basic.phone }}</span>
          <span>{{ resume.basic.email }}</span>
          <span>{{ resume.basic.city }}</span>
        </div>
      </div>
    </header>

    <!-- 指标带 -->
    <div class="metrics">
      <div v-for="(m, i) in metrics" :key="i" class="metric">
        <div class="num">{{ m.num }}</div>
        <div class="cap">{{ m.cap }}</div>
      </div>
    </div>

    <div class="body">
      <!-- 核心优势 -->
      <section class="section">
        <div class="section-title"><span class="bar"></span><h2>{{ t('secSummary') }}</h2></div>
        <p class="lead">{{ resume.summary || t('notFilled') }}</p>
      </section>

      <!-- 工作经历 -->
      <section class="section">
        <div class="section-title"><span class="bar"></span><h2>{{ t('workExp') }}</h2></div>
        <template v-if="resume.experiences.length">
          <div v-for="(e, i) in resume.experiences" :key="i" class="item">
            <div class="hd"><span class="t">{{ e.org || t('expName') }} <em>· {{ e.role }}</em></span><span class="tm">{{ e.time }}</span></div>
            <p v-if="e.desc">{{ e.desc }}</p>
          </div>
        </template>
        <p v-else class="sub">{{ t('notFilled') }}</p>
      </section>

      <!-- 教育经历 -->
      <section class="section edu">
        <div class="section-title"><span class="bar"></span><h2>{{ t('secEducation') }}</h2></div>
        <template v-if="resume.education.length">
          <div v-for="(e, i) in resume.education" :key="i" class="eduitem">
            <div class="line">
              <span class="l">{{ e.school || t('expName') }} <em>· {{ e.major }}{{ e.degree ? '（' + e.degree + '）' : '' }}</em></span>
              <span class="r">{{ e.period }}</span>
            </div>
            <p v-if="e.courses || e.gpa || e.honors">
              {{ e.courses ? t('courses') + '：' + e.courses : '' }}{{ e.gpa ? '；' + t('gpa') + ' ' + e.gpa : '' }}{{ e.honors ? '；' + e.honors : '' }}
            </p>
          </div>
        </template>
        <p v-else class="sub">{{ t('notFilled') }}</p>
      </section>

      <!-- 核心能力 -->
      <section class="section">
        <div class="section-title"><span class="bar"></span><h2>{{ t('coreSkill') }}</h2></div>
        <div v-if="resume.skills.length" class="pills">
          <span v-for="(s, i) in resume.skills" :key="i" class="pill">{{ s }}</span>
        </div>
        <p v-else class="sub">{{ t('notFilled') }}</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.data-sheet { background: #fff; color: #1b2b29; font-family: "PingFang SC", "Microsoft YaHei", system-ui, sans-serif; }
.top { background: linear-gradient(135deg, #115e59 0%, #0f766e 100%); color: #fff; padding: 30px 36px; }
.top .row1 { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px; }
.top h1 { font-size: 27px; font-weight: 800; letter-spacing: 2px; margin: 0; }
.top .role { font-size: 14px; color: #bfe6e1; margin-top: 6px; }
.top .contact { font-size: 12px; line-height: 1.9; color: #d8ecea; text-align: right; }
.top .contact span { display: block; }
.metrics { display: grid; grid-template-columns: repeat(4, 1fr); border-bottom: 1px solid #dde8e6; }
.metric { text-align: center; padding: 18px 10px; border-right: 1px solid #dde8e6; }
.metric:last-child { border-right: none; }
.metric .num { font-size: 24px; font-weight: 800; color: #0f766e; }
.metric .cap { font-size: 11.5px; color: #5f6f6c; margin-top: 3px; }
.body { padding: 26px 36px 32px; }
.section { margin-bottom: 22px; }
.section-title { display: flex; align-items: center; gap: 9px; margin-bottom: 12px; }
.section-title .bar { width: 4px; height: 16px; background: #0f766e; border-radius: 2px; }
.section-title h2 { font-size: 14px; font-weight: 700; letter-spacing: 1px; margin: 0; }
.lead { font-size: 13px; line-height: 1.8; color: #37433f; text-align: justify; white-space: pre-line; }
.item { margin-bottom: 16px; position: relative; padding-left: 20px; }
.item::before { content: ""; position: absolute; left: 0; top: 6px; width: 9px; height: 9px; background: #e6f4f2; border: 2px solid #0f766e; border-radius: 50%; }
.item .hd { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
.item .hd .t { font-size: 14px; font-weight: 600; }
.item .hd .t em { font-style: normal; color: #0f766e; font-weight: 700; }
.item .hd .tm { font-size: 11.5px; color: #5f6f6c; white-space: nowrap; }
.item p { font-size: 13px; line-height: 1.75; color: #37433f; text-align: justify; white-space: pre-line; margin: 0; }
.item p b { color: #115e59; }
.sub { font-size: 12.5px; color: #5f6f6c; }
.edu .eduitem { margin-bottom: 12px; }
.edu .line { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
.edu .line .l { font-size: 13.5px; font-weight: 600; }
.edu .line .l em { font-style: normal; color: #0f766e; font-weight: 700; }
.edu .line .r { font-size: 11.5px; color: #5f6f6c; }
.edu p { font-size: 12px; color: #5f6f6c; white-space: pre-line; }
.pills { display: flex; flex-wrap: wrap; gap: 8px; }
.pill { background: #e6f4f2; color: #115e59; border: 1px solid #c3e3de; padding: 4px 13px; border-radius: 6px; font-size: 12px; font-weight: 600; }
</style>
