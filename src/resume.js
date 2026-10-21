import { reactive, watch, toRaw } from 'vue'

const STORAGE_KEY = 'resume-generator-data'

// 简历数据默认结构
const defaultResume = () => ({
  basic: { name: '', phone: '', email: '', city: '' },
  intent: { position: '', salary: '', start: '' },
  education: [{ school: '', major: '', degree: '', period: '', courses: '', gpa: '', honors: '' }],
  experiences: [{ org: '', role: '', time: '', desc: '' }],
  skills: [],
  languages: [],
  summary: ''
})

// 从 LocalStorage 加载
function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const saved = JSON.parse(raw)
      const base = defaultResume()
      const eduDefaults = (e) =>
        Object.assign({ school: '', major: '', degree: '', period: '', courses: '', gpa: '', honors: '' }, e)
      // 合并默认结构，避免旧数据缺字段
      return {
        basic: Object.assign({}, base.basic, saved.basic),
        intent: Object.assign({}, base.intent, saved.intent),
        education:
          Array.isArray(saved.education) && saved.education.length
            ? saved.education.map(eduDefaults)
            : base.education,
        experiences: Array.isArray(saved.experiences) && saved.experiences.length ? saved.experiences : base.experiences,
        skills: Array.isArray(saved.skills) ? saved.skills : [],
        languages: Array.isArray(saved.languages) ? saved.languages : [],
        summary: saved.summary || ''
      }
    }
  } catch (e) {
    /* 读取失败时使用默认结构 */
  }
  return defaultResume()
}

// 写入 LocalStorage
export function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toRaw(resume)))
    return true
  } catch (e) {
    return false
  }
}

// 全局共享的响应式简历数据
export const resume = reactive(load())

// 自动保存：数据变化即写入本地
watch(
  resume,
  () => save(),
  { deep: true }
)
