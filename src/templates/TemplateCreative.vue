<script setup>
import { useResumeFields, skillWidth } from './templateUtils'
import { t } from '../i18n'
const props = defineProps({ resume: { type: Object, required: true } })
const { name, title } = useResumeFields(props)
</script>

<template>
  <div class="creative-sheet">
    <!-- 顶部个性区 -->
    <header class="hero">
      <div class="kicker">CREATIVE · {{ resume.intent.position || t('notFilled') }}</div>
      <h1>{{ name }}</h1>
      <div class="role">{{ t('formIntent') }}：<b>{{ title }}</b></div>
      <div class="meta">
        <span>📍 {{ resume.basic.city }}</span>
        <span>✉ {{ resume.basic.email }}</span>
        <span>☎ {{ resume.basic.phone }}</span>
      </div>
    </header>

    <!-- 关于我 -->
    <section class="section">
      <div class="section-title"><span class="dot"></span><h2>{{ t('about') }}</h2><span class="line"></span></div>
      <p class="summary">{{ resume.summary || t('notFilled') }}</p>
    </section>

    <!-- 工作经历 -->
    <section class="section">
      <div class="section-title"><span class="dot"></span><h2>{{ t('workExp') }}</h2><span class="line"></span></div>
      <template v-if="resume.experiences.length">
        <div v-for="(e, i) in resume.experiences" :key="i" class="item">
          <div class="hd"><span class="t">{{ e.org || t('expName') }} <em>· {{ e.role }}</em></span><span class="tm">{{ e.time }}</span></div>
          <p v-if="e.desc" class="desc">{{ e.desc }}</p>
        </div>
      </template>
      <p v-else class="desc">{{ t('notFilled') }}</p>
    </section>

    <!-- 教育背景 -->
    <section class="section">
      <div class="section-title"><span class="dot"></span><h2>{{ t('secEducation') }}</h2><span class="line"></span></div>
      <template v-if="resume.education.length">
        <div v-for="(e, i) in resume.education" :key="i" class="item">
          <div class="hd">
            <span class="t">{{ e.school || t('expName') }} <em>· {{ e.major }}{{ e.degree ? '（' + e.degree + '）' : '' }}</em></span>
            <span class="tm">{{ e.period }}</span>
          </div>
          <div class="sub" v-if="e.gpa || e.honors">
            {{ e.gpa ? t('gpa') + ' ' + e.gpa : '' }}{{ e.gpa && e.honors ? ' · ' : '' }}{{ e.honors }}
          </div>
          <p v-if="e.courses" class="desc">{{ t('courses') }}：{{ e.courses }}</p>
        </div>
      </template>
      <p v-else class="desc">{{ t('notFilled') }}</p>
    </section>

    <!-- 核心技能 -->
    <section class="section">
      <div class="section-title"><span class="dot"></span><h2>{{ t('coreSkill') }}</h2><span class="line"></span></div>
      <div v-if="resume.skills.length" class="grid2">
        <div v-for="(s, i) in resume.skills" :key="i" class="skillline">
          <div class="lbl"><b>{{ s }}</b><span>{{ skillWidth(i) }}</span></div>
          <div class="skillbar"><i :style="{ width: skillWidth(i) }"></i></div>
        </div>
      </div>
      <p v-else class="desc">{{ t('notFilled') }}</p>
    </section>
  </div>
</template>

<style scoped>
.creative-sheet { background: #fffdf9; color: #2f2a26; padding: 0 44px 36px; font-family: "PingFang SC", "Microsoft YaHei", system-ui, sans-serif; }
.hero { border-bottom: 1px solid #eee7dc; padding: 40px 0 26px; }
.hero .kicker { font-size: 11px; letter-spacing: 4px; color: #d95d39; font-weight: 700; margin-bottom: 12px; }
.hero h1 { font-size: 34px; font-weight: 800; letter-spacing: 2px; margin: 0; }
.hero .role { font-size: 15px; color: #8a8278; margin-top: 8px; letter-spacing: 1px; }
.hero .role b { color: #d95d39; font-weight: 700; }
.hero .meta { margin-top: 16px; display: flex; flex-wrap: wrap; gap: 8px 22px; font-size: 12.5px; color: #8a8278; }
.section { margin-top: 26px; }
.section-title { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
.section-title .dot { width: 9px; height: 9px; background: #d95d39; border-radius: 50%; }
.section-title h2 { font-size: 13px; font-weight: 700; letter-spacing: 3px; margin: 0; }
.section-title .line { flex: 1; height: 1px; background: #eee7dc; }
.item { margin-bottom: 16px; }
.item .hd { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
.item .hd .t { font-size: 14px; font-weight: 600; }
.item .hd .t em { font-style: normal; color: #b34a2a; font-weight: 600; }
.item .hd .tm { font-size: 11.5px; color: #8a8278; white-space: nowrap; }
.item .sub { font-size: 12px; color: #8a8278; margin-bottom: 6px; }
.desc { font-size: 13px; line-height: 1.75; color: #4a443d; text-align: justify; white-space: pre-line; margin: 0; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 36px; }
.skillline { margin-bottom: 13px; }
.skillline .lbl { display: flex; justify-content: space-between; font-size: 12.5px; margin-bottom: 5px; }
.skillline .lbl b { font-weight: 600; }
.skillline .lbl span { color: #8a8278; font-size: 11.5px; }
.skillbar { height: 7px; background: #eee7dc; border-radius: 4px; overflow: hidden; }
.skillbar i { display: block; height: 100%; background: #d95d39; border-radius: 4px; }
.summary { font-size: 13px; line-height: 1.85; color: #4a443d; text-align: justify; white-space: pre-line; }
</style>
