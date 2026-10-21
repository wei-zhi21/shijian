<script setup>
import { useResumeFields, skillWidth } from './templateUtils'
import { t } from '../i18n'
const props = defineProps({ resume: { type: Object, required: true } })
const { name, title, avatar } = useResumeFields(props)
</script>

<template>
  <div class="modern-flex">
    <!-- 侧边栏 -->
    <aside class="side">
      <div class="avatar">{{ avatar }}</div>
      <div class="name">{{ name }}</div>
      <div class="role">{{ title }}</div>

      <div class="side-sec">
        <h3>{{ t('contact') }}</h3>
        <div class="row"><b>{{ t('phone') }}</b>{{ resume.basic.phone }}</div>
        <div class="row"><b>{{ t('email') }}</b>{{ resume.basic.email }}</div>
        <div class="row"><b>{{ t('city') }}</b>{{ resume.basic.city }}</div>
        <div class="row"><b>{{ t('startTime') }}</b>{{ resume.intent.start }}</div>
      </div>

      <div class="side-sec skills">
        <h3>{{ t('secSkills') }}</h3>
        <div v-for="(s, i) in resume.skills" :key="i" class="sk">
          <div class="lbl"><span>{{ s }}</span><span>{{ skillWidth(i) }}</span></div>
          <div class="bar"><i :style="{ width: skillWidth(i) }"></i></div>
        </div>
        <p v-if="!resume.skills.length" class="empty">{{ t('notFilled') }}</p>
      </div>

      <div class="side-sec">
        <h3>{{ t('secLanguages') }}</h3>
        <div v-for="(l, i) in resume.languages" :key="i" class="row"><b>{{ l }}</b></div>
        <p v-if="!resume.languages.length" class="empty">{{ t('notFilled') }}</p>
      </div>
    </aside>

    <!-- 主区 -->
    <main class="main">
      <div class="main-sec">
        <h2>{{ t('profile') }}</h2>
        <p class="summary">{{ resume.summary || t('notFilled') }}</p>
      </div>

      <div class="main-sec">
        <h2>{{ t('projectExp') }}</h2>
        <template v-if="resume.experiences.length">
          <div v-for="(e, i) in resume.experiences" :key="i" class="item">
            <div class="hd"><span class="t">{{ e.org || t('expName') }} <em>· {{ e.role }}</em></span><span class="tm">{{ e.time }}</span></div>
            <p v-if="e.desc">{{ e.desc }}</p>
          </div>
        </template>
        <p v-else class="sub">{{ t('notFilled') }}</p>
      </div>

      <div class="main-sec">
        <h2>{{ t('secEducation') }}</h2>
        <template v-if="resume.education.length">
          <div v-for="(e, i) in resume.education" :key="i" class="item">
            <div class="hd">
              <span class="t">{{ e.school || t('expName') }} <em>· {{ e.major }}{{ e.degree ? '（' + e.degree + '）' : '' }}</em></span>
              <span class="tm">{{ e.period }}</span>
            </div>
            <div class="sub" v-if="e.gpa || e.honors">
              {{ e.gpa ? t('gpa') + ' ' + e.gpa : '' }}{{ e.gpa && e.honors ? ' · ' : '' }}{{ e.honors }}
            </div>
            <p v-if="e.courses">{{ t('courses') }}：{{ e.courses }}</p>
          </div>
        </template>
        <p v-else class="sub">{{ t('notFilled') }}</p>
      </div>

      <div class="main-sec">
        <h2>{{ t('skillCert') }}</h2>
        <div v-if="resume.skills.length" class="pills">
          <span v-for="(s, i) in resume.skills" :key="i" class="pill">{{ s }}</span>
        </div>
        <p v-else class="sub">{{ t('notFilled') }}</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.modern-flex { display: flex; background: #fff; min-height: 100%; font-family: "PingFang SC", "Microsoft YaHei", system-ui, sans-serif; color: #26272b; }
.side { width: 190px; flex-shrink: 0; background: linear-gradient(180deg, #2d2a3e 0%, #3b3852 100%); color: #eef1f7; padding: 28px 22px; }
.avatar { width: 80px; height: 80px; border-radius: 50%; background: #8ab4f8; color: #16213b; display: flex; align-items: center; justify-content: center; font-size: 34px; font-weight: 700; margin: 0 auto 14px; }
.name { font-size: 19px; font-weight: 700; text-align: center; letter-spacing: 1px; }
.role { text-align: center; color: #8ab4f8; font-size: 12px; margin-top: 5px; }
.side-sec { margin-top: 22px; }
.side-sec h3 { font-size: 11px; letter-spacing: 2px; color: #8ab4f8; margin: 0 0 10px; padding-bottom: 5px; border-bottom: 1px solid rgba(255, 255, 255, .15); }
.side-sec .row { font-size: 12px; line-height: 1.8; color: #dfe3ec; word-break: break-all; }
.side-sec .row b { display: block; font-size: 11px; color: #b9c2d8; font-weight: 600; }
.side-sec .empty { font-size: 11px; color: rgba(255, 255, 255, .5); }
.skills .sk { margin-bottom: 9px; }
.skills .sk .lbl { display: flex; justify-content: space-between; font-size: 11px; color: #dfe3ec; margin-bottom: 4px; }
.skills .sk .lbl span:last-child { color: #9aa5bd; }
.bar { height: 5px; background: rgba(255, 255, 255, .15); border-radius: 3px; overflow: hidden; }
.bar i { display: block; height: 100%; background: #8ab4f8; border-radius: 3px; }
.main { flex: 1; padding: 30px 28px; }
.main-sec { margin-bottom: 20px; }
.main-sec h2 { font-size: 14px; font-weight: 700; color: #2d2a3e; letter-spacing: 1px; display: flex; align-items: center; gap: 8px; margin: 0 0 12px; }
.main-sec h2::before { content: ""; width: 4px; height: 15px; background: #6ea8ff; border-radius: 2px; }
.item { margin-bottom: 14px; }
.item .hd { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px; }
.item .hd .t { font-size: 13.5px; font-weight: 600; color: #1f2230; }
.item .hd .t em { font-style: normal; color: #6ea8ff; font-weight: 600; }
.item .hd .tm { font-size: 11.5px; color: #6b6f76; white-space: nowrap; }
.item .sub { font-size: 12px; color: #6b6f76; margin-bottom: 5px; }
.item p { font-size: 12.5px; color: #3a3d46; line-height: 1.7; margin: 0; white-space: pre-line; }
.main-sec .sub { font-size: 12.5px; color: #6b6f76; }
.summary { font-size: 12.5px; color: #3a3d46; line-height: 1.8; text-align: justify; white-space: pre-line; }
.pills { display: flex; flex-wrap: wrap; gap: 7px; }
.pill { background: #eef3fb; color: #2d2a3e; border: 1px solid #d7e2f4; padding: 3px 10px; border-radius: 999px; font-size: 11.5px; }
</style>
