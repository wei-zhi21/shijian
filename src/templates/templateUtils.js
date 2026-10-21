import { computed } from 'vue'
import { t } from '../i18n'

// 四套模板共用的简历派生字段
export function useResumeFields(props) {
  const name = computed(() => props.resume.basic.name || t('notFilled'))
  const title = computed(() => props.resume.intent.position || t('notFilled'))
  const avatar = computed(() => (props.resume.basic.name || '未').slice(0, 1))
  const educationText = computed(() => {
    return props.resume.education
      .map((e) => [e.school, e.major, e.degree].filter(Boolean).join(' · ') + (e.period ? ' ' + e.period : ''))
      .filter(Boolean)
      .join('；') || t('notFilled')
  })
  return { name, title, avatar, educationText }
}

// 技能进度条宽度（数据无等级，按索引取一个稳定的展示值）
const WIDTHS = [88, 90, 82, 92, 75, 86, 80, 84, 89, 78, 83, 87]
export function skillWidth(i) {
  return WIDTHS[i % WIDTHS.length] + '%'
}

// 教育经历单条的详细描述（模板四等使用）
export function eduMeta(e) {
  const parts = []
  if (e.courses) parts.push(`${t('courses')}：${e.courses}`)
  if (e.gpa) parts.push(`${t('gpa')} ${e.gpa}`)
  if (e.honors) parts.push(e.honors)
  return parts.join('；')
}
