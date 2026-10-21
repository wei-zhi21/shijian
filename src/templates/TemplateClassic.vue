<script setup>
import { useResumeFields } from './templateUtils'
import { t } from '../i18n'
const props = defineProps({ resume: { type: Object, required: true } })
const { name, title } = useResumeFields(props)
</script>

<template>
  <div class="classic-sheet">
    <header class="masthead">
      <div>
        <h1>{{ name }}</h1>
        <div class="role">{{ t('formIntent') }}：{{ title }}</div>
      </div>
      <div class="contact">
        <span>{{ resume.basic.phone }}</span>
        <span>{{ resume.basic.email }}</span>
        <span>{{ resume.basic.city }} · {{ resume.intent.start || t('notFilled') }}</span>
      </div>
    </header>

    <section class="section">
      <div class="section-title"><span class="no">01</span><h2>{{ t('secSummary') }}</h2><span class="bar"></span></div>
      <p class="summary">{{ resume.summary || t('notFilled') }}</p>
    </section>

    <section class="section">
      <div class="section-title"><span class="no">02</span><h2>{{ t('secExperience') }}</h2><span class="bar"></span></div>
      <template v-if="resume.experiences.length">
        <div v-for="(e, i) in resume.experiences" :key="i" class="mb">
          <div class="line"><span class="l">{{ e.org || t('expName') }} <em>· {{ e.role }}</em></span><span class="r">{{ e.time }}</span></div>
          <p class="p" v-if="e.desc">{{ e.desc }}</p>
        </div>
      </template>
      <p v-else class="p">{{ t('notFilled') }}</p>
    </section>

    <section class="section">
      <div class="section-title"><span class="no">03</span><h2>{{ t('secEducation') }}</h2><span class="bar"></span></div>
      <template v-if="resume.education.length">
        <div v-for="(e, i) in resume.education" :key="i" class="mb">
          <div class="line">
            <span class="l">{{ e.school || t('expName') }} <em>· {{ e.major }}{{ e.degree ? '（' + e.degree + '）' : '' }}</em></span>
            <span class="r">{{ e.period }}</span>
          </div>
          <p class="sub" v-if="e.courses || e.gpa || e.honors">
            {{ e.courses ? t('courses') + '：' + e.courses : '' }}{{ e.gpa ? '；' + t('gpa') + ' ' + e.gpa : '' }}{{ e.honors ? '；' + e.honors : '' }}
          </p>
        </div>
      </template>
      <p v-else class="sub">{{ t('notFilled') }}</p>
    </section>

    <section class="section">
      <div class="section-title"><span class="no">04</span><h2>{{ t('secSkills') }}</h2><span class="bar"></span></div>
      <div v-if="resume.skills.length" class="tags">
        <span v-for="(s, i) in resume.skills" :key="i" class="tag">{{ s }}</span>
      </div>
      <p v-else class="sub">{{ t('notFilled') }}</p>
    </section>

    <section class="section">
      <div class="section-title"><span class="no">05</span><h2>{{ t('certs') }}</h2><span class="bar"></span></div>
      <template v-if="resume.languages.length">
        <p v-for="(l, i) in resume.languages" :key="i" class="p">{{ l }}</p>
      </template>
      <p v-else class="p">{{ t('notFilled') }}</p>
    </section>
  </div>
</template>

<style scoped>
.classic-sheet {
  background: #fff;
  color: #2b2b2b;
  padding: 40px 44px 36px;
  font-family: "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
}
.masthead { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #1e3a5f; padding-bottom: 16px; }
.masthead h1 { font-size: 26px; font-weight: 700; letter-spacing: 3px; color: #1e3a5f; margin: 0; }
.masthead .role { margin-top: 6px; font-size: 14px; color: #b98a2e; font-weight: 600; }
.contact { text-align: right; font-size: 12px; color: #5f6672; line-height: 1.8; }
.contact span { display: block; }
.section { margin-top: 22px; }
.section-title { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.section-title .no { width: 20px; height: 20px; background: #1e3a5f; color: #fff; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; }
.section-title h2 { font-size: 14px; font-weight: 700; color: #1e3a5f; letter-spacing: 2px; margin: 0; }
.section-title .bar { flex: 1; height: 1px; background: #e3e3e3; }
.line { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px; }
.line .l { font-size: 14px; font-weight: 600; color: #2b2b2b; }
.line .l em { font-style: normal; color: #b98a2e; font-weight: 600; }
.line .r { font-size: 12px; color: #5f6672; white-space: nowrap; }
.sub { font-size: 12.5px; color: #5f6672; margin-bottom: 6px; }
.p { font-size: 13px; color: #2b2b2b; line-height: 1.75; text-align: justify; margin: 0; white-space: pre-line; }
.mb { margin-bottom: 12px; }
.tags { display: flex; flex-wrap: wrap; gap: 8px; }
.tag { background: #f5ecd7; color: #7a5a17; border: 1px solid #e3cd97; padding: 3px 12px; border-radius: 3px; font-size: 12px; }
.summary { border-left: 3px solid #b98a2e; padding: 4px 0 4px 12px; font-size: 13px; color: #2b2b2b; line-height: 1.8; white-space: pre-line; }
</style>
